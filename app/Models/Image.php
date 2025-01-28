<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Image $model) {
            $generatedID = generateRetrievalID();
            $model->retrieval_id = $generatedID;
            $model->filename = $generatedID;
        });
    }

    protected function imageUrl(): Attribute
    {

        return Attribute::make(
            get: function () {
                return url(
                    route(
                        config('subdomains.image_retrieval') . '.' . 'image-retrieval',
                        ['filename' => $this->filename]
                    )
                );
            }
        );
    }

    public function gallery(): BelongsTo
    {
        return $this->belongsTo(Gallery::class);
    }

    public function setFileExtension(string $extension): void
    {
        $trim_and_remove_spaces = function ($string) {
            $trimmed = trim($string);
            $no_whitespaces = preg_replace('/\s+/', '', $trimmed);

            return $no_whitespaces;
        };

        $fullFilename = $this->retrieval_id . ".{$extension}";
        $this->filename = $trim_and_remove_spaces($fullFilename);

        $this->save();
    }
}
