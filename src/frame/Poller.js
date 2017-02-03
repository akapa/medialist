export default class Poller {
	start(func, ms) {
		this.timeout = setTimeout(() => {
			func();
			this.start(func, ms);
		}, ms);
	}

	stop() {
		clearTimeout(this.timeout);
	}
}
