<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'location',
        'email',
        'image',
        'resume_link',
        'bio',
        'intro',
    ];
}
