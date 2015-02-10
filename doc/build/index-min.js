/*! buttonCount - v2.0.0 - 2013-10-17 7:10:14 AM
* Copyright (c) 2013 仙凌; Licensed  */
KISSY.add("kg/buttonCount/2.0.0/index",function(a,b,c,d,e){function f(a){var b=this;f.superclass.constructor.call(b,a),b.initializer(a)}var g="ks-disabled-button",h="ks-enable-button",i="{count}",j=/^(https?\:\/\/)/,k={disabledClass:g,enabledClass:h,initialized:!1,count:60,countTemplate:i};return a.extend(f,c,{initializer:function(a){var b=this;b.config=a=KISSY.merge(k,a,!0),a.hook&&("undefined"==typeof a.hook.data&&(a.hook.data={}),b.set("hook",a.hook)),b._renderUI(),b._bindEvent()},_renderUI:function(){var a=this,b=a.get("initialized");b&&a._initButton()},_initButton:function(){var a=this,c=a.get("srcNode"),d=a.get("disabledClass"),e=a.get("enabledClass");a._isEnabled()?(b.hasClass(d)&&b.removeClass(c,d),!b.hasClass(e)&&b.addClass(c,e)):(b.hasClass(e)&&b.removeClass(c,e),!b.hasClass(d)&&b.addClass(c,d))},_bindEvent:function(){var a=this;node=a.get("srcNode"),d.on(node,"click",a._handler,a)},_handler:function(a){var c,d=this,f=a.currentTarget,g=d.get("defaultTemplate");if(a.preventDefault(),d.button="BUTTON"===f.tagName?f:b.get("button",f),d.defaultTemplate=g?g:b.html(d.button),d.fire("click"),d.disabled(),d.get("hook")){var h=d.get("hook");(c=h.url)&&e({url:c,dataType:this._getIOType(c),data:h.data,cache:!1,type:h.type,timeout:h.timeout||10,success:function(a){d.fire("success",{data:a})!==!1&&d.start()},error:function(a){d.fire("error",{data:a})!==!1&&d.stop()},context:h.context||d})}},_isAbsoluteAddr:function(a){var b;return a&&(b=a.match(j))?b[1]:!1},_getIOType:function(a){var b=this._isAbsoluteAddr(a);return b&&!KISSY.startsWith(a,b+window.location.host)?"jsonp":"json"},_isEnabled:function(){return!b.prop(this.button,"disabled")},disabled:function(){var a,c,d=this,e=d.get("srcNode");d._isEnabled()&&(a=d.get("disabledClass"),c=d.get("enabledClass"),b.prop(d.button,"disabled",!0),b.removeClass(e,c),b.addClass(e,a),d.fire("disabled"))},enable:function(){var a,c,d=this,e=d.get("srcNode");d._isEnabled()||(a=d.get("disabledClass"),c=d.get("enabledClass"),b.prop(d.button,"disabled",!1),b.removeClass(e,a),b.addClass(e,c),d.fire("enable"))},start:function(){var a=this;a.countContainer=a.nodeCount||a.button,a.count=a.get("count"),a.timer&&clearTimeout(a.timer),a._updateTime()},_updateTime:function(){var c,d,e=this,f=e.countContainer;return d=e.get("countTemplate"),e.count>0?(c=a.substitute(d,{count:e.count}),b.html(f,c),e.timer=setTimeout(function(){e.count--,e._updateTime.call(e)},1e3),void 0):(e.fire("stop")!==!1&&e.stop(),void 0)},stop:function(){var a=this;a.timer&&(clearTimeout(a.timer),a.setContent(a.defaultTemplate)),a.enable()},setContent:function(a){b.html(this.button,a)},setCountNode:function(a){this.nodeCount=a}},{ATTRS:{srcNode:{},defaultTemplate:{value:""},countTemplate:{value:""},count:{value:60},initialized:{value:!1},disabledClass:{value:""},enableClass:{value:""}}}),a.augment(f,d.Target),f},{requires:["dom","base","event","ajax"]});