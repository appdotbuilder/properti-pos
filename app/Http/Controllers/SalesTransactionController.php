<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSalesTransactionRequest;
use App\Models\SalesTransaction;
use App\Models\Property;
use App\Models\Customer;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalesTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = SalesTransaction::with(['property.project', 'customer', 'salesAgent'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('transactions/index', [
            'transactions' => $transactions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $properties = Property::with('project')
            ->where('status', 'available')
            ->get();
        $customers = Customer::where('status', 'active')
            ->orderBy('name')
            ->get();
        
        return Inertia::render('transactions/create', [
            'properties' => $properties,
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSalesTransactionRequest $request)
    {
        $data = $request->validated();
        
        // Get property to calculate transaction details
        $property = Property::findOrFail($data['property_id']);
        $totalPrice = $property->price;
        
        // Calculate transaction details
        $downPayment = $data['down_payment'];
        $remainingBalance = $totalPrice - $downPayment;
        $dpMonthly = $data['dp_installments'] > 1 ? $downPayment / $data['dp_installments'] : $downPayment;
        $creditMonthly = $remainingBalance / $data['credit_installments'];
        
        // Create transaction
        $transaction = SalesTransaction::create([
            'transaction_code' => SalesTransaction::generateTransactionCode(),
            'property_id' => $data['property_id'],
            'customer_id' => $data['customer_id'],
            'sales_agent_id' => auth()->id(),
            'transaction_date' => $data['transaction_date'],
            'total_price' => $totalPrice,
            'down_payment' => $downPayment,
            'dp_installments' => $data['dp_installments'],
            'dp_monthly' => $dpMonthly,
            'remaining_balance' => $remainingBalance,
            'credit_installments' => $data['credit_installments'],
            'credit_monthly' => $creditMonthly,
            'interest_rate' => $data['interest_rate'],
            'status' => 'active',
            'notes' => $data['notes'] ?? null,
        ]);

        // Generate payment schedule
        $this->generatePaymentSchedule($transaction);

        // Update property status
        $property->update(['status' => 'sold']);

        return redirect()->route('transactions.show', $transaction)
            ->with('success', 'Transaksi penjualan berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SalesTransaction $transaction)
    {
        $transaction->load([
            'property.project',
            'customer',
            'salesAgent',
            'payments' => function ($query) {
                $query->orderBy('due_date');
            }
        ]);

        return Inertia::render('transactions/show', [
            'transaction' => $transaction
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SalesTransaction $transaction)
    {
        $properties = Property::with('project')->get();
        $customers = Customer::where('status', 'active')
            ->orderBy('name')
            ->get();
        
        return Inertia::render('transactions/edit', [
            'transaction' => $transaction,
            'properties' => $properties,
            'customers' => $customers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreSalesTransactionRequest $request, SalesTransaction $transaction)
    {
        $transaction->update($request->validated());

        return redirect()->route('transactions.show', $transaction)
            ->with('success', 'Transaksi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SalesTransaction $transaction)
    {
        // Update property status back to available
        $transaction->property->update(['status' => 'available']);
        
        $transaction->delete();

        return redirect()->route('transactions.index')
            ->with('success', 'Transaksi berhasil dihapus.');
    }

    /**
     * Generate payment schedule for a transaction.
     */
    protected function generatePaymentSchedule(SalesTransaction $transaction): void
    {
        $baseDate = $transaction->transaction_date;

        // Generate DP payment schedule
        for ($i = 1; $i <= $transaction->dp_installments; $i++) {
            $dueDate = $baseDate->copy()->addMonths($i - 1);
            Payment::create([
                'payment_code' => Payment::generatePaymentCode(),
                'sales_transaction_id' => $transaction->id,
                'payment_type' => 'dp',
                'installment_number' => $i,
                'due_date' => $dueDate->format('Y-m-d'),
                'amount_due' => $transaction->dp_monthly,
                'status' => 'pending',
            ]);
        }

        // Generate credit payment schedule
        $creditStartMonth = $transaction->dp_installments;
        for ($i = 1; $i <= $transaction->credit_installments; $i++) {
            $dueDate = $baseDate->copy()->addMonths($creditStartMonth + $i - 1);
            Payment::create([
                'payment_code' => Payment::generatePaymentCode(),
                'sales_transaction_id' => $transaction->id,
                'payment_type' => 'credit',
                'installment_number' => $i,
                'due_date' => $dueDate->format('Y-m-d'),
                'amount_due' => $transaction->credit_monthly,
                'status' => 'pending',
            ]);
        }
    }
}