import App from './App';
import AppView from './AppView';
import ApiMediaSource from './ApiMediaSource';

export default function main() {
	const endpoint = 'http://146.185.158.18/fake_api.php';

	const ctrl = new App(new AppView('.app'), {
		dataSource: new ApiMediaSource(endpoint)
	});
	ctrl.start();
}
