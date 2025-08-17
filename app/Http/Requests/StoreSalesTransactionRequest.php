<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSalesTransactionRequest extends FormRequest
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
            'property_id' => 'required|exists:properties,id',
            'customer_id' => 'required|exists:customers,id',
            'transaction_date' => 'required|date',
            'down_payment' => 'required|numeric|min:0',
            'dp_installments' => 'required|integer|min:1|max:24',
            'credit_installments' => 'required|integer|min:1|max:96',
            'interest_rate' => 'required|numeric|min:0|max:100',
            'notes' => 'nullable|string',
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
            'property_id.required' => 'Properti wajib dipilih.',
            'property_id.exists' => 'Properti yang dipilih tidak valid.',
            'customer_id.required' => 'Konsumen wajib dipilih.',
            'customer_id.exists' => 'Konsumen yang dipilih tidak valid.',
            'transaction_date.required' => 'Tanggal transaksi wajib diisi.',
            'down_payment.required' => 'Jumlah uang muka wajib diisi.',
            'down_payment.numeric' => 'Uang muka harus berupa angka.',
            'dp_installments.required' => 'Jumlah cicilan DP wajib diisi.',
            'dp_installments.max' => 'Cicilan DP maksimal 24 bulan.',
            'credit_installments.required' => 'Jumlah cicilan kredit wajib diisi.',
            'credit_installments.max' => 'Cicilan kredit maksimal 96 bulan (8 tahun).',
            'interest_rate.required' => 'Suku bunga wajib diisi.',
        ];
    }
}