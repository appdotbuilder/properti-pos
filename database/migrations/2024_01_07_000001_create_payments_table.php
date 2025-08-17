<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('payment_code')->unique();
            $table->foreignId('sales_transaction_id')->constrained()->onDelete('cascade');
            $table->enum('payment_type', ['dp', 'credit'])->comment('DP atau cicilan kredit');
            $table->integer('installment_number')->comment('Cicilan ke-berapa');
            $table->date('due_date')->comment('Tanggal jatuh tempo');
            $table->date('payment_date')->nullable()->comment('Tanggal pembayaran aktual');
            $table->decimal('amount_due', 15, 2)->comment('Jumlah yang harus dibayar');
            $table->decimal('amount_paid', 15, 2)->default(0)->comment('Jumlah yang sudah dibayar');
            $table->decimal('penalty_amount', 15, 2)->default(0)->comment('Denda keterlambatan');
            $table->enum('status', ['pending', 'partial', 'paid', 'overdue'])->default('pending');
            $table->string('payment_method')->nullable()->comment('Metode pembayaran');
            $table->string('receipt_number')->nullable()->comment('Nomor bukti pembayaran');
            $table->foreignId('processed_by')->nullable()->constrained('users');
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index(['sales_transaction_id', 'payment_type']);
            $table->index('due_date');
            $table->index('status');
            $table->index(['status', 'due_date']);
            $table->index('payment_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};