import View from './frame/View';

export default class MediaList extends View {
	defaultData() {
		return {
			media: []
		};
	}

	template() {
		return `
			<ul class="list">
			${this.data.media.map((elem) => !elem ? '' : `
				<li data-id="${elem.id}" class="media ${elem.type} ${elem.isLive ? 'is-live' : ''}">
					<img class="picture" src="${elem.picture}" alt="" />
					<h2 class="title">${elem.title}</h2>
					<p class="description">${elem.description}</p>
					<ul class="labels">
					${elem.labels && elem.labels.map(label => `
						<li class="label" tabindex="0">${label}</li>
					`).join('')}
					</ul>
					<p class="location">
						<span class="city">${elem.location.city}</span>
						<span class="country">${elem.location.country}</span>
					</p>
					<p class="viewers">${elem.viewers}</p>
				</li>
			`).join('')}
			</ul>
		`;
	}
}
