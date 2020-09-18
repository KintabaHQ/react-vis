"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getSmallestDistanceIndex = _getSmallestDistanceIndex;
exports.getScaleFnFromScaleObject = getScaleFnFromScaleObject;
exports.getDomainByAccessor = getDomainByAccessor;
exports._getScaleDistanceAndAdjustedDomain = _getScaleDistanceAndAdjustedDomain;
exports._adjustCategoricalScale = _adjustCategoricalScale;
exports.getScaleObjectFromProps = getScaleObjectFromProps;
exports.getAttributeScale = getAttributeScale;
exports.getAttributeFunctor = getAttributeFunctor;
exports.getAttr0Functor = getAttr0Functor;
exports.getAttributeValue = getAttributeValue;
exports.getScalePropTypesByAttribute = getScalePropTypesByAttribute;
exports.extractScalePropsFromProps = extractScalePropsFromProps;
exports.getMissingScaleProps = getMissingScaleProps;
exports.literalScale = literalScale;
exports.getFontColorFromBackground = getFontColorFromBackground;
exports.getXYPlotValues = getXYPlotValues;
exports.getOptionalScaleProps = getOptionalScaleProps;
exports["default"] = void 0;

var _d3Scale = require("d3-scale");

var _d3Array = require("d3-array");

var _d3Collection = require("d3-collection");

var _d3Color = require("d3-color");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactUtils = require("./react-utils");

var _dataUtils = require("./data-utils");

var _SCALE_FUNCTIONS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Linear scale name.
 * @type {string}
 * @const
 */
var LINEAR_SCALE_TYPE = 'linear';
/**
 * Ordinal scale name.
 * @type {string}
 * @const
 */

var ORDINAL_SCALE_TYPE = 'ordinal';
/**
 * Category scale.
 * @type {string}
 * @const
 */

var CATEGORY_SCALE_TYPE = 'category';
/**
 * Literal scale.
 * Differs slightly from d3's identity scale in that it does not coerce value
 * into numbers, it simply returns exactly what you give it
 * @type {string}
 * @const
 */

var LITERAL_SCALE_TYPE = 'literal';
/**
 * Log scale name.
 * @type {string}
 * @const
 */

var LOG_SCALE_TYPE = 'log';
/**
 * Time scale name.
 * @type {string}
 * @const
 */

var TIME_SCALE_TYPE = 'time';
/**
 * Time UTC scale name.
 * @type {string}
 * @const
 */

var TIME_UTC_SCALE_TYPE = 'time-utc';
/**
 * Scale functions that are supported in the library.
 * @type {Object}
 * @const
 */

var SCALE_FUNCTIONS = (_SCALE_FUNCTIONS = {}, _defineProperty(_SCALE_FUNCTIONS, LINEAR_SCALE_TYPE, _d3Scale.scaleLinear), _defineProperty(_SCALE_FUNCTIONS, ORDINAL_SCALE_TYPE, _d3Scale.scalePoint), _defineProperty(_SCALE_FUNCTIONS, CATEGORY_SCALE_TYPE, _d3Scale.scaleOrdinal), _defineProperty(_SCALE_FUNCTIONS, LITERAL_SCALE_TYPE, literalScale), _defineProperty(_SCALE_FUNCTIONS, LOG_SCALE_TYPE, _d3Scale.scaleLog), _defineProperty(_SCALE_FUNCTIONS, TIME_SCALE_TYPE, _d3Scale.scaleTime), _defineProperty(_SCALE_FUNCTIONS, TIME_UTC_SCALE_TYPE, _d3Scale.scaleUtc), _SCALE_FUNCTIONS);
/**
 * Attrs for which a scale can be set up at XYPlot level
 * @type {Array}
 * @const
 */

var XYPLOT_ATTR = ['color', 'fill', 'opacity', 'stroke'];
/**
 * Title case a given string
 * @param {String} str Array of values.
 * @returns {String} titlecased string
 */

function toTitleCase(str) {
  return "".concat(str[0].toUpperCase()).concat(str.slice(1));
}
/**
 * Find the smallest distance between the values on a given scale and return
 * the index of the element, where the smallest distance was found.
 * It returns the first occurrence of i where
 * `scale(value[i]) - scale(value[i - 1])` is minimal
 * @param {Array} values Array of values.
 * @param {Object} scaleObject Scale object.
 * @returns {number} Index of an element where the smallest distance was found.
 * @private
 */


