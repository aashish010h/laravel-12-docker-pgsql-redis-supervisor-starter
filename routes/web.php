<?php
use Illuminate\Support\Facades\Route;

// Catch-all route for React
Route::get('/{any}', function () {
    return view('welcome'); 
})->where('any', '.*');
