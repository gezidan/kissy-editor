KISSY.Editor.add("link/dialog",function(i){var h=KISSY,c=h.Editor,d=c.Link;d.Dialog||function(){function j(a){this.editor=a;c.Utils.lazyRun(this,"_prepareShow","_real")}var l=d.checkLink,m=d._removeLink,n=c.Style,o=h.Node,p=c.Range,q=c.SimpleOverlay,k=d._ke_saved_href,r=d.link_Style;d.Dialog=j;h.augment(j,{_prepareShow:function(){var a=this,b=new q({title:"\u94fe\u63a5",mask:true});a.dialog=b;b.body.html("<div style='padding:20px 20px 0 20px'><p><label>\u94fe\u63a5\u7f51\u5740\uff1a <input  data-verify='^(https?://[^\\s]+)|(#.+)$'  data-warning='\u8bf7\u8f93\u5165\u5408\u9002\u7684\u7f51\u5740\u683c\u5f0f' class='ke-link-url ke-input' style='width:390px;vertical-align:middle;' /></label></p><p style='margin: 15px 0 10px 64px;'><label><input class='ke-link-blank' type='checkbox'/> &nbsp; \u5728\u65b0\u7a97\u53e3\u6253\u5f00\u94fe\u63a5</label></p></div>");
b.foot.html("<a class='ke-link-ok ke-button' style='margin-left:65px;margin-right:20px;'>\u786e\u5b9a</a> <a class='ke-link-cancel ke-button'>\u53d6\u6d88</a>");b.urlEl=b.body.one(".ke-link-url");b.targetEl=b.body.one(".ke-link-blank");var f=b.foot.one(".ke-link-cancel");b.foot.one(".ke-link-ok").on("click",function(){a._link()},a);f.on("click",function(){b.hide()},a);c.Utils.placeholder(b.urlEl,"http://")},_getSelectedLink:function(){var a=this.editor.getSelection();if(a=a&&a.getStartElement())a=l(a);return a},_link:function(){var a,
b=this.editor,f=this.dialog,g=f.urlEl.val(),e;if(c.Utils.verifyInputs(f.el.all("input"))){f.hide();if(e=this._getSelectedLink()){a=new p(b.document);a.selectNodeContents(e);b.getSelection().selectRanges([a]);m(e,b)}e={href:g,_ke_saved_href:g};e.target=f.targetEl[0].checked?"_blank":"_self";a=b.getSelection().getRanges()[0];if(a.collapsed){a=new o("<a href='"+g+"' "+k+"='"+g+"' target='"+e.target+"'>"+g+"</a>",null,b.document);b.insertElement(a)}else{b.fire("save");a=new n(r,e);a.apply(b.document);
b.fire("save")}b.notifySelectionChange()}},_real:function(){var a=this.dialog,b=this._getSelectedLink();a.link=this;if(b){a.urlEl.val(b.attr(k)||b.attr("href"));a.targetEl[0].checked=b.attr("target")=="_blank"}else c.Utils.resetInput(a.urlEl);a.show()},show:function(){this._prepareShow()}})}();i.addDialog("link/dialog",new d.Dialog(i))});
