KISSY.Editor.add("overlay",function(){var b=KISSY,a=b.Editor;if(!a.Overlay){var f=b.UIBase.create(b.Overlay,[a.UIBase.Focus],{init:function(){},syncUI:function(){a.Utils.preventFocus(this.get("contentEl"))}},{ATTRS:{zIndex:{value:a.baseZIndex(a.zIndexManager.OVERLAY)}}}),e=b.UIBase.create(b.Dialog,[a.UIBase.Focus],{show:function(){this.center();var d=this.get("y");if(d-b.DOM.scrollTop()>200){d=b.DOM.scrollTop()+200;this.set("y",d)}e.superclass.show.call(this)}},{ATTRS:{constrain:{value:true},zIndex:{value:a.baseZIndex(a.zIndexManager.OVERLAY)}}});
a.Overlay=f;a.Dialog=e;var c;a.Overlay.loading=function(){c||(c=new a.Overlay({x:0,focus4e:false,width:b.UA.ie==6?b.DOM.docWidth():"100%",y:0,zIndex:a.baseZIndex(a.zIndexManager.LOADING),elCls:"ke-global-loading"}));c.set("height",b.DOM.docHeight());c.show();c.loading()};a.Overlay.unloading=function(){c&&c.hide()}}});
