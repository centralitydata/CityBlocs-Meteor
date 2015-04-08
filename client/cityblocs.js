Meteor.subscribe('cities');
Meteor.subscribe('about_text');

Accounts.config({
	sendVerificationEmail: true,
	restrictCreationByEmailDomain: 'centrality.ca'
});
Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.cityList.helpers({
	cities: function () {
		return Cities.find({}, {sort: {name: 1}});
	}
});
