KISSY.Editor.add("table",function(s,t){var i=KISSY.Editor,p=KISSY,m=p.Node,y=p.DOM,G=i.Walker,u=p.UA,H=i.NODE,v=i.TripleButton,I=i.SimpleOverlay,J=i.ContextMenu,K=["tr","th","td","tbody","table"],l=p.trim,w;w=(u.ie===6?["table.%2,","table.%2 td, table.%2 th,","{","border : #d3d3d3 1px dotted","}"]:[" table.%2,"," table.%2 > tr > td,  table.%2 > tr > th,"," table.%2 > tbody > tr > td,  table.%2 > tbody > tr > th,"," table.%2 > thead > tr > td,  table.%2 > thead > tr > th,"," table.%2 > tfoot > tr > td,  table.%2 > tfoot > tr > th",
"{","border : #d3d3d3 1px dotted","}"]).join("").replace(/%2/g,"ke_show_border");var n=s.htmlDataProcessor,z=n&&n.dataFilter;n=n&&n.htmlFilter;z&&z.addRules({elements:{table:function(k){k=k.attributes;var h=k["class"],q=parseInt(k.border,10);if(!q||q<=0)k["class"]=(h||"")+" ke_show_border"}}});n&&n.addRules({elements:{table:function(k){k=k.attributes;var h=k["class"];if(h)k["class"]=l(h.replace("ke_show_border","").replace(/\s{2}/," "))}}});i.TableUI||function(){function k(a){this.editor=a;this.selectedTable=
null;a._toolbars=a._toolbars||{};a._toolbars.table=this;this._init()}function h(a){return l(a).length!=0}function q(a){function b(r){if(!(f.length>0))if(r[0].nodeType==H.NODE_ELEMENT&&A.test(r._4e_name())&&!r._4e_getData("selected_cell")){r._4e_setMarker(e,"selected_cell",true);f.push(r)}}for(var c=a.createBookmarks(),d=a.getRanges(),f=[],e={},g=0;g<d.length;g++){var j=d[g];if(j.collapsed){j=j.getCommonAncestor();(j=j._4e_ascendant("td",true)||j._4e_ascendant("th",true))&&f.push(j)}else{j=new G(j);
var o;for(j.guard=b;o=j.next();)if((o=o.parent())&&A.test(o._4e_name())&&!o._4e_getData("selected_cell")){o._4e_setMarker(e,"selected_cell",true);f.push(o)}}}i.Utils.clearAllMarkers(e);a.selectBookmarks(c);return f}function B(a,b){var c=a.getStartElement()._4e_ascendant("tr");if(c){var d=c._4e_clone(true);d.insertBefore(c);c=(b?d[0]:c[0]).cells;for(d=0;d<c.length;d++){c[d].innerHTML="";u.ie||(new m(c[d]))._4e_appendBogus()}}}function x(a){if(a instanceof i.Selection){var b=q(a),c=b.length;a=[];for(var d,
f,e=0;e<c;e++){var g=b[e].parent(),j=g[0].rowIndex;!e&&(d=j-1);a[j]=g;e==c-1&&(f=j+1)}e=g._4e_ascendant("table");d=new m(f<e[0].rows.length&&e[0].rows[f]||d>0&&e[0].rows[d]||e[0].parentNode);for(e=a.length;e>=0;e--)a[e]&&x(a[e]);return d}else if(a instanceof m){e=a._4e_ascendant("table");e[0].rows.length==1?e._4e_remove():a._4e_remove()}return 0}function C(a,b){var c=a.getStartElement();if(c=c._4e_ascendant("td",true)||c._4e_ascendant("th",true))for(var d=c._4e_ascendant("table"),f=c[0].cellIndex,
e=0;e<d[0].rows.length;e++){var g=d[0].rows[e];if(!(g.cells.length<f+1)){c=new m(g.cells[f].cloneNode(false));u.ie||c._4e_appendBogus();g=new m(g.cells[f]);b?c.insertBefore(g):c.insertAfter(g)}}}function D(a){if(a instanceof i.Selection){var b=q(a),c,d=[];a=b[0]&&b[0]._4e_ascendant("table");var f,e,g;f=0;for(e=b.length;f<e;f++)d.push(b[f][0].cellIndex);d.sort();f=1;for(e=d.length;f<e;f++)if(d[f]-d[f-1]>1){g=d[f-1]+1;break}g||(g=d[0]>0?d[0]-1:d[d.length-1]+1);d=a[0].rows;f=0;for(e=d.length;f<e;f++)if(c=
d[f].cells[g])break;c=c?new m(c):a._4e_previous();for(g=b.length-1;g>=0;g--)b[g]&&D(b[g]);return c}else if(a instanceof m){b=a._4e_ascendant("table");if(!b)return null;c=a[0].cellIndex;for(g=b[0].rows.length-1;g>=0;g--){a=new m(b[0].rows[g]);if(!c&&a[0].cells.length==1)x(a);else a[0].cells[c]&&a[0].removeChild(a[0].cells[c])}}return null}function E(a,b){var c=new i.Range(a[0].ownerDocument);if(!c.moveToElementEditablePosition(a,b?true:t)){c.selectNodeContents(a);c.collapse(b?false:true)}c.select(true)}
y.addStyleSheet(".ke-table-config td {padding: 4px 0;}","ke-table");p.augment(k,{_init:function(){var a=this.editor,b={};this.el=new v({contentCls:"ke-toolbar-table",title:"插入表格",container:a.toolBarDiv});this.el.on("offClick",this._tableShow,this);for(var c in F)(function(d){b[d]=function(){a.fire("save");F[d](a);a.fire("save")}})(c);J.register(a.document,{rules:K,width:"120px",funcs:b});i.Utils.lazyRun(this,"_prepareTableShow","_realTableShow");i.Utils.sourceDisable(a,this)},disable:function(){this.el.set("state",
v.DISABLED)},enable:function(){this.el.set("state",v.OFF)},_tableInit:function(){var a=this,b=new I({width:"430px",mask:true,title:"表格属性"});b.body.html("<div style='padding:20px 20px 10px 20px;'><table class='ke-table-config' style='width:100%'><tr><td><label>行数： <input  data-verify='^(?!0$)\\d+$'  data-warning='行数请输入正整数'  value='2'  class='ke-table-rows ke-table-create-only ke-input'  size='6' /></label></td><td><label>宽&nbsp;&nbsp;&nbsp;度： <input  data-verify='^(?!0$)\\d+$'  data-warning='宽度请输入正整数' value='200' style='vertical-align:middle;' class='ke-table-width ke-input' size='6'/></label> <select class='ke-table-width-unit'><option value='px'>像素</option><option value='%'>百分比</option></select></td></tr><tr><td><label>列数： <input  data-verify='^(?!0$)\\d+$'  data-warning='列数请输入正整数' class='ke-table-cols ke-table-create-only ke-input' value='3' size='6'/></label></td><td><label>高&nbsp;&nbsp;&nbsp;度： <input  data-verify='^((?!0$)\\d+)?$'  data-warning='高度请输入正整数' value='' class='ke-table-height ke-input' size='6'/></label> &nbsp;像素</td></tr><tr><td><label>对齐： <select class='ke-table-align'><option value=''>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option><option value='center'>中间对齐</option></select></label></td><td><label>标题格： <select class='ke-table-head ke-table-create-only'><option value=''>无</option><option value='1'>有</option></select></td></tr><tr><td><label>边框： <input  data-verify='^\\d+$'  data-warning='边框请输入非负整数' value='1' class='ke-table-border ke-input' size='6'/></label> &nbsp;像素</td><td></td></tr><tr><td colspan='2'><label>标题： <input class='ke-table-caption ke-input' style='width:320px'></label></td></tr></table></div>");
b.foot.html("<a class='ke-table-ok ke-button' style='margin-right:20px;'>确定</a> <a class='ke-table-cancel ke-button'>取消</a>");var c=b.body;b.twidth=c.one(".ke-table-width");b.theight=c.one(".ke-table-height");b.tborder=c.one(".ke-table-border");b.tcaption=c.one(".ke-table-caption");b.talign=i.Select.decorate(c.one(".ke-table-align"));b.trows=c.one(".ke-table-rows");b.tcols=c.one(".ke-table-cols");b.thead=i.Select.decorate(c.one(".ke-table-head"));var d=b.foot.one(".ke-table-ok"),f=b.foot.one(".ke-table-cancel");
b.twidthunit=i.Select.decorate(c.one(".ke-table-width-unit"));a.tableDialog=b;d.on("click",a._tableOk,a);b.on("hide",function(){a.selectedTable=null});f.on("click",function(){b.hide()})},_tableOk:function(){var a=this.tableDialog,b=a.el.all("input");if(a.twidthunit.val()=="%"){a=parseInt(a.twidth.val());if(!a||a>100||a<0){alert("宽度百分比：请输入1-100之间");return}}if(i.Utils.verifyInputs(b))this.selectedTable?this._modifyTable():this._genTable()},_modifyTable:function(){var a=this.tableDialog,b=this.selectedTable,
c=b.one("caption");h(a.talign.val())?b.attr("align",l(a.talign.val())):b.removeAttr("align");h(a.tborder.val())?b.attr("border",l(a.tborder.val())):b.removeAttr("border");!h(a.tborder.val())||a.tborder.val()=="0"?b.addClass("ke_show_border"):b.removeClass("ke_show_border");h(a.twidth.val())?b.css("width",l(a.twidth.val())+a.twidthunit.val()):b.css("width","");h(a.theight.val())?b.css("height",l(a.theight.val())):b.css("height","");if(h(a.tcaption.val())){var d=i.Utils.htmlEncode(l(a.tcaption.val()));
c&&c[0]?c.html(d):(new m("<caption><span>"+d+"</span></caption>")).insertBefore(b[0].firstChild)}else c&&c._4e_remove();a.hide()},_genTable:function(){var a=this.tableDialog,b="<table ",c,d=parseInt(a.tcols.val())||1,f=parseInt(a.trows.val())||1,e=u.ie?"":"<br/>",g=this.editor;if(h(a.talign.val()))b+="align='"+l(a.talign.val())+"' ";if(h(a.tborder.val()))b+="border='"+l(a.tborder.val())+"' ";if(h(a.twidth.val())||h(a.theight.val())){b+="style='";if(h(a.twidth.val()))b+="width:"+l(a.twidth.val())+
a.twidthunit.val()+";";if(h(a.theight.val()))b+="height:"+l(a.theight.val())+"px;";b+="' "}if(!h(a.tborder.val())||l(a.tborder.val())=="0")b+="class='ke_show_border' ";b+=">";if(h(a.tcaption.val()))b+="<caption><span>"+i.Utils.htmlEncode(l(a.tcaption.val()))+"</span></caption>";if(a.thead.val()){b+="<thead>";b+="<tr>";for(c=0;c<d;c++)b+="<th>"+e+"</th>";b+="</tr>";b+="</thead>";f-=1}b+="<tbody>";for(var j=0;j<f;j++){b+="<tr>";for(c=0;c<d;c++)b+="<td>"+e+"</td>";b+="</tr>"}b+="</tbody>";b+="</table>";
b=new m(b,null,g.document);g.insertElement(b);a.hide()},_fillTableDialog:function(){var a=this.tableDialog,b=this.selectedTable,c=b.one("caption");a.talign.val(b.attr("align")||"");a.tborder.val(b.attr("border")||"");var d=b._4e_style("width")||"";a.twidth.val(d.replace(/px|%/i,""));d.indexOf("%")!=-1?a.twidthunit.val("%"):a.twidthunit.val("px");a.theight.val((b._4e_style("height")||"").replace(/px|%/i,""));d="";if(c)d=c.text();a.tcaption.val(d);a.trows.val(b.one("tbody").children().length);a.tcols.val(b.one("tr").children().length);
a.thead.val(b._4e_first(function(f){return f._4e_name()=="thead"})?"1":"")},_realTableShow:function(){if(this.selectedTable){this._fillTableDialog();this.tableDialog.body.all(".ke-table-create-only").attr("disabled","disabled")}else this.tableDialog.body.all(".ke-table-create-only").removeAttr("disabled");this.tableDialog.show()},_prepareTableShow:function(){this._tableInit()},_tableShow:function(){this._prepareTableShow()}});var A=/^(?:td|th)$/,F={"表格属性":function(a){var b=a.getSelection();if(b=(b=
b&&b.getStartElement())&&b._4e_ascendant("table",true)){a=a._toolbars.table;a.selectedTable=b;a._tableShow()}},"删除表格":function(a){var b=(a=a.getSelection())&&a.getStartElement();if(b=b&&b._4e_ascendant("table",true)){a.selectElement(b);var c=a.getRanges()[0];c.collapse();a.selectRanges([c]);a=b.parent();a[0].childNodes.length==1&&a._4e_name()!="body"&&a._4e_name()!="td"?a._4e_remove():b._4e_remove()}},"删除行 ":function(a){a=a.getSelection();E(x(a),t)},"删除列 ":function(a){a=a.getSelection();(a=D(a))&&
E(a,true)},"在上方插入行":function(a){a=a.getSelection();B(a,true)},"在下方插入行":function(a){a=a.getSelection();B(a,t)},"在左侧插入列":function(a){a=a.getSelection();C(a,true)},"在右侧插入列":function(a){a=a.getSelection();C(a,t)}};i.TableUI=k}();s.addPlugin(function(){var k=s.document;new i.TableUI(s);var h=y.create("<style>",null,k);k.getElementsByTagName("head")[0].appendChild(h);if(h.styleSheet)h.styleSheet.cssText=w;else h.appendChild(k.createTextNode(w))})});
