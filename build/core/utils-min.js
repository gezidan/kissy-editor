KISSY.Editor.add("utils",function(k){var f=KISSY,n=f.Node,g=f.DOM,l=f.Config.debug,h=f.UA;k.Utils={debugUrl:function(a){if(!l)return a.replace(/\.(js|css)/i,"-min.$1");if(l==="dev")return"../src/"+a;return a},lazyRun:function(a,b,c){var d=a[b],e=a[c];a[b]=function(){d.apply(this,arguments);a[b]=a[c];return e.apply(this,arguments)}},getXY:function(a,b,c,d){c=c.defaultView||c.parentWindow;a-=g.scrollLeft(c);b-=g.scrollTop(c);if(d)if(c!=(d.defaultView||d.parentWindow)&&c.frameElement){d=g._4e_getOffset(c.frameElement,
d);a+=d.left;b+=d.top}return{left:a,top:b}},tryThese:function(){for(var a,b=0,c=arguments.length;b<c;b++){var d=arguments[b];try{a=d();break}catch(e){}}return a},arrayCompare:function(a,b){if(!a&&!b)return true;if(!a||!b||a.length!=b.length)return false;for(var c=0;c<a.length;c++)if(a[c]!==b[c])return false;return true},getByAddress:function(a,b,c){a=a.documentElement;for(var d=0;a&&d<b.length;d++){var e=b[d];if(c)for(var m=-1,j=0;j<a.childNodes.length;j++){var i=a.childNodes[j];if(!(c===true&&i.nodeType==
3&&i.previousSibling&&i.previousSibling.nodeType==3)){m++;if(m==e){a=i;break}}}else a=a.childNodes[e]}return a?new n(a):null},clearAllMarkers:function(a){for(var b in a)a[b]._4e_clearMarkers(a,true)},htmlEncodeAttr:function(a){return a.replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/,"&gt;")},ltrim:function(a){return a.replace(/^\s+/,"")},rtrim:function(a){return a.replace(/\s+$/,"")},trim:function(a){return this.ltrim(this.rtrim(a))},mix:function(){for(var a={},b=0;b<arguments.length;b++)a=
f.mix(a,arguments[b]);return a},isCustomDomain:function(){if(!h.ie)return false;var a=document.domain,b=window.location.hostname;return a!=b&&a!="["+b+"]"},addSeparator:function(a){(new f.Node('<span class="ke-toolbar-separator">&nbsp;</span>')).appendTo(a)},duplicateStr:function(a,b){return Array(b+1).join(a)},throttle:function(a,b,c){c=c||150;if(c===-1)return function(){a.apply(b,arguments)};var d=(new Date).getTime();return function(){var e=(new Date).getTime();if(e-d>c){d=e;a.apply(b,arguments)}}},
buffer:function(a,b,c){c=c||0;var d=null;return function(){d&&clearTimeout(d);var e=arguments;d=setTimeout(function(){return a.apply(b,e)},c)}},isNumber:function(a){return/^\d+(.\d+)?$/.test(f.trim(a))},verifyInputs:function(a){for(var b=0;b<a.length;b++){var c=g._4e_wrap(a[b]),d=f.trim(c.val()),e=c.attr("data-verify");c=c.attr("data-warning");if(e&&!RegExp(e).test(d)){alert(c);return}}return true},sourceDisable:function(a,b){a.on("sourcemode",b.disable,b);a.on("wysiwygmode",b.enable,b)},resetInput:function(a){var b=
a.attr("placeholder");if(b&&!h.webkit){a.val(b);a.addClass("ke-input-tip")}else h.webkit&&a.val("")},placeholder:function(a,b){a.attr("placeholder",b);if(!h.webkit){a.on("blur",function(){if(!f.trim(a.val())){a.val(b);a.addClass("ke-input-tip")}});a.on("focus",function(){f.trim(a.val())==b&&a.val("");a.removeClass("ke-input-tip")})}},clean:function(a){a=a[0]||a;for(var b=f.makeArray(a.childNodes),c=0;c<b.length;c++){var d=b[c];d.nodeType==k.NODE.NODE_TEXT&&!f.trim(d.nodeValue)&&a.removeChild(d)}},
htmlEncode:function(a){return!a?a:String(a).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")},htmlDecode:function(a){return!a?a:String(a).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"').replace(/&amp;/g,"&")}}});
