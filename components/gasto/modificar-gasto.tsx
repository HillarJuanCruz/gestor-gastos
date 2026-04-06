"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GastoFormData } from "@/lib/schemas";
import { Gasto } from "@/types";
import GastoForm from "./gasto-formulario";
import { toast } from "sonner";

interface ModificarGastoProps {
  gasto: Gasto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function ModificarGasto({ gasto, open, onOpenChange, onSuccess }: ModificarGastoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: GastoFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/gastos/${gasto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al actualizar");

      toast.success("Gasto actualizado correctamente");
      onOpenChange(false);
      onSuccess(); // Refresca la tabla
    } catch (error) {
      console.error("Error al actualizar el gasto:", error);
      toast.error("No se pudo actualizar el gasto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modificar gasto</DialogTitle>
        </DialogHeader>
        <GastoForm
          // Pasamos los valores actuales del gasto como valores iniciales
          defaultValues={{
            descripcion: gasto.descripcion,
            monto: Number(gasto.monto),
            categoria: gasto.categoria as GastoFormData["categoria"],
            fecha: new Date(gasto.fecha),
          }}
          onSubmit={onSubmit}
          submitButtonText="Guardar cambios"
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
