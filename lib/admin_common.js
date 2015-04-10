Meteor.methods({
	editAboutInfo: function (about) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		AboutInfo.update(
			{ _id: 1 }, // Always keep only one record, so just id it '1'
			{
				$set: {
					heading: about.heading,
					description: about.description,
					acknowledgements: about.acknowledgements
				}
			},
			{ upsert: true }
		);
	}
});
