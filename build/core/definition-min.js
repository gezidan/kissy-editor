KISSY.Editor.add("definition",function(g){function w(a){return x+"<html><head><title>kissy-editor</title><link href='"+g.Config.base+y+"' rel='stylesheet'/></head><body class='ke-editor'>&nbsp;</body><html>"+(a?'<script id="ke_actscrpt" type="text/javascript">'+(g.Utils.isCustomDomain()?'document.domain="'+document.domain+'";':"")+'window.parent.KISSY.Editor._initIFrame("'+a+'");<\/script>':"")}var m=KISSY,d=m.UA,p=m.DOM,n=m.Node,q=m.Event,t=g.focusManager,z=g.Utils.tryThese,x="<!doctype html>",y=
g.Utils.debugUrl("assets/editor-iframe.css"),A=1,B="document.open();"+(g.Utils.isCustomDomain()?'document.domain="'+document.domain+'";':"")+"document.close();",C="<div  class='ke-editor-wrap'  > <div class='"+".ke-editor-tools".substring(1)+"'></div><div class='"+".ke-textarea-wrap".substring(1)+'\'><iframe  style="width:100%;height:100%;border:none;"  width="100%"  height="100%"  frameborder="0"  title="kissy-editor"  src="'+(d.ie?"javascript:void(function(){"+encodeURIComponent(B)+"}())":"")+'"  tabIndex="'+
(d.webkit?-1:"$(tabIndex)")+'"  allowTransparency="true" ></iframe></div><div class=\''+".ke-editor-status".substring(1)+"'></div></div>";m.augment(g,{init:function(a){var b=this,c=new n(C.replace(/\$\(tabIndex\)/,a.attr("tabIndex")));c.on("mousedown",function(j){if(d.webkit){var h=p._4e_name(j.target);if(h=="select"||h=="option")return true}j.halt()});b.editorWrap=c;b._UUID=A++;t.register(b);b.wrap=c.one(".ke-textarea-wrap");b.iframe=b.wrap.one("iframe");b.toolBarDiv=c.one(".ke-editor-tools");b.textarea=
a;b.statusDiv=c.one(".ke-editor-status");b.toolBarDiv._4e_unselectable();b._commands={};b._plugins={};var l=a._4e_style("width"),f=a._4e_style("height");if(l){c.css("width",l);a.css("width","100%")}b.textarea.css("display","none");c.insertAfter(a);b.wrap[0].appendChild(a[0]);if(f){b.wrap.css("height",f);a.css("height","100%")}a=b.iframe;b.on("dataReady",function(){b.ready=true;g.fire("instanceCreated",{editor:b})});d.gecko?a.on("load",b._setUpIFrame,b):b._setUpIFrame()},addCommand:function(a,b){this._commands[a]=
b},execCommand:function(a){this.fire("save");this._commands[a].exec(this);this.fire("save")},getData:function(){if(g.HtmlDataProcessor)return g.HtmlDataProcessor.toHtml(this.document.body.innerHTML,"p");return this.document.body.innerHTML},setData:function(a){if(g.HtmlDataProcessor)a=g.HtmlDataProcessor.toDataFormat(a,"p");this.document.body.innerHTML=a},sync:function(){this.textarea.val(this.getData())},_getRawData:function(){return this.document.body.innerHTML},_setRawData:function(a){this.document.body.innerHTML=
a},_hideSource:function(){this.iframe.css("display","");this.textarea.css("display","none");this.toolBarDiv.children().css("visibility","");this.statusDiv.children().css("visibility","")},_showSource:function(){this.textarea.css("display","");this.iframe.css("display","none");this.toolBarDiv.children().css("visibility","hidden");this.toolBarDiv.all(".ke-tool-editor-source").css("visibility","");this.statusDiv.children().css("visibility","hidden");d.ie<8&&this.textarea.css("height",this.wrap.css("height"))},
_prepareIFrameHtml:w,getSelection:function(){var a=new g.Selection(this.document);return!a||a.isInvalid?null:a},focus:function(){var a=p._4e_getWin(this.document);d.webkit&&a&&a.parent&&a.parent.focus();a&&a.focus();this.document&&this.document.body.focus();this.notifySelectionChange()},blur:function(){p._4e_getWin(this.document).blur();this.document&&this.document.body.blur()},_setUpIFrame:function(){function a(){j=f.document;b.document=j;c.detach();j.open("text/html","replace");j.write(l);j.close()}
var b=this,c=b.iframe,l=w(b._UUID),f=c[0].contentWindow,j;try{j=f.document}catch(h){c[0].src=c[0].src;if(d.ie&&d.ie<7){setTimeout(a,10);return}}a()},addPlugin:function(a){this.ready?a():this.on("dataReady",a)},_monitor:function(){var a=this;a._monitorId&&clearTimeout(a._monitorId);a._monitorId=setTimeout(function(){var b=a.getSelection();if(b&&!b.isInvalid){b=b.getStartElement();var c=new g.ElementPath(b);if(!a.previousPath||!a.previousPath.compare(c)){a.previousPath=c;a.fire("selectionChange",{selection:a,
path:c,element:b})}}},200)},notifySelectionChange:function(){this.previousPath=null;this._monitor()},insertElement:function(a){var b=this;b.focus();var c=a._4e_name(),l=g.XHTML_DTD,f=g.RANGE,j=g.NODE,h=l.$block[c],u=b.getSelection(),v=u.getRanges(),i,o,s,e,k;b.fire("save");for(var r=v.length-1;r>=0;r--){i=v[r];i.deleteContents();o=!r&&a||a._4e_clone(true);if(h)for(;(e=i.getCommonAncestor(false,true))&&(k=l[e._4e_name()])&&!(k&&k[c]);)if(e._4e_name()in l.span)i.splitElement(e);else if(i.checkStartOfBlock()&&
i.checkEndOfBlock()){i.setStartBefore(e);i.collapse(true);e._4e_remove()}else i.splitBlock();i.insertNode(o);s||(s=o)}i.moveToPosition(s,f.POSITION_AFTER_END);(a=s._4e_nextSourceNode(true))&&a.type==j.NODE_ELEMENT&&i.moveToElementEditablePosition(a);u.selectRanges([i]);b.focus();o&&o._4e_scrollIntoView();setTimeout(function(){b.fire("save")},10)},insertHtml:function(a){if(g.HtmlDataProcessor)a=g.HtmlDataProcessor.toDataFormat(a);if(d.webkit){a=p.create(a,null,this.document);a=a.nodeType==11?m.makeArray(a.childNodes):
[a];for(var b=0;b<a.length;b++)this.insertElement(new n(a[b]))}else{var c=this;c.focus();c.fire("save");b=c.getSelection();if(d.ie){b=b.getNative();b.type=="Control"&&b.clear();b.createRange().pasteHTML(a)}else c.document.execCommand("inserthtml",false,a);c.focus();setTimeout(function(){c.fire("save")},10)}}});g._initIFrame=function(a){function b(e){z(function(){f.designMode="on";setTimeout(function(){f.designMode="off";h.focus();if(!arguments.callee.retry)arguments.callee.retry=true},10)},function(){f.designMode=
"off";p.attr(h,"contentEditable",false);p.attr(h,"contentEditable",true);!e&&b(1)})}var c=t.getInstance(a);a=c.textarea[0];var l=c.iframe[0].contentWindow,f=c.document,j=f.getElementById("ke_actscrpt");j.parentNode.removeChild(j);var h=f.body;if(d.ie){h.hideFocus=true;h.disabled=true;h.contentEditable=true;h.removeAttribute("disabled")}else setTimeout(function(){if(d.gecko||d.opera)h.contentEditable=true;else if(d.webkit)h.parentNode.contentEditable=true;else f.designMode="on"},0);try{f.execCommand("enableObjectResizing",
false,true)}catch(u){}try{f.execCommand("enableInlineTableEditing",false,true)}catch(v){}d.webkit&&q.on(f,"mousedown",function(e){e=new n(e.target);m.inArray(e._4e_name(),["img","hr","input","textarea","select"])&&c.getSelection().selectElement(e)});if(d.webkit){q.on(f,"click",function(e){var k=new n(e.target);m.inArray(k._4e_name(),["input","select"])&&e.preventDefault()});q.on(f,"mouseup",function(e){var k=new n(e.target);m.inArray(k._4e_name(),["input","textarea"])&&e.preventDefault()})}if(d.gecko||
d.ie||d.opera){var i;i=new n(p.insertAfter((new n('<span style="position:absolute; left:-10000"></span>'))[0],a));i.on("focus",function(){c.focus()});c.on("destroy",function(){})}if(d.ie&&f.compatMode=="CSS1Compat"||d.gecko||d.opera){var o=new n(f.documentElement);o.on("mousedown",function(e){if(e.target===o[0]){d.gecko&&b(false);i[0].focus()}})}q.on(l,"focus",function(){if(d.gecko)b(false);else d.opera&&h.focus();c.notifySelectionChange()});d.gecko&&q.on(c.document,"mousedown",function(){c.iframeFocus||
b(false)});if(d.ie){q.on(f,"keydown",function(e){if(e.keyCode in{8:1,46:1}){var k=c.getSelection(),r=k.getSelectedElement();if(r){c.fire("save");var D=k.getRanges()[0].createBookmark();r._4e_remove();k.selectBookmarks([D]);c.fire("save");e.preventDefault()}}});if(f.compatMode=="CSS1Compat"){var s={33:1,34:1};q.on(f,"keydown",function(e){e.keyCode in s&&setTimeout(function(){c.getSelection().scrollIntoView()},0)})}}setTimeout(function(){d.ie&&setTimeout(function(){if(f){h.runtimeStyle.marginBottom=
"0px";h.runtimeStyle.marginBottom=""}},1E3)},0);setTimeout(function(){c.fire("dataReady")},10);t.add(c)};d.gecko&&function(){var a=document.body;if(a){var b=a.getAttribute("onpageshow");a.setAttribute("onpageshow",(b?b+";":"")+"event.persisted && KISSY.Editor.focusManager.refreshAll();")}else window.addEventListener("load",arguments.callee,false)}()});
