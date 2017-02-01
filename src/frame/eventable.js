import $ from 'jquery';

export default function eventable(obj) {
	return Object.assign(obj, {
		$obj: $(obj),
		on(...args) {
			return this.$obj.on(...args).get(0);
		},
		off(...args) {
			return this.$obj.off(...args).get(0);
		},
		trigger(...args) {
			return this.$obj.trigger(...args).get(0);
		}
	});
}
