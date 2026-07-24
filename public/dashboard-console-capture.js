(function () {
  if (window.self === window.top) return;

  const logs = [];
  const MAX_LOGS = 500;

  const originalConsole = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    info: console.info.bind(console),
    debug: console.debug.bind(console),
  };

  function serialize(arg) {
    if (typeof arg === 'object' && arg !== null) {
      try {
        return JSON.stringify(arg, function (key, value) {
          if (typeof value === 'function') return '[Function]';
          if (value instanceof Error) return value.toString();
          return value;
        }, 2);
      } catch (e) {
        return '[Object]';
      }
    }
    return String(arg);
  }

  function captureLog(level, args) {
    var timestamp = new Date().toISOString();
    var message = Array.prototype.slice.call(args).map(serialize).join(' ');

    var logEntry = {
      timestamp: timestamp,
      level: level,
      message: message,
      url: window.location.href,
    };

    logs.push(logEntry);
    if (logs.length > MAX_LOGS) logs.shift();

    try {
      window.parent.postMessage({ type: 'console-log', log: logEntry }, '*');
    } catch (e) {}
  }

  ['log', 'warn', 'error', 'info', 'debug'].forEach(function (method) {
    console[method] = function () {
      originalConsole[method].apply(console, arguments);
      captureLog(method, arguments);
    };
  });

  window.addEventListener('error', function (event) {
    captureLog('error', [event.message + (event.filename ? ' (' + event.filename + ':' + event.lineno + ')' : '')]);
  });

  window.addEventListener('unhandledrejection', function (event) {
    captureLog('error', ['Unhandled Promise Rejection: ' + String(event.reason)]);
  });

  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href,
        },
        timestamp: new Date().toISOString(),
      }, '*');
    } catch (e) {}
  }

  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString(),
      }, '*');
    } catch (e) {}
    sendRouteChange();
  }

  // Route change monitoring
  var _pushState = history.pushState;
  var _replaceState = history.replaceState;

  history.pushState = function () {
    _pushState.apply(history, arguments);
    sendRouteChange();
  };

  history.replaceState = function () {
    _replaceState.apply(history, arguments);
    sendRouteChange();
  };

  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);

  if (document.readyState === 'complete') {
    sendReady();
  } else {
    window.addEventListener('load', sendReady);
  }
})();