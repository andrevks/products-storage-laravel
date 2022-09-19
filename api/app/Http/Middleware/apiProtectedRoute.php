<?php

namespace App\Http\Middleware;

use Api\ApiMessage;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\UserNotDefinedException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class apiProtectedRoute extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $exception) {
            if ($exception instanceof TokenInvalidException) {
                return response()->json(ApiMessage::message(
                    false,
                    401,
                    'Token inválido.'
                ), 401);
            } else if ($exception instanceof TokenExpiredException) {
                return response()->json(ApiMessage::message(
                    false,
                    401,
                    'Token expirado.'
                ), 401);
            } else if ($exception instanceof TokenBlacklistedException) {
                return response()->json(ApiMessage::message(
                    false,
                    401,
                    'Token blacklisted.'
                ), 401);
            } else if ($exception instanceof UserNotDefinedException) {
                return response()->json(ApiMessage::message(
                    false,
                    401,
                    'Usuário não definido.'
                ), 401);
            } else {
                return response()->json(ApiMessage::message(
                    false,
                    401,
                    $exception->getMessage()
                ), 401);
            }
        }
        return $next($request);
    }
}
