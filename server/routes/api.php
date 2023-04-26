<?php

use App\Http\Controllers\API\ProjetoController;
use App\Http\Controllers\API\UserControllerr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(ProjetoController::class)->group(function() {
        Route::post('/new', 'create');
        Route::patch('/clockin/{id}', 'clockIn');
        Route::get('/projects', 'getAll');
        Route::get('/projects/close', 'getAllClose');
        Route::get('/projects/open', 'getAllOpen');
        Route::delete('/projects/delete/{id}', 'delete');
    });
});


Route::controller(UserControllerr::class)->group(function () {
    Route::post('/create', 'create');
    Route::post('/login', 'login');
});