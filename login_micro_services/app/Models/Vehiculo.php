<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    protected $table = 'vehiculos';
    
    protected $fillable = [
        'marca',
        'modelo',
        'anio',
        'categoria',
        'estado'
    ];

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }
} 