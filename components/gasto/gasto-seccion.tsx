"use client";
import { useFetch } from "@/hooks/useFetch";
import CrearGasto from "./crear-gasto";
import TablaGastos from "./gasto-tabla";
import { Gasto } from "@/types";

const url = "/api/gastos";

export default function SeccionGastos() {
  const { data, loading, error, refetch } = useFetch<Gasto[]>(url);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Resumen de Transacciones</h2>
          <p className="text-sm text-slate-500">Gestioná tus finanzas en tiempo real</p>
        </div>
        <CrearGasto onSuccess={refetch} />
      </div>
      <TablaGastos data={data} loading={loading} error={error} onActionSuccess={refetch} />
    </>
  );
}
