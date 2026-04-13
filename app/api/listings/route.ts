import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const listings = await prisma.listing.findMany({
      where: { isApproved: true },
      include: { landlord: { select: { name: true, profileImage: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const listing = await prisma.listing.create({
      data: { ...body, landlordId: body.userId },
    });
    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}