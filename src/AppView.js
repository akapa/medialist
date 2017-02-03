import View from './frame/View';
import MediaList from './MediaList';
import MediaFilter from './MediaFilter';

export default class AppView extends View {
	defaultData() {
		return {
			media: [],
			sort: {
				prop: 'title',
				direction: 'asc'
			},
			filter: [],
			polling: 10
		};
	}

	childViews() {
		return {
			mediaList: {
				factory: ctrl => new MediaList('.medialist', { media: this.data.media }, ctrl)
			},
			mediaFilter: {
				factory: ctrl => new MediaFilter('.filters', {
					sort: this.data.sort,
					filter: this.data.filter,
					polling: this.data.polling
				}, ctrl),
				listeners: {
					change: this.handleFilterChange.bind(this)
				}
			}
		};
	}

	handleFilterChange(event, data) {
		if (data.polling) {
			this.data.polling = data.polling;
		}
		else {
			Object.assign(this.data, {
				sort: {
					prop: data.sortProp,
					direction: data.sortDirection
				},
				filter: data.filter || []
			});
			this.controller.runFilters();
		}
	}

	template() {
		return `
			<article class="mediawidget">
				<div class="filters"></div>
				<div class="medialist"></div>
			</article>
		`;
	}
}
