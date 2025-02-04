<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FollowController extends Controller
{
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
