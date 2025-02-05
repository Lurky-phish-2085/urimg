<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth', only: ['index']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $galleries = $request->user()->galleries()->latest()->get();

        return Inertia::render('MyGalleries', [
            'galleries' => $galleries
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'image' => [
                'required',
                File::image()
                    ->max('20mb'),
            ]
        ]);

        $user = $request->user();

        $imageFile = $request->file('image');

        $gallery = $user ? $user->galleries()->create() : Gallery::create();
        $gallery->setInitialImage($imageFile);

        return redirect(route(
            'gallery',
            ['retrieval_id' => $gallery->retrieval_id]
        ))->with([
            'editMode' => true,
            'success' => 'Gallery created with uploaded image!',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gallery $gallery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gallery $gallery): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'max:40',
            'description' => 'max:255',
        ]);

        if ($validator->fails()) {
            redirect()->back()->withErrors($validator)->with([
                'editMode' => true,
            ]);
        }

        $gallery->update([
            'title' => $request->title ?? '',
            'description' => $request->description ?? '',
        ]);

        return redirect(route(
            'gallery',
            ['retrieval_id' => $gallery->retrieval_id],
        ))->with([
            'editMode' => true,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery): RedirectResponse
    {
        $gallery->delete();

        return redirect(route('home'))->with(
            ['success' => 'Gallery deleted successfully!']
        );
    }
}
