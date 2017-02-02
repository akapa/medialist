import View from './frame/View';

export default class MediaFilter extends View {
	defaultData() {
		return {
			sort: {},
			filter: {},
			sortOptions: ['id', 'date', 'description', 'title', 'location', 'viewers'],
			sortDirections: ['asc', 'desc']
		};
	}

	listeners() {
		return {
			'submit@form': (event) => {
				event.preventDefault();
				this.trigger('change', this.$element.find('form').serialize());
			}
		};
	}

	template() {
		return `
			<form>
				<fieldset class="sort">
					<label>
						<span class="labeltext">Rendezés</span>
						<select>
						${this.data.sortOptions.map((key) => `
							<option value="${key}" ${key === this.data.sort.prop ? 'selected' : ''}>${key}</option>
						`).join('')}
						</select>
					</label>
					<label>
						<span class="labeltext">Irány</span>
						<select>
						${this.data.sortDirections.map((key) => `
							<option value="${key}" ${key === this.data.sort.direction ? 'selected' : ''}>${key}</option>
						`).join('')}
						</select>
					</label>
					<button type="submit">Do</submit>
				</fieldset>
			</form>
		`;
	}
}
