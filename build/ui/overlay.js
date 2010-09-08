/**
 * simple overlay for kissy editor using lazyRun
 * @author yiminghe@gmail.com
 * @refer http://yiminghe.javaeye.com/blog/734867
 */
KISSY.Editor.add("overlay", function() {
    // 每次实例都要载入!
    //console.log("overlay loaded!");
    var KE = KISSY.Editor,
        S = KISSY,
        UA = S.UA,
        focusManager = KE.focusManager,
        Node = S.Node,
        Event = S.Event,
        DOM = S.DOM,
        mask ,
        mask_iframe,
        d_iframe;
    //全局的不要重�?
    if (KE.SimpleOverlay) return;

    function Overlay() {
        var self = this;
        Overlay.superclass.constructor.apply(self, arguments);
        self._init();
        if (S.UA.ie === 6) {
            //将要显示前就更新状�?,不能改为show，防止连续出现，没有change?，不触发
            self.on("show", function(ev) {
                var el = self.get("el"),
                    bw = el.width(),
                    bh = el.height();
                d_iframe.css({
                    width: bw + "px",
                    height: bh + "px"
                });
                d_iframe.offset(el.offset());
            });
            self.on("hide", function() {
                d_iframe.offset({
                    left:-999,
                    top:-999
                });
            });
        }

        if (self.get("mask")) {
            self.on("show", function() {
                mask && mask.css({"left":"0px","top":"0px"});
                mask_iframe && mask_iframe.css({"left":"0px","top":"0px"});
            });
            self.on("hide", function() {
                mask && mask.css({"left":"-9999px",top:"-9999px"});
                mask_iframe && mask_iframe.css({"left":"-9999px",top:"-9999px"});
            });
        }
    }


    Overlay.init = function() {

        var body = document.body;

        mask = new Node("<div class=\"ke-mask\">&nbsp;</div>");
        mask.css({"left":"-9999px",top:"-9999px"});
        mask.css({
            "width": "100%",
            "height": DOM.docHeight() + "px",
            "opacity": 0.4
        });
        mask.appendTo(body);

        if (UA.ie && UA.ie == 6) {
            d_iframe = new Node("<" + "iframe class='ke-dialog-iframe'" +
                "></iframe>");
            d_iframe.appendTo(body);
            mask_iframe = new Node("<" + "iframe class='ke-mask'" +
                "></iframe>");
            mask_iframe.css({"left":"-9999px",top:"-9999px"});
            mask_iframe.css({
                "width": "100%",
                "height": DOM.docHeight() + "px",
                "opacity": 0.4
            });
            mask_iframe.appendTo(body);
        }
        Overlay.init = null;
    };


    Overlay.ATTRS = {
        title:{value:""},
        width:{value:"450px"},
        visible:{value:false},
        //帮你管理焦点
        focusMgr:{value:true},
        mask:{value:false}
    };

    S.extend(Overlay, S.Base, {
        _init:function() {
            var self = this;
            self._initEl();
            var el = self.get("el");
            self.on("afterVisibleChange", function(ev) {
                var v = ev.newVal;
                if (v) {
                    if (typeof v == "boolean") {
                        self.center();
                    } else el.offset(v);
                    self.fire("show");
                } else {
                    el.css({"left":"-9999px",top:"-9999px"});
                    self.fire("hide");
                }
            });
            if (self.get("focusMgr")) {
                self._initFocusNotice();
                self.on("beforeVisibleChange", self._editorFocusMg, self);
            }
            //初始状�?隐藏
            el.css({"left":"-9999px",top:"-9999px"});

            self.on("afterVisibleChange", function(ev) {
                var v = ev.newVal;
                if (v) {
                    self._register();
                } else {
                    self._unregister();
                }
            });

        },
        _register:function() {
            var self = this;
            Event.on(document, "keydown", self._keydown, self);
            //mask click support
            mask.on("click", self.hide, self);
        },
        //esc keydown support
        _keydown:function(ev) {
            //esc
            if (ev.keyCode == 27) {
                this.hide();
                //停止默认行为，例如取消对象�?�?
                ev.halt();
            }
        },
        _unregister:function() {
            var self = this;
            Event.remove(document, "keydown", self._keydown, self);
            mask.detach("click", self.hide, self);
        },
        _initEl:function() {
            //just manage container
            var self = this,el = self.get("el");
            if (el) {
                self.el = el;
            } else {
                //also gen html
                el = new Node("<div class='ke-dialog' style='width:" +
                    self.get("width") +
                    "'><div class='ke-hd'>" +
                    "<span class='ke-hd-title'>" +
                    self.get("title") +
                    "</span>"
                    + "<span class='ke-hd-x'><a class='ke-close' href='#'>X</a></span>"
                    + "</div>" +
                    "<div class='ke-bd'></div>" +
                    "<div class='ke-ft'>" +
                    "</div>" +
                    "</div>");
                document.body.appendChild(el[0]);
                self.set("el", el);
                self.el = el;
                self.body = el.one(".ke-bd");
                self.foot = el.one(".ke-ft");
                self._close = el.one(".ke-close");
                self._title = el.one(".ke-hd-title").one("h1");
                self._close.on("click", function(ev) {
                    ev.preventDefault();
                    self.hide();
                });
            }
        },

        center:function() {

            var el = this.get("el"),
                bw = parseInt(el.css("width")),
                bh = el[0].offsetHeight,
                vw = DOM.viewportWidth(),
                vh = DOM.viewportHeight(),
                bl = (vw - bw) / 2 + DOM.scrollLeft(),
                bt = (vh - bh) / 2 + DOM.scrollTop();
            if ((bt - DOM.scrollTop()) > 200) bt -= 150;
            el.css({
                left: bl + "px",
                top: bt + "px"
            });
        },
        _prepareShow:function() {
            Overlay.init();
        },
        _getFocusEl:function() {
            var self = this;
            if (self._focusEl) {
                return self._focusEl;
            }
            //焦点管理，显示时用a获得焦点
            self._focusEl = new Node("<a href='#' class='ke-focus' " +
                "style='" +
                "width:0;" +
                "height:0;" +
                "margin:0;" +
                "padding:0;" +
                "overflow:hidden;" +
                "outline:none;" +
                "font-size:0;'" +
                "></a>");
            self._focusEl.appendTo(self.el);
            return self._focusEl;
        },
        _initFocusNotice:function() {
            var self = this,f = self._getFocusEl();
            f.on("focus", function() {
                self.fire("focus");
            });
            f.on("blur", function() {
                self.fire("blur");
            });
        },
        /**
         * 焦点管理，弹出前记住当前的焦点所在editor
         * 隐藏好重新focus当前的editor
         */
        _editorFocusMg:function(ev) {
            var self = this,editor = self._focusEditor, v = ev.newVal;
            //将要出现
            if (v) {

                //保存当前焦点editor
                self._focusEditor = focusManager.currentInstance();
                editor = self._focusEditor;
                /*
                 //ie 6,7 在窗口a focus后会丢掉已�?择，再�?�?
                 if (UA.ie && UA.ie < 8 && editor) {
                 var sel = editor.getSelection(),range = sel.getRanges()[0];
                 if (!range.collapsed && sel.getType() != KE.Selection.SELECTION_ELEMENT) {
                 setTimeout(function() {
                 range.select();
                 }, 50);
                 }
                 }*/

                //console.log("give up focus : " + editor);
                //聚焦到当前窗�?
                self._getFocusEl()[0].focus();
                var input = self.el.one("input");
                if (input) {
                    setTimeout(function() {
                        //ie 不可聚焦会错�?disabled ?
                        try {
                            input[0].focus();
                            input[0].select();
                        } catch(e) {
                        }
                        //必须延迟！�?中第�?��input
                    }, 0);
                } else {
                    /*
                     * IE BUG: If the initial focus went into a non-text element (e.g. button),
                     * then IE would still leave the caret inside the editing area.
                     */
                    if (UA.ie && editor) {
                        var $selection = editor.document.selection,
                            $range = $selection.createRange();
                        if ($range) {
                            if (
                            //修改ckeditor，如果单纯�?择文字就不用管了
                            //$range.parentElement && $range.parentElement().ownerDocument == editor.document
                            //||
                            //缩放图片那个框在ie下会突出浮动层来
                                $range.item && $range.item(0).ownerDocument == editor.document) {
                                var $myRange = document.body.createTextRange();
                                $myRange.moveToElementText(self.el._4e_first()[0]);
                                $myRange.collapse(true);
                                $myRange.select();
                            }
                        }
                    }
                }

            }
            //将要隐藏
            else {
                editor && editor.focus();
            }
        },
        _realShow : function(v) {
            var el = this.get("el");

            this.set("visible", v || true);
        } ,
        show:function(v) {
            this._prepareShow(v);
        }  ,
        hide:function() {
            var el = this.get("el");
            this.set("visible", false);
        }});
    KE.Utils.lazyRun(Overlay.prototype, "_prepareShow", "_realShow");

    KE.SimpleOverlay = Overlay;
});
