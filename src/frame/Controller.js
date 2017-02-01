export default class Controller {
	constructor(services) {
		this.view = null;
		this.services = services;
	}

	start() {
		this.body();
	}

	stop() {
	}

	setView(view) {
		this.view = view;
	}

	refreshView() {
		if (this.view) this.view.render();
	}

	body() {
		this.refreshView();
	}

	createChildView(which, factory) {
		return factory();
	}
}
