import * as z from "zod";

export const CATEGORIAS_GASTOS = [
  "Alimentación",
  "Transporte",
  "Vivienda",
  "Salud",
  "Educación",
  "Entretenimiento",
  "Ropa",
  "Otros"
] as const;

export const gastoFormSchema = z.object({
  descripcion: z.string().min(1, "La descripción es requerida"),
  monto: z.number().positive("El monto debe ser un número positivo"),
  categoria: z.enum(CATEGORIAS_GASTOS, {
    errorMap: () => ({ message: "Por favor, seleccioná una categoría válida" })
  }),
  fecha: z.date({
    required_error: "La fecha es requerida",
    invalid_type_error: "Formato de fecha no válido",
  }).refine((date) => date <= new Date(), {
    message: "La fecha no puede ser futura"
  })
});

export type GastoFormData = z.infer<typeof gastoFormSchema>;
