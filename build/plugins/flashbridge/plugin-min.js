KISSY.Editor.add("flashbridge",function(){function f(a){this._init(a)}var d=KISSY,g=d.Editor;if(!g.FlashBridge){var h={};d.augment(f,d.EventTarget,{_init:function(a){var b=d.guid("flashbridge-");a.flashVars=a.flashVars||{};a.attrs=a.attrs||{};var c=a.flashVars;d.mix(a.attrs,{id:b,width:100,height:100,allowScriptAccess:"always",allowNetworking:"all",scale:"noScale"},false);d.mix(c,{allowedDomain:location.hostname,shareData:true,YUISwfId:b,YUIBridgeCallback:"KISSY.Editor.FlashBridge.EventHandler",useCompression:true},
false);h[b]=this;this.id=b;this.swf=g.Utils.flash.createSWFRuntime(a.movie,a);this._expose(a.methods)},_expose:function(a){for(var b=this,c=0;c<a.length;c++)(function(e){b[e]=function(){b._callSWF(e,d.makeArray(arguments))}})(a[c])},_callSWF:function(a,b){b=b||[];try{if(this.swf[a])return this.swf[a].apply(this.swf,b)}catch(c){var e="";if(b.length!==0)e="'"+b.join("","")+"'";return(new Function("self","return self.swf."+a+"("+e+");"))(this)}},_eventHandler:function(a){var b=a.type;if(b==="log")d.log(a.message);
else b&&this.fire(b,a)},_destroy:function(){delete h[this.id]}});f.EventHandler=function(a,b){var c=h[a];c&&setTimeout(function(){c._eventHandler.call(c,b)},100)};g.FlashBridge=f}});