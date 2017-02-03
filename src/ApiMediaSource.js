import $ from 'jquery';
import DataSource from './frame/DataSource';

export default class ApiMediaSource extends DataSource {
	constructor(url) {
		super();
		this.url = url;
	}

	refresh() {
		const options = {
			url: this.url,
			dataType: 'jsonp'
		};
		return new Promise((resolve, reject) =>	{
			$.ajax(options)
				.done((results) => {
					this.data = results;
					resolve(results);
				})
				.fail(reject);
		});
	}

	applyFilters(sortProp, sortDirection, filters) {
		const getPropertyValue = (obj, name) => {
			const value = obj[name];
			if (value instanceof Date) return value.getTime();
			if (typeof value === 'object') return JSON.stringify(value);
			return value;
		};

		const dir = sortDirection === 'asc' ? 1 : -1;
		this.sort = (elem1, elem2) => {
			const p1 = getPropertyValue(elem1, sortProp);
			const p2 = getPropertyValue(elem2, sortProp);
			if (p1 > p2) return dir;
			if (p1 < p2) return -dir;
			return 0;
		};

		this.filters = filters.map((filter) => {
			if (filter === 'off') return elem => elem.type !== 'channel' || elem.isLive;
			if (filter === 'channel') return elem => elem.type !== 'channel' || !elem.isLive;
			return elem => elem.type !== filter;
		});
	}
}
