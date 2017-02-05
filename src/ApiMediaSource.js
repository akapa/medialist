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
		this.sort = this.translateSort(sortProp, sortDirection);
		this.filters = filters.map(this.translateFilter);
	}

	translateSort(sortProp, sortDirection) {
		const dir = sortDirection === 'asc' ? 1 : -1;
		return (elem1, elem2) => {
			const p1 = this.getPropertyValueForSort(elem1, sortProp);
			const p2 = this.getPropertyValueForSort(elem2, sortProp);
			if (p1 > p2) return dir;
			if (p1 < p2) return -dir;
			return 0;
		};
	}

	translateFilter(filter) {
		if (filter === 'off') return elem => elem.type !== 'channel' || elem.isLive;
		if (filter === 'channel') return elem => elem.type !== 'channel' || !elem.isLive;
		return elem => elem.type !== filter;
	}

	getPropertyValueForSort(obj, name) {
		const value = obj[name];
		if (value instanceof Date) return value.getTime();
		if (typeof value === 'object') return JSON.stringify(value);
		return value;
	}
}
