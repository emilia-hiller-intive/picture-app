import React, { Component, createRef, RefObject } from 'react';
import { FlatList, LayoutChangeEvent, ScrollView } from 'react-native';
import {
  FocusManager,
  ListItem as ListItemType,
} from '@youi/react-native-youi';
import { PictureType } from '../../types/pictures';
import ListItem from '../ListItem';
import { setFocus } from './helpers';

interface Props {
  pictures: PictureType[];
}

class Grid extends Component<Props, {}> {
  itemRefs: RefObject<ListItem>[] = [];

  layouts: any[] = [];

  scroller = createRef<ScrollView>();

  constructor(props: Props) {
    super(props);

    this.itemRefs = this.props.pictures.map(() => createRef<ListItem>());
    this.layouts = this.props.pictures.map(() => null);
  }

  componentDidMount() {
    setFocus(this.itemRefs);

    setTimeout(() => {
      FocusManager.enableFocus(this.itemRefs[0]?.current);
      FocusManager.focus(this.itemRefs[0]?.current);
    });
  }

  handleFocusChange = (index: number) => {
    this.scroller.current?.scrollTo({
      y: this.layouts[index].rowId * this.layouts[index].height,
      animated: false,
    });
  };

  onLayout = (event: LayoutChangeEvent, index: number): void => {
    this.layouts[index] = event.nativeEvent.layout;
    this.layouts[index].rowId = Math.floor(index / 4);
  };

  renderItem = ({ item, index }: ListItemType<PictureType>) => (
    <ListItem
      thumb={item.thumb}
      description={item.description}
      ref={this.itemRefs[index]}
      onLayout={(e) => this.onLayout(e, index)}
      onFocusChange={this.handleFocusChange}
      {...{ index }}
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
