KISSY.Editor.add("dd",function(){function g(){g.superclass.constructor.apply(this,arguments);this._init()}function f(){f.superclass.constructor.apply(this,arguments);this._init()}function h(){h.superclass.constructor.apply(this,arguments)}var d=KISSY,e=d.Editor,i=d.Event,m=d.UA,n=d.DOM,k=d.Node;if(!e.DD){e.DD={};g.ATTRS={bufferTime:{value:200},activeDrag:{}};d.extend(g,d.Base,{_init:function(){this._showShimMove=e.Utils.throttle(this._move,this,30)},_move:function(a){var b=this.get("activeDrag");
d.log("move");if(b){a.preventDefault();this._clearSelection();b._move(a)}},_start:function(a){var b=this,c=b.get("bufferTime")||0;b._registerEvent();if(c)b._bufferTimer=setTimeout(function(){b._bufferStart(a)},c);else b._bufferStart(a)},_bufferStart:function(a){this.set("activeDrag",a);this._activeShim();a._start()},_end:function(a){var b=this.get("activeDrag");this._unregisterEvent();if(this._bufferTimer){clearTimeout(this._bufferTimer);this._bufferTimer=null}this._shim&&this._shim.css({display:"none"});
if(b){b._end(a);this.set("activeDrag",null)}},_activeShim:function(){var a=document;this._shim=(new k("<div style='background-color:red;position:absolute;left:0;width:100%;top:0;z-index:"+e.baseZIndex(e.zIndexManager.DD_PG)+";'></div>")).appendTo(a.body);this._shim.css("opacity",0);this._activeShim=this._showShim},_showShim:function(){this._shim.css({display:"",height:n.docHeight()});this._clearSelection()},_clearSelection:function(){if(window.getSelection)window.getSelection().removeAllRanges();
else document.selection&&document.selection.empty()},_registerEvent:function(){var a=document;d.log("_registerEvent");i.on(a,"mouseup",this._end,this);i.on(a,"mousemove",this._showShimMove,this)},_unregisterEvent:function(){var a=document;d.log("_unregisterEvent");i.remove(a,"mousemove",this._showShimMove,this);i.remove(a,"mouseup",this._end,this)}});e.DD.DDM=new g;var o=e.DD.DDM;f.ATTRS={node:{},handlers:{value:{}}};d.extend(f,d.Base,{_init:function(){var a=this.get("node"),b=this.get("handlers");
if(d.isEmptyObject(b))b[a[0].id]=a;for(var c in b)if(b.hasOwnProperty(c)){var j=b[c],l=j.css("cursor");if(!j._4e_equals(a))if(!l||l==="auto")j.css("cursor","move")}a.on("mousedown",this._handleMouseDown,this)},_check:function(a){var b=this.get("handlers"),c;for(c in b)if(b.hasOwnProperty(c))if(b[c]._4e_contains(a)||b[c]._4e_equals(a))return true;return false},_handleMouseDown:function(a){if(this._check(new k(a.target))){m.webkit||a.preventDefault();o._start(this);var b=this.get("node"),c=a.pageX;
a=a.pageY;b=b.offset();this.startMousePos={left:c,top:a};this.startNodePos=b;this._diff={left:c-b.left,top:a-b.top}}},_move:function(a){this.fire("move",a)},_end:function(){this.fire("end")},_start:function(){this.fire("start")}});d.extend(h,f,{_init:function(){var a=this;h.superclass._init.apply(a,arguments);var b=a.get("node");a.on("move",function(c){b.offset({left:c.pageX-a._diff.left,top:c.pageY-a._diff.top})})}});e.Draggable=f;e.Drag=h}});
