"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransaccionFormData } from "@/lib/schemas";
import { Transaccion } from "@/types";
import TransaccionForm from "./transaccion-formulario";
import { toast } from "sonner";
import { PencilIcon } from "lucide-react";
import { Button } from "../ui/button";

interface ModificarTransaccionProps {
  transaccion: Transaccion;
  onSuccess: () => void;
}

export default function ModificarTransaccion({ transaccion, onSuccess }: ModificarTransaccionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: TransaccionFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/transacciones/${transaccion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al actualizar la transacción");

      toast.success("Transacción actualizada correctamente");
      setErrorMessage("");
      if (onSuccess) onSuccess();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error al actualizar la transaccion:", error);
      toast.error("No se pudo actualizar la transaccion");
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error inesperado al actualizar la transaccion";
      setErrorMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 w-full">
          <PencilIcon />
          Modificar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modificar transaccion</DialogTitle>
        </DialogHeader>
        {
          errorMessage && (
            <div className="text-red-500 text-sm mb-4">
              {errorMessage}
            </div>
        )}
        <TransaccionForm
          // Pasamos los valores actuales del transaccion como valores iniciales
          defaultValues={{
            descripcion: transaccion.descripcion,
            monto: Number(transaccion.monto),
            categoria: transaccion.categoria,
            tipo: transaccion.tipo,
            fecha: new Date(transaccion.fecha),
          }}
          onSubmit={onSubmit}
          submitButtonText="Guardar cambios"
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
