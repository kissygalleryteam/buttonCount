/*
combined files : 

kg/buttonCount/2.0.0/index

*/
/**
 * @fileoverview 
 * @author 仙凌<xianling.cly@taobao.com>
 * @module buttonCount
 **/
KISSY.add('kg/buttonCount/2.0.0/index',function (S, DOM, Base, Event, IO) {
    
	var DISABLED_CLASS = "ks-disabled-button",
		ENABLE_CLASS = "ks-enable-button",
		DEFAULT_TEMPLATE = "{count}",
		ABSOLUTE_ADDR_PATTERN = /^(https?\:\/\/)/;  // 绝对地址（http开头）正则表达式
	/**
	 * 默认配置
	 */	
	var defaultConfig = 
	{
		disabledClass: DISABLED_CLASS, 
		enabledClass: ENABLE_CLASS,
		initialized: false, 
		count: 60,         
		countTemplate: DEFAULT_TEMPLATE
	};
	/**
     * 
     * @class ButtonCount
     * @constructor
     * @extends Base
     */
    function ButtonCount(config) {
        var self = this;
        //调用父类构造函数
        ButtonCount.superclass.constructor.call(self, config);
		//初始化
		self.initializer(config);
    }
    S.extend(ButtonCount, Base, {
		/**
		 * 初始化入口
		 * @name initializer
		 */	
		initializer: function(config){
			var self = this;
			self.config = config = KISSY.merge(defaultConfig, config, true);
			if(config.hook){
				if(typeof config.hook.data == "undefined"){
					config.hook.data = {};
				}
				self.set('hook', config.hook);
			}
			self._renderUI();
			self._bindEvent();
		},
		/**
		 * 渲染按钮
		 * @name _renderUI
		 */
		_renderUI: function(){
			var self = this, _init = self.get('initialized');
			if(_init)
			{
				self._initButton();
			}
		},
		/**
		 * 初始化按钮状态
		 * @name _initButton
		 */
		_initButton: function(){
			var self = this, srcNode = self.get('srcNode'), dcls = self.get('disabledClass'), ecls = self.get('enabledClass');
			if(self._isEnabled())
			{ //按钮若不可点击，置为可点击
				DOM.hasClass(dcls) && DOM.removeClass(srcNode, dcls);
				(!DOM.hasClass(ecls)) && DOM.addClass(srcNode, ecls);
			}
			else
			{
				DOM.hasClass(ecls) && DOM.removeClass(srcNode, ecls);
				(!DOM.hasClass(dcls)) && DOM.addClass(srcNode, dcls);
			}
		},
		/**
		 * 绑定事件
		 * @name _bindEvent
		 */
		_bindEvent: function(){
			var self = this, srcNode;
			node = self.get('srcNode');
			Event.on(node, 'click', self._handler, self);
		},
		/**
		 * 触发按钮时的调用函数
		 * @name _handler
		 */
		_handler: function(e){
			var self = this, el = e.currentTarget, tpl = self.get('defaultTemplate'), url, data;
			e.preventDefault();
			self.button = (el.tagName ==="BUTTON") ? el : DOM.get('button', el);
			self.defaultTemplate = tpl ? tpl : DOM.html(self.button);
			//在这里面填充请求的其他数据
			self.fire('click');		
			self.disabled();
			if(self.get('hook')){
				var ajaxConfig = self.get('hook');				
				if (url = ajaxConfig.url)
				{
					/**
					 * @param url {String} 请求地址
                     * @param data {Object} 请求参数
					 * @param timeout {number} 超时时间 默认10s
                     * @param type {String} 请求方式（get/post，默认：get）
                     * @param context {Object} 调用上下文,默认是当前对象
					 */
					IO(
					{
						url: url,
						dataType: this._getIOType(url),
						data: ajaxConfig.data,
						cache: false,
						type: ajaxConfig.type,
						timeout: ajaxConfig.timeout || 10,
						success: function(data,textStatus,io)
						{
							if(self.fire('success',{data: data}) !== false){
								self.start();
							}
						},
						error: function(data,textStatus,io)
						{
							if(self.fire('error',{data: data}) !== false)
							{
								self.stop();
							}
						},
						context: ajaxConfig.context || self
					});
				}
			}
		},
		/**
         * 判断是否绝对地址
         * @param url {String} 地址
         * @returns {String/Boolean} 若为绝对地址，则返回协议类型（http://或https://），否则返回false
         */
        _isAbsoluteAddr: function(url)
        {
            var matched;
            return url && (matched = url.match(ABSOLUTE_ADDR_PATTERN)) ? matched[1] : false;
        },
		 /**
         * 获取与后端交互方式
         * @returns {String} 如果跨域，则返回"jsonp"，默认返回"json"
         */
        _getIOType: function(url)
        {
            var protocol = this._isAbsoluteAddr(url);
            // 如果URL为绝对地址，且非当前域名，则为跨域，否则为当前域
            return protocol && ! KISSY.startsWith(url, protocol + window.location.host) ? "jsonp" : "json";
        },
		/**
		 * 判断按钮是否可用
		 * @name _isEnabled
		 * return {boolean} true:可点击，false:不可点击
		 */
		_isEnabled: function(){
			return !DOM.prop(this.button, 'disabled');
		},
		/**
		 * 禁用按钮
		 * @name disable
		 */
		disabled: function(){
			var self = this, srcNode = self.get('srcNode'), dCls, eCls;
			if(self._isEnabled())
			{ 
				dCls = self.get('disabledClass'), eCls = self.get('enabledClass');
				DOM.prop(self.button, 'disabled', true);
				DOM.removeClass(srcNode,eCls);
				DOM.addClass(srcNode, dCls);
				self.fire("disabled");
			}
		},
		/**
		 * 按钮可用
		 * @name enable
		 */
		enable: function(){
			var self = this, srcNode = self.get('srcNode'), dCls, eCls;
			if(!self._isEnabled())
			{
				dCls = self.get('disabledClass'), eCls = self.get('enabledClass');
				DOM.prop(self.button, 'disabled', false);
				DOM.removeClass(srcNode, dCls);
				DOM.addClass(srcNode,eCls);
				self.fire("enable");
			}
		},
		/**
		 * 开始倒计时
		 * @name start
		 * @param node 显示倒计时的节点
		 */
		start: function(){
			var self = this;
			self.countContainer = self.nodeCount || self.button;
			self.count = self.get('count')
			self.timer && clearTimeout(self.timer);
			self._updateTime();
		},
		/**
		 * 倒计时
		 * @name _updateTime
		 */
		_updateTime: function(){
			var self = this, html, node = self.countContainer, countTpl;
			countTpl = self.get('countTemplate');
			if(self.count > 0)
			{
				html  = S.substitute(countTpl, {count: self.count});
				DOM.html(node,html);
			}
			else
			{
				//可设置stop的操作方式。默认操作：按钮恢复为默认值
				if(self.fire('stop') !== false){
					self.stop();
				}
				return;
			}
			self.timer = setTimeout(function(e)
			{
				self.count--;
				//调用_updateTime()
				self._updateTime.call(self);	
			},2.0.00);
		},
		/**
		 * 停止倒计时
		 * @name stop 
		 */
		stop: function(){
			var self = this;
			if(self.timer)
			{
				clearTimeout(self.timer);
				//停止倒计时后，填充默认按钮文案
				self.setContent(self.defaultTemplate); 				
			}			
			self.enable();
		},
		/**
		 * 给按钮设置文案
		 * @name  setContent
		 * @param txt 显示的文案
		 */
		setContent: function(txt){
			DOM.html(this.button, txt);
		},
		/**
	     * 倒计时{count}显示节点
		 */
		setCountNode: function(node){
			this.nodeCount = node; 
		}
    }, {
		ATTRS : {
			/**
		     * 节点
			 */
			srcNode :{
				
			},
			/**
			 * 默认模板
			 */
			defaultTemplate: {
				value: ""
			},
			/**
			 * 倒计时时模板,例如:({count}秒后)，重新发送邮件
			 */
			countTemplate:{  
				value: ""
			},
			/**
			 * 倒计时时间。默认为60秒。单位秒
			 */
			count: {
				value: 60
			},
			/**
			 * 初始化按钮样式
			 */
			initialized: {
				value: false
			},
			/**
			 * 按钮不可操作样式
			 */
			disabledClass:{
				value: ''
			},
			/**
		     * 按钮可操作样式
			 */
			enableClass:{
				value: ''
			}
    }});
	
	S.augment(ButtonCount, Event.Target);
    
	return ButtonCount;
	
}, {requires:['dom', 'base', 'event', 'ajax']});
