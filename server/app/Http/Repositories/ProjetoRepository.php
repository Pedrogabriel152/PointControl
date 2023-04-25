<?php

namespace App\Http\Repositories;

date_default_timezone_set('America/Sao_Paulo');

use App\Models\Projeto;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            $project = Projeto::whereId($id)->first();
            $projectOpen = ProjetoRepository::getClockInOpen($user);

            if($project->id_user !== $user->id){
                return;
            }

            if($projectOpen){
                $projectOpen->status = "Aberto";
                $inicio = new DateTime($projectOpen->inicio);
                $fim = new DateTime(date('Y-m-d H:i'));
                $diff = $inicio->diff($fim);

                $horasGastasAtual = explode(':', $projectOpen->horas_gastas);
                $horasGastasPonto = [$diff->h, $diff->i];
                $horasTotal = [
                    intval($horasGastasAtual[0]) + $horasGastasPonto[0],
                    intval($horasGastasAtual[1]) + $horasGastasPonto[1]
                ];

                $dataDiefenca = "$horasTotal[0]:$horasTotal[1]";


                $projectOpen->horas_gastas = $dataDiefenca;
                $projectOpen->inicio = '';
                $projectOpen->save();
            }

            $project->inicio = $acao === "open"? $date : '';
            $project->status = $acao === "open"? 'Iniciado': "Aberto";

            $project->save();

            return $project;
        });
    }

    public static function getClockInOpen(object $user){
        return DB::transaction(function () use($user) {
            $projectsOpen = Projeto::whereStatus('Iniciado')->get();
            $projectOpen = '';

            foreach ($projectsOpen as $key => $value) {
                if($user->id == $value->id_user) {
                    $projectOpen = $value;
                }
            }
            
            return $projectOpen;
        });
    }
} 