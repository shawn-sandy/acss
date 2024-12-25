import React from "react";
const jsxDevRuntime = { exports: {} };
const reactJsxDevRuntime_development = {};
/**
* @license React
* react-jsx-dev-runtime.development.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
{
  (function() {
    const React$1 = React;
    const REACT_ELEMENT_TYPE = Symbol.for("react.element");
    const REACT_PORTAL_TYPE = Symbol.for("react.portal");
    const REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    const REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
    const REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    const REACT_PROVIDER_TYPE = Symbol.for("react.provider");
    const REACT_CONTEXT_TYPE = Symbol.for("react.context");
    const REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
    const REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
    const REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
    const REACT_MEMO_TYPE = Symbol.for("react.memo");
    const REACT_LAZY_TYPE = Symbol.for("react.lazy");
    const REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
    const MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    const FAUX_ITERATOR_SYMBOL = "@@iterator";
    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== "object") {
        return null;
      }
      const maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
      if (typeof maybeIterator === "function") {
        return maybeIterator;
      }
      return null;
    }
    const ReactSharedInternals = React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function error(format) {
      {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          printWarning("error", format, args);
        }
      }
    }
    function printWarning(level, format, args) {
      {
        const ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
        const stack = ReactDebugCurrentFrame2.getStackAddendum();
        if (stack !== "") {
          format += "%s";
          args = args.concat([stack]);
        }
        const argsWithFormat = args.map(function(item) {
          return String(item);
        });
        argsWithFormat.unshift("Warning: " + format);
        Function.prototype.apply.call(console[level], console, argsWithFormat);
      }
    }
    const enableScopeAPI = false;
    const enableCacheElement = false;
    const enableTransitionTracing = false;
    const enableLegacyHidden = false;
    const enableDebugTracing = false;
    let REACT_MODULE_REFERENCE;
    {
      REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
    }
    function isValidElementType(type) {
      if (typeof type === "string" || typeof type === "function") {
        return true;
      }
      if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
        return true;
      }
      if (typeof type === "object" && type !== null) {
        if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
          return true;
        }
      }
      return false;
    }
    function getWrappedName(outerType, innerType, wrapperName) {
      const displayName = outerType.displayName;
      if (displayName) {
        return displayName;
      }
      const functionName = innerType.displayName || innerType.name || "";
      return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
    }
    function getContextName(type) {
      return type.displayName || "Context";
    }
    function getComponentNameFromType(type) {
      if (type == null) {
        return null;
      }
      {
        if (typeof type.tag === "number") {
          error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
        }
      }
      if (typeof type === "function") {
        return type.displayName || type.name || null;
      }
      if (typeof type === "string") {
        return type;
      }
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if (typeof type === "object") {
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            var context = type;
            return getContextName(context) + ".Consumer";
          case REACT_PROVIDER_TYPE:
            var provider = type;
            return getContextName(provider._context) + ".Provider";
          case REACT_FORWARD_REF_TYPE:
            return getWrappedName(type, type.render, "ForwardRef");
          case REACT_MEMO_TYPE:
            var outerName = type.displayName || null;
            if (outerName !== null) {
              return outerName;
            }
            return getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE: {
            const lazyComponent = type;
            const payload = lazyComponent._payload;
            const init = lazyComponent._init;
            try {
              return getComponentNameFromType(init(payload));
            } catch (x) {
              return null;
            }
          }
        }
      }
      return null;
    }
    const assign = Object.assign;
    let disabledDepth = 0;
    let prevLog;
    let prevInfo;
    let prevWarn;
    let prevError;
    let prevGroup;
    let prevGroupCollapsed;
    let prevGroupEnd;
    function disabledLog() {
    }
    disabledLog.__reactDisabledLog = true;
    function disableLogs() {
      {
        if (disabledDepth === 0) {
          prevLog = console.log;
          prevInfo = console.info;
          prevWarn = console.warn;
          prevError = console.error;
          prevGroup = console.group;
          prevGroupCollapsed = console.groupCollapsed;
          prevGroupEnd = console.groupEnd;
          const props = {
            configurable: true,
            enumerable: true,
            value: disabledLog,
            writable: true
          };
          Object.defineProperties(console, {
            info: props,
            log: props,
            warn: props,
            error: props,
            group: props,
            groupCollapsed: props,
            groupEnd: props
          });
        }
        disabledDepth++;
      }
    }
    function reenableLogs() {
      {
        disabledDepth--;
        if (disabledDepth === 0) {
          const props = {
            configurable: true,
            enumerable: true,
            writable: true
          };
          Object.defineProperties(console, {
            log: assign({}, props, {
              value: prevLog
            }),
            info: assign({}, props, {
              value: prevInfo
            }),
            warn: assign({}, props, {
              value: prevWarn
            }),
            error: assign({}, props, {
              value: prevError
            }),
            group: assign({}, props, {
              value: prevGroup
            }),
            groupCollapsed: assign({}, props, {
              value: prevGroupCollapsed
            }),
            groupEnd: assign({}, props, {
              value: prevGroupEnd
            })
          });
        }
        if (disabledDepth < 0) {
          error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
    }
    const ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
    let prefix;
    function describeBuiltInComponentFrame(name, source, ownerFn) {
      {
        if (prefix === void 0) {
          try {
            throw Error();
          } catch (x) {
            const match = x.stack.trim().match(/\n( *(at )?)/);
            prefix = match && match[1] || "";
          }
        }
        return "\n" + prefix + name;
      }
    }
    let reentry = false;
    let componentFrameCache;
    {
      const PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
      componentFrameCache = new PossiblyWeakMap();
    }
    function describeNativeComponentFrame(fn, construct) {
      if (!fn || reentry) {
        return "";
      }
      {
        const frame = componentFrameCache.get(fn);
        if (frame !== void 0) {
          return frame;
        }
      }
      let control;
      reentry = true;
      const previousPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      let previousDispatcher;
      {
        previousDispatcher = ReactCurrentDispatcher.current;
        ReactCurrentDispatcher.current = null;
        disableLogs();
      }
      try {
        if (construct) {
          const Fake = function() {
            throw Error();
          };
          Object.defineProperty(Fake.prototype, "props", {
            set: function() {
              throw Error();
            }
          });
          if (typeof Reflect === "object" && Reflect.construct) {
            try {
              Reflect.construct(Fake, []);
            } catch (x) {
              control = x;
            }
            Reflect.construct(fn, [], Fake);
          } else {
            try {
              Fake.call();
            } catch (x) {
              control = x;
            }
            fn.call(Fake.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            control = x;
          }
          fn();
        }
      } catch (sample) {
        if (sample && control && typeof sample.stack === "string") {
          const sampleLines = sample.stack.split("\n");
          const controlLines = control.stack.split("\n");
          let s = sampleLines.length - 1;
          let c = controlLines.length - 1;
          while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
            c--;
          }
          for (; s >= 1 && c >= 0; s--, c--) {
            if (sampleLines[s] !== controlLines[c]) {
              if (s !== 1 || c !== 1) {
                do {
                  s--;
                  c--;
                  if (c < 0 || sampleLines[s] !== controlLines[c]) {
                    let _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                    if (fn.displayName && _frame.includes("<anonymous>")) {
                      _frame = _frame.replace("<anonymous>", fn.displayName);
                    }
                    {
                      if (typeof fn === "function") {
                        componentFrameCache.set(fn, _frame);
                      }
                    }
                    return _frame;
                  }
                } while (s >= 1 && c >= 0);
              }
              break;
            }
          }
        }
      } finally {
        reentry = false;
        {
          ReactCurrentDispatcher.current = previousDispatcher;
          reenableLogs();
        }
        Error.prepareStackTrace = previousPrepareStackTrace;
      }
      const name = fn ? fn.displayName || fn.name : "";
      const syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
      {
        if (typeof fn === "function") {
          componentFrameCache.set(fn, syntheticFrame);
        }
      }
      return syntheticFrame;
    }
    function describeFunctionComponentFrame(fn, source, ownerFn) {
      {
        return describeNativeComponentFrame(fn, false);
      }
    }
    function shouldConstruct(Component) {
      const prototype = Component.prototype;
      return !!(prototype && prototype.isReactComponent);
    }
    function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
      if (type == null) {
        return "";
      }
      if (typeof type === "function") {
        {
          return describeNativeComponentFrame(type, shouldConstruct(type));
        }
      }
      if (typeof type === "string") {
        return describeBuiltInComponentFrame(type);
      }
      switch (type) {
        case REACT_SUSPENSE_TYPE:
          return describeBuiltInComponentFrame("Suspense");
        case REACT_SUSPENSE_LIST_TYPE:
          return describeBuiltInComponentFrame("SuspenseList");
      }
      if (typeof type === "object") {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeFunctionComponentFrame(type.render);
          case REACT_MEMO_TYPE:
            return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
          case REACT_LAZY_TYPE: {
            const lazyComponent = type;
            const payload = lazyComponent._payload;
            const init = lazyComponent._init;
            try {
              return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
            } catch (x) {
            }
          }
        }
      }
      return "";
    }
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    const loggedTypeFailures = {};
    const ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    function setCurrentlyValidatingElement(element) {
      {
        if (element) {
          const owner = element._owner;
          const stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else {
          ReactDebugCurrentFrame.setExtraStackFrame(null);
        }
      }
    }
    function checkPropTypes(typeSpecs, values, location, componentName, element) {
      {
        const has = Function.call.bind(hasOwnProperty);
        for (const typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            let error$1 = void 0;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                const err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                err.name = "Invariant Violation";
                throw err;
              }
              error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ex) {
              error$1 = ex;
            }
            if (error$1 && !(error$1 instanceof Error)) {
              setCurrentlyValidatingElement(element);
              error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
              setCurrentlyValidatingElement(null);
            }
            if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
              loggedTypeFailures[error$1.message] = true;
              setCurrentlyValidatingElement(element);
              error("Failed %s type: %s", location, error$1.message);
              setCurrentlyValidatingElement(null);
            }
          }
        }
      }
    }
    const isArrayImpl = Array.isArray;
    function isArray(a) {
      return isArrayImpl(a);
    }
    function typeName(value) {
      {
        const hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
        const type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        return type;
      }
    }
    function willCoercionThrow(value) {
      {
        try {
          testStringCoercion(value);
          return false;
        } catch (e) {
          return true;
        }
      }
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      {
        if (willCoercionThrow(value)) {
          error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
          return testStringCoercion(value);
        }
      }
    }
    const ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
    const RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    let specialPropKeyWarningShown;
    let specialPropRefWarningShown;
    let didWarnAboutStringRefs;
    {
      didWarnAboutStringRefs = {};
    }
    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, "ref")) {
          const getter = Object.getOwnPropertyDescriptor(config, "ref").get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== void 0;
    }
    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, "key")) {
          const getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== void 0;
    }
    function warnIfStringRefCannotBeAutoConverted(config, self) {
      {
        if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
          const componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
          if (!didWarnAboutStringRefs[componentName]) {
            error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
            didWarnAboutStringRefs[componentName] = true;
          }
        }
      }
    }
    function defineKeyPropWarningGetter(props, displayName) {
      {
        const warnAboutAccessingKey = function() {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
          }
        };
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
    }
    function defineRefPropWarningGetter(props, displayName) {
      {
        const warnAboutAccessingRef = function() {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true;
            error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
          }
        };
        warnAboutAccessingRef.isReactWarning = true;
        Object.defineProperty(props, "ref", {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }
    }
    const ReactElement = function(type, key, ref, self, source, owner, props) {
      const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref,
        props,
        _owner: owner
      };
      {
        element._store = {};
        Object.defineProperty(element._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        });
        Object.defineProperty(element, "_self", {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        });
        Object.defineProperty(element, "_source", {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });
        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    function jsxDEV(type, config, maybeKey, source, self) {
      {
        let propName;
        const props = {};
        let key = null;
        let ref = null;
        if (maybeKey !== void 0) {
          {
            checkKeyStringCoercion(maybeKey);
          }
          key = "" + maybeKey;
        }
        if (hasValidKey(config)) {
          {
            checkKeyStringCoercion(config.key);
          }
          key = "" + config.key;
        }
        if (hasValidRef(config)) {
          ref = config.ref;
          warnIfStringRefCannotBeAutoConverted(config, self);
        }
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
        if (type && type.defaultProps) {
          const defaultProps = type.defaultProps;
          for (propName in defaultProps) {
            if (props[propName] === void 0) {
              props[propName] = defaultProps[propName];
            }
          }
        }
        if (key || ref) {
          const displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
          if (key) {
            defineKeyPropWarningGetter(props, displayName);
          }
          if (ref) {
            defineRefPropWarningGetter(props, displayName);
          }
        }
        return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
      }
    }
    const ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
    const ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
    function setCurrentlyValidatingElement$1(element) {
      {
        if (element) {
          const owner = element._owner;
          const stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else {
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
        }
      }
    }
    let propTypesMisspellWarningShown;
    {
      propTypesMisspellWarningShown = false;
    }
    function isValidElement(object) {
      {
        return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
    }
    function getDeclarationErrorAddendum() {
      {
        if (ReactCurrentOwner$1.current) {
          const name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
          if (name) {
            return "\n\nCheck the render method of `" + name + "`.";
          }
        }
        return "";
      }
    }
    function getSourceInfoErrorAddendum(source) {
      {
        if (source !== void 0) {
          const fileName = source.fileName.replace(/^.*[\\\/]/, "");
          const lineNumber = source.lineNumber;
          return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
        }
        return "";
      }
    }
    const ownerHasKeyUseWarning = {};
    function getCurrentComponentErrorInfo(parentType) {
      {
        let info = getDeclarationErrorAddendum();
        if (!info) {
          const parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
          if (parentName) {
            info = "\n\nCheck the top-level render call using <" + parentName + ">.";
          }
        }
        return info;
      }
    }
    function validateExplicitKey(element, parentType) {
      {
        if (!element._store || element._store.validated || element.key != null) {
          return;
        }
        element._store.validated = true;
        const currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
          return;
        }
        ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
        let childOwner = "";
        if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
          childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
        }
        setCurrentlyValidatingElement$1(element);
        error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
        setCurrentlyValidatingElement$1(null);
      }
    }
    function validateChildKeys(node, parentType) {
      {
        if (typeof node !== "object") {
          return;
        }
        if (isArray(node)) {
          for (let i = 0; i < node.length; i++) {
            const child = node[i];
            if (isValidElement(child)) {
              validateExplicitKey(child, parentType);
            }
          }
        } else if (isValidElement(node)) {
          if (node._store) {
            node._store.validated = true;
          }
        } else if (node) {
          const iteratorFn = getIteratorFn(node);
          if (typeof iteratorFn === "function") {
            if (iteratorFn !== node.entries) {
              const iterator = iteratorFn.call(node);
              let step;
              while (!(step = iterator.next()).done) {
                if (isValidElement(step.value)) {
                  validateExplicitKey(step.value, parentType);
                }
              }
            }
          }
        }
      }
    }
    function validatePropTypes(element) {
      {
        const type = element.type;
        if (type === null || type === void 0 || typeof type === "string") {
          return;
        }
        let propTypes;
        if (typeof type === "function") {
          propTypes = type.propTypes;
        } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
          propTypes = type.propTypes;
        } else {
          return;
        }
        if (propTypes) {
          const name = getComponentNameFromType(type);
          checkPropTypes(propTypes, element.props, "prop", name, element);
        } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
          propTypesMisspellWarningShown = true;
          const _name = getComponentNameFromType(type);
          error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
        }
        if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
          error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
    }
    function validateFragmentProps(fragment) {
      {
        const keys = Object.keys(fragment.props);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key !== "children" && key !== "key") {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
            setCurrentlyValidatingElement$1(null);
            break;
          }
        }
        if (fragment.ref !== null) {
          setCurrentlyValidatingElement$1(fragment);
          error("Invalid attribute `ref` supplied to `React.Fragment`.");
          setCurrentlyValidatingElement$1(null);
        }
      }
    }
    function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
      {
        const validType = isValidElementType(type);
        if (!validType) {
          let info = "";
          if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
            info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
          }
          const sourceInfo = getSourceInfoErrorAddendum(source);
          if (sourceInfo) {
            info += sourceInfo;
          } else {
            info += getDeclarationErrorAddendum();
          }
          let typeString;
          if (type === null) {
            typeString = "null";
          } else if (isArray(type)) {
            typeString = "array";
          } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
            typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
            info = " Did you accidentally export a JSX literal instead of a component?";
          } else {
            typeString = typeof type;
          }
          error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
        }
        const element = jsxDEV(type, props, key, source, self);
        if (element == null) {
          return element;
        }
        if (validType) {
          const children = props.children;
          if (children !== void 0) {
            if (isStaticChildren) {
              if (isArray(children)) {
                for (let i = 0; i < children.length; i++) {
                  validateChildKeys(children[i], type);
                }
                if (Object.freeze) {
                  Object.freeze(children);
                }
              } else {
                error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              }
            } else {
              validateChildKeys(children, type);
            }
          }
        }
        if (type === REACT_FRAGMENT_TYPE) {
          validateFragmentProps(element);
        } else {
          validatePropTypes(element);
        }
        return element;
      }
    }
    const jsxDEV$1 = jsxWithValidation;
    reactJsxDevRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxDevRuntime_development.jsxDEV = jsxDEV$1;
  })();
}
{
  jsxDevRuntime.exports = reactJsxDevRuntime_development;
}
const _jsxFileName$h = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/fp.tsx";
const fpStyles = (styles) => {
  if (styles.styles === void 0)
    return {};
  return styles;
};
const FP = React.forwardRef(({
  as,
  renderStyles = true,
  styles,
  children,
  defaultStyles: defaultStyles2,
  ...props
}, ref) => {
  const Component = as || "div";
  const styleObj = renderStyles ? {
    ...defaultStyles2,
    ...styles
  } : {};
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Component, {
    ref,
    style: styleObj,
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName$h,
    lineNumber: 68,
    columnNumber: 7
  }, void 0);
});
const _jsxFileName$g = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/badge/fp-badge.tsx";
const defStyles = {
  paddingInline: "var(--badge-px, 0.7rem)",
  paddingBlock: "var(--badge-py, 0.2rem)",
  color: "var(--badge-cl, black)",
  fontSize: "var(--badge-fs, 0.8rem)",
  fontWeight: "var(--badge-fw, normal)",
  fontFamily: "var(--badge-ff, sans-serif)",
  border: "var(--badge-brd, none)",
  borderRadius: "var(--badge-rds, 99rem)",
  backgroundColor: "var(--badge-bg, lightgray)",
  textDecoration: "var(--badge-decoration, none)",
  textTransform: "var(--badge-tt, var(--tt))"
};
const Badge = ({
  elm = "span",
  role,
  children,
  renderStyles = true,
  styles = {},
  ...props
}) => {
  const stylesObj = renderStyles ? defStyles : {};
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: elm,
    role,
    styles: {
      ...stylesObj,
      ...styles
    },
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName$g,
    lineNumber: 46,
    columnNumber: 5
  }, void 0);
};
Badge.displayName = "Badge";
const _jsxFileName$f = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/buttons/button.tsx";
const Button = ({
  type,
  children,
  styles,
  disabled,
  classes,
  pointerDown,
  pointerOver,
  pointerLeave,
  defaultStyles: defaultStyles2 = false,
  ...props
}) => {
  const defStyles2 = {};
  const stylesObj = defaultStyles2 ? defStyles2 : {};
  const handlePointerEvents = (e) => {
    e.type;
    if (!disabled) {
      switch (e.type) {
        case "pointerover":
          pointerOver == null ? void 0 : pointerOver(e);
          break;
        case "pointerleave":
          pointerLeave == null ? void 0 : pointerLeave(e);
          break;
        case "pointerdown":
          if (e.button === 0)
            pointerDown == null ? void 0 : pointerDown(e);
      }
    }
  };
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("button", {
    type,
    onPointerOver: handlePointerEvents,
    onPointerDown: handlePointerEvents,
    onPointerLeave: handlePointerEvents,
    style: {
      ...stylesObj,
      ...styles
    },
    "aria-disabled": disabled,
    disabled,
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName$f,
    lineNumber: 99,
    columnNumber: 5
  }, void 0);
};
Button.displayName = "Button";
const _jsxFileName$e = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/cards/card.tsx";
const defaultStyles$7 = {
  padding: "var(--card-p, 2rem)",
  backgroundColor: "var(--card-bg, white)",
  boxShadow: "var(--card-shadow, 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1))",
  borderRadius: "var(--card-rds, 0.2\xDFrem)",
  border: "var(--card-brd, none)",
  color: "var(--card-cl, black)"
};
const Card = ({
  elm = "div",
  styles,
  children,
  renderStyles = true,
  dataStyle,
  id,
  ...props
}) => {
  const stylesObj = renderStyles ? defaultStyles$7 : {};
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: elm,
    id,
    styles: {
      ...stylesObj,
      ...styles
    },
    renderStyles,
    "data-card": dataStyle,
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName$e,
    lineNumber: 29,
    columnNumber: 5
  }, void 0);
};
Card.displayName = "Card";
const _jsxFileName$d = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/dropdowns/dropdown-details.tsx";
const defaultStyles$6 = {
  padding: "var(--card-p, 1.2rem)",
  backgroundColor: "var(--card-bg, white)"
};
const Details = ({
  title,
  children,
  styles,
  renderStyles = true,
  onToggle,
  ...props
}) => {
  const styleObj = renderStyles ? defaultStyles$6 : {};
  const handleToggle = (e) => {
    onToggle == null ? void 0 : onToggle(e);
  };
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "details",
    title,
    onToggle: handleToggle,
    styles: {
      ...styleObj,
      ...styles
    },
    children
  }, void 0, false, {
    fileName: _jsxFileName$d,
    lineNumber: 28,
    columnNumber: 5
  }, void 0);
};
Details.displayName = "Details";
const _jsxFileName$c = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/dropdowns/dropdown-summary.tsx";
const defaultStyles$5 = {
  listStyle: "none",
  justifyContent: "var(--summary-justify, space-between)",
  color: "var(--summary-color, currentColor)",
  cursor: "var(--detail-cursor, pointer)"
};
const Summary = ({
  children,
  styles,
  renderStyles = true,
  ...props
}) => {
  const stylesObj = renderStyles ? defaultStyles$5 : {};
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "summary",
    styles: {
      ...stylesObj,
      ...styles
    },
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName$c,
    lineNumber: 20,
    columnNumber: 5
  }, void 0);
};
Summary.displayName = "Summary";
const _jsxFileName$b = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/dropdowns/dropdown.tsx";
const defaultStyles$4 = {
  display: "flex",
  placeContent: "flex-start",
  placeItems: "center",
  gap: ".7rem",
  border: "var(--summary-border, solid 1px #ccc)",
  transition: "all 0.2s ease",
  backgroundColor: "var(--summary-bg, whitesmoke)",
  padding: "var(--details-pd, 1.2rem)",
  minWidth: "var(--summary-min-w, 80vw)",
  maxWidth: "var(--summary-min-w, 80vw)"
};
const Dropdown = ({
  styles,
  children,
  summary,
  toggle,
  renderStyles = true,
  ...props
}) => {
  const stylesObj = renderStyles ? defaultStyles$4 : {};
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Details, {
    styles: {
      ...stylesObj,
      ...styles
    },
    onToggle: toggle,
    ...props,
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Summary, {
      children: summary
    }, void 0, false, {
      fileName: _jsxFileName$b,
      lineNumber: 35,
      columnNumber: 7
    }, void 0), children]
  }, void 0, true, {
    fileName: _jsxFileName$b,
    lineNumber: 34,
    columnNumber: 5
  }, void 0);
};
Dropdown.displayName = "Dropdown";
const _jsxFileName$a = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/images/img.tsx";
const defaultStyles$3 = {
  maxWidth: "var(--img-w, 100%)",
  height: "var(--img-h, auto)",
  objectFit: "var(--img-obj-fit, cover)",
  objectPosition: "var(--img-position, center center)",
  aspectRatio: "var(--img-ratio, auto 2/3)"
};
const Img = ({
  src,
  alt,
  width = 480,
  height,
  styles,
  renderStyles = true,
  loading = "lazy",
  placeholder = `https://via.placeholder.com/${width}?text=PLACEHOLDER`,
  imgLoaded,
  imgError,
  ...props
}) => {
  const stylesObj = renderStyles ? defaultStyles$3 : {};
  const handleImgError = (e) => {
    if (imgError) {
      imgError == null ? void 0 : imgError(e);
      return;
    }
    if (e.currentTarget.src !== placeholder) {
      e.currentTarget.src = placeholder;
    }
  };
  const handleImgLoad = (e) => {
    imgLoaded == null ? void 0 : imgLoaded(e);
  };
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "img",
    src,
    alt,
    width,
    height: height || "auto",
    loading,
    style: {
      ...styles,
      ...stylesObj
    },
    onError: handleImgError,
    onLoad: handleImgLoad,
    ...props
  }, void 0, false, {
    fileName: _jsxFileName$a,
    lineNumber: 63,
    columnNumber: 5
  }, void 0);
};
Img.displayName = "Img";
const _jsxFileName$9 = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/modal/dialog.tsx";
const Dialog = ({
  id,
  children,
  modalRef,
  openOnMount,
  ...props
}) => {
  const handleCloseModal = (e) => {
    if (e.currentTarget === e.target) {
      e.currentTarget.close();
    }
  };
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "dialog",
    id,
    ref: modalRef,
    open: openOnMount,
    onClick: handleCloseModal,
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName$9,
    lineNumber: 38,
    columnNumber: 5
  }, void 0);
};
Dialog.displayName = "Dialog";
const _jsxFileName$8 = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/modal/modal.tsx";
const Modal = ({
  openChild,
  closeChild,
  modalHeader,
  modalFooter,
  children,
  showOpen = false,
  ...props
}) => {
  const dialogRef = React.useRef(null);
  const openModal = () => {
    if (dialogRef.current) {
      if (showOpen)
        dialogRef.current.show();
      else
        dialogRef.current.showModal();
    }
  };
  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(jsxDevRuntime.exports.Fragment, {
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Dialog, {
      modalRef: dialogRef,
      openOnMount: showOpen,
      ...props,
      children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("section", {
        children: [modalHeader, children, modalFooter != null ? modalFooter : /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("div", {
          children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Button, {
            type: "button",
            pointerDown: () => {
              closeModal();
            },
            children: closeChild || "Close"
          }, void 0, false, {
            fileName: _jsxFileName$8,
            lineNumber: 64,
            columnNumber: 15
          }, void 0), " "]
        }, void 0, true, {
          fileName: _jsxFileName$8,
          lineNumber: 63,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$8,
        lineNumber: 59,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$8,
      lineNumber: 58,
      columnNumber: 7
    }, void 0), !showOpen && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Button, {
      type: "button",
      pointerDown: openModal,
      children: openChild || "Open Modal"
    }, void 0, false, {
      fileName: _jsxFileName$8,
      lineNumber: 77,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
Modal.displayName = "Modal";
const _jsxFileName$7 = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/tables/table-elements.tsx";
const Caption = ({
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "caption",
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName$7,
    lineNumber: 8,
    columnNumber: 5
  }, void 0);
};
const Thead = ({
  children,
  ...props
}) => /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
  as: "thead",
  ...props,
  children
}, void 0, false, {
  fileName: _jsxFileName$7,
  lineNumber: 15,
  columnNumber: 3
}, void 0);
const Tbody = ({
  children,
  ...props
}) => /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
  as: "tbody",
  ...props,
  children
}, void 0, false, {
  fileName: _jsxFileName$7,
  lineNumber: 21,
  columnNumber: 3
}, void 0);
const Tr = ({
  children,
  ...props
}) => /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
  as: "tr",
  ...props,
  children
}, void 0, false, {
  fileName: _jsxFileName$7,
  lineNumber: 27,
  columnNumber: 3
}, void 0);
const Td = ({
  children,
  ...props
}) => /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
  as: "td",
  ...props,
  children
}, void 0, false, {
  fileName: _jsxFileName$7,
  lineNumber: 33,
  columnNumber: 3
}, void 0);
const Table = ({
  id,
  dataStyle,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "section",
    id,
    ...props,
    "data-style": "table-wrapper",
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("table", {
      children
    }, void 0, false, {
      fileName: _jsxFileName$7,
      lineNumber: 46,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$7,
    lineNumber: 40,
    columnNumber: 5
  }, void 0);
};
Table.displayName = "Table";
Caption.displayName = "Caption";
Thead.displayName = "Thead";
Tbody.displayName = "Tbody";
Tr.displayName = "Tr";
Td.displayName = "Td";
const _jsxFileName$6 = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/tables/table.tsx";
const RenderTable = ({
  tblBody,
  tblCaption,
  tblHead
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Table, {
    children: [tblCaption && /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Caption, {
      children: tblCaption
    }, void 0, false, {
      fileName: _jsxFileName$6,
      lineNumber: 48,
      columnNumber: 22
    }, void 0), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Thead, {
      children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Tr, {
        children: tblHead
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 50,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$6,
      lineNumber: 49,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(Tbody, {
      children: tblBody
    }, void 0, false, {
      fileName: _jsxFileName$6,
      lineNumber: 54,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$6,
    lineNumber: 47,
    columnNumber: 5
  }, void 0);
};
RenderTable.displayName = "TBL";
const _jsxFileName$5 = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/list/list.tsx";
const List = ({
  children,
  classes,
  type = "ul",
  variant,
  styles,
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: type,
    "data-variant": variant,
    className: classes,
    style: styles,
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName$5,
    lineNumber: 21,
    columnNumber: 5
  }, void 0);
};
const _jsxFileName$4 = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/form/inputs.tsx";
const defaultStyles$2 = {};
const Input = ({
  type = "text",
  name,
  value,
  placeholder,
  id,
  disabled,
  readonly,
  required,
  inputRef,
  inputChange,
  inputBlur,
  inputDown,
  ...props
}) => {
  const handleChange = (e) => {
    if (inputChange && !disabled) {
      inputChange == null ? void 0 : inputChange(e);
    }
  };
  const handleBlur = (e) => {
    if (inputBlur && !disabled) {
      inputBlur == null ? void 0 : inputBlur(e);
    }
  };
  const handleKeyDown = (e) => {
    if (inputDown && !disabled) {
      e.preventDefault();
      inputDown == null ? void 0 : inputDown(e);
    }
  };
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "input",
    id,
    type,
    placeholder,
    styles: {
      ...defaultStyles$2
    },
    onChange: handleChange,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    value,
    name,
    ref: inputRef,
    "aria-disabled": disabled,
    "tab-index": disabled ? -1 : void 0,
    "aria-readonly": readonly,
    readOnly: readonly,
    ...props
  }, void 0, false, {
    fileName: _jsxFileName$4,
    lineNumber: 96,
    columnNumber: 5
  }, void 0);
};
Input.displayName = "Input";
const _jsxFileName$3 = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/form/fields.tsx";
const defaultStyles$1 = {};
const Field = ({
  labelFor,
  styles,
  label,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "div",
    styles: {
      ...defaultStyles$1
    },
    "data-style": "fields",
    children: [/* @__PURE__ */ jsxDevRuntime.exports.jsxDEV("label", {
      htmlFor: labelFor,
      children: label
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 26,
      columnNumber: 7
    }, void 0), children]
  }, void 0, true, {
    fileName: _jsxFileName$3,
    lineNumber: 25,
    columnNumber: 5
  }, void 0);
};
Field.displayName = "Field";
const _jsxFileName$2 = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/form/textarea.tsx";
const defaultStyles = {};
const Textarea = ({
  value,
  rows,
  cols,
  id,
  required,
  disabled,
  readonly,
  textareaBlur,
  textareaChange,
  textareaDown,
  textareaRef,
  ...props
}) => {
  const handleChange = (e) => {
    if (textareaChange && !disabled) {
      textareaChange(e);
    }
  };
  const handleBlur = (e) => {
    if (textareaBlur && !disabled) {
      textareaBlur == null ? void 0 : textareaBlur(e);
    }
  };
  const handleKeyDown = (e) => {
    if (textareaDown && !disabled) {
      textareaDown == null ? void 0 : textareaDown(e);
    }
  };
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "textarea",
    ref: textareaRef,
    rows,
    cols,
    styles: {
      ...defaultStyles
    },
    "data-style": "textarea",
    id,
    required,
    value,
    "aria-disabled": disabled,
    readOnly: readonly,
    onChange: handleChange,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    ...props
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 67,
    columnNumber: 5
  }, void 0);
};
Textarea.displayName = "Textarea";
const _jsxFileName$1 = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/text/text.tsx";
const Text = ({
  elm = "p",
  text,
  styles,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: elm,
    styles,
    ...props,
    children: children || text
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 42,
    columnNumber: 5
  }, void 0);
};
const Title = ({
  elm = "h3",
  children,
  styles,
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: elm,
    styles,
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 59,
    columnNumber: 5
  }, void 0);
};
Text.displayName = "Text";
Title.displayName = "Title";
const _jsxFileName = "/Users/shawnsandy/devbox/fp-kit/libs/react/fpkit/src/components/layout/landmarks.tsx";
const Header = ({
  children,
  styles = {},
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "header",
    ...props,
    styles,
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
      as: "section",
      children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 5
  }, void 0);
};
const Main = ({
  children,
  styles = {},
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "main",
    styles,
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 5
  }, void 0);
};
const Footer = ({
  children,
  styles = {},
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "footer",
    styles,
    ...props,
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
      as: "section",
      children: children || "Copyright \xA9 2022"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 5
  }, void 0);
};
const Aside = ({
  children,
  styles = {},
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "aside",
    styles,
    ...props,
    children: /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
      as: "section",
      children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 5
  }, void 0);
};
const Section = ({
  children,
  styles = {},
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "section",
    styles,
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 46,
    columnNumber: 5
  }, void 0);
};
const Article = ({
  children,
  styles = {},
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntime.exports.jsxDEV(FP, {
    as: "article",
    styles,
    ...props,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 58,
    columnNumber: 5
  }, void 0);
};
Header.displayName = "Header";
Main.displayName = "Main";
Footer.displayName = "Footer";
Aside.displayName = "Aside";
Section.displayName = "Section";
Article.displayName = "Article";
export { Article, Aside, Badge, FP as Box, Button, Caption, Card, Dialog, Dropdown, FP, Field, Footer, Header, Img, Input, FP as Kit, List, Main, Modal, Section, RenderTable as TBL, Table, FP as Tag, Tbody, Td, Text, Textarea, Thead, Title, Tr, fpStyles };
// # sourceMappingURL=index.es.js.map
