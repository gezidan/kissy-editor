KISSY.Editor.add("bangpai-upload",function(n){var f=KISSY,i=f.Editor;if(!i.BangPaiUpload){(function(){function o(a){this.editor=a;this._init()}var q=f.DOM,g=f.Node,r=i.Config.base+i.Utils.debugUrl("plugins/uploader/uploader.swf"),l={};name="ke-bangpai-upload";q.addStyleSheet(".ke-upload-list {width:100%;}.ke-upload-list th {border-top:1px solid #c1c8d1;background-color:#EBEDF1;}.ke-upload-list td,.ke-upload-list th {padding:0.5em;text-align:center;border-bottom:1px solid #c1c8d1;}","ke-BangPaiUpload");
f.augment(o,f.EventTarget,{_init:function(){var a=this.editor,b=a.cfg.pluginConfig["bangpai-upload"],c=b.holder,d=f.isString(c)?f.one(c):c,e=(new g("<div style='position:relative;margin:10px;'>批量上传图片：</div>")).appendTo(d);c=(new g("<button disabled='disabled'>浏览</button>")).appendTo(e);var s=c.offset();e.offset();e=(new g("<div style='"+("position:absolute;width:"+(c.width()+8)+"px;height:"+(c.height()+8)+"px;z-index:9999;")+"'>")).appendTo(e);var p=(new g("<div><table class='ke-upload-list'><thead><tr><th>图片</td><th>大小</td><th>上传进度</td><th>图片操作</td></tr></thead><tbody></tbody></table></div>")).appendTo(d).one("tbody");
d=(new g("<p style='margin:10px;text-align:right;'><button>确定上传</button></p>")).appendTo(d).one("button");var k=f.guid(name);this.btn=c;this.up=d;e.offset(s);var h=new i.FlashBridge({movie:r,methods:["removeFile","cancel","removeFile","setAllowMultipleFiles","setFileFilters","uploadAll"],holder:e,attrs:{width:c.width(),height:c.height()},flashVars:{menu:true}});this.uploader=h;this._list=p;this._ds=b.serverUrl;this._dsp=b.serverParams||{};p.on("click",function(j){var m=new g(j.target);j.halt();if(m.hasClass("ke-upload-insert")){j=
m.parent("tr");url=j.attr("url");a.insertElement(new g("<img src='"+url+"'/>",null,a.document))}else if(m.hasClass("ke-upload-delete")){j=m.parent("tr");k=j.attr("fid");try{h.cancel(k)}catch(t){}h.removeFile(k);l[k].destroy();delete l[k];j._4e_remove()}});h.on("fileSelect",this._onSelect,this);h.on("uploadStart",this._onUploadStart,this);h.on("uploadProgress",this._onProgress,this);h.on("uploadComplete",this._onComplete,this);h.on("uploadCompleteData",this._onUploadCompleteData,this);h.on("swfReady",
this._ready,this)},_onUploadStart:function(a){this.uploader.removeFile(a.id)},_onComplete:function(){},_onUploadCompleteData:function(a){var b=f.trim(a.data).replace(/\\r||\\n/g,"");a=a.id;var c=this._list.all("tr");if(b){b=JSON.parse(b);if(b.error)alert(b.error);else for(var d=0;d<c.length;d++){var e=new g(c[d]);if(e.attr("fid")==a){e.one(".ke-upload-insert").show();e.attr("url",b.imgUrl)}}}},_onProgress:function(a){var b=Math.floor(a.bytesLoaded*100/a.bytesTotal);(a=l[a.id])&&a.set("progress",b)},
_onSelect:function(a){var b=this._list;if(a=a.fileList)for(var c in a)if(a.hasOwnProperty(c)){var d=a[c],e=(new g("<tr fid='"+d.id+"'><td>"+d.name+"</td><td>"+Math.floor(d.size/1E3)+"k</td><td class='ke-upload-progress'></td><td><a href='#' class='ke-upload-insert' style='display:none'>[插入]</a> &nbsp; <a href='#' class='ke-upload-delete'>[删除]</a> &nbsp; </td></tr>")).appendTo(b);l[d.id]=new i.ProgressBar({container:e.one(".ke-upload-progress"),width:"100px",height:"18px"})}},_ready:function(){var a=
this,b=a.uploader,c=a.up;a.btn[0].disabled=false;b.setAllowMultipleFiles(true);b.setFileFilters([{extensions:"*.jpeg;*.jpg;*.png;*.gif",description:"图片文件( png,jpg,jpeg,gif )"}]);c.on("click",function(){b.uploadAll(a._ds,"POST",a._dsp,"Filedata")})}});i.BangPaiUpload=o})();n.addPlugin(function(){new i.BangPaiUpload(n)})}},{attach:false,requires:["flashutils","progressbar","flashbridge"]});
