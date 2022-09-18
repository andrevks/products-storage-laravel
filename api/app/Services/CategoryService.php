<?php

namespace App\Services;

use App\Exceptions\CategoryInvalidException;
use App\Models\Category;
use App\Models\User;

use function PHPSTORM_META\map;

class CategoryService
{
    private $category;

    public function __construct(Category $category) {
        $this->category = $category;
    }


    public function getAll(){
        return $this->category->with('products')->get();
    }

    public function store(
        User $user,
        $products = [],
        $category
    ){

        //create a category
        //take the name, pass the title of the category it to all products on the category
        //Create a relation of the product with the category
        $category = $this->category->firstOrCreate(['title' => $category]);

        if(!$category){
            throw new CategoryInvalidException('Error to create category.');
        }

        // $newProducts = $products.map( value => () );
        foreach($products as $product){
            // $product['category'] = $category->title;
            $newProducts[] = [
                'title' => $product['title'],
                'qty' => $product['qty'],
                'unit_price' => $product['unit_price'],
                'category' => $product['category'],
                'user_id' => $user->id
            ];
        }

       return $category->products()->createMany($products);







        // return->products()->saveMany($products);
    }
}
