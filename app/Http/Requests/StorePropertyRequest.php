<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePropertyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'project_id' => 'required|exists:projects,id',
            'unit_number' => 'required|string|max:50',
            'type' => 'required|in:rumah,apartment,ruko,kavling,villa',
            'land_area' => 'nullable|numeric|min:0',
            'building_area' => 'nullable|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'floors' => 'required|integer|min:1',
            'status' => 'required|in:available,reserved,sold,maintenance',
            'description' => 'nullable|string',
            'facilities' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'project_id.required' => 'Proyek wajib dipilih.',
            'project_id.exists' => 'Proyek yang dipilih tidak valid.',
            'unit_number.required' => 'Nomor unit wajib diisi.',
            'type.required' => 'Tipe properti wajib dipilih.',
            'price.required' => 'Harga properti wajib diisi.',
            'price.numeric' => 'Harga harus berupa angka.',
            'floors.required' => 'Jumlah lantai wajib diisi.',
            'status.required' => 'Status properti wajib dipilih.',
        ];
    }
}