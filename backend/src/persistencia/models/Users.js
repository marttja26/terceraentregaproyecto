import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	address: {
		type: String,
		require: true,
	},
	age: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	phone: {
		type: Number,
		require: true,
	},
	avatar: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const UserModel = mongoose.model('users', UserSchema);

export {UserModel};
