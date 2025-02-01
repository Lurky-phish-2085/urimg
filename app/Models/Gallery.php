<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;

class Gallery extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Gallery $model) {
            $model->retrieval_id = generateRetrievalID();
        });
    }

    protected function isFromCommunity(): Attribute
    {
        return Attribute::make(
            get: fn() => !is_null($this->user_id)
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function setInitialImage(UploadedFile $imageFile): void
    {
        $initialImage =  $this->images()->create();
        $initialImage->setImage($imageFile);
    }
}