function _getSmallestDistanceIndex(values, scaleObject) {
  var scaleFn = getScaleFnFromScaleObject(scaleObject);
  var result = 0;

  if (scaleFn) {
    var nextValue;
    var currentValue = scaleFn(values[0]);
    var distance = Infinity;
    var nextDistance;

    for (var i = 1; i < values.length; i++) {
      nextValue = scaleFn(values[i]);
      nextDistance = Math.abs(nextValue - currentValue);

      if (nextDistance < distance) {
        distance = nextDistance;
        result = i;
      }

      currentValue = nextValue;
    }
  }

  return result;
}
/**
 * This is a workaround for issue that ordinal scale
 * does not have invert method implemented in d3-scale.
 * @param {Object} Ordinal d3-scale object.
 * @returns {void}
 * @private
 */


function addInvertFunctionToOrdinalScaleObject(scale) {
  if (scale.invert) {
    return;
  }

  scale.invert = function invert(value) {
    var _scale$range = scale.range(),
        _scale$range2 = _slicedToArray(_scale$range, 2),
        lower = _scale$range2[0],
        upper = _scale$range2[1];

    var start = Math.min(lower, upper);
    var stop = Math.max(lower, upper);

    if (value < start + scale.padding() * scale.step()) {
      return scale.domain()[0];
    }

    if (value > stop - scale.padding() * scale.step()) {
      return scale.domain()[scale.domain().length - 1];
    }

    var index = Math.floor((value - start - scale.padding() * scale.step()) / scale.step());
    return scale.domain()[index];
  };
}
/**
 * Crate a scale function from the scale object.
 * @param {Object} scaleObject Scale object.
 - scaleObject.domain {Array}
 - scaleObject.range {Array}
 - scaleObject.type {string}
 - scaleObject.attr {string}
 * @returns {*} Scale function.
 * @private
 */


function getScaleFnFromScaleObject(scaleObject) {
  if (!scaleObject) {
    return null;
  }

  var type = scaleObject.type,
      domain = scaleObject.domain,
      range = scaleObject.range;
  var modDomain = domain[0] === domain[1] ? domain[0] === 0 ? [-1, 0] : [-domain[0], domain[0]] : domain;

  if (type === LITERAL_SCALE_TYPE) {
    return literalScale(range[0]);
  }

  var scale = SCALE_FUNCTIONS[type]().domain(modDomain).range(range);

  if (type === ORDINAL_SCALE_TYPE) {
    scale.padding(0.5);
    addInvertFunctionToOrdinalScaleObject(scale);
  }

  return scale;
}
/**
 * Get the domain from the array of data.
 * @param {Array} allData All data.
 * @param {function} accessor - accessor for main value.
 * @param {function} accessor0 - accessor for the naught value.
 * @param {string} type Scale type.
 * @returns {Array} Domain.
 * @private
 */


function getDomainByAccessor(allData, accessor, accessor0, type) {
  var domain; // Collect both attr and available attr0 values from the array of data.

  var values = allData.reduce(function (data, d) {
    var value = accessor(d);
    var value0 = accessor0(d);

    if (_isDefined(value)) {
      data.push(value);
    }

    if (_isDefined(value0)) {
      data.push(value0);
    }

    return data;
  }, []);

  if (!values.length) {
    return [];
  } // Create proper domain depending on the type of the scale.


  if (type !== ORDINAL_SCALE_TYPE && type !== CATEGORY_SCALE_TYPE) {
    domain = (0, _d3Array.extent)(values);
  } else {
    domain = (0, _d3Collection.set)(values).values();
  }

  return domain;
}
/**
 * Create custom scale object from the value. When the scale is created from
 * this object, it should return the same value all time.
 * @param {string} attr Attribute.
 * @param {*} value Value.
 * @param {string} type - the type of scale being used
 * @param {function} accessor - the accessor function
 * @param {function} accessor0 - the accessor function for the potential naught value
 * @returns {Object} Custom scale object.
 * @private
 */


