/**
 * definition of editor class for kissy editor
 * @author: <yiminghe@gmail.com>
 */
KISSY.Editor.add("definition", function(KE) {
    var S = KISSY,
        UA = S.UA,
        DOM = S.DOM,
        Node = S.Node,
        Event = S.Event,
        DISPLAY = "display",
        WIDTH = "width",
        HEIGHT = "height",
        NONE = "none",
        //VISIBILITY = "visibility",
        //HIDDEN = "hidden",
        focusManager = KE.focusManager,
        tryThese = KE.Utils.tryThese,
        HTML5_DTD = '<!doctype html>',
        DTD = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ' +
            '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
        ke_textarea_wrap = ".ke-textarea-wrap",
        ke_editor_tools = ".ke-editor-tools",
        ke_editor_status = ".ke-editor-status",
        CSS_FILE = KE.Utils.debugUrl("theme/editor-iframe.css");

    function prepareIFrameHtml(id, customStyle) {
        return HTML5_DTD
            + "<html>"
            + "<head>"
            + "<title>${title}</title>"
            + "<link href='"
            + KE.Config.base
            + CSS_FILE
            + "'" +
            " rel='stylesheet'/>"
            + "<style>"
            + (customStyle || "")
            + "</style>"
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
                ( KE.Utils.isCustomDomain() ? ( 'document.domain="' + document.domain + '";' ) : '' ) +
                'window.parent.KISSY.Editor._initIFrame("' + id + '");' +
                '</script>' : ''
            )
            + "</body>"
            + "</html>";

    }

    var INSTANCE_ID = 1,
        srcScript = 'document.open();' +
            // The document domain must be set any time we
            // call document.open().
            ( KE.Utils.isCustomDomain() ? ( 'document.domain="' + document.domain + '";' ) : '' ) +
            'document.close();',
        editorHtml = "<div " +
            " class='ke-editor-wrap' " +
            " > " +
            "<div class='" + ke_editor_tools.substring(1) + "'></div>" +
            "<div class='" + ke_textarea_wrap.substring(1) + "'><" + "iframe " +
            ' style="' + WIDTH + ':100%;' + HEIGHT + ':100%;border:none;" ' +
            ' ' + WIDTH + '="100%" ' +
            ' ' + HEIGHT + '="100%" ' +
            ' frameborder="0" ' +
            ' title="' + "kissy-editor" + '" ' +
            // With IE, the custom domain has to be taken care at first,
            // for other browsers, the 'src' attribute should be left empty to
            // trigger iframe's 'load' event.
            ' src="' + ( UA.ie ? 'javascript:void(function(){' + encodeURIComponent(srcScript) + '}())' : '' ) + '" ' +
            ' tabIndex="' + ( UA.webkit ? -1 : "$(tabIndex)" ) + '" ' +
            ' allowTransparency="true" ' +
            '></iframe></div>' +
            "<div class='" + ke_editor_status.substring(1) + "'></div>" +
            "</div>";

    //所有link,flash,music的悬浮小提示
    //KE.Tips = {};

    KE.SOURCE_MODE = 0;
    KE.WYSIWYG_MODE = 1;

    S.augment(KE, {
        init:function(textarea) {
            if (UA.ie)DOM.addClass(document.body, "ie" + UA.ie);
            else if (UA.gecko) DOM.addClass(document.body, "gecko");
            else if (UA.webkit) DOM.addClass(document.body, "webkit");
            var self = this,
                editorWrap = new Node(editorHtml.replace(/\$\(tabIndex\)/, textarea.attr("tabIndex")));
            //!!编辑器内焦点不失去,firefox?
            editorWrap.on("mousedown", function(ev) {
                if (UA.webkit) {
                    //chrome select 弹不出来
                    var n = DOM._4e_name(ev.target);
                    if (n == "select" || n == "option")return true;
                }
                ev.halt();
            });

            //由于上面的 mousedown 阻止，这里使得 textarea 上的事件不被阻止，可以被编辑 - firefox
            textarea.on("mousedown", function(ev) {
                ev.stopPropagation();
            });

            self.editorWrap = editorWrap;
            self._UUID = INSTANCE_ID++;
            //实例集中管理
            focusManager.register(self);
            self.wrap = editorWrap.one(ke_textarea_wrap);
            self.iframe = self.wrap.one("iframe");
            self.toolBarDiv = editorWrap.one(ke_editor_tools);
            self.textarea = textarea;
            self.statusDiv = editorWrap.one(ke_editor_status);
            //ie 点击按钮不丢失焦点
            self.toolBarDiv._4e_unselectable();
            //可以直接调用插件功能
            self._commands = {};
            self._dialogs = {};
            var tw = textarea._4e_style(WIDTH),th = textarea._4e_style(HEIGHT);
            if (tw) {
                editorWrap.css(WIDTH, tw);
                textarea.css(WIDTH, "100%");
            }
            self.textarea.css(DISPLAY, NONE);
            editorWrap.insertAfter(textarea);
            self.wrap[0].appendChild(textarea[0]);

            if (th) {
                self.wrap.css(HEIGHT, th);
                textarea.css(HEIGHT, "100%");
            }

            var iframe = self.iframe;

            self.on("dataReady", function() {
                self._ready = true;
                KE.fire("instanceCreated", {editor:self});
            });
            // With FF, it's better to load the data on iframe.load. (#3894,#4058)
            if (UA.gecko) {
                iframe.on('load', self._setUpIFrame, self);
            } else {
                //webkit(chrome) load等不来！
                self._setUpIFrame();
            }
            if (self.cfg.attachForm && textarea[0].form)
                self._attachForm();
        },
        _attachForm:function() {
            var self = this,
                textarea = self.textarea,
                form = new Node(textarea[0].form);
            form.on("submit", self.sync, self);
        },
        useDialog:function(name, callback, cfg) {
            var self = this,
                Overlay = KE.SimpleOverlay,
                cfg = cfg || {};
            Overlay.loading();
            self.use(name, function() {
                var dialog = self.getDialog(name);
                callback(dialog);
                Overlay.unloading();
            });
        },
        addDialog:function(name, obj) {

            this._dialogs[name] = obj;
        },
        getDialog:function(name) {

            return this._dialogs[name];
        },
        addPlugin:function(func) {
            this.ready(func);
        },
        addCommand:function(name, obj) {
            this._commands[name] = obj;
        },
        hasCommand:function(name) {
            return this._commands[name];
        },
        execCommand:function(name) {
            //console.log(name);
            var self = this,
                cmd = self._commands[name],
                args = S.makeArray(arguments);
            args.shift();
            args.unshift(self);
            //if (self._commands[name]) {
            //self.fire("save");
            return cmd.exec.apply(cmd, args);
            //self.fire("save");

            //}
        },
        getMode:function() {
            return this.textarea.css("display") == "none" ?
                KE.WYSIWYG_MODE :
                KE.SOURCE_MODE;
        },
        getData:function(format) {
            var self = this,html;
            if (self.getMode() == KE.WYSIWYG_MODE) {
                html = self.document.body.innerHTML;
                if (self.htmlDataProcessor)
                    html = self.htmlDataProcessor.toHtml(html, "p");
            } else {
                //代码模式下不需过滤
                html = self.textarea.val();
            }
            //如果不需要要格式化，例如提交数据给服务器
            if (!format) {
                html = html || "";
                html = html.replace(/\s+/g, " ");
            }
            return html;
        } ,
        setData:function(data) {
            var self = this,afterData;
            if (self.htmlDataProcessor)
                afterData = self.htmlDataProcessor.toDataFormat(data, "p");
            self.document.body.innerHTML = afterData;
            if (self.getMode() == KE.WYSIWYG_MODE) {
            } else {
                //代码模式下不需过滤
                self.textarea.val(data);
            }
        },

        sync:function() {
            this.textarea.val(this.getData());
        },
        //ie6 其他节点z-index干扰，编辑器z-index必须比baseZIndex大
        baseZIndex:function(v) {
            v = v || 0;
            var zIndex = this.cfg.baseZIndex || 0;
            return v + zIndex;
        },

        //撤销重做时，不需要格式化代码，直接取自身
        _getRawData:function() {
            return this.document.body.innerHTML;
        },

        //撤销重做时，不需要格式化代码，直接取自身
        _setRawData:function(data) {
            this.document.body.innerHTML = data;
        },

        _prepareIFrameHtml:prepareIFrameHtml,

        getSelection:function() {
            var sel = new KE.Selection(this.document);
            return ( !sel || sel.isInvalid ) ? null : sel;
        },

        focus:function() {
            //console.log("manually focus");
            var self = this,
                doc = self.document,
                win = DOM._4e_getWin(doc);
            UA.webkit && win && win.parent && win.parent.focus();
            //win && win.blur();
            //yiminghe note:firefox need this ,暂时使得iframe先失去焦点，触发 blinkCursor 补丁
            //if (UA.gecko)self.blur();
            //yiminghe note:webkit need win.focus
            win && win.focus();
            //ie and firefox need body focus
            doc && doc.body.focus();
            self.notifySelectionChange();
        } ,
        blur:function() {
            /*
             工具栏有焦点，iframe也有焦点？？
             this.toolBarDiv.children().each(function(el) {
             el[0].focus();
             });
             */
            var self = this,
                win = DOM._4e_getWin(self.document);
            win.blur();
            self.document && self.document.body.blur();
            //self.notifySelectionChange();

            //firefox 焦点相关，强制 mousedown 刷新光标
            //this.iframeFocus = false;
        },
        addCustomStyle:function(cssText) {
            var self = this,
                cfg = self.cfg,
                doc = self.document;
            cfg.customStyle = cfg.customStyle || "";
            cfg.customStyle += "\n" + cssText;

            var elem = doc.createElement("style");
            // 先添加到 DOM 树中，再给 cssText 赋值，否则 css hack 会失效
            doc.getElementsByTagName("head")[0].appendChild(elem);
            if (elem.styleSheet) { // IE
                elem.styleSheet.cssText = cssText;
            } else { // W3C
                elem.appendChild(doc.createTextNode(cssText));
            }
        },
        _setUpIFrame:function() {
            var self = this,
                iframe = self.iframe,
                KES = KE.SELECTION,
                textarea = self.textarea[0],
                cfg = self.cfg,
                data = prepareIFrameHtml(self._UUID,
                    cfg.customStyle),
                win = iframe[0].contentWindow,doc;

            try {
                // In IE, with custom document.domain, it may happen that
                // the iframe is not yet available, resulting in "Access
                // Denied" for the following property access.
                //ie 设置domain 有问题：yui也有
                //http://yuilibrary.com/projects/yui2/ticket/2052000
                //http://waelchatila.com/2007/10/31/1193851500000.html
                //http://nagoon97.wordpress.com/tag/designmode/
                doc = win.document;
            } catch(e) {
                // Trick to solve this issue, forcing the iframe to get ready
                // by simply setting its "src" property.
                //noinspection SillyAssignmentJS
                iframe[0].src = iframe[0].src;
                // In IE6 though, the above is not enough, so we must pause the
                // execution for a while, giving it time to think.
                if (UA.ie < 7) {
                    setTimeout(run, 10);
                    return;
                }
            }
            run();
            function run() {
                doc = win.document;
                self.document = doc;
                iframe.detach();
                // Don't leave any history log in IE. (#5657)
                doc.open("text/html", "replace");
                doc.write(data);
                doc.close();
            }
        },

        ready:function(func) {
            var self = this;
            if (self._ready)func();
            else {
                self.on("dataReady", func);
            }
        },
        _monitor:function() {
            var self = this;
            if (self._monitorId) {
                clearTimeout(self._monitorId);
            }
            //console.log("selectionChange");
            self._monitorId = setTimeout(function() {
                var selection = self.getSelection();
                if (selection && !selection.isInvalid) {
                    var startElement = selection.getStartElement(),
                        currentPath = new KE.ElementPath(startElement);
                    if (!self.previousPath || !self.previousPath.compare(currentPath)) {
                        self.previousPath = currentPath;
                        //console.log("selectionChange");
                        self.fire("selectionChange", { selection : selection, path : currentPath, element : startElement });
                    }
                }
            }, 100);
        }
        ,
        /**
         * 强制通知插件更新状态，防止插件修改编辑器内容，自己反而得不到通知
         */
        notifySelectionChange:function() {
            var self = this;
            self.previousPath = null;
            self._monitor();
        },

        insertElement:function(element, init) {
            var self = this;
            self.focus();

            var elementName = element._4e_name(),
                xhtml_dtd = KE.XHTML_DTD,
                KER = KE.RANGE,
                KEN = KE.NODE,
                isBlock = xhtml_dtd.$block[ elementName ],
                selection = self.getSelection(),
                ranges = selection.getRanges(),
                range,
                clone,
                lastElement,
                current, dtd;

            self.fire("save");
            for (var i = ranges.length - 1; i >= 0; i--) {
                range = ranges[ i ];
                // Remove the original contents.
                range.deleteContents();
                clone = !i && element || element._4e_clone(true);
                init && init(clone);
                // If we're inserting a block at dtd-violated position, split
                // the parent blocks until we reach blockLimit.
                if (isBlock) {
                    while (( current = range.getCommonAncestor(false, true) )
                        && ( dtd = xhtml_dtd[ current._4e_name() ] )
                        && !( dtd && dtd [ elementName ] )) {
                        // Split up inline elements.
                        if (current._4e_name() in xhtml_dtd.span)
                            range.splitElement(current);
                        // If we're in an empty block which indicate a new paragraph,
                        // simply replace it with the inserting block.(#3664)
                        else if (range.checkStartOfBlock()
                            && range.checkEndOfBlock()) {
                            range.setStartBefore(current);
                            range.collapse(true);
                            current._4e_remove();
                        }
                        else
                            range.splitBlock();
                    }
                }

                // Insert the new node.
                range.insertNode(clone);
                // Save the last element reference so we can make the
                // selection later.
                if (!lastElement)
                    lastElement = clone;
            }

            var next = lastElement._4e_nextSourceNode(true),p,
                doc = self.document;
            dtd = KE.XHTML_DTD;

            //行内元素不用加换行
            if (!dtd.$inline[clone._4e_name()]) {
                //末尾时 ie 不会自动产生br，手动产生
                if (!next) {
                    p = new Node("<p>&nbsp;</p>", null, doc);
                    p.insertAfter(lastElement);
                    next = p;
                }
                //firefox,replace br with p，和编辑器整体换行保持一致
                else if (next._4e_name() == "br"
                    &&
                    //必须符合嵌套规则
                    dtd[next.parent()._4e_name()]["p"]
                    ) {
                    p = new Node("<p>&nbsp;</p>", null, doc);
                    next[0].parentNode.replaceChild(p[0], next[0]);
                    next = p;
                }
            } else {
                //qc #3803 ，插入行内后给个位置放置光标
                next = new Node(doc.createTextNode(" "));
                next.insertAfter(lastElement);
            }
            range.moveToPosition(lastElement, KER.POSITION_AFTER_END);
            if (next && next[0].nodeType == KEN.NODE_ELEMENT)
                range.moveToElementEditablePosition(next);

            selection.selectRanges([ range ]);
            self.focus();
            //http://code.google.com/p/kissy/issues/detail?can=1&start=100&id=121
            clone && clone._4e_scrollIntoView();
            setTimeout(function() {
                self.fire("save");
            }, 10);
            return clone;
        },

        insertHtml:function(data) {
            var self = this;
            if (self.htmlDataProcessor)
                data = self.htmlDataProcessor.toDataFormat(data);//, "p");
            /**
             * webkit insert html 有问题！会把标签去掉，算了直接用insertElement
             */
            if (UA.webkit) {
                var nodes = DOM.create(data, null, this.document);
                if (nodes.nodeType == 11) nodes = S.makeArray(nodes.childNodes);
                else nodes = [nodes];
                for (var i = 0; i < nodes.length; i++)
                    self.insertElement(new Node(nodes[i]));
                return;
            }

            self.focus();
            self.fire("save");
            var selection = self.getSelection();
            if (UA.ie) {
                var $sel = selection.getNative();
                if ($sel.type == 'Control')
                    $sel.clear();
                $sel.createRange().pasteHTML(data);
            } else {
                self.document.execCommand('inserthtml', false, data);
            }

            self.focus();
            setTimeout(function() {
                self.fire("save");
            }, 10);
        }
    });
    /**
     * 初始化iframe内容以及浏览器间兼容性处理，
     * 必须等待iframe内的脚本向父窗口通知
     */
    KE._initIFrame = function(id) {

        var self = focusManager.getInstance(id),
            iframe = self.iframe,
            textarea = self.textarea[0],
            win = iframe[0].contentWindow,
            doc = self.document,
            cfg = self.cfg,
            // Remove bootstrap script from the DOM.
            script = doc.getElementById("ke_actscript");
        DOM._4e_remove(script);

        var body = doc.body;

        /**
         * from kissy editor 1.0
         *
         * // 注1：在 tinymce 里，designMode = "on" 放在 try catch 里。
         //     原因是在 firefox 下，当iframe 在 display: none 的容器里，会导致错误。
         //     但经过我测试，firefox 3+ 以上已无此现象。
         // 注2： ie 用 contentEditable = true.
         //     原因是在 ie 下，IE needs to use contentEditable or
         // it will display non secure items for HTTPS
         // Ref:
         //   - Differences between designMode and contentEditable
         //     http://74.125.153.132/search?q=cache:5LveNs1yHyMJ:nagoon97.wordpress.com/2008/04/20/differences-between-designmode-and-contenteditable/+ie+contentEditable+designMode+different&cd=6&hl=en&ct=clnk
         */

        //这里对主流浏览器全部使用 contenteditable
        //那么不同于 kissy editor 1.0
        //在body范围外右键，不会出现 复制，粘贴等菜单
        //因为这时右键作用在document而不是body
        //1.0 document.designMode='on' 是编辑模式
        //2.0 body.contentEditable=true body外不是编辑模式
        if (UA.ie) {
            // Don't display the focus border.
            body.hideFocus = true;

            // Disable and re-enable the body to avoid IE from
            // taking the editing focus at startup. (#141 / #523)
            body.disabled = true;
            body.contentEditable = true;
            body.removeAttribute('disabled');
        } else {
            // Avoid opening design mode in a frame window thread,
            // which will cause host page scrolling.(#4397)
            setTimeout(function() {
                // Prefer 'contentEditable' instead of 'designMode'. (#3593)
                if (UA.gecko || UA.opera) {
                    body.contentEditable = true;
                }
                else if (UA.webkit)
                    body.parentNode.contentEditable = true;
                else
                    doc.designMode = 'on';
            }, 0);
        }

        // Gecko need a key event to 'wake up' the editing
        // ability when document is empty.(#3864)
        //activateEditing 删掉，初始引起屏幕滚动了


        // Webkit: avoid from editing form control elements content.
        if (UA.webkit) {
            Event.on(doc, "click", function(ev) {
                var control = new Node(ev.target);
                if (S.inArray(control._4e_name(), ['input', 'select'])) {
                    ev.preventDefault();
                }
            });
            // Prevent from editig textfield/textarea value.
            Event.on(doc, "mouseup", function(ev) {
                var control = new Node(ev.target);
                if (S.inArray(control._4e_name(), ['input', 'textarea'])) {
                    ev.preventDefault();
                }
            });
        }

        function blinkCursor(retry) {
            tryThese(
                function() {
                    doc.designMode = 'on';
                    //异步引起时序问题，尽可能小间隔
                    setTimeout(function () {
                        doc.designMode = 'off';
                        //console.log("path1");
                        body.focus();
                        // Try it again once..
                        if (!arguments.callee.retry) {
                            arguments.callee.retry = true;
                            //arguments.callee();
                        }
                    }, 50);
                },
                function() {
                    // The above call is known to fail when parent DOM
                    // tree layout changes may break design mode. (#5782)
                    // Refresh the 'contentEditable' is a cue to this.
                    doc.designMode = 'off';

                    DOM.attr(body, 'contentEditable', false);
                    DOM.attr(body, 'contentEditable', true);
                    // Try it again once..
                    !retry && blinkCursor(1);
                    //console.log("path2");
                });
        }

        // Create an invisible element to grab focus.
        if (UA.gecko || UA.ie || UA.opera) {
            var focusGrabber;
            focusGrabber = new Node(DOM.insertAfter(new Node(
                // Use 'span' instead of anything else to fly under the screen-reader radar. (#5049)
                '<span ' +
                    'tabindex="-1" ' +
                    'style="position:absolute; left:-10000"' +
                    ' role="presentation"' +
                    '></span>')[0], textarea));
            focusGrabber.on('focus', function() {
                self.focus();
            });
            self.activateGecko = function() {
                if (UA.gecko && self.iframeFocus)
                    focusGrabber[0].focus();
            };
            self.on('destroy', function() {
            });
        }

        // IE standard compliant in editing frame doesn't focus the editor when
        // clicking outside actual content, manually apply the focus. (#1659)
        if (UA.ie
            && doc.compatMode == 'CSS1Compat'
            || UA.gecko
            || UA.opera) {
            var htmlElement = new Node(doc.documentElement);
            htmlElement.on('mousedown', function(evt) {
                // Setting focus directly on editor doesn't work, we
                // have to use here a temporary element to 'redirect'
                // the focus.
                //firefox 不能直接设置，需要先失去焦点
                //return;
                //左键激活
                if (evt.target == htmlElement[0]) {
                    //S.log("click");
                    //self.focus();
                    //return;
                    if (UA.gecko)
                        blinkCursor(false);
                    //setTimeout(function() {
                    //这种：html mousedown -> body beforedeactivate
                    //    self.focus();
                    //}, 30);

                    //这种：body beforedeactivate -> html mousedown
                    focusGrabber[0].focus();
                }
            });
        }


        Event.on(win, 'focus', function() {
            //console.log(" i am  focus inner");
            /**
             * yiminghe特别注意：firefox光标丢失bug
             * blink后光标出现在最后，这就需要实现保存range
             * focus后再恢复range
             */
            if (UA.gecko)
                blinkCursor(false);
            else if (UA.opera)
                body.focus();

            // focus 后强制刷新自己状态
            self.notifySelectionChange();
        });


        if (UA.gecko) {
            /**
             * firefox 焦点丢失后，再点编辑器区域焦点会移不过来，要点两下
             */
            Event.on(self.document, "mousedown", function() {
                if (!self.iframeFocus) {
                    //console.log("i am fixed");
                    blinkCursor(false);
                }
            });
        }

        if (UA.ie) {
            //DOM.addClass(doc.documentElement, doc.compatMode);
            // Override keystrokes which should have deletion behavior
            //  on control types in IE . (#4047)
            /**
             * 选择img，出现缩放框后不能直接删除
             */
            Event.on(doc, 'keydown', function(evt) {
                var keyCode = evt.keyCode;
                // Backspace OR Delete.
                if (keyCode in { 8 : 1, 46 : 1 }) {
                    //debugger
                    var sel = self.getSelection(),
                        control = sel.getSelectedElement();
                    if (control) {
                        // Make undo snapshot.
                        self.fire('save');
                        // Delete any element that 'hasLayout' (e.g. hr,table) in IE8 will
                        // break up the selection, safely manage it here. (#4795)
                        var bookmark = sel.getRanges()[ 0 ].createBookmark();
                        // Remove the control manually.
                        control._4e_remove();
                        sel.selectBookmarks([ bookmark ]);
                        self.fire('save');
                        evt.preventDefault();
                    }
                }
            });

            // PageUp/PageDown scrolling is broken in document
            // with standard doctype, manually fix it. (#4736)
            //ie8 主窗口滚动？？
            if (doc.compatMode == 'CSS1Compat') {
                var pageUpDownKeys = { 33 : 1, 34 : 1 };
                Event.on(doc, 'keydown', function(evt) {
                    if (evt.keyCode in pageUpDownKeys) {
                        setTimeout(function () {
                            self.getSelection().scrollIntoView();
                        }, 0);
                    }
                });
            }
        }

        // Adds the document body as a context menu target.

        setTimeout(function() {
            /*
             * IE BUG: IE might have rendered the iframe with invisible contents.
             * (#3623). Push some inconsequential CSS style changes to force IE to
             * refresh it.
             *
             * Also, for some unknown reasons, short timeouts (e.g. 100ms) do not
             * fix the problem. :(
             */
            if (UA.ie) {
                setTimeout(function() {
                    if (doc) {
                        body.runtimeStyle.marginBottom = '0px';
                        body.runtimeStyle.marginBottom = '';
                    }
                }, 1000);
            }
        }, 0);


        setTimeout(function() {
            self.fire("dataReady");
            /*
             some break for firefox ，不能立即设置
             */
            var disableObjectResizing = cfg.disableObjectResizing,
                disableInlineTableEditing = cfg.disableInlineTableEditing;
            if (disableObjectResizing || disableInlineTableEditing) {
                // IE, Opera and Safari may not support it and throw errors.
                try {
                    doc.execCommand('enableObjectResizing', false, !disableObjectResizing);
                    doc.execCommand('enableInlineTableEditing', false, !disableInlineTableEditing);
                }
                catch(e) {
                    //只能ie能用？，目前只有firefox,ie支持图片缩放
                    // For browsers which don't support the above methods,
                    // we can use the the resize event or resizestart for IE (#4208)
                    Event.on(body, UA.ie ? 'resizestart' : 'resize', function(evt) {
                        if (
                            disableObjectResizing ||
                                (
                                    DOM._4e_name(evt.target) === 'table'
                                        &&
                                        disableInlineTableEditing )
                            )
                            evt.preventDefault();
                    });
                }
            }
        }, 10);


        // Gecko/Webkit need some help when selecting control type elements. (#3448)
        //if (!( UA.ie || UA.opera)) {
        if (UA.webkit) {
            Event.on(doc, "mousedown", function(ev) {
                var control = new Node(ev.target);
                if (S.inArray(control._4e_name(), ['img', 'hr', 'input', 'textarea', 'select'])) {
                    self.getSelection().selectElement(control);
                }
            });
        }


        if (UA.gecko) {
            Event.on(doc, "dragstart", function(ev) {
                var control = new Node(ev.target);
                if (control._4e_name() === 'img' &&
                    /ke_/.test(control[0].className)
                    ) {
                    //firefox禁止拖放
                    ev.preventDefault();
                }
            });
        }

        //注意：必须放在这个位置，等iframe加载好再开始运行
        //加入焦点管理，和其他实例联系起来
        focusManager.add(self);
    };

    /**
     * 获得全局最大值
     */
    KE.baseZIndex = function(z) {
        var r = z,instances = KE.getInstances();
        for (var i in instances) {
            if (!instances.hasOwnProperty(i)) return;
            var instance = instances[i];
            r = Math.max(r, instance.baseZIndex(z));
        }
        return r;
    };
    // Fixing Firefox 'Back-Forward Cache' break design mode. (#4514)
    //不知道为什么
    /*
     if (UA.gecko) {
     ( function () {
     var body = document.body;
     if (!body)
     window.addEventListener('load', arguments.callee, false);
     else {
     var currentHandler = body.getAttribute('onpageshow');
     body.setAttribute('onpageshow', ( currentHandler ? currentHandler + ';' : '') +
     'event.persisted && KISSY.Editor.focusManager.refreshAll();');
     }
     } )();
     }
     */
});