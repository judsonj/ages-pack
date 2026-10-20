// Creeper explosions no longer break blocks. TNT and everything else are unaffected.
// (Players and mobs still take damage from the blast.)
NativeEvents.onEvent(Java.loadClass('net.neoforged.neoforge.event.level.ExplosionEvent$Detonate'), event => {
  var source = event.getExplosion().getDirectSourceEntity()
  if (source != null && source instanceof Java.loadClass('net.minecraft.world.entity.monster.Creeper')) {
    event.getAffectedBlocks().clear()
  }
})