function _createScaleObjectForValue(attr, value, type, accessor, accessor0) {
  if (type === LITERAL_SCALE_TYPE) {
    return {
      type: LITERAL_SCALE_TYPE,
      domain: [],
      range: [value],
      distance: 0,
      attr: attr,
      baseValue: undefined,
      isValue: true,
      accessor: accessor,
      accessor0: accessor0
    };
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return {
    type: CATEGORY_SCALE_TYPE,
    range: [value],
    domain: [],
    distance: 0,
    attr: attr,
    baseValue: undefined,
    isValue: true,
    accessor: accessor,
    accessor0: accessor0
  };
}
/**
 * Create a regular scale object for a further use from the existing parameters.
 * @param {Array} domain - Domain.
 * @param {Array} range - Range.
 * @param {string} type - Type.
 * @param {number} distance - Distance.
 * @param {string} attr - Attribute.
 * @param {number} baseValue - Base value.
 * @param {function} accessor - Attribute accesor
 * @param {function} accessor0 - Attribute accesor for potential naught value
 * @returns {Object} Scale object.
 * @private
 */


function _createScaleObjectForFunction(_ref) {
  var domain = _ref.domain,
      range = _ref.range,
      type = _ref.type,
      distance = _ref.distance,
      attr = _ref.attr,
      baseValue = _ref.baseValue,
      accessor = _ref.accessor,
      accessor0 = _ref.accessor0;
  return {
    domain: domain,
    range: range,
    type: type,
    distance: distance,
    attr: attr,
    baseValue: baseValue,
    isValue: false,
    accessor: accessor,
    accessor0: accessor0
  };
}
/**
 * Get scale object from props. E. g. object like {xRange, xDomain, xDistance,
 * xType} is transformed into {range, domain, distance, type}.
 * @param {Object} props Props.
 * @param {string} attr Attribute.
 * @returns {*} Null or an object with the scale.
 * @private
 */


function _collectScaleObjectFromProps(props, attr) {
  var value = props[attr],
      fallbackValue = props["_".concat(attr, "Value")],
      range = props["".concat(attr, "Range")],
      _props$ = props["".concat(attr, "Distance")],
      distance = _props$ === void 0 ? 0 : _props$,
      baseValue = props["".concat(attr, "BaseValue")],
      _props$2 = props["".concat(attr, "Type")],
      type = _props$2 === void 0 ? LINEAR_SCALE_TYPE : _props$2,
      noFallBack = props["".concat(attr, "NoFallBack")],
      _props$3 = props["get".concat(toTitleCase(attr))],
      accessor = _props$3 === void 0 ? function (d) {
    return d[attr];
  } : _props$3,
      _props$4 = props["get".concat(toTitleCase(attr), "0")],
      accessor0 = _props$4 === void 0 ? function (d) {
    return d["".concat(attr, "0")];
  } : _props$4;
  var domain = props["".concat(attr, "Domain")]; // Return value-based scale if the value is assigned.

  if (!noFallBack && typeof value !== 'undefined') {
    return _createScaleObjectForValue(attr, value, props["".concat(attr, "Type")], accessor, accessor0);
  } // Pick up the domain from the properties and create a new one if it's not
  // available.


  if (typeof baseValue !== 'undefined') {
    domain = (0, _dataUtils.addValueToArray)(domain, baseValue);
  } // Make sure that the minimum necessary properties exist.


  if (!range || !domain || !domain.length) {
    // Try to use the fallback value if it is available.
    return _createScaleObjectForValue(attr, fallbackValue, props["".concat(attr, "Type")], accessor, accessor0);
  }

  return _createScaleObjectForFunction({
    domain: domain,
    range: range,
    type: type,
    distance: distance,
    attr: attr,
    baseValue: baseValue,
    accessor: accessor,
    accessor0: accessor0
  });
}
/**
 * Compute left domain adjustment for the given values.
 * @param {Array} values Array of values.
 * @returns {number} Domain adjustment.
 * @private
 */


function _computeLeftDomainAdjustment(values) {
  if (values.length > 1) {
    return (values[1] - values[0]) / 2;
  }

  if (values.length === 1) {
    return values[0] - 0.5;
  }

  return 0;
}
/**
 * Compute right domain adjustment for the given values.
 * @param {Array} values Array of values.
 * @returns {number} Domain adjustment.
 * @private
 */


function _computeRightDomainAdjustment(values) {
  if (values.length > 1) {
    return (values[values.length - 1] - values[values.length - 2]) / 2;
  }

  if (values.length === 1) {
    return values[0] - 0.5;
  }

  return 0;
}
/**
 * Compute distance for the given values.
 * @param {Array} values Array of values.
 * @param {Array} domain Domain.
 * @param {number} bestDistIndex Index of a best distance found.
 * @param {function} scaleFn Scale function.
 * @returns {number} Domain adjustment.
 * @private
 */


function _computeScaleDistance(values, domain, bestDistIndex, scaleFn) {
  if (values.length > 1) {
    // Avoid zero indexes.
    var i = Math.max(bestDistIndex, 1);
    return Math.abs(scaleFn(values[i]) - scaleFn(values[i - 1]));
  }

  if (values.length === 1) {
    return Math.abs(scaleFn(domain[1]) - scaleFn(domain[0]));
  }

  return 0;
}
/**
 * Normilize array of values with a single value.
 * @param {Array} arr Array of data.
 * @param {Array} values Array of values.
 * @param {string} attr Attribute.
 * @param {string} type Type.
 * @private
 */


function _normalizeValues(data, values, accessor0, type) {
  if (type === TIME_SCALE_TYPE && values.length === 1) {
    var attr0 = accessor0(data[0]);
    return [attr0].concat(_toConsumableArray(values));
  }

  return values;
}
/**
 * Get the distance, the smallest and the largest value of the domain.
 * @param {Array} data Array of data for the single series.
 * @param {Object} scaleObject Scale object.
 * @returns {{domain0: number, domainN: number, distance: number}} Result.
 * @private
 */


function _getScaleDistanceAndAdjustedDomain(data, scaleObject) {
  var domain = scaleObject.domain,
      type = scaleObject.type,
      accessor = scaleObject.accessor,
      accessor0 = scaleObject.accessor0;
  var uniqueValues = (0, _dataUtils.getUniquePropertyValues)(data, accessor); // Fix time scale if a data has only one value.

  var values = _normalizeValues(data, uniqueValues, accessor0, type);

  var index = _getSmallestDistanceIndex(values, scaleObject);

  var adjustedDomain = [].concat(domain);
  adjustedDomain[0] -= _computeLeftDomainAdjustment(values);
  adjustedDomain[domain.length - 1] += _computeRightDomainAdjustment(values); // Fix log scale if it's too small.

  if (type === LOG_SCALE_TYPE && domain[0] <= 0) {
    adjustedDomain[0] = Math.min(domain[1] / 10, 1);
  }

  var adjustedScaleFn = getScaleFnFromScaleObject(_objectSpread(_objectSpread({}, scaleObject), {}, {
    domain: adjustedDomain
  }));

  var distance = _computeScaleDistance(values, adjustedDomain, index, adjustedScaleFn);

  return {
    domain0: adjustedDomain[0],
    domainN: adjustedDomain[adjustedDomain.length - 1],
    distance: distance
  };
}
/**
 * Returns true if scale adjustments are possible for a given scale.
 * @param {Object} props Props.
 * @param {Object} scaleObject Scale object.
 * @returns {boolean} True if scale adjustments possible.
 * @private
 */


function _isScaleAdjustmentPossible(props, scaleObject) {
  var attr = scaleObject.attr;
  var _props$_adjustBy = props._adjustBy,
      adjustBy = _props$_adjustBy === void 0 ? [] : _props$_adjustBy,
      _props$_adjustWhat = props._adjustWhat,
      adjustWhat = _props$_adjustWhat === void 0 ? [] : _props$_adjustWhat; // The scale cannot be adjusted if there's no attributes to adjust, no
  // suitable values

  return adjustWhat.length && adjustBy.length && adjustBy.indexOf(attr) !== -1;
}
/**
 * Adjust continuous scales (e.g. 'linear', 'log' and 'time') by adding the
 * space from the left and right of them and by computing the best distance.
 * @param {Object} props Props.
 * @param {Object} scaleObject Scale object.
 * @returns {*} Scale object with adjustments.
 * @private
 */


function _adjustContinuousScale(props, scaleObject) {
  var allSeriesData = props._allData,
      _props$_adjustWhat2 = props._adjustWhat,
      adjustWhat = _props$_adjustWhat2 === void 0 ? [] : _props$_adjustWhat2; // Assign the initial values.

  var domainLength = scaleObject.domain.length;
  var domain = scaleObject.domain;
  var scaleDomain0 = domain[0];
  var scaleDomainN = domain[domainLength - 1];
  var scaleDistance = scaleObject.distance; // Find the smallest left position of the domain, the largest right position
  // of the domain and the best distance for them.

  allSeriesData.forEach(function (data, index) {
    if (adjustWhat.indexOf(index) === -1) {
      return;
    }

    if (data && data.length) {
      var _getScaleDistanceAndA = _getScaleDistanceAndAdjustedDomain(data, scaleObject),
          domain0 = _getScaleDistanceAndA.domain0,
          domainN = _getScaleDistanceAndA.domainN,
          distance = _getScaleDistanceAndA.distance;

      scaleDomain0 = Math.min(scaleDomain0, domain0);
      scaleDomainN = Math.max(scaleDomainN, domainN);
      scaleDistance = Math.max(scaleDistance, distance);
    }
  });
  scaleObject.domain = [scaleDomain0].concat(_toConsumableArray(domain.slice(1, -1)), [scaleDomainN]);
  scaleObject.distance = scaleDistance;
  return scaleObject;
}
/**
 * Get an adjusted scale. Suitable for 'category' and 'ordinal' scales.
 * @param {Object} scaleObject Scale object.
 * @returns {*} Scale object with adjustments.
 * @private
 */


function _adjustCategoricalScale(scaleObject) {
  var scaleFn = getScaleFnFromScaleObject(scaleObject);
  var domain = scaleObject.domain,
      range = scaleObject.range;

  if (domain.length > 1) {
    scaleObject.distance = Math.abs(scaleFn(domain[1]) - scaleFn(domain[0]));
  } else {
    scaleObject.distance = Math.abs(range[1] - range[0]);
  }

  return scaleObject;
}
/**
 * Retrieve a scale object or a value from the properties passed.
 * @param {Object} props Object of props.
 * @param {string} attr Attribute.
 * @returns {*} Scale object, value or null.
 */


function getScaleObjectFromProps(props, attr) {
  // Create the initial scale object.
  var scaleObject = _collectScaleObjectFromProps(props, attr);

  if (!scaleObject) {
    return null;
  } // Make sure if it's possible to add space to the scale object. If not,
  // return the object immediately.


  if (!_isScaleAdjustmentPossible(props, scaleObject)) {
    return scaleObject;
  }

  var type = scaleObject.type; // Depending on what type the scale is, apply different adjustments. Distances
  // for the ordinal and category scales are even, equal domains cannot be
  // adjusted.

  if (type === ORDINAL_SCALE_TYPE || type === CATEGORY_SCALE_TYPE) {
    return _adjustCategoricalScale(scaleObject);
  }

  return _adjustContinuousScale(props, scaleObject);
}
/**
 * Get d3 scale for a given prop.
 * @param {Object} props Props.
 * @param {string} attr Attribute.
 * @returns {function} d3 scale function.
 */


function getAttributeScale(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);
  return getScaleFnFromScaleObject(scaleObject);
}
/**
 * Get the value of `attr` from the object.
 * @param {Object} d - data Object.
 * @param {Function} accessor - accessor function.
 * @returns {*} Value of the point.
 * @private
 */


