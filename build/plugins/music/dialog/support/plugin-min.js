KISSY.Editor.add("music/dialog/support",function(){function d(){d.superclass.constructor.apply(this,arguments)}var e=KISSY,c=e.Editor,h=/#\(music\)/g;c.MusicInserter.Dialog=d;e.extend(d,c.Flash.FlashDialog,{_config:function(){this._cls="ke_music";this._type="music";this._title="\u97f3\u4e50";this._bodyHtml="<div style='padding:20px 20px 0 20px'><p><label>\u7f51\u5740\uff1a <input  data-verify='^https?://[^\\s]+$'  data-warning='\u7f51\u5740\u683c\u5f0f\u4e3a\uff1ahttp://' class='ke-music-url ke-input' style='width:300px;vertical-align:middle'  /></label></p><p style='margin: 10px 0 10px 40px;'><label style='vertical-align:middle'>\u5bf9\u9f50\uff1a <select class='ke-music-align'><option value='none'>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></label><label style='margin-left:25px;'>\u95f4\u8ddd\uff1a <input  data-verify='^\\d+$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6574\u6570' class='ke-music-margin ke-input' style='width:60px;vertical-align:middle' value='5'/> \u50cf\u7d20</label></p></div>";
this._footHtml="<div style='padding:5px 20px 20px;'><a class='ke-music-ok ke-button' style='margin:0 20px 0 40px;'>\u786e\u5b9a</a> <a class='ke-music-cancel ke-button'>\u53d6\u6d88</a></div>";this._config_dwidth="400px";this._urlTip="\u8bf7\u8f93\u5165\u5982 http://xxx.com/xx.mp3"},_initD:function(){var b=this.d,a=b.get("el");this.dUrl=a.one(".ke-music-url");this.dAlign=c.Select.decorate(a.one(".ke-music-align"));this.dMargin=a.one(".ke-music-margin");var f=a.one(".ke-music-ok");a=a.one(".ke-music-cancel");f.on("click",this._gen,this);
a.on("click",function(g){g&&g.halt();b.hide()});c.Utils.placeholder(this.dUrl,this._urlTip);this.addRes(f,a,this.dUrl)},_getDInfo:function(){return{url:(((this.editor.cfg.pluginConfig.music||{}).musicPlayer||"niftyplayer.swf")+"?file=#(music)").replace(h,this.dUrl.val()),attrs:{width:165,height:37,style:"margin:"+(parseInt(this.dMargin.val())||0)+"px;float:"+this.dAlign.val()+";"}}},_getFlashUrl:function(b){return d.superclass._getFlashUrl.call(this,b).replace(/^.+niftyplayer\.swf\?file=/,"")},_updateD:function(){var b=
this.editor,a=this.selectedFlash;if(a){b=b.restoreRealElement(a);c.Utils.valInput(this.dUrl,this._getFlashUrl(b));this.dAlign.val(a.css("float"));this.dMargin.val(parseInt(b._4e_style("margin"))||0)}else{c.Utils.resetInput(this.dUrl);this.dAlign.val("none");this.dMargin.val("5")}}})},{requires:["flash/dialog/support"]});
