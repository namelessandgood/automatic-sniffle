import { Sniffle } from "./Sniffle";

export interface SniffleRepository {
	list(): Promise<Sniffle[]>;
	create(sniffle: Sniffle): Promise<Sniffle>;
}
