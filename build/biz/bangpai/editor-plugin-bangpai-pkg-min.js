KISSY.Editor.add("bangpai-music",function(t){function q(c){return/xiami\.com/i.test(c)}var o=KISSY,m=o.Editor,r=o.DOM,y=o.Node,v=m.Config.base+"assets/loading.gif",n=m.Flash,p="ke_xiami",s=t.htmlDataProcessor,e=s&&s.dataFilter;e&&e.addRules({elements:{object:function(c){var g=c.attributes,w=c.attributes.title,b;if(!(g.classid&&String(g.classid).toLowerCase())){for(g=0;g<c.children.length;g++){b=c.children[g];if(b.name=="embed"){if(!n.isFlashEmbed(b))return null;if(q(b.attributes.src))return s.createFakeParserElement(c,
p,"bangpai-music",true,{title:w})}}return null}for(g=0;g<c.children.length;g++){b=c.children[g];if(b.name=="param"&&b.attributes.name=="movie")if(q(b.attributes.value))return s.createFakeParserElement(c,p,"bangpai-music",true,{title:w})}},embed:function(c){if(!n.isFlashEmbed(c))return null;if(q(c.attributes.src))return s.createFakeParserElement(c,p,"bangpai-music",true,{title:c.attributes.title})}}},4);m.BangPaiMusic||function(){function c(h,a){if(h.length>a)h=h.substring(0,a)+"...";return h}function g(){g.superclass.constructor.apply(this,
arguments)}function w(h){return x.replace(/\${([^}]+)}/g,function(a,d){return h[d]})}function b(h,a,d){return"<a class='ke-xiami-page-item"+(h==a?" ke-xiami-curpage":"")+"' data-value='"+a+"' href='#'>"+(d||a)+"</a>"}function f(h){return h._4e_ascendant(function(a){return a._4e_name()==="img"&&!!a.hasClass(p)},true)}r.addStyleSheet(".ke-xiami-list {margin-top:10px;}.ke-xiami-list li{border:1px dotted gray;border-width:0 0 1px 0;overflow:hidden;zoom:1;padding:2px;}\n.ke-xiami-list .ke-xiami-add {float:right;}\n.ke-xiami-list .ke-xiami-song {float:left;}\n.ke-xiami-paging a{display: inline-block; zoom: 1;  *display: inline; border:1px solid gray;padding:0 5px;margin:0 2px;}\n.ke-xiami-paging a:hover,.ke-xiami-paging a.ke-xiami-curpage {background-color:orange;}\n.ke-xiami-paging {text-align:center;margin-top:10px;}\n",
"BangPaiMusic");window.bangpai_xiami=function(h){var a=bangpai_xiami.instance;h.page=bangpai_xiami.page;a._listSearch(h)};var x="http://www.xiami.com/app/nineteen/search/key/${key}/page/${page}?random=${random}&callback=bangpai_xiami";o.extend(g,n,{_config:function(){this._cls=p;this._type="bangpai-music";this._title="\u641c\u7d22\u97f3\u4e50";this._bodyHtml="<form action='#' class='ke-xiami-form'><p><input class='ke-xiami-url' style='width:300px' value='\u8f93\u5165\u60f3\u8981\u6dfb\u52a0\u7684\u6b4c\u66f2\u540d\u3001\u4e13\u8f91\u540d\u3001\u827a\u4eba\u540d'/> &nbsp;  <input type='submit' style='vertical-align:middle;' value='\u641c \u7d22 ' /></p><p style='margin:5px 0'><label>\u5bf9 \u9f50\uff1a <select class='ke-xiami-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></p></form><div class='ke-xiami-list'></div>";
this._footHtml="";this._contentCls="ke-toolbar-music";this._tip="\u63d2\u5165\u867e\u7c73\u97f3\u4e50";this._contextMenu=A;this._flashRules=["img."+p];this._config_dwidth="400px"},_updateTip:function(h,a){var d=this.editor.restoreRealElement(a);h.html(a.attr("title"));h.attr("href",this._getFlashUrl(d))},_initD:function(){function h(k){var l={key:encodeURIComponent(j.val()),page:k,random:(new Date).valueOf()};l=w(l);bangpai_xiami.instance=a;bangpai_xiami.page=k;a._xiamia_list.html("<img style='display:block;width:108px;margin:5px auto 0 auto;'src='"+
v+"'/>");o.getScript(l)}var a=this,d=a.d,i=d.el.one(".ke-xiami-form"),j=d.el.one(".ke-xiami-url");a.dAlign=d.el.one(".ke-xiami-align");a._xiami_input=j;a._xiamia_list=d.el.one(".ke-xiami-list");i.on("submit",function(k){h(1);k.halt()},a);a._xiamia_list.on("click",function(k){k.preventDefault();var l=new y(k.target);k=l._4e_ascendant(function(u){return a._xiamia_list._4e_contains(u)&&u.hasClass("ke-xiami-add")},true);l=l._4e_ascendant(function(u){return a._xiamia_list._4e_contains(u)&&u.hasClass("ke-xiami-page-item")},
true);if(k){a._dinfo={url:"http://www.xiami.com/widget/"+k.attr("data-value")+"/singlePlayer.swf",attrs:{title:k.attr("title"),align:a.dAlign.val()}};a._gen()}else l&&h(parseInt(l.attr("data-value")))})},_listSearch:function(h){var a,d=h.results,i;if(h.key==this._xiami_input.val()){if(d&&d.length){i="<ul>";for(a=0;a<d.length;a++){var j=d[a];i+="<li title='"+decodeURIComponent(j.song_name)+"'><span class='ke-xiami-song'>"+c(decodeURIComponent(j.song_name),25)+"</span><a href='#' title='"+decodeURIComponent(j.song_name)+
"' class='ke-xiami-add' data-value='"+(j.album_id+"_"+j.song_id)+"'>\u9009\u62e9</a></li>"}i+="</ul>";d=h.page;h=Math.floor(h.total/8);a=d-3;j=d+3;if(h>1){if(a<=2){j=Math.min(2-a+j,h-1);a=2}j=Math.min(j,h-1);if(j==h-1)a=Math.max(2,j-6);i+="<p class='ke-xiami-paging'>"+b(d,1,"1"+(a!=2?"...":""));for(a=a;a<=j;a++)i+=b(d,a);if(j!=h)i+=b(d,h,(j!=h-1?"...":"")+h);i+="</p>"}}else i="<p style='text-align:center;margin:10px 0;'>\u4e0d\u597d\u610f\u601d\uff0c\u6ca1\u6709\u627e\u5230\u7ed3\u679c\uff01</p>";
this._xiamia_list.html(i)}},_updateD:function(){var h=this.selectedFlash;if(h){this._xiami_input.val(h.attr("title"));this.dAlign.val(h.attr("align"))}else{this._xiami_input.val("\u8f93\u5165\u60f3\u8981\u6dfb\u52a0\u7684\u6b4c\u66f2\u540d\u3001\u4e13\u8f91\u540d\u3001\u827a\u4eba\u540d");this.dAlign.val("")}this._xiamia_list.html("")},_getDInfo:function(){o.mix(this._dinfo.attrs,{width:165,height:37});return this._dinfo}});var A={"\u867e\u7c73\u5c5e\u6027":function(h){var a=h.getSelection();a=a&&
a.getStartElement();a=f(a);h=h._toolbars["bangpai-music"];a&&h.show(null,a)}};n.registerBubble("bangpai-music","\u867e\u7c73\u97f3\u4e50\uff1a ",f);m.BangPaiMusic=g}();t.addPlugin(function(){new m.BangPaiMusic(t)})},{attach:false,requires:["flashsupport"]});
KISSY.Editor.add("bangpai-music",function(t){function q(c){return/xiami\.com/i.test(c)}var o=KISSY,m=o.Editor,r=o.DOM,y=o.Node,v=m.Config.base+"assets/loading.gif",n=m.Flash,p="ke_xiami",s=t.htmlDataProcessor,e=s&&s.dataFilter;e&&e.addRules({elements:{object:function(c){var g=c.attributes,w=c.attributes.title,b;if(!(g.classid&&String(g.classid).toLowerCase())){for(g=0;g<c.children.length;g++){b=c.children[g];if(b.name=="embed"){if(!n.isFlashEmbed(b))return null;if(q(b.attributes.src))return s.createFakeParserElement(c,
p,"bangpai-music",true,{title:w})}}return null}for(g=0;g<c.children.length;g++){b=c.children[g];if(b.name=="param"&&b.attributes.name=="movie")if(q(b.attributes.value))return s.createFakeParserElement(c,p,"bangpai-music",true,{title:w})}},embed:function(c){if(!n.isFlashEmbed(c))return null;if(q(c.attributes.src))return s.createFakeParserElement(c,p,"bangpai-music",true,{title:c.attributes.title})}}},4);m.BangPaiMusic||function(){function c(a,d){if(a.length>d)a=a.substring(0,d)+"...";return a}function g(){g.superclass.constructor.apply(this,
arguments)}function w(a){return A.replace(/\${([^}]+)}/g,function(d,i){return a[i]})}function b(a,d,i){return"<a class='ke-xiami-page-item"+(a==d?" ke-xiami-curpage":"")+"' data-value='"+d+"' href='#'>"+(i||d)+"</a>"}function f(a){return decodeURIComponent(a.song_name)+" - "+decodeURIComponent(a.artist_name)}function x(a){return a._4e_ascendant(function(d){return d._4e_name()==="img"&&!!d.hasClass(p)},true)}r.addStyleSheet(".ke-xiami-list {margin-top:10px;}.ke-xiami-list li{border:1px dotted gray;border-width:0 0 1px 0;overflow:hidden;zoom:1;padding:2px;}\n.ke-xiami-list .ke-xiami-add {float:right;}\n.ke-xiami-list .ke-xiami-song {float:left;}\n.ke-xiami-paging a{display: inline-block; zoom: 1;  *display: inline; border:1px solid gray;padding:0 5px;margin:0 2px;}\n.ke-xiami-paging a:hover,.ke-xiami-paging a.ke-xiami-curpage {background-color:orange;}\n.ke-xiami-paging {text-align:center;margin-top:10px;}\n",
"BangPaiMusic");window.bangpai_xiami=function(a){var d=bangpai_xiami.instance;a.page=bangpai_xiami.page;d._listSearch(a)};var A="http://www.xiami.com/app/nineteen/search/key/${key}/page/${page}?random=${random}&callback=bangpai_xiami";o.extend(g,n,{_config:function(){this._cls=p;this._type="bangpai-music";this._title="\u641c\u7d22\u97f3\u4e50";this._bodyHtml="<form action='#' class='ke-xiami-form'><p><input class='ke-xiami-url' style='width:300px' value='\u8f93\u5165\u60f3\u8981\u6dfb\u52a0\u7684\u6b4c\u66f2\u540d\u3001\u4e13\u8f91\u540d\u3001\u827a\u4eba\u540d'/> &nbsp;  <input type='submit' style='vertical-align:middle;' value='\u641c \u7d22 ' /></p><p style='margin:5px 0'><label>\u5bf9 \u9f50\uff1a <select class='ke-xiami-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></p></form><div class='ke-xiami-list'></div>";
this._footHtml="";this._contentCls="ke-toolbar-music";this._tip="\u63d2\u5165\u867e\u7c73\u97f3\u4e50";this._contextMenu=h;this._flashRules=["img."+p];this._config_dwidth="400px"},_updateTip:function(a,d){var i=this.editor.restoreRealElement(d);a.html(d.attr("title"));a.attr("href",this._getFlashUrl(i))},_initD:function(){function a(l){var u={key:encodeURIComponent(k.val()),page:l,random:(new Date).valueOf()};u=w(u);bangpai_xiami.instance=d;bangpai_xiami.page=l;d._xiamia_list.html("<img style='display:block;width:108px;margin:5px auto 0 auto;'src='"+
v+"'/>");o.getScript(u)}var d=this,i=d.d,j=i.el.one(".ke-xiami-form"),k=i.el.one(".ke-xiami-url");d.dAlign=i.el.one(".ke-xiami-align");d._xiami_input=k;d._xiamia_list=i.el.one(".ke-xiami-list");j.on("submit",function(l){a(1);l.halt()},d);d._xiamia_list.on("click",function(l){l.preventDefault();var u=new y(l.target);l=u._4e_ascendant(function(z){return d._xiamia_list._4e_contains(z)&&z.hasClass("ke-xiami-add")},true);u=u._4e_ascendant(function(z){return d._xiamia_list._4e_contains(z)&&z.hasClass("ke-xiami-page-item")},
true);if(l){d._dinfo={url:"http://www.xiami.com/widget/"+l.attr("data-value")+"/singlePlayer.swf",attrs:{title:l.attr("title"),align:d.dAlign.val()}};d._gen()}else u&&a(parseInt(u.attr("data-value")))})},_listSearch:function(a){var d,i=a.results,j;if(a.key==this._xiami_input.val()){if(i&&i.length){j="<ul>";for(d=0;d<i.length;d++){var k=i[d],l=f(k);j+="<li title='"+l+"'><span class='ke-xiami-song'>"+c(l,35)+"</span><a href='#' title='"+l+"' class='ke-xiami-add' data-value='"+(k.album_id+"_"+k.song_id)+
"'>\u9009\u62e9</a></li>"}j+="</ul>";i=a.page;a=Math.floor(a.total/8);d=i-3;k=i+3;if(a>1){if(d<=2){k=Math.min(2-d+k,a-1);d=2}k=Math.min(k,a-1);if(k==a-1)d=Math.max(2,k-6);j+="<p class='ke-xiami-paging'>"+b(i,1,"1"+(d!=2?"...":""));for(d=d;d<=k;d++)j+=b(i,d);if(k!=a)j+=b(i,a,(k!=a-1?"...":"")+a);j+="</p>"}}else j="<p style='text-align:center;margin:10px 0;'>\u4e0d\u597d\u610f\u601d\uff0c\u6ca1\u6709\u627e\u5230\u7ed3\u679c\uff01</p>";this._xiamia_list.html(j)}},_updateD:function(){var a=this.selectedFlash;
if(a){this._xiami_input.val(a.attr("title"));this.dAlign.val(a.attr("align"))}else{this._xiami_input.val("\u8f93\u5165\u60f3\u8981\u6dfb\u52a0\u7684\u6b4c\u66f2\u540d\u3001\u4e13\u8f91\u540d\u3001\u827a\u4eba\u540d");this.dAlign.val("")}this._xiamia_list.html("")},_getDInfo:function(){o.mix(this._dinfo.attrs,{width:165,height:37});return this._dinfo}});var h={"\u867e\u7c73\u5c5e\u6027":function(a){var d=a.getSelection();d=d&&d.getStartElement();d=x(d);a=a._toolbars["bangpai-music"];d&&a.show(null,
d)}};n.registerBubble("bangpai-music","\u867e\u7c73\u97f3\u4e50\uff1a ",x);m.BangPaiMusic=g}();t.addPlugin(function(){new m.BangPaiMusic(t)})},{attach:false,requires:["flashsupport"]});
KISSY.Editor.add("bangpai-video",function(t){function q(e){for(var c=0;c<s.length;c++){var g=s[c];if(g.reg.test(e))return g}}var o=KISSY,m=o.Editor,r="ke_video",y=m.Utils.getFlashUrl,v=m.Flash,n=t.htmlDataProcessor,p=n&&n.dataFilter;p&&p.addRules({elements:{object:function(e){var c=e.attributes;if(!(c.classid&&String(c.classid).toLowerCase())){for(c=0;c<e.children.length;c++)if(e.children[c].name=="embed"){if(!v.isFlashEmbed(e.children[c]))return null;if(q(e.children[c].attributes.src))return n.createFakeParserElement(e,
r,"bangpai-video",true)}return null}for(c=0;c<e.children.length;c++){var g=e.children[c];if(g.name=="param"&&g.attributes.name=="movie")if(q(g.attributes.value))return n.createFakeParserElement(e,r,"bangpai-video",true)}},embed:function(e){if(!v.isFlashEmbed(e))return null;if(q(e.attributes.src))return n.createFakeParserElement(e,r,"bangpai-video",true)}}},4);var s=[{reg:/youku\.com/i,width:480,height:400,detect:function(e){if(/\.swf$/.test(e))return e}},{reg:/tudou\.com/i,width:480,height:400,detect:function(e){if(/\.swf$/.test(e))return e}},
{reg:/ku6\.com/i,width:480,height:400,detect:function(e){if(/\.swf$/.test(e))return e}}];m.BangPaiVideo||function(){function e(){e.superclass.constructor.apply(this,arguments)}function c(b){return b._4e_ascendant(function(f){return f._4e_name()==="img"&&!!f.hasClass(r)},true)}var g=["img."+r];o.extend(e,v,{_config:function(){this._cls=r;this._type="bangpai-video";this._title="\u89c6\u9891\u5c5e\u6027";this._bodyHtml="<p style='margin-bottom:5px'>\u9700\u8981\u5206\u4eab\u7684\u89c6\u9891\u94fe\u63a5\uff1a\u652f\u6301 \u571f\u8c46\uff0c\u4f18\u9177\uff0cku6 \u89c6\u9891\u5206\u4eab</p><p><label><span style='color:#0066CC;font-weight:bold;'>\u89c6\u9891\u94fe\u63a5\uff1a </span><input class='ke-video-url' style='width:230px' value='\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf'/></label></p><p style='margin:5px 0'><label>\u5bf9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u9f50\uff1a <select class='ke-video-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select><p>";
this._footHtml="<button class='ke-video-ok'>\u786e\u5b9a</button> <button class='ke-video-cancel'>\u53d6\u6d88</button>";this._contentCls="ke-toolbar-flash";this._tip="\u63d2\u5165\u89c6\u9891";this._contextMenu=w;this._flashRules=g},_initD:function(){var b=this,f=b.d;b.dUrl=f.el.one(".ke-video-url");b.dAlign=f.el.one(".ke-video-align");var x=f.el.one(".ke-video-ok");f=f.el.one(".ke-video-cancel");x.on("click",b._gen,b);f.on("click",function(){b.d.hide()})},_getDInfo:function(){var b=this.dUrl.val(),
f=q(b);if(f){(b=f.detect(b))||alert("\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf");return{url:b,attrs:{height:f.height,width:f.width,align:this.dAlign.val()}}}else alert("\u4e0d\u652f\u6301\u8be5\u94fe\u63a5\u6765\u6e90!")},_getFlashUrl:function(b){return y(b)},_updateD:function(){var b=this.editor,f=this.selectedFlash;if(f){b=b.restoreRealElement(f);this.dUrl.val(this._getFlashUrl(b));this.dAlign.val(b.attr("align"))}else{this.dUrl.val("\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf");
this.dAlign.val("")}}});v.registerBubble("bangpai-video","\u89c6\u9891\u94fe\u63a5\uff1a ",c);m.BangPaiVideo=e;var w={"\u89c6\u9891\u5c5e\u6027":function(b){var f=b.getSelection();f=(f=f&&f.getStartElement())&&c(f);b=b._toolbars["bangpai-video"];f&&b.show(null,f)}}}();t.addPlugin(function(){new m.BangPaiVideo(t)})},{attach:false,requires:["flashsupport"]});
KISSY.Editor.add("bangpai-video",function(t){function q(e){for(var c=0;c<s.length;c++){var g=s[c];if(g.reg.test(e))return g}}var o=KISSY,m=o.Editor,r="ke_video",y=m.Utils.getFlashUrl,v=m.Flash,n=t.htmlDataProcessor,p=n&&n.dataFilter;p&&p.addRules({elements:{object:function(e){var c=e.attributes;if(!(c.classid&&String(c.classid).toLowerCase())){for(c=0;c<e.children.length;c++)if(e.children[c].name=="embed"){if(!v.isFlashEmbed(e.children[c]))return null;if(q(e.children[c].attributes.src))return n.createFakeParserElement(e,
r,"bangpai-video",true)}return null}for(c=0;c<e.children.length;c++){var g=e.children[c];if(g.name=="param"&&g.attributes.name=="movie")if(q(g.attributes.value))return n.createFakeParserElement(e,r,"bangpai-video",true)}},embed:function(e){if(!v.isFlashEmbed(e))return null;if(q(e.attributes.src))return n.createFakeParserElement(e,r,"bangpai-video",true)}}},4);var s=[{reg:/youku\.com/i,width:480,height:400,detect:function(e){if(/\.swf$/.test(e))return e}},{reg:/tudou\.com/i,width:480,height:400,detect:function(e){if(/\.swf$/.test(e))return e}},
{reg:/ku6\.com/i,width:480,height:400,detect:function(e){if(/\.swf$/.test(e))return e}}];m.BangPaiVideo||function(){function e(){e.superclass.constructor.apply(this,arguments)}function c(b){return b._4e_ascendant(function(f){return f._4e_name()==="img"&&!!f.hasClass(r)},true)}var g=["img."+r];o.extend(e,v,{_config:function(){this._cls=r;this._type="bangpai-video";this._title="\u89c6\u9891\u5c5e\u6027";this._bodyHtml="<p style='margin-bottom:5px'>\u9700\u8981\u5206\u4eab\u7684\u89c6\u9891\u94fe\u63a5\uff1a\u652f\u6301 \u571f\u8c46\uff0c\u4f18\u9177\uff0cku6 \u89c6\u9891\u5206\u4eab</p><p><label><span style='color:#0066CC;font-weight:bold;'>\u89c6\u9891\u94fe\u63a5\uff1a </span><input class='ke-video-url' style='width:230px' value='\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf'/></label></p><p style='margin:5px 0'><label>\u5bf9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u9f50\uff1a <select class='ke-video-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select><p>";
this._footHtml="<button class='ke-video-ok'>\u786e\u5b9a</button> <button class='ke-video-cancel'>\u53d6\u6d88</button>";this._contentCls="ke-toolbar-flash";this._tip="\u63d2\u5165\u89c6\u9891";this._contextMenu=w;this._flashRules=g},_initD:function(){var b=this,f=b.d;b.dUrl=f.el.one(".ke-video-url");b.dAlign=f.el.one(".ke-video-align");var x=f.el.one(".ke-video-ok");f=f.el.one(".ke-video-cancel");x.on("click",b._gen,b);f.on("click",function(){b.d.hide()})},_getDInfo:function(){var b=this.dUrl.val(),
f=q(b);if(f){(b=f.detect(b))||alert("\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf");return{url:b,attrs:{height:f.height,width:f.width,align:this.dAlign.val()}}}else alert("\u4e0d\u652f\u6301\u8be5\u94fe\u63a5\u6765\u6e90!")},_getFlashUrl:function(b){return y(b)},_updateD:function(){var b=this.editor,f=this.selectedFlash;if(f){b=b.restoreRealElement(f);this.dUrl.val(this._getFlashUrl(b));this.dAlign.val(b.attr("align"))}else{this.dUrl.val("\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf");
this.dAlign.val("")}}});v.registerBubble("bangpai-video","\u89c6\u9891\u94fe\u63a5\uff1a ",c);m.BangPaiVideo=e;var w={"\u89c6\u9891\u5c5e\u6027":function(b){var f=b.getSelection();f=(f=f&&f.getStartElement())&&c(f);b=b._toolbars["bangpai-video"];f&&b.show(null,f)}}}();t.addPlugin(function(){new m.BangPaiVideo(t)})},{attach:false,requires:["flashsupport"]});
