<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;

class VehiculoController extends Controller
{
    public function index()
    {
        try {
            $vehiculos = Vehiculo::all();
            return response()->json($vehiculos);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los vehículos'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'marca' => 'required|string|max:100',
                'modelo' => 'required|string|max:100',
                'anio' => 'required|integer|min:1900|max:2025',
                'categoria' => 'required|string|in:economico,intermedio,lujo'
            ]);

            $vehiculo = Vehiculo::create([
                'marca' => $request->marca,
                'modelo' => $request->modelo,
                'anio' => $request->anio,
                'categoria' => $request->categoria,
                'estado' => 'disponible'
            ]);

            return response()->json($vehiculo, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear el vehículo: ' . $e->getMessage()], 500);
        }
    }
} 