import * as z from "zod";

export const gastoFormSchema = z.object({
  descripcion: z.string().min(1, "La descripción es requerida"),
  monto: z.number().positive("El monto debe ser un número positivo")
});

export type GastoFormData = z.infer<typeof gastoFormSchema>;
