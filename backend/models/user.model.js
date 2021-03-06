import mongoose from "mongoose";

const _schema = mongoose.Schema(
	{
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		role: {
			type: String,
			required: true,
			ref: "Role",
			foreignField: "name",
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

export const User = mongoose.model("User", _schema);
