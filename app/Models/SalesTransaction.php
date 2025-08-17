<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\SalesTransaction
 *
 * @property int $id
 * @property string $transaction_code
 * @property int $property_id
 * @property int $customer_id
 * @property int $sales_agent_id
 * @property \Illuminate\Support\Carbon $transaction_date
 * @property float $total_price
 * @property float $down_payment
 * @property int $dp_installments
 * @property float|null $dp_monthly
 * @property float $remaining_balance
 * @property int $credit_installments
 * @property float $credit_monthly
 * @property float $interest_rate
 * @property string $status
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Property $property
 * @property-read \App\Models\Customer $customer
 * @property-read \App\Models\User $salesAgent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Payment> $payments
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereCreditInstallments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereCreditMonthly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereDownPayment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereDpInstallments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereDpMonthly($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereInterestRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction wherePropertyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereRemainingBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereSalesAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereTotalPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereTransactionCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereTransactionDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesTransaction whereUpdatedAt($value)
 * @method static \Database\Factories\SalesTransactionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class SalesTransaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'transaction_code',
        'property_id',
        'customer_id',
        'sales_agent_id',
        'transaction_date',
        'total_price',
        'down_payment',
        'dp_installments',
        'dp_monthly',
        'remaining_balance',
        'credit_installments',
        'credit_monthly',
        'interest_rate',
        'status',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'transaction_date' => 'datetime',
        'total_price' => 'decimal:2',
        'down_payment' => 'decimal:2',
        'dp_installments' => 'integer',
        'dp_monthly' => 'decimal:2',
        'remaining_balance' => 'decimal:2',
        'credit_installments' => 'integer',
        'credit_monthly' => 'decimal:2',
        'interest_rate' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the property that belongs to this transaction.
     */
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Get the customer that belongs to this transaction.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the sales agent that belongs to this transaction.
     */
    public function salesAgent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sales_agent_id');
    }

    /**
     * Get the payments for this transaction.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get DP payments for this transaction.
     */
    public function dpPayments(): HasMany
    {
        return $this->hasMany(Payment::class)->where('payment_type', 'dp');
    }

    /**
     * Get credit payments for this transaction.
     */
    public function creditPayments(): HasMany
    {
        return $this->hasMany(Payment::class)->where('payment_type', 'credit');
    }

    /**
     * Get total paid amount.
     */
    public function getTotalPaidAttribute(): float
    {
        return $this->payments()->sum('amount_paid');
    }

    /**
     * Get remaining balance after payments.
     */
    public function getRemainingDebtAttribute(): float
    {
        return $this->total_price - $this->getTotalPaidAttribute();
    }

    /**
     * Generate unique transaction code.
     */
    public static function generateTransactionCode(): string
    {
        $prefix = 'TXN';
        $date = now()->format('Ymd');
        $sequence = static::whereDate('created_at', now())->count() + 1;
        return $prefix . $date . sprintf('%04d', $sequence);
    }
}