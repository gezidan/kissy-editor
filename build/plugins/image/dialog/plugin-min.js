KISSY.Editor.add("image/dialog",function(v){function M(){function i(a){if(a.files)return a.files[0].size;return 0}e=new c.Dialog({autoRender:true,width:500,headerContent:"\u56fe\u7247",bodyContent:N,footerContent:O,mask:true});o.call(k,e);var b=e.get("el"),d=b.one(".ke-img-cancel"),f=b.one(".ke-img-insert"),A=c.Utils.verifyInputs,l=b.one(".ke-img-setting");D=b.one(".ke-img-upload-form");m=b.one(".ke-img-local-url");w=new c.Tabs({tabs:b.one("ul.ke-tabs"),contents:b.one("div.ke-image-tabs-content-wrap")});o.call(k,
w);m.val(x);s=b.one(".ke-img-url");n=b.one(".ke-img-height");j=b.one(".ke-img-width");t=b.one(".ke-img-ratio");E=c.Select.decorate(b.one(".ke-img-align"));F=b.one(".ke-img-margin");var u=c.Utils.placeholder;u(s,P);u(n,G);u(j,G);n.on("keyup",function(){var a=parseInt(n.val());!a||!t[0].checked||t[0].disabled||!y||j.val(Math.floor(a*y))});o.call(k,n,s,j);j.on("keyup",function(){var a=parseInt(j.val());!a||!t[0].checked||t[0].disabled||!y||n.val(Math.floor(a/y))});o.call(k,j);d.on("click",function(a){e.hide();
a.halt()});o.call(k,d);var B=(new H("<a class='ke-button' style='position:absolute;z-index:"+c.baseZIndex(c.zIndexManager.LOADING_CANCEL)+";left:-9999px;top:-9999px;'>\u53d6\u6d88\u4e0a\u4f20</a>")).appendTo(document.body),z=null;B.on("click",function(a){a&&a.halt();e.unloading();if(z){Q.remove(z,"load");R.remove(z)}B.css({left:-9999,top:-9999});z=null});o.call(k,B);f.on("click",function(a){a&&a.halt();if(w.activate()=="local"&&g){if(A(l.all("input")))if(m.val()==x)alert("\u8bf7\u5148\u9009\u62e9\u6587\u4ef6!");else if(S.test(m.val())){a=i(p[0]);
if(C&&C<a/1E3)alert("\u4e0a\u4f20\u56fe\u7247\u6700\u5927\uff1a"+C/1E3+"M");else{e.loading();z=c.Utils.doFormUpload({form:D,callback:function(h){z=null;B.css({left:-9999,top:-9999});h=q.trim(h.responseText).replace(/\r|\n/g,"");e.unloading();try{h=T.parse(h)}catch(X){q.log(h);h=null}h||(h={error:"\u670d\u52a1\u5668\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5"});if(h.error)alert(h.error);else{s.val(h.imgUrl);I()}}},g.serverParams,g.serverUrl);a=e.get("el");var J=a.offset();B.css({left:J.left+a[0].offsetWidth/2.5,top:J.top+a[0].offsetHeight/1.5})}}else{alert(U);D[0].reset();m.val(x)}}else A(b.all("input"))&&
I()});o.call(k,f);if(g){g.extraHtml&&b.one(".ke-img-up-extraHtml").html(g.extraHtml);var K=b.one(".ke-image-up"),C=g&&g.sizeLimit;p=(new H("<input type='file' style='position:absolute;cursor:pointer;left:"+(V.ie?"360":"369")+"px;z-index:2;top:0px;height:26px;' size='1' name='"+(g.fileInput||"Filedata")+"'/>")).insertAfter(m);if(C)x="\u5355\u5f20\u56fe\u7247\u5bb9\u91cf\u4e0d\u8d85\u8fc7 "+C/1E3+" M";m.val(x);p.css({opacity:0});p.on("mouseenter",function(){K.addClass("ke-button-hover")});p.on("mouseleave",function(){K.removeClass("ke-button-hover")});
p.on("change",function(){var a=p.val();m.val(a.replace(/.+[\/\\]/,""))});o.call(k,p)}else w.remove("local")}function I(){var i=s.val(),b=parseInt(n.val()),d=parseInt(j.val()),f=E.val(),A=parseInt(F.val()),l="";if(b)l+="height:"+b+"px;";if(d)l+="width:"+d+"px;";if(f)l+="float:"+f+";";isNaN(A)||(l+="margin:"+A+"px;");e.hide();if(r){v.fire("save");r.attr({src:i,style:l});v.fire("save")}else{b=new H("<img "+(l?"style='"+l+"'":"")+" src='"+i+"' alt='' />",null,v.document);v.insertElement(b,function(u){u.on("abort error",
function(){u.detach();u[0].src=i})})}}var q=KISSY,c=q.Editor,R=q.DOM,V=q.UA,T=q.JSON,H=q.Node,Q=q.Event,P="http://",G="\u81ea\u52a8",N="<div class='ke-image-wrap'><ul class='ke-tabs ks-clear'><li rel='remote'>\u7f51\u7edc\u56fe\u7247</li><li rel='local'>\u672c\u5730\u4e0a\u4f20</li></ul><div style='padding:12px 20px 5px 20px;'><div class='ke-image-tabs-content-wrap' ><div><label><span class='ke-image-title'>\u56fe\u7247\u5730\u5740\uff1a </span><input  data-verify='^(https?:/)?/[^\\s]+$'  data-warning='\u7f51\u5740\u683c\u5f0f\u4e3a\uff1ahttp:// \u6216 /' class='ke-img-url ke-input' style='width:390px;' /></label></div><div style='position:relative;'><form class='ke-img-upload-form'><p style='zoom:1;'><input class='ke-input ke-img-local-url' readonly='readonly' style='margin-right: 15px; vertical-align: middle; width: 368px;color:#969696;'/><a style='padding:3px 11px;position:absolute;left:390px;top:0px;z-index:1;' class='ke-image-up ke-button'>\u6d4f\u89c8...</a></p><div class='ke-img-up-extraHtml'></div></form></div></div><table style='width:100%;margin-top:8px;' class='ke-img-setting'><tr><td><label>\u5bbd\u5ea6\uff1a <input  data-verify='^("+
G+"|((?!0$)\\d+))?$'  data-warning='\u5bbd\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570' class='ke-img-width ke-input' style='vertical-align:middle;width:60px' /> \u50cf\u7d20 </label></td><td><label>\u9ad8\u5ea6\uff1a <input  data-verify='^("+G+"|((?!0$)\\d+))?$'  data-warning='\u9ad8\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570' class='ke-img-height ke-input' style='vertical-align:middle;width:60px' /> \u50cf\u7d20 </label><label><input type='checkbox' class='ke-img-ratio' style='vertical-align:middle;margin-left:5px;' checked='checked'/> \u9501\u5b9a\u9ad8\u5bbd\u6bd4</label></td></tr><tr><td><label>\u5bf9\u9f50\uff1a<select class='ke-img-align'><option value='none'>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></label></td><td><label>\u95f4\u8ddd\uff1a <input  data-verify='^\\d+$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6574\u6570' class='ke-img-margin ke-input' style='width:60px' value='0'/> \u50cf\u7d20</label></td></tr></table></div></div>",
O="<div style='padding:5px 20px 20px;'><a class='ke-img-insert ke-button' style='margin-right:30px;'>\u786e\u5b9a</a> <a  class='ke-img-cancel ke-button'>\u53d6\u6d88</a></div>",e,w,s,n,j,E,t,F,y,m,p,D,x="\u8bf7\u70b9\u51fb\u6d4f\u89c8\u4e0a\u4f20\u56fe\u7247",r,g=(v.cfg.pluginConfig.image||{}).upload||null,L=g&&g.surfix||"png,jpg,jpeg,gif",S=RegExp(L.split(/,/).join("|")+"$","i"),U="\u53ea\u5141\u8bb8\u540e\u7f00\u540d\u4e3a"+L+"\u7684\u56fe\u7247",k={},o=c.Utils.addRes,W=c.Utils.destroyRes;c.use("overlay,tabs,select",function(){v.addDialog("image/dialog",{show:function(i){var b="remote",d=c.Utils.resetInput,
f=c.Utils.valInput;if(r=i){f(s,r.attr("src"));i=r.width();d=r.height();f(n,d);f(j,i);E.val(r.css("float")||"none");f=parseInt(r._4e_style("margin"))||0;F.val(f);t[0].disabled=false;y=i/d}else{if(w.getTab("local"))b="local";d(s);d(n);d(j);E.val("none");F.val(0);t[0].disabled=true;y=null}D[0].reset();m.val(x);w.activate(b);e.show()},hide:function(){e.hide()},destroy:function(){W.call(k)}});M()})},{attach:false});
