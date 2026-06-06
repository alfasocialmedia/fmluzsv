import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await db.siteSetting.findMany();
    const map: Record<string, string> = {};
    settings.forEach((s) => {
      map[s.key] = s.value;
    });
    return NextResponse.json(map);
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Proteger el guardado de configuraciones
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await request.json();

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        await db.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
