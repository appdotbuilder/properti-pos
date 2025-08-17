<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\Customer;
use App\Models\SalesTransaction;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Basic statistics
        $stats = [
            'total_properties' => Property::count(),
            'available_properties' => Property::where('status', 'available')->count(),
            'sold_properties' => Property::where('status', 'sold')->count(),
            'total_customers' => Customer::where('status', 'active')->count(),
            'total_transactions' => SalesTransaction::where('status', 'active')->count(),
            'pending_payments' => Payment::where('status', 'pending')->count(),
            'overdue_payments' => Payment::overdue()->count(),
        ];

        // Recent transactions
        $recentTransactions = SalesTransaction::with(['property.project', 'customer', 'salesAgent'])
            ->latest()
            ->limit(5)
            ->get();

        // Upcoming payments (next 30 days)
        $upcomingPayments = Payment::with(['salesTransaction.property.project', 'salesTransaction.customer'])
            ->where('status', 'pending')
            ->whereBetween('due_date', [now(), now()->addDays(30)])
            ->orderBy('due_date')
            ->limit(10)
            ->get();

        // Monthly sales summary (current year)
        $monthlySales = SalesTransaction::selectRaw('
                strftime("%m", transaction_date) as month,
                COUNT(*) as transaction_count,
                SUM(total_price) as total_amount
            ')
            ->whereYear('transaction_date', now()->year)
            ->where('status', 'active')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Property type distribution
        $propertyTypes = Property::selectRaw('type, COUNT(*) as count')
            ->groupBy('type')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentTransactions' => $recentTransactions,
            'upcomingPayments' => $upcomingPayments,
            'monthlySales' => $monthlySales,
            'propertyTypes' => $propertyTypes,
        ]);
    }
}