function _getAttrValue(d, accessor) {
  return accessor(d.data ? d.data : d);
}

function _isDefined(value) {
  return typeof value !== 'undefined';
}
/*
 * Adds a percentage of padding to a given domain
 * @param {Array} domain X or Y domain to pad.
 * @param {Number} padding Percentage of padding to add to domain
 * @returns {Array} Padded Domain
 */


function _padDomain(domain, padding) {
  if (!domain) {
    return domain;
  }

  if (isNaN(parseFloat(domain[0])) || isNaN(parseFloat(domain[1]))) {
    return domain;
  }

  var _domain = _slicedToArray(domain, 2),
      min = _domain[0],
      max = _domain[1];

  var domainPadding = (max - min) * (padding * 0.01);
  return [min - domainPadding, max + domainPadding];
}
/**
 * Get prop functor (either a value or a function) for a given attribute.
 * @param {Object} props Series props.
 * @param {Function} accessor - Property accessor.
 * @returns {*} Function or value.
 */


function getAttributeFunctor(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);

  if (scaleObject) {
    var scaleFn = getScaleFnFromScaleObject(scaleObject);
    return function (d) {
      return scaleFn(_getAttrValue(d, scaleObject.accessor));
    };
  }

  return null;
}
/**
 * Get the functor which extracts value form [attr]0 property. Use baseValue if
 * no attr0 property for a given object is defined. Fall back to domain[0] if no
 * base value is available.
 * @param {Object} props Object of props.
 * @param {string} attr Attribute name.
 * @returns {*} Function which returns value or null if no values available.
 */


