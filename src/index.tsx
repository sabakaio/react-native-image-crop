import * as React from 'react'
import {
  Component,
} from 'react';
import {
  View,
  Dimensions,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  LayoutChangeEvent,
} from 'react-native';
import ResponsiveImage from 'react-native-responsive-image'

import styles from './styles'

const BORDER_WIDTH = 1;
const ACTIVE_BORDER_WIDTH = 2;

type ActiveSide = 'Top' | 'Right' | 'Bottom' | 'Left';

export interface ImageProp {
  uri: string,
  width: number,
  height: number,
}

export interface CropProps {
  image: ImageProp,
  style: any,
}

export interface CropStyleState {
  top: number,
  left: number,
  width: number,
  height: number,
  borderTopWidth: number,
  borderRightWidth: number,
  borderBottomWidth: number,
  borderLeftWidth: number,
}

export interface CropState {
  responderLocked: boolean,
  style: CropStyleState,
  initialPosition: CropStyleState,
  containerResized: boolean,
  containerStyle: {
    maxHeight: number,
    width: number,
  },
}

export default class Crop extends Component<CropProps, CropState> {
  rectPanResponder: PanResponderInstance;
  topPanResponder: PanResponderInstance;
  bottomPanResponder: PanResponderInstance;
  leftPanResponder: PanResponderInstance;
  rightPanResponder: PanResponderInstance;
  topRightPanResponder: PanResponderInstance;
  bottomRightPanResponder: PanResponderInstance;
  bottomLeftPanResponder: PanResponderInstance;
  topLeftPanResponder: PanResponderInstance;
  scale: number = 1;

  constructor(props: CropProps) {
    super(props);
    this.scale = Dimensions.get('window').scale;
    this.state = {
      responderLocked: false,
      style: {
        top: 20,
        left: 20,
        width: 100,
        height: 100,
        borderTopWidth: BORDER_WIDTH,
        borderRightWidth: BORDER_WIDTH,
        borderBottomWidth: BORDER_WIDTH,
        borderLeftWidth: BORDER_WIDTH,
      },
      initialPosition: {
        top: 20,
        left: 20,
        width: 100,
        height: 100,
        borderTopWidth: BORDER_WIDTH,
        borderRightWidth: BORDER_WIDTH,
        borderBottomWidth: BORDER_WIDTH,
        borderLeftWidth: BORDER_WIDTH,
      },
      containerResized: false,
      containerStyle: {
        maxHeight: Dimensions.get('window').height - 52,
        width: Dimensions.get('window').width,
      },
    };
  }

  adjustSize = (event: LayoutChangeEvent) => {
    if (this.state.containerResized) { return; }
    const { height, width, x, y } = event.nativeEvent.layout;
    this.setState({
      ...this.state,
      containerResized: true,
      style: {
        ...this.state.style,
        top: y,
        left: x,
        width,
        height,
      },
      containerStyle: {
        ...this.state.containerStyle,
        maxHeight: height,
      },
    });
  }

  moveTop = (gs: PanResponderGestureState) => {
    const nextTop = this.state.initialPosition.top + gs.dy;
    if (nextTop <= 0) { return {}; }
    const nextState = {
      height: this.state.initialPosition.height - gs.dy,
      top: nextTop,
    };
    return nextState;
  }

  moveRight = (gs: PanResponderGestureState) => ({
    width: this.state.initialPosition.width + gs.dx,
  })

  moveBottom = (gs: PanResponderGestureState) => ({
    height: this.state.initialPosition.height + gs.dy,
  })

  moveLeft = (gs: PanResponderGestureState) => ({
    width: this.state.initialPosition.width - gs.dx,
    left: this.state.initialPosition.left + gs.dx,
  })

  makeResponderHandlers = (...activeSides: ActiveSide[]) => {
    const activeBordersStyle: Object = {};
    const passiveBordersStyle: Object = {};
    const moveFunctions: string[] = [];

    activeSides.forEach((side) => {
      activeBordersStyle[`border${side}Width`] = ACTIVE_BORDER_WIDTH;
      passiveBordersStyle[`border${side}Width`] = BORDER_WIDTH;
      moveFunctions.push(`move${side}`);
    });

    return {
      onStartShouldSetPanResponder: (evt: any, gs: PanResponderGestureState) => true,
      onMoveShouldSetPanResponder: (evt: any, gs: PanResponderGestureState) => true,
      onPanResponderGrant: (evt: any, gs: PanResponderGestureState) => {
        this.setState({
          responderLocked: true,
          style: {
            ...this.state.style,
            ...activeBordersStyle,
          },
          initialPosition: {
            ...this.state.style,
          },
        });
      },
      onPanResponderMove: (evt: any, gs: PanResponderGestureState) => {
        let moveStyles: Object = {};

        moveFunctions.forEach((fn) => {
          moveStyles = {
            ...moveStyles,
            ...this[fn](gs),
          };
        });

        this.setState({
          style: {
            ...this.state.style,
            ...moveStyles,
          },
        });
      },
      onPanResponderRelease: (evt: any, gs: PanResponderGestureState) => {
        let moveStyles: Object = {};

        moveFunctions.forEach((fn) => {
          moveStyles = {
            ...moveStyles,
            ...this[fn](gs),
          };
        });

        this.setState({
          responderLocked: false,
          style: {
            ...this.state.style,
            ...passiveBordersStyle,
            ...moveStyles,
          },
        });
      },
    };
  }

