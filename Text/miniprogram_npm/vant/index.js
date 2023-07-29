module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1690162275795, function(require, module, exports) {

Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const vue = require("vue");
const use = require("@vant/use");
const shared = require("@vue/shared");
const popperjs = require("@vant/popperjs");
function noop() {
}
const extend = Object.assign;
const inBrowser = typeof window !== "undefined";
const isObject = (val) => val !== null && typeof val === "object";
const isDef = (val) => val !== void 0 && val !== null;
const isFunction = (val) => typeof val === "function";
const isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch);
const isDate = (val) => Object.prototype.toString.call(val) === "[object Date]" && !Number.isNaN(val.getTime());
function isMobile(value) {
  value = value.replace(/[^-|\d]/g, "");
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}
const isNumeric = (val) => typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
const isIOS$1 = () => inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
function get(object, path) {
  const keys = path.split(".");
  let result = object;
  keys.forEach((key) => {
    var _a;
    result = isObject(result) ? (_a = result[key]) != null ? _a : "" : "";
  });
  return result;
}
function pick(obj, keys, ignoreUndefined) {
  return keys.reduce(
    (ret, key) => {
      if (!ignoreUndefined || obj[key] !== void 0) {
        ret[key] = obj[key];
      }
      return ret;
    },
    {}
  );
}
const isSameValue = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue);
const toArray = (item) => Array.isArray(item) ? item : [item];
const unknownProp = null;
const numericProp = [Number, String];
const truthProp = {
  type: Boolean,
  default: true
};
const makeRequiredProp = (type) => ({
  type,
  required: true
});
const makeArrayProp = () => ({
  type: Array,
  default: () => []
});
const makeNumberProp = (defaultVal) => ({
  type: Number,
  default: defaultVal
});
const makeNumericProp = (defaultVal) => ({
  type: numericProp,
  default: defaultVal
});
const makeStringProp = (defaultVal) => ({
  type: String,
  default: defaultVal
});
function getScrollTop(el) {
  const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top, 0);
}
function setScrollTop(el, value) {
  if ("scrollTop" in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}
function getElementTop(el, scroller) {
  if (el === window) {
    return 0;
  }
  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return use.useRect(el).top + scrollTop;
}
const isIOS = isIOS$1();
function resetScroll() {
  if (isIOS) {
    setRootScrollTop(getRootScrollTop());
  }
}
const stopPropagation = (event) => event.stopPropagation();
function preventDefault(event, isStopPropagation) {
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    stopPropagation(event);
  }
}
function isHidden(elementRef) {
  const el = vue.unref(elementRef);
  if (!el) {
    return false;
  }
  const style = window.getComputedStyle(el);
  const hidden = style.display === "none";
  const parentHidden = el.offsetParent === null && style.position !== "fixed";
  return hidden || parentHidden;
}
const { width: windowWidth, height: windowHeight } = use.useWindowSize();
function addUnit(value) {
  if (isDef(value)) {
    return isNumeric(value) ? `${value}px` : String(value);
  }
  return void 0;
}
function getSizeStyle(originSize) {
  if (isDef(originSize)) {
    if (Array.isArray(originSize)) {
      return {
        width: addUnit(originSize[0]),
        height: addUnit(originSize[1])
      };
    }
    const size = addUnit(originSize);
    return {
      width: size,
      height: size
    };
  }
}
function getZIndexStyle(zIndex) {
  const style = {};
  if (zIndex !== void 0) {
    style.zIndex = +zIndex;
  }
  return style;
}
let rootFontSize;
function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }
  return rootFontSize;
}
function convertRem(value) {
  value = value.replace(/rem/g, "");
  return +value * getRootFontSize();
}
function convertVw(value) {
  value = value.replace(/vw/g, "");
  return +value * windowWidth.value / 100;
}
function convertVh(value) {
  value = value.replace(/vh/g, "");
  return +value * windowHeight.value / 100;
}
function unitToPx(value) {
  if (typeof value === "number") {
    return value;
  }
  if (inBrowser) {
    if (value.includes("rem")) {
      return convertRem(value);
    }
    if (value.includes("vw")) {
      return convertVw(value);
    }
    if (value.includes("vh")) {
      return convertVh(value);
    }
  }
  return parseFloat(value);
}
const camelizeRE = /-(\w)/g;
const camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());
const kebabCase = (str) => str.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
function padZero(num, targetLength = 2) {
  let str = num + "";
  while (str.length < targetLength) {
    str = "0" + str;
  }
  return str;
}
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
function trimExtraChar(value, char, regExp) {
  const index = value.indexOf(char);
  if (index === -1) {
    return value;
  }
  if (char === "-" && index !== 0) {
    return value.slice(0, index);
  }
  return value.slice(0, index + 1) + value.slice(index).replace(regExp, "");
}
function formatNumber(value, allowDot = true, allowMinus = true) {
  if (allowDot) {
    value = trimExtraChar(value, ".", /\./g);
  } else {
    value = value.split(".")[0];
  }
  if (allowMinus) {
    value = trimExtraChar(value, "-", /-/g);
  } else {
    value = value.replace(/-/, "");
  }
  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, "");
}
function addNumber(num1, num2) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
const { hasOwnProperty } = Object.prototype;
function assignKey(to, from, key) {
  const val = from[key];
  if (!isDef(val)) {
    return;
  }
  if (!hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val;
  } else {
    to[key] = deepAssign(Object(to[key]), val);
  }
}
function deepAssign(to, from) {
  Object.keys(from).forEach((key) => {
    assignKey(to, from, key);
  });
  return to;
}
var stdin_default$1V = {
  name: "姓名",
  tel: "电话",
  save: "保存",
  clear: "清空",
  cancel: "取消",
  confirm: "确认",
  delete: "删除",
  loading: "加载中...",
  noCoupon: "暂无优惠券",
  nameEmpty: "请填写姓名",
  addContact: "添加联系人",
  telInvalid: "请填写正确的电话",
  vanCalendar: {
    end: "结束",
    start: "开始",
    title: "日期选择",
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    monthTitle: (year, month) => `${year}年${month}月`,
    rangePrompt: (maxRange) => `最多选择 ${maxRange} 天`
  },
  vanCascader: {
    select: "请选择"
  },
  vanPagination: {
    prev: "上一页",
    next: "下一页"
  },
  vanPullRefresh: {
    pulling: "下拉即可刷新...",
    loosing: "释放即可刷新..."
  },
  vanSubmitBar: {
    label: "合计:"
  },
  vanCoupon: {
    unlimited: "无门槛",
    discount: (discount) => `${discount}折`,
    condition: (condition) => `满${condition}元可用`
  },
  vanCouponCell: {
    title: "优惠券",
    count: (count) => `${count}张可用`
  },
  vanCouponList: {
    exchange: "兑换",
    close: "不使用",
    enable: "可用",
    disabled: "不可用",
    placeholder: "输入优惠码"
  },
  vanAddressEdit: {
    area: "地区",
    areaEmpty: "请选择地区",
    addressEmpty: "请填写详细地址",
    addressDetail: "详细地址",
    defaultAddress: "设为默认收货地址"
  },
  vanAddressList: {
    add: "新增地址"
  }
};
const lang = vue.ref("zh-CN");
const messages = vue.reactive({
  "zh-CN": stdin_default$1V
});
const Locale = {
  messages() {
    return messages[lang.value];
  },
  use(newLang, newMessages) {
    lang.value = newLang;
    this.add({ [newLang]: newMessages });
  },
  add(newMessages = {}) {
    deepAssign(messages, newMessages);
  }
};
const useCurrentLang = () => lang;
var stdin_default$1U = Locale;
function createTranslate(name2) {
  const prefix = camelize(name2) + ".";
  return (path, ...args) => {
    const messages2 = stdin_default$1U.messages();
    const message = get(messages2, prefix + path) || get(messages2, path);
    return isFunction(message) ? message(...args) : message;
  };
}
function genBem(name2, mods) {
  if (!mods) {
    return "";
  }
  if (typeof mods === "string") {
    return ` ${name2}--${mods}`;
  }
  if (Array.isArray(mods)) {
    return mods.reduce(
      (ret, item) => ret + genBem(name2, item),
      ""
    );
  }
  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? genBem(name2, key) : ""),
    ""
  );
}
function createBEM(name2) {
  return (el, mods) => {
    if (el && typeof el !== "string") {
      mods = el;
      el = "";
    }
    el = el ? `${name2}__${el}` : name2;
    return `${el}${genBem(el, mods)}`;
  };
}
function createNamespace(name2) {
  const prefixedName = `van-${name2}`;
  return [
    prefixedName,
    createBEM(prefixedName),
    createTranslate(prefixedName)
  ];
}
const BORDER = "van-hairline";
const BORDER_TOP = `${BORDER}--top`;
const BORDER_LEFT = `${BORDER}--left`;
const BORDER_RIGHT = `${BORDER}--right`;
const BORDER_BOTTOM = `${BORDER}--bottom`;
const BORDER_SURROUND = `${BORDER}--surround`;
const BORDER_TOP_BOTTOM = `${BORDER}--top-bottom`;
const BORDER_UNSET_TOP_BOTTOM = `${BORDER}-unset--top-bottom`;
const HAPTICS_FEEDBACK = "van-haptics-feedback";
const FORM_KEY = Symbol("van-form");
const LONG_PRESS_START_TIME = 500;
const TAP_OFFSET = 5;
function callInterceptor(interceptor, {
  args = [],
  done,
  canceled
}) {
  if (interceptor) {
    const returnVal = interceptor.apply(null, args);
    if (isPromise(returnVal)) {
      returnVal.then((value) => {
        if (value) {
          done();
        } else if (canceled) {
          canceled();
        }
      }).catch(noop);
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}
function withInstall(options) {
  options.install = (app) => {
    const { name: name2 } = options;
    if (name2) {
      app.component(name2, options);
      app.component(camelize(`-${name2}`), options);
    }
  };
  return options;
}
function closest(arr, target) {
  return arr.reduce(
    (pre, cur) => Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur
  );
}
const POPUP_TOGGLE_KEY = Symbol();
function onPopupReopen(callback) {
  const popupToggleStatus = vue.inject(POPUP_TOGGLE_KEY, null);
  if (popupToggleStatus) {
    vue.watch(popupToggleStatus, (show) => {
      if (show) {
        callback();
      }
    });
  }
}
const useHeight = (element, withSafeArea) => {
  const height = vue.ref();
  const setHeight = () => {
    height.value = use.useRect(element).height;
  };
  vue.onMounted(() => {
    vue.nextTick(setHeight);
    if (withSafeArea) {
      for (let i = 1; i <= 3; i++) {
        setTimeout(setHeight, 100 * i);
      }
    }
  });
  onPopupReopen(() => vue.nextTick(setHeight));
  vue.watch([windowWidth, windowHeight], setHeight);
  return height;
};
function usePlaceholder(contentRef, bem2) {
  const height = useHeight(contentRef, true);
  return (renderContent) => vue.createVNode("div", {
    "class": bem2("placeholder"),
    "style": {
      height: height.value ? `${height.value}px` : void 0
    }
  }, [renderContent()]);
}
const [name$1J, bem$1E] = createNamespace("action-bar");
const ACTION_BAR_KEY = Symbol(name$1J);
const actionBarProps = {
  placeholder: Boolean,
  safeAreaInsetBottom: truthProp
};
var stdin_default$1T = vue.defineComponent({
  name: name$1J,
  props: actionBarProps,
  setup(props2, {
    slots
  }) {
    const root = vue.ref();
    const renderPlaceholder = usePlaceholder(root, bem$1E);
    const {
      linkChildren
    } = use.useChildren(ACTION_BAR_KEY);
    linkChildren();
    const renderActionBar = () => {
      var _a;
      return vue.createVNode("div", {
        "ref": root,
        "class": [bem$1E(), {
          "van-safe-area-bottom": props2.safeAreaInsetBottom
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    return () => {
      if (props2.placeholder) {
        return renderPlaceholder(renderActionBar);
      }
      return renderActionBar();
    };
  }
});
const ActionBar = withInstall(stdin_default$1T);
function useExpose(apis) {
  const instance2 = vue.getCurrentInstance();
  if (instance2) {
    extend(instance2.proxy, apis);
  }
}
const routeProps = {
  to: [String, Object],
  url: String,
  replace: Boolean
};
function route({
  to,
  url,
  replace,
  $router: router
}) {
  if (to && router) {
    router[replace ? "replace" : "push"](to);
  } else if (url) {
    replace ? location.replace(url) : location.href = url;
  }
}
function useRoute() {
  const vm = vue.getCurrentInstance().proxy;
  return () => route(vm);
}
const [name$1I, bem$1D] = createNamespace("badge");
const badgeProps = {
  dot: Boolean,
  max: numericProp,
  tag: makeStringProp("div"),
  color: String,
  offset: Array,
  content: numericProp,
  showZero: truthProp,
  position: makeStringProp("top-right")
};
var stdin_default$1S = vue.defineComponent({
  name: name$1I,
  props: badgeProps,
  setup(props2, {
    slots
  }) {
    const hasContent = () => {
      if (slots.content) {
        return true;
      }
      const {
        content,
        showZero
      } = props2;
      return isDef(content) && content !== "" && (showZero || content !== 0 && content !== "0");
    };
    const renderContent = () => {
      const {
        dot,
        max,
        content
      } = props2;
      if (!dot && hasContent()) {
        if (slots.content) {
          return slots.content();
        }
        if (isDef(max) && isNumeric(content) && +content > +max) {
          return `${max}+`;
        }
        return content;
      }
    };
    const getOffsetWithMinusString = (val) => val.startsWith("-") ? val.replace("-", "") : `-${val}`;
    const style = vue.computed(() => {
      const style2 = {
        background: props2.color
      };
      if (props2.offset) {
        const [x, y] = props2.offset;
        const {
          position
        } = props2;
        const [offsetY, offsetX] = position.split("-");
        if (slots.default) {
          if (typeof y === "number") {
            style2[offsetY] = addUnit(offsetY === "top" ? y : -y);
          } else {
            style2[offsetY] = offsetY === "top" ? addUnit(y) : getOffsetWithMinusString(y);
          }
          if (typeof x === "number") {
            style2[offsetX] = addUnit(offsetX === "left" ? x : -x);
          } else {
            style2[offsetX] = offsetX === "left" ? addUnit(x) : getOffsetWithMinusString(x);
          }
        } else {
          style2.marginTop = addUnit(y);
          style2.marginLeft = addUnit(x);
        }
      }
      return style2;
    });
    const renderBadge = () => {
      if (hasContent() || props2.dot) {
        return vue.createVNode("div", {
          "class": bem$1D([props2.position, {
            dot: props2.dot,
            fixed: !!slots.default
          }]),
          "style": style.value
        }, [renderContent()]);
      }
    };
    return () => {
      if (slots.default) {
        const {
          tag
        } = props2;
        return vue.createVNode(tag, {
          "class": bem$1D("wrapper")
        }, {
          default: () => [slots.default(), renderBadge()]
        });
      }
      return renderBadge();
    };
  }
});
const Badge = withInstall(stdin_default$1S);
let globalZIndex = 2e3;
const useGlobalZIndex = () => ++globalZIndex;
const setGlobalZIndex = (val) => {
  globalZIndex = val;
};
const [name$1H, bem$1C] = createNamespace("config-provider");
const CONFIG_PROVIDER_KEY = Symbol(name$1H);
const configProviderProps = {
  tag: makeStringProp("div"),
  theme: makeStringProp("light"),
  zIndex: Number,
  themeVars: Object,
  themeVarsDark: Object,
  themeVarsLight: Object,
  iconPrefix: String
};
function mapThemeVarsToCSSVars(themeVars) {
  const cssVars = {};
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--van-${kebabCase(key)}`] = themeVars[key];
  });
  return cssVars;
}
var stdin_default$1R = vue.defineComponent({
  name: name$1H,
  props: configProviderProps,
  setup(props2, {
    slots
  }) {
    const style = vue.computed(() => mapThemeVarsToCSSVars(extend({}, props2.themeVars, props2.theme === "dark" ? props2.themeVarsDark : props2.themeVarsLight)));
    if (inBrowser) {
      const addTheme = () => {
        document.documentElement.classList.add(`van-theme-${props2.theme}`);
      };
      const removeTheme = (theme = props2.theme) => {
        document.documentElement.classList.remove(`van-theme-${theme}`);
      };
      vue.watch(() => props2.theme, (newVal, oldVal) => {
        if (oldVal) {
          removeTheme(oldVal);
        }
        addTheme();
      }, {
        immediate: true
      });
      vue.onActivated(addTheme);
      vue.onDeactivated(removeTheme);
      vue.onBeforeUnmount(removeTheme);
    }
    vue.provide(CONFIG_PROVIDER_KEY, props2);
    vue.watchEffect(() => {
      if (props2.zIndex !== void 0) {
        setGlobalZIndex(props2.zIndex);
      }
    });
    return () => vue.createVNode(props2.tag, {
      "class": bem$1C(),
      "style": style.value
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
      }
    });
  }
});
const [name$1G, bem$1B] = createNamespace("icon");
const isImage$1 = (name2) => name2 == null ? void 0 : name2.includes("/");
const iconProps = {
  dot: Boolean,
  tag: makeStringProp("i"),
  name: String,
  size: numericProp,
  badge: numericProp,
  color: String,
  badgeProps: Object,
  classPrefix: String
};
var stdin_default$1Q = vue.defineComponent({
  name: name$1G,
  props: iconProps,
  setup(props2, {
    slots
  }) {
    const config = vue.inject(CONFIG_PROVIDER_KEY, null);
    const classPrefix = vue.computed(() => props2.classPrefix || (config == null ? void 0 : config.iconPrefix) || bem$1B());
    return () => {
      const {
        tag,
        dot,
        name: name2,
        size,
        badge,
        color
      } = props2;
      const isImageIcon = isImage$1(name2);
      return vue.createVNode(Badge, vue.mergeProps({
        "dot": dot,
        "tag": tag,
        "class": [classPrefix.value, isImageIcon ? "" : `${classPrefix.value}-${name2}`],
        "style": {
          color,
          fontSize: addUnit(size)
        },
        "content": badge
      }, props2.badgeProps), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots), isImageIcon && vue.createVNode("img", {
            "class": bem$1B("image"),
            "src": name2
          }, null)];
        }
      });
    };
  }
});
const Icon = withInstall(stdin_default$1Q);
var stdin_default$1P = Icon;
const [name$1F, bem$1A] = createNamespace("loading");
const SpinIcon = Array(12).fill(null).map((_, index) => vue.createVNode("i", {
  "class": bem$1A("line", String(index + 1))
}, null));
const CircularIcon = vue.createVNode("svg", {
  "class": bem$1A("circular"),
  "viewBox": "25 25 50 50"
}, [vue.createVNode("circle", {
  "cx": "50",
  "cy": "50",
  "r": "20",
  "fill": "none"
}, null)]);
const loadingProps = {
  size: numericProp,
  type: makeStringProp("circular"),
  color: String,
  vertical: Boolean,
  textSize: numericProp,
  textColor: String
};
var stdin_default$1O = vue.defineComponent({
  name: name$1F,
  props: loadingProps,
  setup(props2, {
    slots
  }) {
    const spinnerStyle = vue.computed(() => extend({
      color: props2.color
    }, getSizeStyle(props2.size)));
    const renderIcon = () => {
      const DefaultIcon = props2.type === "spinner" ? SpinIcon : CircularIcon;
      return vue.createVNode("span", {
        "class": bem$1A("spinner", props2.type),
        "style": spinnerStyle.value
      }, [slots.icon ? slots.icon() : DefaultIcon]);
    };
    const renderText = () => {
      var _a;
      if (slots.default) {
        return vue.createVNode("span", {
          "class": bem$1A("text"),
          "style": {
            fontSize: addUnit(props2.textSize),
            color: (_a = props2.textColor) != null ? _a : props2.color
          }
        }, [slots.default()]);
      }
    };
    return () => {
      const {
        type,
        vertical
      } = props2;
      return vue.createVNode("div", {
        "class": bem$1A([type, {
          vertical
        }]),
        "aria-live": "polite",
        "aria-busy": true
      }, [renderIcon(), renderText()]);
    };
  }
});
const Loading = withInstall(stdin_default$1O);
const [name$1E, bem$1z] = createNamespace("button");
const buttonProps = extend({}, routeProps, {
  tag: makeStringProp("button"),
  text: String,
  icon: String,
  type: makeStringProp("default"),
  size: makeStringProp("normal"),
  color: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
  nativeType: makeStringProp("button"),
  loadingSize: numericProp,
  loadingText: String,
  loadingType: String,
  iconPosition: makeStringProp("left")
});
var stdin_default$1N = vue.defineComponent({
  name: name$1E,
  props: buttonProps,
  emits: ["click"],
  setup(props2, {
    emit,
    slots
  }) {
    const route2 = useRoute();
    const renderLoadingIcon = () => {
      if (slots.loading) {
        return slots.loading();
      }
      return vue.createVNode(Loading, {
        "size": props2.loadingSize,
        "type": props2.loadingType,
        "class": bem$1z("loading")
      }, null);
    };
    const renderIcon = () => {
      if (props2.loading) {
        return renderLoadingIcon();
      }
      if (slots.icon) {
        return vue.createVNode("div", {
          "class": bem$1z("icon")
        }, [slots.icon()]);
      }
      if (props2.icon) {
        return vue.createVNode(Icon, {
          "name": props2.icon,
          "class": bem$1z("icon"),
          "classPrefix": props2.iconPrefix
        }, null);
      }
    };
    const renderText = () => {
      let text;
      if (props2.loading) {
        text = props2.loadingText;
      } else {
        text = slots.default ? slots.default() : props2.text;
      }
      if (text) {
        return vue.createVNode("span", {
          "class": bem$1z("text")
        }, [text]);
      }
    };
    const getStyle = () => {
      const {
        color,
        plain
      } = props2;
      if (color) {
        const style = {
          color: plain ? color : "white"
        };
        if (!plain) {
          style.background = color;
        }
        if (color.includes("gradient")) {
          style.border = 0;
        } else {
          style.borderColor = color;
        }
        return style;
      }
    };
    const onClick = (event) => {
      if (props2.loading) {
        preventDefault(event);
      } else if (!props2.disabled) {
        emit("click", event);
        route2();
      }
    };
    return () => {
      const {
        tag,
        type,
        size,
        block,
        round,
        plain,
        square,
        loading,
        disabled,
        hairline,
        nativeType,
        iconPosition
      } = props2;
      const classes = [bem$1z([type, size, {
        plain,
        block,
        round,
        square,
        loading,
        disabled,
        hairline
      }]), {
        [BORDER_SURROUND]: hairline
      }];
      return vue.createVNode(tag, {
        "type": nativeType,
        "class": classes,
        "style": getStyle(),
        "disabled": disabled,
        "onClick": onClick
      }, {
        default: () => [vue.createVNode("div", {
          "class": bem$1z("content")
        }, [iconPosition === "left" && renderIcon(), renderText(), iconPosition === "right" && renderIcon()])]
      });
    };
  }
});
const Button = withInstall(stdin_default$1N);
const [name$1D, bem$1y] = createNamespace("action-bar-button");
const actionBarButtonProps = extend({}, routeProps, {
  type: String,
  text: String,
  icon: String,
  color: String,
  loading: Boolean,
  disabled: Boolean
});
var stdin_default$1M = vue.defineComponent({
  name: name$1D,
  props: actionBarButtonProps,
  setup(props2, {
    slots
  }) {
    const route2 = useRoute();
    const {
      parent,
      index
    } = use.useParent(ACTION_BAR_KEY);
    const isFirst = vue.computed(() => {
      if (parent) {
        const prev = parent.children[index.value - 1];
        return !(prev && "isButton" in prev);
      }
    });
    const isLast = vue.computed(() => {
      if (parent) {
        const next = parent.children[index.value + 1];
        return !(next && "isButton" in next);
      }
    });
    useExpose({
      isButton: true
    });
    return () => {
      const {
        type,
        icon,
        text,
        color,
        loading,
        disabled
      } = props2;
      return vue.createVNode(Button, {
        "class": bem$1y([type, {
          last: isLast.value,
          first: isFirst.value
        }]),
        "size": "large",
        "type": type,
        "icon": icon,
        "color": color,
        "loading": loading,
        "disabled": disabled,
        "onClick": route2
      }, {
        default: () => [slots.default ? slots.default() : text]
      });
    };
  }
});
const ActionBarButton = withInstall(stdin_default$1M);
const [name$1C, bem$1x] = createNamespace("action-bar-icon");
const actionBarIconProps = extend({}, routeProps, {
  dot: Boolean,
  text: String,
  icon: String,
  color: String,
  badge: numericProp,
  iconClass: unknownProp,
  badgeProps: Object,
  iconPrefix: String
});
var stdin_default$1L = vue.defineComponent({
  name: name$1C,
  props: actionBarIconProps,
  setup(props2, {
    slots
  }) {
    const route2 = useRoute();
    use.useParent(ACTION_BAR_KEY);
    const renderIcon = () => {
      const {
        dot,
        badge,
        icon,
        color,
        iconClass,
        badgeProps: badgeProps2,
        iconPrefix
      } = props2;
      if (slots.icon) {
        return vue.createVNode(Badge, vue.mergeProps({
          "dot": dot,
          "class": bem$1x("icon"),
          "content": badge
        }, badgeProps2), {
          default: slots.icon
        });
      }
      return vue.createVNode(Icon, {
        "tag": "div",
        "dot": dot,
        "name": icon,
        "badge": badge,
        "color": color,
        "class": [bem$1x("icon"), iconClass],
        "badgeProps": badgeProps2,
        "classPrefix": iconPrefix
      }, null);
    };
    return () => vue.createVNode("div", {
      "role": "button",
      "class": bem$1x(),
      "tabindex": 0,
      "onClick": route2
    }, [renderIcon(), slots.default ? slots.default() : props2.text]);
  }
});
const ActionBarIcon = withInstall(stdin_default$1L);
const popupSharedProps = {
  // whether to show popup
  show: Boolean,
  // z-index
  zIndex: numericProp,
  // whether to show overlay
  overlay: truthProp,
  // transition duration
  duration: numericProp,
  // teleport
  teleport: [String, Object],
  // prevent body scroll
  lockScroll: truthProp,
  // whether to lazy render
  lazyRender: truthProp,
  // callback function before close
  beforeClose: Function,
  // overlay custom style
  overlayStyle: Object,
  // overlay custom class name
  overlayClass: unknownProp,
  // Initial rendering animation
  transitionAppear: Boolean,
  // whether to close popup when overlay is clicked
  closeOnClickOverlay: truthProp
};
const popupSharedPropKeys = Object.keys(
  popupSharedProps
);
function getDirection(x, y) {
  if (x > y) {
    return "horizontal";
  }
  if (y > x) {
    return "vertical";
  }
  return "";
}
function useTouch() {
  const startX = vue.ref(0);
  const startY = vue.ref(0);
  const deltaX = vue.ref(0);
  const deltaY = vue.ref(0);
  const offsetX = vue.ref(0);
  const offsetY = vue.ref(0);
  const direction = vue.ref("");
  const isTap = vue.ref(true);
  const isVertical = () => direction.value === "vertical";
  const isHorizontal = () => direction.value === "horizontal";
  const reset = () => {
    deltaX.value = 0;
    deltaY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
    direction.value = "";
    isTap.value = true;
  };
  const start = (event) => {
    reset();
    startX.value = event.touches[0].clientX;
    startY.value = event.touches[0].clientY;
  };
  const move = (event) => {
    const touch = event.touches[0];
    deltaX.value = (touch.clientX < 0 ? 0 : touch.clientX) - startX.value;
    deltaY.value = touch.clientY - startY.value;
    offsetX.value = Math.abs(deltaX.value);
    offsetY.value = Math.abs(deltaY.value);
    const LOCK_DIRECTION_DISTANCE = 10;
    if (!direction.value || offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE) {
      direction.value = getDirection(offsetX.value, offsetY.value);
    }
    if (isTap.value && (offsetX.value > TAP_OFFSET || offsetY.value > TAP_OFFSET)) {
      isTap.value = false;
    }
  };
  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
    isTap
  };
}
let totalLockCount = 0;
const BODY_LOCK_CLASS = "van-overflow-hidden";
function useLockScroll(rootRef, shouldLock) {
  const touch = useTouch();
  const DIRECTION_UP = "01";
  const DIRECTION_DOWN = "10";
  const onTouchMove = (event) => {
    touch.move(event);
    const direction = touch.deltaY.value > 0 ? DIRECTION_DOWN : DIRECTION_UP;
    const el = use.getScrollParent(
      event.target,
      rootRef.value
    );
    const { scrollHeight, offsetHeight, scrollTop } = el;
    let status = "11";
    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? "00" : "01";
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = "10";
    }
    if (status !== "11" && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
      preventDefault(event, true);
    }
  };
  const lock = () => {
    document.addEventListener("touchstart", touch.start);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }
    totalLockCount++;
  };
  const unlock = () => {
    if (totalLockCount) {
      document.removeEventListener("touchstart", touch.start);
      document.removeEventListener("touchmove", onTouchMove);
      totalLockCount--;
      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };
  const init = () => shouldLock() && lock();
  const destroy = () => shouldLock() && unlock();
  use.onMountedOrActivated(init);
  vue.onDeactivated(destroy);
  vue.onBeforeUnmount(destroy);
  vue.watch(shouldLock, (value) => {
    value ? lock() : unlock();
  });
}
function useLazyRender(show) {
  const inited = vue.ref(false);
  vue.watch(
    show,
    (value) => {
      if (value) {
        inited.value = value;
      }
    },
    { immediate: true }
  );
  return (render) => () => inited.value ? render() : null;
}
const [name$1B, bem$1w] = createNamespace("overlay");
const overlayProps = {
  show: Boolean,
  zIndex: numericProp,
  duration: numericProp,
  className: unknownProp,
  lockScroll: truthProp,
  lazyRender: truthProp,
  customStyle: Object
};
var stdin_default$1K = vue.defineComponent({
  name: name$1B,
  props: overlayProps,
  setup(props2, {
    slots
  }) {
    const root = vue.ref();
    const lazyRender = useLazyRender(() => props2.show || !props2.lazyRender);
    const onTouchMove = (event) => {
      if (props2.lockScroll) {
        preventDefault(event, true);
      }
    };
    const renderOverlay = lazyRender(() => {
      var _a;
      const style = extend(getZIndexStyle(props2.zIndex), props2.customStyle);
      if (isDef(props2.duration)) {
        style.animationDuration = `${props2.duration}s`;
      }
      return vue.withDirectives(vue.createVNode("div", {
        "ref": root,
        "style": style,
        "class": [bem$1w(), props2.className]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), [[vue.vShow, props2.show]]);
    });
    use.useEventListener("touchmove", onTouchMove, {
      target: root
    });
    return () => vue.createVNode(vue.Transition, {
      "name": "van-fade",
      "appear": true
    }, {
      default: renderOverlay
    });
  }
});
const Overlay = withInstall(stdin_default$1K);
const popupProps$2 = extend({}, popupSharedProps, {
  round: Boolean,
  position: makeStringProp("center"),
  closeIcon: makeStringProp("cross"),
  closeable: Boolean,
  transition: String,
  iconPrefix: String,
  closeOnPopstate: Boolean,
  closeIconPosition: makeStringProp("top-right"),
  safeAreaInsetTop: Boolean,
  safeAreaInsetBottom: Boolean
});
const [name$1A, bem$1v] = createNamespace("popup");
var stdin_default$1J = vue.defineComponent({
  name: name$1A,
  inheritAttrs: false,
  props: popupProps$2,
  emits: ["open", "close", "opened", "closed", "keydown", "update:show", "clickOverlay", "clickCloseIcon"],
  setup(props2, {
    emit,
    attrs,
    slots
  }) {
    let opened;
    let shouldReopen;
    const zIndex = vue.ref();
    const popupRef = vue.ref();
    const lazyRender = useLazyRender(() => props2.show || !props2.lazyRender);
    const style = vue.computed(() => {
      const style2 = {
        zIndex: zIndex.value
      };
      if (isDef(props2.duration)) {
        const key = props2.position === "center" ? "animationDuration" : "transitionDuration";
        style2[key] = `${props2.duration}s`;
      }
      return style2;
    });
    const open = () => {
      if (!opened) {
        opened = true;
        zIndex.value = props2.zIndex !== void 0 ? +props2.zIndex : useGlobalZIndex();
        emit("open");
      }
    };
    const close = () => {
      if (opened) {
        callInterceptor(props2.beforeClose, {
          done() {
            opened = false;
            emit("close");
            emit("update:show", false);
          }
        });
      }
    };
    const onClickOverlay = (event) => {
      emit("clickOverlay", event);
      if (props2.closeOnClickOverlay) {
        close();
      }
    };
    const renderOverlay = () => {
      if (props2.overlay) {
        return vue.createVNode(Overlay, {
          "show": props2.show,
          "class": props2.overlayClass,
          "zIndex": zIndex.value,
          "duration": props2.duration,
          "customStyle": props2.overlayStyle,
          "role": props2.closeOnClickOverlay ? "button" : void 0,
          "tabindex": props2.closeOnClickOverlay ? 0 : void 0,
          "onClick": onClickOverlay
        }, {
          default: slots["overlay-content"]
        });
      }
    };
    const onClickCloseIcon = (event) => {
      emit("clickCloseIcon", event);
      close();
    };
    const renderCloseIcon = () => {
      if (props2.closeable) {
        return vue.createVNode(Icon, {
          "role": "button",
          "tabindex": 0,
          "name": props2.closeIcon,
          "class": [bem$1v("close-icon", props2.closeIconPosition), HAPTICS_FEEDBACK],
          "classPrefix": props2.iconPrefix,
          "onClick": onClickCloseIcon
        }, null);
      }
    };
    let timer2;
    const onOpened = () => {
      if (timer2)
        clearTimeout(timer2);
      timer2 = setTimeout(() => {
        emit("opened");
      });
    };
    const onClosed = () => emit("closed");
    const onKeydown = (event) => emit("keydown", event);
    const renderPopup = lazyRender(() => {
      var _a;
      const {
        round,
        position,
        safeAreaInsetTop,
        safeAreaInsetBottom
      } = props2;
      return vue.withDirectives(vue.createVNode("div", vue.mergeProps({
        "ref": popupRef,
        "style": style.value,
        "role": "dialog",
        "tabindex": 0,
        "class": [bem$1v({
          round,
          [position]: position
        }), {
          "van-safe-area-top": safeAreaInsetTop,
          "van-safe-area-bottom": safeAreaInsetBottom
        }],
        "onKeydown": onKeydown
      }, attrs), [(_a = slots.default) == null ? void 0 : _a.call(slots), renderCloseIcon()]), [[vue.vShow, props2.show]]);
    });
    const renderTransition = () => {
      const {
        position,
        transition,
        transitionAppear
      } = props2;
      const name2 = position === "center" ? "van-fade" : `van-popup-slide-${position}`;
      return vue.createVNode(vue.Transition, {
        "name": transition || name2,
        "appear": transitionAppear,
        "onAfterEnter": onOpened,
        "onAfterLeave": onClosed
      }, {
        default: renderPopup
      });
    };
    vue.watch(() => props2.show, (show) => {
      if (show && !opened) {
        open();
        if (attrs.tabindex === 0) {
          vue.nextTick(() => {
            var _a;
            (_a = popupRef.value) == null ? void 0 : _a.focus();
          });
        }
      }
      if (!show && opened) {
        opened = false;
        emit("close");
      }
    });
    useExpose({
      popupRef
    });
    useLockScroll(popupRef, () => props2.show && props2.lockScroll);
    use.useEventListener("popstate", () => {
      if (props2.closeOnPopstate) {
        close();
        shouldReopen = false;
      }
    });
    vue.onMounted(() => {
      if (props2.show) {
        open();
      }
    });
    vue.onActivated(() => {
      if (shouldReopen) {
        emit("update:show", true);
        shouldReopen = false;
      }
    });
    vue.onDeactivated(() => {
      if (props2.show && props2.teleport) {
        close();
        shouldReopen = true;
      }
    });
    vue.provide(POPUP_TOGGLE_KEY, () => props2.show);
    return () => {
      if (props2.teleport) {
        return vue.createVNode(vue.Teleport, {
          "to": props2.teleport
        }, {
          default: () => [renderOverlay(), renderTransition()]
        });
      }
      return vue.createVNode(vue.Fragment, null, [renderOverlay(), renderTransition()]);
    };
  }
});
const Popup = withInstall(stdin_default$1J);
const [name$1z, bem$1u] = createNamespace("action-sheet");
const actionSheetProps = extend({}, popupSharedProps, {
  title: String,
  round: truthProp,
  actions: makeArrayProp(),
  closeIcon: makeStringProp("cross"),
  closeable: truthProp,
  cancelText: String,
  description: String,
  closeOnPopstate: truthProp,
  closeOnClickAction: Boolean,
  safeAreaInsetBottom: truthProp
});
const popupInheritKeys$2 = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
var stdin_default$1I = vue.defineComponent({
  name: name$1z,
  props: actionSheetProps,
  emits: ["select", "cancel", "update:show"],
  setup(props2, {
    slots,
    emit
  }) {
    const updateShow = (show) => emit("update:show", show);
    const onCancel = () => {
      updateShow(false);
      emit("cancel");
    };
    const renderHeader = () => {
      if (props2.title) {
        return vue.createVNode("div", {
          "class": bem$1u("header")
        }, [props2.title, props2.closeable && vue.createVNode(Icon, {
          "name": props2.closeIcon,
          "class": [bem$1u("close"), HAPTICS_FEEDBACK],
          "onClick": onCancel
        }, null)]);
      }
    };
    const renderCancel = () => {
      if (slots.cancel || props2.cancelText) {
        return [vue.createVNode("div", {
          "class": bem$1u("gap")
        }, null), vue.createVNode("button", {
          "type": "button",
          "class": bem$1u("cancel"),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : props2.cancelText])];
      }
    };
    const renderActionContent = (action, index) => {
      if (action.loading) {
        return vue.createVNode(Loading, {
          "class": bem$1u("loading-icon")
        }, null);
      }
      if (slots.action) {
        return slots.action({
          action,
          index
        });
      }
      return [vue.createVNode("span", {
        "class": bem$1u("name")
      }, [action.name]), action.subname && vue.createVNode("div", {
        "class": bem$1u("subname")
      }, [action.subname])];
    };
    const renderAction = (action, index) => {
      const {
        color,
        loading,
        callback,
        disabled,
        className
      } = action;
      const onClick = () => {
        if (disabled || loading) {
          return;
        }
        if (callback) {
          callback(action);
        }
        if (props2.closeOnClickAction) {
          updateShow(false);
        }
        vue.nextTick(() => emit("select", action, index));
      };
      return vue.createVNode("button", {
        "type": "button",
        "style": {
          color
        },
        "class": [bem$1u("item", {
          loading,
          disabled
        }), className],
        "onClick": onClick
      }, [renderActionContent(action, index)]);
    };
    const renderDescription = () => {
      if (props2.description || slots.description) {
        const content = slots.description ? slots.description() : props2.description;
        return vue.createVNode("div", {
          "class": bem$1u("description")
        }, [content]);
      }
    };
    return () => vue.createVNode(Popup, vue.mergeProps({
      "class": bem$1u(),
      "position": "bottom",
      "onUpdate:show": updateShow
    }, pick(props2, popupInheritKeys$2)), {
      default: () => {
        var _a;
        return [renderHeader(), renderDescription(), vue.createVNode("div", {
          "class": bem$1u("content")
        }, [props2.actions.map(renderAction), (_a = slots.default) == null ? void 0 : _a.call(slots)]), renderCancel()];
      }
    });
  }
});
const ActionSheet = withInstall(stdin_default$1I);
const [name$1y, bem$1t, t$k] = createNamespace("picker");
const getFirstEnabledOption = (options) => options.find((option) => !option.disabled) || options[0];
function getColumnsType(columns, fields) {
  const firstColumn = columns[0];
  if (firstColumn) {
    if (Array.isArray(firstColumn)) {
      return "multiple";
    }
    if (fields.children in firstColumn) {
      return "cascade";
    }
  }
  return "default";
}
function findIndexOfEnabledOption(options, index) {
  index = clamp(index, 0, options.length);
  for (let i = index; i < options.length; i++) {
    if (!options[i].disabled)
      return i;
  }
  for (let i = index - 1; i >= 0; i--) {
    if (!options[i].disabled)
      return i;
  }
  return 0;
}
const isOptionExist = (options, value, fields) => value !== void 0 && !!options.find((option) => option[fields.value] === value);
function findOptionByValue(options, value, fields) {
  const index = options.findIndex((option) => option[fields.value] === value);
  const enabledIndex = findIndexOfEnabledOption(options, index);
  return options[enabledIndex];
}
function formatCascadeColumns(columns, fields, selectedValues) {
  const formatted = [];
  let cursor = {
    [fields.children]: columns
  };
  let columnIndex = 0;
  while (cursor && cursor[fields.children]) {
    const options = cursor[fields.children];
    const value = selectedValues.value[columnIndex];
    cursor = isDef(value) ? findOptionByValue(options, value, fields) : void 0;
    if (!cursor && options.length) {
      const firstValue = getFirstEnabledOption(options)[fields.value];
      cursor = findOptionByValue(options, firstValue, fields);
    }
    columnIndex++;
    formatted.push(options);
  }
  return formatted;
}
function getElementTranslateY(element) {
  const { transform } = window.getComputedStyle(element);
  const translateY = transform.slice(7, transform.length - 1).split(", ")[5];
  return Number(translateY);
}
function assignDefaultFields(fields) {
  return extend(
    {
      text: "text",
      value: "value",
      children: "children"
    },
    fields
  );
}
const DEFAULT_DURATION = 200;
const MOMENTUM_TIME = 300;
const MOMENTUM_DISTANCE = 15;
const [name$1x, bem$1s] = createNamespace("picker-column");
const PICKER_KEY = Symbol(name$1x);
var stdin_default$1H = vue.defineComponent({
  name: name$1x,
  props: {
    value: numericProp,
    fields: makeRequiredProp(Object),
    options: makeArrayProp(),
    readonly: Boolean,
    allowHtml: Boolean,
    optionHeight: makeRequiredProp(Number),
    swipeDuration: makeRequiredProp(numericProp),
    visibleOptionNum: makeRequiredProp(numericProp)
  },
  emits: ["change", "clickOption", "scrollInto"],
  setup(props2, {
    emit,
    slots
  }) {
    let moving;
    let startOffset;
    let touchStartTime;
    let momentumOffset;
    let transitionEndTrigger;
    const root = vue.ref();
    const wrapper = vue.ref();
    const currentOffset = vue.ref(0);
    const currentDuration = vue.ref(0);
    const touch = useTouch();
    const count = () => props2.options.length;
    const baseOffset = () => props2.optionHeight * (+props2.visibleOptionNum - 1) / 2;
    const updateValueByIndex = (index) => {
      let enabledIndex = findIndexOfEnabledOption(props2.options, index);
      const offset = -enabledIndex * props2.optionHeight;
      const trigger = () => {
        if (enabledIndex > count() - 1) {
          enabledIndex = findIndexOfEnabledOption(props2.options, index);
        }
        const value = props2.options[enabledIndex][props2.fields.value];
        if (value !== props2.value) {
          emit("change", value);
        }
      };
      if (moving && offset !== currentOffset.value) {
        transitionEndTrigger = trigger;
      } else {
        trigger();
      }
      currentOffset.value = offset;
    };
    const isReadonly = () => props2.readonly || !props2.options.length;
    const onClickOption = (index) => {
      if (moving || isReadonly()) {
        return;
      }
      transitionEndTrigger = null;
      currentDuration.value = DEFAULT_DURATION;
      updateValueByIndex(index);
      emit("clickOption", props2.options[index]);
    };
    const getIndexByOffset = (offset) => clamp(Math.round(-offset / props2.optionHeight), 0, count() - 1);
    const currentIndex = vue.computed(() => getIndexByOffset(currentOffset.value));
    const momentum = (distance, duration) => {
      const speed = Math.abs(distance / duration);
      distance = currentOffset.value + speed / 3e-3 * (distance < 0 ? -1 : 1);
      const index = getIndexByOffset(distance);
      currentDuration.value = +props2.swipeDuration;
      updateValueByIndex(index);
    };
    const stopMomentum = () => {
      moving = false;
      currentDuration.value = 0;
      if (transitionEndTrigger) {
        transitionEndTrigger();
        transitionEndTrigger = null;
      }
    };
    const onTouchStart = (event) => {
      if (isReadonly()) {
        return;
      }
      touch.start(event);
      if (moving) {
        const translateY = getElementTranslateY(wrapper.value);
        currentOffset.value = Math.min(0, translateY - baseOffset());
      }
      currentDuration.value = 0;
      startOffset = currentOffset.value;
      touchStartTime = Date.now();
      momentumOffset = startOffset;
      transitionEndTrigger = null;
    };
    const onTouchMove = (event) => {
      if (isReadonly()) {
        return;
      }
      touch.move(event);
      if (touch.isVertical()) {
        moving = true;
        preventDefault(event, true);
      }
      const newOffset = clamp(startOffset + touch.deltaY.value, -(count() * props2.optionHeight), props2.optionHeight);
      const newIndex = getIndexByOffset(newOffset);
      if (newIndex !== currentIndex.value) {
        emit("scrollInto", props2.options[newIndex]);
      }
      currentOffset.value = newOffset;
      const now = Date.now();
      if (now - touchStartTime > MOMENTUM_TIME) {
        touchStartTime = now;
        momentumOffset = newOffset;
      }
    };
    const onTouchEnd = () => {
      if (isReadonly()) {
        return;
      }
      const distance = currentOffset.value - momentumOffset;
      const duration = Date.now() - touchStartTime;
      const startMomentum = duration < MOMENTUM_TIME && Math.abs(distance) > MOMENTUM_DISTANCE;
      if (startMomentum) {
        momentum(distance, duration);
        return;
      }
      const index = getIndexByOffset(currentOffset.value);
      currentDuration.value = DEFAULT_DURATION;
      updateValueByIndex(index);
      setTimeout(() => {
        moving = false;
      }, 0);
    };
    const renderOptions = () => {
      const optionStyle = {
        height: `${props2.optionHeight}px`
      };
      return props2.options.map((option, index) => {
        const text = option[props2.fields.text];
        const {
          disabled
        } = option;
        const value = option[props2.fields.value];
        const data = {
          role: "button",
          style: optionStyle,
          tabindex: disabled ? -1 : 0,
          class: [bem$1s("item", {
            disabled,
            selected: value === props2.value
          }), option.className],
          onClick: () => onClickOption(index)
        };
        const childData = {
          class: "van-ellipsis",
          [props2.allowHtml ? "innerHTML" : "textContent"]: text
        };
        return vue.createVNode("li", data, [slots.option ? slots.option(option, index) : vue.createVNode("div", childData, null)]);
      });
    };
    use.useParent(PICKER_KEY);
    useExpose({
      stopMomentum
    });
    vue.watchEffect(() => {
      const index = moving ? Math.floor(-currentOffset.value / props2.optionHeight) : props2.options.findIndex((option) => option[props2.fields.value] === props2.value);
      const enabledIndex = findIndexOfEnabledOption(props2.options, index);
      const offset = -enabledIndex * props2.optionHeight;
      if (moving && enabledIndex < index)
        stopMomentum();
      currentOffset.value = offset;
    });
    use.useEventListener("touchmove", onTouchMove, {
      target: root
    });
    return () => vue.createVNode("div", {
      "ref": root,
      "class": bem$1s(),
      "onTouchstartPassive": onTouchStart,
      "onTouchend": onTouchEnd,
      "onTouchcancel": onTouchEnd
    }, [vue.createVNode("ul", {
      "ref": wrapper,
      "style": {
        transform: `translate3d(0, ${currentOffset.value + baseOffset()}px, 0)`,
        transitionDuration: `${currentDuration.value}ms`,
        transitionProperty: currentDuration.value ? "all" : "none"
      },
      "class": bem$1s("wrapper"),
      "onTransitionend": stopMomentum
    }, [renderOptions()])]);
  }
});
const [name$1w] = createNamespace("picker-toolbar");
const pickerToolbarProps = {
  title: String,
  cancelButtonText: String,
  confirmButtonText: String
};
const pickerToolbarSlots = ["cancel", "confirm", "title", "toolbar"];
const pickerToolbarPropKeys = Object.keys(pickerToolbarProps);
var stdin_default$1G = vue.defineComponent({
  name: name$1w,
  props: pickerToolbarProps,
  emits: ["confirm", "cancel"],
  setup(props2, {
    emit,
    slots
  }) {
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props2.title) {
        return vue.createVNode("div", {
          "class": [bem$1t("title"), "van-ellipsis"]
        }, [props2.title]);
      }
    };
    const onCancel = () => emit("cancel");
    const onConfirm = () => emit("confirm");
    const renderCancel = () => {
      const text = props2.cancelButtonText || t$k("cancel");
      return vue.createVNode("button", {
        "type": "button",
        "class": [bem$1t("cancel"), HAPTICS_FEEDBACK],
        "onClick": onCancel
      }, [slots.cancel ? slots.cancel() : text]);
    };
    const renderConfirm = () => {
      const text = props2.confirmButtonText || t$k("confirm");
      return vue.createVNode("button", {
        "type": "button",
        "class": [bem$1t("confirm"), HAPTICS_FEEDBACK],
        "onClick": onConfirm
      }, [slots.confirm ? slots.confirm() : text]);
    };
    return () => vue.createVNode("div", {
      "class": bem$1t("toolbar")
    }, [slots.toolbar ? slots.toolbar() : [renderCancel(), renderTitle(), renderConfirm()]]);
  }
});
const useSyncPropRef = (getProp, setProp) => {
  const propRef = vue.ref(getProp());
  vue.watch(getProp, (value) => {
    if (value !== propRef.value) {
      propRef.value = value;
    }
  });
  vue.watch(propRef, (value) => {
    if (value !== getProp()) {
      setProp(value);
    }
  });
  return propRef;
};
function scrollLeftTo(scroller, to, duration) {
  let rafId;
  let count = 0;
  const from = scroller.scrollLeft;
  const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  function cancel() {
    use.cancelRaf(rafId);
  }
  function animate() {
    scroller.scrollLeft += (to - from) / frames;
    if (++count < frames) {
      rafId = use.raf(animate);
    }
  }
  animate();
  return cancel;
}
function scrollTopTo(scroller, to, duration, callback) {
  let rafId;
  let current2 = getScrollTop(scroller);
  const isDown = current2 < to;
  const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  const step = (to - current2) / frames;
  function cancel() {
    use.cancelRaf(rafId);
  }
  function animate() {
    current2 += step;
    if (isDown && current2 > to || !isDown && current2 < to) {
      current2 = to;
    }
    setScrollTop(scroller, current2);
    if (isDown && current2 < to || !isDown && current2 > to) {
      rafId = use.raf(animate);
    } else if (callback) {
      rafId = use.raf(callback);
    }
  }
  animate();
  return cancel;
}
let current = 0;
function useId() {
  const vm = vue.getCurrentInstance();
  const { name: name2 = "unknown" } = (vm == null ? void 0 : vm.type) || {};
  if (process.env.NODE_ENV === "test") {
    return name2;
  }
  return `${name2}-${++current}`;
}
function useRefs() {
  const refs = vue.ref([]);
  const cache = [];
  vue.onBeforeUpdate(() => {
    refs.value = [];
  });
  const setRefs = (index) => {
    if (!cache[index]) {
      cache[index] = (el) => {
        refs.value[index] = el;
      };
    }
    return cache[index];
  };
  return [refs, setRefs];
}
function useVisibilityChange(target, onChange) {
  if (!inBrowser || !window.IntersectionObserver) {
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      onChange(entries[0].intersectionRatio > 0);
    },
    { root: document.body }
  );
  const observe = () => {
    if (target.value) {
      observer.observe(target.value);
    }
  };
  const unobserve = () => {
    if (target.value) {
      observer.unobserve(target.value);
    }
  };
  vue.onDeactivated(unobserve);
  vue.onBeforeUnmount(unobserve);
  use.onMountedOrActivated(observe);
}
const [name$1v, bem$1r] = createNamespace("sticky");
const stickyProps = {
  zIndex: numericProp,
  position: makeStringProp("top"),
  container: Object,
  offsetTop: makeNumericProp(0),
  offsetBottom: makeNumericProp(0)
};
var stdin_default$1F = vue.defineComponent({
  name: name$1v,
  props: stickyProps,
  emits: ["scroll", "change"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = vue.ref();
    const scrollParent = use.useScrollParent(root);
    const state = vue.reactive({
      fixed: false,
      width: 0,
      // root width
      height: 0,
      // root height
      transform: 0
    });
    const isReset = vue.ref(false);
    const offset = vue.computed(() => unitToPx(props2.position === "top" ? props2.offsetTop : props2.offsetBottom));
    const rootStyle = vue.computed(() => {
      if (isReset.value) {
        return;
      }
      const {
        fixed,
        height,
        width
      } = state;
      if (fixed) {
        return {
          width: `${width}px`,
          height: `${height}px`
        };
      }
    });
    const stickyStyle = vue.computed(() => {
      if (!state.fixed || isReset.value) {
        return;
      }
      const style = extend(getZIndexStyle(props2.zIndex), {
        width: `${state.width}px`,
        height: `${state.height}px`,
        [props2.position]: `${offset.value}px`
      });
      if (state.transform) {
        style.transform = `translate3d(0, ${state.transform}px, 0)`;
      }
      return style;
    });
    const emitScroll = (scrollTop) => emit("scroll", {
      scrollTop,
      isFixed: state.fixed
    });
    const onScroll = () => {
      if (!root.value || isHidden(root)) {
        return;
      }
      const {
        container,
        position
      } = props2;
      const rootRect = use.useRect(root);
      const scrollTop = getScrollTop(window);
      state.width = rootRect.width;
      state.height = rootRect.height;
      if (position === "top") {
        if (container) {
          const containerRect = use.useRect(container);
          const difference = containerRect.bottom - offset.value - state.height;
          state.fixed = offset.value > rootRect.top && containerRect.bottom > 0;
          state.transform = difference < 0 ? difference : 0;
        } else {
          state.fixed = offset.value > rootRect.top;
        }
      } else {
        const {
          clientHeight
        } = document.documentElement;
        if (container) {
          const containerRect = use.useRect(container);
          const difference = clientHeight - containerRect.top - offset.value - state.height;
          state.fixed = clientHeight - offset.value < rootRect.bottom && clientHeight > containerRect.top;
          state.transform = difference < 0 ? -difference : 0;
        } else {
          state.fixed = clientHeight - offset.value < rootRect.bottom;
        }
      }
      emitScroll(scrollTop);
    };
    vue.watch(() => state.fixed, (value) => emit("change", value));
    use.useEventListener("scroll", onScroll, {
      target: scrollParent,
      passive: true
    });
    useVisibilityChange(root, onScroll);
    vue.watch([windowWidth, windowHeight], () => {
      if (!root.value || isHidden(root) || !state.fixed) {
        return;
      }
      isReset.value = true;
      vue.nextTick(() => {
        const rootRect = use.useRect(root);
        state.width = rootRect.width;
        state.height = rootRect.height;
        isReset.value = false;
      });
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "ref": root,
        "style": rootStyle.value
      }, [vue.createVNode("div", {
        "class": bem$1r({
          fixed: state.fixed && !isReset.value
        }),
        "style": stickyStyle.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});
const Sticky = withInstall(stdin_default$1F);
const [name$1u, bem$1q] = createNamespace("swipe");
const swipeProps = {
  loop: truthProp,
  width: numericProp,
  height: numericProp,
  vertical: Boolean,
  autoplay: makeNumericProp(0),
  duration: makeNumericProp(500),
  touchable: truthProp,
  lazyRender: Boolean,
  initialSwipe: makeNumericProp(0),
  indicatorColor: String,
  showIndicators: truthProp,
  stopPropagation: truthProp
};
const SWIPE_KEY = Symbol(name$1u);
var stdin_default$1E = vue.defineComponent({
  name: name$1u,
  props: swipeProps,
  emits: ["change", "dragStart", "dragEnd"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = vue.ref();
    const track = vue.ref();
    const state = vue.reactive({
      rect: null,
      width: 0,
      height: 0,
      offset: 0,
      active: 0,
      swiping: false
    });
    let dragging = false;
    const touch = useTouch();
    const {
      children,
      linkChildren
    } = use.useChildren(SWIPE_KEY);
    const count = vue.computed(() => children.length);
    const size = vue.computed(() => state[props2.vertical ? "height" : "width"]);
    const delta = vue.computed(() => props2.vertical ? touch.deltaY.value : touch.deltaX.value);
    const minOffset = vue.computed(() => {
      if (state.rect) {
        const base = props2.vertical ? state.rect.height : state.rect.width;
        return base - size.value * count.value;
      }
      return 0;
    });
    const maxCount = vue.computed(() => size.value ? Math.ceil(Math.abs(minOffset.value) / size.value) : count.value);
    const trackSize = vue.computed(() => count.value * size.value);
    const activeIndicator = vue.computed(() => (state.active + count.value) % count.value);
    const isCorrectDirection = vue.computed(() => {
      const expect = props2.vertical ? "vertical" : "horizontal";
      return touch.direction.value === expect;
    });
    const trackStyle = vue.computed(() => {
      const style = {
        transitionDuration: `${state.swiping ? 0 : props2.duration}ms`,
        transform: `translate${props2.vertical ? "Y" : "X"}(${state.offset}px)`
      };
      if (size.value) {
        const mainAxis = props2.vertical ? "height" : "width";
        const crossAxis = props2.vertical ? "width" : "height";
        style[mainAxis] = `${trackSize.value}px`;
        style[crossAxis] = props2[crossAxis] ? `${props2[crossAxis]}px` : "";
      }
      return style;
    });
    const getTargetActive = (pace) => {
      const {
        active
      } = state;
      if (pace) {
        if (props2.loop) {
          return clamp(active + pace, -1, count.value);
        }
        return clamp(active + pace, 0, maxCount.value);
      }
      return active;
    };
    const getTargetOffset = (targetActive, offset = 0) => {
      let currentPosition = targetActive * size.value;
      if (!props2.loop) {
        currentPosition = Math.min(currentPosition, -minOffset.value);
      }
      let targetOffset = offset - currentPosition;
      if (!props2.loop) {
        targetOffset = clamp(targetOffset, minOffset.value, 0);
      }
      return targetOffset;
    };
    const move = ({
      pace = 0,
      offset = 0,
      emitChange
    }) => {
      if (count.value <= 1) {
        return;
      }
      const {
        active
      } = state;
      const targetActive = getTargetActive(pace);
      const targetOffset = getTargetOffset(targetActive, offset);
      if (props2.loop) {
        if (children[0] && targetOffset !== minOffset.value) {
          const outRightBound = targetOffset < minOffset.value;
          children[0].setOffset(outRightBound ? trackSize.value : 0);
        }
        if (children[count.value - 1] && targetOffset !== 0) {
          const outLeftBound = targetOffset > 0;
          children[count.value - 1].setOffset(outLeftBound ? -trackSize.value : 0);
        }
      }
      state.active = targetActive;
      state.offset = targetOffset;
      if (emitChange && targetActive !== active) {
        emit("change", activeIndicator.value);
      }
    };
    const correctPosition = () => {
      state.swiping = true;
      if (state.active <= -1) {
        move({
          pace: count.value
        });
      } else if (state.active >= count.value) {
        move({
          pace: -count.value
        });
      }
    };
    const prev = () => {
      correctPosition();
      touch.reset();
      use.doubleRaf(() => {
        state.swiping = false;
        move({
          pace: -1,
          emitChange: true
        });
      });
    };
    const next = () => {
      correctPosition();
      touch.reset();
      use.doubleRaf(() => {
        state.swiping = false;
        move({
          pace: 1,
          emitChange: true
        });
      });
    };
    let autoplayTimer;
    const stopAutoplay = () => clearTimeout(autoplayTimer);
    const autoplay = () => {
      stopAutoplay();
      if (+props2.autoplay > 0 && count.value > 1) {
        autoplayTimer = setTimeout(() => {
          next();
          autoplay();
        }, +props2.autoplay);
      }
    };
    const initialize = (active = +props2.initialSwipe) => {
      if (!root.value) {
        return;
      }
      const cb = () => {
        var _a, _b;
        if (!isHidden(root)) {
          const rect = {
            width: root.value.offsetWidth,
            height: root.value.offsetHeight
          };
          state.rect = rect;
          state.width = +((_a = props2.width) != null ? _a : rect.width);
          state.height = +((_b = props2.height) != null ? _b : rect.height);
        }
        if (count.value) {
          active = Math.min(count.value - 1, active);
          if (active === -1) {
            active = count.value - 1;
          }
        }
        state.active = active;
        state.swiping = true;
        state.offset = getTargetOffset(active);
        children.forEach((swipe) => {
          swipe.setOffset(0);
        });
        autoplay();
      };
      if (isHidden(root)) {
        vue.nextTick().then(cb);
      } else {
        cb();
      }
    };
    const resize = () => initialize(state.active);
    let touchStartTime;
    const onTouchStart = (event) => {
      if (!props2.touchable || // avoid resetting position on multi-finger touch
      event.touches.length > 1)
        return;
      touch.start(event);
      dragging = false;
      touchStartTime = Date.now();
      stopAutoplay();
      correctPosition();
    };
    const onTouchMove = (event) => {
      if (props2.touchable && state.swiping) {
        touch.move(event);
        if (isCorrectDirection.value) {
          const isEdgeTouch = !props2.loop && (state.active === 0 && delta.value > 0 || state.active === count.value - 1 && delta.value < 0);
          if (!isEdgeTouch) {
            preventDefault(event, props2.stopPropagation);
            move({
              offset: delta.value
            });
            if (!dragging) {
              emit("dragStart", {
                index: activeIndicator.value
              });
              dragging = true;
            }
          }
        }
      }
    };
    const onTouchEnd = () => {
      if (!props2.touchable || !state.swiping) {
        return;
      }
      const duration = Date.now() - touchStartTime;
      const speed = delta.value / duration;
      const shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2;
      if (shouldSwipe && isCorrectDirection.value) {
        const offset = props2.vertical ? touch.offsetY.value : touch.offsetX.value;
        let pace = 0;
        if (props2.loop) {
          pace = offset > 0 ? delta.value > 0 ? -1 : 1 : 0;
        } else {
          pace = -Math[delta.value > 0 ? "ceil" : "floor"](delta.value / size.value);
        }
        move({
          pace,
          emitChange: true
        });
      } else if (delta.value) {
        move({
          pace: 0
        });
      }
      dragging = false;
      state.swiping = false;
      emit("dragEnd", {
        index: activeIndicator.value
      });
      autoplay();
    };
    const swipeTo = (index, options = {}) => {
      correctPosition();
      touch.reset();
      use.doubleRaf(() => {
        let targetIndex;
        if (props2.loop && index === count.value) {
          targetIndex = state.active === 0 ? 0 : index;
        } else {
          targetIndex = index % count.value;
        }
        if (options.immediate) {
          use.doubleRaf(() => {
            state.swiping = false;
          });
        } else {
          state.swiping = false;
        }
        move({
          pace: targetIndex - state.active,
          emitChange: true
        });
      });
    };
    const renderDot = (_, index) => {
      const active = index === activeIndicator.value;
      const style = active ? {
        backgroundColor: props2.indicatorColor
      } : void 0;
      return vue.createVNode("i", {
        "style": style,
        "class": bem$1q("indicator", {
          active
        })
      }, null);
    };
    const renderIndicator = () => {
      if (slots.indicator) {
        return slots.indicator({
          active: activeIndicator.value,
          total: count.value
        });
      }
      if (props2.showIndicators && count.value > 1) {
        return vue.createVNode("div", {
          "class": bem$1q("indicators", {
            vertical: props2.vertical
          })
        }, [Array(count.value).fill("").map(renderDot)]);
      }
    };
    useExpose({
      prev,
      next,
      state,
      resize,
      swipeTo
    });
    linkChildren({
      size,
      props: props2,
      count,
      activeIndicator
    });
    vue.watch(() => props2.initialSwipe, (value) => initialize(+value));
    vue.watch(count, () => initialize(state.active));
    vue.watch(() => props2.autoplay, autoplay);
    vue.watch([windowWidth, windowHeight, () => props2.width, () => props2.height], resize);
    vue.watch(use.usePageVisibility(), (visible) => {
      if (visible === "visible") {
        autoplay();
      } else {
        stopAutoplay();
      }
    });
    vue.onMounted(initialize);
    vue.onActivated(() => initialize(state.active));
    onPopupReopen(() => initialize(state.active));
    vue.onDeactivated(stopAutoplay);
    vue.onBeforeUnmount(stopAutoplay);
    use.useEventListener("touchmove", onTouchMove, {
      target: track
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "ref": root,
        "class": bem$1q()
      }, [vue.createVNode("div", {
        "ref": track,
        "style": trackStyle.value,
        "class": bem$1q("track", {
          vertical: props2.vertical
        }),
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), renderIndicator()]);
    };
  }
});
const Swipe = withInstall(stdin_default$1E);
const [name$1t, bem$1p] = createNamespace("tabs");
var stdin_default$1D = vue.defineComponent({
  name: name$1t,
  props: {
    count: makeRequiredProp(Number),
    inited: Boolean,
    animated: Boolean,
    duration: makeRequiredProp(numericProp),
    swipeable: Boolean,
    lazyRender: Boolean,
    currentIndex: makeRequiredProp(Number)
  },
  emits: ["change"],
  setup(props2, {
    emit,
    slots
  }) {
    const swipeRef = vue.ref();
    const onChange = (index) => emit("change", index);
    const renderChildren = () => {
      var _a;
      const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (props2.animated || props2.swipeable) {
        return vue.createVNode(Swipe, {
          "ref": swipeRef,
          "loop": false,
          "class": bem$1p("track"),
          "duration": +props2.duration * 1e3,
          "touchable": props2.swipeable,
          "lazyRender": props2.lazyRender,
          "showIndicators": false,
          "onChange": onChange
        }, {
          default: () => [Content]
        });
      }
      return Content;
    };
    const swipeToCurrentTab = (index) => {
      const swipe = swipeRef.value;
      if (swipe && swipe.state.active !== index) {
        swipe.swipeTo(index, {
          immediate: !props2.inited
        });
      }
    };
    vue.watch(() => props2.currentIndex, swipeToCurrentTab);
    vue.onMounted(() => {
      swipeToCurrentTab(props2.currentIndex);
    });
    useExpose({
      swipeRef
    });
    return () => vue.createVNode("div", {
      "class": bem$1p("content", {
        animated: props2.animated || props2.swipeable
      })
    }, [renderChildren()]);
  }
});
const [name$1s, bem$1o] = createNamespace("tabs");
const tabsProps = {
  type: makeStringProp("line"),
  color: String,
  border: Boolean,
  sticky: Boolean,
  shrink: Boolean,
  active: makeNumericProp(0),
  duration: makeNumericProp(0.3),
  animated: Boolean,
  ellipsis: truthProp,
  swipeable: Boolean,
  scrollspy: Boolean,
  offsetTop: makeNumericProp(0),
  background: String,
  lazyRender: truthProp,
  lineWidth: numericProp,
  lineHeight: numericProp,
  beforeChange: Function,
  swipeThreshold: makeNumericProp(5),
  titleActiveColor: String,
  titleInactiveColor: String
};
const TABS_KEY = Symbol(name$1s);
var stdin_default$1C = vue.defineComponent({
  name: name$1s,
  props: tabsProps,
  emits: ["change", "scroll", "rendered", "clickTab", "update:active"],
  setup(props2, {
    emit,
    slots
  }) {
    let tabHeight;
    let lockScroll;
    let stickyFixed;
    let cancelScrollLeftToRaf;
    let cancelScrollTopToRaf;
    const root = vue.ref();
    const navRef = vue.ref();
    const wrapRef = vue.ref();
    const contentRef = vue.ref();
    const id = useId();
    const scroller = use.useScrollParent(root);
    const [titleRefs, setTitleRefs] = useRefs();
    const {
      children,
      linkChildren
    } = use.useChildren(TABS_KEY);
    const state = vue.reactive({
      inited: false,
      position: "",
      lineStyle: {},
      currentIndex: -1
    });
    const scrollable = vue.computed(() => children.length > +props2.swipeThreshold || !props2.ellipsis || props2.shrink);
    const navStyle = vue.computed(() => ({
      borderColor: props2.color,
      background: props2.background
    }));
    const getTabName = (tab, index) => {
      var _a;
      return (_a = tab.name) != null ? _a : index;
    };
    const currentName = vue.computed(() => {
      const activeTab = children[state.currentIndex];
      if (activeTab) {
        return getTabName(activeTab, state.currentIndex);
      }
    });
    const offsetTopPx = vue.computed(() => unitToPx(props2.offsetTop));
    const scrollOffset = vue.computed(() => {
      if (props2.sticky) {
        return offsetTopPx.value + tabHeight;
      }
      return 0;
    });
    const scrollIntoView = (immediate) => {
      const nav = navRef.value;
      const titles = titleRefs.value;
      if (!scrollable.value || !nav || !titles || !titles[state.currentIndex]) {
        return;
      }
      const title = titles[state.currentIndex].$el;
      const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      if (cancelScrollLeftToRaf)
        cancelScrollLeftToRaf();
      cancelScrollLeftToRaf = scrollLeftTo(nav, to, immediate ? 0 : +props2.duration);
    };
    const setLine = () => {
      const shouldAnimate = state.inited;
      vue.nextTick(() => {
        const titles = titleRefs.value;
        if (!titles || !titles[state.currentIndex] || props2.type !== "line" || isHidden(root.value)) {
          return;
        }
        const title = titles[state.currentIndex].$el;
        const {
          lineWidth,
          lineHeight
        } = props2;
        const left = title.offsetLeft + title.offsetWidth / 2;
        const lineStyle = {
          width: addUnit(lineWidth),
          backgroundColor: props2.color,
          transform: `translateX(${left}px) translateX(-50%)`
        };
        if (shouldAnimate) {
          lineStyle.transitionDuration = `${props2.duration}s`;
        }
        if (isDef(lineHeight)) {
          const height = addUnit(lineHeight);
          lineStyle.height = height;
          lineStyle.borderRadius = height;
        }
        state.lineStyle = lineStyle;
      });
    };
    const findAvailableTab = (index) => {
      const diff = index < state.currentIndex ? -1 : 1;
      while (index >= 0 && index < children.length) {
        if (!children[index].disabled) {
          return index;
        }
        index += diff;
      }
    };
    const setCurrentIndex = (currentIndex, skipScrollIntoView) => {
      const newIndex = findAvailableTab(currentIndex);
      if (!isDef(newIndex)) {
        return;
      }
      const newTab = children[newIndex];
      const newName = getTabName(newTab, newIndex);
      const shouldEmitChange = state.currentIndex !== null;
      if (state.currentIndex !== newIndex) {
        state.currentIndex = newIndex;
        if (!skipScrollIntoView) {
          scrollIntoView();
        }
        setLine();
      }
      if (newName !== props2.active) {
        emit("update:active", newName);
        if (shouldEmitChange) {
          emit("change", newName, newTab.title);
        }
      }
      if (stickyFixed && !props2.scrollspy) {
        setRootScrollTop(Math.ceil(getElementTop(root.value) - offsetTopPx.value));
      }
    };
    const setCurrentIndexByName = (name2, skipScrollIntoView) => {
      const matched = children.find((tab, index2) => getTabName(tab, index2) === name2);
      const index = matched ? children.indexOf(matched) : 0;
      setCurrentIndex(index, skipScrollIntoView);
    };
    const scrollToCurrentContent = (immediate = false) => {
      if (props2.scrollspy) {
        const target = children[state.currentIndex].$el;
        if (target && scroller.value) {
          const to = getElementTop(target, scroller.value) - scrollOffset.value;
          lockScroll = true;
          if (cancelScrollTopToRaf)
            cancelScrollTopToRaf();
          cancelScrollTopToRaf = scrollTopTo(scroller.value, to, immediate ? 0 : +props2.duration, () => {
            lockScroll = false;
          });
        }
      }
    };
    const onClickTab = (item, index, event) => {
      const {
        title,
        disabled
      } = children[index];
      const name2 = getTabName(children[index], index);
      if (!disabled) {
        callInterceptor(props2.beforeChange, {
          args: [name2],
          done: () => {
            setCurrentIndex(index);
            scrollToCurrentContent();
          }
        });
        route(item);
      }
      emit("clickTab", {
        name: name2,
        title,
        event,
        disabled
      });
    };
    const onStickyScroll = (params) => {
      stickyFixed = params.isFixed;
      emit("scroll", params);
    };
    const scrollTo = (name2) => {
      vue.nextTick(() => {
        setCurrentIndexByName(name2);
        scrollToCurrentContent(true);
      });
    };
    const getCurrentIndexOnScroll = () => {
      for (let index = 0; index < children.length; index++) {
        const {
          top
        } = use.useRect(children[index].$el);
        if (top > scrollOffset.value) {
          return index === 0 ? 0 : index - 1;
        }
      }
      return children.length - 1;
    };
    const onScroll = () => {
      if (props2.scrollspy && !lockScroll) {
        const index = getCurrentIndexOnScroll();
        setCurrentIndex(index);
      }
    };
    const renderLine = () => {
      if (props2.type === "line" && children.length) {
        return vue.createVNode("div", {
          "class": bem$1o("line"),
          "style": state.lineStyle
        }, null);
      }
    };
    const renderHeader = () => {
      var _a, _b, _c;
      const {
        type,
        border,
        sticky
      } = props2;
      const Header = [vue.createVNode("div", {
        "ref": sticky ? void 0 : wrapRef,
        "class": [bem$1o("wrap"), {
          [BORDER_TOP_BOTTOM]: type === "line" && border
        }]
      }, [vue.createVNode("div", {
        "ref": navRef,
        "role": "tablist",
        "class": bem$1o("nav", [type, {
          shrink: props2.shrink,
          complete: scrollable.value
        }]),
        "style": navStyle.value,
        "aria-orientation": "horizontal"
      }, [(_a = slots["nav-left"]) == null ? void 0 : _a.call(slots), children.map((item) => item.renderTitle(onClickTab)), renderLine(), (_b = slots["nav-right"]) == null ? void 0 : _b.call(slots)])]), (_c = slots["nav-bottom"]) == null ? void 0 : _c.call(slots)];
      if (sticky) {
        return vue.createVNode("div", {
          "ref": wrapRef
        }, [Header]);
      }
      return Header;
    };
    const resize = () => {
      setLine();
      vue.nextTick(() => {
        var _a, _b;
        scrollIntoView(true);
        (_b = (_a = contentRef.value) == null ? void 0 : _a.swipeRef.value) == null ? void 0 : _b.resize();
      });
    };
    vue.watch(() => [props2.color, props2.duration, props2.lineWidth, props2.lineHeight], setLine);
    vue.watch(windowWidth, resize);
    vue.watch(() => props2.active, (value) => {
      if (value !== currentName.value) {
        setCurrentIndexByName(value);
      }
    });
    vue.watch(() => children.length, () => {
      if (state.inited) {
        setCurrentIndexByName(props2.active);
        setLine();
        vue.nextTick(() => {
          scrollIntoView(true);
        });
      }
    });
    const init = () => {
      setCurrentIndexByName(props2.active, true);
      vue.nextTick(() => {
        state.inited = true;
        if (wrapRef.value) {
          tabHeight = use.useRect(wrapRef.value).height;
        }
        scrollIntoView(true);
      });
    };
    const onRendered = (name2, title) => emit("rendered", name2, title);
    useExpose({
      resize,
      scrollTo
    });
    vue.onActivated(setLine);
    onPopupReopen(setLine);
    use.onMountedOrActivated(init);
    useVisibilityChange(root, setLine);
    use.useEventListener("scroll", onScroll, {
      target: scroller,
      passive: true
    });
    linkChildren({
      id,
      props: props2,
      setLine,
      scrollable,
      onRendered,
      currentName,
      setTitleRefs,
      scrollIntoView
    });
    return () => vue.createVNode("div", {
      "ref": root,
      "class": bem$1o([props2.type])
    }, [props2.sticky ? vue.createVNode(Sticky, {
      "container": root.value,
      "offsetTop": offsetTopPx.value,
      "onScroll": onStickyScroll
    }, {
      default: () => [renderHeader()]
    }) : renderHeader(), vue.createVNode(stdin_default$1D, {
      "ref": contentRef,
      "count": children.length,
      "inited": state.inited,
      "animated": props2.animated,
      "duration": props2.duration,
      "swipeable": props2.swipeable,
      "lazyRender": props2.lazyRender,
      "currentIndex": state.currentIndex,
      "onChange": setCurrentIndex
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
      }
    })]);
  }
});
const TAB_STATUS_KEY = Symbol();
const useTabStatus = () => vue.inject(TAB_STATUS_KEY, null);
const [name$1r, bem$1n] = createNamespace("tab");
const TabTitle = vue.defineComponent({
  name: name$1r,
  props: {
    id: String,
    dot: Boolean,
    type: String,
    color: String,
    title: String,
    badge: numericProp,
    shrink: Boolean,
    isActive: Boolean,
    disabled: Boolean,
    controls: String,
    scrollable: Boolean,
    activeColor: String,
    inactiveColor: String,
    showZeroBadge: truthProp
  },
  setup(props2, {
    slots
  }) {
    const style = vue.computed(() => {
      const style2 = {};
      const {
        type,
        color,
        disabled,
        isActive,
        activeColor,
        inactiveColor
      } = props2;
      const isCard = type === "card";
      if (color && isCard) {
        style2.borderColor = color;
        if (!disabled) {
          if (isActive) {
            style2.backgroundColor = color;
          } else {
            style2.color = color;
          }
        }
      }
      const titleColor = isActive ? activeColor : inactiveColor;
      if (titleColor) {
        style2.color = titleColor;
      }
      return style2;
    });
    const renderText = () => {
      const Text = vue.createVNode("span", {
        "class": bem$1n("text", {
          ellipsis: !props2.scrollable
        })
      }, [slots.title ? slots.title() : props2.title]);
      if (props2.dot || isDef(props2.badge) && props2.badge !== "") {
        return vue.createVNode(Badge, {
          "dot": props2.dot,
          "content": props2.badge,
          "showZero": props2.showZeroBadge
        }, {
          default: () => [Text]
        });
      }
      return Text;
    };
    return () => vue.createVNode("div", {
      "id": props2.id,
      "role": "tab",
      "class": [bem$1n([props2.type, {
        grow: props2.scrollable && !props2.shrink,
        shrink: props2.shrink,
        active: props2.isActive,
        disabled: props2.disabled
      }])],
      "style": style.value,
      "tabindex": props2.disabled ? void 0 : props2.isActive ? 0 : -1,
      "aria-selected": props2.isActive,
      "aria-disabled": props2.disabled || void 0,
      "aria-controls": props2.controls
    }, [renderText()]);
  }
});
const [name$1q, bem$1m] = createNamespace("swipe-item");
var stdin_default$1B = vue.defineComponent({
  name: name$1q,
  setup(props2, {
    slots
  }) {
    let rendered;
    const state = vue.reactive({
      offset: 0,
      inited: false,
      mounted: false
    });
    const {
      parent,
      index
    } = use.useParent(SWIPE_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <SwipeItem> must be a child component of <Swipe>.");
      }
      return;
    }
    const style = vue.computed(() => {
      const style2 = {};
      const {
        vertical
      } = parent.props;
      if (parent.size.value) {
        style2[vertical ? "height" : "width"] = `${parent.size.value}px`;
      }
      if (state.offset) {
        style2.transform = `translate${vertical ? "Y" : "X"}(${state.offset}px)`;
      }
      return style2;
    });
    const shouldRender = vue.computed(() => {
      const {
        loop,
        lazyRender
      } = parent.props;
      if (!lazyRender || rendered) {
        return true;
      }
      if (!state.mounted) {
        return false;
      }
      const active = parent.activeIndicator.value;
      const maxActive = parent.count.value - 1;
      const prevActive = active === 0 && loop ? maxActive : active - 1;
      const nextActive = active === maxActive && loop ? 0 : active + 1;
      rendered = index.value === active || index.value === prevActive || index.value === nextActive;
      return rendered;
    });
    const setOffset = (offset) => {
      state.offset = offset;
    };
    vue.onMounted(() => {
      vue.nextTick(() => {
        state.mounted = true;
      });
    });
    useExpose({
      setOffset
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "class": bem$1m(),
        "style": style.value
      }, [shouldRender.value ? (_a = slots.default) == null ? void 0 : _a.call(slots) : null]);
    };
  }
});
const SwipeItem = withInstall(stdin_default$1B);
const [name$1p, bem$1l] = createNamespace("tab");
const tabProps = extend({}, routeProps, {
  dot: Boolean,
  name: numericProp,
  badge: numericProp,
  title: String,
  disabled: Boolean,
  titleClass: unknownProp,
  titleStyle: [String, Object],
  showZeroBadge: truthProp
});
var stdin_default$1A = vue.defineComponent({
  name: name$1p,
  props: tabProps,
  setup(props2, {
    slots
  }) {
    const id = useId();
    const inited = vue.ref(false);
    const instance2 = vue.getCurrentInstance();
    const {
      parent,
      index
    } = use.useParent(TABS_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <Tab> must be a child component of <Tabs>.");
      }
      return;
    }
    const getName = () => {
      var _a;
      return (_a = props2.name) != null ? _a : index.value;
    };
    const init = () => {
      inited.value = true;
      if (parent.props.lazyRender) {
        vue.nextTick(() => {
          parent.onRendered(getName(), props2.title);
        });
      }
    };
    const active = vue.computed(() => {
      const isActive = getName() === parent.currentName.value;
      if (isActive && !inited.value) {
        init();
      }
      return isActive;
    });
    const parsedClass = vue.ref("");
    const parsedStyle = vue.ref("");
    vue.watchEffect(() => {
      const {
        titleClass,
        titleStyle
      } = props2;
      parsedClass.value = titleClass ? shared.normalizeClass(titleClass) : "";
      parsedStyle.value = titleStyle && typeof titleStyle !== "string" ? shared.stringifyStyle(shared.normalizeStyle(titleStyle)) : titleStyle;
    });
    const renderTitle = (onClickTab) => vue.createVNode(TabTitle, vue.mergeProps({
      "key": id,
      "id": `${parent.id}-${index.value}`,
      "ref": parent.setTitleRefs(index.value),
      "style": parsedStyle.value,
      "class": parsedClass.value,
      "isActive": active.value,
      "controls": id,
      "scrollable": parent.scrollable.value,
      "activeColor": parent.props.titleActiveColor,
      "inactiveColor": parent.props.titleInactiveColor,
      "onClick": (event) => onClickTab(instance2.proxy, index.value, event)
    }, pick(parent.props, ["type", "color", "shrink"]), pick(props2, ["dot", "badge", "title", "disabled", "showZeroBadge"])), {
      title: slots.title
    });
    const hasInactiveClass = vue.ref(!active.value);
    vue.watch(active, (val) => {
      if (val) {
        hasInactiveClass.value = false;
      } else {
        use.doubleRaf(() => {
          hasInactiveClass.value = true;
        });
      }
    });
    vue.watch(() => props2.title, () => {
      parent.setLine();
      parent.scrollIntoView();
    });
    vue.provide(TAB_STATUS_KEY, active);
    useExpose({
      id,
      renderTitle
    });
    return () => {
      var _a;
      const label = `${parent.id}-${index.value}`;
      const {
        animated,
        swipeable,
        scrollspy,
        lazyRender
      } = parent.props;
      if (!slots.default && !animated) {
        return;
      }
      const show = scrollspy || active.value;
      if (animated || swipeable) {
        return vue.createVNode(SwipeItem, {
          "id": id,
          "role": "tabpanel",
          "class": bem$1l("panel-wrapper", {
            inactive: hasInactiveClass.value
          }),
          "tabindex": active.value ? 0 : -1,
          "aria-hidden": !active.value,
          "aria-labelledby": label
        }, {
          default: () => {
            var _a2;
            return [vue.createVNode("div", {
              "class": bem$1l("panel")
            }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])];
          }
        });
      }
      const shouldRender = inited.value || scrollspy || !lazyRender;
      const Content = shouldRender ? (_a = slots.default) == null ? void 0 : _a.call(slots) : null;
      return vue.withDirectives(vue.createVNode("div", {
        "id": id,
        "role": "tabpanel",
        "class": bem$1l("panel"),
        "tabindex": show ? 0 : -1,
        "aria-labelledby": label
      }, [Content]), [[vue.vShow, show]]);
    };
  }
});
const Tab = withInstall(stdin_default$1A);
const Tabs = withInstall(stdin_default$1C);
const [name$1o, bem$1k] = createNamespace("picker-group");
const PICKER_GROUP_KEY = Symbol(name$1o);
const pickerGroupProps = extend({
  tabs: makeArrayProp(),
  activeTab: makeNumericProp(0),
  nextStepText: String
}, pickerToolbarProps);
var stdin_default$1z = vue.defineComponent({
  name: name$1o,
  props: pickerGroupProps,
  emits: ["confirm", "cancel", "update:activeTab"],
  setup(props2, {
    emit,
    slots
  }) {
    const activeTab = useSyncPropRef(() => props2.activeTab, (value) => emit("update:activeTab", value));
    const {
      children,
      linkChildren
    } = use.useChildren(PICKER_GROUP_KEY);
    linkChildren();
    const showNextButton = () => +activeTab.value < props2.tabs.length - 1 && props2.nextStepText;
    const onConfirm = () => {
      if (showNextButton()) {
        activeTab.value = +activeTab.value + 1;
      } else {
        emit("confirm", children.map((item) => item.confirm()));
      }
    };
    const onCancel = () => emit("cancel");
    return () => {
      var _a;
      const childNodes = (_a = slots.default) == null ? void 0 : _a.call(slots);
      const confirmButtonText = showNextButton() ? props2.nextStepText : props2.confirmButtonText;
      return vue.createVNode("div", {
        "class": bem$1k()
      }, [vue.createVNode(stdin_default$1G, {
        "title": props2.title,
        "cancelButtonText": props2.cancelButtonText,
        "confirmButtonText": confirmButtonText,
        "onConfirm": onConfirm,
        "onCancel": onCancel
      }, pick(slots, pickerToolbarSlots)), vue.createVNode(Tabs, {
        "active": activeTab.value,
        "onUpdate:active": ($event) => activeTab.value = $event,
        "class": bem$1k("tabs"),
        "shrink": true,
        "animated": true,
        "lazyRender": false
      }, {
        default: () => [props2.tabs.map((title, index) => vue.createVNode(Tab, {
          "title": title,
          "titleClass": bem$1k("tab-title")
        }, {
          default: () => [childNodes == null ? void 0 : childNodes[index]]
        }))]
      })]);
    };
  }
});
const pickerSharedProps = extend({
  loading: Boolean,
  readonly: Boolean,
  allowHtml: Boolean,
  optionHeight: makeNumericProp(44),
  showToolbar: truthProp,
  swipeDuration: makeNumericProp(1e3),
  visibleOptionNum: makeNumericProp(6)
}, pickerToolbarProps);
const pickerProps = extend({}, pickerSharedProps, {
  columns: makeArrayProp(),
  modelValue: makeArrayProp(),
  toolbarPosition: makeStringProp("top"),
  columnsFieldNames: Object
});
var stdin_default$1y = vue.defineComponent({
  name: name$1y,
  props: pickerProps,
  emits: ["confirm", "cancel", "change", "scrollInto", "clickOption", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const columnsRef = vue.ref();
    const selectedValues = vue.ref(props2.modelValue.slice(0));
    const {
      parent
    } = use.useParent(PICKER_GROUP_KEY);
    const {
      children,
      linkChildren
    } = use.useChildren(PICKER_KEY);
    linkChildren();
    const fields = vue.computed(() => assignDefaultFields(props2.columnsFieldNames));
    const optionHeight = vue.computed(() => unitToPx(props2.optionHeight));
    const columnsType = vue.computed(() => getColumnsType(props2.columns, fields.value));
    const currentColumns = vue.computed(() => {
      const {
        columns
      } = props2;
      switch (columnsType.value) {
        case "multiple":
          return columns;
        case "cascade":
          return formatCascadeColumns(columns, fields.value, selectedValues);
        default:
          return [columns];
      }
    });
    const hasOptions = vue.computed(() => currentColumns.value.some((options) => options.length));
    const selectedOptions = vue.computed(() => currentColumns.value.map((options, index) => findOptionByValue(options, selectedValues.value[index], fields.value)));
    const selectedIndexes = vue.computed(() => currentColumns.value.map((options, index) => options.findIndex((option) => option[fields.value.value] === selectedValues.value[index])));
    const setValue = (index, value) => {
      if (selectedValues.value[index] !== value) {
        const newValues = selectedValues.value.slice(0);
        newValues[index] = value;
        selectedValues.value = newValues;
      }
    };
    const getEventParams = () => ({
      selectedValues: selectedValues.value.slice(0),
      selectedOptions: selectedOptions.value,
      selectedIndexes: selectedIndexes.value
    });
    const onChange = (value, columnIndex) => {
      setValue(columnIndex, value);
      if (columnsType.value === "cascade") {
        selectedValues.value.forEach((value2, index) => {
          const options = currentColumns.value[index];
          if (!isOptionExist(options, value2, fields.value)) {
            setValue(index, options.length ? options[0][fields.value.value] : void 0);
          }
        });
      }
      vue.nextTick(() => {
        emit("change", extend({
          columnIndex
        }, getEventParams()));
      });
    };
    const onClickOption = (currentOption, columnIndex) => {
      const params = {
        columnIndex,
        currentOption
      };
      emit("clickOption", extend(getEventParams(), params));
      emit("scrollInto", params);
    };
    const confirm = () => {
      children.forEach((child) => child.stopMomentum());
      const params = getEventParams();
      vue.nextTick(() => {
        emit("confirm", params);
      });
      return params;
    };
    const cancel = () => emit("cancel", getEventParams());
    const renderColumnItems = () => currentColumns.value.map((options, columnIndex) => vue.createVNode(stdin_default$1H, {
      "value": selectedValues.value[columnIndex],
      "fields": fields.value,
      "options": options,
      "readonly": props2.readonly,
      "allowHtml": props2.allowHtml,
      "optionHeight": optionHeight.value,
      "swipeDuration": props2.swipeDuration,
      "visibleOptionNum": props2.visibleOptionNum,
      "onChange": (value) => onChange(value, columnIndex),
      "onClickOption": (option) => onClickOption(option, columnIndex),
      "onScrollInto": (option) => {
        emit("scrollInto", {
          currentOption: option,
          columnIndex
        });
      }
    }, {
      option: slots.option
    }));
    const renderMask = (wrapHeight) => {
      if (hasOptions.value) {
        const frameStyle = {
          height: `${optionHeight.value}px`
        };
        const maskStyle = {
          backgroundSize: `100% ${(wrapHeight - optionHeight.value) / 2}px`
        };
        return [vue.createVNode("div", {
          "class": bem$1t("mask"),
          "style": maskStyle
        }, null), vue.createVNode("div", {
          "class": [BORDER_UNSET_TOP_BOTTOM, bem$1t("frame")],
          "style": frameStyle
        }, null)];
      }
    };
    const renderColumns = () => {
      const wrapHeight = optionHeight.value * +props2.visibleOptionNum;
      const columnsStyle = {
        height: `${wrapHeight}px`
      };
      return vue.createVNode("div", {
        "ref": columnsRef,
        "class": bem$1t("columns"),
        "style": columnsStyle
      }, [renderColumnItems(), renderMask(wrapHeight)]);
    };
    const renderToolbar = () => {
      if (props2.showToolbar && !parent) {
        return vue.createVNode(stdin_default$1G, vue.mergeProps(pick(props2, pickerToolbarPropKeys), {
          "onConfirm": confirm,
          "onCancel": cancel
        }), pick(slots, pickerToolbarSlots));
      }
    };
    vue.watch(currentColumns, (columns) => {
      columns.forEach((options, index) => {
        if (options.length && !isOptionExist(options, selectedValues.value[index], fields.value)) {
          setValue(index, getFirstEnabledOption(options)[fields.value.value]);
        }
      });
    }, {
      immediate: true
    });
    let lastEmittedModelValue;
    vue.watch(() => props2.modelValue, (newValues) => {
      if (!isSameValue(newValues, selectedValues.value) && !isSameValue(newValues, lastEmittedModelValue)) {
        selectedValues.value = newValues.slice(0);
        lastEmittedModelValue = newValues.slice(0);
      }
    }, {
      deep: true
    });
    vue.watch(selectedValues, (newValues) => {
      if (!isSameValue(newValues, props2.modelValue)) {
        lastEmittedModelValue = newValues.slice(0);
        emit("update:modelValue", lastEmittedModelValue);
      }
    }, {
      immediate: true
    });
    use.useEventListener("touchmove", preventDefault, {
      target: columnsRef
    });
    const getSelectedOptions = () => selectedOptions.value;
    useExpose({
      confirm,
      getSelectedOptions
    });
    return () => {
      var _a, _b;
      return vue.createVNode("div", {
        "class": bem$1t()
      }, [props2.toolbarPosition === "top" ? renderToolbar() : null, props2.loading ? vue.createVNode(Loading, {
        "class": bem$1t("loading")
      }, null) : null, (_a = slots["columns-top"]) == null ? void 0 : _a.call(slots), renderColumns(), (_b = slots["columns-bottom"]) == null ? void 0 : _b.call(slots), props2.toolbarPosition === "bottom" ? renderToolbar() : null]);
    };
  }
});
const AREA_EMPTY_CODE = "000000";
const INHERIT_SLOTS = [
  "title",
  "cancel",
  "confirm",
  "toolbar",
  "columns-top",
  "columns-bottom"
];
const INHERIT_PROPS = [
  "title",
  "loading",
  "readonly",
  "optionHeight",
  "swipeDuration",
  "visibleOptionNum",
  "cancelButtonText",
  "confirmButtonText"
];
const makeOption = (text = "", value = AREA_EMPTY_CODE, children = void 0) => ({
  text,
  value,
  children
});
function formatDataForCascade({
  areaList,
  columnsNum,
  columnsPlaceholder: placeholder
}) {
  const {
    city_list: city = {},
    county_list: county = {},
    province_list: province = {}
  } = areaList;
  const showCity = +columnsNum > 1;
  const showCounty = +columnsNum > 2;
  const getProvinceChildren = () => {
    if (showCity) {
      return placeholder.length ? [
        makeOption(
          placeholder[0],
          AREA_EMPTY_CODE,
          showCounty ? [] : void 0
        )
      ] : [];
    }
  };
  const provinceMap = /* @__PURE__ */ new Map();
  Object.keys(province).forEach((code) => {
    provinceMap.set(
      code.slice(0, 2),
      makeOption(province[code], code, getProvinceChildren())
    );
  });
  const cityMap = /* @__PURE__ */ new Map();
  if (showCity) {
    const getCityChildren = () => {
      if (showCounty) {
        return placeholder.length ? [makeOption(placeholder[1])] : [];
      }
    };
    Object.keys(city).forEach((code) => {
      const option = makeOption(city[code], code, getCityChildren());
      cityMap.set(code.slice(0, 4), option);
      const province2 = provinceMap.get(code.slice(0, 2));
      if (province2) {
        province2.children.push(option);
      }
    });
  }
  if (showCounty) {
    Object.keys(county).forEach((code) => {
      const city2 = cityMap.get(code.slice(0, 4));
      if (city2) {
        city2.children.push(makeOption(county[code], code));
      }
    });
  }
  const options = Array.from(provinceMap.values());
  if (placeholder.length) {
    const county2 = showCounty ? [makeOption(placeholder[2])] : void 0;
    const city2 = showCity ? [makeOption(placeholder[1], AREA_EMPTY_CODE, county2)] : void 0;
    options.unshift(makeOption(placeholder[0], AREA_EMPTY_CODE, city2));
  }
  return options;
}
const Picker = withInstall(stdin_default$1y);
const [name$1n, bem$1j] = createNamespace("area");
const areaProps = extend({}, pick(pickerSharedProps, INHERIT_PROPS), {
  modelValue: String,
  columnsNum: makeNumericProp(3),
  columnsPlaceholder: makeArrayProp(),
  areaList: {
    type: Object,
    default: () => ({})
  }
});
var stdin_default$1x = vue.defineComponent({
  name: name$1n,
  props: areaProps,
  emits: ["change", "confirm", "cancel", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const codes = vue.ref([]);
    const picker = vue.ref();
    const columns = vue.computed(() => formatDataForCascade(props2));
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    vue.watch(codes, (newCodes) => {
      const lastCode = newCodes.length ? newCodes[newCodes.length - 1] : "";
      if (lastCode && lastCode !== props2.modelValue) {
        emit("update:modelValue", lastCode);
      }
    }, {
      deep: true
    });
    vue.watch(() => props2.modelValue, (newCode) => {
      if (newCode) {
        const lastCode = codes.value.length ? codes.value[codes.value.length - 1] : "";
        if (newCode !== lastCode) {
          codes.value = [`${newCode.slice(0, 2)}0000`, `${newCode.slice(0, 4)}00`, newCode].slice(0, +props2.columnsNum);
        }
      } else {
        codes.value = [];
      }
    }, {
      immediate: true
    });
    useExpose({
      confirm: () => {
        var _a;
        return (_a = picker.value) == null ? void 0 : _a.confirm();
      },
      getSelectedOptions: () => {
        var _a;
        return ((_a = picker.value) == null ? void 0 : _a.getSelectedOptions()) || [];
      }
    });
    return () => vue.createVNode(Picker, vue.mergeProps({
      "ref": picker,
      "modelValue": codes.value,
      "onUpdate:modelValue": ($event) => codes.value = $event,
      "class": bem$1j(),
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props2, INHERIT_PROPS)), pick(slots, INHERIT_SLOTS));
  }
});
const Area = withInstall(stdin_default$1x);
const [name$1m, bem$1i] = createNamespace("cell");
const cellSharedProps = {
  tag: makeStringProp("div"),
  icon: String,
  size: String,
  title: numericProp,
  value: numericProp,
  label: numericProp,
  center: Boolean,
  isLink: Boolean,
  border: truthProp,
  required: Boolean,
  iconPrefix: String,
  valueClass: unknownProp,
  labelClass: unknownProp,
  titleClass: unknownProp,
  titleStyle: null,
  arrowDirection: String,
  clickable: {
    type: Boolean,
    default: null
  }
};
const cellProps = extend({}, cellSharedProps, routeProps);
var stdin_default$1w = vue.defineComponent({
  name: name$1m,
  props: cellProps,
  setup(props2, {
    slots
  }) {
    const route2 = useRoute();
    const renderLabel = () => {
      const showLabel = slots.label || isDef(props2.label);
      if (showLabel) {
        return vue.createVNode("div", {
          "class": [bem$1i("label"), props2.labelClass]
        }, [slots.label ? slots.label() : props2.label]);
      }
    };
    const renderTitle = () => {
      var _a;
      if (slots.title || isDef(props2.title)) {
        const titleSlot = (_a = slots.title) == null ? void 0 : _a.call(slots);
        if (Array.isArray(titleSlot) && titleSlot.length === 0) {
          return;
        }
        return vue.createVNode("div", {
          "class": [bem$1i("title"), props2.titleClass],
          "style": props2.titleStyle
        }, [titleSlot || vue.createVNode("span", null, [props2.title]), renderLabel()]);
      }
    };
    const renderValue = () => {
      const slot = slots.value || slots.default;
      const hasValue = slot || isDef(props2.value);
      if (hasValue) {
        return vue.createVNode("div", {
          "class": [bem$1i("value"), props2.valueClass]
        }, [slot ? slot() : vue.createVNode("span", null, [props2.value])]);
      }
    };
    const renderLeftIcon = () => {
      if (slots.icon) {
        return slots.icon();
      }
      if (props2.icon) {
        return vue.createVNode(Icon, {
          "name": props2.icon,
          "class": bem$1i("left-icon"),
          "classPrefix": props2.iconPrefix
        }, null);
      }
    };
    const renderRightIcon = () => {
      if (slots["right-icon"]) {
        return slots["right-icon"]();
      }
      if (props2.isLink) {
        const name2 = props2.arrowDirection && props2.arrowDirection !== "right" ? `arrow-${props2.arrowDirection}` : "arrow";
        return vue.createVNode(Icon, {
          "name": name2,
          "class": bem$1i("right-icon")
        }, null);
      }
    };
    return () => {
      var _a;
      const {
        tag,
        size,
        center,
        border,
        isLink,
        required
      } = props2;
      const clickable = (_a = props2.clickable) != null ? _a : isLink;
      const classes = {
        center,
        required,
        clickable,
        borderless: !border
      };
      if (size) {
        classes[size] = !!size;
      }
      return vue.createVNode(tag, {
        "class": bem$1i(classes),
        "role": clickable ? "button" : void 0,
        "tabindex": clickable ? 0 : void 0,
        "onClick": route2
      }, {
        default: () => {
          var _a2;
          return [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), (_a2 = slots.extra) == null ? void 0 : _a2.call(slots)];
        }
      });
    };
  }
});
const Cell = withInstall(stdin_default$1w);
const [name$1l, bem$1h] = createNamespace("form");
const formProps = {
  colon: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  showError: Boolean,
  labelWidth: numericProp,
  labelAlign: String,
  inputAlign: String,
  scrollToError: Boolean,
  validateFirst: Boolean,
  submitOnEnter: truthProp,
  showErrorMessage: truthProp,
  errorMessageAlign: String,
  validateTrigger: {
    type: [String, Array],
    default: "onBlur"
  }
};
var stdin_default$1v = vue.defineComponent({
  name: name$1l,
  props: formProps,
  emits: ["submit", "failed"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      children,
      linkChildren
    } = use.useChildren(FORM_KEY);
    const getFieldsByNames = (names) => {
      if (names) {
        return children.filter((field) => names.includes(field.name));
      }
      return children;
    };
    const validateSeq = (names) => new Promise((resolve, reject) => {
      const errors = [];
      const fields = getFieldsByNames(names);
      fields.reduce((promise, field) => promise.then(() => {
        if (!errors.length) {
          return field.validate().then((error) => {
            if (error) {
              errors.push(error);
            }
          });
        }
      }), Promise.resolve()).then(() => {
        if (errors.length) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });
    const validateAll = (names) => new Promise((resolve, reject) => {
      const fields = getFieldsByNames(names);
      Promise.all(fields.map((item) => item.validate())).then((errors) => {
        errors = errors.filter(Boolean);
        if (errors.length) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });
    const validateField = (name2) => {
      const matched = children.find((item) => item.name === name2);
      if (matched) {
        return new Promise((resolve, reject) => {
          matched.validate().then((error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }
      return Promise.reject();
    };
    const validate = (name2) => {
      if (typeof name2 === "string") {
        return validateField(name2);
      }
      return props2.validateFirst ? validateSeq(name2) : validateAll(name2);
    };
    const resetValidation = (name2) => {
      if (typeof name2 === "string") {
        name2 = [name2];
      }
      const fields = getFieldsByNames(name2);
      fields.forEach((item) => {
        item.resetValidation();
      });
    };
    const getValidationStatus = () => children.reduce((form, field) => {
      form[field.name] = field.getValidationStatus();
      return form;
    }, {});
    const scrollToField = (name2, options) => {
      children.some((item) => {
        if (item.name === name2) {
          item.$el.scrollIntoView(options);
          return true;
        }
        return false;
      });
    };
    const getValues = () => children.reduce((form, field) => {
      if (field.name !== void 0) {
        form[field.name] = field.formValue.value;
      }
      return form;
    }, {});
    const submit = () => {
      const values = getValues();
      validate().then(() => emit("submit", values)).catch((errors) => {
        emit("failed", {
          values,
          errors
        });
        if (props2.scrollToError && errors[0].name) {
          scrollToField(errors[0].name);
        }
      });
    };
    const onSubmit = (event) => {
      preventDefault(event);
      submit();
    };
    linkChildren({
      props: props2
    });
    useExpose({
      submit,
      validate,
      getValues,
      scrollToField,
      resetValidation,
      getValidationStatus
    });
    return () => {
      var _a;
      return vue.createVNode("form", {
        "class": bem$1h(),
        "onSubmit": onSubmit
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const Form = withInstall(stdin_default$1v);
function isEmptyValue(value) {
  if (Array.isArray(value)) {
    return !value.length;
  }
  if (value === 0) {
    return false;
  }
  return !value;
}
function runSyncRule(value, rule) {
  if (isEmptyValue(value)) {
    if (rule.required) {
      return false;
    }
    if (rule.validateEmpty === false) {
      return true;
    }
  }
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false;
  }
  return true;
}
function runRuleValidator(value, rule) {
  return new Promise((resolve) => {
    const returnVal = rule.validator(value, rule);
    if (isPromise(returnVal)) {
      returnVal.then(resolve);
      return;
    }
    resolve(returnVal);
  });
}
function getRuleMessage(value, rule) {
  const { message } = rule;
  if (isFunction(message)) {
    return message(value, rule);
  }
  return message || "";
}
function startComposing({ target }) {
  target.composing = true;
}
function endComposing({ target }) {
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
function resizeTextarea(input, autosize) {
  const scrollTop = getRootScrollTop();
  input.style.height = "auto";
  let height = input.scrollHeight;
  if (isObject(autosize)) {
    const { maxHeight, minHeight } = autosize;
    if (maxHeight !== void 0) {
      height = Math.min(height, maxHeight);
    }
    if (minHeight !== void 0) {
      height = Math.max(height, minHeight);
    }
  }
  if (height) {
    input.style.height = `${height}px`;
    setRootScrollTop(scrollTop);
  }
}
function mapInputType(type) {
  if (type === "number") {
    return {
      type: "text",
      inputmode: "decimal"
    };
  }
  if (type === "digit") {
    return {
      type: "tel",
      inputmode: "numeric"
    };
  }
  return { type };
}
function getStringLength(str) {
  return [...str].length;
}
function cutString(str, maxlength) {
  return [...str].slice(0, maxlength).join("");
}
const [name$1k, bem$1g] = createNamespace("field");
const fieldSharedProps = {
  id: String,
  name: String,
  leftIcon: String,
  rightIcon: String,
  autofocus: Boolean,
  clearable: Boolean,
  maxlength: numericProp,
  formatter: Function,
  clearIcon: makeStringProp("clear"),
  modelValue: makeNumericProp(""),
  inputAlign: String,
  placeholder: String,
  autocomplete: String,
  autocapitalize: String,
  autocorrect: String,
  errorMessage: String,
  enterkeyhint: String,
  spellcheck: {
    type: Boolean,
    default: null
  },
  clearTrigger: makeStringProp("focus"),
  formatTrigger: makeStringProp("onChange"),
  error: {
    type: Boolean,
    default: null
  },
  disabled: {
    type: Boolean,
    default: null
  },
  readonly: {
    type: Boolean,
    default: null
  }
};
const fieldProps = extend({}, cellSharedProps, fieldSharedProps, {
  rows: numericProp,
  type: makeStringProp("text"),
  rules: Array,
  autosize: [Boolean, Object],
  labelWidth: numericProp,
  labelClass: unknownProp,
  labelAlign: String,
  showWordLimit: Boolean,
  errorMessageAlign: String,
  colon: {
    type: Boolean,
    default: null
  }
});
var stdin_default$1u = vue.defineComponent({
  name: name$1k,
  props: fieldProps,
  emits: ["blur", "focus", "clear", "keypress", "clickInput", "endValidate", "startValidate", "clickLeftIcon", "clickRightIcon", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const id = useId();
    const state = vue.reactive({
      status: "unvalidated",
      focused: false,
      validateMessage: ""
    });
    const inputRef = vue.ref();
    const clearIconRef = vue.ref();
    const customValue = vue.ref();
    const {
      parent: form
    } = use.useParent(FORM_KEY);
    const getModelValue = () => {
      var _a;
      return String((_a = props2.modelValue) != null ? _a : "");
    };
    const getProp = (key) => {
      if (isDef(props2[key])) {
        return props2[key];
      }
      if (form && isDef(form.props[key])) {
        return form.props[key];
      }
    };
    const showClear = vue.computed(() => {
      const readonly = getProp("readonly");
      if (props2.clearable && !readonly) {
        const hasValue = getModelValue() !== "";
        const trigger = props2.clearTrigger === "always" || props2.clearTrigger === "focus" && state.focused;
        return hasValue && trigger;
      }
      return false;
    });
    const formValue = vue.computed(() => {
      if (customValue.value && slots.input) {
        return customValue.value();
      }
      return props2.modelValue;
    });
    const runRules = (rules) => rules.reduce((promise, rule) => promise.then(() => {
      if (state.status === "failed") {
        return;
      }
      let {
        value
      } = formValue;
      if (rule.formatter) {
        value = rule.formatter(value, rule);
      }
      if (!runSyncRule(value, rule)) {
        state.status = "failed";
        state.validateMessage = getRuleMessage(value, rule);
        return;
      }
      if (rule.validator) {
        if (isEmptyValue(value) && rule.validateEmpty === false) {
          return;
        }
        return runRuleValidator(value, rule).then((result) => {
          if (result && typeof result === "string") {
            state.status = "failed";
            state.validateMessage = result;
          } else if (result === false) {
            state.status = "failed";
            state.validateMessage = getRuleMessage(value, rule);
          }
        });
      }
    }), Promise.resolve());
    const resetValidation = () => {
      state.status = "unvalidated";
      state.validateMessage = "";
    };
    const endValidate = () => emit("endValidate", {
      status: state.status,
      message: state.validateMessage
    });
    const validate = (rules = props2.rules) => new Promise((resolve) => {
      resetValidation();
      if (rules) {
        emit("startValidate");
        runRules(rules).then(() => {
          if (state.status === "failed") {
            resolve({
              name: props2.name,
              message: state.validateMessage
            });
            endValidate();
          } else {
            state.status = "passed";
            resolve();
            endValidate();
          }
        });
      } else {
        resolve();
      }
    });
    const validateWithTrigger = (trigger) => {
      if (form && props2.rules) {
        const {
          validateTrigger
        } = form.props;
        const defaultTrigger = toArray(validateTrigger).includes(trigger);
        const rules = props2.rules.filter((rule) => {
          if (rule.trigger) {
            return toArray(rule.trigger).includes(trigger);
          }
          return defaultTrigger;
        });
        if (rules.length) {
          validate(rules);
        }
      }
    };
    const limitValueLength = (value) => {
      var _a;
      const {
        maxlength
      } = props2;
      if (isDef(maxlength) && getStringLength(value) > +maxlength) {
        const modelValue = getModelValue();
        if (modelValue && getStringLength(modelValue) === +maxlength) {
          return modelValue;
        }
        const selectionEnd = (_a = inputRef.value) == null ? void 0 : _a.selectionEnd;
        if (state.focused && selectionEnd) {
          const valueArr = [...value];
          const exceededLength = valueArr.length - +maxlength;
          valueArr.splice(selectionEnd - exceededLength, exceededLength);
          return valueArr.join("");
        }
        return cutString(value, +maxlength);
      }
      return value;
    };
    const updateValue = (value, trigger = "onChange") => {
      const originalValue = value;
      value = limitValueLength(value);
      const limitDiffLen = getStringLength(originalValue) - getStringLength(value);
      if (props2.type === "number" || props2.type === "digit") {
        const isNumber = props2.type === "number";
        value = formatNumber(value, isNumber, isNumber);
      }
      let formatterDiffLen = 0;
      if (props2.formatter && trigger === props2.formatTrigger) {
        const {
          formatter,
          maxlength
        } = props2;
        value = formatter(value);
        if (isDef(maxlength) && getStringLength(value) > +maxlength) {
          value = cutString(value, +maxlength);
        }
        if (inputRef.value && state.focused) {
          const {
            selectionEnd
          } = inputRef.value;
          const bcoVal = cutString(originalValue, selectionEnd);
          formatterDiffLen = getStringLength(formatter(bcoVal)) - getStringLength(bcoVal);
        }
      }
      if (inputRef.value && inputRef.value.value !== value) {
        if (state.focused) {
          let {
            selectionStart,
            selectionEnd
          } = inputRef.value;
          inputRef.value.value = value;
          if (isDef(selectionStart) && isDef(selectionEnd)) {
            const valueLen = getStringLength(value);
            if (limitDiffLen) {
              selectionStart -= limitDiffLen;
              selectionEnd -= limitDiffLen;
            } else if (formatterDiffLen) {
              selectionStart += formatterDiffLen;
              selectionEnd += formatterDiffLen;
            }
            inputRef.value.setSelectionRange(Math.min(selectionStart, valueLen), Math.min(selectionEnd, valueLen));
          }
        } else {
          inputRef.value.value = value;
        }
      }
      if (value !== props2.modelValue) {
        emit("update:modelValue", value);
      }
    };
    const onInput = (event) => {
      if (!event.target.composing) {
        updateValue(event.target.value);
      }
    };
    const blur = () => {
      var _a;
      return (_a = inputRef.value) == null ? void 0 : _a.blur();
    };
    const focus = () => {
      var _a;
      return (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const adjustTextareaSize = () => {
      const input = inputRef.value;
      if (props2.type === "textarea" && props2.autosize && input) {
        resizeTextarea(input, props2.autosize);
      }
    };
    const onFocus = (event) => {
      state.focused = true;
      emit("focus", event);
      vue.nextTick(adjustTextareaSize);
      if (getProp("readonly")) {
        blur();
      }
    };
    const onBlur = (event) => {
      state.focused = false;
      updateValue(getModelValue(), "onBlur");
      emit("blur", event);
      if (getProp("readonly")) {
        return;
      }
      validateWithTrigger("onBlur");
      vue.nextTick(adjustTextareaSize);
      resetScroll();
    };
    const onClickInput = (event) => emit("clickInput", event);
    const onClickLeftIcon = (event) => emit("clickLeftIcon", event);
    const onClickRightIcon = (event) => emit("clickRightIcon", event);
    const onClear = (event) => {
      preventDefault(event);
      emit("update:modelValue", "");
      emit("clear", event);
    };
    const showError = vue.computed(() => {
      if (typeof props2.error === "boolean") {
        return props2.error;
      }
      if (form && form.props.showError && state.status === "failed") {
        return true;
      }
    });
    const labelStyle = vue.computed(() => {
      const labelWidth = getProp("labelWidth");
      const labelAlign = getProp("labelAlign");
      if (labelWidth && labelAlign !== "top") {
        return {
          width: addUnit(labelWidth)
        };
      }
    });
    const onKeypress = (event) => {
      const ENTER_CODE = 13;
      if (event.keyCode === ENTER_CODE) {
        const submitOnEnter = form && form.props.submitOnEnter;
        if (!submitOnEnter && props2.type !== "textarea") {
          preventDefault(event);
        }
        if (props2.type === "search") {
          blur();
        }
      }
      emit("keypress", event);
    };
    const getInputId = () => props2.id || `${id}-input`;
    const getValidationStatus = () => state.status;
    const renderInput = () => {
      const controlClass = bem$1g("control", [getProp("inputAlign"), {
        error: showError.value,
        custom: !!slots.input,
        "min-height": props2.type === "textarea" && !props2.autosize
      }]);
      if (slots.input) {
        return vue.createVNode("div", {
          "class": controlClass,
          "onClick": onClickInput
        }, [slots.input()]);
      }
      const inputAttrs = {
        id: getInputId(),
        ref: inputRef,
        name: props2.name,
        rows: props2.rows !== void 0 ? +props2.rows : void 0,
        class: controlClass,
        disabled: getProp("disabled"),
        readonly: getProp("readonly"),
        autofocus: props2.autofocus,
        placeholder: props2.placeholder,
        autocomplete: props2.autocomplete,
        autocapitalize: props2.autocapitalize,
        autocorrect: props2.autocorrect,
        enterkeyhint: props2.enterkeyhint,
        spellcheck: props2.spellcheck,
        "aria-labelledby": props2.label ? `${id}-label` : void 0,
        onBlur,
        onFocus,
        onInput,
        onClick: onClickInput,
        onChange: endComposing,
        onKeypress,
        onCompositionend: endComposing,
        onCompositionstart: startComposing
      };
      if (props2.type === "textarea") {
        return vue.createVNode("textarea", inputAttrs, null);
      }
      return vue.createVNode("input", vue.mergeProps(mapInputType(props2.type), inputAttrs), null);
    };
    const renderLeftIcon = () => {
      const leftIconSlot = slots["left-icon"];
      if (props2.leftIcon || leftIconSlot) {
        return vue.createVNode("div", {
          "class": bem$1g("left-icon"),
          "onClick": onClickLeftIcon
        }, [leftIconSlot ? leftIconSlot() : vue.createVNode(Icon, {
          "name": props2.leftIcon,
          "classPrefix": props2.iconPrefix
        }, null)]);
      }
    };
    const renderRightIcon = () => {
      const rightIconSlot = slots["right-icon"];
      if (props2.rightIcon || rightIconSlot) {
        return vue.createVNode("div", {
          "class": bem$1g("right-icon"),
          "onClick": onClickRightIcon
        }, [rightIconSlot ? rightIconSlot() : vue.createVNode(Icon, {
          "name": props2.rightIcon,
          "classPrefix": props2.iconPrefix
        }, null)]);
      }
    };
    const renderWordLimit = () => {
      if (props2.showWordLimit && props2.maxlength) {
        const count = getStringLength(getModelValue());
        return vue.createVNode("div", {
          "class": bem$1g("word-limit")
        }, [vue.createVNode("span", {
          "class": bem$1g("word-num")
        }, [count]), vue.createTextVNode("/"), props2.maxlength]);
      }
    };
    const renderMessage = () => {
      if (form && form.props.showErrorMessage === false) {
        return;
      }
      const message = props2.errorMessage || state.validateMessage;
      if (message) {
        const slot = slots["error-message"];
        const errorMessageAlign = getProp("errorMessageAlign");
        return vue.createVNode("div", {
          "class": bem$1g("error-message", errorMessageAlign)
        }, [slot ? slot({
          message
        }) : message]);
      }
    };
    const renderLabel = () => {
      const labelWidth = getProp("labelWidth");
      const labelAlign = getProp("labelAlign");
      const colon = getProp("colon") ? ":" : "";
      if (slots.label) {
        return [slots.label(), colon];
      }
      if (props2.label) {
        return vue.createVNode("label", {
          "id": `${id}-label`,
          "for": slots.input ? void 0 : getInputId(),
          "onClick": (event) => {
            preventDefault(event);
            focus();
          },
          "style": labelAlign === "top" && labelWidth ? {
            width: addUnit(labelWidth)
          } : void 0
        }, [props2.label + colon]);
      }
    };
    const renderFieldBody = () => [vue.createVNode("div", {
      "class": bem$1g("body")
    }, [renderInput(), showClear.value && vue.createVNode(Icon, {
      "ref": clearIconRef,
      "name": props2.clearIcon,
      "class": bem$1g("clear")
    }, null), renderRightIcon(), slots.button && vue.createVNode("div", {
      "class": bem$1g("button")
    }, [slots.button()])]), renderWordLimit(), renderMessage()];
    useExpose({
      blur,
      focus,
      validate,
      formValue,
      resetValidation,
      getValidationStatus
    });
    vue.provide(use.CUSTOM_FIELD_INJECTION_KEY, {
      customValue,
      resetValidation,
      validateWithTrigger
    });
    vue.watch(() => props2.modelValue, () => {
      updateValue(getModelValue());
      resetValidation();
      validateWithTrigger("onChange");
      vue.nextTick(adjustTextareaSize);
    });
    vue.onMounted(() => {
      updateValue(getModelValue(), props2.formatTrigger);
      vue.nextTick(adjustTextareaSize);
    });
    use.useEventListener("touchstart", onClear, {
      target: vue.computed(() => {
        var _a;
        return (_a = clearIconRef.value) == null ? void 0 : _a.$el;
      })
    });
    return () => {
      const disabled = getProp("disabled");
      const labelAlign = getProp("labelAlign");
      const LeftIcon = renderLeftIcon();
      const renderTitle = () => {
        const Label = renderLabel();
        if (labelAlign === "top") {
          return [LeftIcon, Label].filter(Boolean);
        }
        return Label || [];
      };
      return vue.createVNode(Cell, {
        "size": props2.size,
        "class": bem$1g({
          error: showError.value,
          disabled,
          [`label-${labelAlign}`]: labelAlign
        }),
        "center": props2.center,
        "border": props2.border,
        "isLink": props2.isLink,
        "clickable": props2.clickable,
        "titleStyle": labelStyle.value,
        "valueClass": bem$1g("value"),
        "titleClass": [bem$1g("label", [labelAlign, {
          required: props2.required
        }]), props2.labelClass],
        "arrowDirection": props2.arrowDirection
      }, {
        icon: LeftIcon && labelAlign !== "top" ? () => LeftIcon : null,
        title: renderTitle,
        value: renderFieldBody,
        extra: slots.extra
      });
    };
  }
});
const Field = withInstall(stdin_default$1u);
let lockCount = 0;
function lockClick(lock) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add("van-toast--unclickable");
    }
    lockCount++;
  } else if (lockCount) {
    lockCount--;
    if (!lockCount) {
      document.body.classList.remove("van-toast--unclickable");
    }
  }
}
const [name$1j, bem$1f] = createNamespace("toast");
const popupInheritProps = ["show", "overlay", "teleport", "transition", "overlayClass", "overlayStyle", "closeOnClickOverlay"];
const toastProps = {
  icon: String,
  show: Boolean,
  type: makeStringProp("text"),
  overlay: Boolean,
  message: numericProp,
  iconSize: numericProp,
  duration: makeNumberProp(2e3),
  position: makeStringProp("middle"),
  teleport: [String, Object],
  wordBreak: String,
  className: unknownProp,
  iconPrefix: String,
  transition: makeStringProp("van-fade"),
  loadingType: String,
  forbidClick: Boolean,
  overlayClass: unknownProp,
  overlayStyle: Object,
  closeOnClick: Boolean,
  closeOnClickOverlay: Boolean
};
var stdin_default$1t = vue.defineComponent({
  name: name$1j,
  props: toastProps,
  emits: ["update:show"],
  setup(props2, {
    emit,
    slots
  }) {
    let timer2;
    let clickable = false;
    const toggleClickable = () => {
      const newValue = props2.show && props2.forbidClick;
      if (clickable !== newValue) {
        clickable = newValue;
        lockClick(clickable);
      }
    };
    const updateShow = (show) => emit("update:show", show);
    const onClick = () => {
      if (props2.closeOnClick) {
        updateShow(false);
      }
    };
    const clearTimer = () => clearTimeout(timer2);
    const renderIcon = () => {
      const {
        icon,
        type,
        iconSize,
        iconPrefix,
        loadingType
      } = props2;
      const hasIcon = icon || type === "success" || type === "fail";
      if (hasIcon) {
        return vue.createVNode(Icon, {
          "name": icon || type,
          "size": iconSize,
          "class": bem$1f("icon"),
          "classPrefix": iconPrefix
        }, null);
      }
      if (type === "loading") {
        return vue.createVNode(Loading, {
          "class": bem$1f("loading"),
          "size": iconSize,
          "type": loadingType
        }, null);
      }
    };
    const renderMessage = () => {
      const {
        type,
        message
      } = props2;
      if (slots.message) {
        return vue.createVNode("div", {
          "class": bem$1f("text")
        }, [slots.message()]);
      }
      if (isDef(message) && message !== "") {
        return type === "html" ? vue.createVNode("div", {
          "key": 0,
          "class": bem$1f("text"),
          "innerHTML": String(message)
        }, null) : vue.createVNode("div", {
          "class": bem$1f("text")
        }, [message]);
      }
    };
    vue.watch(() => [props2.show, props2.forbidClick], toggleClickable);
    vue.watch(() => [props2.show, props2.type, props2.message, props2.duration], () => {
      clearTimer();
      if (props2.show && props2.duration > 0) {
        timer2 = setTimeout(() => {
          updateShow(false);
        }, props2.duration);
      }
    });
    vue.onMounted(toggleClickable);
    vue.onUnmounted(toggleClickable);
    return () => vue.createVNode(Popup, vue.mergeProps({
      "class": [bem$1f([props2.position, props2.wordBreak === "normal" ? "break-normal" : props2.wordBreak, {
        [props2.type]: !props2.icon
      }]), props2.className],
      "lockScroll": false,
      "onClick": onClick,
      "onClosed": clearTimer,
      "onUpdate:show": updateShow
    }, pick(props2, popupInheritProps)), {
      default: () => [renderIcon(), renderMessage()]
    });
  }
});
function usePopupState() {
  const state = vue.reactive({
    show: false
  });
  const toggle = (show) => {
    state.show = show;
  };
  const open = (props2) => {
    extend(state, props2, { transitionAppear: true });
    toggle(true);
  };
  const close = () => toggle(false);
  useExpose({ open, close, toggle });
  return {
    open,
    close,
    state,
    toggle
  };
}
function mountComponent(RootComponent) {
  const app = vue.createApp(RootComponent);
  const root = document.createElement("div");
  document.body.appendChild(root);
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    }
  };
}
const defaultOptions$1 = {
  icon: "",
  type: "text",
  message: "",
  className: "",
  overlay: false,
  onClose: void 0,
  onOpened: void 0,
  duration: 2e3,
  teleport: "body",
  iconSize: void 0,
  iconPrefix: void 0,
  position: "middle",
  transition: "van-fade",
  forbidClick: false,
  loadingType: void 0,
  overlayClass: "",
  overlayStyle: void 0,
  closeOnClick: false,
  closeOnClickOverlay: false
};
let queue = [];
let allowMultiple = false;
let currentOptions$2 = extend({}, defaultOptions$1);
const defaultOptionsMap = /* @__PURE__ */ new Map();
function parseOptions$1(message) {
  if (isObject(message)) {
    return message;
  }
  return {
    message
  };
}
function createInstance() {
  const {
    instance: instance2,
    unmount
  } = mountComponent({
    setup() {
      const message = vue.ref("");
      const {
        open,
        state,
        close,
        toggle
      } = usePopupState();
      const onClosed = () => {
        if (allowMultiple) {
          queue = queue.filter((item) => item !== instance2);
          unmount();
        }
      };
      const render = () => {
        const attrs = {
          onClosed,
          "onUpdate:show": toggle
        };
        return vue.createVNode(stdin_default$1t, vue.mergeProps(state, attrs), null);
      };
      vue.watch(message, (val) => {
        state.message = val;
      });
      vue.getCurrentInstance().render = render;
      return {
        open,
        close,
        message
      };
    }
  });
  return instance2;
}
function getInstance() {
  if (!queue.length || allowMultiple) {
    const instance2 = createInstance();
    queue.push(instance2);
  }
  return queue[queue.length - 1];
}
function showToast(options = {}) {
  if (!inBrowser) {
    return {};
  }
  const toast = getInstance();
  const parsedOptions = parseOptions$1(options);
  toast.open(extend({}, currentOptions$2, defaultOptionsMap.get(parsedOptions.type || currentOptions$2.type), parsedOptions));
  return toast;
}
const createMethod = (type) => (options) => showToast(extend({
  type
}, parseOptions$1(options)));
const showLoadingToast = createMethod("loading");
const showSuccessToast = createMethod("success");
const showFailToast = createMethod("fail");
const closeToast = (all) => {
  var _a;
  if (queue.length) {
    if (all) {
      queue.forEach((toast) => {
        toast.close();
      });
      queue = [];
    } else if (!allowMultiple) {
      queue[0].close();
    } else {
      (_a = queue.shift()) == null ? void 0 : _a.close();
    }
  }
};
function setToastDefaultOptions(type, options) {
  if (typeof type === "string") {
    defaultOptionsMap.set(type, options);
  } else {
    extend(currentOptions$2, type);
  }
}
const resetToastDefaultOptions = (type) => {
  if (typeof type === "string") {
    defaultOptionsMap.delete(type);
  } else {
    currentOptions$2 = extend({}, defaultOptions$1);
    defaultOptionsMap.clear();
  }
};
const allowMultipleToast = (value = true) => {
  allowMultiple = value;
};
const Toast = withInstall(stdin_default$1t);
const [name$1i, bem$1e] = createNamespace("switch");
const switchProps = {
  size: numericProp,
  loading: Boolean,
  disabled: Boolean,
  modelValue: unknownProp,
  activeColor: String,
  inactiveColor: String,
  activeValue: {
    type: unknownProp,
    default: true
  },
  inactiveValue: {
    type: unknownProp,
    default: false
  }
};
var stdin_default$1s = vue.defineComponent({
  name: name$1i,
  props: switchProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const isChecked = () => props2.modelValue === props2.activeValue;
    const onClick = () => {
      if (!props2.disabled && !props2.loading) {
        const newValue = isChecked() ? props2.inactiveValue : props2.activeValue;
        emit("update:modelValue", newValue);
        emit("change", newValue);
      }
    };
    const renderLoading = () => {
      if (props2.loading) {
        const color = isChecked() ? props2.activeColor : props2.inactiveColor;
        return vue.createVNode(Loading, {
          "class": bem$1e("loading"),
          "color": color
        }, null);
      }
      if (slots.node) {
        return slots.node();
      }
    };
    use.useCustomFieldValue(() => props2.modelValue);
    return () => {
      var _a;
      const {
        size,
        loading,
        disabled,
        activeColor,
        inactiveColor
      } = props2;
      const checked = isChecked();
      const style = {
        fontSize: addUnit(size),
        backgroundColor: checked ? activeColor : inactiveColor
      };
      return vue.createVNode("div", {
        "role": "switch",
        "class": bem$1e({
          on: checked,
          loading,
          disabled
        }),
        "style": style,
        "tabindex": disabled ? void 0 : 0,
        "aria-checked": checked,
        "onClick": onClick
      }, [vue.createVNode("div", {
        "class": bem$1e("node")
      }, [renderLoading()]), (_a = slots.background) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const Switch = withInstall(stdin_default$1s);
const [name$1h, bem$1d] = createNamespace("address-edit-detail");
const t$j = createNamespace("address-edit")[2];
var stdin_default$1r = vue.defineComponent({
  name: name$1h,
  props: {
    show: Boolean,
    rows: numericProp,
    value: String,
    rules: Array,
    focused: Boolean,
    maxlength: numericProp,
    searchResult: Array,
    showSearchResult: Boolean
  },
  emits: ["blur", "focus", "input", "selectSearch"],
  setup(props2, {
    emit
  }) {
    const field = vue.ref();
    const showSearchResult = () => props2.focused && props2.searchResult && props2.showSearchResult;
    const onSelect = (express) => {
      emit("selectSearch", express);
      emit("input", `${express.address || ""} ${express.name || ""}`.trim());
    };
    const renderSearchResult = () => {
      if (!showSearchResult()) {
        return;
      }
      const {
        searchResult
      } = props2;
      return searchResult.map((express) => vue.createVNode(Cell, {
        "clickable": true,
        "key": (express.name || "") + (express.address || ""),
        "icon": "location-o",
        "title": express.name,
        "label": express.address,
        "class": bem$1d("search-item"),
        "border": false,
        "onClick": () => onSelect(express)
      }, null));
    };
    const onBlur = (event) => emit("blur", event);
    const onFocus = (event) => emit("focus", event);
    const onInput = (value) => emit("input", value);
    return () => {
      if (props2.show) {
        return vue.createVNode(vue.Fragment, null, [vue.createVNode(Field, {
          "autosize": true,
          "clearable": true,
          "ref": field,
          "class": bem$1d(),
          "rows": props2.rows,
          "type": "textarea",
          "rules": props2.rules,
          "label": t$j("addressDetail"),
          "border": !showSearchResult(),
          "maxlength": props2.maxlength,
          "modelValue": props2.value,
          "placeholder": t$j("addressDetail"),
          "onBlur": onBlur,
          "onFocus": onFocus,
          "onUpdate:modelValue": onInput
        }, null), renderSearchResult()]);
      }
    };
  }
});
const [name$1g, bem$1c, t$i] = createNamespace("address-edit");
const DEFAULT_DATA = {
  name: "",
  tel: "",
  city: "",
  county: "",
  country: "",
  province: "",
  areaCode: "",
  isDefault: false,
  addressDetail: ""
};
const addressEditProps = {
  areaList: Object,
  isSaving: Boolean,
  isDeleting: Boolean,
  validator: Function,
  showArea: truthProp,
  showDetail: truthProp,
  showDelete: Boolean,
  disableArea: Boolean,
  searchResult: Array,
  telMaxlength: numericProp,
  showSetDefault: Boolean,
  saveButtonText: String,
  areaPlaceholder: String,
  deleteButtonText: String,
  showSearchResult: Boolean,
  detailRows: makeNumericProp(1),
  detailMaxlength: makeNumericProp(200),
  areaColumnsPlaceholder: makeArrayProp(),
  addressInfo: {
    type: Object,
    default: () => extend({}, DEFAULT_DATA)
  },
  telValidator: {
    type: Function,
    default: isMobile
  }
};
var stdin_default$1q = vue.defineComponent({
  name: name$1g,
  props: addressEditProps,
  emits: ["save", "focus", "delete", "clickArea", "changeArea", "changeDetail", "selectSearch", "changeDefault"],
  setup(props2, {
    emit,
    slots
  }) {
    const areaRef = vue.ref();
    const data = vue.reactive({});
    const showAreaPopup = vue.ref(false);
    const detailFocused = vue.ref(false);
    const areaListLoaded = vue.computed(() => isObject(props2.areaList) && Object.keys(props2.areaList).length);
    const areaText = vue.computed(() => {
      const {
        province,
        city,
        county,
        areaCode
      } = data;
      if (areaCode) {
        const arr = [province, city, county];
        if (province && province === city) {
          arr.splice(1, 1);
        }
        return arr.filter(Boolean).join("/");
      }
      return "";
    });
    const hideBottomFields = vue.computed(() => {
      var _a;
      return ((_a = props2.searchResult) == null ? void 0 : _a.length) && detailFocused.value;
    });
    const onFocus = (key) => {
      detailFocused.value = key === "addressDetail";
      emit("focus", key);
    };
    const rules = vue.computed(() => {
      const {
        validator,
        telValidator
      } = props2;
      const makeRule = (name2, emptyMessage) => ({
        validator: (value) => {
          if (validator) {
            const message = validator(name2, value);
            if (message) {
              return message;
            }
          }
          if (!value) {
            return emptyMessage;
          }
          return true;
        }
      });
      return {
        name: [makeRule("name", t$i("nameEmpty"))],
        tel: [makeRule("tel", t$i("telInvalid")), {
          validator: telValidator,
          message: t$i("telInvalid")
        }],
        areaCode: [makeRule("areaCode", t$i("areaEmpty"))],
        addressDetail: [makeRule("addressDetail", t$i("addressEmpty"))]
      };
    });
    const onSave = () => emit("save", data);
    const onChangeDetail = (val) => {
      data.addressDetail = val;
      emit("changeDetail", val);
    };
    const assignAreaText = (options) => {
      data.province = options[0].text;
      data.city = options[1].text;
      data.county = options[2].text;
    };
    const onAreaConfirm = ({
      selectedValues,
      selectedOptions
    }) => {
      if (selectedValues.some((value) => value === AREA_EMPTY_CODE)) {
        showToast(t$i("areaEmpty"));
      } else {
        showAreaPopup.value = false;
        assignAreaText(selectedOptions);
        emit("changeArea", selectedOptions);
      }
    };
    const onDelete = () => emit("delete", data);
    const setAreaCode = (code) => {
      data.areaCode = code || "";
    };
    const onDetailBlur = () => {
      setTimeout(() => {
        detailFocused.value = false;
      });
    };
    const setAddressDetail = (value) => {
      data.addressDetail = value;
    };
    const renderSetDefaultCell = () => {
      if (props2.showSetDefault) {
        const slots2 = {
          "right-icon": () => vue.createVNode(Switch, {
            "modelValue": data.isDefault,
            "onUpdate:modelValue": ($event) => data.isDefault = $event,
            "onChange": (event) => emit("changeDefault", event)
          }, null)
        };
        return vue.withDirectives(vue.createVNode(Cell, {
          "center": true,
          "border": false,
          "title": t$i("defaultAddress"),
          "class": bem$1c("default")
        }, slots2), [[vue.vShow, !hideBottomFields.value]]);
      }
    };
    useExpose({
      setAreaCode,
      setAddressDetail
    });
    vue.watch(() => props2.addressInfo, (value) => {
      extend(data, DEFAULT_DATA, value);
      vue.nextTick(() => {
        var _a;
        const options = (_a = areaRef.value) == null ? void 0 : _a.getSelectedOptions();
        if (options && options.every((option) => option && option.value !== AREA_EMPTY_CODE)) {
          assignAreaText(options);
        }
      });
    }, {
      deep: true,
      immediate: true
    });
    return () => {
      const {
        disableArea
      } = props2;
      return vue.createVNode(Form, {
        "class": bem$1c(),
        "onSubmit": onSave
      }, {
        default: () => {
          var _a;
          return [vue.createVNode("div", {
            "class": bem$1c("fields")
          }, [vue.createVNode(Field, {
            "modelValue": data.name,
            "onUpdate:modelValue": ($event) => data.name = $event,
            "clearable": true,
            "label": t$i("name"),
            "rules": rules.value.name,
            "placeholder": t$i("name"),
            "onFocus": () => onFocus("name")
          }, null), vue.createVNode(Field, {
            "modelValue": data.tel,
            "onUpdate:modelValue": ($event) => data.tel = $event,
            "clearable": true,
            "type": "tel",
            "label": t$i("tel"),
            "rules": rules.value.tel,
            "maxlength": props2.telMaxlength,
            "placeholder": t$i("tel"),
            "onFocus": () => onFocus("tel")
          }, null), vue.withDirectives(vue.createVNode(Field, {
            "readonly": true,
            "label": t$i("area"),
            "is-link": !disableArea,
            "modelValue": areaText.value,
            "rules": rules.value.areaCode,
            "placeholder": props2.areaPlaceholder || t$i("area"),
            "onFocus": () => onFocus("areaCode"),
            "onClick": () => {
              emit("clickArea");
              showAreaPopup.value = !disableArea;
            }
          }, null), [[vue.vShow, props2.showArea]]), vue.createVNode(stdin_default$1r, {
            "show": props2.showDetail,
            "rows": props2.detailRows,
            "rules": rules.value.addressDetail,
            "value": data.addressDetail,
            "focused": detailFocused.value,
            "maxlength": props2.detailMaxlength,
            "searchResult": props2.searchResult,
            "showSearchResult": props2.showSearchResult,
            "onBlur": onDetailBlur,
            "onFocus": () => onFocus("addressDetail"),
            "onInput": onChangeDetail,
            "onSelectSearch": (event) => emit("selectSearch", event)
          }, null), (_a = slots.default) == null ? void 0 : _a.call(slots)]), renderSetDefaultCell(), vue.withDirectives(vue.createVNode("div", {
            "class": bem$1c("buttons")
          }, [vue.createVNode(Button, {
            "block": true,
            "round": true,
            "type": "primary",
            "text": props2.saveButtonText || t$i("save"),
            "class": bem$1c("button"),
            "loading": props2.isSaving,
            "nativeType": "submit"
          }, null), props2.showDelete && vue.createVNode(Button, {
            "block": true,
            "round": true,
            "class": bem$1c("button"),
            "loading": props2.isDeleting,
            "text": props2.deleteButtonText || t$i("delete"),
            "onClick": onDelete
          }, null)]), [[vue.vShow, !hideBottomFields.value]]), vue.createVNode(Popup, {
            "show": showAreaPopup.value,
            "onUpdate:show": ($event) => showAreaPopup.value = $event,
            "round": true,
            "teleport": "body",
            "position": "bottom",
            "lazyRender": false
          }, {
            default: () => [vue.createVNode(Area, {
              "modelValue": data.areaCode,
              "onUpdate:modelValue": ($event) => data.areaCode = $event,
              "ref": areaRef,
              "loading": !areaListLoaded.value,
              "areaList": props2.areaList,
              "columnsPlaceholder": props2.areaColumnsPlaceholder,
              "onConfirm": onAreaConfirm,
              "onCancel": () => {
                showAreaPopup.value = false;
              }
            }, null)]
          })];
        }
      });
    };
  }
});
const AddressEdit = withInstall(stdin_default$1q);
const [name$1f, bem$1b] = createNamespace("radio-group");
const radioGroupProps = {
  shape: String,
  disabled: Boolean,
  iconSize: numericProp,
  direction: String,
  modelValue: unknownProp,
  checkedColor: String
};
const RADIO_KEY = Symbol(name$1f);
var stdin_default$1p = vue.defineComponent({
  name: name$1f,
  props: radioGroupProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = use.useChildren(RADIO_KEY);
    const updateValue = (value) => emit("update:modelValue", value);
    vue.watch(() => props2.modelValue, (value) => emit("change", value));
    linkChildren({
      props: props2,
      updateValue
    });
    use.useCustomFieldValue(() => props2.modelValue);
    return () => {
      var _a;
      return vue.createVNode("div", {
        "class": bem$1b([props2.direction]),
        "role": "radiogroup"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const RadioGroup = withInstall(stdin_default$1p);
const [name$1e, bem$1a] = createNamespace("tag");
const tagProps = {
  size: String,
  mark: Boolean,
  show: truthProp,
  type: makeStringProp("default"),
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean
};
var stdin_default$1o = vue.defineComponent({
  name: name$1e,
  props: tagProps,
  emits: ["close"],
  setup(props2, {
    slots,
    emit
  }) {
    const onClose = (event) => {
      event.stopPropagation();
      emit("close", event);
    };
    const getStyle = () => {
      if (props2.plain) {
        return {
          color: props2.textColor || props2.color,
          borderColor: props2.color
        };
      }
      return {
        color: props2.textColor,
        background: props2.color
      };
    };
    const renderTag = () => {
      var _a;
      const {
        type,
        mark,
        plain,
        round,
        size,
        closeable
      } = props2;
      const classes = {
        mark,
        plain,
        round
      };
      if (size) {
        classes[size] = size;
      }
      const CloseIcon = closeable && vue.createVNode(Icon, {
        "name": "cross",
        "class": [bem$1a("close"), HAPTICS_FEEDBACK],
        "onClick": onClose
      }, null);
      return vue.createVNode("span", {
        "style": getStyle(),
        "class": bem$1a([classes, type])
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots), CloseIcon]);
    };
    return () => vue.createVNode(vue.Transition, {
      "name": props2.closeable ? "van-fade" : void 0
    }, {
      default: () => [props2.show ? renderTag() : null]
    });
  }
});
const Tag = withInstall(stdin_default$1o);
const checkerProps = {
  name: unknownProp,
  disabled: Boolean,
  iconSize: numericProp,
  modelValue: unknownProp,
  checkedColor: String,
  labelPosition: String,
  labelDisabled: Boolean
};
var stdin_default$1n = vue.defineComponent({
  props: extend({}, checkerProps, {
    bem: makeRequiredProp(Function),
    role: String,
    shape: String,
    parent: Object,
    checked: Boolean,
    bindGroup: truthProp
  }),
  emits: ["click", "toggle"],
  setup(props2, {
    emit,
    slots
  }) {
    const iconRef = vue.ref();
    const getParentProp = (name2) => {
      if (props2.parent && props2.bindGroup) {
        return props2.parent.props[name2];
      }
    };
    const disabled = vue.computed(() => {
      if (props2.parent && props2.bindGroup) {
        const disabled2 = getParentProp("disabled") || props2.disabled;
        if (props2.role === "checkbox") {
          const checkedCount = getParentProp("modelValue").length;
          const max = getParentProp("max");
          const overlimit = max && checkedCount >= +max;
          return disabled2 || overlimit && !props2.checked;
        }
        return disabled2;
      }
      return props2.disabled;
    });
    const direction = vue.computed(() => getParentProp("direction"));
    const iconStyle = vue.computed(() => {
      const checkedColor = props2.checkedColor || getParentProp("checkedColor");
      if (checkedColor && props2.checked && !disabled.value) {
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor
        };
      }
    });
    const shape = vue.computed(() => {
      return props2.shape || getParentProp("shape") || "round";
    });
    const onClick = (event) => {
      const {
        target
      } = event;
      const icon = iconRef.value;
      const iconClicked = icon === target || (icon == null ? void 0 : icon.contains(target));
      if (!disabled.value && (iconClicked || !props2.labelDisabled)) {
        emit("toggle");
      }
      emit("click", event);
    };
    const renderIcon = () => {
      var _a, _b;
      const {
        bem: bem2,
        checked
      } = props2;
      const iconSize = props2.iconSize || getParentProp("iconSize");
      return vue.createVNode("div", {
        "ref": iconRef,
        "class": bem2("icon", [shape.value, {
          disabled: disabled.value,
          checked
        }]),
        "style": shape.value !== "dot" ? {
          fontSize: addUnit(iconSize)
        } : {
          width: addUnit(iconSize),
          height: addUnit(iconSize),
          borderColor: (_a = iconStyle.value) == null ? void 0 : _a.borderColor
        }
      }, [slots.icon ? slots.icon({
        checked,
        disabled: disabled.value
      }) : shape.value !== "dot" ? vue.createVNode(Icon, {
        "name": "success",
        "style": iconStyle.value
      }, null) : vue.createVNode("div", {
        "class": bem2("icon--dot__icon"),
        "style": {
          backgroundColor: (_b = iconStyle.value) == null ? void 0 : _b.backgroundColor
        }
      }, null)]);
    };
    const renderLabel = () => {
      if (slots.default) {
        return vue.createVNode("span", {
          "class": props2.bem("label", [props2.labelPosition, {
            disabled: disabled.value
          }])
        }, [slots.default()]);
      }
    };
    return () => {
      const nodes = props2.labelPosition === "left" ? [renderLabel(), renderIcon()] : [renderIcon(), renderLabel()];
      return vue.createVNode("div", {
        "role": props2.role,
        "class": props2.bem([{
          disabled: disabled.value,
          "label-disabled": props2.labelDisabled
        }, direction.value]),
        "tabindex": disabled.value ? void 0 : 0,
        "aria-checked": props2.checked,
        "onClick": onClick
      }, [nodes]);
    };
  }
});
const radioProps = extend({}, checkerProps, {
  shape: String
});
const [name$1d, bem$19] = createNamespace("radio");
var stdin_default$1m = vue.defineComponent({
  name: name$1d,
  props: radioProps,
  emits: ["update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      parent
    } = use.useParent(RADIO_KEY);
    const checked = () => {
      const value = parent ? parent.props.modelValue : props2.modelValue;
      return value === props2.name;
    };
    const toggle = () => {
      if (parent) {
        parent.updateValue(props2.name);
      } else {
        emit("update:modelValue", props2.name);
      }
    };
    return () => vue.createVNode(stdin_default$1n, vue.mergeProps({
      "bem": bem$19,
      "role": "radio",
      "parent": parent,
      "checked": checked(),
      "onToggle": toggle
    }, props2), pick(slots, ["default", "icon"]));
  }
});
const Radio = withInstall(stdin_default$1m);
const [name$1c, bem$18] = createNamespace("address-item");
var stdin_default$1l = vue.defineComponent({
  name: name$1c,
  props: {
    address: makeRequiredProp(Object),
    disabled: Boolean,
    switchable: Boolean,
    defaultTagText: String,
    rightIcon: makeStringProp("edit")
  },
  emits: ["edit", "click", "select"],
  setup(props2, {
    slots,
    emit
  }) {
    const onClick = () => {
      if (props2.switchable) {
        emit("select");
      }
      emit("click");
    };
    const renderRightIcon = () => vue.createVNode(Icon, {
      "name": props2.rightIcon,
      "class": bem$18("edit"),
      "onClick": (event) => {
        event.stopPropagation();
        emit("edit");
        emit("click");
      }
    }, null);
    const renderTag = () => {
      if (slots.tag) {
        return slots.tag(props2.address);
      }
      if (props2.address.isDefault && props2.defaultTagText) {
        return vue.createVNode(Tag, {
          "type": "primary",
          "round": true,
          "class": bem$18("tag")
        }, {
          default: () => [props2.defaultTagText]
        });
      }
    };
    const renderContent = () => {
      const {
        address,
        disabled,
        switchable
      } = props2;
      const Info = [vue.createVNode("div", {
        "class": bem$18("name")
      }, [`${address.name} ${address.tel}`, renderTag()]), vue.createVNode("div", {
        "class": bem$18("address")
      }, [address.address])];
      if (switchable && !disabled) {
        return vue.createVNode(Radio, {
          "name": address.id,
          "iconSize": 18
        }, {
          default: () => [Info]
        });
      }
      return Info;
    };
    return () => {
      var _a;
      const {
        disabled
      } = props2;
      return vue.createVNode("div", {
        "class": bem$18({
          disabled
        }),
        "onClick": onClick
      }, [vue.createVNode(Cell, {
        "border": false,
        "titleClass": bem$18("title")
      }, {
        title: renderContent,
        "right-icon": renderRightIcon
      }), (_a = slots.bottom) == null ? void 0 : _a.call(slots, extend({}, props2.address, {
        disabled
      }))]);
    };
  }
});
const [name$1b, bem$17, t$h] = createNamespace("address-list");
const addressListProps = {
  list: makeArrayProp(),
  modelValue: numericProp,
  switchable: truthProp,
  disabledText: String,
  disabledList: makeArrayProp(),
  showAddButton: truthProp,
  addButtonText: String,
  defaultTagText: String,
  rightIcon: makeStringProp("edit")
};
var stdin_default$1k = vue.defineComponent({
  name: name$1b,
  props: addressListProps,
  emits: ["add", "edit", "select", "clickItem", "editDisabled", "selectDisabled", "update:modelValue"],
  setup(props2, {
    slots,
    emit
  }) {
    const renderItem = (item, index, disabled) => {
      const onEdit = () => emit(disabled ? "editDisabled" : "edit", item, index);
      const onClick = () => emit("clickItem", item, index);
      const onSelect = () => {
        emit(disabled ? "selectDisabled" : "select", item, index);
        if (!disabled) {
          emit("update:modelValue", item.id);
        }
      };
      return vue.createVNode(stdin_default$1l, {
        "key": item.id,
        "address": item,
        "disabled": disabled,
        "switchable": props2.switchable,
        "defaultTagText": props2.defaultTagText,
        "rightIcon": props2.rightIcon,
        "onEdit": onEdit,
        "onClick": onClick,
        "onSelect": onSelect
      }, {
        bottom: slots["item-bottom"],
        tag: slots.tag
      });
    };
    const renderList = (list, disabled) => {
      if (list) {
        return list.map((item, index) => renderItem(item, index, disabled));
      }
    };
    const renderBottom = () => props2.showAddButton ? vue.createVNode("div", {
      "class": [bem$17("bottom"), "van-safe-area-bottom"]
    }, [vue.createVNode(Button, {
      "round": true,
      "block": true,
      "type": "primary",
      "text": props2.addButtonText || t$h("add"),
      "class": bem$17("add"),
      "onClick": () => emit("add")
    }, null)]) : void 0;
    return () => {
      var _a, _b;
      const List2 = renderList(props2.list);
      const DisabledList = renderList(props2.disabledList, true);
      const DisabledText = props2.disabledText && vue.createVNode("div", {
        "class": bem$17("disabled-text")
      }, [props2.disabledText]);
      return vue.createVNode("div", {
        "class": bem$17()
      }, [(_a = slots.top) == null ? void 0 : _a.call(slots), vue.createVNode(RadioGroup, {
        "modelValue": props2.modelValue
      }, {
        default: () => [List2]
      }), DisabledText, DisabledList, (_b = slots.default) == null ? void 0 : _b.call(slots), renderBottom()]);
    };
  }
});
const AddressList = withInstall(stdin_default$1k);
const hasIntersectionObserver = use.inBrowser && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype;
const modeType = {
  event: "event",
  observer: "observer"
};
function remove(arr, item) {
  if (!arr.length)
    return;
  const index = arr.indexOf(item);
  if (index > -1)
    return arr.splice(index, 1);
}
function getBestSelectionFromSrcset(el, scale) {
  if (el.tagName !== "IMG" || !el.getAttribute("data-srcset"))
    return;
  let options = el.getAttribute("data-srcset");
  const container = el.parentNode;
  const containerWidth = container.offsetWidth * scale;
  let spaceIndex;
  let tmpSrc;
  let tmpWidth;
  options = options.trim().split(",");
  const result = options.map((item) => {
    item = item.trim();
    spaceIndex = item.lastIndexOf(" ");
    if (spaceIndex === -1) {
      tmpSrc = item;
      tmpWidth = 999998;
    } else {
      tmpSrc = item.substr(0, spaceIndex);
      tmpWidth = parseInt(
        item.substr(spaceIndex + 1, item.length - spaceIndex - 2),
        10
      );
    }
    return [tmpWidth, tmpSrc];
  });
  result.sort((a, b) => {
    if (a[0] < b[0]) {
      return 1;
    }
    if (a[0] > b[0]) {
      return -1;
    }
    if (a[0] === b[0]) {
      if (b[1].indexOf(".webp", b[1].length - 5) !== -1) {
        return 1;
      }
      if (a[1].indexOf(".webp", a[1].length - 5) !== -1) {
        return -1;
      }
    }
    return 0;
  });
  let bestSelectedSrc = "";
  let tmpOption;
  for (let i = 0; i < result.length; i++) {
    tmpOption = result[i];
    bestSelectedSrc = tmpOption[1];
    const next = result[i + 1];
    if (next && next[0] < containerWidth) {
      bestSelectedSrc = tmpOption[1];
      break;
    } else if (!next) {
      bestSelectedSrc = tmpOption[1];
      break;
    }
  }
  return bestSelectedSrc;
}
const getDPR = (scale = 1) => use.inBrowser ? window.devicePixelRatio || scale : scale;
function supportWebp() {
  if (!use.inBrowser)
    return false;
  let support = true;
  try {
    const elem = document.createElement("canvas");
    if (elem.getContext && elem.getContext("2d")) {
      support = elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    }
  } catch (err) {
    support = false;
  }
  return support;
}
function throttle(action, delay) {
  let timeout = null;
  let lastRun = 0;
  return function(...args) {
    if (timeout) {
      return;
    }
    const elapsed = Date.now() - lastRun;
    const runCallback = () => {
      lastRun = Date.now();
      timeout = false;
      action.apply(this, args);
    };
    if (elapsed >= delay) {
      runCallback();
    } else {
      timeout = setTimeout(runCallback, delay);
    }
  };
}
function on(el, type, func) {
  el.addEventListener(type, func, {
    capture: false,
    passive: true
  });
}
function off(el, type, func) {
  el.removeEventListener(type, func, false);
}
const loadImageAsync = (item, resolve, reject) => {
  const image = new Image();
  if (!item || !item.src) {
    return reject(new Error("image src is required"));
  }
  image.src = item.src;
  if (item.cors) {
    image.crossOrigin = item.cors;
  }
  image.onload = () => resolve({
    naturalHeight: image.naturalHeight,
    naturalWidth: image.naturalWidth,
    src: image.src
  });
  image.onerror = (e) => reject(e);
};
class ImageCache {
  constructor({ max }) {
    this.options = {
      max: max || 100
    };
    this.caches = [];
  }
  has(key) {
    return this.caches.indexOf(key) > -1;
  }
  add(key) {
    if (this.has(key))
      return;
    this.caches.push(key);
    if (this.caches.length > this.options.max) {
      this.free();
    }
  }
  free() {
    this.caches.shift();
  }
}
const [name$1a, bem$16] = createNamespace("back-top");
const backTopProps = {
  right: numericProp,
  bottom: numericProp,
  zIndex: numericProp,
  target: [String, Object],
  offset: makeNumericProp(200),
  immediate: Boolean,
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var stdin_default$1j = vue.defineComponent({
  name: name$1a,
  inheritAttrs: false,
  props: backTopProps,
  emits: ["click"],
  setup(props2, {
    emit,
    slots,
    attrs
  }) {
    let shouldReshow = false;
    const show = vue.ref(false);
    const root = vue.ref();
    const scrollParent = vue.ref();
    const style = vue.computed(() => extend(getZIndexStyle(props2.zIndex), {
      right: addUnit(props2.right),
      bottom: addUnit(props2.bottom)
    }));
    const onClick = (event) => {
      var _a;
      emit("click", event);
      (_a = scrollParent.value) == null ? void 0 : _a.scrollTo({
        top: 0,
        behavior: props2.immediate ? "auto" : "smooth"
      });
    };
    const scroll = () => {
      show.value = scrollParent.value ? getScrollTop(scrollParent.value) >= +props2.offset : false;
    };
    const getTarget = () => {
      const {
        target
      } = props2;
      if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          return el;
        }
        if (process.env.NODE_ENV !== "production") {
          console.error(`[Vant] BackTop: target element "${target}" was not found, the BackTop component will not be rendered.`);
        }
      } else {
        return target;
      }
    };
    const updateTarget = () => {
      if (inBrowser) {
        vue.nextTick(() => {
          scrollParent.value = props2.target ? getTarget() : use.getScrollParent(root.value);
          scroll();
        });
      }
    };
    use.useEventListener("scroll", throttle(scroll, 100), {
      target: scrollParent
    });
    vue.onMounted(updateTarget);
    vue.onActivated(() => {
      if (shouldReshow) {
        show.value = true;
        shouldReshow = false;
      }
    });
    vue.onDeactivated(() => {
      if (show.value && props2.teleport) {
        show.value = false;
        shouldReshow = true;
      }
    });
    vue.watch(() => props2.target, updateTarget);
    return () => {
      const Content = vue.createVNode("div", vue.mergeProps({
        "ref": !props2.teleport ? root : void 0,
        "class": bem$16({
          active: show.value
        }),
        "style": style.value,
        "onClick": onClick
      }, attrs), [slots.default ? slots.default() : vue.createVNode(Icon, {
        "name": "back-top",
        "class": bem$16("icon")
      }, null)]);
      if (props2.teleport) {
        return [vue.createVNode("div", {
          "ref": root,
          "class": bem$16("placeholder")
        }, null), vue.createVNode(vue.Teleport, {
          "to": props2.teleport
        }, {
          default: () => [Content]
        })];
      }
      return Content;
    };
  }
});
const BackTop = withInstall(stdin_default$1j);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const barrageProps = {
  top: makeNumericProp(10),
  rows: makeNumericProp(4),
  duration: makeNumericProp(4e3),
  autoPlay: truthProp,
  delay: makeNumberProp(300),
  modelValue: makeArrayProp()
};
const [name$19, bem$15] = createNamespace("barrage");
var stdin_default$1i = vue.defineComponent({
  name: name$19,
  props: barrageProps,
  emits: ["update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const barrageWrapper = vue.ref();
    const className = bem$15("item");
    const total = vue.ref(0);
    const barrageItems = [];
    const createBarrageItem = (text, delay = props2.delay) => {
      const item = document.createElement("span");
      item.className = className;
      item.innerText = String(text);
      item.style.animationDuration = `${props2.duration}ms`;
      item.style.animationDelay = `${delay}ms`;
      item.style.animationName = "van-barrage";
      item.style.animationTimingFunction = "linear";
      return item;
    };
    const isInitBarrage = vue.ref(true);
    const isPlay = vue.ref(props2.autoPlay);
    const appendBarrageItem = ({
      id,
      text
    }, i) => {
      var _a;
      const item = createBarrageItem(text, isInitBarrage.value ? i * props2.delay : void 0);
      if (!props2.autoPlay && isPlay.value === false) {
        item.style.animationPlayState = "paused";
      }
      (_a = barrageWrapper.value) == null ? void 0 : _a.append(item);
      total.value++;
      const top = (total.value - 1) % +props2.rows * item.offsetHeight + +props2.top;
      item.style.top = `${top}px`;
      item.dataset.id = String(id);
      barrageItems.push(item);
      item.addEventListener("animationend", () => {
        emit("update:modelValue", [...props2.modelValue].filter((v) => String(v.id) !== item.dataset.id));
      });
    };
    const updateBarrages = (newValue, oldValue) => {
      const map = new Map(oldValue.map((item) => [item.id, item]));
      newValue.forEach((item, i) => {
        if (map.has(item.id)) {
          map.delete(item.id);
        } else {
          appendBarrageItem(item, i);
        }
      });
      map.forEach((item) => {
        const index = barrageItems.findIndex((span) => span.dataset.id === String(item.id));
        if (index > -1) {
          barrageItems[index].remove();
          barrageItems.splice(index, 1);
        }
      });
      isInitBarrage.value = false;
    };
    vue.watch(() => props2.modelValue.slice(), (newValue, oldValue) => updateBarrages(newValue != null ? newValue : [], oldValue != null ? oldValue : []), {
      deep: true
    });
    const rootStyle = vue.ref({});
    vue.onMounted(() => __async(this, null, function* () {
      var _a;
      rootStyle.value["--move-distance"] = `-${(_a = barrageWrapper.value) == null ? void 0 : _a.offsetWidth}px`;
      yield vue.nextTick();
      updateBarrages(props2.modelValue, []);
    }));
    const play = () => {
      isPlay.value = true;
      barrageItems.forEach((item) => {
        item.style.animationPlayState = "running";
      });
    };
    const pause = () => {
      isPlay.value = false;
      barrageItems.forEach((item) => {
        item.style.animationPlayState = "paused";
      });
    };
    useExpose({
      play,
      pause
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "class": bem$15(),
        "ref": barrageWrapper,
        "style": rootStyle.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const Barrage = withInstall(stdin_default$1i);
const [name$18, bem$14, t$g] = createNamespace("calendar");
const formatMonthTitle = (date) => t$g("monthTitle", date.getFullYear(), date.getMonth() + 1);
function compareMonth(date1, date2) {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  if (year1 === year2) {
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }
  return year1 > year2 ? 1 : -1;
}
function compareDay(day1, day2) {
  const compareMonthResult = compareMonth(day1, day2);
  if (compareMonthResult === 0) {
    const date1 = day1.getDate();
    const date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }
  return compareMonthResult;
}
const cloneDate = (date) => new Date(date);
const cloneDates = (dates) => Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);
function getDayByOffset(date, offset) {
  const cloned = cloneDate(date);
  cloned.setDate(cloned.getDate() + offset);
  return cloned;
}
const getPrevDay = (date) => getDayByOffset(date, -1);
const getNextDay = (date) => getDayByOffset(date, 1);
const getToday = () => {
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
function calcDateNum(date) {
  const day1 = date[0].getTime();
  const day2 = date[1].getTime();
  return (day2 - day1) / (1e3 * 60 * 60 * 24) + 1;
}
const sharedProps = extend({}, pickerSharedProps, {
  modelValue: makeArrayProp(),
  filter: Function,
  formatter: {
    type: Function,
    default: (type, option) => option
  }
});
const pickerInheritKeys = Object.keys(pickerSharedProps);
function times(n, iteratee) {
  if (n < 0) {
    return [];
  }
  const result = Array(n);
  let index = -1;
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
const getMonthEndDay = (year, month) => 32 - new Date(year, month - 1, 32).getDate();
const genOptions = (min, max, type, formatter, filter, values) => {
  const options = times(max - min + 1, (index) => {
    const value = padZero(min + index);
    return formatter(type, {
      text: value,
      value
    });
  });
  return filter ? filter(type, options, values) : options;
};
const formatValueRange = (values, columns) => values.map((value, index) => {
  const column = columns[index];
  if (column.length) {
    const minValue = +column[0].value;
    const maxValue = +column[column.length - 1].value;
    return padZero(clamp(+value, minValue, maxValue));
  }
  return value;
});
const [name$17] = createNamespace("calendar-day");
var stdin_default$1h = vue.defineComponent({
  name: name$17,
  props: {
    item: makeRequiredProp(Object),
    color: String,
    index: Number,
    offset: makeNumberProp(0),
    rowHeight: String
  },
  emits: ["click"],
  setup(props2, {
    emit,
    slots
  }) {
    const style = vue.computed(() => {
      var _a;
      const {
        item,
        index,
        color,
        offset,
        rowHeight
      } = props2;
      const style2 = {
        height: rowHeight
      };
      if (item.type === "placeholder") {
        style2.width = "100%";
        return style2;
      }
      if (index === 0) {
        style2.marginLeft = `${100 * offset / 7}%`;
      }
      if (color) {
        switch (item.type) {
          case "end":
          case "start":
          case "start-end":
          case "multiple-middle":
          case "multiple-selected":
            style2.background = color;
            break;
          case "middle":
            style2.color = color;
            break;
        }
      }
      if (offset + (((_a = item.date) == null ? void 0 : _a.getDate()) || 1) > 28) {
        style2.marginBottom = 0;
      }
      return style2;
    });
    const onClick = () => {
      if (props2.item.type !== "disabled") {
        emit("click", props2.item);
      }
    };
    const renderTopInfo = () => {
      const {
        topInfo
      } = props2.item;
      if (topInfo || slots["top-info"]) {
        return vue.createVNode("div", {
          "class": bem$14("top-info")
        }, [slots["top-info"] ? slots["top-info"](props2.item) : topInfo]);
      }
    };
    const renderBottomInfo = () => {
      const {
        bottomInfo
      } = props2.item;
      if (bottomInfo || slots["bottom-info"]) {
        return vue.createVNode("div", {
          "class": bem$14("bottom-info")
        }, [slots["bottom-info"] ? slots["bottom-info"](props2.item) : bottomInfo]);
      }
    };
    const renderContent = () => {
      const {
        item,
        color,
        rowHeight
      } = props2;
      const {
        type,
        text
      } = item;
      const Nodes = [renderTopInfo(), text, renderBottomInfo()];
      if (type === "selected") {
        return vue.createVNode("div", {
          "class": bem$14("selected-day"),
          "style": {
            width: rowHeight,
            height: rowHeight,
            background: color
          }
        }, [Nodes]);
      }
      return Nodes;
    };
    return () => {
      const {
        type,
        className
      } = props2.item;
      if (type === "placeholder") {
        return vue.createVNode("div", {
          "class": bem$14("day"),
          "style": style.value
        }, null);
      }
      return vue.createVNode("div", {
        "role": "gridcell",
        "style": style.value,
        "class": [bem$14("day", type), className],
        "tabindex": type === "disabled" ? void 0 : -1,
        "onClick": onClick
      }, [renderContent()]);
    };
  }
});
const [name$16] = createNamespace("calendar-month");
const calendarMonthProps = {
  date: makeRequiredProp(Date),
  type: String,
  color: String,
  minDate: makeRequiredProp(Date),
  maxDate: makeRequiredProp(Date),
  showMark: Boolean,
  rowHeight: numericProp,
  formatter: Function,
  lazyRender: Boolean,
  currentDate: [Date, Array],
  allowSameDay: Boolean,
  showSubtitle: Boolean,
  showMonthTitle: Boolean,
  firstDayOfWeek: Number
};
var stdin_default$1g = vue.defineComponent({
  name: name$16,
  props: calendarMonthProps,
  emits: ["click"],
  setup(props2, {
    emit,
    slots
  }) {
    const [visible, setVisible] = use.useToggle();
    const daysRef = vue.ref();
    const monthRef = vue.ref();
    const height = useHeight(monthRef);
    const title = vue.computed(() => formatMonthTitle(props2.date));
    const rowHeight = vue.computed(() => addUnit(props2.rowHeight));
    const offset = vue.computed(() => {
      const realDay = props2.date.getDay();
      if (props2.firstDayOfWeek) {
        return (realDay + 7 - props2.firstDayOfWeek) % 7;
      }
      return realDay;
    });
    const totalDay = vue.computed(() => getMonthEndDay(props2.date.getFullYear(), props2.date.getMonth() + 1));
    const shouldRender = vue.computed(() => visible.value || !props2.lazyRender);
    const getTitle = () => title.value;
    const getMultipleDayType = (day) => {
      const isSelected = (date) => props2.currentDate.some((item) => compareDay(item, date) === 0);
      if (isSelected(day)) {
        const prevDay = getPrevDay(day);
        const nextDay = getNextDay(day);
        const prevSelected = isSelected(prevDay);
        const nextSelected = isSelected(nextDay);
        if (prevSelected && nextSelected) {
          return "multiple-middle";
        }
        if (prevSelected) {
          return "end";
        }
        if (nextSelected) {
          return "start";
        }
        return "multiple-selected";
      }
      return "";
    };
    const getRangeDayType = (day) => {
      const [startDay, endDay] = props2.currentDate;
      if (!startDay) {
        return "";
      }
      const compareToStart = compareDay(day, startDay);
      if (!endDay) {
        return compareToStart === 0 ? "start" : "";
      }
      const compareToEnd = compareDay(day, endDay);
      if (props2.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
        return "start-end";
      }
      if (compareToStart === 0) {
        return "start";
      }
      if (compareToEnd === 0) {
        return "end";
      }
      if (compareToStart > 0 && compareToEnd < 0) {
        return "middle";
      }
      return "";
    };
    const getDayType = (day) => {
      const {
        type,
        minDate,
        maxDate,
        currentDate
      } = props2;
      if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
        return "disabled";
      }
      if (currentDate === null) {
        return "";
      }
      if (Array.isArray(currentDate)) {
        if (type === "multiple") {
          return getMultipleDayType(day);
        }
        if (type === "range") {
          return getRangeDayType(day);
        }
      } else if (type === "single") {
        return compareDay(day, currentDate) === 0 ? "selected" : "";
      }
      return "";
    };
    const getBottomInfo = (dayType) => {
      if (props2.type === "range") {
        if (dayType === "start" || dayType === "end") {
          return t$g(dayType);
        }
        if (dayType === "start-end") {
          return `${t$g("start")}/${t$g("end")}`;
        }
      }
    };
    const renderTitle = () => {
      if (props2.showMonthTitle) {
        return vue.createVNode("div", {
          "class": bem$14("month-title")
        }, [slots["month-title"] ? slots["month-title"]({
          date: props2.date,
          text: title.value
        }) : title.value]);
      }
    };
    const renderMark = () => {
      if (props2.showMark && shouldRender.value) {
        return vue.createVNode("div", {
          "class": bem$14("month-mark")
        }, [props2.date.getMonth() + 1]);
      }
    };
    const placeholders = vue.computed(() => {
      const count = Math.ceil((totalDay.value + offset.value) / 7);
      return Array(count).fill({
        type: "placeholder"
      });
    });
    const days = vue.computed(() => {
      const days2 = [];
      const year = props2.date.getFullYear();
      const month = props2.date.getMonth();
      for (let day = 1; day <= totalDay.value; day++) {
        const date = new Date(year, month, day);
        const type = getDayType(date);
        let config = {
          date,
          type,
          text: day,
          bottomInfo: getBottomInfo(type)
        };
        if (props2.formatter) {
          config = props2.formatter(config);
        }
        days2.push(config);
      }
      return days2;
    });
    const disabledDays = vue.computed(() => days.value.filter((day) => day.type === "disabled"));
    const scrollToDate = (body, targetDate) => {
      if (daysRef.value) {
        const daysRect = use.useRect(daysRef.value);
        const totalRows = placeholders.value.length;
        const currentRow = Math.ceil((targetDate.getDate() + offset.value) / 7);
        const rowOffset = (currentRow - 1) * daysRect.height / totalRows;
        setScrollTop(body, daysRect.top + rowOffset + body.scrollTop - use.useRect(body).top);
      }
    };
    const renderDay = (item, index) => vue.createVNode(stdin_default$1h, {
      "item": item,
      "index": index,
      "color": props2.color,
      "offset": offset.value,
      "rowHeight": rowHeight.value,
      "onClick": (item2) => emit("click", item2)
    }, pick(slots, ["top-info", "bottom-info"]));
    const renderDays = () => vue.createVNode("div", {
      "ref": daysRef,
      "role": "grid",
      "class": bem$14("days")
    }, [renderMark(), (shouldRender.value ? days : placeholders).value.map(renderDay)]);
    useExpose({
      getTitle,
      getHeight: () => height.value,
      setVisible,
      scrollToDate,
      disabledDays
    });
    return () => vue.createVNode("div", {
      "class": bem$14("month"),
      "ref": monthRef
    }, [renderTitle(), renderDays()]);
  }
});
const [name$15] = createNamespace("calendar-header");
var stdin_default$1f = vue.defineComponent({
  name: name$15,
  props: {
    date: Date,
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },
  emits: ["clickSubtitle"],
  setup(props2, {
    slots,
    emit
  }) {
    const renderTitle = () => {
      if (props2.showTitle) {
        const text = props2.title || t$g("title");
        const title = slots.title ? slots.title() : text;
        return vue.createVNode("div", {
          "class": bem$14("header-title")
        }, [title]);
      }
    };
    const onClickSubtitle = (event) => emit("clickSubtitle", event);
    const renderSubtitle = () => {
      if (props2.showSubtitle) {
        const title = slots.subtitle ? slots.subtitle({
          date: props2.date,
          text: props2.subtitle
        }) : props2.subtitle;
        return vue.createVNode("div", {
          "class": bem$14("header-subtitle"),
          "onClick": onClickSubtitle
        }, [title]);
      }
    };
    const renderWeekDays = () => {
      const {
        firstDayOfWeek
      } = props2;
      const weekdays = t$g("weekdays");
      const renderWeekDays2 = [...weekdays.slice(firstDayOfWeek, 7), ...weekdays.slice(0, firstDayOfWeek)];
      return vue.createVNode("div", {
        "class": bem$14("weekdays")
      }, [renderWeekDays2.map((text) => vue.createVNode("span", {
        "class": bem$14("weekday")
      }, [text]))]);
    };
    return () => vue.createVNode("div", {
      "class": bem$14("header")
    }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
  }
});
const calendarProps = {
  show: Boolean,
  type: makeStringProp("single"),
  title: String,
  color: String,
  round: truthProp,
  readonly: Boolean,
  poppable: truthProp,
  maxRange: makeNumericProp(null),
  position: makeStringProp("bottom"),
  teleport: [String, Object],
  showMark: truthProp,
  showTitle: truthProp,
  formatter: Function,
  rowHeight: numericProp,
  confirmText: String,
  rangePrompt: String,
  lazyRender: truthProp,
  showConfirm: truthProp,
  defaultDate: [Date, Array],
  allowSameDay: Boolean,
  showSubtitle: truthProp,
  closeOnPopstate: truthProp,
  showRangePrompt: truthProp,
  confirmDisabledText: String,
  closeOnClickOverlay: truthProp,
  safeAreaInsetTop: Boolean,
  safeAreaInsetBottom: truthProp,
  minDate: {
    type: Date,
    validator: isDate,
    default: getToday
  },
  maxDate: {
    type: Date,
    validator: isDate,
    default: () => {
      const now = getToday();
      return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
    }
  },
  firstDayOfWeek: {
    type: numericProp,
    default: 0,
    validator: (val) => val >= 0 && val <= 6
  }
};
var stdin_default$1e = vue.defineComponent({
  name: name$18,
  props: calendarProps,
  emits: ["select", "confirm", "unselect", "monthShow", "overRange", "update:show", "clickSubtitle"],
  setup(props2, {
    emit,
    slots
  }) {
    const limitDateRange = (date, minDate = props2.minDate, maxDate = props2.maxDate) => {
      if (compareDay(date, minDate) === -1) {
        return minDate;
      }
      if (compareDay(date, maxDate) === 1) {
        return maxDate;
      }
      return date;
    };
    const getInitialDate = (defaultDate = props2.defaultDate) => {
      const {
        type,
        minDate,
        maxDate,
        allowSameDay
      } = props2;
      if (defaultDate === null) {
        return defaultDate;
      }
      const now = getToday();
      if (type === "range") {
        if (!Array.isArray(defaultDate)) {
          defaultDate = [];
        }
        const start = limitDateRange(defaultDate[0] || now, minDate, allowSameDay ? maxDate : getPrevDay(maxDate));
        const end = limitDateRange(defaultDate[1] || now, allowSameDay ? minDate : getNextDay(minDate));
        return [start, end];
      }
      if (type === "multiple") {
        if (Array.isArray(defaultDate)) {
          return defaultDate.map((date) => limitDateRange(date));
        }
        return [limitDateRange(now)];
      }
      if (!defaultDate || Array.isArray(defaultDate)) {
        defaultDate = now;
      }
      return limitDateRange(defaultDate);
    };
    let bodyHeight;
    const bodyRef = vue.ref();
    const subtitle = vue.ref({
      text: "",
      date: void 0
    });
    const currentDate = vue.ref(getInitialDate());
    const [monthRefs, setMonthRefs] = useRefs();
    const dayOffset = vue.computed(() => props2.firstDayOfWeek ? +props2.firstDayOfWeek % 7 : 0);
    const months = vue.computed(() => {
      const months2 = [];
      const cursor = new Date(props2.minDate);
      cursor.setDate(1);
      do {
        months2.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, props2.maxDate) !== 1);
      return months2;
    });
    const buttonDisabled = vue.computed(() => {
      if (currentDate.value) {
        if (props2.type === "range") {
          return !currentDate.value[0] || !currentDate.value[1];
        }
        if (props2.type === "multiple") {
          return !currentDate.value.length;
        }
      }
      return !currentDate.value;
    });
    const getSelectedDate = () => currentDate.value;
    const onScroll = () => {
      const top = getScrollTop(bodyRef.value);
      const bottom = top + bodyHeight;
      const heights = months.value.map((item, index) => monthRefs.value[index].getHeight());
      const heightSum = heights.reduce((a, b) => a + b, 0);
      if (bottom > heightSum && top > 0) {
        return;
      }
      let height = 0;
      let currentMonth;
      const visibleRange = [-1, -1];
      for (let i = 0; i < months.value.length; i++) {
        const month = monthRefs.value[i];
        const visible = height <= bottom && height + heights[i] >= top;
        if (visible) {
          visibleRange[1] = i;
          if (!currentMonth) {
            currentMonth = month;
            visibleRange[0] = i;
          }
          if (!monthRefs.value[i].showed) {
            monthRefs.value[i].showed = true;
            emit("monthShow", {
              date: month.date,
              title: month.getTitle()
            });
          }
        }
        height += heights[i];
      }
      months.value.forEach((month, index) => {
        const visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
        monthRefs.value[index].setVisible(visible);
      });
      if (currentMonth) {
        subtitle.value = {
          text: currentMonth.getTitle(),
          date: currentMonth.date
        };
      }
    };
    const scrollToDate = (targetDate) => {
      use.raf(() => {
        months.value.some((month, index) => {
          if (compareMonth(month, targetDate) === 0) {
            if (bodyRef.value) {
              monthRefs.value[index].scrollToDate(bodyRef.value, targetDate);
            }
            return true;
          }
          return false;
        });
        onScroll();
      });
    };
    const scrollToCurrentDate = () => {
      if (props2.poppable && !props2.show) {
        return;
      }
      if (currentDate.value) {
        const targetDate = props2.type === "single" ? currentDate.value : currentDate.value[0];
        if (isDate(targetDate)) {
          scrollToDate(targetDate);
        }
      } else {
        use.raf(onScroll);
      }
    };
    const init = () => {
      if (props2.poppable && !props2.show) {
        return;
      }
      use.raf(() => {
        bodyHeight = Math.floor(use.useRect(bodyRef).height);
      });
      scrollToCurrentDate();
    };
    const reset = (date = getInitialDate()) => {
      currentDate.value = date;
      scrollToCurrentDate();
    };
    const checkRange = (date) => {
      const {
        maxRange,
        rangePrompt,
        showRangePrompt
      } = props2;
      if (maxRange && calcDateNum(date) > +maxRange) {
        if (showRangePrompt) {
          showToast(rangePrompt || t$g("rangePrompt", maxRange));
        }
        emit("overRange");
        return false;
      }
      return true;
    };
    const onConfirm = () => {
      var _a;
      return emit("confirm", (_a = currentDate.value) != null ? _a : cloneDates(currentDate.value));
    };
    const select = (date, complete) => {
      const setCurrentDate = (date2) => {
        currentDate.value = date2;
        emit("select", cloneDates(date2));
      };
      if (complete && props2.type === "range") {
        const valid = checkRange(date);
        if (!valid) {
          setCurrentDate([date[0], getDayByOffset(date[0], +props2.maxRange - 1)]);
          return;
        }
      }
      setCurrentDate(date);
      if (complete && !props2.showConfirm) {
        onConfirm();
      }
    };
    const getDisabledDate = (disabledDays2, startDay, date) => {
      var _a;
      return (_a = disabledDays2.find((day) => compareDay(startDay, day.date) === -1 && compareDay(day.date, date) === -1)) == null ? void 0 : _a.date;
    };
    const disabledDays = vue.computed(() => monthRefs.value.reduce((arr, ref2) => {
      var _a, _b;
      arr.push(...(_b = (_a = ref2.disabledDays) == null ? void 0 : _a.value) != null ? _b : []);
      return arr;
    }, []));
    const onClickDay = (item) => {
      if (props2.readonly || !item.date) {
        return;
      }
      const {
        date
      } = item;
      const {
        type
      } = props2;
      if (type === "range") {
        if (!currentDate.value) {
          select([date]);
          return;
        }
        const [startDay, endDay] = currentDate.value;
        if (startDay && !endDay) {
          const compareToStart = compareDay(date, startDay);
          if (compareToStart === 1) {
            const disabledDay = getDisabledDate(disabledDays.value, startDay, date);
            if (disabledDay) {
              const endDay2 = getPrevDay(disabledDay);
              if (compareDay(startDay, endDay2) === -1) {
                select([startDay, endDay2]);
              } else {
                select([date]);
              }
            } else {
              select([startDay, date], true);
            }
          } else if (compareToStart === -1) {
            select([date]);
          } else if (props2.allowSameDay) {
            select([date, date], true);
          }
        } else {
          select([date]);
        }
      } else if (type === "multiple") {
        if (!currentDate.value) {
          select([date]);
          return;
        }
        const dates = currentDate.value;
        const selectedIndex = dates.findIndex((dateItem) => compareDay(dateItem, date) === 0);
        if (selectedIndex !== -1) {
          const [unselectedDate] = dates.splice(selectedIndex, 1);
          emit("unselect", cloneDate(unselectedDate));
        } else if (props2.maxRange && dates.length >= +props2.maxRange) {
          showToast(props2.rangePrompt || t$g("rangePrompt", props2.maxRange));
        } else {
          select([...dates, date]);
        }
      } else {
        select(date, true);
      }
    };
    const updateShow = (value) => emit("update:show", value);
    const renderMonth = (date, index) => {
      const showMonthTitle = index !== 0 || !props2.showSubtitle;
      return vue.createVNode(stdin_default$1g, vue.mergeProps({
        "ref": setMonthRefs(index),
        "date": date,
        "currentDate": currentDate.value,
        "showMonthTitle": showMonthTitle,
        "firstDayOfWeek": dayOffset.value
      }, pick(props2, ["type", "color", "minDate", "maxDate", "showMark", "formatter", "rowHeight", "lazyRender", "showSubtitle", "allowSameDay"]), {
        "onClick": onClickDay
      }), pick(slots, ["top-info", "bottom-info", "month-title"]));
    };
    const renderFooterButton = () => {
      if (slots.footer) {
        return slots.footer();
      }
      if (props2.showConfirm) {
        const slot = slots["confirm-text"];
        const disabled = buttonDisabled.value;
        const text = disabled ? props2.confirmDisabledText : props2.confirmText;
        return vue.createVNode(Button, {
          "round": true,
          "block": true,
          "type": "primary",
          "color": props2.color,
          "class": bem$14("confirm"),
          "disabled": disabled,
          "nativeType": "button",
          "onClick": onConfirm
        }, {
          default: () => [slot ? slot({
            disabled
          }) : text || t$g("confirm")]
        });
      }
    };
    const renderFooter = () => vue.createVNode("div", {
      "class": [bem$14("footer"), {
        "van-safe-area-bottom": props2.safeAreaInsetBottom
      }]
    }, [renderFooterButton()]);
    const renderCalendar = () => vue.createVNode("div", {
      "class": bem$14()
    }, [vue.createVNode(stdin_default$1f, {
      "date": subtitle.value.date,
      "title": props2.title,
      "subtitle": subtitle.value.text,
      "showTitle": props2.showTitle,
      "showSubtitle": props2.showSubtitle,
      "firstDayOfWeek": dayOffset.value,
      "onClickSubtitle": (event) => emit("clickSubtitle", event)
    }, pick(slots, ["title", "subtitle"])), vue.createVNode("div", {
      "ref": bodyRef,
      "class": bem$14("body"),
      "onScroll": onScroll
    }, [months.value.map(renderMonth)]), renderFooter()]);
    vue.watch(() => props2.show, init);
    vue.watch(() => [props2.type, props2.minDate, props2.maxDate], () => reset(getInitialDate(currentDate.value)));
    vue.watch(() => props2.defaultDate, (value = null) => {
      currentDate.value = value;
      scrollToCurrentDate();
    });
    useExpose({
      reset,
      scrollToDate,
      getSelectedDate
    });
    use.onMountedOrActivated(init);
    return () => {
      if (props2.poppable) {
        return vue.createVNode(Popup, {
          "show": props2.show,
          "class": bem$14("popup"),
          "round": props2.round,
          "position": props2.position,
          "closeable": props2.showTitle || props2.showSubtitle,
          "teleport": props2.teleport,
          "closeOnPopstate": props2.closeOnPopstate,
          "safeAreaInsetTop": props2.safeAreaInsetTop,
          "closeOnClickOverlay": props2.closeOnClickOverlay,
          "onUpdate:show": updateShow
        }, {
          default: renderCalendar
        });
      }
      return renderCalendar();
    };
  }
});
const Calendar = withInstall(stdin_default$1e);
const [name$14, bem$13] = createNamespace("image");
const imageProps = {
  src: String,
  alt: String,
  fit: String,
  position: String,
  round: Boolean,
  block: Boolean,
  width: numericProp,
  height: numericProp,
  radius: numericProp,
  lazyLoad: Boolean,
  iconSize: numericProp,
  showError: truthProp,
  errorIcon: makeStringProp("photo-fail"),
  iconPrefix: String,
  showLoading: truthProp,
  loadingIcon: makeStringProp("photo")
};
var stdin_default$1d = vue.defineComponent({
  name: name$14,
  props: imageProps,
  emits: ["load", "error"],
  setup(props2, {
    emit,
    slots
  }) {
    const error = vue.ref(false);
    const loading = vue.ref(true);
    const imageRef = vue.ref();
    const {
      $Lazyload
    } = vue.getCurrentInstance().proxy;
    const style = vue.computed(() => {
      const style2 = {
        width: addUnit(props2.width),
        height: addUnit(props2.height)
      };
      if (isDef(props2.radius)) {
        style2.overflow = "hidden";
        style2.borderRadius = addUnit(props2.radius);
      }
      return style2;
    });
    vue.watch(() => props2.src, () => {
      error.value = false;
      loading.value = true;
    });
    const onLoad = (event) => {
      if (loading.value) {
        loading.value = false;
        emit("load", event);
      }
    };
    const triggerLoad = () => {
      const loadEvent = new Event("load");
      Object.defineProperty(loadEvent, "target", {
        value: imageRef.value,
        enumerable: true
      });
      onLoad(loadEvent);
    };
    const onError = (event) => {
      error.value = true;
      loading.value = false;
      emit("error", event);
    };
    const renderIcon = (name2, className, slot) => {
      if (slot) {
        return slot();
      }
      return vue.createVNode(Icon, {
        "name": name2,
        "size": props2.iconSize,
        "class": className,
        "classPrefix": props2.iconPrefix
      }, null);
    };
    const renderPlaceholder = () => {
      if (loading.value && props2.showLoading) {
        return vue.createVNode("div", {
          "class": bem$13("loading")
        }, [renderIcon(props2.loadingIcon, bem$13("loading-icon"), slots.loading)]);
      }
      if (error.value && props2.showError) {
        return vue.createVNode("div", {
          "class": bem$13("error")
        }, [renderIcon(props2.errorIcon, bem$13("error-icon"), slots.error)]);
      }
    };
    const renderImage = () => {
      if (error.value || !props2.src) {
        return;
      }
      const attrs = {
        alt: props2.alt,
        class: bem$13("img"),
        style: {
          objectFit: props2.fit,
          objectPosition: props2.position
        }
      };
      if (props2.lazyLoad) {
        return vue.withDirectives(vue.createVNode("img", vue.mergeProps({
          "ref": imageRef
        }, attrs), null), [[vue.resolveDirective("lazy"), props2.src]]);
      }
      return vue.createVNode("img", vue.mergeProps({
        "ref": imageRef,
        "src": props2.src,
        "onLoad": onLoad,
        "onError": onError
      }, attrs), null);
    };
    const onLazyLoaded = ({
      el
    }) => {
      const check = () => {
        if (el === imageRef.value && loading.value) {
          triggerLoad();
        }
      };
      if (imageRef.value) {
        check();
      } else {
        vue.nextTick(check);
      }
    };
    const onLazyLoadError = ({
      el
    }) => {
      if (el === imageRef.value && !error.value) {
        onError();
      }
    };
    if ($Lazyload && inBrowser) {
      $Lazyload.$on("loaded", onLazyLoaded);
      $Lazyload.$on("error", onLazyLoadError);
      vue.onBeforeUnmount(() => {
        $Lazyload.$off("loaded", onLazyLoaded);
        $Lazyload.$off("error", onLazyLoadError);
      });
    }
    vue.onMounted(() => {
      vue.nextTick(() => {
        var _a;
        if (((_a = imageRef.value) == null ? void 0 : _a.complete) && !props2.lazyLoad) {
          triggerLoad();
        }
      });
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "class": bem$13({
          round: props2.round,
          block: props2.block
        }),
        "style": style.value
      }, [renderImage(), renderPlaceholder(), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const Image$1 = withInstall(stdin_default$1d);
const [name$13, bem$12] = createNamespace("card");
const cardProps = {
  tag: String,
  num: numericProp,
  desc: String,
  thumb: String,
  title: String,
  price: numericProp,
  centered: Boolean,
  lazyLoad: Boolean,
  currency: makeStringProp("¥"),
  thumbLink: String,
  originPrice: numericProp
};
var stdin_default$1c = vue.defineComponent({
  name: name$13,
  props: cardProps,
  emits: ["clickThumb"],
  setup(props2, {
    slots,
    emit
  }) {
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props2.title) {
        return vue.createVNode("div", {
          "class": [bem$12("title"), "van-multi-ellipsis--l2"]
        }, [props2.title]);
      }
    };
    const renderThumbTag = () => {
      if (slots.tag || props2.tag) {
        return vue.createVNode("div", {
          "class": bem$12("tag")
        }, [slots.tag ? slots.tag() : vue.createVNode(Tag, {
          "mark": true,
          "type": "primary"
        }, {
          default: () => [props2.tag]
        })]);
      }
    };
    const renderThumbImage = () => {
      if (slots.thumb) {
        return slots.thumb();
      }
      return vue.createVNode(Image$1, {
        "src": props2.thumb,
        "fit": "cover",
        "width": "100%",
        "height": "100%",
        "lazyLoad": props2.lazyLoad
      }, null);
    };
    const renderThumb = () => {
      if (slots.thumb || props2.thumb) {
        return vue.createVNode("a", {
          "href": props2.thumbLink,
          "class": bem$12("thumb"),
          "onClick": (event) => emit("clickThumb", event)
        }, [renderThumbImage(), renderThumbTag()]);
      }
    };
    const renderDesc = () => {
      if (slots.desc) {
        return slots.desc();
      }
      if (props2.desc) {
        return vue.createVNode("div", {
          "class": [bem$12("desc"), "van-ellipsis"]
        }, [props2.desc]);
      }
    };
    const renderPriceText = () => {
      const priceArr = props2.price.toString().split(".");
      return vue.createVNode("div", null, [vue.createVNode("span", {
        "class": bem$12("price-currency")
      }, [props2.currency]), vue.createVNode("span", {
        "class": bem$12("price-integer")
      }, [priceArr[0]]), vue.createTextVNode("."), vue.createVNode("span", {
        "class": bem$12("price-decimal")
      }, [priceArr[1]])]);
    };
    return () => {
      var _a, _b, _c;
      const showNum = slots.num || isDef(props2.num);
      const showPrice = slots.price || isDef(props2.price);
      const showOriginPrice = slots["origin-price"] || isDef(props2.originPrice);
      const showBottom = showNum || showPrice || showOriginPrice || slots.bottom;
      const Price = showPrice && vue.createVNode("div", {
        "class": bem$12("price")
      }, [slots.price ? slots.price() : renderPriceText()]);
      const OriginPrice = showOriginPrice && vue.createVNode("div", {
        "class": bem$12("origin-price")
      }, [slots["origin-price"] ? slots["origin-price"]() : `${props2.currency} ${props2.originPrice}`]);
      const Num = showNum && vue.createVNode("div", {
        "class": bem$12("num")
      }, [slots.num ? slots.num() : `x${props2.num}`]);
      const Footer = slots.footer && vue.createVNode("div", {
        "class": bem$12("footer")
      }, [slots.footer()]);
      const Bottom = showBottom && vue.createVNode("div", {
        "class": bem$12("bottom")
      }, [(_a = slots["price-top"]) == null ? void 0 : _a.call(slots), Price, OriginPrice, Num, (_b = slots.bottom) == null ? void 0 : _b.call(slots)]);
      return vue.createVNode("div", {
        "class": bem$12()
      }, [vue.createVNode("div", {
        "class": bem$12("header")
      }, [renderThumb(), vue.createVNode("div", {
        "class": bem$12("content", {
          centered: props2.centered
        })
      }, [vue.createVNode("div", null, [renderTitle(), renderDesc(), (_c = slots.tags) == null ? void 0 : _c.call(slots)]), Bottom])]), Footer]);
    };
  }
});
const Card = withInstall(stdin_default$1c);
const [name$12, bem$11, t$f] = createNamespace("cascader");
const cascaderProps = {
  title: String,
  options: makeArrayProp(),
  closeable: truthProp,
  swipeable: truthProp,
  closeIcon: makeStringProp("cross"),
  showHeader: truthProp,
  modelValue: numericProp,
  fieldNames: Object,
  placeholder: String,
  activeColor: String
};
var stdin_default$1b = vue.defineComponent({
  name: name$12,
  props: cascaderProps,
  emits: ["close", "change", "finish", "clickTab", "update:modelValue"],
  setup(props2, {
    slots,
    emit
  }) {
    const tabs = vue.ref([]);
    const activeTab = vue.ref(0);
    const [selectedElementRefs, setSelectedElementRefs] = useRefs();
    const {
      text: textKey,
      value: valueKey,
      children: childrenKey
    } = extend({
      text: "text",
      value: "value",
      children: "children"
    }, props2.fieldNames);
    const getSelectedOptionsByValue = (options, value) => {
      for (const option of options) {
        if (option[valueKey] === value) {
          return [option];
        }
        if (option[childrenKey]) {
          const selectedOptions = getSelectedOptionsByValue(option[childrenKey], value);
          if (selectedOptions) {
            return [option, ...selectedOptions];
          }
        }
      }
    };
    const updateTabs = () => {
      const {
        options,
        modelValue
      } = props2;
      if (modelValue !== void 0) {
        const selectedOptions = getSelectedOptionsByValue(options, modelValue);
        if (selectedOptions) {
          let optionsCursor = options;
          tabs.value = selectedOptions.map((option) => {
            const tab = {
              options: optionsCursor,
              selected: option
            };
            const next = optionsCursor.find((item) => item[valueKey] === option[valueKey]);
            if (next) {
              optionsCursor = next[childrenKey];
            }
            return tab;
          });
          if (optionsCursor) {
            tabs.value.push({
              options: optionsCursor,
              selected: null
            });
          }
          vue.nextTick(() => {
            activeTab.value = tabs.value.length - 1;
          });
          return;
        }
      }
      tabs.value = [{
        options,
        selected: null
      }];
    };
    const onSelect = (option, tabIndex) => {
      if (option.disabled) {
        return;
      }
      tabs.value[tabIndex].selected = option;
      if (tabs.value.length > tabIndex + 1) {
        tabs.value = tabs.value.slice(0, tabIndex + 1);
      }
      if (option[childrenKey]) {
        const nextTab = {
          options: option[childrenKey],
          selected: null
        };
        if (tabs.value[tabIndex + 1]) {
          tabs.value[tabIndex + 1] = nextTab;
        } else {
          tabs.value.push(nextTab);
        }
        vue.nextTick(() => {
          activeTab.value++;
        });
      }
      const selectedOptions = tabs.value.map((tab) => tab.selected).filter(Boolean);
      emit("update:modelValue", option[valueKey]);
      const params = {
        value: option[valueKey],
        tabIndex,
        selectedOptions
      };
      emit("change", params);
      if (!option[childrenKey]) {
        emit("finish", params);
      }
    };
    const onClose = () => emit("close");
    const onClickTab = ({
      name: name2,
      title
    }) => emit("clickTab", name2, title);
    const renderHeader = () => props2.showHeader ? vue.createVNode("div", {
      "class": bem$11("header")
    }, [vue.createVNode("h2", {
      "class": bem$11("title")
    }, [slots.title ? slots.title() : props2.title]), props2.closeable ? vue.createVNode(Icon, {
      "name": props2.closeIcon,
      "class": [bem$11("close-icon"), HAPTICS_FEEDBACK],
      "onClick": onClose
    }, null) : null]) : null;
    const renderOption = (option, selectedOption, tabIndex) => {
      const {
        disabled
      } = option;
      const selected = !!(selectedOption && option[valueKey] === selectedOption[valueKey]);
      const color = option.color || (selected ? props2.activeColor : void 0);
      const Text = slots.option ? slots.option({
        option,
        selected
      }) : vue.createVNode("span", null, [option[textKey]]);
      return vue.createVNode("li", {
        "ref": selected ? setSelectedElementRefs(tabIndex) : void 0,
        "role": "menuitemradio",
        "class": [bem$11("option", {
          selected,
          disabled
        }), option.className],
        "style": {
          color
        },
        "tabindex": disabled ? void 0 : selected ? 0 : -1,
        "aria-checked": selected,
        "aria-disabled": disabled || void 0,
        "onClick": () => onSelect(option, tabIndex)
      }, [Text, selected ? vue.createVNode(Icon, {
        "name": "success",
        "class": bem$11("selected-icon")
      }, null) : null]);
    };
    const renderOptions = (options, selectedOption, tabIndex) => vue.createVNode("ul", {
      "role": "menu",
      "class": bem$11("options")
    }, [options.map((option) => renderOption(option, selectedOption, tabIndex))]);
    const renderTab = (tab, tabIndex) => {
      const {
        options,
        selected
      } = tab;
      const placeholder = props2.placeholder || t$f("select");
      const title = selected ? selected[textKey] : placeholder;
      return vue.createVNode(Tab, {
        "title": title,
        "titleClass": bem$11("tab", {
          unselected: !selected
        })
      }, {
        default: () => {
          var _a, _b;
          return [(_a = slots["options-top"]) == null ? void 0 : _a.call(slots, {
            tabIndex
          }), renderOptions(options, selected, tabIndex), (_b = slots["options-bottom"]) == null ? void 0 : _b.call(slots, {
            tabIndex
          })];
        }
      });
    };
    const renderTabs = () => vue.createVNode(Tabs, {
      "active": activeTab.value,
      "onUpdate:active": ($event) => activeTab.value = $event,
      "shrink": true,
      "animated": true,
      "class": bem$11("tabs"),
      "color": props2.activeColor,
      "swipeable": props2.swipeable,
      "onClickTab": onClickTab
    }, {
      default: () => [tabs.value.map(renderTab)]
    });
    const scrollIntoView = (el) => {
      const scrollParent = el.parentElement;
      if (scrollParent) {
        scrollParent.scrollTop = el.offsetTop - (scrollParent.offsetHeight - el.offsetHeight) / 2;
      }
    };
    updateTabs();
    vue.watch(activeTab, (value) => {
      const el = selectedElementRefs.value[value];
      if (el)
        scrollIntoView(el);
    });
    vue.watch(() => props2.options, updateTabs, {
      deep: true
    });
    vue.watch(() => props2.modelValue, (value) => {
      if (value !== void 0) {
        const values = tabs.value.map((tab) => {
          var _a;
          return (_a = tab.selected) == null ? void 0 : _a[valueKey];
        });
        if (values.includes(value)) {
          return;
        }
      }
      updateTabs();
    });
    return () => vue.createVNode("div", {
      "class": bem$11()
    }, [renderHeader(), renderTabs()]);
  }
});
const Cascader = withInstall(stdin_default$1b);
const [name$11, bem$10] = createNamespace("cell-group");
const cellGroupProps = {
  title: String,
  inset: Boolean,
  border: truthProp
};
var stdin_default$1a = vue.defineComponent({
  name: name$11,
  inheritAttrs: false,
  props: cellGroupProps,
  setup(props2, {
    slots,
    attrs
  }) {
    const renderGroup = () => {
      var _a;
      return vue.createVNode("div", vue.mergeProps({
        "class": [bem$10({
          inset: props2.inset
        }), {
          [BORDER_TOP_BOTTOM]: props2.border && !props2.inset
        }]
      }, attrs), [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    const renderTitle = () => vue.createVNode("div", {
      "class": bem$10("title", {
        inset: props2.inset
      })
    }, [slots.title ? slots.title() : props2.title]);
    return () => {
      if (props2.title || slots.title) {
        return vue.createVNode(vue.Fragment, null, [renderTitle(), renderGroup()]);
      }
      return renderGroup();
    };
  }
});
const CellGroup = withInstall(stdin_default$1a);
const [name$10, bem$$] = createNamespace("checkbox-group");
const checkboxGroupProps = {
  max: numericProp,
  shape: makeStringProp("round"),
  disabled: Boolean,
  iconSize: numericProp,
  direction: String,
  modelValue: makeArrayProp(),
  checkedColor: String
};
const CHECKBOX_GROUP_KEY = Symbol(name$10);
var stdin_default$19 = vue.defineComponent({
  name: name$10,
  props: checkboxGroupProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      children,
      linkChildren
    } = use.useChildren(CHECKBOX_GROUP_KEY);
    const updateValue = (value) => emit("update:modelValue", value);
    const toggleAll = (options = {}) => {
      if (typeof options === "boolean") {
        options = {
          checked: options
        };
      }
      const {
        checked,
        skipDisabled
      } = options;
      const checkedChildren = children.filter((item) => {
        if (!item.props.bindGroup) {
          return false;
        }
        if (item.props.disabled && skipDisabled) {
          return item.checked.value;
        }
        return checked != null ? checked : !item.checked.value;
      });
      const names = checkedChildren.map((item) => item.name);
      updateValue(names);
    };
    vue.watch(() => props2.modelValue, (value) => emit("change", value));
    useExpose({
      toggleAll
    });
    use.useCustomFieldValue(() => props2.modelValue);
    linkChildren({
      props: props2,
      updateValue
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "class": bem$$([props2.direction])
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const [name$$, bem$_] = createNamespace("checkbox");
const checkboxProps = extend({}, checkerProps, {
  shape: String,
  bindGroup: truthProp
});
var stdin_default$18 = vue.defineComponent({
  name: name$$,
  props: checkboxProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      parent
    } = use.useParent(CHECKBOX_GROUP_KEY);
    const setParentValue = (checked2) => {
      const {
        name: name2
      } = props2;
      const {
        max,
        modelValue
      } = parent.props;
      const value = modelValue.slice();
      if (checked2) {
        const overlimit = max && value.length >= +max;
        if (!overlimit && !value.includes(name2)) {
          value.push(name2);
          if (props2.bindGroup) {
            parent.updateValue(value);
          }
        }
      } else {
        const index = value.indexOf(name2);
        if (index !== -1) {
          value.splice(index, 1);
          if (props2.bindGroup) {
            parent.updateValue(value);
          }
        }
      }
    };
    const checked = vue.computed(() => {
      if (parent && props2.bindGroup) {
        return parent.props.modelValue.indexOf(props2.name) !== -1;
      }
      return !!props2.modelValue;
    });
    const toggle = (newValue = !checked.value) => {
      if (parent && props2.bindGroup) {
        setParentValue(newValue);
      } else {
        emit("update:modelValue", newValue);
      }
    };
    vue.watch(() => props2.modelValue, (value) => emit("change", value));
    useExpose({
      toggle,
      props: props2,
      checked
    });
    use.useCustomFieldValue(() => props2.modelValue);
    return () => vue.createVNode(stdin_default$1n, vue.mergeProps({
      "bem": bem$_,
      "role": "checkbox",
      "parent": parent,
      "checked": checked.value,
      "onToggle": toggle
    }, props2), pick(slots, ["default", "icon"]));
  }
});
const Checkbox = withInstall(stdin_default$18);
const CheckboxGroup = withInstall(stdin_default$19);
const [name$_, bem$Z] = createNamespace("circle");
let uid = 0;
const format = (rate) => Math.min(Math.max(+rate, 0), 100);
function getPath(clockwise, viewBoxSize) {
  const sweepFlag = clockwise ? 1 : 0;
  return `M ${viewBoxSize / 2} ${viewBoxSize / 2} m 0, -500 a 500, 500 0 1, ${sweepFlag} 0, 1000 a 500, 500 0 1, ${sweepFlag} 0, -1000`;
}
const circleProps = {
  text: String,
  size: numericProp,
  fill: makeStringProp("none"),
  rate: makeNumericProp(100),
  speed: makeNumericProp(0),
  color: [String, Object],
  clockwise: truthProp,
  layerColor: String,
  currentRate: makeNumberProp(0),
  strokeWidth: makeNumericProp(40),
  strokeLinecap: String,
  startPosition: makeStringProp("top")
};
var stdin_default$17 = vue.defineComponent({
  name: name$_,
  props: circleProps,
  emits: ["update:currentRate"],
  setup(props2, {
    emit,
    slots
  }) {
    const id = `van-circle-${uid++}`;
    const viewBoxSize = vue.computed(() => +props2.strokeWidth + 1e3);
    const path = vue.computed(() => getPath(props2.clockwise, viewBoxSize.value));
    const svgStyle = vue.computed(() => {
      const ROTATE_ANGLE_MAP = {
        top: 0,
        right: 90,
        bottom: 180,
        left: 270
      };
      const angleValue = ROTATE_ANGLE_MAP[props2.startPosition];
      if (angleValue) {
        return {
          transform: `rotate(${angleValue}deg)`
        };
      }
    });
    vue.watch(() => props2.rate, (rate) => {
      let rafId;
      const startTime = Date.now();
      const startRate = props2.currentRate;
      const endRate = format(rate);
      const duration = Math.abs((startRate - endRate) * 1e3 / +props2.speed);
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const rate2 = progress * (endRate - startRate) + startRate;
        emit("update:currentRate", format(parseFloat(rate2.toFixed(1))));
        if (endRate > startRate ? rate2 < endRate : rate2 > endRate) {
          rafId = use.raf(animate);
        }
      };
      if (props2.speed) {
        if (rafId) {
          use.cancelRaf(rafId);
        }
        rafId = use.raf(animate);
      } else {
        emit("update:currentRate", endRate);
      }
    }, {
      immediate: true
    });
    const renderHover = () => {
      const PERIMETER = 3140;
      const {
        strokeWidth,
        currentRate,
        strokeLinecap
      } = props2;
      const offset = PERIMETER * currentRate / 100;
      const color = isObject(props2.color) ? `url(#${id})` : props2.color;
      const style = {
        stroke: color,
        strokeWidth: `${+strokeWidth + 1}px`,
        strokeLinecap,
        strokeDasharray: `${offset}px ${PERIMETER}px`
      };
      return vue.createVNode("path", {
        "d": path.value,
        "style": style,
        "class": bem$Z("hover"),
        "stroke": color
      }, null);
    };
    const renderLayer = () => {
      const style = {
        fill: props2.fill,
        stroke: props2.layerColor,
        strokeWidth: `${props2.strokeWidth}px`
      };
      return vue.createVNode("path", {
        "class": bem$Z("layer"),
        "style": style,
        "d": path.value
      }, null);
    };
    const renderGradient = () => {
      const {
        color
      } = props2;
      if (!isObject(color)) {
        return;
      }
      const Stops = Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map((key, index) => vue.createVNode("stop", {
        "key": index,
        "offset": key,
        "stop-color": color[key]
      }, null));
      return vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
        "id": id,
        "x1": "100%",
        "y1": "0%",
        "x2": "0%",
        "y2": "0%"
      }, [Stops])]);
    };
    const renderText = () => {
      if (slots.default) {
        return slots.default();
      }
      if (props2.text) {
        return vue.createVNode("div", {
          "class": bem$Z("text")
        }, [props2.text]);
      }
    };
    return () => vue.createVNode("div", {
      "class": bem$Z(),
      "style": getSizeStyle(props2.size)
    }, [vue.createVNode("svg", {
      "viewBox": `0 0 ${viewBoxSize.value} ${viewBoxSize.value}`,
      "style": svgStyle.value
    }, [renderGradient(), renderLayer(), renderHover()]), renderText()]);
  }
});
const Circle = withInstall(stdin_default$17);
const [name$Z, bem$Y] = createNamespace("row");
const ROW_KEY = Symbol(name$Z);
const rowProps = {
  tag: makeStringProp("div"),
  wrap: truthProp,
  align: String,
  gutter: makeNumericProp(0),
  justify: String
};
var stdin_default$16 = vue.defineComponent({
  name: name$Z,
  props: rowProps,
  setup(props2, {
    slots
  }) {
    const {
      children,
      linkChildren
    } = use.useChildren(ROW_KEY);
    const groups = vue.computed(() => {
      const groups2 = [[]];
      let totalSpan = 0;
      children.forEach((child, index) => {
        totalSpan += Number(child.span);
        if (totalSpan > 24) {
          groups2.push([index]);
          totalSpan -= 24;
        } else {
          groups2[groups2.length - 1].push(index);
        }
      });
      return groups2;
    });
    const spaces = vue.computed(() => {
      const gutter = Number(props2.gutter);
      const spaces2 = [];
      if (!gutter) {
        return spaces2;
      }
      groups.value.forEach((group) => {
        const averagePadding = gutter * (group.length - 1) / group.length;
        group.forEach((item, index) => {
          if (index === 0) {
            spaces2.push({
              right: averagePadding
            });
          } else {
            const left = gutter - spaces2[item - 1].right;
            const right = averagePadding - left;
            spaces2.push({
              left,
              right
            });
          }
        });
      });
      return spaces2;
    });
    linkChildren({
      spaces
    });
    return () => {
      const {
        tag,
        wrap,
        align,
        justify
      } = props2;
      return vue.createVNode(tag, {
        "class": bem$Y({
          [`align-${align}`]: align,
          [`justify-${justify}`]: justify,
          nowrap: !wrap
        })
      }, {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    };
  }
});
const [name$Y, bem$X] = createNamespace("col");
const colProps = {
  tag: makeStringProp("div"),
  span: makeNumericProp(0),
  offset: numericProp
};
var stdin_default$15 = vue.defineComponent({
  name: name$Y,
  props: colProps,
  setup(props2, {
    slots
  }) {
    const {
      parent,
      index
    } = use.useParent(ROW_KEY);
    const style = vue.computed(() => {
      if (!parent) {
        return;
      }
      const {
        spaces
      } = parent;
      if (spaces && spaces.value && spaces.value[index.value]) {
        const {
          left,
          right
        } = spaces.value[index.value];
        return {
          paddingLeft: left ? `${left}px` : null,
          paddingRight: right ? `${right}px` : null
        };
      }
    });
    return () => {
      const {
        tag,
        span,
        offset
      } = props2;
      return vue.createVNode(tag, {
        "style": style.value,
        "class": bem$X({
          [span]: span,
          [`offset-${offset}`]: offset
        })
      }, {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    };
  }
});
const Col = withInstall(stdin_default$15);
const [name$X, bem$W] = createNamespace("collapse");
const COLLAPSE_KEY = Symbol(name$X);
const collapseProps = {
  border: truthProp,
  accordion: Boolean,
  modelValue: {
    type: [String, Number, Array],
    default: ""
  }
};
function validateModelValue(modelValue, accordion) {
  if (accordion && Array.isArray(modelValue)) {
    console.error('[Vant] Collapse: "v-model" should not be Array in accordion mode');
    return false;
  }
  if (!accordion && !Array.isArray(modelValue)) {
    console.error('[Vant] Collapse: "v-model" should be Array in non-accordion mode');
    return false;
  }
  return true;
}
var stdin_default$14 = vue.defineComponent({
  name: name$X,
  props: collapseProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      linkChildren,
      children
    } = use.useChildren(COLLAPSE_KEY);
    const updateName = (name2) => {
      emit("change", name2);
      emit("update:modelValue", name2);
    };
    const toggle = (name2, expanded) => {
      const {
        accordion,
        modelValue
      } = props2;
      if (accordion) {
        updateName(name2 === modelValue ? "" : name2);
      } else if (expanded) {
        updateName(modelValue.concat(name2));
      } else {
        updateName(modelValue.filter((activeName) => activeName !== name2));
      }
    };
    const toggleAll = (options = {}) => {
      if (props2.accordion) {
        return;
      }
      if (typeof options === "boolean") {
        options = {
          expanded: options
        };
      }
      const {
        expanded,
        skipDisabled
      } = options;
      const expandedChildren = children.filter((item) => {
        if (item.disabled && skipDisabled) {
          return item.expanded.value;
        }
        return expanded != null ? expanded : !item.expanded.value;
      });
      const names = expandedChildren.map((item) => item.itemName.value);
      updateName(names);
    };
    const isExpanded = (name2) => {
      const {
        accordion,
        modelValue
      } = props2;
      if (process.env.NODE_ENV !== "production" && !validateModelValue(modelValue, accordion)) {
        return false;
      }
      return accordion ? modelValue === name2 : modelValue.includes(name2);
    };
    useExpose({
      toggleAll
    });
    linkChildren({
      toggle,
      isExpanded
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "class": [bem$W(), {
          [BORDER_TOP_BOTTOM]: props2.border
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const Collapse = withInstall(stdin_default$14);
const [name$W, bem$V] = createNamespace("collapse-item");
const CELL_SLOTS = ["icon", "title", "value", "label", "right-icon"];
const collapseItemProps = extend({}, cellSharedProps, {
  name: numericProp,
  isLink: truthProp,
  disabled: Boolean,
  readonly: Boolean,
  lazyRender: truthProp
});
var stdin_default$13 = vue.defineComponent({
  name: name$W,
  props: collapseItemProps,
  setup(props2, {
    slots
  }) {
    const wrapperRef = vue.ref();
    const contentRef = vue.ref();
    const {
      parent,
      index
    } = use.useParent(COLLAPSE_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <CollapseItem> must be a child component of <Collapse>.");
      }
      return;
    }
    const name2 = vue.computed(() => {
      var _a;
      return (_a = props2.name) != null ? _a : index.value;
    });
    const expanded = vue.computed(() => parent.isExpanded(name2.value));
    const show = vue.ref(expanded.value);
    const lazyRender = useLazyRender(() => show.value || !props2.lazyRender);
    const onTransitionEnd = () => {
      if (!expanded.value) {
        show.value = false;
      } else if (wrapperRef.value) {
        wrapperRef.value.style.height = "";
      }
    };
    vue.watch(expanded, (value, oldValue) => {
      if (oldValue === null) {
        return;
      }
      if (value) {
        show.value = true;
      }
      const tick = value ? vue.nextTick : use.raf;
      tick(() => {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }
        const {
          offsetHeight
        } = contentRef.value;
        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`;
          wrapperRef.value.style.height = value ? "0" : contentHeight;
          use.doubleRaf(() => {
            if (wrapperRef.value) {
              wrapperRef.value.style.height = value ? contentHeight : "0";
            }
          });
        } else {
          onTransitionEnd();
        }
      });
    });
    const toggle = (newValue = !expanded.value) => {
      parent.toggle(name2.value, newValue);
    };
    const onClickTitle = () => {
      if (!props2.disabled && !props2.readonly) {
        toggle();
      }
    };
    const renderTitle = () => {
      const {
        border,
        disabled,
        readonly
      } = props2;
      const attrs = pick(props2, Object.keys(cellSharedProps));
      if (readonly) {
        attrs.isLink = false;
      }
      if (disabled || readonly) {
        attrs.clickable = false;
      }
      return vue.createVNode(Cell, vue.mergeProps({
        "role": "button",
        "class": bem$V("title", {
          disabled,
          expanded: expanded.value,
          borderless: !border
        }),
        "aria-expanded": String(expanded.value),
        "onClick": onClickTitle
      }, attrs), pick(slots, CELL_SLOTS));
    };
    const renderContent = lazyRender(() => {
      var _a;
      return vue.withDirectives(vue.createVNode("div", {
        "ref": wrapperRef,
        "class": bem$V("wrapper"),
        "onTransitionend": onTransitionEnd
      }, [vue.createVNode("div", {
        "ref": contentRef,
        "class": bem$V("content")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]), [[vue.vShow, show.value]]);
    });
    useExpose({
      toggle,
      expanded,
      itemName: name2
    });
    return () => vue.createVNode("div", {
      "class": [bem$V({
        border: index.value && props2.border
      })]
    }, [renderTitle(), renderContent()]);
  }
});
const CollapseItem = withInstall(stdin_default$13);
const ConfigProvider = withInstall(stdin_default$1R);
const [name$V, bem$U, t$e] = createNamespace("contact-card");
const contactCardProps = {
  tel: String,
  name: String,
  type: makeStringProp("add"),
  addText: String,
  editable: truthProp
};
var stdin_default$12 = vue.defineComponent({
  name: name$V,
  props: contactCardProps,
  emits: ["click"],
  setup(props2, {
    emit
  }) {
    const onClick = (event) => {
      if (props2.editable) {
        emit("click", event);
      }
    };
    const renderContent = () => {
      if (props2.type === "add") {
        return props2.addText || t$e("addContact");
      }
      return [vue.createVNode("div", null, [`${t$e("name")}：${props2.name}`]), vue.createVNode("div", null, [`${t$e("tel")}：${props2.tel}`])];
    };
    return () => vue.createVNode(Cell, {
      "center": true,
      "icon": props2.type === "edit" ? "contact" : "add-square",
      "class": bem$U([props2.type]),
      "border": false,
      "isLink": props2.editable,
      "titleClass": bem$U("title"),
      "onClick": onClick
    }, {
      title: renderContent
    });
  }
});
const ContactCard = withInstall(stdin_default$12);
const [name$U, bem$T, t$d] = createNamespace("contact-edit");
const DEFAULT_CONTACT = {
  tel: "",
  name: ""
};
const contactEditProps = {
  isEdit: Boolean,
  isSaving: Boolean,
  isDeleting: Boolean,
  showSetDefault: Boolean,
  setDefaultLabel: String,
  contactInfo: {
    type: Object,
    default: () => extend({}, DEFAULT_CONTACT)
  },
  telValidator: {
    type: Function,
    default: isMobile
  }
};
var stdin_default$11 = vue.defineComponent({
  name: name$U,
  props: contactEditProps,
  emits: ["save", "delete", "changeDefault"],
  setup(props2, {
    emit
  }) {
    const contact = vue.reactive(extend({}, DEFAULT_CONTACT, props2.contactInfo));
    const onSave = () => {
      if (!props2.isSaving) {
        emit("save", contact);
      }
    };
    const onDelete = () => emit("delete", contact);
    const renderButtons = () => vue.createVNode("div", {
      "class": bem$T("buttons")
    }, [vue.createVNode(Button, {
      "block": true,
      "round": true,
      "type": "primary",
      "text": t$d("save"),
      "class": bem$T("button"),
      "loading": props2.isSaving,
      "nativeType": "submit"
    }, null), props2.isEdit && vue.createVNode(Button, {
      "block": true,
      "round": true,
      "text": t$d("delete"),
      "class": bem$T("button"),
      "loading": props2.isDeleting,
      "onClick": onDelete
    }, null)]);
    const renderSwitch = () => vue.createVNode(Switch, {
      "modelValue": contact.isDefault,
      "onUpdate:modelValue": ($event) => contact.isDefault = $event,
      "onChange": (checked) => emit("changeDefault", checked)
    }, null);
    const renderSetDefault = () => {
      if (props2.showSetDefault) {
        return vue.createVNode(Cell, {
          "title": props2.setDefaultLabel,
          "class": bem$T("switch-cell"),
          "border": false
        }, {
          "right-icon": renderSwitch
        });
      }
    };
    vue.watch(() => props2.contactInfo, (value) => extend(contact, DEFAULT_CONTACT, value));
    return () => vue.createVNode(Form, {
      "class": bem$T(),
      "onSubmit": onSave
    }, {
      default: () => [vue.createVNode("div", {
        "class": bem$T("fields")
      }, [vue.createVNode(Field, {
        "modelValue": contact.name,
        "onUpdate:modelValue": ($event) => contact.name = $event,
        "clearable": true,
        "label": t$d("name"),
        "rules": [{
          required: true,
          message: t$d("nameEmpty")
        }],
        "maxlength": "30",
        "placeholder": t$d("name")
      }, null), vue.createVNode(Field, {
        "modelValue": contact.tel,
        "onUpdate:modelValue": ($event) => contact.tel = $event,
        "clearable": true,
        "type": "tel",
        "label": t$d("tel"),
        "rules": [{
          validator: props2.telValidator,
          message: t$d("telInvalid")
        }],
        "placeholder": t$d("tel")
      }, null)]), renderSetDefault(), renderButtons()]
    });
  }
});
const ContactEdit = withInstall(stdin_default$11);
const [name$T, bem$S, t$c] = createNamespace("contact-list");
const contactListProps = {
  list: Array,
  addText: String,
  modelValue: unknownProp,
  defaultTagText: String
};
var stdin_default$10 = vue.defineComponent({
  name: name$T,
  props: contactListProps,
  emits: ["add", "edit", "select", "update:modelValue"],
  setup(props2, {
    emit
  }) {
    const renderItem = (item, index) => {
      const onClick = () => {
        emit("update:modelValue", item.id);
        emit("select", item, index);
      };
      const renderRightIcon = () => vue.createVNode(Radio, {
        "class": bem$S("radio"),
        "name": item.id,
        "iconSize": 18
      }, null);
      const renderEditIcon = () => vue.createVNode(Icon, {
        "name": "edit",
        "class": bem$S("edit"),
        "onClick": (event) => {
          event.stopPropagation();
          emit("edit", item, index);
        }
      }, null);
      const renderContent = () => {
        const nodes = [`${item.name}，${item.tel}`];
        if (item.isDefault && props2.defaultTagText) {
          nodes.push(vue.createVNode(Tag, {
            "type": "primary",
            "round": true,
            "class": bem$S("item-tag")
          }, {
            default: () => [props2.defaultTagText]
          }));
        }
        return nodes;
      };
      return vue.createVNode(Cell, {
        "key": item.id,
        "isLink": true,
        "center": true,
        "class": bem$S("item"),
        "titleClass": bem$S("item-title"),
        "onClick": onClick
      }, {
        icon: renderEditIcon,
        title: renderContent,
        "right-icon": renderRightIcon
      });
    };
    return () => vue.createVNode("div", {
      "class": bem$S()
    }, [vue.createVNode(RadioGroup, {
      "modelValue": props2.modelValue,
      "class": bem$S("group")
    }, {
      default: () => [props2.list && props2.list.map(renderItem)]
    }), vue.createVNode("div", {
      "class": [bem$S("bottom"), "van-safe-area-bottom"]
    }, [vue.createVNode(Button, {
      "round": true,
      "block": true,
      "type": "primary",
      "class": bem$S("add"),
      "text": props2.addText || t$c("addContact"),
      "onClick": () => emit("add")
    }, null)])]);
  }
});
const ContactList = withInstall(stdin_default$10);
function parseFormat(format2, currentTime) {
  const { days } = currentTime;
  let { hours, minutes, seconds, milliseconds } = currentTime;
  if (format2.includes("DD")) {
    format2 = format2.replace("DD", padZero(days));
  } else {
    hours += days * 24;
  }
  if (format2.includes("HH")) {
    format2 = format2.replace("HH", padZero(hours));
  } else {
    minutes += hours * 60;
  }
  if (format2.includes("mm")) {
    format2 = format2.replace("mm", padZero(minutes));
  } else {
    seconds += minutes * 60;
  }
  if (format2.includes("ss")) {
    format2 = format2.replace("ss", padZero(seconds));
  } else {
    milliseconds += seconds * 1e3;
  }
  if (format2.includes("S")) {
    const ms = padZero(milliseconds, 3);
    if (format2.includes("SSS")) {
      format2 = format2.replace("SSS", ms);
    } else if (format2.includes("SS")) {
      format2 = format2.replace("SS", ms.slice(0, 2));
    } else {
      format2 = format2.replace("S", ms.charAt(0));
    }
  }
  return format2;
}
const [name$S, bem$R] = createNamespace("count-down");
const countDownProps = {
  time: makeNumericProp(0),
  format: makeStringProp("HH:mm:ss"),
  autoStart: truthProp,
  millisecond: Boolean
};
var stdin_default$$ = vue.defineComponent({
  name: name$S,
  props: countDownProps,
  emits: ["change", "finish"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      start,
      pause,
      reset,
      current: current2
    } = use.useCountDown({
      time: +props2.time,
      millisecond: props2.millisecond,
      onChange: (current22) => emit("change", current22),
      onFinish: () => emit("finish")
    });
    const timeText = vue.computed(() => parseFormat(props2.format, current2.value));
    const resetTime = () => {
      reset(+props2.time);
      if (props2.autoStart) {
        start();
      }
    };
    vue.watch(() => props2.time, resetTime, {
      immediate: true
    });
    useExpose({
      start,
      pause,
      reset: resetTime
    });
    return () => vue.createVNode("div", {
      "role": "timer",
      "class": bem$R()
    }, [slots.default ? slots.default(current2.value) : timeText.value]);
  }
});
const CountDown = withInstall(stdin_default$$);
function getDate(timeStamp) {
  const date = new Date(timeStamp * 1e3);
  return `${date.getFullYear()}.${padZero(date.getMonth() + 1)}.${padZero(
    date.getDate()
  )}`;
}
const formatDiscount = (discount) => (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
const formatAmount = (amount) => (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
const [name$R, bem$Q, t$b] = createNamespace("coupon");
var stdin_default$_ = vue.defineComponent({
  name: name$R,
  props: {
    chosen: Boolean,
    coupon: makeRequiredProp(Object),
    disabled: Boolean,
    currency: makeStringProp("¥")
  },
  setup(props2) {
    const validPeriod = vue.computed(() => {
      const {
        startAt,
        endAt
      } = props2.coupon;
      return `${getDate(startAt)} - ${getDate(endAt)}`;
    });
    const faceAmount = vue.computed(() => {
      const {
        coupon,
        currency
      } = props2;
      if (coupon.valueDesc) {
        return [coupon.valueDesc, vue.createVNode("span", null, [coupon.unitDesc || ""])];
      }
      if (coupon.denominations) {
        const denominations = formatAmount(coupon.denominations);
        return [vue.createVNode("span", null, [currency]), ` ${denominations}`];
      }
      if (coupon.discount) {
        return t$b("discount", formatDiscount(coupon.discount));
      }
      return "";
    });
    const conditionMessage = vue.computed(() => {
      const condition = formatAmount(props2.coupon.originCondition || 0);
      return condition === "0" ? t$b("unlimited") : t$b("condition", condition);
    });
    return () => {
      const {
        chosen,
        coupon,
        disabled
      } = props2;
      const description = disabled && coupon.reason || coupon.description;
      return vue.createVNode("div", {
        "class": bem$Q({
          disabled
        })
      }, [vue.createVNode("div", {
        "class": bem$Q("content")
      }, [vue.createVNode("div", {
        "class": bem$Q("head")
      }, [vue.createVNode("h2", {
        "class": bem$Q("amount")
      }, [faceAmount.value]), vue.createVNode("p", {
        "class": bem$Q("condition")
      }, [coupon.condition || conditionMessage.value])]), vue.createVNode("div", {
        "class": bem$Q("body")
      }, [vue.createVNode("p", {
        "class": bem$Q("name")
      }, [coupon.name]), vue.createVNode("p", {
        "class": bem$Q("valid")
      }, [validPeriod.value]), !disabled && vue.createVNode(Checkbox, {
        "class": bem$Q("corner"),
        "modelValue": chosen
      }, null)])]), description && vue.createVNode("p", {
        "class": bem$Q("description")
      }, [description])]);
    };
  }
});
const Coupon = withInstall(stdin_default$_);
const [name$Q, bem$P, t$a] = createNamespace("coupon-cell");
const couponCellProps = {
  title: String,
  border: truthProp,
  editable: truthProp,
  coupons: makeArrayProp(),
  currency: makeStringProp("¥"),
  chosenCoupon: makeNumericProp(-1)
};
function formatValue({
  coupons,
  chosenCoupon,
  currency
}) {
  const coupon = coupons[+chosenCoupon];
  if (coupon) {
    let value = 0;
    if (isDef(coupon.value)) {
      ({
        value
      } = coupon);
    } else if (isDef(coupon.denominations)) {
      value = coupon.denominations;
    }
    return `-${currency} ${(value / 100).toFixed(2)}`;
  }
  return coupons.length === 0 ? t$a("noCoupon") : t$a("count", coupons.length);
}
var stdin_default$Z = vue.defineComponent({
  name: name$Q,
  props: couponCellProps,
  setup(props2) {
    return () => {
      const selected = props2.coupons[+props2.chosenCoupon];
      return vue.createVNode(Cell, {
        "class": bem$P(),
        "value": formatValue(props2),
        "title": props2.title || t$a("title"),
        "border": props2.border,
        "isLink": props2.editable,
        "valueClass": bem$P("value", {
          selected
        })
      }, null);
    };
  }
});
const CouponCell = withInstall(stdin_default$Z);
const [name$P, bem$O] = createNamespace("empty");
const emptyProps = {
  image: makeStringProp("default"),
  imageSize: [Number, String, Array],
  description: String
};
var stdin_default$Y = vue.defineComponent({
  name: name$P,
  props: emptyProps,
  setup(props2, {
    slots
  }) {
    const renderDescription = () => {
      const description = slots.description ? slots.description() : props2.description;
      if (description) {
        return vue.createVNode("p", {
          "class": bem$O("description")
        }, [description]);
      }
    };
    const renderBottom = () => {
      if (slots.default) {
        return vue.createVNode("div", {
          "class": bem$O("bottom")
        }, [slots.default()]);
      }
    };
    const baseId = useId();
    const getId = (num) => `${baseId}-${num}`;
    const getUrlById = (num) => `url(#${getId(num)})`;
    const renderStop = (color, offset, opacity) => vue.createVNode("stop", {
      "stop-color": color,
      "offset": `${offset}%`,
      "stop-opacity": opacity
    }, null);
    const renderStops = (fromColor, toColor) => [renderStop(fromColor, 0), renderStop(toColor, 100)];
    const renderShadow = (id) => [vue.createVNode("defs", null, [vue.createVNode("radialGradient", {
      "id": getId(id),
      "cx": "50%",
      "cy": "54%",
      "fx": "50%",
      "fy": "54%",
      "r": "297%",
      "gradientTransform": "matrix(-.16 0 0 -.33 .58 .72)"
    }, [renderStop("#EBEDF0", 0), renderStop("#F2F3F5", 100, 0.3)])]), vue.createVNode("ellipse", {
      "fill": getUrlById(id),
      "opacity": ".8",
      "cx": "80",
      "cy": "140",
      "rx": "46",
      "ry": "8"
    }, null)];
    const renderBuilding = () => [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
      "id": getId("a"),
      "x1": "64%",
      "y1": "100%",
      "x2": "64%"
    }, [renderStop("#FFF", 0, 0.5), renderStop("#F2F3F5", 100)])]), vue.createVNode("g", {
      "opacity": ".8"
    }, [vue.createVNode("path", {
      "d": "M36 131V53H16v20H2v58h34z",
      "fill": getUrlById("a")
    }, null), vue.createVNode("path", {
      "d": "M123 15h22v14h9v77h-31V15z",
      "fill": getUrlById("a")
    }, null)])];
    const renderCloud = () => [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
      "id": getId("b"),
      "x1": "64%",
      "y1": "97%",
      "x2": "64%",
      "y2": "0%"
    }, [renderStop("#F2F3F5", 0, 0.3), renderStop("#F2F3F5", 100)])]), vue.createVNode("g", {
      "opacity": ".8"
    }, [vue.createVNode("path", {
      "d": "M87 6c3 0 7 3 8 6a8 8 0 1 1-1 16H80a7 7 0 0 1-8-6c0-4 3-7 6-7 0-5 4-9 9-9Z",
      "fill": getUrlById("b")
    }, null), vue.createVNode("path", {
      "d": "M19 23c2 0 3 1 4 3 2 0 4 2 4 4a4 4 0 0 1-4 3v1h-7v-1l-1 1c-2 0-3-2-3-4 0-1 1-3 3-3 0-2 2-4 4-4Z",
      "fill": getUrlById("b")
    }, null)])];
    const renderNetwork = () => vue.createVNode("svg", {
      "viewBox": "0 0 160 160"
    }, [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
      "id": getId(1),
      "x1": "64%",
      "y1": "100%",
      "x2": "64%"
    }, [renderStop("#FFF", 0, 0.5), renderStop("#F2F3F5", 100)]), vue.createVNode("linearGradient", {
      "id": getId(2),
      "x1": "50%",
      "x2": "50%",
      "y2": "84%"
    }, [renderStop("#EBEDF0", 0), renderStop("#DCDEE0", 100, 0)]), vue.createVNode("linearGradient", {
      "id": getId(3),
      "x1": "100%",
      "x2": "100%",
      "y2": "100%"
    }, [renderStops("#EAEDF0", "#DCDEE0")]), vue.createVNode("radialGradient", {
      "id": getId(4),
      "cx": "50%",
      "cy": "0%",
      "fx": "50%",
      "fy": "0%",
      "r": "100%",
      "gradientTransform": "matrix(0 1 -.54 0 .5 -.5)"
    }, [renderStop("#EBEDF0", 0), renderStop("#FFF", 100, 0)])]), vue.createVNode("g", {
      "fill": "none"
    }, [renderBuilding(), vue.createVNode("path", {
      "fill": getUrlById(4),
      "d": "M0 139h160v21H0z"
    }, null), vue.createVNode("path", {
      "d": "M80 54a7 7 0 0 1 3 13v27l-2 2h-2a2 2 0 0 1-2-2V67a7 7 0 0 1 3-13z",
      "fill": getUrlById(2)
    }, null), vue.createVNode("g", {
      "opacity": ".6",
      "stroke-linecap": "round",
      "stroke-width": "7"
    }, [vue.createVNode("path", {
      "d": "M64 47a19 19 0 0 0-5 13c0 5 2 10 5 13",
      "stroke": getUrlById(3)
    }, null), vue.createVNode("path", {
      "d": "M53 36a34 34 0 0 0 0 48",
      "stroke": getUrlById(3)
    }, null), vue.createVNode("path", {
      "d": "M95 73a19 19 0 0 0 6-13c0-5-2-9-6-13",
      "stroke": getUrlById(3)
    }, null), vue.createVNode("path", {
      "d": "M106 84a34 34 0 0 0 0-48",
      "stroke": getUrlById(3)
    }, null)]), vue.createVNode("g", {
      "transform": "translate(31 105)"
    }, [vue.createVNode("rect", {
      "fill": "#EBEDF0",
      "width": "98",
      "height": "34",
      "rx": "2"
    }, null), vue.createVNode("rect", {
      "fill": "#FFF",
      "x": "9",
      "y": "8",
      "width": "80",
      "height": "18",
      "rx": "1.1"
    }, null), vue.createVNode("rect", {
      "fill": "#EBEDF0",
      "x": "15",
      "y": "12",
      "width": "18",
      "height": "6",
      "rx": "1.1"
    }, null)])])]);
    const renderMaterial = () => vue.createVNode("svg", {
      "viewBox": "0 0 160 160"
    }, [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(5)
    }, [renderStops("#F2F3F5", "#DCDEE0")]), vue.createVNode("linearGradient", {
      "x1": "95%",
      "y1": "48%",
      "x2": "5.5%",
      "y2": "51%",
      "id": getId(6)
    }, [renderStops("#EAEDF1", "#DCDEE0")]), vue.createVNode("linearGradient", {
      "y1": "45%",
      "x2": "100%",
      "y2": "54%",
      "id": getId(7)
    }, [renderStops("#EAEDF1", "#DCDEE0")])]), renderBuilding(), renderCloud(), vue.createVNode("g", {
      "transform": "translate(36 50)",
      "fill": "none"
    }, [vue.createVNode("g", {
      "transform": "translate(8)"
    }, [vue.createVNode("rect", {
      "fill": "#EBEDF0",
      "opacity": ".6",
      "x": "38",
      "y": "13",
      "width": "36",
      "height": "53",
      "rx": "2"
    }, null), vue.createVNode("rect", {
      "fill": getUrlById(5),
      "width": "64",
      "height": "66",
      "rx": "2"
    }, null), vue.createVNode("rect", {
      "fill": "#FFF",
      "x": "6",
      "y": "6",
      "width": "52",
      "height": "55",
      "rx": "1"
    }, null), vue.createVNode("g", {
      "transform": "translate(15 17)",
      "fill": getUrlById(6)
    }, [vue.createVNode("rect", {
      "width": "34",
      "height": "6",
      "rx": "1"
    }, null), vue.createVNode("path", {
      "d": "M0 14h34v6H0z"
    }, null), vue.createVNode("rect", {
      "y": "28",
      "width": "34",
      "height": "6",
      "rx": "1"
    }, null)])]), vue.createVNode("rect", {
      "fill": getUrlById(7),
      "y": "61",
      "width": "88",
      "height": "28",
      "rx": "1"
    }, null), vue.createVNode("rect", {
      "fill": "#F7F8FA",
      "x": "29",
      "y": "72",
      "width": "30",
      "height": "6",
      "rx": "1"
    }, null)])]);
    const renderError = () => vue.createVNode("svg", {
      "viewBox": "0 0 160 160"
    }, [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(8)
    }, [renderStops("#EAEDF1", "#DCDEE0")])]), renderBuilding(), renderCloud(), renderShadow("c"), vue.createVNode("path", {
      "d": "m59 60 21 21 21-21h3l9 9v3L92 93l21 21v3l-9 9h-3l-21-21-21 21h-3l-9-9v-3l21-21-21-21v-3l9-9h3Z",
      "fill": getUrlById(8)
    }, null)]);
    const renderSearch = () => vue.createVNode("svg", {
      "viewBox": "0 0 160 160"
    }, [vue.createVNode("defs", null, [vue.createVNode("linearGradient", {
      "x1": "50%",
      "y1": "100%",
      "x2": "50%",
      "id": getId(9)
    }, [renderStops("#EEE", "#D8D8D8")]), vue.createVNode("linearGradient", {
      "x1": "100%",
      "y1": "50%",
      "y2": "50%",
      "id": getId(10)
    }, [renderStops("#F2F3F5", "#DCDEE0")]), vue.createVNode("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(11)
    }, [renderStops("#F2F3F5", "#DCDEE0")]), vue.createVNode("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(12)
    }, [renderStops("#FFF", "#F7F8FA")])]), renderBuilding(), renderCloud(), renderShadow("d"), vue.createVNode("g", {
      "transform": "rotate(-45 113 -4)",
      "fill": "none"
    }, [vue.createVNode("rect", {
      "fill": getUrlById(9),
      "x": "24",
      "y": "52.8",
      "width": "5.8",
      "height": "19",
      "rx": "1"
    }, null), vue.createVNode("rect", {
      "fill": getUrlById(10),
      "x": "22.1",
      "y": "67.3",
      "width": "9.9",
      "height": "28",
      "rx": "1"
    }, null), vue.createVNode("circle", {
      "stroke": getUrlById(11),
      "stroke-width": "8",
      "cx": "27",
      "cy": "27",
      "r": "27"
    }, null), vue.createVNode("circle", {
      "fill": getUrlById(12),
      "cx": "27",
      "cy": "27",
      "r": "16"
    }, null), vue.createVNode("path", {
      "d": "M37 7c-8 0-15 5-16 12",
      "stroke": getUrlById(11),
      "stroke-width": "3",
      "opacity": ".5",
      "stroke-linecap": "round",
      "transform": "rotate(45 29 13)"
    }, null)])]);
    const renderImage = () => {
      var _a;
      if (slots.image) {
        return slots.image();
      }
      const PRESET_IMAGES = {
        error: renderError,
        search: renderSearch,
        network: renderNetwork,
        default: renderMaterial
      };
      return ((_a = PRESET_IMAGES[props2.image]) == null ? void 0 : _a.call(PRESET_IMAGES)) || vue.createVNode("img", {
        "src": props2.image
      }, null);
    };
    return () => vue.createVNode("div", {
      "class": bem$O()
    }, [vue.createVNode("div", {
      "class": bem$O("image"),
      "style": getSizeStyle(props2.imageSize)
    }, [renderImage()]), renderDescription(), renderBottom()]);
  }
});
const Empty = withInstall(stdin_default$Y);
const [name$O, bem$N, t$9] = createNamespace("coupon-list");
const couponListProps = {
  code: makeStringProp(""),
  coupons: makeArrayProp(),
  currency: makeStringProp("¥"),
  showCount: truthProp,
  emptyImage: String,
  chosenCoupon: makeNumberProp(-1),
  enabledTitle: String,
  disabledTitle: String,
  disabledCoupons: makeArrayProp(),
  showExchangeBar: truthProp,
  showCloseButton: truthProp,
  closeButtonText: String,
  inputPlaceholder: String,
  exchangeMinLength: makeNumberProp(1),
  exchangeButtonText: String,
  displayedCouponIndex: makeNumberProp(-1),
  exchangeButtonLoading: Boolean,
  exchangeButtonDisabled: Boolean
};
var stdin_default$X = vue.defineComponent({
  name: name$O,
  props: couponListProps,
  emits: ["change", "exchange", "update:code"],
  setup(props2, {
    emit,
    slots
  }) {
    const [couponRefs, setCouponRefs] = useRefs();
    const root = vue.ref();
    const barRef = vue.ref();
    const activeTab = vue.ref(0);
    const listHeight = vue.ref(0);
    const currentCode = vue.ref(props2.code);
    const buttonDisabled = vue.computed(() => !props2.exchangeButtonLoading && (props2.exchangeButtonDisabled || !currentCode.value || currentCode.value.length < props2.exchangeMinLength));
    const updateListHeight = () => {
      const TABS_HEIGHT = 44;
      const rootHeight = use.useRect(root).height;
      const headerHeight = use.useRect(barRef).height + TABS_HEIGHT;
      listHeight.value = (rootHeight > headerHeight ? rootHeight : windowHeight.value) - headerHeight;
    };
    const onExchange = () => {
      emit("exchange", currentCode.value);
      if (!props2.code) {
        currentCode.value = "";
      }
    };
    const scrollToCoupon = (index) => {
      vue.nextTick(() => {
        var _a;
        return (_a = couponRefs.value[index]) == null ? void 0 : _a.scrollIntoView();
      });
    };
    const renderEmpty = () => vue.createVNode(Empty, {
      "image": props2.emptyImage
    }, {
      default: () => [vue.createVNode("p", {
        "class": bem$N("empty-tip")
      }, [t$9("noCoupon")])]
    });
    const renderExchangeBar = () => {
      if (props2.showExchangeBar) {
        return vue.createVNode("div", {
          "ref": barRef,
          "class": bem$N("exchange-bar")
        }, [vue.createVNode(Field, {
          "modelValue": currentCode.value,
          "onUpdate:modelValue": ($event) => currentCode.value = $event,
          "clearable": true,
          "border": false,
          "class": bem$N("field"),
          "placeholder": props2.inputPlaceholder || t$9("placeholder"),
          "maxlength": "20"
        }, null), vue.createVNode(Button, {
          "plain": true,
          "type": "primary",
          "class": bem$N("exchange"),
          "text": props2.exchangeButtonText || t$9("exchange"),
          "loading": props2.exchangeButtonLoading,
          "disabled": buttonDisabled.value,
          "onClick": onExchange
        }, null)]);
      }
    };
    const renderCouponTab = () => {
      const {
        coupons
      } = props2;
      const count = props2.showCount ? ` (${coupons.length})` : "";
      const title = (props2.enabledTitle || t$9("enable")) + count;
      return vue.createVNode(Tab, {
        "title": title
      }, {
        default: () => {
          var _a;
          return [vue.createVNode("div", {
            "class": bem$N("list", {
              "with-bottom": props2.showCloseButton
            }),
            "style": {
              height: `${listHeight.value}px`
            }
          }, [coupons.map((coupon, index) => vue.createVNode(Coupon, {
            "key": coupon.id,
            "ref": setCouponRefs(index),
            "coupon": coupon,
            "chosen": index === props2.chosenCoupon,
            "currency": props2.currency,
            "onClick": () => emit("change", index)
          }, null)), !coupons.length && renderEmpty(), (_a = slots["list-footer"]) == null ? void 0 : _a.call(slots)])];
        }
      });
    };
    const renderDisabledTab = () => {
      const {
        disabledCoupons
      } = props2;
      const count = props2.showCount ? ` (${disabledCoupons.length})` : "";
      const title = (props2.disabledTitle || t$9("disabled")) + count;
      return vue.createVNode(Tab, {
        "title": title
      }, {
        default: () => {
          var _a;
          return [vue.createVNode("div", {
            "class": bem$N("list", {
              "with-bottom": props2.showCloseButton
            }),
            "style": {
              height: `${listHeight.value}px`
            }
          }, [disabledCoupons.map((coupon) => vue.createVNode(Coupon, {
            "disabled": true,
            "key": coupon.id,
            "coupon": coupon,
            "currency": props2.currency
          }, null)), !disabledCoupons.length && renderEmpty(), (_a = slots["disabled-list-footer"]) == null ? void 0 : _a.call(slots)])];
        }
      });
    };
    vue.watch(() => props2.code, (value) => {
      currentCode.value = value;
    });
    vue.watch(windowHeight, updateListHeight);
    vue.watch(currentCode, (value) => emit("update:code", value));
    vue.watch(() => props2.displayedCouponIndex, scrollToCoupon);
    vue.onMounted(() => {
      updateListHeight();
      scrollToCoupon(props2.displayedCouponIndex);
    });
    return () => vue.createVNode("div", {
      "ref": root,
      "class": bem$N()
    }, [renderExchangeBar(), vue.createVNode(Tabs, {
      "active": activeTab.value,
      "onUpdate:active": ($event) => activeTab.value = $event,
      "class": bem$N("tab")
    }, {
      default: () => [renderCouponTab(), renderDisabledTab()]
    }), vue.createVNode("div", {
      "class": bem$N("bottom")
    }, [vue.withDirectives(vue.createVNode(Button, {
      "round": true,
      "block": true,
      "type": "primary",
      "class": bem$N("close"),
      "text": props2.closeButtonText || t$9("close"),
      "onClick": () => emit("change", -1)
    }, null), [[vue.vShow, props2.showCloseButton]])])]);
  }
});
const CouponList = withInstall(stdin_default$X);
const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
const [name$N] = createNamespace("date-picker");
const datePickerProps = extend({}, sharedProps, {
  columnsType: {
    type: Array,
    default: () => ["year", "month", "day"]
  },
  minDate: {
    type: Date,
    default: () => new Date(currentYear - 10, 0, 1),
    validator: isDate
  },
  maxDate: {
    type: Date,
    default: () => new Date(currentYear + 10, 11, 31),
    validator: isDate
  }
});
var stdin_default$W = vue.defineComponent({
  name: name$N,
  props: datePickerProps,
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const currentValues = vue.ref(props2.modelValue);
    const updatedByExternalSources = vue.ref(false);
    const genYearOptions = () => {
      const minYear = props2.minDate.getFullYear();
      const maxYear = props2.maxDate.getFullYear();
      return genOptions(minYear, maxYear, "year", props2.formatter, props2.filter);
    };
    const isMinYear = (year) => year === props2.minDate.getFullYear();
    const isMaxYear = (year) => year === props2.maxDate.getFullYear();
    const isMinMonth = (month) => month === props2.minDate.getMonth() + 1;
    const isMaxMonth = (month) => month === props2.maxDate.getMonth() + 1;
    const getValue = (type) => {
      const {
        minDate,
        columnsType
      } = props2;
      const index = columnsType.indexOf(type);
      const value = updatedByExternalSources.value ? props2.modelValue[index] : currentValues.value[index];
      if (value) {
        return +value;
      }
      switch (type) {
        case "year":
          return minDate.getFullYear();
        case "month":
          return minDate.getMonth() + 1;
        case "day":
          return minDate.getDate();
      }
    };
    const genMonthOptions = () => {
      const year = getValue("year");
      const minMonth = isMinYear(year) ? props2.minDate.getMonth() + 1 : 1;
      const maxMonth = isMaxYear(year) ? props2.maxDate.getMonth() + 1 : 12;
      return genOptions(minMonth, maxMonth, "month", props2.formatter, props2.filter);
    };
    const genDayOptions = () => {
      const year = getValue("year");
      const month = getValue("month");
      const minDate = isMinYear(year) && isMinMonth(month) ? props2.minDate.getDate() : 1;
      const maxDate = isMaxYear(year) && isMaxMonth(month) ? props2.maxDate.getDate() : getMonthEndDay(year, month);
      return genOptions(minDate, maxDate, "day", props2.formatter, props2.filter);
    };
    const columns = vue.computed(() => props2.columnsType.map((type) => {
      switch (type) {
        case "year":
          return genYearOptions();
        case "month":
          return genMonthOptions();
        case "day":
          return genDayOptions();
        default:
          if (process.env.NODE_ENV !== "production") {
            throw new Error(`[Vant] DatePicker: unsupported columns type: ${type}`);
          }
          return [];
      }
    }));
    vue.watch(currentValues, (newValues) => {
      if (!isSameValue(newValues, props2.modelValue)) {
        emit("update:modelValue", newValues);
      }
    });
    vue.watch(() => props2.modelValue, (newValues, oldValues) => {
      updatedByExternalSources.value = isSameValue(oldValues, currentValues.value);
      newValues = formatValueRange(newValues, columns.value);
      if (!isSameValue(newValues, currentValues.value)) {
        currentValues.value = newValues;
      }
      updatedByExternalSources.value = false;
    }, {
      immediate: true
    });
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    return () => vue.createVNode(Picker, vue.mergeProps({
      "modelValue": currentValues.value,
      "onUpdate:modelValue": ($event) => currentValues.value = $event,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props2, pickerInheritKeys)), slots);
  }
});
const DatePicker = withInstall(stdin_default$W);
const [name$M, bem$M, t$8] = createNamespace("dialog");
const dialogProps = extend({}, popupSharedProps, {
  title: String,
  theme: String,
  width: numericProp,
  message: [String, Function],
  callback: Function,
  allowHtml: Boolean,
  className: unknownProp,
  transition: makeStringProp("van-dialog-bounce"),
  messageAlign: String,
  closeOnPopstate: truthProp,
  showCancelButton: Boolean,
  cancelButtonText: String,
  cancelButtonColor: String,
  cancelButtonDisabled: Boolean,
  confirmButtonText: String,
  confirmButtonColor: String,
  confirmButtonDisabled: Boolean,
  showConfirmButton: truthProp,
  closeOnClickOverlay: Boolean
});
const popupInheritKeys$1 = [...popupSharedPropKeys, "transition", "closeOnPopstate"];
var stdin_default$V = vue.defineComponent({
  name: name$M,
  props: dialogProps,
  emits: ["confirm", "cancel", "keydown", "update:show"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = vue.ref();
    const loading = vue.reactive({
      confirm: false,
      cancel: false
    });
    const updateShow = (value) => emit("update:show", value);
    const close = (action) => {
      var _a;
      updateShow(false);
      (_a = props2.callback) == null ? void 0 : _a.call(props2, action);
    };
    const getActionHandler = (action) => () => {
      if (!props2.show) {
        return;
      }
      emit(action);
      if (props2.beforeClose) {
        loading[action] = true;
        callInterceptor(props2.beforeClose, {
          args: [action],
          done() {
            close(action);
            loading[action] = false;
          },
          canceled() {
            loading[action] = false;
          }
        });
      } else {
        close(action);
      }
    };
    const onCancel = getActionHandler("cancel");
    const onConfirm = getActionHandler("confirm");
    const onKeydown = vue.withKeys((event) => {
      var _a, _b;
      if (event.target !== ((_b = (_a = root.value) == null ? void 0 : _a.popupRef) == null ? void 0 : _b.value)) {
        return;
      }
      const onEventType = {
        Enter: props2.showConfirmButton ? onConfirm : noop,
        Escape: props2.showCancelButton ? onCancel : noop
      };
      onEventType[event.key]();
      emit("keydown", event);
    }, ["enter", "esc"]);
    const renderTitle = () => {
      const title = slots.title ? slots.title() : props2.title;
      if (title) {
        return vue.createVNode("div", {
          "class": bem$M("header", {
            isolated: !props2.message && !slots.default
          })
        }, [title]);
      }
    };
    const renderMessage = (hasTitle) => {
      const {
        message,
        allowHtml,
        messageAlign
      } = props2;
      const classNames = bem$M("message", {
        "has-title": hasTitle,
        [messageAlign]: messageAlign
      });
      const content = isFunction(message) ? message() : message;
      if (allowHtml && typeof content === "string") {
        return vue.createVNode("div", {
          "class": classNames,
          "innerHTML": content
        }, null);
      }
      return vue.createVNode("div", {
        "class": classNames
      }, [content]);
    };
    const renderContent = () => {
      if (slots.default) {
        return vue.createVNode("div", {
          "class": bem$M("content")
        }, [slots.default()]);
      }
      const {
        title,
        message,
        allowHtml
      } = props2;
      if (message) {
        const hasTitle = !!(title || slots.title);
        return vue.createVNode("div", {
          "key": allowHtml ? 1 : 0,
          "class": bem$M("content", {
            isolated: !hasTitle
          })
        }, [renderMessage(hasTitle)]);
      }
    };
    const renderButtons = () => vue.createVNode("div", {
      "class": [BORDER_TOP, bem$M("footer")]
    }, [props2.showCancelButton && vue.createVNode(Button, {
      "size": "large",
      "text": props2.cancelButtonText || t$8("cancel"),
      "class": bem$M("cancel"),
      "style": {
        color: props2.cancelButtonColor
      },
      "loading": loading.cancel,
      "disabled": props2.cancelButtonDisabled,
      "onClick": onCancel
    }, null), props2.showConfirmButton && vue.createVNode(Button, {
      "size": "large",
      "text": props2.confirmButtonText || t$8("confirm"),
      "class": [bem$M("confirm"), {
        [BORDER_LEFT]: props2.showCancelButton
      }],
      "style": {
        color: props2.confirmButtonColor
      },
      "loading": loading.confirm,
      "disabled": props2.confirmButtonDisabled,
      "onClick": onConfirm
    }, null)]);
    const renderRoundButtons = () => vue.createVNode(ActionBar, {
      "class": bem$M("footer")
    }, {
      default: () => [props2.showCancelButton && vue.createVNode(ActionBarButton, {
        "type": "warning",
        "text": props2.cancelButtonText || t$8("cancel"),
        "class": bem$M("cancel"),
        "color": props2.cancelButtonColor,
        "loading": loading.cancel,
        "disabled": props2.cancelButtonDisabled,
        "onClick": onCancel
      }, null), props2.showConfirmButton && vue.createVNode(ActionBarButton, {
        "type": "danger",
        "text": props2.confirmButtonText || t$8("confirm"),
        "class": bem$M("confirm"),
        "color": props2.confirmButtonColor,
        "loading": loading.confirm,
        "disabled": props2.confirmButtonDisabled,
        "onClick": onConfirm
      }, null)]
    });
    const renderFooter = () => {
      if (slots.footer) {
        return slots.footer();
      }
      return props2.theme === "round-button" ? renderRoundButtons() : renderButtons();
    };
    return () => {
      const {
        width,
        title,
        theme,
        message,
        className
      } = props2;
      return vue.createVNode(Popup, vue.mergeProps({
        "ref": root,
        "role": "dialog",
        "class": [bem$M([theme]), className],
        "style": {
          width: addUnit(width)
        },
        "tabindex": 0,
        "aria-labelledby": title || message,
        "onKeydown": onKeydown,
        "onUpdate:show": updateShow
      }, pick(props2, popupInheritKeys$1)), {
        default: () => [renderTitle(), renderContent(), renderFooter()]
      });
    };
  }
});
let instance$2;
const DEFAULT_OPTIONS = {
  title: "",
  width: "",
  theme: null,
  message: "",
  overlay: true,
  callback: null,
  teleport: "body",
  className: "",
  allowHtml: false,
  lockScroll: true,
  transition: void 0,
  beforeClose: null,
  overlayClass: "",
  overlayStyle: void 0,
  messageAlign: "",
  cancelButtonText: "",
  cancelButtonColor: null,
  cancelButtonDisabled: false,
  confirmButtonText: "",
  confirmButtonColor: null,
  confirmButtonDisabled: false,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false
};
let currentOptions$1 = extend({}, DEFAULT_OPTIONS);
function initInstance$2() {
  const Wrapper = {
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      return () => vue.createVNode(stdin_default$V, vue.mergeProps(state, {
        "onUpdate:show": toggle
      }), null);
    }
  };
  ({
    instance: instance$2
  } = mountComponent(Wrapper));
}
function showDialog(options) {
  if (!inBrowser) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    if (!instance$2) {
      initInstance$2();
    }
    instance$2.open(extend({}, currentOptions$1, options, {
      callback: (action) => {
        (action === "confirm" ? resolve : reject)(action);
      }
    }));
  });
}
const setDialogDefaultOptions = (options) => {
  extend(currentOptions$1, options);
};
const resetDialogDefaultOptions = () => {
  currentOptions$1 = extend({}, DEFAULT_OPTIONS);
};
const showConfirmDialog = (options) => showDialog(extend({
  showCancelButton: true
}, options));
const closeDialog = () => {
  if (instance$2) {
    instance$2.toggle(false);
  }
};
const Dialog = withInstall(stdin_default$V);
const [name$L, bem$L] = createNamespace("divider");
const dividerProps = {
  dashed: Boolean,
  hairline: truthProp,
  vertical: Boolean,
  contentPosition: makeStringProp("center")
};
var stdin_default$U = vue.defineComponent({
  name: name$L,
  props: dividerProps,
  setup(props2, {
    slots
  }) {
    return () => {
      var _a;
      return vue.createVNode("div", {
        "role": "separator",
        "class": bem$L({
          dashed: props2.dashed,
          hairline: props2.hairline,
          vertical: props2.vertical,
          [`content-${props2.contentPosition}`]: !!slots.default && !props2.vertical
        })
      }, [!props2.vertical && ((_a = slots.default) == null ? void 0 : _a.call(slots))]);
    };
  }
});
const Divider = withInstall(stdin_default$U);
const [name$K, bem$K] = createNamespace("dropdown-menu");
const dropdownMenuProps = {
  overlay: truthProp,
  zIndex: numericProp,
  duration: makeNumericProp(0.2),
  direction: makeStringProp("down"),
  activeColor: String,
  closeOnClickOutside: truthProp,
  closeOnClickOverlay: truthProp
};
const DROPDOWN_KEY = Symbol(name$K);
var stdin_default$T = vue.defineComponent({
  name: name$K,
  props: dropdownMenuProps,
  setup(props2, {
    slots
  }) {
    const id = useId();
    const root = vue.ref();
    const barRef = vue.ref();
    const offset = vue.ref(0);
    const {
      children,
      linkChildren
    } = use.useChildren(DROPDOWN_KEY);
    const scrollParent = use.useScrollParent(root);
    const opened = vue.computed(() => children.some((item) => item.state.showWrapper));
    const barStyle = vue.computed(() => {
      if (opened.value && isDef(props2.zIndex)) {
        return {
          zIndex: +props2.zIndex + 1
        };
      }
    });
    const close = () => {
      children.forEach((item) => {
        item.toggle(false);
      });
    };
    const onClickAway = () => {
      if (props2.closeOnClickOutside) {
        close();
      }
    };
    const updateOffset = () => {
      if (barRef.value) {
        const rect = use.useRect(barRef);
        if (props2.direction === "down") {
          offset.value = rect.bottom;
        } else {
          offset.value = windowHeight.value - rect.top;
        }
      }
    };
    const onScroll = () => {
      if (opened.value) {
        updateOffset();
      }
    };
    const toggleItem = (active) => {
      children.forEach((item, index) => {
        if (index === active) {
          item.toggle();
        } else if (item.state.showPopup) {
          item.toggle(false, {
            immediate: true
          });
        }
      });
    };
    const renderTitle = (item, index) => {
      const {
        showPopup
      } = item.state;
      const {
        disabled,
        titleClass
      } = item;
      return vue.createVNode("div", {
        "id": `${id}-${index}`,
        "role": "button",
        "tabindex": disabled ? void 0 : 0,
        "class": [bem$K("item", {
          disabled
        }), {
          [HAPTICS_FEEDBACK]: !disabled
        }],
        "onClick": () => {
          if (!disabled) {
            toggleItem(index);
          }
        }
      }, [vue.createVNode("span", {
        "class": [bem$K("title", {
          down: showPopup === (props2.direction === "down"),
          active: showPopup
        }), titleClass],
        "style": {
          color: showPopup ? props2.activeColor : ""
        }
      }, [vue.createVNode("div", {
        "class": "van-ellipsis"
      }, [item.renderTitle()])])]);
    };
    useExpose({
      close
    });
    linkChildren({
      id,
      props: props2,
      offset,
      updateOffset
    });
    use.useClickAway(root, onClickAway);
    use.useEventListener("scroll", onScroll, {
      target: scrollParent,
      passive: true
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "ref": root,
        "class": bem$K()
      }, [vue.createVNode("div", {
        "ref": barRef,
        "style": barStyle.value,
        "class": bem$K("bar", {
          opened: opened.value
        })
      }, [children.map(renderTitle)]), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const [name$J, bem$J] = createNamespace("dropdown-item");
const dropdownItemProps = {
  title: String,
  options: makeArrayProp(),
  disabled: Boolean,
  teleport: [String, Object],
  lazyRender: truthProp,
  modelValue: unknownProp,
  titleClass: unknownProp
};
var stdin_default$S = vue.defineComponent({
  name: name$J,
  inheritAttrs: false,
  props: dropdownItemProps,
  emits: ["open", "opened", "close", "closed", "change", "update:modelValue"],
  setup(props2, {
    emit,
    slots,
    attrs
  }) {
    const state = vue.reactive({
      showPopup: false,
      transition: true,
      showWrapper: false
    });
    const {
      parent,
      index
    } = use.useParent(DROPDOWN_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <DropdownItem> must be a child component of <DropdownMenu>.");
      }
      return;
    }
    const getEmitter = (name2) => () => emit(name2);
    const onOpen = getEmitter("open");
    const onClose = getEmitter("close");
    const onOpened = getEmitter("opened");
    const onClosed = () => {
      state.showWrapper = false;
      emit("closed");
    };
    const onClickWrapper = (event) => {
      if (props2.teleport) {
        event.stopPropagation();
      }
    };
    const toggle = (show = !state.showPopup, options = {}) => {
      if (show === state.showPopup) {
        return;
      }
      state.showPopup = show;
      state.transition = !options.immediate;
      if (show) {
        parent.updateOffset();
        state.showWrapper = true;
      }
    };
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props2.title) {
        return props2.title;
      }
      const match = props2.options.find((option) => option.value === props2.modelValue);
      return match ? match.text : "";
    };
    const renderOption = (option) => {
      const {
        activeColor
      } = parent.props;
      const active = option.value === props2.modelValue;
      const onClick = () => {
        state.showPopup = false;
        if (option.value !== props2.modelValue) {
          emit("update:modelValue", option.value);
          emit("change", option.value);
        }
      };
      const renderIcon = () => {
        if (active) {
          return vue.createVNode(Icon, {
            "class": bem$J("icon"),
            "color": activeColor,
            "name": "success"
          }, null);
        }
      };
      return vue.createVNode(Cell, {
        "role": "menuitem",
        "key": option.value,
        "icon": option.icon,
        "title": option.text,
        "class": bem$J("option", {
          active
        }),
        "style": {
          color: active ? activeColor : ""
        },
        "tabindex": active ? 0 : -1,
        "clickable": true,
        "onClick": onClick
      }, {
        value: renderIcon
      });
    };
    const renderContent = () => {
      const {
        offset
      } = parent;
      const {
        zIndex,
        overlay,
        duration,
        direction,
        closeOnClickOverlay
      } = parent.props;
      const style = getZIndexStyle(zIndex);
      if (direction === "down") {
        style.top = `${offset.value}px`;
      } else {
        style.bottom = `${offset.value}px`;
      }
      return vue.withDirectives(vue.createVNode("div", vue.mergeProps({
        "style": style,
        "class": bem$J([direction]),
        "onClick": onClickWrapper
      }, attrs), [vue.createVNode(Popup, {
        "show": state.showPopup,
        "onUpdate:show": ($event) => state.showPopup = $event,
        "role": "menu",
        "class": bem$J("content"),
        "overlay": overlay,
        "position": direction === "down" ? "top" : "bottom",
        "duration": state.transition ? duration : 0,
        "lazyRender": props2.lazyRender,
        "overlayStyle": {
          position: "absolute"
        },
        "aria-labelledby": `${parent.id}-${index.value}`,
        "closeOnClickOverlay": closeOnClickOverlay,
        "onOpen": onOpen,
        "onClose": onClose,
        "onOpened": onOpened,
        "onClosed": onClosed
      }, {
        default: () => {
          var _a;
          return [props2.options.map(renderOption), (_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      })]), [[vue.vShow, state.showWrapper]]);
    };
    useExpose({
      state,
      toggle,
      renderTitle
    });
    return () => {
      if (props2.teleport) {
        return vue.createVNode(vue.Teleport, {
          "to": props2.teleport
        }, {
          default: () => [renderContent()]
        });
      }
      return renderContent();
    };
  }
});
const DropdownItem = withInstall(stdin_default$S);
const DropdownMenu = withInstall(stdin_default$T);
const floatingBubbleProps = {
  gap: makeNumberProp(24),
  icon: String,
  axis: makeStringProp("y"),
  magnetic: String,
  offset: {
    type: Object,
    default: () => ({
      x: -1,
      y: -1
    })
  },
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
const [name$I, bem$I] = createNamespace("floating-bubble");
var stdin_default$R = vue.defineComponent({
  name: name$I,
  props: floatingBubbleProps,
  emits: ["click", "update:offset", "offsetChange"],
  setup(props2, {
    slots,
    emit
  }) {
    const rootRef = vue.ref();
    const state = vue.ref({
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
    const boundary = vue.computed(() => ({
      top: props2.gap,
      right: windowWidth.value - state.value.width - props2.gap,
      bottom: windowHeight.value - state.value.height - props2.gap,
      left: props2.gap
    }));
    const dragging = vue.ref(false);
    let initialized = false;
    const rootStyle = vue.computed(() => {
      const style = {};
      const x = addUnit(state.value.x);
      const y = addUnit(state.value.y);
      style.transform = `translate3d(${x}, ${y}, 0)`;
      if (dragging.value || !initialized) {
        style.transition = "none";
      }
      return style;
    });
    const updateState = () => {
      const {
        width,
        height
      } = use.useRect(rootRef.value);
      const {
        offset
      } = props2;
      state.value = {
        x: offset.x > -1 ? offset.x : windowWidth.value - width - props2.gap,
        y: offset.y > -1 ? offset.y : windowHeight.value - height - props2.gap,
        width,
        height
      };
    };
    const touch = useTouch();
    let prevX = 0;
    let prevY = 0;
    const onTouchStart = (e) => {
      touch.start(e);
      dragging.value = true;
      prevX = state.value.x;
      prevY = state.value.y;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      touch.move(e);
      if (props2.axis === "lock")
        return;
      if (!touch.isTap.value) {
        if (props2.axis === "x" || props2.axis === "xy") {
          let nextX = prevX + touch.deltaX.value;
          if (nextX < boundary.value.left)
            nextX = boundary.value.left;
          if (nextX > boundary.value.right)
            nextX = boundary.value.right;
          state.value.x = nextX;
        }
        if (props2.axis === "y" || props2.axis === "xy") {
          let nextY = prevY + touch.deltaY.value;
          if (nextY < boundary.value.top)
            nextY = boundary.value.top;
          if (nextY > boundary.value.bottom)
            nextY = boundary.value.bottom;
          state.value.y = nextY;
        }
        const offset = pick(state.value, ["x", "y"]);
        emit("update:offset", offset);
      }
    };
    use.useEventListener("touchmove", onTouchMove, {
      target: rootRef
    });
    const onTouchEnd = () => {
      dragging.value = false;
      vue.nextTick(() => {
        if (props2.magnetic === "x") {
          const nextX = closest([boundary.value.left, boundary.value.right], state.value.x);
          state.value.x = nextX;
        }
        if (props2.magnetic === "y") {
          const nextY = closest([boundary.value.top, boundary.value.bottom], state.value.y);
          state.value.y = nextY;
        }
        if (!touch.isTap.value) {
          const offset = pick(state.value, ["x", "y"]);
          emit("update:offset", offset);
          if (prevX !== offset.x || prevY !== offset.y) {
            emit("offsetChange", offset);
          }
        }
      });
    };
    const onClick = (e) => {
      if (touch.isTap.value)
        emit("click", e);
    };
    vue.onMounted(() => {
      updateState();
      vue.nextTick(() => {
        initialized = true;
      });
    });
    vue.watch([windowWidth, windowHeight, () => props2.gap, () => props2.offset], updateState);
    const show = vue.ref(true);
    vue.onActivated(() => {
      show.value = true;
    });
    vue.onDeactivated(() => {
      if (props2.teleport) {
        show.value = false;
      }
    });
    return () => {
      const Content = vue.withDirectives(vue.createVNode("div", {
        "class": bem$I(),
        "ref": rootRef,
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd,
        "onClick": onClick,
        "style": rootStyle.value
      }, [slots.default ? slots.default() : vue.createVNode(stdin_default$1P, {
        "name": props2.icon,
        "class": bem$I("icon")
      }, null)]), [[vue.vShow, show.value]]);
      return props2.teleport ? vue.createVNode(vue.Teleport, {
        "to": props2.teleport
      }, {
        default: () => [Content]
      }) : Content;
    };
  }
});
const FloatingBubble = withInstall(stdin_default$R);
const floatingPanelProps = {
  height: makeNumericProp(0),
  anchors: makeArrayProp(),
  duration: makeNumericProp(0.2),
  contentDraggable: truthProp,
  safeAreaInsetBottom: truthProp
};
const [name$H, bem$H] = createNamespace("floating-panel");
const DAMP = 0.2;
var stdin_default$Q = vue.defineComponent({
  name: name$H,
  props: floatingPanelProps,
  emits: ["heightChange", "update:height"],
  setup(props2, {
    emit,
    slots
  }) {
    const rootRef = vue.ref();
    const contentRef = vue.ref();
    const height = useSyncPropRef(() => +props2.height, (value) => emit("update:height", value));
    const boundary = vue.computed(() => {
      var _a, _b;
      return {
        min: (_a = props2.anchors[0]) != null ? _a : 100,
        max: (_b = props2.anchors[props2.anchors.length - 1]) != null ? _b : Math.round(windowHeight.value * 0.6)
      };
    });
    const anchors = vue.computed(() => props2.anchors.length >= 2 ? props2.anchors : [boundary.value.min, boundary.value.max]);
    const dragging = vue.ref(false);
    const rootStyle = vue.computed(() => ({
      height: addUnit(boundary.value.max),
      transform: `translateY(calc(100% + ${addUnit(-height.value)}))`,
      transition: !dragging.value ? `transform ${props2.duration}s` : "none"
    }));
    const ease = (moveY) => {
      const absDistance = Math.abs(moveY);
      const {
        min,
        max
      } = boundary.value;
      if (absDistance > max) {
        return -(max + (absDistance - max) * DAMP);
      }
      if (absDistance < min) {
        return -(min - (min - absDistance) * DAMP);
      }
      return moveY;
    };
    let startY;
    const touch = useTouch();
    const onTouchstart = (e) => {
      touch.start(e);
      dragging.value = true;
      startY = -height.value;
    };
    const onTouchmove = (e) => {
      var _a;
      touch.move(e);
      const target = e.target;
      if (contentRef.value === target || ((_a = contentRef.value) == null ? void 0 : _a.contains(target))) {
        if (!props2.contentDraggable)
          return;
        if (-startY < boundary.value.max) {
          if (e.cancelable)
            e.preventDefault();
          e.stopPropagation();
        } else if (!(contentRef.value.scrollTop <= 0 && touch.deltaY.value > 0)) {
          return;
        }
      }
      const moveY = touch.deltaY.value + startY;
      height.value = -ease(moveY);
    };
    const onTouchend = () => {
      dragging.value = false;
      height.value = closest(anchors.value, height.value);
      if (height.value !== -startY) {
        emit("heightChange", {
          height: height.value
        });
      }
    };
    vue.watch(boundary, () => {
      height.value = closest(anchors.value, height.value);
    }, {
      immediate: true
    });
    useLockScroll(rootRef, () => true);
    use.useEventListener("touchmove", onTouchmove, {
      target: rootRef
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "class": [bem$H(), {
          "van-safe-area-bottom": props2.safeAreaInsetBottom
        }],
        "ref": rootRef,
        "style": rootStyle.value,
        "onTouchstartPassive": onTouchstart,
        "onTouchend": onTouchend,
        "onTouchcancel": onTouchend
      }, [vue.createVNode("div", {
        "class": bem$H("header")
      }, [vue.createVNode("div", {
        "class": bem$H("header-bar")
      }, null)]), vue.createVNode("div", {
        "class": bem$H("content"),
        "ref": contentRef
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});
const FloatingPanel = withInstall(stdin_default$Q);
const [name$G, bem$G] = createNamespace("grid");
const gridProps = {
  square: Boolean,
  center: truthProp,
  border: truthProp,
  gutter: numericProp,
  reverse: Boolean,
  iconSize: numericProp,
  direction: String,
  clickable: Boolean,
  columnNum: makeNumericProp(4)
};
const GRID_KEY = Symbol(name$G);
var stdin_default$P = vue.defineComponent({
  name: name$G,
  props: gridProps,
  setup(props2, {
    slots
  }) {
    const {
      linkChildren
    } = use.useChildren(GRID_KEY);
    linkChildren({
      props: props2
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "style": {
          paddingLeft: addUnit(props2.gutter)
        },
        "class": [bem$G(), {
          [BORDER_TOP]: props2.border && !props2.gutter
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const Grid = withInstall(stdin_default$P);
const [name$F, bem$F] = createNamespace("grid-item");
const gridItemProps = extend({}, routeProps, {
  dot: Boolean,
  text: String,
  icon: String,
  badge: numericProp,
  iconColor: String,
  iconPrefix: String,
  badgeProps: Object
});
var stdin_default$O = vue.defineComponent({
  name: name$F,
  props: gridItemProps,
  setup(props2, {
    slots
  }) {
    const {
      parent,
      index
    } = use.useParent(GRID_KEY);
    const route2 = useRoute();
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <GridItem> must be a child component of <Grid>.");
      }
      return;
    }
    const rootStyle = vue.computed(() => {
      const {
        square,
        gutter,
        columnNum
      } = parent.props;
      const percent = `${100 / +columnNum}%`;
      const style = {
        flexBasis: percent
      };
      if (square) {
        style.paddingTop = percent;
      } else if (gutter) {
        const gutterValue = addUnit(gutter);
        style.paddingRight = gutterValue;
        if (index.value >= +columnNum) {
          style.marginTop = gutterValue;
        }
      }
      return style;
    });
    const contentStyle = vue.computed(() => {
      const {
        square,
        gutter
      } = parent.props;
      if (square && gutter) {
        const gutterValue = addUnit(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: "auto"
        };
      }
    });
    const renderIcon = () => {
      if (slots.icon) {
        return vue.createVNode(Badge, vue.mergeProps({
          "dot": props2.dot,
          "content": props2.badge
        }, props2.badgeProps), {
          default: slots.icon
        });
      }
      if (props2.icon) {
        return vue.createVNode(Icon, {
          "dot": props2.dot,
          "name": props2.icon,
          "size": parent.props.iconSize,
          "badge": props2.badge,
          "class": bem$F("icon"),
          "color": props2.iconColor,
          "badgeProps": props2.badgeProps,
          "classPrefix": props2.iconPrefix
        }, null);
      }
    };
    const renderText = () => {
      if (slots.text) {
        return slots.text();
      }
      if (props2.text) {
        return vue.createVNode("span", {
          "class": bem$F("text")
        }, [props2.text]);
      }
    };
    const renderContent = () => {
      if (slots.default) {
        return slots.default();
      }
      return [renderIcon(), renderText()];
    };
    return () => {
      const {
        center,
        border,
        square,
        gutter,
        reverse,
        direction,
        clickable
      } = parent.props;
      const classes = [bem$F("content", [direction, {
        center,
        square,
        reverse,
        clickable,
        surround: border && gutter
      }]), {
        [BORDER]: border
      }];
      return vue.createVNode("div", {
        "class": [bem$F({
          square
        })],
        "style": rootStyle.value
      }, [vue.createVNode("div", {
        "role": clickable ? "button" : void 0,
        "class": classes,
        "style": contentStyle.value,
        "tabindex": clickable ? 0 : void 0,
        "onClick": route2
      }, [renderContent()])]);
    };
  }
});
const GridItem = withInstall(stdin_default$O);
const getDistance = (touches) => Math.sqrt((touches[0].clientX - touches[1].clientX) ** 2 + (touches[0].clientY - touches[1].clientY) ** 2);
const getCenter = (touches) => ({
  x: (touches[0].clientX + touches[1].clientX) / 2,
  y: (touches[0].clientY + touches[1].clientY) / 2
});
const bem$E = createNamespace("image-preview")[1];
const longImageRatio = 2.6;
var stdin_default$N = vue.defineComponent({
  props: {
    src: String,
    show: Boolean,
    active: Number,
    minZoom: makeRequiredProp(numericProp),
    maxZoom: makeRequiredProp(numericProp),
    rootWidth: makeRequiredProp(Number),
    rootHeight: makeRequiredProp(Number),
    disableZoom: Boolean
  },
  emits: ["scale", "close", "longPress"],
  setup(props2, {
    emit,
    slots
  }) {
    const state = vue.reactive({
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      initializing: false,
      imageRatio: 0
    });
    const touch = useTouch();
    const imageRef = vue.ref();
    const swipeItem = vue.ref();
    const vertical = vue.ref(false);
    const isLongImage = vue.ref(false);
    let initialMoveY = 0;
    const imageStyle = vue.computed(() => {
      const {
        scale,
        moveX,
        moveY,
        moving,
        zooming,
        initializing
      } = state;
      const style = {
        transitionDuration: zooming || moving || initializing ? "0s" : ".3s"
      };
      if (scale !== 1 || isLongImage.value) {
        style.transform = `matrix(${scale}, 0, 0, ${scale}, ${moveX}, ${moveY})`;
      }
      return style;
    });
    const maxMoveX = vue.computed(() => {
      if (state.imageRatio) {
        const {
          rootWidth,
          rootHeight
        } = props2;
        const displayWidth = vertical.value ? rootHeight / state.imageRatio : rootWidth;
        return Math.max(0, (state.scale * displayWidth - rootWidth) / 2);
      }
      return 0;
    });
    const maxMoveY = vue.computed(() => {
      if (state.imageRatio) {
        const {
          rootWidth,
          rootHeight
        } = props2;
        const displayHeight = vertical.value ? rootHeight : rootWidth * state.imageRatio;
        return Math.max(0, (state.scale * displayHeight - rootHeight) / 2);
      }
      return 0;
    });
    const setScale = (scale, center) => {
      var _a;
      scale = clamp(scale, +props2.minZoom, +props2.maxZoom + 1);
      if (scale !== state.scale) {
        const ratio = scale / state.scale;
        state.scale = scale;
        if (center) {
          const imageRect = use.useRect((_a = imageRef.value) == null ? void 0 : _a.$el);
          const origin = {
            x: imageRect.width * 0.5,
            y: imageRect.height * 0.5
          };
          const moveX = state.moveX - (center.x - imageRect.left - origin.x) * (ratio - 1);
          const moveY = state.moveY - (center.y - imageRect.top - origin.y) * (ratio - 1);
          state.moveX = clamp(moveX, -maxMoveX.value, maxMoveX.value);
          state.moveY = clamp(moveY, -maxMoveY.value, maxMoveY.value);
        } else {
          state.moveX = 0;
          state.moveY = isLongImage.value ? initialMoveY : 0;
        }
        emit("scale", {
          scale,
          index: props2.active
        });
      }
    };
    const resetScale = () => {
      setScale(1);
    };
    const toggleScale = () => {
      const scale = state.scale > 1 ? 1 : 2;
      setScale(scale, scale === 2 || isLongImage.value ? {
        x: touch.startX.value,
        y: touch.startY.value
      } : void 0);
    };
    let fingerNum;
    let startMoveX;
    let startMoveY;
    let startScale;
    let startDistance;
    let lastCenter;
    let doubleTapTimer;
    let touchStartTime;
    let isImageMoved = false;
    const onTouchStart = (event) => {
      const {
        touches
      } = event;
      fingerNum = touches.length;
      if (fingerNum === 2 && props2.disableZoom) {
        return;
      }
      const {
        offsetX
      } = touch;
      touch.start(event);
      startMoveX = state.moveX;
      startMoveY = state.moveY;
      touchStartTime = Date.now();
      isImageMoved = false;
      state.moving = fingerNum === 1 && (state.scale !== 1 || isLongImage.value);
      state.zooming = fingerNum === 2 && !offsetX.value;
      if (state.zooming) {
        startScale = state.scale;
        startDistance = getDistance(touches);
      }
    };
    const onTouchMove = (event) => {
      const {
        touches
      } = event;
      touch.move(event);
      if (state.moving) {
        const {
          deltaX,
          deltaY
        } = touch;
        const moveX = deltaX.value + startMoveX;
        const moveY = deltaY.value + startMoveY;
        if ((moveX > maxMoveX.value || moveX < -maxMoveX.value) && !isImageMoved && touch.isHorizontal()) {
          state.moving = false;
          return;
        }
        isImageMoved = true;
        preventDefault(event, true);
        state.moveX = clamp(moveX, -maxMoveX.value, maxMoveX.value);
        state.moveY = clamp(moveY, -maxMoveY.value, maxMoveY.value);
      }
      if (state.zooming) {
        preventDefault(event, true);
        if (touches.length === 2) {
          const distance = getDistance(touches);
          const scale = startScale * distance / startDistance;
          lastCenter = getCenter(touches);
          setScale(scale, lastCenter);
        }
      }
    };
    const checkTap = () => {
      if (fingerNum > 1) {
        return;
      }
      const {
        offsetX,
        offsetY
      } = touch;
      const deltaTime = Date.now() - touchStartTime;
      const TAP_TIME = 250;
      if (offsetX.value < TAP_OFFSET && offsetY.value < TAP_OFFSET) {
        if (deltaTime < TAP_TIME) {
          if (doubleTapTimer) {
            clearTimeout(doubleTapTimer);
            doubleTapTimer = null;
            toggleScale();
          } else {
            doubleTapTimer = setTimeout(() => {
              emit("close");
              doubleTapTimer = null;
            }, TAP_TIME);
          }
        } else if (deltaTime > LONG_PRESS_START_TIME) {
          emit("longPress");
        }
      }
    };
    const onTouchEnd = (event) => {
      let stopPropagation2 = false;
      if (state.moving || state.zooming) {
        stopPropagation2 = true;
        if (state.moving && startMoveX === state.moveX && startMoveY === state.moveY) {
          stopPropagation2 = false;
        }
        if (!event.touches.length) {
          if (state.zooming) {
            state.moveX = clamp(state.moveX, -maxMoveX.value, maxMoveX.value);
            state.moveY = clamp(state.moveY, -maxMoveY.value, maxMoveY.value);
            state.zooming = false;
          }
          state.moving = false;
          startMoveX = 0;
          startMoveY = 0;
          startScale = 1;
          if (state.scale < 1) {
            resetScale();
          }
          const maxZoom = +props2.maxZoom;
          if (state.scale > maxZoom) {
            setScale(maxZoom, lastCenter);
          }
        }
      }
      preventDefault(event, stopPropagation2);
      checkTap();
      touch.reset();
    };
    const resize = () => {
      const {
        rootWidth,
        rootHeight
      } = props2;
      const rootRatio = rootHeight / rootWidth;
      const {
        imageRatio
      } = state;
      vertical.value = state.imageRatio > rootRatio && imageRatio < longImageRatio;
      isLongImage.value = state.imageRatio > rootRatio && imageRatio >= longImageRatio;
      if (isLongImage.value) {
        initialMoveY = (imageRatio * rootWidth - rootHeight) / 2;
        state.moveY = initialMoveY;
        state.initializing = true;
        use.raf(() => {
          state.initializing = false;
        });
      }
      resetScale();
    };
    const onLoad = (event) => {
      const {
        naturalWidth,
        naturalHeight
      } = event.target;
      state.imageRatio = naturalHeight / naturalWidth;
      resize();
    };
    vue.watch(() => props2.active, resetScale);
    vue.watch(() => props2.show, (value) => {
      if (!value) {
        resetScale();
      }
    });
    vue.watch(() => [props2.rootWidth, props2.rootHeight], resize);
    use.useEventListener("touchmove", onTouchMove, {
      target: vue.computed(() => {
        var _a;
        return (_a = swipeItem.value) == null ? void 0 : _a.$el;
      })
    });
    return () => {
      const imageSlots = {
        loading: () => vue.createVNode(Loading, {
          "type": "spinner"
        }, null)
      };
      return vue.createVNode(SwipeItem, {
        "ref": swipeItem,
        "class": bem$E("swipe-item"),
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, {
        default: () => [slots.image ? vue.createVNode("div", {
          "class": bem$E("image-wrap")
        }, [slots.image({
          src: props2.src
        })]) : vue.createVNode(Image$1, {
          "ref": imageRef,
          "src": props2.src,
          "fit": "contain",
          "class": bem$E("image", {
            vertical: vertical.value
          }),
          "style": imageStyle.value,
          "onLoad": onLoad
        }, imageSlots)]
      });
    };
  }
});
const [name$E, bem$D] = createNamespace("image-preview");
const popupProps$1 = ["show", "teleport", "transition", "overlayStyle", "closeOnPopstate"];
const imagePreviewProps = {
  show: Boolean,
  loop: truthProp,
  images: makeArrayProp(),
  minZoom: makeNumericProp(1 / 3),
  maxZoom: makeNumericProp(3),
  overlay: truthProp,
  closeable: Boolean,
  showIndex: truthProp,
  className: unknownProp,
  closeIcon: makeStringProp("clear"),
  transition: String,
  beforeClose: Function,
  overlayClass: unknownProp,
  overlayStyle: Object,
  swipeDuration: makeNumericProp(300),
  startPosition: makeNumericProp(0),
  showIndicators: Boolean,
  closeOnPopstate: truthProp,
  closeIconPosition: makeStringProp("top-right"),
  teleport: [String, Object]
};
var stdin_default$M = vue.defineComponent({
  name: name$E,
  props: imagePreviewProps,
  emits: ["scale", "close", "closed", "change", "longPress", "update:show"],
  setup(props2, {
    emit,
    slots
  }) {
    const swipeRef = vue.ref();
    const state = vue.reactive({
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
      disableZoom: false
    });
    const resize = () => {
      if (swipeRef.value) {
        const rect = use.useRect(swipeRef.value.$el);
        state.rootWidth = rect.width;
        state.rootHeight = rect.height;
        swipeRef.value.resize();
      }
    };
    const emitScale = (args) => emit("scale", args);
    const updateShow = (show) => emit("update:show", show);
    const emitClose = () => {
      callInterceptor(props2.beforeClose, {
        args: [state.active],
        done: () => updateShow(false)
      });
    };
    const setActive = (active) => {
      if (active !== state.active) {
        state.active = active;
        emit("change", active);
      }
    };
    const renderIndex = () => {
      if (props2.showIndex) {
        return vue.createVNode("div", {
          "class": bem$D("index")
        }, [slots.index ? slots.index({
          index: state.active
        }) : `${state.active + 1} / ${props2.images.length}`]);
      }
    };
    const renderCover = () => {
      if (slots.cover) {
        return vue.createVNode("div", {
          "class": bem$D("cover")
        }, [slots.cover()]);
      }
    };
    const onDragStart = () => {
      state.disableZoom = true;
    };
    const onDragEnd = () => {
      state.disableZoom = false;
    };
    const renderImages = () => vue.createVNode(Swipe, {
      "ref": swipeRef,
      "lazyRender": true,
      "loop": props2.loop,
      "class": bem$D("swipe"),
      "duration": props2.swipeDuration,
      "initialSwipe": props2.startPosition,
      "showIndicators": props2.showIndicators,
      "indicatorColor": "white",
      "onChange": setActive,
      "onDragEnd": onDragEnd,
      "onDragStart": onDragStart
    }, {
      default: () => [props2.images.map((image, index) => vue.createVNode(stdin_default$N, {
        "src": image,
        "show": props2.show,
        "active": state.active,
        "maxZoom": props2.maxZoom,
        "minZoom": props2.minZoom,
        "rootWidth": state.rootWidth,
        "rootHeight": state.rootHeight,
        "disableZoom": state.disableZoom,
        "onScale": emitScale,
        "onClose": emitClose,
        "onLongPress": () => emit("longPress", {
          index
        })
      }, {
        image: slots.image
      }))]
    });
    const renderClose = () => {
      if (props2.closeable) {
        return vue.createVNode(Icon, {
          "role": "button",
          "name": props2.closeIcon,
          "class": [bem$D("close-icon", props2.closeIconPosition), HAPTICS_FEEDBACK],
          "onClick": emitClose
        }, null);
      }
    };
    const onClosed = () => emit("closed");
    const swipeTo = (index, options) => {
      var _a;
      return (_a = swipeRef.value) == null ? void 0 : _a.swipeTo(index, options);
    };
    useExpose({
      swipeTo
    });
    vue.onMounted(resize);
    vue.watch([windowWidth, windowHeight], resize);
    vue.watch(() => props2.startPosition, (value) => setActive(+value));
    vue.watch(() => props2.show, (value) => {
      const {
        images,
        startPosition
      } = props2;
      if (value) {
        setActive(+startPosition);
        vue.nextTick(() => {
          resize();
          swipeTo(+startPosition, {
            immediate: true
          });
        });
      } else {
        emit("close", {
          index: state.active,
          url: images[state.active]
        });
      }
    });
    return () => vue.createVNode(Popup, vue.mergeProps({
      "class": [bem$D(), props2.className],
      "overlayClass": [bem$D("overlay"), props2.overlayClass],
      "onClosed": onClosed,
      "onUpdate:show": updateShow
    }, pick(props2, popupProps$1)), {
      default: () => [renderClose(), renderImages(), renderIndex(), renderCover()]
    });
  }
});
let instance$1;
const defaultConfig = {
  loop: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onScale: void 0,
  onClose: void 0,
  onChange: void 0,
  teleport: "body",
  className: "",
  showIndex: true,
  closeable: false,
  closeIcon: "clear",
  transition: void 0,
  beforeClose: void 0,
  overlayStyle: void 0,
  overlayClass: void 0,
  startPosition: 0,
  swipeDuration: 300,
  showIndicators: false,
  closeOnPopstate: true,
  closeIconPosition: "top-right"
};
function initInstance$1() {
  ({
    instance: instance$1
  } = mountComponent({
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      const onClosed = () => {
        state.images = [];
      };
      return () => vue.createVNode(stdin_default$M, vue.mergeProps(state, {
        "onClosed": onClosed,
        "onUpdate:show": toggle
      }), null);
    }
  }));
}
const showImagePreview = (options, startPosition = 0) => {
  if (!inBrowser) {
    return;
  }
  if (!instance$1) {
    initInstance$1();
  }
  options = Array.isArray(options) ? {
    images: options,
    startPosition
  } : options;
  instance$1.open(extend({}, defaultConfig, options));
  return instance$1;
};
const ImagePreview = withInstall(stdin_default$M);
function genAlphabet() {
  const charCodeOfA = "A".charCodeAt(0);
  const indexList = Array(26).fill("").map((_, i) => String.fromCharCode(charCodeOfA + i));
  return indexList;
}
const [name$D, bem$C] = createNamespace("index-bar");
const indexBarProps = {
  sticky: truthProp,
  zIndex: numericProp,
  teleport: [String, Object],
  highlightColor: String,
  stickyOffsetTop: makeNumberProp(0),
  indexList: {
    type: Array,
    default: genAlphabet
  }
};
const INDEX_BAR_KEY = Symbol(name$D);
var stdin_default$L = vue.defineComponent({
  name: name$D,
  props: indexBarProps,
  emits: ["select", "change"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = vue.ref();
    const sidebar = vue.ref();
    const activeAnchor = vue.ref("");
    const touch = useTouch();
    const scrollParent = use.useScrollParent(root);
    const {
      children,
      linkChildren
    } = use.useChildren(INDEX_BAR_KEY);
    let selectActiveIndex;
    linkChildren({
      props: props2
    });
    const sidebarStyle = vue.computed(() => {
      if (isDef(props2.zIndex)) {
        return {
          zIndex: +props2.zIndex + 1
        };
      }
    });
    const highlightStyle = vue.computed(() => {
      if (props2.highlightColor) {
        return {
          color: props2.highlightColor
        };
      }
    });
    const getActiveAnchor = (scrollTop, rects) => {
      for (let i = children.length - 1; i >= 0; i--) {
        const prevHeight = i > 0 ? rects[i - 1].height : 0;
        const reachTop = props2.sticky ? prevHeight + props2.stickyOffsetTop : 0;
        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }
      return -1;
    };
    const getMatchAnchor = (index) => children.find((item) => String(item.index) === index);
    const onScroll = () => {
      if (isHidden(root)) {
        return;
      }
      const {
        sticky,
        indexList
      } = props2;
      const scrollTop = getScrollTop(scrollParent.value);
      const scrollParentRect = use.useRect(scrollParent);
      const rects = children.map((item) => item.getRect(scrollParent.value, scrollParentRect));
      let active = -1;
      if (selectActiveIndex) {
        const match = getMatchAnchor(selectActiveIndex);
        if (match) {
          const rect = match.getRect(scrollParent.value, scrollParentRect);
          active = getActiveAnchor(rect.top, rects);
        }
      } else {
        active = getActiveAnchor(scrollTop, rects);
      }
      activeAnchor.value = indexList[active];
      if (sticky) {
        children.forEach((item, index) => {
          const {
            state,
            $el
          } = item;
          if (index === active || index === active - 1) {
            const rect = $el.getBoundingClientRect();
            state.left = rect.left;
            state.width = rect.width;
          } else {
            state.left = null;
            state.width = null;
          }
          if (index === active) {
            state.active = true;
            state.top = Math.max(props2.stickyOffsetTop, rects[index].top - scrollTop) + scrollParentRect.top;
          } else if (index === active - 1 && selectActiveIndex === "") {
            const activeItemTop = rects[active].top - scrollTop;
            state.active = activeItemTop > 0;
            state.top = activeItemTop + scrollParentRect.top - rects[index].height;
          } else {
            state.active = false;
          }
        });
      }
      selectActiveIndex = "";
    };
    const init = () => {
      vue.nextTick(onScroll);
    };
    use.useEventListener("scroll", onScroll, {
      target: scrollParent,
      passive: true
    });
    vue.onMounted(init);
    vue.watch(() => props2.indexList, init);
    vue.watch(activeAnchor, (value) => {
      if (value) {
        emit("change", value);
      }
    });
    const renderIndexes = () => props2.indexList.map((index) => {
      const active = index === activeAnchor.value;
      return vue.createVNode("span", {
        "class": bem$C("index", {
          active
        }),
        "style": active ? highlightStyle.value : void 0,
        "data-index": index
      }, [index]);
    });
    const scrollTo = (index) => {
      selectActiveIndex = String(index);
      const match = getMatchAnchor(selectActiveIndex);
      if (match) {
        const scrollTop = getScrollTop(scrollParent.value);
        const scrollParentRect = use.useRect(scrollParent);
        const {
          offsetHeight
        } = document.documentElement;
        match.$el.scrollIntoView();
        if (scrollTop === offsetHeight - scrollParentRect.height) {
          onScroll();
          return;
        }
        if (props2.sticky && props2.stickyOffsetTop) {
          setRootScrollTop(getRootScrollTop() - props2.stickyOffsetTop);
        }
        emit("select", match.index);
      }
    };
    const scrollToElement = (element) => {
      const {
        index
      } = element.dataset;
      if (index) {
        scrollTo(index);
      }
    };
    const onClickSidebar = (event) => {
      scrollToElement(event.target);
    };
    let touchActiveIndex;
    const onTouchMove = (event) => {
      touch.move(event);
      if (touch.isVertical()) {
        preventDefault(event);
        const {
          clientX,
          clientY
        } = event.touches[0];
        const target = document.elementFromPoint(clientX, clientY);
        if (target) {
          const {
            index
          } = target.dataset;
          if (index && touchActiveIndex !== index) {
            touchActiveIndex = index;
            scrollToElement(target);
          }
        }
      }
    };
    const renderSidebar = () => vue.createVNode("div", {
      "ref": sidebar,
      "class": bem$C("sidebar"),
      "style": sidebarStyle.value,
      "onClick": onClickSidebar,
      "onTouchstartPassive": touch.start
    }, [renderIndexes()]);
    useExpose({
      scrollTo
    });
    use.useEventListener("touchmove", onTouchMove, {
      target: sidebar
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "ref": root,
        "class": bem$C()
      }, [props2.teleport ? vue.createVNode(vue.Teleport, {
        "to": props2.teleport
      }, {
        default: () => [renderSidebar()]
      }) : renderSidebar(), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const [name$C, bem$B] = createNamespace("index-anchor");
const indexAnchorProps = {
  index: numericProp
};
var stdin_default$K = vue.defineComponent({
  name: name$C,
  props: indexAnchorProps,
  setup(props2, {
    slots
  }) {
    const state = vue.reactive({
      top: 0,
      left: null,
      rect: {
        top: 0,
        height: 0
      },
      width: null,
      active: false
    });
    const root = vue.ref();
    const {
      parent
    } = use.useParent(INDEX_BAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <IndexAnchor> must be a child component of <IndexBar>.");
      }
      return;
    }
    const isSticky = () => state.active && parent.props.sticky;
    const anchorStyle = vue.computed(() => {
      const {
        zIndex,
        highlightColor
      } = parent.props;
      if (isSticky()) {
        return extend(getZIndexStyle(zIndex), {
          left: state.left ? `${state.left}px` : void 0,
          width: state.width ? `${state.width}px` : void 0,
          transform: state.top ? `translate3d(0, ${state.top}px, 0)` : void 0,
          color: highlightColor
        });
      }
    });
    const getRect = (scrollParent, scrollParentRect) => {
      const rootRect = use.useRect(root);
      state.rect.height = rootRect.height;
      if (scrollParent === window || scrollParent === document.body) {
        state.rect.top = rootRect.top + getRootScrollTop();
      } else {
        state.rect.top = rootRect.top + getScrollTop(scrollParent) - scrollParentRect.top;
      }
      return state.rect;
    };
    useExpose({
      state,
      getRect
    });
    return () => {
      const sticky = isSticky();
      return vue.createVNode("div", {
        "ref": root,
        "style": {
          height: sticky ? `${state.rect.height}px` : void 0
        }
      }, [vue.createVNode("div", {
        "style": anchorStyle.value,
        "class": [bem$B({
          sticky
        }), {
          [BORDER_BOTTOM]: sticky
        }]
      }, [slots.default ? slots.default() : props2.index])]);
    };
  }
});
const IndexAnchor = withInstall(stdin_default$K);
const IndexBar = withInstall(stdin_default$L);
const [name$B, bem$A, t$7] = createNamespace("list");
const listProps = {
  error: Boolean,
  offset: makeNumericProp(300),
  loading: Boolean,
  disabled: Boolean,
  finished: Boolean,
  errorText: String,
  direction: makeStringProp("down"),
  loadingText: String,
  finishedText: String,
  immediateCheck: truthProp
};
var stdin_default$J = vue.defineComponent({
  name: name$B,
  props: listProps,
  emits: ["load", "update:error", "update:loading"],
  setup(props2, {
    emit,
    slots
  }) {
    const loading = vue.ref(props2.loading);
    const root = vue.ref();
    const placeholder = vue.ref();
    const tabStatus = useTabStatus();
    const scrollParent = use.useScrollParent(root);
    const check = () => {
      vue.nextTick(() => {
        if (loading.value || props2.finished || props2.disabled || props2.error || // skip check when inside an inactive tab
        (tabStatus == null ? void 0 : tabStatus.value) === false) {
          return;
        }
        const {
          direction
        } = props2;
        const offset = +props2.offset;
        const scrollParentRect = use.useRect(scrollParent);
        if (!scrollParentRect.height || isHidden(root)) {
          return;
        }
        let isReachEdge = false;
        const placeholderRect = use.useRect(placeholder);
        if (direction === "up") {
          isReachEdge = scrollParentRect.top - placeholderRect.top <= offset;
        } else {
          isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset;
        }
        if (isReachEdge) {
          loading.value = true;
          emit("update:loading", true);
          emit("load");
        }
      });
    };
    const renderFinishedText = () => {
      if (props2.finished) {
        const text = slots.finished ? slots.finished() : props2.finishedText;
        if (text) {
          return vue.createVNode("div", {
            "class": bem$A("finished-text")
          }, [text]);
        }
      }
    };
    const clickErrorText = () => {
      emit("update:error", false);
      check();
    };
    const renderErrorText = () => {
      if (props2.error) {
        const text = slots.error ? slots.error() : props2.errorText;
        if (text) {
          return vue.createVNode("div", {
            "role": "button",
            "class": bem$A("error-text"),
            "tabindex": 0,
            "onClick": clickErrorText
          }, [text]);
        }
      }
    };
    const renderLoading = () => {
      if (loading.value && !props2.finished && !props2.disabled) {
        return vue.createVNode("div", {
          "class": bem$A("loading")
        }, [slots.loading ? slots.loading() : vue.createVNode(Loading, {
          "class": bem$A("loading-icon")
        }, {
          default: () => [props2.loadingText || t$7("loading")]
        })]);
      }
    };
    vue.watch(() => [props2.loading, props2.finished, props2.error], check);
    if (tabStatus) {
      vue.watch(tabStatus, (tabActive) => {
        if (tabActive) {
          check();
        }
      });
    }
    vue.onUpdated(() => {
      loading.value = props2.loading;
    });
    vue.onMounted(() => {
      if (props2.immediateCheck) {
        check();
      }
    });
    useExpose({
      check
    });
    use.useEventListener("scroll", check, {
      target: scrollParent,
      passive: true
    });
    return () => {
      var _a;
      const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
      const Placeholder = vue.createVNode("div", {
        "ref": placeholder,
        "class": bem$A("placeholder")
      }, null);
      return vue.createVNode("div", {
        "ref": root,
        "role": "feed",
        "class": bem$A(),
        "aria-busy": loading.value
      }, [props2.direction === "down" ? Content : Placeholder, renderLoading(), renderFinishedText(), renderErrorText(), props2.direction === "up" ? Content : Placeholder]);
    };
  }
});
const List = withInstall(stdin_default$J);
const [name$A, bem$z] = createNamespace("nav-bar");
const navBarProps = {
  title: String,
  fixed: Boolean,
  zIndex: numericProp,
  border: truthProp,
  leftText: String,
  rightText: String,
  leftArrow: Boolean,
  placeholder: Boolean,
  safeAreaInsetTop: Boolean,
  clickable: truthProp
};
var stdin_default$I = vue.defineComponent({
  name: name$A,
  props: navBarProps,
  emits: ["clickLeft", "clickRight"],
  setup(props2, {
    emit,
    slots
  }) {
    const navBarRef = vue.ref();
    const renderPlaceholder = usePlaceholder(navBarRef, bem$z);
    const onClickLeft = (event) => emit("clickLeft", event);
    const onClickRight = (event) => emit("clickRight", event);
    const renderLeft = () => {
      if (slots.left) {
        return slots.left();
      }
      return [props2.leftArrow && vue.createVNode(Icon, {
        "class": bem$z("arrow"),
        "name": "arrow-left"
      }, null), props2.leftText && vue.createVNode("span", {
        "class": bem$z("text")
      }, [props2.leftText])];
    };
    const renderRight = () => {
      if (slots.right) {
        return slots.right();
      }
      return vue.createVNode("span", {
        "class": bem$z("text")
      }, [props2.rightText]);
    };
    const renderNavBar = () => {
      const {
        title,
        fixed,
        border,
        zIndex
      } = props2;
      const style = getZIndexStyle(zIndex);
      const hasLeft = props2.leftArrow || props2.leftText || slots.left;
      const hasRight = props2.rightText || slots.right;
      return vue.createVNode("div", {
        "ref": navBarRef,
        "style": style,
        "class": [bem$z({
          fixed
        }), {
          [BORDER_BOTTOM]: border,
          "van-safe-area-top": props2.safeAreaInsetTop
        }]
      }, [vue.createVNode("div", {
        "class": bem$z("content")
      }, [hasLeft && vue.createVNode("div", {
        "class": [bem$z("left"), props2.clickable ? HAPTICS_FEEDBACK : ""],
        "onClick": onClickLeft
      }, [renderLeft()]), vue.createVNode("div", {
        "class": [bem$z("title"), "van-ellipsis"]
      }, [slots.title ? slots.title() : title]), hasRight && vue.createVNode("div", {
        "class": [bem$z("right"), props2.clickable ? HAPTICS_FEEDBACK : ""],
        "onClick": onClickRight
      }, [renderRight()])])]);
    };
    return () => {
      if (props2.fixed && props2.placeholder) {
        return renderPlaceholder(renderNavBar);
      }
      return renderNavBar();
    };
  }
});
const NavBar = withInstall(stdin_default$I);
const [name$z, bem$y] = createNamespace("notice-bar");
const noticeBarProps = {
  text: String,
  mode: String,
  color: String,
  delay: makeNumericProp(1),
  speed: makeNumericProp(60),
  leftIcon: String,
  wrapable: Boolean,
  background: String,
  scrollable: {
    type: Boolean,
    default: null
  }
};
var stdin_default$H = vue.defineComponent({
  name: name$z,
  props: noticeBarProps,
  emits: ["close", "replay"],
  setup(props2, {
    emit,
    slots
  }) {
    let wrapWidth = 0;
    let contentWidth = 0;
    let startTimer;
    const wrapRef = vue.ref();
    const contentRef = vue.ref();
    const state = vue.reactive({
      show: true,
      offset: 0,
      duration: 0
    });
    const renderLeftIcon = () => {
      if (slots["left-icon"]) {
        return slots["left-icon"]();
      }
      if (props2.leftIcon) {
        return vue.createVNode(Icon, {
          "class": bem$y("left-icon"),
          "name": props2.leftIcon
        }, null);
      }
    };
    const getRightIconName = () => {
      if (props2.mode === "closeable") {
        return "cross";
      }
      if (props2.mode === "link") {
        return "arrow";
      }
    };
    const onClickRightIcon = (event) => {
      if (props2.mode === "closeable") {
        state.show = false;
        emit("close", event);
      }
    };
    const renderRightIcon = () => {
      if (slots["right-icon"]) {
        return slots["right-icon"]();
      }
      const name2 = getRightIconName();
      if (name2) {
        return vue.createVNode(Icon, {
          "name": name2,
          "class": bem$y("right-icon"),
          "onClick": onClickRightIcon
        }, null);
      }
    };
    const onTransitionEnd = () => {
      state.offset = wrapWidth;
      state.duration = 0;
      use.raf(() => {
        use.doubleRaf(() => {
          state.offset = -contentWidth;
          state.duration = (contentWidth + wrapWidth) / +props2.speed;
          emit("replay");
        });
      });
    };
    const renderMarquee = () => {
      const ellipsis = props2.scrollable === false && !props2.wrapable;
      const style = {
        transform: state.offset ? `translateX(${state.offset}px)` : "",
        transitionDuration: `${state.duration}s`
      };
      return vue.createVNode("div", {
        "ref": wrapRef,
        "role": "marquee",
        "class": bem$y("wrap")
      }, [vue.createVNode("div", {
        "ref": contentRef,
        "style": style,
        "class": [bem$y("content"), {
          "van-ellipsis": ellipsis
        }],
        "onTransitionend": onTransitionEnd
      }, [slots.default ? slots.default() : props2.text])]);
    };
    const reset = () => {
      const {
        delay,
        speed,
        scrollable
      } = props2;
      const ms = isDef(delay) ? +delay * 1e3 : 0;
      wrapWidth = 0;
      contentWidth = 0;
      state.offset = 0;
      state.duration = 0;
      clearTimeout(startTimer);
      startTimer = setTimeout(() => {
        if (!wrapRef.value || !contentRef.value || scrollable === false) {
          return;
        }
        const wrapRefWidth = use.useRect(wrapRef).width;
        const contentRefWidth = use.useRect(contentRef).width;
        if (scrollable || contentRefWidth > wrapRefWidth) {
          use.doubleRaf(() => {
            wrapWidth = wrapRefWidth;
            contentWidth = contentRefWidth;
            state.offset = -contentWidth;
            state.duration = contentWidth / +speed;
          });
        }
      }, ms);
    };
    onPopupReopen(reset);
    use.onMountedOrActivated(reset);
    use.useEventListener("pageshow", reset);
    useExpose({
      reset
    });
    vue.watch(() => [props2.text, props2.scrollable], reset);
    return () => {
      const {
        color,
        wrapable,
        background
      } = props2;
      return vue.withDirectives(vue.createVNode("div", {
        "role": "alert",
        "class": bem$y({
          wrapable
        }),
        "style": {
          color,
          background
        }
      }, [renderLeftIcon(), renderMarquee(), renderRightIcon()]), [[vue.vShow, state.show]]);
    };
  }
});
const NoticeBar = withInstall(stdin_default$H);
const [name$y, bem$x] = createNamespace("notify");
const notifyProps = extend({}, popupSharedProps, {
  type: makeStringProp("danger"),
  color: String,
  message: numericProp,
  position: makeStringProp("top"),
  className: unknownProp,
  background: String,
  lockScroll: Boolean
});
var stdin_default$G = vue.defineComponent({
  name: name$y,
  props: notifyProps,
  emits: ["update:show"],
  setup(props2, {
    emit,
    slots
  }) {
    const updateShow = (show) => emit("update:show", show);
    return () => vue.createVNode(Popup, {
      "show": props2.show,
      "class": [bem$x([props2.type]), props2.className],
      "style": {
        color: props2.color,
        background: props2.background
      },
      "overlay": false,
      "zIndex": props2.zIndex,
      "position": props2.position,
      "duration": 0.2,
      "lockScroll": props2.lockScroll,
      "onUpdate:show": updateShow
    }, {
      default: () => [slots.default ? slots.default() : props2.message]
    });
  }
});
let timer;
let instance;
const parseOptions = (message) => isObject(message) ? message : {
  message
};
function initInstance() {
  ({
    instance
  } = mountComponent({
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      return () => vue.createVNode(stdin_default$G, vue.mergeProps(state, {
        "onUpdate:show": toggle
      }), null);
    }
  }));
}
const getDefaultOptions = () => ({
  type: "danger",
  color: void 0,
  message: "",
  onClose: void 0,
  onClick: void 0,
  onOpened: void 0,
  duration: 3e3,
  position: void 0,
  className: "",
  lockScroll: false,
  background: void 0
});
let currentOptions = getDefaultOptions();
const closeNotify = () => {
  if (instance) {
    instance.toggle(false);
  }
};
function showNotify(options) {
  if (!inBrowser) {
    return;
  }
  if (!instance) {
    initInstance();
  }
  options = extend({}, currentOptions, parseOptions(options));
  instance.open(options);
  clearTimeout(timer);
  if (options.duration > 0) {
    timer = setTimeout(closeNotify, options.duration);
  }
  return instance;
}
const setNotifyDefaultOptions = (options) => extend(currentOptions, options);
const resetNotifyDefaultOptions = () => {
  currentOptions = getDefaultOptions();
};
const Notify = withInstall(stdin_default$G);
const [name$x, bem$w] = createNamespace("key");
const CollapseIcon = vue.createVNode("svg", {
  "class": bem$w("collapse-icon"),
  "viewBox": "0 0 30 24"
}, [vue.createVNode("path", {
  "d": "M26 13h-2v2h2v-2zm-8-3h2V8h-2v2zm2-4h2V4h-2v2zm2 4h4V4h-2v4h-2v2zm-7 14 3-3h-6l3 3zM6 13H4v2h2v-2zm16 0H8v2h14v-2zm-12-3h2V8h-2v2zM28 0l1 1 1 1v15l-1 2H1l-1-2V2l1-1 1-1zm0 2H2v15h26V2zM6 4v2H4V4zm10 2h2V4h-2v2zM8 9v1H4V8zm8 0v1h-2V8zm-6-5v2H8V4zm4 0v2h-2V4z",
  "fill": "currentColor"
}, null)]);
const DeleteIcon = vue.createVNode("svg", {
  "class": bem$w("delete-icon"),
  "viewBox": "0 0 32 22"
}, [vue.createVNode("path", {
  "d": "M28 0a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10.4a2 2 0 0 1-1.4-.6L1 13.1c-.6-.5-.9-1.3-.9-2 0-1 .3-1.7.9-2.2L9 .6a2 2 0 0 1 1.4-.6zm0 2H10.4l-8.2 8.3a1 1 0 0 0-.3.7c0 .3.1.5.3.7l8.2 8.4H28a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2zm-5 4a1 1 0 0 1 .7.3 1 1 0 0 1 0 1.4L20.4 11l3.3 3.3c.2.2.3.5.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3L19 12.4l-3.4 3.3a1 1 0 0 1-.6.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.2.1-.5.3-.7l3.3-3.3-3.3-3.3A1 1 0 0 1 14 7c0-.3.1-.5.3-.7A1 1 0 0 1 15 6a1 1 0 0 1 .6.3L19 9.6l3.3-3.3A1 1 0 0 1 23 6z",
  "fill": "currentColor"
}, null)]);
var stdin_default$F = vue.defineComponent({
  name: name$x,
  props: {
    type: String,
    text: numericProp,
    color: String,
    wider: Boolean,
    large: Boolean,
    loading: Boolean
  },
  emits: ["press"],
  setup(props2, {
    emit,
    slots
  }) {
    const active = vue.ref(false);
    const touch = useTouch();
    const onTouchStart = (event) => {
      touch.start(event);
      active.value = true;
    };
    const onTouchMove = (event) => {
      touch.move(event);
      if (touch.direction.value) {
        active.value = false;
      }
    };
    const onTouchEnd = (event) => {
      if (active.value) {
        if (!slots.default) {
          preventDefault(event);
        }
        active.value = false;
        emit("press", props2.text, props2.type);
      }
    };
    const renderContent = () => {
      if (props2.loading) {
        return vue.createVNode(Loading, {
          "class": bem$w("loading-icon")
        }, null);
      }
      const text = slots.default ? slots.default() : props2.text;
      switch (props2.type) {
        case "delete":
          return text || DeleteIcon;
        case "extra":
          return text || CollapseIcon;
        default:
          return text;
      }
    };
    return () => vue.createVNode("div", {
      "class": bem$w("wrapper", {
        wider: props2.wider
      }),
      "onTouchstartPassive": onTouchStart,
      "onTouchmovePassive": onTouchMove,
      "onTouchend": onTouchEnd,
      "onTouchcancel": onTouchEnd
    }, [vue.createVNode("div", {
      "role": "button",
      "tabindex": 0,
      "class": bem$w([props2.color, {
        large: props2.large,
        active: active.value,
        delete: props2.type === "delete"
      }])
    }, [renderContent()])]);
  }
});
const [name$w, bem$v] = createNamespace("number-keyboard");
const numberKeyboardProps = {
  show: Boolean,
  title: String,
  theme: makeStringProp("default"),
  zIndex: numericProp,
  teleport: [String, Object],
  maxlength: makeNumericProp(Infinity),
  modelValue: makeStringProp(""),
  transition: truthProp,
  blurOnClose: truthProp,
  showDeleteKey: truthProp,
  randomKeyOrder: Boolean,
  closeButtonText: String,
  deleteButtonText: String,
  closeButtonLoading: Boolean,
  hideOnClickOutside: truthProp,
  safeAreaInsetBottom: truthProp,
  extraKey: {
    type: [String, Array],
    default: ""
  }
};
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
var stdin_default$E = vue.defineComponent({
  name: name$w,
  inheritAttrs: false,
  props: numberKeyboardProps,
  emits: ["show", "hide", "blur", "input", "close", "delete", "update:modelValue"],
  setup(props2, {
    emit,
    slots,
    attrs
  }) {
    const root = vue.ref();
    const genBasicKeys = () => {
      const keys2 = Array(9).fill("").map((_, i) => ({
        text: i + 1
      }));
      if (props2.randomKeyOrder) {
        shuffle(keys2);
      }
      return keys2;
    };
    const genDefaultKeys = () => [...genBasicKeys(), {
      text: props2.extraKey,
      type: "extra"
    }, {
      text: 0
    }, {
      text: props2.showDeleteKey ? props2.deleteButtonText : "",
      type: props2.showDeleteKey ? "delete" : ""
    }];
    const genCustomKeys = () => {
      const keys2 = genBasicKeys();
      const {
        extraKey
      } = props2;
      const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];
      if (extraKeys.length === 1) {
        keys2.push({
          text: 0,
          wider: true
        }, {
          text: extraKeys[0],
          type: "extra"
        });
      } else if (extraKeys.length === 2) {
        keys2.push({
          text: extraKeys[0],
          type: "extra"
        }, {
          text: 0
        }, {
          text: extraKeys[1],
          type: "extra"
        });
      }
      return keys2;
    };
    const keys = vue.computed(() => props2.theme === "custom" ? genCustomKeys() : genDefaultKeys());
    const onBlur = () => {
      if (props2.show) {
        emit("blur");
      }
    };
    const onClose = () => {
      emit("close");
      if (props2.blurOnClose) {
        onBlur();
      }
    };
    const onAnimationEnd = () => emit(props2.show ? "show" : "hide");
    const onPress = (text, type) => {
      if (text === "") {
        if (type === "extra") {
          onBlur();
        }
        return;
      }
      const value = props2.modelValue;
      if (type === "delete") {
        emit("delete");
        emit("update:modelValue", value.slice(0, value.length - 1));
      } else if (type === "close") {
        onClose();
      } else if (value.length < +props2.maxlength) {
        emit("input", text);
        emit("update:modelValue", value + text);
      }
    };
    const renderTitle = () => {
      const {
        title,
        theme,
        closeButtonText
      } = props2;
      const leftSlot = slots["title-left"];
      const showClose = closeButtonText && theme === "default";
      const showTitle = title || showClose || leftSlot;
      if (!showTitle) {
        return;
      }
      return vue.createVNode("div", {
        "class": bem$v("header")
      }, [leftSlot && vue.createVNode("span", {
        "class": bem$v("title-left")
      }, [leftSlot()]), title && vue.createVNode("h2", {
        "class": bem$v("title")
      }, [title]), showClose && vue.createVNode("button", {
        "type": "button",
        "class": [bem$v("close"), HAPTICS_FEEDBACK],
        "onClick": onClose
      }, [closeButtonText])]);
    };
    const renderKeys = () => keys.value.map((key) => {
      const keySlots = {};
      if (key.type === "delete") {
        keySlots.default = slots.delete;
      }
      if (key.type === "extra") {
        keySlots.default = slots["extra-key"];
      }
      return vue.createVNode(stdin_default$F, {
        "key": key.text,
        "text": key.text,
        "type": key.type,
        "wider": key.wider,
        "color": key.color,
        "onPress": onPress
      }, keySlots);
    });
    const renderSidebar = () => {
      if (props2.theme === "custom") {
        return vue.createVNode("div", {
          "class": bem$v("sidebar")
        }, [props2.showDeleteKey && vue.createVNode(stdin_default$F, {
          "large": true,
          "text": props2.deleteButtonText,
          "type": "delete",
          "onPress": onPress
        }, {
          delete: slots.delete
        }), vue.createVNode(stdin_default$F, {
          "large": true,
          "text": props2.closeButtonText,
          "type": "close",
          "color": "blue",
          "loading": props2.closeButtonLoading,
          "onPress": onPress
        }, null)]);
      }
    };
    vue.watch(() => props2.show, (value) => {
      if (!props2.transition) {
        emit(value ? "show" : "hide");
      }
    });
    if (props2.hideOnClickOutside) {
      use.useClickAway(root, onBlur, {
        eventName: "touchstart"
      });
    }
    return () => {
      const Title = renderTitle();
      const Content = vue.createVNode(vue.Transition, {
        "name": props2.transition ? "van-slide-up" : ""
      }, {
        default: () => [vue.withDirectives(vue.createVNode("div", vue.mergeProps({
          "ref": root,
          "style": getZIndexStyle(props2.zIndex),
          "class": bem$v({
            unfit: !props2.safeAreaInsetBottom,
            "with-title": !!Title
          }),
          "onAnimationend": onAnimationEnd,
          "onTouchstartPassive": stopPropagation
        }, attrs), [Title, vue.createVNode("div", {
          "class": bem$v("body")
        }, [vue.createVNode("div", {
          "class": bem$v("keys")
        }, [renderKeys()]), renderSidebar()])]), [[vue.vShow, props2.show]])]
      });
      if (props2.teleport) {
        return vue.createVNode(vue.Teleport, {
          "to": props2.teleport
        }, {
          default: () => [Content]
        });
      }
      return Content;
    };
  }
});
const NumberKeyboard = withInstall(stdin_default$E);
const [name$v, bem$u, t$6] = createNamespace("pagination");
const makePage = (number, text, active) => ({
  number,
  text,
  active
});
const paginationProps = {
  mode: makeStringProp("multi"),
  prevText: String,
  nextText: String,
  pageCount: makeNumericProp(0),
  modelValue: makeNumberProp(0),
  totalItems: makeNumericProp(0),
  showPageSize: makeNumericProp(5),
  itemsPerPage: makeNumericProp(10),
  forceEllipses: Boolean,
  showPrevButton: truthProp,
  showNextButton: truthProp
};
var stdin_default$D = vue.defineComponent({
  name: name$v,
  props: paginationProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const count = vue.computed(() => {
      const {
        pageCount,
        totalItems,
        itemsPerPage
      } = props2;
      const count2 = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
      return Math.max(1, count2);
    });
    const pages = vue.computed(() => {
      const items = [];
      const pageCount = count.value;
      const showPageSize = +props2.showPageSize;
      const {
        modelValue,
        forceEllipses
      } = props2;
      let startPage = 1;
      let endPage = pageCount;
      const isMaxSized = showPageSize < pageCount;
      if (isMaxSized) {
        startPage = Math.max(modelValue - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1;
        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      }
      for (let number = startPage; number <= endPage; number++) {
        const page = makePage(number, number, number === modelValue);
        items.push(page);
      }
      if (isMaxSized && showPageSize > 0 && forceEllipses) {
        if (startPage > 1) {
          const prevPages = makePage(startPage - 1, "...");
          items.unshift(prevPages);
        }
        if (endPage < pageCount) {
          const nextPages = makePage(endPage + 1, "...");
          items.push(nextPages);
        }
      }
      return items;
    });
    const updateModelValue = (value, emitChange) => {
      value = clamp(value, 1, count.value);
      if (props2.modelValue !== value) {
        emit("update:modelValue", value);
        if (emitChange) {
          emit("change", value);
        }
      }
    };
    vue.watchEffect(() => updateModelValue(props2.modelValue));
    const renderDesc = () => vue.createVNode("li", {
      "class": bem$u("page-desc")
    }, [slots.pageDesc ? slots.pageDesc() : `${props2.modelValue}/${count.value}`]);
    const renderPrevButton = () => {
      const {
        mode,
        modelValue,
        showPrevButton
      } = props2;
      if (!showPrevButton) {
        return;
      }
      const slot = slots["prev-text"];
      const disabled = modelValue === 1;
      return vue.createVNode("li", {
        "class": [bem$u("item", {
          disabled,
          border: mode === "simple",
          prev: true
        }), BORDER_SURROUND]
      }, [vue.createVNode("button", {
        "type": "button",
        "disabled": disabled,
        "onClick": () => updateModelValue(modelValue - 1, true)
      }, [slot ? slot() : props2.prevText || t$6("prev")])]);
    };
    const renderNextButton = () => {
      const {
        mode,
        modelValue,
        showNextButton
      } = props2;
      if (!showNextButton) {
        return;
      }
      const slot = slots["next-text"];
      const disabled = modelValue === count.value;
      return vue.createVNode("li", {
        "class": [bem$u("item", {
          disabled,
          border: mode === "simple",
          next: true
        }), BORDER_SURROUND]
      }, [vue.createVNode("button", {
        "type": "button",
        "disabled": disabled,
        "onClick": () => updateModelValue(modelValue + 1, true)
      }, [slot ? slot() : props2.nextText || t$6("next")])]);
    };
    const renderPages = () => pages.value.map((page) => vue.createVNode("li", {
      "class": [bem$u("item", {
        active: page.active,
        page: true
      }), BORDER_SURROUND]
    }, [vue.createVNode("button", {
      "type": "button",
      "aria-current": page.active || void 0,
      "onClick": () => updateModelValue(page.number, true)
    }, [slots.page ? slots.page(page) : page.text])]));
    return () => vue.createVNode("nav", {
      "role": "navigation",
      "class": bem$u()
    }, [vue.createVNode("ul", {
      "class": bem$u("items")
    }, [renderPrevButton(), props2.mode === "simple" ? renderDesc() : renderPages(), renderNextButton()])]);
  }
});
const Pagination = withInstall(stdin_default$D);
const [name$u, bem$t] = createNamespace("password-input");
const passwordInputProps = {
  info: String,
  mask: truthProp,
  value: makeStringProp(""),
  gutter: numericProp,
  length: makeNumericProp(6),
  focused: Boolean,
  errorInfo: String
};
var stdin_default$C = vue.defineComponent({
  name: name$u,
  props: passwordInputProps,
  emits: ["focus"],
  setup(props2, {
    emit
  }) {
    const onTouchStart = (event) => {
      event.stopPropagation();
      emit("focus", event);
    };
    const renderPoints = () => {
      const Points = [];
      const {
        mask,
        value,
        gutter,
        focused
      } = props2;
      const length = +props2.length;
      for (let i = 0; i < length; i++) {
        const char = value[i];
        const showBorder = i !== 0 && !gutter;
        const showCursor = focused && i === value.length;
        let style;
        if (i !== 0 && gutter) {
          style = {
            marginLeft: addUnit(gutter)
          };
        }
        Points.push(vue.createVNode("li", {
          "class": [{
            [BORDER_LEFT]: showBorder
          }, bem$t("item", {
            focus: showCursor
          })],
          "style": style
        }, [mask ? vue.createVNode("i", {
          "style": {
            visibility: char ? "visible" : "hidden"
          }
        }, null) : char, showCursor && vue.createVNode("div", {
          "class": bem$t("cursor")
        }, null)]));
      }
      return Points;
    };
    return () => {
      const info = props2.errorInfo || props2.info;
      return vue.createVNode("div", {
        "class": bem$t()
      }, [vue.createVNode("ul", {
        "class": [bem$t("security"), {
          [BORDER_SURROUND]: !props2.gutter
        }],
        "onTouchstartPassive": onTouchStart
      }, [renderPoints()]), info && vue.createVNode("div", {
        "class": bem$t(props2.errorInfo ? "error-info" : "info")
      }, [info])]);
    };
  }
});
const PasswordInput = withInstall(stdin_default$C);
const PickerGroup = withInstall(stdin_default$1z);
const [name$t, bem$s] = createNamespace("popover");
const popupProps = ["overlay", "duration", "teleport", "overlayStyle", "overlayClass", "closeOnClickOverlay"];
const popoverProps = {
  show: Boolean,
  theme: makeStringProp("light"),
  overlay: Boolean,
  actions: makeArrayProp(),
  actionsDirection: makeStringProp("vertical"),
  trigger: makeStringProp("click"),
  duration: numericProp,
  showArrow: truthProp,
  placement: makeStringProp("bottom"),
  iconPrefix: String,
  overlayClass: unknownProp,
  overlayStyle: Object,
  closeOnClickAction: truthProp,
  closeOnClickOverlay: truthProp,
  closeOnClickOutside: truthProp,
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var stdin_default$B = vue.defineComponent({
  name: name$t,
  props: popoverProps,
  emits: ["select", "touchstart", "update:show"],
  setup(props2, {
    emit,
    slots,
    attrs
  }) {
    let popper;
    const popupRef = vue.ref();
    const wrapperRef = vue.ref();
    const popoverRef = vue.ref();
    const show = useSyncPropRef(() => props2.show, (value) => emit("update:show", value));
    const getPopoverOptions = () => ({
      placement: props2.placement,
      modifiers: [{
        name: "computeStyles",
        options: {
          adaptive: false,
          gpuAcceleration: false
        }
      }, extend({}, popperjs.offsetModifier, {
        options: {
          offset: props2.offset
        }
      })]
    });
    const createPopperInstance = () => {
      if (wrapperRef.value && popoverRef.value) {
        return popperjs.createPopper(wrapperRef.value, popoverRef.value.popupRef.value, getPopoverOptions());
      }
      return null;
    };
    const updateLocation = () => {
      vue.nextTick(() => {
        if (!show.value) {
          return;
        }
        if (!popper) {
          popper = createPopperInstance();
          if (inBrowser) {
            window.addEventListener("animationend", updateLocation);
            window.addEventListener("transitionend", updateLocation);
          }
        } else {
          popper.setOptions(getPopoverOptions());
        }
      });
    };
    const updateShow = (value) => {
      show.value = value;
    };
    const onClickWrapper = () => {
      if (props2.trigger === "click") {
        show.value = !show.value;
      }
    };
    const onClickAction = (action, index) => {
      if (action.disabled) {
        return;
      }
      emit("select", action, index);
      if (props2.closeOnClickAction) {
        show.value = false;
      }
    };
    const onClickAway = () => {
      if (show.value && props2.closeOnClickOutside && (!props2.overlay || props2.closeOnClickOverlay)) {
        show.value = false;
      }
    };
    const renderActionContent = (action, index) => {
      if (slots.action) {
        return slots.action({
          action,
          index
        });
      }
      return [action.icon && vue.createVNode(Icon, {
        "name": action.icon,
        "classPrefix": props2.iconPrefix,
        "class": bem$s("action-icon")
      }, null), vue.createVNode("div", {
        "class": [bem$s("action-text"), {
          [BORDER_BOTTOM]: props2.actionsDirection === "vertical"
        }]
      }, [action.text])];
    };
    const renderAction = (action, index) => {
      const {
        icon,
        color,
        disabled,
        className
      } = action;
      return vue.createVNode("div", {
        "role": "menuitem",
        "class": [bem$s("action", {
          disabled,
          "with-icon": icon
        }), {
          [BORDER_RIGHT]: props2.actionsDirection === "horizontal"
        }, className],
        "style": {
          color
        },
        "tabindex": disabled ? void 0 : 0,
        "aria-disabled": disabled || void 0,
        "onClick": () => onClickAction(action, index)
      }, [renderActionContent(action, index)]);
    };
    vue.onMounted(() => {
      updateLocation();
      vue.watchEffect(() => {
        var _a;
        popupRef.value = (_a = popoverRef.value) == null ? void 0 : _a.popupRef.value;
      });
    });
    vue.onBeforeUnmount(() => {
      if (popper) {
        if (inBrowser) {
          window.removeEventListener("animationend", updateLocation);
          window.removeEventListener("transitionend", updateLocation);
        }
        popper.destroy();
        popper = null;
      }
    });
    vue.watch(() => [show.value, props2.offset, props2.placement], updateLocation);
    use.useClickAway([wrapperRef, popupRef], onClickAway, {
      eventName: "touchstart"
    });
    return () => {
      var _a;
      return vue.createVNode(vue.Fragment, null, [vue.createVNode("span", {
        "ref": wrapperRef,
        "class": bem$s("wrapper"),
        "onClick": onClickWrapper
      }, [(_a = slots.reference) == null ? void 0 : _a.call(slots)]), vue.createVNode(Popup, vue.mergeProps({
        "ref": popoverRef,
        "show": show.value,
        "class": bem$s([props2.theme]),
        "position": "",
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "onUpdate:show": updateShow
      }, attrs, pick(props2, popupProps)), {
        default: () => [props2.showArrow && vue.createVNode("div", {
          "class": bem$s("arrow")
        }, null), vue.createVNode("div", {
          "role": "menu",
          "class": bem$s("content", props2.actionsDirection)
        }, [slots.default ? slots.default() : props2.actions.map(renderAction)])]
      })]);
    };
  }
});
const Popover = withInstall(stdin_default$B);
const [name$s, bem$r] = createNamespace("progress");
const progressProps = {
  color: String,
  inactive: Boolean,
  pivotText: String,
  textColor: String,
  showPivot: truthProp,
  pivotColor: String,
  trackColor: String,
  strokeWidth: numericProp,
  percentage: {
    type: numericProp,
    default: 0,
    validator: (value) => +value >= 0 && +value <= 100
  }
};
var stdin_default$A = vue.defineComponent({
  name: name$s,
  props: progressProps,
  setup(props2) {
    const background = vue.computed(() => props2.inactive ? void 0 : props2.color);
    const renderPivot = () => {
      const {
        textColor,
        pivotText,
        pivotColor,
        percentage
      } = props2;
      const text = pivotText != null ? pivotText : `${percentage}%`;
      if (props2.showPivot && text) {
        const style = {
          color: textColor,
          left: `${+percentage}%`,
          transform: `translate(-${+percentage}%,-50%)`,
          background: pivotColor || background.value
        };
        return vue.createVNode("span", {
          "style": style,
          "class": bem$r("pivot", {
            inactive: props2.inactive
          })
        }, [text]);
      }
    };
    return () => {
      const {
        trackColor,
        percentage,
        strokeWidth
      } = props2;
      const rootStyle = {
        background: trackColor,
        height: addUnit(strokeWidth)
      };
      const portionStyle = {
        width: `${percentage}%`,
        background: background.value
      };
      return vue.createVNode("div", {
        "class": bem$r(),
        "style": rootStyle
      }, [vue.createVNode("span", {
        "class": bem$r("portion", {
          inactive: props2.inactive
        }),
        "style": portionStyle
      }, null), renderPivot()]);
    };
  }
});
const Progress = withInstall(stdin_default$A);
const [name$r, bem$q, t$5] = createNamespace("pull-refresh");
const DEFAULT_HEAD_HEIGHT = 50;
const TEXT_STATUS = ["pulling", "loosing", "success"];
const pullRefreshProps = {
  disabled: Boolean,
  modelValue: Boolean,
  headHeight: makeNumericProp(DEFAULT_HEAD_HEIGHT),
  successText: String,
  pullingText: String,
  loosingText: String,
  loadingText: String,
  pullDistance: numericProp,
  successDuration: makeNumericProp(500),
  animationDuration: makeNumericProp(300)
};
var stdin_default$z = vue.defineComponent({
  name: name$r,
  props: pullRefreshProps,
  emits: ["change", "refresh", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    let reachTop;
    const root = vue.ref();
    const track = vue.ref();
    const scrollParent = use.useScrollParent(root);
    const state = vue.reactive({
      status: "normal",
      distance: 0,
      duration: 0
    });
    const touch = useTouch();
    const getHeadStyle = () => {
      if (props2.headHeight !== DEFAULT_HEAD_HEIGHT) {
        return {
          height: `${props2.headHeight}px`
        };
      }
    };
    const isTouchable = () => state.status !== "loading" && state.status !== "success" && !props2.disabled;
    const ease = (distance) => {
      const pullDistance = +(props2.pullDistance || props2.headHeight);
      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2;
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
        }
      }
      return Math.round(distance);
    };
    const setStatus = (distance, isLoading) => {
      const pullDistance = +(props2.pullDistance || props2.headHeight);
      state.distance = distance;
      if (isLoading) {
        state.status = "loading";
      } else if (distance === 0) {
        state.status = "normal";
      } else if (distance < pullDistance) {
        state.status = "pulling";
      } else {
        state.status = "loosing";
      }
      emit("change", {
        status: state.status,
        distance
      });
    };
    const getStatusText = () => {
      const {
        status
      } = state;
      if (status === "normal") {
        return "";
      }
      return props2[`${status}Text`] || t$5(status);
    };
    const renderStatus = () => {
      const {
        status,
        distance
      } = state;
      if (slots[status]) {
        return slots[status]({
          distance
        });
      }
      const nodes = [];
      if (TEXT_STATUS.includes(status)) {
        nodes.push(vue.createVNode("div", {
          "class": bem$q("text")
        }, [getStatusText()]));
      }
      if (status === "loading") {
        nodes.push(vue.createVNode(Loading, {
          "class": bem$q("loading")
        }, {
          default: getStatusText
        }));
      }
      return nodes;
    };
    const showSuccessTip = () => {
      state.status = "success";
      setTimeout(() => {
        setStatus(0);
      }, +props2.successDuration);
    };
    const checkPosition = (event) => {
      reachTop = getScrollTop(scrollParent.value) === 0;
      if (reachTop) {
        state.duration = 0;
        touch.start(event);
      }
    };
    const onTouchStart = (event) => {
      if (isTouchable()) {
        checkPosition(event);
      }
    };
    const onTouchMove = (event) => {
      if (isTouchable()) {
        if (!reachTop) {
          checkPosition(event);
        }
        const {
          deltaY
        } = touch;
        touch.move(event);
        if (reachTop && deltaY.value >= 0 && touch.isVertical()) {
          preventDefault(event);
          setStatus(ease(deltaY.value));
        }
      }
    };
    const onTouchEnd = () => {
      if (reachTop && touch.deltaY.value && isTouchable()) {
        state.duration = +props2.animationDuration;
        if (state.status === "loosing") {
          setStatus(+props2.headHeight, true);
          emit("update:modelValue", true);
          vue.nextTick(() => emit("refresh"));
        } else {
          setStatus(0);
        }
      }
    };
    vue.watch(() => props2.modelValue, (value) => {
      state.duration = +props2.animationDuration;
      if (value) {
        setStatus(+props2.headHeight, true);
      } else if (slots.success || props2.successText) {
        showSuccessTip();
      } else {
        setStatus(0, false);
      }
    });
    use.useEventListener("touchmove", onTouchMove, {
      target: track
    });
    return () => {
      var _a;
      const trackStyle = {
        transitionDuration: `${state.duration}ms`,
        transform: state.distance ? `translate3d(0,${state.distance}px, 0)` : ""
      };
      return vue.createVNode("div", {
        "ref": root,
        "class": bem$q()
      }, [vue.createVNode("div", {
        "ref": track,
        "class": bem$q("track"),
        "style": trackStyle,
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [vue.createVNode("div", {
        "class": bem$q("head"),
        "style": getHeadStyle()
      }, [renderStatus()]), (_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});
const PullRefresh = withInstall(stdin_default$z);
const [name$q, bem$p] = createNamespace("rate");
function getRateStatus(value, index, allowHalf, readonly) {
  if (value >= index) {
    return {
      status: "full",
      value: 1
    };
  }
  if (value + 0.5 >= index && allowHalf && !readonly) {
    return {
      status: "half",
      value: 0.5
    };
  }
  if (value + 1 >= index && allowHalf && readonly) {
    const cardinal = 10 ** 10;
    return {
      status: "half",
      value: Math.round((value - index + 1) * cardinal) / cardinal
    };
  }
  return {
    status: "void",
    value: 0
  };
}
const rateProps = {
  size: numericProp,
  icon: makeStringProp("star"),
  color: String,
  count: makeNumericProp(5),
  gutter: numericProp,
  clearable: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  voidIcon: makeStringProp("star-o"),
  allowHalf: Boolean,
  voidColor: String,
  touchable: truthProp,
  iconPrefix: String,
  modelValue: makeNumberProp(0),
  disabledColor: String
};
var stdin_default$y = vue.defineComponent({
  name: name$q,
  props: rateProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit
  }) {
    const touch = useTouch();
    const [itemRefs, setItemRefs] = useRefs();
    const groupRef = vue.ref();
    const unselectable = vue.computed(() => props2.readonly || props2.disabled);
    const untouchable = vue.computed(() => unselectable.value || !props2.touchable);
    const list = vue.computed(() => Array(+props2.count).fill("").map((_, i) => getRateStatus(props2.modelValue, i + 1, props2.allowHalf, props2.readonly)));
    let ranges;
    let groupRefRect;
    let minRectTop = Number.MAX_SAFE_INTEGER;
    let maxRectTop = Number.MIN_SAFE_INTEGER;
    const updateRanges = () => {
      groupRefRect = use.useRect(groupRef);
      const rects = itemRefs.value.map(use.useRect);
      ranges = [];
      rects.forEach((rect, index) => {
        minRectTop = Math.min(rect.top, minRectTop);
        maxRectTop = Math.max(rect.top, maxRectTop);
        if (props2.allowHalf) {
          ranges.push({
            score: index + 0.5,
            left: rect.left,
            top: rect.top,
            height: rect.height
          }, {
            score: index + 1,
            left: rect.left + rect.width / 2,
            top: rect.top,
            height: rect.height
          });
        } else {
          ranges.push({
            score: index + 1,
            left: rect.left,
            top: rect.top,
            height: rect.height
          });
        }
      });
    };
    const getScoreByPosition = (x, y) => {
      for (let i = ranges.length - 1; i > 0; i--) {
        if (y >= groupRefRect.top && y <= groupRefRect.bottom) {
          if (x > ranges[i].left && y >= ranges[i].top && y <= ranges[i].top + ranges[i].height) {
            return ranges[i].score;
          }
        } else {
          const curTop = y < groupRefRect.top ? minRectTop : maxRectTop;
          if (x > ranges[i].left && ranges[i].top === curTop) {
            return ranges[i].score;
          }
        }
      }
      return props2.allowHalf ? 0.5 : 1;
    };
    const select = (value) => {
      if (unselectable.value || value === props2.modelValue)
        return;
      emit("update:modelValue", value);
      emit("change", value);
    };
    const onTouchStart = (event) => {
      if (untouchable.value) {
        return;
      }
      touch.start(event);
      updateRanges();
    };
    const onTouchMove = (event) => {
      if (untouchable.value) {
        return;
      }
      touch.move(event);
      if (touch.isHorizontal() && !touch.isTap.value) {
        const {
          clientX,
          clientY
        } = event.touches[0];
        preventDefault(event);
        select(getScoreByPosition(clientX, clientY));
      }
    };
    const renderStar = (item, index) => {
      const {
        icon,
        size,
        color,
        count,
        gutter,
        voidIcon,
        disabled,
        voidColor,
        allowHalf,
        iconPrefix,
        disabledColor
      } = props2;
      const score = index + 1;
      const isFull = item.status === "full";
      const isVoid = item.status === "void";
      const renderHalf = allowHalf && item.value > 0 && item.value < 1;
      let style;
      if (gutter && score !== +count) {
        style = {
          paddingRight: addUnit(gutter)
        };
      }
      const onClickItem = (event) => {
        updateRanges();
        let value = allowHalf ? getScoreByPosition(event.clientX, event.clientY) : score;
        if (props2.clearable && touch.isTap.value && value === props2.modelValue) {
          value = 0;
        }
        select(value);
      };
      return vue.createVNode("div", {
        "key": index,
        "ref": setItemRefs(index),
        "role": "radio",
        "style": style,
        "class": bem$p("item"),
        "tabindex": disabled ? void 0 : 0,
        "aria-setsize": count,
        "aria-posinset": score,
        "aria-checked": !isVoid,
        "onClick": onClickItem
      }, [vue.createVNode(Icon, {
        "size": size,
        "name": isFull ? icon : voidIcon,
        "class": bem$p("icon", {
          disabled,
          full: isFull
        }),
        "color": disabled ? disabledColor : isFull ? color : voidColor,
        "classPrefix": iconPrefix
      }, null), renderHalf && vue.createVNode(Icon, {
        "size": size,
        "style": {
          width: item.value + "em"
        },
        "name": isVoid ? voidIcon : icon,
        "class": bem$p("icon", ["half", {
          disabled,
          full: !isVoid
        }]),
        "color": disabled ? disabledColor : isVoid ? voidColor : color,
        "classPrefix": iconPrefix
      }, null)]);
    };
    use.useCustomFieldValue(() => props2.modelValue);
    use.useEventListener("touchmove", onTouchMove, {
      target: groupRef
    });
    return () => vue.createVNode("div", {
      "ref": groupRef,
      "role": "radiogroup",
      "class": bem$p({
        readonly: props2.readonly,
        disabled: props2.disabled
      }),
      "tabindex": props2.disabled ? void 0 : 0,
      "aria-disabled": props2.disabled,
      "aria-readonly": props2.readonly,
      "onTouchstartPassive": onTouchStart
    }, [list.value.map(renderStar)]);
  }
});
const Rate = withInstall(stdin_default$y);
const props = {
  figureArr: makeArrayProp(),
  delay: Number,
  duration: makeNumberProp(2),
  isStart: Boolean,
  direction: makeStringProp("down"),
  height: makeNumberProp(40)
};
const [name$p, bem$o] = createNamespace("rolling-text-item");
var stdin_default$x = vue.defineComponent({
  name: name$p,
  props,
  setup(props2) {
    const newFigureArr = vue.computed(() => props2.direction === "down" ? props2.figureArr.slice().reverse() : props2.figureArr);
    const translatePx = vue.computed(() => {
      const totalHeight = props2.height * (props2.figureArr.length - 1);
      return `-${totalHeight}px`;
    });
    const itemStyle = vue.computed(() => ({
      lineHeight: addUnit(props2.height)
    }));
    const rootStyle = vue.computed(() => ({
      height: addUnit(props2.height),
      "--van-translate": translatePx.value,
      "--van-duration": props2.duration + "s",
      "--van-delay": props2.delay + "s"
    }));
    return () => vue.createVNode("div", {
      "class": bem$o([props2.direction]),
      "style": rootStyle.value
    }, [vue.createVNode("div", {
      "class": bem$o("box", {
        animate: props2.isStart
      })
    }, [Array.isArray(newFigureArr.value) && newFigureArr.value.map((figure) => vue.createVNode("div", {
      "class": bem$o("item"),
      "style": itemStyle.value
    }, [figure]))])]);
  }
});
const [name$o, bem$n] = createNamespace("rolling-text");
const rollingTextProps = {
  startNum: makeNumberProp(0),
  targetNum: Number,
  textList: makeArrayProp(),
  duration: makeNumberProp(2),
  autoStart: truthProp,
  direction: makeStringProp("down"),
  stopOrder: makeStringProp("ltr"),
  height: makeNumberProp(40)
};
const CIRCLE_NUM = 2;
var stdin_default$w = vue.defineComponent({
  name: name$o,
  props: rollingTextProps,
  setup(props2) {
    const isCustomType = vue.computed(() => Array.isArray(props2.textList) && props2.textList.length);
    const itemLength = vue.computed(() => {
      if (isCustomType.value)
        return props2.textList[0].length;
      return `${Math.max(props2.startNum, props2.targetNum)}`.length;
    });
    const getTextArrByIdx = (idx) => {
      const result = [];
      for (let i = 0; i < props2.textList.length; i++) {
        result.push(props2.textList[i][idx]);
      }
      return result;
    };
    const targetNumArr = vue.computed(() => {
      if (isCustomType.value)
        return new Array(itemLength.value).fill("");
      return padZero(props2.targetNum, itemLength.value).split("");
    });
    const startNumArr = vue.computed(() => padZero(props2.startNum, itemLength.value).split(""));
    const getFigureArr = (i) => {
      const start2 = +startNumArr.value[i];
      const target = +targetNumArr.value[i];
      const result = [];
      for (let i2 = start2; i2 <= 9; i2++) {
        result.push(i2);
      }
      for (let i2 = 0; i2 <= CIRCLE_NUM; i2++) {
        for (let j = 0; j <= 9; j++) {
          result.push(j);
        }
      }
      for (let i2 = 0; i2 <= target; i2++) {
        result.push(i2);
      }
      return result;
    };
    const getDelay = (i, len) => {
      if (props2.stopOrder === "ltr")
        return 0.2 * i;
      return 0.2 * (len - 1 - i);
    };
    const rolling = vue.ref(props2.autoStart);
    const start = () => {
      rolling.value = true;
    };
    const reset = () => {
      rolling.value = false;
      if (props2.autoStart) {
        use.raf(() => start());
      }
    };
    vue.watch(() => props2.autoStart, (value) => {
      if (value) {
        start();
      }
    });
    useExpose({
      start,
      reset
    });
    return () => vue.createVNode("div", {
      "class": bem$n()
    }, [targetNumArr.value.map((_, i) => vue.createVNode(stdin_default$x, {
      "figureArr": isCustomType.value ? getTextArrByIdx(i) : getFigureArr(i),
      "duration": props2.duration,
      "direction": props2.direction,
      "isStart": rolling.value,
      "height": props2.height,
      "delay": getDelay(i, itemLength.value)
    }, null))]);
  }
});
const RollingText = withInstall(stdin_default$w);
const Row = withInstall(stdin_default$16);
const [name$n, bem$m, t$4] = createNamespace("search");
const searchProps = extend({}, fieldSharedProps, {
  label: String,
  shape: makeStringProp("square"),
  leftIcon: makeStringProp("search"),
  clearable: truthProp,
  actionText: String,
  background: String,
  showAction: Boolean
});
var stdin_default$v = vue.defineComponent({
  name: name$n,
  props: searchProps,
  emits: ["blur", "focus", "clear", "search", "cancel", "clickInput", "clickLeftIcon", "clickRightIcon", "update:modelValue"],
  setup(props2, {
    emit,
    slots,
    attrs
  }) {
    const id = useId();
    const fieldRef = vue.ref();
    const onCancel = () => {
      if (!slots.action) {
        emit("update:modelValue", "");
        emit("cancel");
      }
    };
    const onKeypress = (event) => {
      const ENTER_CODE = 13;
      if (event.keyCode === ENTER_CODE) {
        preventDefault(event);
        emit("search", props2.modelValue);
      }
    };
    const getInputId = () => props2.id || `${id}-input`;
    const renderLabel = () => {
      if (slots.label || props2.label) {
        return vue.createVNode("label", {
          "class": bem$m("label"),
          "for": getInputId()
        }, [slots.label ? slots.label() : props2.label]);
      }
    };
    const renderAction = () => {
      if (props2.showAction) {
        const text = props2.actionText || t$4("cancel");
        return vue.createVNode("div", {
          "class": bem$m("action"),
          "role": "button",
          "tabindex": 0,
          "onClick": onCancel
        }, [slots.action ? slots.action() : text]);
      }
    };
    const blur = () => {
      var _a;
      return (_a = fieldRef.value) == null ? void 0 : _a.blur();
    };
    const focus = () => {
      var _a;
      return (_a = fieldRef.value) == null ? void 0 : _a.focus();
    };
    const onBlur = (event) => emit("blur", event);
    const onFocus = (event) => emit("focus", event);
    const onClear = (event) => emit("clear", event);
    const onClickInput = (event) => emit("clickInput", event);
    const onClickLeftIcon = (event) => emit("clickLeftIcon", event);
    const onClickRightIcon = (event) => emit("clickRightIcon", event);
    const fieldPropNames = Object.keys(fieldSharedProps);
    const renderField = () => {
      const fieldAttrs = extend({}, attrs, pick(props2, fieldPropNames), {
        id: getInputId()
      });
      const onInput = (value) => emit("update:modelValue", value);
      return vue.createVNode(Field, vue.mergeProps({
        "ref": fieldRef,
        "type": "search",
        "class": bem$m("field"),
        "border": false,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "onClear": onClear,
        "onKeypress": onKeypress,
        "onClickInput": onClickInput,
        "onClickLeftIcon": onClickLeftIcon,
        "onClickRightIcon": onClickRightIcon,
        "onUpdate:modelValue": onInput
      }, fieldAttrs), pick(slots, ["left-icon", "right-icon"]));
    };
    useExpose({
      focus,
      blur
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "class": bem$m({
          "show-action": props2.showAction
        }),
        "style": {
          background: props2.background
        }
      }, [(_a = slots.left) == null ? void 0 : _a.call(slots), vue.createVNode("div", {
        "class": bem$m("content", props2.shape)
      }, [renderLabel(), renderField()]), renderAction()]);
    };
  }
});
const Search = withInstall(stdin_default$v);
const isImage = (name2) => name2 == null ? void 0 : name2.includes("/");
const popupInheritKeys = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
const iconMap = {
  qq: "qq",
  link: "link-o",
  weibo: "weibo",
  qrcode: "qr",
  poster: "photo-o",
  wechat: "wechat",
  "weapp-qrcode": "miniprogram-o",
  "wechat-moments": "wechat-moments"
};
const [name$m, bem$l, t$3] = createNamespace("share-sheet");
const shareSheetProps = extend({}, popupSharedProps, {
  title: String,
  round: truthProp,
  options: makeArrayProp(),
  cancelText: String,
  description: String,
  closeOnPopstate: truthProp,
  safeAreaInsetBottom: truthProp
});
var stdin_default$u = vue.defineComponent({
  name: name$m,
  props: shareSheetProps,
  emits: ["cancel", "select", "update:show"],
  setup(props2, {
    emit,
    slots
  }) {
    const updateShow = (value) => emit("update:show", value);
    const onCancel = () => {
      updateShow(false);
      emit("cancel");
    };
    const onSelect = (option, index) => emit("select", option, index);
    const renderHeader = () => {
      const title = slots.title ? slots.title() : props2.title;
      const description = slots.description ? slots.description() : props2.description;
      if (title || description) {
        return vue.createVNode("div", {
          "class": bem$l("header")
        }, [title && vue.createVNode("h2", {
          "class": bem$l("title")
        }, [title]), description && vue.createVNode("span", {
          "class": bem$l("description")
        }, [description])]);
      }
    };
    const renderIcon = (icon) => {
      if (isImage(icon)) {
        return vue.createVNode("img", {
          "src": icon,
          "class": bem$l("image-icon")
        }, null);
      }
      return vue.createVNode("div", {
        "class": bem$l("icon", [icon])
      }, [vue.createVNode(Icon, {
        "name": iconMap[icon] || icon
      }, null)]);
    };
    const renderOption = (option, index) => {
      const {
        name: name2,
        icon,
        className,
        description
      } = option;
      return vue.createVNode("div", {
        "role": "button",
        "tabindex": 0,
        "class": [bem$l("option"), className, HAPTICS_FEEDBACK],
        "onClick": () => onSelect(option, index)
      }, [renderIcon(icon), name2 && vue.createVNode("span", {
        "class": bem$l("name")
      }, [name2]), description && vue.createVNode("span", {
        "class": bem$l("option-description")
      }, [description])]);
    };
    const renderOptions = (options, border) => vue.createVNode("div", {
      "class": bem$l("options", {
        border
      })
    }, [options.map(renderOption)]);
    const renderRows = () => {
      const {
        options
      } = props2;
      if (Array.isArray(options[0])) {
        return options.map((item, index) => renderOptions(item, index !== 0));
      }
      return renderOptions(options);
    };
    const renderCancelButton = () => {
      var _a;
      const cancelText = (_a = props2.cancelText) != null ? _a : t$3("cancel");
      if (slots.cancel || cancelText) {
        return vue.createVNode("button", {
          "type": "button",
          "class": bem$l("cancel"),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : cancelText]);
      }
    };
    return () => vue.createVNode(Popup, vue.mergeProps({
      "class": bem$l(),
      "position": "bottom",
      "onUpdate:show": updateShow
    }, pick(props2, popupInheritKeys)), {
      default: () => [renderHeader(), renderRows(), renderCancelButton()]
    });
  }
});
const ShareSheet = withInstall(stdin_default$u);
const [name$l, bem$k] = createNamespace("sidebar");
const SIDEBAR_KEY = Symbol(name$l);
const sidebarProps = {
  modelValue: makeNumericProp(0)
};
var stdin_default$t = vue.defineComponent({
  name: name$l,
  props: sidebarProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = use.useChildren(SIDEBAR_KEY);
    const getActive = () => +props2.modelValue;
    const setActive = (value) => {
      if (value !== getActive()) {
        emit("update:modelValue", value);
        emit("change", value);
      }
    };
    linkChildren({
      getActive,
      setActive
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "role": "tablist",
        "class": bem$k()
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const Sidebar = withInstall(stdin_default$t);
const [name$k, bem$j] = createNamespace("sidebar-item");
const sidebarItemProps = extend({}, routeProps, {
  dot: Boolean,
  title: String,
  badge: numericProp,
  disabled: Boolean,
  badgeProps: Object
});
var stdin_default$s = vue.defineComponent({
  name: name$k,
  props: sidebarItemProps,
  emits: ["click"],
  setup(props2, {
    emit,
    slots
  }) {
    const route2 = useRoute();
    const {
      parent,
      index
    } = use.useParent(SIDEBAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <SidebarItem> must be a child component of <Sidebar>.");
      }
      return;
    }
    const onClick = () => {
      if (props2.disabled) {
        return;
      }
      emit("click", index.value);
      parent.setActive(index.value);
      route2();
    };
    return () => {
      const {
        dot,
        badge,
        title,
        disabled
      } = props2;
      const selected = index.value === parent.getActive();
      return vue.createVNode("div", {
        "role": "tab",
        "class": bem$j({
          select: selected,
          disabled
        }),
        "tabindex": disabled ? void 0 : 0,
        "aria-selected": selected,
        "onClick": onClick
      }, [vue.createVNode(Badge, vue.mergeProps({
        "dot": dot,
        "class": bem$j("text"),
        "content": badge
      }, props2.badgeProps), {
        default: () => [slots.title ? slots.title() : title]
      })]);
    };
  }
});
const SidebarItem = withInstall(stdin_default$s);
const [name$j, bem$i, t$2] = createNamespace("signature");
const signatureProps = {
  tips: String,
  type: makeStringProp("png"),
  penColor: makeStringProp("#000"),
  lineWidth: makeNumberProp(3),
  clearButtonText: String,
  backgroundColor: makeStringProp(""),
  confirmButtonText: String
};
const hasCanvasSupport = () => {
  var _a;
  const canvas = document.createElement("canvas");
  return !!((_a = canvas.getContext) == null ? void 0 : _a.call(canvas, "2d"));
};
var stdin_default$r = vue.defineComponent({
  name: name$j,
  props: signatureProps,
  emits: ["submit", "clear", "start", "end", "signing"],
  setup(props2, {
    emit
  }) {
    const canvasRef = vue.ref();
    const wrapRef = vue.ref();
    const state = vue.reactive({
      width: 0,
      height: 0,
      ctx: null,
      ratio: inBrowser ? window.devicePixelRatio : 1
    });
    let canvasRect;
    const isRenderCanvas = inBrowser ? hasCanvasSupport() : true;
    const touchStart = () => {
      if (!state.ctx) {
        return false;
      }
      state.ctx.beginPath();
      state.ctx.lineWidth = props2.lineWidth * state.ratio;
      state.ctx.strokeStyle = props2.penColor;
      canvasRect = use.useRect(canvasRef);
      emit("start");
    };
    const touchMove = (event) => {
      var _a, _b;
      if (!state.ctx) {
        return false;
      }
      preventDefault(event);
      const touch = event.touches[0];
      const mouseX = (touch.clientX - ((canvasRect == null ? void 0 : canvasRect.left) || 0)) * state.ratio;
      const mouseY = (touch.clientY - ((canvasRect == null ? void 0 : canvasRect.top) || 0)) * state.ratio;
      state.ctx.lineCap = "round";
      state.ctx.lineJoin = "round";
      (_a = state.ctx) == null ? void 0 : _a.lineTo(mouseX, mouseY);
      (_b = state.ctx) == null ? void 0 : _b.stroke();
      emit("signing", event);
    };
    const touchEnd = (event) => {
      preventDefault(event);
      emit("end");
    };
    const isCanvasEmpty = (canvas) => {
      const empty = document.createElement("canvas");
      empty.width = canvas.width;
      empty.height = canvas.height;
      return canvas.toDataURL() === empty.toDataURL();
    };
    const setCanvasBgColor = () => {
      if (state.ctx && props2.backgroundColor) {
        state.ctx.fillStyle = props2.backgroundColor;
        state.ctx.fillRect(0, 0, state.width, state.height);
      }
    };
    const submit = () => {
      var _a, _b;
      const canvas = canvasRef.value;
      if (!canvas) {
        return;
      }
      const isEmpty = isCanvasEmpty(canvas);
      const image = isEmpty ? "" : ((_b = (_a = {
        jpg: () => canvas.toDataURL("image/jpeg", 0.8),
        jpeg: () => canvas.toDataURL("image/jpeg", 0.8)
      })[props2.type]) == null ? void 0 : _b.call(_a)) || canvas.toDataURL(`image/${props2.type}`);
      emit("submit", {
        image,
        canvas
      });
    };
    const clear = () => {
      if (state.ctx) {
        state.ctx.clearRect(0, 0, state.width, state.height);
        state.ctx.closePath();
        setCanvasBgColor();
      }
      emit("clear");
    };
    vue.onMounted(() => {
      var _a, _b, _c;
      if (isRenderCanvas) {
        state.ctx = (_a = canvasRef.value) == null ? void 0 : _a.getContext("2d");
        state.width = (((_b = wrapRef.value) == null ? void 0 : _b.offsetWidth) || 0) * state.ratio;
        state.height = (((_c = wrapRef.value) == null ? void 0 : _c.offsetHeight) || 0) * state.ratio;
        vue.nextTick(() => {
          setCanvasBgColor();
        });
      }
    });
    return () => vue.createVNode("div", {
      "class": bem$i()
    }, [vue.createVNode("div", {
      "class": bem$i("content"),
      "ref": wrapRef
    }, [isRenderCanvas ? vue.createVNode("canvas", {
      "ref": canvasRef,
      "width": state.width,
      "height": state.height,
      "onTouchstartPassive": touchStart,
      "onTouchmove": touchMove,
      "onTouchend": touchEnd
    }, null) : vue.createVNode("p", null, [props2.tips])]), vue.createVNode("div", {
      "class": bem$i("footer")
    }, [vue.createVNode(Button, {
      "size": "small",
      "onClick": clear
    }, {
      default: () => [props2.clearButtonText || t$2("clear")]
    }), vue.createVNode(Button, {
      "type": "primary",
      "size": "small",
      "onClick": submit
    }, {
      default: () => [props2.confirmButtonText || t$2("confirm")]
    })])]);
  }
});
const Signature = withInstall(stdin_default$r);
const [name$i, bem$h] = createNamespace("skeleton-title");
const skeletonTitleProps = {
  round: Boolean,
  titleWidth: numericProp
};
var stdin_default$q = vue.defineComponent({
  name: name$i,
  props: skeletonTitleProps,
  setup(props2) {
    return () => vue.createVNode("h3", {
      "class": bem$h([{
        round: props2.round
      }]),
      "style": {
        width: addUnit(props2.titleWidth)
      }
    }, null);
  }
});
const SkeletonTitle = withInstall(stdin_default$q);
var stdin_default$p = SkeletonTitle;
const [name$h, bem$g] = createNamespace("skeleton-avatar");
const skeletonAvatarProps = {
  avatarSize: numericProp,
  avatarShape: makeStringProp("round")
};
var stdin_default$o = vue.defineComponent({
  name: name$h,
  props: skeletonAvatarProps,
  setup(props2) {
    return () => vue.createVNode("div", {
      "class": bem$g([props2.avatarShape]),
      "style": getSizeStyle(props2.avatarSize)
    }, null);
  }
});
const SkeletonAvatar = withInstall(stdin_default$o);
var stdin_default$n = SkeletonAvatar;
const DEFAULT_ROW_WIDTH = "100%";
const skeletonParagraphProps = {
  round: Boolean,
  rowWidth: {
    type: numericProp,
    default: DEFAULT_ROW_WIDTH
  }
};
const [name$g, bem$f] = createNamespace("skeleton-paragraph");
var stdin_default$m = vue.defineComponent({
  name: name$g,
  props: skeletonParagraphProps,
  setup(props2) {
    return () => vue.createVNode("div", {
      "class": bem$f([{
        round: props2.round
      }]),
      "style": {
        width: props2.rowWidth
      }
    }, null);
  }
});
const SkeletonParagraph = withInstall(stdin_default$m);
var stdin_default$l = SkeletonParagraph;
const [name$f, bem$e] = createNamespace("skeleton");
const DEFAULT_LAST_ROW_WIDTH = "60%";
const skeletonProps = {
  row: makeNumericProp(0),
  round: Boolean,
  title: Boolean,
  titleWidth: numericProp,
  avatar: Boolean,
  avatarSize: numericProp,
  avatarShape: makeStringProp("round"),
  loading: truthProp,
  animate: truthProp,
  rowWidth: {
    type: [Number, String, Array],
    default: DEFAULT_ROW_WIDTH
  }
};
var stdin_default$k = vue.defineComponent({
  name: name$f,
  inheritAttrs: false,
  props: skeletonProps,
  setup(props2, {
    slots,
    attrs
  }) {
    const renderAvatar = () => {
      if (props2.avatar) {
        return vue.createVNode(stdin_default$n, {
          "avatarShape": props2.avatarShape,
          "avatarSize": props2.avatarSize
        }, null);
      }
    };
    const renderTitle = () => {
      if (props2.title) {
        return vue.createVNode(stdin_default$p, {
          "round": props2.round,
          "titleWidth": props2.titleWidth
        }, null);
      }
    };
    const getRowWidth = (index) => {
      const {
        rowWidth
      } = props2;
      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props2.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }
      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }
      return rowWidth;
    };
    const renderRows = () => Array(+props2.row).fill("").map((_, i) => vue.createVNode(stdin_default$l, {
      "key": i,
      "round": props2.round,
      "rowWidth": addUnit(getRowWidth(i))
    }, null));
    const renderContents = () => {
      if (slots.template) {
        return slots.template();
      }
      return vue.createVNode(vue.Fragment, null, [renderAvatar(), vue.createVNode("div", {
        "class": bem$e("content")
      }, [renderTitle(), renderRows()])]);
    };
    return () => {
      var _a;
      if (!props2.loading) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      return vue.createVNode("div", vue.mergeProps({
        "class": bem$e({
          animate: props2.animate,
          round: props2.round
        })
      }, attrs), [renderContents()]);
    };
  }
});
const Skeleton = withInstall(stdin_default$k);
const [name$e, bem$d] = createNamespace("skeleton-image");
const skeletonImageProps = {
  imageSize: numericProp,
  imageShape: makeStringProp("square")
};
var stdin_default$j = vue.defineComponent({
  name: name$e,
  props: skeletonImageProps,
  setup(props2) {
    return () => vue.createVNode("div", {
      "class": bem$d([props2.imageShape]),
      "style": getSizeStyle(props2.imageSize)
    }, [vue.createVNode(Icon, {
      "name": "photo",
      "class": bem$d("icon")
    }, null)]);
  }
});
const SkeletonImage = withInstall(stdin_default$j);
const [name$d, bem$c] = createNamespace("slider");
const sliderProps = {
  min: makeNumericProp(0),
  max: makeNumericProp(100),
  step: makeNumericProp(1),
  range: Boolean,
  reverse: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  vertical: Boolean,
  barHeight: numericProp,
  buttonSize: numericProp,
  activeColor: String,
  inactiveColor: String,
  modelValue: {
    type: [Number, Array],
    default: 0
  }
};
var stdin_default$i = vue.defineComponent({
  name: name$d,
  props: sliderProps,
  emits: ["change", "dragEnd", "dragStart", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    let buttonIndex;
    let current2;
    let startValue;
    const root = vue.ref();
    const slider = [vue.ref(), vue.ref()];
    const dragStatus = vue.ref();
    const touch = useTouch();
    const scope = vue.computed(() => Number(props2.max) - Number(props2.min));
    const wrapperStyle = vue.computed(() => {
      const crossAxis = props2.vertical ? "width" : "height";
      return {
        background: props2.inactiveColor,
        [crossAxis]: addUnit(props2.barHeight)
      };
    });
    const isRange = (val) => props2.range && Array.isArray(val);
    const calcMainAxis = () => {
      const {
        modelValue,
        min
      } = props2;
      if (isRange(modelValue)) {
        return `${(modelValue[1] - modelValue[0]) * 100 / scope.value}%`;
      }
      return `${(modelValue - Number(min)) * 100 / scope.value}%`;
    };
    const calcOffset = () => {
      const {
        modelValue,
        min
      } = props2;
      if (isRange(modelValue)) {
        return `${(modelValue[0] - Number(min)) * 100 / scope.value}%`;
      }
      return "0%";
    };
    const barStyle = vue.computed(() => {
      const mainAxis = props2.vertical ? "height" : "width";
      const style = {
        [mainAxis]: calcMainAxis(),
        background: props2.activeColor
      };
      if (dragStatus.value) {
        style.transition = "none";
      }
      const getPositionKey = () => {
        if (props2.vertical) {
          return props2.reverse ? "bottom" : "top";
        }
        return props2.reverse ? "right" : "left";
      };
      style[getPositionKey()] = calcOffset();
      return style;
    });
    const format2 = (value) => {
      const min = +props2.min;
      const max = +props2.max;
      const step = +props2.step;
      value = clamp(value, min, max);
      const diff = Math.round((value - min) / step) * step;
      return addNumber(min, diff);
    };
    const updateStartValue = () => {
      const current22 = props2.modelValue;
      if (isRange(current22)) {
        startValue = current22.map(format2);
      } else {
        startValue = format2(current22);
      }
    };
    const handleRangeValue = (value) => {
      var _a, _b;
      const left = (_a = value[0]) != null ? _a : Number(props2.min);
      const right = (_b = value[1]) != null ? _b : Number(props2.max);
      return left > right ? [right, left] : [left, right];
    };
    const updateValue = (value, end) => {
      if (isRange(value)) {
        value = handleRangeValue(value).map(format2);
      } else {
        value = format2(value);
      }
      if (!isSameValue(value, props2.modelValue)) {
        emit("update:modelValue", value);
      }
      if (end && !isSameValue(value, startValue)) {
        emit("change", value);
      }
    };
    const onClick = (event) => {
      event.stopPropagation();
      if (props2.disabled || props2.readonly) {
        return;
      }
      updateStartValue();
      const {
        min,
        reverse,
        vertical,
        modelValue
      } = props2;
      const rect = use.useRect(root);
      const getDelta = () => {
        if (vertical) {
          if (reverse) {
            return rect.bottom - event.clientY;
          }
          return event.clientY - rect.top;
        }
        if (reverse) {
          return rect.right - event.clientX;
        }
        return event.clientX - rect.left;
      };
      const total = vertical ? rect.height : rect.width;
      const value = Number(min) + getDelta() / total * scope.value;
      if (isRange(modelValue)) {
        const [left, right] = modelValue;
        const middle = (left + right) / 2;
        if (value <= middle) {
          updateValue([value, right], true);
        } else {
          updateValue([left, value], true);
        }
      } else {
        updateValue(value, true);
      }
    };
    const onTouchStart = (event) => {
      if (props2.disabled || props2.readonly) {
        return;
      }
      touch.start(event);
      current2 = props2.modelValue;
      updateStartValue();
      dragStatus.value = "start";
    };
    const onTouchMove = (event) => {
      if (props2.disabled || props2.readonly) {
        return;
      }
      if (dragStatus.value === "start") {
        emit("dragStart", event);
      }
      preventDefault(event, true);
      touch.move(event);
      dragStatus.value = "dragging";
      const rect = use.useRect(root);
      const delta = props2.vertical ? touch.deltaY.value : touch.deltaX.value;
      const total = props2.vertical ? rect.height : rect.width;
      let diff = delta / total * scope.value;
      if (props2.reverse) {
        diff = -diff;
      }
      if (isRange(startValue)) {
        const index = props2.reverse ? 1 - buttonIndex : buttonIndex;
        current2[index] = startValue[index] + diff;
      } else {
        current2 = startValue + diff;
      }
      updateValue(current2);
    };
    const onTouchEnd = (event) => {
      if (props2.disabled || props2.readonly) {
        return;
      }
      if (dragStatus.value === "dragging") {
        updateValue(current2, true);
        emit("dragEnd", event);
      }
      dragStatus.value = "";
    };
    const getButtonClassName = (index) => {
      if (typeof index === "number") {
        const position = ["left", "right"];
        return bem$c(`button-wrapper`, position[index]);
      }
      return bem$c("button-wrapper", props2.reverse ? "left" : "right");
    };
    const renderButtonContent = (value, index) => {
      const dragging = dragStatus.value === "dragging";
      if (typeof index === "number") {
        const slot = slots[index === 0 ? "left-button" : "right-button"];
        let dragIndex;
        if (dragging && Array.isArray(current2)) {
          dragIndex = current2[0] > current2[1] ? buttonIndex ^ 1 : buttonIndex;
        }
        if (slot) {
          return slot({
            value,
            dragging,
            dragIndex
          });
        }
      }
      if (slots.button) {
        return slots.button({
          value,
          dragging
        });
      }
      return vue.createVNode("div", {
        "class": bem$c("button"),
        "style": getSizeStyle(props2.buttonSize)
      }, null);
    };
    const renderButton = (index) => {
      const current22 = typeof index === "number" ? props2.modelValue[index] : props2.modelValue;
      return vue.createVNode("div", {
        "ref": slider[index != null ? index : 0],
        "role": "slider",
        "class": getButtonClassName(index),
        "tabindex": props2.disabled ? void 0 : 0,
        "aria-valuemin": props2.min,
        "aria-valuenow": current22,
        "aria-valuemax": props2.max,
        "aria-disabled": props2.disabled || void 0,
        "aria-readonly": props2.readonly || void 0,
        "aria-orientation": props2.vertical ? "vertical" : "horizontal",
        "onTouchstartPassive": (event) => {
          if (typeof index === "number") {
            buttonIndex = index;
          }
          onTouchStart(event);
        },
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd,
        "onClick": stopPropagation
      }, [renderButtonContent(current22, index)]);
    };
    updateValue(props2.modelValue);
    use.useCustomFieldValue(() => props2.modelValue);
    slider.forEach((item) => {
      use.useEventListener("touchmove", onTouchMove, {
        target: item
      });
    });
    return () => vue.createVNode("div", {
      "ref": root,
      "style": wrapperStyle.value,
      "class": bem$c({
        vertical: props2.vertical,
        disabled: props2.disabled
      }),
      "onClick": onClick
    }, [vue.createVNode("div", {
      "class": bem$c("bar"),
      "style": barStyle.value
    }, [props2.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
  }
});
const Slider = withInstall(stdin_default$i);
const [name$c, bem$b] = createNamespace("space");
const spaceProps = {
  align: String,
  direction: {
    type: String,
    default: "horizontal"
  },
  size: {
    type: [Number, String, Array],
    default: 8
  },
  wrap: Boolean,
  fill: Boolean
};
function filterEmpty(children = []) {
  const nodes = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      nodes.push(...child);
    } else if (child.type === vue.Fragment) {
      nodes.push(...filterEmpty(child.children));
    } else {
      nodes.push(child);
    }
  });
  return nodes.filter((c) => {
    var _a;
    return !(c && (c.type === vue.Comment || c.type === vue.Fragment && ((_a = c.children) == null ? void 0 : _a.length) === 0 || c.type === vue.Text && c.children.trim() === ""));
  });
}
var stdin_default$h = vue.defineComponent({
  name: name$c,
  props: spaceProps,
  setup(props2, {
    slots
  }) {
    const mergedAlign = vue.computed(() => {
      var _a;
      return (_a = props2.align) != null ? _a : props2.direction === "horizontal" ? "center" : "";
    });
    const getMargin = (size) => {
      if (typeof size === "number") {
        return size + "px";
      }
      return size;
    };
    const getMarginStyle = (isLast) => {
      const style = {};
      const marginRight = `${getMargin(Array.isArray(props2.size) ? props2.size[0] : props2.size)}`;
      const marginBottom = `${getMargin(Array.isArray(props2.size) ? props2.size[1] : props2.size)}`;
      if (isLast) {
        return props2.wrap ? {
          marginBottom
        } : {};
      }
      if (props2.direction === "horizontal") {
        style.marginRight = marginRight;
      }
      if (props2.direction === "vertical" || props2.wrap) {
        style.marginBottom = marginBottom;
      }
      return style;
    };
    return () => {
      var _a;
      const children = filterEmpty((_a = slots.default) == null ? void 0 : _a.call(slots));
      return vue.createVNode("div", {
        "class": [bem$b({
          [props2.direction]: props2.direction,
          [`align-${mergedAlign.value}`]: mergedAlign.value,
          wrap: props2.wrap,
          fill: props2.fill
        })]
      }, [children.map((c, i) => vue.createVNode("div", {
        "key": `item-${i}`,
        "class": `${name$c}-item`,
        "style": getMarginStyle(i === children.length - 1)
      }, [c]))]);
    };
  }
});
const Space = withInstall(stdin_default$h);
const [name$b, bem$a] = createNamespace("steps");
const stepsProps = {
  active: makeNumericProp(0),
  direction: makeStringProp("horizontal"),
  activeIcon: makeStringProp("checked"),
  iconPrefix: String,
  finishIcon: String,
  activeColor: String,
  inactiveIcon: String,
  inactiveColor: String
};
const STEPS_KEY = Symbol(name$b);
var stdin_default$g = vue.defineComponent({
  name: name$b,
  props: stepsProps,
  emits: ["clickStep"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = use.useChildren(STEPS_KEY);
    const onClickStep = (index) => emit("clickStep", index);
    linkChildren({
      props: props2,
      onClickStep
    });
    return () => {
      var _a;
      return vue.createVNode("div", {
        "class": bem$a([props2.direction])
      }, [vue.createVNode("div", {
        "class": bem$a("items")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});
const [name$a, bem$9] = createNamespace("step");
var stdin_default$f = vue.defineComponent({
  name: name$a,
  setup(props2, {
    slots
  }) {
    const {
      parent,
      index
    } = use.useParent(STEPS_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <Step> must be a child component of <Steps>.");
      }
      return;
    }
    const parentProps = parent.props;
    const getStatus = () => {
      const active = +parentProps.active;
      if (index.value < active) {
        return "finish";
      }
      return index.value === active ? "process" : "waiting";
    };
    const isActive = () => getStatus() === "process";
    const lineStyle = vue.computed(() => ({
      background: getStatus() === "finish" ? parentProps.activeColor : parentProps.inactiveColor
    }));
    const titleStyle = vue.computed(() => {
      if (isActive()) {
        return {
          color: parentProps.activeColor
        };
      }
      if (getStatus() === "waiting") {
        return {
          color: parentProps.inactiveColor
        };
      }
    });
    const onClickStep = () => parent.onClickStep(index.value);
    const renderCircle = () => {
      const {
        iconPrefix,
        finishIcon,
        activeIcon,
        activeColor,
        inactiveIcon
      } = parentProps;
      if (isActive()) {
        if (slots["active-icon"]) {
          return slots["active-icon"]();
        }
        return vue.createVNode(Icon, {
          "class": bem$9("icon", "active"),
          "name": activeIcon,
          "color": activeColor,
          "classPrefix": iconPrefix
        }, null);
      }
      if (getStatus() === "finish" && (finishIcon || slots["finish-icon"])) {
        if (slots["finish-icon"]) {
          return slots["finish-icon"]();
        }
        return vue.createVNode(Icon, {
          "class": bem$9("icon", "finish"),
          "name": finishIcon,
          "color": activeColor,
          "classPrefix": iconPrefix
        }, null);
      }
      if (slots["inactive-icon"]) {
        return slots["inactive-icon"]();
      }
      if (inactiveIcon) {
        return vue.createVNode(Icon, {
          "class": bem$9("icon"),
          "name": inactiveIcon,
          "classPrefix": iconPrefix
        }, null);
      }
      return vue.createVNode("i", {
        "class": bem$9("circle"),
        "style": lineStyle.value
      }, null);
    };
    return () => {
      var _a;
      const status = getStatus();
      return vue.createVNode("div", {
        "class": [BORDER, bem$9([parentProps.direction, {
          [status]: status
        }])]
      }, [vue.createVNode("div", {
        "class": bem$9("title", {
          active: isActive()
        }),
        "style": titleStyle.value,
        "onClick": onClickStep
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), vue.createVNode("div", {
        "class": bem$9("circle-container"),
        "onClick": onClickStep
      }, [renderCircle()]), vue.createVNode("div", {
        "class": bem$9("line"),
        "style": lineStyle.value
      }, null)]);
    };
  }
});
const Step = withInstall(stdin_default$f);
const [name$9, bem$8] = createNamespace("stepper");
const LONG_PRESS_INTERVAL = 200;
const isEqual = (value1, value2) => String(value1) === String(value2);
const stepperProps = {
  min: makeNumericProp(1),
  max: makeNumericProp(Infinity),
  name: makeNumericProp(""),
  step: makeNumericProp(1),
  theme: String,
  integer: Boolean,
  disabled: Boolean,
  showPlus: truthProp,
  showMinus: truthProp,
  showInput: truthProp,
  longPress: truthProp,
  autoFixed: truthProp,
  allowEmpty: Boolean,
  modelValue: numericProp,
  inputWidth: numericProp,
  buttonSize: numericProp,
  placeholder: String,
  disablePlus: Boolean,
  disableMinus: Boolean,
  disableInput: Boolean,
  beforeChange: Function,
  defaultValue: makeNumericProp(1),
  decimalLength: numericProp
};
var stdin_default$e = vue.defineComponent({
  name: name$9,
  props: stepperProps,
  emits: ["plus", "blur", "minus", "focus", "change", "overlimit", "update:modelValue"],
  setup(props2, {
    emit
  }) {
    const format2 = (value, autoFixed = true) => {
      const {
        min,
        max,
        allowEmpty,
        decimalLength
      } = props2;
      if (allowEmpty && value === "") {
        return value;
      }
      value = formatNumber(String(value), !props2.integer);
      value = value === "" ? 0 : +value;
      value = Number.isNaN(value) ? +min : value;
      value = autoFixed ? Math.max(Math.min(+max, value), +min) : value;
      if (isDef(decimalLength)) {
        value = value.toFixed(+decimalLength);
      }
      return value;
    };
    const getInitialValue = () => {
      var _a;
      const defaultValue = (_a = props2.modelValue) != null ? _a : props2.defaultValue;
      const value = format2(defaultValue);
      if (!isEqual(value, props2.modelValue)) {
        emit("update:modelValue", value);
      }
      return value;
    };
    let actionType;
    const inputRef = vue.ref();
    const current2 = vue.ref(getInitialValue());
    const minusDisabled = vue.computed(() => props2.disabled || props2.disableMinus || +current2.value <= +props2.min);
    const plusDisabled = vue.computed(() => props2.disabled || props2.disablePlus || +current2.value >= +props2.max);
    const inputStyle = vue.computed(() => ({
      width: addUnit(props2.inputWidth),
      height: addUnit(props2.buttonSize)
    }));
    const buttonStyle = vue.computed(() => getSizeStyle(props2.buttonSize));
    const check = () => {
      const value = format2(current2.value);
      if (!isEqual(value, current2.value)) {
        current2.value = value;
      }
    };
    const setValue = (value) => {
      if (props2.beforeChange) {
        callInterceptor(props2.beforeChange, {
          args: [value],
          done() {
            current2.value = value;
          }
        });
      } else {
        current2.value = value;
      }
    };
    const onChange = () => {
      if (actionType === "plus" && plusDisabled.value || actionType === "minus" && minusDisabled.value) {
        emit("overlimit", actionType);
        return;
      }
      const diff = actionType === "minus" ? -props2.step : +props2.step;
      const value = format2(addNumber(+current2.value, diff));
      setValue(value);
      emit(actionType);
    };
    const onInput = (event) => {
      const input = event.target;
      const {
        value
      } = input;
      const {
        decimalLength
      } = props2;
      let formatted = formatNumber(String(value), !props2.integer);
      if (isDef(decimalLength) && formatted.includes(".")) {
        const pair = formatted.split(".");
        formatted = `${pair[0]}.${pair[1].slice(0, +decimalLength)}`;
      }
      if (props2.beforeChange) {
        input.value = String(current2.value);
      } else if (!isEqual(value, formatted)) {
        input.value = formatted;
      }
      const isNumeric2 = formatted === String(+formatted);
      setValue(isNumeric2 ? +formatted : formatted);
    };
    const onFocus = (event) => {
      var _a;
      if (props2.disableInput) {
        (_a = inputRef.value) == null ? void 0 : _a.blur();
      } else {
        emit("focus", event);
      }
    };
    const onBlur = (event) => {
      const input = event.target;
      const value = format2(input.value, props2.autoFixed);
      input.value = String(value);
      current2.value = value;
      vue.nextTick(() => {
        emit("blur", event);
        resetScroll();
      });
    };
    let isLongPress;
    let longPressTimer;
    const longPressStep = () => {
      longPressTimer = setTimeout(() => {
        onChange();
        longPressStep();
      }, LONG_PRESS_INTERVAL);
    };
    const onTouchStart = () => {
      if (props2.longPress) {
        isLongPress = false;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(() => {
          isLongPress = true;
          onChange();
          longPressStep();
        }, LONG_PRESS_START_TIME);
      }
    };
    const onTouchEnd = (event) => {
      if (props2.longPress) {
        clearTimeout(longPressTimer);
        if (isLongPress) {
          preventDefault(event);
        }
      }
    };
    const onMousedown = (event) => {
      if (props2.disableInput) {
        preventDefault(event);
      }
    };
    const createListeners = (type) => ({
      onClick: (event) => {
        preventDefault(event);
        actionType = type;
        onChange();
      },
      onTouchstartPassive: () => {
        actionType = type;
        onTouchStart();
      },
      onTouchend: onTouchEnd,
      onTouchcancel: onTouchEnd
    });
    vue.watch(() => [props2.max, props2.min, props2.integer, props2.decimalLength], check);
    vue.watch(() => props2.modelValue, (value) => {
      if (!isEqual(value, current2.value)) {
        current2.value = format2(value);
      }
    });
    vue.watch(current2, (value) => {
      emit("update:modelValue", value);
      emit("change", value, {
        name: props2.name
      });
    });
    use.useCustomFieldValue(() => props2.modelValue);
    return () => vue.createVNode("div", {
      "role": "group",
      "class": bem$8([props2.theme])
    }, [vue.withDirectives(vue.createVNode("button", vue.mergeProps({
      "type": "button",
      "style": buttonStyle.value,
      "class": [bem$8("minus", {
        disabled: minusDisabled.value
      }), {
        [HAPTICS_FEEDBACK]: !minusDisabled.value
      }],
      "aria-disabled": minusDisabled.value || void 0
    }, createListeners("minus")), null), [[vue.vShow, props2.showMinus]]), vue.withDirectives(vue.createVNode("input", {
      "ref": inputRef,
      "type": props2.integer ? "tel" : "text",
      "role": "spinbutton",
      "class": bem$8("input"),
      "value": current2.value,
      "style": inputStyle.value,
      "disabled": props2.disabled,
      "readonly": props2.disableInput,
      "inputmode": props2.integer ? "numeric" : "decimal",
      "placeholder": props2.placeholder,
      "aria-valuemax": props2.max,
      "aria-valuemin": props2.min,
      "aria-valuenow": current2.value,
      "onBlur": onBlur,
      "onInput": onInput,
      "onFocus": onFocus,
      "onMousedown": onMousedown
    }, null), [[vue.vShow, props2.showInput]]), vue.withDirectives(vue.createVNode("button", vue.mergeProps({
      "type": "button",
      "style": buttonStyle.value,
      "class": [bem$8("plus", {
        disabled: plusDisabled.value
      }), {
        [HAPTICS_FEEDBACK]: !plusDisabled.value
      }],
      "aria-disabled": plusDisabled.value || void 0
    }, createListeners("plus")), null), [[vue.vShow, props2.showPlus]])]);
  }
});
const Stepper = withInstall(stdin_default$e);
const Steps = withInstall(stdin_default$g);
const [name$8, bem$7, t$1] = createNamespace("submit-bar");
const submitBarProps = {
  tip: String,
  label: String,
  price: Number,
  tipIcon: String,
  loading: Boolean,
  currency: makeStringProp("¥"),
  disabled: Boolean,
  textAlign: String,
  buttonText: String,
  buttonType: makeStringProp("danger"),
  buttonColor: String,
  suffixLabel: String,
  placeholder: Boolean,
  decimalLength: makeNumericProp(2),
  safeAreaInsetBottom: truthProp
};
var stdin_default$d = vue.defineComponent({
  name: name$8,
  props: submitBarProps,
  emits: ["submit"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = vue.ref();
    const renderPlaceholder = usePlaceholder(root, bem$7);
    const renderText = () => {
      const {
        price,
        label,
        currency,
        textAlign,
        suffixLabel,
        decimalLength
      } = props2;
      if (typeof price === "number") {
        const pricePair = (price / 100).toFixed(+decimalLength).split(".");
        const decimal = decimalLength ? `.${pricePair[1]}` : "";
        return vue.createVNode("div", {
          "class": bem$7("text"),
          "style": {
            textAlign
          }
        }, [vue.createVNode("span", null, [label || t$1("label")]), vue.createVNode("span", {
          "class": bem$7("price")
        }, [currency, vue.createVNode("span", {
          "class": bem$7("price-integer")
        }, [pricePair[0]]), decimal]), suffixLabel && vue.createVNode("span", {
          "class": bem$7("suffix-label")
        }, [suffixLabel])]);
      }
    };
    const renderTip = () => {
      var _a;
      const {
        tip,
        tipIcon
      } = props2;
      if (slots.tip || tip) {
        return vue.createVNode("div", {
          "class": bem$7("tip")
        }, [tipIcon && vue.createVNode(Icon, {
          "class": bem$7("tip-icon"),
          "name": tipIcon
        }, null), tip && vue.createVNode("span", {
          "class": bem$7("tip-text")
        }, [tip]), (_a = slots.tip) == null ? void 0 : _a.call(slots)]);
      }
    };
    const onClickButton = () => emit("submit");
    const renderButton = () => {
      if (slots.button) {
        return slots.button();
      }
      return vue.createVNode(Button, {
        "round": true,
        "type": props2.buttonType,
        "text": props2.buttonText,
        "class": bem$7("button", props2.buttonType),
        "color": props2.buttonColor,
        "loading": props2.loading,
        "disabled": props2.disabled,
        "onClick": onClickButton
      }, null);
    };
    const renderSubmitBar = () => {
      var _a, _b;
      return vue.createVNode("div", {
        "ref": root,
        "class": [bem$7(), {
          "van-safe-area-bottom": props2.safeAreaInsetBottom
        }]
      }, [(_a = slots.top) == null ? void 0 : _a.call(slots), renderTip(), vue.createVNode("div", {
        "class": bem$7("bar")
      }, [(_b = slots.default) == null ? void 0 : _b.call(slots), renderText(), renderButton()])]);
    };
    return () => {
      if (props2.placeholder) {
        return renderPlaceholder(renderSubmitBar);
      }
      return renderSubmitBar();
    };
  }
});
const SubmitBar = withInstall(stdin_default$d);
const [name$7, bem$6] = createNamespace("swipe-cell");
const swipeCellProps = {
  name: makeNumericProp(""),
  disabled: Boolean,
  leftWidth: numericProp,
  rightWidth: numericProp,
  beforeClose: Function,
  stopPropagation: Boolean
};
var stdin_default$c = vue.defineComponent({
  name: name$7,
  props: swipeCellProps,
  emits: ["open", "close", "click"],
  setup(props2, {
    emit,
    slots
  }) {
    let opened;
    let lockClick2;
    let startOffset;
    const root = vue.ref();
    const leftRef = vue.ref();
    const rightRef = vue.ref();
    const state = vue.reactive({
      offset: 0,
      dragging: false
    });
    const touch = useTouch();
    const getWidthByRef = (ref2) => ref2.value ? use.useRect(ref2).width : 0;
    const leftWidth = vue.computed(() => isDef(props2.leftWidth) ? +props2.leftWidth : getWidthByRef(leftRef));
    const rightWidth = vue.computed(() => isDef(props2.rightWidth) ? +props2.rightWidth : getWidthByRef(rightRef));
    const open = (side) => {
      state.offset = side === "left" ? leftWidth.value : -rightWidth.value;
      if (!opened) {
        opened = true;
        emit("open", {
          name: props2.name,
          position: side
        });
      }
    };
    const close = (position) => {
      state.offset = 0;
      if (opened) {
        opened = false;
        emit("close", {
          name: props2.name,
          position
        });
      }
    };
    const toggle = (side) => {
      const offset = Math.abs(state.offset);
      const THRESHOLD = 0.15;
      const threshold = opened ? 1 - THRESHOLD : THRESHOLD;
      const width = side === "left" ? leftWidth.value : rightWidth.value;
      if (width && offset > width * threshold) {
        open(side);
      } else {
        close(side);
      }
    };
    const onTouchStart = (event) => {
      if (!props2.disabled) {
        startOffset = state.offset;
        touch.start(event);
      }
    };
    const onTouchMove = (event) => {
      if (props2.disabled) {
        return;
      }
      const {
        deltaX
      } = touch;
      touch.move(event);
      if (touch.isHorizontal()) {
        lockClick2 = true;
        state.dragging = true;
        const isEdge = !opened || deltaX.value * startOffset < 0;
        if (isEdge) {
          preventDefault(event, props2.stopPropagation);
        }
        state.offset = clamp(deltaX.value + startOffset, -rightWidth.value, leftWidth.value);
      }
    };
    const onTouchEnd = () => {
      if (state.dragging) {
        state.dragging = false;
        toggle(state.offset > 0 ? "left" : "right");
        setTimeout(() => {
          lockClick2 = false;
        }, 0);
      }
    };
    const onClick = (position = "outside") => {
      emit("click", position);
      if (opened && !lockClick2) {
        callInterceptor(props2.beforeClose, {
          args: [{
            name: props2.name,
            position
          }],
          done: () => close(position)
        });
      }
    };
    const getClickHandler = (position, stop) => (event) => {
      if (stop) {
        event.stopPropagation();
      }
      onClick(position);
    };
    const renderSideContent = (side, ref2) => {
      const contentSlot = slots[side];
      if (contentSlot) {
        return vue.createVNode("div", {
          "ref": ref2,
          "class": bem$6(side),
          "onClick": getClickHandler(side, true)
        }, [contentSlot()]);
      }
    };
    useExpose({
      open,
      close
    });
    use.useClickAway(root, () => onClick("outside"), {
      eventName: "touchstart"
    });
    use.useEventListener("touchmove", onTouchMove, {
      target: root
    });
    return () => {
      var _a;
      const wrapperStyle = {
        transform: `translate3d(${state.offset}px, 0, 0)`,
        transitionDuration: state.dragging ? "0s" : ".6s"
      };
      return vue.createVNode("div", {
        "ref": root,
        "class": bem$6(),
        "onClick": getClickHandler("cell", lockClick2),
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [vue.createVNode("div", {
        "class": bem$6("wrapper"),
        "style": wrapperStyle
      }, [renderSideContent("left", leftRef), (_a = slots.default) == null ? void 0 : _a.call(slots), renderSideContent("right", rightRef)])]);
    };
  }
});
const SwipeCell = withInstall(stdin_default$c);
const [name$6, bem$5] = createNamespace("tabbar");
const tabbarProps = {
  route: Boolean,
  fixed: truthProp,
  border: truthProp,
  zIndex: numericProp,
  placeholder: Boolean,
  activeColor: String,
  beforeChange: Function,
  inactiveColor: String,
  modelValue: makeNumericProp(0),
  safeAreaInsetBottom: {
    type: Boolean,
    default: null
  }
};
const TABBAR_KEY = Symbol(name$6);
var stdin_default$b = vue.defineComponent({
  name: name$6,
  props: tabbarProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = vue.ref();
    const {
      linkChildren
    } = use.useChildren(TABBAR_KEY);
    const renderPlaceholder = usePlaceholder(root, bem$5);
    const enableSafeArea = () => {
      var _a;
      return (_a = props2.safeAreaInsetBottom) != null ? _a : props2.fixed;
    };
    const renderTabbar = () => {
      var _a;
      const {
        fixed,
        zIndex,
        border
      } = props2;
      return vue.createVNode("div", {
        "ref": root,
        "role": "tablist",
        "style": getZIndexStyle(zIndex),
        "class": [bem$5({
          fixed
        }), {
          [BORDER_TOP_BOTTOM]: border,
          "van-safe-area-bottom": enableSafeArea()
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    const setActive = (active, afterChange) => {
      callInterceptor(props2.beforeChange, {
        args: [active],
        done() {
          emit("update:modelValue", active);
          emit("change", active);
          afterChange();
        }
      });
    };
    linkChildren({
      props: props2,
      setActive
    });
    return () => {
      if (props2.fixed && props2.placeholder) {
        return renderPlaceholder(renderTabbar);
      }
      return renderTabbar();
    };
  }
});
const Tabbar = withInstall(stdin_default$b);
const [name$5, bem$4] = createNamespace("tabbar-item");
const tabbarItemProps = extend({}, routeProps, {
  dot: Boolean,
  icon: String,
  name: numericProp,
  badge: numericProp,
  badgeProps: Object,
  iconPrefix: String
});
var stdin_default$a = vue.defineComponent({
  name: name$5,
  props: tabbarItemProps,
  emits: ["click"],
  setup(props2, {
    emit,
    slots
  }) {
    const route2 = useRoute();
    const vm = vue.getCurrentInstance().proxy;
    const {
      parent,
      index
    } = use.useParent(TABBAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <TabbarItem> must be a child component of <Tabbar>.");
      }
      return;
    }
    const active = vue.computed(() => {
      var _a;
      const {
        route: route22,
        modelValue
      } = parent.props;
      if (route22 && "$route" in vm) {
        const {
          $route
        } = vm;
        const {
          to
        } = props2;
        const config = isObject(to) ? to : {
          path: to
        };
        return !!$route.matched.find((val) => {
          const pathMatched = "path" in config && config.path === val.path;
          const nameMatched = "name" in config && config.name === val.name;
          return pathMatched || nameMatched;
        });
      }
      return ((_a = props2.name) != null ? _a : index.value) === modelValue;
    });
    const onClick = (event) => {
      var _a;
      if (!active.value) {
        parent.setActive((_a = props2.name) != null ? _a : index.value, route2);
      }
      emit("click", event);
    };
    const renderIcon = () => {
      if (slots.icon) {
        return slots.icon({
          active: active.value
        });
      }
      if (props2.icon) {
        return vue.createVNode(Icon, {
          "name": props2.icon,
          "classPrefix": props2.iconPrefix
        }, null);
      }
    };
    return () => {
      var _a;
      const {
        dot,
        badge
      } = props2;
      const {
        activeColor,
        inactiveColor
      } = parent.props;
      const color = active.value ? activeColor : inactiveColor;
      return vue.createVNode("div", {
        "role": "tab",
        "class": bem$4({
          active: active.value
        }),
        "style": {
          color
        },
        "tabindex": 0,
        "aria-selected": active.value,
        "onClick": onClick
      }, [vue.createVNode(Badge, vue.mergeProps({
        "dot": dot,
        "class": bem$4("icon"),
        "content": badge
      }, props2.badgeProps), {
        default: renderIcon
      }), vue.createVNode("div", {
        "class": bem$4("text")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        active: active.value
      })])]);
    };
  }
});
const TabbarItem = withInstall(stdin_default$a);
const [name$4, bem$3] = createNamespace("text-ellipsis");
const textEllipsisProps = {
  rows: makeNumericProp(1),
  dots: makeStringProp("..."),
  content: makeStringProp(""),
  expandText: makeStringProp(""),
  collapseText: makeStringProp(""),
  position: makeStringProp("end")
};
var stdin_default$9 = vue.defineComponent({
  name: name$4,
  props: textEllipsisProps,
  emits: ["clickAction"],
  setup(props2, {
    emit
  }) {
    const text = vue.ref("");
    const expanded = vue.ref(false);
    const hasAction = vue.ref(false);
    const root = vue.ref();
    const actionText = vue.computed(() => expanded.value ? props2.expandText : props2.collapseText);
    const pxToNum = (value) => {
      if (!value)
        return 0;
      const match = value.match(/^\d*(\.\d*)?/);
      return match ? Number(match[0]) : 0;
    };
    const calcEllipsised = () => {
      const cloneContainer = () => {
        if (!root.value)
          return;
        const originStyle = window.getComputedStyle(root.value);
        const container2 = document.createElement("div");
        const styleNames = Array.prototype.slice.apply(originStyle);
        styleNames.forEach((name2) => {
          container2.style.setProperty(name2, originStyle.getPropertyValue(name2));
        });
        container2.style.position = "fixed";
        container2.style.zIndex = "-9999";
        container2.style.top = "-9999px";
        container2.style.height = "auto";
        container2.style.minHeight = "auto";
        container2.style.maxHeight = "auto";
        container2.innerText = props2.content;
        document.body.appendChild(container2);
        return container2;
      };
      const calcEllipsisText = (container2, maxHeight2) => {
        const {
          content,
          position,
          dots
        } = props2;
        const end = content.length;
        const calcEllipse = () => {
          const tail = (left, right) => {
            if (right - left <= 1) {
              if (position === "end") {
                return content.slice(0, left) + dots;
              }
              return dots + content.slice(right, end);
            }
            const middle2 = Math.round(left + right >> 1);
            if (position === "end") {
              container2.innerText = content.slice(0, middle2) + dots + actionText.value;
            } else {
              container2.innerText = dots + content.slice(middle2, end) + actionText.value;
            }
            if (container2.offsetHeight > maxHeight2) {
              if (position === "end") {
                return tail(left, middle2);
              }
              return tail(middle2, right);
            }
            if (position === "end") {
              return tail(middle2, right);
            }
            return tail(left, middle2);
          };
          container2.innerText = tail(0, end);
        };
        const middleTail = (leftPart, rightPart) => {
          if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
            return content.slice(0, leftPart[1]) + dots + dots + content.slice(rightPart[1], end);
          }
          const leftMiddle = Math.floor(leftPart[0] + leftPart[1] >> 1);
          const rightMiddle = Math.ceil(rightPart[0] + rightPart[1] >> 1);
          container2.innerText = props2.content.slice(0, leftMiddle) + props2.dots + actionText.value + props2.dots + props2.content.slice(rightMiddle, end);
          if (container2.offsetHeight >= maxHeight2) {
            return middleTail([leftPart[0], leftMiddle], [rightMiddle, rightPart[1]]);
          }
          return middleTail([leftMiddle, leftPart[1]], [rightPart[0], rightMiddle]);
        };
        const middle = 0 + end >> 1;
        props2.position === "middle" ? container2.innerText = middleTail([0, middle], [middle, end]) : calcEllipse();
        return container2.innerText;
      };
      const container = cloneContainer();
      if (!container)
        return;
      const {
        paddingBottom,
        paddingTop,
        lineHeight
      } = container.style;
      const maxHeight = Math.ceil((Number(props2.rows) + 0.5) * pxToNum(lineHeight) + pxToNum(paddingTop) + pxToNum(paddingBottom));
      if (maxHeight < container.offsetHeight) {
        hasAction.value = true;
        text.value = calcEllipsisText(container, maxHeight);
      } else {
        hasAction.value = false;
        text.value = props2.content;
      }
      document.body.removeChild(container);
    };
    const onClickAction = (event) => {
      expanded.value = !expanded.value;
      emit("clickAction", event);
    };
    const renderAction = () => vue.createVNode("span", {
      "class": bem$3("action"),
      "onClick": onClickAction
    }, [expanded.value ? props2.collapseText : props2.expandText]);
    vue.onMounted(calcEllipsised);
    vue.watch(() => [props2.content, props2.rows, props2.position], calcEllipsised);
    use.useEventListener("resize", calcEllipsised);
    return () => vue.createVNode("div", {
      "ref": root,
      "class": bem$3()
    }, [expanded.value ? props2.content : text.value, hasAction.value ? renderAction() : null]);
  }
});
const TextEllipsis = withInstall(stdin_default$9);
const [name$3] = createNamespace("time-picker");
const validateTime = (val) => /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(val);
const fullColumns = ["hour", "minute", "second"];
const timePickerProps = extend({}, sharedProps, {
  minHour: makeNumericProp(0),
  maxHour: makeNumericProp(23),
  minMinute: makeNumericProp(0),
  maxMinute: makeNumericProp(59),
  minSecond: makeNumericProp(0),
  maxSecond: makeNumericProp(59),
  minTime: {
    type: String,
    validator: validateTime
  },
  maxTime: {
    type: String,
    validator: validateTime
  },
  columnsType: {
    type: Array,
    default: () => ["hour", "minute"]
  },
  filter: Function
});
var stdin_default$8 = vue.defineComponent({
  name: name$3,
  props: timePickerProps,
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const currentValues = vue.ref(props2.modelValue);
    const getValidTime = (time) => {
      const timeLimitArr = time.split(":");
      return fullColumns.map((col, i) => props2.columnsType.includes(col) ? timeLimitArr[i] : "00");
    };
    const columns = vue.computed(() => {
      let {
        minHour,
        maxHour,
        minMinute,
        maxMinute,
        minSecond,
        maxSecond
      } = props2;
      if (props2.minTime || props2.maxTime) {
        const fullTime = {
          hour: 0,
          minute: 0,
          second: 0
        };
        props2.columnsType.forEach((col, i) => {
          var _a;
          fullTime[col] = (_a = currentValues.value[i]) != null ? _a : 0;
        });
        const {
          hour,
          minute
        } = fullTime;
        if (props2.minTime) {
          const [minH, minM, minS] = getValidTime(props2.minTime);
          minHour = minH;
          minMinute = +hour <= +minHour ? minM : "00";
          minSecond = +hour <= +minHour && +minute <= +minMinute ? minS : "00";
        }
        if (props2.maxTime) {
          const [maxH, maxM, maxS] = getValidTime(props2.maxTime);
          maxHour = maxH;
          maxMinute = +hour >= +maxHour ? maxM : "59";
          maxSecond = +hour >= +maxHour && +minute >= +maxMinute ? maxS : "59";
        }
      }
      return props2.columnsType.map((type) => {
        const {
          filter,
          formatter
        } = props2;
        switch (type) {
          case "hour":
            return genOptions(+minHour, +maxHour, type, formatter, filter, currentValues.value);
          case "minute":
            return genOptions(+minMinute, +maxMinute, type, formatter, filter, currentValues.value);
          case "second":
            return genOptions(+minSecond, +maxSecond, type, formatter, filter, currentValues.value);
          default:
            if (process.env.NODE_ENV !== "production") {
              throw new Error(`[Vant] DatePicker: unsupported columns type: ${type}`);
            }
            return [];
        }
      });
    });
    vue.watch(currentValues, (newValues) => {
      if (!isSameValue(newValues, props2.modelValue)) {
        emit("update:modelValue", newValues);
      }
    });
    vue.watch(() => props2.modelValue, (newValues) => {
      newValues = formatValueRange(newValues, columns.value);
      if (!isSameValue(newValues, currentValues.value)) {
        currentValues.value = newValues;
      }
    }, {
      immediate: true
    });
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    return () => vue.createVNode(Picker, vue.mergeProps({
      "modelValue": currentValues.value,
      "onUpdate:modelValue": ($event) => currentValues.value = $event,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props2, pickerInheritKeys)), slots);
  }
});
const TimePicker = withInstall(stdin_default$8);
const [name$2, bem$2] = createNamespace("tree-select");
const treeSelectProps = {
  max: makeNumericProp(Infinity),
  items: makeArrayProp(),
  height: makeNumericProp(300),
  selectedIcon: makeStringProp("success"),
  mainActiveIndex: makeNumericProp(0),
  activeId: {
    type: [Number, String, Array],
    default: 0
  }
};
var stdin_default$7 = vue.defineComponent({
  name: name$2,
  props: treeSelectProps,
  emits: ["clickNav", "clickItem", "update:activeId", "update:mainActiveIndex"],
  setup(props2, {
    emit,
    slots
  }) {
    const isActiveItem = (id) => Array.isArray(props2.activeId) ? props2.activeId.includes(id) : props2.activeId === id;
    const renderSubItem = (item) => {
      const onClick = () => {
        if (item.disabled) {
          return;
        }
        let activeId;
        if (Array.isArray(props2.activeId)) {
          activeId = props2.activeId.slice();
          const index = activeId.indexOf(item.id);
          if (index !== -1) {
            activeId.splice(index, 1);
          } else if (activeId.length < +props2.max) {
            activeId.push(item.id);
          }
        } else {
          activeId = item.id;
        }
        emit("update:activeId", activeId);
        emit("clickItem", item);
      };
      return vue.createVNode("div", {
        "key": item.id,
        "class": ["van-ellipsis", bem$2("item", {
          active: isActiveItem(item.id),
          disabled: item.disabled
        })],
        "onClick": onClick
      }, [item.text, isActiveItem(item.id) && vue.createVNode(Icon, {
        "name": props2.selectedIcon,
        "class": bem$2("selected")
      }, null)]);
    };
    const onSidebarChange = (index) => {
      emit("update:mainActiveIndex", index);
    };
    const onClickSidebarItem = (index) => emit("clickNav", index);
    const renderSidebar = () => {
      const Items = props2.items.map((item) => vue.createVNode(SidebarItem, {
        "dot": item.dot,
        "badge": item.badge,
        "class": [bem$2("nav-item"), item.className],
        "disabled": item.disabled,
        "onClick": onClickSidebarItem
      }, {
        title: () => slots["nav-text"] ? slots["nav-text"](item) : item.text
      }));
      return vue.createVNode(Sidebar, {
        "class": bem$2("nav"),
        "modelValue": props2.mainActiveIndex,
        "onChange": onSidebarChange
      }, {
        default: () => [Items]
      });
    };
    const renderContent = () => {
      if (slots.content) {
        return slots.content();
      }
      const selected = props2.items[+props2.mainActiveIndex] || {};
      if (selected.children) {
        return selected.children.map(renderSubItem);
      }
    };
    return () => vue.createVNode("div", {
      "class": bem$2(),
      "style": {
        height: addUnit(props2.height)
      }
    }, [renderSidebar(), vue.createVNode("div", {
      "class": bem$2("content")
    }, [renderContent()])]);
  }
});
const TreeSelect = withInstall(stdin_default$7);
const [name$1, bem$1, t] = createNamespace("uploader");
function readFileContent(file, resultType) {
  return new Promise((resolve) => {
    if (resultType === "file") {
      resolve();
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    if (resultType === "dataUrl") {
      reader.readAsDataURL(file);
    } else if (resultType === "text") {
      reader.readAsText(file);
    }
  });
}
function isOversize(items, maxSize) {
  return toArray(items).some((item) => {
    if (item.file) {
      if (isFunction(maxSize)) {
        return maxSize(item.file);
      }
      return item.file.size > +maxSize;
    }
    return false;
  });
}
function filterFiles(items, maxSize) {
  const valid = [];
  const invalid = [];
  items.forEach((item) => {
    if (isOversize(item, maxSize)) {
      invalid.push(item);
    } else {
      valid.push(item);
    }
  });
  return { valid, invalid };
}
const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|avif)/i;
const isImageUrl = (url) => IMAGE_REGEXP.test(url);
function isImageFile(item) {
  if (item.isImage) {
    return true;
  }
  if (item.file && item.file.type) {
    return item.file.type.indexOf("image") === 0;
  }
  if (item.url) {
    return isImageUrl(item.url);
  }
  if (typeof item.content === "string") {
    return item.content.indexOf("data:image") === 0;
  }
  return false;
}
var stdin_default$6 = vue.defineComponent({
  props: {
    name: numericProp,
    item: makeRequiredProp(Object),
    index: Number,
    imageFit: String,
    lazyLoad: Boolean,
    deletable: Boolean,
    reupload: Boolean,
    previewSize: [Number, String, Array],
    beforeDelete: Function
  },
  emits: ["delete", "preview", "reupload"],
  setup(props2, {
    emit,
    slots
  }) {
    const renderMask = () => {
      const {
        status,
        message
      } = props2.item;
      if (status === "uploading" || status === "failed") {
        const MaskIcon = status === "failed" ? vue.createVNode(Icon, {
          "name": "close",
          "class": bem$1("mask-icon")
        }, null) : vue.createVNode(Loading, {
          "class": bem$1("loading")
        }, null);
        const showMessage = isDef(message) && message !== "";
        return vue.createVNode("div", {
          "class": bem$1("mask")
        }, [MaskIcon, showMessage && vue.createVNode("div", {
          "class": bem$1("mask-message")
        }, [message])]);
      }
    };
    const onDelete = (event) => {
      const {
        name: name2,
        item,
        index,
        beforeDelete
      } = props2;
      event.stopPropagation();
      callInterceptor(beforeDelete, {
        args: [item, {
          name: name2,
          index
        }],
        done: () => emit("delete")
      });
    };
    const onPreview = () => emit("preview");
    const onReupload = () => emit("reupload");
    const renderDeleteIcon = () => {
      if (props2.deletable && props2.item.status !== "uploading") {
        const slot = slots["preview-delete"];
        return vue.createVNode("div", {
          "role": "button",
          "class": bem$1("preview-delete", {
            shadow: !slot
          }),
          "tabindex": 0,
          "aria-label": t("delete"),
          "onClick": onDelete
        }, [slot ? slot() : vue.createVNode(Icon, {
          "name": "cross",
          "class": bem$1("preview-delete-icon")
        }, null)]);
      }
    };
    const renderCover = () => {
      if (slots["preview-cover"]) {
        const {
          index,
          item
        } = props2;
        return vue.createVNode("div", {
          "class": bem$1("preview-cover")
        }, [slots["preview-cover"](extend({
          index
        }, item))]);
      }
    };
    const renderPreview = () => {
      const {
        item,
        lazyLoad,
        imageFit,
        previewSize,
        reupload
      } = props2;
      if (isImageFile(item)) {
        return vue.createVNode(Image$1, {
          "fit": imageFit,
          "src": item.objectUrl || item.content || item.url,
          "class": bem$1("preview-image"),
          "width": Array.isArray(previewSize) ? previewSize[0] : previewSize,
          "height": Array.isArray(previewSize) ? previewSize[1] : previewSize,
          "lazyLoad": lazyLoad,
          "onClick": reupload ? onReupload : onPreview
        }, {
          default: renderCover
        });
      }
      return vue.createVNode("div", {
        "class": bem$1("file"),
        "style": getSizeStyle(props2.previewSize)
      }, [vue.createVNode(Icon, {
        "class": bem$1("file-icon"),
        "name": "description"
      }, null), vue.createVNode("div", {
        "class": [bem$1("file-name"), "van-ellipsis"]
      }, [item.file ? item.file.name : item.url]), renderCover()]);
    };
    return () => vue.createVNode("div", {
      "class": bem$1("preview")
    }, [renderPreview(), renderMask(), renderDeleteIcon()]);
  }
});
const uploaderProps = {
  name: makeNumericProp(""),
  accept: makeStringProp("image/*"),
  capture: String,
  multiple: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  lazyLoad: Boolean,
  maxCount: makeNumericProp(Infinity),
  imageFit: makeStringProp("cover"),
  resultType: makeStringProp("dataUrl"),
  uploadIcon: makeStringProp("photograph"),
  uploadText: String,
  deletable: truthProp,
  reupload: Boolean,
  afterRead: Function,
  showUpload: truthProp,
  modelValue: makeArrayProp(),
  beforeRead: Function,
  beforeDelete: Function,
  previewSize: [Number, String, Array],
  previewImage: truthProp,
  previewOptions: Object,
  previewFullImage: truthProp,
  maxSize: {
    type: [Number, String, Function],
    default: Infinity
  }
};
var stdin_default$5 = vue.defineComponent({
  name: name$1,
  props: uploaderProps,
  emits: ["delete", "oversize", "clickUpload", "closePreview", "clickPreview", "clickReupload", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const inputRef = vue.ref();
    const urls = [];
    const reuploadIndex = vue.ref(-1);
    const getDetail = (index = props2.modelValue.length) => ({
      name: props2.name,
      index
    });
    const resetInput = () => {
      if (inputRef.value) {
        inputRef.value.value = "";
      }
    };
    const onAfterRead = (items) => {
      resetInput();
      if (isOversize(items, props2.maxSize)) {
        if (Array.isArray(items)) {
          const result = filterFiles(items, props2.maxSize);
          items = result.valid;
          emit("oversize", result.invalid, getDetail());
          if (!items.length) {
            return;
          }
        } else {
          emit("oversize", items, getDetail());
          return;
        }
      }
      items = vue.reactive(items);
      if (reuploadIndex.value > -1) {
        const arr = [...props2.modelValue];
        arr.splice(reuploadIndex.value, 1, items);
        emit("update:modelValue", arr);
        reuploadIndex.value = -1;
      } else {
        emit("update:modelValue", [...props2.modelValue, ...toArray(items)]);
      }
      if (props2.afterRead) {
        props2.afterRead(items, getDetail());
      }
    };
    const readFile = (files) => {
      const {
        maxCount,
        modelValue,
        resultType
      } = props2;
      if (Array.isArray(files)) {
        const remainCount = +maxCount - modelValue.length;
        if (files.length > remainCount) {
          files = files.slice(0, remainCount);
        }
        Promise.all(files.map((file) => readFileContent(file, resultType))).then((contents) => {
          const fileList = files.map((file, index) => {
            const result = {
              file,
              status: "",
              message: "",
              objectUrl: URL.createObjectURL(file)
            };
            if (contents[index]) {
              result.content = contents[index];
            }
            return result;
          });
          onAfterRead(fileList);
        });
      } else {
        readFileContent(files, resultType).then((content) => {
          const result = {
            file: files,
            status: "",
            message: "",
            objectUrl: URL.createObjectURL(files)
          };
          if (content) {
            result.content = content;
          }
          onAfterRead(result);
        });
      }
    };
    const onChange = (event) => {
      const {
        files
      } = event.target;
      if (props2.disabled || !files || !files.length) {
        return;
      }
      const file = files.length === 1 ? files[0] : [].slice.call(files);
      if (props2.beforeRead) {
        const response = props2.beforeRead(file, getDetail());
        if (!response) {
          resetInput();
          return;
        }
        if (isPromise(response)) {
          response.then((data) => {
            if (data) {
              readFile(data);
            } else {
              readFile(file);
            }
          }).catch(resetInput);
          return;
        }
      }
      readFile(file);
    };
    let imagePreview;
    const onClosePreview = () => emit("closePreview");
    const previewImage = (item) => {
      if (props2.previewFullImage) {
        const imageFiles = props2.modelValue.filter(isImageFile);
        const images = imageFiles.map((item2) => {
          if (item2.objectUrl && !item2.url && item2.status !== "failed") {
            item2.url = item2.objectUrl;
            urls.push(item2.url);
          }
          return item2.url;
        }).filter(Boolean);
        imagePreview = showImagePreview(extend({
          images,
          startPosition: imageFiles.indexOf(item),
          onClose: onClosePreview
        }, props2.previewOptions));
      }
    };
    const closeImagePreview = () => {
      if (imagePreview) {
        imagePreview.close();
      }
    };
    const deleteFile = (item, index) => {
      const fileList = props2.modelValue.slice(0);
      fileList.splice(index, 1);
      emit("update:modelValue", fileList);
      emit("delete", item, getDetail(index));
    };
    const reuploadImage = (index) => {
      chooseFile();
      reuploadIndex.value = index;
    };
    const renderPreviewItem = (item, index) => {
      const needPickData = ["imageFit", "deletable", "reupload", "previewSize", "beforeDelete"];
      const previewData = extend(pick(props2, needPickData), pick(item, needPickData, true));
      return vue.createVNode(stdin_default$6, vue.mergeProps({
        "item": item,
        "index": index,
        "onClick": () => emit(props2.reupload ? "clickReupload" : "clickPreview", item, getDetail(index)),
        "onDelete": () => deleteFile(item, index),
        "onPreview": () => previewImage(item),
        "onReupload": () => reuploadImage(index)
      }, pick(props2, ["name", "lazyLoad"]), previewData), pick(slots, ["preview-cover", "preview-delete"]));
    };
    const renderPreviewList = () => {
      if (props2.previewImage) {
        return props2.modelValue.map(renderPreviewItem);
      }
    };
    const onClickUpload = (event) => emit("clickUpload", event);
    const renderUpload = () => {
      if (props2.modelValue.length >= +props2.maxCount && !props2.reupload) {
        return;
      }
      const hideUploader = props2.modelValue.length >= +props2.maxCount && props2.reupload;
      const Input = props2.readonly ? null : vue.createVNode("input", {
        "ref": inputRef,
        "type": "file",
        "class": bem$1("input"),
        "accept": props2.accept,
        "capture": props2.capture,
        "multiple": props2.multiple && reuploadIndex.value === -1,
        "disabled": props2.disabled,
        "onChange": onChange
      }, null);
      if (slots.default) {
        return vue.withDirectives(vue.createVNode("div", {
          "class": bem$1("input-wrapper"),
          "onClick": onClickUpload
        }, [slots.default(), Input]), [[vue.vShow, !hideUploader]]);
      }
      return vue.withDirectives(vue.createVNode("div", {
        "class": bem$1("upload", {
          readonly: props2.readonly
        }),
        "style": getSizeStyle(props2.previewSize),
        "onClick": onClickUpload
      }, [vue.createVNode(Icon, {
        "name": props2.uploadIcon,
        "class": bem$1("upload-icon")
      }, null), props2.uploadText && vue.createVNode("span", {
        "class": bem$1("upload-text")
      }, [props2.uploadText]), Input]), [[vue.vShow, props2.showUpload && !hideUploader]]);
    };
    const chooseFile = () => {
      if (inputRef.value && !props2.disabled) {
        inputRef.value.click();
      }
    };
    vue.onBeforeUnmount(() => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    });
    useExpose({
      chooseFile,
      closeImagePreview
    });
    use.useCustomFieldValue(() => props2.modelValue);
    return () => vue.createVNode("div", {
      "class": bem$1()
    }, [vue.createVNode("div", {
      "class": bem$1("wrapper", {
        disabled: props2.disabled
      })
    }, [renderPreviewList(), renderUpload()])]);
  }
});
const Uploader = withInstall(stdin_default$5);
const [name, bem] = createNamespace("watermark");
const watermarkProps = {
  gapX: makeNumberProp(0),
  gapY: makeNumberProp(0),
  image: String,
  width: makeNumberProp(100),
  height: makeNumberProp(100),
  rotate: makeNumericProp(-22),
  zIndex: numericProp,
  content: String,
  opacity: numericProp,
  fullPage: truthProp,
  textColor: makeStringProp("#dcdee0")
};
var stdin_default$4 = vue.defineComponent({
  name,
  props: watermarkProps,
  setup(props2, {
    slots
  }) {
    const svgElRef = vue.ref();
    const watermarkUrl = vue.ref("");
    const imageBase64 = vue.ref("");
    const renderWatermark = () => {
      const rotateStyle = {
        transformOrigin: "center",
        transform: `rotate(${props2.rotate}deg)`
      };
      const svgInner = () => {
        if (props2.image && !slots.content) {
          return vue.createVNode("image", {
            "href": imageBase64.value,
            "xlink:href": imageBase64.value,
            "x": "0",
            "y": "0",
            "width": props2.width,
            "height": props2.height,
            "style": rotateStyle
          }, null);
        }
        return vue.createVNode("foreignObject", {
          "x": "0",
          "y": "0",
          "width": props2.width,
          "height": props2.height
        }, [vue.createVNode("div", {
          "xmlns": "http://www.w3.org/1999/xhtml",
          "style": rotateStyle
        }, [slots.content ? slots.content() : vue.createVNode("span", {
          "style": {
            color: props2.textColor
          }
        }, [props2.content])])]);
      };
      const svgWidth = props2.width + props2.gapX;
      const svgHeight = props2.height + props2.gapY;
      return vue.createVNode("svg", {
        "viewBox": `0 0 ${svgWidth} ${svgHeight}`,
        "width": svgWidth,
        "height": svgHeight,
        "xmlns": "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "style": {
          padding: `0 ${props2.gapX}px ${props2.gapY}px 0`,
          opacity: props2.opacity
        }
      }, [svgInner()]);
    };
    const makeImageToBase64 = (url) => {
      const canvas = document.createElement("canvas");
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.referrerPolicy = "no-referrer";
      image.onload = () => {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx == null ? void 0 : ctx.drawImage(image, 0, 0);
        imageBase64.value = canvas.toDataURL();
      };
      image.src = url;
    };
    const makeSvgToBlobUrl = (svgStr) => {
      const svgBlob = new Blob([svgStr], {
        type: "image/svg+xml"
      });
      return URL.createObjectURL(svgBlob);
    };
    vue.watchEffect(() => {
      if (props2.image) {
        makeImageToBase64(props2.image);
      }
    });
    vue.watch(() => [imageBase64.value, props2.content, props2.textColor, props2.height, props2.width, props2.rotate, props2.gapX, props2.gapY], () => {
      vue.nextTick(() => {
        if (svgElRef.value) {
          if (watermarkUrl.value) {
            URL.revokeObjectURL(watermarkUrl.value);
          }
          watermarkUrl.value = makeSvgToBlobUrl(svgElRef.value.innerHTML);
        }
      });
    }, {
      immediate: true
    });
    vue.onUnmounted(() => {
      if (watermarkUrl.value) {
        URL.revokeObjectURL(watermarkUrl.value);
      }
    });
    return () => {
      const style = extend({
        backgroundImage: `url(${watermarkUrl.value})`
      }, getZIndexStyle(props2.zIndex));
      return vue.createVNode("div", {
        "class": bem({
          full: props2.fullPage
        }),
        "style": style
      }, [vue.createVNode("div", {
        "class": bem("wrapper"),
        "ref": svgElRef
      }, [renderWatermark()])]);
    };
  }
});
const Watermark = withInstall(stdin_default$4);
class ReactiveListener {
  constructor({
    el,
    src,
    error,
    loading,
    bindType,
    $parent,
    options,
    cors,
    elRenderer,
    imageCache
  }) {
    this.el = el;
    this.src = src;
    this.error = error;
    this.loading = loading;
    this.bindType = bindType;
    this.attempt = 0;
    this.cors = cors;
    this.naturalHeight = 0;
    this.naturalWidth = 0;
    this.options = options;
    this.$parent = $parent;
    this.elRenderer = elRenderer;
    this.imageCache = imageCache;
    this.performanceData = {
      loadStart: 0,
      loadEnd: 0
    };
    this.filter();
    this.initState();
    this.render("loading", false);
  }
  /*
   * init listener state
   * @return
   */
  initState() {
    if ("dataset" in this.el) {
      this.el.dataset.src = this.src;
    } else {
      this.el.setAttribute("data-src", this.src);
    }
    this.state = {
      loading: false,
      error: false,
      loaded: false,
      rendered: false
    };
  }
  /*
   * record performance
   * @return
   */
  record(event) {
    this.performanceData[event] = Date.now();
  }
  /*
   * update image listener data
   * @param  {String} image uri
   * @param  {String} loading image uri
   * @param  {String} error image uri
   * @return
   */
  update({ src, loading, error }) {
    const oldSrc = this.src;
    this.src = src;
    this.loading = loading;
    this.error = error;
    this.filter();
    if (oldSrc !== this.src) {
      this.attempt = 0;
      this.initState();
    }
  }
  /*
   *  check el is in view
   * @return {Boolean} el is in view
   */
  checkInView() {
    const rect = use.useRect(this.el);
    return rect.top < window.innerHeight * this.options.preLoad && rect.bottom > this.options.preLoadTop && rect.left < window.innerWidth * this.options.preLoad && rect.right > 0;
  }
  /*
   * listener filter
   */
  filter() {
    Object.keys(this.options.filter).forEach((key) => {
      this.options.filter[key](this, this.options);
    });
  }
  /*
   * render loading first
   * @params cb:Function
   * @return
   */
  renderLoading(cb) {
    this.state.loading = true;
    loadImageAsync(
      {
        src: this.loading,
        cors: this.cors
      },
      () => {
        this.render("loading", false);
        this.state.loading = false;
        cb();
      },
      () => {
        cb();
        this.state.loading = false;
        if (process.env.NODE_ENV !== "production" && !this.options.silent)
          console.warn(
            `[@vant/lazyload] load failed with loading image(${this.loading})`
          );
      }
    );
  }
  /*
   * try load image and  render it
   * @return
   */
  load(onFinish = noop) {
    if (this.attempt > this.options.attempt - 1 && this.state.error) {
      if (process.env.NODE_ENV !== "production" && !this.options.silent) {
        console.log(
          `[@vant/lazyload] ${this.src} tried too more than ${this.options.attempt} times`
        );
      }
      onFinish();
      return;
    }
    if (this.state.rendered && this.state.loaded)
      return;
    if (this.imageCache.has(this.src)) {
      this.state.loaded = true;
      this.render("loaded", true);
      this.state.rendered = true;
      return onFinish();
    }
    this.renderLoading(() => {
      var _a, _b;
      this.attempt++;
      (_b = (_a = this.options.adapter).beforeLoad) == null ? void 0 : _b.call(_a, this, this.options);
      this.record("loadStart");
      loadImageAsync(
        {
          src: this.src,
          cors: this.cors
        },
        (data) => {
          this.naturalHeight = data.naturalHeight;
          this.naturalWidth = data.naturalWidth;
          this.state.loaded = true;
          this.state.error = false;
          this.record("loadEnd");
          this.render("loaded", false);
          this.state.rendered = true;
          this.imageCache.add(this.src);
          onFinish();
        },
        (err) => {
          !this.options.silent && console.error(err);
          this.state.error = true;
          this.state.loaded = false;
          this.render("error", false);
        }
      );
    });
  }
  /*
   * render image
   * @param  {String} state to render // ['loading', 'src', 'error']
   * @param  {String} is form cache
   * @return
   */
  render(state, cache) {
    this.elRenderer(this, state, cache);
  }
  /*
   * output performance data
   * @return {Object} performance data
   */
  performance() {
    let state = "loading";
    let time = 0;
    if (this.state.loaded) {
      state = "loaded";
      time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1e3;
    }
    if (this.state.error)
      state = "error";
    return {
      src: this.src,
      state,
      time
    };
  }
  /*
   * $destroy
   * @return
   */
  $destroy() {
    this.el = null;
    this.src = null;
    this.error = null;
    this.loading = null;
    this.bindType = null;
    this.attempt = 0;
  }
}
const DEFAULT_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const DEFAULT_EVENTS = [
  "scroll",
  "wheel",
  "mousewheel",
  "resize",
  "animationend",
  "transitionend",
  "touchmove"
];
const DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: "0px",
  threshold: 0
};
function stdin_default$3() {
  return class Lazy {
    constructor({
      preLoad,
      error,
      throttleWait,
      preLoadTop,
      dispatchEvent,
      loading,
      attempt,
      silent = true,
      scale,
      listenEvents,
      filter,
      adapter,
      observer,
      observerOptions
    }) {
      this.mode = modeType.event;
      this.listeners = [];
      this.targetIndex = 0;
      this.targets = [];
      this.options = {
        silent,
        dispatchEvent: !!dispatchEvent,
        throttleWait: throttleWait || 200,
        preLoad: preLoad || 1.3,
        preLoadTop: preLoadTop || 0,
        error: error || DEFAULT_URL,
        loading: loading || DEFAULT_URL,
        attempt: attempt || 3,
        scale: scale || getDPR(scale),
        ListenEvents: listenEvents || DEFAULT_EVENTS,
        supportWebp: supportWebp(),
        filter: filter || {},
        adapter: adapter || {},
        observer: !!observer,
        observerOptions: observerOptions || DEFAULT_OBSERVER_OPTIONS
      };
      this.initEvent();
      this.imageCache = new ImageCache({ max: 200 });
      this.lazyLoadHandler = throttle(
        this.lazyLoadHandler.bind(this),
        this.options.throttleWait
      );
      this.setMode(this.options.observer ? modeType.observer : modeType.event);
    }
    /**
     * update config
     * @param  {Object} config params
     * @return
     */
    config(options = {}) {
      Object.assign(this.options, options);
    }
    /**
     * output listener's load performance
     * @return {Array}
     */
    performance() {
      return this.listeners.map((item) => item.performance());
    }
    /*
     * add lazy component to queue
     * @param  {Vue} vm lazy component instance
     * @return
     */
    addLazyBox(vm) {
      this.listeners.push(vm);
      if (use.inBrowser) {
        this.addListenerTarget(window);
        this.observer && this.observer.observe(vm.el);
        if (vm.$el && vm.$el.parentNode) {
          this.addListenerTarget(vm.$el.parentNode);
        }
      }
    }
    /*
     * add image listener to queue
     * @param  {DOM} el
     * @param  {object} binding vue directive binding
     * @param  {vnode} vnode vue directive vnode
     * @return
     */
    add(el, binding, vnode) {
      if (this.listeners.some((item) => item.el === el)) {
        this.update(el, binding);
        return vue.nextTick(this.lazyLoadHandler);
      }
      const value = this.valueFormatter(binding.value);
      let { src } = value;
      vue.nextTick(() => {
        src = getBestSelectionFromSrcset(el, this.options.scale) || src;
        this.observer && this.observer.observe(el);
        const container = Object.keys(binding.modifiers)[0];
        let $parent;
        if (container) {
          $parent = vnode.context.$refs[container];
          $parent = $parent ? $parent.$el || $parent : document.getElementById(container);
        }
        if (!$parent) {
          $parent = use.getScrollParent(el);
        }
        const newListener = new ReactiveListener({
          bindType: binding.arg,
          $parent,
          el,
          src,
          loading: value.loading,
          error: value.error,
          cors: value.cors,
          elRenderer: this.elRenderer.bind(this),
          options: this.options,
          imageCache: this.imageCache
        });
        this.listeners.push(newListener);
        if (use.inBrowser) {
          this.addListenerTarget(window);
          this.addListenerTarget($parent);
        }
        this.lazyLoadHandler();
        vue.nextTick(() => this.lazyLoadHandler());
      });
    }
    /**
     * update image src
     * @param  {DOM} el
     * @param  {object} vue directive binding
     * @return
     */
    update(el, binding, vnode) {
      const value = this.valueFormatter(binding.value);
      let { src } = value;
      src = getBestSelectionFromSrcset(el, this.options.scale) || src;
      const exist = this.listeners.find((item) => item.el === el);
      if (!exist) {
        this.add(el, binding, vnode);
      } else {
        exist.update({
          src,
          error: value.error,
          loading: value.loading
        });
      }
      if (this.observer) {
        this.observer.unobserve(el);
        this.observer.observe(el);
      }
      this.lazyLoadHandler();
      vue.nextTick(() => this.lazyLoadHandler());
    }
    /**
     * remove listener form list
     * @param  {DOM} el
     * @return
     */
    remove(el) {
      if (!el)
        return;
      this.observer && this.observer.unobserve(el);
      const existItem = this.listeners.find((item) => item.el === el);
      if (existItem) {
        this.removeListenerTarget(existItem.$parent);
        this.removeListenerTarget(window);
        remove(this.listeners, existItem);
        existItem.$destroy();
      }
    }
    /*
     * remove lazy components form list
     * @param  {Vue} vm Vue instance
     * @return
     */
    removeComponent(vm) {
      if (!vm)
        return;
      remove(this.listeners, vm);
      this.observer && this.observer.unobserve(vm.el);
      if (vm.$parent && vm.$el.parentNode) {
        this.removeListenerTarget(vm.$el.parentNode);
      }
      this.removeListenerTarget(window);
    }
    setMode(mode) {
      if (!hasIntersectionObserver && mode === modeType.observer) {
        mode = modeType.event;
      }
      this.mode = mode;
      if (mode === modeType.event) {
        if (this.observer) {
          this.listeners.forEach((listener) => {
            this.observer.unobserve(listener.el);
          });
          this.observer = null;
        }
        this.targets.forEach((target) => {
          this.initListen(target.el, true);
        });
      } else {
        this.targets.forEach((target) => {
          this.initListen(target.el, false);
        });
        this.initIntersectionObserver();
      }
    }
    /*
     *** Private functions ***
     */
    /*
     * add listener target
     * @param  {DOM} el listener target
     * @return
     */
    addListenerTarget(el) {
      if (!el)
        return;
      let target = this.targets.find((target2) => target2.el === el);
      if (!target) {
        target = {
          el,
          id: ++this.targetIndex,
          childrenCount: 1,
          listened: true
        };
        this.mode === modeType.event && this.initListen(target.el, true);
        this.targets.push(target);
      } else {
        target.childrenCount++;
      }
      return this.targetIndex;
    }
    /*
     * remove listener target or reduce target childrenCount
     * @param  {DOM} el or window
     * @return
     */
    removeListenerTarget(el) {
      this.targets.forEach((target, index) => {
        if (target.el === el) {
          target.childrenCount--;
          if (!target.childrenCount) {
            this.initListen(target.el, false);
            this.targets.splice(index, 1);
            target = null;
          }
        }
      });
    }
    /*
     * add or remove eventlistener
     * @param  {DOM} el DOM or Window
     * @param  {boolean} start flag
     * @return
     */
    initListen(el, start) {
      this.options.ListenEvents.forEach(
        (evt) => (start ? on : off)(el, evt, this.lazyLoadHandler)
      );
    }
    initEvent() {
      this.Event = {
        listeners: {
          loading: [],
          loaded: [],
          error: []
        }
      };
      this.$on = (event, func) => {
        if (!this.Event.listeners[event])
          this.Event.listeners[event] = [];
        this.Event.listeners[event].push(func);
      };
      this.$once = (event, func) => {
        const on2 = (...args) => {
          this.$off(event, on2);
          func.apply(this, args);
        };
        this.$on(event, on2);
      };
      this.$off = (event, func) => {
        if (!func) {
          if (!this.Event.listeners[event])
            return;
          this.Event.listeners[event].length = 0;
          return;
        }
        remove(this.Event.listeners[event], func);
      };
      this.$emit = (event, context, inCache) => {
        if (!this.Event.listeners[event])
          return;
        this.Event.listeners[event].forEach((func) => func(context, inCache));
      };
    }
    /**
     * find nodes which in viewport and trigger load
     * @return
     */
    lazyLoadHandler() {
      const freeList = [];
      this.listeners.forEach((listener) => {
        if (!listener.el || !listener.el.parentNode) {
          freeList.push(listener);
        }
        const catIn = listener.checkInView();
        if (!catIn)
          return;
        listener.load();
      });
      freeList.forEach((item) => {
        remove(this.listeners, item);
        item.$destroy();
      });
    }
    /**
     * init IntersectionObserver
     * set mode to observer
     * @return
     */
    initIntersectionObserver() {
      if (!hasIntersectionObserver) {
        return;
      }
      this.observer = new IntersectionObserver(
        this.observerHandler.bind(this),
        this.options.observerOptions
      );
      if (this.listeners.length) {
        this.listeners.forEach((listener) => {
          this.observer.observe(listener.el);
        });
      }
    }
    /**
     * init IntersectionObserver
     * @return
     */
    observerHandler(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.listeners.forEach((listener) => {
            if (listener.el === entry.target) {
              if (listener.state.loaded)
                return this.observer.unobserve(listener.el);
              listener.load();
            }
          });
        }
      });
    }
    /**
     * set element attribute with image'url and state
     * @param  {object} lazyload listener object
     * @param  {string} state will be rendered
     * @param  {bool} inCache  is rendered from cache
     * @return
     */
    elRenderer(listener, state, cache) {
      if (!listener.el)
        return;
      const { el, bindType } = listener;
      let src;
      switch (state) {
        case "loading":
          src = listener.loading;
          break;
        case "error":
          src = listener.error;
          break;
        default:
          ({ src } = listener);
          break;
      }
      if (bindType) {
        el.style[bindType] = 'url("' + src + '")';
      } else if (el.getAttribute("src") !== src) {
        el.setAttribute("src", src);
      }
      el.setAttribute("lazy", state);
      this.$emit(state, listener, cache);
      this.options.adapter[state] && this.options.adapter[state](listener, this.options);
      if (this.options.dispatchEvent) {
        const event = new CustomEvent(state, {
          detail: listener
        });
        el.dispatchEvent(event);
      }
    }
    /**
     * generate loading loaded error image url
     * @param {string} image's src
     * @return {object} image's loading, loaded, error url
     */
    valueFormatter(value) {
      let src = value;
      let { loading, error } = this.options;
      if (isObject(value)) {
        if (process.env.NODE_ENV !== "production" && !value.src && !this.options.silent) {
          console.error("[@vant/lazyload] miss src with " + value);
        }
        ({ src } = value);
        loading = value.loading || this.options.loading;
        error = value.error || this.options.error;
      }
      return {
        src,
        loading,
        error
      };
    }
  };
}
var stdin_default$2 = (lazy) => ({
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  emits: ["show"],
  render() {
    return vue.h(
      this.tag,
      this.show && this.$slots.default ? this.$slots.default() : null
    );
  },
  data() {
    return {
      el: null,
      state: {
        loaded: false
      },
      show: false
    };
  },
  mounted() {
    this.el = this.$el;
    lazy.addLazyBox(this);
    lazy.lazyLoadHandler();
  },
  beforeUnmount() {
    lazy.removeComponent(this);
  },
  methods: {
    checkInView() {
      const rect = use.useRect(this.$el);
      return use.inBrowser && rect.top < window.innerHeight * lazy.options.preLoad && rect.bottom > 0 && rect.left < window.innerWidth * lazy.options.preLoad && rect.right > 0;
    },
    load() {
      this.show = true;
      this.state.loaded = true;
      this.$emit("show", this);
    },
    destroy() {
      return this.$destroy;
    }
  }
});
const defaultOptions = {
  selector: "img"
};
class LazyContainer {
  constructor({ el, binding, vnode, lazy }) {
    this.el = null;
    this.vnode = vnode;
    this.binding = binding;
    this.options = {};
    this.lazy = lazy;
    this.queue = [];
    this.update({ el, binding });
  }
  update({ el, binding }) {
    this.el = el;
    this.options = Object.assign({}, defaultOptions, binding.value);
    const imgs = this.getImgs();
    imgs.forEach((el2) => {
      this.lazy.add(
        el2,
        Object.assign({}, this.binding, {
          value: {
            src: "dataset" in el2 ? el2.dataset.src : el2.getAttribute("data-src"),
            error: ("dataset" in el2 ? el2.dataset.error : el2.getAttribute("data-error")) || this.options.error,
            loading: ("dataset" in el2 ? el2.dataset.loading : el2.getAttribute("data-loading")) || this.options.loading
          }
        }),
        this.vnode
      );
    });
  }
  getImgs() {
    return Array.from(this.el.querySelectorAll(this.options.selector));
  }
  clear() {
    const imgs = this.getImgs();
    imgs.forEach((el) => this.lazy.remove(el));
    this.vnode = null;
    this.binding = null;
    this.lazy = null;
  }
}
class LazyContainerManager {
  constructor({ lazy }) {
    this.lazy = lazy;
    this.queue = [];
  }
  bind(el, binding, vnode) {
    const container = new LazyContainer({
      el,
      binding,
      vnode,
      lazy: this.lazy
    });
    this.queue.push(container);
  }
  update(el, binding, vnode) {
    const container = this.queue.find((item) => item.el === el);
    if (!container)
      return;
    container.update({ el, binding, vnode });
  }
  unbind(el) {
    const container = this.queue.find((item) => item.el === el);
    if (!container)
      return;
    container.clear();
    remove(this.queue, container);
  }
}
var stdin_default$1 = (lazyManager) => ({
  props: {
    src: [String, Object],
    tag: {
      type: String,
      default: "img"
    }
  },
  render() {
    var _a, _b;
    return vue.h(
      this.tag,
      {
        src: this.renderSrc
      },
      (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)
    );
  },
  data() {
    return {
      el: null,
      options: {
        src: "",
        error: "",
        loading: "",
        attempt: lazyManager.options.attempt
      },
      state: {
        loaded: false,
        error: false,
        attempt: 0
      },
      renderSrc: ""
    };
  },
  watch: {
    src() {
      this.init();
      lazyManager.addLazyBox(this);
      lazyManager.lazyLoadHandler();
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.el = this.$el;
    lazyManager.addLazyBox(this);
    lazyManager.lazyLoadHandler();
  },
  beforeUnmount() {
    lazyManager.removeComponent(this);
  },
  methods: {
    init() {
      const { src, loading, error } = lazyManager.valueFormatter(this.src);
      this.state.loaded = false;
      this.options.src = src;
      this.options.error = error;
      this.options.loading = loading;
      this.renderSrc = this.options.loading;
    },
    checkInView() {
      const rect = use.useRect(this.$el);
      return rect.top < window.innerHeight * lazyManager.options.preLoad && rect.bottom > 0 && rect.left < window.innerWidth * lazyManager.options.preLoad && rect.right > 0;
    },
    load(onFinish = noop) {
      if (this.state.attempt > this.options.attempt - 1 && this.state.error) {
        if (process.env.NODE_ENV !== "production" && !lazyManager.options.silent) {
          console.log(
            `[@vant/lazyload] ${this.options.src} tried too more than ${this.options.attempt} times`
          );
        }
        onFinish();
        return;
      }
      const { src } = this.options;
      loadImageAsync(
        { src },
        ({ src: src2 }) => {
          this.renderSrc = src2;
          this.state.loaded = true;
        },
        () => {
          this.state.attempt++;
          this.renderSrc = this.options.error;
          this.state.error = true;
        }
      );
    }
  }
});
const Lazyload = {
  /*
   * install function
   * @param  {App} app
   * @param  {object} options lazyload options
   */
  install(app, options = {}) {
    const LazyClass = stdin_default$3();
    const lazy = new LazyClass(options);
    const lazyContainer = new LazyContainerManager({ lazy });
    app.config.globalProperties.$Lazyload = lazy;
    if (options.lazyComponent) {
      app.component("LazyComponent", stdin_default$2(lazy));
    }
    if (options.lazyImage) {
      app.component("LazyImage", stdin_default$1(lazy));
    }
    app.directive("lazy", {
      beforeMount: lazy.add.bind(lazy),
      updated: lazy.update.bind(lazy),
      unmounted: lazy.remove.bind(lazy)
    });
    app.directive("lazy-container", {
      beforeMount: lazyContainer.bind.bind(lazyContainer),
      updated: lazyContainer.update.bind(lazyContainer),
      unmounted: lazyContainer.unbind.bind(lazyContainer)
    });
  }
};
const version = "4.6.3";
function install(app) {
  const components = [
    ActionBar,
    ActionBarButton,
    ActionBarIcon,
    ActionSheet,
    AddressEdit,
    AddressList,
    Area,
    BackTop,
    Badge,
    Barrage,
    Button,
    Calendar,
    Card,
    Cascader,
    Cell,
    CellGroup,
    Checkbox,
    CheckboxGroup,
    Circle,
    Col,
    Collapse,
    CollapseItem,
    ConfigProvider,
    ContactCard,
    ContactEdit,
    ContactList,
    CountDown,
    Coupon,
    CouponCell,
    CouponList,
    DatePicker,
    Dialog,
    Divider,
    DropdownItem,
    DropdownMenu,
    Empty,
    Field,
    FloatingBubble,
    FloatingPanel,
    Form,
    Grid,
    GridItem,
    Icon,
    Image$1,
    ImagePreview,
    IndexAnchor,
    IndexBar,
    List,
    Loading,
    Locale,
    NavBar,
    NoticeBar,
    Notify,
    NumberKeyboard,
    Overlay,
    Pagination,
    PasswordInput,
    Picker,
    PickerGroup,
    Popover,
    Popup,
    Progress,
    PullRefresh,
    Radio,
    RadioGroup,
    Rate,
    RollingText,
    Row,
    Search,
    ShareSheet,
    Sidebar,
    SidebarItem,
    Signature,
    Skeleton,
    SkeletonAvatar,
    SkeletonImage,
    SkeletonParagraph,
    SkeletonTitle,
    Slider,
    Space,
    Step,
    Stepper,
    Steps,
    Sticky,
    SubmitBar,
    Swipe,
    SwipeCell,
    SwipeItem,
    Switch,
    Tab,
    Tabbar,
    TabbarItem,
    Tabs,
    Tag,
    TextEllipsis,
    TimePicker,
    Toast,
    TreeSelect,
    Uploader,
    Watermark
  ];
  components.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
var stdin_default = {
  install,
  version
};
exports.ActionBar = ActionBar;
exports.ActionBarButton = ActionBarButton;
exports.ActionBarIcon = ActionBarIcon;
exports.ActionSheet = ActionSheet;
exports.AddressEdit = AddressEdit;
exports.AddressList = AddressList;
exports.Area = Area;
exports.BackTop = BackTop;
exports.Badge = Badge;
exports.Barrage = Barrage;
exports.Button = Button;
exports.Calendar = Calendar;
exports.Card = Card;
exports.Cascader = Cascader;
exports.Cell = Cell;
exports.CellGroup = CellGroup;
exports.Checkbox = Checkbox;
exports.CheckboxGroup = CheckboxGroup;
exports.Circle = Circle;
exports.Col = Col;
exports.Collapse = Collapse;
exports.CollapseItem = CollapseItem;
exports.ConfigProvider = ConfigProvider;
exports.ContactCard = ContactCard;
exports.ContactEdit = ContactEdit;
exports.ContactList = ContactList;
exports.CountDown = CountDown;
exports.Coupon = Coupon;
exports.CouponCell = CouponCell;
exports.CouponList = CouponList;
exports.DEFAULT_ROW_WIDTH = DEFAULT_ROW_WIDTH;
exports.DatePicker = DatePicker;
exports.Dialog = Dialog;
exports.Divider = Divider;
exports.DropdownItem = DropdownItem;
exports.DropdownMenu = DropdownMenu;
exports.Empty = Empty;
exports.Field = Field;
exports.FloatingBubble = FloatingBubble;
exports.FloatingPanel = FloatingPanel;
exports.Form = Form;
exports.Grid = Grid;
exports.GridItem = GridItem;
exports.Icon = Icon;
exports.Image = Image$1;
exports.ImagePreview = ImagePreview;
exports.IndexAnchor = IndexAnchor;
exports.IndexBar = IndexBar;
exports.Lazyload = Lazyload;
exports.List = List;
exports.Loading = Loading;
exports.Locale = Locale;
exports.NavBar = NavBar;
exports.NoticeBar = NoticeBar;
exports.Notify = Notify;
exports.NumberKeyboard = NumberKeyboard;
exports.Overlay = Overlay;
exports.Pagination = Pagination;
exports.PasswordInput = PasswordInput;
exports.Picker = Picker;
exports.PickerGroup = PickerGroup;
exports.Popover = Popover;
exports.Popup = Popup;
exports.Progress = Progress;
exports.PullRefresh = PullRefresh;
exports.Radio = Radio;
exports.RadioGroup = RadioGroup;
exports.Rate = Rate;
exports.RollingText = RollingText;
exports.Row = Row;
exports.Search = Search;
exports.ShareSheet = ShareSheet;
exports.Sidebar = Sidebar;
exports.SidebarItem = SidebarItem;
exports.Signature = Signature;
exports.Skeleton = Skeleton;
exports.SkeletonAvatar = SkeletonAvatar;
exports.SkeletonImage = SkeletonImage;
exports.SkeletonParagraph = SkeletonParagraph;
exports.SkeletonTitle = SkeletonTitle;
exports.Slider = Slider;
exports.Space = Space;
exports.Step = Step;
exports.Stepper = Stepper;
exports.Steps = Steps;
exports.Sticky = Sticky;
exports.SubmitBar = SubmitBar;
exports.Swipe = Swipe;
exports.SwipeCell = SwipeCell;
exports.SwipeItem = SwipeItem;
exports.Switch = Switch;
exports.Tab = Tab;
exports.Tabbar = Tabbar;
exports.TabbarItem = TabbarItem;
exports.Tabs = Tabs;
exports.Tag = Tag;
exports.TextEllipsis = TextEllipsis;
exports.TimePicker = TimePicker;
exports.Toast = Toast;
exports.TreeSelect = TreeSelect;
exports.Uploader = Uploader;
exports.Watermark = Watermark;
exports.actionBarButtonProps = actionBarButtonProps;
exports.actionBarIconProps = actionBarIconProps;
exports.actionBarProps = actionBarProps;
exports.actionSheetProps = actionSheetProps;
exports.addressEditProps = addressEditProps;
exports.addressListProps = addressListProps;
exports.allowMultipleToast = allowMultipleToast;
exports.areaProps = areaProps;
exports.backTopProps = backTopProps;
exports.badgeProps = badgeProps;
exports.barrageProps = barrageProps;
exports.buttonProps = buttonProps;
exports.calendarProps = calendarProps;
exports.cardProps = cardProps;
exports.cascaderProps = cascaderProps;
exports.cellGroupProps = cellGroupProps;
exports.cellProps = cellProps;
exports.checkboxGroupProps = checkboxGroupProps;
exports.checkboxProps = checkboxProps;
exports.circleProps = circleProps;
exports.closeDialog = closeDialog;
exports.closeNotify = closeNotify;
exports.closeToast = closeToast;
exports.colProps = colProps;
exports.collapseItemProps = collapseItemProps;
exports.collapseProps = collapseProps;
exports.configProviderProps = configProviderProps;
exports.contactCardProps = contactCardProps;
exports.contactEditProps = contactEditProps;
exports.contactListProps = contactListProps;
exports.countDownProps = countDownProps;
exports.couponCellProps = couponCellProps;
exports.couponListProps = couponListProps;
exports.datePickerProps = datePickerProps;
exports.default = stdin_default;
exports.dialogProps = dialogProps;
exports.dividerProps = dividerProps;
exports.dropdownItemProps = dropdownItemProps;
exports.dropdownMenuProps = dropdownMenuProps;
exports.emptyProps = emptyProps;
exports.fieldProps = fieldProps;
exports.floatingBubbleProps = floatingBubbleProps;
exports.floatingPanelProps = floatingPanelProps;
exports.formProps = formProps;
exports.gridItemProps = gridItemProps;
exports.gridProps = gridProps;
exports.iconProps = iconProps;
exports.imagePreviewProps = imagePreviewProps;
exports.imageProps = imageProps;
exports.indexAnchorProps = indexAnchorProps;
exports.indexBarProps = indexBarProps;
exports.install = install;
exports.listProps = listProps;
exports.loadingProps = loadingProps;
exports.navBarProps = navBarProps;
exports.noticeBarProps = noticeBarProps;
exports.notifyProps = notifyProps;
exports.numberKeyboardProps = numberKeyboardProps;
exports.overlayProps = overlayProps;
exports.paginationProps = paginationProps;
exports.passwordInputProps = passwordInputProps;
exports.pickerGroupProps = pickerGroupProps;
exports.pickerProps = pickerProps;
exports.popoverProps = popoverProps;
exports.popupProps = popupProps$2;
exports.progressProps = progressProps;
exports.pullRefreshProps = pullRefreshProps;
exports.radioGroupProps = radioGroupProps;
exports.radioProps = radioProps;
exports.rateProps = rateProps;
exports.resetDialogDefaultOptions = resetDialogDefaultOptions;
exports.resetNotifyDefaultOptions = resetNotifyDefaultOptions;
exports.resetToastDefaultOptions = resetToastDefaultOptions;
exports.rollingTextProps = rollingTextProps;
exports.rowProps = rowProps;
exports.searchProps = searchProps;
exports.setDialogDefaultOptions = setDialogDefaultOptions;
exports.setNotifyDefaultOptions = setNotifyDefaultOptions;
exports.setToastDefaultOptions = setToastDefaultOptions;
exports.shareSheetProps = shareSheetProps;
exports.showConfirmDialog = showConfirmDialog;
exports.showDialog = showDialog;
exports.showFailToast = showFailToast;
exports.showImagePreview = showImagePreview;
exports.showLoadingToast = showLoadingToast;
exports.showNotify = showNotify;
exports.showSuccessToast = showSuccessToast;
exports.showToast = showToast;
exports.sidebarItemProps = sidebarItemProps;
exports.sidebarProps = sidebarProps;
exports.skeletonAvatarProps = skeletonAvatarProps;
exports.skeletonImageProps = skeletonImageProps;
exports.skeletonParagraphProps = skeletonParagraphProps;
exports.skeletonProps = skeletonProps;
exports.skeletonTitleProps = skeletonTitleProps;
exports.sliderProps = sliderProps;
exports.spaceProps = spaceProps;
exports.stepperProps = stepperProps;
exports.stepsProps = stepsProps;
exports.stickyProps = stickyProps;
exports.submitBarProps = submitBarProps;
exports.swipeCellProps = swipeCellProps;
exports.swipeProps = swipeProps;
exports.switchProps = switchProps;
exports.tabProps = tabProps;
exports.tabbarItemProps = tabbarItemProps;
exports.tabbarProps = tabbarProps;
exports.tabsProps = tabsProps;
exports.tagProps = tagProps;
exports.textEllipsisProps = textEllipsisProps;
exports.timePickerProps = timePickerProps;
exports.toastProps = toastProps;
exports.treeSelectProps = treeSelectProps;
exports.uploaderProps = uploaderProps;
exports.useCurrentLang = useCurrentLang;
exports.version = version;
exports.watermarkProps = watermarkProps;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1690162275795);
})()
//miniprogram-npm-outsideDeps=["vue","@vant/use","@vue/shared","@vant/popperjs"]
//# sourceMappingURL=index.js.map