Cities._ensureIndex('name', {unique: 1});

Meteor.publish('cities', function () {
	// By default, only show cities that are not hidden
	var selector = { hidden: {$ne: true} };
	if (this.userId) {
		selector = {}; // Show all cities if user is logged in (and so an admin)
	}
	return Cities.find(selector);
});

Meteor.publish('councils', function () {
	var selector = { hidden: {$ne: true} };
	if (this.userId) {
		selector = {};
	}
	return Councils.find(selector);
});

Meteor.publish('motions', function () {
	return Motions.find({});
});

Meteor.publish('about_info', function () {
	return AboutInfo.find();
});

Meteor.publish('contact_info', function () {
	return ContactInfo.find();
});
