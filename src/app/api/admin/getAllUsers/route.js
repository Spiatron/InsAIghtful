import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const {userRole} = await req.json()

    if(!userRole || userRole !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized Request" },
        { status: 404 }
      );
    }

    const allUsers = await prisma.user.findMany({});

    return NextResponse.json({
      success: true,
      allUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
