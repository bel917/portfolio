<?php

use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/portfolio', [PortfolioController::class, 'index']);
Route::post('/contact-messages', [ContactMessageController::class, 'store']);
