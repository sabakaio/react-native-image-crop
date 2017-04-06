import {
  StyleSheet,
  ViewStyle,
} from 'react-native'

export interface Style {
  [k: string]: ViewStyle,
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    position: 'relative',
    padding: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0f0',
  },
  image: {
    flex: 1,
  },
  rect: {
    borderWidth: 1,
    borderColor: '#E64650',
  },
  top: {
    top: -10,
    left: 0,
    right: 0,
    height: 20,
    position: 'absolute',
    /* backgroundColor: 'rgba(0, 255, 0, 0.5)',*/
  },
  right: {
    bottom: 0,
    right: -10,
    top: 0,
    width: 20,
    position: 'absolute',
    /* backgroundColor: 'rgba(0, 255, 0, 0.5)',*/
  },
  bottom: {
    bottom: -10,
    right: 0,
    left: 0,
    height: 20,
    position: 'absolute',
    /* backgroundColor: 'rgba(0, 255, 0, 0.5)',*/
  },
  left: {
    bottom: 0,
    left: -10,
    top: 0,
    width: 20,
    position: 'absolute',
    /* backgroundColor: 'rgba(0, 255, 0, 0.5)',*/
  },
  topRight: {
    top: -13.5,
    right: -12.5,
    height: 26,
    width: 26,
    position: 'absolute',
    overflow: 'hidden',
    /* backgroundColor: 'rgba(0, 255, 0, 0.5)',*/
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomRight: {
    bottom: -12.5,
    right: -12.5,
    height: 26,
    width: 26,
    position: 'absolute',
    overflow: 'hidden',
    /* backgroundColor: 'rgba(0, 255, 0, 0.5)',*/
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLeft: {
    bottom: -12.5,
    left: -13.5,
    height: 26,
    width: 26,
    position: 'absolute',
    overflow: 'hidden',
    /* backgroundColor: 'rgba(0, 255, 0, 0.5)',*/
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeft: {
    top: -13.5,
    left: -13.5,
    height: 26,
    width: 26,
    position: 'absolute',
    overflow: 'hidden',
    /* backgroundColor: 'rgba(0, 255, 0, 0.5)',*/
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#666',
    backgroundColor: '#E64650',
  },
  fade: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
  },
  fadeTop: {
    left: 0,
    right: 0,
    top: 0,
  },
  fadeRight: {
    right: 0,
  },
  fadeBottom: {
    left: 0,
    right: 0,
    bottom: 0,
  },
  fadeLeft: {
    left: 0,
  },
});
