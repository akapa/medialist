export default class DataSource {
	constructor() {
		this.data = [];
	}

	refresh() {
		return Promise.resolve(this.data);
	}

	getData() {
		return this.data;
	}
}
