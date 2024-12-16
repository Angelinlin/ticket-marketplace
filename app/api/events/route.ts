import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/convex";
import { NextResponse } from "next/server";
// import { z } from "zod";

export const revalidate = 0;

// const getAllEventsSchema = z.object({
// //   userId: z.string().optional(),
// });

export async function GET() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const body = await request.json();
    // const input = getAllEventsSchema.safeParse(body);

    // if (!input.success) {
    //   return NextResponse.json(
    //     { message: input.error.message },
    //     { status: 400 },
    //   );
    // }
    const convex = getConvexClient();
    const events = await convex.query(api.events.get, {});

    if (!events ) {
      return NextResponse.json(
        { message: "No events found" },
        { status: 404 },
      );
    }
    
    return NextResponse.json(
      { events: events },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
