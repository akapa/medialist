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
				factory: ctrl => new MediaList('.medialist', {
					media: this.data.media,
					watchLaterList: this.controller.watchLaterList
				}, ctrl),
				listeners: {
					watchLater: (event, id) => this.controller.watchLater(id),
					dontWatchLater: (event, id) => this.controller.dontWatchLater(id)
				}
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
		} else {
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

	notifyError(error) {
		this.$element.find('.notifications').append(`<div class="notification error">${error}</div>`);
	}

	template() {
		return `
			<article class="mediawidget">
				<div class="filters"></div>
				<div class="medialist"></div>
			</article>
			<div class="notifications></div>
		`;
	}
}
