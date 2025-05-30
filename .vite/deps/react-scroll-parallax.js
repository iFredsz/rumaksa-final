import {
  __commonJS,
  __toESM,
  require_react
} from "./chunk-JRE55LYH.js";

// node_modules/bezier-easing/src/index.js
var require_src = __commonJS({
  "node_modules/bezier-easing/src/index.js"(exports, module) {
    var NEWTON_ITERATIONS = 4;
    var NEWTON_MIN_SLOPE = 1e-3;
    var SUBDIVISION_PRECISION = 1e-7;
    var SUBDIVISION_MAX_ITERATIONS = 10;
    var kSplineTableSize = 11;
    var kSampleStepSize = 1 / (kSplineTableSize - 1);
    var float32ArraySupported = typeof Float32Array === "function";
    function A(aA1, aA2) {
      return 1 - 3 * aA2 + 3 * aA1;
    }
    function B(aA1, aA2) {
      return 3 * aA2 - 6 * aA1;
    }
    function C(aA1) {
      return 3 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
      return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
      var currentX, currentT, i = 0;
      do {
        currentT = aA + (aB - aA) / 2;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
      } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
      return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
      for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0) {
          return aGuessT;
        }
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }
    function LinearEasing(x) {
      return x;
    }
    module.exports = function bezier2(mX1, mY1, mX2, mY2) {
      if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
        throw new Error("bezier x values must be in [0, 1] range");
      }
      if (mX1 === mY1 && mX2 === mY2) {
        return LinearEasing;
      }
      var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
      function getTForX(aX) {
        var intervalStart = 0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }
        --currentSample;
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= NEWTON_MIN_SLOPE) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
      }
      return function BezierEasing(x) {
        if (x === 0) {
          return 0;
        }
        if (x === 1) {
          return 1;
        }
        return calcBezier(getTForX(x), mY1, mY2);
      };
    };
  }
});

