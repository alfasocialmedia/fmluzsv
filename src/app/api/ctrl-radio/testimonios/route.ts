import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

// GET - List ALL testimonies (admin)
export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const testimonies = await db.testimony.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonies);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

// PUT - Approve a testimony
export async function PUT(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await request.json();
    const { id, approved } = data;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const testimony = await db.testimony.update({
      where: { id },
      data: { approved: approved !== undefined ? approved : true },
    });

    return NextResponse.json(testimony);
  } catch {
    return NextResponse.json(
      { error: "Failed to update testimony" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a testimony
export async function DELETE(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await db.testimony.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete testimony" },
      { status: 500 }
    );
  }
}
