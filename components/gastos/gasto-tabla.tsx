// src/components/TablaGastos.tsx
import { Gasto } from '@/types';
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  gastos: Gasto[];
}

export default function TablaGastos({ gastos }: Props) {
  console.log("Gastos recibidos en TablaGastos:", gastos);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300 bg-white text-md">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Descripción</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-900">Categoría</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-900">Fecha</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-900">Monto</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {gastos.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                No hay gastos registrados aún.
              </td>
            </tr>
          ) : (
            gastos.map((gasto) => (
              <tr key={gasto.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-700">{gasto.descripcion}</td>
                <td className="px-4 py-3 text-gray-400 text-center">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {gasto.categoria}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-center text-sm">
                  {format(new Date(gasto.fecha), "dd/MM/yyyy", { locale: es })}
                </td>
                <td className={`px-4 py-3 text-center font-semibold  ${gasto.monto < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  $ {Math.abs(gasto.monto).toLocaleString('es-AR')}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
