<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    // User data for testing password validation
    protected $userData;

    // JWT token for authentication
    protected $token;

    protected function setUp(): void
    {
        parent::setUp();

        // Create some users for testing
        User::factory()->count(10)->create();

        $this->userData = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => 'Password1!'
        ];

        /// Create a user to authenticate
        User::factory()->create([
            'email' => $this->userData['email'],
            'password' => bcrypt($this->userData['password'])
        ]);

        // Log into test user
        $response = $this->postJson('/api/login', [
            'email' => $this->userData['email'],
            'password' => $this->userData['password']
        ]);

        $this->token = $response->json('token');
    }

    protected function headers()
    {
        return ['Authorization' => "Bearer {$this->token}"];
    }

    #[Test]
    public function it_returns_paginated_users()
    {
        $response = $this->getJson('/api/users', $this->headers());

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'email', 'created_at', 'updated_at']
                ],
                'links',
                'total'
            ]);
    }

    #[Test]
    public function it_creates_user()
    {
        $userData = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => 'Password1!'
        ];

        $response = $this->postJson('/api/users', $userData, $this->headers());

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id', 'name', 'email', 'created_at', 'updated_at'
            ]);

        $this->assertDatabaseHas('users', [
            'email' => $userData['email']
        ]);
    }

    #[Test]
    public function it_rejects_creation_with_invalid_passwords()
    {
        $invalidPasswords = [
            'password',             // no uppercase, number, special character
            'PASSWORD',             // no lowercase, number, special character
            'Password',             // no number, special character
            'Password1',            // no special character
            'password1!',           // no uppercase
            'PASSWORD1!',           // no lowercase
            'Passw1!',              // less than 8 characters
            'Password1!Password1!Password1!Password1!', // more than 32 characters
        ];

        foreach ($invalidPasswords as $password) {
            $userData = array_merge($this->userData, ['password' => $password]);
            $response = $this->postJson('/api/users', $userData, $this->headers());
            $response->assertStatus(422)
                ->assertJsonValidationErrors('password');
        }
    }

    #[Test]
    public function it_allows_creation_with_valid_passwords()
    {
        $validPasswords = [
            'Password1!',
            'Abcdef1!',
            'P@ssw0rd1!',
            'ValidPassword123!',
        ];

        foreach ($validPasswords as $password) {
            $userData = array_merge($this->userData, ['password' => $password, 'email' => $this->faker->unique()->safeEmail]);
            $response = $this->postJson('/api/users', $userData, $this->headers());
            $response->assertStatus(201)
                ->assertJsonStructure([
                    'id', 'name', 'email', 'created_at', 'updated_at'
                ]);
        }
    }

    #[Test]
    public function it_handles_updates_with_valid_and_invalid_passwords()
    {
        $user = User::factory()->create();

        $invalidPasswords = [
            'password',             // no uppercase, number, special character
            'PASSWORD',             // no lowercase, number, special character
            'Password',             // no number, special character
            'Password1',            // no special character
            'password1!',           // no uppercase
            'PASSWORD1!',           // no lowercase
            'Passw1!',              // less than 8 characters
            'Password1!Password1!Password1!Password1!', // more than 32 characters
        ];

        foreach ($invalidPasswords as $password) {
            $updatedData = array_merge($this->userData, ['password' => $password, 'email' => $user->email]);
            $response = $this->putJson("/api/users/{$user->id}", $updatedData, $this->headers());
            $response->assertStatus(422)
                ->assertJsonValidationErrors('password');
        }

        $validPasswords = [
            'Password1!',
            'Abcdef1!',
            'P@ssw0rd1!',
            'ValidPassword123!',
            'Password1!#$@%&/()-_',     // valid password with all special characters
        ];

        foreach ($validPasswords as $password) {
            $updatedData = array_merge($this->userData, ['password' => $password, 'email' => $user->email]);
            $response = $this->putJson("/api/users/{$user->id}", $updatedData, $this->headers());
            $response->assertStatus(201)
                ->assertJsonStructure([
                    'id', 'name', 'email', 'created_at', 'updated_at'
                ]);
        }
    }

    #[Test]
    public function it_returns_user()
    {
        $user = User::factory()->create();

        $response = $this->getJson("/api/users/{$user->id}", $this->headers());

        $response->assertStatus(200)
            ->assertJson([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]);
    }

    #[Test]
    public function it_modifies_user()
    {
        $user = User::factory()->create();
        $updatedData = [
            'name' => 'Updated Name',
            'email' => $user->email, // same email to pass unique validation
            'password' => 'UpdatedPassword1!'
        ];

        $response = $this->putJson("/api/users/{$user->id}", $updatedData, $this->headers());

        $response->assertStatus(201)
            ->assertJson([
                'id' => $user->id,
                'name' => 'Updated Name'
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name'
        ]);
    }

    #[Test]
    public function it_deletes_user()
    {
        $user = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$user->id}", [], $this->headers());

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'User deleted successfully'
            ]);

        $this->assertDatabaseMissing('users', [
            'id' => $user->id
        ]);
    }

    #[Test]
    public function it_does_not_delete_non_existing_user()
    {
        $response = $this->deleteJson("/api/users/9999", [], $this->headers());

        $response->assertStatus(404)
            ->assertJson([
                'message' => 'User not found'
            ]);
    }

    #[Test]
    public function it_does_not_update_non_existing_user()
    {
        $response = $this->putJson("/api/users/9999", [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'password' => 'UpdatedPassword1!'
        ], $this->headers());

        $response->assertStatus(404)
            ->assertJson([
                'message' => 'User not found'
            ]);
    }

    #[Test]
    public function it_does_not_return_non_existing_user()
    {
        $response = $this->getJson("/api/users/9999", $this->headers());

        $response->assertStatus(404)
            ->assertJson([
                'message' => 'User not found'
            ]);
    }

    #[Test]
    public function it_does_not_return_users_without_credentials()
    {
        $response = $this->getJson('/api/users');

        $response->assertStatus(401);
    }

    #[Test]
    public function it_does_not_create_user_without_credentials()
    {
        $response = $this->postJson('/api/users', $this->userData);

        $response->assertStatus(401);
    }
}
