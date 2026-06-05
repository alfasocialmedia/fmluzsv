import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null; // "logo" | "favicon" | "hero" | "about"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/x-icon", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine filename based on type
    let filename: string;
    switch (type) {
      case "favicon":
        filename = "favicon.ico";
        break;
      case "logo":
        filename = "station-logo.png";
        break;
      case "hero":
        filename = "hero-banner.png";
        break;
      case "about":
        filename = "about-bg.png";
        break;
      default:
        filename = `${type || "upload"}-${Date.now()}.png`;
    }

    const filePath = path.join(process.cwd(), "public", filename);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/${filename}`,
      filename,
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
