<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Repositories\ProjetoRepository;
use Illuminate\Http\Request;

class ProjetoController extends Controller
{
    public function create(Request $request) {
        // Validations

        if(!$request->name) {
            return response()->json(['message' => 'O campo nome não pode estar vazio'], 402);
        }

        if(!$request->status) {
            return response()->json(['message' => 'O status é obrigatorio']);
        }

        try {
            $newProject = ProjetoRepository::create($request);

            if(!$newProject) {
                return response()->json(['message' => 'Erro ao criar novo projeto, tente novamente mais tarde'], 500);
            }

            return response()->json($newProject, 200);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao criar novo projeto, tente novamente mais tarde'], 500);
        }

    }

    public function clockIn(Request $request, int $id){
        $project = ProjetoRepository::updateClockIn($request->acao, $id, $request);

        if(!$project){
            return response()->json(['message' => 'Erro ao iniciar trabalho, tente novamente'], 500);
        }
    }
}
