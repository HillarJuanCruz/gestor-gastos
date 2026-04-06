'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { GastoFormData } from '@/lib/schemas';
import GastoForm from './gasto-formulario';
import { toast } from 'sonner';

export default function CrearGasto({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: GastoFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al guardar el gasto");

      toast.success("Gasto registrado correctamente");
      setIsDialogOpen(false); // Cierra el modal

      // Ejecuta la función del padre para refrescar la tabla sin recargar
      onSuccess();

    } catch (error) {
      console.error("Error al guardar el gasto:", error);
      toast.error("Hubo un problema al guardar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-xl transition-all">
          Agregar Gasto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nuevo gasto</DialogTitle>
          <DialogDescription>Completá los datos del gasto.</DialogDescription>
        </DialogHeader>

        <GastoForm
          defaultValues={{
            descripcion: '',
            monto: 0,
            categoria: "Alimentación",
            fecha: new Date()
          }}
          onSubmit={onSubmit}
          submitButtonText="Guardar"
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
