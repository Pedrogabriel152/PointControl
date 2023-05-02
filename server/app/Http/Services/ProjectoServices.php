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
        dd($diff);

        $horasGastasAtual = explode(':', $project->horas_gastas);
        $horasGastasPonto = [$diff->h, $diff->i];
        if(sizeof($horasGastasAtual) == 2){
            $horasTotal = [
                intval($horasGastasAtual[0]) + $horasGastasPonto[0],
                intval($horasGastasAtual[1]) + $horasGastasPonto[1]
            ];
        } else {
            $horasTotal = [
                intval($horasGastasAtual[0]) + $horasGastasPonto[0],
                $horasGastasPonto[1]
            ];
        }
        

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

    public static function sumHours(array $time) {

        $minuts = 0;
        $hours = 0;

        foreach ($time as $key => $value) {

            if($value->horas_gastas){
                $hoursArray = explode(':', $value->horas_gastas);
                $minuts += intval($hoursArray[1]);
                $hours += intval($hoursArray[0]);
            }
            
        }

        if($minuts == 60) {
            $minuts = 0;
            $hours += 1;
        }

        return $hours;
    }

    public static function mediaHours(array $time) {
        $minuts = 0;
        $hours = 0;

        foreach ($time as $key => $value) {
            if($value->horas_gastas){
                $hoursArray = explode(':', $value->horas_gastas);
                $minuts += intval($hoursArray[1]);
                $hours += intval($hoursArray[0]);
            }
        }

        if($minuts == 60) {
            $minuts = 0;
            $hours += 1;
        }

        $media = $hours/sizeof($time);

        return $media;  
    }

    public static function ordenaProjectsHours(array $projects) {
        foreach ($projects as $key => $value) {

            if(!$value->horas_gastas){
                $projects[$key]->horas_gastas = 0;
                continue;
            }
            $hoursArray = explode(':', $value->horas_gastas);
            $minuts = intval($hoursArray[1]);
            $hours = intval($hoursArray[0]);

            if($minuts == 60) {
                $minuts = 0;
                $hours += 1;
            }

            $minutsDecimal = $minuts/60;

            $projects[$key]->horas_gastas = $hours + $minutsDecimal;
        }

        for ($i=0; $i < sizeof($projects)-1; $i++) { 
            for ($j=1; $j < sizeof($projects); $j++) { 
                if($projects[$i]->horas_gastas < $projects[$j]->horas_gastas){

                    $aux = $projects[$i];
                    $projects[$i] = $projects[$j];
                    $projects[$j] = $aux;
                }
            }
        }

        return $projects;  
    }
}