  componentWillMount() {
    this.rectPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gs) => !this.state.responderLocked,
      onMoveShouldSetPanResponder: (evt, gs) => !this.state.responderLocked,
      onPanResponderGrant: (evt, gs) => {
        this.setState({
          style: {
            ...this.state.style,
            borderTopWidth: ACTIVE_BORDER_WIDTH,
            borderRightWidth: ACTIVE_BORDER_WIDTH,
            borderBottomWidth: ACTIVE_BORDER_WIDTH,
            borderLeftWidth: ACTIVE_BORDER_WIDTH,
          },
          initialPosition: {
            ...this.state.initialPosition,
            top: this.state.style.top,
            left: this.state.style.left,
          },
        });
      },
      onPanResponderMove: (evt, gs) => {
        this.setState({
          style: {
            ...this.state.style,
            top: this.state.initialPosition.top + gs.dy,
            left: this.state.initialPosition.left + gs.dx,
          },
        });
      },
      onPanResponderRelease: (evt, gs) => {
        this.setState({
          style: {
            ...this.state.style,
            borderTopWidth: BORDER_WIDTH,
            borderRightWidth: BORDER_WIDTH,
            borderBottomWidth: BORDER_WIDTH,
            borderLeftWidth: BORDER_WIDTH,
            top: this.state.initialPosition.top + gs.dy,
            left: this.state.initialPosition.left + gs.dx,
          },
        });
      },
    });

    this.topPanResponder = PanResponder.create({
      ...this.makeResponderHandlers('Top'),
    });

    this.rightPanResponder = PanResponder.create({
      ...this.makeResponderHandlers('Right'),
    });

    this.bottomPanResponder = PanResponder.create({
      ...this.makeResponderHandlers('Bottom'),
    });

    this.leftPanResponder = PanResponder.create({
      ...this.makeResponderHandlers('Left'),
    });

    this.topRightPanResponder = PanResponder.create({
      ...this.makeResponderHandlers('Top', 'Right'),
    });

    this.bottomRightPanResponder = PanResponder.create({
      ...this.makeResponderHandlers('Bottom', 'Right'),
    });

    this.bottomLeftPanResponder = PanResponder.create({
      ...this.makeResponderHandlers('Bottom', 'Left'),
    });

    this.topLeftPanResponder = PanResponder.create({
      ...this.makeResponderHandlers('Top', 'Left'),
    });
  }

  // onLayout={this.adjustSize}
  render() {
    const { image } = this.props

    return (
      <View
        style={[
          styles.container,
          this.state.containerStyle,
        ]}
      >
        <ResponsiveImage
          initWidth={100}
          initHeight={100}
          source={typeof image === 'string' ? { uri: image } : image}
          style={styles.image}
          resizeMode="contain"
        >
          <View style={[styles.fade, styles.fadeTop, { height: this.state.style.top }]} />
          <View
            style={[styles.fade, styles.fadeRight, {
              left: this.state.style.left + this.state.style.width,
              top: this.state.style.top,
              height: this.state.style.height - 2,
            }]}
          />
          <View
            style={[styles.fade, styles.fadeBottom, {
              height: this.state.containerStyle.maxHeight - this.state.style.top - this.state.style.height,
            }]}
          />
          <View
            style={[styles.fade, styles.fadeLeft, {
              width: this.state.style.left,
              top: this.state.style.top,
              height: this.state.style.height - 2,
            }]}
          />
          <View
            style={[styles.rect, this.state.style]}
            {...this.rectPanResponder.panHandlers}
          >
            <View style={styles.top} {...this.topPanResponder.panHandlers} />
            <View style={styles.right} {...this.rightPanResponder.panHandlers} />
            <View style={styles.bottom} {...this.bottomPanResponder.panHandlers} />
            <View style={styles.left} {...this.leftPanResponder.panHandlers} />
            <View style={styles.topRight} {...this.topRightPanResponder.panHandlers}>
              <View style={styles.cornerDot} />
            </View>
            <View style={styles.bottomRight} {...this.bottomRightPanResponder.panHandlers}>
              <View style={styles.cornerDot} />
            </View>
            <View style={styles.bottomLeft} {...this.bottomLeftPanResponder.panHandlers}>
              <View style={styles.cornerDot} />
            </View>
            <View style={styles.topLeft} {...this.topLeftPanResponder.panHandlers}>
              <View style={styles.cornerDot} />
            </View>
          </View>
        </ResponsiveImage>
      </View>
    );
  }
}
