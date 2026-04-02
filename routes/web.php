<?php

use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/resume/download', function () {
    $profile = Profile::query()->first();
    $skills = Skill::query()->orderBy('sort_order')->pluck('name')->all();
    $projects = Project::query()->orderBy('sort_order')->get(['title', 'description', 'tech_stack']);

    if (! $profile) {
        abort(404);
    }

    $projectLines = $projects->map(function (Project $project): string {
        return sprintf(
            "- %s\n  %s\n  Tech: %s",
            $project->title,
            $project->description,
            implode(', ', $project->tech_stack ?? []),
        );
    })->implode("\n\n");

    $content = implode("\n", [
        $profile->name,
        $profile->title,
        $profile->location,
        $profile->email,
        '',
        'SUMMARY',
        $profile->bio,
        '',
        'SKILLS',
        implode(', ', $skills),
        '',
        'PROJECTS',
        $projectLines,
        '',
        'Generated from the portfolio application.',
    ]);

    $fileName = str($profile->name)->slug('-').'-resume.txt';

    return Response::make($content, 200, [
        'Content-Type' => 'text/plain; charset=UTF-8',
        'Content-Disposition' => 'attachment; filename="'.$fileName.'"',
    ]);
})->name('resume.download');
