import { FocusManager } from '@youi/react-native-youi';
import { RefObject } from 'react';
import ListItem from '../ListItem';

export const setFocus = (itemRefs: RefObject<ListItem>[]) => {
  itemRefs.forEach((item: RefObject<ListItem>, index: number) => {
    if (itemRefs[index + 1]?.current) {
      FocusManager.setNextFocus(
        item.current,
        itemRefs[index + 1].current,
        'right',
      );
    } else {
      FocusManager.setNextFocus(item.current, itemRefs[0].current, 'right');
    }
  });

  itemRefs.forEach((item, index) => {
    if (itemRefs[index - 1]?.current) {
      FocusManager.setNextFocus(
        item.current,
        itemRefs[index - 1].current,
        'left',
      );
    } else {
      FocusManager.setNextFocus(
        item.current,
        itemRefs[itemRefs.length - 1].current,
        'left',
      );
    }
  });

  itemRefs.forEach((item, index) => {
    if (itemRefs[index + 4]?.current) {
      FocusManager.setNextFocus(
        item.current,
        itemRefs[index + 4].current,
        'down',
      );
    }
  });
};
