KISSY.Editor.add("flashsupport",function(n){var f=KISSY.Editor,j=KISSY,u=j.UA,v=j.Event,w=f.ContextMenu,x=j.Node,q=f.BubbleView,p=f.TripleButton,y=f.SimpleOverlay,k=n.htmlDataProcessor,i="ke_flash",r=f.Utils.flash;n=k&&k.dataFilter;f.Flash||function(){function c(a){this.editor=a;this._init()}function g(a){return a._4e_name()==="img"&&!!a.hasClass(i)&&a}var z=/\.swf(?:$|\?)/i;c.isFlashEmbed=function(a){a=a.attributes;return a.type=="application/x-shockwave-flash"||z.test(a.src||"")};j.augment(c,{_config:function(){this._cls=
i;this._type="flash";this._title="Flash属性";this._bodyHtml="<div style='padding:20px 20px 0 20px'><p><label>网址： <input  data-verify='^https?://[^\\s]+$'  data-warning='网址格式为：http://' class='ke-flash-url ke-input' style='width:300px' /></label></p><table style='margin:10px 0 5px  40px;width:300px;'><tr><td><label>宽度： <input  data-verify='^(?!0$)\\d+$'  data-warning='宽度请输入正整数' class='ke-flash-width ke-input' style='width:60px' /> 像素 </label></td><td><label>高度：<input  data-verify='^(?!0$)\\d+$'  data-warning='高度请输入正整数' class='ke-flash-height ke-input' style='width:60px' /> 像素 </label></td></tr><tr><td><label>对齐： <select class='ke-flash-align'><option value=''>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select></td><td><label>间距：<input  data-verify='^\\d+$'  data-warning='间距请输入非负整数' class='ke-flash-margin ke-input' style='width:60px' value='5'/> 像素</label></td></tr></table></div>";
this._footHtml="<a class='ke-flash-ok ke-button' style='margin-left:40px;margin-right:20px;'>确定</a> <a class='ke-flash-cancel ke-button'>取消</a>";this._contentCls="ke-toolbar-flash";this._tip="插入Flash";this._contextMenu=A;this._flashRules=["img."+i];this._config_dwidth="400px";this._urlTip="请输入如 http://www.xxx.com/xxx.swf"},_init:function(){this._config();var a=this.editor,b={},d=this._contextMenu;a._toolbars=a._toolbars||{};a._toolbars[this._type]=this;this.el=new p({container:a.toolBarDiv,contentCls:this._contentCls,
title:this._tip});this.el.on("offClick",this.show,this);if(d)for(var e in d)(function(h){b[h]=function(){d[h](a)}})(e);w.register(a.document,{rules:this._flashRules,width:"120px",funcs:b});q.attach({pluginName:this._type,pluginInstance:this});v.on(a.document,"dblclick",this._dbclick,this);f.Utils.lazyRun(this,"_prepareShow","_realShow");f.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",p.DISABLED)},enable:function(){this.el.set("state",p.OFF)},_getFlashUrl:function(a){return r.getUrl(a)},
_updateTip:function(a,b){var d=this.editor.restoreRealElement(b);if(d){d=this._getFlashUrl(d);a.html(d);a.attr("href",d)}},_dbclick:function(a){var b=new x(a.target);if(b._4e_name()==="img"&&b.hasClass(this._cls)){this.show(null,b);a.halt()}},_prepareShow:function(){var a=new y({title:this._title,width:this._config_dwidth||"350px",mask:true});a.body.html(this._bodyHtml);a.foot.html(this._footHtml);this.d=a;this._initD()},_realShow:function(){this._updateD();this.d.show()},_updateD:function(){var a=
this.editor,b=this.selectedFlash;if(b){if(a=a.restoreRealElement(b)){b.css("width")&&this.dWidth.val(parseInt(b.css("width")));b.css("height")&&this.dHeight.val(parseInt(b.css("height")));this.dAlign.val(a.attr("align"));this.dUrl.val(this._getFlashUrl(a));this.dMargin.val(parseInt(a._4e_style("margin"))||0)}}else{f.Utils.resetInput(this.dUrl);this.dWidth.val("");this.dHeight.val("");this.dAlign.val("");this.dMargin.val("5")}},show:function(a,b){this.selectedFlash=b;this._prepareShow()},_initD:function(){var a=
this.d,b=a.el;this.dHeight=b.one(".ke-flash-height");this.dWidth=b.one(".ke-flash-width");this.dUrl=b.one(".ke-flash-url");this.dAlign=f.Select.decorate(b.one(".ke-flash-align"));this.dMargin=b.one(".ke-flash-margin");var d=b.one(".ke-flash-ok");b=b.one(".ke-flash-cancel");d.on("click",this._gen,this);b.on("click",function(){a.hide()});f.Utils.placeholder(this.dUrl,this._urlTip)},_getDInfo:function(){return{url:this.dUrl.val(),attrs:{width:this.dWidth.val(),height:this.dHeight.val(),align:this.dAlign.val(),
style:"margin:"+(parseInt(this.dMargin.val())||0)+"px"}}},_gen:function(){var a=this.editor,b=this._getDInfo(),d=b&&j.trim(b.url),e=b&&b.attrs;if(f.Utils.verifyInputs(this.d.el.all("input"))&&b){b=r.createSWF(d,{attrs:e},a.document);d=b.el;e=a.createFakeElement?a.createFakeElement(d,this._cls,this._type,true,b.html,e):d;e=a.insertElement(e);this.selectedFlash&&a.getSelection().selectElement(e);this.d.hide()}}});f.Flash=c;c.registerBubble=function(a,b,d){q.register({pluginName:a,func:d,init:function(){var e=
this,h=e.el;h.html(b+'  <a class="ke-bubbleview-url" target="_blank" href="#"></a> -     <span class="ke-bubbleview-link ke-bubbleview-change">编辑</span> -     <span class="ke-bubbleview-link ke-bubbleview-remove">删除</span>');var s=h.one(".ke-bubbleview-url"),t=h.one(".ke-bubbleview-change");h=h.one(".ke-bubbleview-remove");t._4e_unselectable();s._4e_unselectable();h._4e_unselectable();t.on("click",function(l){e._plugin.show(null,e._selectedEl);l.halt()});h.on("click",function(l){var m=e._plugin;if(u.webkit){var o=
m.editor.getSelection().getRanges();o&&o[0]&&(o[0].collapse(true)||1)&&o[0].select()}e._selectedEl._4e_remove();e.hide();m.editor.notifySelectionChange();l.halt()});e.on("beforeVisibleChange",function(l){var m=e._selectedEl;l.newVal&&m&&e._plugin._updateTip(s,m)})}})};c.registerBubble("flash","Flash 网址： ",g);c.checkFlash=g;var A={"Flash属性":function(a){var b=a.getSelection();b=b&&b.getStartElement();b=g(b);a=a._toolbars.flash;b&&a.show(null,b)}};c.CLS_FLASH=i;c.TYPE_FLASH="flash"}();n&&n.addRules({elements:{object:function(c){var g=
c.attributes;if(!(g.classid&&String(g.classid).toLowerCase())){for(g=0;g<c.children.length;g++)if(c.children[g].name=="embed"){if(!f.Flash.isFlashEmbed(c.children[g]))break;return k.createFakeParserElement(c,i,"flash",true)}return null}return k.createFakeParserElement(c,i,"flash",true)},embed:function(c){if(!f.Flash.isFlashEmbed(c))return null;return k.createFakeParserElement(c,i,"flash",true)}}},5)});
