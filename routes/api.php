<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CsvImportController;
use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']); // token login

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']); // get current user
    Route::post('/logout', [AuthController::class, 'logout']); // logout
});

Route::prefix('csv')->middleware('auth:sanctum')->group(function () {
    Route::post('/upload', [CsvImportController::class, 'upload']);
    Route::get('/status/{trackingId}', [CsvImportController::class, 'status']);
});
