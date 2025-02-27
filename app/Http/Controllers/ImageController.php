<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\Image;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rules\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
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
        $validated = $request->validate([
            'galleryId' => 'required|string',
            'image' => [
                'required',
                File::image()
                    ->max('20mb'),
            ]
        ]);

        $imageFile = $request->file('image');

        $gallery = Gallery::find($validated['galleryId']);
        $image = $gallery->images()->create();
        $image->setImage($imageFile);

        return redirect(route(
            'gallery',
            ['retrieval_id' => $gallery->retrieval_id]
        ))->with([
            'editMode' => true,
            'success' => 'Image successfully added to this gallery!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
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

        $image->update([
            'title' => $request->title ?? '',
            'description' => $request->description ?? '',
        ]);

        redirect()->back()->with([
            'editMode' => true,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        //
    }
}
