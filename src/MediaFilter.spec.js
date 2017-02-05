import MediaFilter from './MediaFilter';

describe('MediaFilter view', () => {

	let mf, elem;
	beforeEach(() => {
		elem = document.createElement('div');
		mf = new MediaFilter(elem);
	});

	it('should convert form data from "jQuery" format', () => {
		const data = [
			{ name: "a", value: 1 },
			{ name: "b", value: 2 },
			{ name: "c[]", value: 3 },
			{ name: "c[]", value: 4 }
		];

		expect(mf.convertFormData(data)).toEqual({ a: 1, b: 2, c: [3, 4] });
	});

});
