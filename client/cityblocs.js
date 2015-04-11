Meteor.subscribe('cities');
Meteor.subscribe('about_info');

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.registerHelper('AppName', 'CityBlocs');

Template.cityList.helpers({
	cities: function () {
		return Cities.find({}, {sort: {name: 1}});
	}
});

Template.about.helpers({
	about_text: function () {
		return AboutInfo.findOne();
	}
});

Template.registerHelper('classIfActive', function (name, class_name) {
	var ret = {};

	if (Router.current()) {
		var loc = Router.current().location.get().path;
		if (loc === name) { ret = {class: class_name}; }
	}

	return ret;
});

/*
 *
 */
String.prototype.toTitleCase = function() {
  var i, str, lowers, uppers, midcaps;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
  'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = lowers.length - 1; i >= 0; i--) {
    str = str.replace(
			new RegExp('\\s' + lowers[i] + '\\s', 'g'),
      function(txt) {
        return txt.toLowerCase();
      }
		);
	}

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv'];
  for (i = 0, j = uppers.length; i < j; i++) {
    str = str.replace(
			new RegExp('\\b' + uppers[i] + '\\b', 'g'),
      uppers[i].toUpperCase()
		);
	}

	// Preserve CityBlocs, and possibly other words with interior capitals
	midcaps = [
		{from: 'Cityblocs', to:'CityBlocs'},
		{from: 'Mcivor', to:'McIvor'}
	];
	for (i = 0, j  = midcaps.length; i < j; i++) {
		str = str.replace(
			new RegExp('\\b' + midcaps[i].from + '\\b', 'g'),
			midcaps[i].to
		);
	}

  return str;
};
