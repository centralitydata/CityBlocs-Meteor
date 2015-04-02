Meteor.publish('cities', function () {
	return Cities.find();
});

Meteor.publish('about_text', function () {
	return AboutText.find();
})
