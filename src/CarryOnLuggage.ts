import Luggage from "./Luggage.js";
import Priority from "./Priority.js";

class CarryOnLuggage extends Luggage {
	constructor(weight: number, description: string, priority: Priority) {
		super(weight, description, priority);
	}

	getPrice(): number {
		const weight = this.getWeight();
		if (weight <= 5) return 0;

		const extraWeight = weight - 5;
		return this.fee * 3 * extraWeight;
	}
}

export default CarryOnLuggage;
