KISSY.Editor.add("definition",function(h){function x(a,b){return y+"<html><head><title>${title}</title><link href='"+h.Config.base+z+"' rel='stylesheet'/><style>"+(b||"")+"</style></head><body class='ke-editor'>&nbsp;"+(a?'<script id="ke_actscript" type="text/javascript">'+(h.Utils.isCustomDomain()?'document.domain="'+document.domain+'";':"")+'window.parent.KISSY.Editor._initIFrame("'+a+'");<\/script>':"")+"</body></html>"}var p=KISSY,e=p.UA,o=p.DOM,n=p.Node,r=p.Event,w=h.focusManager,A=h.Utils.tryThese,
y="<!doctype html>",z=h.Utils.debugUrl("theme/editor-iframe.css"),B=1,C="document.open();"+(h.Utils.isCustomDomain()?'document.domain="'+document.domain+'";':"")+"document.close();",D="<div  class='ke-editor-wrap'  > <div class='"+".ke-editor-tools".substring(1)+"'></div><div class='"+".ke-textarea-wrap".substring(1)+'\'><iframe  style="width:100%;height:100%;border:none;"  width="100%"  height="100%"  frameborder="0"  title="kissy-editor"  src="'+(e.ie?"javascript:void(function(){"+encodeURIComponent(C)+
"}())":"")+'"  tabIndex="'+(e.webkit?-1:"$(tabIndex)")+'"  allowTransparency="true" ></iframe></div><div class=\''+".ke-editor-status".substring(1)+"'></div></div>";h.SOURCE_MODE=0;h.WYSIWYG_MODE=1;p.augment(h,{init:function(a){if(e.ie)o.addClass(document.body,"ie"+e.ie);else if(e.gecko)o.addClass(document.body,"gecko");else e.webkit&&o.addClass(document.body,"webkit");var b=this,c=new n(D.replace(/\$\(tabIndex\)/,a.attr("tabIndex")));c.on("mousedown",function(k){if(e.webkit){var s=o._4e_name(k.target);
if(s=="select"||s=="option")return true}k.halt()});a.on("mousedown",function(k){k.stopPropagation()});b.editorWrap=c;b._UUID=B++;w.register(b);b.wrap=c.one(".ke-textarea-wrap");b.iframe=b.wrap.one("iframe");b.toolBarDiv=c.one(".ke-editor-tools");b.textarea=a;b.statusDiv=c.one(".ke-editor-status");b.toolBarDiv._4e_unselectable();b._commands={};var g=a._4e_style("width"),f=a._4e_style("height");if(g){c.css("width",g);a.css("width","100%")}b.textarea.css("display","none");c.insertAfter(a);b.wrap[0].appendChild(a[0]);
if(f){b.wrap.css("height",f);a.css("height","100%")}c=b.iframe;b.on("dataReady",function(){b._ready=true;h.fire("instanceCreated",{editor:b})});e.gecko?c.on("load",b._setUpIFrame,b):b._setUpIFrame();b.cfg.attachForm&&a[0].form&&b._attachForm()},_attachForm:function(){(new n(this.textarea[0].form)).on("submit",this.sync,this)},addCommand:function(a,b){this._commands[a]=b},hasCommand:function(a){return this._commands[a]},execCommand:function(a){var b=this._commands[a],c=p.makeArray(arguments);c.shift();
c.unshift(this);return b.exec.apply(b,c)},getMode:function(){return this.textarea.css("display")=="none"?h.WYSIWYG_MODE:h.SOURCE_MODE},getData:function(){var a;if(this.getMode()==h.WYSIWYG_MODE){a=this.document.body.innerHTML;if(this.htmlDataProcessor)a=this.htmlDataProcessor.toHtml(a,"p")}else a=this.textarea.val();return a},setData:function(a){var b;if(this.htmlDataProcessor)b=this.htmlDataProcessor.toDataFormat(a,"p");this.document.body.innerHTML=b;this.getMode()!=h.WYSIWYG_MODE&&this.textarea.val(a)},
sync:function(){this.textarea.val(this.getData())},baseZIndex:function(a){a=a||0;return a+(this.cfg.baseZIndex||0)},_getRawData:function(){return this.document.body.innerHTML},_setRawData:function(a){this.document.body.innerHTML=a},_prepareIFrameHtml:x,getSelection:function(){var a=new h.Selection(this.document);return!a||a.isInvalid?null:a},focus:function(){var a=o._4e_getWin(this.document);e.webkit&&a&&a.parent&&a.parent.focus();a&&a.focus();this.document&&this.document.body.focus();this.notifySelectionChange()},
blur:function(){o._4e_getWin(this.document).blur();this.document&&this.document.body.blur()},addCustomStyle:function(a){var b=this.cfg,c=this.document;b.customStyle=b.customStyle||"";b.customStyle+="\n"+a;b=c.createElement("style");c.getElementsByTagName("head")[0].appendChild(b);if(b.styleSheet)b.styleSheet.cssText=a;else b.appendChild(c.createTextNode(a))},_setUpIFrame:function(){function a(){k=f.document;b.document=k;c.detach();k.open("text/html","replace");k.write(g);k.close()}var b=this,c=b.iframe,
g=x(b._UUID,b.cfg.customStyle),f=c[0].contentWindow,k;try{k=f.document}catch(s){c[0].src=c[0].src;if(e.ie<7){setTimeout(a,10);return}}a()},addPlugin:function(a){this.ready(a)},ready:function(a){this._ready?a():this.on("dataReady",a)},_monitor:function(){var a=this;a._monitorId&&clearTimeout(a._monitorId);a._monitorId=setTimeout(function(){var b=a.getSelection();if(b&&!b.isInvalid){var c=b.getStartElement(),g=new h.ElementPath(c);if(!a.previousPath||!a.previousPath.compare(g)){a.previousPath=g;a.fire("selectionChange",
{selection:b,path:g,element:c})}}},100)},notifySelectionChange:function(){this.previousPath=null;this._monitor()},insertElement:function(a,b){var c=this;c.focus();var g=a._4e_name(),f=h.XHTML_DTD,k=h.RANGE,s=h.NODE,l=f.$block[g],t=c.getSelection(),u=t.getRanges(),m,d,i,q,j;c.fire("save");for(var v=u.length-1;v>=0;v--){m=u[v];m.deleteContents();d=!v&&a||a._4e_clone(true);b&&b(d);if(l)for(;(q=m.getCommonAncestor(false,true))&&(j=f[q._4e_name()])&&!(j&&j[g]);)if(q._4e_name()in f.span)m.splitElement(q);
else if(m.checkStartOfBlock()&&m.checkEndOfBlock()){m.setStartBefore(q);m.collapse(true);q._4e_remove()}else m.splitBlock();m.insertNode(d);i||(i=d)}g=i._4e_nextSourceNode(true);f=c.document;j=h.XHTML_DTD;if(j.$inline[d._4e_name()]){g=new n(f.createTextNode(" "));g.insertAfter(i)}else if(g){if(g._4e_name()=="br"&&j[g.parent()._4e_name()].p){j=new n("<p>&nbsp;</p>",null,f);g[0].parentNode.replaceChild(j[0],g[0]);g=j}}else{j=new n("<p>&nbsp;</p>",null,f);j.insertAfter(i);g=j}m.moveToPosition(i,k.POSITION_AFTER_END);
g&&g[0].nodeType==s.NODE_ELEMENT&&m.moveToElementEditablePosition(g);t.selectRanges([m]);c.focus();d&&d._4e_scrollIntoView();setTimeout(function(){c.fire("save")},10);return d},insertHtml:function(a){var b=this;if(b.htmlDataProcessor)a=b.htmlDataProcessor.toDataFormat(a);if(e.webkit){a=o.create(a,null,this.document);a=a.nodeType==11?p.makeArray(a.childNodes):[a];for(var c=0;c<a.length;c++)b.insertElement(new n(a[c]))}else{b.focus();b.fire("save");c=b.getSelection();if(e.ie){c=c.getNative();c.type==
"Control"&&c.clear();c.createRange().pasteHTML(a)}else b.document.execCommand("inserthtml",false,a);b.focus();setTimeout(function(){b.fire("save")},10)}}});h._initIFrame=function(a){function b(d){A(function(){f.designMode="on";setTimeout(function(){f.designMode="off";l.focus();if(!arguments.callee.retry)arguments.callee.retry=true},50)},function(){f.designMode="off";o.attr(l,"contentEditable",false);o.attr(l,"contentEditable",true);!d&&b(1)})}var c=w.getInstance(a);a=c.textarea[0];var g=c.iframe[0].contentWindow,
f=c.document,k=c.cfg,s=f.getElementById("ke_actscript");o._4e_remove(s);var l=f.body;if(e.ie){l.hideFocus=true;l.disabled=true;l.contentEditable=true;l.removeAttribute("disabled")}else setTimeout(function(){if(e.gecko||e.opera)l.contentEditable=true;else if(e.webkit)l.parentNode.contentEditable=true;else f.designMode="on"},0);if(e.webkit){r.on(f,"click",function(d){var i=new n(d.target);p.inArray(i._4e_name(),["input","select"])&&d.preventDefault()});r.on(f,"mouseup",function(d){var i=new n(d.target);
p.inArray(i._4e_name(),["input","textarea"])&&d.preventDefault()})}if(e.gecko||e.ie||e.opera){var t;t=new n(o.insertAfter((new n('<span tabindex="-1" style="position:absolute; left:-10000" role="presentation"></span>'))[0],a));t.on("focus",function(){c.focus()});c.activateGecko=function(){e.gecko&&c.iframeFocus&&t[0].focus()};c.on("destroy",function(){})}if(e.ie&&f.compatMode=="CSS1Compat"||e.gecko||e.opera){var u=new n(f.documentElement);u.on("mousedown",function(d){if(d.target==u[0]){e.gecko&&b(false);
t[0].focus()}})}r.on(g,"focus",function(){if(e.gecko)b(false);else e.opera&&l.focus();c.notifySelectionChange()});e.gecko&&r.on(c.document,"mousedown",function(){c.iframeFocus||b(false)});if(e.ie){r.on(f,"keydown",function(d){if(d.keyCode in{8:1,46:1}){var i=c.getSelection(),q=i.getSelectedElement();if(q){c.fire("save");var j=i.getRanges()[0].createBookmark();q._4e_remove();i.selectBookmarks([j]);c.fire("save");d.preventDefault()}}});if(f.compatMode=="CSS1Compat"){var m={33:1,34:1};r.on(f,"keydown",
function(d){d.keyCode in m&&setTimeout(function(){c.getSelection().scrollIntoView()},0)})}}setTimeout(function(){e.ie&&setTimeout(function(){if(f){l.runtimeStyle.marginBottom="0px";l.runtimeStyle.marginBottom=""}},1E3)},0);setTimeout(function(){c.fire("dataReady");var d=k.disableObjectResizing,i=k.disableInlineTableEditing;if(d||i)try{f.execCommand("enableObjectResizing",false,!d);f.execCommand("enableInlineTableEditing",false,!i)}catch(q){r.on(l,e.ie?"resizestart":"resize",function(j){if(d||o._4e_name(j.target)===
"table"&&i)j.preventDefault()})}},10);e.webkit&&r.on(f,"mousedown",function(d){d=new n(d.target);p.inArray(d._4e_name(),["img","hr","input","textarea","select"])&&c.getSelection().selectElement(d)});e.gecko&&r.on(f,"dragstart",function(d){var i=new n(d.target);i._4e_name()==="img"&&/ke_/.test(i[0].className)&&d.preventDefault()});w.add(c)};h.baseZIndex=function(a){var b=a,c=h.getInstances(),g;for(g in c){if(!c.hasOwnProperty(g))return;b=Math.max(b,c[g].baseZIndex(a))}return b}});
