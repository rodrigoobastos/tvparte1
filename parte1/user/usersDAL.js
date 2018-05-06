var db = require('../db');
class UsersDAL {
	constructor(){
		this.User = db.Mongoose.model('user', db.UserSchema, 'users');
	}

	getAllUsers () {
		return this.User.find({}).lean();
	}
	getUserById (IdObject) {
		return this.User.find({_id: IdObject.id }).lean();
	}
	postUser (NewObject) {
		var newuser = new this.User({
			email: NewObject.email, 
			first_name: NewObject.first_name, 
			last_name: NewObject.last_name, 
			personal_phone: NewObject.personal_phone 
		});
		newuser.save(function (err) {});
	}
	putUserById (IdObject, UpdateObject) {
		this.User.findOneAndUpdate({_id: IdObject.id }, UpdateObject, { upsert: true }, function (err, doc) {});
	}
	deleteUserById (IdObject) {
		this.User.find({_id: IdObject.id }).remove(function(err) {});
	}
}
module.exports = UsersDAL;