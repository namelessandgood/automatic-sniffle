import { NextResponse } from "next/server";
import { PrismaSniffleRepository } from "@/infrastructure/sniffle/PrismaSniffleRepository";
import { ListSniffles } from "@/application/sniffle/listSniffles";
import {
	CreateSniffle,
	createSniffleSchema,
} from "@/application/sniffle/createSniffle";

const repo = new PrismaSniffleRepository();

export async function GET() {
	const list = new ListSniffles(repo);
	const data = await list.execute();
	return NextResponse.json(data.map((d) => d.toPrimitives()));
}

export async function POST(req: Request) {
	const json = await req.json();
	const parsed = createSniffleSchema.safeParse(json);
	if (!parsed.success)
		return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
	const create = new CreateSniffle(repo);
	const created = await create.execute(parsed.data);
	return NextResponse.json(created.toPrimitives(), { status: 201 });
}
