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

		// Add the default empty array of councils, so that councils.length will
		// be '0' instead of '' in the admin list of cities.
		city.councils = [];
		Cities.insert(city);
	},

	updateCity: function (_id, updates) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Cities.update(_id, {$set: updates});
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
