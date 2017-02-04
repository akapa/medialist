import Poller from './Poller';

describe('Poller', () => {

	let poller, func;
	beforeEach(() => {
		func = jasmine.createSpy('functionToPoll');
		poller = new Poller();
		jasmine.clock().install();
	});

	afterEach(function() {
		jasmine.clock().uninstall();
	});

	it('should keep calling the passed function by the interval', () => {
		poller.start(func, 100);
		setTimeout(() => { poller.stop(); }, 300);
		jasmine.clock().tick(301);

		expect(func).toHaveBeenCalledTimes(3);
	});

	it('should stop calling it when it is stopped', () => {
		poller.start(func, 100);
		jasmine.clock().tick(101);
		poller.stop();
		jasmine.clock().tick(601);

		expect(func).toHaveBeenCalledTimes(1);
	});

});
