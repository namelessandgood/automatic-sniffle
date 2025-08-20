import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Automatic Sniffle",
	description: "A Next.js app with DDD and Prisma SQLite",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-background">
				<div className="container py-8">{children}</div>
			</body>
		</html>
	);
}
