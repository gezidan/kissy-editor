KISSY.Editor.add("htmlparser-filter",function(){function j(a){this._={elementNames:[],attributeNames:[],elements:{$length:0},attributes:{$length:0}};a&&this.addRules(a,10)}function k(a,b){for(var c=0;a&&c<b.length;c++){var d=b[c];a=a.replace(d[0],d[1])}return a}function i(a,b,c){if(typeof b=="function")b=[b];var d,f;f=a.length;var e=b&&b.length;if(e){for(d=0;d<f&&a[d].pri<c;d++);for(f=e-1;f>=0;f--)if(e=b[f]){e.pri=c;a.splice(d,0,e)}}}function l(a,b,c){if(b)for(var d in b){var f=a[d];a[d]=h(f,b[d],
c);f||a.$length++}}function h(a,b,c){if(b){b.pri=c;if(a){if(a.splice)i(a,b,c);else{a=a.pri>c?[b,a]:[a,b];a.filter=n}return a}else return b.filter=b}}function n(a){for(var b=a.type||a instanceof g.HtmlParser.Fragment,c=0;c<this.length;c++){if(b)var d=a.type,f=a.name;var e=this[c].apply(window,arguments);if(e===false)return e;if(b){if(e&&(e.name!=f||e.type!=d))return e}else if(typeof e!="string")return e;e!=undefined&&(a=e)}return a}var g=KISSY.Editor,m=g.NODE;if(!g.HtmlParser.Filter){KISSY.augment(j,
{addRules:function(a,b){if(typeof b!="number")b=10;i(this._.elementNames,a.elementNames,b);i(this._.attributeNames,a.attributeNames,b);l(this._.elements,a.elements,b);l(this._.attributes,a.attributes,b);this._.text=h(this._.text,a.text,b)||this._.text;this._.comment=h(this._.comment,a.comment,b)||this._.comment;this._.root=h(this._.root,a.root,b)||this._.root},onElementName:function(a){return k(a,this._.elementNames)},onAttributeName:function(a){return k(a,this._.attributeNames)},onText:function(a){var b=
this._.text;return b?b.filter(a):a},onComment:function(a,b){var c=this._.comment;return c?c.filter(a,b):a},onFragment:function(a){var b=this._.root;return b?b.filter(a):a},onElement:function(a){for(var b=[this._.elements["^"],this._.elements[a.name],this._.elements.$],c,d=0;d<3;d++)if(c=b[d]){c=c.filter(a,this);if(c===false)return null;if(c&&c!=a)return this.onNode(c);if(a.parent&&!a.name)break}return a},onNode:function(a){var b=a.type;return b==m.NODE_ELEMENT?this.onElement(a):b==m.NODE_TEXT?new g.HtmlParser.Text(this.onText(a.value)):
null},onAttribute:function(a,b,c){if(b=this._.attributes[b]){a=b.filter(c,a,this);if(a===false)return false;if(typeof a!="undefined")return a}return c}});g.HtmlParser.Filter=j}});