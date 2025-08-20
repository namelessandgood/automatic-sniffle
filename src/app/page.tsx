import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PrismaSniffleRepository } from "@/infrastructure/sniffle/PrismaSniffleRepository";
import { ListSniffles } from "@/application/sniffle/listSniffles";

export default async function HomePage() {
	const repo = new PrismaSniffleRepository();
	const list = new ListSniffles(repo);
	const items = await list.execute();

	return (
		<main className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Automatic Sniffle</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground">
						Starter with Next.js 14, Prisma + SQLite, Tailwind, and shadcn-style
						UI using DDD.
					</p>
					<div className="flex gap-3">
						<Button asChild>
							<Link href="/sniffles/new">Create a Sniffle</Link>
						</Button>
						<Button variant="secondary" asChild>
							<Link href="/api/sniffles">View Sniffles (JSON)</Link>
						</Button>
					</div>
				</CardContent>
			</Card>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold">Recent Sniffles</h2>
				{items.length === 0 ? (
					<p className="text-muted-foreground">No sniffles yet. Create one!</p>
				) : (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{items.map((i) => {
							const p = i.toPrimitives();
							return (
								<Card key={p.id}>
									<CardHeader>
										<CardTitle className="text-base">{p.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">{p.content}</p>
									</CardContent>
								</Card>
							);
						})}
					</div>
				)}
			</section>
		</main>
	);
}
