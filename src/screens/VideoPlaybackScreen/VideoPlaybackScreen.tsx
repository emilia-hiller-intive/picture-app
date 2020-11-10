import React, { Component, createRef, RefObject } from 'react';
import {
  ButtonRef,
  Composition,
  FocusManager,
  MediaState,
  PlaybackStateOptions,
  TextRef,
  TimelineRef,
  VideoRef,
  ViewRef,
} from '@youi/react-native-youi';
import {
  InteractionManager,
  NativeEventEmitter,
  NativeEventSubscription,
  NativeModules,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { formatTime } from './helpers';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
  videoState?: MediaState;
  videoDuration: number;
  time: number;
}

type ActionTypes = {
  [key in PlaybackStateOptions]: () => void;
};

const UserInteractionEmitter = new NativeEventEmitter(
  NativeModules.InteractionModule,
);

type TimeoutType = ReturnType<typeof setTimeout>;

class VideoPlaybackScreen extends Component<Props, State> {
  playbackControlsRef: RefObject<Composition>;

  controlsInRef: RefObject<TimelineRef>;

  controlsOutRef: RefObject<TimelineRef>;

  playRef: RefObject<TimelineRef>;

  scrollBarRef: RefObject<TimelineRef>;

  pauseRef: RefObject<TimelineRef>;

  playPauseInRef: RefObject<TimelineRef>;

  playPauseOutRef: RefObject<TimelineRef>;

  playPauseButtonRef: RefObject<TimelineRef>;

  playPauseOffButtonRef: RefObject<TimelineRef>;

  backInRef: RefObject<TimelineRef>;

  backOutRef: RefObject<TimelineRef>;

  eventEmitter?: NativeEventSubscription;

  videoRef: RefObject<VideoRef>;

  inControls: RefObject<any>[];

  outControls: RefObject<any>[];

  controlsTimeout: TimeoutType | null;

  constructor(props: Props) {
    super(props);

    this.videoRef = createRef();

    this.playbackControlsRef = createRef();

    this.controlsInRef = createRef();

    this.controlsOutRef = createRef();

    this.playRef = createRef();

    this.scrollBarRef = createRef();

    this.pauseRef = createRef();

    this.playPauseInRef = createRef();

    this.playPauseOutRef = createRef();

    this.playPauseButtonRef = createRef();

    this.playPauseOffButtonRef = createRef();

    this.backInRef = createRef();

    this.backOutRef = createRef();

    this.inControls = [this.controlsInRef, this.playPauseInRef, this.backInRef];

    this.outControls = [
      this.controlsOutRef,
      this.playPauseOutRef,
      this.backOutRef,
    ];

    this.controlsTimeout = null;

    this.state = {
      videoState: undefined,
      videoDuration: 0,
      time: 0,
    };
  }

  componentDidMount() {
    this.addInteractionListener();
    InteractionManager.runAfterInteractions(() => {
      FocusManager.setFocusRoot(this.playbackControlsRef.current, true);
    });
  }

  componentWillUnmount() {
    this.videoRef?.current?.stop();
    this.removeInteractionListener();
  }

  play = () => {
    this.videoRef?.current?.play();
  };

  pause = () => this.videoRef?.current?.pause();

  // eslint-disable-next-line react/sort-comp
  playerActions: ActionTypes = {
    playing: this.pause,
    paused: this.play,
    buffering: () => {},
  };

  handleVideoStateChange = (event: NativeSyntheticEvent<MediaState>) => {
    const { nativeEvent } = event;

    this.setState({ videoState: nativeEvent });
  };

  handleDurationChange = (duration: number) => {
    this.setState({ videoDuration: duration });
  };

  handleCurrentTimeUpdate = (time: number) => {
    this.setState({ time });
    if (this.state.videoDuration) {
      this.scrollBarRef?.current?.seek(time / this.state.videoDuration);
    }
  };

  handlePlayPause = () => {
    if (this.state.videoState?.playbackState) {
      this.playerActions[this.state.videoState.playbackState]();
    }
  };

  handleBackPress = () => {
    this.pause();
    this.props.navigation.goBack();
  };

  showControls = () => {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    } else {
      this.inControls.forEach((t) => t?.current?.play());
    }
    this.controlsTimeout = setTimeout(this.hideControls, 3000);
  };

  hideControls = () => {
    if (this.controlsTimeout) {
      this.outControls.forEach((t) => t?.current?.play());
      this.controlsTimeout = null;
    }
  };

  addInteractionListener = () => {
    this.eventEmitter = UserInteractionEmitter.addListener(
      'USER_INTERACTION',
      this.showControls,
    );
    NativeModules.InteractionModule.startListening();
  };

  removeInteractionListener = () => {
    NativeModules.InteractionModule.stopListening();

    this.eventEmitter?.remove();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Composition source="Player_Main">
          <VideoRef
            name="Video-Surface-View"
            source={{
              uri:
                'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
              type: 'HLS',
            }}
            ref={this.videoRef}
            onStateChanged={this.handleVideoStateChange}
            onReady={() => this.handlePlayPause()}
            onDurationChanged={this.handleDurationChange}
            onCurrentTimeUpdated={this.handleCurrentTimeUpdate}
          />
        </Composition>
        <Composition
          ref={this.playbackControlsRef}
          source="Player_Playback-Controls"
          style={styles.controlButtons}
        >
          <TimelineRef name="In" ref={this.controlsInRef} />
          <TimelineRef name="Out" ref={this.controlsOutRef} />
          <ViewRef style={styles.controlButtons} name="Player-Scrubber">
            <ViewRef name="Player-ScrollBar">
              <TimelineRef ref={this.scrollBarRef} name="ScrollStart" />
            </ViewRef>
          </ViewRef>
          <TextRef name="Placeholder-Time" text={formatTime(this.state.time)} />
          <ViewRef style={styles.controlButtons} name="PlayPause-Container">
            <TimelineRef name="In" ref={this.playPauseInRef} />
            <TimelineRef name="Out" ref={this.playPauseOutRef} />
            <ButtonRef
              name="Btn-PlayPause"
              onPress={this.handlePlayPause}
              onCompositionDidLoad={(ref) => FocusManager.focus(ref)}
            >
              <TimelineRef name="Toggle-On" ref={this.playRef} />
              <TimelineRef name="Toggle-Off" ref={this.pauseRef} />
            </ButtonRef>
          </ViewRef>
          <ViewRef name="Btn-Back-Container">
            <TimelineRef name="In" ref={this.backInRef} />
            <TimelineRef name="Out" ref={this.backOutRef} />
            <ButtonRef name="Btn-Back" onPress={this.handleBackPress} />
          </ViewRef>
        </Composition>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  controlButtons: {
    position: 'absolute',
    bottom: 0,
  },
});

export default VideoPlaybackScreen;
