Meteor.subscribe('cities');
Meteor.subscribe('about_text');

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.cityList.helpers({
	cities: function () {
		return Cities.find({}, {sort: {name: 1}});
	}
});

Template.registerHelper('classIfActive', function (name, class_name) {
	var ret = {};

	if (Router.current()) {
		var loc = Router.current().location.get().path;
		if (loc === name) { ret = {class: class_name}; }
	}

	return ret;
});
