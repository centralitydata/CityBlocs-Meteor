Meteor.publish('cities', function () {
	return Cities.find();
});

Meteor.publish('about_info', function () {
	return AboutInfo.find();
});
