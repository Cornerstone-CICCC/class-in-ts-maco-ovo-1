import Priority from "./Priority.js";
import RegularLuggage from "./RegularLuggage.js";
import FragileLuggage from "./FragileLuggage.js";
import CarryOnLuggage from "./CarryOnLuggage.js";
import ListOfLuggages from "./ListOfLuggages.js";

// ===== EXAMPLE USAGE =====

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
