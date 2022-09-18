<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{

    private $product;

    public function __construct(Product $product) {
        $this->product = $product;
    }


    public function index(){
        // $user =  auth('api')->user();

       return $this->product->with('category')->get();
    }

}
