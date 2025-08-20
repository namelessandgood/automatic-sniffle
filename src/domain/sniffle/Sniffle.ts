export interface SniffleProps {
	id?: string;
	title: string;
	content: string;
	createdAt?: Date;
	updatedAt?: Date;
}

// Entity with basic invariants (DDD)
export class Sniffle {
	private props: Required<Omit<SniffleProps, "id">> & { id: string };

	private constructor(
		props: Required<Omit<SniffleProps, "id">> & { id: string }
	) {
		this.props = props;
	}

	static create({
		id = "",
		title,
		content,
		createdAt = new Date(),
		updatedAt = new Date(),
	}: SniffleProps) {
		if (!title?.trim()) throw new Error("Title is required");
		if (!content?.trim()) throw new Error("Content is required");
		return new Sniffle({
			id,
			title: title.trim(),
			content: content.trim(),
			createdAt,
			updatedAt,
		});
	}

	toPrimitives() {
		return { ...this.props };
	}
}
