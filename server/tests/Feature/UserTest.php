<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;

class UserTest extends TestCase
{
       /**
     * A basic test example.
     */
    public function test_o_registro_de_usuario_deve_dar_sucesso(): void
    {

        DB::beginTransaction();
        DB::delete('DELETE FROM users');
        $response = $this->get('/create');

        $response->assertStatus(200);
        
        DB::rollBack();
    }
}