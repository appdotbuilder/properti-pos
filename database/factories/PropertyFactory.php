<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['rumah', 'apartment', 'ruko', 'kavling', 'villa']);
        
        return [
            'project_id' => Project::factory(),
            'unit_number' => fake()->unique()->regexify('[A-Z]{2}-[0-9]{3}'),
            'type' => $type,
            'land_area' => $type === 'apartment' ? null : fake()->numberBetween(100, 500),
            'building_area' => fake()->numberBetween(45, 300),
            'price' => fake()->numberBetween(300000000, 2000000000),
            'bedrooms' => fake()->numberBetween(1, 5),
            'bathrooms' => fake()->numberBetween(1, 3),
            'floors' => fake()->numberBetween(1, 3),
            'status' => fake()->randomElement(['available', 'reserved', 'sold', 'maintenance']),
            'description' => fake()->paragraph(),
            'facilities' => fake()->words(5, true),
        ];
    }
}