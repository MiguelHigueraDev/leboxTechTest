<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        // Create a test user
        $this->user = User::factory()->create([
            'email' => 'testzzzzz@example.com',
            'password' => Hash::make('password123'),
        ]);
    }

    #[Test]
    public function it_returns_a_token_with_valid_credentials()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'testzzzzz@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token', 'expiresIn']);
    }

    #[Test]
    public function it_returns_an_error_with_invalid_credentials()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Invalid credentials']);
    }
}
