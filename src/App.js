import Controller from './frame/Controller';

export default class App extends Controller {
	body() {
		this.query();
		this.poll();
	}

	query() {
		return this.services.dataSource.refresh()
			.then(() => {
				this.runFilters();
			})
			.catch((error) => {
				this.view.notifyError([error.status, error.statusText].join(' - '));
			});
	}

	renderResults(results) {
		this.view.data.media = results;
		this.view.render();
	}

	runFilters() {
		const ds = this.services.dataSource;
		const vd = this.view.data;

		ds.applyFilters(vd.sort.prop, vd.sort.direction, vd.filter);
		this.renderResults(ds.getData());
	}
}
