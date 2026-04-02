<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    public function index(): JsonResponse
    {
        $profile = Profile::query()->first();

        return response()->json([
            'profile' => $profile ? [
                ...$profile->toArray(),
                'resume_download_url' => url('/documents/Bali_Balija_CV.pdf'),
            ] : null,
            'skills' => Skill::query()
                ->orderBy('sort_order')
                ->get(['id', 'name']),
            'projects' => Project::query()
                ->orderBy('sort_order')
                ->get(['id', 'title', 'description', 'tech_stack', 'github_link', 'featured']),
        ]);
    }
}
