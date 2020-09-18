"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHeightFlexible = makeHeightFlexible;
exports.makeVisFlexible = makeVisFlexible;
exports.makeWidthFlexible = makeWidthFlexible;
exports.FlexibleXYPlot = exports.FlexibleHeightXYPlot = exports.FlexibleWidthXYPlot = void 0;

var _react = _interopRequireWildcard(require("react"));

var _window = _interopRequireDefault(require("global/window"));

var _xyPlot = _interopRequireDefault(require("./plot/xy-plot"));

var _reactUtils = require("./utils/react-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// As a performance enhancement, we want to only listen once
var resizeSubscribers = [];
var DEBOUNCE_DURATION = 100;
var timeoutId = null;
/**
 * Calls each subscriber, debounced to the
 */

function debounceEmitResize() {
  _window["default"].clearTimeout(timeoutId);

  timeoutId = _window["default"].setTimeout(emitResize, DEBOUNCE_DURATION);
}
/**
 * Calls each subscriber once syncronously.
 */


function emitResize() {
  resizeSubscribers.forEach(function (cb) {
    return cb();
  });
}
/**
 * Add the given callback to the list of subscribers to be caled when the
 * window resizes. Returns a function that, when called, removes the given
 * callback from the list of subscribers. This function is also resposible for
 * adding and removing the resize listener on `window`.
 *
 * @param {Function} cb - Subscriber callback function
 * @returns {Function} Unsubscribe function
 */


function subscribeToDebouncedResize(cb) {
  resizeSubscribers.push(cb); // if we go from zero to one Flexible components instances, add the listener

  if (resizeSubscribers.length === 1) {
    _window["default"].addEventListener('resize', debounceEmitResize);
  }

  return function unsubscribe() {
    removeSubscriber(cb); // if we have no Flexible components, remove the listener

    if (resizeSubscribers.length === 0) {
      _window["default"].clearTimeout(timeoutId);

      _window["default"].removeEventListener('resize', debounceEmitResize);
    }
  };
}
/**
 * Helper for removing the given callback from the list of subscribers.
 *
 * @param {Function} cb - Subscriber callback function
 */


function removeSubscriber(cb) {
  var index = resizeSubscribers.indexOf(cb);

  if (index > -1) {
    resizeSubscribers.splice(index, 1);
  }
}
/**
 * Helper for getting a display name for the child component
 * @param {*} Component React class for the child component.
 * @returns {String} The child components name
 */


function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}
/**
 * Add the ability to stretch the visualization on window resize.
 * @param {*} Component React class for the child component.
 * @returns {*} Flexible component.
 */


function makeFlexible(Component, isWidthFlexible, isHeightFlexible) {
  var ResultFunctionalComponent = function ResultFunctionalComponent(props) {
    var containerRef = (0, _react.useRef)();

    var _useState = (0, _react.useState)({
      height: 0,
      width: 0
    }),
        _useState2 = _slicedToArray(_useState, 2),
        size = _useState2[0],
        setSize = _useState2[1];

    (0, _react.useEffect)(function () {
      function _onResize() {
        var containerElement = (0, _reactUtils.getDOMNode)(containerRef.current);
        var offsetHeight = containerElement.offsetHeight,
            offsetWidth = containerElement.offsetWidth;
        var newHeight = size.height === offsetHeight ? {} : {
          height: offsetHeight
        };
        var newWidth = size.width === offsetWidth ? {} : {
          width: offsetWidth
        };
        setSize(function (prevSize) {
          return _objectSpread(_objectSpread(_objectSpread({}, prevSize), newHeight), newWidth);
        });
      }

      var cancelSubscription = subscribeToDebouncedResize(_onResize);
      return function () {
        cancelSubscription();
      };
    }, [size.width, size.height]);
    var height = size.height,
        width = size.width;

    var componentProps = _objectSpread(_objectSpread({}, props), {}, {
      animation: height === 0 && width === 0 ? null : props.animation
    });

    var updatedDimensions = _objectSpread(_objectSpread({}, isHeightFlexible ? {
      height: height
    } : {}), isWidthFlexible ? {
      width: width
    } : {});

    return /*#__PURE__*/_react["default"].createElement("div", {
      ref: containerRef,
      style: {
        width: '100%',
        height: '100%'
      }
    }, /*#__PURE__*/_react["default"].createElement(Component, _extends({}, updatedDimensions, componentProps)));
  };

  var _ref = Component.propTypes || {},
      height = _ref.height,
      width = _ref.width,
      otherPropTypes = _objectWithoutProperties(_ref, ["height", "width"]); // eslint-disable-line no-unused-vars


  ResultFunctionalComponent.propTypes = otherPropTypes;
  ResultFunctionalComponent.displayName = "Flexible".concat(getDisplayName(Component));
  return ResultFunctionalComponent;
}

function makeHeightFlexible(component) {
  return makeFlexible(component, false, true);
}

function makeVisFlexible(component) {
  return makeFlexible(component, true, true);
}

function makeWidthFlexible(component) {
  return makeFlexible(component, true, false);
}

var FlexibleWidthXYPlot = makeWidthFlexible(_xyPlot["default"]);
exports.FlexibleWidthXYPlot = FlexibleWidthXYPlot;
var FlexibleHeightXYPlot = makeHeightFlexible(_xyPlot["default"]);
exports.FlexibleHeightXYPlot = FlexibleHeightXYPlot;
var FlexibleXYPlot = makeVisFlexible(_xyPlot["default"]);
exports.FlexibleXYPlot = FlexibleXYPlot;