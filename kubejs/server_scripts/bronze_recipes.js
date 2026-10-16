// Bronze Age recipes. Bronze Blend needs the Seal of Bronze (kept in the grid).

ServerEvents.recipes(event => {
  const K = 'kubejs:'

  // Tin processing
  event.smelting(K + 'tin_ingot', '#c:raw_materials/tin').xp(0.7)
  event.blasting(K + 'tin_ingot', '#c:raw_materials/tin').xp(0.7)
  event.smelting(K + 'tin_ingot', '#c:ores/tin').xp(0.7)
  event.blasting(K + 'tin_ingot', '#c:ores/tin').xp(0.7)
  event.shapeless('9x ' + K + 'tin_nugget', [K + 'tin_ingot'])
  event.shapeless(K + 'tin_ingot', ['9x ' + K + 'tin_nugget'])
  event.shapeless(K + 'raw_tin_block', ['9x ' + K + 'raw_tin'])
  event.shapeless('9x ' + K + 'raw_tin', [K + 'raw_tin_block'])

  // Early alloying: 3 copper + 1 tin -> 4 blend -> smelt to bronze
  event.shapeless('4x ' + K + 'bronze_blend', [
    'minecraft:copper_ingot', 'minecraft:copper_ingot', 'minecraft:copper_ingot',
    K + 'tin_ingot', K + 'seal_of_bronze'
  ]).keepIngredient(K + 'seal_of_bronze')
  event.smelting(K + 'bronze_ingot', K + 'bronze_blend').xp(0.5)
  event.blasting(K + 'bronze_ingot', K + 'bronze_blend').xp(0.5)

  // Create: the Mixer makes bronze directly (no seal needed; you're past that age)
  event.custom({
    type: 'create:mixing',
    ingredients: [
      { item: 'minecraft:copper_ingot' }, { item: 'minecraft:copper_ingot' },
      { item: 'minecraft:copper_ingot' }, { item: K + 'tin_ingot' }
    ],
    results: [{ id: K + 'bronze_ingot', count: 4 }],
    heat_requirement: 'heated'
  }).id('kubejs:mixing/bronze_ingot')
  // Create: crushing tin ore gives bonus raw tin
  event.custom({
    type: 'create:crushing',
    ingredients: [{ tag: 'c:ores/tin' }],
    results: [{ id: K + 'raw_tin' }, { id: K + 'raw_tin', chance: 0.75 },
              { id: 'create:experience_nugget', chance: 0.75 }],
    processing_time: 250
  }).id('kubejs:crushing/tin_ore')

  // Storage
  event.shapeless('9x ' + K + 'bronze_nugget', [K + 'bronze_ingot'])
  event.shapeless(K + 'bronze_ingot', ['9x ' + K + 'bronze_nugget'])
  event.shapeless(K + 'bronze_block', ['9x ' + K + 'bronze_ingot'])
  event.shapeless('9x ' + K + 'bronze_ingot', [K + 'bronze_block'])

  // Tools
  const B = K + 'bronze_ingot', S = 'minecraft:stick'
  event.shaped(K + 'bronze_sword',   [' B ', ' B ', ' S '], { B: B, S: S })
  event.shaped(K + 'bronze_pickaxe', ['BBB', ' S ', ' S '], { B: B, S: S })
  event.shaped(K + 'bronze_axe',     ['BB ', 'BS ', ' S '], { B: B, S: S })
  event.shaped(K + 'bronze_shovel',  [' B ', ' S ', ' S '], { B: B, S: S })
  event.shaped(K + 'bronze_hoe',     ['BB ', ' S ', ' S '], { B: B, S: S })

  // Armor
  event.shaped(K + 'bronze_helmet',     ['BBB', 'B B'],        { B: B })
  event.shaped(K + 'bronze_chestplate', ['B B', 'BBB', 'BBB'], { B: B })
  event.shaped(K + 'bronze_leggings',   ['BBB', 'B B', 'B B'], { B: B })
  event.shaped(K + 'bronze_boots',      ['B B', 'B B'],        { B: B })
})
