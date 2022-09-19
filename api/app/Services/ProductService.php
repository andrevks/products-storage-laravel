<?php

namespace App\Services;

use Api\ApiMessage;
use App\Models\Product;
use App\Models\User;

class ProductService
{

    private $product;

    public function __construct(Product $product) {
        $this->product = $product;
    }


    public function getAllByUser(User $user){
       $products = $this->product
              ->when($user, function($query, $user) {
                    $query->where('user_id', $user->id);
                })
                ->paginate(10);


        return response()->json(ApiMessage::message(
            true,
            200,
            '',
            $products
        ), 200);
    }

}
