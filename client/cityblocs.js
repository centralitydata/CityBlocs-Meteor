Meteor.subscribe('cities');
Meteor.subscribe('about_text');

Template.cityList.helpers({
	cities: function () {
		return Cities.find({}, {sort: {name: 1}});
	}
});