function getAttr0Functor(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);

  if (scaleObject) {
    var domain = scaleObject.domain;
    var _scaleObject$baseValu = scaleObject.baseValue,
        baseValue = _scaleObject$baseValu === void 0 ? domain[0] : _scaleObject$baseValu;
    var scaleFn = getScaleFnFromScaleObject(scaleObject);
    return function (d) {
      var value = _getAttrValue(d, scaleObject.accessor0);

      return scaleFn(_isDefined(value) ? value : baseValue);
    };
  }

  return null;
}
/**
 * Tries to get the string|number value of the attr and falls back to
 * a fallback property in case if the value is a scale.
 * @param {Object} props Series props.
 * @param {string} attr Property name.
 * @returns {*} Function or value.
 */


function getAttributeValue(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);

  if (scaleObject) {
    if (!scaleObject.isValue && props["_".concat(attr, "Value")] === undefined) {
      (0, _reactUtils.warning)("[React-vis] Cannot use data defined ".concat(attr, " for this ") + 'series type. Using fallback value instead.');
    }

    return props["_".concat(attr, "Value")] || scaleObject.range[0];
  }

  return null;
}
/**
 * Get prop types by the attribute.
 * @param {string} attr Attribute.
 * @returns {Object} Object of xDomain, xRange, xType, xDistance and _xValue,
 * where x is an attribute passed to the function.
 */


