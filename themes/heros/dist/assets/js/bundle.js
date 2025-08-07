/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/alpinejs@3.14.9/node_modules/alpinejs/dist/module.esm.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/.pnpm/alpinejs@3.14.9/node_modules/alpinejs/dist/module.esm.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Alpine: () => (/* binding */ src_default),
/* harmony export */   "default": () => (/* binding */ module_default)
/* harmony export */ });
function _ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : _ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// packages/alpinejs/src/scheduler.js
var flushPending = false;
var flushing = false;
var queue = [];
var lastFlushedIndex = -1;
function scheduler(callback) {
  queueJob(callback);
}
function queueJob(job) {
  if (!queue.includes(job)) queue.push(job);
  queueFlush();
}
function dequeueJob(job) {
  let index = queue.indexOf(job);
  if (index !== -1 && index > lastFlushedIndex) queue.splice(index, 1);
}
function queueFlush() {
  if (!flushing && !flushPending) {
    flushPending = true;
    queueMicrotask(flushJobs);
  }
}
function flushJobs() {
  flushPending = false;
  flushing = true;
  for (let i = 0; i < queue.length; i++) {
    queue[i]();
    lastFlushedIndex = i;
  }
  queue.length = 0;
  lastFlushedIndex = -1;
  flushing = false;
}

// packages/alpinejs/src/reactivity.js
var reactive;
var effect;
var release;
var raw;
var shouldSchedule = true;
function disableEffectScheduling(callback) {
  shouldSchedule = false;
  callback();
  shouldSchedule = true;
}
function setReactivityEngine(engine) {
  reactive = engine.reactive;
  release = engine.release;
  effect = callback => engine.effect(callback, {
    scheduler: task => {
      if (shouldSchedule) {
        scheduler(task);
      } else {
        task();
      }
    }
  });
  raw = engine.raw;
}
function overrideEffect(override) {
  effect = override;
}
function elementBoundEffect(el) {
  let cleanup2 = () => {};
  let wrappedEffect = callback => {
    let effectReference = effect(callback);
    if (!el._x_effects) {
      el._x_effects = /* @__PURE__ */new Set();
      el._x_runEffects = () => {
        el._x_effects.forEach(i => i());
      };
    }
    el._x_effects.add(effectReference);
    cleanup2 = () => {
      if (effectReference === void 0) return;
      el._x_effects.delete(effectReference);
      release(effectReference);
    };
    return effectReference;
  };
  return [wrappedEffect, () => {
    cleanup2();
  }];
}
function watch(getter, callback) {
  let firstTime = true;
  let oldValue;
  let effectReference = effect(() => {
    let value = getter();
    JSON.stringify(value);
    if (!firstTime) {
      queueMicrotask(() => {
        callback(value, oldValue);
        oldValue = value;
      });
    } else {
      oldValue = value;
    }
    firstTime = false;
  });
  return () => release(effectReference);
}

// packages/alpinejs/src/mutation.js
var onAttributeAddeds = [];
var onElRemoveds = [];
var onElAddeds = [];
function onElAdded(callback) {
  onElAddeds.push(callback);
}
function onElRemoved(el, callback) {
  if (typeof callback === "function") {
    if (!el._x_cleanups) el._x_cleanups = [];
    el._x_cleanups.push(callback);
  } else {
    callback = el;
    onElRemoveds.push(callback);
  }
}
function onAttributesAdded(callback) {
  onAttributeAddeds.push(callback);
}
function onAttributeRemoved(el, name, callback) {
  if (!el._x_attributeCleanups) el._x_attributeCleanups = {};
  if (!el._x_attributeCleanups[name]) el._x_attributeCleanups[name] = [];
  el._x_attributeCleanups[name].push(callback);
}
function cleanupAttributes(el, names) {
  if (!el._x_attributeCleanups) return;
  Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
    if (names === void 0 || names.includes(name)) {
      value.forEach(i => i());
      delete el._x_attributeCleanups[name];
    }
  });
}
function cleanupElement(el) {
  var _el$_x_effects;
  (_el$_x_effects = el._x_effects) === null || _el$_x_effects === void 0 || _el$_x_effects.forEach(dequeueJob);
  while ((_el$_x_cleanups = el._x_cleanups) !== null && _el$_x_cleanups !== void 0 && _el$_x_cleanups.length) {
    var _el$_x_cleanups;
    el._x_cleanups.pop()();
  }
}
var observer = new MutationObserver(onMutate);
var currentlyObserving = false;
function startObservingMutations() {
  observer.observe(document, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeOldValue: true
  });
  currentlyObserving = true;
}
function stopObservingMutations() {
  flushObserver();
  observer.disconnect();
  currentlyObserving = false;
}
var queuedMutations = [];
function flushObserver() {
  let records = observer.takeRecords();
  queuedMutations.push(() => records.length > 0 && onMutate(records));
  let queueLengthWhenTriggered = queuedMutations.length;
  queueMicrotask(() => {
    if (queuedMutations.length === queueLengthWhenTriggered) {
      while (queuedMutations.length > 0) queuedMutations.shift()();
    }
  });
}
function mutateDom(callback) {
  if (!currentlyObserving) return callback();
  stopObservingMutations();
  let result = callback();
  startObservingMutations();
  return result;
}
var isCollecting = false;
var deferredMutations = [];
function deferMutations() {
  isCollecting = true;
}
function flushAndStopDeferringMutations() {
  isCollecting = false;
  onMutate(deferredMutations);
  deferredMutations = [];
}
function onMutate(mutations) {
  if (isCollecting) {
    deferredMutations = deferredMutations.concat(mutations);
    return;
  }
  let addedNodes = [];
  let removedNodes = /* @__PURE__ */new Set();
  let addedAttributes = /* @__PURE__ */new Map();
  let removedAttributes = /* @__PURE__ */new Map();
  for (let i = 0; i < mutations.length; i++) {
    if (mutations[i].target._x_ignoreMutationObserver) continue;
    if (mutations[i].type === "childList") {
      mutations[i].removedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (!node._x_marker) return;
        removedNodes.add(node);
      });
      mutations[i].addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (removedNodes.has(node)) {
          removedNodes.delete(node);
          return;
        }
        if (node._x_marker) return;
        addedNodes.push(node);
      });
    }
    if (mutations[i].type === "attributes") {
      let el = mutations[i].target;
      let name = mutations[i].attributeName;
      let oldValue = mutations[i].oldValue;
      let add2 = () => {
        if (!addedAttributes.has(el)) addedAttributes.set(el, []);
        addedAttributes.get(el).push({
          name,
          value: el.getAttribute(name)
        });
      };
      let remove = () => {
        if (!removedAttributes.has(el)) removedAttributes.set(el, []);
        removedAttributes.get(el).push(name);
      };
      if (el.hasAttribute(name) && oldValue === null) {
        add2();
      } else if (el.hasAttribute(name)) {
        remove();
        add2();
      } else {
        remove();
      }
    }
  }
  removedAttributes.forEach((attrs, el) => {
    cleanupAttributes(el, attrs);
  });
  addedAttributes.forEach((attrs, el) => {
    onAttributeAddeds.forEach(i => i(el, attrs));
  });
  for (let node of removedNodes) {
    if (addedNodes.some(i => i.contains(node))) continue;
    onElRemoveds.forEach(i => i(node));
  }
  for (let node of addedNodes) {
    if (!node.isConnected) continue;
    onElAddeds.forEach(i => i(node));
  }
  addedNodes = null;
  removedNodes = null;
  addedAttributes = null;
  removedAttributes = null;
}

// packages/alpinejs/src/scope.js
function scope(node) {
  return mergeProxies(closestDataStack(node));
}
function addScopeToNode(node, data2, referenceNode) {
  node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
  return () => {
    node._x_dataStack = node._x_dataStack.filter(i => i !== data2);
  };
}
function closestDataStack(node) {
  if (node._x_dataStack) return node._x_dataStack;
  if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
    return closestDataStack(node.host);
  }
  if (!node.parentNode) {
    return [];
  }
  return closestDataStack(node.parentNode);
}
function mergeProxies(objects) {
  return new Proxy({
    objects
  }, mergeProxyTrap);
}
var mergeProxyTrap = {
  ownKeys({
    objects
  }) {
    return Array.from(new Set(objects.flatMap(i => Object.keys(i))));
  },
  has({
    objects
  }, name) {
    if (name == Symbol.unscopables) return false;
    return objects.some(obj => Object.prototype.hasOwnProperty.call(obj, name) || Reflect.has(obj, name));
  },
  get({
    objects
  }, name, thisProxy) {
    if (name == "toJSON") return collapseProxies;
    return Reflect.get(objects.find(obj => Reflect.has(obj, name)) || {}, name, thisProxy);
  },
  set({
    objects
  }, name, value, thisProxy) {
    const target = objects.find(obj => Object.prototype.hasOwnProperty.call(obj, name)) || objects[objects.length - 1];
    const descriptor = Object.getOwnPropertyDescriptor(target, name);
    if (descriptor !== null && descriptor !== void 0 && descriptor.set && descriptor !== null && descriptor !== void 0 && descriptor.get) return descriptor.set.call(thisProxy, value) || true;
    return Reflect.set(target, name, value);
  }
};
function collapseProxies() {
  let keys = Reflect.ownKeys(this);
  return keys.reduce((acc, key) => {
    acc[key] = Reflect.get(this, key);
    return acc;
  }, {});
}

// packages/alpinejs/src/interceptor.js
function initInterceptors(data2) {
  let isObject2 = val => typeof val === "object" && !Array.isArray(val) && val !== null;
  let recurse = (obj, basePath = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, {
      value,
      enumerable
    }]) => {
      if (enumerable === false || value === void 0) return;
      if (typeof value === "object" && value !== null && value.__v_skip) return;
      let path = basePath === "" ? key : `${basePath}.${key}`;
      if (typeof value === "object" && value !== null && value._x_interceptor) {
        obj[key] = value.initialize(data2, path, key);
      } else {
        if (isObject2(value) && value !== obj && !(value instanceof Element)) {
          recurse(value, path);
        }
      }
    });
  };
  return recurse(data2);
}
function interceptor(callback, mutateObj = () => {}) {
  let obj = {
    initialValue: void 0,
    _x_interceptor: true,
    initialize(data2, path, key) {
      return callback(this.initialValue, () => get(data2, path), value => set(data2, path, value), path, key);
    }
  };
  mutateObj(obj);
  return initialValue => {
    if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
      let initialize = obj.initialize.bind(obj);
      obj.initialize = (data2, path, key) => {
        let innerValue = initialValue.initialize(data2, path, key);
        obj.initialValue = innerValue;
        return initialize(data2, path, key);
      };
    } else {
      obj.initialValue = initialValue;
    }
    return obj;
  };
}
function get(obj, path) {
  return path.split(".").reduce((carry, segment) => carry[segment], obj);
}
function set(obj, path, value) {
  if (typeof path === "string") path = path.split(".");
  if (path.length === 1) obj[path[0]] = value;else if (path.length === 0) throw error;else {
    if (obj[path[0]]) return set(obj[path[0]], path.slice(1), value);else {
      obj[path[0]] = {};
      return set(obj[path[0]], path.slice(1), value);
    }
  }
}

// packages/alpinejs/src/magics.js
var magics = {};
function magic(name, callback) {
  magics[name] = callback;
}
function injectMagics(obj, el) {
  let memoizedUtilities = getUtilities(el);
  Object.entries(magics).forEach(([name, callback]) => {
    Object.defineProperty(obj, `$${name}`, {
      get() {
        return callback(el, memoizedUtilities);
      },
      enumerable: false
    });
  });
  return obj;
}
function getUtilities(el) {
  let [utilities, cleanup2] = getElementBoundUtilities(el);
  let utils = _objectSpread({
    interceptor
  }, utilities);
  onElRemoved(el, cleanup2);
  return utils;
}

// packages/alpinejs/src/utils/error.js
function tryCatch(el, expression, callback, ...args) {
  try {
    return callback(...args);
  } catch (e) {
    handleError(e, el, expression);
  }
}
function handleError(error2, el, expression = void 0) {
  error2 = Object.assign(error2 !== null && error2 !== void 0 ? error2 : {
    message: "No error message given."
  }, {
    el,
    expression
  });
  console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
  setTimeout(() => {
    throw error2;
  }, 0);
}

// packages/alpinejs/src/evaluator.js
var shouldAutoEvaluateFunctions = true;
function dontAutoEvaluateFunctions(callback) {
  let cache = shouldAutoEvaluateFunctions;
  shouldAutoEvaluateFunctions = false;
  let result = callback();
  shouldAutoEvaluateFunctions = cache;
  return result;
}
function evaluate(el, expression, extras = {}) {
  let result;
  evaluateLater(el, expression)(value => result = value, extras);
  return result;
}
function evaluateLater(...args) {
  return theEvaluatorFunction(...args);
}
var theEvaluatorFunction = normalEvaluator;
function setEvaluator(newEvaluator) {
  theEvaluatorFunction = newEvaluator;
}
function normalEvaluator(el, expression) {
  let overriddenMagics = {};
  injectMagics(overriddenMagics, el);
  let dataStack = [overriddenMagics, ...closestDataStack(el)];
  let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
  return tryCatch.bind(null, el, expression, evaluator);
}
function generateEvaluatorFromFunction(dataStack, func) {
  return (receiver = () => {}, {
    scope: scope2 = {},
    params = []
  } = {}) => {
    let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
    runIfTypeOfFunction(receiver, result);
  };
}
var evaluatorMemo = {};
function generateFunctionFromString(expression, el) {
  if (evaluatorMemo[expression]) {
    return evaluatorMemo[expression];
  }
  let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
  const safeAsyncFunction = () => {
    try {
      let func2 = new AsyncFunction(["__self", "scope"], `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`);
      Object.defineProperty(func2, "name", {
        value: `[Alpine] ${expression}`
      });
      return func2;
    } catch (error2) {
      handleError(error2, el, expression);
      return Promise.resolve();
    }
  };
  let func = safeAsyncFunction();
  evaluatorMemo[expression] = func;
  return func;
}
function generateEvaluatorFromString(dataStack, expression, el) {
  let func = generateFunctionFromString(expression, el);
  return (receiver = () => {}, {
    scope: scope2 = {},
    params = []
  } = {}) => {
    func.result = void 0;
    func.finished = false;
    let completeScope = mergeProxies([scope2, ...dataStack]);
    if (typeof func === "function") {
      let promise = func(func, completeScope).catch(error2 => handleError(error2, el, expression));
      if (func.finished) {
        runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
        func.result = void 0;
      } else {
        promise.then(result => {
          runIfTypeOfFunction(receiver, result, completeScope, params, el);
        }).catch(error2 => handleError(error2, el, expression)).finally(() => func.result = void 0);
      }
    }
  };
}
function runIfTypeOfFunction(receiver, value, scope2, params, el) {
  if (shouldAutoEvaluateFunctions && typeof value === "function") {
    let result = value.apply(scope2, params);
    if (result instanceof Promise) {
      result.then(i => runIfTypeOfFunction(receiver, i, scope2, params)).catch(error2 => handleError(error2, el, value));
    } else {
      receiver(result);
    }
  } else if (typeof value === "object" && value instanceof Promise) {
    value.then(i => receiver(i));
  } else {
    receiver(value);
  }
}

// packages/alpinejs/src/directives.js
var prefixAsString = "x-";
function prefix(subject = "") {
  return prefixAsString + subject;
}
function setPrefix(newPrefix) {
  prefixAsString = newPrefix;
}
var directiveHandlers = {};
function directive(name, callback) {
  directiveHandlers[name] = callback;
  return {
    before(directive2) {
      if (!directiveHandlers[directive2]) {
        console.warn(String.raw`Cannot find directive \`${directive2}\`. \`${name}\` will use the default order of execution`);
        return;
      }
      const pos = directiveOrder.indexOf(directive2);
      directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
    }
  };
}
function directiveExists(name) {
  return Object.keys(directiveHandlers).includes(name);
}
function directives(el, attributes, originalAttributeOverride) {
  attributes = Array.from(attributes);
  if (el._x_virtualDirectives) {
    let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({
      name,
      value
    }));
    let staticAttributes = attributesOnly(vAttributes);
    vAttributes = vAttributes.map(attribute => {
      if (staticAttributes.find(attr => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    attributes = attributes.concat(vAttributes);
  }
  let transformedAttributeMap = {};
  let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
  return directives2.map(directive2 => {
    return getDirectiveHandler(el, directive2);
  });
}
function attributesOnly(attributes) {
  return Array.from(attributes).map(toTransformedAttributes()).filter(attr => !outNonAlpineAttributes(attr));
}
var isDeferringHandlers = false;
var directiveHandlerStacks = /* @__PURE__ */new Map();
var currentHandlerStackKey = Symbol();
function deferHandlingDirectives(callback) {
  isDeferringHandlers = true;
  let key = Symbol();
  currentHandlerStackKey = key;
  directiveHandlerStacks.set(key, []);
  let flushHandlers = () => {
    while (directiveHandlerStacks.get(key).length) directiveHandlerStacks.get(key).shift()();
    directiveHandlerStacks.delete(key);
  };
  let stopDeferring = () => {
    isDeferringHandlers = false;
    flushHandlers();
  };
  callback(flushHandlers);
  stopDeferring();
}
function getElementBoundUtilities(el) {
  let cleanups = [];
  let cleanup2 = callback => cleanups.push(callback);
  let [effect3, cleanupEffect] = elementBoundEffect(el);
  cleanups.push(cleanupEffect);
  let utilities = {
    Alpine: alpine_default,
    effect: effect3,
    cleanup: cleanup2,
    evaluateLater: evaluateLater.bind(evaluateLater, el),
    evaluate: evaluate.bind(evaluate, el)
  };
  let doCleanup = () => cleanups.forEach(i => i());
  return [utilities, doCleanup];
}
function getDirectiveHandler(el, directive2) {
  let noop = () => {};
  let handler4 = directiveHandlers[directive2.type] || noop;
  let [utilities, cleanup2] = getElementBoundUtilities(el);
  onAttributeRemoved(el, directive2.original, cleanup2);
  let fullHandler = () => {
    if (el._x_ignore || el._x_ignoreSelf) return;
    handler4.inline && handler4.inline(el, directive2, utilities);
    handler4 = handler4.bind(handler4, el, directive2, utilities);
    isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
  };
  fullHandler.runCleanups = cleanup2;
  return fullHandler;
}
var startingWith = (subject, replacement) => ({
  name,
  value
}) => {
  if (name.startsWith(subject)) name = name.replace(subject, replacement);
  return {
    name,
    value
  };
};
var into = i => i;
function toTransformedAttributes(callback = () => {}) {
  return ({
    name,
    value
  }) => {
    let {
      name: newName,
      value: newValue
    } = attributeTransformers.reduce((carry, transform) => {
      return transform(carry);
    }, {
      name,
      value
    });
    if (newName !== name) callback(newName, name);
    return {
      name: newName,
      value: newValue
    };
  };
}
var attributeTransformers = [];
function mapAttributes(callback) {
  attributeTransformers.push(callback);
}
function outNonAlpineAttributes({
  name
}) {
  return alpineAttributeRegex().test(name);
}
var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
  return ({
    name,
    value
  }) => {
    let typeMatch = name.match(alpineAttributeRegex());
    let valueMatch = name.match(/:([a-zA-Z0-9\-_:]+)/);
    let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
    let original = originalAttributeOverride || transformedAttributeMap[name] || name;
    return {
      type: typeMatch ? typeMatch[1] : null,
      value: valueMatch ? valueMatch[1] : null,
      modifiers: modifiers.map(i => i.replace(".", "")),
      expression: value,
      original
    };
  };
}
var DEFAULT = "DEFAULT";
var directiveOrder = ["ignore", "ref", "data", "id", "anchor", "bind", "init", "for", "model", "modelable", "transition", "show", "if", DEFAULT, "teleport"];
function byPriority(a, b) {
  let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
  let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
  return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
}

// packages/alpinejs/src/utils/dispatch.js
function dispatch(el, name, detail = {}) {
  el.dispatchEvent(new CustomEvent(name, {
    detail,
    bubbles: true,
    // Allows events to pass the shadow DOM barrier.
    composed: true,
    cancelable: true
  }));
}

// packages/alpinejs/src/utils/walk.js
function walk(el, callback) {
  if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
    Array.from(el.children).forEach(el2 => walk(el2, callback));
    return;
  }
  let skip = false;
  callback(el, () => skip = true);
  if (skip) return;
  let node = el.firstElementChild;
  while (node) {
    walk(node, callback, false);
    node = node.nextElementSibling;
  }
}

// packages/alpinejs/src/utils/warn.js
function warn(message, ...args) {
  console.warn(`Alpine Warning: ${message}`, ...args);
}

// packages/alpinejs/src/lifecycle.js
var started = false;
function start() {
  if (started) warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
  started = true;
  if (!document.body) warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
  dispatch(document, "alpine:init");
  dispatch(document, "alpine:initializing");
  startObservingMutations();
  onElAdded(el => initTree(el, walk));
  onElRemoved(el => destroyTree(el));
  onAttributesAdded((el, attrs) => {
    directives(el, attrs).forEach(handle => handle());
  });
  let outNestedComponents = el => !closestRoot(el.parentElement, true);
  Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach(el => {
    initTree(el);
  });
  dispatch(document, "alpine:initialized");
  setTimeout(() => {
    warnAboutMissingPlugins();
  });
}
var rootSelectorCallbacks = [];
var initSelectorCallbacks = [];
function rootSelectors() {
  return rootSelectorCallbacks.map(fn => fn());
}
function allSelectors() {
  return rootSelectorCallbacks.concat(initSelectorCallbacks).map(fn => fn());
}
function addRootSelector(selectorCallback) {
  rootSelectorCallbacks.push(selectorCallback);
}
function addInitSelector(selectorCallback) {
  initSelectorCallbacks.push(selectorCallback);
}
function closestRoot(el, includeInitSelectors = false) {
  return findClosest(el, element => {
    const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
    if (selectors.some(selector => element.matches(selector))) return true;
  });
}
function findClosest(el, callback) {
  if (!el) return;
  if (callback(el)) return el;
  if (el._x_teleportBack) el = el._x_teleportBack;
  if (!el.parentElement) return;
  return findClosest(el.parentElement, callback);
}
function isRoot(el) {
  return rootSelectors().some(selector => el.matches(selector));
}
var initInterceptors2 = [];
function interceptInit(callback) {
  initInterceptors2.push(callback);
}
var markerDispenser = 1;
function initTree(el, walker = walk, intercept = () => {}) {
  if (findClosest(el, i => i._x_ignore)) return;
  deferHandlingDirectives(() => {
    walker(el, (el2, skip) => {
      if (el2._x_marker) return;
      intercept(el2, skip);
      initInterceptors2.forEach(i => i(el2, skip));
      directives(el2, el2.attributes).forEach(handle => handle());
      if (!el2._x_ignore) el2._x_marker = markerDispenser++;
      el2._x_ignore && skip();
    });
  });
}
function destroyTree(root, walker = walk) {
  walker(root, el => {
    cleanupElement(el);
    cleanupAttributes(el);
    delete el._x_marker;
  });
}
function warnAboutMissingPlugins() {
  let pluginDirectives = [["ui", "dialog", ["[x-dialog], [x-popover]"]], ["anchor", "anchor", ["[x-anchor]"]], ["sort", "sort", ["[x-sort]"]]];
  pluginDirectives.forEach(([plugin2, directive2, selectors]) => {
    if (directiveExists(directive2)) return;
    selectors.some(selector => {
      if (document.querySelector(selector)) {
        warn(`found "${selector}", but missing ${plugin2} plugin`);
        return true;
      }
    });
  });
}

// packages/alpinejs/src/nextTick.js
var tickStack = [];
var isHolding = false;
function nextTick(callback = () => {}) {
  queueMicrotask(() => {
    isHolding || setTimeout(() => {
      releaseNextTicks();
    });
  });
  return new Promise(res => {
    tickStack.push(() => {
      callback();
      res();
    });
  });
}
function releaseNextTicks() {
  isHolding = false;
  while (tickStack.length) tickStack.shift()();
}
function holdNextTicks() {
  isHolding = true;
}

// packages/alpinejs/src/utils/classes.js
function setClasses(el, value) {
  if (Array.isArray(value)) {
    return setClassesFromString(el, value.join(" "));
  } else if (typeof value === "object" && value !== null) {
    return setClassesFromObject(el, value);
  } else if (typeof value === "function") {
    return setClasses(el, value());
  }
  return setClassesFromString(el, value);
}
function setClassesFromString(el, classString) {
  let split = classString2 => classString2.split(" ").filter(Boolean);
  let missingClasses = classString2 => classString2.split(" ").filter(i => !el.classList.contains(i)).filter(Boolean);
  let addClassesAndReturnUndo = classes => {
    el.classList.add(...classes);
    return () => {
      el.classList.remove(...classes);
    };
  };
  classString = classString === true ? classString = "" : classString || "";
  return addClassesAndReturnUndo(missingClasses(classString));
}
function setClassesFromObject(el, classObject) {
  let split = classString => classString.split(" ").filter(Boolean);
  let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
  let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
  let added = [];
  let removed = [];
  forRemove.forEach(i => {
    if (el.classList.contains(i)) {
      el.classList.remove(i);
      removed.push(i);
    }
  });
  forAdd.forEach(i => {
    if (!el.classList.contains(i)) {
      el.classList.add(i);
      added.push(i);
    }
  });
  return () => {
    removed.forEach(i => el.classList.add(i));
    added.forEach(i => el.classList.remove(i));
  };
}

// packages/alpinejs/src/utils/styles.js
function setStyles(el, value) {
  if (typeof value === "object" && value !== null) {
    return setStylesFromObject(el, value);
  }
  return setStylesFromString(el, value);
}
function setStylesFromObject(el, value) {
  let previousStyles = {};
  Object.entries(value).forEach(([key, value2]) => {
    previousStyles[key] = el.style[key];
    if (!key.startsWith("--")) {
      key = kebabCase(key);
    }
    el.style.setProperty(key, value2);
  });
  setTimeout(() => {
    if (el.style.length === 0) {
      el.removeAttribute("style");
    }
  });
  return () => {
    setStyles(el, previousStyles);
  };
}
function setStylesFromString(el, value) {
  let cache = el.getAttribute("style", value);
  el.setAttribute("style", value);
  return () => {
    el.setAttribute("style", cache || "");
  };
}
function kebabCase(subject) {
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// packages/alpinejs/src/utils/once.js
function once(callback, fallback = () => {}) {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      callback.apply(this, arguments);
    } else {
      fallback.apply(this, arguments);
    }
  };
}

// packages/alpinejs/src/directives/x-transition.js
directive("transition", (el, {
  value,
  modifiers,
  expression
}, {
  evaluate: evaluate2
}) => {
  if (typeof expression === "function") expression = evaluate2(expression);
  if (expression === false) return;
  if (!expression || typeof expression === "boolean") {
    registerTransitionsFromHelper(el, modifiers, value);
  } else {
    registerTransitionsFromClassString(el, expression, value);
  }
});
function registerTransitionsFromClassString(el, classString, stage) {
  registerTransitionObject(el, setClasses, "");
  let directiveStorageMap = {
    "enter": classes => {
      el._x_transition.enter.during = classes;
    },
    "enter-start": classes => {
      el._x_transition.enter.start = classes;
    },
    "enter-end": classes => {
      el._x_transition.enter.end = classes;
    },
    "leave": classes => {
      el._x_transition.leave.during = classes;
    },
    "leave-start": classes => {
      el._x_transition.leave.start = classes;
    },
    "leave-end": classes => {
      el._x_transition.leave.end = classes;
    }
  };
  directiveStorageMap[stage](classString);
}
function registerTransitionsFromHelper(el, modifiers, stage) {
  registerTransitionObject(el, setStyles);
  let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
  let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
  let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
  if (modifiers.includes("in") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
  }
  if (modifiers.includes("out") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
  }
  let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
  let wantsOpacity = wantsAll || modifiers.includes("opacity");
  let wantsScale = wantsAll || modifiers.includes("scale");
  let opacityValue = wantsOpacity ? 0 : 1;
  let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
  let delay = modifierValue(modifiers, "delay", 0) / 1e3;
  let origin = modifierValue(modifiers, "origin", "center");
  let property = "opacity, transform";
  let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
  let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
  let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
  if (transitioningIn) {
    el._x_transition.enter.during = {
      transformOrigin: origin,
      transitionDelay: `${delay}s`,
      transitionProperty: property,
      transitionDuration: `${durationIn}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.enter.start = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
    el._x_transition.enter.end = {
      opacity: 1,
      transform: `scale(1)`
    };
  }
  if (transitioningOut) {
    el._x_transition.leave.during = {
      transformOrigin: origin,
      transitionDelay: `${delay}s`,
      transitionProperty: property,
      transitionDuration: `${durationOut}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.leave.start = {
      opacity: 1,
      transform: `scale(1)`
    };
    el._x_transition.leave.end = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
  }
}
function registerTransitionObject(el, setFunction, defaultValue = {}) {
  if (!el._x_transition) el._x_transition = {
    enter: {
      during: defaultValue,
      start: defaultValue,
      end: defaultValue
    },
    leave: {
      during: defaultValue,
      start: defaultValue,
      end: defaultValue
    },
    in(before = () => {}, after = () => {}) {
      transition(el, setFunction, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, before, after);
    },
    out(before = () => {}, after = () => {}) {
      transition(el, setFunction, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, before, after);
    }
  };
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (el, value, show, hide) {
  const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let clickAwayCompatibleShow = () => nextTick2(show);
  if (value) {
    if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
      el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
    } else {
      el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
    }
    return;
  }
  el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
    el._x_transition.out(() => {}, () => resolve(hide));
    el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({
      isFromCancelledTransition: true
    }));
  }) : Promise.resolve(hide);
  queueMicrotask(() => {
    let closest = closestHide(el);
    if (closest) {
      if (!closest._x_hideChildren) closest._x_hideChildren = [];
      closest._x_hideChildren.push(el);
    } else {
      nextTick2(() => {
        let hideAfterChildren = el2 => {
          let carry = Promise.all([el2._x_hidePromise, ...(el2._x_hideChildren || []).map(hideAfterChildren)]).then(([i]) => i === null || i === void 0 ? void 0 : i());
          delete el2._x_hidePromise;
          delete el2._x_hideChildren;
          return carry;
        };
        hideAfterChildren(el).catch(e => {
          if (!e.isFromCancelledTransition) throw e;
        });
      });
    }
  });
};
function closestHide(el) {
  let parent = el.parentNode;
  if (!parent) return;
  return parent._x_hidePromise ? parent : closestHide(parent);
}
function transition(el, setFunction, {
  during,
  start: start2,
  end
} = {}, before = () => {}, after = () => {}) {
  if (el._x_transitioning) el._x_transitioning.cancel();
  if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
    before();
    after();
    return;
  }
  let undoStart, undoDuring, undoEnd;
  performTransition(el, {
    start() {
      undoStart = setFunction(el, start2);
    },
    during() {
      undoDuring = setFunction(el, during);
    },
    before,
    end() {
      undoStart();
      undoEnd = setFunction(el, end);
    },
    after,
    cleanup() {
      undoDuring();
      undoEnd();
    }
  });
}
function performTransition(el, stages) {
  let interrupted, reachedBefore, reachedEnd;
  let finish = once(() => {
    mutateDom(() => {
      interrupted = true;
      if (!reachedBefore) stages.before();
      if (!reachedEnd) {
        stages.end();
        releaseNextTicks();
      }
      stages.after();
      if (el.isConnected) stages.cleanup();
      delete el._x_transitioning;
    });
  });
  el._x_transitioning = {
    beforeCancels: [],
    beforeCancel(callback) {
      this.beforeCancels.push(callback);
    },
    cancel: once(function () {
      while (this.beforeCancels.length) {
        this.beforeCancels.shift()();
      }
      ;
      finish();
    }),
    finish
  };
  mutateDom(() => {
    stages.start();
    stages.during();
  });
  holdNextTicks();
  requestAnimationFrame(() => {
    if (interrupted) return;
    let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
    let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    if (duration === 0) duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
    mutateDom(() => {
      stages.before();
    });
    reachedBefore = true;
    requestAnimationFrame(() => {
      if (interrupted) return;
      mutateDom(() => {
        stages.end();
      });
      releaseNextTicks();
      setTimeout(el._x_transitioning.finish, duration + delay);
      reachedEnd = true;
    });
  });
}
function modifierValue(modifiers, key, fallback) {
  if (modifiers.indexOf(key) === -1) return fallback;
  const rawValue = modifiers[modifiers.indexOf(key) + 1];
  if (!rawValue) return fallback;
  if (key === "scale") {
    if (isNaN(rawValue)) return fallback;
  }
  if (key === "duration" || key === "delay") {
    let match = rawValue.match(/([0-9]+)ms/);
    if (match) return match[1];
  }
  if (key === "origin") {
    if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
      return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
    }
  }
  return rawValue;
}

// packages/alpinejs/src/clone.js
var isCloning = false;
function skipDuringClone(callback, fallback = () => {}) {
  return (...args) => isCloning ? fallback(...args) : callback(...args);
}
function onlyDuringClone(callback) {
  return (...args) => isCloning && callback(...args);
}
var interceptors = [];
function interceptClone(callback) {
  interceptors.push(callback);
}
function cloneNode(from, to) {
  interceptors.forEach(i => i(from, to));
  isCloning = true;
  dontRegisterReactiveSideEffects(() => {
    initTree(to, (el, callback) => {
      callback(el, () => {});
    });
  });
  isCloning = false;
}
var isCloningLegacy = false;
function clone(oldEl, newEl) {
  if (!newEl._x_dataStack) newEl._x_dataStack = oldEl._x_dataStack;
  isCloning = true;
  isCloningLegacy = true;
  dontRegisterReactiveSideEffects(() => {
    cloneTree(newEl);
  });
  isCloning = false;
  isCloningLegacy = false;
}
function cloneTree(el) {
  let hasRunThroughFirstEl = false;
  let shallowWalker = (el2, callback) => {
    walk(el2, (el3, skip) => {
      if (hasRunThroughFirstEl && isRoot(el3)) return skip();
      hasRunThroughFirstEl = true;
      callback(el3, skip);
    });
  };
  initTree(el, shallowWalker);
}
function dontRegisterReactiveSideEffects(callback) {
  let cache = effect;
  overrideEffect((callback2, el) => {
    let storedEffect = cache(callback2);
    release(storedEffect);
    return () => {};
  });
  callback();
  overrideEffect(cache);
}

// packages/alpinejs/src/utils/bind.js
function bind(el, name, value, modifiers = []) {
  if (!el._x_bindings) el._x_bindings = reactive({});
  el._x_bindings[name] = value;
  name = modifiers.includes("camel") ? camelCase(name) : name;
  switch (name) {
    case "value":
      bindInputValue(el, value);
      break;
    case "style":
      bindStyles(el, value);
      break;
    case "class":
      bindClasses(el, value);
      break;
    case "selected":
    case "checked":
      bindAttributeAndProperty(el, name, value);
      break;
    default:
      bindAttribute(el, name, value);
      break;
  }
}
function bindInputValue(el, value) {
  if (isRadio(el)) {
    if (el.attributes.value === void 0) {
      el.value = value;
    }
    if (window.fromModel) {
      if (typeof value === "boolean") {
        el.checked = safeParseBoolean(el.value) === value;
      } else {
        el.checked = checkedAttrLooseCompare(el.value, value);
      }
    }
  } else if (isCheckbox(el)) {
    if (Number.isInteger(value)) {
      el.value = value;
    } else if (!Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
      el.value = String(value);
    } else {
      if (Array.isArray(value)) {
        el.checked = value.some(val => checkedAttrLooseCompare(val, el.value));
      } else {
        el.checked = !!value;
      }
    }
  } else if (el.tagName === "SELECT") {
    updateSelect(el, value);
  } else {
    if (el.value === value) return;
    el.value = value === void 0 ? "" : value;
  }
}
function bindClasses(el, value) {
  if (el._x_undoAddedClasses) el._x_undoAddedClasses();
  el._x_undoAddedClasses = setClasses(el, value);
}
function bindStyles(el, value) {
  if (el._x_undoAddedStyles) el._x_undoAddedStyles();
  el._x_undoAddedStyles = setStyles(el, value);
}
function bindAttributeAndProperty(el, name, value) {
  bindAttribute(el, name, value);
  setPropertyIfChanged(el, name, value);
}
function bindAttribute(el, name, value) {
  if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
    el.removeAttribute(name);
  } else {
    if (isBooleanAttr(name)) value = name;
    setIfChanged(el, name, value);
  }
}
function setIfChanged(el, attrName, value) {
  if (el.getAttribute(attrName) != value) {
    el.setAttribute(attrName, value);
  }
}
function setPropertyIfChanged(el, propName, value) {
  if (el[propName] !== value) {
    el[propName] = value;
  }
}
function updateSelect(el, value) {
  const arrayWrappedValue = [].concat(value).map(value2 => {
    return value2 + "";
  });
  Array.from(el.options).forEach(option => {
    option.selected = arrayWrappedValue.includes(option.value);
  });
}
function camelCase(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
}
function checkedAttrLooseCompare(valueA, valueB) {
  return valueA == valueB;
}
function safeParseBoolean(rawValue) {
  if ([1, "1", "true", "on", "yes", true].includes(rawValue)) {
    return true;
  }
  if ([0, "0", "false", "off", "no", false].includes(rawValue)) {
    return false;
  }
  return rawValue ? Boolean(rawValue) : null;
}
var booleanAttributes = /* @__PURE__ */new Set(["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled", "formnovalidate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "selected", "shadowrootclonable", "shadowrootdelegatesfocus", "shadowrootserializable"]);
function isBooleanAttr(attrName) {
  return booleanAttributes.has(attrName);
}
function attributeShouldntBePreservedIfFalsy(name) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
}
function getBinding(el, name, fallback) {
  if (el._x_bindings && el._x_bindings[name] !== void 0) return el._x_bindings[name];
  return getAttributeBinding(el, name, fallback);
}
function extractProp(el, name, fallback, extract = true) {
  if (el._x_bindings && el._x_bindings[name] !== void 0) return el._x_bindings[name];
  if (el._x_inlineBindings && el._x_inlineBindings[name] !== void 0) {
    let binding = el._x_inlineBindings[name];
    binding.extract = extract;
    return dontAutoEvaluateFunctions(() => {
      return evaluate(el, binding.expression);
    });
  }
  return getAttributeBinding(el, name, fallback);
}
function getAttributeBinding(el, name, fallback) {
  let attr = el.getAttribute(name);
  if (attr === null) return typeof fallback === "function" ? fallback() : fallback;
  if (attr === "") return true;
  if (isBooleanAttr(name)) {
    return !![name, "true"].includes(attr);
  }
  return attr;
}
function isCheckbox(el) {
  return el.type === "checkbox" || el.localName === "ui-checkbox" || el.localName === "ui-switch";
}
function isRadio(el) {
  return el.type === "radio" || el.localName === "ui-radio";
}

// packages/alpinejs/src/utils/debounce.js
function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// packages/alpinejs/src/utils/throttle.js
function throttle(func, limit) {
  let inThrottle;
  return function () {
    let context = this,
      args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// packages/alpinejs/src/entangle.js
function entangle({
  get: outerGet,
  set: outerSet
}, {
  get: innerGet,
  set: innerSet
}) {
  let firstRun = true;
  let outerHash;
  let innerHash;
  let reference = effect(() => {
    let outer = outerGet();
    let inner = innerGet();
    if (firstRun) {
      innerSet(cloneIfObject(outer));
      firstRun = false;
    } else {
      let outerHashLatest = JSON.stringify(outer);
      let innerHashLatest = JSON.stringify(inner);
      if (outerHashLatest !== outerHash) {
        innerSet(cloneIfObject(outer));
      } else if (outerHashLatest !== innerHashLatest) {
        outerSet(cloneIfObject(inner));
      } else {}
    }
    outerHash = JSON.stringify(outerGet());
    innerHash = JSON.stringify(innerGet());
  });
  return () => {
    release(reference);
  };
}
function cloneIfObject(value) {
  return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
}

// packages/alpinejs/src/plugin.js
function plugin(callback) {
  let callbacks = Array.isArray(callback) ? callback : [callback];
  callbacks.forEach(i => i(alpine_default));
}

// packages/alpinejs/src/store.js
var stores = {};
var isReactive = false;
function store(name, value) {
  if (!isReactive) {
    stores = reactive(stores);
    isReactive = true;
  }
  if (value === void 0) {
    return stores[name];
  }
  stores[name] = value;
  initInterceptors(stores[name]);
  if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
    stores[name].init();
  }
}
function getStores() {
  return stores;
}

// packages/alpinejs/src/binds.js
var binds = {};
function bind2(name, bindings) {
  let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
  if (name instanceof Element) {
    return applyBindingsObject(name, getBindings());
  } else {
    binds[name] = getBindings;
  }
  return () => {};
}
function injectBindingProviders(obj) {
  Object.entries(binds).forEach(([name, callback]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback(...args);
        };
      }
    });
  });
  return obj;
}
function applyBindingsObject(el, obj, original) {
  let cleanupRunners = [];
  while (cleanupRunners.length) cleanupRunners.pop()();
  let attributes = Object.entries(obj).map(([name, value]) => ({
    name,
    value
  }));
  let staticAttributes = attributesOnly(attributes);
  attributes = attributes.map(attribute => {
    if (staticAttributes.find(attr => attr.name === attribute.name)) {
      return {
        name: `x-bind:${attribute.name}`,
        value: `"${attribute.value}"`
      };
    }
    return attribute;
  });
  directives(el, attributes, original).map(handle => {
    cleanupRunners.push(handle.runCleanups);
    handle();
  });
  return () => {
    while (cleanupRunners.length) cleanupRunners.pop()();
  };
}

// packages/alpinejs/src/datas.js
var datas = {};
function data(name, callback) {
  datas[name] = callback;
}
function injectDataProviders(obj, context) {
  Object.entries(datas).forEach(([name, callback]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback.bind(context)(...args);
        };
      },
      enumerable: false
    });
  });
  return obj;
}

// packages/alpinejs/src/alpine.js
var Alpine = {
  get reactive() {
    return reactive;
  },
  get release() {
    return release;
  },
  get effect() {
    return effect;
  },
  get raw() {
    return raw;
  },
  version: "3.14.9",
  flushAndStopDeferringMutations,
  dontAutoEvaluateFunctions,
  disableEffectScheduling,
  startObservingMutations,
  stopObservingMutations,
  setReactivityEngine,
  onAttributeRemoved,
  onAttributesAdded,
  closestDataStack,
  skipDuringClone,
  onlyDuringClone,
  addRootSelector,
  addInitSelector,
  interceptClone,
  addScopeToNode,
  deferMutations,
  mapAttributes,
  evaluateLater,
  interceptInit,
  setEvaluator,
  mergeProxies,
  extractProp,
  findClosest,
  onElRemoved,
  closestRoot,
  destroyTree,
  interceptor,
  // INTERNAL: not public API and is subject to change without major release.
  transition,
  // INTERNAL
  setStyles,
  // INTERNAL
  mutateDom,
  directive,
  entangle,
  throttle,
  debounce,
  evaluate,
  initTree,
  nextTick,
  prefixed: prefix,
  prefix: setPrefix,
  plugin,
  magic,
  store,
  start,
  clone,
  // INTERNAL
  cloneNode,
  // INTERNAL
  bound: getBinding,
  $data: scope,
  watch,
  walk,
  data,
  bind: bind2
};
var alpine_default = Alpine;

// node_modules/@vue/shared/dist/shared.esm-bundler.js
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
}
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr2 = /* @__PURE__ */makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
var EMPTY_OBJ =  true ? Object.freeze({}) : 0;
var EMPTY_ARR =  true ? Object.freeze([]) : 0;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = val => toTypeString(val) === "[object Map]";
var isString = val => typeof val === "string";
var isSymbol = val => typeof val === "symbol";
var isObject = val => val !== null && typeof val === "object";
var objectToString = Object.prototype.toString;
var toTypeString = value => objectToString.call(value);
var toRawType = value => {
  return toTypeString(value).slice(8, -1);
};
var isIntegerKey = key => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var cacheStringFunction = fn => {
  const cache = /* @__PURE__ */Object.create(null);
  return str => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction(str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(str => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction(str => str.charAt(0).toUpperCase() + str.slice(1));
var toHandlerKey = cacheStringFunction(str => str ? `on${capitalize(str)}` : ``);
var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);

// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var targetMap = /* @__PURE__ */new WeakMap();
var effectStack = [];
var activeEffect;
var ITERATE_KEY = Symbol( true ? "iterate" : 0);
var MAP_KEY_ITERATE_KEY = Symbol( true ? "Map key iterate" : 0);
function isEffect(fn) {
  return fn && fn._isEffect === true;
}
function effect2(fn, options = EMPTY_OBJ) {
  if (isEffect(fn)) {
    fn = fn.raw;
  }
  const effect3 = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect3();
  }
  return effect3;
}
function stop(effect3) {
  if (effect3.active) {
    cleanup(effect3);
    if (effect3.options.onStop) {
      effect3.options.onStop();
    }
    effect3.active = false;
  }
}
var uid = 0;
function createReactiveEffect(fn, options) {
  const effect3 = function reactiveEffect() {
    if (!effect3.active) {
      return fn();
    }
    if (!effectStack.includes(effect3)) {
      cleanup(effect3);
      try {
        enableTracking();
        effectStack.push(effect3);
        activeEffect = effect3;
        return fn();
      } finally {
        effectStack.pop();
        resetTracking();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect3.id = uid++;
  effect3.allowRecurse = !!options.allowRecurse;
  effect3._isEffect = true;
  effect3.active = true;
  effect3.raw = fn;
  effect3.deps = [];
  effect3.options = options;
  return effect3;
}
function cleanup(effect3) {
  const {
    deps
  } = effect3;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect3);
    }
    deps.length = 0;
  }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (!shouldTrack || activeEffect === void 0) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = /* @__PURE__ */new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = /* @__PURE__ */new Set());
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target,
        type,
        key
      });
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const effects = /* @__PURE__ */new Set();
  const add2 = effectsToAdd => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect3 => {
        if (effect3 !== activeEffect || effect3.allowRecurse) {
          effects.add(effect3);
        }
      });
    }
  };
  if (type === "clear") {
    depsMap.forEach(add2);
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        add2(dep);
      }
    });
  } else {
    if (key !== void 0) {
      add2(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          add2(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          add2(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const run = effect3 => {
    if (effect3.options.onTrigger) {
      effect3.options.onTrigger({
        effect: effect3,
        target,
        key,
        type,
        newValue,
        oldValue,
        oldTarget
      });
    }
    if (effect3.options.scheduler) {
      effect3.options.scheduler(effect3);
    } else {
      effect3();
    }
  };
  effects.forEach(run);
}
var isNonTrackableKeys = /* @__PURE__ */makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map(key => Symbol[key]).filter(isSymbol));
var get2 = /* @__PURE__ */createGetter();
var readonlyGet = /* @__PURE__ */createGetter(true);
var arrayInstrumentations = /* @__PURE__ */createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach(key => {
    instrumentations[key] = function (...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach(key => {
    instrumentations[key] = function (...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly = false, shallow = false) {
  return function get3(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive2(res);
    }
    return res;
  };
}
var set2 = /* @__PURE__ */createSetter();
function createSetter(shallow = false) {
  return function set3(target, key, value, receiver) {
    let oldValue = target[key];
    if (!shallow) {
      value = toRaw(value);
      oldValue = toRaw(oldValue);
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
var mutableHandlers = {
  get: get2,
  set: set2,
  deleteProperty,
  has,
  ownKeys
};
var readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    if (true) {
      console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    if (true) {
      console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
var toReactive = value => isObject(value) ? reactive2(value) : value;
var toReadonly = value => isObject(value) ? readonly(value) : value;
var toShallow = value => value;
var getProto = v => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly = false, isShallow = false) {
  target = target["__v_raw"
  /* RAW */];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "get", key);
  }
  !isReadonly && track(rawTarget, "get", rawKey);
  const {
    has: has2
  } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly = false) {
  const target = this["__v_raw"
  /* RAW */];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "has", key);
  }
  !isReadonly && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
  target = target["__v_raw"
  /* RAW */];
  !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const {
    has: has2,
    get: get3
  } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const {
    has: has2,
    get: get3
  } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3 ? get3.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget =  true ? isMap(target) ? new Map(target) : new Set(target) : 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"
    /* RAW */];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly, isShallow) {
  return function (...args) {
    const target = this["__v_raw"
    /* RAW */];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const {
          value,
          done
        } = innerIterator.next();
        return done ? {
          value,
          done
        } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function (...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"
    /* ADD */),
    set: createReadonlyMethod("set"
    /* SET */),
    delete: createReadonlyMethod("delete"
    /* DELETE */),
    clear: createReadonlyMethod("clear"
    /* CLEAR */),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"
    /* ADD */),
    set: createReadonlyMethod("set"
    /* SET */),
    delete: createReadonlyMethod("delete"
    /* DELETE */),
    clear: createReadonlyMethod("clear"
    /* CLEAR */),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach(method => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [mutableInstrumentations2, readonlyInstrumentations2, shallowInstrumentations2, shallowReadonlyInstrumentations2];
}
var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */createInstrumentations();
function createInstrumentationGetter(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
var mutableCollectionHandlers = {
  get: /* @__PURE__ */createInstrumentationGetter(false, false)
};
var readonlyCollectionHandlers = {
  get: /* @__PURE__ */createInstrumentationGetter(true, false)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var reactiveMap = /* @__PURE__ */new WeakMap();
var shallowReactiveMap = /* @__PURE__ */new WeakMap();
var readonlyMap = /* @__PURE__ */new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"
  /* SKIP */] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive2(target) {
  if (target && target["__v_isReadonly"
  /* IS_READONLY */]) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (true) {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"
  /* RAW */] && !(isReadonly && target["__v_isReactive"
  /* IS_REACTIVE */])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function toRaw(observed) {
  return observed && toRaw(observed["__v_raw"
  /* RAW */]) || observed;
}
function isRef(r) {
  return Boolean(r && r.__v_isRef === true);
}

// packages/alpinejs/src/magics/$nextTick.js
magic("nextTick", () => nextTick);

// packages/alpinejs/src/magics/$dispatch.js
magic("dispatch", el => dispatch.bind(dispatch, el));

// packages/alpinejs/src/magics/$watch.js
magic("watch", (el, {
  evaluateLater: evaluateLater2,
  cleanup: cleanup2
}) => (key, callback) => {
  let evaluate2 = evaluateLater2(key);
  let getter = () => {
    let value;
    evaluate2(i => value = i);
    return value;
  };
  let unwatch = watch(getter, callback);
  cleanup2(unwatch);
});

// packages/alpinejs/src/magics/$store.js
magic("store", getStores);

// packages/alpinejs/src/magics/$data.js
magic("data", el => scope(el));

// packages/alpinejs/src/magics/$root.js
magic("root", el => closestRoot(el));

// packages/alpinejs/src/magics/$refs.js
magic("refs", el => {
  if (el._x_refs_proxy) return el._x_refs_proxy;
  el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
  return el._x_refs_proxy;
});
function getArrayOfRefObject(el) {
  let refObjects = [];
  findClosest(el, i => {
    if (i._x_refs) refObjects.push(i._x_refs);
  });
  return refObjects;
}

// packages/alpinejs/src/ids.js
var globalIdMemo = {};
function findAndIncrementId(name) {
  if (!globalIdMemo[name]) globalIdMemo[name] = 0;
  return ++globalIdMemo[name];
}
function closestIdRoot(el, name) {
  return findClosest(el, element => {
    if (element._x_ids && element._x_ids[name]) return true;
  });
}
function setIdRoot(el, name) {
  if (!el._x_ids) el._x_ids = {};
  if (!el._x_ids[name]) el._x_ids[name] = findAndIncrementId(name);
}

// packages/alpinejs/src/magics/$id.js
magic("id", (el, {
  cleanup: cleanup2
}) => (name, key = null) => {
  let cacheKey = `${name}${key ? `-${key}` : ""}`;
  return cacheIdByNameOnElement(el, cacheKey, cleanup2, () => {
    let root = closestIdRoot(el, name);
    let id = root ? root._x_ids[name] : findAndIncrementId(name);
    return key ? `${name}-${id}-${key}` : `${name}-${id}`;
  });
});
interceptClone((from, to) => {
  if (from._x_id) {
    to._x_id = from._x_id;
  }
});
function cacheIdByNameOnElement(el, cacheKey, cleanup2, callback) {
  if (!el._x_id) el._x_id = {};
  if (el._x_id[cacheKey]) return el._x_id[cacheKey];
  let output = callback();
  el._x_id[cacheKey] = output;
  cleanup2(() => {
    delete el._x_id[cacheKey];
  });
  return output;
}

// packages/alpinejs/src/magics/$el.js
magic("el", el => el);

// packages/alpinejs/src/magics/index.js
warnMissingPluginMagic("Focus", "focus", "focus");
warnMissingPluginMagic("Persist", "persist", "persist");
function warnMissingPluginMagic(name, magicName, slug) {
  magic(magicName, el => warn(`You can't use [$${magicName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}

// packages/alpinejs/src/directives/x-modelable.js
directive("modelable", (el, {
  expression
}, {
  effect: effect3,
  evaluateLater: evaluateLater2,
  cleanup: cleanup2
}) => {
  let func = evaluateLater2(expression);
  let innerGet = () => {
    let result;
    func(i => result = i);
    return result;
  };
  let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
  let innerSet = val => evaluateInnerSet(() => {}, {
    scope: {
      "__placeholder": val
    }
  });
  let initialValue = innerGet();
  innerSet(initialValue);
  queueMicrotask(() => {
    if (!el._x_model) return;
    el._x_removeModelListeners["default"]();
    let outerGet = el._x_model.get;
    let outerSet = el._x_model.set;
    let releaseEntanglement = entangle({
      get() {
        return outerGet();
      },
      set(value) {
        outerSet(value);
      }
    }, {
      get() {
        return innerGet();
      },
      set(value) {
        innerSet(value);
      }
    });
    cleanup2(releaseEntanglement);
  });
});

// packages/alpinejs/src/directives/x-teleport.js
directive("teleport", (el, {
  modifiers,
  expression
}, {
  cleanup: cleanup2
}) => {
  if (el.tagName.toLowerCase() !== "template") warn("x-teleport can only be used on a <template> tag", el);
  let target = getTarget(expression);
  let clone2 = el.content.cloneNode(true).firstElementChild;
  el._x_teleport = clone2;
  clone2._x_teleportBack = el;
  el.setAttribute("data-teleport-template", true);
  clone2.setAttribute("data-teleport-target", true);
  if (el._x_forwardEvents) {
    el._x_forwardEvents.forEach(eventName => {
      clone2.addEventListener(eventName, e => {
        e.stopPropagation();
        el.dispatchEvent(new e.constructor(e.type, e));
      });
    });
  }
  addScopeToNode(clone2, {}, el);
  let placeInDom = (clone3, target2, modifiers2) => {
    if (modifiers2.includes("prepend")) {
      target2.parentNode.insertBefore(clone3, target2);
    } else if (modifiers2.includes("append")) {
      target2.parentNode.insertBefore(clone3, target2.nextSibling);
    } else {
      target2.appendChild(clone3);
    }
  };
  mutateDom(() => {
    placeInDom(clone2, target, modifiers);
    skipDuringClone(() => {
      initTree(clone2);
    })();
  });
  el._x_teleportPutBack = () => {
    let target2 = getTarget(expression);
    mutateDom(() => {
      placeInDom(el._x_teleport, target2, modifiers);
    });
  };
  cleanup2(() => mutateDom(() => {
    clone2.remove();
    destroyTree(clone2);
  }));
});
var teleportContainerDuringClone = document.createElement("div");
function getTarget(expression) {
  let target = skipDuringClone(() => {
    return document.querySelector(expression);
  }, () => {
    return teleportContainerDuringClone;
  })();
  if (!target) warn(`Cannot find x-teleport element for selector: "${expression}"`);
  return target;
}

// packages/alpinejs/src/directives/x-ignore.js
var handler = () => {};
handler.inline = (el, {
  modifiers
}, {
  cleanup: cleanup2
}) => {
  modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
  cleanup2(() => {
    modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
  });
};
directive("ignore", handler);

// packages/alpinejs/src/directives/x-effect.js
directive("effect", skipDuringClone((el, {
  expression
}, {
  effect: effect3
}) => {
  effect3(evaluateLater(el, expression));
}));

// packages/alpinejs/src/utils/on.js
function on(el, event, modifiers, callback) {
  let listenerTarget = el;
  let handler4 = e => callback(e);
  let options = {};
  let wrapHandler = (callback2, wrapper) => e => wrapper(callback2, e);
  if (modifiers.includes("dot")) event = dotSyntax(event);
  if (modifiers.includes("camel")) event = camelCase2(event);
  if (modifiers.includes("passive")) options.passive = true;
  if (modifiers.includes("capture")) options.capture = true;
  if (modifiers.includes("window")) listenerTarget = window;
  if (modifiers.includes("document")) listenerTarget = document;
  if (modifiers.includes("debounce")) {
    let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler4 = debounce(handler4, wait);
  }
  if (modifiers.includes("throttle")) {
    let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler4 = throttle(handler4, wait);
  }
  if (modifiers.includes("prevent")) handler4 = wrapHandler(handler4, (next, e) => {
    e.preventDefault();
    next(e);
  });
  if (modifiers.includes("stop")) handler4 = wrapHandler(handler4, (next, e) => {
    e.stopPropagation();
    next(e);
  });
  if (modifiers.includes("once")) {
    handler4 = wrapHandler(handler4, (next, e) => {
      next(e);
      listenerTarget.removeEventListener(event, handler4, options);
    });
  }
  if (modifiers.includes("away") || modifiers.includes("outside")) {
    listenerTarget = document;
    handler4 = wrapHandler(handler4, (next, e) => {
      if (el.contains(e.target)) return;
      if (e.target.isConnected === false) return;
      if (el.offsetWidth < 1 && el.offsetHeight < 1) return;
      if (el._x_isShown === false) return;
      next(e);
    });
  }
  if (modifiers.includes("self")) handler4 = wrapHandler(handler4, (next, e) => {
    e.target === el && next(e);
  });
  if (isKeyEvent(event) || isClickEvent(event)) {
    handler4 = wrapHandler(handler4, (next, e) => {
      if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
        return;
      }
      next(e);
    });
  }
  listenerTarget.addEventListener(event, handler4, options);
  return () => {
    listenerTarget.removeEventListener(event, handler4, options);
  };
}
function dotSyntax(subject) {
  return subject.replace(/-/g, ".");
}
function camelCase2(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
}
function isNumeric(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function kebabCase2(subject) {
  if ([" ", "_"].includes(subject)) return subject;
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function isKeyEvent(event) {
  return ["keydown", "keyup"].includes(event);
}
function isClickEvent(event) {
  return ["contextmenu", "click", "mouse"].some(i => event.includes(i));
}
function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
  let keyModifiers = modifiers.filter(i => {
    return !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(i);
  });
  if (keyModifiers.includes("debounce")) {
    let debounceIndex = keyModifiers.indexOf("debounce");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.includes("throttle")) {
    let debounceIndex = keyModifiers.indexOf("throttle");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.length === 0) return false;
  if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0])) return false;
  const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
  const selectedSystemKeyModifiers = systemKeyModifiers.filter(modifier => keyModifiers.includes(modifier));
  keyModifiers = keyModifiers.filter(i => !selectedSystemKeyModifiers.includes(i));
  if (selectedSystemKeyModifiers.length > 0) {
    const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter(modifier => {
      if (modifier === "cmd" || modifier === "super") modifier = "meta";
      return e[`${modifier}Key`];
    });
    if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
      if (isClickEvent(e.type)) return false;
      if (keyToModifiers(e.key).includes(keyModifiers[0])) return false;
    }
  }
  return true;
}
function keyToModifiers(key) {
  if (!key) return [];
  key = kebabCase2(key);
  let modifierToKeyMap = {
    "ctrl": "control",
    "slash": "/",
    "space": " ",
    "spacebar": " ",
    "cmd": "meta",
    "esc": "escape",
    "up": "arrow-up",
    "down": "arrow-down",
    "left": "arrow-left",
    "right": "arrow-right",
    "period": ".",
    "comma": ",",
    "equal": "=",
    "minus": "-",
    "underscore": "_"
  };
  modifierToKeyMap[key] = key;
  return Object.keys(modifierToKeyMap).map(modifier => {
    if (modifierToKeyMap[modifier] === key) return modifier;
  }).filter(modifier => modifier);
}

// packages/alpinejs/src/directives/x-model.js
directive("model", (el, {
  modifiers,
  expression
}, {
  effect: effect3,
  cleanup: cleanup2
}) => {
  let scopeTarget = el;
  if (modifiers.includes("parent")) {
    scopeTarget = el.parentNode;
  }
  let evaluateGet = evaluateLater(scopeTarget, expression);
  let evaluateSet;
  if (typeof expression === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
  } else if (typeof expression === "function" && typeof expression() === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
  } else {
    evaluateSet = () => {};
  }
  let getValue = () => {
    let result;
    evaluateGet(value => result = value);
    return isGetterSetter(result) ? result.get() : result;
  };
  let setValue = value => {
    let result;
    evaluateGet(value2 => result = value2);
    if (isGetterSetter(result)) {
      result.set(value);
    } else {
      evaluateSet(() => {}, {
        scope: {
          "__placeholder": value
        }
      });
    }
  };
  if (typeof expression === "string" && el.type === "radio") {
    mutateDom(() => {
      if (!el.hasAttribute("name")) el.setAttribute("name", expression);
    });
  }
  var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
  let removeListener = isCloning ? () => {} : on(el, event, modifiers, e => {
    setValue(getInputValue(el, modifiers, e, getValue()));
  });
  if (modifiers.includes("fill")) {
    if ([void 0, null, ""].includes(getValue()) || isCheckbox(el) && Array.isArray(getValue()) || el.tagName.toLowerCase() === "select" && el.multiple) {
      setValue(getInputValue(el, modifiers, {
        target: el
      }, getValue()));
    }
  }
  if (!el._x_removeModelListeners) el._x_removeModelListeners = {};
  el._x_removeModelListeners["default"] = removeListener;
  cleanup2(() => el._x_removeModelListeners["default"]());
  if (el.form) {
    let removeResetListener = on(el.form, "reset", [], e => {
      nextTick(() => el._x_model && el._x_model.set(getInputValue(el, modifiers, {
        target: el
      }, getValue())));
    });
    cleanup2(() => removeResetListener());
  }
  el._x_model = {
    get() {
      return getValue();
    },
    set(value) {
      setValue(value);
    }
  };
  el._x_forceModelUpdate = value => {
    if (value === void 0 && typeof expression === "string" && expression.match(/\./)) value = "";
    window.fromModel = true;
    mutateDom(() => bind(el, "value", value));
    delete window.fromModel;
  };
  effect3(() => {
    let value = getValue();
    if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el)) return;
    el._x_forceModelUpdate(value);
  });
});
function getInputValue(el, modifiers, event, currentValue) {
  return mutateDom(() => {
    if (event instanceof CustomEvent && event.detail !== void 0) return event.detail !== null && event.detail !== void 0 ? event.detail : event.target.value;else if (isCheckbox(el)) {
      if (Array.isArray(currentValue)) {
        let newValue = null;
        if (modifiers.includes("number")) {
          newValue = safeParseNumber(event.target.value);
        } else if (modifiers.includes("boolean")) {
          newValue = safeParseBoolean(event.target.value);
        } else {
          newValue = event.target.value;
        }
        return event.target.checked ? currentValue.includes(newValue) ? currentValue : currentValue.concat([newValue]) : currentValue.filter(el2 => !checkedAttrLooseCompare2(el2, newValue));
      } else {
        return event.target.checked;
      }
    } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
      if (modifiers.includes("number")) {
        return Array.from(event.target.selectedOptions).map(option => {
          let rawValue = option.value || option.text;
          return safeParseNumber(rawValue);
        });
      } else if (modifiers.includes("boolean")) {
        return Array.from(event.target.selectedOptions).map(option => {
          let rawValue = option.value || option.text;
          return safeParseBoolean(rawValue);
        });
      }
      return Array.from(event.target.selectedOptions).map(option => {
        return option.value || option.text;
      });
    } else {
      let newValue;
      if (isRadio(el)) {
        if (event.target.checked) {
          newValue = event.target.value;
        } else {
          newValue = currentValue;
        }
      } else {
        newValue = event.target.value;
      }
      if (modifiers.includes("number")) {
        return safeParseNumber(newValue);
      } else if (modifiers.includes("boolean")) {
        return safeParseBoolean(newValue);
      } else if (modifiers.includes("trim")) {
        return newValue.trim();
      } else {
        return newValue;
      }
    }
  });
}
function safeParseNumber(rawValue) {
  let number = rawValue ? parseFloat(rawValue) : null;
  return isNumeric2(number) ? number : rawValue;
}
function checkedAttrLooseCompare2(valueA, valueB) {
  return valueA == valueB;
}
function isNumeric2(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function isGetterSetter(value) {
  return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
}

// packages/alpinejs/src/directives/x-cloak.js
directive("cloak", el => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));

// packages/alpinejs/src/directives/x-init.js
addInitSelector(() => `[${prefix("init")}]`);
directive("init", skipDuringClone((el, {
  expression
}, {
  evaluate: evaluate2
}) => {
  if (typeof expression === "string") {
    return !!expression.trim() && evaluate2(expression, {}, false);
  }
  return evaluate2(expression, {}, false);
}));

// packages/alpinejs/src/directives/x-text.js
directive("text", (el, {
  expression
}, {
  effect: effect3,
  evaluateLater: evaluateLater2
}) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2(value => {
      mutateDom(() => {
        el.textContent = value;
      });
    });
  });
});

// packages/alpinejs/src/directives/x-html.js
directive("html", (el, {
  expression
}, {
  effect: effect3,
  evaluateLater: evaluateLater2
}) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2(value => {
      mutateDom(() => {
        el.innerHTML = value;
        el._x_ignoreSelf = true;
        initTree(el);
        delete el._x_ignoreSelf;
      });
    });
  });
});

// packages/alpinejs/src/directives/x-bind.js
mapAttributes(startingWith(":", into(prefix("bind:"))));
var handler2 = (el, {
  value,
  modifiers,
  expression,
  original
}, {
  effect: effect3,
  cleanup: cleanup2
}) => {
  if (!value) {
    let bindingProviders = {};
    injectBindingProviders(bindingProviders);
    let getBindings = evaluateLater(el, expression);
    getBindings(bindings => {
      applyBindingsObject(el, bindings, original);
    }, {
      scope: bindingProviders
    });
    return;
  }
  if (value === "key") return storeKeyForXFor(el, expression);
  if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) {
    return;
  }
  let evaluate2 = evaluateLater(el, expression);
  effect3(() => evaluate2(result => {
    if (result === void 0 && typeof expression === "string" && expression.match(/\./)) {
      result = "";
    }
    mutateDom(() => bind(el, value, result, modifiers));
  }));
  cleanup2(() => {
    el._x_undoAddedClasses && el._x_undoAddedClasses();
    el._x_undoAddedStyles && el._x_undoAddedStyles();
  });
};
handler2.inline = (el, {
  value,
  modifiers,
  expression
}) => {
  if (!value) return;
  if (!el._x_inlineBindings) el._x_inlineBindings = {};
  el._x_inlineBindings[value] = {
    expression,
    extract: false
  };
};
directive("bind", handler2);
function storeKeyForXFor(el, expression) {
  el._x_keyExpression = expression;
}

// packages/alpinejs/src/directives/x-data.js
addRootSelector(() => `[${prefix("data")}]`);
directive("data", (el, {
  expression
}, {
  cleanup: cleanup2
}) => {
  if (shouldSkipRegisteringDataDuringClone(el)) return;
  expression = expression === "" ? "{}" : expression;
  let magicContext = {};
  injectMagics(magicContext, el);
  let dataProviderContext = {};
  injectDataProviders(dataProviderContext, magicContext);
  let data2 = evaluate(el, expression, {
    scope: dataProviderContext
  });
  if (data2 === void 0 || data2 === true) data2 = {};
  injectMagics(data2, el);
  let reactiveData = reactive(data2);
  initInterceptors(reactiveData);
  let undo = addScopeToNode(el, reactiveData);
  reactiveData["init"] && evaluate(el, reactiveData["init"]);
  cleanup2(() => {
    reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
    undo();
  });
});
interceptClone((from, to) => {
  if (from._x_dataStack) {
    to._x_dataStack = from._x_dataStack;
    to.setAttribute("data-has-alpine-state", true);
  }
});
function shouldSkipRegisteringDataDuringClone(el) {
  if (!isCloning) return false;
  if (isCloningLegacy) return true;
  return el.hasAttribute("data-has-alpine-state");
}

// packages/alpinejs/src/directives/x-show.js
directive("show", (el, {
  modifiers,
  expression
}, {
  effect: effect3
}) => {
  let evaluate2 = evaluateLater(el, expression);
  if (!el._x_doHide) el._x_doHide = () => {
    mutateDom(() => {
      el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
    });
  };
  if (!el._x_doShow) el._x_doShow = () => {
    mutateDom(() => {
      if (el.style.length === 1 && el.style.display === "none") {
        el.removeAttribute("style");
      } else {
        el.style.removeProperty("display");
      }
    });
  };
  let hide = () => {
    el._x_doHide();
    el._x_isShown = false;
  };
  let show = () => {
    el._x_doShow();
    el._x_isShown = true;
  };
  let clickAwayCompatibleShow = () => setTimeout(show);
  let toggle = once(value => value ? show() : hide(), value => {
    if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
      el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
    } else {
      value ? clickAwayCompatibleShow() : hide();
    }
  });
  let oldValue;
  let firstTime = true;
  effect3(() => evaluate2(value => {
    if (!firstTime && value === oldValue) return;
    if (modifiers.includes("immediate")) value ? clickAwayCompatibleShow() : hide();
    toggle(value);
    oldValue = value;
    firstTime = false;
  }));
});

// packages/alpinejs/src/directives/x-for.js
directive("for", (el, {
  expression
}, {
  effect: effect3,
  cleanup: cleanup2
}) => {
  let iteratorNames = parseForExpression(expression);
  let evaluateItems = evaluateLater(el, iteratorNames.items);
  let evaluateKey = evaluateLater(el,
  // the x-bind:key expression is stored for our use instead of evaluated.
  el._x_keyExpression || "index");
  el._x_prevKeys = [];
  el._x_lookup = {};
  effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
  cleanup2(() => {
    Object.values(el._x_lookup).forEach(el2 => mutateDom(() => {
      destroyTree(el2);
      el2.remove();
    }));
    delete el._x_prevKeys;
    delete el._x_lookup;
  });
});
function loop(el, iteratorNames, evaluateItems, evaluateKey) {
  let isObject2 = i => typeof i === "object" && !Array.isArray(i);
  let templateEl = el;
  evaluateItems(items => {
    if (isNumeric3(items) && items >= 0) {
      items = Array.from(Array(items).keys(), i => i + 1);
    }
    if (items === void 0) items = [];
    let lookup = el._x_lookup;
    let prevKeys = el._x_prevKeys;
    let scopes = [];
    let keys = [];
    if (isObject2(items)) {
      items = Object.entries(items).map(([key, value]) => {
        let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
        evaluateKey(value2 => {
          if (keys.includes(value2)) warn("Duplicate key on x-for", el);
          keys.push(value2);
        }, {
          scope: _objectSpread({
            index: key
          }, scope2)
        });
        scopes.push(scope2);
      });
    } else {
      for (let i = 0; i < items.length; i++) {
        let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
        evaluateKey(value => {
          if (keys.includes(value)) warn("Duplicate key on x-for", el);
          keys.push(value);
        }, {
          scope: _objectSpread({
            index: i
          }, scope2)
        });
        scopes.push(scope2);
      }
    }
    let adds = [];
    let moves = [];
    let removes = [];
    let sames = [];
    for (let i = 0; i < prevKeys.length; i++) {
      let key = prevKeys[i];
      if (keys.indexOf(key) === -1) removes.push(key);
    }
    prevKeys = prevKeys.filter(key => !removes.includes(key));
    let lastKey = "template";
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let prevIndex = prevKeys.indexOf(key);
      if (prevIndex === -1) {
        prevKeys.splice(i, 0, key);
        adds.push([lastKey, i]);
      } else if (prevIndex !== i) {
        let keyInSpot = prevKeys.splice(i, 1)[0];
        let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
        prevKeys.splice(i, 0, keyForSpot);
        prevKeys.splice(prevIndex, 0, keyInSpot);
        moves.push([keyInSpot, keyForSpot]);
      } else {
        sames.push(key);
      }
      lastKey = key;
    }
    for (let i = 0; i < removes.length; i++) {
      let key = removes[i];
      if (!(key in lookup)) continue;
      mutateDom(() => {
        destroyTree(lookup[key]);
        lookup[key].remove();
      });
      delete lookup[key];
    }
    for (let i = 0; i < moves.length; i++) {
      let [keyInSpot, keyForSpot] = moves[i];
      let elInSpot = lookup[keyInSpot];
      let elForSpot = lookup[keyForSpot];
      let marker = document.createElement("div");
      mutateDom(() => {
        if (!elForSpot) warn(`x-for ":key" is undefined or invalid`, templateEl, keyForSpot, lookup);
        elForSpot.after(marker);
        elInSpot.after(elForSpot);
        elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
        marker.before(elInSpot);
        elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
        marker.remove();
      });
      elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
    }
    for (let i = 0; i < adds.length; i++) {
      let [lastKey2, index] = adds[i];
      let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
      if (lastEl._x_currentIfEl) lastEl = lastEl._x_currentIfEl;
      let scope2 = scopes[index];
      let key = keys[index];
      let clone2 = document.importNode(templateEl.content, true).firstElementChild;
      let reactiveScope = reactive(scope2);
      addScopeToNode(clone2, reactiveScope, templateEl);
      clone2._x_refreshXForScope = newScope => {
        Object.entries(newScope).forEach(([key2, value]) => {
          reactiveScope[key2] = value;
        });
      };
      mutateDom(() => {
        lastEl.after(clone2);
        skipDuringClone(() => initTree(clone2))();
      });
      if (typeof key === "object") {
        warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
      }
      lookup[key] = clone2;
    }
    for (let i = 0; i < sames.length; i++) {
      lookup[sames[i]]._x_refreshXForScope(scopes[keys.indexOf(sames[i])]);
    }
    templateEl._x_prevKeys = keys;
  });
}
function parseForExpression(expression) {
  let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  let stripParensRE = /^\s*\(|\)\s*$/g;
  let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  let inMatch = expression.match(forAliasRE);
  if (!inMatch) return;
  let res = {};
  res.items = inMatch[2].trim();
  let item = inMatch[1].replace(stripParensRE, "").trim();
  let iteratorMatch = item.match(forIteratorRE);
  if (iteratorMatch) {
    res.item = item.replace(forIteratorRE, "").trim();
    res.index = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.collection = iteratorMatch[2].trim();
    }
  } else {
    res.item = item;
  }
  return res;
}
function getIterationScopeVariables(iteratorNames, item, index, items) {
  let scopeVariables = {};
  if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
    let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map(i => i.trim());
    names.forEach((name, i) => {
      scopeVariables[name] = item[i];
    });
  } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
    let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map(i => i.trim());
    names.forEach(name => {
      scopeVariables[name] = item[name];
    });
  } else {
    scopeVariables[iteratorNames.item] = item;
  }
  if (iteratorNames.index) scopeVariables[iteratorNames.index] = index;
  if (iteratorNames.collection) scopeVariables[iteratorNames.collection] = items;
  return scopeVariables;
}
function isNumeric3(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}

// packages/alpinejs/src/directives/x-ref.js
function handler3() {}
handler3.inline = (el, {
  expression
}, {
  cleanup: cleanup2
}) => {
  let root = closestRoot(el);
  if (!root._x_refs) root._x_refs = {};
  root._x_refs[expression] = el;
  cleanup2(() => delete root._x_refs[expression]);
};
directive("ref", handler3);

// packages/alpinejs/src/directives/x-if.js
directive("if", (el, {
  expression
}, {
  effect: effect3,
  cleanup: cleanup2
}) => {
  if (el.tagName.toLowerCase() !== "template") warn("x-if can only be used on a <template> tag", el);
  let evaluate2 = evaluateLater(el, expression);
  let show = () => {
    if (el._x_currentIfEl) return el._x_currentIfEl;
    let clone2 = el.content.cloneNode(true).firstElementChild;
    addScopeToNode(clone2, {}, el);
    mutateDom(() => {
      el.after(clone2);
      skipDuringClone(() => initTree(clone2))();
    });
    el._x_currentIfEl = clone2;
    el._x_undoIf = () => {
      mutateDom(() => {
        destroyTree(clone2);
        clone2.remove();
      });
      delete el._x_currentIfEl;
    };
    return clone2;
  };
  let hide = () => {
    if (!el._x_undoIf) return;
    el._x_undoIf();
    delete el._x_undoIf;
  };
  effect3(() => evaluate2(value => {
    value ? show() : hide();
  }));
  cleanup2(() => el._x_undoIf && el._x_undoIf());
});

// packages/alpinejs/src/directives/x-id.js
directive("id", (el, {
  expression
}, {
  evaluate: evaluate2
}) => {
  let names = evaluate2(expression);
  names.forEach(name => setIdRoot(el, name));
});
interceptClone((from, to) => {
  if (from._x_ids) {
    to._x_ids = from._x_ids;
  }
});

// packages/alpinejs/src/directives/x-on.js
mapAttributes(startingWith("@", into(prefix("on:"))));
directive("on", skipDuringClone((el, {
  value,
  modifiers,
  expression
}, {
  cleanup: cleanup2
}) => {
  let evaluate2 = expression ? evaluateLater(el, expression) : () => {};
  if (el.tagName.toLowerCase() === "template") {
    if (!el._x_forwardEvents) el._x_forwardEvents = [];
    if (!el._x_forwardEvents.includes(value)) el._x_forwardEvents.push(value);
  }
  let removeListener = on(el, value, modifiers, e => {
    evaluate2(() => {}, {
      scope: {
        "$event": e
      },
      params: [e]
    });
  });
  cleanup2(() => removeListener());
}));

// packages/alpinejs/src/directives/index.js
warnMissingPluginDirective("Collapse", "collapse", "collapse");
warnMissingPluginDirective("Intersect", "intersect", "intersect");
warnMissingPluginDirective("Focus", "trap", "focus");
warnMissingPluginDirective("Mask", "mask", "mask");
function warnMissingPluginDirective(name, directiveName, slug) {
  directive(directiveName, el => warn(`You can't use [x-${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}

// packages/alpinejs/src/index.js
alpine_default.setEvaluator(normalEvaluator);
alpine_default.setReactivityEngine({
  reactive: reactive2,
  effect: effect2,
  release: stop,
  raw: toRaw
});
var src_default = alpine_default;

// packages/alpinejs/builds/module.js
var module_default = src_default;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/assets/js/bundle.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpinejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpinejs */ "./node_modules/.pnpm/alpinejs@3.14.9/node_modules/alpinejs/dist/module.esm.js");

window.Alpine = alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"];
alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].start();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFO0VBQzdEM2YsU0FBUyxDQUFDaW9CLGFBQWEsRUFBR2oxQixFQUFFLElBQUtpSyxJQUFJLENBQUMsb0JBQW9CZ3JCLGFBQWEsbUNBQW1DeHpCLElBQUksK0NBQStDa3JCLElBQUksRUFBRSxFQUFFM3NCLEVBQUUsQ0FBQyxDQUFDO0FBQzNLOztBQUVBO0FBQ0FvUCxjQUFjLENBQUN6RSxZQUFZLENBQUNELGVBQWUsQ0FBQztBQUM1QzBFLGNBQWMsQ0FBQzFQLG1CQUFtQixDQUFDO0VBQUVOLFFBQVEsRUFBRW9vQixTQUFTO0VBQUVub0IsTUFBTSxFQUFFZ2xCLE9BQU87RUFBRS9rQixPQUFPLEVBQUVrbEIsSUFBSTtFQUFFamxCLEdBQUcsRUFBRW9uQjtBQUFNLENBQUMsQ0FBQztBQUN2RyxJQUFJdU8sV0FBVyxHQUFHOWxCLGNBQWM7O0FBRWhDO0FBQ0EsSUFBSStsQixjQUFjLEdBQUdELFdBQVc7Ozs7Ozs7VUMxMEdoQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZCO0FBRTdCbGMsTUFBTSxDQUFDN0osTUFBTSxHQUFHQSxnREFBTTtBQUV0QkEsZ0RBQU0sQ0FBQzhDLEtBQUssQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZXJvcy8uL25vZGVfbW9kdWxlcy8ucG5wbS9hbHBpbmVqc0AzLjE0Ljkvbm9kZV9tb2R1bGVzL2FscGluZWpzL2Rpc3QvbW9kdWxlLmVzbS5qcyIsIndlYnBhY2s6Ly9oZXJvcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oZXJvcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaGVyb3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oZXJvcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hlcm9zLy4vc3JjL2Fzc2V0cy9qcy9idW5kbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3NjaGVkdWxlci5qc1xudmFyIGZsdXNoUGVuZGluZyA9IGZhbHNlO1xudmFyIGZsdXNoaW5nID0gZmFsc2U7XG52YXIgcXVldWUgPSBbXTtcbnZhciBsYXN0Rmx1c2hlZEluZGV4ID0gLTE7XG5mdW5jdGlvbiBzY2hlZHVsZXIoY2FsbGJhY2spIHtcbiAgcXVldWVKb2IoY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gcXVldWVKb2Ioam9iKSB7XG4gIGlmICghcXVldWUuaW5jbHVkZXMoam9iKSlcbiAgICBxdWV1ZS5wdXNoKGpvYik7XG4gIHF1ZXVlRmx1c2goKTtcbn1cbmZ1bmN0aW9uIGRlcXVldWVKb2Ioam9iKSB7XG4gIGxldCBpbmRleCA9IHF1ZXVlLmluZGV4T2Yoam9iKTtcbiAgaWYgKGluZGV4ICE9PSAtMSAmJiBpbmRleCA+IGxhc3RGbHVzaGVkSW5kZXgpXG4gICAgcXVldWUuc3BsaWNlKGluZGV4LCAxKTtcbn1cbmZ1bmN0aW9uIHF1ZXVlRmx1c2goKSB7XG4gIGlmICghZmx1c2hpbmcgJiYgIWZsdXNoUGVuZGluZykge1xuICAgIGZsdXNoUGVuZGluZyA9IHRydWU7XG4gICAgcXVldWVNaWNyb3Rhc2soZmx1c2hKb2JzKTtcbiAgfVxufVxuZnVuY3Rpb24gZmx1c2hKb2JzKCkge1xuICBmbHVzaFBlbmRpbmcgPSBmYWxzZTtcbiAgZmx1c2hpbmcgPSB0cnVlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgcXVldWVbaV0oKTtcbiAgICBsYXN0Rmx1c2hlZEluZGV4ID0gaTtcbiAgfVxuICBxdWV1ZS5sZW5ndGggPSAwO1xuICBsYXN0Rmx1c2hlZEluZGV4ID0gLTE7XG4gIGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9yZWFjdGl2aXR5LmpzXG52YXIgcmVhY3RpdmU7XG52YXIgZWZmZWN0O1xudmFyIHJlbGVhc2U7XG52YXIgcmF3O1xudmFyIHNob3VsZFNjaGVkdWxlID0gdHJ1ZTtcbmZ1bmN0aW9uIGRpc2FibGVFZmZlY3RTY2hlZHVsaW5nKGNhbGxiYWNrKSB7XG4gIHNob3VsZFNjaGVkdWxlID0gZmFsc2U7XG4gIGNhbGxiYWNrKCk7XG4gIHNob3VsZFNjaGVkdWxlID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHNldFJlYWN0aXZpdHlFbmdpbmUoZW5naW5lKSB7XG4gIHJlYWN0aXZlID0gZW5naW5lLnJlYWN0aXZlO1xuICByZWxlYXNlID0gZW5naW5lLnJlbGVhc2U7XG4gIGVmZmVjdCA9IChjYWxsYmFjaykgPT4gZW5naW5lLmVmZmVjdChjYWxsYmFjaywgeyBzY2hlZHVsZXI6ICh0YXNrKSA9PiB7XG4gICAgaWYgKHNob3VsZFNjaGVkdWxlKSB7XG4gICAgICBzY2hlZHVsZXIodGFzayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhc2soKTtcbiAgICB9XG4gIH0gfSk7XG4gIHJhdyA9IGVuZ2luZS5yYXc7XG59XG5mdW5jdGlvbiBvdmVycmlkZUVmZmVjdChvdmVycmlkZSkge1xuICBlZmZlY3QgPSBvdmVycmlkZTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRCb3VuZEVmZmVjdChlbCkge1xuICBsZXQgY2xlYW51cDIgPSAoKSA9PiB7XG4gIH07XG4gIGxldCB3cmFwcGVkRWZmZWN0ID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgbGV0IGVmZmVjdFJlZmVyZW5jZSA9IGVmZmVjdChjYWxsYmFjayk7XG4gICAgaWYgKCFlbC5feF9lZmZlY3RzKSB7XG4gICAgICBlbC5feF9lZmZlY3RzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbiAgICAgIGVsLl94X3J1bkVmZmVjdHMgPSAoKSA9PiB7XG4gICAgICAgIGVsLl94X2VmZmVjdHMuZm9yRWFjaCgoaSkgPT4gaSgpKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGVsLl94X2VmZmVjdHMuYWRkKGVmZmVjdFJlZmVyZW5jZSk7XG4gICAgY2xlYW51cDIgPSAoKSA9PiB7XG4gICAgICBpZiAoZWZmZWN0UmVmZXJlbmNlID09PSB2b2lkIDApXG4gICAgICAgIHJldHVybjtcbiAgICAgIGVsLl94X2VmZmVjdHMuZGVsZXRlKGVmZmVjdFJlZmVyZW5jZSk7XG4gICAgICByZWxlYXNlKGVmZmVjdFJlZmVyZW5jZSk7XG4gICAgfTtcbiAgICByZXR1cm4gZWZmZWN0UmVmZXJlbmNlO1xuICB9O1xuICByZXR1cm4gW3dyYXBwZWRFZmZlY3QsICgpID0+IHtcbiAgICBjbGVhbnVwMigpO1xuICB9XTtcbn1cbmZ1bmN0aW9uIHdhdGNoKGdldHRlciwgY2FsbGJhY2spIHtcbiAgbGV0IGZpcnN0VGltZSA9IHRydWU7XG4gIGxldCBvbGRWYWx1ZTtcbiAgbGV0IGVmZmVjdFJlZmVyZW5jZSA9IGVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IHZhbHVlID0gZ2V0dGVyKCk7XG4gICAgSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIGlmICghZmlyc3RUaW1lKSB7XG4gICAgICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIG9sZFZhbHVlID0gdmFsdWU7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZmlyc3RUaW1lID0gZmFsc2U7XG4gIH0pO1xuICByZXR1cm4gKCkgPT4gcmVsZWFzZShlZmZlY3RSZWZlcmVuY2UpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbXV0YXRpb24uanNcbnZhciBvbkF0dHJpYnV0ZUFkZGVkcyA9IFtdO1xudmFyIG9uRWxSZW1vdmVkcyA9IFtdO1xudmFyIG9uRWxBZGRlZHMgPSBbXTtcbmZ1bmN0aW9uIG9uRWxBZGRlZChjYWxsYmFjaykge1xuICBvbkVsQWRkZWRzLnB1c2goY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gb25FbFJlbW92ZWQoZWwsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGlmICghZWwuX3hfY2xlYW51cHMpXG4gICAgICBlbC5feF9jbGVhbnVwcyA9IFtdO1xuICAgIGVsLl94X2NsZWFudXBzLnB1c2goY2FsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIGNhbGxiYWNrID0gZWw7XG4gICAgb25FbFJlbW92ZWRzLnB1c2goY2FsbGJhY2spO1xuICB9XG59XG5mdW5jdGlvbiBvbkF0dHJpYnV0ZXNBZGRlZChjYWxsYmFjaykge1xuICBvbkF0dHJpYnV0ZUFkZGVkcy5wdXNoKGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIG9uQXR0cmlidXRlUmVtb3ZlZChlbCwgbmFtZSwgY2FsbGJhY2spIHtcbiAgaWYgKCFlbC5feF9hdHRyaWJ1dGVDbGVhbnVwcylcbiAgICBlbC5feF9hdHRyaWJ1dGVDbGVhbnVwcyA9IHt9O1xuICBpZiAoIWVsLl94X2F0dHJpYnV0ZUNsZWFudXBzW25hbWVdKVxuICAgIGVsLl94X2F0dHJpYnV0ZUNsZWFudXBzW25hbWVdID0gW107XG4gIGVsLl94X2F0dHJpYnV0ZUNsZWFudXBzW25hbWVdLnB1c2goY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gY2xlYW51cEF0dHJpYnV0ZXMoZWwsIG5hbWVzKSB7XG4gIGlmICghZWwuX3hfYXR0cmlidXRlQ2xlYW51cHMpXG4gICAgcmV0dXJuO1xuICBPYmplY3QuZW50cmllcyhlbC5feF9hdHRyaWJ1dGVDbGVhbnVwcykuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgIGlmIChuYW1lcyA9PT0gdm9pZCAwIHx8IG5hbWVzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKChpKSA9PiBpKCkpO1xuICAgICAgZGVsZXRlIGVsLl94X2F0dHJpYnV0ZUNsZWFudXBzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBjbGVhbnVwRWxlbWVudChlbCkge1xuICBlbC5feF9lZmZlY3RzPy5mb3JFYWNoKGRlcXVldWVKb2IpO1xuICB3aGlsZSAoZWwuX3hfY2xlYW51cHM/Lmxlbmd0aClcbiAgICBlbC5feF9jbGVhbnVwcy5wb3AoKSgpO1xufVxudmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIob25NdXRhdGUpO1xudmFyIGN1cnJlbnRseU9ic2VydmluZyA9IGZhbHNlO1xuZnVuY3Rpb24gc3RhcnRPYnNlcnZpbmdNdXRhdGlvbnMoKSB7XG4gIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHsgc3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSB9KTtcbiAgY3VycmVudGx5T2JzZXJ2aW5nID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHN0b3BPYnNlcnZpbmdNdXRhdGlvbnMoKSB7XG4gIGZsdXNoT2JzZXJ2ZXIoKTtcbiAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICBjdXJyZW50bHlPYnNlcnZpbmcgPSBmYWxzZTtcbn1cbnZhciBxdWV1ZWRNdXRhdGlvbnMgPSBbXTtcbmZ1bmN0aW9uIGZsdXNoT2JzZXJ2ZXIoKSB7XG4gIGxldCByZWNvcmRzID0gb2JzZXJ2ZXIudGFrZVJlY29yZHMoKTtcbiAgcXVldWVkTXV0YXRpb25zLnB1c2goKCkgPT4gcmVjb3Jkcy5sZW5ndGggPiAwICYmIG9uTXV0YXRlKHJlY29yZHMpKTtcbiAgbGV0IHF1ZXVlTGVuZ3RoV2hlblRyaWdnZXJlZCA9IHF1ZXVlZE11dGF0aW9ucy5sZW5ndGg7XG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpZiAocXVldWVkTXV0YXRpb25zLmxlbmd0aCA9PT0gcXVldWVMZW5ndGhXaGVuVHJpZ2dlcmVkKSB7XG4gICAgICB3aGlsZSAocXVldWVkTXV0YXRpb25zLmxlbmd0aCA+IDApXG4gICAgICAgIHF1ZXVlZE11dGF0aW9ucy5zaGlmdCgpKCk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIG11dGF0ZURvbShjYWxsYmFjaykge1xuICBpZiAoIWN1cnJlbnRseU9ic2VydmluZylcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgc3RvcE9ic2VydmluZ011dGF0aW9ucygpO1xuICBsZXQgcmVzdWx0ID0gY2FsbGJhY2soKTtcbiAgc3RhcnRPYnNlcnZpbmdNdXRhdGlvbnMoKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbnZhciBpc0NvbGxlY3RpbmcgPSBmYWxzZTtcbnZhciBkZWZlcnJlZE11dGF0aW9ucyA9IFtdO1xuZnVuY3Rpb24gZGVmZXJNdXRhdGlvbnMoKSB7XG4gIGlzQ29sbGVjdGluZyA9IHRydWU7XG59XG5mdW5jdGlvbiBmbHVzaEFuZFN0b3BEZWZlcnJpbmdNdXRhdGlvbnMoKSB7XG4gIGlzQ29sbGVjdGluZyA9IGZhbHNlO1xuICBvbk11dGF0ZShkZWZlcnJlZE11dGF0aW9ucyk7XG4gIGRlZmVycmVkTXV0YXRpb25zID0gW107XG59XG5mdW5jdGlvbiBvbk11dGF0ZShtdXRhdGlvbnMpIHtcbiAgaWYgKGlzQ29sbGVjdGluZykge1xuICAgIGRlZmVycmVkTXV0YXRpb25zID0gZGVmZXJyZWRNdXRhdGlvbnMuY29uY2F0KG11dGF0aW9ucyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBhZGRlZE5vZGVzID0gW107XG4gIGxldCByZW1vdmVkTm9kZXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xuICBsZXQgYWRkZWRBdHRyaWJ1dGVzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgbGV0IHJlbW92ZWRBdHRyaWJ1dGVzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobXV0YXRpb25zW2ldLnRhcmdldC5feF9pZ25vcmVNdXRhdGlvbk9ic2VydmVyKVxuICAgICAgY29udGludWU7XG4gICAgaWYgKG11dGF0aW9uc1tpXS50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XG4gICAgICBtdXRhdGlvbnNbaV0ucmVtb3ZlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEpXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoIW5vZGUuX3hfbWFya2VyKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmVtb3ZlZE5vZGVzLmFkZChub2RlKTtcbiAgICAgIH0pO1xuICAgICAgbXV0YXRpb25zW2ldLmFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChyZW1vdmVkTm9kZXMuaGFzKG5vZGUpKSB7XG4gICAgICAgICAgcmVtb3ZlZE5vZGVzLmRlbGV0ZShub2RlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUuX3hfbWFya2VyKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYWRkZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtdXRhdGlvbnNbaV0udHlwZSA9PT0gXCJhdHRyaWJ1dGVzXCIpIHtcbiAgICAgIGxldCBlbCA9IG11dGF0aW9uc1tpXS50YXJnZXQ7XG4gICAgICBsZXQgbmFtZSA9IG11dGF0aW9uc1tpXS5hdHRyaWJ1dGVOYW1lO1xuICAgICAgbGV0IG9sZFZhbHVlID0gbXV0YXRpb25zW2ldLm9sZFZhbHVlO1xuICAgICAgbGV0IGFkZDIgPSAoKSA9PiB7XG4gICAgICAgIGlmICghYWRkZWRBdHRyaWJ1dGVzLmhhcyhlbCkpXG4gICAgICAgICAgYWRkZWRBdHRyaWJ1dGVzLnNldChlbCwgW10pO1xuICAgICAgICBhZGRlZEF0dHJpYnV0ZXMuZ2V0KGVsKS5wdXNoKHsgbmFtZSwgdmFsdWU6IGVsLmdldEF0dHJpYnV0ZShuYW1lKSB9KTtcbiAgICAgIH07XG4gICAgICBsZXQgcmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXJlbW92ZWRBdHRyaWJ1dGVzLmhhcyhlbCkpXG4gICAgICAgICAgcmVtb3ZlZEF0dHJpYnV0ZXMuc2V0KGVsLCBbXSk7XG4gICAgICAgIHJlbW92ZWRBdHRyaWJ1dGVzLmdldChlbCkucHVzaChuYW1lKTtcbiAgICAgIH07XG4gICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKG5hbWUpICYmIG9sZFZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIGFkZDIoKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwuaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICAgIHJlbW92ZSgpO1xuICAgICAgICBhZGQyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVtb3ZlZEF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cnMsIGVsKSA9PiB7XG4gICAgY2xlYW51cEF0dHJpYnV0ZXMoZWwsIGF0dHJzKTtcbiAgfSk7XG4gIGFkZGVkQXR0cmlidXRlcy5mb3JFYWNoKChhdHRycywgZWwpID0+IHtcbiAgICBvbkF0dHJpYnV0ZUFkZGVkcy5mb3JFYWNoKChpKSA9PiBpKGVsLCBhdHRycykpO1xuICB9KTtcbiAgZm9yIChsZXQgbm9kZSBvZiByZW1vdmVkTm9kZXMpIHtcbiAgICBpZiAoYWRkZWROb2Rlcy5zb21lKChpKSA9PiBpLmNvbnRhaW5zKG5vZGUpKSlcbiAgICAgIGNvbnRpbnVlO1xuICAgIG9uRWxSZW1vdmVkcy5mb3JFYWNoKChpKSA9PiBpKG5vZGUpKTtcbiAgfVxuICBmb3IgKGxldCBub2RlIG9mIGFkZGVkTm9kZXMpIHtcbiAgICBpZiAoIW5vZGUuaXNDb25uZWN0ZWQpXG4gICAgICBjb250aW51ZTtcbiAgICBvbkVsQWRkZWRzLmZvckVhY2goKGkpID0+IGkobm9kZSkpO1xuICB9XG4gIGFkZGVkTm9kZXMgPSBudWxsO1xuICByZW1vdmVkTm9kZXMgPSBudWxsO1xuICBhZGRlZEF0dHJpYnV0ZXMgPSBudWxsO1xuICByZW1vdmVkQXR0cmlidXRlcyA9IG51bGw7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9zY29wZS5qc1xuZnVuY3Rpb24gc2NvcGUobm9kZSkge1xuICByZXR1cm4gbWVyZ2VQcm94aWVzKGNsb3Nlc3REYXRhU3RhY2sobm9kZSkpO1xufVxuZnVuY3Rpb24gYWRkU2NvcGVUb05vZGUobm9kZSwgZGF0YTIsIHJlZmVyZW5jZU5vZGUpIHtcbiAgbm9kZS5feF9kYXRhU3RhY2sgPSBbZGF0YTIsIC4uLmNsb3Nlc3REYXRhU3RhY2socmVmZXJlbmNlTm9kZSB8fCBub2RlKV07XG4gIHJldHVybiAoKSA9PiB7XG4gICAgbm9kZS5feF9kYXRhU3RhY2sgPSBub2RlLl94X2RhdGFTdGFjay5maWx0ZXIoKGkpID0+IGkgIT09IGRhdGEyKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGNsb3Nlc3REYXRhU3RhY2sobm9kZSkge1xuICBpZiAobm9kZS5feF9kYXRhU3RhY2spXG4gICAgcmV0dXJuIG5vZGUuX3hfZGF0YVN0YWNrO1xuICBpZiAodHlwZW9mIFNoYWRvd1Jvb3QgPT09IFwiZnVuY3Rpb25cIiAmJiBub2RlIGluc3RhbmNlb2YgU2hhZG93Um9vdCkge1xuICAgIHJldHVybiBjbG9zZXN0RGF0YVN0YWNrKG5vZGUuaG9zdCk7XG4gIH1cbiAgaWYgKCFub2RlLnBhcmVudE5vZGUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgcmV0dXJuIGNsb3Nlc3REYXRhU3RhY2sobm9kZS5wYXJlbnROb2RlKTtcbn1cbmZ1bmN0aW9uIG1lcmdlUHJveGllcyhvYmplY3RzKSB7XG4gIHJldHVybiBuZXcgUHJveHkoeyBvYmplY3RzIH0sIG1lcmdlUHJveHlUcmFwKTtcbn1cbnZhciBtZXJnZVByb3h5VHJhcCA9IHtcbiAgb3duS2V5cyh7IG9iamVjdHMgfSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKFxuICAgICAgbmV3IFNldChvYmplY3RzLmZsYXRNYXAoKGkpID0+IE9iamVjdC5rZXlzKGkpKSlcbiAgICApO1xuICB9LFxuICBoYXMoeyBvYmplY3RzIH0sIG5hbWUpIHtcbiAgICBpZiAobmFtZSA9PSBTeW1ib2wudW5zY29wYWJsZXMpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG9iamVjdHMuc29tZShcbiAgICAgIChvYmopID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIG5hbWUpIHx8IFJlZmxlY3QuaGFzKG9iaiwgbmFtZSlcbiAgICApO1xuICB9LFxuICBnZXQoeyBvYmplY3RzIH0sIG5hbWUsIHRoaXNQcm94eSkge1xuICAgIGlmIChuYW1lID09IFwidG9KU09OXCIpXG4gICAgICByZXR1cm4gY29sbGFwc2VQcm94aWVzO1xuICAgIHJldHVybiBSZWZsZWN0LmdldChcbiAgICAgIG9iamVjdHMuZmluZChcbiAgICAgICAgKG9iaikgPT4gUmVmbGVjdC5oYXMob2JqLCBuYW1lKVxuICAgICAgKSB8fCB7fSxcbiAgICAgIG5hbWUsXG4gICAgICB0aGlzUHJveHlcbiAgICApO1xuICB9LFxuICBzZXQoeyBvYmplY3RzIH0sIG5hbWUsIHZhbHVlLCB0aGlzUHJveHkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBvYmplY3RzLmZpbmQoXG4gICAgICAob2JqKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBuYW1lKVxuICAgICkgfHwgb2JqZWN0c1tvYmplY3RzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgbmFtZSk7XG4gICAgaWYgKGRlc2NyaXB0b3I/LnNldCAmJiBkZXNjcmlwdG9yPy5nZXQpXG4gICAgICByZXR1cm4gZGVzY3JpcHRvci5zZXQuY2FsbCh0aGlzUHJveHksIHZhbHVlKSB8fCB0cnVlO1xuICAgIHJldHVybiBSZWZsZWN0LnNldCh0YXJnZXQsIG5hbWUsIHZhbHVlKTtcbiAgfVxufTtcbmZ1bmN0aW9uIGNvbGxhcHNlUHJveGllcygpIHtcbiAgbGV0IGtleXMgPSBSZWZsZWN0Lm93bktleXModGhpcyk7XG4gIHJldHVybiBrZXlzLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBhY2Nba2V5XSA9IFJlZmxlY3QuZ2V0KHRoaXMsIGtleSk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvaW50ZXJjZXB0b3IuanNcbmZ1bmN0aW9uIGluaXRJbnRlcmNlcHRvcnMoZGF0YTIpIHtcbiAgbGV0IGlzT2JqZWN0MiA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsKSAmJiB2YWwgIT09IG51bGw7XG4gIGxldCByZWN1cnNlID0gKG9iaiwgYmFzZVBhdGggPSBcIlwiKSA9PiB7XG4gICAgT2JqZWN0LmVudHJpZXMoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKSkuZm9yRWFjaCgoW2tleSwgeyB2YWx1ZSwgZW51bWVyYWJsZSB9XSkgPT4ge1xuICAgICAgaWYgKGVudW1lcmFibGUgPT09IGZhbHNlIHx8IHZhbHVlID09PSB2b2lkIDApXG4gICAgICAgIHJldHVybjtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUuX192X3NraXApXG4gICAgICAgIHJldHVybjtcbiAgICAgIGxldCBwYXRoID0gYmFzZVBhdGggPT09IFwiXCIgPyBrZXkgOiBgJHtiYXNlUGF0aH0uJHtrZXl9YDtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUuX3hfaW50ZXJjZXB0b3IpIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZS5pbml0aWFsaXplKGRhdGEyLCBwYXRoLCBrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzT2JqZWN0Mih2YWx1ZSkgJiYgdmFsdWUgIT09IG9iaiAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRWxlbWVudCkpIHtcbiAgICAgICAgICByZWN1cnNlKHZhbHVlLCBwYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICByZXR1cm4gcmVjdXJzZShkYXRhMik7XG59XG5mdW5jdGlvbiBpbnRlcmNlcHRvcihjYWxsYmFjaywgbXV0YXRlT2JqID0gKCkgPT4ge1xufSkge1xuICBsZXQgb2JqID0ge1xuICAgIGluaXRpYWxWYWx1ZTogdm9pZCAwLFxuICAgIF94X2ludGVyY2VwdG9yOiB0cnVlLFxuICAgIGluaXRpYWxpemUoZGF0YTIsIHBhdGgsIGtleSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuaW5pdGlhbFZhbHVlLCAoKSA9PiBnZXQoZGF0YTIsIHBhdGgpLCAodmFsdWUpID0+IHNldChkYXRhMiwgcGF0aCwgdmFsdWUpLCBwYXRoLCBrZXkpO1xuICAgIH1cbiAgfTtcbiAgbXV0YXRlT2JqKG9iaik7XG4gIHJldHVybiAoaW5pdGlhbFZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBpbml0aWFsVmFsdWUgPT09IFwib2JqZWN0XCIgJiYgaW5pdGlhbFZhbHVlICE9PSBudWxsICYmIGluaXRpYWxWYWx1ZS5feF9pbnRlcmNlcHRvcikge1xuICAgICAgbGV0IGluaXRpYWxpemUgPSBvYmouaW5pdGlhbGl6ZS5iaW5kKG9iaik7XG4gICAgICBvYmouaW5pdGlhbGl6ZSA9IChkYXRhMiwgcGF0aCwga2V5KSA9PiB7XG4gICAgICAgIGxldCBpbm5lclZhbHVlID0gaW5pdGlhbFZhbHVlLmluaXRpYWxpemUoZGF0YTIsIHBhdGgsIGtleSk7XG4gICAgICAgIG9iai5pbml0aWFsVmFsdWUgPSBpbm5lclZhbHVlO1xuICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZShkYXRhMiwgcGF0aCwga2V5KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIG9iai5pbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG59XG5mdW5jdGlvbiBnZXQob2JqLCBwYXRoKSB7XG4gIHJldHVybiBwYXRoLnNwbGl0KFwiLlwiKS5yZWR1Y2UoKGNhcnJ5LCBzZWdtZW50KSA9PiBjYXJyeVtzZWdtZW50XSwgb2JqKTtcbn1cbmZ1bmN0aW9uIHNldChvYmosIHBhdGgsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIilcbiAgICBwYXRoID0gcGF0aC5zcGxpdChcIi5cIik7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSlcbiAgICBvYmpbcGF0aFswXV0gPSB2YWx1ZTtcbiAgZWxzZSBpZiAocGF0aC5sZW5ndGggPT09IDApXG4gICAgdGhyb3cgZXJyb3I7XG4gIGVsc2Uge1xuICAgIGlmIChvYmpbcGF0aFswXV0pXG4gICAgICByZXR1cm4gc2V0KG9ialtwYXRoWzBdXSwgcGF0aC5zbGljZSgxKSwgdmFsdWUpO1xuICAgIGVsc2Uge1xuICAgICAgb2JqW3BhdGhbMF1dID0ge307XG4gICAgICByZXR1cm4gc2V0KG9ialtwYXRoWzBdXSwgcGF0aC5zbGljZSgxKSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLmpzXG52YXIgbWFnaWNzID0ge307XG5mdW5jdGlvbiBtYWdpYyhuYW1lLCBjYWxsYmFjaykge1xuICBtYWdpY3NbbmFtZV0gPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIGluamVjdE1hZ2ljcyhvYmosIGVsKSB7XG4gIGxldCBtZW1vaXplZFV0aWxpdGllcyA9IGdldFV0aWxpdGllcyhlbCk7XG4gIE9iamVjdC5lbnRyaWVzKG1hZ2ljcykuZm9yRWFjaCgoW25hbWUsIGNhbGxiYWNrXSkgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGAkJHtuYW1lfWAsIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVsLCBtZW1vaXplZFV0aWxpdGllcyk7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBnZXRVdGlsaXRpZXMoZWwpIHtcbiAgbGV0IFt1dGlsaXRpZXMsIGNsZWFudXAyXSA9IGdldEVsZW1lbnRCb3VuZFV0aWxpdGllcyhlbCk7XG4gIGxldCB1dGlscyA9IHsgaW50ZXJjZXB0b3IsIC4uLnV0aWxpdGllcyB9O1xuICBvbkVsUmVtb3ZlZChlbCwgY2xlYW51cDIpO1xuICByZXR1cm4gdXRpbHM7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy91dGlscy9lcnJvci5qc1xuZnVuY3Rpb24gdHJ5Q2F0Y2goZWwsIGV4cHJlc3Npb24sIGNhbGxiYWNrLCAuLi5hcmdzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKC4uLmFyZ3MpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaGFuZGxlRXJyb3IoZSwgZWwsIGV4cHJlc3Npb24pO1xuICB9XG59XG5mdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvcjIsIGVsLCBleHByZXNzaW9uID0gdm9pZCAwKSB7XG4gIGVycm9yMiA9IE9iamVjdC5hc3NpZ24oXG4gICAgZXJyb3IyID8/IHsgbWVzc2FnZTogXCJObyBlcnJvciBtZXNzYWdlIGdpdmVuLlwiIH0sXG4gICAgeyBlbCwgZXhwcmVzc2lvbiB9XG4gICk7XG4gIGNvbnNvbGUud2FybihgQWxwaW5lIEV4cHJlc3Npb24gRXJyb3I6ICR7ZXJyb3IyLm1lc3NhZ2V9XG5cbiR7ZXhwcmVzc2lvbiA/ICdFeHByZXNzaW9uOiBcIicgKyBleHByZXNzaW9uICsgJ1wiXFxuXFxuJyA6IFwiXCJ9YCwgZWwpO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB0aHJvdyBlcnJvcjI7XG4gIH0sIDApO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZXZhbHVhdG9yLmpzXG52YXIgc2hvdWxkQXV0b0V2YWx1YXRlRnVuY3Rpb25zID0gdHJ1ZTtcbmZ1bmN0aW9uIGRvbnRBdXRvRXZhbHVhdGVGdW5jdGlvbnMoY2FsbGJhY2spIHtcbiAgbGV0IGNhY2hlID0gc2hvdWxkQXV0b0V2YWx1YXRlRnVuY3Rpb25zO1xuICBzaG91bGRBdXRvRXZhbHVhdGVGdW5jdGlvbnMgPSBmYWxzZTtcbiAgbGV0IHJlc3VsdCA9IGNhbGxiYWNrKCk7XG4gIHNob3VsZEF1dG9FdmFsdWF0ZUZ1bmN0aW9ucyA9IGNhY2hlO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZXZhbHVhdGUoZWwsIGV4cHJlc3Npb24sIGV4dHJhcyA9IHt9KSB7XG4gIGxldCByZXN1bHQ7XG4gIGV2YWx1YXRlTGF0ZXIoZWwsIGV4cHJlc3Npb24pKCh2YWx1ZSkgPT4gcmVzdWx0ID0gdmFsdWUsIGV4dHJhcyk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBldmFsdWF0ZUxhdGVyKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIHRoZUV2YWx1YXRvckZ1bmN0aW9uKC4uLmFyZ3MpO1xufVxudmFyIHRoZUV2YWx1YXRvckZ1bmN0aW9uID0gbm9ybWFsRXZhbHVhdG9yO1xuZnVuY3Rpb24gc2V0RXZhbHVhdG9yKG5ld0V2YWx1YXRvcikge1xuICB0aGVFdmFsdWF0b3JGdW5jdGlvbiA9IG5ld0V2YWx1YXRvcjtcbn1cbmZ1bmN0aW9uIG5vcm1hbEV2YWx1YXRvcihlbCwgZXhwcmVzc2lvbikge1xuICBsZXQgb3ZlcnJpZGRlbk1hZ2ljcyA9IHt9O1xuICBpbmplY3RNYWdpY3Mob3ZlcnJpZGRlbk1hZ2ljcywgZWwpO1xuICBsZXQgZGF0YVN0YWNrID0gW292ZXJyaWRkZW5NYWdpY3MsIC4uLmNsb3Nlc3REYXRhU3RhY2soZWwpXTtcbiAgbGV0IGV2YWx1YXRvciA9IHR5cGVvZiBleHByZXNzaW9uID09PSBcImZ1bmN0aW9uXCIgPyBnZW5lcmF0ZUV2YWx1YXRvckZyb21GdW5jdGlvbihkYXRhU3RhY2ssIGV4cHJlc3Npb24pIDogZ2VuZXJhdGVFdmFsdWF0b3JGcm9tU3RyaW5nKGRhdGFTdGFjaywgZXhwcmVzc2lvbiwgZWwpO1xuICByZXR1cm4gdHJ5Q2F0Y2guYmluZChudWxsLCBlbCwgZXhwcmVzc2lvbiwgZXZhbHVhdG9yKTtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlRXZhbHVhdG9yRnJvbUZ1bmN0aW9uKGRhdGFTdGFjaywgZnVuYykge1xuICByZXR1cm4gKHJlY2VpdmVyID0gKCkgPT4ge1xuICB9LCB7IHNjb3BlOiBzY29wZTIgPSB7fSwgcGFyYW1zID0gW10gfSA9IHt9KSA9PiB7XG4gICAgbGV0IHJlc3VsdCA9IGZ1bmMuYXBwbHkobWVyZ2VQcm94aWVzKFtzY29wZTIsIC4uLmRhdGFTdGFja10pLCBwYXJhbXMpO1xuICAgIHJ1bklmVHlwZU9mRnVuY3Rpb24ocmVjZWl2ZXIsIHJlc3VsdCk7XG4gIH07XG59XG52YXIgZXZhbHVhdG9yTWVtbyA9IHt9O1xuZnVuY3Rpb24gZ2VuZXJhdGVGdW5jdGlvbkZyb21TdHJpbmcoZXhwcmVzc2lvbiwgZWwpIHtcbiAgaWYgKGV2YWx1YXRvck1lbW9bZXhwcmVzc2lvbl0pIHtcbiAgICByZXR1cm4gZXZhbHVhdG9yTWVtb1tleHByZXNzaW9uXTtcbiAgfVxuICBsZXQgQXN5bmNGdW5jdGlvbiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihhc3luYyBmdW5jdGlvbigpIHtcbiAgfSkuY29uc3RydWN0b3I7XG4gIGxldCByaWdodFNpZGVTYWZlRXhwcmVzc2lvbiA9IC9eW1xcblxcc10qaWYuKlxcKC4qXFwpLy50ZXN0KGV4cHJlc3Npb24udHJpbSgpKSB8fCAvXihsZXR8Y29uc3QpXFxzLy50ZXN0KGV4cHJlc3Npb24udHJpbSgpKSA/IGAoYXN5bmMoKT0+eyAke2V4cHJlc3Npb259IH0pKClgIDogZXhwcmVzc2lvbjtcbiAgY29uc3Qgc2FmZUFzeW5jRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBmdW5jMiA9IG5ldyBBc3luY0Z1bmN0aW9uKFxuICAgICAgICBbXCJfX3NlbGZcIiwgXCJzY29wZVwiXSxcbiAgICAgICAgYHdpdGggKHNjb3BlKSB7IF9fc2VsZi5yZXN1bHQgPSAke3JpZ2h0U2lkZVNhZmVFeHByZXNzaW9ufSB9OyBfX3NlbGYuZmluaXNoZWQgPSB0cnVlOyByZXR1cm4gX19zZWxmLnJlc3VsdDtgXG4gICAgICApO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZ1bmMyLCBcIm5hbWVcIiwge1xuICAgICAgICB2YWx1ZTogYFtBbHBpbmVdICR7ZXhwcmVzc2lvbn1gXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmdW5jMjtcbiAgICB9IGNhdGNoIChlcnJvcjIpIHtcbiAgICAgIGhhbmRsZUVycm9yKGVycm9yMiwgZWwsIGV4cHJlc3Npb24pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgfTtcbiAgbGV0IGZ1bmMgPSBzYWZlQXN5bmNGdW5jdGlvbigpO1xuICBldmFsdWF0b3JNZW1vW2V4cHJlc3Npb25dID0gZnVuYztcbiAgcmV0dXJuIGZ1bmM7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUV2YWx1YXRvckZyb21TdHJpbmcoZGF0YVN0YWNrLCBleHByZXNzaW9uLCBlbCkge1xuICBsZXQgZnVuYyA9IGdlbmVyYXRlRnVuY3Rpb25Gcm9tU3RyaW5nKGV4cHJlc3Npb24sIGVsKTtcbiAgcmV0dXJuIChyZWNlaXZlciA9ICgpID0+IHtcbiAgfSwgeyBzY29wZTogc2NvcGUyID0ge30sIHBhcmFtcyA9IFtdIH0gPSB7fSkgPT4ge1xuICAgIGZ1bmMucmVzdWx0ID0gdm9pZCAwO1xuICAgIGZ1bmMuZmluaXNoZWQgPSBmYWxzZTtcbiAgICBsZXQgY29tcGxldGVTY29wZSA9IG1lcmdlUHJveGllcyhbc2NvcGUyLCAuLi5kYXRhU3RhY2tdKTtcbiAgICBpZiAodHlwZW9mIGZ1bmMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgbGV0IHByb21pc2UgPSBmdW5jKGZ1bmMsIGNvbXBsZXRlU2NvcGUpLmNhdGNoKChlcnJvcjIpID0+IGhhbmRsZUVycm9yKGVycm9yMiwgZWwsIGV4cHJlc3Npb24pKTtcbiAgICAgIGlmIChmdW5jLmZpbmlzaGVkKSB7XG4gICAgICAgIHJ1bklmVHlwZU9mRnVuY3Rpb24ocmVjZWl2ZXIsIGZ1bmMucmVzdWx0LCBjb21wbGV0ZVNjb3BlLCBwYXJhbXMsIGVsKTtcbiAgICAgICAgZnVuYy5yZXN1bHQgPSB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIHJ1bklmVHlwZU9mRnVuY3Rpb24ocmVjZWl2ZXIsIHJlc3VsdCwgY29tcGxldGVTY29wZSwgcGFyYW1zLCBlbCk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcjIpID0+IGhhbmRsZUVycm9yKGVycm9yMiwgZWwsIGV4cHJlc3Npb24pKS5maW5hbGx5KCgpID0+IGZ1bmMucmVzdWx0ID0gdm9pZCAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBydW5JZlR5cGVPZkZ1bmN0aW9uKHJlY2VpdmVyLCB2YWx1ZSwgc2NvcGUyLCBwYXJhbXMsIGVsKSB7XG4gIGlmIChzaG91bGRBdXRvRXZhbHVhdGVGdW5jdGlvbnMgJiYgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBsZXQgcmVzdWx0ID0gdmFsdWUuYXBwbHkoc2NvcGUyLCBwYXJhbXMpO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICByZXN1bHQudGhlbigoaSkgPT4gcnVuSWZUeXBlT2ZGdW5jdGlvbihyZWNlaXZlciwgaSwgc2NvcGUyLCBwYXJhbXMpKS5jYXRjaCgoZXJyb3IyKSA9PiBoYW5kbGVFcnJvcihlcnJvcjIsIGVsLCB2YWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWNlaXZlcihyZXN1bHQpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgdmFsdWUudGhlbigoaSkgPT4gcmVjZWl2ZXIoaSkpO1xuICB9IGVsc2Uge1xuICAgIHJlY2VpdmVyKHZhbHVlKTtcbiAgfVxufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy5qc1xudmFyIHByZWZpeEFzU3RyaW5nID0gXCJ4LVwiO1xuZnVuY3Rpb24gcHJlZml4KHN1YmplY3QgPSBcIlwiKSB7XG4gIHJldHVybiBwcmVmaXhBc1N0cmluZyArIHN1YmplY3Q7XG59XG5mdW5jdGlvbiBzZXRQcmVmaXgobmV3UHJlZml4KSB7XG4gIHByZWZpeEFzU3RyaW5nID0gbmV3UHJlZml4O1xufVxudmFyIGRpcmVjdGl2ZUhhbmRsZXJzID0ge307XG5mdW5jdGlvbiBkaXJlY3RpdmUobmFtZSwgY2FsbGJhY2spIHtcbiAgZGlyZWN0aXZlSGFuZGxlcnNbbmFtZV0gPSBjYWxsYmFjaztcbiAgcmV0dXJuIHtcbiAgICBiZWZvcmUoZGlyZWN0aXZlMikge1xuICAgICAgaWYgKCFkaXJlY3RpdmVIYW5kbGVyc1tkaXJlY3RpdmUyXSkge1xuICAgICAgICBjb25zb2xlLndhcm4oU3RyaW5nLnJhd2BDYW5ub3QgZmluZCBkaXJlY3RpdmUgXFxgJHtkaXJlY3RpdmUyfVxcYC4gXFxgJHtuYW1lfVxcYCB3aWxsIHVzZSB0aGUgZGVmYXVsdCBvcmRlciBvZiBleGVjdXRpb25gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcG9zID0gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZihkaXJlY3RpdmUyKTtcbiAgICAgIGRpcmVjdGl2ZU9yZGVyLnNwbGljZShwb3MgPj0gMCA/IHBvcyA6IGRpcmVjdGl2ZU9yZGVyLmluZGV4T2YoXCJERUZBVUxUXCIpLCAwLCBuYW1lKTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBkaXJlY3RpdmVFeGlzdHMobmFtZSkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoZGlyZWN0aXZlSGFuZGxlcnMpLmluY2x1ZGVzKG5hbWUpO1xufVxuZnVuY3Rpb24gZGlyZWN0aXZlcyhlbCwgYXR0cmlidXRlcywgb3JpZ2luYWxBdHRyaWJ1dGVPdmVycmlkZSkge1xuICBhdHRyaWJ1dGVzID0gQXJyYXkuZnJvbShhdHRyaWJ1dGVzKTtcbiAgaWYgKGVsLl94X3ZpcnR1YWxEaXJlY3RpdmVzKSB7XG4gICAgbGV0IHZBdHRyaWJ1dGVzID0gT2JqZWN0LmVudHJpZXMoZWwuX3hfdmlydHVhbERpcmVjdGl2ZXMpLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHsgbmFtZSwgdmFsdWUgfSkpO1xuICAgIGxldCBzdGF0aWNBdHRyaWJ1dGVzID0gYXR0cmlidXRlc09ubHkodkF0dHJpYnV0ZXMpO1xuICAgIHZBdHRyaWJ1dGVzID0gdkF0dHJpYnV0ZXMubWFwKChhdHRyaWJ1dGUpID0+IHtcbiAgICAgIGlmIChzdGF0aWNBdHRyaWJ1dGVzLmZpbmQoKGF0dHIpID0+IGF0dHIubmFtZSA9PT0gYXR0cmlidXRlLm5hbWUpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogYHgtYmluZDoke2F0dHJpYnV0ZS5uYW1lfWAsXG4gICAgICAgICAgdmFsdWU6IGBcIiR7YXR0cmlidXRlLnZhbHVlfVwiYFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF0dHJpYnV0ZTtcbiAgICB9KTtcbiAgICBhdHRyaWJ1dGVzID0gYXR0cmlidXRlcy5jb25jYXQodkF0dHJpYnV0ZXMpO1xuICB9XG4gIGxldCB0cmFuc2Zvcm1lZEF0dHJpYnV0ZU1hcCA9IHt9O1xuICBsZXQgZGlyZWN0aXZlczIgPSBhdHRyaWJ1dGVzLm1hcCh0b1RyYW5zZm9ybWVkQXR0cmlidXRlcygobmV3TmFtZSwgb2xkTmFtZSkgPT4gdHJhbnNmb3JtZWRBdHRyaWJ1dGVNYXBbbmV3TmFtZV0gPSBvbGROYW1lKSkuZmlsdGVyKG91dE5vbkFscGluZUF0dHJpYnV0ZXMpLm1hcCh0b1BhcnNlZERpcmVjdGl2ZXModHJhbnNmb3JtZWRBdHRyaWJ1dGVNYXAsIG9yaWdpbmFsQXR0cmlidXRlT3ZlcnJpZGUpKS5zb3J0KGJ5UHJpb3JpdHkpO1xuICByZXR1cm4gZGlyZWN0aXZlczIubWFwKChkaXJlY3RpdmUyKSA9PiB7XG4gICAgcmV0dXJuIGdldERpcmVjdGl2ZUhhbmRsZXIoZWwsIGRpcmVjdGl2ZTIpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGF0dHJpYnV0ZXNPbmx5KGF0dHJpYnV0ZXMpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oYXR0cmlidXRlcykubWFwKHRvVHJhbnNmb3JtZWRBdHRyaWJ1dGVzKCkpLmZpbHRlcigoYXR0cikgPT4gIW91dE5vbkFscGluZUF0dHJpYnV0ZXMoYXR0cikpO1xufVxudmFyIGlzRGVmZXJyaW5nSGFuZGxlcnMgPSBmYWxzZTtcbnZhciBkaXJlY3RpdmVIYW5kbGVyU3RhY2tzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbnZhciBjdXJyZW50SGFuZGxlclN0YWNrS2V5ID0gU3ltYm9sKCk7XG5mdW5jdGlvbiBkZWZlckhhbmRsaW5nRGlyZWN0aXZlcyhjYWxsYmFjaykge1xuICBpc0RlZmVycmluZ0hhbmRsZXJzID0gdHJ1ZTtcbiAgbGV0IGtleSA9IFN5bWJvbCgpO1xuICBjdXJyZW50SGFuZGxlclN0YWNrS2V5ID0ga2V5O1xuICBkaXJlY3RpdmVIYW5kbGVyU3RhY2tzLnNldChrZXksIFtdKTtcbiAgbGV0IGZsdXNoSGFuZGxlcnMgPSAoKSA9PiB7XG4gICAgd2hpbGUgKGRpcmVjdGl2ZUhhbmRsZXJTdGFja3MuZ2V0KGtleSkubGVuZ3RoKVxuICAgICAgZGlyZWN0aXZlSGFuZGxlclN0YWNrcy5nZXQoa2V5KS5zaGlmdCgpKCk7XG4gICAgZGlyZWN0aXZlSGFuZGxlclN0YWNrcy5kZWxldGUoa2V5KTtcbiAgfTtcbiAgbGV0IHN0b3BEZWZlcnJpbmcgPSAoKSA9PiB7XG4gICAgaXNEZWZlcnJpbmdIYW5kbGVycyA9IGZhbHNlO1xuICAgIGZsdXNoSGFuZGxlcnMoKTtcbiAgfTtcbiAgY2FsbGJhY2soZmx1c2hIYW5kbGVycyk7XG4gIHN0b3BEZWZlcnJpbmcoKTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRCb3VuZFV0aWxpdGllcyhlbCkge1xuICBsZXQgY2xlYW51cHMgPSBbXTtcbiAgbGV0IGNsZWFudXAyID0gKGNhbGxiYWNrKSA9PiBjbGVhbnVwcy5wdXNoKGNhbGxiYWNrKTtcbiAgbGV0IFtlZmZlY3QzLCBjbGVhbnVwRWZmZWN0XSA9IGVsZW1lbnRCb3VuZEVmZmVjdChlbCk7XG4gIGNsZWFudXBzLnB1c2goY2xlYW51cEVmZmVjdCk7XG4gIGxldCB1dGlsaXRpZXMgPSB7XG4gICAgQWxwaW5lOiBhbHBpbmVfZGVmYXVsdCxcbiAgICBlZmZlY3Q6IGVmZmVjdDMsXG4gICAgY2xlYW51cDogY2xlYW51cDIsXG4gICAgZXZhbHVhdGVMYXRlcjogZXZhbHVhdGVMYXRlci5iaW5kKGV2YWx1YXRlTGF0ZXIsIGVsKSxcbiAgICBldmFsdWF0ZTogZXZhbHVhdGUuYmluZChldmFsdWF0ZSwgZWwpXG4gIH07XG4gIGxldCBkb0NsZWFudXAgPSAoKSA9PiBjbGVhbnVwcy5mb3JFYWNoKChpKSA9PiBpKCkpO1xuICByZXR1cm4gW3V0aWxpdGllcywgZG9DbGVhbnVwXTtcbn1cbmZ1bmN0aW9uIGdldERpcmVjdGl2ZUhhbmRsZXIoZWwsIGRpcmVjdGl2ZTIpIHtcbiAgbGV0IG5vb3AgPSAoKSA9PiB7XG4gIH07XG4gIGxldCBoYW5kbGVyNCA9IGRpcmVjdGl2ZUhhbmRsZXJzW2RpcmVjdGl2ZTIudHlwZV0gfHwgbm9vcDtcbiAgbGV0IFt1dGlsaXRpZXMsIGNsZWFudXAyXSA9IGdldEVsZW1lbnRCb3VuZFV0aWxpdGllcyhlbCk7XG4gIG9uQXR0cmlidXRlUmVtb3ZlZChlbCwgZGlyZWN0aXZlMi5vcmlnaW5hbCwgY2xlYW51cDIpO1xuICBsZXQgZnVsbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKGVsLl94X2lnbm9yZSB8fCBlbC5feF9pZ25vcmVTZWxmKVxuICAgICAgcmV0dXJuO1xuICAgIGhhbmRsZXI0LmlubGluZSAmJiBoYW5kbGVyNC5pbmxpbmUoZWwsIGRpcmVjdGl2ZTIsIHV0aWxpdGllcyk7XG4gICAgaGFuZGxlcjQgPSBoYW5kbGVyNC5iaW5kKGhhbmRsZXI0LCBlbCwgZGlyZWN0aXZlMiwgdXRpbGl0aWVzKTtcbiAgICBpc0RlZmVycmluZ0hhbmRsZXJzID8gZGlyZWN0aXZlSGFuZGxlclN0YWNrcy5nZXQoY3VycmVudEhhbmRsZXJTdGFja0tleSkucHVzaChoYW5kbGVyNCkgOiBoYW5kbGVyNCgpO1xuICB9O1xuICBmdWxsSGFuZGxlci5ydW5DbGVhbnVwcyA9IGNsZWFudXAyO1xuICByZXR1cm4gZnVsbEhhbmRsZXI7XG59XG52YXIgc3RhcnRpbmdXaXRoID0gKHN1YmplY3QsIHJlcGxhY2VtZW50KSA9PiAoeyBuYW1lLCB2YWx1ZSB9KSA9PiB7XG4gIGlmIChuYW1lLnN0YXJ0c1dpdGgoc3ViamVjdCkpXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZShzdWJqZWN0LCByZXBsYWNlbWVudCk7XG4gIHJldHVybiB7IG5hbWUsIHZhbHVlIH07XG59O1xudmFyIGludG8gPSAoaSkgPT4gaTtcbmZ1bmN0aW9uIHRvVHJhbnNmb3JtZWRBdHRyaWJ1dGVzKGNhbGxiYWNrID0gKCkgPT4ge1xufSkge1xuICByZXR1cm4gKHsgbmFtZSwgdmFsdWUgfSkgPT4ge1xuICAgIGxldCB7IG5hbWU6IG5ld05hbWUsIHZhbHVlOiBuZXdWYWx1ZSB9ID0gYXR0cmlidXRlVHJhbnNmb3JtZXJzLnJlZHVjZSgoY2FycnksIHRyYW5zZm9ybSkgPT4ge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybShjYXJyeSk7XG4gICAgfSwgeyBuYW1lLCB2YWx1ZSB9KTtcbiAgICBpZiAobmV3TmFtZSAhPT0gbmFtZSlcbiAgICAgIGNhbGxiYWNrKG5ld05hbWUsIG5hbWUpO1xuICAgIHJldHVybiB7IG5hbWU6IG5ld05hbWUsIHZhbHVlOiBuZXdWYWx1ZSB9O1xuICB9O1xufVxudmFyIGF0dHJpYnV0ZVRyYW5zZm9ybWVycyA9IFtdO1xuZnVuY3Rpb24gbWFwQXR0cmlidXRlcyhjYWxsYmFjaykge1xuICBhdHRyaWJ1dGVUcmFuc2Zvcm1lcnMucHVzaChjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBvdXROb25BbHBpbmVBdHRyaWJ1dGVzKHsgbmFtZSB9KSB7XG4gIHJldHVybiBhbHBpbmVBdHRyaWJ1dGVSZWdleCgpLnRlc3QobmFtZSk7XG59XG52YXIgYWxwaW5lQXR0cmlidXRlUmVnZXggPSAoKSA9PiBuZXcgUmVnRXhwKGBeJHtwcmVmaXhBc1N0cmluZ30oW146Xi5dKylcXFxcYmApO1xuZnVuY3Rpb24gdG9QYXJzZWREaXJlY3RpdmVzKHRyYW5zZm9ybWVkQXR0cmlidXRlTWFwLCBvcmlnaW5hbEF0dHJpYnV0ZU92ZXJyaWRlKSB7XG4gIHJldHVybiAoeyBuYW1lLCB2YWx1ZSB9KSA9PiB7XG4gICAgbGV0IHR5cGVNYXRjaCA9IG5hbWUubWF0Y2goYWxwaW5lQXR0cmlidXRlUmVnZXgoKSk7XG4gICAgbGV0IHZhbHVlTWF0Y2ggPSBuYW1lLm1hdGNoKC86KFthLXpBLVowLTlcXC1fOl0rKS8pO1xuICAgIGxldCBtb2RpZmllcnMgPSBuYW1lLm1hdGNoKC9cXC5bXi5cXF1dKyg/PVteXFxdXSokKS9nKSB8fCBbXTtcbiAgICBsZXQgb3JpZ2luYWwgPSBvcmlnaW5hbEF0dHJpYnV0ZU92ZXJyaWRlIHx8IHRyYW5zZm9ybWVkQXR0cmlidXRlTWFwW25hbWVdIHx8IG5hbWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHR5cGVNYXRjaCA/IHR5cGVNYXRjaFsxXSA6IG51bGwsXG4gICAgICB2YWx1ZTogdmFsdWVNYXRjaCA/IHZhbHVlTWF0Y2hbMV0gOiBudWxsLFxuICAgICAgbW9kaWZpZXJzOiBtb2RpZmllcnMubWFwKChpKSA9PiBpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKSxcbiAgICAgIGV4cHJlc3Npb246IHZhbHVlLFxuICAgICAgb3JpZ2luYWxcbiAgICB9O1xuICB9O1xufVxudmFyIERFRkFVTFQgPSBcIkRFRkFVTFRcIjtcbnZhciBkaXJlY3RpdmVPcmRlciA9IFtcbiAgXCJpZ25vcmVcIixcbiAgXCJyZWZcIixcbiAgXCJkYXRhXCIsXG4gIFwiaWRcIixcbiAgXCJhbmNob3JcIixcbiAgXCJiaW5kXCIsXG4gIFwiaW5pdFwiLFxuICBcImZvclwiLFxuICBcIm1vZGVsXCIsXG4gIFwibW9kZWxhYmxlXCIsXG4gIFwidHJhbnNpdGlvblwiLFxuICBcInNob3dcIixcbiAgXCJpZlwiLFxuICBERUZBVUxULFxuICBcInRlbGVwb3J0XCJcbl07XG5mdW5jdGlvbiBieVByaW9yaXR5KGEsIGIpIHtcbiAgbGV0IHR5cGVBID0gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZihhLnR5cGUpID09PSAtMSA/IERFRkFVTFQgOiBhLnR5cGU7XG4gIGxldCB0eXBlQiA9IGRpcmVjdGl2ZU9yZGVyLmluZGV4T2YoYi50eXBlKSA9PT0gLTEgPyBERUZBVUxUIDogYi50eXBlO1xuICByZXR1cm4gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZih0eXBlQSkgLSBkaXJlY3RpdmVPcmRlci5pbmRleE9mKHR5cGVCKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL2Rpc3BhdGNoLmpzXG5mdW5jdGlvbiBkaXNwYXRjaChlbCwgbmFtZSwgZGV0YWlsID0ge30pIHtcbiAgZWwuZGlzcGF0Y2hFdmVudChcbiAgICBuZXcgQ3VzdG9tRXZlbnQobmFtZSwge1xuICAgICAgZGV0YWlsLFxuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIC8vIEFsbG93cyBldmVudHMgdG8gcGFzcyB0aGUgc2hhZG93IERPTSBiYXJyaWVyLlxuICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgfSlcbiAgKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL3dhbGsuanNcbmZ1bmN0aW9uIHdhbGsoZWwsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgU2hhZG93Um9vdCA9PT0gXCJmdW5jdGlvblwiICYmIGVsIGluc3RhbmNlb2YgU2hhZG93Um9vdCkge1xuICAgIEFycmF5LmZyb20oZWwuY2hpbGRyZW4pLmZvckVhY2goKGVsMikgPT4gd2FsayhlbDIsIGNhbGxiYWNrKSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBza2lwID0gZmFsc2U7XG4gIGNhbGxiYWNrKGVsLCAoKSA9PiBza2lwID0gdHJ1ZSk7XG4gIGlmIChza2lwKVxuICAgIHJldHVybjtcbiAgbGV0IG5vZGUgPSBlbC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgd2hpbGUgKG5vZGUpIHtcbiAgICB3YWxrKG5vZGUsIGNhbGxiYWNrLCBmYWxzZSk7XG4gICAgbm9kZSA9IG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICB9XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy91dGlscy93YXJuLmpzXG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UsIC4uLmFyZ3MpIHtcbiAgY29uc29sZS53YXJuKGBBbHBpbmUgV2FybmluZzogJHttZXNzYWdlfWAsIC4uLmFyZ3MpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbGlmZWN5Y2xlLmpzXG52YXIgc3RhcnRlZCA9IGZhbHNlO1xuZnVuY3Rpb24gc3RhcnQoKSB7XG4gIGlmIChzdGFydGVkKVxuICAgIHdhcm4oXCJBbHBpbmUgaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZCBvbiB0aGlzIHBhZ2UuIENhbGxpbmcgQWxwaW5lLnN0YXJ0KCkgbW9yZSB0aGFuIG9uY2UgY2FuIGNhdXNlIHByb2JsZW1zLlwiKTtcbiAgc3RhcnRlZCA9IHRydWU7XG4gIGlmICghZG9jdW1lbnQuYm9keSlcbiAgICB3YXJuKFwiVW5hYmxlIHRvIGluaXRpYWxpemUuIFRyeWluZyB0byBsb2FkIEFscGluZSBiZWZvcmUgYDxib2R5PmAgaXMgYXZhaWxhYmxlLiBEaWQgeW91IGZvcmdldCB0byBhZGQgYGRlZmVyYCBpbiBBbHBpbmUncyBgPHNjcmlwdD5gIHRhZz9cIik7XG4gIGRpc3BhdGNoKGRvY3VtZW50LCBcImFscGluZTppbml0XCIpO1xuICBkaXNwYXRjaChkb2N1bWVudCwgXCJhbHBpbmU6aW5pdGlhbGl6aW5nXCIpO1xuICBzdGFydE9ic2VydmluZ011dGF0aW9ucygpO1xuICBvbkVsQWRkZWQoKGVsKSA9PiBpbml0VHJlZShlbCwgd2FsaykpO1xuICBvbkVsUmVtb3ZlZCgoZWwpID0+IGRlc3Ryb3lUcmVlKGVsKSk7XG4gIG9uQXR0cmlidXRlc0FkZGVkKChlbCwgYXR0cnMpID0+IHtcbiAgICBkaXJlY3RpdmVzKGVsLCBhdHRycykuZm9yRWFjaCgoaGFuZGxlKSA9PiBoYW5kbGUoKSk7XG4gIH0pO1xuICBsZXQgb3V0TmVzdGVkQ29tcG9uZW50cyA9IChlbCkgPT4gIWNsb3Nlc3RSb290KGVsLnBhcmVudEVsZW1lbnQsIHRydWUpO1xuICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYWxsU2VsZWN0b3JzKCkuam9pbihcIixcIikpKS5maWx0ZXIob3V0TmVzdGVkQ29tcG9uZW50cykuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBpbml0VHJlZShlbCk7XG4gIH0pO1xuICBkaXNwYXRjaChkb2N1bWVudCwgXCJhbHBpbmU6aW5pdGlhbGl6ZWRcIik7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHdhcm5BYm91dE1pc3NpbmdQbHVnaW5zKCk7XG4gIH0pO1xufVxudmFyIHJvb3RTZWxlY3RvckNhbGxiYWNrcyA9IFtdO1xudmFyIGluaXRTZWxlY3RvckNhbGxiYWNrcyA9IFtdO1xuZnVuY3Rpb24gcm9vdFNlbGVjdG9ycygpIHtcbiAgcmV0dXJuIHJvb3RTZWxlY3RvckNhbGxiYWNrcy5tYXAoKGZuKSA9PiBmbigpKTtcbn1cbmZ1bmN0aW9uIGFsbFNlbGVjdG9ycygpIHtcbiAgcmV0dXJuIHJvb3RTZWxlY3RvckNhbGxiYWNrcy5jb25jYXQoaW5pdFNlbGVjdG9yQ2FsbGJhY2tzKS5tYXAoKGZuKSA9PiBmbigpKTtcbn1cbmZ1bmN0aW9uIGFkZFJvb3RTZWxlY3RvcihzZWxlY3RvckNhbGxiYWNrKSB7XG4gIHJvb3RTZWxlY3RvckNhbGxiYWNrcy5wdXNoKHNlbGVjdG9yQ2FsbGJhY2spO1xufVxuZnVuY3Rpb24gYWRkSW5pdFNlbGVjdG9yKHNlbGVjdG9yQ2FsbGJhY2spIHtcbiAgaW5pdFNlbGVjdG9yQ2FsbGJhY2tzLnB1c2goc2VsZWN0b3JDYWxsYmFjayk7XG59XG5mdW5jdGlvbiBjbG9zZXN0Um9vdChlbCwgaW5jbHVkZUluaXRTZWxlY3RvcnMgPSBmYWxzZSkge1xuICByZXR1cm4gZmluZENsb3Nlc3QoZWwsIChlbGVtZW50KSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gaW5jbHVkZUluaXRTZWxlY3RvcnMgPyBhbGxTZWxlY3RvcnMoKSA6IHJvb3RTZWxlY3RvcnMoKTtcbiAgICBpZiAoc2VsZWN0b3JzLnNvbWUoKHNlbGVjdG9yKSA9PiBlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSlcbiAgICAgIHJldHVybiB0cnVlO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGZpbmRDbG9zZXN0KGVsLCBjYWxsYmFjaykge1xuICBpZiAoIWVsKVxuICAgIHJldHVybjtcbiAgaWYgKGNhbGxiYWNrKGVsKSlcbiAgICByZXR1cm4gZWw7XG4gIGlmIChlbC5feF90ZWxlcG9ydEJhY2spXG4gICAgZWwgPSBlbC5feF90ZWxlcG9ydEJhY2s7XG4gIGlmICghZWwucGFyZW50RWxlbWVudClcbiAgICByZXR1cm47XG4gIHJldHVybiBmaW5kQ2xvc2VzdChlbC5wYXJlbnRFbGVtZW50LCBjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBpc1Jvb3QoZWwpIHtcbiAgcmV0dXJuIHJvb3RTZWxlY3RvcnMoKS5zb21lKChzZWxlY3RvcikgPT4gZWwubWF0Y2hlcyhzZWxlY3RvcikpO1xufVxudmFyIGluaXRJbnRlcmNlcHRvcnMyID0gW107XG5mdW5jdGlvbiBpbnRlcmNlcHRJbml0KGNhbGxiYWNrKSB7XG4gIGluaXRJbnRlcmNlcHRvcnMyLnB1c2goY2FsbGJhY2spO1xufVxudmFyIG1hcmtlckRpc3BlbnNlciA9IDE7XG5mdW5jdGlvbiBpbml0VHJlZShlbCwgd2Fsa2VyID0gd2FsaywgaW50ZXJjZXB0ID0gKCkgPT4ge1xufSkge1xuICBpZiAoZmluZENsb3Nlc3QoZWwsIChpKSA9PiBpLl94X2lnbm9yZSkpXG4gICAgcmV0dXJuO1xuICBkZWZlckhhbmRsaW5nRGlyZWN0aXZlcygoKSA9PiB7XG4gICAgd2Fsa2VyKGVsLCAoZWwyLCBza2lwKSA9PiB7XG4gICAgICBpZiAoZWwyLl94X21hcmtlcilcbiAgICAgICAgcmV0dXJuO1xuICAgICAgaW50ZXJjZXB0KGVsMiwgc2tpcCk7XG4gICAgICBpbml0SW50ZXJjZXB0b3JzMi5mb3JFYWNoKChpKSA9PiBpKGVsMiwgc2tpcCkpO1xuICAgICAgZGlyZWN0aXZlcyhlbDIsIGVsMi5hdHRyaWJ1dGVzKS5mb3JFYWNoKChoYW5kbGUpID0+IGhhbmRsZSgpKTtcbiAgICAgIGlmICghZWwyLl94X2lnbm9yZSlcbiAgICAgICAgZWwyLl94X21hcmtlciA9IG1hcmtlckRpc3BlbnNlcisrO1xuICAgICAgZWwyLl94X2lnbm9yZSAmJiBza2lwKCk7XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZGVzdHJveVRyZWUocm9vdCwgd2Fsa2VyID0gd2Fsaykge1xuICB3YWxrZXIocm9vdCwgKGVsKSA9PiB7XG4gICAgY2xlYW51cEVsZW1lbnQoZWwpO1xuICAgIGNsZWFudXBBdHRyaWJ1dGVzKGVsKTtcbiAgICBkZWxldGUgZWwuX3hfbWFya2VyO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHdhcm5BYm91dE1pc3NpbmdQbHVnaW5zKCkge1xuICBsZXQgcGx1Z2luRGlyZWN0aXZlcyA9IFtcbiAgICBbXCJ1aVwiLCBcImRpYWxvZ1wiLCBbXCJbeC1kaWFsb2ddLCBbeC1wb3BvdmVyXVwiXV0sXG4gICAgW1wiYW5jaG9yXCIsIFwiYW5jaG9yXCIsIFtcIlt4LWFuY2hvcl1cIl1dLFxuICAgIFtcInNvcnRcIiwgXCJzb3J0XCIsIFtcIlt4LXNvcnRdXCJdXVxuICBdO1xuICBwbHVnaW5EaXJlY3RpdmVzLmZvckVhY2goKFtwbHVnaW4yLCBkaXJlY3RpdmUyLCBzZWxlY3RvcnNdKSA9PiB7XG4gICAgaWYgKGRpcmVjdGl2ZUV4aXN0cyhkaXJlY3RpdmUyKSlcbiAgICAgIHJldHVybjtcbiAgICBzZWxlY3RvcnMuc29tZSgoc2VsZWN0b3IpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkge1xuICAgICAgICB3YXJuKGBmb3VuZCBcIiR7c2VsZWN0b3J9XCIsIGJ1dCBtaXNzaW5nICR7cGx1Z2luMn0gcGx1Z2luYCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL25leHRUaWNrLmpzXG52YXIgdGlja1N0YWNrID0gW107XG52YXIgaXNIb2xkaW5nID0gZmFsc2U7XG5mdW5jdGlvbiBuZXh0VGljayhjYWxsYmFjayA9ICgpID0+IHtcbn0pIHtcbiAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgIGlzSG9sZGluZyB8fCBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlbGVhc2VOZXh0VGlja3MoKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgdGlja1N0YWNrLnB1c2goKCkgPT4ge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICAgIHJlcygpO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJlbGVhc2VOZXh0VGlja3MoKSB7XG4gIGlzSG9sZGluZyA9IGZhbHNlO1xuICB3aGlsZSAodGlja1N0YWNrLmxlbmd0aClcbiAgICB0aWNrU3RhY2suc2hpZnQoKSgpO1xufVxuZnVuY3Rpb24gaG9sZE5leHRUaWNrcygpIHtcbiAgaXNIb2xkaW5nID0gdHJ1ZTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL2NsYXNzZXMuanNcbmZ1bmN0aW9uIHNldENsYXNzZXMoZWwsIHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBzZXRDbGFzc2VzRnJvbVN0cmluZyhlbCwgdmFsdWUuam9pbihcIiBcIikpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBzZXRDbGFzc2VzRnJvbU9iamVjdChlbCwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHNldENsYXNzZXMoZWwsIHZhbHVlKCkpO1xuICB9XG4gIHJldHVybiBzZXRDbGFzc2VzRnJvbVN0cmluZyhlbCwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0Q2xhc3Nlc0Zyb21TdHJpbmcoZWwsIGNsYXNzU3RyaW5nKSB7XG4gIGxldCBzcGxpdCA9IChjbGFzc1N0cmluZzIpID0+IGNsYXNzU3RyaW5nMi5zcGxpdChcIiBcIikuZmlsdGVyKEJvb2xlYW4pO1xuICBsZXQgbWlzc2luZ0NsYXNzZXMgPSAoY2xhc3NTdHJpbmcyKSA9PiBjbGFzc1N0cmluZzIuc3BsaXQoXCIgXCIpLmZpbHRlcigoaSkgPT4gIWVsLmNsYXNzTGlzdC5jb250YWlucyhpKSkuZmlsdGVyKEJvb2xlYW4pO1xuICBsZXQgYWRkQ2xhc3Nlc0FuZFJldHVyblVuZG8gPSAoY2xhc3NlcykgPT4ge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlcyk7XG4gICAgfTtcbiAgfTtcbiAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyA9PT0gdHJ1ZSA/IGNsYXNzU3RyaW5nID0gXCJcIiA6IGNsYXNzU3RyaW5nIHx8IFwiXCI7XG4gIHJldHVybiBhZGRDbGFzc2VzQW5kUmV0dXJuVW5kbyhtaXNzaW5nQ2xhc3NlcyhjbGFzc1N0cmluZykpO1xufVxuZnVuY3Rpb24gc2V0Q2xhc3Nlc0Zyb21PYmplY3QoZWwsIGNsYXNzT2JqZWN0KSB7XG4gIGxldCBzcGxpdCA9IChjbGFzc1N0cmluZykgPT4gY2xhc3NTdHJpbmcuc3BsaXQoXCIgXCIpLmZpbHRlcihCb29sZWFuKTtcbiAgbGV0IGZvckFkZCA9IE9iamVjdC5lbnRyaWVzKGNsYXNzT2JqZWN0KS5mbGF0TWFwKChbY2xhc3NTdHJpbmcsIGJvb2xdKSA9PiBib29sID8gc3BsaXQoY2xhc3NTdHJpbmcpIDogZmFsc2UpLmZpbHRlcihCb29sZWFuKTtcbiAgbGV0IGZvclJlbW92ZSA9IE9iamVjdC5lbnRyaWVzKGNsYXNzT2JqZWN0KS5mbGF0TWFwKChbY2xhc3NTdHJpbmcsIGJvb2xdKSA9PiAhYm9vbCA/IHNwbGl0KGNsYXNzU3RyaW5nKSA6IGZhbHNlKS5maWx0ZXIoQm9vbGVhbik7XG4gIGxldCBhZGRlZCA9IFtdO1xuICBsZXQgcmVtb3ZlZCA9IFtdO1xuICBmb3JSZW1vdmUuZm9yRWFjaCgoaSkgPT4ge1xuICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoaSkpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoaSk7XG4gICAgICByZW1vdmVkLnB1c2goaSk7XG4gICAgfVxuICB9KTtcbiAgZm9yQWRkLmZvckVhY2goKGkpID0+IHtcbiAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucyhpKSkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChpKTtcbiAgICAgIGFkZGVkLnB1c2goaSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICByZW1vdmVkLmZvckVhY2goKGkpID0+IGVsLmNsYXNzTGlzdC5hZGQoaSkpO1xuICAgIGFkZGVkLmZvckVhY2goKGkpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoaSkpO1xuICB9O1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvc3R5bGVzLmpzXG5mdW5jdGlvbiBzZXRTdHlsZXMoZWwsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICByZXR1cm4gc2V0U3R5bGVzRnJvbU9iamVjdChlbCwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBzZXRTdHlsZXNGcm9tU3RyaW5nKGVsLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBzZXRTdHlsZXNGcm9tT2JqZWN0KGVsLCB2YWx1ZSkge1xuICBsZXQgcHJldmlvdXNTdHlsZXMgPSB7fTtcbiAgT2JqZWN0LmVudHJpZXModmFsdWUpLmZvckVhY2goKFtrZXksIHZhbHVlMl0pID0+IHtcbiAgICBwcmV2aW91c1N0eWxlc1trZXldID0gZWwuc3R5bGVba2V5XTtcbiAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIGtleSA9IGtlYmFiQ2FzZShrZXkpO1xuICAgIH1cbiAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlMik7XG4gIH0pO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoZWwuc3R5bGUubGVuZ3RoID09PSAwKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHNldFN0eWxlcyhlbCwgcHJldmlvdXNTdHlsZXMpO1xuICB9O1xufVxuZnVuY3Rpb24gc2V0U3R5bGVzRnJvbVN0cmluZyhlbCwgdmFsdWUpIHtcbiAgbGV0IGNhY2hlID0gZWwuZ2V0QXR0cmlidXRlKFwic3R5bGVcIiwgdmFsdWUpO1xuICBlbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCB2YWx1ZSk7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgZWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgY2FjaGUgfHwgXCJcIik7XG4gIH07XG59XG5mdW5jdGlvbiBrZWJhYkNhc2Uoc3ViamVjdCkge1xuICByZXR1cm4gc3ViamVjdC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCBcIiQxLSQyXCIpLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy91dGlscy9vbmNlLmpzXG5mdW5jdGlvbiBvbmNlKGNhbGxiYWNrLCBmYWxsYmFjayA9ICgpID0+IHtcbn0pIHtcbiAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC10cmFuc2l0aW9uLmpzXG5kaXJlY3RpdmUoXCJ0cmFuc2l0aW9uXCIsIChlbCwgeyB2YWx1ZSwgbW9kaWZpZXJzLCBleHByZXNzaW9uIH0sIHsgZXZhbHVhdGU6IGV2YWx1YXRlMiB9KSA9PiB7XG4gIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gXCJmdW5jdGlvblwiKVxuICAgIGV4cHJlc3Npb24gPSBldmFsdWF0ZTIoZXhwcmVzc2lvbik7XG4gIGlmIChleHByZXNzaW9uID09PSBmYWxzZSlcbiAgICByZXR1cm47XG4gIGlmICghZXhwcmVzc2lvbiB8fCB0eXBlb2YgZXhwcmVzc2lvbiA9PT0gXCJib29sZWFuXCIpIHtcbiAgICByZWdpc3RlclRyYW5zaXRpb25zRnJvbUhlbHBlcihlbCwgbW9kaWZpZXJzLCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVnaXN0ZXJUcmFuc2l0aW9uc0Zyb21DbGFzc1N0cmluZyhlbCwgZXhwcmVzc2lvbiwgdmFsdWUpO1xuICB9XG59KTtcbmZ1bmN0aW9uIHJlZ2lzdGVyVHJhbnNpdGlvbnNGcm9tQ2xhc3NTdHJpbmcoZWwsIGNsYXNzU3RyaW5nLCBzdGFnZSkge1xuICByZWdpc3RlclRyYW5zaXRpb25PYmplY3QoZWwsIHNldENsYXNzZXMsIFwiXCIpO1xuICBsZXQgZGlyZWN0aXZlU3RvcmFnZU1hcCA9IHtcbiAgICBcImVudGVyXCI6IChjbGFzc2VzKSA9PiB7XG4gICAgICBlbC5feF90cmFuc2l0aW9uLmVudGVyLmR1cmluZyA9IGNsYXNzZXM7XG4gICAgfSxcbiAgICBcImVudGVyLXN0YXJ0XCI6IChjbGFzc2VzKSA9PiB7XG4gICAgICBlbC5feF90cmFuc2l0aW9uLmVudGVyLnN0YXJ0ID0gY2xhc3NlcztcbiAgICB9LFxuICAgIFwiZW50ZXItZW5kXCI6IChjbGFzc2VzKSA9PiB7XG4gICAgICBlbC5feF90cmFuc2l0aW9uLmVudGVyLmVuZCA9IGNsYXNzZXM7XG4gICAgfSxcbiAgICBcImxlYXZlXCI6IChjbGFzc2VzKSA9PiB7XG4gICAgICBlbC5feF90cmFuc2l0aW9uLmxlYXZlLmR1cmluZyA9IGNsYXNzZXM7XG4gICAgfSxcbiAgICBcImxlYXZlLXN0YXJ0XCI6IChjbGFzc2VzKSA9PiB7XG4gICAgICBlbC5feF90cmFuc2l0aW9uLmxlYXZlLnN0YXJ0ID0gY2xhc3NlcztcbiAgICB9LFxuICAgIFwibGVhdmUtZW5kXCI6IChjbGFzc2VzKSA9PiB7XG4gICAgICBlbC5feF90cmFuc2l0aW9uLmxlYXZlLmVuZCA9IGNsYXNzZXM7XG4gICAgfVxuICB9O1xuICBkaXJlY3RpdmVTdG9yYWdlTWFwW3N0YWdlXShjbGFzc1N0cmluZyk7XG59XG5mdW5jdGlvbiByZWdpc3RlclRyYW5zaXRpb25zRnJvbUhlbHBlcihlbCwgbW9kaWZpZXJzLCBzdGFnZSkge1xuICByZWdpc3RlclRyYW5zaXRpb25PYmplY3QoZWwsIHNldFN0eWxlcyk7XG4gIGxldCBkb2VzbnRTcGVjaWZ5ID0gIW1vZGlmaWVycy5pbmNsdWRlcyhcImluXCIpICYmICFtb2RpZmllcnMuaW5jbHVkZXMoXCJvdXRcIikgJiYgIXN0YWdlO1xuICBsZXQgdHJhbnNpdGlvbmluZ0luID0gZG9lc250U3BlY2lmeSB8fCBtb2RpZmllcnMuaW5jbHVkZXMoXCJpblwiKSB8fCBbXCJlbnRlclwiXS5pbmNsdWRlcyhzdGFnZSk7XG4gIGxldCB0cmFuc2l0aW9uaW5nT3V0ID0gZG9lc250U3BlY2lmeSB8fCBtb2RpZmllcnMuaW5jbHVkZXMoXCJvdXRcIikgfHwgW1wibGVhdmVcIl0uaW5jbHVkZXMoc3RhZ2UpO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiaW5cIikgJiYgIWRvZXNudFNwZWNpZnkpIHtcbiAgICBtb2RpZmllcnMgPSBtb2RpZmllcnMuZmlsdGVyKChpLCBpbmRleCkgPT4gaW5kZXggPCBtb2RpZmllcnMuaW5kZXhPZihcIm91dFwiKSk7XG4gIH1cbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcIm91dFwiKSAmJiAhZG9lc250U3BlY2lmeSkge1xuICAgIG1vZGlmaWVycyA9IG1vZGlmaWVycy5maWx0ZXIoKGksIGluZGV4KSA9PiBpbmRleCA+IG1vZGlmaWVycy5pbmRleE9mKFwib3V0XCIpKTtcbiAgfVxuICBsZXQgd2FudHNBbGwgPSAhbW9kaWZpZXJzLmluY2x1ZGVzKFwib3BhY2l0eVwiKSAmJiAhbW9kaWZpZXJzLmluY2x1ZGVzKFwic2NhbGVcIik7XG4gIGxldCB3YW50c09wYWNpdHkgPSB3YW50c0FsbCB8fCBtb2RpZmllcnMuaW5jbHVkZXMoXCJvcGFjaXR5XCIpO1xuICBsZXQgd2FudHNTY2FsZSA9IHdhbnRzQWxsIHx8IG1vZGlmaWVycy5pbmNsdWRlcyhcInNjYWxlXCIpO1xuICBsZXQgb3BhY2l0eVZhbHVlID0gd2FudHNPcGFjaXR5ID8gMCA6IDE7XG4gIGxldCBzY2FsZVZhbHVlID0gd2FudHNTY2FsZSA/IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCBcInNjYWxlXCIsIDk1KSAvIDEwMCA6IDE7XG4gIGxldCBkZWxheSA9IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCBcImRlbGF5XCIsIDApIC8gMWUzO1xuICBsZXQgb3JpZ2luID0gbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsIFwib3JpZ2luXCIsIFwiY2VudGVyXCIpO1xuICBsZXQgcHJvcGVydHkgPSBcIm9wYWNpdHksIHRyYW5zZm9ybVwiO1xuICBsZXQgZHVyYXRpb25JbiA9IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCBcImR1cmF0aW9uXCIsIDE1MCkgLyAxZTM7XG4gIGxldCBkdXJhdGlvbk91dCA9IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCBcImR1cmF0aW9uXCIsIDc1KSAvIDFlMztcbiAgbGV0IGVhc2luZyA9IGBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSlgO1xuICBpZiAodHJhbnNpdGlvbmluZ0luKSB7XG4gICAgZWwuX3hfdHJhbnNpdGlvbi5lbnRlci5kdXJpbmcgPSB7XG4gICAgICB0cmFuc2Zvcm1PcmlnaW46IG9yaWdpbixcbiAgICAgIHRyYW5zaXRpb25EZWxheTogYCR7ZGVsYXl9c2AsXG4gICAgICB0cmFuc2l0aW9uUHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBgJHtkdXJhdGlvbklufXNgLFxuICAgICAgdHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uOiBlYXNpbmdcbiAgICB9O1xuICAgIGVsLl94X3RyYW5zaXRpb24uZW50ZXIuc3RhcnQgPSB7XG4gICAgICBvcGFjaXR5OiBvcGFjaXR5VmFsdWUsXG4gICAgICB0cmFuc2Zvcm06IGBzY2FsZSgke3NjYWxlVmFsdWV9KWBcbiAgICB9O1xuICAgIGVsLl94X3RyYW5zaXRpb24uZW50ZXIuZW5kID0ge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIHRyYW5zZm9ybTogYHNjYWxlKDEpYFxuICAgIH07XG4gIH1cbiAgaWYgKHRyYW5zaXRpb25pbmdPdXQpIHtcbiAgICBlbC5feF90cmFuc2l0aW9uLmxlYXZlLmR1cmluZyA9IHtcbiAgICAgIHRyYW5zZm9ybU9yaWdpbjogb3JpZ2luLFxuICAgICAgdHJhbnNpdGlvbkRlbGF5OiBgJHtkZWxheX1zYCxcbiAgICAgIHRyYW5zaXRpb25Qcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb246IGAke2R1cmF0aW9uT3V0fXNgLFxuICAgICAgdHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uOiBlYXNpbmdcbiAgICB9O1xuICAgIGVsLl94X3RyYW5zaXRpb24ubGVhdmUuc3RhcnQgPSB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgdHJhbnNmb3JtOiBgc2NhbGUoMSlgXG4gICAgfTtcbiAgICBlbC5feF90cmFuc2l0aW9uLmxlYXZlLmVuZCA9IHtcbiAgICAgIG9wYWNpdHk6IG9wYWNpdHlWYWx1ZSxcbiAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7c2NhbGVWYWx1ZX0pYFxuICAgIH07XG4gIH1cbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyVHJhbnNpdGlvbk9iamVjdChlbCwgc2V0RnVuY3Rpb24sIGRlZmF1bHRWYWx1ZSA9IHt9KSB7XG4gIGlmICghZWwuX3hfdHJhbnNpdGlvbilcbiAgICBlbC5feF90cmFuc2l0aW9uID0ge1xuICAgICAgZW50ZXI6IHsgZHVyaW5nOiBkZWZhdWx0VmFsdWUsIHN0YXJ0OiBkZWZhdWx0VmFsdWUsIGVuZDogZGVmYXVsdFZhbHVlIH0sXG4gICAgICBsZWF2ZTogeyBkdXJpbmc6IGRlZmF1bHRWYWx1ZSwgc3RhcnQ6IGRlZmF1bHRWYWx1ZSwgZW5kOiBkZWZhdWx0VmFsdWUgfSxcbiAgICAgIGluKGJlZm9yZSA9ICgpID0+IHtcbiAgICAgIH0sIGFmdGVyID0gKCkgPT4ge1xuICAgICAgfSkge1xuICAgICAgICB0cmFuc2l0aW9uKGVsLCBzZXRGdW5jdGlvbiwge1xuICAgICAgICAgIGR1cmluZzogdGhpcy5lbnRlci5kdXJpbmcsXG4gICAgICAgICAgc3RhcnQ6IHRoaXMuZW50ZXIuc3RhcnQsXG4gICAgICAgICAgZW5kOiB0aGlzLmVudGVyLmVuZFxuICAgICAgICB9LCBiZWZvcmUsIGFmdGVyKTtcbiAgICAgIH0sXG4gICAgICBvdXQoYmVmb3JlID0gKCkgPT4ge1xuICAgICAgfSwgYWZ0ZXIgPSAoKSA9PiB7XG4gICAgICB9KSB7XG4gICAgICAgIHRyYW5zaXRpb24oZWwsIHNldEZ1bmN0aW9uLCB7XG4gICAgICAgICAgZHVyaW5nOiB0aGlzLmxlYXZlLmR1cmluZyxcbiAgICAgICAgICBzdGFydDogdGhpcy5sZWF2ZS5zdGFydCxcbiAgICAgICAgICBlbmQ6IHRoaXMubGVhdmUuZW5kXG4gICAgICAgIH0sIGJlZm9yZSwgYWZ0ZXIpO1xuICAgICAgfVxuICAgIH07XG59XG53aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuX3hfdG9nZ2xlQW5kQ2FzY2FkZVdpdGhUcmFuc2l0aW9ucyA9IGZ1bmN0aW9uKGVsLCB2YWx1ZSwgc2hvdywgaGlkZSkge1xuICBjb25zdCBuZXh0VGljazIgPSBkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09IFwidmlzaWJsZVwiID8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIDogc2V0VGltZW91dDtcbiAgbGV0IGNsaWNrQXdheUNvbXBhdGlibGVTaG93ID0gKCkgPT4gbmV4dFRpY2syKHNob3cpO1xuICBpZiAodmFsdWUpIHtcbiAgICBpZiAoZWwuX3hfdHJhbnNpdGlvbiAmJiAoZWwuX3hfdHJhbnNpdGlvbi5lbnRlciB8fCBlbC5feF90cmFuc2l0aW9uLmxlYXZlKSkge1xuICAgICAgZWwuX3hfdHJhbnNpdGlvbi5lbnRlciAmJiAoT2JqZWN0LmVudHJpZXMoZWwuX3hfdHJhbnNpdGlvbi5lbnRlci5kdXJpbmcpLmxlbmd0aCB8fCBPYmplY3QuZW50cmllcyhlbC5feF90cmFuc2l0aW9uLmVudGVyLnN0YXJ0KS5sZW5ndGggfHwgT2JqZWN0LmVudHJpZXMoZWwuX3hfdHJhbnNpdGlvbi5lbnRlci5lbmQpLmxlbmd0aCkgPyBlbC5feF90cmFuc2l0aW9uLmluKHNob3cpIDogY2xpY2tBd2F5Q29tcGF0aWJsZVNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuX3hfdHJhbnNpdGlvbiA/IGVsLl94X3RyYW5zaXRpb24uaW4oc2hvdykgOiBjbGlja0F3YXlDb21wYXRpYmxlU2hvdygpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgZWwuX3hfaGlkZVByb21pc2UgPSBlbC5feF90cmFuc2l0aW9uID8gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGVsLl94X3RyYW5zaXRpb24ub3V0KCgpID0+IHtcbiAgICB9LCAoKSA9PiByZXNvbHZlKGhpZGUpKTtcbiAgICBlbC5feF90cmFuc2l0aW9uaW5nICYmIGVsLl94X3RyYW5zaXRpb25pbmcuYmVmb3JlQ2FuY2VsKCgpID0+IHJlamVjdCh7IGlzRnJvbUNhbmNlbGxlZFRyYW5zaXRpb246IHRydWUgfSkpO1xuICB9KSA6IFByb21pc2UucmVzb2x2ZShoaWRlKTtcbiAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgIGxldCBjbG9zZXN0ID0gY2xvc2VzdEhpZGUoZWwpO1xuICAgIGlmIChjbG9zZXN0KSB7XG4gICAgICBpZiAoIWNsb3Nlc3QuX3hfaGlkZUNoaWxkcmVuKVxuICAgICAgICBjbG9zZXN0Ll94X2hpZGVDaGlsZHJlbiA9IFtdO1xuICAgICAgY2xvc2VzdC5feF9oaWRlQ2hpbGRyZW4ucHVzaChlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRUaWNrMigoKSA9PiB7XG4gICAgICAgIGxldCBoaWRlQWZ0ZXJDaGlsZHJlbiA9IChlbDIpID0+IHtcbiAgICAgICAgICBsZXQgY2FycnkgPSBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBlbDIuX3hfaGlkZVByb21pc2UsXG4gICAgICAgICAgICAuLi4oZWwyLl94X2hpZGVDaGlsZHJlbiB8fCBbXSkubWFwKGhpZGVBZnRlckNoaWxkcmVuKVxuICAgICAgICAgIF0pLnRoZW4oKFtpXSkgPT4gaT8uKCkpO1xuICAgICAgICAgIGRlbGV0ZSBlbDIuX3hfaGlkZVByb21pc2U7XG4gICAgICAgICAgZGVsZXRlIGVsMi5feF9oaWRlQ2hpbGRyZW47XG4gICAgICAgICAgcmV0dXJuIGNhcnJ5O1xuICAgICAgICB9O1xuICAgICAgICBoaWRlQWZ0ZXJDaGlsZHJlbihlbCkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICBpZiAoIWUuaXNGcm9tQ2FuY2VsbGVkVHJhbnNpdGlvbilcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5mdW5jdGlvbiBjbG9zZXN0SGlkZShlbCkge1xuICBsZXQgcGFyZW50ID0gZWwucGFyZW50Tm9kZTtcbiAgaWYgKCFwYXJlbnQpXG4gICAgcmV0dXJuO1xuICByZXR1cm4gcGFyZW50Ll94X2hpZGVQcm9taXNlID8gcGFyZW50IDogY2xvc2VzdEhpZGUocGFyZW50KTtcbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb24oZWwsIHNldEZ1bmN0aW9uLCB7IGR1cmluZywgc3RhcnQ6IHN0YXJ0MiwgZW5kIH0gPSB7fSwgYmVmb3JlID0gKCkgPT4ge1xufSwgYWZ0ZXIgPSAoKSA9PiB7XG59KSB7XG4gIGlmIChlbC5feF90cmFuc2l0aW9uaW5nKVxuICAgIGVsLl94X3RyYW5zaXRpb25pbmcuY2FuY2VsKCk7XG4gIGlmIChPYmplY3Qua2V5cyhkdXJpbmcpLmxlbmd0aCA9PT0gMCAmJiBPYmplY3Qua2V5cyhzdGFydDIpLmxlbmd0aCA9PT0gMCAmJiBPYmplY3Qua2V5cyhlbmQpLmxlbmd0aCA9PT0gMCkge1xuICAgIGJlZm9yZSgpO1xuICAgIGFmdGVyKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCB1bmRvU3RhcnQsIHVuZG9EdXJpbmcsIHVuZG9FbmQ7XG4gIHBlcmZvcm1UcmFuc2l0aW9uKGVsLCB7XG4gICAgc3RhcnQoKSB7XG4gICAgICB1bmRvU3RhcnQgPSBzZXRGdW5jdGlvbihlbCwgc3RhcnQyKTtcbiAgICB9LFxuICAgIGR1cmluZygpIHtcbiAgICAgIHVuZG9EdXJpbmcgPSBzZXRGdW5jdGlvbihlbCwgZHVyaW5nKTtcbiAgICB9LFxuICAgIGJlZm9yZSxcbiAgICBlbmQoKSB7XG4gICAgICB1bmRvU3RhcnQoKTtcbiAgICAgIHVuZG9FbmQgPSBzZXRGdW5jdGlvbihlbCwgZW5kKTtcbiAgICB9LFxuICAgIGFmdGVyLFxuICAgIGNsZWFudXAoKSB7XG4gICAgICB1bmRvRHVyaW5nKCk7XG4gICAgICB1bmRvRW5kKCk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIHBlcmZvcm1UcmFuc2l0aW9uKGVsLCBzdGFnZXMpIHtcbiAgbGV0IGludGVycnVwdGVkLCByZWFjaGVkQmVmb3JlLCByZWFjaGVkRW5kO1xuICBsZXQgZmluaXNoID0gb25jZSgoKSA9PiB7XG4gICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgIGludGVycnVwdGVkID0gdHJ1ZTtcbiAgICAgIGlmICghcmVhY2hlZEJlZm9yZSlcbiAgICAgICAgc3RhZ2VzLmJlZm9yZSgpO1xuICAgICAgaWYgKCFyZWFjaGVkRW5kKSB7XG4gICAgICAgIHN0YWdlcy5lbmQoKTtcbiAgICAgICAgcmVsZWFzZU5leHRUaWNrcygpO1xuICAgICAgfVxuICAgICAgc3RhZ2VzLmFmdGVyKCk7XG4gICAgICBpZiAoZWwuaXNDb25uZWN0ZWQpXG4gICAgICAgIHN0YWdlcy5jbGVhbnVwKCk7XG4gICAgICBkZWxldGUgZWwuX3hfdHJhbnNpdGlvbmluZztcbiAgICB9KTtcbiAgfSk7XG4gIGVsLl94X3RyYW5zaXRpb25pbmcgPSB7XG4gICAgYmVmb3JlQ2FuY2VsczogW10sXG4gICAgYmVmb3JlQ2FuY2VsKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmJlZm9yZUNhbmNlbHMucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBjYW5jZWw6IG9uY2UoZnVuY3Rpb24oKSB7XG4gICAgICB3aGlsZSAodGhpcy5iZWZvcmVDYW5jZWxzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmJlZm9yZUNhbmNlbHMuc2hpZnQoKSgpO1xuICAgICAgfVxuICAgICAgO1xuICAgICAgZmluaXNoKCk7XG4gICAgfSksXG4gICAgZmluaXNoXG4gIH07XG4gIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgc3RhZ2VzLnN0YXJ0KCk7XG4gICAgc3RhZ2VzLmR1cmluZygpO1xuICB9KTtcbiAgaG9sZE5leHRUaWNrcygpO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIGlmIChpbnRlcnJ1cHRlZClcbiAgICAgIHJldHVybjtcbiAgICBsZXQgZHVyYXRpb24gPSBOdW1iZXIoZ2V0Q29tcHV0ZWRTdHlsZShlbCkudHJhbnNpdGlvbkR1cmF0aW9uLnJlcGxhY2UoLywuKi8sIFwiXCIpLnJlcGxhY2UoXCJzXCIsIFwiXCIpKSAqIDFlMztcbiAgICBsZXQgZGVsYXkgPSBOdW1iZXIoZ2V0Q29tcHV0ZWRTdHlsZShlbCkudHJhbnNpdGlvbkRlbGF5LnJlcGxhY2UoLywuKi8sIFwiXCIpLnJlcGxhY2UoXCJzXCIsIFwiXCIpKSAqIDFlMztcbiAgICBpZiAoZHVyYXRpb24gPT09IDApXG4gICAgICBkdXJhdGlvbiA9IE51bWJlcihnZXRDb21wdXRlZFN0eWxlKGVsKS5hbmltYXRpb25EdXJhdGlvbi5yZXBsYWNlKFwic1wiLCBcIlwiKSkgKiAxZTM7XG4gICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgIHN0YWdlcy5iZWZvcmUoKTtcbiAgICB9KTtcbiAgICByZWFjaGVkQmVmb3JlID0gdHJ1ZTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKGludGVycnVwdGVkKVxuICAgICAgICByZXR1cm47XG4gICAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgICBzdGFnZXMuZW5kKCk7XG4gICAgICB9KTtcbiAgICAgIHJlbGVhc2VOZXh0VGlja3MoKTtcbiAgICAgIHNldFRpbWVvdXQoZWwuX3hfdHJhbnNpdGlvbmluZy5maW5pc2gsIGR1cmF0aW9uICsgZGVsYXkpO1xuICAgICAgcmVhY2hlZEVuZCA9IHRydWU7XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsIGtleSwgZmFsbGJhY2spIHtcbiAgaWYgKG1vZGlmaWVycy5pbmRleE9mKGtleSkgPT09IC0xKVxuICAgIHJldHVybiBmYWxsYmFjaztcbiAgY29uc3QgcmF3VmFsdWUgPSBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2Yoa2V5KSArIDFdO1xuICBpZiAoIXJhd1ZhbHVlKVxuICAgIHJldHVybiBmYWxsYmFjaztcbiAgaWYgKGtleSA9PT0gXCJzY2FsZVwiKSB7XG4gICAgaWYgKGlzTmFOKHJhd1ZhbHVlKSlcbiAgICAgIHJldHVybiBmYWxsYmFjaztcbiAgfVxuICBpZiAoa2V5ID09PSBcImR1cmF0aW9uXCIgfHwga2V5ID09PSBcImRlbGF5XCIpIHtcbiAgICBsZXQgbWF0Y2ggPSByYXdWYWx1ZS5tYXRjaCgvKFswLTldKyltcy8pO1xuICAgIGlmIChtYXRjaClcbiAgICAgIHJldHVybiBtYXRjaFsxXTtcbiAgfVxuICBpZiAoa2V5ID09PSBcIm9yaWdpblwiKSB7XG4gICAgaWYgKFtcInRvcFwiLCBcInJpZ2h0XCIsIFwibGVmdFwiLCBcImNlbnRlclwiLCBcImJvdHRvbVwiXS5pbmNsdWRlcyhtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2Yoa2V5KSArIDJdKSkge1xuICAgICAgcmV0dXJuIFtyYXdWYWx1ZSwgbW9kaWZpZXJzW21vZGlmaWVycy5pbmRleE9mKGtleSkgKyAyXV0uam9pbihcIiBcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiByYXdWYWx1ZTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2Nsb25lLmpzXG52YXIgaXNDbG9uaW5nID0gZmFsc2U7XG5mdW5jdGlvbiBza2lwRHVyaW5nQ2xvbmUoY2FsbGJhY2ssIGZhbGxiYWNrID0gKCkgPT4ge1xufSkge1xuICByZXR1cm4gKC4uLmFyZ3MpID0+IGlzQ2xvbmluZyA/IGZhbGxiYWNrKC4uLmFyZ3MpIDogY2FsbGJhY2soLi4uYXJncyk7XG59XG5mdW5jdGlvbiBvbmx5RHVyaW5nQ2xvbmUoY2FsbGJhY2spIHtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiBpc0Nsb25pbmcgJiYgY2FsbGJhY2soLi4uYXJncyk7XG59XG52YXIgaW50ZXJjZXB0b3JzID0gW107XG5mdW5jdGlvbiBpbnRlcmNlcHRDbG9uZShjYWxsYmFjaykge1xuICBpbnRlcmNlcHRvcnMucHVzaChjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBjbG9uZU5vZGUoZnJvbSwgdG8pIHtcbiAgaW50ZXJjZXB0b3JzLmZvckVhY2goKGkpID0+IGkoZnJvbSwgdG8pKTtcbiAgaXNDbG9uaW5nID0gdHJ1ZTtcbiAgZG9udFJlZ2lzdGVyUmVhY3RpdmVTaWRlRWZmZWN0cygoKSA9PiB7XG4gICAgaW5pdFRyZWUodG8sIChlbCwgY2FsbGJhY2spID0+IHtcbiAgICAgIGNhbGxiYWNrKGVsLCAoKSA9PiB7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIGlzQ2xvbmluZyA9IGZhbHNlO1xufVxudmFyIGlzQ2xvbmluZ0xlZ2FjeSA9IGZhbHNlO1xuZnVuY3Rpb24gY2xvbmUob2xkRWwsIG5ld0VsKSB7XG4gIGlmICghbmV3RWwuX3hfZGF0YVN0YWNrKVxuICAgIG5ld0VsLl94X2RhdGFTdGFjayA9IG9sZEVsLl94X2RhdGFTdGFjaztcbiAgaXNDbG9uaW5nID0gdHJ1ZTtcbiAgaXNDbG9uaW5nTGVnYWN5ID0gdHJ1ZTtcbiAgZG9udFJlZ2lzdGVyUmVhY3RpdmVTaWRlRWZmZWN0cygoKSA9PiB7XG4gICAgY2xvbmVUcmVlKG5ld0VsKTtcbiAgfSk7XG4gIGlzQ2xvbmluZyA9IGZhbHNlO1xuICBpc0Nsb25pbmdMZWdhY3kgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGNsb25lVHJlZShlbCkge1xuICBsZXQgaGFzUnVuVGhyb3VnaEZpcnN0RWwgPSBmYWxzZTtcbiAgbGV0IHNoYWxsb3dXYWxrZXIgPSAoZWwyLCBjYWxsYmFjaykgPT4ge1xuICAgIHdhbGsoZWwyLCAoZWwzLCBza2lwKSA9PiB7XG4gICAgICBpZiAoaGFzUnVuVGhyb3VnaEZpcnN0RWwgJiYgaXNSb290KGVsMykpXG4gICAgICAgIHJldHVybiBza2lwKCk7XG4gICAgICBoYXNSdW5UaHJvdWdoRmlyc3RFbCA9IHRydWU7XG4gICAgICBjYWxsYmFjayhlbDMsIHNraXApO1xuICAgIH0pO1xuICB9O1xuICBpbml0VHJlZShlbCwgc2hhbGxvd1dhbGtlcik7XG59XG5mdW5jdGlvbiBkb250UmVnaXN0ZXJSZWFjdGl2ZVNpZGVFZmZlY3RzKGNhbGxiYWNrKSB7XG4gIGxldCBjYWNoZSA9IGVmZmVjdDtcbiAgb3ZlcnJpZGVFZmZlY3QoKGNhbGxiYWNrMiwgZWwpID0+IHtcbiAgICBsZXQgc3RvcmVkRWZmZWN0ID0gY2FjaGUoY2FsbGJhY2syKTtcbiAgICByZWxlYXNlKHN0b3JlZEVmZmVjdCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICB9O1xuICB9KTtcbiAgY2FsbGJhY2soKTtcbiAgb3ZlcnJpZGVFZmZlY3QoY2FjaGUpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvYmluZC5qc1xuZnVuY3Rpb24gYmluZChlbCwgbmFtZSwgdmFsdWUsIG1vZGlmaWVycyA9IFtdKSB7XG4gIGlmICghZWwuX3hfYmluZGluZ3MpXG4gICAgZWwuX3hfYmluZGluZ3MgPSByZWFjdGl2ZSh7fSk7XG4gIGVsLl94X2JpbmRpbmdzW25hbWVdID0gdmFsdWU7XG4gIG5hbWUgPSBtb2RpZmllcnMuaW5jbHVkZXMoXCJjYW1lbFwiKSA/IGNhbWVsQ2FzZShuYW1lKSA6IG5hbWU7XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgXCJ2YWx1ZVwiOlxuICAgICAgYmluZElucHV0VmFsdWUoZWwsIHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJzdHlsZVwiOlxuICAgICAgYmluZFN0eWxlcyhlbCwgdmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImNsYXNzXCI6XG4gICAgICBiaW5kQ2xhc3NlcyhlbCwgdmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInNlbGVjdGVkXCI6XG4gICAgY2FzZSBcImNoZWNrZWRcIjpcbiAgICAgIGJpbmRBdHRyaWJ1dGVBbmRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJpbmRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5mdW5jdGlvbiBiaW5kSW5wdXRWYWx1ZShlbCwgdmFsdWUpIHtcbiAgaWYgKGlzUmFkaW8oZWwpKSB7XG4gICAgaWYgKGVsLmF0dHJpYnV0ZXMudmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5mcm9tTW9kZWwpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSBzYWZlUGFyc2VCb29sZWFuKGVsLnZhbHVlKSA9PT0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUoZWwudmFsdWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNDaGVja2JveChlbCkpIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkpIHtcbiAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlICE9PSBcImJvb2xlYW5cIiAmJiAhW251bGwsIHZvaWQgMF0uaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICBlbC52YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBlbC5jaGVja2VkID0gdmFsdWUuc29tZSgodmFsKSA9PiBjaGVja2VkQXR0ckxvb3NlQ29tcGFyZSh2YWwsIGVsLnZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gISF2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoZWwudGFnTmFtZSA9PT0gXCJTRUxFQ1RcIikge1xuICAgIHVwZGF0ZVNlbGVjdChlbCwgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGlmIChlbC52YWx1ZSA9PT0gdmFsdWUpXG4gICAgICByZXR1cm47XG4gICAgZWwudmFsdWUgPSB2YWx1ZSA9PT0gdm9pZCAwID8gXCJcIiA6IHZhbHVlO1xuICB9XG59XG5mdW5jdGlvbiBiaW5kQ2xhc3NlcyhlbCwgdmFsdWUpIHtcbiAgaWYgKGVsLl94X3VuZG9BZGRlZENsYXNzZXMpXG4gICAgZWwuX3hfdW5kb0FkZGVkQ2xhc3NlcygpO1xuICBlbC5feF91bmRvQWRkZWRDbGFzc2VzID0gc2V0Q2xhc3NlcyhlbCwgdmFsdWUpO1xufVxuZnVuY3Rpb24gYmluZFN0eWxlcyhlbCwgdmFsdWUpIHtcbiAgaWYgKGVsLl94X3VuZG9BZGRlZFN0eWxlcylcbiAgICBlbC5feF91bmRvQWRkZWRTdHlsZXMoKTtcbiAgZWwuX3hfdW5kb0FkZGVkU3R5bGVzID0gc2V0U3R5bGVzKGVsLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBiaW5kQXR0cmlidXRlQW5kUHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKSB7XG4gIGJpbmRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlKTtcbiAgc2V0UHJvcGVydHlJZkNoYW5nZWQoZWwsIG5hbWUsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGJpbmRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlKSB7XG4gIGlmIChbbnVsbCwgdm9pZCAwLCBmYWxzZV0uaW5jbHVkZXModmFsdWUpICYmIGF0dHJpYnV0ZVNob3VsZG50QmVQcmVzZXJ2ZWRJZkZhbHN5KG5hbWUpKSB7XG4gICAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICB9IGVsc2Uge1xuICAgIGlmIChpc0Jvb2xlYW5BdHRyKG5hbWUpKVxuICAgICAgdmFsdWUgPSBuYW1lO1xuICAgIHNldElmQ2hhbmdlZChlbCwgbmFtZSwgdmFsdWUpO1xuICB9XG59XG5mdW5jdGlvbiBzZXRJZkNoYW5nZWQoZWwsIGF0dHJOYW1lLCB2YWx1ZSkge1xuICBpZiAoZWwuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKSAhPSB2YWx1ZSkge1xuICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgdmFsdWUpO1xuICB9XG59XG5mdW5jdGlvbiBzZXRQcm9wZXJ0eUlmQ2hhbmdlZChlbCwgcHJvcE5hbWUsIHZhbHVlKSB7XG4gIGlmIChlbFtwcm9wTmFtZV0gIT09IHZhbHVlKSB7XG4gICAgZWxbcHJvcE5hbWVdID0gdmFsdWU7XG4gIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZVNlbGVjdChlbCwgdmFsdWUpIHtcbiAgY29uc3QgYXJyYXlXcmFwcGVkVmFsdWUgPSBbXS5jb25jYXQodmFsdWUpLm1hcCgodmFsdWUyKSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlMiArIFwiXCI7XG4gIH0pO1xuICBBcnJheS5mcm9tKGVsLm9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgIG9wdGlvbi5zZWxlY3RlZCA9IGFycmF5V3JhcHBlZFZhbHVlLmluY2x1ZGVzKG9wdGlvbi52YWx1ZSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gY2FtZWxDYXNlKHN1YmplY3QpIHtcbiAgcmV0dXJuIHN1YmplY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tKFxcdykvZywgKG1hdGNoLCBjaGFyKSA9PiBjaGFyLnRvVXBwZXJDYXNlKCkpO1xufVxuZnVuY3Rpb24gY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUodmFsdWVBLCB2YWx1ZUIpIHtcbiAgcmV0dXJuIHZhbHVlQSA9PSB2YWx1ZUI7XG59XG5mdW5jdGlvbiBzYWZlUGFyc2VCb29sZWFuKHJhd1ZhbHVlKSB7XG4gIGlmIChbMSwgXCIxXCIsIFwidHJ1ZVwiLCBcIm9uXCIsIFwieWVzXCIsIHRydWVdLmluY2x1ZGVzKHJhd1ZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChbMCwgXCIwXCIsIFwiZmFsc2VcIiwgXCJvZmZcIiwgXCJub1wiLCBmYWxzZV0uaW5jbHVkZXMocmF3VmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiByYXdWYWx1ZSA/IEJvb2xlYW4ocmF3VmFsdWUpIDogbnVsbDtcbn1cbnZhciBib29sZWFuQXR0cmlidXRlcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KFtcbiAgXCJhbGxvd2Z1bGxzY3JlZW5cIixcbiAgXCJhc3luY1wiLFxuICBcImF1dG9mb2N1c1wiLFxuICBcImF1dG9wbGF5XCIsXG4gIFwiY2hlY2tlZFwiLFxuICBcImNvbnRyb2xzXCIsXG4gIFwiZGVmYXVsdFwiLFxuICBcImRlZmVyXCIsXG4gIFwiZGlzYWJsZWRcIixcbiAgXCJmb3Jtbm92YWxpZGF0ZVwiLFxuICBcImluZXJ0XCIsXG4gIFwiaXNtYXBcIixcbiAgXCJpdGVtc2NvcGVcIixcbiAgXCJsb29wXCIsXG4gIFwibXVsdGlwbGVcIixcbiAgXCJtdXRlZFwiLFxuICBcIm5vbW9kdWxlXCIsXG4gIFwibm92YWxpZGF0ZVwiLFxuICBcIm9wZW5cIixcbiAgXCJwbGF5c2lubGluZVwiLFxuICBcInJlYWRvbmx5XCIsXG4gIFwicmVxdWlyZWRcIixcbiAgXCJyZXZlcnNlZFwiLFxuICBcInNlbGVjdGVkXCIsXG4gIFwic2hhZG93cm9vdGNsb25hYmxlXCIsXG4gIFwic2hhZG93cm9vdGRlbGVnYXRlc2ZvY3VzXCIsXG4gIFwic2hhZG93cm9vdHNlcmlhbGl6YWJsZVwiXG5dKTtcbmZ1bmN0aW9uIGlzQm9vbGVhbkF0dHIoYXR0ck5hbWUpIHtcbiAgcmV0dXJuIGJvb2xlYW5BdHRyaWJ1dGVzLmhhcyhhdHRyTmFtZSk7XG59XG5mdW5jdGlvbiBhdHRyaWJ1dGVTaG91bGRudEJlUHJlc2VydmVkSWZGYWxzeShuYW1lKSB7XG4gIHJldHVybiAhW1wiYXJpYS1wcmVzc2VkXCIsIFwiYXJpYS1jaGVja2VkXCIsIFwiYXJpYS1leHBhbmRlZFwiLCBcImFyaWEtc2VsZWN0ZWRcIl0uaW5jbHVkZXMobmFtZSk7XG59XG5mdW5jdGlvbiBnZXRCaW5kaW5nKGVsLCBuYW1lLCBmYWxsYmFjaykge1xuICBpZiAoZWwuX3hfYmluZGluZ3MgJiYgZWwuX3hfYmluZGluZ3NbbmFtZV0gIT09IHZvaWQgMClcbiAgICByZXR1cm4gZWwuX3hfYmluZGluZ3NbbmFtZV07XG4gIHJldHVybiBnZXRBdHRyaWJ1dGVCaW5kaW5nKGVsLCBuYW1lLCBmYWxsYmFjayk7XG59XG5mdW5jdGlvbiBleHRyYWN0UHJvcChlbCwgbmFtZSwgZmFsbGJhY2ssIGV4dHJhY3QgPSB0cnVlKSB7XG4gIGlmIChlbC5feF9iaW5kaW5ncyAmJiBlbC5feF9iaW5kaW5nc1tuYW1lXSAhPT0gdm9pZCAwKVxuICAgIHJldHVybiBlbC5feF9iaW5kaW5nc1tuYW1lXTtcbiAgaWYgKGVsLl94X2lubGluZUJpbmRpbmdzICYmIGVsLl94X2lubGluZUJpbmRpbmdzW25hbWVdICE9PSB2b2lkIDApIHtcbiAgICBsZXQgYmluZGluZyA9IGVsLl94X2lubGluZUJpbmRpbmdzW25hbWVdO1xuICAgIGJpbmRpbmcuZXh0cmFjdCA9IGV4dHJhY3Q7XG4gICAgcmV0dXJuIGRvbnRBdXRvRXZhbHVhdGVGdW5jdGlvbnMoKCkgPT4ge1xuICAgICAgcmV0dXJuIGV2YWx1YXRlKGVsLCBiaW5kaW5nLmV4cHJlc3Npb24pO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBnZXRBdHRyaWJ1dGVCaW5kaW5nKGVsLCBuYW1lLCBmYWxsYmFjayk7XG59XG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVCaW5kaW5nKGVsLCBuYW1lLCBmYWxsYmFjaykge1xuICBsZXQgYXR0ciA9IGVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgaWYgKGF0dHIgPT09IG51bGwpXG4gICAgcmV0dXJuIHR5cGVvZiBmYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiID8gZmFsbGJhY2soKSA6IGZhbGxiYWNrO1xuICBpZiAoYXR0ciA9PT0gXCJcIilcbiAgICByZXR1cm4gdHJ1ZTtcbiAgaWYgKGlzQm9vbGVhbkF0dHIobmFtZSkpIHtcbiAgICByZXR1cm4gISFbbmFtZSwgXCJ0cnVlXCJdLmluY2x1ZGVzKGF0dHIpO1xuICB9XG4gIHJldHVybiBhdHRyO1xufVxuZnVuY3Rpb24gaXNDaGVja2JveChlbCkge1xuICByZXR1cm4gZWwudHlwZSA9PT0gXCJjaGVja2JveFwiIHx8IGVsLmxvY2FsTmFtZSA9PT0gXCJ1aS1jaGVja2JveFwiIHx8IGVsLmxvY2FsTmFtZSA9PT0gXCJ1aS1zd2l0Y2hcIjtcbn1cbmZ1bmN0aW9uIGlzUmFkaW8oZWwpIHtcbiAgcmV0dXJuIGVsLnR5cGUgPT09IFwicmFkaW9cIiB8fCBlbC5sb2NhbE5hbWUgPT09IFwidWktcmFkaW9cIjtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL2RlYm91bmNlLmpzXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH07XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgfTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL3Rocm90dGxlLmpzXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCBsaW1pdCkge1xuICBsZXQgaW5UaHJvdHRsZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGxldCBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICBpZiAoIWluVGhyb3R0bGUpIHtcbiAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBpblRocm90dGxlID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gaW5UaHJvdHRsZSA9IGZhbHNlLCBsaW1pdCk7XG4gICAgfVxuICB9O1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZW50YW5nbGUuanNcbmZ1bmN0aW9uIGVudGFuZ2xlKHsgZ2V0OiBvdXRlckdldCwgc2V0OiBvdXRlclNldCB9LCB7IGdldDogaW5uZXJHZXQsIHNldDogaW5uZXJTZXQgfSkge1xuICBsZXQgZmlyc3RSdW4gPSB0cnVlO1xuICBsZXQgb3V0ZXJIYXNoO1xuICBsZXQgaW5uZXJIYXNoO1xuICBsZXQgcmVmZXJlbmNlID0gZWZmZWN0KCgpID0+IHtcbiAgICBsZXQgb3V0ZXIgPSBvdXRlckdldCgpO1xuICAgIGxldCBpbm5lciA9IGlubmVyR2V0KCk7XG4gICAgaWYgKGZpcnN0UnVuKSB7XG4gICAgICBpbm5lclNldChjbG9uZUlmT2JqZWN0KG91dGVyKSk7XG4gICAgICBmaXJzdFJ1biA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgb3V0ZXJIYXNoTGF0ZXN0ID0gSlNPTi5zdHJpbmdpZnkob3V0ZXIpO1xuICAgICAgbGV0IGlubmVySGFzaExhdGVzdCA9IEpTT04uc3RyaW5naWZ5KGlubmVyKTtcbiAgICAgIGlmIChvdXRlckhhc2hMYXRlc3QgIT09IG91dGVySGFzaCkge1xuICAgICAgICBpbm5lclNldChjbG9uZUlmT2JqZWN0KG91dGVyKSk7XG4gICAgICB9IGVsc2UgaWYgKG91dGVySGFzaExhdGVzdCAhPT0gaW5uZXJIYXNoTGF0ZXN0KSB7XG4gICAgICAgIG91dGVyU2V0KGNsb25lSWZPYmplY3QoaW5uZXIpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICB9XG4gICAgfVxuICAgIG91dGVySGFzaCA9IEpTT04uc3RyaW5naWZ5KG91dGVyR2V0KCkpO1xuICAgIGlubmVySGFzaCA9IEpTT04uc3RyaW5naWZ5KGlubmVyR2V0KCkpO1xuICB9KTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICByZWxlYXNlKHJlZmVyZW5jZSk7XG4gIH07XG59XG5mdW5jdGlvbiBjbG9uZUlmT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSkgOiB2YWx1ZTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3BsdWdpbi5qc1xuZnVuY3Rpb24gcGx1Z2luKGNhbGxiYWNrKSB7XG4gIGxldCBjYWxsYmFja3MgPSBBcnJheS5pc0FycmF5KGNhbGxiYWNrKSA/IGNhbGxiYWNrIDogW2NhbGxiYWNrXTtcbiAgY2FsbGJhY2tzLmZvckVhY2goKGkpID0+IGkoYWxwaW5lX2RlZmF1bHQpKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3N0b3JlLmpzXG52YXIgc3RvcmVzID0ge307XG52YXIgaXNSZWFjdGl2ZSA9IGZhbHNlO1xuZnVuY3Rpb24gc3RvcmUobmFtZSwgdmFsdWUpIHtcbiAgaWYgKCFpc1JlYWN0aXZlKSB7XG4gICAgc3RvcmVzID0gcmVhY3RpdmUoc3RvcmVzKTtcbiAgICBpc1JlYWN0aXZlID0gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHJldHVybiBzdG9yZXNbbmFtZV07XG4gIH1cbiAgc3RvcmVzW25hbWVdID0gdmFsdWU7XG4gIGluaXRJbnRlcmNlcHRvcnMoc3RvcmVzW25hbWVdKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShcImluaXRcIikgJiYgdHlwZW9mIHZhbHVlLmluaXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHN0b3Jlc1tuYW1lXS5pbml0KCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFN0b3JlcygpIHtcbiAgcmV0dXJuIHN0b3Jlcztcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2JpbmRzLmpzXG52YXIgYmluZHMgPSB7fTtcbmZ1bmN0aW9uIGJpbmQyKG5hbWUsIGJpbmRpbmdzKSB7XG4gIGxldCBnZXRCaW5kaW5ncyA9IHR5cGVvZiBiaW5kaW5ncyAhPT0gXCJmdW5jdGlvblwiID8gKCkgPT4gYmluZGluZ3MgOiBiaW5kaW5ncztcbiAgaWYgKG5hbWUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgcmV0dXJuIGFwcGx5QmluZGluZ3NPYmplY3QobmFtZSwgZ2V0QmluZGluZ3MoKSk7XG4gIH0gZWxzZSB7XG4gICAgYmluZHNbbmFtZV0gPSBnZXRCaW5kaW5ncztcbiAgfVxuICByZXR1cm4gKCkgPT4ge1xuICB9O1xufVxuZnVuY3Rpb24gaW5qZWN0QmluZGluZ1Byb3ZpZGVycyhvYmopIHtcbiAgT2JqZWN0LmVudHJpZXMoYmluZHMpLmZvckVhY2goKFtuYW1lLCBjYWxsYmFja10pID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayguLi5hcmdzKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBhcHBseUJpbmRpbmdzT2JqZWN0KGVsLCBvYmosIG9yaWdpbmFsKSB7XG4gIGxldCBjbGVhbnVwUnVubmVycyA9IFtdO1xuICB3aGlsZSAoY2xlYW51cFJ1bm5lcnMubGVuZ3RoKVxuICAgIGNsZWFudXBSdW5uZXJzLnBvcCgpKCk7XG4gIGxldCBhdHRyaWJ1dGVzID0gT2JqZWN0LmVudHJpZXMob2JqKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7IG5hbWUsIHZhbHVlIH0pKTtcbiAgbGV0IHN0YXRpY0F0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzT25seShhdHRyaWJ1dGVzKTtcbiAgYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMubWFwKChhdHRyaWJ1dGUpID0+IHtcbiAgICBpZiAoc3RhdGljQXR0cmlidXRlcy5maW5kKChhdHRyKSA9PiBhdHRyLm5hbWUgPT09IGF0dHJpYnV0ZS5uYW1lKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogYHgtYmluZDoke2F0dHJpYnV0ZS5uYW1lfWAsXG4gICAgICAgIHZhbHVlOiBgXCIke2F0dHJpYnV0ZS52YWx1ZX1cImBcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBhdHRyaWJ1dGU7XG4gIH0pO1xuICBkaXJlY3RpdmVzKGVsLCBhdHRyaWJ1dGVzLCBvcmlnaW5hbCkubWFwKChoYW5kbGUpID0+IHtcbiAgICBjbGVhbnVwUnVubmVycy5wdXNoKGhhbmRsZS5ydW5DbGVhbnVwcyk7XG4gICAgaGFuZGxlKCk7XG4gIH0pO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHdoaWxlIChjbGVhbnVwUnVubmVycy5sZW5ndGgpXG4gICAgICBjbGVhbnVwUnVubmVycy5wb3AoKSgpO1xuICB9O1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGF0YXMuanNcbnZhciBkYXRhcyA9IHt9O1xuZnVuY3Rpb24gZGF0YShuYW1lLCBjYWxsYmFjaykge1xuICBkYXRhc1tuYW1lXSA9IGNhbGxiYWNrO1xufVxuZnVuY3Rpb24gaW5qZWN0RGF0YVByb3ZpZGVycyhvYmosIGNvbnRleHQpIHtcbiAgT2JqZWN0LmVudHJpZXMoZGF0YXMpLmZvckVhY2goKFtuYW1lLCBjYWxsYmFja10pID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjay5iaW5kKGNvbnRleHQpKC4uLmFyZ3MpO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb2JqO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvYWxwaW5lLmpzXG52YXIgQWxwaW5lID0ge1xuICBnZXQgcmVhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHJlYWN0aXZlO1xuICB9LFxuICBnZXQgcmVsZWFzZSgpIHtcbiAgICByZXR1cm4gcmVsZWFzZTtcbiAgfSxcbiAgZ2V0IGVmZmVjdCgpIHtcbiAgICByZXR1cm4gZWZmZWN0O1xuICB9LFxuICBnZXQgcmF3KCkge1xuICAgIHJldHVybiByYXc7XG4gIH0sXG4gIHZlcnNpb246IFwiMy4xNC45XCIsXG4gIGZsdXNoQW5kU3RvcERlZmVycmluZ011dGF0aW9ucyxcbiAgZG9udEF1dG9FdmFsdWF0ZUZ1bmN0aW9ucyxcbiAgZGlzYWJsZUVmZmVjdFNjaGVkdWxpbmcsXG4gIHN0YXJ0T2JzZXJ2aW5nTXV0YXRpb25zLFxuICBzdG9wT2JzZXJ2aW5nTXV0YXRpb25zLFxuICBzZXRSZWFjdGl2aXR5RW5naW5lLFxuICBvbkF0dHJpYnV0ZVJlbW92ZWQsXG4gIG9uQXR0cmlidXRlc0FkZGVkLFxuICBjbG9zZXN0RGF0YVN0YWNrLFxuICBza2lwRHVyaW5nQ2xvbmUsXG4gIG9ubHlEdXJpbmdDbG9uZSxcbiAgYWRkUm9vdFNlbGVjdG9yLFxuICBhZGRJbml0U2VsZWN0b3IsXG4gIGludGVyY2VwdENsb25lLFxuICBhZGRTY29wZVRvTm9kZSxcbiAgZGVmZXJNdXRhdGlvbnMsXG4gIG1hcEF0dHJpYnV0ZXMsXG4gIGV2YWx1YXRlTGF0ZXIsXG4gIGludGVyY2VwdEluaXQsXG4gIHNldEV2YWx1YXRvcixcbiAgbWVyZ2VQcm94aWVzLFxuICBleHRyYWN0UHJvcCxcbiAgZmluZENsb3Nlc3QsXG4gIG9uRWxSZW1vdmVkLFxuICBjbG9zZXN0Um9vdCxcbiAgZGVzdHJveVRyZWUsXG4gIGludGVyY2VwdG9yLFxuICAvLyBJTlRFUk5BTDogbm90IHB1YmxpYyBBUEkgYW5kIGlzIHN1YmplY3QgdG8gY2hhbmdlIHdpdGhvdXQgbWFqb3IgcmVsZWFzZS5cbiAgdHJhbnNpdGlvbixcbiAgLy8gSU5URVJOQUxcbiAgc2V0U3R5bGVzLFxuICAvLyBJTlRFUk5BTFxuICBtdXRhdGVEb20sXG4gIGRpcmVjdGl2ZSxcbiAgZW50YW5nbGUsXG4gIHRocm90dGxlLFxuICBkZWJvdW5jZSxcbiAgZXZhbHVhdGUsXG4gIGluaXRUcmVlLFxuICBuZXh0VGljayxcbiAgcHJlZml4ZWQ6IHByZWZpeCxcbiAgcHJlZml4OiBzZXRQcmVmaXgsXG4gIHBsdWdpbixcbiAgbWFnaWMsXG4gIHN0b3JlLFxuICBzdGFydCxcbiAgY2xvbmUsXG4gIC8vIElOVEVSTkFMXG4gIGNsb25lTm9kZSxcbiAgLy8gSU5URVJOQUxcbiAgYm91bmQ6IGdldEJpbmRpbmcsXG4gICRkYXRhOiBzY29wZSxcbiAgd2F0Y2gsXG4gIHdhbGssXG4gIGRhdGEsXG4gIGJpbmQ6IGJpbmQyXG59O1xudmFyIGFscGluZV9kZWZhdWx0ID0gQWxwaW5lO1xuXG4vLyBub2RlX21vZHVsZXMvQHZ1ZS9zaGFyZWQvZGlzdC9zaGFyZWQuZXNtLWJ1bmRsZXIuanNcbmZ1bmN0aW9uIG1ha2VNYXAoc3RyLCBleHBlY3RzTG93ZXJDYXNlKSB7XG4gIGNvbnN0IG1hcCA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCBsaXN0ID0gc3RyLnNwbGl0KFwiLFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbWFwW2xpc3RbaV1dID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZXhwZWN0c0xvd2VyQ2FzZSA/ICh2YWwpID0+ICEhbWFwW3ZhbC50b0xvd2VyQ2FzZSgpXSA6ICh2YWwpID0+ICEhbWFwW3ZhbF07XG59XG52YXIgc3BlY2lhbEJvb2xlYW5BdHRycyA9IGBpdGVtc2NvcGUsYWxsb3dmdWxsc2NyZWVuLGZvcm1ub3ZhbGlkYXRlLGlzbWFwLG5vbW9kdWxlLG5vdmFsaWRhdGUscmVhZG9ubHlgO1xudmFyIGlzQm9vbGVhbkF0dHIyID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoc3BlY2lhbEJvb2xlYW5BdHRycyArIGAsYXN5bmMsYXV0b2ZvY3VzLGF1dG9wbGF5LGNvbnRyb2xzLGRlZmF1bHQsZGVmZXIsZGlzYWJsZWQsaGlkZGVuLGxvb3Asb3BlbixyZXF1aXJlZCxyZXZlcnNlZCxzY29wZWQsc2VhbWxlc3MsY2hlY2tlZCxtdXRlZCxtdWx0aXBsZSxzZWxlY3RlZGApO1xudmFyIEVNUFRZX09CSiA9IHRydWUgPyBPYmplY3QuZnJlZXplKHt9KSA6IHt9O1xudmFyIEVNUFRZX0FSUiA9IHRydWUgPyBPYmplY3QuZnJlZXplKFtdKSA6IFtdO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBoYXNPd24gPSAodmFsLCBrZXkpID0+IGhhc093blByb3BlcnR5LmNhbGwodmFsLCBrZXkpO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGlzTWFwID0gKHZhbCkgPT4gdG9UeXBlU3RyaW5nKHZhbCkgPT09IFwiW29iamVjdCBNYXBdXCI7XG52YXIgaXNTdHJpbmcgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiO1xudmFyIGlzU3ltYm9sID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gXCJzeW1ib2xcIjtcbnZhciBpc09iamVjdCA9ICh2YWwpID0+IHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiO1xudmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciB0b1R5cGVTdHJpbmcgPSAodmFsdWUpID0+IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xudmFyIHRvUmF3VHlwZSA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gdG9UeXBlU3RyaW5nKHZhbHVlKS5zbGljZSg4LCAtMSk7XG59O1xudmFyIGlzSW50ZWdlcktleSA9IChrZXkpID0+IGlzU3RyaW5nKGtleSkgJiYga2V5ICE9PSBcIk5hTlwiICYmIGtleVswXSAhPT0gXCItXCIgJiYgXCJcIiArIHBhcnNlSW50KGtleSwgMTApID09PSBrZXk7XG52YXIgY2FjaGVTdHJpbmdGdW5jdGlvbiA9IChmbikgPT4ge1xuICBjb25zdCBjYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICByZXR1cm4gKHN0cikgPT4ge1xuICAgIGNvbnN0IGhpdCA9IGNhY2hlW3N0cl07XG4gICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpO1xuICB9O1xufTtcbnZhciBjYW1lbGl6ZVJFID0gLy0oXFx3KS9nO1xudmFyIGNhbWVsaXplID0gY2FjaGVTdHJpbmdGdW5jdGlvbigoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIucmVwbGFjZShjYW1lbGl6ZVJFLCAoXywgYykgPT4gYyA/IGMudG9VcHBlckNhc2UoKSA6IFwiXCIpO1xufSk7XG52YXIgaHlwaGVuYXRlUkUgPSAvXFxCKFtBLVpdKS9nO1xudmFyIGh5cGhlbmF0ZSA9IGNhY2hlU3RyaW5nRnVuY3Rpb24oKHN0cikgPT4gc3RyLnJlcGxhY2UoaHlwaGVuYXRlUkUsIFwiLSQxXCIpLnRvTG93ZXJDYXNlKCkpO1xudmFyIGNhcGl0YWxpemUgPSBjYWNoZVN0cmluZ0Z1bmN0aW9uKChzdHIpID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKSk7XG52YXIgdG9IYW5kbGVyS2V5ID0gY2FjaGVTdHJpbmdGdW5jdGlvbigoc3RyKSA9PiBzdHIgPyBgb24ke2NhcGl0YWxpemUoc3RyKX1gIDogYGApO1xudmFyIGhhc0NoYW5nZWQgPSAodmFsdWUsIG9sZFZhbHVlKSA9PiB2YWx1ZSAhPT0gb2xkVmFsdWUgJiYgKHZhbHVlID09PSB2YWx1ZSB8fCBvbGRWYWx1ZSA9PT0gb2xkVmFsdWUpO1xuXG4vLyBub2RlX21vZHVsZXMvQHZ1ZS9yZWFjdGl2aXR5L2Rpc3QvcmVhY3Rpdml0eS5lc20tYnVuZGxlci5qc1xudmFyIHRhcmdldE1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xudmFyIGVmZmVjdFN0YWNrID0gW107XG52YXIgYWN0aXZlRWZmZWN0O1xudmFyIElURVJBVEVfS0VZID0gU3ltYm9sKHRydWUgPyBcIml0ZXJhdGVcIiA6IFwiXCIpO1xudmFyIE1BUF9LRVlfSVRFUkFURV9LRVkgPSBTeW1ib2wodHJ1ZSA/IFwiTWFwIGtleSBpdGVyYXRlXCIgOiBcIlwiKTtcbmZ1bmN0aW9uIGlzRWZmZWN0KGZuKSB7XG4gIHJldHVybiBmbiAmJiBmbi5faXNFZmZlY3QgPT09IHRydWU7XG59XG5mdW5jdGlvbiBlZmZlY3QyKGZuLCBvcHRpb25zID0gRU1QVFlfT0JKKSB7XG4gIGlmIChpc0VmZmVjdChmbikpIHtcbiAgICBmbiA9IGZuLnJhdztcbiAgfVxuICBjb25zdCBlZmZlY3QzID0gY3JlYXRlUmVhY3RpdmVFZmZlY3QoZm4sIG9wdGlvbnMpO1xuICBpZiAoIW9wdGlvbnMubGF6eSkge1xuICAgIGVmZmVjdDMoKTtcbiAgfVxuICByZXR1cm4gZWZmZWN0Mztcbn1cbmZ1bmN0aW9uIHN0b3AoZWZmZWN0Mykge1xuICBpZiAoZWZmZWN0My5hY3RpdmUpIHtcbiAgICBjbGVhbnVwKGVmZmVjdDMpO1xuICAgIGlmIChlZmZlY3QzLm9wdGlvbnMub25TdG9wKSB7XG4gICAgICBlZmZlY3QzLm9wdGlvbnMub25TdG9wKCk7XG4gICAgfVxuICAgIGVmZmVjdDMuYWN0aXZlID0gZmFsc2U7XG4gIH1cbn1cbnZhciB1aWQgPSAwO1xuZnVuY3Rpb24gY3JlYXRlUmVhY3RpdmVFZmZlY3QoZm4sIG9wdGlvbnMpIHtcbiAgY29uc3QgZWZmZWN0MyA9IGZ1bmN0aW9uIHJlYWN0aXZlRWZmZWN0KCkge1xuICAgIGlmICghZWZmZWN0My5hY3RpdmUpIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICBpZiAoIWVmZmVjdFN0YWNrLmluY2x1ZGVzKGVmZmVjdDMpKSB7XG4gICAgICBjbGVhbnVwKGVmZmVjdDMpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZW5hYmxlVHJhY2tpbmcoKTtcbiAgICAgICAgZWZmZWN0U3RhY2sucHVzaChlZmZlY3QzKTtcbiAgICAgICAgYWN0aXZlRWZmZWN0ID0gZWZmZWN0MztcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBlZmZlY3RTdGFjay5wb3AoKTtcbiAgICAgICAgcmVzZXRUcmFja2luZygpO1xuICAgICAgICBhY3RpdmVFZmZlY3QgPSBlZmZlY3RTdGFja1tlZmZlY3RTdGFjay5sZW5ndGggLSAxXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIGVmZmVjdDMuaWQgPSB1aWQrKztcbiAgZWZmZWN0My5hbGxvd1JlY3Vyc2UgPSAhIW9wdGlvbnMuYWxsb3dSZWN1cnNlO1xuICBlZmZlY3QzLl9pc0VmZmVjdCA9IHRydWU7XG4gIGVmZmVjdDMuYWN0aXZlID0gdHJ1ZTtcbiAgZWZmZWN0My5yYXcgPSBmbjtcbiAgZWZmZWN0My5kZXBzID0gW107XG4gIGVmZmVjdDMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIHJldHVybiBlZmZlY3QzO1xufVxuZnVuY3Rpb24gY2xlYW51cChlZmZlY3QzKSB7XG4gIGNvbnN0IHsgZGVwcyB9ID0gZWZmZWN0MztcbiAgaWYgKGRlcHMubGVuZ3RoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZXBzW2ldLmRlbGV0ZShlZmZlY3QzKTtcbiAgICB9XG4gICAgZGVwcy5sZW5ndGggPSAwO1xuICB9XG59XG52YXIgc2hvdWxkVHJhY2sgPSB0cnVlO1xudmFyIHRyYWNrU3RhY2sgPSBbXTtcbmZ1bmN0aW9uIHBhdXNlVHJhY2tpbmcoKSB7XG4gIHRyYWNrU3RhY2sucHVzaChzaG91bGRUcmFjayk7XG4gIHNob3VsZFRyYWNrID0gZmFsc2U7XG59XG5mdW5jdGlvbiBlbmFibGVUcmFja2luZygpIHtcbiAgdHJhY2tTdGFjay5wdXNoKHNob3VsZFRyYWNrKTtcbiAgc2hvdWxkVHJhY2sgPSB0cnVlO1xufVxuZnVuY3Rpb24gcmVzZXRUcmFja2luZygpIHtcbiAgY29uc3QgbGFzdCA9IHRyYWNrU3RhY2sucG9wKCk7XG4gIHNob3VsZFRyYWNrID0gbGFzdCA9PT0gdm9pZCAwID8gdHJ1ZSA6IGxhc3Q7XG59XG5mdW5jdGlvbiB0cmFjayh0YXJnZXQsIHR5cGUsIGtleSkge1xuICBpZiAoIXNob3VsZFRyYWNrIHx8IGFjdGl2ZUVmZmVjdCA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBkZXBzTWFwID0gdGFyZ2V0TWFwLmdldCh0YXJnZXQpO1xuICBpZiAoIWRlcHNNYXApIHtcbiAgICB0YXJnZXRNYXAuc2V0KHRhcmdldCwgZGVwc01hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCkpO1xuICB9XG4gIGxldCBkZXAgPSBkZXBzTWFwLmdldChrZXkpO1xuICBpZiAoIWRlcCkge1xuICAgIGRlcHNNYXAuc2V0KGtleSwgZGVwID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKSk7XG4gIH1cbiAgaWYgKCFkZXAuaGFzKGFjdGl2ZUVmZmVjdCkpIHtcbiAgICBkZXAuYWRkKGFjdGl2ZUVmZmVjdCk7XG4gICAgYWN0aXZlRWZmZWN0LmRlcHMucHVzaChkZXApO1xuICAgIGlmIChhY3RpdmVFZmZlY3Qub3B0aW9ucy5vblRyYWNrKSB7XG4gICAgICBhY3RpdmVFZmZlY3Qub3B0aW9ucy5vblRyYWNrKHtcbiAgICAgICAgZWZmZWN0OiBhY3RpdmVFZmZlY3QsXG4gICAgICAgIHRhcmdldCxcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHRyaWdnZXIodGFyZ2V0LCB0eXBlLCBrZXksIG5ld1ZhbHVlLCBvbGRWYWx1ZSwgb2xkVGFyZ2V0KSB7XG4gIGNvbnN0IGRlcHNNYXAgPSB0YXJnZXRNYXAuZ2V0KHRhcmdldCk7XG4gIGlmICghZGVwc01hcCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBlZmZlY3RzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbiAgY29uc3QgYWRkMiA9IChlZmZlY3RzVG9BZGQpID0+IHtcbiAgICBpZiAoZWZmZWN0c1RvQWRkKSB7XG4gICAgICBlZmZlY3RzVG9BZGQuZm9yRWFjaCgoZWZmZWN0MykgPT4ge1xuICAgICAgICBpZiAoZWZmZWN0MyAhPT0gYWN0aXZlRWZmZWN0IHx8IGVmZmVjdDMuYWxsb3dSZWN1cnNlKSB7XG4gICAgICAgICAgZWZmZWN0cy5hZGQoZWZmZWN0Myk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgaWYgKHR5cGUgPT09IFwiY2xlYXJcIikge1xuICAgIGRlcHNNYXAuZm9yRWFjaChhZGQyKTtcbiAgfSBlbHNlIGlmIChrZXkgPT09IFwibGVuZ3RoXCIgJiYgaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgZGVwc01hcC5mb3JFYWNoKChkZXAsIGtleTIpID0+IHtcbiAgICAgIGlmIChrZXkyID09PSBcImxlbmd0aFwiIHx8IGtleTIgPj0gbmV3VmFsdWUpIHtcbiAgICAgICAgYWRkMihkZXApO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGlmIChrZXkgIT09IHZvaWQgMCkge1xuICAgICAgYWRkMihkZXBzTWFwLmdldChrZXkpKTtcbiAgICB9XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwiYWRkXCI6XG4gICAgICAgIGlmICghaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgYWRkMihkZXBzTWFwLmdldChJVEVSQVRFX0tFWSkpO1xuICAgICAgICAgIGlmIChpc01hcCh0YXJnZXQpKSB7XG4gICAgICAgICAgICBhZGQyKGRlcHNNYXAuZ2V0KE1BUF9LRVlfSVRFUkFURV9LRVkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNJbnRlZ2VyS2V5KGtleSkpIHtcbiAgICAgICAgICBhZGQyKGRlcHNNYXAuZ2V0KFwibGVuZ3RoXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkZWxldGVcIjpcbiAgICAgICAgaWYgKCFpc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICBhZGQyKGRlcHNNYXAuZ2V0KElURVJBVEVfS0VZKSk7XG4gICAgICAgICAgaWYgKGlzTWFwKHRhcmdldCkpIHtcbiAgICAgICAgICAgIGFkZDIoZGVwc01hcC5nZXQoTUFQX0tFWV9JVEVSQVRFX0tFWSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZXRcIjpcbiAgICAgICAgaWYgKGlzTWFwKHRhcmdldCkpIHtcbiAgICAgICAgICBhZGQyKGRlcHNNYXAuZ2V0KElURVJBVEVfS0VZKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGNvbnN0IHJ1biA9IChlZmZlY3QzKSA9PiB7XG4gICAgaWYgKGVmZmVjdDMub3B0aW9ucy5vblRyaWdnZXIpIHtcbiAgICAgIGVmZmVjdDMub3B0aW9ucy5vblRyaWdnZXIoe1xuICAgICAgICBlZmZlY3Q6IGVmZmVjdDMsXG4gICAgICAgIHRhcmdldCxcbiAgICAgICAga2V5LFxuICAgICAgICB0eXBlLFxuICAgICAgICBuZXdWYWx1ZSxcbiAgICAgICAgb2xkVmFsdWUsXG4gICAgICAgIG9sZFRhcmdldFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChlZmZlY3QzLm9wdGlvbnMuc2NoZWR1bGVyKSB7XG4gICAgICBlZmZlY3QzLm9wdGlvbnMuc2NoZWR1bGVyKGVmZmVjdDMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlZmZlY3QzKCk7XG4gICAgfVxuICB9O1xuICBlZmZlY3RzLmZvckVhY2gocnVuKTtcbn1cbnZhciBpc05vblRyYWNrYWJsZUtleXMgPSAvKiBAX19QVVJFX18gKi8gbWFrZU1hcChgX19wcm90b19fLF9fdl9pc1JlZixfX2lzVnVlYCk7XG52YXIgYnVpbHRJblN5bWJvbHMgPSBuZXcgU2V0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKFN5bWJvbCkubWFwKChrZXkpID0+IFN5bWJvbFtrZXldKS5maWx0ZXIoaXNTeW1ib2wpKTtcbnZhciBnZXQyID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZUdldHRlcigpO1xudmFyIHJlYWRvbmx5R2V0ID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZUdldHRlcih0cnVlKTtcbnZhciBhcnJheUluc3RydW1lbnRhdGlvbnMgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlQXJyYXlJbnN0cnVtZW50YXRpb25zKCk7XG5mdW5jdGlvbiBjcmVhdGVBcnJheUluc3RydW1lbnRhdGlvbnMoKSB7XG4gIGNvbnN0IGluc3RydW1lbnRhdGlvbnMgPSB7fTtcbiAgW1wiaW5jbHVkZXNcIiwgXCJpbmRleE9mXCIsIFwibGFzdEluZGV4T2ZcIl0uZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaW5zdHJ1bWVudGF0aW9uc1trZXldID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgY29uc3QgYXJyID0gdG9SYXcodGhpcyk7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRyYWNrKGFyciwgXCJnZXRcIiwgaSArIFwiXCIpO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzID0gYXJyW2tleV0oLi4uYXJncyk7XG4gICAgICBpZiAocmVzID09PSAtMSB8fCByZXMgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBhcnJba2V5XSguLi5hcmdzLm1hcCh0b1JhdykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgW1wicHVzaFwiLCBcInBvcFwiLCBcInNoaWZ0XCIsIFwidW5zaGlmdFwiLCBcInNwbGljZVwiXS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpbnN0cnVtZW50YXRpb25zW2tleV0gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICBwYXVzZVRyYWNraW5nKCk7XG4gICAgICBjb25zdCByZXMgPSB0b1Jhdyh0aGlzKVtrZXldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgcmVzZXRUcmFja2luZygpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIGluc3RydW1lbnRhdGlvbnM7XG59XG5mdW5jdGlvbiBjcmVhdGVHZXR0ZXIoaXNSZWFkb25seSA9IGZhbHNlLCBzaGFsbG93ID0gZmFsc2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldDModGFyZ2V0LCBrZXksIHJlY2VpdmVyKSB7XG4gICAgaWYgKGtleSA9PT0gXCJfX3ZfaXNSZWFjdGl2ZVwiKSB7XG4gICAgICByZXR1cm4gIWlzUmVhZG9ubHk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiX192X2lzUmVhZG9ubHlcIikge1xuICAgICAgcmV0dXJuIGlzUmVhZG9ubHk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiX192X3Jhd1wiICYmIHJlY2VpdmVyID09PSAoaXNSZWFkb25seSA/IHNoYWxsb3cgPyBzaGFsbG93UmVhZG9ubHlNYXAgOiByZWFkb25seU1hcCA6IHNoYWxsb3cgPyBzaGFsbG93UmVhY3RpdmVNYXAgOiByZWFjdGl2ZU1hcCkuZ2V0KHRhcmdldCkpIHtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldElzQXJyYXkgPSBpc0FycmF5KHRhcmdldCk7XG4gICAgaWYgKCFpc1JlYWRvbmx5ICYmIHRhcmdldElzQXJyYXkgJiYgaGFzT3duKGFycmF5SW5zdHJ1bWVudGF0aW9ucywga2V5KSkge1xuICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KGFycmF5SW5zdHJ1bWVudGF0aW9ucywga2V5LCByZWNlaXZlcik7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCByZWNlaXZlcik7XG4gICAgaWYgKGlzU3ltYm9sKGtleSkgPyBidWlsdEluU3ltYm9scy5oYXMoa2V5KSA6IGlzTm9uVHJhY2thYmxlS2V5cyhrZXkpKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoIWlzUmVhZG9ubHkpIHtcbiAgICAgIHRyYWNrKHRhcmdldCwgXCJnZXRcIiwga2V5KTtcbiAgICB9XG4gICAgaWYgKHNoYWxsb3cpIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGlmIChpc1JlZihyZXMpKSB7XG4gICAgICBjb25zdCBzaG91bGRVbndyYXAgPSAhdGFyZ2V0SXNBcnJheSB8fCAhaXNJbnRlZ2VyS2V5KGtleSk7XG4gICAgICByZXR1cm4gc2hvdWxkVW53cmFwID8gcmVzLnZhbHVlIDogcmVzO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3QocmVzKSkge1xuICAgICAgcmV0dXJuIGlzUmVhZG9ubHkgPyByZWFkb25seShyZXMpIDogcmVhY3RpdmUyKHJlcyk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG59XG52YXIgc2V0MiA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTZXR0ZXIoKTtcbmZ1bmN0aW9uIGNyZWF0ZVNldHRlcihzaGFsbG93ID0gZmFsc2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNldDModGFyZ2V0LCBrZXksIHZhbHVlLCByZWNlaXZlcikge1xuICAgIGxldCBvbGRWYWx1ZSA9IHRhcmdldFtrZXldO1xuICAgIGlmICghc2hhbGxvdykge1xuICAgICAgdmFsdWUgPSB0b1Jhdyh2YWx1ZSk7XG4gICAgICBvbGRWYWx1ZSA9IHRvUmF3KG9sZFZhbHVlKTtcbiAgICAgIGlmICghaXNBcnJheSh0YXJnZXQpICYmIGlzUmVmKG9sZFZhbHVlKSAmJiAhaXNSZWYodmFsdWUpKSB7XG4gICAgICAgIG9sZFZhbHVlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBoYWRLZXkgPSBpc0FycmF5KHRhcmdldCkgJiYgaXNJbnRlZ2VyS2V5KGtleSkgPyBOdW1iZXIoa2V5KSA8IHRhcmdldC5sZW5ndGggOiBoYXNPd24odGFyZ2V0LCBrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgIGlmICh0YXJnZXQgPT09IHRvUmF3KHJlY2VpdmVyKSkge1xuICAgICAgaWYgKCFoYWRLZXkpIHtcbiAgICAgICAgdHJpZ2dlcih0YXJnZXQsIFwiYWRkXCIsIGtleSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChoYXNDaGFuZ2VkKHZhbHVlLCBvbGRWYWx1ZSkpIHtcbiAgICAgICAgdHJpZ2dlcih0YXJnZXQsIFwic2V0XCIsIGtleSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gIGNvbnN0IGhhZEtleSA9IGhhc093bih0YXJnZXQsIGtleSk7XG4gIGNvbnN0IG9sZFZhbHVlID0gdGFyZ2V0W2tleV07XG4gIGNvbnN0IHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpO1xuICBpZiAocmVzdWx0ICYmIGhhZEtleSkge1xuICAgIHRyaWdnZXIodGFyZ2V0LCBcImRlbGV0ZVwiLCBrZXksIHZvaWQgMCwgb2xkVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBoYXModGFyZ2V0LCBrZXkpIHtcbiAgY29uc3QgcmVzdWx0ID0gUmVmbGVjdC5oYXModGFyZ2V0LCBrZXkpO1xuICBpZiAoIWlzU3ltYm9sKGtleSkgfHwgIWJ1aWx0SW5TeW1ib2xzLmhhcyhrZXkpKSB7XG4gICAgdHJhY2sodGFyZ2V0LCBcImhhc1wiLCBrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBvd25LZXlzKHRhcmdldCkge1xuICB0cmFjayh0YXJnZXQsIFwiaXRlcmF0ZVwiLCBpc0FycmF5KHRhcmdldCkgPyBcImxlbmd0aFwiIDogSVRFUkFURV9LRVkpO1xuICByZXR1cm4gUmVmbGVjdC5vd25LZXlzKHRhcmdldCk7XG59XG52YXIgbXV0YWJsZUhhbmRsZXJzID0ge1xuICBnZXQ6IGdldDIsXG4gIHNldDogc2V0MixcbiAgZGVsZXRlUHJvcGVydHksXG4gIGhhcyxcbiAgb3duS2V5c1xufTtcbnZhciByZWFkb25seUhhbmRsZXJzID0ge1xuICBnZXQ6IHJlYWRvbmx5R2V0LFxuICBzZXQodGFyZ2V0LCBrZXkpIHtcbiAgICBpZiAodHJ1ZSkge1xuICAgICAgY29uc29sZS53YXJuKGBTZXQgb3BlcmF0aW9uIG9uIGtleSBcIiR7U3RyaW5nKGtleSl9XCIgZmFpbGVkOiB0YXJnZXQgaXMgcmVhZG9ubHkuYCwgdGFyZ2V0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gICAgaWYgKHRydWUpIHtcbiAgICAgIGNvbnNvbGUud2FybihgRGVsZXRlIG9wZXJhdGlvbiBvbiBrZXkgXCIke1N0cmluZyhrZXkpfVwiIGZhaWxlZDogdGFyZ2V0IGlzIHJlYWRvbmx5LmAsIHRhcmdldCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xudmFyIHRvUmVhY3RpdmUgPSAodmFsdWUpID0+IGlzT2JqZWN0KHZhbHVlKSA/IHJlYWN0aXZlMih2YWx1ZSkgOiB2YWx1ZTtcbnZhciB0b1JlYWRvbmx5ID0gKHZhbHVlKSA9PiBpc09iamVjdCh2YWx1ZSkgPyByZWFkb25seSh2YWx1ZSkgOiB2YWx1ZTtcbnZhciB0b1NoYWxsb3cgPSAodmFsdWUpID0+IHZhbHVlO1xudmFyIGdldFByb3RvID0gKHYpID0+IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2Yodik7XG5mdW5jdGlvbiBnZXQkMSh0YXJnZXQsIGtleSwgaXNSZWFkb25seSA9IGZhbHNlLCBpc1NoYWxsb3cgPSBmYWxzZSkge1xuICB0YXJnZXQgPSB0YXJnZXRbXG4gICAgXCJfX3ZfcmF3XCJcbiAgICAvKiBSQVcgKi9cbiAgXTtcbiAgY29uc3QgcmF3VGFyZ2V0ID0gdG9SYXcodGFyZ2V0KTtcbiAgY29uc3QgcmF3S2V5ID0gdG9SYXcoa2V5KTtcbiAgaWYgKGtleSAhPT0gcmF3S2V5KSB7XG4gICAgIWlzUmVhZG9ubHkgJiYgdHJhY2socmF3VGFyZ2V0LCBcImdldFwiLCBrZXkpO1xuICB9XG4gICFpc1JlYWRvbmx5ICYmIHRyYWNrKHJhd1RhcmdldCwgXCJnZXRcIiwgcmF3S2V5KTtcbiAgY29uc3QgeyBoYXM6IGhhczIgfSA9IGdldFByb3RvKHJhd1RhcmdldCk7XG4gIGNvbnN0IHdyYXAgPSBpc1NoYWxsb3cgPyB0b1NoYWxsb3cgOiBpc1JlYWRvbmx5ID8gdG9SZWFkb25seSA6IHRvUmVhY3RpdmU7XG4gIGlmIChoYXMyLmNhbGwocmF3VGFyZ2V0LCBrZXkpKSB7XG4gICAgcmV0dXJuIHdyYXAodGFyZ2V0LmdldChrZXkpKTtcbiAgfSBlbHNlIGlmIChoYXMyLmNhbGwocmF3VGFyZ2V0LCByYXdLZXkpKSB7XG4gICAgcmV0dXJuIHdyYXAodGFyZ2V0LmdldChyYXdLZXkpKTtcbiAgfSBlbHNlIGlmICh0YXJnZXQgIT09IHJhd1RhcmdldCkge1xuICAgIHRhcmdldC5nZXQoa2V5KTtcbiAgfVxufVxuZnVuY3Rpb24gaGFzJDEoa2V5LCBpc1JlYWRvbmx5ID0gZmFsc2UpIHtcbiAgY29uc3QgdGFyZ2V0ID0gdGhpc1tcbiAgICBcIl9fdl9yYXdcIlxuICAgIC8qIFJBVyAqL1xuICBdO1xuICBjb25zdCByYXdUYXJnZXQgPSB0b1Jhdyh0YXJnZXQpO1xuICBjb25zdCByYXdLZXkgPSB0b1JhdyhrZXkpO1xuICBpZiAoa2V5ICE9PSByYXdLZXkpIHtcbiAgICAhaXNSZWFkb25seSAmJiB0cmFjayhyYXdUYXJnZXQsIFwiaGFzXCIsIGtleSk7XG4gIH1cbiAgIWlzUmVhZG9ubHkgJiYgdHJhY2socmF3VGFyZ2V0LCBcImhhc1wiLCByYXdLZXkpO1xuICByZXR1cm4ga2V5ID09PSByYXdLZXkgPyB0YXJnZXQuaGFzKGtleSkgOiB0YXJnZXQuaGFzKGtleSkgfHwgdGFyZ2V0LmhhcyhyYXdLZXkpO1xufVxuZnVuY3Rpb24gc2l6ZSh0YXJnZXQsIGlzUmVhZG9ubHkgPSBmYWxzZSkge1xuICB0YXJnZXQgPSB0YXJnZXRbXG4gICAgXCJfX3ZfcmF3XCJcbiAgICAvKiBSQVcgKi9cbiAgXTtcbiAgIWlzUmVhZG9ubHkgJiYgdHJhY2sodG9SYXcodGFyZ2V0KSwgXCJpdGVyYXRlXCIsIElURVJBVEVfS0VZKTtcbiAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgXCJzaXplXCIsIHRhcmdldCk7XG59XG5mdW5jdGlvbiBhZGQodmFsdWUpIHtcbiAgdmFsdWUgPSB0b1Jhdyh2YWx1ZSk7XG4gIGNvbnN0IHRhcmdldCA9IHRvUmF3KHRoaXMpO1xuICBjb25zdCBwcm90byA9IGdldFByb3RvKHRhcmdldCk7XG4gIGNvbnN0IGhhZEtleSA9IHByb3RvLmhhcy5jYWxsKHRhcmdldCwgdmFsdWUpO1xuICBpZiAoIWhhZEtleSkge1xuICAgIHRhcmdldC5hZGQodmFsdWUpO1xuICAgIHRyaWdnZXIodGFyZ2V0LCBcImFkZFwiLCB2YWx1ZSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gc2V0JDEoa2V5LCB2YWx1ZSkge1xuICB2YWx1ZSA9IHRvUmF3KHZhbHVlKTtcbiAgY29uc3QgdGFyZ2V0ID0gdG9SYXcodGhpcyk7XG4gIGNvbnN0IHsgaGFzOiBoYXMyLCBnZXQ6IGdldDMgfSA9IGdldFByb3RvKHRhcmdldCk7XG4gIGxldCBoYWRLZXkgPSBoYXMyLmNhbGwodGFyZ2V0LCBrZXkpO1xuICBpZiAoIWhhZEtleSkge1xuICAgIGtleSA9IHRvUmF3KGtleSk7XG4gICAgaGFkS2V5ID0gaGFzMi5jYWxsKHRhcmdldCwga2V5KTtcbiAgfSBlbHNlIGlmICh0cnVlKSB7XG4gICAgY2hlY2tJZGVudGl0eUtleXModGFyZ2V0LCBoYXMyLCBrZXkpO1xuICB9XG4gIGNvbnN0IG9sZFZhbHVlID0gZ2V0My5jYWxsKHRhcmdldCwga2V5KTtcbiAgdGFyZ2V0LnNldChrZXksIHZhbHVlKTtcbiAgaWYgKCFoYWRLZXkpIHtcbiAgICB0cmlnZ2VyKHRhcmdldCwgXCJhZGRcIiwga2V5LCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoaGFzQ2hhbmdlZCh2YWx1ZSwgb2xkVmFsdWUpKSB7XG4gICAgdHJpZ2dlcih0YXJnZXQsIFwic2V0XCIsIGtleSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIGRlbGV0ZUVudHJ5KGtleSkge1xuICBjb25zdCB0YXJnZXQgPSB0b1Jhdyh0aGlzKTtcbiAgY29uc3QgeyBoYXM6IGhhczIsIGdldDogZ2V0MyB9ID0gZ2V0UHJvdG8odGFyZ2V0KTtcbiAgbGV0IGhhZEtleSA9IGhhczIuY2FsbCh0YXJnZXQsIGtleSk7XG4gIGlmICghaGFkS2V5KSB7XG4gICAga2V5ID0gdG9SYXcoa2V5KTtcbiAgICBoYWRLZXkgPSBoYXMyLmNhbGwodGFyZ2V0LCBrZXkpO1xuICB9IGVsc2UgaWYgKHRydWUpIHtcbiAgICBjaGVja0lkZW50aXR5S2V5cyh0YXJnZXQsIGhhczIsIGtleSk7XG4gIH1cbiAgY29uc3Qgb2xkVmFsdWUgPSBnZXQzID8gZ2V0My5jYWxsKHRhcmdldCwga2V5KSA6IHZvaWQgMDtcbiAgY29uc3QgcmVzdWx0ID0gdGFyZ2V0LmRlbGV0ZShrZXkpO1xuICBpZiAoaGFkS2V5KSB7XG4gICAgdHJpZ2dlcih0YXJnZXQsIFwiZGVsZXRlXCIsIGtleSwgdm9pZCAwLCBvbGRWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGNsZWFyKCkge1xuICBjb25zdCB0YXJnZXQgPSB0b1Jhdyh0aGlzKTtcbiAgY29uc3QgaGFkSXRlbXMgPSB0YXJnZXQuc2l6ZSAhPT0gMDtcbiAgY29uc3Qgb2xkVGFyZ2V0ID0gdHJ1ZSA/IGlzTWFwKHRhcmdldCkgPyBuZXcgTWFwKHRhcmdldCkgOiBuZXcgU2V0KHRhcmdldCkgOiB2b2lkIDA7XG4gIGNvbnN0IHJlc3VsdCA9IHRhcmdldC5jbGVhcigpO1xuICBpZiAoaGFkSXRlbXMpIHtcbiAgICB0cmlnZ2VyKHRhcmdldCwgXCJjbGVhclwiLCB2b2lkIDAsIHZvaWQgMCwgb2xkVGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY3JlYXRlRm9yRWFjaChpc1JlYWRvbmx5LCBpc1NoYWxsb3cpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBjb25zdCBvYnNlcnZlZCA9IHRoaXM7XG4gICAgY29uc3QgdGFyZ2V0ID0gb2JzZXJ2ZWRbXG4gICAgICBcIl9fdl9yYXdcIlxuICAgICAgLyogUkFXICovXG4gICAgXTtcbiAgICBjb25zdCByYXdUYXJnZXQgPSB0b1Jhdyh0YXJnZXQpO1xuICAgIGNvbnN0IHdyYXAgPSBpc1NoYWxsb3cgPyB0b1NoYWxsb3cgOiBpc1JlYWRvbmx5ID8gdG9SZWFkb25seSA6IHRvUmVhY3RpdmU7XG4gICAgIWlzUmVhZG9ubHkgJiYgdHJhY2socmF3VGFyZ2V0LCBcIml0ZXJhdGVcIiwgSVRFUkFURV9LRVkpO1xuICAgIHJldHVybiB0YXJnZXQuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgd3JhcCh2YWx1ZSksIHdyYXAoa2V5KSwgb2JzZXJ2ZWQpO1xuICAgIH0pO1xuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCBpc1JlYWRvbmx5LCBpc1NoYWxsb3cpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzW1xuICAgICAgXCJfX3ZfcmF3XCJcbiAgICAgIC8qIFJBVyAqL1xuICAgIF07XG4gICAgY29uc3QgcmF3VGFyZ2V0ID0gdG9SYXcodGFyZ2V0KTtcbiAgICBjb25zdCB0YXJnZXRJc01hcCA9IGlzTWFwKHJhd1RhcmdldCk7XG4gICAgY29uc3QgaXNQYWlyID0gbWV0aG9kID09PSBcImVudHJpZXNcIiB8fCBtZXRob2QgPT09IFN5bWJvbC5pdGVyYXRvciAmJiB0YXJnZXRJc01hcDtcbiAgICBjb25zdCBpc0tleU9ubHkgPSBtZXRob2QgPT09IFwia2V5c1wiICYmIHRhcmdldElzTWFwO1xuICAgIGNvbnN0IGlubmVySXRlcmF0b3IgPSB0YXJnZXRbbWV0aG9kXSguLi5hcmdzKTtcbiAgICBjb25zdCB3cmFwID0gaXNTaGFsbG93ID8gdG9TaGFsbG93IDogaXNSZWFkb25seSA/IHRvUmVhZG9ubHkgOiB0b1JlYWN0aXZlO1xuICAgICFpc1JlYWRvbmx5ICYmIHRyYWNrKHJhd1RhcmdldCwgXCJpdGVyYXRlXCIsIGlzS2V5T25seSA/IE1BUF9LRVlfSVRFUkFURV9LRVkgOiBJVEVSQVRFX0tFWSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIGl0ZXJhdG9yIHByb3RvY29sXG4gICAgICBuZXh0KCkge1xuICAgICAgICBjb25zdCB7IHZhbHVlLCBkb25lIH0gPSBpbm5lckl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgcmV0dXJuIGRvbmUgPyB7IHZhbHVlLCBkb25lIH0gOiB7XG4gICAgICAgICAgdmFsdWU6IGlzUGFpciA/IFt3cmFwKHZhbHVlWzBdKSwgd3JhcCh2YWx1ZVsxXSldIDogd3JhcCh2YWx1ZSksXG4gICAgICAgICAgZG9uZVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIC8vIGl0ZXJhYmxlIHByb3RvY29sXG4gICAgICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVJlYWRvbmx5TWV0aG9kKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICBpZiAodHJ1ZSkge1xuICAgICAgY29uc3Qga2V5ID0gYXJnc1swXSA/IGBvbiBrZXkgXCIke2FyZ3NbMF19XCIgYCA6IGBgO1xuICAgICAgY29uc29sZS53YXJuKGAke2NhcGl0YWxpemUodHlwZSl9IG9wZXJhdGlvbiAke2tleX1mYWlsZWQ6IHRhcmdldCBpcyByZWFkb25seS5gLCB0b1Jhdyh0aGlzKSk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlID09PSBcImRlbGV0ZVwiID8gZmFsc2UgOiB0aGlzO1xuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlSW5zdHJ1bWVudGF0aW9ucygpIHtcbiAgY29uc3QgbXV0YWJsZUluc3RydW1lbnRhdGlvbnMyID0ge1xuICAgIGdldChrZXkpIHtcbiAgICAgIHJldHVybiBnZXQkMSh0aGlzLCBrZXkpO1xuICAgIH0sXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICByZXR1cm4gc2l6ZSh0aGlzKTtcbiAgICB9LFxuICAgIGhhczogaGFzJDEsXG4gICAgYWRkLFxuICAgIHNldDogc2V0JDEsXG4gICAgZGVsZXRlOiBkZWxldGVFbnRyeSxcbiAgICBjbGVhcixcbiAgICBmb3JFYWNoOiBjcmVhdGVGb3JFYWNoKGZhbHNlLCBmYWxzZSlcbiAgfTtcbiAgY29uc3Qgc2hhbGxvd0luc3RydW1lbnRhdGlvbnMyID0ge1xuICAgIGdldChrZXkpIHtcbiAgICAgIHJldHVybiBnZXQkMSh0aGlzLCBrZXksIGZhbHNlLCB0cnVlKTtcbiAgICB9LFxuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHNpemUodGhpcyk7XG4gICAgfSxcbiAgICBoYXM6IGhhcyQxLFxuICAgIGFkZCxcbiAgICBzZXQ6IHNldCQxLFxuICAgIGRlbGV0ZTogZGVsZXRlRW50cnksXG4gICAgY2xlYXIsXG4gICAgZm9yRWFjaDogY3JlYXRlRm9yRWFjaChmYWxzZSwgdHJ1ZSlcbiAgfTtcbiAgY29uc3QgcmVhZG9ubHlJbnN0cnVtZW50YXRpb25zMiA9IHtcbiAgICBnZXQoa2V5KSB7XG4gICAgICByZXR1cm4gZ2V0JDEodGhpcywga2V5LCB0cnVlKTtcbiAgICB9LFxuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHNpemUodGhpcywgdHJ1ZSk7XG4gICAgfSxcbiAgICBoYXMoa2V5KSB7XG4gICAgICByZXR1cm4gaGFzJDEuY2FsbCh0aGlzLCBrZXksIHRydWUpO1xuICAgIH0sXG4gICAgYWRkOiBjcmVhdGVSZWFkb25seU1ldGhvZChcbiAgICAgIFwiYWRkXCJcbiAgICAgIC8qIEFERCAqL1xuICAgICksXG4gICAgc2V0OiBjcmVhdGVSZWFkb25seU1ldGhvZChcbiAgICAgIFwic2V0XCJcbiAgICAgIC8qIFNFVCAqL1xuICAgICksXG4gICAgZGVsZXRlOiBjcmVhdGVSZWFkb25seU1ldGhvZChcbiAgICAgIFwiZGVsZXRlXCJcbiAgICAgIC8qIERFTEVURSAqL1xuICAgICksXG4gICAgY2xlYXI6IGNyZWF0ZVJlYWRvbmx5TWV0aG9kKFxuICAgICAgXCJjbGVhclwiXG4gICAgICAvKiBDTEVBUiAqL1xuICAgICksXG4gICAgZm9yRWFjaDogY3JlYXRlRm9yRWFjaCh0cnVlLCBmYWxzZSlcbiAgfTtcbiAgY29uc3Qgc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9uczIgPSB7XG4gICAgZ2V0KGtleSkge1xuICAgICAgcmV0dXJuIGdldCQxKHRoaXMsIGtleSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfSxcbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiBzaXplKHRoaXMsIHRydWUpO1xuICAgIH0sXG4gICAgaGFzKGtleSkge1xuICAgICAgcmV0dXJuIGhhcyQxLmNhbGwodGhpcywga2V5LCB0cnVlKTtcbiAgICB9LFxuICAgIGFkZDogY3JlYXRlUmVhZG9ubHlNZXRob2QoXG4gICAgICBcImFkZFwiXG4gICAgICAvKiBBREQgKi9cbiAgICApLFxuICAgIHNldDogY3JlYXRlUmVhZG9ubHlNZXRob2QoXG4gICAgICBcInNldFwiXG4gICAgICAvKiBTRVQgKi9cbiAgICApLFxuICAgIGRlbGV0ZTogY3JlYXRlUmVhZG9ubHlNZXRob2QoXG4gICAgICBcImRlbGV0ZVwiXG4gICAgICAvKiBERUxFVEUgKi9cbiAgICApLFxuICAgIGNsZWFyOiBjcmVhdGVSZWFkb25seU1ldGhvZChcbiAgICAgIFwiY2xlYXJcIlxuICAgICAgLyogQ0xFQVIgKi9cbiAgICApLFxuICAgIGZvckVhY2g6IGNyZWF0ZUZvckVhY2godHJ1ZSwgdHJ1ZSlcbiAgfTtcbiAgY29uc3QgaXRlcmF0b3JNZXRob2RzID0gW1wia2V5c1wiLCBcInZhbHVlc1wiLCBcImVudHJpZXNcIiwgU3ltYm9sLml0ZXJhdG9yXTtcbiAgaXRlcmF0b3JNZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgIG11dGFibGVJbnN0cnVtZW50YXRpb25zMlttZXRob2RdID0gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCBmYWxzZSwgZmFsc2UpO1xuICAgIHJlYWRvbmx5SW5zdHJ1bWVudGF0aW9uczJbbWV0aG9kXSA9IGNyZWF0ZUl0ZXJhYmxlTWV0aG9kKG1ldGhvZCwgdHJ1ZSwgZmFsc2UpO1xuICAgIHNoYWxsb3dJbnN0cnVtZW50YXRpb25zMlttZXRob2RdID0gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCBmYWxzZSwgdHJ1ZSk7XG4gICAgc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9uczJbbWV0aG9kXSA9IGNyZWF0ZUl0ZXJhYmxlTWV0aG9kKG1ldGhvZCwgdHJ1ZSwgdHJ1ZSk7XG4gIH0pO1xuICByZXR1cm4gW1xuICAgIG11dGFibGVJbnN0cnVtZW50YXRpb25zMixcbiAgICByZWFkb25seUluc3RydW1lbnRhdGlvbnMyLFxuICAgIHNoYWxsb3dJbnN0cnVtZW50YXRpb25zMixcbiAgICBzaGFsbG93UmVhZG9ubHlJbnN0cnVtZW50YXRpb25zMlxuICBdO1xufVxudmFyIFttdXRhYmxlSW5zdHJ1bWVudGF0aW9ucywgcmVhZG9ubHlJbnN0cnVtZW50YXRpb25zLCBzaGFsbG93SW5zdHJ1bWVudGF0aW9ucywgc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9uc10gPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlSW5zdHJ1bWVudGF0aW9ucygpO1xuZnVuY3Rpb24gY3JlYXRlSW5zdHJ1bWVudGF0aW9uR2V0dGVyKGlzUmVhZG9ubHksIHNoYWxsb3cpIHtcbiAgY29uc3QgaW5zdHJ1bWVudGF0aW9ucyA9IHNoYWxsb3cgPyBpc1JlYWRvbmx5ID8gc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9ucyA6IHNoYWxsb3dJbnN0cnVtZW50YXRpb25zIDogaXNSZWFkb25seSA/IHJlYWRvbmx5SW5zdHJ1bWVudGF0aW9ucyA6IG11dGFibGVJbnN0cnVtZW50YXRpb25zO1xuICByZXR1cm4gKHRhcmdldCwga2V5LCByZWNlaXZlcikgPT4ge1xuICAgIGlmIChrZXkgPT09IFwiX192X2lzUmVhY3RpdmVcIikge1xuICAgICAgcmV0dXJuICFpc1JlYWRvbmx5O1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9pc1JlYWRvbmx5XCIpIHtcbiAgICAgIHJldHVybiBpc1JlYWRvbmx5O1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9yYXdcIikge1xuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgcmV0dXJuIFJlZmxlY3QuZ2V0KGhhc093bihpbnN0cnVtZW50YXRpb25zLCBrZXkpICYmIGtleSBpbiB0YXJnZXQgPyBpbnN0cnVtZW50YXRpb25zIDogdGFyZ2V0LCBrZXksIHJlY2VpdmVyKTtcbiAgfTtcbn1cbnZhciBtdXRhYmxlQ29sbGVjdGlvbkhhbmRsZXJzID0ge1xuICBnZXQ6IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVJbnN0cnVtZW50YXRpb25HZXR0ZXIoZmFsc2UsIGZhbHNlKVxufTtcbnZhciByZWFkb25seUNvbGxlY3Rpb25IYW5kbGVycyA9IHtcbiAgZ2V0OiAvKiBAX19QVVJFX18gKi8gY3JlYXRlSW5zdHJ1bWVudGF0aW9uR2V0dGVyKHRydWUsIGZhbHNlKVxufTtcbmZ1bmN0aW9uIGNoZWNrSWRlbnRpdHlLZXlzKHRhcmdldCwgaGFzMiwga2V5KSB7XG4gIGNvbnN0IHJhd0tleSA9IHRvUmF3KGtleSk7XG4gIGlmIChyYXdLZXkgIT09IGtleSAmJiBoYXMyLmNhbGwodGFyZ2V0LCByYXdLZXkpKSB7XG4gICAgY29uc3QgdHlwZSA9IHRvUmF3VHlwZSh0YXJnZXQpO1xuICAgIGNvbnNvbGUud2FybihgUmVhY3RpdmUgJHt0eXBlfSBjb250YWlucyBib3RoIHRoZSByYXcgYW5kIHJlYWN0aXZlIHZlcnNpb25zIG9mIHRoZSBzYW1lIG9iamVjdCR7dHlwZSA9PT0gYE1hcGAgPyBgIGFzIGtleXNgIDogYGB9LCB3aGljaCBjYW4gbGVhZCB0byBpbmNvbnNpc3RlbmNpZXMuIEF2b2lkIGRpZmZlcmVudGlhdGluZyBiZXR3ZWVuIHRoZSByYXcgYW5kIHJlYWN0aXZlIHZlcnNpb25zIG9mIGFuIG9iamVjdCBhbmQgb25seSB1c2UgdGhlIHJlYWN0aXZlIHZlcnNpb24gaWYgcG9zc2libGUuYCk7XG4gIH1cbn1cbnZhciByZWFjdGl2ZU1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xudmFyIHNoYWxsb3dSZWFjdGl2ZU1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xudmFyIHJlYWRvbmx5TWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG52YXIgc2hhbGxvd1JlYWRvbmx5TWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG5mdW5jdGlvbiB0YXJnZXRUeXBlTWFwKHJhd1R5cGUpIHtcbiAgc3dpdGNoIChyYXdUeXBlKSB7XG4gICAgY2FzZSBcIk9iamVjdFwiOlxuICAgIGNhc2UgXCJBcnJheVwiOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSBcIk1hcFwiOlxuICAgIGNhc2UgXCJTZXRcIjpcbiAgICBjYXNlIFwiV2Vha01hcFwiOlxuICAgIGNhc2UgXCJXZWFrU2V0XCI6XG4gICAgICByZXR1cm4gMjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDA7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFRhcmdldFR5cGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlW1xuICAgIFwiX192X3NraXBcIlxuICAgIC8qIFNLSVAgKi9cbiAgXSB8fCAhT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWx1ZSkgPyAwIDogdGFyZ2V0VHlwZU1hcCh0b1Jhd1R5cGUodmFsdWUpKTtcbn1cbmZ1bmN0aW9uIHJlYWN0aXZlMih0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCAmJiB0YXJnZXRbXG4gICAgXCJfX3ZfaXNSZWFkb25seVwiXG4gICAgLyogSVNfUkVBRE9OTFkgKi9cbiAgXSkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZVJlYWN0aXZlT2JqZWN0KHRhcmdldCwgZmFsc2UsIG11dGFibGVIYW5kbGVycywgbXV0YWJsZUNvbGxlY3Rpb25IYW5kbGVycywgcmVhY3RpdmVNYXApO1xufVxuZnVuY3Rpb24gcmVhZG9ubHkodGFyZ2V0KSB7XG4gIHJldHVybiBjcmVhdGVSZWFjdGl2ZU9iamVjdCh0YXJnZXQsIHRydWUsIHJlYWRvbmx5SGFuZGxlcnMsIHJlYWRvbmx5Q29sbGVjdGlvbkhhbmRsZXJzLCByZWFkb25seU1hcCk7XG59XG5mdW5jdGlvbiBjcmVhdGVSZWFjdGl2ZU9iamVjdCh0YXJnZXQsIGlzUmVhZG9ubHksIGJhc2VIYW5kbGVycywgY29sbGVjdGlvbkhhbmRsZXJzLCBwcm94eU1hcCkge1xuICBpZiAoIWlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICBpZiAodHJ1ZSkge1xuICAgICAgY29uc29sZS53YXJuKGB2YWx1ZSBjYW5ub3QgYmUgbWFkZSByZWFjdGl2ZTogJHtTdHJpbmcodGFyZ2V0KX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBpZiAodGFyZ2V0W1xuICAgIFwiX192X3Jhd1wiXG4gICAgLyogUkFXICovXG4gIF0gJiYgIShpc1JlYWRvbmx5ICYmIHRhcmdldFtcbiAgICBcIl9fdl9pc1JlYWN0aXZlXCJcbiAgICAvKiBJU19SRUFDVElWRSAqL1xuICBdKSkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgY29uc3QgZXhpc3RpbmdQcm94eSA9IHByb3h5TWFwLmdldCh0YXJnZXQpO1xuICBpZiAoZXhpc3RpbmdQcm94eSkge1xuICAgIHJldHVybiBleGlzdGluZ1Byb3h5O1xuICB9XG4gIGNvbnN0IHRhcmdldFR5cGUgPSBnZXRUYXJnZXRUeXBlKHRhcmdldCk7XG4gIGlmICh0YXJnZXRUeXBlID09PSAwKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0YXJnZXQsIHRhcmdldFR5cGUgPT09IDIgPyBjb2xsZWN0aW9uSGFuZGxlcnMgOiBiYXNlSGFuZGxlcnMpO1xuICBwcm94eU1hcC5zZXQodGFyZ2V0LCBwcm94eSk7XG4gIHJldHVybiBwcm94eTtcbn1cbmZ1bmN0aW9uIHRvUmF3KG9ic2VydmVkKSB7XG4gIHJldHVybiBvYnNlcnZlZCAmJiB0b1JhdyhvYnNlcnZlZFtcbiAgICBcIl9fdl9yYXdcIlxuICAgIC8qIFJBVyAqL1xuICBdKSB8fCBvYnNlcnZlZDtcbn1cbmZ1bmN0aW9uIGlzUmVmKHIpIHtcbiAgcmV0dXJuIEJvb2xlYW4ociAmJiByLl9fdl9pc1JlZiA9PT0gdHJ1ZSk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9tYWdpY3MvJG5leHRUaWNrLmpzXG5tYWdpYyhcIm5leHRUaWNrXCIsICgpID0+IG5leHRUaWNrKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kZGlzcGF0Y2guanNcbm1hZ2ljKFwiZGlzcGF0Y2hcIiwgKGVsKSA9PiBkaXNwYXRjaC5iaW5kKGRpc3BhdGNoLCBlbCkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyR3YXRjaC5qc1xubWFnaWMoXCJ3YXRjaFwiLCAoZWwsIHsgZXZhbHVhdGVMYXRlcjogZXZhbHVhdGVMYXRlcjIsIGNsZWFudXA6IGNsZWFudXAyIH0pID0+IChrZXksIGNhbGxiYWNrKSA9PiB7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyMihrZXkpO1xuICBsZXQgZ2V0dGVyID0gKCkgPT4ge1xuICAgIGxldCB2YWx1ZTtcbiAgICBldmFsdWF0ZTIoKGkpID0+IHZhbHVlID0gaSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuICBsZXQgdW53YXRjaCA9IHdhdGNoKGdldHRlciwgY2FsbGJhY2spO1xuICBjbGVhbnVwMih1bndhdGNoKTtcbn0pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRzdG9yZS5qc1xubWFnaWMoXCJzdG9yZVwiLCBnZXRTdG9yZXMpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRkYXRhLmpzXG5tYWdpYyhcImRhdGFcIiwgKGVsKSA9PiBzY29wZShlbCkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRyb290LmpzXG5tYWdpYyhcInJvb3RcIiwgKGVsKSA9PiBjbG9zZXN0Um9vdChlbCkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRyZWZzLmpzXG5tYWdpYyhcInJlZnNcIiwgKGVsKSA9PiB7XG4gIGlmIChlbC5feF9yZWZzX3Byb3h5KVxuICAgIHJldHVybiBlbC5feF9yZWZzX3Byb3h5O1xuICBlbC5feF9yZWZzX3Byb3h5ID0gbWVyZ2VQcm94aWVzKGdldEFycmF5T2ZSZWZPYmplY3QoZWwpKTtcbiAgcmV0dXJuIGVsLl94X3JlZnNfcHJveHk7XG59KTtcbmZ1bmN0aW9uIGdldEFycmF5T2ZSZWZPYmplY3QoZWwpIHtcbiAgbGV0IHJlZk9iamVjdHMgPSBbXTtcbiAgZmluZENsb3Nlc3QoZWwsIChpKSA9PiB7XG4gICAgaWYgKGkuX3hfcmVmcylcbiAgICAgIHJlZk9iamVjdHMucHVzaChpLl94X3JlZnMpO1xuICB9KTtcbiAgcmV0dXJuIHJlZk9iamVjdHM7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9pZHMuanNcbnZhciBnbG9iYWxJZE1lbW8gPSB7fTtcbmZ1bmN0aW9uIGZpbmRBbmRJbmNyZW1lbnRJZChuYW1lKSB7XG4gIGlmICghZ2xvYmFsSWRNZW1vW25hbWVdKVxuICAgIGdsb2JhbElkTWVtb1tuYW1lXSA9IDA7XG4gIHJldHVybiArK2dsb2JhbElkTWVtb1tuYW1lXTtcbn1cbmZ1bmN0aW9uIGNsb3Nlc3RJZFJvb3QoZWwsIG5hbWUpIHtcbiAgcmV0dXJuIGZpbmRDbG9zZXN0KGVsLCAoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50Ll94X2lkcyAmJiBlbGVtZW50Ll94X2lkc1tuYW1lXSlcbiAgICAgIHJldHVybiB0cnVlO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHNldElkUm9vdChlbCwgbmFtZSkge1xuICBpZiAoIWVsLl94X2lkcylcbiAgICBlbC5feF9pZHMgPSB7fTtcbiAgaWYgKCFlbC5feF9pZHNbbmFtZV0pXG4gICAgZWwuX3hfaWRzW25hbWVdID0gZmluZEFuZEluY3JlbWVudElkKG5hbWUpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRpZC5qc1xubWFnaWMoXCJpZFwiLCAoZWwsIHsgY2xlYW51cDogY2xlYW51cDIgfSkgPT4gKG5hbWUsIGtleSA9IG51bGwpID0+IHtcbiAgbGV0IGNhY2hlS2V5ID0gYCR7bmFtZX0ke2tleSA/IGAtJHtrZXl9YCA6IFwiXCJ9YDtcbiAgcmV0dXJuIGNhY2hlSWRCeU5hbWVPbkVsZW1lbnQoZWwsIGNhY2hlS2V5LCBjbGVhbnVwMiwgKCkgPT4ge1xuICAgIGxldCByb290ID0gY2xvc2VzdElkUm9vdChlbCwgbmFtZSk7XG4gICAgbGV0IGlkID0gcm9vdCA/IHJvb3QuX3hfaWRzW25hbWVdIDogZmluZEFuZEluY3JlbWVudElkKG5hbWUpO1xuICAgIHJldHVybiBrZXkgPyBgJHtuYW1lfS0ke2lkfS0ke2tleX1gIDogYCR7bmFtZX0tJHtpZH1gO1xuICB9KTtcbn0pO1xuaW50ZXJjZXB0Q2xvbmUoKGZyb20sIHRvKSA9PiB7XG4gIGlmIChmcm9tLl94X2lkKSB7XG4gICAgdG8uX3hfaWQgPSBmcm9tLl94X2lkO1xuICB9XG59KTtcbmZ1bmN0aW9uIGNhY2hlSWRCeU5hbWVPbkVsZW1lbnQoZWwsIGNhY2hlS2V5LCBjbGVhbnVwMiwgY2FsbGJhY2spIHtcbiAgaWYgKCFlbC5feF9pZClcbiAgICBlbC5feF9pZCA9IHt9O1xuICBpZiAoZWwuX3hfaWRbY2FjaGVLZXldKVxuICAgIHJldHVybiBlbC5feF9pZFtjYWNoZUtleV07XG4gIGxldCBvdXRwdXQgPSBjYWxsYmFjaygpO1xuICBlbC5feF9pZFtjYWNoZUtleV0gPSBvdXRwdXQ7XG4gIGNsZWFudXAyKCgpID0+IHtcbiAgICBkZWxldGUgZWwuX3hfaWRbY2FjaGVLZXldO1xuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kZWwuanNcbm1hZ2ljKFwiZWxcIiwgKGVsKSA9PiBlbCk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9tYWdpY3MvaW5kZXguanNcbndhcm5NaXNzaW5nUGx1Z2luTWFnaWMoXCJGb2N1c1wiLCBcImZvY3VzXCIsIFwiZm9jdXNcIik7XG53YXJuTWlzc2luZ1BsdWdpbk1hZ2ljKFwiUGVyc2lzdFwiLCBcInBlcnNpc3RcIiwgXCJwZXJzaXN0XCIpO1xuZnVuY3Rpb24gd2Fybk1pc3NpbmdQbHVnaW5NYWdpYyhuYW1lLCBtYWdpY05hbWUsIHNsdWcpIHtcbiAgbWFnaWMobWFnaWNOYW1lLCAoZWwpID0+IHdhcm4oYFlvdSBjYW4ndCB1c2UgWyQke21hZ2ljTmFtZX1dIHdpdGhvdXQgZmlyc3QgaW5zdGFsbGluZyB0aGUgXCIke25hbWV9XCIgcGx1Z2luIGhlcmU6IGh0dHBzOi8vYWxwaW5lanMuZGV2L3BsdWdpbnMvJHtzbHVnfWAsIGVsKSk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtbW9kZWxhYmxlLmpzXG5kaXJlY3RpdmUoXCJtb2RlbGFibGVcIiwgKGVsLCB7IGV4cHJlc3Npb24gfSwgeyBlZmZlY3Q6IGVmZmVjdDMsIGV2YWx1YXRlTGF0ZXI6IGV2YWx1YXRlTGF0ZXIyLCBjbGVhbnVwOiBjbGVhbnVwMiB9KSA9PiB7XG4gIGxldCBmdW5jID0gZXZhbHVhdGVMYXRlcjIoZXhwcmVzc2lvbik7XG4gIGxldCBpbm5lckdldCA9ICgpID0+IHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGZ1bmMoKGkpID0+IHJlc3VsdCA9IGkpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIGxldCBldmFsdWF0ZUlubmVyU2V0ID0gZXZhbHVhdGVMYXRlcjIoYCR7ZXhwcmVzc2lvbn0gPSBfX3BsYWNlaG9sZGVyYCk7XG4gIGxldCBpbm5lclNldCA9ICh2YWwpID0+IGV2YWx1YXRlSW5uZXJTZXQoKCkgPT4ge1xuICB9LCB7IHNjb3BlOiB7IFwiX19wbGFjZWhvbGRlclwiOiB2YWwgfSB9KTtcbiAgbGV0IGluaXRpYWxWYWx1ZSA9IGlubmVyR2V0KCk7XG4gIGlubmVyU2V0KGluaXRpYWxWYWx1ZSk7XG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpZiAoIWVsLl94X21vZGVsKVxuICAgICAgcmV0dXJuO1xuICAgIGVsLl94X3JlbW92ZU1vZGVsTGlzdGVuZXJzW1wiZGVmYXVsdFwiXSgpO1xuICAgIGxldCBvdXRlckdldCA9IGVsLl94X21vZGVsLmdldDtcbiAgICBsZXQgb3V0ZXJTZXQgPSBlbC5feF9tb2RlbC5zZXQ7XG4gICAgbGV0IHJlbGVhc2VFbnRhbmdsZW1lbnQgPSBlbnRhbmdsZShcbiAgICAgIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBvdXRlckdldCgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICBvdXRlclNldCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gaW5uZXJHZXQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgaW5uZXJTZXQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICBjbGVhbnVwMihyZWxlYXNlRW50YW5nbGVtZW50KTtcbiAgfSk7XG59KTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC10ZWxlcG9ydC5qc1xuZGlyZWN0aXZlKFwidGVsZXBvcnRcIiwgKGVsLCB7IG1vZGlmaWVycywgZXhwcmVzc2lvbiB9LCB7IGNsZWFudXA6IGNsZWFudXAyIH0pID0+IHtcbiAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJ0ZW1wbGF0ZVwiKVxuICAgIHdhcm4oXCJ4LXRlbGVwb3J0IGNhbiBvbmx5IGJlIHVzZWQgb24gYSA8dGVtcGxhdGU+IHRhZ1wiLCBlbCk7XG4gIGxldCB0YXJnZXQgPSBnZXRUYXJnZXQoZXhwcmVzc2lvbik7XG4gIGxldCBjbG9uZTIgPSBlbC5jb250ZW50LmNsb25lTm9kZSh0cnVlKS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgZWwuX3hfdGVsZXBvcnQgPSBjbG9uZTI7XG4gIGNsb25lMi5feF90ZWxlcG9ydEJhY2sgPSBlbDtcbiAgZWwuc2V0QXR0cmlidXRlKFwiZGF0YS10ZWxlcG9ydC10ZW1wbGF0ZVwiLCB0cnVlKTtcbiAgY2xvbmUyLnNldEF0dHJpYnV0ZShcImRhdGEtdGVsZXBvcnQtdGFyZ2V0XCIsIHRydWUpO1xuICBpZiAoZWwuX3hfZm9yd2FyZEV2ZW50cykge1xuICAgIGVsLl94X2ZvcndhcmRFdmVudHMuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICBjbG9uZTIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIChlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IGUuY29uc3RydWN0b3IoZS50eXBlLCBlKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBhZGRTY29wZVRvTm9kZShjbG9uZTIsIHt9LCBlbCk7XG4gIGxldCBwbGFjZUluRG9tID0gKGNsb25lMywgdGFyZ2V0MiwgbW9kaWZpZXJzMikgPT4ge1xuICAgIGlmIChtb2RpZmllcnMyLmluY2x1ZGVzKFwicHJlcGVuZFwiKSkge1xuICAgICAgdGFyZ2V0Mi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZTMsIHRhcmdldDIpO1xuICAgIH0gZWxzZSBpZiAobW9kaWZpZXJzMi5pbmNsdWRlcyhcImFwcGVuZFwiKSkge1xuICAgICAgdGFyZ2V0Mi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZTMsIHRhcmdldDIubmV4dFNpYmxpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQyLmFwcGVuZENoaWxkKGNsb25lMyk7XG4gICAgfVxuICB9O1xuICBtdXRhdGVEb20oKCkgPT4ge1xuICAgIHBsYWNlSW5Eb20oY2xvbmUyLCB0YXJnZXQsIG1vZGlmaWVycyk7XG4gICAgc2tpcER1cmluZ0Nsb25lKCgpID0+IHtcbiAgICAgIGluaXRUcmVlKGNsb25lMik7XG4gICAgfSkoKTtcbiAgfSk7XG4gIGVsLl94X3RlbGVwb3J0UHV0QmFjayA9ICgpID0+IHtcbiAgICBsZXQgdGFyZ2V0MiA9IGdldFRhcmdldChleHByZXNzaW9uKTtcbiAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgcGxhY2VJbkRvbShlbC5feF90ZWxlcG9ydCwgdGFyZ2V0MiwgbW9kaWZpZXJzKTtcbiAgICB9KTtcbiAgfTtcbiAgY2xlYW51cDIoXG4gICAgKCkgPT4gbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgIGNsb25lMi5yZW1vdmUoKTtcbiAgICAgIGRlc3Ryb3lUcmVlKGNsb25lMik7XG4gICAgfSlcbiAgKTtcbn0pO1xudmFyIHRlbGVwb3J0Q29udGFpbmVyRHVyaW5nQ2xvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KGV4cHJlc3Npb24pIHtcbiAgbGV0IHRhcmdldCA9IHNraXBEdXJpbmdDbG9uZSgoKSA9PiB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZXhwcmVzc2lvbik7XG4gIH0sICgpID0+IHtcbiAgICByZXR1cm4gdGVsZXBvcnRDb250YWluZXJEdXJpbmdDbG9uZTtcbiAgfSkoKTtcbiAgaWYgKCF0YXJnZXQpXG4gICAgd2FybihgQ2Fubm90IGZpbmQgeC10ZWxlcG9ydCBlbGVtZW50IGZvciBzZWxlY3RvcjogXCIke2V4cHJlc3Npb259XCJgKTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1pZ25vcmUuanNcbnZhciBoYW5kbGVyID0gKCkgPT4ge1xufTtcbmhhbmRsZXIuaW5saW5lID0gKGVsLCB7IG1vZGlmaWVycyB9LCB7IGNsZWFudXA6IGNsZWFudXAyIH0pID0+IHtcbiAgbW9kaWZpZXJzLmluY2x1ZGVzKFwic2VsZlwiKSA/IGVsLl94X2lnbm9yZVNlbGYgPSB0cnVlIDogZWwuX3hfaWdub3JlID0gdHJ1ZTtcbiAgY2xlYW51cDIoKCkgPT4ge1xuICAgIG1vZGlmaWVycy5pbmNsdWRlcyhcInNlbGZcIikgPyBkZWxldGUgZWwuX3hfaWdub3JlU2VsZiA6IGRlbGV0ZSBlbC5feF9pZ25vcmU7XG4gIH0pO1xufTtcbmRpcmVjdGl2ZShcImlnbm9yZVwiLCBoYW5kbGVyKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1lZmZlY3QuanNcbmRpcmVjdGl2ZShcImVmZmVjdFwiLCBza2lwRHVyaW5nQ2xvbmUoKGVsLCB7IGV4cHJlc3Npb24gfSwgeyBlZmZlY3Q6IGVmZmVjdDMgfSkgPT4ge1xuICBlZmZlY3QzKGV2YWx1YXRlTGF0ZXIoZWwsIGV4cHJlc3Npb24pKTtcbn0pKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL29uLmpzXG5mdW5jdGlvbiBvbihlbCwgZXZlbnQsIG1vZGlmaWVycywgY2FsbGJhY2spIHtcbiAgbGV0IGxpc3RlbmVyVGFyZ2V0ID0gZWw7XG4gIGxldCBoYW5kbGVyNCA9IChlKSA9PiBjYWxsYmFjayhlKTtcbiAgbGV0IG9wdGlvbnMgPSB7fTtcbiAgbGV0IHdyYXBIYW5kbGVyID0gKGNhbGxiYWNrMiwgd3JhcHBlcikgPT4gKGUpID0+IHdyYXBwZXIoY2FsbGJhY2syLCBlKTtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImRvdFwiKSlcbiAgICBldmVudCA9IGRvdFN5bnRheChldmVudCk7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJjYW1lbFwiKSlcbiAgICBldmVudCA9IGNhbWVsQ2FzZTIoZXZlbnQpO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwicGFzc2l2ZVwiKSlcbiAgICBvcHRpb25zLnBhc3NpdmUgPSB0cnVlO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiY2FwdHVyZVwiKSlcbiAgICBvcHRpb25zLmNhcHR1cmUgPSB0cnVlO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwid2luZG93XCIpKVxuICAgIGxpc3RlbmVyVGFyZ2V0ID0gd2luZG93O1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiZG9jdW1lbnRcIikpXG4gICAgbGlzdGVuZXJUYXJnZXQgPSBkb2N1bWVudDtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImRlYm91bmNlXCIpKSB7XG4gICAgbGV0IG5leHRNb2RpZmllciA9IG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihcImRlYm91bmNlXCIpICsgMV0gfHwgXCJpbnZhbGlkLXdhaXRcIjtcbiAgICBsZXQgd2FpdCA9IGlzTnVtZXJpYyhuZXh0TW9kaWZpZXIuc3BsaXQoXCJtc1wiKVswXSkgPyBOdW1iZXIobmV4dE1vZGlmaWVyLnNwbGl0KFwibXNcIilbMF0pIDogMjUwO1xuICAgIGhhbmRsZXI0ID0gZGVib3VuY2UoaGFuZGxlcjQsIHdhaXQpO1xuICB9XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJ0aHJvdHRsZVwiKSkge1xuICAgIGxldCBuZXh0TW9kaWZpZXIgPSBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2YoXCJ0aHJvdHRsZVwiKSArIDFdIHx8IFwiaW52YWxpZC13YWl0XCI7XG4gICAgbGV0IHdhaXQgPSBpc051bWVyaWMobmV4dE1vZGlmaWVyLnNwbGl0KFwibXNcIilbMF0pID8gTnVtYmVyKG5leHRNb2RpZmllci5zcGxpdChcIm1zXCIpWzBdKSA6IDI1MDtcbiAgICBoYW5kbGVyNCA9IHRocm90dGxlKGhhbmRsZXI0LCB3YWl0KTtcbiAgfVxuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwicHJldmVudFwiKSlcbiAgICBoYW5kbGVyNCA9IHdyYXBIYW5kbGVyKGhhbmRsZXI0LCAobmV4dCwgZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbmV4dChlKTtcbiAgICB9KTtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcInN0b3BcIikpXG4gICAgaGFuZGxlcjQgPSB3cmFwSGFuZGxlcihoYW5kbGVyNCwgKG5leHQsIGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBuZXh0KGUpO1xuICAgIH0pO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwib25jZVwiKSkge1xuICAgIGhhbmRsZXI0ID0gd3JhcEhhbmRsZXIoaGFuZGxlcjQsIChuZXh0LCBlKSA9PiB7XG4gICAgICBuZXh0KGUpO1xuICAgICAgbGlzdGVuZXJUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcjQsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJhd2F5XCIpIHx8IG1vZGlmaWVycy5pbmNsdWRlcyhcIm91dHNpZGVcIikpIHtcbiAgICBsaXN0ZW5lclRhcmdldCA9IGRvY3VtZW50O1xuICAgIGhhbmRsZXI0ID0gd3JhcEhhbmRsZXIoaGFuZGxlcjQsIChuZXh0LCBlKSA9PiB7XG4gICAgICBpZiAoZWwuY29udGFpbnMoZS50YXJnZXQpKVxuICAgICAgICByZXR1cm47XG4gICAgICBpZiAoZS50YXJnZXQuaXNDb25uZWN0ZWQgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm47XG4gICAgICBpZiAoZWwub2Zmc2V0V2lkdGggPCAxICYmIGVsLm9mZnNldEhlaWdodCA8IDEpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGlmIChlbC5feF9pc1Nob3duID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgbmV4dChlKTtcbiAgICB9KTtcbiAgfVxuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwic2VsZlwiKSlcbiAgICBoYW5kbGVyNCA9IHdyYXBIYW5kbGVyKGhhbmRsZXI0LCAobmV4dCwgZSkgPT4ge1xuICAgICAgZS50YXJnZXQgPT09IGVsICYmIG5leHQoZSk7XG4gICAgfSk7XG4gIGlmIChpc0tleUV2ZW50KGV2ZW50KSB8fCBpc0NsaWNrRXZlbnQoZXZlbnQpKSB7XG4gICAgaGFuZGxlcjQgPSB3cmFwSGFuZGxlcihoYW5kbGVyNCwgKG5leHQsIGUpID0+IHtcbiAgICAgIGlmIChpc0xpc3RlbmluZ0ZvckFTcGVjaWZpY0tleVRoYXRIYXNudEJlZW5QcmVzc2VkKGUsIG1vZGlmaWVycykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbmV4dChlKTtcbiAgICB9KTtcbiAgfVxuICBsaXN0ZW5lclRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyNCwgb3B0aW9ucyk7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgbGlzdGVuZXJUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcjQsIG9wdGlvbnMpO1xuICB9O1xufVxuZnVuY3Rpb24gZG90U3ludGF4KHN1YmplY3QpIHtcbiAgcmV0dXJuIHN1YmplY3QucmVwbGFjZSgvLS9nLCBcIi5cIik7XG59XG5mdW5jdGlvbiBjYW1lbENhc2UyKHN1YmplY3QpIHtcbiAgcmV0dXJuIHN1YmplY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tKFxcdykvZywgKG1hdGNoLCBjaGFyKSA9PiBjaGFyLnRvVXBwZXJDYXNlKCkpO1xufVxuZnVuY3Rpb24gaXNOdW1lcmljKHN1YmplY3QpIHtcbiAgcmV0dXJuICFBcnJheS5pc0FycmF5KHN1YmplY3QpICYmICFpc05hTihzdWJqZWN0KTtcbn1cbmZ1bmN0aW9uIGtlYmFiQ2FzZTIoc3ViamVjdCkge1xuICBpZiAoW1wiIFwiLCBcIl9cIl0uaW5jbHVkZXMoXG4gICAgc3ViamVjdFxuICApKVxuICAgIHJldHVybiBzdWJqZWN0O1xuICByZXR1cm4gc3ViamVjdC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCBcIiQxLSQyXCIpLnJlcGxhY2UoL1tfXFxzXS8sIFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xufVxuZnVuY3Rpb24gaXNLZXlFdmVudChldmVudCkge1xuICByZXR1cm4gW1wia2V5ZG93blwiLCBcImtleXVwXCJdLmluY2x1ZGVzKGV2ZW50KTtcbn1cbmZ1bmN0aW9uIGlzQ2xpY2tFdmVudChldmVudCkge1xuICByZXR1cm4gW1wiY29udGV4dG1lbnVcIiwgXCJjbGlja1wiLCBcIm1vdXNlXCJdLnNvbWUoKGkpID0+IGV2ZW50LmluY2x1ZGVzKGkpKTtcbn1cbmZ1bmN0aW9uIGlzTGlzdGVuaW5nRm9yQVNwZWNpZmljS2V5VGhhdEhhc250QmVlblByZXNzZWQoZSwgbW9kaWZpZXJzKSB7XG4gIGxldCBrZXlNb2RpZmllcnMgPSBtb2RpZmllcnMuZmlsdGVyKChpKSA9PiB7XG4gICAgcmV0dXJuICFbXCJ3aW5kb3dcIiwgXCJkb2N1bWVudFwiLCBcInByZXZlbnRcIiwgXCJzdG9wXCIsIFwib25jZVwiLCBcImNhcHR1cmVcIiwgXCJzZWxmXCIsIFwiYXdheVwiLCBcIm91dHNpZGVcIiwgXCJwYXNzaXZlXCJdLmluY2x1ZGVzKGkpO1xuICB9KTtcbiAgaWYgKGtleU1vZGlmaWVycy5pbmNsdWRlcyhcImRlYm91bmNlXCIpKSB7XG4gICAgbGV0IGRlYm91bmNlSW5kZXggPSBrZXlNb2RpZmllcnMuaW5kZXhPZihcImRlYm91bmNlXCIpO1xuICAgIGtleU1vZGlmaWVycy5zcGxpY2UoZGVib3VuY2VJbmRleCwgaXNOdW1lcmljKChrZXlNb2RpZmllcnNbZGVib3VuY2VJbmRleCArIDFdIHx8IFwiaW52YWxpZC13YWl0XCIpLnNwbGl0KFwibXNcIilbMF0pID8gMiA6IDEpO1xuICB9XG4gIGlmIChrZXlNb2RpZmllcnMuaW5jbHVkZXMoXCJ0aHJvdHRsZVwiKSkge1xuICAgIGxldCBkZWJvdW5jZUluZGV4ID0ga2V5TW9kaWZpZXJzLmluZGV4T2YoXCJ0aHJvdHRsZVwiKTtcbiAgICBrZXlNb2RpZmllcnMuc3BsaWNlKGRlYm91bmNlSW5kZXgsIGlzTnVtZXJpYygoa2V5TW9kaWZpZXJzW2RlYm91bmNlSW5kZXggKyAxXSB8fCBcImludmFsaWQtd2FpdFwiKS5zcGxpdChcIm1zXCIpWzBdKSA/IDIgOiAxKTtcbiAgfVxuICBpZiAoa2V5TW9kaWZpZXJzLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm4gZmFsc2U7XG4gIGlmIChrZXlNb2RpZmllcnMubGVuZ3RoID09PSAxICYmIGtleVRvTW9kaWZpZXJzKGUua2V5KS5pbmNsdWRlcyhrZXlNb2RpZmllcnNbMF0pKVxuICAgIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc3lzdGVtS2V5TW9kaWZpZXJzID0gW1wiY3RybFwiLCBcInNoaWZ0XCIsIFwiYWx0XCIsIFwibWV0YVwiLCBcImNtZFwiLCBcInN1cGVyXCJdO1xuICBjb25zdCBzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycyA9IHN5c3RlbUtleU1vZGlmaWVycy5maWx0ZXIoKG1vZGlmaWVyKSA9PiBrZXlNb2RpZmllcnMuaW5jbHVkZXMobW9kaWZpZXIpKTtcbiAga2V5TW9kaWZpZXJzID0ga2V5TW9kaWZpZXJzLmZpbHRlcigoaSkgPT4gIXNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzLmluY2x1ZGVzKGkpKTtcbiAgaWYgKHNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBhY3RpdmVseVByZXNzZWRLZXlNb2RpZmllcnMgPSBzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5maWx0ZXIoKG1vZGlmaWVyKSA9PiB7XG4gICAgICBpZiAobW9kaWZpZXIgPT09IFwiY21kXCIgfHwgbW9kaWZpZXIgPT09IFwic3VwZXJcIilcbiAgICAgICAgbW9kaWZpZXIgPSBcIm1ldGFcIjtcbiAgICAgIHJldHVybiBlW2Ake21vZGlmaWVyfUtleWBdO1xuICAgIH0pO1xuICAgIGlmIChhY3RpdmVseVByZXNzZWRLZXlNb2RpZmllcnMubGVuZ3RoID09PSBzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5sZW5ndGgpIHtcbiAgICAgIGlmIChpc0NsaWNrRXZlbnQoZS50eXBlKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGtleVRvTW9kaWZpZXJzKGUua2V5KS5pbmNsdWRlcyhrZXlNb2RpZmllcnNbMF0pKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24ga2V5VG9Nb2RpZmllcnMoa2V5KSB7XG4gIGlmICgha2V5KVxuICAgIHJldHVybiBbXTtcbiAga2V5ID0ga2ViYWJDYXNlMihrZXkpO1xuICBsZXQgbW9kaWZpZXJUb0tleU1hcCA9IHtcbiAgICBcImN0cmxcIjogXCJjb250cm9sXCIsXG4gICAgXCJzbGFzaFwiOiBcIi9cIixcbiAgICBcInNwYWNlXCI6IFwiIFwiLFxuICAgIFwic3BhY2ViYXJcIjogXCIgXCIsXG4gICAgXCJjbWRcIjogXCJtZXRhXCIsXG4gICAgXCJlc2NcIjogXCJlc2NhcGVcIixcbiAgICBcInVwXCI6IFwiYXJyb3ctdXBcIixcbiAgICBcImRvd25cIjogXCJhcnJvdy1kb3duXCIsXG4gICAgXCJsZWZ0XCI6IFwiYXJyb3ctbGVmdFwiLFxuICAgIFwicmlnaHRcIjogXCJhcnJvdy1yaWdodFwiLFxuICAgIFwicGVyaW9kXCI6IFwiLlwiLFxuICAgIFwiY29tbWFcIjogXCIsXCIsXG4gICAgXCJlcXVhbFwiOiBcIj1cIixcbiAgICBcIm1pbnVzXCI6IFwiLVwiLFxuICAgIFwidW5kZXJzY29yZVwiOiBcIl9cIlxuICB9O1xuICBtb2RpZmllclRvS2V5TWFwW2tleV0gPSBrZXk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhtb2RpZmllclRvS2V5TWFwKS5tYXAoKG1vZGlmaWVyKSA9PiB7XG4gICAgaWYgKG1vZGlmaWVyVG9LZXlNYXBbbW9kaWZpZXJdID09PSBrZXkpXG4gICAgICByZXR1cm4gbW9kaWZpZXI7XG4gIH0pLmZpbHRlcigobW9kaWZpZXIpID0+IG1vZGlmaWVyKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1tb2RlbC5qc1xuZGlyZWN0aXZlKFwibW9kZWxcIiwgKGVsLCB7IG1vZGlmaWVycywgZXhwcmVzc2lvbiB9LCB7IGVmZmVjdDogZWZmZWN0MywgY2xlYW51cDogY2xlYW51cDIgfSkgPT4ge1xuICBsZXQgc2NvcGVUYXJnZXQgPSBlbDtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcInBhcmVudFwiKSkge1xuICAgIHNjb3BlVGFyZ2V0ID0gZWwucGFyZW50Tm9kZTtcbiAgfVxuICBsZXQgZXZhbHVhdGVHZXQgPSBldmFsdWF0ZUxhdGVyKHNjb3BlVGFyZ2V0LCBleHByZXNzaW9uKTtcbiAgbGV0IGV2YWx1YXRlU2V0O1xuICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICBldmFsdWF0ZVNldCA9IGV2YWx1YXRlTGF0ZXIoc2NvcGVUYXJnZXQsIGAke2V4cHJlc3Npb259ID0gX19wbGFjZWhvbGRlcmApO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHByZXNzaW9uID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIGV4cHJlc3Npb24oKSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGV2YWx1YXRlU2V0ID0gZXZhbHVhdGVMYXRlcihzY29wZVRhcmdldCwgYCR7ZXhwcmVzc2lvbigpfSA9IF9fcGxhY2Vob2xkZXJgKTtcbiAgfSBlbHNlIHtcbiAgICBldmFsdWF0ZVNldCA9ICgpID0+IHtcbiAgICB9O1xuICB9XG4gIGxldCBnZXRWYWx1ZSA9ICgpID0+IHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGV2YWx1YXRlR2V0KCh2YWx1ZSkgPT4gcmVzdWx0ID0gdmFsdWUpO1xuICAgIHJldHVybiBpc0dldHRlclNldHRlcihyZXN1bHQpID8gcmVzdWx0LmdldCgpIDogcmVzdWx0O1xuICB9O1xuICBsZXQgc2V0VmFsdWUgPSAodmFsdWUpID0+IHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGV2YWx1YXRlR2V0KCh2YWx1ZTIpID0+IHJlc3VsdCA9IHZhbHVlMik7XG4gICAgaWYgKGlzR2V0dGVyU2V0dGVyKHJlc3VsdCkpIHtcbiAgICAgIHJlc3VsdC5zZXQodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmFsdWF0ZVNldCgoKSA9PiB7XG4gICAgICB9LCB7XG4gICAgICAgIHNjb3BlOiB7IFwiX19wbGFjZWhvbGRlclwiOiB2YWx1ZSB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gXCJzdHJpbmdcIiAmJiBlbC50eXBlID09PSBcInJhZGlvXCIpIHtcbiAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoXCJuYW1lXCIpKVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIGV4cHJlc3Npb24pO1xuICAgIH0pO1xuICB9XG4gIHZhciBldmVudCA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJzZWxlY3RcIiB8fCBbXCJjaGVja2JveFwiLCBcInJhZGlvXCJdLmluY2x1ZGVzKGVsLnR5cGUpIHx8IG1vZGlmaWVycy5pbmNsdWRlcyhcImxhenlcIikgPyBcImNoYW5nZVwiIDogXCJpbnB1dFwiO1xuICBsZXQgcmVtb3ZlTGlzdGVuZXIgPSBpc0Nsb25pbmcgPyAoKSA9PiB7XG4gIH0gOiBvbihlbCwgZXZlbnQsIG1vZGlmaWVycywgKGUpID0+IHtcbiAgICBzZXRWYWx1ZShnZXRJbnB1dFZhbHVlKGVsLCBtb2RpZmllcnMsIGUsIGdldFZhbHVlKCkpKTtcbiAgfSk7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJmaWxsXCIpKSB7XG4gICAgaWYgKFt2b2lkIDAsIG51bGwsIFwiXCJdLmluY2x1ZGVzKGdldFZhbHVlKCkpIHx8IGlzQ2hlY2tib3goZWwpICYmIEFycmF5LmlzQXJyYXkoZ2V0VmFsdWUoKSkgfHwgZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInNlbGVjdFwiICYmIGVsLm11bHRpcGxlKSB7XG4gICAgICBzZXRWYWx1ZShcbiAgICAgICAgZ2V0SW5wdXRWYWx1ZShlbCwgbW9kaWZpZXJzLCB7IHRhcmdldDogZWwgfSwgZ2V0VmFsdWUoKSlcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGlmICghZWwuX3hfcmVtb3ZlTW9kZWxMaXN0ZW5lcnMpXG4gICAgZWwuX3hfcmVtb3ZlTW9kZWxMaXN0ZW5lcnMgPSB7fTtcbiAgZWwuX3hfcmVtb3ZlTW9kZWxMaXN0ZW5lcnNbXCJkZWZhdWx0XCJdID0gcmVtb3ZlTGlzdGVuZXI7XG4gIGNsZWFudXAyKCgpID0+IGVsLl94X3JlbW92ZU1vZGVsTGlzdGVuZXJzW1wiZGVmYXVsdFwiXSgpKTtcbiAgaWYgKGVsLmZvcm0pIHtcbiAgICBsZXQgcmVtb3ZlUmVzZXRMaXN0ZW5lciA9IG9uKGVsLmZvcm0sIFwicmVzZXRcIiwgW10sIChlKSA9PiB7XG4gICAgICBuZXh0VGljaygoKSA9PiBlbC5feF9tb2RlbCAmJiBlbC5feF9tb2RlbC5zZXQoZ2V0SW5wdXRWYWx1ZShlbCwgbW9kaWZpZXJzLCB7IHRhcmdldDogZWwgfSwgZ2V0VmFsdWUoKSkpKTtcbiAgICB9KTtcbiAgICBjbGVhbnVwMigoKSA9PiByZW1vdmVSZXNldExpc3RlbmVyKCkpO1xuICB9XG4gIGVsLl94X21vZGVsID0ge1xuICAgIGdldCgpIHtcbiAgICAgIHJldHVybiBnZXRWYWx1ZSgpO1xuICAgIH0sXG4gICAgc2V0KHZhbHVlKSB7XG4gICAgICBzZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9O1xuICBlbC5feF9mb3JjZU1vZGVsVXBkYXRlID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSB2b2lkIDAgJiYgdHlwZW9mIGV4cHJlc3Npb24gPT09IFwic3RyaW5nXCIgJiYgZXhwcmVzc2lvbi5tYXRjaCgvXFwuLykpXG4gICAgICB2YWx1ZSA9IFwiXCI7XG4gICAgd2luZG93LmZyb21Nb2RlbCA9IHRydWU7XG4gICAgbXV0YXRlRG9tKCgpID0+IGJpbmQoZWwsIFwidmFsdWVcIiwgdmFsdWUpKTtcbiAgICBkZWxldGUgd2luZG93LmZyb21Nb2RlbDtcbiAgfTtcbiAgZWZmZWN0MygoKSA9PiB7XG4gICAgbGV0IHZhbHVlID0gZ2V0VmFsdWUoKTtcbiAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwidW5pbnRydXNpdmVcIikgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGVsKSlcbiAgICAgIHJldHVybjtcbiAgICBlbC5feF9mb3JjZU1vZGVsVXBkYXRlKHZhbHVlKTtcbiAgfSk7XG59KTtcbmZ1bmN0aW9uIGdldElucHV0VmFsdWUoZWwsIG1vZGlmaWVycywgZXZlbnQsIGN1cnJlbnRWYWx1ZSkge1xuICByZXR1cm4gbXV0YXRlRG9tKCgpID0+IHtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBDdXN0b21FdmVudCAmJiBldmVudC5kZXRhaWwgIT09IHZvaWQgMClcbiAgICAgIHJldHVybiBldmVudC5kZXRhaWwgIT09IG51bGwgJiYgZXZlbnQuZGV0YWlsICE9PSB2b2lkIDAgPyBldmVudC5kZXRhaWwgOiBldmVudC50YXJnZXQudmFsdWU7XG4gICAgZWxzZSBpZiAoaXNDaGVja2JveChlbCkpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gbnVsbDtcbiAgICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcIm51bWJlclwiKSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gc2FmZVBhcnNlTnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiYm9vbGVhblwiKSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gc2FmZVBhcnNlQm9vbGVhbihldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQuY2hlY2tlZCA/IGN1cnJlbnRWYWx1ZS5pbmNsdWRlcyhuZXdWYWx1ZSkgPyBjdXJyZW50VmFsdWUgOiBjdXJyZW50VmFsdWUuY29uY2F0KFtuZXdWYWx1ZV0pIDogY3VycmVudFZhbHVlLmZpbHRlcigoZWwyKSA9PiAhY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUyKGVsMiwgbmV3VmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJzZWxlY3RcIiAmJiBlbC5tdWx0aXBsZSkge1xuICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcIm51bWJlclwiKSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zKS5tYXAoKG9wdGlvbikgPT4ge1xuICAgICAgICAgIGxldCByYXdWYWx1ZSA9IG9wdGlvbi52YWx1ZSB8fCBvcHRpb24udGV4dDtcbiAgICAgICAgICByZXR1cm4gc2FmZVBhcnNlTnVtYmVyKHJhd1ZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImJvb2xlYW5cIikpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9ucykubWFwKChvcHRpb24pID0+IHtcbiAgICAgICAgICBsZXQgcmF3VmFsdWUgPSBvcHRpb24udmFsdWUgfHwgb3B0aW9uLnRleHQ7XG4gICAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUJvb2xlYW4ocmF3VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnMpLm1hcCgob3B0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcHRpb24udmFsdWUgfHwgb3B0aW9uLnRleHQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG5ld1ZhbHVlO1xuICAgICAgaWYgKGlzUmFkaW8oZWwpKSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1ZhbHVlID0gY3VycmVudFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJudW1iZXJcIikpIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZU51bWJlcihuZXdWYWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImJvb2xlYW5cIikpIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUJvb2xlYW4obmV3VmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJ0cmltXCIpKSB7XG4gICAgICAgIHJldHVybiBuZXdWYWx1ZS50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIHNhZmVQYXJzZU51bWJlcihyYXdWYWx1ZSkge1xuICBsZXQgbnVtYmVyID0gcmF3VmFsdWUgPyBwYXJzZUZsb2F0KHJhd1ZhbHVlKSA6IG51bGw7XG4gIHJldHVybiBpc051bWVyaWMyKG51bWJlcikgPyBudW1iZXIgOiByYXdWYWx1ZTtcbn1cbmZ1bmN0aW9uIGNoZWNrZWRBdHRyTG9vc2VDb21wYXJlMih2YWx1ZUEsIHZhbHVlQikge1xuICByZXR1cm4gdmFsdWVBID09IHZhbHVlQjtcbn1cbmZ1bmN0aW9uIGlzTnVtZXJpYzIoc3ViamVjdCkge1xuICByZXR1cm4gIUFycmF5LmlzQXJyYXkoc3ViamVjdCkgJiYgIWlzTmFOKHN1YmplY3QpO1xufVxuZnVuY3Rpb24gaXNHZXR0ZXJTZXR0ZXIodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUuZ2V0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIHZhbHVlLnNldCA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWNsb2FrLmpzXG5kaXJlY3RpdmUoXCJjbG9ha1wiLCAoZWwpID0+IHF1ZXVlTWljcm90YXNrKCgpID0+IG11dGF0ZURvbSgoKSA9PiBlbC5yZW1vdmVBdHRyaWJ1dGUocHJlZml4KFwiY2xvYWtcIikpKSkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWluaXQuanNcbmFkZEluaXRTZWxlY3RvcigoKSA9PiBgWyR7cHJlZml4KFwiaW5pdFwiKX1dYCk7XG5kaXJlY3RpdmUoXCJpbml0XCIsIHNraXBEdXJpbmdDbG9uZSgoZWwsIHsgZXhwcmVzc2lvbiB9LCB7IGV2YWx1YXRlOiBldmFsdWF0ZTIgfSkgPT4ge1xuICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gISFleHByZXNzaW9uLnRyaW0oKSAmJiBldmFsdWF0ZTIoZXhwcmVzc2lvbiwge30sIGZhbHNlKTtcbiAgfVxuICByZXR1cm4gZXZhbHVhdGUyKGV4cHJlc3Npb24sIHt9LCBmYWxzZSk7XG59KSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtdGV4dC5qc1xuZGlyZWN0aXZlKFwidGV4dFwiLCAoZWwsIHsgZXhwcmVzc2lvbiB9LCB7IGVmZmVjdDogZWZmZWN0MywgZXZhbHVhdGVMYXRlcjogZXZhbHVhdGVMYXRlcjIgfSkgPT4ge1xuICBsZXQgZXZhbHVhdGUyID0gZXZhbHVhdGVMYXRlcjIoZXhwcmVzc2lvbik7XG4gIGVmZmVjdDMoKCkgPT4ge1xuICAgIGV2YWx1YXRlMigodmFsdWUpID0+IHtcbiAgICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1odG1sLmpzXG5kaXJlY3RpdmUoXCJodG1sXCIsIChlbCwgeyBleHByZXNzaW9uIH0sIHsgZWZmZWN0OiBlZmZlY3QzLCBldmFsdWF0ZUxhdGVyOiBldmFsdWF0ZUxhdGVyMiB9KSA9PiB7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyMihleHByZXNzaW9uKTtcbiAgZWZmZWN0MygoKSA9PiB7XG4gICAgZXZhbHVhdGUyKCh2YWx1ZSkgPT4ge1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgIGVsLl94X2lnbm9yZVNlbGYgPSB0cnVlO1xuICAgICAgICBpbml0VHJlZShlbCk7XG4gICAgICAgIGRlbGV0ZSBlbC5feF9pZ25vcmVTZWxmO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtYmluZC5qc1xubWFwQXR0cmlidXRlcyhzdGFydGluZ1dpdGgoXCI6XCIsIGludG8ocHJlZml4KFwiYmluZDpcIikpKSk7XG52YXIgaGFuZGxlcjIgPSAoZWwsIHsgdmFsdWUsIG1vZGlmaWVycywgZXhwcmVzc2lvbiwgb3JpZ2luYWwgfSwgeyBlZmZlY3Q6IGVmZmVjdDMsIGNsZWFudXA6IGNsZWFudXAyIH0pID0+IHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIGxldCBiaW5kaW5nUHJvdmlkZXJzID0ge307XG4gICAgaW5qZWN0QmluZGluZ1Byb3ZpZGVycyhiaW5kaW5nUHJvdmlkZXJzKTtcbiAgICBsZXQgZ2V0QmluZGluZ3MgPSBldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKTtcbiAgICBnZXRCaW5kaW5ncygoYmluZGluZ3MpID0+IHtcbiAgICAgIGFwcGx5QmluZGluZ3NPYmplY3QoZWwsIGJpbmRpbmdzLCBvcmlnaW5hbCk7XG4gICAgfSwgeyBzY29wZTogYmluZGluZ1Byb3ZpZGVycyB9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHZhbHVlID09PSBcImtleVwiKVxuICAgIHJldHVybiBzdG9yZUtleUZvclhGb3IoZWwsIGV4cHJlc3Npb24pO1xuICBpZiAoZWwuX3hfaW5saW5lQmluZGluZ3MgJiYgZWwuX3hfaW5saW5lQmluZGluZ3NbdmFsdWVdICYmIGVsLl94X2lubGluZUJpbmRpbmdzW3ZhbHVlXS5leHRyYWN0KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKTtcbiAgZWZmZWN0MygoKSA9PiBldmFsdWF0ZTIoKHJlc3VsdCkgPT4ge1xuICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCAmJiB0eXBlb2YgZXhwcmVzc2lvbiA9PT0gXCJzdHJpbmdcIiAmJiBleHByZXNzaW9uLm1hdGNoKC9cXC4vKSkge1xuICAgICAgcmVzdWx0ID0gXCJcIjtcbiAgICB9XG4gICAgbXV0YXRlRG9tKCgpID0+IGJpbmQoZWwsIHZhbHVlLCByZXN1bHQsIG1vZGlmaWVycykpO1xuICB9KSk7XG4gIGNsZWFudXAyKCgpID0+IHtcbiAgICBlbC5feF91bmRvQWRkZWRDbGFzc2VzICYmIGVsLl94X3VuZG9BZGRlZENsYXNzZXMoKTtcbiAgICBlbC5feF91bmRvQWRkZWRTdHlsZXMgJiYgZWwuX3hfdW5kb0FkZGVkU3R5bGVzKCk7XG4gIH0pO1xufTtcbmhhbmRsZXIyLmlubGluZSA9IChlbCwgeyB2YWx1ZSwgbW9kaWZpZXJzLCBleHByZXNzaW9uIH0pID0+IHtcbiAgaWYgKCF2YWx1ZSlcbiAgICByZXR1cm47XG4gIGlmICghZWwuX3hfaW5saW5lQmluZGluZ3MpXG4gICAgZWwuX3hfaW5saW5lQmluZGluZ3MgPSB7fTtcbiAgZWwuX3hfaW5saW5lQmluZGluZ3NbdmFsdWVdID0geyBleHByZXNzaW9uLCBleHRyYWN0OiBmYWxzZSB9O1xufTtcbmRpcmVjdGl2ZShcImJpbmRcIiwgaGFuZGxlcjIpO1xuZnVuY3Rpb24gc3RvcmVLZXlGb3JYRm9yKGVsLCBleHByZXNzaW9uKSB7XG4gIGVsLl94X2tleUV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWRhdGEuanNcbmFkZFJvb3RTZWxlY3RvcigoKSA9PiBgWyR7cHJlZml4KFwiZGF0YVwiKX1dYCk7XG5kaXJlY3RpdmUoXCJkYXRhXCIsIChlbCwgeyBleHByZXNzaW9uIH0sIHsgY2xlYW51cDogY2xlYW51cDIgfSkgPT4ge1xuICBpZiAoc2hvdWxkU2tpcFJlZ2lzdGVyaW5nRGF0YUR1cmluZ0Nsb25lKGVsKSlcbiAgICByZXR1cm47XG4gIGV4cHJlc3Npb24gPSBleHByZXNzaW9uID09PSBcIlwiID8gXCJ7fVwiIDogZXhwcmVzc2lvbjtcbiAgbGV0IG1hZ2ljQ29udGV4dCA9IHt9O1xuICBpbmplY3RNYWdpY3MobWFnaWNDb250ZXh0LCBlbCk7XG4gIGxldCBkYXRhUHJvdmlkZXJDb250ZXh0ID0ge307XG4gIGluamVjdERhdGFQcm92aWRlcnMoZGF0YVByb3ZpZGVyQ29udGV4dCwgbWFnaWNDb250ZXh0KTtcbiAgbGV0IGRhdGEyID0gZXZhbHVhdGUoZWwsIGV4cHJlc3Npb24sIHsgc2NvcGU6IGRhdGFQcm92aWRlckNvbnRleHQgfSk7XG4gIGlmIChkYXRhMiA9PT0gdm9pZCAwIHx8IGRhdGEyID09PSB0cnVlKVxuICAgIGRhdGEyID0ge307XG4gIGluamVjdE1hZ2ljcyhkYXRhMiwgZWwpO1xuICBsZXQgcmVhY3RpdmVEYXRhID0gcmVhY3RpdmUoZGF0YTIpO1xuICBpbml0SW50ZXJjZXB0b3JzKHJlYWN0aXZlRGF0YSk7XG4gIGxldCB1bmRvID0gYWRkU2NvcGVUb05vZGUoZWwsIHJlYWN0aXZlRGF0YSk7XG4gIHJlYWN0aXZlRGF0YVtcImluaXRcIl0gJiYgZXZhbHVhdGUoZWwsIHJlYWN0aXZlRGF0YVtcImluaXRcIl0pO1xuICBjbGVhbnVwMigoKSA9PiB7XG4gICAgcmVhY3RpdmVEYXRhW1wiZGVzdHJveVwiXSAmJiBldmFsdWF0ZShlbCwgcmVhY3RpdmVEYXRhW1wiZGVzdHJveVwiXSk7XG4gICAgdW5kbygpO1xuICB9KTtcbn0pO1xuaW50ZXJjZXB0Q2xvbmUoKGZyb20sIHRvKSA9PiB7XG4gIGlmIChmcm9tLl94X2RhdGFTdGFjaykge1xuICAgIHRvLl94X2RhdGFTdGFjayA9IGZyb20uX3hfZGF0YVN0YWNrO1xuICAgIHRvLnNldEF0dHJpYnV0ZShcImRhdGEtaGFzLWFscGluZS1zdGF0ZVwiLCB0cnVlKTtcbiAgfVxufSk7XG5mdW5jdGlvbiBzaG91bGRTa2lwUmVnaXN0ZXJpbmdEYXRhRHVyaW5nQ2xvbmUoZWwpIHtcbiAgaWYgKCFpc0Nsb25pbmcpXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoaXNDbG9uaW5nTGVnYWN5KVxuICAgIHJldHVybiB0cnVlO1xuICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKFwiZGF0YS1oYXMtYWxwaW5lLXN0YXRlXCIpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LXNob3cuanNcbmRpcmVjdGl2ZShcInNob3dcIiwgKGVsLCB7IG1vZGlmaWVycywgZXhwcmVzc2lvbiB9LCB7IGVmZmVjdDogZWZmZWN0MyB9KSA9PiB7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKTtcbiAgaWYgKCFlbC5feF9kb0hpZGUpXG4gICAgZWwuX3hfZG9IaWRlID0gKCkgPT4ge1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgZWwuc3R5bGUuc2V0UHJvcGVydHkoXCJkaXNwbGF5XCIsIFwibm9uZVwiLCBtb2RpZmllcnMuaW5jbHVkZXMoXCJpbXBvcnRhbnRcIikgPyBcImltcG9ydGFudFwiIDogdm9pZCAwKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIGlmICghZWwuX3hfZG9TaG93KVxuICAgIGVsLl94X2RvU2hvdyA9ICgpID0+IHtcbiAgICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICAgIGlmIChlbC5zdHlsZS5sZW5ndGggPT09IDEgJiYgZWwuc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImRpc3BsYXlcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIGxldCBoaWRlID0gKCkgPT4ge1xuICAgIGVsLl94X2RvSGlkZSgpO1xuICAgIGVsLl94X2lzU2hvd24gPSBmYWxzZTtcbiAgfTtcbiAgbGV0IHNob3cgPSAoKSA9PiB7XG4gICAgZWwuX3hfZG9TaG93KCk7XG4gICAgZWwuX3hfaXNTaG93biA9IHRydWU7XG4gIH07XG4gIGxldCBjbGlja0F3YXlDb21wYXRpYmxlU2hvdyA9ICgpID0+IHNldFRpbWVvdXQoc2hvdyk7XG4gIGxldCB0b2dnbGUgPSBvbmNlKFxuICAgICh2YWx1ZSkgPT4gdmFsdWUgPyBzaG93KCkgOiBoaWRlKCksXG4gICAgKHZhbHVlKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVsLl94X3RvZ2dsZUFuZENhc2NhZGVXaXRoVHJhbnNpdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBlbC5feF90b2dnbGVBbmRDYXNjYWRlV2l0aFRyYW5zaXRpb25zKGVsLCB2YWx1ZSwgc2hvdywgaGlkZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA/IGNsaWNrQXdheUNvbXBhdGlibGVTaG93KCkgOiBoaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICApO1xuICBsZXQgb2xkVmFsdWU7XG4gIGxldCBmaXJzdFRpbWUgPSB0cnVlO1xuICBlZmZlY3QzKCgpID0+IGV2YWx1YXRlMigodmFsdWUpID0+IHtcbiAgICBpZiAoIWZpcnN0VGltZSAmJiB2YWx1ZSA9PT0gb2xkVmFsdWUpXG4gICAgICByZXR1cm47XG4gICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImltbWVkaWF0ZVwiKSlcbiAgICAgIHZhbHVlID8gY2xpY2tBd2F5Q29tcGF0aWJsZVNob3coKSA6IGhpZGUoKTtcbiAgICB0b2dnbGUodmFsdWUpO1xuICAgIG9sZFZhbHVlID0gdmFsdWU7XG4gICAgZmlyc3RUaW1lID0gZmFsc2U7XG4gIH0pKTtcbn0pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWZvci5qc1xuZGlyZWN0aXZlKFwiZm9yXCIsIChlbCwgeyBleHByZXNzaW9uIH0sIHsgZWZmZWN0OiBlZmZlY3QzLCBjbGVhbnVwOiBjbGVhbnVwMiB9KSA9PiB7XG4gIGxldCBpdGVyYXRvck5hbWVzID0gcGFyc2VGb3JFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICBsZXQgZXZhbHVhdGVJdGVtcyA9IGV2YWx1YXRlTGF0ZXIoZWwsIGl0ZXJhdG9yTmFtZXMuaXRlbXMpO1xuICBsZXQgZXZhbHVhdGVLZXkgPSBldmFsdWF0ZUxhdGVyKFxuICAgIGVsLFxuICAgIC8vIHRoZSB4LWJpbmQ6a2V5IGV4cHJlc3Npb24gaXMgc3RvcmVkIGZvciBvdXIgdXNlIGluc3RlYWQgb2YgZXZhbHVhdGVkLlxuICAgIGVsLl94X2tleUV4cHJlc3Npb24gfHwgXCJpbmRleFwiXG4gICk7XG4gIGVsLl94X3ByZXZLZXlzID0gW107XG4gIGVsLl94X2xvb2t1cCA9IHt9O1xuICBlZmZlY3QzKCgpID0+IGxvb3AoZWwsIGl0ZXJhdG9yTmFtZXMsIGV2YWx1YXRlSXRlbXMsIGV2YWx1YXRlS2V5KSk7XG4gIGNsZWFudXAyKCgpID0+IHtcbiAgICBPYmplY3QudmFsdWVzKGVsLl94X2xvb2t1cCkuZm9yRWFjaCgoZWwyKSA9PiBtdXRhdGVEb20oXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGRlc3Ryb3lUcmVlKGVsMik7XG4gICAgICAgIGVsMi5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICApKTtcbiAgICBkZWxldGUgZWwuX3hfcHJldktleXM7XG4gICAgZGVsZXRlIGVsLl94X2xvb2t1cDtcbiAgfSk7XG59KTtcbmZ1bmN0aW9uIGxvb3AoZWwsIGl0ZXJhdG9yTmFtZXMsIGV2YWx1YXRlSXRlbXMsIGV2YWx1YXRlS2V5KSB7XG4gIGxldCBpc09iamVjdDIgPSAoaSkgPT4gdHlwZW9mIGkgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoaSk7XG4gIGxldCB0ZW1wbGF0ZUVsID0gZWw7XG4gIGV2YWx1YXRlSXRlbXMoKGl0ZW1zKSA9PiB7XG4gICAgaWYgKGlzTnVtZXJpYzMoaXRlbXMpICYmIGl0ZW1zID49IDApIHtcbiAgICAgIGl0ZW1zID0gQXJyYXkuZnJvbShBcnJheShpdGVtcykua2V5cygpLCAoaSkgPT4gaSArIDEpO1xuICAgIH1cbiAgICBpZiAoaXRlbXMgPT09IHZvaWQgMClcbiAgICAgIGl0ZW1zID0gW107XG4gICAgbGV0IGxvb2t1cCA9IGVsLl94X2xvb2t1cDtcbiAgICBsZXQgcHJldktleXMgPSBlbC5feF9wcmV2S2V5cztcbiAgICBsZXQgc2NvcGVzID0gW107XG4gICAgbGV0IGtleXMgPSBbXTtcbiAgICBpZiAoaXNPYmplY3QyKGl0ZW1zKSkge1xuICAgICAgaXRlbXMgPSBPYmplY3QuZW50cmllcyhpdGVtcykubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgbGV0IHNjb3BlMiA9IGdldEl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKGl0ZXJhdG9yTmFtZXMsIHZhbHVlLCBrZXksIGl0ZW1zKTtcbiAgICAgICAgZXZhbHVhdGVLZXkoKHZhbHVlMikgPT4ge1xuICAgICAgICAgIGlmIChrZXlzLmluY2x1ZGVzKHZhbHVlMikpXG4gICAgICAgICAgICB3YXJuKFwiRHVwbGljYXRlIGtleSBvbiB4LWZvclwiLCBlbCk7XG4gICAgICAgICAga2V5cy5wdXNoKHZhbHVlMik7XG4gICAgICAgIH0sIHsgc2NvcGU6IHsgaW5kZXg6IGtleSwgLi4uc2NvcGUyIH0gfSk7XG4gICAgICAgIHNjb3Blcy5wdXNoKHNjb3BlMik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc2NvcGUyID0gZ2V0SXRlcmF0aW9uU2NvcGVWYXJpYWJsZXMoaXRlcmF0b3JOYW1lcywgaXRlbXNbaV0sIGksIGl0ZW1zKTtcbiAgICAgICAgZXZhbHVhdGVLZXkoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKGtleXMuaW5jbHVkZXModmFsdWUpKVxuICAgICAgICAgICAgd2FybihcIkR1cGxpY2F0ZSBrZXkgb24geC1mb3JcIiwgZWwpO1xuICAgICAgICAgIGtleXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0sIHsgc2NvcGU6IHsgaW5kZXg6IGksIC4uLnNjb3BlMiB9IH0pO1xuICAgICAgICBzY29wZXMucHVzaChzY29wZTIpO1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgYWRkcyA9IFtdO1xuICAgIGxldCBtb3ZlcyA9IFtdO1xuICAgIGxldCByZW1vdmVzID0gW107XG4gICAgbGV0IHNhbWVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGtleSA9IHByZXZLZXlzW2ldO1xuICAgICAgaWYgKGtleXMuaW5kZXhPZihrZXkpID09PSAtMSlcbiAgICAgICAgcmVtb3Zlcy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHByZXZLZXlzID0gcHJldktleXMuZmlsdGVyKChrZXkpID0+ICFyZW1vdmVzLmluY2x1ZGVzKGtleSkpO1xuICAgIGxldCBsYXN0S2V5ID0gXCJ0ZW1wbGF0ZVwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICBsZXQgcHJldkluZGV4ID0gcHJldktleXMuaW5kZXhPZihrZXkpO1xuICAgICAgaWYgKHByZXZJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcHJldktleXMuc3BsaWNlKGksIDAsIGtleSk7XG4gICAgICAgIGFkZHMucHVzaChbbGFzdEtleSwgaV0pO1xuICAgICAgfSBlbHNlIGlmIChwcmV2SW5kZXggIT09IGkpIHtcbiAgICAgICAgbGV0IGtleUluU3BvdCA9IHByZXZLZXlzLnNwbGljZShpLCAxKVswXTtcbiAgICAgICAgbGV0IGtleUZvclNwb3QgPSBwcmV2S2V5cy5zcGxpY2UocHJldkluZGV4IC0gMSwgMSlbMF07XG4gICAgICAgIHByZXZLZXlzLnNwbGljZShpLCAwLCBrZXlGb3JTcG90KTtcbiAgICAgICAgcHJldktleXMuc3BsaWNlKHByZXZJbmRleCwgMCwga2V5SW5TcG90KTtcbiAgICAgICAgbW92ZXMucHVzaChba2V5SW5TcG90LCBrZXlGb3JTcG90XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYW1lcy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgICBsYXN0S2V5ID0ga2V5O1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlbW92ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBrZXkgPSByZW1vdmVzW2ldO1xuICAgICAgaWYgKCEoa2V5IGluIGxvb2t1cCkpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgZGVzdHJveVRyZWUobG9va3VwW2tleV0pO1xuICAgICAgICBsb29rdXBba2V5XS5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgICAgZGVsZXRlIGxvb2t1cFtrZXldO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgW2tleUluU3BvdCwga2V5Rm9yU3BvdF0gPSBtb3Zlc1tpXTtcbiAgICAgIGxldCBlbEluU3BvdCA9IGxvb2t1cFtrZXlJblNwb3RdO1xuICAgICAgbGV0IGVsRm9yU3BvdCA9IGxvb2t1cFtrZXlGb3JTcG90XTtcbiAgICAgIGxldCBtYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgaWYgKCFlbEZvclNwb3QpXG4gICAgICAgICAgd2FybihgeC1mb3IgXCI6a2V5XCIgaXMgdW5kZWZpbmVkIG9yIGludmFsaWRgLCB0ZW1wbGF0ZUVsLCBrZXlGb3JTcG90LCBsb29rdXApO1xuICAgICAgICBlbEZvclNwb3QuYWZ0ZXIobWFya2VyKTtcbiAgICAgICAgZWxJblNwb3QuYWZ0ZXIoZWxGb3JTcG90KTtcbiAgICAgICAgZWxGb3JTcG90Ll94X2N1cnJlbnRJZkVsICYmIGVsRm9yU3BvdC5hZnRlcihlbEZvclNwb3QuX3hfY3VycmVudElmRWwpO1xuICAgICAgICBtYXJrZXIuYmVmb3JlKGVsSW5TcG90KTtcbiAgICAgICAgZWxJblNwb3QuX3hfY3VycmVudElmRWwgJiYgZWxJblNwb3QuYWZ0ZXIoZWxJblNwb3QuX3hfY3VycmVudElmRWwpO1xuICAgICAgICBtYXJrZXIucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIGVsRm9yU3BvdC5feF9yZWZyZXNoWEZvclNjb3BlKHNjb3Blc1trZXlzLmluZGV4T2Yoa2V5Rm9yU3BvdCldKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgW2xhc3RLZXkyLCBpbmRleF0gPSBhZGRzW2ldO1xuICAgICAgbGV0IGxhc3RFbCA9IGxhc3RLZXkyID09PSBcInRlbXBsYXRlXCIgPyB0ZW1wbGF0ZUVsIDogbG9va3VwW2xhc3RLZXkyXTtcbiAgICAgIGlmIChsYXN0RWwuX3hfY3VycmVudElmRWwpXG4gICAgICAgIGxhc3RFbCA9IGxhc3RFbC5feF9jdXJyZW50SWZFbDtcbiAgICAgIGxldCBzY29wZTIgPSBzY29wZXNbaW5kZXhdO1xuICAgICAgbGV0IGtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgbGV0IGNsb25lMiA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGVFbC5jb250ZW50LCB0cnVlKS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCByZWFjdGl2ZVNjb3BlID0gcmVhY3RpdmUoc2NvcGUyKTtcbiAgICAgIGFkZFNjb3BlVG9Ob2RlKGNsb25lMiwgcmVhY3RpdmVTY29wZSwgdGVtcGxhdGVFbCk7XG4gICAgICBjbG9uZTIuX3hfcmVmcmVzaFhGb3JTY29wZSA9IChuZXdTY29wZSkgPT4ge1xuICAgICAgICBPYmplY3QuZW50cmllcyhuZXdTY29wZSkuZm9yRWFjaCgoW2tleTIsIHZhbHVlXSkgPT4ge1xuICAgICAgICAgIHJlYWN0aXZlU2NvcGVba2V5Ml0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgbGFzdEVsLmFmdGVyKGNsb25lMik7XG4gICAgICAgIHNraXBEdXJpbmdDbG9uZSgoKSA9PiBpbml0VHJlZShjbG9uZTIpKSgpO1xuICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGtleSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB3YXJuKFwieC1mb3Iga2V5IGNhbm5vdCBiZSBhbiBvYmplY3QsIGl0IG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gaW50ZWdlclwiLCB0ZW1wbGF0ZUVsKTtcbiAgICAgIH1cbiAgICAgIGxvb2t1cFtrZXldID0gY2xvbmUyO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb29rdXBbc2FtZXNbaV1dLl94X3JlZnJlc2hYRm9yU2NvcGUoc2NvcGVzW2tleXMuaW5kZXhPZihzYW1lc1tpXSldKTtcbiAgICB9XG4gICAgdGVtcGxhdGVFbC5feF9wcmV2S2V5cyA9IGtleXM7XG4gIH0pO1xufVxuZnVuY3Rpb24gcGFyc2VGb3JFeHByZXNzaW9uKGV4cHJlc3Npb24pIHtcbiAgbGV0IGZvckl0ZXJhdG9yUkUgPSAvLChbXixcXH1cXF1dKikoPzosKFteLFxcfVxcXV0qKSk/JC87XG4gIGxldCBzdHJpcFBhcmVuc1JFID0gL15cXHMqXFwofFxcKVxccyokL2c7XG4gIGxldCBmb3JBbGlhc1JFID0gLyhbXFxzXFxTXSo/KVxccysoPzppbnxvZilcXHMrKFtcXHNcXFNdKikvO1xuICBsZXQgaW5NYXRjaCA9IGV4cHJlc3Npb24ubWF0Y2goZm9yQWxpYXNSRSk7XG4gIGlmICghaW5NYXRjaClcbiAgICByZXR1cm47XG4gIGxldCByZXMgPSB7fTtcbiAgcmVzLml0ZW1zID0gaW5NYXRjaFsyXS50cmltKCk7XG4gIGxldCBpdGVtID0gaW5NYXRjaFsxXS5yZXBsYWNlKHN0cmlwUGFyZW5zUkUsIFwiXCIpLnRyaW0oKTtcbiAgbGV0IGl0ZXJhdG9yTWF0Y2ggPSBpdGVtLm1hdGNoKGZvckl0ZXJhdG9yUkUpO1xuICBpZiAoaXRlcmF0b3JNYXRjaCkge1xuICAgIHJlcy5pdGVtID0gaXRlbS5yZXBsYWNlKGZvckl0ZXJhdG9yUkUsIFwiXCIpLnRyaW0oKTtcbiAgICByZXMuaW5kZXggPSBpdGVyYXRvck1hdGNoWzFdLnRyaW0oKTtcbiAgICBpZiAoaXRlcmF0b3JNYXRjaFsyXSkge1xuICAgICAgcmVzLmNvbGxlY3Rpb24gPSBpdGVyYXRvck1hdGNoWzJdLnRyaW0oKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVzLml0ZW0gPSBpdGVtO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBnZXRJdGVyYXRpb25TY29wZVZhcmlhYmxlcyhpdGVyYXRvck5hbWVzLCBpdGVtLCBpbmRleCwgaXRlbXMpIHtcbiAgbGV0IHNjb3BlVmFyaWFibGVzID0ge307XG4gIGlmICgvXlxcWy4qXFxdJC8udGVzdChpdGVyYXRvck5hbWVzLml0ZW0pICYmIEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICBsZXQgbmFtZXMgPSBpdGVyYXRvck5hbWVzLml0ZW0ucmVwbGFjZShcIltcIiwgXCJcIikucmVwbGFjZShcIl1cIiwgXCJcIikuc3BsaXQoXCIsXCIpLm1hcCgoaSkgPT4gaS50cmltKCkpO1xuICAgIG5hbWVzLmZvckVhY2goKG5hbWUsIGkpID0+IHtcbiAgICAgIHNjb3BlVmFyaWFibGVzW25hbWVdID0gaXRlbVtpXTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICgvXlxcey4qXFx9JC8udGVzdChpdGVyYXRvck5hbWVzLml0ZW0pICYmICFBcnJheS5pc0FycmF5KGl0ZW0pICYmIHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiKSB7XG4gICAgbGV0IG5hbWVzID0gaXRlcmF0b3JOYW1lcy5pdGVtLnJlcGxhY2UoXCJ7XCIsIFwiXCIpLnJlcGxhY2UoXCJ9XCIsIFwiXCIpLnNwbGl0KFwiLFwiKS5tYXAoKGkpID0+IGkudHJpbSgpKTtcbiAgICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBzY29wZVZhcmlhYmxlc1tuYW1lXSA9IGl0ZW1bbmFtZV07XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgc2NvcGVWYXJpYWJsZXNbaXRlcmF0b3JOYW1lcy5pdGVtXSA9IGl0ZW07XG4gIH1cbiAgaWYgKGl0ZXJhdG9yTmFtZXMuaW5kZXgpXG4gICAgc2NvcGVWYXJpYWJsZXNbaXRlcmF0b3JOYW1lcy5pbmRleF0gPSBpbmRleDtcbiAgaWYgKGl0ZXJhdG9yTmFtZXMuY29sbGVjdGlvbilcbiAgICBzY29wZVZhcmlhYmxlc1tpdGVyYXRvck5hbWVzLmNvbGxlY3Rpb25dID0gaXRlbXM7XG4gIHJldHVybiBzY29wZVZhcmlhYmxlcztcbn1cbmZ1bmN0aW9uIGlzTnVtZXJpYzMoc3ViamVjdCkge1xuICByZXR1cm4gIUFycmF5LmlzQXJyYXkoc3ViamVjdCkgJiYgIWlzTmFOKHN1YmplY3QpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LXJlZi5qc1xuZnVuY3Rpb24gaGFuZGxlcjMoKSB7XG59XG5oYW5kbGVyMy5pbmxpbmUgPSAoZWwsIHsgZXhwcmVzc2lvbiB9LCB7IGNsZWFudXA6IGNsZWFudXAyIH0pID0+IHtcbiAgbGV0IHJvb3QgPSBjbG9zZXN0Um9vdChlbCk7XG4gIGlmICghcm9vdC5feF9yZWZzKVxuICAgIHJvb3QuX3hfcmVmcyA9IHt9O1xuICByb290Ll94X3JlZnNbZXhwcmVzc2lvbl0gPSBlbDtcbiAgY2xlYW51cDIoKCkgPT4gZGVsZXRlIHJvb3QuX3hfcmVmc1tleHByZXNzaW9uXSk7XG59O1xuZGlyZWN0aXZlKFwicmVmXCIsIGhhbmRsZXIzKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1pZi5qc1xuZGlyZWN0aXZlKFwiaWZcIiwgKGVsLCB7IGV4cHJlc3Npb24gfSwgeyBlZmZlY3Q6IGVmZmVjdDMsIGNsZWFudXA6IGNsZWFudXAyIH0pID0+IHtcbiAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJ0ZW1wbGF0ZVwiKVxuICAgIHdhcm4oXCJ4LWlmIGNhbiBvbmx5IGJlIHVzZWQgb24gYSA8dGVtcGxhdGU+IHRhZ1wiLCBlbCk7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKTtcbiAgbGV0IHNob3cgPSAoKSA9PiB7XG4gICAgaWYgKGVsLl94X2N1cnJlbnRJZkVsKVxuICAgICAgcmV0dXJuIGVsLl94X2N1cnJlbnRJZkVsO1xuICAgIGxldCBjbG9uZTIgPSBlbC5jb250ZW50LmNsb25lTm9kZSh0cnVlKS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBhZGRTY29wZVRvTm9kZShjbG9uZTIsIHt9LCBlbCk7XG4gICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgIGVsLmFmdGVyKGNsb25lMik7XG4gICAgICBza2lwRHVyaW5nQ2xvbmUoKCkgPT4gaW5pdFRyZWUoY2xvbmUyKSkoKTtcbiAgICB9KTtcbiAgICBlbC5feF9jdXJyZW50SWZFbCA9IGNsb25lMjtcbiAgICBlbC5feF91bmRvSWYgPSAoKSA9PiB7XG4gICAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgICBkZXN0cm95VHJlZShjbG9uZTIpO1xuICAgICAgICBjbG9uZTIucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIGRlbGV0ZSBlbC5feF9jdXJyZW50SWZFbDtcbiAgICB9O1xuICAgIHJldHVybiBjbG9uZTI7XG4gIH07XG4gIGxldCBoaWRlID0gKCkgPT4ge1xuICAgIGlmICghZWwuX3hfdW5kb0lmKVxuICAgICAgcmV0dXJuO1xuICAgIGVsLl94X3VuZG9JZigpO1xuICAgIGRlbGV0ZSBlbC5feF91bmRvSWY7XG4gIH07XG4gIGVmZmVjdDMoKCkgPT4gZXZhbHVhdGUyKCh2YWx1ZSkgPT4ge1xuICAgIHZhbHVlID8gc2hvdygpIDogaGlkZSgpO1xuICB9KSk7XG4gIGNsZWFudXAyKCgpID0+IGVsLl94X3VuZG9JZiAmJiBlbC5feF91bmRvSWYoKSk7XG59KTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1pZC5qc1xuZGlyZWN0aXZlKFwiaWRcIiwgKGVsLCB7IGV4cHJlc3Npb24gfSwgeyBldmFsdWF0ZTogZXZhbHVhdGUyIH0pID0+IHtcbiAgbGV0IG5hbWVzID0gZXZhbHVhdGUyKGV4cHJlc3Npb24pO1xuICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiBzZXRJZFJvb3QoZWwsIG5hbWUpKTtcbn0pO1xuaW50ZXJjZXB0Q2xvbmUoKGZyb20sIHRvKSA9PiB7XG4gIGlmIChmcm9tLl94X2lkcykge1xuICAgIHRvLl94X2lkcyA9IGZyb20uX3hfaWRzO1xuICB9XG59KTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1vbi5qc1xubWFwQXR0cmlidXRlcyhzdGFydGluZ1dpdGgoXCJAXCIsIGludG8ocHJlZml4KFwib246XCIpKSkpO1xuZGlyZWN0aXZlKFwib25cIiwgc2tpcER1cmluZ0Nsb25lKChlbCwgeyB2YWx1ZSwgbW9kaWZpZXJzLCBleHByZXNzaW9uIH0sIHsgY2xlYW51cDogY2xlYW51cDIgfSkgPT4ge1xuICBsZXQgZXZhbHVhdGUyID0gZXhwcmVzc2lvbiA/IGV2YWx1YXRlTGF0ZXIoZWwsIGV4cHJlc3Npb24pIDogKCkgPT4ge1xuICB9O1xuICBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInRlbXBsYXRlXCIpIHtcbiAgICBpZiAoIWVsLl94X2ZvcndhcmRFdmVudHMpXG4gICAgICBlbC5feF9mb3J3YXJkRXZlbnRzID0gW107XG4gICAgaWYgKCFlbC5feF9mb3J3YXJkRXZlbnRzLmluY2x1ZGVzKHZhbHVlKSlcbiAgICAgIGVsLl94X2ZvcndhcmRFdmVudHMucHVzaCh2YWx1ZSk7XG4gIH1cbiAgbGV0IHJlbW92ZUxpc3RlbmVyID0gb24oZWwsIHZhbHVlLCBtb2RpZmllcnMsIChlKSA9PiB7XG4gICAgZXZhbHVhdGUyKCgpID0+IHtcbiAgICB9LCB7IHNjb3BlOiB7IFwiJGV2ZW50XCI6IGUgfSwgcGFyYW1zOiBbZV0gfSk7XG4gIH0pO1xuICBjbGVhbnVwMigoKSA9PiByZW1vdmVMaXN0ZW5lcigpKTtcbn0pKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMvaW5kZXguanNcbndhcm5NaXNzaW5nUGx1Z2luRGlyZWN0aXZlKFwiQ29sbGFwc2VcIiwgXCJjb2xsYXBzZVwiLCBcImNvbGxhcHNlXCIpO1xud2Fybk1pc3NpbmdQbHVnaW5EaXJlY3RpdmUoXCJJbnRlcnNlY3RcIiwgXCJpbnRlcnNlY3RcIiwgXCJpbnRlcnNlY3RcIik7XG53YXJuTWlzc2luZ1BsdWdpbkRpcmVjdGl2ZShcIkZvY3VzXCIsIFwidHJhcFwiLCBcImZvY3VzXCIpO1xud2Fybk1pc3NpbmdQbHVnaW5EaXJlY3RpdmUoXCJNYXNrXCIsIFwibWFza1wiLCBcIm1hc2tcIik7XG5mdW5jdGlvbiB3YXJuTWlzc2luZ1BsdWdpbkRpcmVjdGl2ZShuYW1lLCBkaXJlY3RpdmVOYW1lLCBzbHVnKSB7XG4gIGRpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCAoZWwpID0+IHdhcm4oYFlvdSBjYW4ndCB1c2UgW3gtJHtkaXJlY3RpdmVOYW1lfV0gd2l0aG91dCBmaXJzdCBpbnN0YWxsaW5nIHRoZSBcIiR7bmFtZX1cIiBwbHVnaW4gaGVyZTogaHR0cHM6Ly9hbHBpbmVqcy5kZXYvcGx1Z2lucy8ke3NsdWd9YCwgZWwpKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2luZGV4LmpzXG5hbHBpbmVfZGVmYXVsdC5zZXRFdmFsdWF0b3Iobm9ybWFsRXZhbHVhdG9yKTtcbmFscGluZV9kZWZhdWx0LnNldFJlYWN0aXZpdHlFbmdpbmUoeyByZWFjdGl2ZTogcmVhY3RpdmUyLCBlZmZlY3Q6IGVmZmVjdDIsIHJlbGVhc2U6IHN0b3AsIHJhdzogdG9SYXcgfSk7XG52YXIgc3JjX2RlZmF1bHQgPSBhbHBpbmVfZGVmYXVsdDtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvYnVpbGRzL21vZHVsZS5qc1xudmFyIG1vZHVsZV9kZWZhdWx0ID0gc3JjX2RlZmF1bHQ7XG5leHBvcnQge1xuICBzcmNfZGVmYXVsdCBhcyBBbHBpbmUsXG4gIG1vZHVsZV9kZWZhdWx0IGFzIGRlZmF1bHRcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBBbHBpbmUgZnJvbSAnYWxwaW5lanMnXG5cbndpbmRvdy5BbHBpbmUgPSBBbHBpbmVcblxuQWxwaW5lLnN0YXJ0KCkiXSwibmFtZXMiOlsiZmx1c2hQZW5kaW5nIiwiZmx1c2hpbmciLCJxdWV1ZSIsImxhc3RGbHVzaGVkSW5kZXgiLCJzY2hlZHVsZXIiLCJjYWxsYmFjayIsInF1ZXVlSm9iIiwiam9iIiwiaW5jbHVkZXMiLCJwdXNoIiwicXVldWVGbHVzaCIsImRlcXVldWVKb2IiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJxdWV1ZU1pY3JvdGFzayIsImZsdXNoSm9icyIsImkiLCJsZW5ndGgiLCJyZWFjdGl2ZSIsImVmZmVjdCIsInJlbGVhc2UiLCJyYXciLCJzaG91bGRTY2hlZHVsZSIsImRpc2FibGVFZmZlY3RTY2hlZHVsaW5nIiwic2V0UmVhY3Rpdml0eUVuZ2luZSIsImVuZ2luZSIsInRhc2siLCJvdmVycmlkZUVmZmVjdCIsIm92ZXJyaWRlIiwiZWxlbWVudEJvdW5kRWZmZWN0IiwiZWwiLCJjbGVhbnVwMiIsIndyYXBwZWRFZmZlY3QiLCJlZmZlY3RSZWZlcmVuY2UiLCJfeF9lZmZlY3RzIiwiU2V0IiwiX3hfcnVuRWZmZWN0cyIsImZvckVhY2giLCJhZGQiLCJkZWxldGUiLCJ3YXRjaCIsImdldHRlciIsImZpcnN0VGltZSIsIm9sZFZhbHVlIiwidmFsdWUiLCJKU09OIiwic3RyaW5naWZ5Iiwib25BdHRyaWJ1dGVBZGRlZHMiLCJvbkVsUmVtb3ZlZHMiLCJvbkVsQWRkZWRzIiwib25FbEFkZGVkIiwib25FbFJlbW92ZWQiLCJfeF9jbGVhbnVwcyIsIm9uQXR0cmlidXRlc0FkZGVkIiwib25BdHRyaWJ1dGVSZW1vdmVkIiwibmFtZSIsIl94X2F0dHJpYnV0ZUNsZWFudXBzIiwiY2xlYW51cEF0dHJpYnV0ZXMiLCJuYW1lcyIsIk9iamVjdCIsImVudHJpZXMiLCJjbGVhbnVwRWxlbWVudCIsIl9lbCRfeF9lZmZlY3RzIiwiX2VsJF94X2NsZWFudXBzIiwicG9wIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib25NdXRhdGUiLCJjdXJyZW50bHlPYnNlcnZpbmciLCJzdGFydE9ic2VydmluZ011dGF0aW9ucyIsIm9ic2VydmUiLCJkb2N1bWVudCIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJzdG9wT2JzZXJ2aW5nTXV0YXRpb25zIiwiZmx1c2hPYnNlcnZlciIsImRpc2Nvbm5lY3QiLCJxdWV1ZWRNdXRhdGlvbnMiLCJyZWNvcmRzIiwidGFrZVJlY29yZHMiLCJxdWV1ZUxlbmd0aFdoZW5UcmlnZ2VyZWQiLCJzaGlmdCIsIm11dGF0ZURvbSIsInJlc3VsdCIsImlzQ29sbGVjdGluZyIsImRlZmVycmVkTXV0YXRpb25zIiwiZGVmZXJNdXRhdGlvbnMiLCJmbHVzaEFuZFN0b3BEZWZlcnJpbmdNdXRhdGlvbnMiLCJtdXRhdGlvbnMiLCJjb25jYXQiLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwiYWRkZWRBdHRyaWJ1dGVzIiwiTWFwIiwicmVtb3ZlZEF0dHJpYnV0ZXMiLCJ0YXJnZXQiLCJfeF9pZ25vcmVNdXRhdGlvbk9ic2VydmVyIiwidHlwZSIsIm5vZGUiLCJub2RlVHlwZSIsIl94X21hcmtlciIsImhhcyIsImF0dHJpYnV0ZU5hbWUiLCJhZGQyIiwic2V0IiwiZ2V0IiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlIiwiaGFzQXR0cmlidXRlIiwiYXR0cnMiLCJzb21lIiwiY29udGFpbnMiLCJpc0Nvbm5lY3RlZCIsInNjb3BlIiwibWVyZ2VQcm94aWVzIiwiY2xvc2VzdERhdGFTdGFjayIsImFkZFNjb3BlVG9Ob2RlIiwiZGF0YTIiLCJyZWZlcmVuY2VOb2RlIiwiX3hfZGF0YVN0YWNrIiwiZmlsdGVyIiwiU2hhZG93Um9vdCIsImhvc3QiLCJwYXJlbnROb2RlIiwib2JqZWN0cyIsIlByb3h5IiwibWVyZ2VQcm94eVRyYXAiLCJvd25LZXlzIiwiQXJyYXkiLCJmcm9tIiwiZmxhdE1hcCIsImtleXMiLCJTeW1ib2wiLCJ1bnNjb3BhYmxlcyIsIm9iaiIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIlJlZmxlY3QiLCJ0aGlzUHJveHkiLCJjb2xsYXBzZVByb3hpZXMiLCJmaW5kIiwiZGVzY3JpcHRvciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInJlZHVjZSIsImFjYyIsImtleSIsImluaXRJbnRlcmNlcHRvcnMiLCJpc09iamVjdDIiLCJ2YWwiLCJpc0FycmF5IiwicmVjdXJzZSIsImJhc2VQYXRoIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImVudW1lcmFibGUiLCJfX3Zfc2tpcCIsInBhdGgiLCJfeF9pbnRlcmNlcHRvciIsImluaXRpYWxpemUiLCJFbGVtZW50IiwiaW50ZXJjZXB0b3IiLCJtdXRhdGVPYmoiLCJpbml0aWFsVmFsdWUiLCJiaW5kIiwiaW5uZXJWYWx1ZSIsInNwbGl0IiwiY2FycnkiLCJzZWdtZW50IiwiZXJyb3IiLCJzbGljZSIsIm1hZ2ljcyIsIm1hZ2ljIiwiaW5qZWN0TWFnaWNzIiwibWVtb2l6ZWRVdGlsaXRpZXMiLCJnZXRVdGlsaXRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsInV0aWxpdGllcyIsImdldEVsZW1lbnRCb3VuZFV0aWxpdGllcyIsInV0aWxzIiwiX29iamVjdFNwcmVhZCIsInRyeUNhdGNoIiwiZXhwcmVzc2lvbiIsImFyZ3MiLCJlIiwiaGFuZGxlRXJyb3IiLCJlcnJvcjIiLCJhc3NpZ24iLCJtZXNzYWdlIiwiY29uc29sZSIsIndhcm4iLCJzZXRUaW1lb3V0Iiwic2hvdWxkQXV0b0V2YWx1YXRlRnVuY3Rpb25zIiwiZG9udEF1dG9FdmFsdWF0ZUZ1bmN0aW9ucyIsImNhY2hlIiwiZXZhbHVhdGUiLCJleHRyYXMiLCJldmFsdWF0ZUxhdGVyIiwidGhlRXZhbHVhdG9yRnVuY3Rpb24iLCJub3JtYWxFdmFsdWF0b3IiLCJzZXRFdmFsdWF0b3IiLCJuZXdFdmFsdWF0b3IiLCJvdmVycmlkZGVuTWFnaWNzIiwiZGF0YVN0YWNrIiwiZXZhbHVhdG9yIiwiZ2VuZXJhdGVFdmFsdWF0b3JGcm9tRnVuY3Rpb24iLCJnZW5lcmF0ZUV2YWx1YXRvckZyb21TdHJpbmciLCJmdW5jIiwicmVjZWl2ZXIiLCJzY29wZTIiLCJwYXJhbXMiLCJhcHBseSIsInJ1bklmVHlwZU9mRnVuY3Rpb24iLCJldmFsdWF0b3JNZW1vIiwiZ2VuZXJhdGVGdW5jdGlvbkZyb21TdHJpbmciLCJBc3luY0Z1bmN0aW9uIiwiZ2V0UHJvdG90eXBlT2YiLCJjb25zdHJ1Y3RvciIsInJpZ2h0U2lkZVNhZmVFeHByZXNzaW9uIiwidGVzdCIsInRyaW0iLCJzYWZlQXN5bmNGdW5jdGlvbiIsImZ1bmMyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJmaW5pc2hlZCIsImNvbXBsZXRlU2NvcGUiLCJwcm9taXNlIiwiY2F0Y2giLCJ0aGVuIiwiZmluYWxseSIsInByZWZpeEFzU3RyaW5nIiwicHJlZml4Iiwic3ViamVjdCIsInNldFByZWZpeCIsIm5ld1ByZWZpeCIsImRpcmVjdGl2ZUhhbmRsZXJzIiwiZGlyZWN0aXZlIiwiYmVmb3JlIiwiZGlyZWN0aXZlMiIsIlN0cmluZyIsInBvcyIsImRpcmVjdGl2ZU9yZGVyIiwiZGlyZWN0aXZlRXhpc3RzIiwiZGlyZWN0aXZlcyIsIm9yaWdpbmFsQXR0cmlidXRlT3ZlcnJpZGUiLCJfeF92aXJ0dWFsRGlyZWN0aXZlcyIsInZBdHRyaWJ1dGVzIiwibWFwIiwic3RhdGljQXR0cmlidXRlcyIsImF0dHJpYnV0ZXNPbmx5IiwiYXR0cmlidXRlIiwiYXR0ciIsInRyYW5zZm9ybWVkQXR0cmlidXRlTWFwIiwiZGlyZWN0aXZlczIiLCJ0b1RyYW5zZm9ybWVkQXR0cmlidXRlcyIsIm5ld05hbWUiLCJvbGROYW1lIiwib3V0Tm9uQWxwaW5lQXR0cmlidXRlcyIsInRvUGFyc2VkRGlyZWN0aXZlcyIsInNvcnQiLCJieVByaW9yaXR5IiwiZ2V0RGlyZWN0aXZlSGFuZGxlciIsImlzRGVmZXJyaW5nSGFuZGxlcnMiLCJkaXJlY3RpdmVIYW5kbGVyU3RhY2tzIiwiY3VycmVudEhhbmRsZXJTdGFja0tleSIsImRlZmVySGFuZGxpbmdEaXJlY3RpdmVzIiwiZmx1c2hIYW5kbGVycyIsInN0b3BEZWZlcnJpbmciLCJjbGVhbnVwcyIsImVmZmVjdDMiLCJjbGVhbnVwRWZmZWN0IiwiQWxwaW5lIiwiYWxwaW5lX2RlZmF1bHQiLCJjbGVhbnVwIiwiZG9DbGVhbnVwIiwibm9vcCIsImhhbmRsZXI0Iiwib3JpZ2luYWwiLCJmdWxsSGFuZGxlciIsIl94X2lnbm9yZSIsIl94X2lnbm9yZVNlbGYiLCJpbmxpbmUiLCJydW5DbGVhbnVwcyIsInN0YXJ0aW5nV2l0aCIsInJlcGxhY2VtZW50Iiwic3RhcnRzV2l0aCIsInJlcGxhY2UiLCJpbnRvIiwibmV3VmFsdWUiLCJhdHRyaWJ1dGVUcmFuc2Zvcm1lcnMiLCJ0cmFuc2Zvcm0iLCJtYXBBdHRyaWJ1dGVzIiwiYWxwaW5lQXR0cmlidXRlUmVnZXgiLCJSZWdFeHAiLCJ0eXBlTWF0Y2giLCJtYXRjaCIsInZhbHVlTWF0Y2giLCJtb2RpZmllcnMiLCJERUZBVUxUIiwiYSIsImIiLCJ0eXBlQSIsInR5cGVCIiwiZGlzcGF0Y2giLCJkZXRhaWwiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJidWJibGVzIiwiY29tcG9zZWQiLCJjYW5jZWxhYmxlIiwid2FsayIsImNoaWxkcmVuIiwiZWwyIiwic2tpcCIsImZpcnN0RWxlbWVudENoaWxkIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwic3RhcnRlZCIsInN0YXJ0IiwiYm9keSIsImluaXRUcmVlIiwiZGVzdHJveVRyZWUiLCJoYW5kbGUiLCJvdXROZXN0ZWRDb21wb25lbnRzIiwiY2xvc2VzdFJvb3QiLCJwYXJlbnRFbGVtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImFsbFNlbGVjdG9ycyIsImpvaW4iLCJ3YXJuQWJvdXRNaXNzaW5nUGx1Z2lucyIsInJvb3RTZWxlY3RvckNhbGxiYWNrcyIsImluaXRTZWxlY3RvckNhbGxiYWNrcyIsInJvb3RTZWxlY3RvcnMiLCJmbiIsImFkZFJvb3RTZWxlY3RvciIsInNlbGVjdG9yQ2FsbGJhY2siLCJhZGRJbml0U2VsZWN0b3IiLCJpbmNsdWRlSW5pdFNlbGVjdG9ycyIsImZpbmRDbG9zZXN0IiwiZWxlbWVudCIsInNlbGVjdG9ycyIsInNlbGVjdG9yIiwibWF0Y2hlcyIsIl94X3RlbGVwb3J0QmFjayIsImlzUm9vdCIsImluaXRJbnRlcmNlcHRvcnMyIiwiaW50ZXJjZXB0SW5pdCIsIm1hcmtlckRpc3BlbnNlciIsIndhbGtlciIsImludGVyY2VwdCIsInJvb3QiLCJwbHVnaW5EaXJlY3RpdmVzIiwicGx1Z2luMiIsInF1ZXJ5U2VsZWN0b3IiLCJ0aWNrU3RhY2siLCJpc0hvbGRpbmciLCJuZXh0VGljayIsInJlbGVhc2VOZXh0VGlja3MiLCJyZXMiLCJob2xkTmV4dFRpY2tzIiwic2V0Q2xhc3NlcyIsInNldENsYXNzZXNGcm9tU3RyaW5nIiwic2V0Q2xhc3Nlc0Zyb21PYmplY3QiLCJjbGFzc1N0cmluZyIsImNsYXNzU3RyaW5nMiIsIkJvb2xlYW4iLCJtaXNzaW5nQ2xhc3NlcyIsImNsYXNzTGlzdCIsImFkZENsYXNzZXNBbmRSZXR1cm5VbmRvIiwiY2xhc3NlcyIsImNsYXNzT2JqZWN0IiwiZm9yQWRkIiwiYm9vbCIsImZvclJlbW92ZSIsImFkZGVkIiwicmVtb3ZlZCIsInNldFN0eWxlcyIsInNldFN0eWxlc0Zyb21PYmplY3QiLCJzZXRTdHlsZXNGcm9tU3RyaW5nIiwicHJldmlvdXNTdHlsZXMiLCJ2YWx1ZTIiLCJzdHlsZSIsImtlYmFiQ2FzZSIsInNldFByb3BlcnR5IiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9Mb3dlckNhc2UiLCJvbmNlIiwiZmFsbGJhY2siLCJjYWxsZWQiLCJhcmd1bWVudHMiLCJldmFsdWF0ZTIiLCJyZWdpc3RlclRyYW5zaXRpb25zRnJvbUhlbHBlciIsInJlZ2lzdGVyVHJhbnNpdGlvbnNGcm9tQ2xhc3NTdHJpbmciLCJzdGFnZSIsInJlZ2lzdGVyVHJhbnNpdGlvbk9iamVjdCIsImRpcmVjdGl2ZVN0b3JhZ2VNYXAiLCJfeF90cmFuc2l0aW9uIiwiZW50ZXIiLCJkdXJpbmciLCJlbmQiLCJsZWF2ZSIsImRvZXNudFNwZWNpZnkiLCJ0cmFuc2l0aW9uaW5nSW4iLCJ0cmFuc2l0aW9uaW5nT3V0Iiwid2FudHNBbGwiLCJ3YW50c09wYWNpdHkiLCJ3YW50c1NjYWxlIiwib3BhY2l0eVZhbHVlIiwic2NhbGVWYWx1ZSIsIm1vZGlmaWVyVmFsdWUiLCJkZWxheSIsIm9yaWdpbiIsInByb3BlcnR5IiwiZHVyYXRpb25JbiIsImR1cmF0aW9uT3V0IiwiZWFzaW5nIiwidHJhbnNmb3JtT3JpZ2luIiwidHJhbnNpdGlvbkRlbGF5IiwidHJhbnNpdGlvblByb3BlcnR5IiwidHJhbnNpdGlvbkR1cmF0aW9uIiwidHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uIiwib3BhY2l0eSIsInNldEZ1bmN0aW9uIiwiZGVmYXVsdFZhbHVlIiwiaW4iLCJhZnRlciIsInRyYW5zaXRpb24iLCJvdXQiLCJ3aW5kb3ciLCJfeF90b2dnbGVBbmRDYXNjYWRlV2l0aFRyYW5zaXRpb25zIiwic2hvdyIsImhpZGUiLCJuZXh0VGljazIiLCJ2aXNpYmlsaXR5U3RhdGUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjbGlja0F3YXlDb21wYXRpYmxlU2hvdyIsIl94X2hpZGVQcm9taXNlIiwicmVqZWN0IiwiX3hfdHJhbnNpdGlvbmluZyIsImJlZm9yZUNhbmNlbCIsImlzRnJvbUNhbmNlbGxlZFRyYW5zaXRpb24iLCJjbG9zZXN0IiwiY2xvc2VzdEhpZGUiLCJfeF9oaWRlQ2hpbGRyZW4iLCJoaWRlQWZ0ZXJDaGlsZHJlbiIsImFsbCIsInBhcmVudCIsInN0YXJ0MiIsImNhbmNlbCIsInVuZG9TdGFydCIsInVuZG9EdXJpbmciLCJ1bmRvRW5kIiwicGVyZm9ybVRyYW5zaXRpb24iLCJzdGFnZXMiLCJpbnRlcnJ1cHRlZCIsInJlYWNoZWRCZWZvcmUiLCJyZWFjaGVkRW5kIiwiZmluaXNoIiwiYmVmb3JlQ2FuY2VscyIsImR1cmF0aW9uIiwiTnVtYmVyIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImFuaW1hdGlvbkR1cmF0aW9uIiwicmF3VmFsdWUiLCJpc05hTiIsImlzQ2xvbmluZyIsInNraXBEdXJpbmdDbG9uZSIsIm9ubHlEdXJpbmdDbG9uZSIsImludGVyY2VwdG9ycyIsImludGVyY2VwdENsb25lIiwiY2xvbmVOb2RlIiwidG8iLCJkb250UmVnaXN0ZXJSZWFjdGl2ZVNpZGVFZmZlY3RzIiwiaXNDbG9uaW5nTGVnYWN5IiwiY2xvbmUiLCJvbGRFbCIsIm5ld0VsIiwiY2xvbmVUcmVlIiwiaGFzUnVuVGhyb3VnaEZpcnN0RWwiLCJzaGFsbG93V2Fsa2VyIiwiZWwzIiwiY2FsbGJhY2syIiwic3RvcmVkRWZmZWN0IiwiX3hfYmluZGluZ3MiLCJjYW1lbENhc2UiLCJiaW5kSW5wdXRWYWx1ZSIsImJpbmRTdHlsZXMiLCJiaW5kQ2xhc3NlcyIsImJpbmRBdHRyaWJ1dGVBbmRQcm9wZXJ0eSIsImJpbmRBdHRyaWJ1dGUiLCJpc1JhZGlvIiwiZnJvbU1vZGVsIiwiY2hlY2tlZCIsInNhZmVQYXJzZUJvb2xlYW4iLCJjaGVja2VkQXR0ckxvb3NlQ29tcGFyZSIsImlzQ2hlY2tib3giLCJpc0ludGVnZXIiLCJ0YWdOYW1lIiwidXBkYXRlU2VsZWN0IiwiX3hfdW5kb0FkZGVkQ2xhc3NlcyIsIl94X3VuZG9BZGRlZFN0eWxlcyIsInNldFByb3BlcnR5SWZDaGFuZ2VkIiwiYXR0cmlidXRlU2hvdWxkbnRCZVByZXNlcnZlZElmRmFsc3kiLCJpc0Jvb2xlYW5BdHRyIiwic2V0SWZDaGFuZ2VkIiwiYXR0ck5hbWUiLCJwcm9wTmFtZSIsImFycmF5V3JhcHBlZFZhbHVlIiwib3B0aW9ucyIsIm9wdGlvbiIsInNlbGVjdGVkIiwiY2hhciIsInRvVXBwZXJDYXNlIiwidmFsdWVBIiwidmFsdWVCIiwiYm9vbGVhbkF0dHJpYnV0ZXMiLCJnZXRCaW5kaW5nIiwiZ2V0QXR0cmlidXRlQmluZGluZyIsImV4dHJhY3RQcm9wIiwiZXh0cmFjdCIsIl94X2lubGluZUJpbmRpbmdzIiwiYmluZGluZyIsImxvY2FsTmFtZSIsImRlYm91bmNlIiwid2FpdCIsInRpbWVvdXQiLCJjb250ZXh0IiwibGF0ZXIiLCJjbGVhclRpbWVvdXQiLCJ0aHJvdHRsZSIsImxpbWl0IiwiaW5UaHJvdHRsZSIsImVudGFuZ2xlIiwib3V0ZXJHZXQiLCJvdXRlclNldCIsImlubmVyR2V0IiwiaW5uZXJTZXQiLCJmaXJzdFJ1biIsIm91dGVySGFzaCIsImlubmVySGFzaCIsInJlZmVyZW5jZSIsIm91dGVyIiwiaW5uZXIiLCJjbG9uZUlmT2JqZWN0Iiwib3V0ZXJIYXNoTGF0ZXN0IiwiaW5uZXJIYXNoTGF0ZXN0IiwicGFyc2UiLCJwbHVnaW4iLCJjYWxsYmFja3MiLCJzdG9yZXMiLCJpc1JlYWN0aXZlIiwic3RvcmUiLCJpbml0IiwiZ2V0U3RvcmVzIiwiYmluZHMiLCJiaW5kMiIsImJpbmRpbmdzIiwiZ2V0QmluZGluZ3MiLCJhcHBseUJpbmRpbmdzT2JqZWN0IiwiaW5qZWN0QmluZGluZ1Byb3ZpZGVycyIsImNsZWFudXBSdW5uZXJzIiwiZGF0YXMiLCJkYXRhIiwiaW5qZWN0RGF0YVByb3ZpZGVycyIsInZlcnNpb24iLCJwcmVmaXhlZCIsImJvdW5kIiwiJGRhdGEiLCJtYWtlTWFwIiwic3RyIiwiZXhwZWN0c0xvd2VyQ2FzZSIsImNyZWF0ZSIsImxpc3QiLCJzcGVjaWFsQm9vbGVhbkF0dHJzIiwiaXNCb29sZWFuQXR0cjIiLCJFTVBUWV9PQkoiLCJmcmVlemUiLCJFTVBUWV9BUlIiLCJoYXNPd24iLCJpc01hcCIsInRvVHlwZVN0cmluZyIsImlzU3RyaW5nIiwiaXNTeW1ib2wiLCJpc09iamVjdCIsIm9iamVjdFRvU3RyaW5nIiwidG9TdHJpbmciLCJ0b1Jhd1R5cGUiLCJpc0ludGVnZXJLZXkiLCJwYXJzZUludCIsImNhY2hlU3RyaW5nRnVuY3Rpb24iLCJoaXQiLCJjYW1lbGl6ZVJFIiwiY2FtZWxpemUiLCJfIiwiYyIsImh5cGhlbmF0ZVJFIiwiaHlwaGVuYXRlIiwiY2FwaXRhbGl6ZSIsImNoYXJBdCIsInRvSGFuZGxlcktleSIsImhhc0NoYW5nZWQiLCJ0YXJnZXRNYXAiLCJXZWFrTWFwIiwiZWZmZWN0U3RhY2siLCJhY3RpdmVFZmZlY3QiLCJJVEVSQVRFX0tFWSIsIk1BUF9LRVlfSVRFUkFURV9LRVkiLCJpc0VmZmVjdCIsIl9pc0VmZmVjdCIsImVmZmVjdDIiLCJjcmVhdGVSZWFjdGl2ZUVmZmVjdCIsImxhenkiLCJzdG9wIiwiYWN0aXZlIiwib25TdG9wIiwidWlkIiwicmVhY3RpdmVFZmZlY3QiLCJlbmFibGVUcmFja2luZyIsInJlc2V0VHJhY2tpbmciLCJpZCIsImFsbG93UmVjdXJzZSIsImRlcHMiLCJzaG91bGRUcmFjayIsInRyYWNrU3RhY2siLCJwYXVzZVRyYWNraW5nIiwibGFzdCIsInRyYWNrIiwiZGVwc01hcCIsImRlcCIsIm9uVHJhY2siLCJ0cmlnZ2VyIiwib2xkVGFyZ2V0IiwiZWZmZWN0cyIsImVmZmVjdHNUb0FkZCIsImtleTIiLCJydW4iLCJvblRyaWdnZXIiLCJpc05vblRyYWNrYWJsZUtleXMiLCJidWlsdEluU3ltYm9scyIsImdldE93blByb3BlcnR5TmFtZXMiLCJnZXQyIiwiY3JlYXRlR2V0dGVyIiwicmVhZG9ubHlHZXQiLCJhcnJheUluc3RydW1lbnRhdGlvbnMiLCJjcmVhdGVBcnJheUluc3RydW1lbnRhdGlvbnMiLCJpbnN0cnVtZW50YXRpb25zIiwiYXJyIiwidG9SYXciLCJsIiwiaXNSZWFkb25seSIsInNoYWxsb3ciLCJnZXQzIiwic2hhbGxvd1JlYWRvbmx5TWFwIiwicmVhZG9ubHlNYXAiLCJzaGFsbG93UmVhY3RpdmVNYXAiLCJyZWFjdGl2ZU1hcCIsInRhcmdldElzQXJyYXkiLCJpc1JlZiIsInNob3VsZFVud3JhcCIsInJlYWRvbmx5IiwicmVhY3RpdmUyIiwic2V0MiIsImNyZWF0ZVNldHRlciIsInNldDMiLCJoYWRLZXkiLCJkZWxldGVQcm9wZXJ0eSIsIm11dGFibGVIYW5kbGVycyIsInJlYWRvbmx5SGFuZGxlcnMiLCJ0b1JlYWN0aXZlIiwidG9SZWFkb25seSIsInRvU2hhbGxvdyIsImdldFByb3RvIiwidiIsImdldCQxIiwiaXNTaGFsbG93IiwicmF3VGFyZ2V0IiwicmF3S2V5IiwiaGFzMiIsIndyYXAiLCJoYXMkMSIsInNpemUiLCJwcm90byIsInNldCQxIiwiY2hlY2tJZGVudGl0eUtleXMiLCJkZWxldGVFbnRyeSIsImNsZWFyIiwiaGFkSXRlbXMiLCJjcmVhdGVGb3JFYWNoIiwidGhpc0FyZyIsIm9ic2VydmVkIiwiY3JlYXRlSXRlcmFibGVNZXRob2QiLCJtZXRob2QiLCJ0YXJnZXRJc01hcCIsImlzUGFpciIsIml0ZXJhdG9yIiwiaXNLZXlPbmx5IiwiaW5uZXJJdGVyYXRvciIsIm5leHQiLCJkb25lIiwiY3JlYXRlUmVhZG9ubHlNZXRob2QiLCJjcmVhdGVJbnN0cnVtZW50YXRpb25zIiwibXV0YWJsZUluc3RydW1lbnRhdGlvbnMyIiwic2hhbGxvd0luc3RydW1lbnRhdGlvbnMyIiwicmVhZG9ubHlJbnN0cnVtZW50YXRpb25zMiIsInNoYWxsb3dSZWFkb25seUluc3RydW1lbnRhdGlvbnMyIiwiaXRlcmF0b3JNZXRob2RzIiwibXV0YWJsZUluc3RydW1lbnRhdGlvbnMiLCJyZWFkb25seUluc3RydW1lbnRhdGlvbnMiLCJzaGFsbG93SW5zdHJ1bWVudGF0aW9ucyIsInNoYWxsb3dSZWFkb25seUluc3RydW1lbnRhdGlvbnMiLCJjcmVhdGVJbnN0cnVtZW50YXRpb25HZXR0ZXIiLCJtdXRhYmxlQ29sbGVjdGlvbkhhbmRsZXJzIiwicmVhZG9ubHlDb2xsZWN0aW9uSGFuZGxlcnMiLCJ0YXJnZXRUeXBlTWFwIiwicmF3VHlwZSIsImdldFRhcmdldFR5cGUiLCJpc0V4dGVuc2libGUiLCJjcmVhdGVSZWFjdGl2ZU9iamVjdCIsImJhc2VIYW5kbGVycyIsImNvbGxlY3Rpb25IYW5kbGVycyIsInByb3h5TWFwIiwiZXhpc3RpbmdQcm94eSIsInRhcmdldFR5cGUiLCJwcm94eSIsInIiLCJfX3ZfaXNSZWYiLCJldmFsdWF0ZUxhdGVyMiIsInVud2F0Y2giLCJfeF9yZWZzX3Byb3h5IiwiZ2V0QXJyYXlPZlJlZk9iamVjdCIsInJlZk9iamVjdHMiLCJfeF9yZWZzIiwiZ2xvYmFsSWRNZW1vIiwiZmluZEFuZEluY3JlbWVudElkIiwiY2xvc2VzdElkUm9vdCIsIl94X2lkcyIsInNldElkUm9vdCIsImNhY2hlS2V5IiwiY2FjaGVJZEJ5TmFtZU9uRWxlbWVudCIsIl94X2lkIiwib3V0cHV0Iiwid2Fybk1pc3NpbmdQbHVnaW5NYWdpYyIsIm1hZ2ljTmFtZSIsInNsdWciLCJldmFsdWF0ZUlubmVyU2V0IiwiX3hfbW9kZWwiLCJfeF9yZW1vdmVNb2RlbExpc3RlbmVycyIsInJlbGVhc2VFbnRhbmdsZW1lbnQiLCJnZXRUYXJnZXQiLCJjbG9uZTIiLCJjb250ZW50IiwiX3hfdGVsZXBvcnQiLCJfeF9mb3J3YXJkRXZlbnRzIiwiZXZlbnROYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0b3BQcm9wYWdhdGlvbiIsInBsYWNlSW5Eb20iLCJjbG9uZTMiLCJ0YXJnZXQyIiwibW9kaWZpZXJzMiIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwiYXBwZW5kQ2hpbGQiLCJfeF90ZWxlcG9ydFB1dEJhY2siLCJ0ZWxlcG9ydENvbnRhaW5lckR1cmluZ0Nsb25lIiwiY3JlYXRlRWxlbWVudCIsImhhbmRsZXIiLCJvbiIsImV2ZW50IiwibGlzdGVuZXJUYXJnZXQiLCJ3cmFwSGFuZGxlciIsIndyYXBwZXIiLCJkb3RTeW50YXgiLCJjYW1lbENhc2UyIiwicGFzc2l2ZSIsImNhcHR1cmUiLCJuZXh0TW9kaWZpZXIiLCJpc051bWVyaWMiLCJwcmV2ZW50RGVmYXVsdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsIl94X2lzU2hvd24iLCJpc0tleUV2ZW50IiwiaXNDbGlja0V2ZW50IiwiaXNMaXN0ZW5pbmdGb3JBU3BlY2lmaWNLZXlUaGF0SGFzbnRCZWVuUHJlc3NlZCIsImtlYmFiQ2FzZTIiLCJrZXlNb2RpZmllcnMiLCJkZWJvdW5jZUluZGV4Iiwia2V5VG9Nb2RpZmllcnMiLCJzeXN0ZW1LZXlNb2RpZmllcnMiLCJzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycyIsIm1vZGlmaWVyIiwiYWN0aXZlbHlQcmVzc2VkS2V5TW9kaWZpZXJzIiwibW9kaWZpZXJUb0tleU1hcCIsInNjb3BlVGFyZ2V0IiwiZXZhbHVhdGVHZXQiLCJldmFsdWF0ZVNldCIsImdldFZhbHVlIiwiaXNHZXR0ZXJTZXR0ZXIiLCJzZXRWYWx1ZSIsInJlbW92ZUxpc3RlbmVyIiwiZ2V0SW5wdXRWYWx1ZSIsIm11bHRpcGxlIiwiZm9ybSIsInJlbW92ZVJlc2V0TGlzdGVuZXIiLCJfeF9mb3JjZU1vZGVsVXBkYXRlIiwiYWN0aXZlRWxlbWVudCIsImlzU2FtZU5vZGUiLCJjdXJyZW50VmFsdWUiLCJzYWZlUGFyc2VOdW1iZXIiLCJjaGVja2VkQXR0ckxvb3NlQ29tcGFyZTIiLCJzZWxlY3RlZE9wdGlvbnMiLCJ0ZXh0IiwibnVtYmVyIiwicGFyc2VGbG9hdCIsImlzTnVtZXJpYzIiLCJ0ZXh0Q29udGVudCIsImlubmVySFRNTCIsImhhbmRsZXIyIiwiYmluZGluZ1Byb3ZpZGVycyIsInN0b3JlS2V5Rm9yWEZvciIsIl94X2tleUV4cHJlc3Npb24iLCJzaG91bGRTa2lwUmVnaXN0ZXJpbmdEYXRhRHVyaW5nQ2xvbmUiLCJtYWdpY0NvbnRleHQiLCJkYXRhUHJvdmlkZXJDb250ZXh0IiwicmVhY3RpdmVEYXRhIiwidW5kbyIsIl94X2RvSGlkZSIsIl94X2RvU2hvdyIsImRpc3BsYXkiLCJyZW1vdmVQcm9wZXJ0eSIsInRvZ2dsZSIsIml0ZXJhdG9yTmFtZXMiLCJwYXJzZUZvckV4cHJlc3Npb24iLCJldmFsdWF0ZUl0ZW1zIiwiaXRlbXMiLCJldmFsdWF0ZUtleSIsIl94X3ByZXZLZXlzIiwiX3hfbG9va3VwIiwibG9vcCIsInZhbHVlcyIsInRlbXBsYXRlRWwiLCJpc051bWVyaWMzIiwibG9va3VwIiwicHJldktleXMiLCJzY29wZXMiLCJnZXRJdGVyYXRpb25TY29wZVZhcmlhYmxlcyIsImFkZHMiLCJtb3ZlcyIsInJlbW92ZXMiLCJzYW1lcyIsImxhc3RLZXkiLCJwcmV2SW5kZXgiLCJrZXlJblNwb3QiLCJrZXlGb3JTcG90IiwiZWxJblNwb3QiLCJlbEZvclNwb3QiLCJtYXJrZXIiLCJfeF9jdXJyZW50SWZFbCIsIl94X3JlZnJlc2hYRm9yU2NvcGUiLCJsYXN0S2V5MiIsImxhc3RFbCIsImltcG9ydE5vZGUiLCJyZWFjdGl2ZVNjb3BlIiwibmV3U2NvcGUiLCJmb3JJdGVyYXRvclJFIiwic3RyaXBQYXJlbnNSRSIsImZvckFsaWFzUkUiLCJpbk1hdGNoIiwiaXRlbSIsIml0ZXJhdG9yTWF0Y2giLCJjb2xsZWN0aW9uIiwic2NvcGVWYXJpYWJsZXMiLCJoYW5kbGVyMyIsIl94X3VuZG9JZiIsIndhcm5NaXNzaW5nUGx1Z2luRGlyZWN0aXZlIiwiZGlyZWN0aXZlTmFtZSIsInNyY19kZWZhdWx0IiwibW9kdWxlX2RlZmF1bHQiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==