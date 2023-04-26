<?php

namespace App\Http\Services;

use DateTime;

date_default_timezone_set('America/Sao_Paulo');

class ProjectoServices 
{
    public static function calcularTotal(object $project, float $valorHora) {
        $project->status = "Aberto";
        $horasTotal = ProjectoServices::calcularHorasGastas($project);

        $project = ProjectoServices::calcularCusto($project, $valorHora, $horasTotal);

        $dataDiefenca = "$horasTotal[0]:$horasTotal[1]";

        $project->horas_gastas = $dataDiefenca;
        $project->inicio = '';

        return $project;
    }

    public static function calcularHorasGastas(object $project) {
        $inicio = new DateTime($project->inicio);
        $fim = new DateTime(date('Y-m-d H:i'));
        $diff = $inicio->diff($fim);

        $horasGastasAtual = explode(':', $project->horas_gastas);
        $horasGastasPonto = [$diff->h, $diff->i];
        $horasTotal = [
            intval($horasGastasAtual[0]) + $horasGastasPonto[0],
            intval($horasGastasAtual[1]) + $horasGastasPonto[1]
        ];

        return $horasTotal;
    }

    public static function calcularCusto(object $project, float $valorHora, array $horasTotal){
        $porcentacemMin = 100/60;
        $minutos= $porcentacemMin * $horasTotal[1]; 
        $valorMinutos = $valorHora/60;

        $horas = $horasTotal[0];

        $custoTotal = ($horas * $valorHora) + ($minutos * $valorMinutos);

        $project->custo = number_format($custoTotal,2,".","");

        return $project;
    }
}