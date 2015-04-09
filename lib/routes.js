Router.route('/', function () {
	this.render('home');
});

Router.route('/about', function () {
	this.render('about');
});

Router.route('/admin', function () {
	this.render('admin');
});
