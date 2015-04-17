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

	hideEntity: function (type, id, hide) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		var col;
		if (type === 'city') {
			col = Cities;
		} else if (type === 'council') {
			col = Councils;
		}

		if (col) {
			col.update(
				{ _id: id },
				{	$set: { hidden: hide}	}
			);
		}
	},

	/***************************************************************************
	 * Cities
	 */
	insertCity: function (city) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Cities.insert(city);
	},

	updateCity: function (_id, updates) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Cities.update(_id, {$set: updates});
	},

	/***************************************************************************
	 * Councils
	 */
	insertCouncil: function (council) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Councils.insert(council);
	},

	updateCouncil: function (_id, updates) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Councils.update(_id, {$set: updates});
	},






	editTestDataObject: function () {
		var id = Cities.findOne()._id;
		Cities.update({
			_id: id,
			'councils.name': 'Council 1.6'
		},{
			$set: {
				'councils.$': {
					'hidden': true
				}
			}
		});

		Cities.update({
			_id: id,
			'councils.name': 'Council 1.9',
			'councils.motions.name': 'Motion 1.9.26'
		},{
			$set: {
				'councils.9.motions.26.date': new Date()
			}
		});
	},

	makeFakeData: function () {
		var i, j, id;
		var city, council;
		for (i = 1; i <= 3; i++) {
			city = {
				name: 'City ' + i,
				hidden: false
			};
			id = Cities.insert(city);
			for (j = 1; j <= 5; j++) {
				council = {
					name: 'Council ' + i + '-' + j,
					city_id: id,
					hidden: false,
					timeframe: {
						start: new Date (2000 + j, 2),
						finish: new Date (2000 + j + 1, 1)
					}
				};
				Councils.insert(council);
			}
		}
	}
});