// node_modules/parallax-controller/dist/parallax-controller.esm.js
var import_bezier_easing = __toESM(require_src());
var Limits = function Limits2(properties) {
  this.startX = properties.startX;
  this.startY = properties.startY;
  this.endX = properties.endX;
  this.endY = properties.endY;
  this.totalX = this.endX - this.startX;
  this.totalY = this.endY - this.startY;
  this.startMultiplierX = properties.startMultiplierX || 1;
  this.endMultiplierX = properties.endMultiplierX || 1;
  this.startMultiplierY = properties.startMultiplierY || 1;
  this.endMultiplierY = properties.endMultiplierY || 1;
};
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var ValidCSSEffects;
(function(ValidCSSEffects2) {
  ValidCSSEffects2["speed"] = "speed";
  ValidCSSEffects2["translateX"] = "translateX";
  ValidCSSEffects2["translateY"] = "translateY";
  ValidCSSEffects2["rotate"] = "rotate";
  ValidCSSEffects2["rotateX"] = "rotateX";
  ValidCSSEffects2["rotateY"] = "rotateY";
  ValidCSSEffects2["rotateZ"] = "rotateZ";
  ValidCSSEffects2["scale"] = "scale";
  ValidCSSEffects2["scaleX"] = "scaleX";
  ValidCSSEffects2["scaleY"] = "scaleY";
  ValidCSSEffects2["scaleZ"] = "scaleZ";
  ValidCSSEffects2["opacity"] = "opacity";
})(ValidCSSEffects || (ValidCSSEffects = {}));
var Units;
(function(Units2) {
  Units2["px"] = "px";
  Units2["%"] = "%";
  Units2["vh"] = "vh";
  Units2["vw"] = "vw";
})(Units || (Units = {}));
var RotationUnits;
(function(RotationUnits2) {
  RotationUnits2["deg"] = "deg";
  RotationUnits2["turn"] = "turn";
  RotationUnits2["rad"] = "rad";
})(RotationUnits || (RotationUnits = {}));
var ScaleUnits;
(function(ScaleUnits2) {
  ScaleUnits2[""] = "";
})(ScaleUnits || (ScaleUnits = {}));
var ScrollAxis;
(function(ScrollAxis2) {
  ScrollAxis2["vertical"] = "vertical";
  ScrollAxis2["horizontal"] = "horizontal";
})(ScrollAxis || (ScrollAxis = {}));
var EasingPreset;
(function(EasingPreset2) {
  EasingPreset2["ease"] = "ease";
  EasingPreset2["easeIn"] = "easeIn";
  EasingPreset2["easeOut"] = "easeOut";
  EasingPreset2["easeInOut"] = "easeInOut";
  EasingPreset2["easeInQuad"] = "easeInQuad";
  EasingPreset2["easeInCubic"] = "easeInCubic";
  EasingPreset2["easeInQuart"] = "easeInQuart";
  EasingPreset2["easeInQuint"] = "easeInQuint";
  EasingPreset2["easeInSine"] = "easeInSine";
  EasingPreset2["easeInExpo"] = "easeInExpo";
  EasingPreset2["easeInCirc"] = "easeInCirc";
  EasingPreset2["easeOutQuad"] = "easeOutQuad";
  EasingPreset2["easeOutCubic"] = "easeOutCubic";
  EasingPreset2["easeOutQuart"] = "easeOutQuart";
  EasingPreset2["easeOutQuint"] = "easeOutQuint";
  EasingPreset2["easeOutSine"] = "easeOutSine";
  EasingPreset2["easeOutExpo"] = "easeOutExpo";
  EasingPreset2["easeOutCirc"] = "easeOutCirc";
  EasingPreset2["easeInOutQuad"] = "easeInOutQuad";
  EasingPreset2["easeInOutCubic"] = "easeInOutCubic";
  EasingPreset2["easeInOutQuart"] = "easeInOutQuart";
  EasingPreset2["easeInOutQuint"] = "easeInOutQuint";
  EasingPreset2["easeInOutSine"] = "easeInOutSine";
  EasingPreset2["easeInOutExpo"] = "easeInOutExpo";
  EasingPreset2["easeInOutCirc"] = "easeInOutCirc";
  EasingPreset2["easeInBack"] = "easeInBack";
  EasingPreset2["easeOutBack"] = "easeOutBack";
  EasingPreset2["easeInOutBack"] = "easeInOutBack";
})(EasingPreset || (EasingPreset = {}));
var id = 0;
function createId() {
  ++id;
  return id;
}
var Rect = function() {
  function Rect2(options) {
    var rect = options.el.getBoundingClientRect();
    if (options.view.scrollContainer) {
      var scrollRect = options.view.scrollContainer.getBoundingClientRect();
      rect = _extends({}, rect, {
        top: rect.top - scrollRect.top,
        right: rect.right - scrollRect.left,
        bottom: rect.bottom - scrollRect.top,
        left: rect.left - scrollRect.left
      });
    }
    this.height = options.el.offsetHeight;
    this.width = options.el.offsetWidth;
    this.left = rect.left;
    this.right = rect.right;
    this.top = rect.top;
    this.bottom = rect.bottom;
    if (options.rootMargin) {
      this._setRectWithRootMargin(options.rootMargin);
    }
  }
  var _proto = Rect2.prototype;
  _proto._setRectWithRootMargin = function _setRectWithRootMargin(rootMargin) {
    var totalRootY = rootMargin.top + rootMargin.bottom;
    var totalRootX = rootMargin.left + rootMargin.right;
    this.top -= rootMargin.top;
    this.right += rootMargin.right;
    this.bottom += rootMargin.bottom;
    this.left -= rootMargin.left;
    this.height += totalRootY;
    this.width += totalRootX;
  };
  return Rect2;
}();
var VALID_UNITS = [ScaleUnits[""], Units.px, Units["%"], Units["vh"], Units["vw"], RotationUnits.deg, RotationUnits.turn, RotationUnits.rad];
function parseValueAndUnit(str, defaultUnit) {
  if (defaultUnit === void 0) {
    defaultUnit = Units["%"];
  }
  var out = {
    value: 0,
    unit: defaultUnit
  };
  if (typeof str === "undefined") return out;
  var isValid = typeof str === "number" || typeof str === "string";
  if (!isValid) {
    throw new Error("Invalid value provided. Must provide a value as a string or number");
  }
  str = String(str);
  out.value = parseFloat(str);
  out.unit = str.match(/[\d.\-+]*\s*(.*)/)[1] || defaultUnit;
  var isValidUnit = VALID_UNITS.includes(out.unit);
  if (!isValidUnit) {
    throw new Error("Invalid unit provided.");
  }
  return out;
}
var easingPresets = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  /* Ease IN curves */
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeInQuint: [0.755, 0.05, 0.855, 0.06],
  easeInSine: [0.47, 0, 0.745, 0.715],
  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeInCirc: [0.6, 0.04, 0.98, 0.335],
  /* Ease Out Curves */
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeOutQuint: [0.23, 1, 0.32, 1],
  easeOutSine: [0.39, 0.575, 0.565, 1],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeOutCirc: [0.075, 0.82, 0.165, 1],
  /* Ease IN Out Curves */
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeInOutQuint: [0.86, 0, 0.07, 1],
  easeInOutSine: [0.445, 0.05, 0.55, 0.95],
  easeInOutExpo: [1, 0, 0, 1],
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
  /* Ease Bounce Curves */
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55]
};
function createEasingFunction(easing) {
  if (Array.isArray(easing)) {
    return (0, import_bezier_easing.default)(easing[0], easing[1], easing[2], easing[3]);
  }
  if (typeof easing === "string" && typeof easingPresets[easing] !== "undefined") {
    var params = easingPresets[easing];
    return (0, import_bezier_easing.default)(params[0], params[1], params[2], params[3]);
  }
  return;
}
var PARALLAX_EFFECTS = Object.values(ValidCSSEffects);
var MAP_EFFECT_TO_DEFAULT_UNIT = {
  speed: "px",
  translateX: "%",
  translateY: "%",
  rotate: "deg",
  rotateX: "deg",
  rotateY: "deg",
  rotateZ: "deg",
  scale: "",
  scaleX: "",
  scaleY: "",
  scaleZ: "",
  opacity: ""
};
function parseElementTransitionEffects(props, scrollAxis) {
  var parsedEffects = {};
  PARALLAX_EFFECTS.forEach(function(key) {
    var defaultValue = MAP_EFFECT_TO_DEFAULT_UNIT[key];
    if (typeof (props == null ? void 0 : props[key]) === "number") {
      var value = props == null ? void 0 : props[key];
      var startSpeed = (value || 0) * 10 + "px";
      var endSpeed = (value || 0) * -10 + "px";
      var startParsed = parseValueAndUnit(startSpeed);
      var endParsed = parseValueAndUnit(endSpeed);
      var speedConfig = {
        start: startParsed.value,
        end: endParsed.value,
        unit: startParsed.unit
      };
      if (scrollAxis === ScrollAxis.vertical) {
        parsedEffects.translateY = speedConfig;
      }
      if (scrollAxis === ScrollAxis.horizontal) {
        parsedEffects.translateX = speedConfig;
      }
    }
    if (Array.isArray(props == null ? void 0 : props[key])) {
      var _value = props == null ? void 0 : props[key];
      if (typeof _value[0] !== "undefined" && typeof _value[1] !== "undefined") {
        var _startParsed = parseValueAndUnit(_value == null ? void 0 : _value[0], defaultValue);
        var _endParsed = parseValueAndUnit(_value == null ? void 0 : _value[1], defaultValue);
        var easing = createEasingFunction(_value == null ? void 0 : _value[2]);
        parsedEffects[key] = {
          start: _startParsed.value,
          end: _endParsed.value,
          unit: _startParsed.unit,
          easing
        };
        if (_startParsed.unit !== _endParsed.unit) {
          throw new Error("Must provide matching units for the min and max offset values of each axis.");
        }
      }
    }
  });
  return parsedEffects;
}
function getProgressAmount(start, totalDist, currentScroll, easing) {
  var startAdjustedScroll = currentScroll - start;
  var amount = startAdjustedScroll / totalDist;
  if (easing) {
    amount = easing(amount);
  }
  return amount;
}
function isElementInView(start, end, scroll) {
  var isInView = scroll >= start && scroll <= end;
  return isInView;
}
function scaleBetween(value, newMin, newMax, oldMin, oldMax) {
  return (newMax - newMin) * (value - oldMin) / (oldMax - oldMin) + newMin;
}
function scaleEffectByProgress(effect, progress) {
  var value = scaleBetween(typeof effect.easing === "function" ? effect.easing(progress) : progress, (effect == null ? void 0 : effect.start) || 0, (effect == null ? void 0 : effect.end) || 0, 0, 1);
  return {
    value,
    unit: effect == null ? void 0 : effect.unit
  };
}
var TRANSFORM_EFFECTS = Object.values(ValidCSSEffects).filter(function(v) {
  return v !== "opacity";
});
function setWillChangeStyles(el, effects) {
  var keys = Object.keys(effects);
  var hasOpacity = keys.includes("opacity");
  var willChange = "transform" + (hasOpacity ? ",opacity" : "");
  el.style.willChange = willChange;
}
function setElementStyles(effects, progress, el) {
  if (!el) return;
  var transform = getTransformStyles(effects, progress);
  var opacity = getOpacityStyles(effects, progress);
  el.style.transform = transform;
  el.style.opacity = opacity;
}
function getOpacityStyles(effects, progress) {
  var scaledOpacity = effects["opacity"] && scaleEffectByProgress(effects["opacity"], progress);
  if (typeof scaledOpacity === "undefined" || typeof scaledOpacity.value === "undefined" || typeof scaledOpacity.unit === "undefined") {
    return "";
  }
  var styleStr = "" + scaledOpacity.value;
  return styleStr;
}
function getTransformStyles(effects, progress) {
  var transform = TRANSFORM_EFFECTS.reduce(function(acc, key) {
    var scaledEffect = (
      // @ts-expect-error
      effects[key] && scaleEffectByProgress(effects[key], progress)
    );
    if (typeof scaledEffect === "undefined" || typeof scaledEffect.value === "undefined" || typeof scaledEffect.unit === "undefined") {
      return acc;
    }
    var styleStr = key + "(" + scaledEffect.value + scaledEffect.unit + ")";
    return acc + styleStr;
  }, "");
  return transform;
}
function resetStyles(element) {
  var el = element.el;
  if (!el) return;
  el.style.transform = "";
  el.style.opacity = "";
}
function createLimitsForRelativeElements(rect, view, scroll, shouldAlwaysCompleteAnimation) {
  var startY = rect.top - view.height;
  var startX = rect.left - view.width;
  var endY = rect.bottom;
  var endX = rect.right;
  startX += scroll.x;
  endX += scroll.x;
  startY += scroll.y;
  endY += scroll.y;
  if (shouldAlwaysCompleteAnimation) {
    if (scroll.y + rect.top < view.height) {
      startY = 0;
    }
    if (scroll.x + rect.left < view.width) {
      startX = 0;
    }
    if (endY > view.scrollHeight - view.height) {
      endY = view.scrollHeight - view.height;
    }
    if (endX > view.scrollWidth - view.width) {
      endX = view.scrollWidth - view.width;
    }
  }
  var limits = new Limits({
    startX,
    startY,
    endX,
    endY
  });
  return limits;
}
function getTranslateScalar(startTranslatePx, endTranslatePx, totalDist) {
  var slow = endTranslatePx > startTranslatePx;
  var totalAbsOff = (Math.abs(startTranslatePx) + Math.abs(endTranslatePx)) * (slow ? -1 : 1);
  var totalDistTrue = totalDist + totalAbsOff;
  var scale = Math.max(totalDist / totalDistTrue, 1);
  return scale;
}
function getStartEndValueInPx(translate, elementSize) {
  var start = translate.start, end = translate.end, unit = translate.unit;
  if (unit === "%") {
    var scale = elementSize / 100;
    start = start * scale;
    end = end * scale;
  }
  if (unit === "vw") {
    var startScale = start / 100;
    var endScale = end / 100;
    start = window.innerWidth * startScale;
    end = window.innerWidth * endScale;
  }
  if (unit === "vh") {
    var _startScale = start / 100;
    var _endScale = end / 100;
    start = window.innerHeight * _startScale;
    end = window.innerHeight * _endScale;
  }
  return {
    start,
    end
  };
}
var DEFAULT_VALUE = {
  start: 0,
  end: 0,
  unit: ""
};
function createLimitsWithTranslationsForRelativeElements(rect, view, effects, scroll, scrollAxis, shouldAlwaysCompleteAnimation) {
  var translateX = effects.translateX || DEFAULT_VALUE;
  var translateY = effects.translateY || DEFAULT_VALUE;
  var _getStartEndValueInPx = getStartEndValueInPx(translateX, rect.width), startTranslateXPx = _getStartEndValueInPx.start, endTranslateXPx = _getStartEndValueInPx.end;
  var _getStartEndValueInPx2 = getStartEndValueInPx(translateY, rect.height), startTranslateYPx = _getStartEndValueInPx2.start, endTranslateYPx = _getStartEndValueInPx2.end;
  var startY = rect.top - view.height;
  var startX = rect.left - view.width;
  var endY = rect.bottom;
  var endX = rect.right;
  var startMultiplierY = 1;
  var endMultiplierY = 1;
  if (scrollAxis === ScrollAxis.vertical) {
    startMultiplierY = getTranslateScalar(startTranslateYPx, endTranslateYPx, view.height + rect.height);
    endMultiplierY = startMultiplierY;
  }
  var startMultiplierX = 1;
  var endMultiplierX = 1;
  if (scrollAxis === ScrollAxis.horizontal) {
    startMultiplierX = getTranslateScalar(startTranslateXPx, endTranslateXPx, view.width + rect.width);
    endMultiplierX = startMultiplierX;
  }
  if (startTranslateYPx < 0) {
    startY = startY + startTranslateYPx * startMultiplierY;
  }
  if (endTranslateYPx > 0) {
    endY = endY + endTranslateYPx * endMultiplierY;
  }
  if (startTranslateXPx < 0) {
    startX = startX + startTranslateXPx * startMultiplierX;
  }
  if (endTranslateXPx > 0) {
    endX = endX + endTranslateXPx * endMultiplierX;
  }
  startX += scroll.x;
  endX += scroll.x;
  startY += scroll.y;
  endY += scroll.y;
  if (shouldAlwaysCompleteAnimation) {
    var topBeginsInView = scroll.y + rect.top < view.height;
    var leftBeginsInView = scroll.x + rect.left < view.width;
    var bottomEndsInView = scroll.y + rect.bottom > view.scrollHeight - view.height;
    var rightEndsInView = scroll.x + rect.right > view.scrollWidth - view.height;
    if (topBeginsInView && bottomEndsInView) {
      startMultiplierY = 1;
      endMultiplierY = 1;
      startY = 0;
      endY = view.scrollHeight - view.height;
    }
    if (leftBeginsInView && rightEndsInView) {
      startMultiplierX = 1;
      endMultiplierX = 1;
      startX = 0;
      endX = view.scrollWidth - view.width;
    }
    if (!topBeginsInView && bottomEndsInView) {
      startY = rect.top - view.height + scroll.y;
      endY = view.scrollHeight - view.height;
      var totalDist = endY - startY;
      startMultiplierY = getTranslateScalar(startTranslateYPx, endTranslateYPx, totalDist);
      endMultiplierY = 1;
      if (startTranslateYPx < 0) {
        startY = startY + startTranslateYPx * startMultiplierY;
      }
    }
    if (!leftBeginsInView && rightEndsInView) {
      startX = rect.left - view.width + scroll.x;
      endX = view.scrollWidth - view.width;
      var _totalDist = endX - startX;
      startMultiplierX = getTranslateScalar(startTranslateXPx, endTranslateXPx, _totalDist);
      endMultiplierX = 1;
      if (startTranslateXPx < 0) {
        startX = startX + startTranslateXPx * startMultiplierX;
      }
    }
    if (topBeginsInView && !bottomEndsInView) {
      startY = 0;
      endY = rect.bottom + scroll.y;
      var _totalDist2 = endY - startY;
      startMultiplierY = 1;
      endMultiplierY = getTranslateScalar(startTranslateYPx, endTranslateYPx, _totalDist2);
      if (endTranslateYPx > 0) {
        endY = endY + endTranslateYPx * endMultiplierY;
      }
    }
    if (leftBeginsInView && !rightEndsInView) {
      startX = 0;
      endX = rect.right + scroll.x;
      var _totalDist3 = endX - startX;
      startMultiplierX = 1;
      endMultiplierX = getTranslateScalar(startTranslateXPx, endTranslateXPx, _totalDist3);
      if (endTranslateXPx > 0) {
        endX = endX + endTranslateXPx * endMultiplierX;
      }
    }
  }
  var limits = new Limits({
    startX,
    startY,
    endX,
    endY,
    startMultiplierX,
    endMultiplierX,
    startMultiplierY,
    endMultiplierY
  });
  return limits;
}
function scaleTranslateEffectsForSlowerScroll(effects, limits) {
  var effectsCopy = _extends({}, effects);
  if (effectsCopy.translateX) {
    effectsCopy.translateX = _extends({}, effects.translateX, {
      start: effectsCopy.translateX.start * limits.startMultiplierX,
      end: effectsCopy.translateX.end * limits.endMultiplierX
    });
  }
  if (effectsCopy.translateY) {
    effectsCopy.translateY = _extends({}, effects.translateY, {
      start: effectsCopy.translateY.start * limits.startMultiplierY,
      end: effectsCopy.translateY.end * limits.endMultiplierY
    });
  }
  return effectsCopy;
}
function getShouldScaleTranslateEffects(props, effects, scrollAxis) {
  if (props.rootMargin || props.targetElement || props.shouldDisableScalingTranslations) {
    return false;
  }
  if (!!effects.translateX && scrollAxis === ScrollAxis.horizontal || !!effects.translateY && scrollAxis === ScrollAxis.vertical) {
    return true;
  }
  return false;
}
var clamp = function clamp2(num, min, max) {
  return Math.min(Math.max(num, min), max);
};
var Element = function() {
  function Element2(options) {
    this.el = options.el;
    this.props = options.props;
    this.scrollAxis = options.scrollAxis;
    this.disabledParallaxController = options.disabledParallaxController || false;
    this.id = createId();
    this.effects = parseElementTransitionEffects(this.props, this.scrollAxis);
    this.isInView = null;
    this.progress = 0;
    this._setElementEasing(options.props.easing);
    setWillChangeStyles(options.el, this.effects);
  }
  var _proto = Element2.prototype;
  _proto.updateProps = function updateProps(nextProps) {
    this.props = _extends({}, this.props, nextProps);
    this.effects = parseElementTransitionEffects(nextProps, this.scrollAxis);
    this._setElementEasing(nextProps.easing);
    return this;
  };
  _proto.setCachedAttributes = function setCachedAttributes(view, scroll) {
    resetStyles(this);
    this.rect = new Rect({
      el: this.props.targetElement || this.el,
      rootMargin: this.props.rootMargin,
      view
    });
    var shouldScaleTranslateEffects = getShouldScaleTranslateEffects(this.props, this.effects, this.scrollAxis);
    if (typeof this.props.startScroll === "number" && typeof this.props.endScroll === "number") {
      this.limits = new Limits({
        startX: this.props.startScroll,
        startY: this.props.startScroll,
        endX: this.props.endScroll,
        endY: this.props.endScroll
      });
      this._setElementStyles();
      return this;
    }
    if (shouldScaleTranslateEffects) {
      this.limits = createLimitsWithTranslationsForRelativeElements(this.rect, view, this.effects, scroll, this.scrollAxis, this.props.shouldAlwaysCompleteAnimation);
      this.scaledEffects = scaleTranslateEffectsForSlowerScroll(this.effects, this.limits);
    } else {
      this.limits = createLimitsForRelativeElements(this.rect, view, scroll, this.props.shouldAlwaysCompleteAnimation);
    }
    this._setElementStyles();
    return this;
  };
  _proto._updateElementIsInView = function _updateElementIsInView(nextIsInView) {
    var isFirstChange = this.isInView === null;
    if (nextIsInView !== this.isInView) {
      if (nextIsInView) {
        this.props.onEnter && this.props.onEnter(this);
      } else if (!isFirstChange) {
        this._setFinalProgress();
        this._setElementStyles();
        this.props.onExit && this.props.onExit(this);
      }
    }
    this.isInView = nextIsInView;
  };
  _proto._setFinalProgress = function _setFinalProgress() {
    var finalProgress = clamp(Math.round(this.progress), 0, 1);
    this._updateElementProgress(finalProgress);
  };
  _proto._setElementStyles = function _setElementStyles() {
    if (this.props.disabled || this.disabledParallaxController) return;
    var effects = this.scaledEffects || this.effects;
    setElementStyles(effects, this.progress, this.el);
  };
  _proto._updateElementProgress = function _updateElementProgress(nextProgress) {
    this.progress = nextProgress;
    this.props.onProgressChange && this.props.onProgressChange(this.progress);
    this.props.onChange && this.props.onChange(this);
  };
  _proto._setElementEasing = function _setElementEasing(easing) {
    this.easing = createEasingFunction(easing);
  };
  _proto.updateElementOptions = function updateElementOptions(options) {
    this.scrollAxis = options.scrollAxis;
    this.disabledParallaxController = options.disabledParallaxController || false;
  };
  _proto.updatePosition = function updatePosition(scroll) {
    if (!this.limits) return this;
    var isVertical = this.scrollAxis === ScrollAxis.vertical;
    var isFirstChange = this.isInView === null;
    var start = isVertical ? this.limits.startY : this.limits.startX;
    var end = isVertical ? this.limits.endY : this.limits.endX;
    var total = isVertical ? this.limits.totalY : this.limits.totalX;
    var s = isVertical ? scroll.y : scroll.x;
    var nextIsInView = isElementInView(start, end, s);
    this._updateElementIsInView(nextIsInView);
    if (nextIsInView) {
      var nextProgress = getProgressAmount(start, total, s, this.easing);
      this._updateElementProgress(nextProgress);
      this._setElementStyles();
    } else if (isFirstChange) {
      this.progress = clamp(Math.round(getProgressAmount(start, total, s, this.easing)), 0, 1);
      this._setElementStyles();
    }
    return this;
  };
  return Element2;
}();
var View = function() {
  function View2(config) {
    this.scrollContainer = config.scrollContainer;
    this.width = config.width;
    this.height = config.height;
    this.scrollHeight = config.scrollHeight;
    this.scrollWidth = config.scrollWidth;
  }
  var _proto = View2.prototype;
  _proto.hasChanged = function hasChanged(params) {
    if (params.width !== this.width || params.height !== this.height || params.scrollWidth !== this.scrollWidth || params.scrollHeight !== this.scrollHeight) {
      return true;
    }
    return false;
  };
  _proto.setSize = function setSize(params) {
    this.width = params.width;
    this.height = params.height;
    this.scrollHeight = params.scrollHeight;
    this.scrollWidth = params.scrollWidth;
    return this;
  };
  return View2;
}();
var Scroll = function() {
  function Scroll2(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
  }
  var _proto = Scroll2.prototype;
  _proto.setScroll = function setScroll(x, y) {
    this.dx = x - this.x;
    this.dy = y - this.y;
    this.x = x;
    this.y = y;
    return this;
  };
  return Scroll2;
}();
function testForPassiveScroll() {
  var supportsPassiveOption = false;
  try {
    var opts = Object.defineProperty({}, "passive", {
      get: function get() {
        supportsPassiveOption = true;
        return true;
      }
    });
    window.addEventListener("test", null, opts);
    window.removeEventListener("test", null, opts);
  } catch (e) {
  }
  return supportsPassiveOption;
}
var ParallaxController = function() {
  function ParallaxController2(_ref) {
    var _ref$scrollAxis = _ref.scrollAxis, scrollAxis = _ref$scrollAxis === void 0 ? ScrollAxis.vertical : _ref$scrollAxis, scrollContainer = _ref.scrollContainer, _ref$disabled = _ref.disabled, disabled = _ref$disabled === void 0 ? false : _ref$disabled;
    this.disabled = disabled;
    this.scrollAxis = scrollAxis;
    this.elements = [];
    this._hasScrollContainer = !!scrollContainer;
    this.viewEl = scrollContainer != null ? scrollContainer : window;
    var _this$_getScrollPosit = this._getScrollPosition(), x = _this$_getScrollPosit[0], y = _this$_getScrollPosit[1];
    this.scroll = new Scroll(x, y);
    this.view = new View({
      width: 0,
      height: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      scrollContainer: this._hasScrollContainer ? scrollContainer : void 0
    });
    this._ticking = false;
    this._supportsPassive = testForPassiveScroll();
    this._bindAllMethods();
    if (this.disabled) return;
    this._addListeners(this.viewEl);
    this._addResizeObserver();
    this._setViewSize();
  }
  ParallaxController2.init = function init(options) {
    var hasWindow = typeof window !== "undefined";
    if (!hasWindow) {
      throw new Error("Looks like ParallaxController.init() was called on the server. This method must be called on the client.");
    }
    return new ParallaxController2(options);
  };
  var _proto = ParallaxController2.prototype;
  _proto._bindAllMethods = function _bindAllMethods() {
    var _this = this;
    ["_addListeners", "_removeListeners", "_getScrollPosition", "_handleScroll", "_handleUpdateCache", "_updateAllElements", "_updateElementPosition", "_setViewSize", "_addResizeObserver", "_checkIfViewHasChanged", "_getViewParams", "getElements", "createElement", "removeElementById", "resetElementStyles", "updateElementPropsById", "update", "updateScrollContainer", "destroy"].forEach(function(method) {
      _this[method] = _this[method].bind(_this);
    });
  };
  _proto._addListeners = function _addListeners(el) {
    el.addEventListener("scroll", this._handleScroll, this._supportsPassive ? {
      passive: true
    } : false);
    window.addEventListener("resize", this._handleUpdateCache, false);
    window.addEventListener("blur", this._handleUpdateCache, false);
    window.addEventListener("focus", this._handleUpdateCache, false);
    window.addEventListener("load", this._handleUpdateCache, false);
  };
  _proto._removeListeners = function _removeListeners(el) {
    var _this$_resizeObserver;
    el.removeEventListener("scroll", this._handleScroll, false);
    window.removeEventListener("resize", this._handleUpdateCache, false);
    window.removeEventListener("blur", this._handleUpdateCache, false);
    window.removeEventListener("focus", this._handleUpdateCache, false);
    window.removeEventListener("load", this._handleUpdateCache, false);
    (_this$_resizeObserver = this._resizeObserver) == null ? void 0 : _this$_resizeObserver.disconnect();
  };
  _proto._addResizeObserver = function _addResizeObserver() {
    var _this2 = this;
    try {
      var observedEl = this._hasScrollContainer ? this.viewEl : document.documentElement;
      this._resizeObserver = new ResizeObserver(function() {
        return _this2.update();
      });
      this._resizeObserver.observe(observedEl);
    } catch (e) {
      console.warn("Failed to create the resize observer in the ParallaxContoller");
    }
  };
  _proto._getScrollPosition = function _getScrollPosition() {
    var nx = this._hasScrollContainer ? (
      // @ts-expect-error
      this.viewEl.scrollLeft
    ) : window.pageXOffset;
    var ny = this._hasScrollContainer ? (
      // @ts-expect-error
      this.viewEl.scrollTop
    ) : window.pageYOffset;
    return [nx, ny];
  };
  _proto._handleScroll = function _handleScroll() {
    var _this$elements;
    var _this$_getScrollPosit2 = this._getScrollPosition(), nx = _this$_getScrollPosit2[0], ny = _this$_getScrollPosit2[1];
    this.scroll.setScroll(nx, ny);
    if (!this._ticking && ((_this$elements = this.elements) == null ? void 0 : _this$elements.length) > 0) {
      this._ticking = true;
      window.requestAnimationFrame(this._updateAllElements);
    }
  };
  _proto._handleUpdateCache = function _handleUpdateCache() {
    this._setViewSize();
    this._updateAllElements({
      updateCache: true
    });
  };
  _proto._updateAllElements = function _updateAllElements(_temp) {
    var _this3 = this;
    var _ref2 = _temp === void 0 ? {} : _temp, updateCache = _ref2.updateCache;
    if (this.elements) {
      this.elements.forEach(function(element) {
        if (updateCache) {
          element.setCachedAttributes(_this3.view, _this3.scroll);
        }
        _this3._updateElementPosition(element);
      });
    }
    this._ticking = false;
  };
  _proto._updateElementPosition = function _updateElementPosition(element) {
    if (element.props.disabled || this.disabled) return;
    element.updatePosition(this.scroll);
  };
  _proto._getViewParams = function _getViewParams() {
    if (this._hasScrollContainer) {
      var _width = this.viewEl.offsetWidth;
      var _height = this.viewEl.offsetHeight;
      var _scrollHeight = this.viewEl.scrollHeight;
      var _scrollWidth = this.viewEl.scrollWidth;
      return this.view.setSize({
        width: _width,
        height: _height,
        scrollHeight: _scrollHeight,
        scrollWidth: _scrollWidth
      });
    }
    var html = document.documentElement;
    var width = window.innerWidth || html.clientWidth;
    var height = window.innerHeight || html.clientHeight;
    var scrollHeight = html.scrollHeight;
    var scrollWidth = html.scrollWidth;
    return {
      width,
      height,
      scrollHeight,
      scrollWidth
    };
  };
  _proto._setViewSize = function _setViewSize() {
    return this.view.setSize(this._getViewParams());
  };
  _proto._checkIfViewHasChanged = function _checkIfViewHasChanged() {
    return this.view.hasChanged(this._getViewParams());
  };
  _proto.getElements = function getElements() {
    return this.elements;
  };
  _proto.createElement = function createElement(options) {
    var newElement = new Element(_extends({}, options, {
      scrollAxis: this.scrollAxis,
      disabledParallaxController: this.disabled
    }));
    newElement.setCachedAttributes(this.view, this.scroll);
    this.elements = this.elements ? [].concat(this.elements, [newElement]) : [newElement];
    this._updateElementPosition(newElement);
    if (this._checkIfViewHasChanged()) {
      this.update();
    }
    return newElement;
  };
  _proto.removeElementById = function removeElementById(id2) {
    if (!this.elements) return;
    this.elements = this.elements.filter(function(el) {
      return el.id !== id2;
    });
  };
  _proto.updateElementPropsById = function updateElementPropsById(id2, props) {
    if (this.elements) {
      this.elements = this.elements.map(function(el) {
        if (el.id === id2) {
          return el.updateProps(props);
        }
        return el;
      });
    }
    this.update();
  };
  _proto.resetElementStyles = function resetElementStyles(element) {
    resetStyles(element);
  };
  _proto.update = function update() {
    var _this$_getScrollPosit3 = this._getScrollPosition(), nx = _this$_getScrollPosit3[0], ny = _this$_getScrollPosit3[1];
    this.scroll.setScroll(nx, ny);
    this._setViewSize();
    this._updateAllElements({
      updateCache: true
    });
  };
  _proto.updateScrollContainer = function updateScrollContainer(el) {
    this._removeListeners(this.viewEl);
    this.viewEl = el;
    this._hasScrollContainer = !!el;
    this.view = new View({
      width: 0,
      height: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      scrollContainer: el
    });
    this._setViewSize();
    this._addListeners(this.viewEl);
    this._updateAllElements({
      updateCache: true
    });
  };
  _proto.disableParallaxController = function disableParallaxController() {
    this.disabled = true;
    this._removeListeners(this.viewEl);
    if (this.elements) {
      this.elements.forEach(function(element) {
        return resetStyles(element);
      });
    }
  };
  _proto.enableParallaxController = function enableParallaxController() {
    var _this4 = this;
    this.disabled = false;
    if (this.elements) {
      this.elements.forEach(function(element) {
        return element.updateElementOptions({
          disabledParallaxController: false,
          scrollAxis: _this4.scrollAxis
        });
      });
    }
    this._addListeners(this.viewEl);
    this._addResizeObserver();
    this._setViewSize();
  };
  _proto.disableAllElements = function disableAllElements() {
    console.warn("deprecated: use disableParallaxController() instead");
    if (this.elements) {
      this.elements = this.elements.map(function(el) {
        return el.updateProps({
          disabled: true
        });
      });
    }
    this.update();
  };
  _proto.enableAllElements = function enableAllElements() {
    console.warn("deprecated: use enableParallaxController() instead");
    if (this.elements) {
      this.elements = this.elements.map(function(el) {
        return el.updateProps({
          disabled: false
        });
      });
    }
    this.update();
  };
  _proto.destroy = function destroy() {
    this._removeListeners(this.viewEl);
    if (this.elements) {
      this.elements.forEach(function(element) {
        return resetStyles(element);
      });
    }
    this.elements = void 0;
  };
  return ParallaxController2;
}();

