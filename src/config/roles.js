const allRoles = {
  user: ['getUser', 'manageUser'],
  admin: [
    'getUsers', 
    'getUser',
    'manageUser',
    'manageUsers', 
    'getUser', 
    'manageUser', 
    'manageNotice', 
    'manageSport', 
    'manageMatch', 
    'manageResult',
    'manageTeam',
  ],
};

const allGameRoles = {
  player: ['leaveTeam'],
  captain: ['leaveTeam'],
  coach: ['leaveTeam', 'manageTeam'],
  manager: ['leaveTeam', 'manageTeam', 'removeTeam'],
}

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

const gameRoles = Object.keys(allGameRoles);
const gameRoleRights = new Map(Object.entries(allGameRoles));

module.exports = {
  roles,
  roleRights,
  gameRoles,
  gameRoleRights,
};
