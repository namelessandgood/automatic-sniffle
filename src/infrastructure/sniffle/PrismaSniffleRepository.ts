import { prisma } from "@/infrastructure/db/prisma";
import { Sniffle } from "@/domain/sniffle/Sniffle";
import type { SniffleRepository } from "@/domain/sniffle/SniffleRepository";

export class PrismaSniffleRepository implements SniffleRepository {
	async list() {
		const items = await prisma.sniffle.findMany({
			orderBy: { createdAt: "desc" },
		});
		return items.map(
			(i: {
				id: string;
				title: string;
				content: string;
				createdAt: Date;
				updatedAt: Date;
			}) =>
				Sniffle.create({
					id: i.id,
					title: i.title,
					content: i.content,
					createdAt: i.createdAt,
					updatedAt: i.updatedAt,
				})
		);
	}

	async create(sniffle: Sniffle) {
		const p = sniffle.toPrimitives();
		const created = await prisma.sniffle.create({
			data: { title: p.title, content: p.content },
		});
		return Sniffle.create({
			id: created.id,
			title: created.title,
			content: created.content,
			createdAt: created.createdAt,
			updatedAt: created.updatedAt,
		});
	}
}
