KISSY.Editor.add("ext-focus",function(){function c(){}var a=KISSY,f=a.UA,e=a.Editor,d=e.focusManager;e.namespace("UIBase");c.ATTRS={focus4e:{value:true}};c.prototype={_uiSetFocus4e:function(b){if(b){this.on("show",this._show4FocusExt,this);this.on("hide",this._hide4FocusExt,this)}else{this.detach("show",this._show4FocusExt,this);this.detach("hide",this._hide4FocusExt,this)}},__syncUI:function(){},__renderUI:function(){},__bindUI:function(){this._focus4e=(new a.Node("<a href='#' class='ke-focus' style='width:0;height:0;margin:0;padding:0;overflow:hidden;outline:none;font-size:0;'></a>")).appendTo(this.get("el"))},
_show4FocusExt:function(){var b=this._focusEditor=d.currentInstance();window.focus();document.body.focus();this._focus4e[0].focus();if(f.ie&&b){var g=b.document.selection.createRange();if(g)if(g.item&&g.item(0).ownerDocument==b.document){b=document.body.createTextRange();b.moveToElementText(this.get("el")._4e_first()[0]);b.collapse(true);b.select()}}},_hide4FocusExt:function(){var b=this._focusEditor;b&&b.focus()}};e.UIBase.Focus=c},{host:"overlay"});
KISSY.Editor.add("overlay",function(){var c=KISSY,a=c.Editor;if(!a.Overlay){var f=c.UIBase.create(c.Overlay,[a.UIBase.Focus],{init:function(){},syncUI:function(){a.Utils.preventFocus(this.get("contentEl"))}},{ATTRS:{zIndex:{value:a.baseZIndex(a.zIndexManager.OVERLAY)}}}),e=c.UIBase.create(c.Dialog,[a.UIBase.Focus],{show:function(){this.center();var b=this.get("y");if(b-c.DOM.scrollTop()>200){b=c.DOM.scrollTop()+200;this.set("y",b)}e.superclass.show.call(this)}},{ATTRS:{constrain:{value:true},zIndex:{value:a.baseZIndex(a.zIndexManager.OVERLAY)}}});
a.Overlay=f;a.Dialog=e;var d;a.Overlay.loading=function(){d||(d=new a.Overlay({x:0,focus4e:false,width:c.UA.ie==6?c.DOM.docWidth():"100%",y:0,zIndex:a.baseZIndex(a.zIndexManager.LOADING),elCls:"ke-global-loading"}));d.set("height",c.DOM.docHeight());d.show();d.loading()};a.Overlay.unloading=function(){d&&d.hide()}}});
