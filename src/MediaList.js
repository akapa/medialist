import $ from 'jquery';
import View from './frame/View';

export default class MediaList extends View {
	defaultData() {
		return {
			media: [],
			watchLaterList: []
		};
	}

	listeners() {
		return {
			'click@.watch-later': this.watchLater.bind(this)
		};
	}

	watchLater(event) {
		if (!event) return;

		const $button = $(event.target).closest('button');
		const which = $button.hasClass('strike') ? 'dontWatchLater' : 'watchLater';
		this.trigger(which, $button.closest('.media').data('id'));
		$button.toggleClass('strike');
	}

	template() {
		return `
			<ul class="list">
			${this.data.media.map((elem) => !elem || !elem.id ? '' : `
				<li data-id="${elem.id}" class="media ${elem.type} ${elem.isLive ? 'is-live' : ''}">
					<img class="picture" src="${elem.picture}" alt="" />
					<h2 class="title">${elem.title}</h2>
					<p class="description">${elem.description}</p>
					<ul class="labels">
					${elem.labels ? elem.labels.map(label => `
						<li class="label" tabindex="0">${label}</li>
					`).join('') : ''}
					</ul>
					${elem.location ? `
					<p class="location">
						<span class="city">${elem.location.city}</span>
						<span class="country">${elem.location.country}</span>
					</p>
					` : ''}
					<p class="viewers"><i class="icon icon-users"></i> ${elem.viewers || 0}</p>
					<button class="watch-later icon icon-download ${this.data.watchLaterList.includes(elem.id) ? 'strike' : ''}">
					</button>
				</li>
			`).join('')}
			</ul>
		`;
	}
}
