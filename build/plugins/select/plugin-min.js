KISSY.Editor.add("select",function(){function g(a){g.superclass.constructor.call(this,a);this._init()}var h=KISSY,i=h.Node,m=h.Event,j=h.DOM,l=h.Editor;if(!l.Select){g.DISABLED=0;g.ENABLED=1;g.ATTRS={el:{},cls:{},container:{},doc:{},value:{},width:{},title:{},items:{},state:{value:1}};g.decorate=function(a){for(var b=a.width()-23,c=[],d=a.all("option"),e=0;e<d.length;e++){var f=d[e];c.push({name:j.html(f),value:j.attr(f,"value")})}return new g({width:b,el:a,items:c,cls:"ke-combox",value:a.val()})};
h.extend(g,h.Base,{_init:function(){var a=this.get("container"),b=this.get("el"),c=new i("<span class='ke-select-wrap'><a onclick='return false;' class='ke-select'><span class='ke-select-text'></span><span class='ke-select-drop-wrap'><span class='ke-select-drop'></span></span></a></span>"),d=this.get("title")||"",e=this.get("cls"),f=c.one(".ke-select-text");c.one(".ke-select-drop");this.get("value")?f.html(this._findNameByV(this.get("value"))):f.html(d);f.css("width",this.get("width"));c._4e_unselectable();
d&&c.attr("title",d);e&&c.addClass(e);if(b)b[0].parentNode.replaceChild(c[0],b[0]);else a&&c.appendTo(a);c.on("click",this._click,this);this.el=c;this.title=f;this._focusA=c.one("a.ke-select");l.Utils.lazyRun(this,"_prepare","_real");this.on("afterValueChange",this._valueChange,this);this.on("afterStateChange",this._stateChange,this)},_findNameByV:function(a){for(var b=this.get("title")||"",c=this.get("items"),d=0;d<c.length;d++){var e=c[d];if(e.value==a){b=e.name;break}}return b},_valueChange:function(a){this.title.html(this._findNameByV(a.newVal))},
_itemsChange:function(a){a=a.newVal;var b=this._selectList;b.html("");if(a)for(var c=0;c<a.length;c++){var d=a[c];(new i("<a class='ke-select-menu-item' href='#' data-value='"+d.value+"'>"+d.name+"</a>",d.attrs)).appendTo(b)._4e_unselectable()}this.as=b.all("a")},val:function(a){if(a){this.set("value",a);return this}else return this.get("value")},_prepare:function(){var a=this,b=a.el,c=a._focusA,d=new i("<div class='ke-menu' onmousedown='return false;'></div>"),e=new l.SimpleOverlay({el:d,zIndex:990,
focusMgr:false}),f=a.get("items");a.menu=e;a.get("title")&&(new i("<div class='ke-menu-title ke-select-menu-item' style='margin-top:-6px;' >"+a.get("title")+"</div>")).appendTo(d);a._selectList=(new i("<div>")).appendTo(d);a._itemsChange({newVal:f});a.get("popUpWidth")&&d.css("width",a.get("popUpWidth"));d.appendTo(document.body);e.on("show",function(){c.addClass("ke-select-active")});e.on("hide",function(){c.removeClass("ke-select-active")});m.on([document,a.get("doc")],"click",function(k){b._4e_contains(k.target)||
e.hide()});d.on("click",a._select,a);a.as=a._selectList.all("a");m.on(d[0],"mouseenter",function(){a.as.removeClass("ke-menu-selected")});a.on("afterItemsChange",a._itemsChange,a)},_stateChange:function(a){var b=this.el;a.newVal==1?b.removeClass("ke-select-disabled"):b.addClass("ke-select-disabled")},_select:function(a){a.halt();var b=this.menu,c=b.el;if(a=(new i(a.target))._4e_ascendant(function(f){return c._4e_contains(f)&&f._4e_name()=="a"},true)){var d=this.get("value"),e=a.attr("data-value");
this.set("value",e);this.fire("click",{newVal:e,preVal:d,name:a.html()});b.hide()}},_real:function(){var a=this.el,b=a.offset(),c=h.clone(b),d=this.menu.el.height(),e=this.menu.el.width(),f=b.top,k=j.scrollTop(),n=j.viewportHeight(),o=j.viewportWidth();b.top+=a.height()-2;if(b.top+d>k+n&&f-k>k+n-b.top){b=c;b.top-=d+9}if(b.left+e>o-60)b.left-=e-a.width();this.menu.show(b)},_click:function(a){a.preventDefault();a=this.el;var b=this.get("value");if(!a.hasClass("ke-select-disabled"))if(this._focusA.hasClass("ke-select-active"))this.menu.hide();
else{this._prepare();b&&this.menu&&this.as.each(function(c){c.attr("data-value")==b?c.addClass("ke-menu-selected"):c.removeClass("ke-menu-selected")})}}});l.Select=g}});
