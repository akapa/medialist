import WatchLaterList from './WatchLaterList';

describe('Watch Later collection', () => {

	let wl;
	beforeEach(() => {
		wl = new WatchLaterList();
	});

	it('should provide a list', () => {
		expect(wl.list).toEqual([]);
	});

	it('should add values to list', () => {
		wl.add(1);
		wl.add(7);
		expect(wl.list).toEqual([1, 7]);
	});

	it('should remove values from list', () => {
		wl.add(1);
		wl.add(7);
		wl.remove(1);
		expect(wl.list).toEqual([7]);
	});

	it('should clean up list correctly', () => {
		wl.add(5);
		wl.add(7);
		wl.add(17);
		wl.add(71);
		wl.clean([5, 7, 71]); // 17 no longer exists!
		expect(wl.list).toEqual([5, 7, 71]);
	});

	it('should save list to the storage', () => {
		spyOn(window.localStorage, 'setItem');

		wl.add(1);
		wl.save();
		expect(window.localStorage.setItem).toHaveBeenCalledWith(wl.storageKey, '[1]');
	});

	it('should load list from the storage', () => {
		spyOn(window.localStorage, 'getItem').and.returnValue('[5,2,4]');

		const list = wl.load();
		expect(window.localStorage.getItem).toHaveBeenCalledWith(wl.storageKey);
		expect(list).toEqual([5, 2, 4]);
	});

	it('should load an empty list if no list is found', () => {
		spyOn(window.localStorage, 'getItem');

		const list = wl.load();
		expect(list).toEqual([]);
	});

});
