KISSY.Editor.add("bangpai-music",function(s){var k=KISSY,v=k.UA,w=k.Event,m=k.Editor,t=k.DOM,x=k.Node,y=m.Config.base+"theme/loading.gif",r=m.Flash,l="ke_xiami",p=s.htmlDataProcessor,u=p&&p.dataFilter;u&&u.addRules({elements:{object:function(e){var i=e.attributes,n=e.attributes.title,j;if(!(i.classid&&String(i.classid).toLowerCase())){for(i=0;i<e.children.length;i++){j=e.children[i];if(j.name=="embed"){if(!r.isFlashEmbed(j))break;if(/xiami\.com/i.test(j.attributes.src))return p.createFakeParserElement(e,
l,"bangpai-music",true,{title:n})}}return null}for(i=0;i<e.children.length;i++){j=e.children[i];if(j.name=="param"&&j.attributes.name=="movie")if(/xiami\.com/i.test(j.attributes.value))return p.createFakeParserElement(e,l,"bangpai-music",true,{title:n})}},embed:function(e){if(!r.isFlashEmbed(e))return null;if(/xiami\.com/i.test(e.attributes.src))return p.createFakeParserElement(e,l,"bangpai-music",true,{title:e.attributes.title})}}},4);m.BangPaiMusic||function(){function e(b){e.superclass.constructor.apply(this,
arguments);b.cfg.disableObjectResizing||w.on(b.document.body,v.ie?"resizestart":"resize",function(a){t.hasClass(a.target,l)&&a.preventDefault()})}function i(b){return z.replace(/\${([^}]+)}/g,function(a,d){return b[d]})}function n(b,a,d){return"<a class='ke-xiami-page-item"+(b==a?" ke-xiami-curpage":"")+"' data-value='"+a+"' href='#'>"+(d||a)+"</a>"}function j(b){return b._4e_name()==="img"&&!!b.hasClass(l)&&b}t.addStyleSheet(".ke-xiami-list {margin-top:10px;}.ke-xiami-list li{border:1px dotted gray;border-width:0 0 1px 0;overflow:hidden;zoom:1;padding:2px;}\n.ke-xiami-list .ke-xiami-add {float:right;}\n.ke-xiami-list .ke-xiami-song {float:left;}\n.ke-xiami-paging a{display: inline-block; zoom: 1;  *display: inline; border:1px solid gray;padding:0 5px;margin:0 2px;}\n.ke-xiami-paging a:hover,.ke-xiami-paging a.ke-xiami-curpage {background-color:orange;}\n.ke-xiami-paging {text-align:center;margin-top:10px;}\n",
"BangPaiMusic");window.bangpai_xiami=function(b){var a=bangpai_xiami.instance;b.page=bangpai_xiami.page;a._listSearch(b)};var A="<form action='#' class='ke-xiami-form'><p class='ke-xiami-title'></p><p class='ke-xiami-url-wrap'><input class='ke-xiami-url' style='width:300px' value='输入想要添加的歌曲名、专辑名、艺人名'/> &nbsp;  <input class='ke-xiami-submit' type='submit' style='vertical-align:middle;' value='搜 索 ' /></p><p style='margin:5px 0'><label>对 齐： <select class='ke-xiami-align'><option value=''>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select>"+
m.Utils.duplicateStr("&nbsp;",1)+"<label>间距： </span> <input  data-verify='^\\d+(.\\d+)?$'  data-warning='间距请输入非负数字' class='ke-xiami-margin' style='width:60px' value='5'/> 像素</label></p></form><div class='ke-xiami-list'></div>",z="http://www.xiami.com/app/nineteen/search/key/${key}/page/${page}?random=${random}&callback=bangpai_xiami";k.extend(e,r,{_config:function(){this._cls=l;this._type="bangpai-music";this._title="虾米属性";this._bodyHtml=A;this._footHtml="<button class='ke-xiami-ok'>确定</button>";
this._contentCls="ke-toolbar-music";this._tip="插入虾米音乐";this._contextMenu=B;this._flashRules=["img."+l];this._config_dwidth="400px"},_updateTip:function(b,a){var d=this.editor.restoreRealElement(a);if(d){b.html(a.attr("title"));b.attr("href",this._getFlashUrl(d))}},_initD:function(){function b(f){a._xiami_submit[0].disabled=true;var g={key:encodeURIComponent(o.val()),page:f,random:(new Date).valueOf()};g=i(g);bangpai_xiami.instance=a;bangpai_xiami.page=f;a._xiamia_list.html("<img style='display:block;width:108px;margin:5px auto 0 auto;'src='"+
y+"'/>");k.getScript(g)}var a=this,d=a.editor,c=a.d,h=c.el.one(".ke-xiami-form"),o=c.el.one(".ke-xiami-url");a.dAlign=c.el.one(".ke-xiami-align");a._xiami_input=o;a._xiamia_list=c.el.one(".ke-xiami-list");a._xiami_submit=c.el.one(".ke-xiami-submit");a.dMargin=c.el.one(".ke-xiami-margin");a._xiami_url_wrap=c.el.one(".ke-xiami-url-wrap");a._xiamia_title=c.el.one(".ke-xiami-title");c.foot.one(".ke-xiami-ok").on("click",function(){var f=a.selectedFlash,g=d.restoreRealElement(f);a._dinfo={url:a._getFlashUrl(g),
attrs:{title:f.attr("title"),align:a.dAlign.val(),style:"margin:"+(parseInt(a.dMargin.val())||0)+"px;"}};a._gen()},a);h.on("submit",function(f){b(1);f.halt()},a);a._xiamia_list.on("click",function(f){f.preventDefault();var g=new x(f.target);f=g._4e_ascendant(function(q){return a._xiamia_list._4e_contains(q)&&q.hasClass("ke-xiami-add")},true);g=g._4e_ascendant(function(q){return a._xiamia_list._4e_contains(q)&&q.hasClass("ke-xiami-page-item")},true);if(f){a._dinfo={url:"http://www.xiami.com/widget/"+
f.attr("data-value")+"/singlePlayer.swf",attrs:{title:f.attr("title"),align:a.dAlign.val(),style:"margin:"+(parseInt(a.dMargin.val())||0)+"px;"}};a._gen()}else g&&b(parseInt(g.attr("data-value")))})},_listSearch:function(b){var a,d=b.results,c="";if(b.key==k.trim(this._xiami_input.val())){this._xiami_submit[0].disabled=false;if(d&&d.length){c="<ul>";for(a=0;a<d.length;a++){var h=d[a],o=decodeURIComponent(h.song_name)+" - "+decodeURIComponent(h.artist_name);c=c;var f="<li title='"+o+"'><span class='ke-xiami-song'>",
g=o;if(g.length>35)g=g.substring(0,35)+"...";c=c+(f+g+"</span><a href='#' title='"+o+"' class='ke-xiami-add' data-value='"+(h.album_id+"_"+h.song_id)+"'>选择</a></li>")}c+="</ul>";d=b.page;b=Math.floor(b.total/8);a=d-3;h=d+3;if(b>1){if(a<=2){h=Math.min(2-a+h,b-1);a=2}h=Math.min(h,b-1);if(h==b-1)a=Math.max(2,h-6);c+="<p class='ke-xiami-paging'>"+n(d,1,"1"+(a!=2?"...":""));for(a=a;a<=h;a++)c+=n(d,a);if(h!=b)c+=n(d,b,(h!=b-1?"...":"")+b);c+="</p>"}}else c="<p style='text-align:center;margin:10px 0;'>不好意思，没有找到结果！</p>";
this._xiamia_list.html(c)}},_updateD:function(){var b=this.selectedFlash;if(b){this._xiami_input.val(b.attr("title"));this._xiamia_title.html(b.attr("title"));this.dAlign.val(b.attr("align"));this.dMargin.val(parseInt(b._4e_style("margin"))||0);this._xiami_url_wrap.hide();this.d.foot.show();this._xiamia_title.show()}else{this._xiami_input.val("输入想要添加的歌曲名、专辑名、艺人名");this.dAlign.val("");this.dMargin.val("5");this._xiami_url_wrap.show();this.d.foot.hide();this._xiamia_title.hide()}this._xiami_submit[0].disabled=
false;this._xiamia_list.html("")},_getDInfo:function(){k.mix(this._dinfo.attrs,{width:257,height:33});return this._dinfo}});var B={"虾米属性":function(b){var a=b.getSelection();a=a&&a.getStartElement();a=j(a);b=b._toolbars["bangpai-music"];a&&b.show(null,a)}};r.registerBubble("bangpai-music","虾米音乐： ",j);m.BangPaiMusic=e}();s.addPlugin(function(){new m.BangPaiMusic(s)})},{attach:false,requires:["flashsupport"]});
