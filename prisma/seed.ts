import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	const count = await prisma.sniffle.count();
	if (count === 0) {
		await prisma.sniffle.create({
			data: { title: "Hello", content: "First sniffle" },
		});
	}
}

main().finally(async () => {
	await prisma.$disconnect();
});
