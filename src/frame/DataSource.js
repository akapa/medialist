export default class DataSource {
	constructor() {
		this.data = [];
		this.sort = null;
		this.filters = [];
	}

	refresh() {
		return Promise.resolve(this.data);
	}

	getData() {
		return this.process(this.data);
	}

	process() {
		if (this.sort) {
			this.data.sort(this.sort);
		}
		return this.data.filter(current => this.filters.every(filter => filter(current)));
	}
}
