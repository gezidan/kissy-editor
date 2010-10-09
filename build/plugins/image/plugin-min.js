KISSY.Editor.add("image",function(z){var g=KISSY.Editor,l=KISSY,D=l.DOM,E=l.UA,F=l.JSON,w=l.Node,G=l.Event,A=g.BubbleView,H=g.SimpleOverlay;g.ImageInserter||function(){function t(a){t.superclass.constructor.call(this,a);this._init()}var u=function(a){return a._4e_name()==="img"&&!/(^|\s+)ke_/.test(a[0].className)&&a};D.addStyleSheet(".ke-image-wrap {margin:0;}","ke-image");var x=g.TripleButton;t.ATTRS={editor:{}};var y={"图片属性":function(a){var b=a.getSelection();b=b&&b.getStartElement();b=u(b);a=a._toolbars.image;
b&&a.show(null,b)}};l.extend(t,l.Base,{_init:function(){var a=this.get("editor"),b=a.toolBarDiv,k={};this.editor=a;this.el=new x({contentCls:"ke-toolbar-image",title:"插入图片",container:b});this.el.on("offClick",this.show,this);G.on(a.document,"dblclick",this._dblclick,this);g.Utils.lazyRun(this,"_prepare","_real");a._toolbars=a._toolbars||{};a._toolbars.image=this;if(y)for(var c in y)(function(e){k[e]=function(){y[e](a)}})(c);g.ContextMenu.register(a.document,{rules:[u],width:"120px",funcs:k});A.attach({pluginName:"image",
pluginInstance:this});g.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",x.DISABLED)},enable:function(){this.el.set("state",x.OFF)},_dblclick:function(a){var b=new w(a.target);if(u(b)){this.show(null,b);a.halt()}},_prepare:function(){function a(j){j=l.clone(j);for(var o in j)if(j.hasOwnProperty(o)){var v=j[o];if(l.isFunction(v))j[o]=v()}return j}var b=this,k=b.get("editor"),c,e,i;b.d=new H({title:"图片属性",mask:true,width:"550px"});var f=b.d;f.body.html("<div class='ke-image-wrap'><ul class='ke-tabs ks-clear'><li rel='remote'>网络图片</li><li rel='local'>本地上传</li></ul><div style='padding:10px 0pt 10px 20px;'><div class='kee-image-tabs-content-wrap' style='height:60px;'><div><label><span class='ke-image-title'>图片地址： </span><input  data-verify='^https?://[^\\s]+$'  data-warning='网址格式为：http://' class='ke-img-url ke-input' style='width:440px;' value='http://'/></label></div><div><p><input class='ke-input ke-img-local-url' readonly='readonly' style='margin-right: 15px; vertical-align: middle; width: 425px;color:#969696;'/><button class='ke-image-up ke-button'>浏览...</button></p><div class='ke-img-up-extraHtml'></div></div></div><table style='width:100%;'><tr><td><label>宽度： <input  data-verify='^(自动|((?!0$)\\d+))$'  data-warning='宽度请输入正整数' class='ke-img-width ke-input' style='width:60px' value='自动'/> 像素 </label></td><td><label>高度： <input  data-verify='^(自动|((?!0$)\\d+))$'  data-warning='高度请输入正整数' class='ke-img-height ke-input' style='width:60px' value='自动'/> 像素 </label></td></tr><tr><td><label>对齐：<select class='ke-img-align'><option value='none'>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select></label></td><td><label>间距： <input  data-verify='^\\d+$'  data-warning='间距请输入非负整数' class='ke-img-margin ke-input' style='width:60px' value='5'/> 像素</label></td></tr></table></div></div>");
f.foot.html("<a class='ke-img-insert ke-button' style='margin-right:30px;'>确定</a> <a  class='ke-img-cancel ke-button'>取消</a>");b.content=f.el;var d=b.content,n=d.one(".ke-img-cancel"),p=d.one(".ke-img-insert");b.imgUrl=d.one(".ke-img-url");b.imgHeight=d.one(".ke-img-height");b.imgWidth=d.one(".ke-img-width");b.imgAlign=g.Select.decorate(d.one(".ke-img-align"));b.imgMargin=d.one(".ke-img-margin");n.on("click",function(j){b.d.hide();j.halt()});var m=(k.cfg.pluginConfig.image||{}).upload||null,r=new g.Tabs({tabs:d.one("ul.ke-tabs"),
contents:d.one("div.kee-image-tabs-content-wrap")});d.one(".ke-image-title");var s=new g.TripleButton({el:d.one(".ke-image-up"),cls:"ke-button",text:"浏&nbsp;览"});b.tab=r;p.on("click",function(){if(r.activate()=="local"&&c&&m)if(i.val()==e)alert("请先选择文件!");else{c.uploadAll(m.serverUrl,"POST",a(m.serverParams),m.fileInput);f.loading()}else b._insert()});if(m){var q;m.extraHtml&&d.one(".ke-img-up-extraHtml").html(m.extraHtml);var J=function(){var j=s.el.width()+38,o=s.el.height()+8;q=(new w("<div style='position:absolute;width:"+
j+"px;height:"+o+"px;z-index:9999;'>")).appendTo(d);var v=g.Config.base+g.Utils.debugUrl("plugins/uploader/uploader.swf");c=new g.FlashBridge({movie:v,methods:["removeFile","cancel","clearFileList","removeFile","disable","enable","upload","setAllowMultipleFiles","setFileFilters","uploadAll"],holder:q,attrs:{width:j,height:o},params:{wmode:"transparent"},flashVars:{allowedDomain:location.hostname,menu:true}});c.on("swfReady",function(){s.enable();c.setAllowMultipleFiles(false);c.setFileFilters([{extensions:"*.jpeg;*.jpg;*.png;*.gif",
description:"图片文件( png,jpg,jpeg,gif )"}])});var B=m.sizeLimit||Number.MAX_VALUE;e="单张图片容量不超过"+B+"KB";i=d.one(".ke-img-local-url");i.val(e);c.on("fileSelect",function(h){h=h.fileList;for(var I in h){var C=h[I];if(Math.floor(C.size/1E3)>B){alert(e);i.val(e);c.clearFileList();break}i.val(C.name)}});c.on("uploadStart",function(){c.clearFileList()});c.on("uploadCompleteData",function(h){h=l.trim(h.data).replace(/\\r||\\n/g,"");f.unloading();if(h){h=F.parse(h);if(h.error)alert(h.error);else{b.imgUrl.val(h.imgUrl);
i.val(e);b._insert()}}});c.on("uploadError",function(h){f.unloading();i.val(e);alert(h.status)})};r.on("local",function(){q||J();q.offset(s.el.offset())});r.on("remote",function(){q&&q.offset({left:-9999,top:-9999})});s.disable()}else r.remove("local")},_updateTip:function(a,b){a.html(b.attr("src"));a.attr("href",b.attr("src"))},_real:function(){this.d.show()},_insert:function(){var a=this.imgUrl.val();if(g.Utils.verifyInputs(this.d.el.all("input"))){var b=parseInt(this.imgHeight.val()),k=this.get("editor"),
c=parseInt(this.imgWidth.val()),e=this.imgAlign.val(),i=parseInt(this.imgMargin.val()),f="";if(b)f+="height:"+b+"px;";if(c)f+="width:"+c+"px;";if(e)f+="float:"+e+";";isNaN(i)||(f+="margin:"+i+"px;");if(f)f=" style='"+f+"' ";a=new w("<img "+f+"src='"+a+"' alt='' />",null,k.document);a=k.insertElement(a,b||c?null:function(d){d.on("load",function(){d.detach();d.css({width:d.width()+"px",height:d.height()+"px"})})});this._selectedEl&&k.getSelection().selectElement(a);this.d.hide();k.notifySelectionChange()}},
_updateD:function(a){this._selectedEl=a;this.tab.activate("remote");if(a){this.imgUrl.val(a.attr("src"));this.imgHeight.val(a.height());this.imgWidth.val(a.width());this.imgAlign.val(a.css("float")||"none");this.imgMargin.val(parseInt(a._4e_style("margin"))||0)}else{this.imgUrl.val("http://");this.imgHeight.val("自动");this.imgWidth.val("自动");this.imgAlign.val("none");this.imgMargin.val("5")}},show:function(a,b){this._prepare();this._updateD(b)}});g.ImageInserter=t;(function(a,b,k){A.register({pluginName:a,
func:k,init:function(){var c=this,e=c.el;e.html(b+'  <a class="ke-bubbleview-url" target="_blank" href="#"></a> -     <span class="ke-bubbleview-link ke-bubbleview-change">编辑</span> -     <span class="ke-bubbleview-link ke-bubbleview-remove">删除</span>');var i=e.one(".ke-bubbleview-url"),f=e.one(".ke-bubbleview-change");e=e.one(".ke-bubbleview-remove");f._4e_unselectable();i._4e_unselectable();e._4e_unselectable();f.on("click",function(d){c._plugin.show(null,c._selectedEl);d.halt()});e.on("click",
function(d){var n=c._plugin;if(E.webkit){var p=n.editor.getSelection().getRanges();p&&p[0]&&(p[0].collapse(true)||1)&&p[0].select()}c._selectedEl._4e_remove();c.hide();n.editor.notifySelectionChange();d.halt()});c.on("afterVisibleChange",function(d){var n=c._selectedEl;d.newVal&&n&&c._plugin._updateTip(i,n)})}})})("image","图片网址： ",u)}();z.addPlugin(function(){new g.ImageInserter({editor:z})})});
