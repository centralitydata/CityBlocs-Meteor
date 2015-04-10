Template.editAbout.events({
	'submit #editAboutPage': function (e) {
		var aboutInfo = {
			heading: e.target['about-heading'].value,
			description: e.target['about-description'].value,
			acknowledgements: e.target['about-acknowledgements'].value
		};

		Meteor.call('editAboutInfo', aboutInfo);
	}
});

Template.editAbout.helpers({
	about_texts: function () {
		return AboutInfo.findOne();
	}
});
