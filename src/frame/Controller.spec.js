import Controller from './Controller';

describe('Controller', () => {

	let ctrl;
	beforeEach(() => {
		ctrl = new Controller();
	});

	it('should execute its overridable body on start', () => {
		spyOn(ctrl, 'body');
		ctrl.start();
		expect(ctrl.body).toHaveBeenCalled();
	});

	it('should be able access the passed services', () => {
		const ctrl2 = new Controller({ foo: { bar: 1 } });
		expect(ctrl2.services.foo.bar).toBe(1);
	});

	it('should refresh the view', () => {
		ctrl.view = { render: () => {} };
		spyOn(ctrl.view, 'render');

		ctrl.refreshView();
		expect(ctrl.view.render).toHaveBeenCalled();
	});

	it('should call the passed factory function by default', () => {
		const obj = { a: 1 };
		const factory = () => obj;
		expect(ctrl.createChildView('foo', factory)).toBe(obj);
	});

});
