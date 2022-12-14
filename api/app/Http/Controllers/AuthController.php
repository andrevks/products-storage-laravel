<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthLoginRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;


class AuthController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(AuthLoginRequest $request){
        $input = $request->validated();

        $token = $this->authService->login($input['email'], $input['password']);

        $loggedUser = new UserResource(auth('api')->user());

        return ($loggedUser)->additional($token);
    }

    public function me(){
        return $this->authService->me();
    }

    public function logout(){
        return $this->authService->logout();
    }
}
