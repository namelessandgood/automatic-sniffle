"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().min(1, "Content is required"),
});

type FormData = z.infer<typeof schema>;

export default function NewSnifflePage() {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const onSubmit = async (data: FormData) => {
		setSubmitting(true);
		try {
			const res = await fetch("/api/sniffles", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Failed to create");
			router.push("/");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
			<div className="space-y-2">
				<Label htmlFor="title">Title</Label>
				<Input id="title" placeholder="Enter title" {...register("title")} />
				{errors.title && (
					<p className="text-sm text-red-600">{errors.title.message}</p>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="content">Content</Label>
				<Input
					id="content"
					placeholder="Enter content"
					{...register("content")}
				/>
				{errors.content && (
					<p className="text-sm text-red-600">{errors.content.message}</p>
				)}
			</div>
			<Button type="submit" disabled={submitting}>
				{submitting ? "Creating..." : "Create"}
			</Button>
		</form>
	);
}
