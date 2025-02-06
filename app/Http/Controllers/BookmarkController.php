<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Models\Gallery;
use App\Models\Image;
use App\Models\MergedRetrievalId;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BookmarkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $bookmarks = $request->user()->bookmarks()->latest()->get();

        return Inertia::render('Bookmarks')
            ->with(compact('bookmarks'));
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
        $content_retrieval_id = $request->content_retrieval_id;

        $notAvailable = !MergedRetrievalId::where('retrieval_id', $content_retrieval_id)
            ->exists();

        if ($notAvailable) {
            abort(404);
        }

        $user = $request->user();

        $gallery = Gallery::where('retrieval_id', $content_retrieval_id)->first();
        $image = Image::where('retrieval_id', $content_retrieval_id)->first();

        $isGallery = !is_null($gallery);

        if ($isGallery) {
            $user->bookmarks()->create(['content_retrieval_id' => $gallery->retrieval_id]);
        } else {
            $user->bookmarks()->create(['content_retrieval_id' => $image->retrieval_id]);
        }

        return redirect()->back()->with([
            'success' => 'User successfully bookmarked the content!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bookmark $bookmark)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bookmark $bookmark)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bookmark $bookmark)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookmark $bookmark): RedirectResponse
    {
        Gate::authorize('delete', $bookmark);

        $bookmark->delete();

        return redirect()->back()->with([
            'success' => 'User successfully deleted the bookmark!'
        ]);
    }
}
