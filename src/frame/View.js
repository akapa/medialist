import $ from 'jquery';
import eventable from './eventable';

export default class View {
	constructor(element, data = {}) {
		Object.assign(this, eventable);
		this.$element = $(element);
		this.data = Object.assign({}, this.defaultData(), data);
	}

	template() {
		return '';
	}

	defaultData() {
		return {};
	}

	build() {
		this.render();
	}

	render() {
		this.$element.html(this.template());
	}

	destroy() {
		this.$element.empty();
	}
}
