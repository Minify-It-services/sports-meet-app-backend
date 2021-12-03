const { User } = require('../models')

module.exports.findGameMembers = async (teams, game, playerId, alreadyTeam=false) => {
    let inGame = 0
    let teamId = ''
    let teamMembers = []

    for(let i = 0; i < teams.length; i++){
        console.log( teams[i].manager.id,  playerId)
        if(teams[i].memberIds.includes(playerId) || !alreadyTeam || JSON.stringify(teams[i].manager.id).replace('"','') === playerId || teams[i].coach === playerId){
           console.log('here')
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
