KISSY.Editor.add("bangpai-music",function(v){var k=KISSY,s=k.UA,u=k.Event,o=k.Editor,w=k.DOM,p=k.Node,z=o.Config.base+"theme/loading.gif",t=o.Flash,a="ke_xiami",c=v.htmlDataProcessor,j=c&&c.dataFilter;j&&j.addRules({elements:{object:function(g){var d=g.attributes,e=g.attributes.title,l;if(!(d.classid&&String(d.classid).toLowerCase())){for(d=0;d<g.children.length;d++){l=g.children[d];if(l.name=="embed"){if(!t.isFlashEmbed(l))break;if(/xiami\.com/i.test(l.attributes.src))return c.createFakeParserElement(g,
a,"bangpai-music",true,{title:e})}}return null}for(d=0;d<g.children.length;d++){l=g.children[d];if(l.name=="param"&&l.attributes.name=="movie")if(/xiami\.com/i.test(l.attributes.value))return c.createFakeParserElement(g,a,"bangpai-music",true,{title:e})}},embed:function(g){if(!t.isFlashEmbed(g))return null;if(/xiami\.com/i.test(g.attributes.src))return c.createFakeParserElement(g,a,"bangpai-music",true,{title:g.attributes.title})}}},4);o.BangPaiMusic||function(){function g(f){g.superclass.constructor.apply(this,
arguments);f.cfg.disableObjectResizing||u.on(f.document.body,s.ie?"resizestart":"resize",function(b){w.hasClass(b.target,a)&&b.preventDefault()})}function d(f){return r.replace(/\${([^}]+)}/g,function(b,i){return f[i]})}function e(f,b,i){return"<a class='ke-xiami-page-item ke-button"+(f==b?" ke-xiami-curpage":"")+"' data-value='"+b+"' href='#'>"+(i||b)+"</a>"}function l(f){return f._4e_name()==="img"&&!!f.hasClass(a)&&f}w.addStyleSheet(".ke-xiami-list {margin:10px 0 10px 0;padding:10px 40px 0 40px;border-top:1px solid #CED5E0;display:none;}.ke-xiami-list li{border:1px solid #CED5E0;border-width:0 0 1px 0;overflow:hidden;zoom:1;padding:2px;}.ke-xiami-list .ke-xiami-add {float:right;}.ke-xiami-list .ke-xiami-song {float:left;width:300px;white-space:nowrap;overflow:hidden;}.ke-xiami-paging a{display: inline-block; zoom: 1;  *display: inline; padding:1px 7px;margin:0 3px;}.ke-xiami-paging a:hover,.ke-xiami-paging a.ke-xiami-curpage {color:red;text-decoration:none;}.ke-xiami-paging {text-align:center;margin-top:20px;}.ke-xiami-page-more {padding:0 10px;}",
"BangPaiMusic");window.bangpai_xiami=function(f){var b=bangpai_xiami.instance;f.page=bangpai_xiami.page;b._listSearch(f)};var r="http://www.xiami.com/app/nineteen/search/key/${key}/page/${page}?random=${random}&callback=bangpai_xiami";k.extend(g,t,{_config:function(){this._cls=a;this._type="bangpai-music";this._title="\u867e\u7c73\u5c5e\u6027";this._bodyHtml="<div style='padding:20px 0;'><form action='#' class='ke-xiami-form' style='margin:0 20px;'><p class='ke-xiami-title'></p><p class='ke-xiami-url-wrap'><input class='ke-xiami-url ke-input' style='width:350px;vertical-align:middle;'/> &nbsp;  <button class='ke-xiami-submit'>\u641c \u7d22</button></p><p style='margin:10px 0'><label>\u5bf9 \u9f50\uff1a <select class='ke-xiami-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select><label style='margin-left:45px;'>\u95f4\u8ddd\uff1a </span> <input  data-verify='^\\d+(.\\d+)?$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6570\u5b57' class='ke-xiami-margin ke-input' style='width:60px' value='5'/> \u50cf\u7d20</label></p></form><div class='ke-xiami-list'></div></div>";
this._footHtml="<button class='ke-xiami-ok ke-button'>\u786e&nbsp;\u5b9a</button><button class='ke-xiami-cancel ke-button' style='margin-left:20px;'>\u53d6&nbsp;\u6d88</button>";this._contentCls="ke-toolbar-music";this._tip="\u63d2\u5165\u867e\u7c73\u97f3\u4e50";this._contextMenu=x;this._flashRules=["img."+a];this._config_dwidth="480px"},_updateTip:function(f,b){var i=this.editor.restoreRealElement(b);if(i){f.html(b.attr("title"));f.attr("href",this._getFlashUrl(i))}},_initD:function(){function f(q){var n=m.val();if(n.replace(/[^\x00-\xff]/g,"@@").length>
30)alert("\u957f\u5ea6\u4e0a\u965030\u4e2a\u5b57\u7b26\uff081\u4e2a\u6c49\u5b57=2\u4e2a\u5b57\u7b26\uff09");else if(k.trim(n)){b._xiami_submit.disable();n={key:encodeURIComponent(m.val()),page:q,random:(new Date).valueOf()};n=d(n);bangpai_xiami.instance=b;bangpai_xiami.page=q;b._xiamia_list.html("<img style='display:block;width:32px;height:32px;margin:5px auto 0 auto;'src='"+z+"'/><p style='width: 130px; margin: 15px auto 0; color: rgb(150, 150, 150);'>\u6b63\u5728\u641c\u7d22\uff0c\u8bf7\u7a0d\u5019......</p>");b._xiamia_list.show();var y=k.getScript(n,{timeout:10,success:function(){},error:function(){y.src=
"";b._xiami_submit.enable();b._xiamia_list.html("<p style='text-align:center;margin:10px 0;'>\u4e0d\u597d\u610f\u601d\uff0c\u8d85\u65f6\u4e86\uff0c\u8bf7\u91cd\u8bd5\uff01</p>")}})}else alert("\u4e0d\u80fd\u4e3a\u7a7a\uff01")}var b=this,i=b.editor,h=b.d;h.el.one(".ke-xiami-form");var m=h.el.one(".ke-xiami-url");b.dAlign=o.Select.decorate(h.el.one(".ke-xiami-align"));b._xiami_input=m;o.Utils.placeholder(m,"\u8f93\u5165\u6b4c\u66f2\u540d\u3001\u4e13\u8f91\u540d\u3001\u827a\u4eba\u540d");b._xiamia_list=h.el.one(".ke-xiami-list");b._xiami_submit=new o.TripleButton({el:h.el.one(".ke-xiami-submit"),cls:"ke-button",text:"\u641c&nbsp;\u7d22"});b._xiami_submit.on("offClick",
function(){f(1)});m.on("keydown",function(q){q.keyCode===13&&f(1)});b.dMargin=h.el.one(".ke-xiami-margin");b._xiami_url_wrap=h.el.one(".ke-xiami-url-wrap");b._xiamia_title=h.el.one(".ke-xiami-title");var A=h.foot.one(".ke-xiami-ok");h.foot.one(".ke-xiami-cancel").on("click",function(){h.hide()});A.on("click",function(){var q=b.selectedFlash,n=i.restoreRealElement(q);b._dinfo={url:b._getFlashUrl(n),attrs:{title:q.attr("title"),align:b.dAlign.val(),style:"margin:"+(parseInt(b.dMargin.val())||0)+"px;"}};
b._gen()},b);b._xiamia_list.on("click",function(q){q.preventDefault();var n=new p(q.target);q=n._4e_ascendant(function(y){return b._xiamia_list._4e_contains(y)&&y.hasClass("ke-xiami-add")},true);n=n._4e_ascendant(function(y){return b._xiamia_list._4e_contains(y)&&y.hasClass("ke-xiami-page-item")},true);if(q){b._dinfo={url:"http://www.xiami.com/widget/"+q.attr("data-value")+"/singlePlayer.swf",attrs:{title:q.attr("title"),align:b.dAlign.val(),style:"margin:"+(parseInt(b.dMargin.val())||0)+"px;"}};
b._gen()}else n&&f(parseInt(n.attr("data-value")))})},_listSearch:function(f){var b,i=f.results,h="";if(f.key==k.trim(this._xiami_input.val())){this._xiami_submit.enable();if(i&&i.length){h="<ul>";for(b=0;b<i.length;b++){var m=i[b],A=decodeURIComponent(m.song_name)+" - "+decodeURIComponent(m.artist_name);h=h;var q="<li title='"+A+"'><span class='ke-xiami-song'>",n=A;if(n.length>35)n=n.substring(0,35)+"...";h=h+(q+n+"</span><a href='#' title='"+A+"' class='ke-xiami-add' data-value='"+(m.album_id+"_"+
m.song_id)+"'>\u6dfb\u52a0</a></li>")}h+="</ul>";i=f.page;f=Math.floor(f.total/8);b=i-1;m=i+1;if(f>1){h+="<p class='ke-xiami-paging'>";if(b<=2){m=Math.min(2-b+m,f-1);b=2}m=Math.min(m,f-1);if(m==f-1)b=Math.max(2,m-3);if(i!=1)h+=e(i,i-1,"\u4e0a\u4e00\u9875");h+=e(i,1,"1");if(b!=2)h+="<span class='ke-xiami-page-more'>...</span>";for(b=b;b<=m;b++)h+=e(i,b);if(m!=f){if(m!=f-1)h+="<span class='ke-xiami-page-more'>...</span>";h+=e(i,f,f)}if(i!=f)h+=e(i,i+1,"\u4e0b\u4e00\u9875");h+="</p>"}}else h="<p style='text-align:center;margin:10px 0;'>\u4e0d\u597d\u610f\u601d\uff0c\u6ca1\u6709\u627e\u5230\u7ed3\u679c\uff01</p>";
this._xiamia_list.html(h)}},_updateD:function(){var f=this.selectedFlash;if(f){this._xiami_input.val(f.attr("title"));this._xiamia_title.html(f.attr("title"));this.dAlign.val(f.attr("align"));this.dMargin.val(parseInt(f._4e_style("margin"))||0);this._xiami_url_wrap.hide();this.d.foot.show();this._xiamia_title.show()}else{o.Utils.resetInput(this._xiami_input);this.dAlign.val("");this.dMargin.val("5");this._xiami_url_wrap.show();this.d.foot.hide();this._xiamia_title.hide();this._xiami_submit.enable()}this._xiamia_list.hide();
this._xiamia_list.html("")},_getDInfo:function(){k.mix(this._dinfo.attrs,{width:257,height:33});return this._dinfo}});var x={"\u867e\u7c73\u5c5e\u6027":function(f){var b=f.getSelection();b=b&&b.getStartElement();b=l(b);f=f._toolbars["bangpai-music"];b&&f.show(null,b)}};t.registerBubble("bangpai-music","\u867e\u7c73\u97f3\u4e50\uff1a ",l);o.BangPaiMusic=g}();v.addPlugin(function(){new o.BangPaiMusic(v)})},{attach:false,requires:["flashsupport"]});
KISSY.Editor.add("bangpai-upload",function(v){var k=KISSY,s=k.Editor;if(!s.BangPaiUpload){(function(){function u(a){this.editor=a;this._init()}var o=k.DOM,w=k.JSON,p=k.Node,z=s.Config.base+s.Utils.debugUrl("plugins/uploader/uploader.swf"),t={};name="ke-bangpai-upload";o.addStyleSheet(".ke-upload-list {width:100%;}.ke-upload-list th {border-top:1px solid #c1c8d1;background-color:#EBEDF1;}.ke-upload-list td,.ke-upload-list th {padding:0.5em;text-align:center;border-bottom:1px solid #c1c8d1;}","ke-BangPaiUpload");
k.augment(u,k.EventTarget,{_init:function(){var a=this,c=a.editor,j=c.cfg.pluginConfig["bangpai-upload"],g=j.holder;g=k.isString(g)?k.one(g):g;var d=(new p("<div style='position:relative;margin:10px;'>\u6279\u91cf\u4e0a\u4f20\u56fe\u7247\uff1a</div>")).appendTo(g);g=(new p("<div style='display:none'>")).appendTo(g);var e=(new p("<button disabled='disabled'>\u6d4f\u89c8</button>")).appendTo(d),l=e.offset();d.offset();d=(new p("<div style='"+("position:absolute;width:"+(e.width()+8)+"px;height:"+(e.height()+8)+"px;z-index:9999;")+"'>")).appendTo(d);
var r=(new p("<div><table class='ke-upload-list'><thead><tr><th>\u5e8f\u53f7</th><th>\u56fe\u7247</th><th>\u5927\u5c0f</th><th>\u4e0a\u4f20\u8fdb\u5ea6</th><th>\u56fe\u7247\u64cd\u4f5c</th></tr></thead><tbody></tbody></table></div>")).appendTo(g).one("tbody"),x=(new p("<p style='margin:10px;text-align:right;'><button>\u786e\u5b9a\u4e0a\u4f20</button></p>")).appendTo(g).one("button"),f=k.guid(name);a.btn=e;a.up=x;d.offset(l);var b=new s.FlashBridge({movie:z,methods:["removeFile","cancel","removeFile","disable","enable","setAllowMultipleFiles","setFileFilters","uploadAll"],holder:d,attrs:{width:e.width(),
height:e.height()},params:{wmode:"transparent"},flashVars:{allowedDomain:location.hostname,menu:true}});a.uploader=b;a._list=r;a._listWrap=g;a._ds=j.serverUrl;a._dsp=j.serverParams||{};a._fileInput=j.fileInput||"Filedata";a._sizeLimit=j.sizeLimit||1E3;a._numberLimit=j.numberLimit||15;r.on("click",function(i){var h=new p(i.target);i.halt();if(h.hasClass("ke-upload-insert")){i=h.parent("tr");url=i.attr("url");c.insertElement(new p("<img src='"+url+"'/>",null,c.document))}else if(h.hasClass("ke-upload-delete")){i=
h.parent("tr");f=i.attr("fid");try{b.cancel(f)}catch(m){}b.removeFile(f);t[f].destroy();delete t[f];i._4e_remove();a.enable();a._seqPics()}});b.on("fileSelect",a._onSelect,a);b.on("uploadStart",a._onUploadStart,a);b.on("uploadProgress",a._onProgress,a);b.on("uploadComplete",a._onComplete,a);b.on("uploadCompleteData",a._onUploadCompleteData,a);b.on("swfReady",a._ready,a);b.on("uploadError",a._uploadError,a)},_uploadError:function(a){var c=a.id,j=this._getFileTr(c);c=t[c];if(j){c&&c.destroy();j.one(".ke-upload-progress").html("<span style='color:red'>"+
a.status+"</span>")}},_getFileTr:function(a){for(var c=this._list.all("tr"),j=0;j<c.length;j++){var g=new p(c[j]);if(g.attr("fid")==a)return g}},_onUploadStart:function(a){this.uploader.removeFile(a.id)},_onComplete:function(){},_onUploadCompleteData:function(a){var c=k.trim(a.data).replace(/\\r||\\n/g,"");a=a.id;if(c){c=w.parse(c);if(c.error)this._uploadError({id:a,status:c.error});else if(a=this._getFileTr(a)){a.one(".ke-upload-insert").show();a.attr("url",c.imgUrl)}}},_onProgress:function(a){var c=
Math.floor(a.bytesLoaded*100/a.bytesTotal);(a=t[a.id])&&a.set("progress",c)},disable:function(){this.uploader.disable();this.btn[0].disabled=true},enable:function(){this.uploader.enable();this.btn[0].disabled=false},_seqPics:function(){var a=1;this._list.all(".ke-upload-seq").each(function(c){c.html(a++)})},_getFilesSize:function(a){var c=0,j;for(j in a)c++;return c},_onSelect:function(a){var c=this.uploader,j=this._list,g=0;a=a.fileList;var d=this._numberLimit-j.all("tr").length;if(a){var e=this._getFilesSize(a);
e>d&&alert("\u7cfb\u7edf\u5c06\u53ea\u4fdd\u7559n\u5f20".replace(/n/,this._numberLimit));e>=d&&this.disable();this._listWrap.show();for(var l in a)if(a.hasOwnProperty(l)){var r=a[l];if(!this._getFileTr(r.id)){e=Math.floor(r.size/1E3);var x=r.id;g++;if(g>d)c.removeFile(x);else{r=(new p("<tr fid='"+x+"'><td class='ke-upload-seq'></td><td>"+r.name+"</td><td>"+e+"k</td><td class='ke-upload-progress'></td><td><a href='#' class='ke-upload-insert' style='display:none'>[\u63d2\u5165]</a> &nbsp; <a href='#' class='ke-upload-delete'>[\u5220\u9664]</a> &nbsp; </td></tr>")).appendTo(j);
r.one(".ke-upload-progress");if(e>this._sizeLimit){this._uploadError({id:x,status:"\u56fe\u7247\u4e0d\u80fd\u8d85\u8fc7nKB".replace(/n/,this._sizeLimit)});c.removeFile(x)}else t[x]=new s.ProgressBar({container:r.one(".ke-upload-progress"),width:"100px",height:"18px"})}}}this._seqPics()}},_ready:function(){var a=this,c=a.uploader,j=a.up;a.btn[0].disabled=false;c.setAllowMultipleFiles(true);c.setFileFilters([{extensions:"*.jpeg;*.jpg;*.png;*.gif",description:"\u56fe\u7247\u6587\u4ef6( png,jpg,jpeg,gif )"}]);j.on("click",function(g){g.halt();c.uploadAll(a._ds,
"POST",a._dsp,a._fileInput)})}});s.BangPaiUpload=u})();v.addPlugin(function(){new s.BangPaiUpload(v)})}},{attach:false,requires:["flashutils","progressbar","flashbridge"]});
KISSY.Editor.add("bangpai-video",function(v){function k(a){for(var c=0;c<t.length;c++){var j=t[c];if(j.reg.test(a))return j}}var s=KISSY,u=s.Editor,o="ke_video",w=u.Flash,p=v.htmlDataProcessor,z=p&&p.dataFilter;z&&z.addRules({elements:{object:function(a){var c=a.attributes;if(!(c.classid&&String(c.classid).toLowerCase())){for(c=0;c<a.children.length;c++)if(a.children[c].name=="embed"){if(!w.isFlashEmbed(a.children[c]))break;if(k(a.children[c].attributes.src))return p.createFakeParserElement(a,o,"bangpai-video",
true)}return null}for(c=0;c<a.children.length;c++){var j=a.children[c];if(j.name=="param"&&j.attributes.name=="movie")if(k(j.attributes.value))return p.createFakeParserElement(a,o,"bangpai-video",true)}},embed:function(a){if(!w.isFlashEmbed(a))return null;if(k(a.attributes.src))return p.createFakeParserElement(a,o,"bangpai-video",true)}}},4);var t=[{reg:/youku\.com/i,width:480,height:400,detect:function(a){var c=a.match(/id_([^.]+)\.html$/);if(c)return"http://player.youku.com/player.php/sid/"+c[1]+
"/v.swf";a.match(/v_playlist\/([^.]+)\.html$/);return a}},{reg:/tudou\.com/i,width:480,height:400,detect:function(a){return a}},{reg:/ku6\.com/i,width:480,height:400,detect:function(a){var c=a.match(/show[^\/]*\/([^.]+)\.html$/);if(c)return"http://player.ku6.com/refer/"+c[1]+"/v.swf";return a}}];u.BangPaiVideo||function(){function a(){a.superclass.constructor.apply(this,arguments)}function c(d){return d._4e_name()==="img"&&!!d.hasClass(o)&&d}var j=["img."+o];s.extend(a,w,{_config:function(){var d=
this.editor.cfg.pluginConfig;this._cls=o;this._type="bangpai-video";this._title="\u89c6\u9891\u5c5e\u6027";this._bodyHtml="<div style='padding:20px 20px 0 20px'><p><label><span>\u94fe\u63a5\uff1a </span><input class='ke-video-url ke-input' style='width:300px'/></label></p><table style='margin:10px 0 5px  40px;width:300px;'><tr><td><label>\u5bbd\u5ea6\uff1a </span> <input  data-verify='^\u81ea\u52a8|((?!0$)\\d+(.\\d+)?)$'  data-warning='\u5bbd\u5ea6\u8bf7\u8f93\u5165\u6b63\u6570' class='ke-video-width ke-input' style='width:60px' value='\u81ea\u52a8'/> \u50cf\u7d20</label></td><td><label> \u9ad8\u5ea6\uff1a </span> <input  data-verify='^\u81ea\u52a8|((?!0$)\\d+(.\\d+)?)$'  data-warning='\u9ad8\u5ea6\u8bf7\u8f93\u5165\u6b63\u6570' class='ke-video-height ke-input' style='width:60px' value='\u81ea\u52a8'/> \u50cf\u7d20</label></td></tr><tr><td><label>\u5bf9\u9f50\uff1a <select class='ke-video-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></td><td><label>\u95f4\u8ddd\uff1a </span> <input  data-verify='^\\d+(.\\d+)?$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6570\u5b57' class='ke-video-margin ke-input' style='width:60px' value='5'/> \u50cf\u7d20</label></td></tr></table></div>";
this._footHtml="<button class='ke-video-ok ke-button' style='margin-left:40px;margin-right:20px;'>\u786e\u5b9a</button> <a style='cursor:pointer' class='ke-video-cancel'>\u53d6\u6d88</a>";this._contentCls="ke-toolbar-video";this._tip="\u63d2\u5165\u89c6\u9891";this._contextMenu=g;this._flashRules=j;this.urlCfg=d["bangpai-video"]&&d["bangpai-video"].urlCfg;this._urlTip="\u652f\u6301 \u571f\u8c46\uff0c\u4f18\u9177\uff0cku6 \u89c6\u9891\u5206\u4eab";this._config_dwidth="400px"},_initD:function(){var d=this.d,e=d.el;this.dUrl=e.one(".ke-video-url");this.dAlign=u.Select.decorate(e.one(".ke-video-align"));
this.dMargin=e.one(".ke-video-margin");this.dWidth=e.one(".ke-video-width");this.dHeight=e.one(".ke-video-height");var l=e.one(".ke-video-ok");e=e.one(".ke-video-cancel");l.on("click",this._gen,this);e.on("click",function(){d.hide()});u.Utils.placeholder(this.dUrl,this._urlTip)},_getDInfo:function(){var d=this.dUrl.val(),e=k(d);if(e){if(d=e.detect(d))return{url:d,attrs:{height:parseInt(this.dHeight.val())||e.height,width:parseInt(this.dWidth.val())||e.width,align:this.dAlign.val(),style:"margin:"+
(parseInt(this.dMargin.val())||0)+"px;"}}}else alert("\u4e0d\u652f\u6301\u8be5\u94fe\u63a5\u6765\u6e90!")},_gen:function(){var d=this.dUrl.val(),e=this.urlCfg;if(e)for(var l=0;l<e.length;l++){var r=e[l];if(r.reg.test(d)){this.d.loading();a.dynamicUrl.origin=d;a.dynamicUrl.instance=this;s.getScript(r.url.replace(/@url@/,encodeURIComponent(d)).replace(/@callback@/,encodeURIComponent("KISSY.Editor.BangPaiVideo.dynamicUrl")));return}}a.superclass._gen.call(this)},_dynamicUrlPrepare:function(d){this.dUrl.val(d);this.d.unloading();a.superclass._gen.call(this)},
_updateD:function(){var d=this.editor,e=this.selectedFlash;if(e){d=d.restoreRealElement(e);this.dUrl.val(this._getFlashUrl(d));this.dAlign.val(d.attr("align"));this.dMargin.val(parseInt(d._4e_style("margin"))||0);e.css("width")&&this.dWidth.val(parseInt(e.css("width")));e.css("height")&&this.dHeight.val(parseInt(e.css("height")))}else{u.Utils.resetInput(this.dUrl);this.dAlign.val("");this.dMargin.val("5");this.dWidth.val("\u81ea\u52a8");this.dHeight.val("\u81ea\u52a8")}}});a.dynamicUrl=function(d,e){d===a.dynamicUrl.origin&&
a.dynamicUrl.instance._dynamicUrlPrepare(e)};w.registerBubble("bangpai-video","\u89c6\u9891\u94fe\u63a5\uff1a ",c);u.BangPaiVideo=a;var g={"\u89c6\u9891\u5c5e\u6027":function(d){var e=d.getSelection();e=(e=e&&e.getStartElement())&&c(e);d=d._toolbars["bangpai-video"];e&&d.show(null,e)}}}();v.addPlugin(function(){new u.BangPaiVideo(v)})},{attach:false,requires:["flashsupport"]});
