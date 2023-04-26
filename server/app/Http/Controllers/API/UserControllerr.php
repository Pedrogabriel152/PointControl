<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Repositories\UserRepository;
use App\Models\User;
use DateTime;
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

        if(!$request->valor_hora) {
            return response()->json(['message' => 'O campo de valor ho0ra não pode estar vazio'], 402);
        }

        if(!$request->password) {
            return response()->json(['message' => 'O campo senha não pode estar vazio'], 402);
        }

        if(!$request->confirmpassword) {
            return response()->json(['message' => 'O campo de confrimação da senha não pode estar vazio'], 402);
        }

        if($request->confirmpassword !== $request->password) {
            return response()->json(['message' => 'As senhas precisam ser identicas'], 402);
        }
        
        try {

            $newUser = UserRepository::create($request);

            if(!$newUser){
                return response()->json(['message' => 'Erro ao criar usuário, tente novamente'], 500);
            }

            $dataFutura = strtotime("2 hours");
            $dataExpiration = new DateTime(date('Y-m-d H:i',$dataFutura));

            $token = $newUser->createToken('Token',["*"], $dataExpiration);

            return response()->json(['token' => $token->plainTextToken], 200);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao criar usuário, tente novamente'], 500);
        }
    }

    public function login(Request $request) {

        if(!$request->email) {
            return response()->json(['message' => 'O campo email não pode estar vazio'], 402);
        }

        if(!$request->password) {
            return response()->json(['message' => 'O campo senha não pode estar vazio'], 402);
        }

        // Validation if user exist
        $userExist = UserRepository::verifyUserExist($request->email);

        if(!$userExist){
            return response()->json(['message' => "Usuário ou senha incorretos"], 404);
        }

        if(!password_verify($request->password, $userExist->password)){
            return response()->json(['message' => "Usuário ou senha incorretos"], 404);
        }

        $dataFutura = strtotime("2 hours");
        $dataExpiration = new DateTime(date('Y-m-d H:i',$dataFutura));

        $token = $userExist->createToken('Token',["*" => 72000], $dataExpiration);

        return response()->json(['token' => $token->plainTextToken], 200);
    }
}
