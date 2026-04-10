"use client";
import { useFetch } from "@/hooks/useFetch";
import CrearTransaccion from "./crear-transaccion";
import TablaTransacciones from "./transaccion-tabla";
import { Transaccion } from "@/types";

const url = "/api/transacciones";

export default function SeccionTransacciones() {
  const { data, loading, error, refetch } = useFetch<Transaccion[]>(url);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Resumen de Transacciones</h2>
          <p className="text-sm text-slate-500">Gestioná tus finanzas en tiempo real</p>
        </div>
        <CrearTransaccion onSuccess={refetch} />
      </div>
      <TablaTransacciones data={data} loading={loading} error={error} onActionSuccess={refetch} />
    </>
  );
}
