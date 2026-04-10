import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

// GET /api/gastos/[id] - Obtener un transaccion por ID
/*
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "ID de transaccion inválido" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const transaccion = await prisma.transaccion.findUnique({
      where: {
        user_id: user.id,
        id
      }
    });

    if (!transaccion) {
      return NextResponse.json(
        { error: "transaccion no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(transaccion);
  } catch (error) {
    console.error('Error fetching transaccion:', error);
    return NextResponse.json(
      { error: `Error al obtener transaccion`},
      { status: 500 }
    );
  }
}
*/
// PUT /api/sections/[id] - Actualizar una transaccion

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
    const { descripcion, monto, categoria, tipo, fecha } = body;

    // Validar que se proporcione los datos
    if (!descripcion?.trim()) {
      return NextResponse.json(
        { error: "La descripción del transaccion es requerida" },
        { status: 400 }
      );
    }

    if (!monto || monto <= 0) {
      return NextResponse.json(
        { error: "El monto del transaccion es requerido y debe ser un número positivo" },
        { status: 400 }
      );
    }

    if (!categoria?.trim()) {
      return NextResponse.json(
        { error: "La categoría del transaccion es requerida" },
        { status: 400 }
      );
    }

    if (!tipo?.trim()) {
      return NextResponse.json(
        { error: "El tipo del transaccion es requerido" },
        { status: 400 }
      );
    }

    // Actualizar la transaccion
    const updatedGasto = await prisma.transaccion.updateMany({
      where: {
        id: id,
        user_id: user.id,
      },
      data: {
        descripcion,
        monto: parseFloat(monto),
        categoria,
        tipo,
        fecha: fecha ? new Date(fecha) : new Date(),
      }
    });

    if (updatedGasto.count === 0) {
      return NextResponse.json(
        { error: "transaccion no encontrado o no autorizado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedGasto);
  } catch (error) {
    console.error('Error updating transaccion:', error);
    return NextResponse.json(
      { error: "Error al actualizar transaccion" },
      { status: 500 }
    );
  }
}

// DELETE /api/gastos/[id] - Eliminar una transaccion
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

    const result = await prisma.transaccion.deleteMany({
      where: {
        id: id,
        user_id: user.id,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "transaccion no encontrada o no autorizado" },
        { status: 404 }
      );
    }


    return NextResponse.json(
      { message: "transaccion eliminada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting transaccion:', error);
    return NextResponse.json(
      { error: "Error interno al eliminar la transaccion" },
      { status: 500 }
    );
  }
}
