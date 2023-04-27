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
        Route::prefix('projects')->group(function() {
            // Create
            Route::post('new', 'create');
            
            // Get infos
            Route::get('/', 'getAll');
            Route::get('close', 'getAllClose');
            Route::get('open', 'getAllOpen');
            Route::get('edit/{id}', 'edit');
            Route::get('recent', 'getRecent');
            Route::get('hours', 'getHours');
            Route::get('price', 'getPriceProject');

            // Delete
            Route::delete('delete/{id}', 'delete');
            
            // Update
            Route::patch('update/{id}', 'update');
            Route::patch('update/status/{id}', 'statusProject');
            Route::patch('clockin/{id}', 'clockIn');
        });
    });

    Route::controller(UserControllerr::class)->group(function() {
        Route::prefix('users')->group(function() {
            Route::get('edit', 'edit');
            Route::post('update', 'update');
        });

        Route::delete('logout', 'logout');
    });
});


Route::controller(UserControllerr::class)->group(function () {
    Route::post('/create', 'create');
    Route::post('/login', 'login');
});