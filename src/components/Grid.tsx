import React, { Component, createRef, RefObject } from 'react';
import { FlatList, ScrollView } from 'react-native';
import {
  FocusManager,
  ListItem as ListItemType,
} from '@youi/react-native-youi';
import { PictureType } from '../types/pictures';
import ListItem from './ListItem';

interface Props {
  pictures: PictureType[];
}

class Grid extends Component<Props, {}> {
  itemRefs: RefObject<ListItem>[] = [];

  scroller = createRef<ScrollView>();

  constructor(props: Props) {
    super(props);

    this.itemRefs = this.props.pictures.map(() => createRef<ListItem>());
  }

  componentDidMount() {
    FocusManager.setNextFocus(
      this.itemRefs[0].current,
      this.itemRefs[1].current,
      'right',
    );
    FocusManager.setNextFocus(
      this.itemRefs[0].current,
      this.itemRefs[4].current,
      'down',
    );

    setTimeout(() => {
      FocusManager.enableFocus(this.itemRefs[0]?.current);
      FocusManager.focus(this.itemRefs[0]?.current);
    });
  }

  renderItem = ({ item }: ListItemType<PictureType>) => (
    <ListItem
      thumb={item.thumb}
      description={item.description}
      ref={this.itemRefs[item.index]}
    />
  );

  render() {
    const { pictures } = this.props;

    return (
      <>
        <ScrollView ref={this.scroller}>
          <FlatList
            data={pictures}
            renderItem={this.renderItem}
            horizontal={false}
            numColumns={4}
            keyExtractor={(item: PictureType) => item.id}
          />
        </ScrollView>
      </>
    );
  }
}

export default Grid;
