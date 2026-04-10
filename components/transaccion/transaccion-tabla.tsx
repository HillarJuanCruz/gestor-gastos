'use client';
import { Transaccion } from '@/types';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

import ModificarTransaccion from './modificar-transaccion';
import Loading from '../Loading';
import EliminarTransaccion from './eliminar-transaccion';
import { Ellipsis } from 'lucide-react';

interface TablaTransaccionesProps {
  data: Transaccion[] | null;
  loading: boolean;
  error: Error | null;
  onActionSuccess: () => void;
}

export default function TablaTransacciones({ data, loading, error, onActionSuccess }: TablaTransaccionesProps) {

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error al cargar las secciones.</p>
        <p className="text-sm text-gray-500 mt-2">Intenta recargar la página</p>
      </div>
    );
  }

  const transacciones = data || [];

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Descripción</th>
            <th className="px-4 py-3 text-center font-semibold text-foreground">Categoría</th>
            <th className="px-4 py-3 text-center font-semibold text-foreground">Fecha</th>
            <th className="px-4 py-3 text-center font-semibold text-foreground">Monto</th>
            <th className="px-4 py-3 text-center font-semibold text-foreground">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {transacciones.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                No hay transacciones registradas aún.
              </td>
            </tr>
          ) : (
            transacciones.map((transaccion) => (
              <tr key={transaccion.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{transaccion.descripcion}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary">
                    {transaccion.categoria}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-center">
                  {format(new Date(transaccion.fecha), "dd/MM/yyyy", { locale: es })}
                </td>
                {transaccion.tipo === "EGRESO" ? (
                  <td className="px-4 py-3 text-center font-semibold text-red-600 dark:text-red-400">
                    - $ {Math.abs(transaccion.monto).toLocaleString('es-AR')}
                  </td>
                ) : (
                  <td className="px-4 py-3 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                    + $ {Math.abs(transaccion.monto).toLocaleString('es-AR')}
                  </td>
                )}
                <td className="px-4 py-3 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Ellipsis className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <ModificarTransaccion transaccion={transaccion} onSuccess={onActionSuccess} />
                      <DropdownMenuSeparator />
                      <EliminarTransaccion id={transaccion.id.toString()} descripcion={transaccion.descripcion} onSuccess={onActionSuccess} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
