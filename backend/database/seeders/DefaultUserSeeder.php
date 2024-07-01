<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Class DefaultUserSeeder
 * @package Database\Seeders
 * This class is used to seed the database with a default user.
 */
class DefaultUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::where('email', 'default@example.com')->exists()) {
            return;
        }

        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'default@example.com',
            'password' => Hash::make('password'),
        ]);
    }
}
