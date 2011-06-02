/**
 * @module dom
 */
KISSY.add(function(S, UA, Node, Constants, Utils, XHTML_DTD) {

    var TRUE = true,
        FALSE = false,
        NULL = null,
        doc = document,
        REMOVE_EMPTY = {
            "abbr":1,
            "acronym":1,
            "address":1,
            "b":1,
            "bdo":1,
            "big":1,
            "cite":1,
            "code":1,
            "del":1,
            "dfn":1,
            "em":1,
            "font":1,
            "i":1,
            "ins":1,
            "label":1,
            "kbd":1,
            "q":1,
            "s":1,
            "samp":1,
            "small":1,
            "span":1,
            "strike":1,
            "strong":1,
            "sub":1,
            "sup":1,
            "tt":1,
            "u":1,
            'var':1
        },
        $ = Node.all,
        KEN = Constants.NODE,
        KEP = Constants.POSITION;

    /*
     * Anything whose display computed style is block, list-item, table,
     * table-row-group, table-header-group, table-footer-group, table-row,
     * table-column-group, table-column, table-cell, table-caption, or whose node
     * name is hr, br (when enterMode is br only) is a block boundary.
     */
    var blockBoundaryDisplayMatch = {
        "block": 1,
        'list-item' : 1,
        "table": 1,
        'table-row-group' : 1,
        'table-header-group' : 1,
        'table-footer-group' : 1,
        'table-row' : 1,
        'table-column-group' : 1,
        'table-column' : 1,
        'table-cell' : 1,
        'table-caption' : 1
    },
        blockBoundaryNodeNameMatch = { "hr": 1 };

    /**
     * for dev
     */
    function checkNode(n) {
        if (!n.getDOMNode) {
            S.error("argument is not KISSY Node!");
        }
    }

    S.mix(Node.prototype, {
            /**
             *
             * @param customNodeNames {Object}
             */
            _4e_isBlockBoundary:function(customNodeNames) {
                var el = this;
                var nodeNameMatches = S.mix(S.mix({}, blockBoundaryNodeNameMatch), customNodeNames || {});
                return blockBoundaryDisplayMatch[ el.css('display') ] ||
                    nodeNameMatches[ el._4e_name() ];
            },


            _4e_getWin:function() {
                var elem = this[0];
                return (elem && ('scrollTo' in elem) && elem["document"]) ?
                    elem :
                    elem && elem.nodeType === 9 ?
                        elem.defaultView || elem.parentWindow :
                        FALSE;
            },

            _4e_index:function() {
                var el = this[0];
                var siblings = el.parentNode.childNodes;
                for (var i = 0; i < siblings.length; i++) {
                    if (siblings[i] === el) return i;
                }
                return -1;
            },
            /**
             *
             * @param evaluator {function(KISSY.Node)}
             */
            _4e_first:function(evaluator) {
                var el = this[0],
                    first = el.firstChild,
                    retval = first && $(first);
                if (retval && evaluator && !evaluator(retval))
                    retval = retval._4e_next(evaluator);

                return retval;
            },
            /**
             *
             * @param target {(Node)}
             * @param toStart {boolean}
             */
            _4e_move : function(target, toStart) {
                if (toStart) {
                    this.prependTo(target);
                } else {
                    this.appendTo(target);
                }
                return this;
            },

            _4e_name:function() {
                var thisElement = this[0],
                    nodeName = thisElement.nodeName.toLowerCase();
                //note by yiminghe:http://msdn.microsoft.com/en-us/library/ms534388(VS.85).aspx
                if (UA.ie) {
                    var scopeName = thisElement['scopeName'];
                    if (scopeName && scopeName != 'HTML') {
                        nodeName = scopeName.toLowerCase() + ':' + nodeName;
                    }
                }
                return nodeName;
            },
            /**
             * @param otherElements {(Node)}
             */
            _4e_isIdentical : function(otherElements) {
                checkNode(otherElements);
                if (this.length != otherElements.length) {
                    return FALSE;
                }

                for (var k = 0; k < otherElements.length; k++) {
                    var thisElement = this.item(k),otherElement = otherElements.item(k);

                    if (thisElement._4e_name() != otherElement._4e_name()) {
                        return FALSE;
                    }

                    var thisAttributes = thisElement[0].attributes,
                        otherAttributes = otherElement[0].attributes,
                        thisLength = thisAttributes.length,
                        otherLength = otherAttributes.length;

                    if (thisLength != otherLength)
                        return FALSE;

                    for (var i = 0; i < thisLength; i++) {
                        var attribute = thisAttributes[i],
                            name = attribute.name;
                        if (attribute.specified
                            && thisElement.attr(name) != otherElement.attr(name))
                            return FALSE;
                    }

                    // For IE, we have to for both elements, because it's difficult to
                    // know how the atttibutes collection is organized in its DOM.
                    // ie 使用版本 < 8
                    if (Utils.ieEngine < 8) {
                        for (i = 0; i < otherLength; i++) {
                            attribute = otherAttributes[ i ];
                            name = attribute.name;
                            if (attribute.specified
                                && thisElement.attr(name) != otherElement.attr(name))
                                return FALSE;
                        }
                    }
                }
                return TRUE;
            },

            _4e_isEmptyInlineRemoveable : function() {
                var thisElements = this;
                for (var k = 0; k < thisElements.length; k++) {
                    var thisElement = thisElements[k],
                        children = thisElement.childNodes;
                    for (var i = 0, count = children.length; i < count; i++) {
                        var child = children[i],
                            nodeType = child.nodeType;

                        if (nodeType == KEN.NODE_ELEMENT
                            && child.getAttribute('_ke_bookmark'))
                            continue;

                        if (nodeType == KEN.NODE_ELEMENT
                            && !$(child)._4e_isEmptyInlineRemoveable()
                            || nodeType == KEN.NODE_TEXT
                            && S.trim(child.nodeValue)) {
                            return FALSE;
                        }
                    }
                }
                return TRUE;
            },

            /**
             * @param target {(Node)}
             * @param toStart {boolean}
             */
            _4e_moveChildren : function(target, toStart) {
                checkNode(target);
                this.each(function(thisElement) {
                    if (thisElement.equals(target)) {
                        return;
                    }
                    var child,el = thisElement[0];

                    if (toStart) {
                        while (( child = el.lastChild )) {
                            target.prepend(el.removeChild(child));
                        }
                    }
                    else {
                        while (( child = el.firstChild ))
                            target.append(el.removeChild(child));
                    }
                });
                return this;
            },

            /**
             *
             * @param elem {(Node)}
             */
            _4e_mergeSiblings : ( function() {

                /**
                 *
                 * @param element {(Node)}
                 * @param sibling {(Node)}
                 * @param  {boolean=} isNext
                 */
                function mergeElements(element, sibling, isNext) {
                    if (sibling[0] && sibling[0].nodeType == KEN.NODE_ELEMENT) {
                        // Jumping over bookmark nodes and empty inline elements, e.g. <b><i></i></b>,
                        // queuing them to be moved later. (#5567)
                        var pendingNodes = [];

                        while (sibling.attr('_ke_bookmark')
                            || sibling._4e_isEmptyInlineRemoveable()) {
                            pendingNodes.push(sibling);
                            sibling = isNext ? $(sibling[0].nextSibling) : $(sibling[0].previousSibling);
                            if (!sibling[0] || sibling[0].nodeType != KEN.NODE_ELEMENT)
                                return;
                        }

                        if (element._4e_isIdentical(sibling)) {
                            // Save the last child to be checked too, to merge things like
                            // <b><i></i></b><b><i></i></b> => <b><i></i></b>
                            var innerSibling = isNext ? element[0].lastChild : element[0].firstChild;

                            // Move pending nodes first into the target element.
                            while (pendingNodes.length) {
                                pendingNodes.shift()._4e_move(element, !isNext);
                            }
                            sibling._4e_moveChildren(element, !isNext);
                            sibling._4e_remove();

                            // Now check the last inner child (see two comments above).
                            if (innerSibling[0] && innerSibling[0].nodeType == KEN.NODE_ELEMENT)
                                innerSibling._4e_mergeSiblings();
                        }
                    }
                }

                return function() {
                    this.each(function(thisElement) {
                        //note by yiminghe,why not just merge whatever
                        // Merge empty links and anchors also. (#5567)
                        if (!
                            ( REMOVE_EMPTY[ thisElement._4e_name() ]
                                ||
                                thisElement._4e_name() == "a" )
                            )
                            return;

                        mergeElements(thisElement, $(thisElement[0].nextSibling), TRUE);
                        mergeElements(thisElement, $(thisElement[0].previousSibling));
                    });
                    return this;
                };
            } )(),

            /**
             *
             * @param refDocument {Document}
             */
            _4e_getOffset:function(refDocument) {
                checkNode(refDocument);
                var elem = this[0];
                refDocument = refDocument[0];
                var box,
                    x = 0,
                    y = 0,
                    currentWindow = elem.ownerDocument.defaultView
                        || elem.ownerDocument.parentWindow,
                    currentDoc = elem.ownerDocument,
                    currentDocElem = currentDoc.documentElement;
                refDocument = refDocument || currentDoc;
                //same with DOM.offset
                if (elem.getBoundingClientRect) {
                    if (elem !== currentDoc.body && currentDocElem !== elem) {
                        box = elem.getBoundingClientRect();
                        //相对于refDocument，里层iframe的滚动不计
                        x = box.left + (refDocument === currentDoc ? $(currentWindow).scrollLeft() : 0);
                        y = box.top + (refDocument === currentDoc ? $(currentWindow).scrollTop() : 0);
                    }
                    if (refDocument) {
                        var refWindow = refDocument.defaultView || refDocument.parentWindow;
                        if (currentWindow != refWindow && currentWindow['frameElement']) {
                            //note:when iframe is static ,still some mistake
                            var iframePosition = $(currentWindow['frameElement'])._4e_getOffset($(refDocument));
                            x += iframePosition.left;
                            y += iframePosition.top;
                        }
                    }
                }
                return { left: x, top: y };
            },


            _4e_getFrameDocument : function() {
                var el = this[0],t;
                try {
                    // In IE, with custom document.domain, it may happen that
                    // the iframe is not yet available, resulting in "Access
                    // Denied" for the following property access.
                    t = el.contentWindow.document;
                }
                catch (e) {
                    // Trick to solve this issue, forcing the iframe to get ready
                    // by simply setting its "src" property.
                    t = el.src;
                    el.src = t;

                    // In IE6 though, the above is not enough, so we must pause the
                    // execution for a while, giving it time to think.
                    if (UA.ie && UA.ie < 7) {
                        window.showModalDialog(
                            'javascript:document.write("' +
                                '<script>' +
                                'window.setTimeout(' +
                                'function(){window.close();}' +
                                ',50);' +
                                '</scrip' +
                                't' +
                                '>' +
                                '")');
                    }
                }
                return el && el.contentWindow.document;
            },

            /**
             *
             * @param offset {number}
             */
            _4e_splitText : function(offset) {
                var el = this[0];
                var doc = el.ownerDocument;
                if (!el || el.nodeType != KEN.NODE_TEXT) {
                    return;
                }
                // If the offset is after the last char, IE creates the text node
                // on split, but don't include it into the DOM. So, we have to do
                // that manually here.
                if (UA.ie && offset == el.nodeValue.length) {
                    var next = $(doc.createTextNode(""));
                    return next.insertAfter(el);
                }

                var retval = $(el.splitText(offset));

                // IE BUG: IE8 does not update the childNodes array in DOM after splitText(),
                // we need to make some DOM changes to make it update. (#3436)
                //我靠！UA.ie==8 不对，
                //判断不出来:UA.ie==7 && doc.documentMode==7
                //浏览器模式：当ie8处于兼容视图以及ie7时，UA.ie==7
                //文本模式: mode=5 ,mode=7, mode=8
                //alert("ua:"+UA.ie);
                //alert("mode:"+doc.documentMode);
                //ie8 浏览器有问题，而不在于是否哪个模式
                if (!!doc['documentMode']) {
                    var workaround = $(doc.createTextNode(""));
                    workaround.insertAfter(retval)._4e_remove();
                }

                return retval;
            },

            /**
             *
             * @param closerFirst {boolean}
             */
            _4e_parents : function(closerFirst) {
                var node = this[0];
                var parents = $();
                do {
                    parents = parents.add(node, closerFirst ? undefined : 0);
                } while (( node = node.parent() ));

                return parents;
            },

            /**
             *
             * @param includeChildren {boolean}
             * @param cloneId {string}
             */
            _4e_clone : function(includeChildren, cloneId) {
                var ret = [];
                for (var i = 0; i < this.length; i++) {
                    var el = this[i];
                    var $clone = el.cloneNode(includeChildren);

                    if (!cloneId) {
                        var removeIds = function(node) {
                            if (node.nodeType != KEN.NODE_ELEMENT)
                                return;

                            node.removeAttribute('id');

                            var childs = node.childNodes;
                            for (var i = 0; i < childs.length; i++)
                                removeIds(childs[ i ]);
                        };

                        // The "id" attribute should never be cloned to avoid duplication.
                        removeIds($clone);
                    }
                    ret.push($clone)
                }
                return $(ret);
            },
            /**
             * 深度优先遍历获取下一结点
             * @param startFromSibling {boolean}
             * @param nodeType {number}
             * @param guard {function(KISSY.Node)}
             */
            _4e_nextSourceNode : function(startFromSibling, nodeType, guard) {
                var el = this[0];
                // If "guard" is a node, transform it in a function.
                if (guard && !guard.call) {
                    checkNode(guard);
                    var guardNode = guard,
                        guardFunc = function(node) {
                            return $(node).equals(guardNode);
                        };
                    if (1 > 2) {
                        guardFunc(0);
                    }
                    guard = guardFunc;
                }

                var node = !startFromSibling && el.firstChild ,
                    parent = $(el);

                // Guarding when we're skipping the current element( no children or 'startFromSibling' ).
                // send the 'moving out' signal even we don't actually dive into.
                if (!node) {
                    if (el.nodeType == KEN.NODE_ELEMENT && guard && guard($(el), TRUE) === FALSE)
                        return NULL;
                    node = el.nextSibling;
                }

                while (!node && ( parent = parent.parent())) {
                    // The guard check sends the "TRUE" paramenter to indicate that
                    // we are moving "out" of the element.
                    if (guard && guard(parent, TRUE) === FALSE)
                        return NULL;

                    node = parent[0].nextSibling;
                }

                if (!node)
                    return NULL;
                node = $(node);
                if (guard && guard(node) === FALSE)
                    return NULL;

                if (nodeType && nodeType != node[0].nodeType) {
                    return node._4e_nextSourceNode(FALSE, nodeType, guard);
                }

                return node;
            },

            /**
             *
             * @param startFromSibling {boolean}
             * @param nodeType {number}
             * @param guard {function(KISSY.Node)}
             */
            _4e_previousSourceNode : function(startFromSibling, nodeType, guard) {
                var el = this[0];
                if (guard && !guard.call) {
                    checkNode(guard);
                    var guardNode = guard;
                    var guardFunc = function(node) {
                        return node.equals(guardNode);
                    };
                    if (1 > 2) {

                    }
                    guard = guardFunc;
                }

                var node = ( !startFromSibling && el.lastChild),
                    parent = $(el);

                // Guarding when we're skipping the current element( no children or 'startFromSibling' ).
                // send the 'moving out' signal even we don't actually dive into.
                if (!node) {
                    if (el.nodeType == KEN.NODE_ELEMENT
                        && guard
                        && guard($(el), TRUE) === FALSE)
                        return NULL;
                    node = el.previousSibling;
                }

                while (!node && ( parent = parent.parent() )) {
                    // The guard check sends the "TRUE" paramenter to indicate that
                    // we are moving "out" of the element.
                    if (guard && guard(parent, TRUE) === FALSE)
                        return NULL;
                    node = parent[0].previousSibling;
                }

                if (!node)
                    return NULL;
                node = $(node);
                if (guard && guard(node) === FALSE)
                    return NULL;

                if (nodeType && node[0].nodeType != nodeType) {
                    return node._4e_previousSourceNode(FALSE, nodeType, guard);
                }

                return node;
            },

            /**
             *
             * @param node {(Node)}
             */
            _4e_commonAncestor:function(node) {
                checkNode(node);
                var el = this[0];
                node = node[0];
                if (el === node)
                    return el;

                if (node.nodeType != KEN.NODE_TEXT
                    && $(node).contains(el))
                    return node;

                var start = el.nodeType == KEN.NODE_TEXT ? el.parent() : $(el);

                do   {
                    if (start[0].nodeType != KEN.NODE_TEXT && start.contains(node))
                        return start;
                } while (( start = start.parent() ));

                return NULL;
            },

            /**
             *
             * @param name {string}
             * @param includeSelf {boolean}
             */
            _4e_ascendant : function(name, includeSelf) {
                var el = this[0];
                if (!includeSelf)
                    el = el.parentNode;
                if (name && !S.isFunction(name)) {
                    var n = name;
                    var nameFunc = function(node) {
                        return node._4e_name() == n;
                    };
                    if (1 > 2) {
                    }
                    name = nameFunc;
                }
                //到document就完了
                while (el && el.nodeType != 9) {
                    var t = $(el);
                    if (!name || name(t) === TRUE)
                        return t;
                    $ = $.parentNode;
                }
                return NULL;
            },

            /**
             * 统一的属性处理方式
             */
            _4e_hasAttributes: Utils.ieEngine < 9 ?
                function() {
                    var el = this[0];
                    var attributes = el.attributes;
                    for (var i = 0; i < attributes.length; i++) {
                        var attribute = attributes[i];
                        switch (attribute.name) {
                            case 'class' :
                                // IE has a strange bug. If calling removeAttribute('className'),
                                // the attributes collection will still contain the "class"
                                // attribute, which will be marked as "specified", even if the
                                // outerHTML of the element is not displaying the class attribute.
                                // Note : I was not able to reproduce it outside the editor,
                                // but I've faced it while working on the TC of #1391.
                                if (el.getAttribute('class'))
                                    return TRUE;
                                break;
                            /*jsl:fallthru*/
                            default :
                                if (attribute.specified)
                                    return TRUE;
                        }
                    }
                    return FALSE;
                }
                :
                function() {
                    var el = this[0];
                    //删除firefox自己添加的标志
                    UA.gecko && el.removeAttribute("_moz_dirty");
                    //使用原生
                    //ie8 莫名其妙多个shape？？specified为false
                    return el.hasAttributes();
                },

            /**
             *
             * @param otherNode {(Node)}
             */
            _4e_position : function(otherNode) {
                checkNode(otherNode);
                var el = this[0],
                    $other = otherNode[0];


                if (el.compareDocumentPosition)
                    return el.compareDocumentPosition($other);

                // IE and Safari have no support for compareDocumentPosition.

                if (el == $other)
                    return KEP.POSITION_IDENTICAL;

                // Only element nodes support contains and sourceIndex.
                if (el.nodeType == KEN.NODE_ELEMENT && $other.nodeType == KEN.NODE_ELEMENT) {
                    if (el.contains) {
                        if (el.contains($other))
                            return KEP.POSITION_CONTAINS + KEP.POSITION_PRECEDING;

                        if ($other.contains($))
                            return KEP.POSITION_IS_CONTAINED + KEP.POSITION_FOLLOWING;
                    }

                    if ('sourceIndex' in el) {
                        return ( el.sourceIndex < 0 || $other.sourceIndex < 0 ) ? KEP.POSITION_DISCONNECTED :
                            ( el.sourceIndex < $other.sourceIndex ) ? KEP.POSITION_PRECEDING :
                                KEP.POSITION_FOLLOWING;
                    }
                }

                // For nodes that don't support compareDocumentPosition, contains
                // or sourceIndex, their "address" is compared.

                var addressOfThis = this._4e_address(),
                    addressOfOther = $(otherNode)._4e_address(),
                    minLevel = Math.min(addressOfThis.length, addressOfOther.length);

                // Determinate preceed/follow relationship.
                for (var i = 0; i <= minLevel - 1; i++) {
                    if (addressOfThis[ i ] != addressOfOther[ i ]) {
                        if (i < minLevel) {
                            return addressOfThis[ i ] < addressOfOther[ i ] ?
                                KEP.POSITION_PRECEDING : KEP.POSITION_FOLLOWING;
                        }
                        break;
                    }
                }

                // Determinate contains/contained relationship.
                return ( addressOfThis.length < addressOfOther.length ) ?
                    KEP.POSITION_CONTAINS + KEP.POSITION_PRECEDING :
                    KEP.POSITION_IS_CONTAINED + KEP.POSITION_FOLLOWING;
            },

            /**
             *
             * @param normalized {boolean}
             */
            _4e_address:function(normalized) {

                var node = this[0],
                    address = [],
                    $documentElement = node.ownerDocument.documentElement;

                while (node && node != $documentElement) {
                    var parentNode = node.parentNode,
                        currentIndex = -1;

                    if (parentNode) {
                        for (var i = 0; i < parentNode.childNodes.length; i++) {
                            var candidate = parentNode.childNodes[i];

                            if (normalized &&
                                candidate.nodeType == 3 &&
                                candidate.previousSibling &&
                                candidate.previousSibling.nodeType == 3) {
                                continue;
                            }

                            currentIndex++;

                            if (candidate == node)
                                break;
                        }

                        address.unshift(currentIndex);
                    }

                    node = parentNode;
                }
                return address;
            },

            /**
             *
             * @param styleName {string}
             * @param val {string=}
             */
            _4e_style:function(styleName, val) {
                var el = this;
                if (val !== undefined) {
                    return el.css(styleName, val);
                }
                return el[0].style[normalizeStyle(styleName)];
            },

            /**
             *
             * @param preserveChildren {boolean}
             */
            _4e_remove : function(preserveChildren) {
                S.each(this, function(el) {
                    var parent = el.parentNode;
                    if (parent) {
                        if (preserveChildren) {
                            // Move all children before the node.
                            for (var child; ( child = el.firstChild );) {
                                parent.insertBefore(el.removeChild(child), el);
                            }
                        }
                        parent.removeChild(el);
                    }
                });
                return this;
            },

            _4e_trim : function() {
                return this._4e_ltrim()._4e_rtrim();
            },


            _4e_ltrim : function() {
                S.each(this, function(el) {
                    var child;
                    while (( child = el.firstChild )) {
                        if (child.nodeType == KEN.NODE_TEXT) {
                            var trimmed = Utils.ltrim(child.nodeValue),
                                originalLength = child.nodeValue.length;

                            if (!trimmed) {
                                el.removeChild(child);
                                continue;
                            }
                            else if (trimmed.length < originalLength) {
                                new Node(child)._4e_splitText(originalLength - trimmed.length);
                                // IE BUG: child.remove() may raise JavaScript errors here. (#81)
                                el.removeChild(el.firstChild);
                            }
                        }
                        break;
                    }
                });
                return this;
            },

            _4e_rtrim : function() {
                S.each(this, function(el) {
                    var child;
                    while (( child = el.lastChild )) {
                        if (child.type == KEN.NODE_TEXT) {
                            var trimmed = Utils.rtrim(child.nodeValue),
                                originalLength = child.nodeValue.length;

                            if (!trimmed) {
                                el.removeChild(child);
                                continue;
                            } else if (trimmed.length < originalLength) {
                                new Node(child)._4e_splitText(trimmed.length);
                                // IE BUG: child.getNext().remove() may raise JavaScript errors here.
                                // (#81)
                                el.removeChild(el.lastChild);
                            }
                        }
                        break;
                    }

                    if (!UA.ie && !UA.opera) {
                        child = el.lastChild;
                        if (child && child.nodeType == 1 && child.nodeName.toLowerCase() == 'br') {
                            // Use "eChildNode.parentNode" instead of "node" to avoid IE bug (#324).
                            child.parentNode.removeChild(child);
                        }
                    }
                });
                return this;
            },


            _4e_appendBogus : function() {
                S.each(this, function(el) {
                    var lastChild = el.lastChild;
                    // Ignore empty/spaces text.
                    while (lastChild && lastChild.nodeType == KEN.NODE_TEXT && !S.trim(lastChild.nodeValue))
                        lastChild = lastChild.previousSibling;
                    if (!lastChild ||
                        lastChild.nodeType == KEN.NODE_TEXT ||
                        $(lastChild)._4e_name() !== 'br') {
                        var bogus = UA.opera ?
                            el.ownerDocument.createTextNode('') :
                            el.ownerDocument.createElement('br');

                        UA.gecko && bogus.setAttribute('type', '_moz');
                        el.appendChild(bogus);
                    }
                });
                return this;
            },

            /**
             * @param evaluator {function(KISSY.Node)}
             */
            _4e_previous : function(evaluator) {
                var previous = this[0], retval;
                do {
                    previous = previous.previousSibling;
                    retval = previous && $(previous);
                } while (retval && evaluator && !evaluator(retval));
                return retval;
            },

            /**
             *
             * @param evaluator {function(KISSY.Node)}
             */
            _4e_last : function(evaluator) {
                var last = this[0].lastChild,
                    retval = last && $(last);
                if (retval && evaluator && !evaluator(retval))
                    retval = retval._4e_previous(evaluator);

                return retval;
            },
            /**
             *
             * @param evaluator {function(KISSY.Node)}
             */
            _4e_next : function(evaluator) {
                var next = this[0], retval;
                do {
                    next = next.nextSibling;
                    retval = next && $(next);
                } while (retval && evaluator && !evaluator(retval));
                return retval;
            },

            _4e_outerHtml : function() {
                var el = this[0],ret;
                if (ret = el['outerHTML']) {
                    // IE includes the <?xml:namespace> tag in the outerHTML of
                    // namespaced element. So, we must strip it here. (#3341)
                    return ret.replace(/<\?[^>]*>/, '');
                }

                var tmpDiv = el.ownerDocument.createElement('div');
                tmpDiv.appendChild(el.cloneNode(TRUE));
                return tmpDiv.innerHTML;
            },

            /**
             *
             * @param database {Object}
             * @param name {string}
             * @param value {string}
             */
            _4e_setMarker : function(database, name, value) {
                var element = this;
                var id = element.data('list_marker_id') ||
                    ( element.data('list_marker_id', S.guid()).data('list_marker_id')),
                    markerNames = element.data('list_marker_names') ||
                        ( element.data('list_marker_names', {}).data('list_marker_names'));
                database[id] = element;
                markerNames[name] = 1;
                return element.data(name, value);
            },

            /**
             *
             * @param database {Object}
             * @param removeFromDatabase {boolean}
             */
            _4e_clearMarkers : function(database, removeFromDatabase) {
                this.each(function(element) {
                    var names = element.data('list_marker_names'),
                        id = element.data('list_marker_id');
                    for (var i in names)
                        element.removeData(i);
                    element.removeData('list_marker_names');
                    if (removeFromDatabase) {
                        element.removeData('list_marker_id');
                        delete database[id];
                    }
                });
                return this;
            },

            /**
             * @param dest  {(Node)}
             * @param skipAttributes {Object}
             */
            _4e_copyAttributes : function(dest, skipAttributes) {
                checkNode(dest);
                var el = this;
                var attributes = el[0].attributes;
                skipAttributes = skipAttributes || {};
                for (var n = 0; n < attributes.length; n++) {
                    // Lowercase attribute name hard rule is broken for
                    // some attribute on IE, e.g. CHECKED.
                    var attribute = attributes[n],
                        attrName = attribute.name.toLowerCase(),
                        attrValue;

                    // We can set the type only once, so do it with the proper value, not copying it.
                    if (attrName in skipAttributes)
                        continue;

                    if (attrName == 'checked' && ( attrValue = el.attr(attrName) ))
                        dest.attr(attrName, attrValue);
                    // IE BUG: value attribute is never specified even if it exists.
                    else if (attribute.specified ||
                        ( UA.ie && attribute.value && attrName == 'value' )) {
                        attrValue = el.attr(attrName);
                        if (attrValue === NULL)
                            attrValue = attribute.nodeValue;
                        dest.attr(attrName, attrValue);
                    }
                }
                var eStyle;
                // The style:
                if ((eStyle = el.attr("style")) !== '') {
                    dest.attr("style", eStyle);
                }
            },


            _4e_isEditable : function() {
                // Get the element DTD (defaults to span for unknown elements).
                var name = this._4e_name(),
                    dtd = !XHTML_DTD.$nonEditable[ name ]
                        && ( XHTML_DTD[ name ] || XHTML_DTD["span"] );

                // In the DTD # == text node.
                return ( dtd && dtd['#'] );
            },
            /**
             * 修正scrollIntoView在可视区域内不需要滚动
             */
            _4e_scrollIntoView:function() {
                var elem = this,
                    doc = $(elem[0].ownerDocument),
                    win = $(doc._4e_getWin()),
                    l = doc.scrollLeft(),
                    t = doc.scrollTop(),
                    eoffset = elem.offset(),
                    el = eoffset.left,
                    et = eoffset.top;
                if (win.height() + t < et ||
                    et < t ||
                    win.width() + l < el
                    ||
                    el < l
                    ) {
                    elem.scrollIntoView(doc);
                }
                return elem;
            },

            /**
             *
             * @param tag {string}
             * @param namespace {string=}
             * @return {Array.<KISSY.Node>}
             */
            _4e_getElementsByTagName:function(tag, namespace) {
                var elem = this[0];
                if (!UA.ie && namespace) {
                    tag = namespace + ":" + tag
                }
                var re = [],
                    els = elem.getElementsByTagName(tag);
                for (var i = 0; i < els.length; i++)
                    re.push(els[i]);
                return $(re);
            },
            /**
             * srcDoc 中的位置在 destDoc 的对应位置
             * @param x {number}
             * @param y {number}
             * @param destDoc {Document}
             * @return 在最终文档中的位置
             */
            getXY:function(x, y, destDoc) {
                checkNode(destDoc);
                var srcDoc = this[0];
                destDoc = destDoc[0];
                var currentWindow = srcDoc.defaultView || srcDoc.parentWindow;
                //x,y相对于当前iframe文档,防止当前iframe有滚动条
                x -= $(currentWindow).scrollLeft();
                y -= $(currentWindow).scrollTop();
                if (destDoc) {
                    var refWindow = destDoc.defaultView || destDoc.parentWindow;
                    if (currentWindow != refWindow && currentWindow['frameElement']) {
                        //note:when iframe is static ,still some mistake
                        var iframePosition = $(currentWindow['frameElement'])._4e_getOffset(destDoc);
                        x += iframePosition.left;
                        y += iframePosition.top;
                    }
                }
                return {left:x,top:y};
            },
            /**
             * 根据dom路径得到某个节点
             * @param address {Array.<number>}
             * @param normalized {boolean}
             * @return {KISSY.Node}
             */
            getByAddress : function(address, normalized) {
                var doc = this[0],
                    el = doc.documentElement;

                for (var i = 0; el && i < address.length; i++) {
                    var target = address[ i ];

                    if (!normalized) {
                        el = el.childNodes[ target ];
                        continue;
                    }

                    var currentIndex = -1;

                    for (var j = 0; j < el.childNodes.length; j++) {
                        var candidate = el.childNodes[ j ];

                        if (normalized === TRUE &&
                            candidate.nodeType == 3 &&
                            candidate.previousSibling &&
                            candidate.previousSibling.nodeType == 3) {
                            continue;
                        }

                        currentIndex++;

                        if (currentIndex == target) {
                            el = candidate;
                            break;
                        }
                    }
                }

                return el ? $(el) : NULL;
            },

            clean:function() {
                S.each(this, function(node) {
                    var cs = S.makeArray(node.childNodes);
                    for (var i = 0; i < cs.length; i++) {
                        var c = cs[i];
                        if (c.nodeType == Constants.NODE.NODE_TEXT && !S.trim(c.nodeValue)) {
                            node.removeChild(c);
                        }
                    }
                });
            }
        });

    /**
     *
     * @param styleName {string}
     */
    function normalizeStyle(styleName) {
        return styleName.replace(/-(\w)/g, function(m, g1) {
            return g1.toUpperCase();
        })
    }

    if (1 > 2) {
        var x = {};
        x._4e_isBlockBoundary()
            ._4e_index()
            ._4e_first()
            ._4e_getFrameDocument()
            ._4e_parents()
            ._4e_clone()
            ._4e_commonAncestor()
            ._4e_ascendant()
            ._4e_hasAttributes()
            ._4e_position()
            ._4e_style()
            ._4e_trim()
            ._4e_appendBogus()
            ._4e_last()
            ._4e_outerHtml()
            ._4e_setMarker()
            ._4e_copyAttributes()
            ._4e_isEditable()
            ._4e_scrollIntoView()
            ._4e_getElementsByTagName()
            .getXY()
            .getByAddress()
            .clean();
    }
}, {
        requires:["ua","node","./contants","./utils","./dtd"]
    });
