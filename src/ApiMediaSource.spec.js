import ApiMediaSource from './ApiMediaSource';
import $ from 'jquery';

describe('ApiMediaSource data source', () => {

	const url = 'http://kamu.com';
	let ams;
	beforeEach(() => {
		ams = new ApiMediaSource(url);
	});

	it('should invoke the API with an AJAX call', () => {
		spyOn($, 'ajax');
		const result = ams.refresh().catch(() => {});
		expect($.ajax).toHaveBeenCalledTimes(1);
		expect($.ajax.calls.argsFor(0)[0].url).toBe(url);
		expect(result).toEqual(jasmine.any(Promise));
	});

	it('should invoke translation on sort and filters and set them', () => {
		spyOn(ams, 'translateSort').and.callThrough();
		spyOn(ams, 'translateFilter').and.callThrough();
		ams.applyFilters('foo', 'asc', ['bar', 'baz']);
		expect(ams.translateSort).toHaveBeenCalledWith('foo', 'asc');
		expect(ams.translateFilter).toHaveBeenCalledTimes(2);
		expect(ams.sort).toEqual(jasmine.any(Function));
		expect(ams.filters.length).toBe(2);
	});

	describe('translated sort', () => {

		it('should create a sort function to sort by prop, asc/desc', () => {
			const testArray = [{ a: 12 }, { a: 5 }, { a: 87 }];
			testArray.sort(ams.translateSort('a', 'asc'));
			expect(testArray.map(elem => elem.a)).toEqual([5, 12, 87]);
			testArray.sort(ams.translateSort('a', 'desc'));
			expect(testArray.map(elem => elem.a)).toEqual([87, 12, 5]);
		});

		it('should translate object properties before sorting', () => {
			const testArray = [{ a: 12 }, { a: 1 }];
			spyOn(ams, 'getPropertyValueForSort');
			testArray.sort(ams.translateSort('a', 'asc'));
			expect(ams.getPropertyValueForSort).toHaveBeenCalledWith({ a: 12 }, 'a');
			expect(ams.getPropertyValueForSort).toHaveBeenCalledWith({ a: 1 }, 'a');
		});

		it('should be able to sort dates (convert to UNIX timestamp)', () => {
			expect(ams.getPropertyValueForSort({ d: new Date() }, 'd')).toEqual(jasmine.any(Number));
		});

	});

	describe('translated filter', () => {

		it('should filter by the value of the type property', () => {
			const testArray = [{ type: 'foo' }, { type: 'bar' }, { type: 'foo' }];
			expect(testArray.filter(ams.translateFilter('foo')).length).toBe(1);
			expect(testArray.filter(ams.translateFilter('bar')).length).toBe(2);
		});

		it('should filter out online/offline channels', () => {
			const testArray = [
				{ type: 'channel', isLive: true },
				{ type: 'channel', isLive: false },
				{ type: 'recorded' }
			];
			expect(testArray.filter(ams.translateFilter('off'))).toEqual([
				{ type: 'channel', isLive: true },
				{ type: 'recorded' }
			]);
			expect(testArray.filter(ams.translateFilter('channel'))).toEqual([
				{ type: 'channel', isLive: false },
				{ type: 'recorded' }
			]);
		});

	});

});
