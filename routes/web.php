<?php

use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

Route::domain(config('subdomains.image_retrieval') . '.' . env('APP_URL'))->group(function () {
    Route::get('/', function (): RedirectResponse {
        return redirect(url(env('APP_URL')));
    });

    Route::get('/{filename}', function (string $filename): StreamedResponse | RedirectResponse {
        $imagePath = "images/{$filename}";
        $imageRetrievalId = explode('.', $filename)[0];

        if (!Storage::exists($imagePath)) {
            return redirect(url(env('APP_URL') . '/' . $imageRetrievalId));
        }

        return Storage::response('images/' . $filename);
    });
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('galleries', GalleryController::class)
    ->only(['index', 'store', 'update', 'destroy']);

Route::resource('images', ImageController::class)
    ->only(['index', 'store', 'update', 'destroy']);

require __DIR__ . '/auth.php';
