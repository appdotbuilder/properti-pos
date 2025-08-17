<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'identity_number' => fake()->unique()->numerify('################'),
            'address' => fake()->address(),
            'occupation' => fake()->jobTitle(),
            'monthly_income' => fake()->numberBetween(5000000, 50000000),
            'marital_status' => fake()->randomElement(['single', 'married', 'divorced', 'widowed']),
            'birth_date' => fake()->date('Y-m-d', '-20 years'),
            'emergency_contact_name' => fake()->name(),
            'emergency_contact_phone' => fake()->phoneNumber(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}