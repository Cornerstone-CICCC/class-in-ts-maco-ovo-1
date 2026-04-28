// ===== PRIORITY ENUM =====
enum Priority {
	Normal = "Normal",
	Priority = "Priority",
	Urgent = "Urgent",
}

// ===== ABSTRACT BASE CLASS =====
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

// ===== SPECIFIC LUGGAGE CLASSES =====

// --- Regular Luggage ---
class RegularLuggage extends Luggage {
	constructor(weight: number, description: string, priority: Priority) {
		super(weight, description, priority);
	}

	getPrice(): number {
		const weight = this.getWeight();
		if (weight <= 23) return 0;

		const extraWeight = weight - 23;

		switch (this.priority) {
			case Priority.Normal:
				return this.fee * extraWeight;
			case Priority.Priority:
				return this.fee * 5 * extraWeight;
			case Priority.Urgent:
				return this.fee * 10 * extraWeight;
			default:
				return 0;
		}
	}
}

// --- Fragile Luggage ---
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

// --- Carry-On Luggage ---
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

// ===== LIST MANAGER CLASS =====
class ListOfLuggages {
	private luggages: Luggage[] = [];

	insertLuggage(luggage: Luggage): void {
		this.luggages.push(luggage);
	}

	printAllLuggages(): void {
		console.log("--- Flight Manifest ---");
		this.luggages.forEach((luggage) => console.log(luggage.toString()));
		console.log("-----------------------");
	}

	priceOfEachLuggage(): void {
		console.log("--- Price Per Luggage ---");
		this.luggages.forEach((luggage) => {
			console.log(
				`${luggage.getDescription()}: $${luggage.getPrice().toFixed(2)}`,
			);
		});
		console.log("-------------------------");
	}

	totalPrice(): number {
		return this.luggages.reduce(
			(total, luggage) => total + luggage.getPrice(),
			0,
		);
	}

	getFragileLuggageWithInsurance(): {
		quantity: number;
		totalInsurance: number;
	} {
		const fragileLuggages = this.luggages.filter(
			(l) => l instanceof FragileLuggage,
		);
		const totalInsurance = fragileLuggages.reduce(
			(sum, l) => sum + l.getInsuranceValue(),
			0,
		);

		return {
			quantity: fragileLuggages.length,
			totalInsurance: totalInsurance,
		};
	}

	sortByPrice(): void {
		this.luggages.sort((a, b) => a.getPrice() - b.getPrice());
	}

	sortByWeight(): void {
		this.luggages.sort((a, b) => a.getWeight() - b.getWeight());
	}

	// ===== OPTIONAL CHALLENGES =====

	// 1. Method to remove a luggage from the list
	removeLuggage(luggageToRemove: Luggage): void {
		this.luggages = this.luggages.filter(
			(luggage) => luggage !== luggageToRemove,
		);
	}

	// 4. Method to sort luggages by priority
	sortByPriority(): void {
		// Assign numerical values to priority for sorting (Urgent first, Normal last)
		const priorityWeights: Record<string, number> = {
			Urgent: 3,
			Priority: 2,
			Normal: 1,
		};

		this.luggages.sort((a, b) => {
			const weightA = priorityWeights[a.getPriority()] || 0;
			const weightB = priorityWeights[b.getPriority()] || 0;
			return weightB - weightA;
		});
	}
}

// ===== 5. EXAMPLE USAGE =====

// Instantiate the luggage objects
const fragileLuggage = new FragileLuggage(
	10,
	"Box with fragile items",
	Priority.Normal,
	100,
);

const regularLuggage = new RegularLuggage(
	30,
	"Luggage full of clothes",
	Priority.Priority,
);

const carryOnLuggage = new CarryOnLuggage(
	6,
	"Luggage with personal items",
	Priority.Urgent,
);

// Create the list and insert luggage
const list = new ListOfLuggages();
list.insertLuggage(fragileLuggage);
list.insertLuggage(regularLuggage);
list.insertLuggage(carryOnLuggage);

// Print results
list.printAllLuggages();
list.priceOfEachLuggage();

console.log(`\nTotal Price of all luggage: $${list.totalPrice().toFixed(2)}`);
console.log("Fragile Luggage Info:", list.getFragileLuggageWithInsurance());

// ===== TESTING OPTIONAL CHALLENGES =====
console.log("\n--- Executing Optional Challenges ---\n");

// 2. Update the weight of a luggage
carryOnLuggage.setWeight(10);
console.log(`Updated Carry-On weight to: ${carryOnLuggage.getWeight()}kg`);
console.log(
	`New price for Carry-On: $${carryOnLuggage.getPrice().toFixed(2)}\n`,
);

// 3. Update the insurance value of fragile luggage
fragileLuggage.setInsuranceValue(250);
console.log(
	`Updated Fragile insurance to: $${fragileLuggage.getInsuranceValue()}\n`,
);

// Attempt to set insurance on regular luggage (should trigger the error message)
regularLuggage.setInsuranceValue(50);

// Test sorting by priority
console.log("\n--- Sorting by Priority ---");
list.sortByPriority();
list.printAllLuggages();
