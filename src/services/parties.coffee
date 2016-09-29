angular.module 'Coinchoid'
.service 'Parties', ->
  parties = []

  addScore: (team, annonce, bonus) ->
    if team is 'NOUS'
      parties.push {
        nous: annonce,
        eux: 0
      }
    else
      parties.push {
        nous: 0,
        eux: annonce
      }
  get: ->
    parties
