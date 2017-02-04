export default class WatchLaterList {
	constructor(storageKey) {
		this.list = [];
		this.storageKey = storageKey || 'watchLater';
	}

	add(id) {
		if (!this.list.includes(id)) this.list.push(id);
		this.save();
	}

	remove(id) {
		const index = this.list.indexOf(id);
		if (index !== -1) {
			this.list.splice(index, 1);
			this.save();
		}
	}

	load() {
		const stored = window.localStorage.getItem(this.storageKey);
		this.list = stored ? JSON.parse(stored) : [];
		return this.list;
	}

	save() {
		window.localStorage.setItem(this.storageKey, JSON.stringify(this.list));
	}

	clean(ids) {
		// we want to keep the reference here!
		const filtered = this.list.filter(elem => ids.includes(elem));
		this.list.length = 0;
		this.list.push(...filtered);
		this.save();
	}
}
