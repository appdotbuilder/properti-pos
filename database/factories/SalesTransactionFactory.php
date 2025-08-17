<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\Customer;
use App\Models\User;
use App\Models\SalesTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SalesTransaction>
 */
class SalesTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalPrice = fake()->numberBetween(300000000, 2000000000);
        $downPayment = $totalPrice * fake()->randomFloat(2, 0.10, 0.30); // 10-30% DP
        $remainingBalance = $totalPrice - $downPayment;
        $dpInstallments = fake()->numberBetween(1, 24);
        $creditInstallments = fake()->numberBetween(60, 96);
        $dpMonthly = $dpInstallments > 1 ? $downPayment / $dpInstallments : $downPayment;
        $creditMonthly = $remainingBalance / $creditInstallments;

        return [
            'transaction_code' => SalesTransaction::generateTransactionCode(),
            'property_id' => Property::factory(),
            'customer_id' => Customer::factory(),
            'sales_agent_id' => User::factory()->create(['role' => 'sales_agent'])->id,
            'transaction_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'total_price' => $totalPrice,
            'down_payment' => $downPayment,
            'dp_installments' => $dpInstallments,
            'dp_monthly' => $dpMonthly,
            'remaining_balance' => $remainingBalance,
            'credit_installments' => $creditInstallments,
            'credit_monthly' => $creditMonthly,
            'interest_rate' => fake()->randomFloat(2, 5, 12),
            'status' => fake()->randomElement(['active', 'completed', 'cancelled']),
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}