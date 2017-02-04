import DataSource from './DataSource';

describe('DataSource', () => {

	let ds;
	beforeEach(() => {
		ds = new DataSource();
	});

	it('should return a promise on refresh', () => {
		expect(ds.refresh()).toEqual(jasmine.any(Promise));
	});

	it('should process data when getData is used', () => {
		spyOn(ds, 'process').and.callFake((data) => data.map(elem => elem + 1));
		ds.data = [1, 2, 3];
		const result = ds.getData();
		expect(ds.process).toHaveBeenCalledWith(ds.data);
		expect(result).toEqual([2, 3, 4]);
	});

	it('should sort when a function is set', () => {
		ds.data = [3, 89, 1];
		expect(ds.process()).toEqual(ds.data);

		ds.sort = (a, b) => a - b;
		expect(ds.process()).toEqual([1, 3, 89]);
	});

	it('should filter data using the filters array', () => {
		ds.data = [3, 89, 1, 4];

		ds.filters = [
			elem => elem % 2 === 1, //odd numbers
			elem => elem < 10
		];
		expect(ds.process()).toEqual([3, 1]);
	});

});
