angular.module 'Coinchoid'
.service 'Parties', (localStorageService) ->
  parties = localStorageService.get('results') or []

  getCumulativeScore = ->
    cumulativeResult = [{
      nous: 0
      eux: 0
    }]
    for partie in parties
      [..., last] = cumulativeResult
      cumulativeResult.push {
        nous: partie.nous + last.nous
        eux: partie.eux + last.eux
      }
    return cumulativeResult

  addScore: (team, annonce, bonus) ->
    score = annonce
    if bonus is 'COINCHE'
      score = score * 2
    if bonus is 'SURCOINCHE'
      score = score * 4
    if team is 'NOUS'
      parties.push {
        nous: score
        eux: 0
      }
    else
      parties.push {
        nous: 0
        eux: score
      }
    localStorageService.set('results', parties)

  getCumulativeScore: getCumulativeScore

  get: ->
    parties
  reset: ->
    parties = []
  getScore: =>
    [..., last] = getCumulativeScore()
    return last
