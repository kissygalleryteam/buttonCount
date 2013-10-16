## 综述

* 版本：1.0
* 作者：仙凌
* demo：[http://gallery.kissyui.com/buttonCount/1.0/demo/index.html](http://gallery.kissyui.com/buttonCount/1.0/demo/index.html)


## 组件介绍

buttonCount，按钮倒计时组件。

- 基本的功能：点击按钮，触发ajax请求，按钮开始倒计时
- 自动检测发送请求的类型：ajax or jsonp
- 倒计时模版可以配置。参数countTemplate，默认：{count}。count值使用占位符用{}包起来。
- 倒计时时间可配置，参数count，默认是60秒
- 提供了一些事件。可根据业务的实际情况进行操作，做到最大的灵活性。例如：在点击按钮的时候动态添加ajax参数（click），倒计时结束之后对界面的一些处理（stop）等等
## 使用指南

引入文件：

 	<script src="http://a.tbcdn.cn/s/kissy//1.3.0/kissy-min.js"></script>
>或者

	<script src="http://a.tbcdn.cn/s/kissy//1.3.0/seed-min.js"></script>

使用示例：
	
	<div><button id="J_SendEmail">发送邮件到邮箱</button></div>
		
	<script>
		S.use('gallery/buttonCount/1.0/index', function (S, ButtonCount) {
	         var buttonCount = new ButtonCount({
				srcNode: '#J_SendEmail',
				hook: {
	    			url: 'email.php',
	    			data:{
	    				_tb_token: 'XXX'
	    			}
	    		}
			 });
	    }); 
    </script>   

## API说明

### 参数说明

- srcNode: （必须），按钮节点
- defaultTemplate： 倒计时停止时，按钮的默认文案。不写次参数，默认结束的按钮文案等于开始时前按钮显示的文案
- countTemplate： 倒计时模版 ，默认：{count}
- count：{Number} 倒计时时间，默认60秒，单位：秒
- disabledClass： {String}倒计时，按钮disabled期间的按钮样式
- enableClass: {String} 按钮可操作时，按钮的样式
- initialized：{boolean} 按钮的样式是否需要初始化，默认false

### 方法

#### setContent(node)

给按钮设置文案

#### setCountNode(node)

设置倒计时显示的节点。默认为button按钮

#### disabled()

按钮disabled设置为true

#### enable()

按钮disabled设置为false

#### start()

倒计时开始

### 事件


#### click

点击按钮触发

#### disabled

点击按钮开始倒计时，按钮为disabled时触发

#### enable

倒计时结束，按钮还原为可点击状态时触发。

#### success

请求成功时触发。如果未绑定该事件，默认触发start方法。如果不希望start方法执行，可以再绑定success事件的时候return false。

	button.on('success', function(e){
		if(!e.status){
	       this.setContent('操作失败')
	       return false;
	    }
	});


#### error

请求失败时触发。默认是执行stop的方法。 

#### stop 

倒计时结束时触发。默认执行stop方法。














