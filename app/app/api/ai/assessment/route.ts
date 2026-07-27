import { NextResponse } from "next/server";

import { generateProfessionalAssessment } from "@/services/openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const assessment = await generateProfessionalAssessment(body);

    return NextResponse.json({
      success: true,
      assessment,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown AI assessment error.",
      },
      {
        status: 500,
      },
    );
  }
}
