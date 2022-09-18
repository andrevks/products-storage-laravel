<?php

namespace App\Services;

use App\Models\Product;
use App\Models\User;

class ProductService
{

    private $product;

    public function __construct(Product $product) {
        $this->product = $product;
    }


    public function getAllByUser(User $user=null){
       return $this->product
            //   ->when($user, function($query, $user) {
            //         $query->where('user_id', $user->id);
            //     })
                ->get();
    }

}
