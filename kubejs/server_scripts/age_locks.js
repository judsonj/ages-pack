// Age locks: each age's key recipes need that age's Seal in the grid.
// The Seal comes from the previous age's Gate quest and is never consumed.
// A later seal opens every older lock too: each lock takes the tag
// kubejs:seals/<seal>, which holds that seal and every seal after it.

const SEAL_LADDER = ['seal_of_stone', 'seal_of_bronze', 'seal_of_iron', 'seal_of_the_kinetic_age',
  'seal_of_brass', 'seal_of_steel', 'seal_of_the_spark']

ServerEvents.tags('item', event => {
  SEAL_LADDER.forEach((seal, i) => {
    event.add('kubejs:seals/' + seal, SEAL_LADDER.slice(i).map(s => 'kubejs:' + s))
  })
})

ServerEvents.recipes(event => {
  // Rebuild a shaped recipe with the seal placed in the first empty slot (Z).
  const locked = (removeId, output, pattern, key, seal, idSuffix) => {
    if (removeId) event.remove({ id: removeId })
    const rows = pattern.map(r => r.padEnd(3, ' '))
    while (rows.length < 3) rows.push('   ')
    let placed = false
    const out = rows.map(r => r.split('').map(c => {
      if (!placed && c === ' ') { placed = true; return 'Z' }
      return c
    }).join(''))
    key.Z = '#kubejs:seals/' + seal
    event.shaped(output, out, key).keepIngredient('#kubejs:seals/' + seal).id('kubejs:locked/' + output.replace(/^\d+x /, '').replace(':', '/') + (idSuffix || ''))
  }

  // Stone Age: the furnace
  locked('minecraft:furnace', 'minecraft:furnace', ['CCC', 'C C', 'CCC'], { C: '#minecraft:stone_crafting_materials' }, 'seal_of_stone')

  // Iron Age: iron tools and armor
  const I = 'minecraft:iron_ingot', S = 'minecraft:stick'
  locked('minecraft:iron_pickaxe', 'minecraft:iron_pickaxe', ['III', ' S ', ' S '], { I: I, S: S }, 'seal_of_iron')
  locked('minecraft:iron_axe', 'minecraft:iron_axe', ['II ', 'IS ', ' S '], { I: I, S: S }, 'seal_of_iron')
  locked('minecraft:iron_shovel', 'minecraft:iron_shovel', [' I ', ' S ', ' S '], { I: I, S: S }, 'seal_of_iron')
  locked('minecraft:iron_hoe', 'minecraft:iron_hoe', ['II ', ' S ', ' S '], { I: I, S: S }, 'seal_of_iron')
  locked('minecraft:iron_sword', 'minecraft:iron_sword', [' I ', ' I ', ' S '], { I: I, S: S }, 'seal_of_iron')
  locked('minecraft:iron_helmet', 'minecraft:iron_helmet', ['III', 'I I', '   '], { I: I }, 'seal_of_iron')
  locked('minecraft:iron_chestplate', 'minecraft:iron_chestplate', ['I I', 'III', 'III'], { I: I }, 'seal_of_iron')
  locked('minecraft:iron_leggings', 'minecraft:iron_leggings', ['III', 'I I', 'I I'], { I: I }, 'seal_of_iron')
  locked('minecraft:iron_boots', 'minecraft:iron_boots', ['I I', 'I I', '   '], { I: I }, 'seal_of_iron')

  // Kinetic Age: Andesite Alloy, the first Create material
  locked('create:crafting/materials/andesite_alloy', 'create:andesite_alloy', ['BA', 'AB'], { A: 'minecraft:andesite', B: '#c:nuggets/iron' }, 'seal_of_the_kinetic_age')
  locked('create:crafting/materials/andesite_alloy_from_zinc', 'create:andesite_alloy', ['BA', 'AB'], { A: 'minecraft:andesite', B: '#c:nuggets/zinc' }, 'seal_of_the_kinetic_age', '_from_zinc')

  // Brass Age: the Blaze Burner (needed for heated mixing, and so for brass)
  locked('create:crafting/kinetics/empty_blaze_burner', 'create:empty_blaze_burner', [' I ', 'IAI', ' I '], { I: '#c:plates/iron', A: '#c:netherracks' }, 'seal_of_brass')

  // Steel Age: the TFMG Coke Oven (coke is the fuel that makes steel)
  locked('tfmg:crafting/materials/coke_oven', '2x tfmg:coke_oven', [' C ', 'CIC', ' C '], { C: '#c:ingots/cast_iron', I: 'create:industrial_iron_block' }, 'seal_of_steel')

  // Spark Age: the Rolling Mill (wires and spools, the start of electricity).
  // Its recipe fills all 9 slots, so it now makes a Mill Frame, and Frame + Seal = Rolling Mill.
  event.remove({ id: 'createaddition:crafting/rolling_mill' })
  event.shaped('kubejs:mill_frame', ['PSP', 'ASA', 'ACA'], {
    P: '#c:plates/iron', S: 'create:shaft', A: 'create:andesite_alloy', C: 'create:andesite_casing'
  }).id('kubejs:mill_frame')
  event.shapeless('createaddition:rolling_mill', ['kubejs:mill_frame', '#kubejs:seals/seal_of_the_spark'])
    .keepIngredient('#kubejs:seals/seal_of_the_spark').id('kubejs:locked/createaddition/rolling_mill')
})
