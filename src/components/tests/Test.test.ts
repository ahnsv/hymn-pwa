import { timeTillDischargeDate, actualWorkTime } from "../Calculate";

describe("Discharge Time Check", () => {
	test("Today", () => {
		const dsc = timeTillDischargeDate(
			new Date(2019, 2, 11),
			new Date(2019, 8, 17)
		).days;
		expect(dsc).toBe(190);
	});
});
describe("Range Time Check", () => {
	test("Today", () => {
		const dsc = actualWorkTime([new Date(2019, 2, 11), new Date(2019, 8, 17)])
			.days;
		expect(dsc).toBeGreaterThan(100);
	});
});

describe("Range Week Check", () => {
	test("Weekly", () => {
		const dsc = actualWorkTime([new Date(2019, 2, 11), new Date(2019, 2, 28)], {
			days: true
		}).days;
		expect(dsc).toBe(12);
	});
});
