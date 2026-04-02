<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'tech_stack',
        'github_link',
        'sort_order',
        'featured',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'featured' => 'boolean',
    ];
}
