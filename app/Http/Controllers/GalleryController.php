<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

        $imageFile = $request->file('image');

        $gallery = Gallery::create();
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
