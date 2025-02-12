<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FollowController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $followeesIds = $user->followees()->pluck('users.id');

        $followeeGalleries = Gallery::with('user')
            ->whereIn('user_id', $followeesIds)
            ->latest()
            ->get();

        foreach ($followeeGalleries as $gallery) {
            $gallery->thumbnail_url = $gallery->thumbnail_url;
        }

        return Inertia::render('Following')->with([
            'galleries' => $followeeGalleries
        ]);
    }
    public function follow(User $user, Request $request): RedirectResponse
    {
        $follower = $request->user();
        if ($follower->followees()->where('followee_id', $user->id)->exists()) {
            return redirect()->back()->with([
                'success' => "User already followed {$user->name}!",
            ]);
        }

        $follower->followees()->attach($user->id);

        return redirect()->back()->with([
            'success' => "User sucessfully followed {$user->name}!",
        ]);
    }

    public function unfollow(User $user, Request $request): RedirectResponse
    {
        $follower = $request->user();
        if (!$follower->followees()->where('followee_id', $user->id)->exists()) {
            return redirect()->back()->with([
                'success' => "User already unfollowed {$user->name}!",
            ]);
        }

        $follower->followees()->detach($user->id);

        return redirect()->back()->with([
            'success' => "User sucessfully unfollowed {$user->name}!",
        ]);
    }
}
