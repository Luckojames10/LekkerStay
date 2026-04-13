import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const listing = await prisma.listing.findUnique({
            where: { id: params.id },
            include: { landlord: true, reviews: true, bookings: true },
        });

        if (!listing) {
            return NextResponse.json({ error: "Listing not found" }, { status: 404 });
        }

        return NextResponse.json(listing);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch listing" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const listing = await prisma.listing.update({
            where: { id: params.id },
            data: body,
        });

        return NextResponse.json(listing);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.listing.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: "Listing deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
    }
}