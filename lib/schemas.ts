import * as z from "zod";

export const CATEGORIAS_EGRESOS = [
  "Alimentación",
  "Transporte",
  "Vivienda",
  "Salud",
  "Educación",
  "Entretenimiento",
  "Ropa",
  "Otros"
] as const;

export const CATEGORIAS_INGRESOS = [
  "Sueldo", "Emprendimineto", "Regalo", "Inversión", "Venta", "Otros"
] as const;

export const CATEGORIAS_TRANSACCIONES = [...CATEGORIAS_EGRESOS, ...CATEGORIAS_INGRESOS] as const;

export const transaccionFormSchema = z.object({
  tipo: z.enum(["INGRESO", "EGRESO"], {
    message: "El tipo de transacción es requerido"
  }),
  descripcion: z.string().min(1, "La descripción es requerida"),
  monto: z.number().positive("El monto debe ser un número positivo"),
  categoria: z.enum([...CATEGORIAS_EGRESOS, ...CATEGORIAS_INGRESOS], {
    message: "La categoría es requerida"
  }),
  fecha: z.date({
    message: "La fecha es requerida",
  }).refine((date) => date <= new Date(), {
    message: "La fecha no puede ser futura"
  })
});

export type TransaccionFormData = z.infer<typeof transaccionFormSchema>;
