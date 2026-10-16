// Bronze Age: tin + bronze materials, tools, armor, and the Age Seals.
// Target: KubeJS 2101 (Minecraft 1.21.1, NeoForge).

StartupEvents.registry('item', event => {
  // Materials
  event.create('raw_tin').displayName('Raw Tin').tag('c:raw_materials').tag('c:raw_materials/tin')
  event.create('tin_ingot').displayName('Tin Ingot').tag('c:ingots').tag('c:ingots/tin')
  event.create('tin_nugget').displayName('Tin Nugget').tag('c:nuggets').tag('c:nuggets/tin')
  event.create('bronze_blend').displayName('Bronze Blend').tag('c:dusts').tag('c:dusts/bronze')
  event.create('bronze_ingot').displayName('Bronze Ingot').tag('c:ingots').tag('c:ingots/bronze')
  event.create('bronze_nugget').displayName('Bronze Nugget').tag('c:nuggets').tag('c:nuggets/bronze')

  // Tools: mine like stone, but faster and tougher (stone 131 uses, iron 250)
  event.create('bronze_sword', 'sword').displayName('Bronze Sword').tier('bronze')
  event.create('bronze_pickaxe', 'pickaxe').displayName('Bronze Pickaxe').tier('bronze')
  event.create('bronze_axe', 'axe').displayName('Bronze Axe').tier('bronze')
  event.create('bronze_shovel', 'shovel').displayName('Bronze Shovel').tier('bronze')
  event.create('bronze_hoe', 'hoe').displayName('Bronze Hoe').tier('bronze')

  // Armor: between leather/chain and iron
  event.create('bronze_helmet', 'helmet').displayName('Bronze Helmet').material('kubejs:bronze')
  event.create('bronze_chestplate', 'chestplate').displayName('Bronze Chestplate').material('kubejs:bronze')
  event.create('bronze_leggings', 'leggings').displayName('Bronze Leggings').material('kubejs:bronze')
  event.create('bronze_boots', 'boots').displayName('Bronze Boots').material('kubejs:bronze')

  event.create('wonder_trophy').displayName('Trophy of the Ages').maxStackSize(1).glow(true).rarity('epic')
    .tooltip('Awarded to the Architect of Ages')
  event.create('mill_frame').displayName('Rolling Mill Frame')

  // Age Seals: quest rewards that unlock each age's key recipes (never consumed)
  const seals = [
    ['seal_of_stone', 'Seal of Stone'],
    ['seal_of_bronze', 'Seal of Bronze'],
    ['seal_of_iron', 'Seal of Iron'],
    ['seal_of_the_kinetic_age', 'Seal of the Kinetic Age'],
    ['seal_of_brass', 'Seal of Brass'],
    ['seal_of_steel', 'Seal of Steel'],
    ['seal_of_the_spark', 'Seal of the Spark'],
  ]
  seals.forEach(([id, name]) => {
    event.create(id).displayName(name).maxStackSize(1).glow(true).rarity('epic').tag('kubejs:age_seals')
  })
})

StartupEvents.registry('block', event => {
  event.create('tin_ore').displayName('Tin Ore')
    .soundType('stone').hardness(3.0).resistance(3.0).requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe').tagBlock('minecraft:needs_stone_tool')
    .tagBoth('c:ores').tagBoth('c:ores/tin')
  event.create('deepslate_tin_ore').displayName('Deepslate Tin Ore')
    .soundType('deepslate').hardness(4.5).resistance(3.0).requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe').tagBlock('minecraft:needs_stone_tool')
    .tagBoth('c:ores').tagBoth('c:ores/tin')
  event.create('raw_tin_block').displayName('Block of Raw Tin')
    .soundType('stone').hardness(5.0).requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe').tagBoth('c:storage_blocks/raw_tin')
  event.create('bronze_block').displayName('Block of Bronze')
    .soundType('metal').hardness(5.0).resistance(6.0).requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe').tagBlock('minecraft:needs_stone_tool')
    .tagBoth('c:storage_blocks').tagBoth('c:storage_blocks/bronze')
})

// Tool and armor stats
ItemEvents.toolTierRegistry(event => {
  event.add('bronze', tier => {
    tier.uses = 200
    tier.speed = 5.0
    tier.attackDamageBonus = 1.5
    tier.enchantmentValue = 12
    tier.incorrectBlocksForDropsTag = 'minecraft:incorrect_for_stone_tool'
    tier.repairIngredient = '#c:ingots/bronze'
  })
})

StartupEvents.registry('armor_material', event => {
  event.create('bronze')
    .defense({ boots: 2, leggings: 5, chestplate: 5, helmet: 2, body: 5 }) // iron = 2/5/6/2
    .enchantmentValue(10)
    .equipSound('minecraft:item.armor.equip_iron')
    .repairIngredient(() => Ingredient.of('kubejs:bronze_ingot'))
}
)
