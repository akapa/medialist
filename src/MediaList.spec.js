import MediaList from './MediaList';
import $ from 'jquery';

describe('MediaList view', () => {

	let ml, elem;
	beforeEach(() => {
		elem = document.createElement('div');
		ml = new MediaList(elem);
	});

	it('should emit event when Watch Later button is clicked', () => {
		spyOn(ml, 'watchLater').and.callThrough();
		
		ml.data.media = [{ id: 1 }];
		ml.render();

		const handler = jasmine.createSpy('handler');
		const $button = ml.$element.find('.watch-later');

		ml.on('watchLater', handler);
		ml.watchLater($.Event('click', { target: $button.get(0) }));

		expect(ml.watchLater).toHaveBeenCalled();
		expect(handler).toHaveBeenCalledWith(jasmine.any(Object), 1);
		handler.calls.reset();

		ml.off('watchLater');
		ml.on('dontWatchLater', handler);
		ml.watchLater($.Event('click', { target: $button.get(0) }));
		expect(handler).toHaveBeenCalledWith(jasmine.any(Object), 1);
	});

});
