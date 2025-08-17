<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePropertyRequest;
use App\Models\Property;
use App\Models\Project;
use Inertia\Inertia;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::with(['project'])
            ->latest()
            ->paginate(12);
        
        return Inertia::render('properties/index', [
            'properties' => $properties
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::orderBy('name')->get();
        
        return Inertia::render('properties/create', [
            'projects' => $projects
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyRequest $request)
    {
        $property = Property::create($request->validated());

        return redirect()->route('properties.show', $property)
            ->with('success', 'Properti berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        $property->load(['project', 'salesTransactions.customer']);

        return Inertia::render('properties/show', [
            'property' => $property
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        $projects = Project::orderBy('name')->get();
        
        return Inertia::render('properties/edit', [
            'property' => $property,
            'projects' => $projects
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePropertyRequest $request, Property $property)
    {
        $property->update($request->validated());

        return redirect()->route('properties.show', $property)
            ->with('success', 'Properti berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        $property->delete();

        return redirect()->route('properties.index')
            ->with('success', 'Properti berhasil dihapus.');
    }
}