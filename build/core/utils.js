/**
 * modified from ckeditor,common utils for kissy editor
 * @modifier: <yiminghe@gmail.com>
 */
KISSY.Editor.add("utils", function(KE) {

    var S = KISSY,Node = S.Node,DOM = S.DOM,debug = S.Config.debug,UA = S.UA;
    KE.Utils = {
        getFlashUrl: function (r) {
            var url = "",KEN = KE.NODE;
            if (r._4e_name() == "object") {
                var params = r[0].childNodes;
                for (var i = 0; i < params.length; i++) {
                    if (params[i].nodeType != KEN.NODE_ELEMENT)continue;
                    if ((DOM.attr(params[i], "name") || "").toLowerCase() == "movie") {
                        url = DOM.attr(params[i], "value");
                    } else if (DOM._4e_name(params[i]) == "embed") {
                        url = DOM.attr(params[i], "src");
                    } else if (DOM._4e_name(params[i]) == "object") {
                        url == DOM.attr(params[i], "data");
                    }
                }
            } else if (r._4e_name() == "embed") {
                url = r.attr("src");
            }
            return url;
        },
        debugUrl:function (url) {
            if (!debug) return "build/" + url.replace(/\.(js|css)/i, "-min.$1");
            if (debug === "dev") {
                return url;
            }
            return "build/" + url;
        }
        ,
        /**
         * 懒惰一下
         * @param obj
         * @param before
         * @param after
         */
        lazyRun:function(obj, before, after) {
            var b = obj[before],a = obj[after];
            obj[before] = function() {
                b.apply(this, arguments);
                obj[before] = obj[after];
                return a.apply(this, arguments);
            };
        }
        ,


        getXY:function(x, y, srcDoc, destDoc) {
            var currentWindow = srcDoc.defaultView || srcDoc.parentWindow;

            //x,y相对于当前iframe文档,防止当前iframe有滚动条
            x -= DOM.scrollLeft(currentWindow);
            y -= DOM.scrollTop(currentWindow);
            if (destDoc) {
                var refWindow = destDoc.defaultView || destDoc.parentWindow;
                if (currentWindow != refWindow && currentWindow.frameElement) {
                    //note:when iframe is static ,still some mistake
                    var iframePosition = DOM._4e_getOffset(currentWindow.frameElement, destDoc);
                    x += iframePosition.left;
                    y += iframePosition.top;
                }
            }
            return {left:x,top:y};
        }
        ,

        tryThese : function() {

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
        }
        ,
        arrayCompare: function(arrayA, arrayB) {
            if (!arrayA && !arrayB)
                return true;

            if (!arrayA || !arrayB || arrayA.length != arrayB.length)
                return false;

            for (var i = 0; i < arrayA.length; i++) {
                if (arrayA[ i ] !== arrayB[ i ])
                    return false;
            }

            return true;
        }
        ,
        getByAddress : function(doc, address, normalized) {
            var $ = doc.documentElement;

            for (var i = 0; $ && i < address.length; i++) {
                var target = address[ i ];

                if (!normalized) {
                    $ = $.childNodes[ target ];
                    continue;
                }

                var currentIndex = -1;

                for (var j = 0; j < $.childNodes.length; j++) {
                    var candidate = $.childNodes[ j ];

                    if (normalized === true &&
                        candidate.nodeType == 3 &&
                        candidate.previousSibling &&
                        candidate.previousSibling.nodeType == 3) {
                        continue;
                    }

                    currentIndex++;

                    if (currentIndex == target) {
                        $ = candidate;
                        break;
                    }
                }
            }

            return $ ? new Node($) : null;
        }
        ,

        clearAllMarkers:function(database) {
            for (var i in database)
                database[i]._4e_clearMarkers(database, true);
        }
        ,
        htmlEncodeAttr : function(text) {
            return text.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/, '&gt;');
        }
        ,
        ltrim:function(str) {
            return str.replace(/^\s+/, "");
        }
        ,

        rtrim:function(str) {
            return str.replace(/\s+$/, "");
        }
        ,
        trim:function(str) {
            return this.ltrim(this.rtrim(str));
        }
        ,
        mix:function() {
            var r = {};
            for (var i = 0; i < arguments.length; i++) {
                var ob = arguments[i];
                r = S.mix(r, ob);
            }
            return r;
        }
        ,
        isCustomDomain : function() {
            if (!UA.ie)
                return false;

            var domain = document.domain,
                hostname = window.location.hostname;

            return domain != hostname &&
                domain != ( '[' + hostname + ']' );	// IPv6 IP support (#5434)
        },

        addSeparator:function(bar) {
            new S.Node('<span class="ke-toolbar-separator">&nbsp;</span>').appendTo(bar);
        },
        duplicateStr:function(str, loop) {
            return new Array(loop + 1).join(str);
        }
    };
});
