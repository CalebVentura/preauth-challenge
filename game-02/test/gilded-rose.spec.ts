// test/gilded-rose.spec.ts
import { expect } from "chai";
import { GildedRose, Item } from "../app/gilded-rose";

describe("GildedRose Inventory Management", () => {
  let gildedRose: GildedRose;
  let items: Item[];

  const initializeGildedRose = (item: Item) => {
    items = [item];
    gildedRose = new GildedRose(items);
  };

  describe("Normal Items", () => {
    it("should degrade quality twice as fast after the sell-by date has passed", () => {
      initializeGildedRose(new Item("Normal Item", 0, 10));
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(8);
    });

    it("should never have a negative quality", () => {
      initializeGildedRose(new Item("Normal Item", 10, 0));
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(0);
    });
  });

  describe("Aged Brie", () => {
    it("should increase in quality as it ages", () => {
      initializeGildedRose(new Item("Aged Brie", 10, 10));
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(11);
    });

    it("should increase quality twice as fast after the sell-by date has passed", () => {
      initializeGildedRose(new Item("Aged Brie", 0, 10));
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(12);
    });

    it("should not increase quality beyond 50", () => {
      initializeGildedRose(new Item("Aged Brie", 10, 50));
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(50);
    });
  });

  describe("Sulfuras", () => {
    it("should not change in quality or sellIn value", () => {
      initializeGildedRose(new Item("Sulfuras, Hand of Ragnaros", 10, 80));
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(10);
      expect(items[0].quality).to.equal(80);
    });
  });

  describe("Backstage Passes", () => {
    it("should increase in quality by 1 when there are more than 10 days left", () => {
      initializeGildedRose(
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)
      );
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(10);
      expect(items[0].quality).to.equal(11);
    });

    it("should increase in quality by 2 when there are 10 days or less", () => {
      initializeGildedRose(
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)
      );
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(12);
    });

    it("should increase in quality by 3 when there are 5 days or less", () => {
      initializeGildedRose(
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
      );
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(4);
      expect(items[0].quality).to.equal(13);
    });

    it("should drop quality to 0 after the concert", () => {
      initializeGildedRose(
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)
      );
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(0);
    });
  });

  describe("Conjured Items", () => {
    it("should degrade in quality twice as fast as normal items", () => {
      initializeGildedRose(new Item("Conjured Mana Cake", 10, 10));
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(8);
    });

    it("should degrade in quality four times as fast after sell-by date", () => {
      initializeGildedRose(new Item("Conjured Mana Cake", 0, 10));
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(6);
    });

    it("should never have a negative quality", () => {
      initializeGildedRose(new Item("Conjured Mana Cake", 10, 0));
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });
  });
});
