import App from './App';

describe('App controller', () => {

	let app;
	beforeEach(() => {
		app = new App({
			watchLater: {},
			dataSource: {},
			poller: {}
		});
		app.view = {
			data: {
				sort: { prop: 'foo', direction: 'asc' },
				filter: ['bar']
			}
		};
	});

	it('should set view data and then render', () => {
		app.view.render = function () {
			expect(this.data.media[0]).toBe(1);
		};
		spyOn(app.view, 'render');
		
		app.renderResults([1]);
		expect(app.view.render).toHaveBeenCalled();
	});

	it('should channel to watchLater service', () => {
		app.services.watchLater.add = jasmine.createSpy('add');
		app.services.watchLater.remove = jasmine.createSpy('remove');

		app.watchLater(1);
		expect(app.services.watchLater.add).toHaveBeenCalledWith(1);

		app.dontWatchLater(1);
		expect(app.services.watchLater.remove).toHaveBeenCalledWith(1);
	});

	it('should apply passed filters and rerender view', () => {
		app.services.dataSource.applyFilters = jasmine.createSpy('apply');
		app.services.dataSource.getData = function() { 
			return [1, 2];
		};
		app.view.render = jasmine.createSpy('render');
		spyOn(app, 'renderResults');

		app.runFilters();
		expect(app.services.dataSource.applyFilters).toHaveBeenCalledWith('foo', 'asc', ['bar']);
		expect(app.renderResults).toHaveBeenCalledWith([1, 2]);
	});

	describe('querying', () => {

		it('should clean watchlater and run filters (and thus rerender) when successful', () => {
			app.services.dataSource.refresh = () => {
				return {
					then: (f) => {
						f([{ id: 1 }, { id: 2 }]);
						return { catch: () => {} };
					}
				};
			};
			app.services.watchLater.clean = jasmine.createSpy('clean');
			spyOn(app, 'runFilters');

			app.query();

			expect(app.runFilters).toHaveBeenCalled();
			expect(app.retries).toBe(0);
			expect(app.services.watchLater.clean).toHaveBeenCalledWith([1, 2]);
		});

		it('display error when failing but stop retrying', () => {
			app.retries = 0;
			app.services.dataSource.refresh = () => {
				return {
					then: () => {
						return { catch: (f) => { f({ status: 1, statusText: 'foo' }); } };
					}
				};
			};

			app.view.notifyError = jasmine.createSpy('notify');
			app.services.poller.stop = jasmine.createSpy('stop');

			for (let i = 0; i < 5; i++) {
				app.query();
			}

			expect(app.view.notifyError).toHaveBeenCalledWith('1 - foo');
			expect(app.retries).toBe(5);
			expect(app.services.poller.stop).toHaveBeenCalled();
		});
		
	});

});
