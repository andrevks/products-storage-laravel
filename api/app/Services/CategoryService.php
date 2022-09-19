<?php

namespace App\Services;

use Api\ApiMessage;
use App\Exceptions\CategoryInvalidException;
use App\Models\Category;
use App\Models\User;

class CategoryService
{
    private $category;

    public function __construct(Category $category) {
        $this->category = $category;
    }


    public function getAll(){
        $categories = $this->category->with('products')->get();
        return  response()->json(ApiMessage::message(
            true,
            200,
            '',
            $categories
        ), 200);
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

       $products = $category->products()->createMany($products);

        return response()->json(ApiMessage::message(
            true,
            200,
            '',
            $products
        ), 200);









        // return->products()->saveMany($products);
    }
}
