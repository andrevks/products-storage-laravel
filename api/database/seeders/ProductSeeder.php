<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::factory(50)
                 ->for(Category::factory())
                 ->create([
                    'category' => 'Computador'
                 ]);
    }
}
