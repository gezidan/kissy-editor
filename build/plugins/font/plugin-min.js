KISSY.Editor.add("font",function(e){var c=KISSY.Editor,l=KISSY,h=c.Style,i=c.TripleButton,f=e.cfg.pluginConfig["font-size"]||["8px","10px","12px","14px","18px","24px","36px","48px","60px","72px","84px","96px","108px"],q={},r=[],v={element:"span",styles:{"font-size":"#(size)"},overrides:[{element:"font",attributes:{size:null}}]},o=e.cfg.pluginConfig["font-family"]||["\u5b8b\u4f53","\u9ed1\u4f53","\u96b6\u4e66","\u6977\u4f53_GB2312","\u5fae\u8f6f\u96c5\u9ed1","Georgia","Times New Roman","Impact","Courier New",
"Arial","Verdana","Tahoma"],s={},t=[],w={element:"span",styles:{"font-family":"#(family)"},overrides:[{element:"font",attributes:{face:null}}]},g;e.cfg.pluginConfig["font-size"]=f;e.cfg.pluginConfig["font-family"]=o;for(g=0;g<f.length;g++){var m=f[g];q[m]=new h(v,{size:m});r.push({name:m,value:m})}for(g=0;g<o.length;g++){f=o[g];s[f]=new h(w,{family:f});t.push({name:f,value:f,attrs:{style:"font-family:"+f}})}c.Font||function(){function j(a){j.superclass.constructor.call(this,a);this._init()}function n(a){n.superclass.constructor.call(this,
a);this._init()}j.ATTRS={title:{},html:{},styles:{},editor:{}};var p=c.Select;l.extend(j,l.Base,{_init:function(){var a=this.get("editor"),b=a.toolBarDiv;this.get("html");this.el=new p({container:b,doc:a.document,width:this.get("width"),popUpWidth:this.get("popUpWidth"),title:this.get("title"),items:this.get("html")});this.el.on("click",this._vChange,this);a.on("selectionChange",this._selectionChange,this);c.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",p.DISABLED)},enable:function(){this.el.set("state",
p.ENABLED)},_vChange:function(a){var b=this.get("editor"),d=a.newVal;a=a.preVal;var k=this.get("styles");b.focus();b.fire("save");if(d==a){k[d].remove(b.document);this.el.set("value","")}else k[d].apply(b.document);b.fire("save")},_selectionChange:function(a){this.get("editor");a=a.path.elements;for(var b=this.get("styles"),d=0,k;d<a.length;d++){k=a[d];for(var u in b)if(b[u].checkElementRemovable(k,true)){this.el.set("value",u);return}}this.el.reset("value")}});n.ATTRS={editor:{},text:{},contentCls:{},
title:{},style:{}};l.extend(n,l.Base,{_init:function(){var a=this.get("editor"),b=this.get("text");this.get("style");var d=this.get("title");this.el=new i({text:b,title:d,contentCls:this.get("contentCls"),container:a.toolBarDiv});this.el.on("offClick",this._on,this);this.el.on("onClick",this._off,this);a.on("selectionChange",this._selectionChange,this);c.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",i.DISABLED)},enable:function(){this.el.set("state",i.OFF)},_on:function(){var a=
this.get("editor");this.get("text");var b=this.get("style");this.get("title");a.fire("save");b.apply(a.document);a.fire("save");a.notifySelectionChange();a.focus()},_off:function(){var a=this.get("editor");this.get("text");var b=this.get("style");this.get("title");a.fire("save");b.remove(a.document);a.fire("save");a.notifySelectionChange();a.focus()},_selectionChange:function(a){this.get("editor");this.get("text");var b=this.get("style");this.get("title");var d=this.el;a=a.path;if(d.get("state")!=
i.DISABLED)b.checkActive(a)?d.set("state",i.ON):d.set("state",i.OFF)}});j.SingleFont=n;c.Font=j}();e.addPlugin(function(){new c.Font({editor:e,title:"\u5927\u5c0f",width:"30px",popUpWidth:"55px",styles:q,html:r});new c.Font({editor:e,title:"\u5b57\u4f53",width:"110px",popUpWidth:"130px",styles:s,html:t});new c.Font.SingleFont({contentCls:"ke-toolbar-bold",title:"\u7c97\u4f53 ",editor:e,style:new h({element:"strong",overrides:[{element:"b"},{element:"span",attributes:{style:"font-weight: bold;"}}]})});
new c.Font.SingleFont({contentCls:"ke-toolbar-italic",title:"\u659c\u4f53 ",editor:e,style:new h({element:"em",overrides:[{element:"i"},{element:"span",attributes:{style:"font-style: italic;"}}]})});new c.Font.SingleFont({contentCls:"ke-toolbar-underline",title:"\u4e0b\u5212\u7ebf ",editor:e,style:new h({element:"u",overrides:[{element:"span",attributes:{style:"text-decoration: underline;"}}]})});new c.Font.SingleFont({contentCls:"ke-toolbar-strikeThrough",title:"\u5220\u9664\u7ebf ",editor:e,style:new h({element:"del",
overrides:[{element:"span",attributes:{style:"text-decoration: line-through;"}},{element:"s"}]})})})});
