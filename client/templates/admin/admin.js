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
 * Helpers for admin/listCities.html
 */
Template.admin_listCities.helpers({
	cities: function () {
		return Cities.find({}, {sort: {name: 1}});
	}
});
