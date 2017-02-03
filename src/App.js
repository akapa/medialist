import Controller from './frame/Controller';

export default class App extends Controller {
	body() {
		this.query();
		this.poll();
	}

	query() {
		this.services.dataSource.refresh().then(() => {
			this.runFilters();
		});
	}

	poll() {
		setTimeout(() => {
			this.query();
			this.poll();
		}, this.view.data.polling * 1000);
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
