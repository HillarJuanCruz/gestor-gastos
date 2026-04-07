"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GastoFormData } from "@/lib/schemas";
import { Gasto } from "@/types";
import GastoForm from "./gasto-formulario";
import { toast } from "sonner";
import { PencilIcon } from "lucide-react";
import { Button } from "../ui/button";

interface ModificarGastoProps {
  gasto: Gasto;
  onSuccess: () => void;
}

export default function ModificarGasto({ gasto, onSuccess }: ModificarGastoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: GastoFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/gastos/${gasto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al actualizar el gasto");

      toast.success("Gasto actualizado correctamente");
      setErrorMessage("");
      if (onSuccess) onSuccess();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error al actualizar el gasto:", error);
      toast.error("No se pudo actualizar el gasto");
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error inesperado al actualizar el gasto";
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
          <DialogTitle>Modificar gasto</DialogTitle>
        </DialogHeader>
        {
          errorMessage && (
            <div className="text-red-500 text-sm mb-4">
              {errorMessage}
            </div>
        )}
        <GastoForm
          // Pasamos los valores actuales del gasto como valores iniciales
          defaultValues={{
            descripcion: gasto.descripcion,
            monto: Number(gasto.monto),
            categoria: gasto.categoria,
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
