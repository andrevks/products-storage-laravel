<?php

namespace App\Exceptions;

use Exception;

class CategoryInvalidException extends Exception
{
    protected $message = 'Error when creating category.';
    public function render()
    {
        return response()->json([
            'error' => class_basename($this),
            'message' => $this->getMessage(),
        ], 400);
    }
}
