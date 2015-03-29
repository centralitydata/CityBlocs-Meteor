Template.body.events({
	'click .nav-home': function () {
		Session.set('currentPage', 'home');
	},

	'click .nav-about': function () {
		Session.set('currentPage', 'about');
	}
})
