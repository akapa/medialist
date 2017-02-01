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
		return new Promise((resolve, reject) =>	$.ajax(options).done(resolve).fail(reject));
	}
}
