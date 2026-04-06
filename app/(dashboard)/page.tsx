'use client';

import { useEffect, useState, useCallback } from 'react';
import CrearGasto from '@/components/gasto/crear-gasto';
import TablaGastos from '@/components/gasto/gasto-tabla';
import { Gasto } from '@/types';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los gastos de la API
  const fetchGastos = useCallback(async () => {
    try {
      const response = await fetch('/api/gastos');
      if (!response.ok) throw new Error('Error al cargar gastos');
      const data = await response.json();
      setGastos(data);
    } catch (error) {
      console.error('Error al cargar gastos:', error);
      toast.error('No se pudieron cargar los gastos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial
  useEffect(() => {
    fetchGastos();
  }, [fetchGastos]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <section className="p-6 rounded-xl mb-8 bg-white shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Resumen de Transacciones</h2>
            <p className="text-sm text-slate-500">Gestioná tus finanzas en tiempo real</p>
          </div>

          {/* Pasamos la función como prop para que CrearGasto la use al terminar */}
          <CrearGasto onSuccess={fetchGastos} />
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-slate-400 animate-pulse">
            Cargando transacciones...
          </div>
        ) : (
          <TablaGastos
            gastos={gastos}
            onGastoEliminado={fetchGastos}
          />
        )}
      </section>
    </div>
  );
}
