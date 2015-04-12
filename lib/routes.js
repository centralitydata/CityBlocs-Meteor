Router.route('/', function () {
	this.render('home');
});

Router.route('/about', function () {
	this.render('about');
});

Router.route('/admin', function () {
	this.render('admin');
});

// Allow the _id parameter to be optional
Router.route('/admin/editCity/:_id?', function () {
	this.render('admin_editCity', {
		data: function () {
			var toEdit = Cities.findOne({_id: this.params._id});
			return {params: this.params};
		}
	});
});
