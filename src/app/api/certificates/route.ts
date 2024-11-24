import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
  const certificatesDir = path.join(process.cwd(), "public", "certificates");

  try {
    const files = await fs.readdir(certificatesDir);
    const processedCertificates = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg"].includes(ext);
      })
      .map((filename) => ({
        filename: filename,
        path: `/certificates/${filename}`,
        type: path.extname(filename).toLowerCase().slice(1),
      }));

    return NextResponse.json(processedCertificates);
  } catch (error) {
    console.error("Error reading certificates:", error);
    return NextResponse.json(
      {
        error: "Unable to read certificates",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
