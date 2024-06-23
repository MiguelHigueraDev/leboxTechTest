<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class UserRepository
 *
 * @package App\Repositories
 * This class is used to interact with the users table in the database.
 */
class UserRepository implements UserRepositoryInterface
{
    /**
     * Retrieve all users.
     *
     * @return Collection All users.
     */
    public function all(): Collection
    {
        return User::all();
    }

    /**
     * Retrieve a user by its id.
     *
     * @param int $id The user ID.
     * @return User|null The user if found, null otherwise.
     */
    public function find(int $id): ?User
    {
        return User::find($id);
    }

    /**
     * Create a new user.
     *
     * @param array $data The user data.
     * @return User The created user.
     */
    public function create(array $data): User
    {
        return User::create($data);
    }

    /**
     * Update an existing user.
     *
     * @param int $id The user ID.
     * @param array $data
     * @return User The updated user.
     */
    public function update(int $id, array $data): User
    {
        $user = User::find($id);
        $user->update($data);

        return $user;
    }

    /**
     * Delete a user.
     *
     * @param int $id The user ID.
     * @return bool Whether the user was deleted successfully or not.
     */
    public function delete(int $id): bool
    {
        return User::destroy($id);
    }
}
