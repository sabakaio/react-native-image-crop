/// <reference types="react" />
import { Component } from 'react';
import { PanResponderInstance, PanResponderGestureState, LayoutChangeEvent } from 'react-native';
export interface CropProps {
    image: string;
}
export interface CropStyleState {
    top: number;
    left: number;
    width: number;
    height: number;
    borderTopWidth: number;
    borderRightWidth: number;
    borderBottomWidth: number;
    borderLeftWidth: number;
}
export interface CropState {
    responderLocked: boolean;
    style: CropStyleState;
    initialPosition: CropStyleState;
    containerResized: boolean;
    containerStyle: {
        maxHeight: number;
        width: number;
    };
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
    scale: number;
    constructor(props: CropProps);
    adjustSize: (event: LayoutChangeEvent) => void;
    moveTop: (gs: PanResponderGestureState) => {};
    moveRight: (gs: PanResponderGestureState) => {
        width: number;
    };
    moveBottom: (gs: PanResponderGestureState) => {
        height: number;
    };
    moveLeft: (gs: PanResponderGestureState) => {
        width: number;
        left: number;
    };
    makeResponderHandlers: (...activeSides: ("Top" | "Right" | "Bottom" | "Left")[]) => {
        onStartShouldSetPanResponder: (evt: any, gs: PanResponderGestureState) => boolean;
        onMoveShouldSetPanResponder: (evt: any, gs: PanResponderGestureState) => boolean;
        onPanResponderGrant: (evt: any, gs: PanResponderGestureState) => void;
        onPanResponderMove: (evt: any, gs: PanResponderGestureState) => void;
        onPanResponderRelease: (evt: any, gs: PanResponderGestureState) => void;
    };
    componentWillMount(): void;
    render(): JSX.Element;
}
