// src/components/TablaGastos.tsx
import { Gasto } from '@/types';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { PencilIcon, TrashIcon, Ellipsis, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog';
import { toast } from 'sonner';
import { useState } from 'react';
import ModificarGasto from './modificar-gasto';
interface Props {
  gastos: Gasto[];
  onGastoEliminado: () => void; // <--- Nueva prop para refrescar la lista
}

export default function TablaGastos({ gastos, onGastoEliminado }: Props) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [gastoAEditar, setGastoAEditar] = useState<Gasto | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEliminar = async (id: string) => {
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/gastos/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("No se pudo eliminar");

      toast.success("Gasto eliminado");
      onGastoEliminado(); // Refresca la tabla en el padre
    } catch (error) {
      toast.error("Error al eliminar el gasto", { description: (error as Error).message });
    } finally {
      setIsDeleting(null);
    }
  };

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
                <td className="px-4 py-3 text-center">
                  {/* Si se está borrando este gasto específico, mostramos un loader */}
                  {isDeleting === gasto.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mx-auto text-slate-400" />
                  ) : (

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Ellipsis />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onSelect={() => {
                              setGastoAEditar(gasto);
                              setIsEditOpen(true);
                            }}
                            className="cursor-pointer"
                          >
                            <PencilIcon />
                            Modificar
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()} // Evita que el dropdown se cierre antes del modal
                                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                              >
                                <TrashIcon className="mr-2 h-4 w-4" />
                                <span>Eliminar</span>
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará el gasto de &quot;
                                    <strong>{gasto.descripcion}</strong>
                                    &quot; de forma permanente.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleEliminar(gasto.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Eliminar gasto
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {gastoAEditar && (
        <ModificarGasto
          gasto={gastoAEditar}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSuccess={onGastoEliminado} // Reutilizamos la función de refresco
        />
      )}
    </div>
  );
}
