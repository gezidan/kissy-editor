KISSY.Editor.add("image/dialog", function(editor) {
    var S = KISSY,
        KE = S.Editor,
        //DOM = S.DOM,
        UA = S.UA,
        JSON = S.JSON,
        Node = S.Node,
        //Event = S.Event,
        //TYPE_IMG = 'image',        
        Overlay = KE.SimpleOverlay,
        TIP = "http://",
        DTIP = "自动",
        MARGIN_DEFAULT = 0;

    var bodyHtml = "<div class='ke-image-wrap'>" +
        "<ul class='ke-tabs ks-clear'>" +
        "<li rel='remote'>" +
        "网络图片" +
        "</li>" +
        "<li rel='local'>" +
        "本地上传" +
        "</li>" +
        "</ul>" +
        "<div style='" +
        "padding:12px 20px 5px 20px;'>" +
        "<div class='ke-image-tabs-content-wrap' " +
        ">" +
        "<div>" +
        "<label>" +
        "<span " +
        "class='ke-image-title'" +
        ">" +
        "图片地址： " +
        "</span>" +
        "<input " +
        " data-verify='^https?://[^\\s]+$' " +
        " data-warning='网址格式为：http://' " +
        "class='ke-img-url ke-input' " +
        "style='width:390px;' " +
        "value='" + TIP + "'/>" +
        "</label>" +
        "</div>" +
        "<div style='position:relative;'>" +
        "<form class='ke-img-upload-form'>" +
        "<p style='zoom:1;'>" +
        "<input class='ke-input ke-img-local-url' " +
        "readonly='readonly' " +
        "style='margin-right: 15px; " +
        "vertical-align: middle; " +
        "width: 368px;" +
        "color:#969696;'/>" +
        "<a " +
        "style='padding:3px 11px;" +
        "position:absolute;" +
        "left:390px;" +
        "top:0px;" +
        "z-index:1;' " +
        "class='ke-image-up ke-button'>浏览...</a>" +
        "</p>" +
        "<div class='ke-img-up-extraHtml'>" +
        "</div>" +
        "</form>" +
        "</div>" +
        "</div>" +
        "<table " +
        "style='width:100%;margin-top:8px;' " +
        "class='ke-img-setting'>" +
        "<tr>" +
        "<td>" +
        "<label>" +
        "宽度： " +
        "<input " +
        " data-verify='^(" + DTIP + "|((?!0$)\\d+))$' " +
        " data-warning='宽度请输入正整数' " +
        "class='ke-img-width ke-input' style='width:60px' value='" +
        DTIP + "'/> 像素 </label>" +
        "</td>" +
        "<td><label>" +
        "高度： " +
        "<input " +
        " data-verify='^(" + DTIP + "|((?!0$)\\d+))$' " +
        " data-warning='高度请输入正整数' " +
        "class='ke-img-height ke-input' style='width:60px' " +
        "value='" + DTIP + "'/> 像素 </label>" +
        "</td>" +

        "</tr>" +
        "<tr>" +
        "<td>" +
        "<label>" +
        "对齐：" +
        "<select class='ke-img-align'>" +
        "<option value='none'>无</option>" +
        "<option value='left'>左对齐</option>" +
        "<option value='right'>右对齐</option>" +
        "</select>" +
        "</label>" +
        "</td>" +
        "<td><label>" +
        "间距： " +
        "<input " +
        "" +
        " data-verify='^\\d+$' " +
        " data-warning='间距请输入非负整数' " +
        "class='ke-img-margin ke-input' style='width:60px' value='"
        + MARGIN_DEFAULT + "'/> 像素" +
        "</label>" +
        "</td>" +
        "</tr>" +
        "</table>" +
        "</div>" +
        "</div>",
        footHtml = "<a class='ke-img-insert ke-button' " +
            "style='margin-right:30px;'>确定</a> " +
            "<a  class='ke-img-cancel ke-button'>取消</a>";

    var d,
        tab,
        imgUrl,
        imgHeight,
        imgWidth,
        imgAlign,
        imgMargin,
        selectedEl;

    function prepare() {
        var warning = "请点击浏览上传图片",
            cfg = (editor.cfg["pluginConfig"]["image"] || {})["upload"] || null;

        d = new Overlay({
            title:"图片",//属性",
            mask:true
        });
        d.body.html(bodyHtml);
        d.foot.html(footHtml);
        var content = d.el,
            cancel = content.one(".ke-img-cancel"),
            ok = content.one(".ke-img-insert"),
            uploadForm = content.one(".ke-img-upload-form"),
            imgLocalUrl = content.one(".ke-img-local-url"),
            verifyInputs = KE.Utils.verifyInputs,
            commonSettingTable = content.one(".ke-img-setting");

        tab = new KE.Tabs({
            tabs:content.one("ul.ke-tabs"),
            contents:content.one("div.ke-image-tabs-content-wrap")
        });

        imgLocalUrl.val(warning);
        imgUrl = content.one(".ke-img-url");
        imgHeight = content.one(".ke-img-height");
        imgWidth = content.one(".ke-img-width");
        imgAlign = KE.Select.decorate(content.one(".ke-img-align"));
        imgMargin = content.one(".ke-img-margin");
        cancel.on("click", function(ev) {
            d.hide();
            ev.halt();
        });

        ok.on("click", function() {
            if (tab.activate() == "local" && cfg) {

                if (!verifyInputs(commonSettingTable.all("input")))
                    return;
                if (imgLocalUrl.val() == warning) {
                    alert("请先选择文件!");
                    return;
                }
                KE.Utils.doFormUpload({
                    form:uploadForm,
                    callback:function(r) {
                        var data = S.trim(r.responseText)
                            .replace(/\r|\n/g, "");
                        d.unloading();
                        try {
                            data = JSON.parse(data);
                        } catch(e) {
                            S.log(data);
                            data = {error:"服务器出错，请重试"};
                        }
                        if (data.error) {
                            alert(data.error);
                            return;
                        }
                        imgUrl.val(data.imgUrl);
                        insert();
                    }
                }, cfg.serverParams, cfg.serverUrl);
                d.loading();

            } else {
                if (! verifyInputs(content.all("input")))
                    return;
                insert();
            }
        });

        if (cfg) {
            if (cfg.extraHtml) {
                content.one(".ke-img-up-extraHtml")
                    .html(cfg.extraHtml);
            }
            var ke_image_up = content.one(".ke-image-up"),
                sizeLimit = cfg && cfg.sizeLimit,
                fileInput = new Node("<input " +
                    "type='file' " +
                    "style='position:absolute;" +
                    "cursor:pointer;" +
                    "left:" +
                    (UA.ie ? "360" : "369") +
                    "px;" +
                    "z-index:2;" +
                    "top:0px;" +
                    "height:26px;' " +
                    "size='1' " +
                    "name='" + (cfg.fileInput || "Filedata") + "'/>")
                    .insertAfter(imgLocalUrl);
            if (sizeLimit)
                warning = "单张图片容量不超过 " + (sizeLimit / 1000) + " M";
            imgLocalUrl.val(warning);
            fileInput.css({
                opacity:0
            });

            fileInput.on("mouseenter", function() {
                ke_image_up.addClass("ke-button-hover");
            });
            fileInput.on("mouseleave", function() {
                ke_image_up.removeClass("ke-button-hover");
            });
            fileInput.on("change", function() {
                imgLocalUrl.val(fileInput.val());
            });

        }
        else {
            tab.remove("local");
        }

    }


    function insert() {
        var url = imgUrl.val(),
            height = parseInt(imgHeight.val()),
            width = parseInt(imgWidth.val()),
            align = imgAlign.val(),
            margin = parseInt(imgMargin.val()),
            style = '';
        if (height) {
            style += "height:" + height + "px;";
        }
        if (width) {
            style += "width:" + width + "px;";
        }
        if (align) {
            style += "float:" + align + ";";
        }
        if (!isNaN(margin)) {
            style += "margin:" + margin + "px;";
        }
        if (style) {
            style = " style='" + style + "' ";
        }
        var img = new Node("<img " +
            style +
            "src='" +
            url +
            "' alt='' />", null, editor.document);
        d.hide();
        img = editor.insertElement(img, function(el) {
            el.on("abort error", function() {
                el.detach();
                //ie6 手动设置，才会出现红叉
                el[0].src = url;
            });
        });
        if (selectedEl) {
            editor.getSelection().selectElement(img);
        }
        editor.notifySelectionChange();
    }

    function update(_selectedEl) {
        var active = "remote";
        selectedEl = _selectedEl;
        if (selectedEl) {
            imgUrl.val(selectedEl.attr("src"));
            imgHeight.val(selectedEl.height());
            imgWidth.val(selectedEl.width());
            imgAlign.val(selectedEl.css("float") || "none");
            var margin = parseInt(selectedEl._4e_style("margin"))
                || 0;
            imgMargin.val(margin);
        } else {
            if (tab.getTab("local"))
                active = "local";
            imgUrl.val(TIP);
            imgHeight.val(DTIP);
            imgWidth.val(DTIP);
            imgAlign.val("none");
            imgMargin.val(MARGIN_DEFAULT);
        }
        tab.activate(active);
    }


    editor.addDialog("image/dialog", {
        show:function(_selectedEl) {
            update(_selectedEl);
            d.show();
        },
        hide:function() {
            d.hide();
        }
    });
    prepare();
});