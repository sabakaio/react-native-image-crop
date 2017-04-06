"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
exports.default = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#00f',
    },
    image: {},
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
    },
    right: {
        bottom: 0,
        right: -10,
        top: 0,
        width: 20,
        position: 'absolute',
    },
    bottom: {
        bottom: -10,
        right: 0,
        left: 0,
        height: 20,
        position: 'absolute',
    },
    left: {
        bottom: 0,
        left: -10,
        top: 0,
        width: 20,
        position: 'absolute',
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
        borderWidth: react_native_1.StyleSheet.hairlineWidth,
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
//# sourceMappingURL=styles.js.map