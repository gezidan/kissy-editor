KISSY.Editor.add("resize",function(h){var b=KISSY,c=b.Editor,n=b.Node;c.Resizer||function(){function i(a){this.editor=a;this._init()}var o=c.Draggable;b.augment(i,{_init:function(){var a=this.editor,d=a.statusDiv,e=new n("<div class='ke-resizer'></div>"),f=a.cfg.pluginConfig.resize||{};f=f.direction||["x","y"];e.appendTo(d);a.on("maximizeWindow",function(){e.css("display","none")});a.on("restoreWindow",function(){e.css("display","")});d=new o({node:e});var j=0,k=0,l=a.wrap,m=a.editorWrap;d.on("start",
function(){j=l.height();k=m.width()});d.on("move",function(g){var p=g.pageX-this.startMousePos.left;g=g.pageY-this.startMousePos.top;b.inArray("y",f)&&l.height(j+g);b.inArray("x",f)&&m.width(k+p)})}});c.Resizer=i}();h.addPlugin(function(){new c.Resizer(h)})});
