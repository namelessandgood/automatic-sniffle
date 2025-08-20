import type { SniffleRepository } from "@/domain/sniffle/SniffleRepository";

export class ListSniffles {
	constructor(private repo: SniffleRepository) {}
	execute() {
		return this.repo.list();
	}
}
