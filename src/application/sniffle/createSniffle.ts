import { z } from "zod";
import { Sniffle } from "@/domain/sniffle/Sniffle";
import type { SniffleRepository } from "@/domain/sniffle/SniffleRepository";

export const createSniffleSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
});

export class CreateSniffle {
	constructor(private repo: SniffleRepository) {}

	async execute(input: z.infer<typeof createSniffleSchema>) {
		const data = createSniffleSchema.parse(input);
		const sniffle = Sniffle.create({
			title: data.title,
			content: data.content,
		});
		return this.repo.create(sniffle);
	}
}
