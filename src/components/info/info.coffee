angular.module 'Coinchoid'
.service 'Info', ->
  getHelp: (input) ->
    if input is 'capot' or input > 160
      return {
        chuSansAtout: 0
        chuToutAtout: 0
        reussiSansAtout: 0
        reussiToutAtout: 0
      }

    chuSansAtout: Math.ceil((162 - input) * 130 / 162)
    chuToutAtout: Math.ceil((162 - input) * 258 / 162)
    reussiSansAtout: Math.ceil((input) * 130 / 162)
    reussiToutAtout: Math.ceil((input) * 258 / 162)
