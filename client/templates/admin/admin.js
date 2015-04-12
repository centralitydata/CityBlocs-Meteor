/***************************************************************************
 * Routines for admin/editAbout.html
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


/***************************************************************************
 * Routines for admin/listCities.html, shown in main admin/index.html page
 */

Template.admin_listCities.helpers({
	cities: function () {
		return Cities.find({}, {sort: {name: 1}});
	}
});

Template.admin_listCities.events({
	'click .toggle-hidden': function (event) {
		// Logically invert the hidden property
		Meteor.call('hideCity', this._id, !this.hidden);
	},
	'click .new-city': function (event) {
		Router.go('/admin/editCity');
	}
});


/***************************************************************************
 * Routines for admin/editCity.html
 */

Template.admin_editCity.helpers({

});

Template.admin_editCity.events({
	'submit .edit-city': function (event) {
		event.preventDefault();

		var nameTextbox = event.target.city_name;
		var name = nameTextbox.value.trim();
		var hidden = event.target.city_hidden.checked;

		if (name === '') {
			$(nameTextbox).val(name);
			$(nameTextbox).parent().addClass('has-error');
		} else {
			if (this._id) {
				// There is an existing ID, so update the current document
				var updates = {
					name: name,
					hidden: hidden
				};
				Meteor.call('updateCity', this._id, updates);
			} else {
				// There is no existing ID, so insert a new document
				var city = {
					name: name,
					hidden: hidden,
					councils: []
				};
				Meteor.call('insertCity', city);
			}

			Router.go('/admin');
		}
	}
});
