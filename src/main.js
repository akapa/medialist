import App from './App';
import AppView from './AppView';
import ApiMediaSource from './ApiMediaSource';
import Poller from './frame/Poller';

export default function main() {
	const endpoint = 'http://146.185.158.18/fake_api.php';

	const app = new App({
		dataSource: new ApiMediaSource(endpoint),
		poller: new Poller()
	});

	new AppView('.app', {}, app).build();
}
