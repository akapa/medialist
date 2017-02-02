import $ from 'jquery';
import eventable from './eventable';
import listenerManager from './listenerManager';
import Controller from './Controller';

export default class View {
	constructor(element, data = {}, controller) {
		eventable(this);
		listenerManager(this);
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
		this.controller.start();
	}

	render() {
		this.destroy();
		this.$element.html(this.template());

		const children = this.childViews();
		Object.keys(children).forEach((elem) => {
			this.renderChild(elem, children[elem]);
		});

		this.attachListeners(this.listeners(), this.$element);
	}

	renderChild(which, definition) {
		const child = this.controller.createChildView(which, definition.factory);
		child.$definition = definition;
		child.build();
		this.renderedChildren.push(child);
		if (definition.listeners) this.attachListeners(definition.listeners, child);
	}

	destroy() {
		this.renderedChildren.forEach((child) => {
			this.removeListeners(child.$definition.listeners, child);
			child.destroy();
		});
		this.renderedChildren = [];

		this.removeListeners(this.listeners(), this.$element);
		this.controller.stop();
		this.$element.empty();
	}
}
