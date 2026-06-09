import { store } from "@/lib/store";
import type { Room } from "@/lib/types";

export async function GET() {
  return Response.json(store.rooms.getAll());
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Room>;
  const room: Room = {
    id: `r${Date.now()}`,
    number: body.number!,
    floor: body.floor!,
    type: body.type!,
    status: body.status ?? "vacant",
    rent: body.rent!,
    deposit: body.deposit ?? body.rent! * 2,
    amenities: body.amenities ?? [],
    tenantId: body.tenantId,
  };
  return Response.json(store.rooms.create(room), { status: 201 });
}
