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
import { GastoFormData, gastoFormSchema } from '@/lib/schemas';
import GastoForm from './gasto-formulario';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CrearGasto( { onSuccess }: { onSuccess: () => void } ) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<GastoFormData>({
    resolver: zodResolver(gastoFormSchema),
    defaultValues: {
      descripcion: '',
      monto: 0,
      categoria: "Otros",
      fecha: new Date()
    }
  });

  const onSubmit = async (data: GastoFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) throw new Error( responseData.message || "Error al guardar el gasto");

      form.reset();
      toast.success("Gasto registrado correctamente");
      setIsDialogOpen(false);

      setErrorMessage("");
      if(onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al guardar el gasto:", error);
      toast.error("Hubo un problema al guardar");
      const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Error inesperado al crear el gasto";
      setErrorMessage(errorMessage);
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
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
              {errorMessage}
          </div>
        )}
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
