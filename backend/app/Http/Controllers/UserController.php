<?php

namespace App\Http\Controllers;

use App\Services\UserServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    protected $userService;

    // Validate that the password has at least one uppercase letter, one lowercase letter, one number, and one special character.
    const PASSWORD_REGEX = 'regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/';

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the users.
     *
     * @param Request $request The request object with pagination parameters.
     * @return Response The users paginated.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 15);
        $users = $this->userService->paginate($perPage);
        return response()->json($users);
    }

    /**
     * Store a newly created user in storage.
     *
     * @param Request $request The request object with the user data.
     * @return Response The created user.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => [
                    'required',
                    'string',
                    'min:8',
                    'max:32',
                    self::PASSWORD_REGEX,
                ],
            ]);

            $user = $this->userService->create($validated);

            return response()->json($user, 201);
        } catch (ValidationException $e) {
            // Return validation errors
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Display the specified user.
     *
     * @param int $id The user ID.
     * @return Response The user if found, error 404 otherwise.
     */
    public function show($id)
    {
        $user = $this->userService->find($id);
        if ($user) {
            return response()->json($user);
        }
        return response()->json(['message' => 'User not found'], 404);
    }

    /**
     * Update the specified user in storage.
     *
     * @param Request $request The request object with the user data.
     * @param int $id The user ID.
     * @return Response
     */
    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'email' => [
                    'required',
                    'email',
                    // Ignore the current user when checking for unique email
                    Rule::unique('users')->ignore($id),
                ],
                'password' => [
                    'required',
                    'string',
                    'min:8',
                    'max:32',
                    self::PASSWORD_REGEX,
                ],
            ]);

            // Check if user exists before updating
            $user = $this->userService->find($id);
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $user = $this->userService->update($id, $validated);

            return response()->json($user, 201);
        } catch (ValidationException $e) {
            // Return validation errors
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Remove the specified user from storage.
     *
     * @param int $id The user ID.
     * @return Response The result of the operation. (error 404 if user not found)
     */
    public function destroy($id)
    {
        $deleted = $this->userService->delete($id);
        if ($deleted) {
            return response()->json(['message' => 'User deleted successfully']);
        }
        return response()->json(['message' => 'User not found'], 404);
    }
}
