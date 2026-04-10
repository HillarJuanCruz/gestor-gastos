"use client";
import { useFetch } from "@/hooks/useFetch";
import CrearTransaccion from "./crear-transaccion";
import TablaTransacciones from "./transaccion-tabla";
import { Transaccion } from "@/types";
import { Card } from "../ui/card";
import BalanceCard from "./balance-card";

const url = "/api/transacciones";

export default function SeccionTransacciones() {
  const { data, loading, error, refetch } = useFetch<Transaccion[]>(url);

  const ingresos = data?.filter(t => t.tipo === "INGRESO").reduce((acc, t) => acc + Number(t.monto), 0) || 0;
  const egresos = data?.filter(t => t.tipo === "EGRESO").reduce((acc, t) => acc + Number(t.monto), 0) || 0;
  const balance = ingresos - egresos;
  console.log(data);
  return (
    <>

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <BalanceCard title="Ingresos Totales" amount={ingresos} variant="ingreso" />
          <BalanceCard title="Egresos Totales" amount={egresos} variant="egreso" />
          <BalanceCard title="Balance Total" amount={balance} variant="balance" />
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Resumen de Transacciones</h2>
          <p className="text-sm text-muted-foreground">Gestioná tus finanzas en tiempo real</p>
        </div>
        <CrearTransaccion onSuccess={refetch} />
      </div>



      <TablaTransacciones data={data} loading={loading} error={error} onActionSuccess={refetch} />
    </>
  );
}