function getScalePropTypesByAttribute(attr) {
  var _ref2;

  return _ref2 = {}, _defineProperty(_ref2, "_".concat(attr, "Value"), _propTypes["default"].any), _defineProperty(_ref2, "".concat(attr, "Domain"), _propTypes["default"].array), _defineProperty(_ref2, "get".concat(toTitleCase(attr)), _propTypes["default"].func), _defineProperty(_ref2, "get".concat(toTitleCase(attr), "0"), _propTypes["default"].func), _defineProperty(_ref2, "".concat(attr, "Range"), _propTypes["default"].array), _defineProperty(_ref2, "".concat(attr, "Type"), _propTypes["default"].oneOf(Object.keys(SCALE_FUNCTIONS))), _defineProperty(_ref2, "".concat(attr, "Distance"), _propTypes["default"].number), _defineProperty(_ref2, "".concat(attr, "BaseValue"), _propTypes["default"].any), _ref2;
}
/**
 * Extract the list of scale properties from the entire props object.
 * @param {Object} props Props.
 * @param {Array<String>} attributes Array of attributes for the given
 * components (for instance, `['x', 'y', 'color']`).
 * @returns {Object} Collected props.
 */


function extractScalePropsFromProps(props, attributes) {
  var result = {};
  Object.keys(props).forEach(function (key) {
    // this filtering is critical for extracting the correct accessors!
    var attr = attributes.find(function (a) {
      // width
      var isPlainSet = key.indexOf(a) === 0; // Ex: _data

      var isUnderscoreSet = key.indexOf("_".concat(a)) === 0; // EX: getX

      var usesGet = key.indexOf("get".concat(toTitleCase(a))) === 0;
      return isPlainSet || isUnderscoreSet || usesGet;
    });

    if (!attr) {
      return;
    }

    result[key] = props[key];
  });
  return result;
}
/**
 * Extract the missing scale props from the given data and return them as
 * an object.
 * @param {Object} props Props.
 * @param {Array} data Array of all data.
 * @param {Array<String>} attributes Array of attributes for the given
 * components (for instance, `['x', 'y', 'color']`).
 * @returns {Object} Collected props.
 */


