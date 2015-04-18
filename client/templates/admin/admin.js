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
Template.adminEditCity.onCreated(function () {
	// Clear any previous locally storeed councillors
	Session.set('localCouncillors');
});

Template.adminEditCity.helpers({
	localCouncillors: function () {
		if (!Session.get('localCouncillors')) {
			Session.set('localCouncillors', this.councillors || []);
		}
		return Session.get('localCouncillors');
	}
});

Template.adminEditCity.events({
	'submit .edit-city': function (event) {
		event.preventDefault();

		var nameTextbox = event.target.city_name;
		var name = nameTextbox.value.trim();
		var hidden = event.target.city_hidden.checked;
		var councillors = Session.get('localCouncillors');
		// Councillors can be deleted by removing their names, which is
		// accomplished here by removing elements from the locally stored array
		// of councillors if they are blank.
		councillors = _.filter(councillors, function (c) {
			return c.trim() !== '';
		});

		if (name === '') {
			$(nameTextbox).val(name);
			$(nameTextbox).parent().addClass('has-error');
		} else {
			if (this._id) {
				// There is an existing ID, so update the current document
				var updates = {
					name: name,
					hidden: hidden,
					councillors: councillors
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
	},

	'click #new-councillor': function (event) {
		event.preventDefault();

		// Retrieve the current set of locally stored councillors
		var councillors = Session.get('localCouncillors');
		// Add a nameless new councillor
		councillors.push('');
		// Update the stored values
		Session.set('localCouncillors', councillors);
	},

	'blur .councillor-name': function (event) {
		// Get the index of the councillor that was just potentially edited
		var idx = event.target.attributes['data-index'].value;
		// Retrieve the current set of locally stored councillors
		var councillors = Session.get('localCouncillors');
		// Save the current value of the potentially edited councillor
		councillors[idx] = event.target.value;
		// Update the stored values
		Session.set('localCouncillors', councillors);
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
