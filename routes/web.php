<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SalesTransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Projects Management
    Route::resource('projects', ProjectController::class);
    
    // Properties Management
    Route::resource('properties', PropertyController::class);
    
    // Customers Management
    Route::resource('customers', CustomerController::class);
    
    // Sales Transactions Management
    Route::resource('transactions', SalesTransactionController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';