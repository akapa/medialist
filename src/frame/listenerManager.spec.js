import listenerManager from './listenerManager';

describe('listenerManager', () => {

	let obj, context, listeners;
	beforeEach(() => {
		obj = listenerManager({});
		context = {
			on: () => {},
			off: () => {}
		};
		listeners = {
			'foo': () => {},
			'bar@baz': () => {}
		};
	});

	it('should invoke specified listener method for context', () => {
		spyOn(context, 'on');
		obj.switchListeners(listeners, context, 'on');

		expect(context.on).toHaveBeenCalledWith('foo', listeners.foo);
		expect(context.on).toHaveBeenCalledWith('bar', 'baz', listeners['bar@baz']);
	});

	it('should attach listener', () => {
		spyOn(context, 'on');
		obj.attachListeners(listeners, context);

		expect(context.on).toHaveBeenCalledWith('foo', listeners.foo);
	});

	it('should remove listener', () => {
		spyOn(context, 'off');
		obj.removeListeners(listeners, context);

		expect(context.off).toHaveBeenCalledWith('foo', listeners.foo);
	});

});
