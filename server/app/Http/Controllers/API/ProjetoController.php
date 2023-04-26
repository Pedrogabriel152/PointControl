<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Repositories\ProjetoRepository;
use App\Models\Projeto;
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
            return response()->json(['message' => 'Erro ao atualizar status do trabalho, tente novamente'], 500);
        }

        return response()->json(['message' => "Projeto $project->name atualizado com sucesso"], 200);
    }

    public function getAll(Request $request) {
        $user = $request->user();
        $projects = ProjetoRepository::getAllProjects($user->id);

        return response()->json($projects, 200);
    }

    public function getAllClose(Request $request) {
        $user = $request->user();
        $projects = ProjetoRepository::getAllProjectsClose($user->id);

        return response()->json($projects);
    }

    public function getAllOpen(Request $request) {
        $user = $request->user();
        $projects = ProjetoRepository::getAllProjectsClose($user->id);

        return response()->json($projects);
    }

    public function delete(int $id, Request $request){
        try {
            $user = $request->user();
            $project = ProjetoRepository::getProjectById($id, $user->id);

            if(!$project) {
                return response()->json(['message' => 'Projeto não encontrado'], 404);
            }

            ProjetoRepository::delete($project);

            return response()->json(['message' => 'Projeto excluido com sucesso'], 200);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao excluir projeto'], 500);
        }
    }
}
