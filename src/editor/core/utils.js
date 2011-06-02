/**
 * @module utils
 */
KISSY.add(function(S, UA, Node) {

    var TRUE = true,
        FALSE = false,
        NULL = null,
        $ = Node.all,
        doc = document,
        /**
         * @const
         */
            HTML5_DTD = '<!doctype html>',
        /**
         * @const
         */
            DTD = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ' +
            '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',

        Utils = {
            /**
             * 执行一系列函数
             * @param var_args {...function()}
             * @return {*} 得到成功的返回
             */
            tryThese : function(var_args) {
                var returnValue;
                for (var i = 0, length = arguments.length; i < length; i++) {
                    var lambda = arguments[i];
                    try {
                        returnValue = lambda();
                        break;
                    }
                    catch (e) {
                    }
                }
                return returnValue;
            },

            /**
             * 是否两个数组完全相同
             * @param arrayA {Array}
             * @param arrayB {Array}
             * @return {boolean}
             */
            arrayCompare: function(arrayA, arrayB) {
                if (!arrayA && !arrayB)
                    return TRUE;

                if (!arrayA || !arrayB || arrayA.length != arrayB.length)
                    return FALSE;

                for (var i = 0; i < arrayA.length; i++) {
                    if (arrayA[ i ] !== arrayB[ i ])
                        return FALSE;
                }

                return TRUE;
            },

            /**
             * @param database {Object}
             */
            clearAllMarkers:function(database) {
                for (var i in database) {
                    database[i]._4e_clearMarkers(database, TRUE);
                }
            },

            /**
             *
             * @param str {string}
             * @return {string}
             */
            ltrim:function(str) {
                return str.replace(/^\s+/, "");
            },

            /**
             *
             * @param str {string}
             * @return {string}
             */
            rtrim:function(str) {
                return str.replace(/\s+$/, "");
            },

            /**
             *
             * @param var_args {...Object}
             * @return {Object}
             */
            mix:function(var_args) {
                var r = {};
                for (var i = 0; i < arguments.length; i++) {
                    var ob = arguments[i];
                    r = S.mix(r, ob);
                }
                return r;
            },

            isCustomDomain : function() {
                if (!UA.ie)
                    return FALSE;

                var domain = doc.domain,
                    hostname = window.location.hostname;

                return domain != hostname &&
                    domain != ( '[' + hostname + ']' );	// IPv6 IP support (#5434)
            },
            /**
             *
             * @param delim {string} 分隔符
             * @param loop {number}
             * @return {string}
             */
            duplicateStr:function(delim, loop) {
                return new Array(loop + 1).join(delim);
            },
            /**
             * Throttles a call to a method based on the time between calls.
             * Based on work by Simon Willison: http://gist.github.com/292562
             * @param fn {function()} The function call to throttle.
             * @param ms {number} The number of milliseconds to throttle the method call. Defaults to 150
             * @return {function()} Returns a wrapped function that calls fn throttled.
             */
            throttle : function(fn, scope, ms) {
                ms = ms || 150;

                if (ms === -1) {
                    return (function() {
                        fn.apply(scope, arguments);
                    });
                }

                var last = (new Date()).getTime();

                return function() {
                    var now = (new Date()).getTime();
                    if (now - last > ms) {
                        last = now;
                        fn.apply(scope, arguments);
                    }
                };
            },
            /**
             *
             * @param fn {function()}
             * @param scope {Object}
             * @param ms {number}
             * @return {function()}
             */
            buffer : function(fn, scope, ms) {
                ms = ms || 0;
                var timer = NULL;
                return (function() {
                    timer && clearTimeout(timer);
                    var args = arguments;
                    timer = setTimeout(function() {
                        return fn.apply(scope, args);
                    }, ms);
                });
            },

            isNumber:function(n) {
                return /^\d+(.\d+)?$/.test(S.trim(n));
            },

            /**
             *
             * @param inputs {Array.<Node>}
             * @param warn {string}
             * @return {boolean} 是否验证成功
             */
            verifyInputs:function(inputs, warn) {
                for (var i = 0; i < inputs.length; i++) {
                    var input = $(inputs[i]),
                        v = S.trim(input.val()),
                        verify = input.attr("data-verify"),
                        warning = input.attr("data-warning");
                    if (verify &&
                        !new RegExp(verify).test(v)) {
                        alert(warning);
                        return FALSE;
                    }
                }
                return TRUE;
            },


            /**
             *
             * @param inp {Node}
             */
            resetInput:function(inp) {
                var placeholder = inp.attr("placeholder");
                if (placeholder && !UA.webkit) {
                    inp.addClass("ke-input-tip");
                    inp.val(placeholder);
                } else if (UA.webkit) {
                    inp.val("");
                }
            },

            valInput:function(inp, val) {
                inp.removeClass("ke-input-tip");
                inp.val(val);
            },

            /**
             *
             * @param inp {Node}
             * @param tip {string}
             */
            placeholder:function(inp, tip) {
                inp.attr("placeholder", tip);
                if (UA.webkit) {
                    return;
                }
                inp.on("blur", function() {
                    if (!S.trim(inp.val())) {
                        inp.addClass("ke-input-tip");
                        inp.val(tip);
                    }
                });
                inp.on("focus", function() {
                    inp.removeClass("ke-input-tip");
                    if (S.trim(inp.val()) == tip) {
                        inp.val("");
                    }
                });
            },

            equalsIgnoreCase:function(str1, str2) {
                return str1.toLowerCase() == str2.toLowerCase();
            },

            /**
             *
             * @param params {Object}
             * @return {Object}
             */
            normParams:function (params) {
                params = S.clone(params);
                for (var p in params) {
                    if (params.hasOwnProperty(p)) {
                        var v = params[p];
                        if (S.isFunction(v)) {
                            params[p] = v();
                        }
                    }
                }
                return params;
            },

            /**
             *
             * @param o {Object} 提交 form 配置
             * @param ps {Object} 动态参数
             * @param url {string} 目的地 url
             */
            doFormUpload : function(o, ps, url) {
                var id = S.guid("form-upload-");
                var frame = doc.createElement('iframe');
                frame.id = id;
                frame.name = id;
                frame['className'] = 'ke-hidden';

                var srcScript = 'document.open();' +
                    // The document domain must be set any time we
                    // call document.open().
                    ( Utils.isCustomDomain() ? ( 'document.domain="' + doc.domain + '";' ) : '' ) +
                    'document.close();';
                if (UA.ie) {
                    frame.src = UA.ie ? 'javascript:void(function(){' + encodeURIComponent(srcScript) + '}())' : '';
                }
                S.log("doFormUpload : " + frame.src);
                doc.body.appendChild(frame);

                if (UA.ie) {
                    doc['frames'][id].name = id;
                }

                var form = $(o.form)[0],
                    buf = {
                        target: form.target,
                        method: form.method,
                        encoding: form.encoding,
                        enctype: form.enctype,
                        action: form.action
                    };
                form.target = id;
                form.method = 'POST';
                form.enctype = form.encoding = 'multipart/form-data';
                if (url) {
                    form.action = url;
                }

                var hiddens, hd;
                if (ps) { // add dynamic params
                    hiddens = [];
                    ps = Utils.normParams(ps);
                    for (var k in ps) {
                        if (ps.hasOwnProperty(k)) {
                            hd = doc.createElement('input');
                            hd.type = 'hidden';
                            hd.name = k;
                            hd.value = ps[k];
                            form.appendChild(hd);
                            hiddens.push(hd);
                        }
                    }
                }

                function cb() {
                    var r = {  // bogus response object
                        responseText : '',
                        responseXML : NULL
                    };

                    r.argument = o ? o.argument : NULL;

                    try { //
                        var doc = frame.contentWindow.document;

                        if (doc && doc.body) {
                            r.responseText = doc.body.innerHTML;
                        }
                        if (doc && doc['XMLDocument']) {
                            r.responseXML = doc['XMLDocument'];
                        } else {
                            r.responseXML = doc;
                        }

                    }
                    catch(e) {
                        // ignore
                        //2010-11-15 由于外边设置了document.domain导致读不到数据抛异常
                        S.log(e);
                    }

                    $(frame).detach('load', cb);
                    o.callback && o.callback(r);

                    setTimeout(function() {
                        $(frame)._4e_remove();
                    }, 100);

                }

                $(frame).on('load', cb);

                form.submit();

                form.target = buf.target;
                form.method = buf.method;
                form.enctype = buf.enctype;
                form.encoding = buf.encoding;
                form.action = buf.action;

                // remove dynamic params
                $(hiddens)._4e_remove();

                return $(frame);
            },

            //直接判断引擎，防止兼容性模式影响
            ieEngine:(function() {
                if (!UA.ie) return;
                return doc['documentMode'] || UA.ie;
            })(),

            /**
             * 点击 el 或者 el 内的元素，不会使得焦点转移
             * @param el
             */
            preventFocus:function(el) {
                if (UA.ie) {
                    //ie 点击按钮不丢失焦点
                    el.unselectable();
                } else {
                    el.attr("onmousedown", "return false;");
                }
            },

            isFlashEmbed:function(element) {
                var attributes = element.attributes;
                return (
                    attributes.type == 'application/x-shockwave-flash'
                        ||
                        /\.swf(?:$|\?)/i.test(attributes.src || '')
                    );
            },

            addRes:function() {
                this.__res = this.__res || [];
                var res = this.__res;
                res.push.apply(res, S.makeArray(arguments));
            },

            destroyRes:function() {
                var res = this.__res || [];
                for (var i = 0; i < res.length; i++) {
                    var r = res[i];
                    if (S.isFunction(r)) {
                        r();
                    } else {
                        if (r.detach)
                            r.detach();
                        if (r.destroy) {
                            r.destroy();
                        }
                        if (r.nodeType && r.remove) {
                            r.remove();
                        }
                    }
                }
                this.__res = [];
            },

            debugUrl:function(url) {
                if (S.startsWidth(url, "./") || S.startsWidth("../")) {
                    url = S.Config.base + "editor/" + url;
                }
                if (!S.Config.debug) {
                    url.replace(/\.(css|js)/i, "-min.$1");
                }
                return url;
            },

            /**
             *
             * @param id {string}
             * @param customStyle {string}
             */
            prepareIFrameHtml: function (id, customStyle, customLinks) {
                var links = "";
                var CSS_FILE = Utils.debugUrl("./theme/editor-iframe.css");
                if (customLinks) {
                    for (var i = 0; i < customLinks.length; i++) {
                        links += '<link ' +
                            'href="' +
                            customLinks[i]
                            + '" rel="stylesheet"/>';
                    }
                }
                return HTML5_DTD
                    + "<html>"
                    + "<head>"
                    + "<title>${title}</title>"
                    + "<link "
                    + "href='"
                    + CSS_FILE
                    + "'" +
                    " rel='stylesheet'/>"
                    + "<style>"
                    + (customStyle || "")
                    + "</style>"
                    + links
                    + "</head>"
                    + "<body class='ke-editor'>"
                    //firefox 必须里面有东西，否则编辑前不能删除!
                    + "&nbsp;"
                    //使用 setData 加强安全性
                    // + (textarea.value || "")
                    + (id ?
                    // The script that launches the bootstrap logic on 'domReady', so the document
                    // is fully editable even before the editing iframe is fully loaded (#4455).
                    //确保iframe确实载入成功,过早的话 document.domain 会出现无法访问
                    '<script id="ke_actscript" type="text/javascript">' +
                        ( Utils.isCustomDomain() ? ( 'document.domain="' + doc.domain + '";' ) : '' ) +
                        'window.parent.KISSY.Editor._initIFrame("' + id + '");' +
                        '</script>' : ''
                    )
                    + "</body>"
                    + "</html>";

            }
        };
    if (1 > 2) {
        var x = {};
        x.arrayCompare()
            .clearAllMarkers()
            .duplicateStr()
            .throttle()
            .buffer()
            .verifyInputs()
            .resetInput()
            .valInput()
            .equalsIgnoreCase()
            .preventFocus()
            .isFlashEmbed()
            .addRes()
            .destroyRes()
            .prepareIFrameHtml();
    }
}, {
        requires:["ua","node","constants"]
    });
