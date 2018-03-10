
bot.hear('vtip', (payload, chat) => {
    const rekniPrvniVtip = (convo) => {
      chat.say('Co řekne arabský včelař, když mu uletí včely? Ach med.', {typing: 2000}).then(() => libilSeVtip(convo))
    }
    
    const rekniDruhyVtip = (convo) => {
      chat.say('Pokud mají zubaři živobytí ze zkažených zubů, proč bych měl kupovat pastu, kterou 4/5 z nich doporučují?')
      convo.end()
    }
  
    const libilSeVtip = (convo) => {
      convo.ask({text: "Líbil se ti tento vtip?",
                 quickReplies: ["Ano", "Ne"]}, (payload, convo) => {
        var nazor = payload.message.text;
        if (nazor == "Ano") {
          convo.set("nazor", nazor)
          convo.say("Tak si ho poslechni ještě jednou! ").then(() => rekniPrvniVtip(convo));
        } else if (convo.get('nazor') != null && nazor != convo.get('nazor')) {
          convo.say("Rozmyslel sis to, jo? Tak teda jinej! ").then(() => rekniDruhyVtip(convo));
        } else {
          convo.say("Tak zkusme jiný vtip!").then(() => rekniDruhyVtip(convo));
        }
      }, {typing: 2000})
    }
    
    chat.conversation((convo) => {
      rekniPrvniVtip(convo)
    })
  })