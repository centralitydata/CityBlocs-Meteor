/*
 * Helpers for admin/editAbout.html
 */
Template.admin_editAbout.events({
	'submit #editAboutPage': function (e) {
		var aboutInfo = {
			heading: e.target['about-heading'].value,
			description: e.target['about-description'].value,
			acknowledgements: e.target['about-acknowledgements'].value
		};

		Meteor.call('editAboutInfo', aboutInfo);
	}
});

Template.admin_editAbout.helpers({
	about_texts: function () {
		return AboutInfo.findOne();
	}
});


/*
 * Routines for admin/listCities.html
 */
Template.admin_listCities.helpers({
	cities: function () {
		return Cities.find({}, {sort: {name: 1}});
	}
});

Template.admin_listCities.events({
	'click .toggle-hidden': function () {
		// Logically invert the hidden property
		Meteor.call('hideCity', this._id, !this.hidden);
	},
	'click .add-city': function () {

	}
});


/*
 * Routines for admin/editCity.html
 */
Template.admin_editCity.events({
	'submit .edit-city': function (e) {
		var city = {
			name: e.target.city_name.value,
			hidden: e.target.city_hidden.value
		};
		Meteor.call('insertCity', city);
	}
});
