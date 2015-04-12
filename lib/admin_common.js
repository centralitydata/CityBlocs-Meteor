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
	},

	/***************************************************************************
	 * Cities
	 */
	insertCity: function (city) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Cities.insert(
			{
				name: city.name,
				hidden: city.hidden,
				councils: {}
			},
			function (err, _id) {
				if (err) {
					throw new Meteor.Error(err.error, err.reason, err.details);
				}
			}
		);
	},

	hideCity: function (id, hide) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Cities.update(
			{ _id: id },
			{	$set: { hidden: hide}	}
		);
	}
});
