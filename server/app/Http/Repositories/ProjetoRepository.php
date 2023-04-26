<?php

namespace App\Http\Repositories;

date_default_timezone_set('America/Sao_Paulo');

use App\Models\Projeto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Services\ProjectoServices;
use PhpParser\Node\Expr\Cast\Object_;

class ProjetoRepository {

    public static function create(Request $request) {
        return DB::transaction(function () use($request) {
            $user = $request->user();
            $newProject = Projeto::create([
                "name" => $request->name,
                "status" => $request->status,
                'horas_gastas' => 0,
                'id_user' => $user->id,
            ]);

            return $newProject;
        });
    }

    public static function updateClockIn(string $acao, int $id, Request $request) {
        $date = date('Y-m-d H:i');
        $user = $request->user();

        return DB::transaction(function () use($acao, $date, $id, $user) {
            $valorHora = floatval($user->valor_hora);
            $project = Projeto::whereId($id)->first();
            $projectOpen = ProjetoRepository::getClockInOpen($user);

            if($project->id_user !== $user->id){
                return;
            }

            if($projectOpen){
                $projectOpen = ProjectoServices::calcularTotal($projectOpen, $valorHora);
                $projectOpen->save();
            }

            $project->inicio = $acao === "open"? $date : '';
            $project->status = $acao === "open"? 'Iniciado': "Aberto";

            $project->save();

            return $project;
        });
    }

    public static function statusProject(object $project){
        $project->status = $project->status == "Fechado"? "Aberto" : "Fechado";

        $project->save();
    }

    public static function getClockInOpen(object $user){
        return DB::transaction(function () use($user) {
            $projectsOpen = Projeto::where([
                ['status', '=', 'Iniciado'],
                ['id_user', '=', $user->id]
            ])->first();

            return $projectsOpen;
        });
    }

    public static function getAllProjects(int $id_user){
        $projects = Projeto::where([
            ['id_user', '=', $id_user]
        ])->get();

        return $projects;
    }

    public static function getAllProjectsClose(int $id_user){
        $projects = Projeto::where([
            ['id_user', '=', $id_user],
            ['status', '=', 'Terminado']
        ])->get();

        return $projects;
    }

    public static function getProjectById(int $id_projeto, int $id_user) {
        $project = Projeto::where([
            ['id', '=', $id_projeto],
            ['id_user', '=', $id_user]
        ])->first();

        return $project;
    }

    public static function delete(object $project) {
        $project->delete();
    }

    public static function update(object $project, Request $request) {
        $project->name = $request->name;
        $project->status = $request->status;

        $project->save();
    }
} 