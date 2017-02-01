import View from './frame/View';
import MediaList from './MediaList';

export default class AppView extends View {
	defaultData() {
		return {
			media: []
		};
	}

	childViews() {
		return {
			mediaList: ctrl => new MediaList('.medialist', { media: this.data.media }, ctrl)
		};
	}

	template() {
		return `
			<article class="mediawidget">
				<div class="filters">filters</div>
				<div class="medialist"></div>
			</article>
		`;
	}
}
