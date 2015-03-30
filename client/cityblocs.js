Meteor.subscribe('cities');

Template.cityList.helpers({
	cities: function () {
		return Cities.find();
	}
});
