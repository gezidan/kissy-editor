/**
 * @module constant
 */
KISSY.add(function() {
    return {
        NODE : {
            NODE_ELEMENT:1,
            NODE_TEXT:3,
            NODE_COMMENT : 8,
            NODE_DOCUMENT_FRAGMENT:11
        },
        SOURCE_MODE:0,
        WYSIWYG_MODE:1,
        POSITION : {
            POSITION_IDENTICAL:0,
            POSITION_DISCONNECTED:1,
            POSITION_FOLLOWING:2,
            POSITION_PRECEDING:4,
            POSITION_IS_CONTAINED:8,
            POSITION_CONTAINS:16
        }
    };
});