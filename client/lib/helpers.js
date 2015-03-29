Template.body.helpers({
  pageIs: function (targetPage) {
		return targetPage === Session.get('currentPage');
	}	
});
