/***************************************************************************
 * Routines for admin/editAbout.html
 */

Template.adminEditAbout.events({
	'submit #editAboutPage': function (e) {
		var aboutInfo = {
			heading: e.target['about-heading'].value,
			description: e.target['about-description'].value,
			acknowledgements: e.target['about-acknowledgements'].value
		};

		Meteor.call('editAboutInfo', aboutInfo);
	}
});

Template.adminEditAbout.helpers({
	about_texts: function () {
		return AboutInfo.findOne();
	}
});


/***************************************************************************
 * Routines for admin/listCities.html, shown in main admin/index.html page
 */

Template.adminListCities.helpers({
	cities: function () {
		return Cities.find({}, {sort: {name: 1}});
	},

	num_councils: function (city_id) {
		return Councils.find({'city_id': city_id}).count();
	}
});

Template.adminListCities.events({
	'click .toggle-hidden': function (event) {
		// Logically invert the hidden property
		Meteor.call('hideEntity', 'city', this._id, !this.hidden);
	},
	'click .new-city': function (event) {
		Router.go('/admin/editCity');
	}
});


/***************************************************************************
 * Routines for admin/editCity.html
 */
Template.adminEditCity.events({
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
					hidden: hidden
				};
				Meteor.call('insertCity', city);
			}

			Router.go('/admin');
		}
	},

	'click .return-admin': function (event) {
		event.preventDefault();
		Router.go('/admin');
	}
});


/***************************************************************************
 * Routines for admin/listCouncils.html
 */
Template.adminListCouncils.helpers({
	councils: function () {
		//return Councils.find({'city_id': city_id}, {sort: {'timeframe.start': 1}});
		return Councils.find({}, {
			sort: {
				'city_id': 1,
				'timeframe.start': 1,
				'name': 1
			}
		});
	},

	council_city: function (city_id) {
		return Cities.findOne({_id: city_id}).name;
	}
});

Template.adminListCouncils.events({
	'click .toggle-hidden': function (event) {
		Meteor.call('hideEntity', 'council', this._id, !this.hidden);
	},
	'click .new-council': function (event) {
		Router.go('/admin/editCouncil');
	}
});


/***************************************************************************
 * Routines for admin/editCouncil.html
 */
Template.adminEditCouncil.events({
	'submit .edit-council': function (event) {
		event.preventDefault();

		var nameTextbox = event.target.council_name;
		var name = nameTextbox.value.trim();
		var hidden = event.target.council_hidden.checked;
		var city_id = event.target.city_list.value;

		if (name === '') {
			$(nameTextbox).val(name);
			$(nameTextbox).parent().addClass('has-error');
		} else {
			if (this._id) {
				// There is an existing ID, so update the current document
				var updates = {
					name: name,
					city_id: city_id,
					hidden: hidden
				};
				Meteor.call('updateCouncil', this._id, updates);
			} else {
				// There is no existing ID, so insert a new document
				var city = {
					name: name,
					city_id: city_id,
					hidden: hidden
				};
				Meteor.call('insertCouncil', city);
			}

			Router.go('/admin');
		}
	},

	'click .return-admin': function (event) {
		event.preventDefault();
		Router.go('/admin');
	}
});
