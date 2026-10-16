// World rules applied every time a world loads.
ServerEvents.loaded(event => {
  event.server.runCommandSilent('gamerule keepInventory true') // keep your items when you die
})
ServerEvents.loaded(event => {
  event.server.runCommandSilent('gamerule announceAdvancements false') // no advancement messages in chat
})
