import { Item, GildedRose } from "./app/gilded-rose";

const items: Item[] = [
  new Item("Aged Brie", 10, 0),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 12, 30),
  new Item("Conjured Mana Cake", 6, 6),
  new Item("Peruvian Snack", 5, 7),
  new Item("Peruvian Snack", 10, 0),
];

const gildedRose = new GildedRose(items);

const days = 15;
for (let day = 0; day < days; day++) {
  console.log(`-------- Día ${day} --------`);
  console.log("Nombre, SellIn, Quality");
  items.forEach((item) =>
    console.log(`${item.name}, ${item.sellIn}, ${item.quality}`)
  );
  console.log("");
  gildedRose.updateQuality();
}
