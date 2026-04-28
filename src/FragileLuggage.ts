import Luggage from "./Luggage.js";
import Priority from "./Priority.js";

class FragileLuggage extends Luggage {
	private insurance: number;

	constructor(
		weight: number,
		description: string,
		priority: Priority,
		insurance: number,
	) {
		super(weight, description, priority);
		this.insurance = insurance;
	}

	getInsuranceValue(): number {
		return this.insurance;
	}

	setInsuranceValue(value: number): void {
		this.insurance = value;
	}

	getPrice(): number {
		switch (this.priority) {
			case Priority.Normal:
				return this.insurance;
			case Priority.Priority:
				return this.fee * 5 + this.insurance;
			case Priority.Urgent:
				return this.fee * 10 + this.insurance;
			default:
				return this.insurance;
		}
	}

	toString(): string {
		return `${super.toString()} | Insurance: $${this.insurance.toFixed(2)}`;
	}
}

export default FragileLuggage;