// node_modules/react-scroll-parallax/dist/react-scroll-parallax.esm.js
var import_react = __toESM(require_react());
function _extends2() {
  _extends2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function removeUndefinedObjectKeys(obj) {
  Object.keys(obj).forEach(function(key) {
    return obj[key] === void 0 && delete obj[key];
  });
  return obj;
}
var _excluded = ["disabled", "easing", "endScroll", "onChange", "onEnter", "onExit", "onProgressChange", "opacity", "rootMargin", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "shouldAlwaysCompleteAnimation", "shouldDisableScalingTranslations", "speed", "startScroll", "targetElement", "translateX", "translateY"];
function getIsolatedParallaxProps(props) {
  var disabled = props.disabled, easing = props.easing, endScroll = props.endScroll, onChange = props.onChange, onEnter = props.onEnter, onExit = props.onExit, onProgressChange = props.onProgressChange, opacity = props.opacity, rootMargin = props.rootMargin, rotate = props.rotate, rotateX = props.rotateX, rotateY = props.rotateY, rotateZ = props.rotateZ, scale = props.scale, scaleX = props.scaleX, scaleY = props.scaleY, scaleZ = props.scaleZ, shouldAlwaysCompleteAnimation = props.shouldAlwaysCompleteAnimation, shouldDisableScalingTranslations = props.shouldDisableScalingTranslations, speed = props.speed, startScroll = props.startScroll, targetElement = props.targetElement, translateX = props.translateX, translateY = props.translateY, rest = _objectWithoutPropertiesLoose(props, _excluded);
  var parallaxProps = removeUndefinedObjectKeys({
    disabled,
    easing,
    endScroll,
    onChange,
    onEnter,
    onExit,
    onProgressChange,
    opacity,
    rootMargin,
    rotate,
    rotateX,
    rotateY,
    rotateZ,
    scale,
    scaleX,
    scaleY,
    scaleZ,
    shouldAlwaysCompleteAnimation,
    shouldDisableScalingTranslations,
    speed,
    startScroll,
    targetElement,
    translateX,
    translateY
  });
  return {
    parallaxProps,
    rest
  };
}
function useVerifyController(controller) {
  (0, import_react.useEffect)(function() {
    var isServer = typeof window === "undefined";
    var isInstance = controller instanceof ParallaxController;
    if (!isServer && !controller && !isInstance) {
      throw new Error("Must wrap your application's <Parallax /> components in a <ParallaxProvider />.");
    }
  }, [controller]);
}
var ParallaxContext = import_react.default.createContext(null);
function useParallaxController() {
  var parallaxController = (0, import_react.useContext)(ParallaxContext);
  var isServer = typeof window === "undefined";
  if (isServer) {
    return null;
  }
  if (!parallaxController) {
    throw new Error("Could not find `react-scroll-parallax` context value. Please ensure the component is wrapped in a <ParallaxProvider>");
  }
  return parallaxController;
}
function useParallax(props) {
  var controller = useParallaxController();
  var ref = (0, import_react.useRef)(null);
  var _getIsolatedParallaxP = getIsolatedParallaxProps(props), parallaxProps = _getIsolatedParallaxP.parallaxProps;
  useVerifyController(controller);
  var _useState = (0, import_react.useState)(), element = _useState[0], setElement = _useState[1];
  (0, import_react.useEffect)(function() {
    var newElement;
    if (ref.current instanceof HTMLElement) {
      var options = {
        el: ref.current,
        props: parallaxProps
      };
      newElement = controller == null ? void 0 : controller.createElement(options);
      setElement(newElement);
    } else {
      throw new Error("You must assign the ref returned by the useParallax() hook to an HTML Element.");
    }
    return function() {
      if (newElement) {
        controller == null ? void 0 : controller.removeElementById(newElement.id);
      }
    };
  }, []);
  (0, import_react.useEffect)(function() {
    if (element) {
      if (props.disabled) {
        controller == null ? void 0 : controller.resetElementStyles(element);
        controller == null ? void 0 : controller.updateElementPropsById(element.id, parallaxProps);
      } else {
        controller == null ? void 0 : controller.updateElementPropsById(element.id, parallaxProps);
      }
    }
  }, [props.disabled, props.easing, props.endScroll, props.onChange, props.onEnter, props.onExit, props.onProgressChange, props.opacity, props.rootMargin, props.rotate, props.rotateX, props.rotateY, props.rotateZ, props.scale, props.scaleX, props.scaleY, props.scaleZ, props.shouldAlwaysCompleteAnimation, props.shouldDisableScalingTranslations, props.speed, props.startScroll, props.targetElement, props.translateX, props.translateY]);
  return {
    ref,
    controller,
    element
  };
}
function Parallax(props) {
  var _getIsolatedParallaxP = getIsolatedParallaxProps(props), parallaxProps = _getIsolatedParallaxP.parallaxProps, rest = _getIsolatedParallaxP.rest;
  var _useParallax = useParallax(parallaxProps), ref = _useParallax.ref;
  return import_react.default.createElement("div", Object.assign({
    ref
  }, rest), props.children);
}
var FALLBACK_RECT = {
  height: 0
};
function getExpandedStyle(layer) {
  if (Array.isArray(layer.translateY)) {
    var translateYStart = parseValueAndUnit(layer.translateY[0]);
    var translateYEnd = parseValueAndUnit(layer.translateY[1]);
    if (translateYStart.unit === "px" && translateYEnd.unit === "px") {
      return {
        top: Math.abs(translateYEnd.value) * -1 + "px",
        bottom: Math.abs(translateYStart.value) * -1 + "px"
      };
    }
    if (translateYStart.unit === "%" && translateYEnd.unit === "%") {
      var _layer$targetElement$, _layer$targetElement;
      var clientRect = (_layer$targetElement$ = (_layer$targetElement = layer.targetElement) == null ? void 0 : _layer$targetElement.getBoundingClientRect()) != null ? _layer$targetElement$ : FALLBACK_RECT;
      var top = Math.abs(clientRect.height * 0.01 * translateYEnd.value) * -1;
      var bottom = Math.abs(clientRect.height * 0.01 * translateYStart.value) * -1;
      return {
        top: top + "px",
        bottom: bottom + "px"
      };
    }
  }
  if (layer.speed) {
    var speed = layer.speed || 0;
    var absSpeed = Math.abs(speed) * 10 * -1;
    return {
      top: absSpeed + "px",
      bottom: absSpeed + "px"
    };
  }
  return {};
}
function getImageStyle(layer) {
  return layer.image ? {
    backgroundImage: "url(" + layer.image + ")",
    backgroundPosition: "center",
    backgroundSize: "cover"
  } : {};
}
var _excluded$1 = ["children", "disabled", "style", "expanded", "image", "testId"];
var absoluteStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
var ParallaxBannerLayer = function ParallaxBannerLayer2(props) {
  var _getIsolatedParallaxP = getIsolatedParallaxProps(props), parallaxProps = _getIsolatedParallaxP.parallaxProps, rest = _getIsolatedParallaxP.rest;
  var style = rest.style, _rest$expanded = rest.expanded, expanded = _rest$expanded === void 0 ? true : _rest$expanded, testId = rest.testId, divProps = _objectWithoutPropertiesLoose(rest, _excluded$1);
  var imageStyle = getImageStyle(props);
  var expandedStyle = expanded ? getExpandedStyle(props) : {};
  var parallax = useParallax(_extends2({
    targetElement: props.targetElement,
    shouldDisableScalingTranslations: true
  }, parallaxProps));
  return import_react.default.createElement("div", Object.assign({
    "data-testid": testId,
    ref: parallax.ref,
    style: _extends2({}, imageStyle, absoluteStyle, expandedStyle, style)
  }, divProps), rest.children);
};
var _excluded$2 = ["disabled", "style", "layers"];
var containerStyle = {
  position: "relative",
  overflow: "hidden",
  width: "100%"
};
var ParallaxBanner = function ParallaxBanner2(props) {
  var _useState = (0, import_react.useState)(null), targetElement = _useState[0], setTargetElement = _useState[1];
  var containerRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(function() {
    setTargetElement(containerRef.current);
  }, []);
  var rootStyle = props.style, _props$layers = props.layers, layers = _props$layers === void 0 ? [] : _props$layers, rootRest = _objectWithoutPropertiesLoose(props, _excluded$2);
  function renderLayers() {
    if (targetElement) {
      var shouldUseLayers = layers && layers.length > 0;
      if (shouldUseLayers) {
        return layers.map(function(layer, i) {
          return import_react.default.createElement(ParallaxBannerLayer, Object.assign({}, layer, {
            targetElement,
            key: "layer-" + i,
            testId: "layer-" + i
          }));
        });
      }
    }
    return null;
  }
  function renderChildren() {
    if (targetElement) {
      return import_react.default.Children.map(props.children, function(child) {
        var item = child;
        if ((item == null ? void 0 : item.type) === ParallaxBannerLayer) {
          var clone = import_react.default.cloneElement(item, {
            targetElement
          });
          return clone;
        }
        return child;
      });
    }
    return null;
  }
  return import_react.default.createElement("div", Object.assign({
    ref: containerRef,
    style: _extends2({}, containerStyle, rootStyle)
  }, rootRest), renderLayers(), renderChildren());
};
var createController = function createController2(options) {
  var isServer = typeof window === "undefined";
  if (!isServer) {
    return ParallaxController.init(options);
  }
  return null;
};
function ParallaxProvider(props) {
  var controller = (0, import_react.useRef)(null);
  if (!controller.current) {
    controller.current = createController({
      scrollAxis: props.scrollAxis || ScrollAxis.vertical,
      scrollContainer: props.scrollContainer,
      disabled: props.isDisabled
    });
  }
  (0, import_react.useEffect)(function() {
    if (props.scrollContainer && controller.current) {
      controller.current.updateScrollContainer(props.scrollContainer);
    }
  }, [props.scrollContainer, controller.current]);
  (0, import_react.useEffect)(function() {
    if (props.isDisabled && controller.current) {
      controller.current.disableParallaxController();
    }
    if (!props.isDisabled && controller.current) {
      controller.current.enableParallaxController();
    }
  }, [props.isDisabled, controller.current]);
  (0, import_react.useEffect)(function() {
    return function() {
      (controller == null ? void 0 : controller.current) && (controller == null ? void 0 : controller.current.destroy());
    };
  }, []);
  return import_react.default.createElement(ParallaxContext.Provider, {
    value: controller.current
  }, props.children);
}
export {
  EasingPreset,
  Parallax,
  ParallaxBanner,
  ParallaxBannerLayer,
  ParallaxContext,
  ParallaxProvider,
  useParallax,
  useParallaxController
};
//# sourceMappingURL=react-scroll-parallax.js.map
