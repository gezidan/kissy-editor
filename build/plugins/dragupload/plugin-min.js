KISSY.Editor.add("dragupload",function(m){function p(a,f){var d=new FileReader;d.onload=function(e){var g=a.name;e=e.target.result;var b=new XMLHttpRequest;b.open("POST",q,true);b.onreadystatechange=function(){if(b.readyState==4)if(b.status==200||b.status==304){if(b.responseText!=""){var r=h.JSON.parse(b.responseText);f[0].src=r.imgUrl}}else{alert("\u670d\u52a1\u5668\u7aef\u51fa\u9519\uff01");f._4e_remove();h.log(b)}};var c="\r\n------kissy-editor-2.1\r\n";c+='Content-Disposition: form-data; name="'+s+'"; filename="'+encodeURIComponent(g)+
'"\r\n';c+="Content-Type: "+(a.type||"application/octet-stream")+"\r\n\r\n";c+=e+"\r\n";i=n.Utils.normParams(i);for(var l in i)if(i.hasOwnProperty(l)){c+="------kissy-editor-2.1\r\n";c+='Content-Disposition: form-data; name="'+l+'"\r\n\r\n';c+=i[l]+"\r\n"}c+="------kissy-editor-2.1--";b.setRequestHeader("Content-Type","multipart/form-data, boundary=----kissy-editor-2.1");b.sendAsBinary("Content-Type: multipart/form-data; boundary=----kissy-editor-2.1\r\nContent-Length: "+c.length+"\r\n"+c+"\r\n")};
d.readAsBinaryString(a)}var h=KISSY,n=h.Editor,t=h.Node,o=h.Event,u=h.UA,j=m.cfg.pluginConfig.dragupload||{},s=j.fileInput||"Filedata",v=j.sizeLimit||Number.MAX_VALUE,i=j.serverParams||{},q=j.serverUrl||"",w=RegExp((j.surfix||"png,jpg,jpeg,gif").split(/,/).join("|")+"$","i"),k=m.document;o.on(k,"dragenter dragover",function(a){a.halt()});o.on(k,"drop",function(a){a.halt();a=a.originalEvent;h.log(a);var f,d;if(u.gecko)h.all("img",k.body).each(function(c){if(c[0].hasAttribute("_moz_dirty")){f=c[0].nextSibling;
d=c[0].parentNode;c._4e_remove()}});else{d=k.elementFromPoint(a.clientX,a.clientY);f=d.lastChild}a=a.dataTransfer;a.dropEffect="copy";if(a=a.files)for(var e=0;e<a.length;e++){var g=a[e],b=g.size;if(g.name.match(w))if(!(b/1E3>v)){b=new t("<img src='"+(n.Config.base+"../theme/loading.gif")+"'/>");d.insertBefore(b[0],f);p(g,b)}}});if(window.XMLHttpRequest&&!XMLHttpRequest.prototype.sendAsBinary)XMLHttpRequest.prototype.sendAsBinary=function(a,f){for(var d=new BlobBuilder,e=a.length,g=new Uint8Array(e),
b=0;b<e;b++)g[b]=a.charCodeAt(b);d.append(g.buffer);this.send(d.getBlob(f))}},{attach:false});