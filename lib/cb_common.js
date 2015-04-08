// Define a new collection in the global namespace (so no 'var')
Cities = new Mongo.Collection('cities');
AboutText = new Mongo.Collection('about');

Accounts.config({
	sendVerificationEmail: true,
	restrictCreationByEmailDomain: 'centrality.ca'
});
