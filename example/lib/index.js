"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_responsive_image_1 = require("react-native-responsive-image");
var styles_1 = require("./styles");
var BORDER_WIDTH = 1;
var ACTIVE_BORDER_WIDTH = 2;
var Crop = (function (_super) {
    __extends(Crop, _super);
    function Crop(props) {
        var _this = _super.call(this, props) || this;
        _this.scale = 1;
        _this.adjustSize = function (event) {
            if (_this.state.containerResized) {
                return;
            }
            var _a = event.nativeEvent.layout, height = _a.height, width = _a.width, x = _a.x, y = _a.y;
            _this.setState(__assign({}, _this.state, { containerResized: true, style: __assign({}, _this.state.style, { top: y, left: x, width: width,
                    height: height }), containerStyle: __assign({}, _this.state.containerStyle, { maxHeight: height }) }));
        };
        _this.moveTop = function (gs) {
            var nextTop = _this.state.initialPosition.top + gs.dy;
            if (nextTop <= 0) {
                return {};
            }
            var nextState = {
                height: _this.state.initialPosition.height - gs.dy,
                top: nextTop,
            };
            return nextState;
        };
        _this.moveRight = function (gs) { return ({
            width: _this.state.initialPosition.width + gs.dx,
        }); };
        _this.moveBottom = function (gs) { return ({
            height: _this.state.initialPosition.height + gs.dy,
        }); };
        _this.moveLeft = function (gs) { return ({
            width: _this.state.initialPosition.width - gs.dx,
            left: _this.state.initialPosition.left + gs.dx,
        }); };
        _this.makeResponderHandlers = function () {
            var activeSides = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                activeSides[_i] = arguments[_i];
            }
            var activeBordersStyle = {};
            var passiveBordersStyle = {};
            var moveFunctions = [];
            activeSides.forEach(function (side) {
                activeBordersStyle["border" + side + "Width"] = ACTIVE_BORDER_WIDTH;
                passiveBordersStyle["border" + side + "Width"] = BORDER_WIDTH;
                moveFunctions.push("move" + side);
            });
            return {
                onStartShouldSetPanResponder: function (evt, gs) { return true; },
                onMoveShouldSetPanResponder: function (evt, gs) { return true; },
                onPanResponderGrant: function (evt, gs) {
                    _this.setState({
                        responderLocked: true,
                        style: __assign({}, _this.state.style, activeBordersStyle),
                        initialPosition: __assign({}, _this.state.style),
                    });
                },
                onPanResponderMove: function (evt, gs) {
                    var moveStyles = {};
                    moveFunctions.forEach(function (fn) {
                        moveStyles = __assign({}, moveStyles, _this[fn](gs));
                    });
                    _this.setState({
                        style: __assign({}, _this.state.style, moveStyles),
                    });
                },
                onPanResponderRelease: function (evt, gs) {
                    var moveStyles = {};
                    moveFunctions.forEach(function (fn) {
                        moveStyles = __assign({}, moveStyles, _this[fn](gs));
                    });
                    _this.setState({
                        responderLocked: false,
                        style: __assign({}, _this.state.style, passiveBordersStyle, moveStyles),
                    });
                },
            };
        };
        _this.scale = react_native_1.Dimensions.get('window').scale;
        _this.state = {
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
                maxHeight: react_native_1.Dimensions.get('window').height - 52,
                width: react_native_1.Dimensions.get('window').width,
            },
        };
        return _this;
    }
    Crop.prototype.componentWillMount = function () {
        var _this = this;
        this.rectPanResponder = react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: function (evt, gs) { return !_this.state.responderLocked; },
            onMoveShouldSetPanResponder: function (evt, gs) { return !_this.state.responderLocked; },
            onPanResponderGrant: function (evt, gs) {
                _this.setState({
                    style: __assign({}, _this.state.style, { borderTopWidth: ACTIVE_BORDER_WIDTH, borderRightWidth: ACTIVE_BORDER_WIDTH, borderBottomWidth: ACTIVE_BORDER_WIDTH, borderLeftWidth: ACTIVE_BORDER_WIDTH }),
                    initialPosition: __assign({}, _this.state.initialPosition, { top: _this.state.style.top, left: _this.state.style.left }),
                });
            },
            onPanResponderMove: function (evt, gs) {
                _this.setState({
                    style: __assign({}, _this.state.style, { top: _this.state.initialPosition.top + gs.dy, left: _this.state.initialPosition.left + gs.dx }),
                });
            },
            onPanResponderRelease: function (evt, gs) {
                _this.setState({
                    style: __assign({}, _this.state.style, { borderTopWidth: BORDER_WIDTH, borderRightWidth: BORDER_WIDTH, borderBottomWidth: BORDER_WIDTH, borderLeftWidth: BORDER_WIDTH, top: _this.state.initialPosition.top + gs.dy, left: _this.state.initialPosition.left + gs.dx }),
                });
            },
        });
        this.topPanResponder = react_native_1.PanResponder.create(__assign({}, this.makeResponderHandlers('Top')));
        this.rightPanResponder = react_native_1.PanResponder.create(__assign({}, this.makeResponderHandlers('Right')));
        this.bottomPanResponder = react_native_1.PanResponder.create(__assign({}, this.makeResponderHandlers('Bottom')));
        this.leftPanResponder = react_native_1.PanResponder.create(__assign({}, this.makeResponderHandlers('Left')));
        this.topRightPanResponder = react_native_1.PanResponder.create(__assign({}, this.makeResponderHandlers('Top', 'Right')));
        this.bottomRightPanResponder = react_native_1.PanResponder.create(__assign({}, this.makeResponderHandlers('Bottom', 'Right')));
        this.bottomLeftPanResponder = react_native_1.PanResponder.create(__assign({}, this.makeResponderHandlers('Bottom', 'Left')));
        this.topLeftPanResponder = react_native_1.PanResponder.create(__assign({}, this.makeResponderHandlers('Top', 'Left')));
    };
    // onLayout={this.adjustSize}
    Crop.prototype.render = function () {
        var image = this.props.image;
        return (React.createElement(react_native_1.View, { style: [
                styles_1.default.container,
                this.state.containerStyle,
            ] },
            React.createElement(react_native_responsive_image_1.default, { initWidth: 100, initHeight: 100, source: typeof image === 'string' ? { uri: image } : image, style: styles_1.default.image, resizeMode: "contain" },
                React.createElement(react_native_1.View, { style: [styles_1.default.fade, styles_1.default.fadeTop, { height: this.state.style.top }] }),
                React.createElement(react_native_1.View, { style: [styles_1.default.fade, styles_1.default.fadeRight, {
                            left: this.state.style.left + this.state.style.width,
                            top: this.state.style.top,
                            height: this.state.style.height - 2,
                        }] }),
                React.createElement(react_native_1.View, { style: [styles_1.default.fade, styles_1.default.fadeBottom, {
                            height: this.state.containerStyle.maxHeight - this.state.style.top - this.state.style.height,
                        }] }),
                React.createElement(react_native_1.View, { style: [styles_1.default.fade, styles_1.default.fadeLeft, {
                            width: this.state.style.left,
                            top: this.state.style.top,
                            height: this.state.style.height - 2,
                        }] }),
                React.createElement(react_native_1.View, __assign({ style: [styles_1.default.rect, this.state.style] }, this.rectPanResponder.panHandlers),
                    React.createElement(react_native_1.View, __assign({ style: styles_1.default.top }, this.topPanResponder.panHandlers)),
                    React.createElement(react_native_1.View, __assign({ style: styles_1.default.right }, this.rightPanResponder.panHandlers)),
                    React.createElement(react_native_1.View, __assign({ style: styles_1.default.bottom }, this.bottomPanResponder.panHandlers)),
                    React.createElement(react_native_1.View, __assign({ style: styles_1.default.left }, this.leftPanResponder.panHandlers)),
                    React.createElement(react_native_1.View, __assign({ style: styles_1.default.topRight }, this.topRightPanResponder.panHandlers),
                        React.createElement(react_native_1.View, { style: styles_1.default.cornerDot })),
                    React.createElement(react_native_1.View, __assign({ style: styles_1.default.bottomRight }, this.bottomRightPanResponder.panHandlers),
                        React.createElement(react_native_1.View, { style: styles_1.default.cornerDot })),
                    React.createElement(react_native_1.View, __assign({ style: styles_1.default.bottomLeft }, this.bottomLeftPanResponder.panHandlers),
                        React.createElement(react_native_1.View, { style: styles_1.default.cornerDot })),
                    React.createElement(react_native_1.View, __assign({ style: styles_1.default.topLeft }, this.topLeftPanResponder.panHandlers),
                        React.createElement(react_native_1.View, { style: styles_1.default.cornerDot }))))));
    };
    return Crop;
}(react_1.Component));
exports.default = Crop;
//# sourceMappingURL=index.js.map