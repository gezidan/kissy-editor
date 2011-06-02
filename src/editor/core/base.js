/**
 * Editor class implementation
 * @module base
 */
KISSY.add(function(S, UA, Node, Event, Utils, focusManager) {
    var $ = Node.all,
        TRUE = true,
        FALSE = false,
        NULL = null,
        DOC = document,
        tryThese = Utils.tryThese,
        INSTANCE_ID = 1,
        /**
         * @const
         */
            DISPLAY = "display",
        /**
         * @const
         */
            WIDTH = "width",
        /**
         * @const
         */
            HEIGHT = "height",
        /**
         * @const
         */
            NONE = "none",
        /**
         * @const
         */
            ke_textarea_wrap = ".ke-textarea-wrap",
        /**
         * @const
         */
            ke_editor_tools = ".ke-editor-tools",
        /**
         * @const
         */
            ke_editor_status = ".ke-editor-status",

        srcScript = 'document.open();' +
            // The document domain must be set any time we
            // call document.open().
            ( Utils.isCustomDomain() ? ( 'document.domain="' + DOC.domain + '";' ) : '' ) +
            'document.close();',

        editorHtml = "<div " +
            " class='ke-editor-wrap' " +
            " > " +
            "<div class='" + ke_editor_tools.substring(1) + "'" +
            " ></div>" +
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
            //' tabIndex="' + ( UA.webkit ? -1 : "$(tabIndex)" ) + '" ' +
            ' allowTransparency="true" ' +
            '></iframe></div>' +
            "<div class='" + ke_editor_status.substring(1) + "'></div>" +
            "</div>";

    function Editor(textarea, cfg) {
        var self = this;
        if (!(self instanceof Editor)) {
            return new Editor(textarea, cfg);
        }
        textarea = $(textarea);
        cfg = cfg || {};
        cfg.pluginConfig = cfg.pluginConfig || {};
        self.init(textarea);
    }

    S.augment(Editor, Event.Target, {
        });

    return Editor;
}, {
        requires:['ua','node','event','./utils','./focusManager']
    });
/**
 * 2011-06-01
 *  - 承玉：基于 KISSY 1.2 重构
 *      - 主要是模块化方面
 *  - TODO:
 *      - UI 完全采用 KISSY
 **/