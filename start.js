require.config({
	paths: {
		'jquery': 'node_modules/jquery/dist/jquery'
	}
});

requirejs(['build/main'], function (main) {
	main.default();
});