import Controller from './frame/Controller';

export default class App extends Controller {
	body() {
		this.retries = 0;
		this.query();
		this.services.poller.start(this.query.bind(this), this.view.data.polling * 1000);
	}

	query() {
		return this.services.dataSource.refresh()
			.then(() => {
				this.retries = 0;
				this.runFilters();
			})
			.catch((error) => {
				this.retries += 1;
				this.view.notifyError([error.status, error.statusText].join(' - '));
				if (this.retries >= 5) this.services.poller.stop();
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
