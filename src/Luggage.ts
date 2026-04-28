import Priority from "./Priority.js";

abstract class Luggage {
	private weight: number;
	protected description: string;
	protected priority: Priority;
	protected readonly fee: number = 5.2;

	constructor(weight: number, description: string, priority: Priority) {
		this.weight = weight;
		this.description = description;
		this.priority = priority;
	}

	getWeight(): number {
		return this.weight;
	}

	setWeight(weight: number): void {
		this.weight = weight;
	}

	getDescription(): string {
		return this.description;
	}

	getPriority(): Priority {
		return this.priority;
	}

	getInsuranceValue(): number {
		return 0;
	}

	setInsuranceValue(value: number): void {
		console.error("Error: Insurance is only applicable to fragile luggage.");
	}

	abstract getPrice(): number;

	toString(): string {
		return `[${this.constructor.name}] Description: ${this.description} | Weight: ${this.weight}kg | Priority: ${this.priority}`;
	}
}

export default Luggage;
