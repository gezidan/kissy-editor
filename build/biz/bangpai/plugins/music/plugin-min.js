KISSY.Editor.add("bangpai-music",function(k){var g=KISSY,n=g.UA,o=g.Event,f=g.Editor,p=g.DOM,i=f.Flash,e="ke_xiami",h=k.htmlDataProcessor,l=h&&h.dataFilter;l&&l.addRules({elements:{object:function(b){var c=b.attributes,j=b.attributes.title,a;if(!(c.classid&&String(c.classid).toLowerCase())){for(c=0;c<b.children.length;c++){a=b.children[c];if(a.name=="embed"){if(!i.isFlashEmbed(a))break;if(/xiami\.com/i.test(a.attributes.src))return h.createFakeParserElement(b,e,"bangpai-music",true,{title:j})}}return null}for(c=
0;c<b.children.length;c++){a=b.children[c];if(a.name=="param"&&a.attributes.name=="movie")if(/xiami\.com/i.test(a.attributes.value))return h.createFakeParserElement(b,e,"bangpai-music",true,{title:j})}},embed:function(b){if(!i.isFlashEmbed(b))return null;if(/xiami\.com/i.test(b.attributes.src))return h.createFakeParserElement(b,e,"bangpai-music",true,{title:b.attributes.title})}}},4);f.BangPaiMusic||function(){function b(a){b.superclass.constructor.apply(this,arguments);a.cfg.disableObjectResizing||
o.on(a.document.body,n.ie?"resizestart":"resize",function(d){p.hasClass(d.target,e)&&d.preventDefault()})}function c(a){return a._4e_name()==="img"&&!!a.hasClass(e)&&a}g.extend(b,i,{_config:function(){this._cls=e;this._type="bangpai-music";this._contentCls="ke-toolbar-music";this._tip="\u63d2\u5165\u867e\u7c73\u97f3\u4e50";this._contextMenu=j;this._flashRules=["img."+e]},_updateTip:function(a,d){var m=this.editor.restoreRealElement(d);if(m){a.html(d.attr("title"));a.attr("href",this._getFlashUrl(m))}}});var j={"\u867e\u7c73\u5c5e\u6027":function(a){var d=
a.getSelection();d=d&&d.getStartElement();d=c(d);a=a._toolbars["bangpai-music"];d&&a.show(null,d)}};i.registerBubble("bangpai-music","\u867e\u7c73\u97f3\u4e50\uff1a ",c);f.BangPaiMusic=b;f.add({"bangpai-music/dialog":{attach:false,charset:"utf-8",requires:["flash/dialog"],path:f.Utils.debugUrl("biz/bangpai/plugins/music/dialog/plugin.js?t="+encodeURIComponent("2010-10-29 19:20:07")+"")}})}();k.addPlugin(function(){new f.BangPaiMusic(k)})},{attach:false,requires:["flash/support"]});
