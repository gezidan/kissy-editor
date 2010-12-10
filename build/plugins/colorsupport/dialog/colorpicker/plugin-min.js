KISSY.Editor.add("colorsupport/dialog/colorpicker",function(){function m(a){if(k.isArray(a))return a;var c=RegExp;if(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.test(a))return j([c.$1,c.$2,c.$3],function(d){return parseInt(d,16)});else if(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a))return j([c.$1,c.$2,c.$3],function(d){return parseInt(d+d,16)});else if(/^rgb\((.*),(.*),(.*)\)$/i.test(a))return j([c.$1,c.$2,c.$3],function(d){return d.indexOf("%")>0?parseFloat(d,10)*2.55:d|0})}function n(a){a="0"+
a;var c=a.length;return a.slice(c-2,c)}function o(a){a=m(a);return"#"+n(a[0].toString(16))+n(a[1].toString(16))+n(a[2].toString(16))}function r(){this._init()}var k=KISSY,p=k.Editor,j=p.Utils.map,s=k.DOM;s.addStyleSheet(".ke-color-advanced-picker-left {float:left;display:inline;margin-left:10px;}.ke-color-advanced-picker-right {float:right;width:50px;display:inline;margin:13px 10px 0 0;cursor:crosshair;}.ke-color-advanced-picker-right a {height:2px;line-height:0;font-size:0;display:block;}.ke-color-advanced-picker-left ul{float:left;}.ke-color-advanced-picker-left li,.ke-color-advanced-picker-left a{overflow:hidden;width:15px;height:16px;line-height:0;font-size:0;display:block;}.ke-color-advanced-picker-left a:hover{width:13px;height:13px;border:1px solid white;}.ke-color-advanced-indicator {margin-left:10px;*zoom:1;display:inline-block;*display:inline;width:68px;height:24px;vertical-align:middle;line-height:0;overflow:hidden;}",
"ke-color-advanced");var q=function(){function a(b,e,g){var h=[];b=c(b);e=c(e);var f=(e[0]-b[0])/g,i=(e[1]-b[1])/g,v=(e[2]-b[2])/g,l=0,t=b[0],u=b[1];for(b=b[2];l<g;l++){h[l]=[t,u,b];t+=f;u+=i;b+=v}h[l]=e;return j(h,function(w){return j(w,function(x){return Math.min(Math.max(0,Math.floor(x)),255)})})}function c(b){var e=m(b);if(e===undefined){if(!d){d=document.createElement("textarea");d.style.display="none";s.prepend(d,document.body)}try{d.style.color=b}catch(g){return[0,0,0]}if(document.defaultView)e=
m(document.defaultView.getComputedStyle(d,null).color);else{b=d.createTextRange().queryCommandValue("ForeColor");e=[b&255,(b&65280)>>>8,(b&16711680)>>>16]}}return e}var d;return function(b,e){var g=[],h=b.length;if(e===undefined)e=20;if(h==1)g=a(b[0],b[0],e);else if(h>1){var f=0;for(h=h-1;f<h;f++){var i=a(b[f],b[f+1],e[f]||e);f<h-1&&i.pop();g=g.concat(i)}}return g}}(),y="<div class='ke-color-advanced-picker'><div class='ks-clear'><div class='ke-color-advanced-picker-left'>"+("<ul>"+j(q(["red","orange",
"yellow","green","cyan","blue","purple"],5),function(a){return j(q(["white","rgb("+a.join(",")+")","black"],5),function(c){return"<li><a style='background-color:"+o(c)+"' href='#'></a></li>"}).join("")}).join("</ul><ul>")+"</ul>")+"</div><div class='ke-color-advanced-picker-right'></div></div><div style='padding:10px;'><label>\u989c\u8272\u503c\uff1a <input style='width:100px' class='ke-color-advanced-value'/></label><span class='ke-color-advanced-indicator'></span></div></div>";k.augment(r,{_init:function(){var a=this;
a.win=new p.Dialog({mask:true,headerContent:"\u989c\u8272\u62fe\u53d6\u5668",bodyContent:y,footerContent:"<div style='padding:5px 20px 20px;'><a class='ke-button ke-color-advanced-ok'>\u786e\u5b9a</a>&nbsp;&nbsp;&nbsp;<a class='ke-button  ke-color-advanced-cancel'>\u53d6\u6d88</a></div>",autoRender:true,width:"550px"});var c=a.win,d=c.get("body"),b=c.get("footer"),e=d.one(".ke-color-advanced-indicator"),g=d.one(".ke-color-advanced-value"),h=d.one(".ke-color-advanced-picker-left");d.one(".ke-color-advanced-picker-right");c=b.one(".ke-color-advanced-ok");
b=b.one(".ke-color-advanced-cancel");c.on("click",function(){var f=k.trim(g.val()),i=a.cmd;if(/^#([a-f0-9]{1,2}){3,3}$/i.test(f)){a.hide();setTimeout(function(){i.cfg._applyColor.call(i,g.val())},0)}else alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u989c\u8272\u4ee3\u7801")});g.on("change",function(){var f=k.trim(g.val());/^#([a-f0-9]{1,2}){3,3}$/i.test(f)?e.css("background-color",f):alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u989c\u8272\u4ee3\u7801")});b.on("click",function(){a.hide()});d.on("click",function(f){f.halt();f=new k.Node(f.target);if(f._4e_name()=="a"){var i=o(f.css("background-color"));
h.contains(f)&&a._detailColor(i);g.val(i);e.css("background-color",i)}});a._detailColor("#FF9900");g.val("#FF9900");e.css("background-color","#FF9900")},_detailColor:function(a){this.win.get("body").one(".ke-color-advanced-picker-right").html(j(q(["#ffffff",a,"#000000"],40),function(c){return"<a style='background-color:"+o(c)+"'></a>"}).join(""))},show:function(a){this.cmd=a;this.win.show()},hide:function(){this.win.hide()}});p.ColorSupport.ColorPicker=r});
