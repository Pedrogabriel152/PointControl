<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserControllerr extends Controller
{
    public function create(Request $request) {
        // Validations

        if(!$request->name) {
            return response()->json(['message' => 'O campo nome não pode estar vazio'], 402);
        }

        if(!$request->email) {
            return response()->json(['message' => 'O campo email não pode estar vazio'], 402);
        }

        if(!$request->password) {
            return response()->json(['message' => 'O campo senha não pode estar vazio'], 402);
        }

        if(!$request->name) {
            return response()->json(['message' => 'O campo de confrimação da senha não pode estar vazio'], 402);
        }

        $newUser = new User($request->all());
        
        try {
            
            $newUser->create();

            return response()->json($newUser);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao criar usuário, tente novamente'], 500);
        }
    }
}
