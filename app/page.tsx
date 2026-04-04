'use client';
import CrearGasto from '@/components/gastos/crear-gasto';
import TablaGastos from '@/components/gastos/gasto-tabla';


export default function Home() {
  // Estado inicial: Empezamos con una lista vacía o con datos de prueba

  return (
    <div className="p-6">
      <section className="p-6 rounded-xl mb-8 w-5xl bg-white">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-semibold mb-4">Resumen de Transacciones</h2>
          <CrearGasto />
        </div>
        <TablaGastos gastos={[]} />
      </section>
    </div>
  );
}
