<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * INterface UserRepositoryInterface
 *
 * @package App\Repositories
 * This interface is used to define the methods that the UserRepository class must implement.
 */
interface UserRepositoryInterface
{
    /**
     * Retrieve all users.
     *
     * @return Collection Collection with all users.
     */
    public function all(): Collection;

    /**
     * Retrieve paginated users.
     *
     * @param int $perPage The number of users per page. (default: 15)
     * @return LengthAwarePaginator The users paginated.
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator;

    /**
     * Retrieve a user by its id.
     *
     * @param int $id
     * @return User|null The user if found, null otherwise.
     */
    public function find(int $id): ?User;

    /**
     * Create a new user.
     *
     * @param array $data
     * @return User The created user.
     */
    public function create(array $data): User;

    /**
     * Update an existing user.
     *
     * @param int $id
     * @param array $data
     * @return User The updated user.
     */
    public function update(int $id, array $data): User;

    /**
     * Delete a user.
     *
     * @param int $id
     * @return bool Whether the user was deleted successfully or not.
     */
    public function delete(int $id): bool;
}
