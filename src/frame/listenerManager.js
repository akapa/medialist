export default function listenerManager(obj) {
	return Object.assign(obj, {
		attachListeners(listeners, context) {
			this.switchListeners(listeners, context, 'on');
		},
		removeListeners(listeners, context) {
			this.switchListeners(listeners, context, 'off');
		},
		switchListeners(listeners, context, way) {
			Object.keys(listeners).forEach((key) => {
				const keyParts = key.split('@');
				if (keyParts.length > 1) context[way](keyParts[0], keyParts[1], listeners[key]);
				else context[way](key, listeners[key]);
			});
		}
	});
}
