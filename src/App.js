import Controller from './frame/Controller';

export default class App extends Controller {
	body() {
		this.services.dataSource.refresh().then(this.runFilters.bind(this));
	}

	renderResults(results) {
		this.view.data.media = results;
		this.view.render();
	}

	runFilters() {
		const ds = this.services.dataSource;
		const vd = this.view.data;

		ds.applyFilters(vd.sort.prop, vd.sort.direction, vd.filters);
		this.renderResults(ds.getData());
	}
}
