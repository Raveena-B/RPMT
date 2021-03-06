import { Group } from "../models/group.model";

const createGroup = async (group) => {
	group = {
		name: group.name,
		projectId: group.projectId,
	};

	const _group = new Group(group);
	await _group.save();

	return getGroup(_group.id);
};

const getGroup = (id) => {
	return Group.findById(id)
		.populate({
			path: "project",
			populate: {
				path: "submissions",
			},
		})
		.populate({
			path: "students",
			populate: {
				path: "user",
				select: {
					email: 1,
					_id: 1,
				},
			},
		});
};

const getGroups = () => {
	return Group.find().populate("project").populate("students");
};

const assignPanelMember = async (groupId, panelMemberId) => {
	const group = await Group.findById(groupId);
	group.panelMemberId = panelMemberId;
	await group.save();

	return getGroup(groupId);
};

const addProjectToGroup = async (groupId, projectId) => {
	const group = await Group.findById(groupId);
	group.projectId = projectId;
	await group.save();
	return group;
};

export const groupsService = {
	createGroup,
	getGroup,
	getGroups,
	assignPanelMember,
	addProjectToGroup,
};
