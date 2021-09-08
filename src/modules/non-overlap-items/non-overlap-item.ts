export interface NonOverlappingItem {
  startPx: number,
  endPx: number,
}

const checkOverlap = function (item1: NonOverlappingItem, item2: NonOverlappingItem) {
  return JSON.stringify(item1) !== JSON.stringify(item2) &&
    ((item1.endPx - item2.startPx) >= 0 && (item2.endPx - item1.startPx) >= 0)
    ? true : false;
}

export const handleNonOverlappingItems = (nonOverlappingItems: NonOverlappingItem[]) => {
  const items = nonOverlappingItems.slice();
  const result: any[] = [];

  for (var i = 0; i < items.length; i++) {
    for (var j = 0; j < items.length; j++) {
      if (checkOverlap(items[i], items[j])) {
        const newItem: NonOverlappingItem = {
          startPx: items[i].startPx < items[j].startPx ? items[i].startPx : items[j].startPx,
          endPx: items[i].endPx > items[j].endPx ? items[i].endPx : items[j].endPx
        }
        
        const index = result.findIndex(item => item.startPx === newItem.startPx && item.endPx === newItem.endPx);
        if (index < 0) {
          result.push(newItem);
        }
      }
    }
  }

  console.log('result:', result);
  return result;
}