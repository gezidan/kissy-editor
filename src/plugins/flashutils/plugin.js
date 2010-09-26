KISSY.Editor.add("flashutils", function() {
    var S = KISSY,KE = S.Editor,flashUtils = KE.Utils.flash;
    if (flashUtils) return;
    var DOM = S.DOM,Node = S.Node,UA = S.UA;
    flashUtils = {
        getUrl: function (r) {
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
                        url = DOM.attr(params[i], "data");
                    }
                }
            } else if (r._4e_name() == "embed") {
                url = r.attr("src");
            }
            return url;
        },
        createSWF:function(movie, cfg, doc) {
            var attrs = cfg.attrs,flashVars = cfg.flashVars,
                attrs_str = "",
                vars_str = "";
            doc = doc || document;

            attrs = attrs || {};
            attrs["wmode"] = "transparent";
            for (var a in attrs) {
                if (attrs.hasOwnProperty(a))
                    attrs_str += a + "='" + attrs[a] + "' ";
            }

            if (flashVars) {
                for (var f in flashVars) {
                    if (flashVars.hasOwnProperty(f))
                        vars_str += "&" + f + "=" + encodeURIComponent(flashVars[f]);
                }
                vars_str = vars_str.substring(1);
            }

            var outerHTML = '<object ' +
                attrs_str +
                ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" >' +
                '<param name="quality" value="high" />' +
                '<param name="movie" value="' + movie + '" />' +
                (vars_str ? '<param name="flashVars" value="' + vars_str + '"/>' : '') +
                /*
                 "<object type='application/x-shockwave-flash'" +
                 " data='" + movie + "'" +
                 " " + attrs_str +
                 ">"
                 +
                 (vars_str ? '<param name="flashVars" value="' + vars_str + '"/>' : '') +
                 */
                '<embed ' +
                attrs_str +
                " " +
                (vars_str ? ( 'FlashVars="' + vars_str + '"') : "") +
                ' pluginspage="http://www.macromedia.com/go/getflashplayer" ' +
                ' quality="high" ' +
                ' src="' + movie + '" ' +
                ' type="application/x-shockwave-flash"/>' +
                // + '</object>' +
                '</object>';
            return {
                el:new Node(outerHTML, null, doc),
                html:outerHTML
            };
        },
        createSWFRuntime2:function(movie, cfg, doc) {
            doc = doc || document;
            var holder = new Node(
                "<div " +
                    "style='" +
                    "width:0;" +
                    "height:0;" +
                    "overflow:hidden;" +
                    "'>", null, doc).appendTo(doc.body)
                , el = flashUtils.createSWF.apply(this, arguments).el.appendTo(holder);
            if (!UA.ie)
                el = el.one("object");
            return el[0];

        },
        createSWFRuntime:function(movie, cfg, doc) {
            var attrs = cfg.attrs,
                flashVars = cfg.flashVars,
                attrs_str = "",
                vars_str = "";
            doc = doc || document;
            attrs = attrs || {};
            attrs.id = attrs.id || S.guid("ke-runtimeflash-");
            for (var a in attrs) {
                if (attrs.hasOwnProperty(a))
                    attrs_str += a + "='" + attrs[a] + "' ";
            }
            if (flashVars) {
                for (var f in flashVars) {
                    if (flashVars.hasOwnProperty(f))
                        vars_str += "&" + f + "=" + encodeURIComponent(flashVars[f]);
                }
                vars_str = vars_str.substring(1);
            }
            if (UA.ie) {
                var outerHTML = '<object ' +
                    attrs_str +
                    ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" >' +
                    '<param name="quality" value="high" />' +
                    '<param name="wmode" value="transparent" /> ' +
                    '<param name="movie" value="' + movie + '" />' +
                    (vars_str ? '<param name="flashVars" value="' + vars_str + '" />' : '') +
                    '</object>';
            }
            else {
                outerHTML = "<object " +
                    "type='application/x-shockwave-flash'" +
                    " data='" + movie + "'" +
                    " " + attrs_str +
                    ">" +
                    '<param name="wmode" value="transparent"/> '
                    +
                    (vars_str ? '<param name="flashVars" value="' + vars_str + '"/>' : '')
                    + '</object>';
            }


            var holder = cfg.holder;
            if (!holder) {
                holder = new Node(
                    "<div " +
                        "style='" + (
                        cfg.style ? cfg.style : (
                            //http://yiminghe.javaeye.com/blog/764872
                            //firefox 必须使创建的flash以及容器可见，才会触发contentReady
                            "width:1px;" +
                                "height:1px;" +
                                "position:absolute;" +
                                //"left:" + DOM.scrollLeft() + "px;" +
                                //"top:" + DOM.scrollTop() + "px;"
                                + "overflow:hidden;"
                            ))
                        +
                        "'>", null, doc
                    ).
                    appendTo(doc.body);
                //不能初始化时设置，防止刷新,scrollLeft 一开始为0，等会,wait is virtue
                setTimeout(function() {
                    holder.offset({left:DOM.scrollLeft(),top:DOM.scrollTop()})
                }, 100);
            }
            holder.html(outerHTML);
            return doc.getElementById(attrs.id);
        }

    };
    KE.Utils.flash = flashUtils;


});