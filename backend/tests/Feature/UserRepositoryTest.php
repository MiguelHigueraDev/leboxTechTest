<?php

namespace Tests\Feature;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected UserRepository $userRepository;

    public function setUp(): void
    {
        parent::setUp();

        $this->userRepository = app(UserRepository::class);
    }

    #[Test]
    public function it_can_retrieve_all_users(): void
    {
        User::factory()->count(3)->create();

        $users = $this->userRepository->all();

        $this->assertCount(3, $users);
    }

    #[Test]
    public function it_can_retrieve_a_user_by_id(): void
    {
        $user = User::factory()->create();

        $foundUser = $this->userRepository->find($user->id);

        $this->assertEquals($user->id, $foundUser->id);
    }

    #[Test]
    public function it_can_create_a_new_user(): void
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'test@gmail.com',
            'password' => bcrypt('password'),
        ];

        $user = $this->userRepository->create($userData);

        $this->assertInstanceOf(User::class, $user);
        $this->assertDatabaseHas('users', $userData);
        $this->assertEquals($userData['name'], $user->name);
        $this->assertEquals($userData['email'], $user->email);
    }

    #[Test]
    public function it_can_update_an_existing_user(): void
    {
        $user = User::factory()->create();
        $newData = [
            'name' => 'Jane Doe',
            'email' => 'updated@gmail.com'
        ];

        $updatedUser = $this->userRepository->update($user->id, $newData);

        $this->assertInstanceOf(User::class, $updatedUser);
        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Jane Doe']);
        $this->assertEquals('Jane Doe', $updatedUser->name);
        $this->assertEquals('updated@gmail.com', $updatedUser->email);
    }

    #[Test]
    public function it_can_delete_an_existing_user(): void
    {
        $user = User::factory()->create();

        $deleted = $this->userRepository->delete($user->id);

        $this->assertEquals(1, $deleted);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
