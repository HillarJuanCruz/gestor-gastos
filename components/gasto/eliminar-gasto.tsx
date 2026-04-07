"use client";

import { toast } from "sonner";
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
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

interface EliminarGastoProps {
  id: string;
  descripcion: string;
  onSuccess: () => void;
}

export default function EliminarGasto({ id, descripcion, onSuccess }: EliminarGastoProps) {
    const handleEliminar = async () => {
        try {
            const response = await fetch(`/api/gastos/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Gasto eliminado exitosamente");
                if (onSuccess) onSuccess();
            } else {
                if (response.status === 409) {
                    toast.error("No se puede eliminar el gasto porque tiene propiedades asociadas");
                } else {
                    toast.error("Error al eliminar el gasto");
                }
            }
        } catch (error) {
            console.error("Error deleting gasto:", error);
            toast.error("Error al eliminar el gasto");
        }
    };

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará el gasto de &quot;
                <strong>{descripcion}</strong>
                &quot; de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEliminar}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar gasto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
}


