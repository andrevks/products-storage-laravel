<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
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

        User::all()->each(function($user){
            $user->products()->saveMany(
                Product::factory(500)->for(Category::factory())
                ->create([
                   'category' => 'Computador'
                ])
            );
        });



    }
}
