import View from './frame/View';

export default class MediaFilter extends View {
	defaultData() {
		return {
			sort: {},
			filter: {},
			sortOptions: ['id', 'description', 'title', 'location', 'viewers'],
			sortDirections: ['asc', 'desc']
		};
	}

	listeners() {
		return {
			'submit@form': (event) => {
				event.preventDefault();
				const $form = this.$element.find('form');

				// bringing stuff to { key: value } format instead of jQuery's [{ name: key, value: value }]
				const reductor = (memo, current) => Object.assign(memo, { [current.name]: current.value });
				const formData = $form.serializeArray().reduce(reductor, {});

				this.trigger('change', formData);
			},
			'change@input,select': () => { this.$element.find('form').submit(); }
		};
	}

	template() {
		return `
			<form>
				<fieldset class="sort">
					<label>
						<span class="labeltext">Rendezés</span>
						<select name="sortProp">
						${this.data.sortOptions.map((key) => `
							<option value="${key}" ${key === this.data.sort.prop ? 'selected' : ''}>${key}</option>
						`).join('')}
						</select>
					</label>
					<label>
						<span class="labeltext">Irány</span>
						<select name="sortDirection">
						${this.data.sortDirections.map((key) => `
							<option value="${key}" ${key === this.data.sort.direction ? 'selected' : ''}>${key}</option>
						`).join('')}
						</select>
					</label>
				</fieldset>
			</form>
		`;
	}
}
