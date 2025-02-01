<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Gallery;
use Illuminate\Http\Request;

class CommentController extends Controller
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
    public function store(Request $request, int $galleryId)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:255'
        ]);

        $authUser = $request->user();

        $gallery = Gallery::find($galleryId);

        if (is_null($gallery)) {
            abort(404);
        }

        $comment = $gallery->comments()->create($validated);
        $comment->user_id = $authUser->id;
        $comment->save();

        return redirect()->back()->with([
            'success' => 'Comment successfully posted!',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
