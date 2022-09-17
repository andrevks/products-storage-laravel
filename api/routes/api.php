<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


// Route::post('login', [AuthController::class, 'login'])->name('login');

Route::middleware('api')
    ->prefix('auth')->name('auth.')->group(function($router) {

        $router->post('login', [AuthController::class, 'login'])->name('login');
        $router->post('register', [AuthController::class, 'register'])->name('register');

});
