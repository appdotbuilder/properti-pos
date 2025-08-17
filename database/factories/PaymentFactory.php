<?php

namespace Database\Factories;

use App\Models\SalesTransaction;
use App\Models\User;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amountDue = fake()->numberBetween(1000000, 50000000);
        $status = fake()->randomElement(['pending', 'partial', 'paid', 'overdue']);
        $amountPaid = $status === 'paid' ? $amountDue : ($status === 'partial' ? $amountDue * 0.5 : 0);

        return [
            'payment_code' => Payment::generatePaymentCode(),
            'sales_transaction_id' => SalesTransaction::factory(),
            'payment_type' => fake()->randomElement(['dp', 'credit']),
            'installment_number' => fake()->numberBetween(1, 12),
            'due_date' => fake()->dateTimeBetween('-6 months', '+6 months'),
            'payment_date' => $status === 'paid' ? fake()->dateTimeBetween('-3 months', 'now') : null,
            'amount_due' => $amountDue,
            'amount_paid' => $amountPaid,
            'penalty_amount' => fake()->numberBetween(0, 1000000),
            'status' => $status,
            'payment_method' => $status === 'paid' ? fake()->randomElement(['transfer', 'cash', 'cheque']) : null,
            'receipt_number' => $status === 'paid' ? fake()->regexify('RCP[0-9]{8}') : null,
            'processed_by' => $status === 'paid' ? User::factory()->create(['role' => 'finance'])->id : null,
            'notes' => fake()->optional()->sentence(),
        ];
    }
}