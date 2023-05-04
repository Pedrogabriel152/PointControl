<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Repositories\ProjetoRepository;
use App\Models\Projeto;
use Illuminate\Http\Request;

class ProjetoController extends Controller
{
    // Cria um novo projeto
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

    // Recupera dados de um proketo em expecifico
    public function edit(Request $request, int $id){
        $user = $request->user();
        $project = ProjetoRepository::getProjectById($id, $user->id);

        if(!$project) {
            return response()->json(['message' => 'Projeto não encontrado'], 404);
        }

        return response()->json($project, 200);
    }

    // Atualiza o projeto
    public function update(int $id, Request $request) {
        $user = $request->user();
        $project = ProjetoRepository::getProjectById($id, $user->id);

        // Validations

        if(!$request->name) {
            return response()->json(['message' => 'O campo nome não pode estar vazio'], 402);
        }

        if(!$request->status) {
            return response()->json(['message' => 'O status é obrigatorio']);
        }

        if(!$project) {
            return response()->json(['message' => 'Projeto não encontrado'], 404);
        }

        try {
            ProjetoRepository::update($project, $request);

            return response()->json(['message' => 'Projeto atualizado com sucesso'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao atualizar projeto'], 500);
        }

    }

    // Altera as horas gastas no projeto
    public function clockIn(Request $request, int $id){
        $project = ProjetoRepository::updateClockIn($request->acao, $id, $request);

        if(!$project){
            return response()->json(['message' => 'Erro ao atualizar status do trabalho, tente novamente'], 500);
        }

        return response()->json(['message' => "Projeto $project->name atualizado com sucesso"], 200);
    }

    // Atualiza o status do projeto 
    public function statusProject(Request $request, int $id) {
        $user = $request->user();
        
        try {
            $project = ProjetoRepository::getProjectById($id, $user->id);

            if(!$project) {
                return response()->json(['message' => 'Projeto não encontrado'], 404);
            }

            ProjetoRepository::statusProject($project);

            return response()->json(['message' => 'Status atualizado com sucesso'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao atualizar o status do projeto'], 500);
        }
    }

    // Recupera todos os projetos 
    public function getAll(Request $request) {
        $user = $request->user();
        $projects = ProjetoRepository::getAllProjects($user->id, $user->valor_hora);

        return response()->json($projects, 200);
    }

    // Recupera todos os projetos Fechados
    public function getAllClose(Request $request) {
        $user = $request->user();
        $projects = ProjetoRepository::getAllProjectsClose($user->id, $user->valor_hora);

        return response()->json($projects);
    }

    // Recupera todos os projetos Abertos
    public function getAllOpen(Request $request) {
        $user = $request->user();
        $projects = ProjetoRepository::getAllProjectsOpen($user->id, $user->valor_hora);

        return response()->json($projects);
    }

    // Deletar Projetos
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

    // Buscar os 5 mais recentes
    public function getRecent(Request $request){
        $user = $request->user();

        $projects = ProjetoRepository::getRecents($user->id );

        if(!$projects) {
            return response()->json(['message' => 'Algo deu errado tente novamente'], 500);
        }

        return response()->json($projects, 200);
    }

    // Buscar a quantidade de horas projetos
    public function getHours(Request $request) {
        $user = $request->user();

        $data = ProjetoRepository::sumHours($user->id);

        if(!$data[0]){
            return response()->json([
                'horas' => 0,
                'media' => 0,
                'total' => 0
            ], 200);
        }

        $projects = ProjetoRepository::getHoursProjects($user->id);

        return response()->json([
            'horas' => $data[0],
            'media' => $data[1],
            'total' => $data[2],
            'projects' => $projects
        ], 200);
    }

    // Buscar projetos com o custo
    public function getPriceProject(Request $request) {
        $user = $request->user();

        $projects = ProjetoRepository::getProjectsPrice($user->id);

        if(!$projects) {
            return response()->json(['message' => 'Algo deu errado tente novamente'], 500);
        }

        return response()->json($projects,200);
    }

}
