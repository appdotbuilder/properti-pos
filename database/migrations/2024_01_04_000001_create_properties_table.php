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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->string('unit_number');
            $table->enum('type', ['rumah', 'apartment', 'ruko', 'kavling', 'villa']);
            $table->decimal('land_area', 8, 2)->nullable()->comment('Luas tanah dalam m²');
            $table->decimal('building_area', 8, 2)->nullable()->comment('Luas bangunan dalam m²');
            $table->decimal('price', 15, 2)->comment('Harga dalam rupiah');
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->integer('floors')->default(1);
            $table->enum('status', ['available', 'reserved', 'sold', 'maintenance'])
                  ->default('available');
            $table->text('description')->nullable();
            $table->text('facilities')->nullable();
            $table->timestamps();
            
            $table->index(['project_id', 'unit_number']);
            $table->index('type');
            $table->index('status');
            $table->index('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};