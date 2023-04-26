<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Repositories\UserRepository;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;

class UserControllerr extends Controller
{

    // Criando um usuário
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

    // Fazendo login de um um usuário
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

    // Buscando informações de um usuário
    public function edit(Request $request) {
        $user = $request->user();
        return response()->json($user, 200);
    }

    // Update do Usuário
    public function update(Request $request) {
        $user = $request->user();
        // Validations

        if(!$request->name) {
            return response()->json(['message' => 'O campo nome não pode estar vazio'], 402);
        }
        $user->name = $request->name;

        if(!$request->email) {
            return response()->json(['message' => 'O campo email não pode estar vazio'], 402);
        }
        $user->email = $request->email;

        if(!$request->valor_hora) {
            return response()->json(['message' => 'O campo de valor ho0ra não pode estar vazio'], 402);
        }
        $user->valor_hora = floatval($request->valor_hora);

        if($request->password){
            if(!$request->password) {
                return response()->json(['message' => 'O campo senha não pode estar vazio'], 402);
            }
    
            if(!$request->confirmpassword) {
                return response()->json(['message' => 'O campo de confrimação da senha não pode estar vazio'], 402);
            }
    
            if($request->confirmpassword !== $request->password) {
                return response()->json(['message' => 'As senhas precisam ser identicas'], 402);
            }

            $hash = password_hash($request->password, PASSWORD_BCRYPT);
            $user->password = $hash;
        }

        if($request->hasFile('image') && $request->file('image')->isValid()){

            $image = $request->image;

            $extension = $image->extension();

            $imageName = md5($image->image->getClientOriginalName() . strtotime("now")).".".$extension;

            $image->image->move(public_path("img/users/$request->name"), $imageName);

            $user->image = $imageName;
        }
    }

    // Realizando o logout do usuário
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
    }
}
