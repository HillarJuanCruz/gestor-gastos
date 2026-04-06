import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { isNull } from "util";
import { Description } from "@radix-ui/react-dialog";

// GET /api/gastos/[id] - Obtener un gasto por ID
/*
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "ID de gasto inválido" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const gasto = await prisma.gasto.findUnique({
      where: {
        user_id: user.id,
        id
      }
    });

    if (!gasto) {
      return NextResponse.json(
        { error: "Gasto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(gasto);
  } catch (error) {
    console.error('Error fetching gasto:', error);
    return NextResponse.json(
      { error: `Error al obtener gasto`},
      { status: 500 }
    );
  }
}
*/
// PUT /api/sections/[id] - Actualizar una sección

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { descripcion, monto, categoria, fecha } = body;

    // Validar que se proporcione los datos
    if (!descripcion?.trim()) {
      return NextResponse.json(
        { error: "La descripción del gasto es requerida" },
        { status: 400 }
      );
    }

    if (!monto || monto <= 0) {
      return NextResponse.json(
        { error: "El monto del gasto es requerido y debe ser un número positivo" },
        { status: 400 }
      );
    }

    if (!categoria?.trim()) {
      return NextResponse.json(
        { error: "La categoría del gasto es requerida" },
        { status: 400 }
      );
    }

    // Actualizar la sección
    const updatedGasto = await prisma.gasto.updateMany({
      where: {
        id: id,
        user_id: user.id,
      },
      data: {
        descripcion,
        monto: parseFloat(monto),
        categoria,
        fecha: fecha ? new Date(fecha) : new Date(),
      }
    });

    if (updatedGasto.count === 0) {
      return NextResponse.json(
        { error: "Gasto no encontrado o no autorizado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedGasto);
  } catch (error) {
    console.error('Error updating gasto:', error);
    return NextResponse.json(
      { error: "Error al actualizar gasto" },
      { status: 500 }
    );
  }
}

// DELETE /api/gastos/[id] - Eliminar un gasto
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const result = await prisma.gasto.deleteMany({
      where: {
        id: id,
        user_id: user.id,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Gasto no encontrado o no autorizado" },
        { status: 404 }
      );
    }


    return NextResponse.json(
      { message: "Gasto eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting gasto:', error);
    return NextResponse.json(
      { error: "Error interno al eliminar el gasto" },
      { status: 500 }
    );
  }
}
