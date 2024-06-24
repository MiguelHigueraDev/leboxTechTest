<?php

namespace App\Http\Controllers;

use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * Class AuthController
 * @package App\Http\Controllers
 *
 * This class is responsible for handling the authentication of users.
 * It contains the methods for logging in and creating a new JWT.
 */
class AuthController extends Controller
{
    // Token expires in 3 hours
    const EXPIRATION_TIME = 60 * 60;

    /**
     * Logs in a user and returns a JWT.
     * @param Request $request Request object containing user credentials (email and password).
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();

        // Return 401 response if user is not found or password is incorrect
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $this->createToken($user);

        return response()->json(['token' => $token, 'expiresIn' => self::EXPIRATION_TIME], 200);
    }

    /**
     * Creates a new JWT for the given user.
     * @param User $user
     * @return string The generated JWT. Token is valid for 1 hour.
     */
    protected function createToken(User $user)
    {
        // Check that JWT_SECRET is valid
        if (!env('JWT_SECRET')) {
            return response()->json(['message' => 'JWT_SECRET not defined in configuration'], 500);
        }

        $payload = [
            'iss' => 'lebox', // Issuer of the token
            'sub' => $user->id, // Token subject
            'iat' => time(), // Time when JWT was issued
            'exp' => time() + self::EXPIRATION_TIME // Expiration time
        ];

        $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS512');

        return $jwt;
    }
}
