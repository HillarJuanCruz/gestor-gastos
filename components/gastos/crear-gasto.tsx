'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { gastoFormSchema, type GastoFormData } from '@/lib/schemas';
import { useState } from 'react';

import GastoForm from './gasto-formulario';

export default function CrearGasto({ onSuccess }: { onSuccess?: () => void }) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<GastoFormData>({
    resolver: zodResolver(gastoFormSchema),
    defaultValues: {
      descripcion: '',
      monto: 0
    }
  });

  const onSubmit = async (data: GastoFormData) => {
    setIsSubmitting(true);
    try {
        console.log("Datos a enviar:", data);
        /*
        const response = await fetch("/api/sections", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(
                responseData.message || "Error al crear la sección"
            );
        }
        */
        form.reset();
        setIsDialogOpen(false);
        // Llamar callback para refrescar la lista
        if (onSuccess) {
            onSuccess();
        }
        // También refrescar la página como fallback
        window.location.reload();
        setErrorMessage("");
    } catch (error) {
        console.error("Error al crear la sección:", error);
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Error inesperado al crear la sección";
        setErrorMessage(errorMessage);
    } finally {
        setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-second hover:bg-yellow-500 text-white font-bold py-4 px-4 mr-2 rounded-xl transition-all">
          Agregar Gasto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nuevo gasto</DialogTitle>
          <DialogDescription>
            Completá los datos para actualizar tu balance.
          </DialogDescription>
        </DialogHeader>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
              {errorMessage}
          </div>
        )}
        <GastoForm
          defaultValues={{ descripcion: '', monto: 0 }}
          onSubmit={onSubmit}
          submitButtonText="Agregar"
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  )
}
/*

*/
