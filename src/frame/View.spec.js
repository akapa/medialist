import View from './View';
import Controller from './Controller';

describe('View', () => {

	let view, elem;
	beforeEach(() => {
		elem = document.createElement('div');
		document.body.appendChild(elem);
		view = new View(elem, { foo: 1 });
	});

	afterEach(() => {
		document.body.removeChild(elem);
	});

	it('should be eventable and manage listeners', () => {
		expect(view.on).toEqual(jasmine.any(Function));
		expect(view.off).toEqual(jasmine.any(Function));
		expect(view.trigger).toEqual(jasmine.any(Function));
		expect(view.attachListeners).toEqual(jasmine.any(Function));
		expect(view.removeListeners).toEqual(jasmine.any(Function));
	});

	it('should create a controller if not given', () => {
		expect(view.controller).toEqual(jasmine.any(Controller));
	});

	it('should tie itself to its controller', () => {
		expect(view.controller.view).toBe(view);
	});

	it('should start up the controller when built and stop when destroyed', () => {
		spyOn(view.controller, 'start');
		spyOn(view.controller, 'stop');
		view.build();
		expect(view.controller.start).toHaveBeenCalled();
		view.destroy();
		expect(view.controller.stop).toHaveBeenCalled();
	});

	it('should destroy itself first when rendered', () => {
		spyOn(view, 'destroy');
		view.render();
		expect(view.destroy).toHaveBeenCalled();
	});

	it('should build the DOM when rendered and empty when destroyed', () => {
		const html = '<button>1234</button>';
		view.template = () => html;

		view.render();
		expect(elem.innerHTML).toBe(html);
		view.destroy();
		expect(elem.innerHTML).toBe('');
	});

	it('should attach DOM listeners when rendered and remove when destroyed', () => {
		view.template = () => '<button>1234</button>';

		const ls = { 'foo': () => {} };
		view.listeners = () => ls;
		spyOn(ls, 'foo');

		view.render();

		view.$element.trigger('foo', 45);
		expect(ls['foo']).toHaveBeenCalledWith(jasmine.any(Object), 45);

		view.destroy();
		view.$element.trigger('foo', 45);
		expect(ls['foo']).toHaveBeenCalledTimes(1);
	});

	it('should invoke child rendering when rendered', () => {
		const children = {
			foo: () => {},
			bar: () => {}
		};
		view.childViews = () => children;
		spyOn(view, 'renderChild');
		
		view.render();

		expect(view.renderChild).toHaveBeenCalledWith('foo', children.foo);
		expect(view.renderChild).toHaveBeenCalledWith('bar', children.bar);
	});

	it('should instantiate child views correctly, build them and attach listeners - and back on destroy', () => {
		const instance = {
			build: () => {},
			destroy: () => {}
		};
		spyOn(instance, 'build');
		spyOn(instance, 'destroy');

		const key = 'foo';
		const definition = {
			factory: () => instance,
			listeners: {
				'foo': () => {},
				'bar': () => {}
			}
		};
		
		spyOn(view, 'attachListeners');
		spyOn(view, 'removeListeners');
		spyOn(view.controller, 'createChildView').and.callThrough();

		view.renderChild(key, definition);

		expect(view.controller.createChildView).toHaveBeenCalledWith(key, definition.factory);
		expect(instance.$definition).toBe(definition);
		expect(instance.build).toHaveBeenCalledTimes(1);
		expect(view.attachListeners).toHaveBeenCalledWith(definition.listeners, instance);

		view.destroy();

		expect(view.removeListeners).toHaveBeenCalledWith(definition.listeners, instance);
		expect(instance.destroy).toHaveBeenCalledTimes(1);
	})

});
