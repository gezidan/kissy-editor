KISSY.Editor.add("bubbleview",function(){var f=KISSY.Editor,i=KISSY,k=i.Event,m=i.DOM;if(!f.BubbleView){var g=i.Base.create(f.Overlay,[],{init:function(){this.on("renderUI",this._renderUIBubbleView,this)},_renderUIBubbleView:function(){this.get("el").addClass("ke-bubbleview-bubble")},show:function(){var b=this._selectedEl,e=b._4e_getOffset(document);e.top+=b.height()+5;g.superclass.show.call(this);this.set("xy",[e.left,e.top])}},{ATTRS:{focus4e:false,zIndex:{value:f.baseZIndex(f.zIndexManager.BUBBLE_VIEW)}}}),
h={};g.attach=function(b){var e=b.pluginInstance,j=b.pluginName;b=e.editor;var l=h[j];if(l){var n=l.cfg.func,a=h[j].bubble;b.on("selectionChange",function(c){c=c.path;var d=c.elements;if(c&&d)if(c=c.lastElement)if(c=n(c)){d=h[j];if(!d.bubble){d.bubble=new g;d.bubble.renderer();d.cfg.init&&d.cfg.init.call(d.bubble)}a=d.bubble;a._selectedEl=c;a._plugin=e;a.hide();a.show()}else if(a){a._selectedEl=a._plugin=null;a.hide()}});k.on(m._4e_getWin(b.document),"scroll blur",function(){a&&a.hide()});k.on(document,
"click",function(){a&&a.hide()})}};g.register=function(b){h[b.pluginName]={cfg:b}};f.BubbleView=g}});
