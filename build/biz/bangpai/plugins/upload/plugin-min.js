KISSY.Editor.add("bangpai-upload",function(b){var a=KISSY.Editor;a.Env.mods["bangpai-upload/dialog"]||a.add({"bangpai-upload/dialog":{attach:false,charset:"utf-8",requires:["flashutils","progressbar","flashbridge"],path:a.Utils.debugUrl("biz/bangpai/plugins/upload/dialog/plugin.js")}});b.ready(function(){a.use("button localstorage",function(){b.addButton("bangpai-upload",{contentCls:"ke-toolbar-mul-image",title:"\u6279\u91cf\u63d2\u56fe",mode:a.WYSIWYG_MODE,offClick:function(){this.editor.useDialog("bangpai-upload/dialog",
function(c){c.show()})}})})})},{attach:false});
