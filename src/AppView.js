import View from './frame/View';
import MediaList from './MediaList';
import MediaFilter from './MediaFilter';

export default class AppView extends View {
	defaultData() {
		return {
			media: [],
			sort: {
				prop: 'id',
				direction: 'asc'
			},
			filter: []
		};
	}

	childViews() {
		return {
			mediaList: {
				factory: ctrl => new MediaList('.medialist', { media: this.data.media }, ctrl)
			},
			mediaFilter: {
				factory: ctrl => new MediaFilter('.filters', { sort: this.data.sort, filter: this.data.filter }, ctrl),
				listeners: {
					change: (event, data) => {
						this.data.sort = {
							prop: data.sortProp,
							direction: data.sortDirection
						};
						this.data.filter = data.filter || [];
						this.controller.runFilters();
					}
				}
			}
		};
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
