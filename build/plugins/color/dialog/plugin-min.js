KISSY.Editor.add("color/dialog",function(c){var a=KISSY.Editor;a.use("colorsupport/dialog/colorpicker",function(){var b=new a.ColorSupport.ColorPicker;c.addDialog("color/dialog",{show:function(d){b.show(d)},hide:function(){b.hide()}})})});