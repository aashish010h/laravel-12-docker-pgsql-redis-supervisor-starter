<?php

namespace App\Http\Requests\Csv;

use Illuminate\Foundation\Http\FormRequest;

class CsvUploadRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'file' => [
                'required',
                'file',
                'mimes:csv,txt',
                'max:1048576', // 1GB in KB
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'CSV file is required.',
            'file.file' => 'The uploaded file must be a valid file.',
            'file.mimes' => 'The file must be a CSV file.',
            'file.max' => 'The file size must not exceed 1GB.',
        ];
    }
}
