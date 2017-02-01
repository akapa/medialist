import Controller from './frame/Controller';

export default class App extends Controller {
	body() {
		this.services.dataSource.refresh().then((results) => {
			this.view.data.media = results;
			this.view.render();
		});
	}
}
