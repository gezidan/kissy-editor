KISSY.Editor.add("overlay",function(){function d(){var a=this;d.superclass.constructor.apply(a,arguments);a._init();if(h.UA.ie===6){a.on("show",function(){var b=a.get("el"),c=parseInt(b.css("width"));b=b[0].offsetHeight;e&&e.css({width:c+"px",height:b+"px"});e&&e.offset(a.get("el").offset())});a.on("hide",function(){e&&e.offset({left:-999,top:-999})})}if(a.get("mask")){a.on("show",function(){f&&f.css({left:"0px",top:"0px"});g&&g.css({left:"0px",top:"0px"})});a.on("hide",function(){f&&f.css({left:"-9999px",
top:"-9999px"});g&&g.css({left:"-9999px",top:"-9999px"})})}a.hide()}var k=KISSY.Editor,h=KISSY,j=h.Node,i=h.DOM,f,g,e;d.init=function(){var a=document.body;f=new j('<div class="ke-mask">&nbsp;</div>');f.css({left:"-9999px",top:"-9999px"});f.css({width:"100%",height:i.docHeight()+"px",opacity:0.4});f.appendTo(a);if(h.UA.ie==6){e=new j("<iframe class='ke-dialog-iframe'></iframe>");a.appendChild(e[0]);g=new j("<iframe class='ke-mask'></iframe>");g.css({left:"-9999px",top:"-9999px"});g.css({width:"100%",
height:i.docHeight()+"px",opacity:0.4});g.appendTo(a)}d.init=null};d.ATTRS={title:{value:""},width:{value:"450px"},visible:{value:true},mask:{value:false}};h.extend(d,h.Base,{_init:function(){var a=this,b=a.get("el");a.on("afterVisibleChange",function(c){if(c=c.newVal){typeof c=="boolean"?a.center():b.offset(c);a.fire("show")}else{b.css({left:"-9999px",top:"-9999px"});a.fire("hide")}});if(!b){b=new j("<div class='ke-dialog' style='width:"+a.get("width")+"'><div class='ke-hd clearfix'><div class='ke-hd-title'><h1>"+
a.get("title")+"</h1></div><div class='ke-hd-x'><a class='ke-close' href='#'>X</a></div></div><div class='ke-bd'></div><div class='ke-ft'><a href='#' class='ke-focus'></a></div></div>");document.body.appendChild(b[0]);a.set("el",b);a.el=b;a.body=b.one(".ke-bd");a._close=b.one(".ke-close");a._title=b.one(".ke-hd-title").one("h1");a.on("titleChange",function(c){a._title.html(c.newVal)});a.on("widthChange",function(c){a.el.css("width",c.newVal)});a._close.on("click",function(c){c.preventDefault();a.hide()})}},
center:function(){var a=this.get("el"),b=parseInt(a.css("width")),c=a[0].offsetHeight,l=i.viewportWidth(),m=i.viewportHeight();b=(l-b)/2+i.scrollLeft();c=(m-c)/2+i.scrollTop();a.css({left:b+"px",top:c+"px"})},_prepareShow:function(){d.init()},_realShow:function(a){this.get("el");this.set("visible",a||true)},show:function(a){this._prepareShow(a)},hide:function(){this.get("el");this.set("visible",false)}});k.Utils.lazyRun(d.prototype,"_prepareShow","_realShow");k.SimpleOverlay=d});