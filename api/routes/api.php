<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;


// Route::post('login', [AuthController::class, 'login'])->name('login');

Route::prefix('auth')->name('auth.')->group(function($router) {

    $router->post('login', [AuthController::class, 'login'])->name('login');
    // $router->post('register', [AuthController::class, 'register'])->name('register');

});

Route::middleware('api.jwt')->name('products.')->group(function($router) {

    $router->apiResource('products', ProductController::class);
    $router->apiResource('categories', ProductController::class);

});


