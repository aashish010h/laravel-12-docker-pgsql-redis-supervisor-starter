<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test 1: Successful login returns user and token
     */
    public function test_user_can_login_successfully()
    {
        // Create a user with known password
        $password = 'secretpassword';
        $user = User::factory()->create([
            'email' => 'aashish.giri@test.com',
            'password' => Hash::make($password),
        ]);

        // Attempt login
        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => $password,
            'device_name' => 'TestDevice',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email'],
                'token',
                'token_type',
            ]);

        // Ensure token is stored in DB
        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_id' => $user->id,
            'name' => 'AuthToken',
        ]);
    }

    /**
     * Test 2: Login fails with invalid credentials
     */
    public function test_login_fails_with_invalid_credentials()
    {
        User::factory()->create(['email' => 'aashish.giri@test.com']);

        $response = $this->postJson('/api/login', [
            'email' => 'aashish.giri@test.com',
            'password' => 'wrong-password',
            'device_name' => 'TestDevice',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('email');

        // No token should exist for failed login
        $this->assertDatabaseCount('personal_access_tokens', 0);
    }

    /**
     * Test 3: Access protected user endpoint with valid token
     */
    public function test_can_access_protected_user_endpoint()
    {
        $user = User::factory()->create();

        // Authenticate user for test
        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('/api/user');

        $response->assertStatus(200);
    }

    /**
     * Test 4: Logout revokes token
     */
    public function test_user_can_logout_and_revoke_token()
    {
        $user = User::factory()->create();
        $token = $user->createToken('AuthToken')->plainTextToken;

        // Authenticate user in test
        Sanctum::actingAs($user, ['*']);

        // Logout
        $response = $this->postJson('/api/logout');

        $response->assertStatus(200)
            ->assertJson(['message' => 'Logged out successfully.']);

        // Token should be deleted from DB
        $this->assertDatabaseMissing('personal_access_tokens', [
            'tokenable_id' => $user->id,
            'token' => hash('sha256', $token),
        ]);
    }

    /**
     * Test 5: Unauthenticated user cannot access protected user endpoint
     */
    public function test_unauthenticated_user_cannot_access_user_endpoint()
    {
        // ACT: Attempt to access the protected /api/user route without a token
        $response = $this->getJson('/api/user');

        // ASSERT: Should return 401 Unauthorized
        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    }
}
