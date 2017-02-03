import View from './frame/View';

export default class MediaFilter extends View {
	defaultData() {
		return {
			sort: {},
			filter: [],
			polling: 10,
			sortOptions: ['id', 'description', 'title', 'location', 'viewers'],
			sortDirections: ['asc', 'desc'],
			filters: ['channel', 'recorded', 'off']
		};
	}

	listeners() {
		return {
			'submit@form': this.handleSubmit.bind(this),
			'change@input,select': (event) => { this.$element.find(event.target).closest('form').submit(); }
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		const $form = this.$element.find(event.target).closest('form');

		// bringing stuff to { key: value } format instead of jQuery's [{ name: key, value: value }]
		const reductor = (memo, current) => {
			if (current.name.slice(-2) === '[]') {
				const key = current.name.slice(0, -2);
				if (!(key in memo)) memo[key] = [];
				memo[key].push(current.value);
				return memo;
			}
			return Object.assign(memo, { [current.name]: current.value });
		};
		const formData = $form.serializeArray().reduce(reductor, {});

		this.trigger('change', formData);
	}

	template() {
		return `
			<form class="sort-filter">
				<fieldset class="sort">
					<label>
						<span class="labeltext">Sort by</span>
						<select name="sortProp">
						${this.data.sortOptions.map((key) => `
							<option value="${key}" ${key === this.data.sort.prop ? 'selected' : ''}>${key}</option>
						`).join('')}
						</select>
					</label>
					${this.data.sortDirections.map((key) => `
						<label class="switch">
							<input type="radio" name="sortDirection" value="${key}" ${key === this.data.sort.direction ? 'checked' : ''}>
							<i class="icon icon-sort-alpha-${key}"></i>
							<span class="labeltext">${key}</span>
						</label>
					`).join('')}
				</fieldset>
				<fieldset class="filters">
				${this.data.filters.map((key) => `
					<label class="switch strike">
						<input type="checkbox" name="filter[]" value="${key}" ${this.data.filter.includes(key) ? 'checked' : ''}>
						<i class="icon icon-${key}"></i>
						<span class="labeltext">${key}</span>
					</label>
				`).join('')}
				</fieldset>
			</form>
			<form class="other">
				<fieldset class="settings">
					<label>
						<span class="labeltext">Polling interval</span>
						<input type="number" name="polling" value="${this.data.polling}" min="4" max="100" />
						<span>seconds</span>
					</label>
				</fieldset>
			</form>
		`;
	}
}
