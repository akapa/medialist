export default class Controller {
	constructor(view, services) {
		this.view = view;
		this.services = services;
	}

	start() {
		this.refreshView();
		this.body();
	}

	refreshView() {
		this.view.build();
	}

	body() {

	}
}
