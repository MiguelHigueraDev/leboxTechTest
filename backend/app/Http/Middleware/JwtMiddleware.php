<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{

    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        try {
            $credentials = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS512'));
        } catch (Exception $e) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $user = User::find($credentials->sub);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        Auth::login($user);

        return $next($request);
    }
}
