const { User } = require('../models')

const findGameMembers = async (teams, game, playerId, alreadyTeam=false) => {
    let inGame = 0
    let teamId = ''
    let teamMembers = []

    for(let i = 0; i < teams.length; i++){
        if(teams[i].memberIds.includes(playerId)){
            teamId = teams[i]._id
            for(let j=0; j<teams[i].memberIds.length; j++){
                if(game.type === 'duo' && alreadyTeam){
                    if(JSON.stringify(teams[i].memberIds[j]).replaceAll('"','') !== playerId){
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

module.exports = findGameMembers