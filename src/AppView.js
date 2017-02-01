import View from './frame/View';

export default class AppView extends View {
	defaultData() {
		return {
			media: []
		};
	}

	template() {
		return `
			<article class="medialist">
				<div class="filters">filters</div>
				<ul>
				${this.data.media.map((elem) => `
					<li data-id="${elem.id}" class="${elem.type} ${elem.isLive ? 'is-live' : ''}">
						<img class="picture" src="${elem.picture}" alt="" />
						<h2 class="title">${elem.title}</h2>
						<p class="description">${elem.description}</p>
						<ul class="labels">
						${elem.labels.map(label => `
							<li>${label}</li>
						`).join('')}
						</ul>
						<p class="location">${elem.location.city}, ${elem.location.country}</p>
					</li>
				`).join('')}
				</ul>
			</article>
		`;
	}
}
