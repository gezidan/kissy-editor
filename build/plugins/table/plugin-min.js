KISSY.Editor.add("table",function(s,t){var j=KISSY.Editor,p=KISSY,m=p.Node,y=p.DOM,G=j.Walker,u=p.UA,H=j.NODE,v=j.TripleButton,I=j.SimpleOverlay,J=j.ContextMenu,K=["tr","th","td","tbody","table"],l=p.trim,w;w=(u.ie===6?["table.%2,","table.%2 td, table.%2 th,","{","border : #d3d3d3 1px dotted","}"]:[" table.%2,"," table.%2 > tr > td,  table.%2 > tr > th,"," table.%2 > tbody > tr > td,  table.%2 > tbody > tr > th,"," table.%2 > thead > tr > td,  table.%2 > thead > tr > th,"," table.%2 > tfoot > tr > td,  table.%2 > tfoot > tr > th",
"{","border : #d3d3d3 1px dotted","}"]).join("").replace(/%2/g,"ke_show_border");var n=s.htmlDataProcessor,z=n&&n.dataFilter;n=n&&n.htmlFilter;z&&z.addRules({elements:{table:function(k){k=k.attributes;var h=k["class"],q=parseInt(k.border,10);if(!q||q<=0)k["class"]=(h||"")+" ke_show_border"}}});n&&n.addRules({elements:{table:function(k){k=k.attributes;var h=k["class"];if(h)k["class"]=l(h.replace("ke_show_border","").replace(/\s{2}/," "))}}});j.TableUI||function(){function k(a){this.editor=a;this.selectedTable=
null;a._toolbars=a._toolbars||{};a._toolbars.table=this;this._init()}function h(a){return l(a).length!=0}function q(a){function b(r){if(!(f.length>0))if(r[0].nodeType==H.NODE_ELEMENT&&A.test(r._4e_name())&&!r._4e_getData("selected_cell")){r._4e_setMarker(e,"selected_cell",true);f.push(r)}}for(var c=a.createBookmarks(),d=a.getRanges(),f=[],e={},g=0;g<d.length;g++){var i=d[g];if(i.collapsed){i=i.getCommonAncestor();(i=i._4e_ascendant("td",true)||i._4e_ascendant("th",true))&&f.push(i)}else{i=new G(i);
var o;for(i.guard=b;o=i.next();)if((o=o.parent())&&A.test(o._4e_name())&&!o._4e_getData("selected_cell")){o._4e_setMarker(e,"selected_cell",true);f.push(o)}}}j.Utils.clearAllMarkers(e);a.selectBookmarks(c);return f}function B(a,b){var c=a.getStartElement()._4e_ascendant("tr");if(c){var d=c._4e_clone(true);d.insertBefore(c);c=(b?d[0]:c[0]).cells;for(d=0;d<c.length;d++){c[d].innerHTML="";u.ie||(new m(c[d]))._4e_appendBogus()}}}function x(a){if(a instanceof j.Selection){var b=q(a),c=b.length;a=[];for(var d,
f,e=0;e<c;e++){var g=b[e].parent(),i=g[0].rowIndex;!e&&(d=i-1);a[i]=g;e==c-1&&(f=i+1)}e=g._4e_ascendant("table");d=new m(f<e[0].rows.length&&e[0].rows[f]||d>0&&e[0].rows[d]||e[0].parentNode);for(e=a.length;e>=0;e--)a[e]&&x(a[e]);return d}else if(a instanceof m){e=a._4e_ascendant("table");e[0].rows.length==1?e._4e_remove():a._4e_remove()}return 0}function C(a,b){var c=a.getStartElement();if(c=c._4e_ascendant("td",true)||c._4e_ascendant("th",true))for(var d=c._4e_ascendant("table"),f=c[0].cellIndex,
e=0;e<d[0].rows.length;e++){var g=d[0].rows[e];if(!(g.cells.length<f+1)){c=new m(g.cells[f].cloneNode(false));u.ie||c._4e_appendBogus();g=new m(g.cells[f]);b?c.insertBefore(g):c.insertAfter(g)}}}function D(a){if(a instanceof j.Selection){var b=q(a),c,d=[];a=b[0]&&b[0]._4e_ascendant("table");var f,e,g;f=0;for(e=b.length;f<e;f++)d.push(b[f][0].cellIndex);d.sort();f=1;for(e=d.length;f<e;f++)if(d[f]-d[f-1]>1){g=d[f-1]+1;break}g||(g=d[0]>0?d[0]-1:d[d.length-1]+1);d=a[0].rows;f=0;for(e=d.length;f<e;f++)if(c=
d[f].cells[g])break;c=c?new m(c):a._4e_previous();for(g=b.length-1;g>=0;g--)b[g]&&D(b[g]);return c}else if(a instanceof m){b=a._4e_ascendant("table");if(!b)return null;c=a[0].cellIndex;for(g=b[0].rows.length-1;g>=0;g--){a=new m(b[0].rows[g]);if(!c&&a[0].cells.length==1)x(a);else a[0].cells[c]&&a[0].removeChild(a[0].cells[c])}}return null}function E(a,b){var c=new j.Range(a[0].ownerDocument);if(!c.moveToElementEditablePosition(a,b?true:t)){c.selectNodeContents(a);c.collapse(b?false:true)}c.select(true)}
y.addStyleSheet(".ke-table-config td {padding: 4px 0;}","ke-table");p.augment(k,{_init:function(){var a=this.editor,b={};this.el=new v({contentCls:"ke-toolbar-table",title:"插入表格",container:a.toolBarDiv});this.el.on("offClick",this._tableShow,this);for(var c in F)(function(d){b[d]=function(){a.fire("save");F[d](a);a.fire("save")}})(c);J.register(a.document,{rules:K,width:"120px",funcs:b});j.Utils.lazyRun(this,"_prepareTableShow","_realTableShow");j.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",
v.DISABLED)},enable:function(){this.el.set("state",v.OFF)},_tableInit:function(){var a=this,b=new I({width:"350px",mask:true,title:"表格属性"});b.body.html("<table class='ke-table-config'><tr><td><label>行数： <input  data-verify='^(?!0$)\\d+$'  data-warning='行数请输入正整数'  value='2'  class='ke-table-rows ke-table-create-only'  size='6' /></label></td><td><label>宽度： <input  data-verify='^(?!0$)\\d+(.\\d+)?$'  data-warning='宽度请输入正数' value='200' class='ke-table-width' size='6'/></label> <select class='ke-table-width-unit'><option value='px'>像素</option><option value='%'>百分比</option></select></td></tr><tr><td><label>列数： <input  data-verify='^(?!0$)\\d+$'  data-warning='列数请输入正整数' class='ke-table-cols ke-table-create-only' value='3' size='6'/></label></td><td><label>高度： <input  data-verify='^((?!0$)\\d+(.\\d+)?)?$'  data-warning='高度请输入正数' value='' class='ke-table-height' size='6'/></label> &nbsp;像素</select></td></tr><tr><td><label>对齐： <select class='ke-table-align'><option value=''>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option><option value='center'>中间对齐</option></select></label></td><td><label>标题格： <select class='ke-table-head ke-table-create-only'><option value=''>无</option><option value='1'>有</option></select></td></tr><tr><td><label>边框： <input  data-verify='^\\d+(.\\d+)?$'  data-warning='边框请输入非负数字' value='1' class='ke-table-border' size='6'/></label> &nbsp;像素</select></td><td></td></tr><tr><td colspan='2'><label>标题：<input class='ke-table-caption' style='width:270px'></label></td></tr></table>");
b.foot.html("<button class='ke-table-ok'>确定</button> <button class='ke-table-cancel'>取消</button>");var c=b.body;b.twidth=c.one(".ke-table-width");b.theight=c.one(".ke-table-height");b.tborder=c.one(".ke-table-border");b.tcaption=c.one(".ke-table-caption");b.talign=c.one(".ke-table-align");b.trows=c.one(".ke-table-rows");b.tcols=c.one(".ke-table-cols");b.thead=c.one(".ke-table-head");var d=b.foot.one(".ke-table-ok"),f=b.foot.one(".ke-table-cancel");b.twidthunit=c.one(".ke-table-width-unit");a.tableDialog=
b;d.on("click",a._tableOk,a);b.on("hide",function(){a.selectedTable=null});f.on("click",function(){b.hide()})},_tableOk:function(){var a=this.tableDialog,b=a.el.all("input");if(a.twidthunit.val()=="%"){a=parseInt(a.twidth.val());if(!a||a>100||a<0){alert("宽度百分比：请输入1-100之间");return}}if(j.Utils.verifyInputs(b))this.selectedTable?this._modifyTable():this._genTable()},_modifyTable:function(){var a=this.tableDialog,b=this.selectedTable,c=b.one("caption");h(a.talign.val())?b.attr("align",l(a.talign.val())):
b.removeAttr("align");h(a.tborder.val())?b.attr("border",l(a.tborder.val())):b.removeAttr("border");!h(a.tborder.val())||a.tborder.val()=="0"?b.addClass("ke_show_border"):b.removeClass("ke_show_border");h(a.twidth.val())?b.css("width",l(a.twidth.val())+a.twidthunit.val()):b.css("width","");h(a.theight.val())?b.css("height",l(a.theight.val())):b.css("height","");if(h(a.tcaption.val())){var d=j.Utils.htmlEncode(l(a.tcaption.val()));c&&c[0]?c.html(d):(new m("<caption><span>"+d+"</span></caption>")).insertBefore(b[0].firstChild)}else c&&
c._4e_remove();a.hide()},_genTable:function(){var a=this.tableDialog,b="<table ",c,d=parseInt(a.tcols.val())||1,f=parseInt(a.trows.val())||1,e=u.ie?"":"<br/>",g=this.editor;if(h(a.talign.val()))b+="align='"+l(a.talign.val())+"' ";if(h(a.tborder.val()))b+="border='"+l(a.tborder.val())+"' ";if(h(a.twidth.val())||h(a.theight.val())){b+="style='";if(h(a.twidth.val()))b+="width:"+l(a.twidth.val())+a.twidthunit.val()+";";if(h(a.theight.val()))b+="height:"+l(a.theight.val())+"px;";b+="' "}if(!h(a.tborder.val())||
l(a.tborder.val())=="0")b+="class='ke_show_border' ";b+=">";if(h(a.tcaption.val()))b+="<caption><span>"+j.Utils.htmlEncode(l(a.tcaption.val()))+"</span></caption>";if(a.thead.val()){b+="<thead>";b+="<tr>";for(c=0;c<d;c++)b+="<th>"+e+"</th>";b+="</tr>";b+="</thead>";f-=1}b+="<tbody>";for(var i=0;i<f;i++){b+="<tr>";for(c=0;c<d;c++)b+="<td>"+e+"</td>";b+="</tr>"}b+="</tbody>";b+="</table>";b=new m(b,null,g.document);g.insertElement(b);a.hide()},_fillTableDialog:function(){var a=this.tableDialog,b=this.selectedTable,
c=b.one("caption");a.talign.val(b.attr("align")||"");a.tborder.val(b.attr("border")||"");var d=b._4e_style("width")||"";a.twidth.val(d.replace(/px|%/i,""));d.indexOf("%")!=-1?a.twidthunit.val("%"):a.twidthunit.val("px");a.theight.val((b._4e_style("height")||"").replace(/px|%/i,""));d="";if(c)d=c.text();a.tcaption.val(d);a.trows.val(b.one("tbody").children().length);a.tcols.val(b.one("tr").children().length);a.thead.val(b._4e_first(function(f){return f._4e_name()=="thead"})?"1":"")},_realTableShow:function(){if(this.selectedTable){this._fillTableDialog();
this.tableDialog.body.all(".ke-table-create-only").attr("disabled","disabled")}else this.tableDialog.body.all(".ke-table-create-only").removeAttr("disabled");this.tableDialog.show()},_prepareTableShow:function(){this._tableInit()},_tableShow:function(){this._prepareTableShow()}});var A=/^(?:td|th)$/,F={"表格属性":function(a){var b=a.getSelection();if(b=(b=b&&b.getStartElement())&&b._4e_ascendant("table",true)){a=a._toolbars.table;a.selectedTable=b;a._tableShow()}},"删除表格":function(a){var b=(a=a.getSelection())&&
a.getStartElement();if(b=b&&b._4e_ascendant("table",true)){a.selectElement(b);var c=a.getRanges()[0];c.collapse();a.selectRanges([c]);a=b.parent();a[0].childNodes.length==1&&a._4e_name()!="body"&&a._4e_name()!="td"?a._4e_remove():b._4e_remove()}},"删除行 ":function(a){a=a.getSelection();E(x(a),t)},"删除列 ":function(a){a=a.getSelection();(a=D(a))&&E(a,true)},"在上方插入行":function(a){a=a.getSelection();B(a,true)},"在下方插入行":function(a){a=a.getSelection();B(a,t)},"在左侧插入列":function(a){a=a.getSelection();C(a,true)},
"在右侧插入列":function(a){a=a.getSelection();C(a,t)}};j.TableUI=k}();s.addPlugin(function(){var k=s.document;new j.TableUI(s);var h=y.create("<style>",null,k);k.getElementsByTagName("head")[0].appendChild(h);if(h.styleSheet)h.styleSheet.cssText=w;else h.appendChild(k.createTextNode(w))})});
