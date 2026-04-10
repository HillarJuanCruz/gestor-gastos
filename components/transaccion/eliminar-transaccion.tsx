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

interface EliminarTransaccionProps {
  id: string;
  descripcion: string;
  onSuccess: () => void;
}

export default function EliminarTransaccion({ id, descripcion, onSuccess }: EliminarTransaccionProps) {
    const handleEliminar = async () => {
        try {
            const response = await fetch(`/api/transacciones/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Transacción eliminada exitosamente");
                if (onSuccess) onSuccess();
            } else {
                if (response.status === 409) {
                    toast.error("No se puede eliminar la transacción porque tiene propiedades asociadas");
                } else {
                    toast.error("Error al eliminar la transacción");
                }
            }
        } catch (error) {
            console.error("Error deleting transaccion:", error);
            toast.error("Error al eliminar la transacción");
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
              Esta acción no se puede deshacer. Se eliminará la transacción de &quot;
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
              Eliminar transacción
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
}


