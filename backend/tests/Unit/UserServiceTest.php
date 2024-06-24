<?php

namespace Tests\Unit;

use App\Models\User;
use App\Repositories\UserRepositoryInterface;
use App\Services\UserService;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserServiceTest extends TestCase
{
    protected $userRepositoryMock;
    protected $userService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->userRepositoryMock = $this->createMock(UserRepositoryInterface::class);

        $this->userService = new UserService($this->userRepositoryMock);
    }

    #[Test]
    public function it_returns_all_users()
    {
        $users = User::factory()->count(3)->make();

        $this->userRepositoryMock->expects($this->once())
            ->method('all')
            ->willReturn($users);

        $result = $this->userService->all();

        $this->assertEquals($users, $result);
    }

    #[Test]
    public function it_returns_paginated_list_of_users()
    {
        $perPage = 10;

        $users = User::factory()->count($perPage)->make();

        // Create a LengthAwarePaginator instance
        $paginator = new \Illuminate\Pagination\LengthAwarePaginator(
            $users,
            $users->count(), // Total
            $perPage,
            1 // Current page
        );

        $this->userRepositoryMock->expects($this->once())
            ->method('paginate')
            ->with($perPage)
            ->willReturn($paginator);

        $result = $this->userService->paginate($perPage);

        $this->assertEquals($perPage, $result->count());
    }

    #[Test]
    public function it_finds_an_existing_user()
    {
        $userId = 1;
        $user = User::factory()->make(['id' => $userId]);

        $this->userRepositoryMock->expects($this->once())
            ->method('find')
            ->with($userId)
            ->willReturn($user);

        $result = $this->userService->find($userId);

        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals($userId, $result->id);
    }

    #[Test]
    public function it_creates_a_new_user()
    {
        $userData = ['name' => 'John Doe'];

        $this->userRepositoryMock->expects($this->once())
            ->method('create')
            ->with($userData)
            ->willReturn(User::factory()->make($userData));

        $result = $this->userService->create($userData);

        $this->assertInstanceOf(User::class, $result);
    }

    #[Test]
    public function it_updates_an_existing_user()
    {
        $userId = 1;
        $userData = ['name' => 'Jane Doe'];

        $this->userRepositoryMock->expects($this->once())
            ->method('update')
            ->with($userId, $userData)
            ->willReturn(User::factory()->make(array_merge(['id' => $userId], $userData)));

        $result = $this->userService->update($userId, $userData);

        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals($userId, $result->id);
        $this->assertEquals($userData['name'], $result->name);
    }

    #[Test]
    public function it_deletes_an_existing_user()
    {
        $userId = 1;

        $this->userRepositoryMock->expects($this->once())
            ->method('delete')
            ->with($userId)
            ->willReturn(true);

        $result = $this->userService->delete($userId);

        $this->assertTrue($result);
    }
}
