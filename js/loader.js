var Loader = (function() {
    var getBrowser = function() {
        var ua = {};
        var userAgent = window.navigator.userAgent.toLowerCase();

        if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
            ua.browser = RegExp.$1;
            ua.version = RegExp.$2;
        } else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) {
            ua.browser = 'safari';
            ua.version = RegExp.$2;
        } 
        return ua;
    } 

    var UA = getBrowser();

    var LoadedList = {},
        headEl = document.getElementsByTagName('head')[0],

        isFunction = function(f) {
            return f instanceof Function;
        };

    var static__importJS = function(url, callback) {
        var head,
            script,

            wellDone = function() {
                LoadedList[url] = true;
                clear();
                callback();
            },
            clear = function() {
                script.onload = script.onreadystatechange = script.onerror = null;
                head.removeChild(script);
                head = script = null;
            };
 
        if (LoadedList[url]) {
            isFunction(callback) && callback();
            return;
        }

        head = headEl;
        script = document.createElement('script');
        script.type = 'text/javascript';
 
        script.onerror = function() {
            clear();
        }; 
 
        if (isFunction(callback)) {
            if (UA.browser === 'msie' && (UA.version < '9' && UA.version > '5')) { // ie6 ~ 8
                script.onreadystatechange = function() {
                    if (/loaded|complete/.test(script.readyState)) {
                        wellDone();
                    }
                }
            } else {
                script.onload = function() {
                    wellDone();
                }
            }
        }
 
        script.src = url;
        head.appendChild(script);
    };

    var static__importCSS = function(url, callback) {
        var head,
            link,
            img,
            firefox,
            opera,
            chrome,
            poll,

            wellDone = function() {
                LoadedList[url] = true;
                clear();
                callback();
            },
            clear = function() {
                link.onload = link.onerror = null;
                head = null;
            };

        if (LoadedList[url]) {
            isFunction(callback) && callback();
            return;
        }

        head = headEl;
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;

        link.onerror = function() {
           clear();
        };

        if (isFunction(callback)) {
            if (UA.browser === 'msie'
            || (UA.browser === 'firefox' && UA.version > '8.9')
            || UA.browser === 'opera'
            || (UA.browser === 'chrome' && UA.version > '19')
            || (UA.browser === 'safari' && UA.version > '5.9')) {
                link.onload = function() {
                    wellDone();
                };
                head.appendChild(link);
            } else if ((UA.browser === 'chrome' && UA.version > '9')
                || (UA.browser === 'safari' && UA.version > '4.9')
                || UA.browser === 'firefox') {
                head.appendChild(link);
                img = document.createElement('img');
                img.onerror = function() {
                    img.onerror = null;
                    img = null;
                    wellDone();
                };
                img.src = url;
            } else {
                head.appendChild(link);
                var poll = function() {
                    if (link.sheet && link.sheet.cssRules) {
                        wellDone();
                    } else {
                        setTimeout(poll, 300);
                    }
                };
                poll();
            }
        } else {
            head.appendChild(link);
        }
    };

    var static__asyncLoad = function(urls, callback, isOrdered) {
        var isOrder = !(isOrdered === false),
            isAllDone = false,
            now,
            i,
            urls = ('string' === typeof urls) ? [urls] : urls,
            len = (urls instanceof Array) && urls.length,

            load = function(url, done) {
                if (/\.js(?:\?\S+|#\S+)?$/.test(url)) {
                    static__importJS(url, done);
                } else {
                    static__importCSS(url, done);
                }
            },
            orderLoad = function() {
                now = urls.shift();
                if (now) {
                    load(now, orderLoad);
                } else {
                    callback && callback();
                }
            };

        if (!len || len < 1) {
            return;
        }

        if (isOrder) {
            orderLoad();
        } else {
            for (i = 0, now = 0; i < len; i++) {
                load(urls[i], function() {
                    now++;
                    if (now === len) {
                        callback && callback();  
                    }
                });
            }
        }
    };

    return {
        js: static__importJS,
        css: static__importCSS,
        load: static__asyncLoad
    };
}());