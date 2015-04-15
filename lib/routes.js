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
	this.render('adminEditCity', {
		data: function () {
			return Cities.findOne({ _id: this.params._id });
		}
	});
});

Router.route('/admin/editCouncil/:_id?', function () {
	this.render('adminEditCouncil', {
		data: function () {
			return Councils.findOne({ _id: this.params._id });
		}
	});
});

/*
Router.route('/admin/editCity/:cityid/edit_council/:_id?', function () {
	this.render('admin_editCouncil', {
		data: function () {
			var city = Cities.findOne({ _id: this.params.cityid });
			var council = city.
		}
	})
});

*/
