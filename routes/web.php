<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use App\Models\Comment;
use App\Models\Gallery;
use App\Models\Image;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

Route::domain(config('subdomains.image_retrieval') . '.' . env('APP_URL'))->group(function () {
    Route::get('/', function (): RedirectResponse {
        return redirect(url(env('APP_URL')));
    });

    Route::get('/{filename}', function (string $filename): StreamedResponse | RedirectResponse {
        $imagePath = "images/{$filename}";
        $imageRetrievalId = explode('.', $filename)[0];

        if (!Storage::exists($imagePath)) {
            return redirect(
                url(env('APP_URL') . '/' .  $imageRetrievalId)
            );
        }

        return Storage::response('images/' . $filename);
    })->name(config('subdomains.image_retrieval') . '.' . 'image-retrieval');
});

Route::get('/', function (Request $request) {
    $successMsg = $request->session()->get('success');

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'success' => $successMsg,
    ]);
})->name('home')->middleware('guest');

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

Route::post('/galleries/{galleryId}/comments', [CommentController::class, 'store'])
    ->middleware(['auth'])
    ->name('comments.store');

Route::middleware(['auth'])->group(function () {
    Route::post('/galleries/{galleryId}/like', [GalleryController::class, 'like'])
        ->name('galleries.like');

    Route::post('/galleries/{galleryId}/dislike', [GalleryController::class, 'dislike'])
        ->name('galleries.dislike');
});

Route::get('/user/{username}', function (string $username, Request $request) {
    $userExist = User::where('name', $username)->exists();

    if (!$userExist) {
        abort(404);
    }

    $user = User::where('name', $username)->first();
    $following = $request->user()->followees()->where('followee_id', $user->id)->exists();
    $followersCount = $user->followers()->count();

    return Inertia::render('UserPage')->with([
        'galleries' => $user->galleries()->latest()->get(),
        'profileUser' => $user,
        'following' => $following,
        'followersCount' => $followersCount,
    ]);
})->name('user-page');

Route::middleware('auth')->group(function () {
    Route::get('/following', [FollowController::class, 'index'])->name('following-page');
    Route::post('/follow/{user}', [FollowController::class, 'follow'])->name('follow');
    Route::post('/unfollow/{user}', [FollowController::class, 'unfollow'])->name('unfollow');
});

require __DIR__ . '/auth.php';

Route::get('/{retrieval_id}', function (Request $request, string $retrieval_id): Response {
    $initImageUrl = function (Image $image): void {
        $image->image_url = $image->image_url;
    };
    $initCommentData = function (Comment $comment): void {
        $comment->author_name = $comment->author_name;
    };

    $editMode = $request->session()->get('editMode');
    $successMsg = $request->session()->get('success');

    $gallery = Gallery::where('retrieval_id', $retrieval_id)->first();
    $image = Image::where('retrieval_id', $retrieval_id)->first();

    $notAvailable = is_null($gallery) && is_null($image);
    if ($notAvailable) {
        abort(404);
    }

    $isGallery = !is_null($gallery);
    $images = $isGallery ? $gallery->images()->get() : [$image];
    $comments = $isGallery ? $gallery->comments()->get() : [];
    $likes = $isGallery ? $gallery->likes()->latest()->get() : [];

    foreach ($images as $image) {
        $initImageUrl($image);
    }
    foreach ($comments as $comment) {
        $initCommentData($comment);
    }

    return Inertia::render('Gallery', [
        'gallery' => $gallery,
        'images' => $images,
        'comments' => $comments,
        'likes' => $likes,
        'isFromCommunity' => $gallery->is_from_community ?? false,
        'editMode' => $editMode,
        'success' => $successMsg,
    ]);
})->name('gallery');
