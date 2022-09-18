<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;


// Route::post('login', [AuthController::class, 'login'])->name('login');

Route::prefix('auth')->name('auth.')->group(function($router) {

    $router->post('login', [AuthController::class, 'login'])->name('login');
    $router->middleware('api.jwt')
    ->get('logout', [AuthController::class, 'logout'])->name('logout');


});

Route::middleware('api.jwt')->group(function($router) {

    $router->apiResource('products', ProductController::class);
    $router->apiResource('categories', ProductController::class);

});


