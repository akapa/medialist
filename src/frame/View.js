import $ from 'jquery';
import eventable from './eventable';
import Controller from './Controller';

export default class View {
	constructor(element, data = {}, controller) {
		Object.assign(this, eventable);
		eventable(this);
		this.$element = $(element);
		this.data = Object.assign({}, this.defaultData(), data);
		this.controller = controller || new Controller();
		this.controller.setView(this);
		this.renderedChildren = [];
	}

	template() {
		return '';
	}

	defaultData() {
		return {};
	}

	listeners() {
		return {};
	}

	childViews() {
		return {};
	}

	build() {
		this.attachListeners();
		this.controller.start();
	}

	render() {
		this.destroy();
		this.$element.html(this.template());

		const children = this.childViews();
		Object.keys(children).forEach((elem) => {
			this.renderChild(elem, children[elem]);
		});
	}

	renderChild(which, factory) {
		const child = this.controller.createChildView(which, factory);
		child.build();
		this.renderedChildren.push(child);
	}

	destroy() {
		this.renderedChildren.forEach((elem) => {
			elem.destroy();
		});
		this.renderedChildren = [];

		this.removeListeners();
		this.controller.stop();
		this.$element.empty();
	}

	attachListeners() {
		Object.keys(this.listeners).forEach((key) => {
			this.$element.on(key, this.listeners[key]);
		});
	}

	removeListeners() {
		this.$element.off();
	}
}
