import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const programs = await db.scheduleProgram.findMany({
      orderBy: [{ day: "asc" }, { order: "asc" }],
    });
    return NextResponse.json(programs);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Proteger creación de programa
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await request.json();
    const program = await db.scheduleProgram.create({
      data: {
        day: data.day,
        time: data.time,
        name: data.name,
        description: data.description,
        icon: data.icon || "Music",
        color: data.color || "from-primary/10 to-accent/10",
        order: data.order || 0,
      },
    });
    return NextResponse.json(program);
  } catch {
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Proteger edición de programa
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await request.json();
    const { id, ...updateData } = data;
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    const program = await db.scheduleProgram.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(program);
  } catch {
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Proteger eliminación de programa
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    await db.scheduleProgram.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete program" }, { status: 500 });
  }
}
