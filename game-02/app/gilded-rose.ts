import { CONJURED_DEGRADE, MAX_QUALITY, MIN_QUALITY, SULFURAS_QUALITY } from './const/const';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

interface ItemUpdater {
  update(item: Item): void;
}

class BaseItemUpdater implements ItemUpdater {
  update(item: Item): void {
    this.updateSellIn(item);
    this.updateQuality(item);
    this.normalizeQuality(item);
  }

  protected updateSellIn(item: Item): void {
    item.sellIn -= 1;
  }

  protected updateQuality(item: Item): void {
    // Default degradation for normal items
    let degrade = 1;
    if (item.sellIn < 0) {
      degrade *= 2;
    }
    item.quality -= degrade;
  }

  protected normalizeQuality(item: Item): void {
    if (item.quality < MIN_QUALITY) {
      item.quality = MIN_QUALITY;
    } else if (item.quality > MAX_QUALITY) {
      item.quality = MAX_QUALITY;
    }
  }
}

class NormalItemUpdater extends BaseItemUpdater {
  // Inherits default behavior from BaseItemUpdater
}

class AgedBrieUpdater extends BaseItemUpdater {
  protected updateQuality(item: Item): void {
      let increase = 1;
      if (item.sellIn < 0) {
        increase *= 2;
      }
    item.quality += increase;
  }
}

class BackstagePassesUpdater extends BaseItemUpdater {
  protected updateQuality(item: Item): void {
    if (item.sellIn < 0) {
      item.quality = MIN_QUALITY;
    } else if (item.sellIn < 5) {
      item.quality += 3;
    } else if (item.sellIn < 10) {
      item.quality += 2;
    } else {
      item.quality += 1;
    }
  }
}

class SulfurasUpdater implements ItemUpdater {
  update(item: Item): void {
    item.quality = SULFURAS_QUALITY;
  }
}

class ConjuredItemUpdater extends BaseItemUpdater {
  protected updateQuality(item: Item): void {
    let degrade = CONJURED_DEGRADE;
    if (item.sellIn < 0) {
      degrade *= 2;
    }
    item.quality -= degrade;
  }
}

export class GildedRose {
  items: Array<Item>;

  private readonly updaters: { [key: string]: ItemUpdater };

  constructor(items = [] as Array<Item>) {
    this.items = items;

    // Initialize updaters once to improve memory usage
    this.updaters = {
      'Aged Brie': new AgedBrieUpdater(),
      'Backstage passes to a TAFKAL80ETC concert': new BackstagePassesUpdater(),
      'Sulfuras, Hand of Ragnaros': new SulfurasUpdater(),
      'Conjured': new ConjuredItemUpdater(),
      'Normal': new NormalItemUpdater(),
    };
  }

  updateQuality() {
    for (const item of this.items) {
      const updater = this.getUpdater(item);
      updater.update(item);
    }
    return this.items;
  }

  private getUpdater(item: Item): ItemUpdater {
    if (this.updaters[item.name]) {
      return this.updaters[item.name];
    } else if (item.name.toLowerCase().indexOf('conjured') !== -1) {
      return this.updaters['Conjured'];
    } else {
      return this.updaters['Normal'];
    }
  }
}
