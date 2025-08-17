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
        Schema::create('sales_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_code')->unique();
            $table->foreignId('property_id')->constrained()->onDelete('cascade');
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->foreignId('sales_agent_id')->constrained('users')->onDelete('cascade');
            $table->date('transaction_date');
            $table->decimal('total_price', 15, 2)->comment('Harga total properti');
            $table->decimal('down_payment', 15, 2)->comment('Uang muka/DP');
            $table->integer('dp_installments')->default(1)->comment('Jumlah cicilan DP (max 24 bulan)');
            $table->decimal('dp_monthly', 15, 2)->nullable()->comment('Cicilan DP per bulan');
            $table->decimal('remaining_balance', 15, 2)->comment('Sisa hutang setelah DP');
            $table->integer('credit_installments')->default(12)->comment('Jumlah cicilan kredit (max 96 bulan)');
            $table->decimal('credit_monthly', 15, 2)->comment('Cicilan kredit per bulan');
            $table->decimal('interest_rate', 5, 2)->default(0)->comment('Bunga kredit per tahun (%)');
            $table->enum('status', ['draft', 'active', 'completed', 'cancelled'])->default('draft');
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index('transaction_code');
            $table->index('transaction_date');
            $table->index('status');
            $table->index(['customer_id', 'status']);
            $table->index(['sales_agent_id', 'transaction_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_transactions');
    }
};