KISSY.Editor.add("table",function(t,r){var i=KISSY.Editor,f=KISSY,l=f.Node,E=f.DOM,F=i.Walker,s=f.UA,G=i.NODE,H=i.TripleButton,I=i.SimpleOverlay,J=i.ContextMenu,K=["tr","th","td","tbody","table"],m=f.trim,u;u=(s.ie===6?["table.%2,","table.%2 td, table.%2 th,","{","border : #d3d3d3 1px dotted","}"]:[" table.%2,"," table.%2 > tr > td,  table.%2 > tr > th,"," table.%2 > tbody > tr > td,  table.%2 > tbody > tr > th,"," table.%2 > thead > tr > td,  table.%2 > thead > tr > th,"," table.%2 > tfoot > tr > td,  table.%2 > tfoot > tr > th",
"{","border : #d3d3d3 1px dotted","}"]).join("").replace(/%2/g,"ke_show_border");i.TableUI||function(){function p(a){this.editor=a;this.selectedTable=null;a._toolbars=a._toolbars||{};a._toolbars.table=this;this._init()}function k(a){return m(a).length!=0}function w(a){function b(q){if(!(g.length>0))if(q[0].nodeType==G.NODE_ELEMENT&&x.test(q._4e_name())&&!q._4e_getData("selected_cell")){q._4e_setMarker(e,"selected_cell",true);g.push(q)}}for(var c=a.createBookmarks(),d=a.getRanges(),g=[],e={},j=0;j<
d.length;j++){var h=d[j];if(h.collapsed){h=h.getCommonAncestor();(h=h._4e_ascendant("td",true)||h._4e_ascendant("th",true))&&g.push(h)}else{h=new F(h);var n;for(h.guard=b;n=h.next();)if((n=n.parent())&&x.test(n._4e_name())&&!n._4e_getData("selected_cell")){n._4e_setMarker(e,"selected_cell",true);g.push(n)}}}i.Utils.clearAllMarkers(e);a.selectBookmarks(c);return g}function L(a){a=a.cells;for(var b=0;b<a.length;b++){a[b].innerHTML="";s.ie||(new l(a[b]))._4e_appendBogus()}}function y(a,b){if(a=a.getStartElement()._4e_ascendant("tr")){var c=
a._4e_clone(true);c.insertBefore(a);L(b?c[0]:a[0])}}function v(a){if(a instanceof i.Selection){var b=w(a),c=b.length;a=[];for(var d,g,e=0;e<c;e++){var j=b[e].parent(),h=j[0].rowIndex;!e&&(d=h-1);a[h]=j;e==c-1&&(g=h+1)}e=j._4e_ascendant("table");d=new l(g<e[0].rows.length&&e[0].rows[g]||d>0&&e[0].rows[d]||e[0].parentNode);for(e=a.length;e>=0;e--)a[e]&&v(a[e]);return d}else if(a instanceof l){e=a._4e_ascendant("table");e[0].rows.length==1?e._4e_remove():a._4e_remove()}return 0}function z(a,b){a=a.getStartElement();
if(a=a._4e_ascendant("td",true)||a._4e_ascendant("th",true))for(var c=a._4e_ascendant("table"),d=a[0].cellIndex,g=0;g<c[0].rows.length;g++){var e=c[0].rows[g];if(!(e.cells.length<d+1)){a=new l(e.cells[d].cloneNode(false));s.ie||a._4e_appendBogus();e=new l(e.cells[d]);b?a.insertBefore(e):a.insertAfter(e)}}}function M(a){var b=[],c=a[0]&&a[0]._4e_ascendant("table"),d,g,e,j;d=0;for(g=a.length;d<g;d++)b.push(a[d][0].cellIndex);b.sort();d=1;for(g=b.length;d<g;d++)if(b[d]-b[d-1]>1){e=b[d-1]+1;break}e||
(e=b[0]>0?b[0]-1:b[b.length-1]+1);a=c[0].rows;d=0;for(g=a.length;d<g;d++)if(j=a[d].cells[e])break;return j?new l(j):c.previous()}function A(a){if(a instanceof i.Selection){var b=w(a),c=M(b);for(a=b.length-1;a>=0;a--)b[a]&&A(b[a]);return c}else if(a instanceof l){b=a._4e_ascendant("table");if(!b)return null;c=a[0].cellIndex;for(a=b[0].rows.length-1;a>=0;a--){var d=new l(b[0].rows[a]);if(!c&&d[0].cells.length==1)v(d);else d[0].cells[c]&&d[0].removeChild(d[0].cells[c])}}return null}function B(a,b){var c=
new i.Range(a[0].ownerDocument);if(!c.moveToElementEditablePosition(a,b?true:r)){c.selectNodeContents(a);c.collapse(b?false:true)}c.select(true)}var o=i.HtmlDataProcessor,C=o&&o.dataFilter;o=o&&o.htmlFilter;C&&C.addRules({elements:{table:function(a){a=a.attributes;var b=a["class"],c=parseInt(a.border,10);if(!c||c<=0)a["class"]=(b||"")+" ke_show_border"}}});o&&o.addRules({elements:{table:function(a){a=a.attributes;var b=a["class"];if(b)a["class"]=f.trim(b.replace("ke_show_border","").replace(/\s{2}/,
" "))}}});f.augment(p,{_init:function(){var a=this.editor,b={};this.el=new H({contentCls:"ke-toolbar-table",title:"\u8868\u683c",container:a.toolBarDiv});this.el.on("offClick",this._tableShow,this);for(var c in D)(function(d){b[d]=function(){a.fire("save");a.focus();D[d](a);a.fire("save")}})(c);J.register(a.document,{tags:K,width:"120px",funcs:b});i.Utils.lazyRun(this,"_prepareTableShow","_realTableShow")},_tableInit:function(){var a=this,b=a.editor,c=new I({width:"350px",mask:true,title:"\u7f16\u8f91\u8868\u683c"});
c.body.html("<table class='ke-table-config'><tr><td><label>\u884c\u6570\uff1a <input value='2' class='ke-table-rows ke-table-create-only' size='8'/></label></td><td><label>\u5bbd\u5ea6\uff1a <input value='200' class='ke-table-width' size='8'/></label> <select class='ke-table-width-unit'><option value='px'>\u50cf\u7d20</option><option value='%'>\u767e\u5206\u6bd4</option></select></td></tr><tr><td><label>\u5217\u6570\uff1a <input class='ke-table-cols ke-table-create-only' value='3' size='8'/></label></td><td><label>\u9ad8\u5ea6\uff1a <input value='200' class='ke-table-height' size='8'/></label> &nbsp;\u50cf\u7d20</select></td></tr><tr><td><label>\u6807\u9898\u683c\uff1a <select class='ke-table-head ke-table-create-only'><option value=''>\u65e0</option><option value='1'>\u6709</option></select></td><td><label>\u95f4\u8ddd\uff1a <input value='1' class='ke-table-cellspacing' size='8'/></label> &nbsp;\u50cf\u7d20</select></td></tr><tr><td><label>\u5bf9\u9f50\uff1a <select class='ke-table-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option><option value='center'>\u4e2d\u95f4\u5bf9\u9f50</option></select></label></td><td><label>\u8fb9\u8ddd\uff1a <input value='1' class='ke-table-cellpadding' size='8'/></label> &nbsp;\u50cf\u7d20</select></td></tr><tr><td></td><td><label>\u8fb9\u6846\uff1a <input value='1' class='ke-table-border' size='8'/></label> &nbsp;\u50cf\u7d20</select></td></tr><tr><td colspan='2'><label>\u6807\u9898\uff1a<input class='ke-table-caption' style='width:270px'></label></td></tr><tr><td colspan='2' style='text-align:center'><button class='ke-table-ok'>\u786e\u5b9a</button></td></tr></table>");
c.twidth=c.body.one(".ke-table-width");c.theight=c.body.one(".ke-table-height");c.tcellspacing=c.body.one(".ke-table-cellspacing");c.tcellpadding=c.body.one(".ke-table-cellpadding");c.tborder=c.body.one(".ke-table-border");c.tcaption=c.body.one(".ke-table-caption");c.talign=c.body.one(".ke-table-align");c.trows=c.body.one(".ke-table-rows");c.tcols=c.body.one(".ke-table-cols");c.thead=c.body.one(".ke-table-head");c.tok=c.body.one(".ke-table-ok");c.tclose=c.body.one(".ke-table-close");c.twidthunit=
c.body.one(".ke-table-width-unit");a.tableDialog=c;c.tok.on("click",a._tableOk,a);c.on("hide",function(){a.selectedTable=null;b.focus()})},_tableOk:function(){this.selectedTable?this._modifyTable():this._genTable()},_modifyTable:function(){var a=this.tableDialog,b=this.selectedTable,c=b.one("caption");k(a.talign.val())&&b.attr("align",m(a.talign.val()));k(a.tcellspacing.val())&&b.attr("cellspacing",m(a.tcellspacing.val()));k(a.tcellpadding.val())&&b.attr("cellpadding",m(a.tcellpadding.val()));k(a.tborder.val())&&
b.attr("border",m(a.tborder.val()));!k(a.tborder.val())||a.tborder.val()=="0"?b.addClass("ke_show_border"):b.remoevClass("ke_show_border");k(a.twidth.val())&&b.css("width",m(a.twidth.val())+a.twidthunit.val());k(a.theight.val())&&b.css("height",m(a.theight.val()));if(k(a.tcaption.val()))c&&c[0]?c.html(m(a.tcaption.val())):(new l("<caption><span>"+m(a.tcaption.val())+"</span></caption>")).insertBefore(b[0].firstChild);else c&&c._4e_remove();a.hide()},_genTable:function(){var a=this.tableDialog,b="<table ",
c,d=parseInt(a.tcols.val()),g=parseInt(a.trows.val()),e=s.ie?"":"<br/>",j=this.editor;if(f.trim(a.talign.val()).length!=0)b+="align='"+f.trim(a.talign.val())+"' ";if(f.trim(a.tcellspacing.val()).length!=0)b+="cellspacing='"+f.trim(a.tcellspacing.val())+"' ";if(f.trim(a.tcellpadding.val()).length!=0)b+="cellpadding='"+f.trim(a.tcellpadding.val())+"' ";if(f.trim(a.tborder.val()).length!=0)b+="border='"+f.trim(a.tborder.val())+"' ";if(f.trim(a.twidth.val()).length!=0||f.trim(a.theight.val()).length!=
0){b+="style='";if(f.trim(a.twidth.val()).length!=0)b+="width:"+f.trim(a.twidth.val())+a.twidthunit.val()+";";if(f.trim(a.theight.val()).length!=0)b+="height:"+f.trim(a.theight.val())+"px;";b+="' "}if(f.trim(a.tborder.val()).length==0||f.trim(a.tborder.val())=="0")b+="class='ke_show_border' ";b+=">";if(f.trim(a.tcaption.val()))b+="<caption><span>"+f.trim(a.tcaption.val())+"</span></caption>";if(a.thead.val()){b+="<thead>";b+="<tr>";for(c=0;c<d;c++)b+="<th>"+e+"</th>";b+="</tr>";b+="</thead>"}b+="<tbody>";
for(var h=0;h<g;h++){b+="<tr>";for(c=0;c<d;c++)b+="<td>"+e+"</td>";b+="</tr>"}b+="</tbody>";b+="</table>";b=new l(b,null,j.document);j.insertElement(b);a.hide()},_fillTableDialog:function(){var a=this.tableDialog,b=this.selectedTable,c=b.one("caption");a.talign.val(b.attr("align")||"");a.tcellspacing.val(b.attr("cellspacing")||"");a.tcellpadding.val(b.attr("cellpadding")||"");a.tborder.val(b.attr("border")|"");var d=b._4e_style("width")||"";a.twidth.val(d.replace(/px|%/i,""));d.indexOf("%")!=-1?a.twidthunit.val("%"):
a.twidthunit.val("px");a.theight.val((b._4e_style("height")||"").replace(/px|%/i,""));d="";if(c)d=c.text();a.tcaption.val(d);a.trows.val(b.one("tbody").children().length);a.tcols.val(b.one("tr").children().length);a.thead.val(b._4e_first(function(g){return g._4e_name()=="thead"})?"1":"")},_realTableShow:function(){if(this.selectedTable){this._fillTableDialog();this.tableDialog.body.all(".ke-table-create-only").attr("disabled","disabled")}else this.tableDialog.body.all(".ke-table-create-only").removeAttr("disabled");
this.tableDialog.show()},_prepareTableShow:function(){this._tableInit()},_tableShow:function(){this._prepareTableShow()}});var x=/^(?:td|th)$/,D={"\u8868\u683c\u5c5e\u6027":function(a){var b=a.getSelection();if(b=(b=b&&b.getStartElement())&&b._4e_ascendant("table",true)){a=a._toolbars.table;a.selectedTable=b;a._tableShow()}},"\u5220\u9664\u8868\u683c":function(a){var b=(a=a.getSelection())&&a.getStartElement();if(b=b&&b._4e_ascendant("table",true)){a.selectElement(b);var c=a.getRanges()[0];c.collapse();
a.selectRanges([c]);a=b.parent();a[0].childNodes.length==1&&a._4e_name()!="body"?a._4e_remove():b._4e_remove()}},"\u5220\u9664\u884c":function(a){a=a.getSelection();B(v(a),r)},"\u5220\u9664\u5217":function(a){a=a.getSelection();(a=A(a))&&B(a,true)},"\u5728\u4e0a\u65b9\u63d2\u5165\u884c":function(a){a=a.getSelection();y(a,true)},"\u5728\u4e0b\u65b9\u63d2\u5165\u884c":function(a){a=a.getSelection();y(a,r)},"\u5728\u5de6\u4fa7\u63d2\u5165\u5217":function(a){a=a.getSelection();z(a,true)},"\u5728\u53f3\u4fa7\u63d2\u5165\u5217":function(a){a=
a.getSelection();z(a,r)}};i.TableUI=p}();t.addPlugin(function(){var p=t.document;new i.TableUI(t);var k=E.create("<style>",null,p);p.getElementsByTagName("head")[0].appendChild(k);if(k.styleSheet)k.styleSheet.cssText=u;else k.appendChild(p.createTextNode(u))})});