const { User } = require('../models')

module.exports.findGameMembers = async (teams, game, playerId, alreadyTeam=false) => {
    let inGame = 0
    let teamId = ''
    let teamMembers = []

    for(let i = 0; i < teams.length; i++){
        if(teams[i].memberIds.includes(playerId) || !alreadyTeam){
            teamId = teams[i]._id
            for(let j=0; j<teams[i].memberIds.length; j++){
                if(game.type === 'duo' && alreadyTeam){
                    if(JSON.stringify(teams[i].memberIds[j]).replace(/"/g,'') !== playerId){
                        const member = await User.findById(teams[i].memberIds[j])
                        teamMembers.push(member)
                    }
                }else{
                    const member = await User.findById(teams[i].memberIds[j])
                    if(alreadyTeam){
                        teamMembers.push(member)
                    }else{
                        teamMembers.push(member.id)
                    }
                }
            }
            inGame++
        }
    }

    return { inGame, teamMembers, teamId }
}

module.exports.findGameMembersTeam = async (teams, playerId, alreadyTeam=false) => {
    let inGame = 0
    let teamId = ''
    let teamMembers = []
    let manager = {}
    let captain = {}
    let coach = {}

    for(let i = 0; i < teams.length; i++){
        if(teams[i].memberIds.includes(playerId) 
            || !alreadyTeam 
            || JSON.stringify(teams[i].manager.id).replaceAll('"','') === playerId 
            || JSON.stringify(teams[i].coach.id).replaceAll('"', '') === playerId
            || JSON.stringify(teams[i].captain.id).replaceAll('"','') === playerId    
        ){
            teamId = teams[i]._id
            manager = await User.findById(teams[i].manager.id)
            coach = await User.findById(teams[i].coach.id)
            captain = await User.findById(teams[i].captain.id)

            for(let j=0; j<teams[i].memberIds.length; j++){
                const member = await User.findById(teams[i].memberIds[j])
                if(alreadyTeam){
                    teamMembers.push(member)
                }else{
                    teamMembers.push(member.id)
                }
            }
            inGame++
        }
    }

    return { inGame, teamMembers, teamId, manager, coach, captain }
}
