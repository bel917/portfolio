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
        return response()->json([
            'profile' => Profile::query()->first(),
            'skills' => Skill::query()
                ->orderBy('sort_order')
                ->get(['id', 'name']),
            'projects' => Project::query()
                ->orderBy('sort_order')
                ->get(['id', 'title', 'description', 'tech_stack', 'github_link', 'featured']),
        ]);
    }
}
