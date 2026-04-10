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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300 bg-white text-md">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Descripción</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-900">Categoría</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-900">Fecha</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-900">Monto</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-900">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {transacciones.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                No hay transacciones registradas aún.
              </td>
            </tr>
          ) : (
            transacciones.map((transaccion) => (
              <tr key={transaccion.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-700">{transaccion.descripcion}</td>
                <td className="px-4 py-3 text-gray-400 text-center">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {transaccion.categoria}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-center text-sm">
                  {format(new Date(transaccion.fecha), "dd/MM/yyyy", { locale: es })}
                </td>
                {transaccion.tipo === "EGRESO" ? (
                  <td className="px-4 py-3 text-center font-semibold text-red-400">
                    - $ {Math.abs(transaccion.monto).toLocaleString('es-AR')}
                  </td>
                ) : (
                  <td className="px-4 py-3 text-center font-semibold text-green-400">
                    + $ {Math.abs(transaccion.monto).toLocaleString('es-AR')}
                  </td>
                )}
                <td className="px-4 py-3 text-center">
                  {/* Si se está borrando esta transaccion específica, mostramos un loader */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
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
