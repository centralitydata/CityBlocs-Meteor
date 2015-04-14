// Define a new collection in the global namespace (so no 'var')
Cities = new Mongo.Collection('cities');
Councils = new Mongo.Collection('councils');
Motions = new Mongo.Collection('motions');
AboutInfo = new Mongo.Collection('about_info');

Accounts.config({
	sendVerificationEmail: true,
	restrictCreationByEmailDomain: 'centrality.ca'
});
