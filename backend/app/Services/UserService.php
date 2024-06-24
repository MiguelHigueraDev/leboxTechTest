<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Class UserService
 *
 * @package App\Services
 * This service is used to manage the users in the application.
 */
class UserService implements UserServiceInterface
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Retrieve all users.
     *
     * @return Collection Collection with all users.
     */
    public function all(): Collection
    {
        return $this->userRepository->all();
    }

    /**
     * Retrieve paginated users.
     *
     * @param int $perPage The number of users per page. (default: 15)
     * @return LengthAwarePaginator Paginated users.
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->userRepository->paginate($perPage);
    }

    /**
     * Retrieve a user by its id.
     *
     * @param int $id
     * @return User|null The user if found, null otherwise.
     */
    public function find(int $id): ?User
    {
        return $this->userRepository->find($id);
    }

    /**
     * Create a new user.
     *
     * @param array $data
     * @return User The created user.
     */
    public function create(array $data): User
    {
        return $this->userRepository->create($data);
    }

    /**
     * Update an existing user.
     *
     * @param int $id
     * @param array $data
     * @return User The updated user.
     */
    public function update(int $id, array $data): User
    {
        return $this->userRepository->update($id, $data);
    }

    /**
     * Delete a user.
     *
     * @param int $id
     * @return bool Whether the user was deleted successfully or not.
     */
    public function delete(int $id): bool
    {
        return $this->userRepository->delete($id);
    }
}
