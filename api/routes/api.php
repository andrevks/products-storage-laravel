<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->name('auth.')->group(function($router) {

    $router->get('check-token', [AuthController::class, 'check'])->name('check');

    $router->post('login', [AuthController::class, 'login'])->name('login');

    $router->middleware('api.jwt')
    ->get('logout', [AuthController::class, 'logout'])->name('logout');

    $router->middleware('api.jwt')
    ->get('me', [AuthController::class, 'me']);

});

Route::middleware('api.jwt')->group(function($router) {

    $router->apiResource('products', ProductController::class);

    $router->apiResource('categories', CategoryController::class);

});


