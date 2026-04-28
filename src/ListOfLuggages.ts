import Luggage from "./Luggage.js";
import FragileLuggage from "./FragileLuggage.js";
import Priority from "./Priority.js";

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

export default ListOfLuggages;
