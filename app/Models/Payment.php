<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Payment
 *
 * @property int $id
 * @property string $payment_code
 * @property int $sales_transaction_id
 * @property string $payment_type
 * @property int $installment_number
 * @property \Illuminate\Support\Carbon $due_date
 * @property \Illuminate\Support\Carbon|null $payment_date
 * @property float $amount_due
 * @property float $amount_paid
 * @property float $penalty_amount
 * @property string $status
 * @property string|null $payment_method
 * @property string|null $receipt_number
 * @property int|null $processed_by
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\SalesTransaction $salesTransaction
 * @property-read \App\Models\User|null $processor
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Payment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereAmountDue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereAmountPaid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereInstallmentNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment wherePaymentCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment wherePaymentDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment wherePaymentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment wherePenaltyAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereProcessedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereReceiptNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereSalesTransactionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment overdue()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment pending()
 * @method static \Database\Factories\PaymentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Payment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'payment_code',
        'sales_transaction_id',
        'payment_type',
        'installment_number',
        'due_date',
        'payment_date',
        'amount_due',
        'amount_paid',
        'penalty_amount',
        'status',
        'payment_method',
        'receipt_number',
        'processed_by',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'due_date' => 'datetime',
        'payment_date' => 'datetime',
        'amount_due' => 'decimal:2',
        'amount_paid' => 'decimal:2',
        'penalty_amount' => 'decimal:2',
        'installment_number' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the sales transaction that owns this payment.
     */
    public function salesTransaction(): BelongsTo
    {
        return $this->belongsTo(SalesTransaction::class);
    }

    /**
     * Get the user who processed this payment.
     */
    public function processor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    /**
     * Scope a query to only include overdue payments.
     */
    public function scopeOverdue($query)
    {
        return $query->where('due_date', '<', now())
                    ->whereIn('status', ['pending', 'partial']);
    }

    /**
     * Scope a query to only include pending payments.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Check if payment is overdue.
     */
    public function isOverdue(): bool
    {
        return $this->due_date < now() && in_array($this->status, ['pending', 'partial']);
    }

    /**
     * Get remaining amount to be paid.
     */
    public function getRemainingAmountAttribute(): float
    {
        return ($this->amount_due + $this->penalty_amount) - $this->amount_paid;
    }

    /**
     * Generate unique payment code.
     */
    public static function generatePaymentCode(): string
    {
        $prefix = 'PAY';
        $date = now()->format('Ymd');
        $sequence = static::whereDate('created_at', now())->count() + 1;
        return $prefix . $date . sprintf('%04d', $sequence);
    }
}