function getMissingScaleProps(props, data, attributes) {
  var result = {}; // Make sure that the domain is set pad it if specified

  attributes.forEach(function (attr) {
    if (!props["get".concat(toTitleCase(attr))]) {
      result["get".concat(toTitleCase(attr))] = function (d) {
        return d[attr];
      };
    }

    if (!props["get".concat(toTitleCase(attr), "0")]) {
      result["get".concat(toTitleCase(attr), "0")] = function (d) {
        return d["".concat(attr, "0")];
      };
    }

    if (!props["".concat(attr, "Domain")]) {
      result["".concat(attr, "Domain")] = getDomainByAccessor(data, props["get".concat(toTitleCase(attr))] || result["get".concat(toTitleCase(attr))], props["get".concat(toTitleCase(attr), "0")] || result["get".concat(toTitleCase(attr), "0")], props["".concat(attr, "Type")]);

      if (props["".concat(attr, "Padding")]) {
        result["".concat(attr, "Domain")] = _padDomain(result["".concat(attr, "Domain")], props["".concat(attr, "Padding")]);
      }
    }
  });
  return result;
}
/**
 * Return a d3 scale that returns the literal value that was given to it
 * @returns {function} literal scale.
 */


function literalScale(defaultValue) {
  function scale(d) {
    if (d === undefined) {
      return defaultValue;
    }

    return d;
  }

  function response() {
    return scale;
  }

  scale.domain = response;
  scale.range = response;
  scale.unknown = response;
  scale.copy = response;
  return scale;
}

function getFontColorFromBackground(background) {
  if (background) {
    return (0, _d3Color.hsl)(background).l > 0.57 ? '#222' : '#fff';
  }

  return null;
}
/**
 * Creates fallback values for series from scales defined at XYPlot level.
 * @param {Object} props Props of the XYPlot object.
 * @param {Array<Object>} children Array of components, children of XYPlot
 * @returns {Array<Object>} Collected props.
 */


function getXYPlotValues(props, children) {
  var XYPlotScales = XYPLOT_ATTR.reduce(function (prev, attr) {
    var domain = props["".concat(attr, "Domain")],
        range = props["".concat(attr, "Range")],
        type = props["".concat(attr, "Type")];

    if (domain && range && type) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, attr, SCALE_FUNCTIONS[type]().domain(domain).range(range)));
    }

    return prev;
  }, {});
  return children.map(function (child) {
    return XYPLOT_ATTR.reduce(function (prev, attr) {
      if (child.props && child.props[attr] !== undefined) {
        var scaleInput = child.props[attr];
        var scale = XYPlotScales[attr];
        var fallbackValue = scale ? scale(scaleInput) : scaleInput;
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, "_".concat(attr, "Value"), fallbackValue));
      }

      return prev;
    }, {});
  });
}

var OPTIONAL_SCALE_PROPS = ['Padding'];
var OPTIONAL_SCALE_PROPS_REGS = OPTIONAL_SCALE_PROPS.map(function (str) {
  return new RegExp("".concat(str, "$"), 'i');
});
/**
 * Get the list of optional scale-related settings for XYPlot
 * mostly just used to find padding properties
 * @param {Object} props Object of props.
 * @returns {Object} Optional Props.
 * @private
 */

function getOptionalScaleProps(props) {
  return Object.keys(props).reduce(function (acc, prop) {
    var propIsNotOptional = OPTIONAL_SCALE_PROPS_REGS.every(function (reg) {
      return !prop.match(reg);
    });

    if (propIsNotOptional) {
      return acc;
    }

    acc[prop] = props[prop];
    return acc;
  }, {});
}

var _default = {
  extractScalePropsFromProps: extractScalePropsFromProps,
  getAttributeScale: getAttributeScale,
  getAttributeFunctor: getAttributeFunctor,
  getAttr0Functor: getAttr0Functor,
  getAttributeValue: getAttributeValue,
  getDomainByAccessor: getDomainByAccessor,
  getFontColorFromBackground: getFontColorFromBackground,
  getMissingScaleProps: getMissingScaleProps,
  getOptionalScaleProps: getOptionalScaleProps,
  getScaleObjectFromProps: getScaleObjectFromProps,
  getScalePropTypesByAttribute: getScalePropTypesByAttribute,
  getXYPlotValues: getXYPlotValues,
  literalScale: literalScale
};
exports["default"] = _default;