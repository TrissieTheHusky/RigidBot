module.exports = rigidbot => {
	
	const utils = rigidbot.utils;
	
	utils.rootUser = id => {
		return id == "332914508395839490" || id == "713654447796125757";
	};
	utils.hasPerm = (member, permission) => {
		return member.hasPermission(permission) || utils.rootUser(member.user.id);
	};
	
};