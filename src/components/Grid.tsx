import React, { Component, createRef, RefObject } from 'react';
import {
  findNodeHandle,
  FlatList,
  LayoutChangeEvent,
  ScrollView,
} from 'react-native';
import { FocusManager } from '@youi/react-native-youi';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { PictureType } from '../types/pictures';
import ListItem, { ListItemType } from './ListItem';
import actions from '../store/actions';

export interface Props {
  pictures: PictureType[];
  dispatch: Dispatch;
}

export interface State {
  focused: number | null;
}

class Grid extends Component<Props, State> {
  itemRefs: RefObject<ListItemType>[] = [];

  layouts: any[] = [];

  scroller = createRef<ScrollView>();

  constructor(props: Props) {
    super(props);

    this.itemRefs = this.props.pictures.map(() => createRef<ListItemType>());
    this.layouts = this.props.pictures.map(() => null);

    this.state = { focused: null };
  }

  componentDidMount() {
    const { focused } = this.state;

    setTimeout(() => {
      const index = focused || 0;
      FocusManager.enableFocus(this.itemRefs[index]?.current);
      FocusManager.focus(this.itemRefs[index]?.current);
    });
  }

  handleFocusChange = (index: number) => {
    this.setState({ focused: index });

    this.scroller.current?.scrollTo({
      y: this.layouts[index].rowId * this.layouts[index].height,
      animated: false,
    });
  };

  onLayout = (event: LayoutChangeEvent, index: number): void => {
    this.layouts[index] = event.nativeEvent.layout;
    this.layouts[index].rowId = Math.floor(index / 4);
  };

  onWillBlur = () => {
    this.props.dispatch(actions.focus.setLastFocused(this.state.focused));
  };

  renderItem = ({ item, index }: { item: PictureType; index: number }) => (
    <ListItem
      thumb={item.thumb}
      description={item.description}
      ref={this.itemRefs[index]}
      onLayout={(e) => this.onLayout(e, index)}
      onFocusChange={this.handleFocusChange}
      {...{ index }}
    />
  );

  onScreenDidFocus = () => {
    FocusManager.setFocusRoot(findNodeHandle(this), true);
  };

  render() {
    const { pictures } = this.props;

    return (
      <>
        <ScrollView ref={this.scroller}>
          <NavigationEvents
            onWillBlur={this.onWillBlur}
            onDidFocus={this.onScreenDidFocus}
          />
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

export default connect()(Grid);
