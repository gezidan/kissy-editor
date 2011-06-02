/**
 * @module range
 */
KISSY.add(function(S, Node) {
    var $ = Node.all;

    function Range(document) {

    }

    S.augment(Node, {
            /**
             * @param parent {(Node)}
             */
            _4e_breakParent : function(parent) {
                checkNode(parent);
                this.each(function(el) {
                    var range = new Range(el[0].ownerDocument);

                    // We'll be extracting part of this element, so let's use our
                    // range to get the correct piece.
                    range.setStartAfter(el);
                    range.setEndAfter(parent);

                    // Extract it.
                    var docFrag = range.extractContents();

                    // Move the element outside the broken element.
                    range.insertNode(el._4e_remove());

                    // Re-insert the extracted piece after the element.
                    $(docFrag).insertAfter(el);
                });
                return this;
            }

        });

    /**
     * for dev
     */
    function checkNode(n) {
        if (!n.getDOMNode) {
            S.error("argument is not KISSY Node!");
        }
    }

    return Range;

}, {
        requires:["node"]
    });