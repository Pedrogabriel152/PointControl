<?php

namespace App\Http\Repositories;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserRepository 
{
    public static function create(Request $request) {
        return DB::transaction(function () use ($request){
            $hash = password_hash($request->password, PASSWORD_BCRYPT);
            $newUser = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "valor_hora" => floatval($request->valor_hora),
                "password" => $hash,
                "image" => ""
            ]);

            return $newUser;
        });
    }

    public static function verifyUserExist(string $email) {
        $userExist = User::whereEmail($email)->first();

        return $userExist;
    }

    public static function update(object $user, object $userExist): void {
        $userExist->name = $user->name;
        $userExist->email = $user->email;
        $userExist->image = $user->image;
        $userExist->valor_hora = $user->valor_hora;
        $userExist->password = $user->password;

        $userExist->save();        
    }
}