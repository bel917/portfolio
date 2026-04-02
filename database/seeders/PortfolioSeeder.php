<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        Profile::query()->create([
            'name' => 'Avery Stone',
            'title' => 'Full-Stack Developer',
            'location' => 'Berlin, Germany',
            'email' => 'avery@example.com',
            'image' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
            'resume_link' => 'https://github.com/averystone',
            'intro' => 'I build fast, polished web experiences with Laravel and React.',
            'bio' => 'I enjoy turning ideas into clear, practical products with thoughtful UI, strong backend fundamentals, and maintainable code. My focus is on building portfolio sites, dashboards, and small business tools that feel modern without getting complicated.',
        ]);

        collect([
            'Laravel',
            'PHP',
            'React',
            'JavaScript',
            'Vite',
            'MySQL',
            'REST APIs',
            'Responsive Design',
        ])->each(function (string $skill, int $index): void {
            Skill::query()->create([
                'name' => $skill,
                'sort_order' => $index + 1,
            ]);
        });

        collect([
            [
                'title' => 'Studio Portfolio',
                'description' => 'A clean portfolio experience for a creative studio with fast page loads, strong typography, and smooth section-based navigation.',
                'tech_stack' => ['Laravel', 'React', 'Vite', 'CSS'],
                'github_link' => 'https://github.com/example/studio-portfolio',
            ],
            [
                'title' => 'Task Flow Dashboard',
                'description' => 'A lightweight team dashboard for tracking work in progress, recent updates, and project visibility across departments.',
                'tech_stack' => ['Laravel', 'REST API', 'React', 'MySQL'],
                'github_link' => 'https://github.com/example/task-flow-dashboard',
            ],
            [
                'title' => 'Local Market Platform',
                'description' => 'A mobile-friendly web app for showcasing small business products, featured categories, and customer inquiries.',
                'tech_stack' => ['PHP', 'Laravel', 'JavaScript', 'Responsive UI'],
                'github_link' => 'https://github.com/example/local-market-platform',
            ],
        ])->each(function (array $project, int $index): void {
            Project::query()->create([
                ...$project,
                'sort_order' => $index + 1,
                'featured' => true,
            ]);
        });
    }
}
