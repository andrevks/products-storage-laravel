<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name(),
            'qty' => $this->faker->randomDigit(),
            'unit_price' => $this->faker->randomFloat(1), // password
        ];
    }
}
