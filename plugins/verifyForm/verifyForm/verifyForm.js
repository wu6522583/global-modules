define(function(require,exports,module){
	require.async("./css/verifyForm.css");
	(function () {
		// 未进行参数验证
	    // 使用delay来延迟执行函数
	    // 调用delay时，如果不指定参数context，原函数的上下文将被默认指定为window
	    // 参数格式：1、 [arg1, arg2 ...], context, time
	    //           2、 context, time
	    //           3、 time
	    Function.prototype.delay = function () {
	        var args = [];
	        var context = window;
	        var time = 0;

	        // 获取参数
	        if (arguments.length == 1) {
	            time = arguments[0];
	        } else if (arguments.length == 2) {
	            context = arguments[0];
	            time = arguments[1];
	        } else if (arguments.length == 3) {
	            args = arguments[0];
	            context = arguments[1];
	            time = arguments[2];
	        }

	        var func = this;
	        var timeOutObj = setTimeout(function () {
	            func.apply(context, args);
	        }, time);

	        return timeOutObj;
	    };
	})();

	/*================================*/
	/* 自定义消息框 */
	/*================================*/
	$(function() {
		var message = (function() {
			var __$tip;
			var __mergeParam;
			var __defaultParam = {
				message : "",
				target : null,
				source : null
			};

			function _init(param) {
				__mergeParam = $.mergeObject(__defaultParam, param);
				if (!__$tip) {
					__$tip = $("<div class=\"verifyForm-tip\"><span class=\"verifyForm-tip-content\"></span><span class=\"verifyForm-tip-pointer\"></span></div>")
							.appendTo("body");
				}
			}

			function _render() {
				//$(__mergeParam.source).addClass("verifyForm-invalid");
				__$tip.css({
					left : __mergeParam.target.offset().left + __mergeParam.target.outerWidth(),
					top : __mergeParam.target.offset().top
				}).find(".verifyForm-tip-content").html(__mergeParam.message);
			}

			function _bind() {
				$(__mergeParam.source).focus(function() {
					$(this).removeClass("verifyForm-invalid");
					return false;
				});
				$(__mergeParam.source).unbind('mouseenter');
				(function() {
					_hide()
				}).delay(3000);
			}

			function _show() {
				__$tip.css({
					display : "block"
				});
			}

			function _hide() {
				__$tip.css({
					display : "none"
				});
			}

			return function(param) {
				_init(param);
				_render();
				_bind();
				_show();
			}
		})();
		$.extend({
			validateMessage : message
		});
	});

	/*================================*/
	/* 表单验证 */
	/* 为表单域的class加上verify和属性verifyformat="{'notempty':'true','minlength':'2','maxlength':'255'}" */
	/*================================*/
	(function($){
		$.fn.extend({
			'verifyForm' : function(options) {
				var $this = $(this), verify = true, format = '', obj = '';
				ver = {
					callback : $.noop,
					float : false
				};
				if (options) {
					$.extend(ver, options);
				}
				$this.find(".verify").each(function() {
					_this = $(this);
					format = _this.attr('verifyformat');
					if (format) {
						try {
							obj = eval('(' + format + ')');
						} catch (e) {
							alert('错误：' + e.message);
							return verify = false;
						}
						if (_this.attr('notinput')) {
							value = $.trim(_this.text());
						} else if (_this.hasClass('datebox-f')) {
							value = _this.datebox('getValue');
						} else if (_this.hasClass('dateboxtime-f')) {
							value = _this.datetimebox('getValue');
						} else if (_this.hasClass('combobox-f')) {
							value = _this.combobox('getValue');
						} else if (_this.hasClass('combotree-f')) {
							value = _this.combotree('getValue');
						} else {
							value = $.trim(_this.val());
						}
						if (obj.notempty) {
							if (value.length === 0) {
								if (_this.hasClass('datebox-f')
										|| _this.hasClass('datetimebox-f')
										|| _this.hasClass('combobox-f')
										|| _this.hasClass('combotree-f')) {
									$.validateMessage({
										message : '此项为必填项',
										target : _this.next('span'),
										source : _this.next('span')
									});
								} else {
									$.validateMessage({
										message : '此项为必填项',
										target : _this,
										source : _this
									});
								}
								return verify = false;
							}
						}
						if (obj.isphone) {
							if (!$.isEmpty(value) && !$.isPhone(value)) {
								$.validateMessage({
									message : '请输入正确的电话或传真号码！',
									target : _this,
									source : _this
								});
								return verify = false;
							}
						}
						if (obj.ismoible) {
							if (!$.isEmpty(value) && !$.isMobile(value)) {
								$.validateMessage({
									message : '请输入正确的手机号码！',
									target : _this,
									source : _this
								});
								return verify = false;
							}
						}
						if (obj.isemail) {
							if (!$.isEmpty(value) && !$.isEmail(value)) {
								$.validateMessage({
									message : '请输入正确的邮箱！',
									target : _this,
									source : _this
								});
								return verify = false;
							}
						}
						if (obj.isalphabet) {
							if (!$.isEmpty(value) && !$.isAlphabet(value)) {
								$.validateMessage({
									message : '请输入以大小写字母或数字组成的代码！',
									target : _this,
									source : _this
								});
								return verify = false;
							}
						}
						if (obj.isip) {
							if (!$.isEmpty(value) && !$.isIP(value)) {
								$.validateMessage({
									message : '请输入正确的IP地址！',
									target : _this,
									source : _this
								});
								return verify = false;
							}
						}
						if (obj.minlength) {
							if (!$.isEmpty(value) && value.length < obj.minlength) {
								$.validateMessage({
									message : '此项长度不得小于' + obj.minlength + '个字符',
									target : _this,
									source : _this
								});
								return verify = false;
							}
						}
						if (obj.maxlength) {
							if (!$.isEmpty(value) && value.length > obj.maxlength) {
								$.validateMessage({
									message : '此项长度不得大于' + obj.maxlength + '个字符',
									target : _this,
									source : _this
								});
								return verify = false;
							}
						}
						if (obj.int) {
							if (!ver.float) {
								if (value.indexOf('.') > -1) {
									$.validateMessage({
										message : '请输入整数！',
										target : _this,
										source : _this
									});
									return verify = false;
								} else {
									if (isNaN(value)) {
										$.validateMessage({
											message : '请输入数字！',
											target : _this,
											source : _this
										});
										return verify = false;
									}
								}
							} else {
								if (isNaN(value)) {
									$.validateMessage({
										message : '请输入数字！',
										target : _this,
										source : _this
									});
									return verify = false;
								}
							}
						}
						if (obj.datebox) {
							if (_this.datebox('getValue').length == 0) {
								$.validateMessage({
									message : '此项为必填项',
									target : _this.next(),
									source : _this.next()
								});
								return verify = false;
							}
						}
						if (obj.datetimebox) {
							if (_this
									.datetimebox('getValue').length == 0) {
								$.validateMessage({
									message : '此项为必填项',
									target : _this.next(),
									source : _this.next()
								});
								return verify = false;
							}
						}
						if (obj.combobox) {
							if (_this.combobox('getValue').length == 0) {
								$.validateMessage({
									message : '此项为必填项',
									target : _this.next(),
									source : _this.next()
								});
								return verify = false;
							}
						}
						if (obj.combotree) {
							if (_this.combotree('getValue').length == 0) {
								$.validateMessage({
									message : '此项为必填项',
									target : _this.next(),
									source : _this.next()
								});
								return verify = false;
							}
						}
					}
				});
				if (ver.callback && verify) {
					ver.callback();
				}
				return verify;
			}
		});
		
		$.extend({
			// 合并两个object,obj1为标准值,返回合并后的object
			mergeObject : function(obj1, obj2) {
				if (arguments.length != 2) {
					alert('必须为mergeObject传入两个参数！');
					return;
				}
				function merge(o1, o2) {
					var o = {};
					var name;
					for (name in o1) {
						if (o1.hasOwnProperty(name)) {
							if (o2 && o2.hasOwnProperty(name)) {
								if (o1[name]
										&& o1[name].constructor == Object
										&& !o1[name].jquery) {
									o[name] = merge(o1[name], o2[name]);
								} else {
									o[name] = o2[name];
								}
							} else {
								o[name] = o1[name];
							}
						}
					}
					return o;
				}
				return merge(obj1, obj2);
			},
			// 验证邮箱
			isEmail : function(str) {
				return (new RegExp(
						/^([_a-zA-Z\d\-\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/)
						.test($.trim(str)));
			},
			// 验证手机
			isMobile : function(str) {
				return (new RegExp(/^(13|14|15|18)\d{9}$/).test($.trim(str)));
			},
			// 验证座机
			isPhone : function(str) {
				return (new RegExp(
						/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/)
						.test($.trim(str)));
			},
			// 验证邮编
			isPostcode : function(str) {
				return (new RegExp(/^\d{6}$/).test($.trim(str)));
			},
			// 验证是否为空
			isEmpty : function(str) {
				return (str === '');
			},
			// 验证是否为大小写字母
			isAlphabet: function(str) {
				return (new RegExp(/^[a-zA-Z0-9]+/).test($.trim(str)));
			},
			isIP: function(str) {
				return (new RegExp(/^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/)
						.test($.trim(str)));
			},
			// JSON对象转换成字符串
			toJSON: function(o) {
				if (typeof (JSON) == 'object' && JSON.stringify)
					return JSON.stringify(o);
				var type = typeof (o);
				if (o === null)
					return "null";
				if (type == "undefined")
					return undefined;
				if (type == "number" || type == "boolean")
					return o + "";
				if (type == "string")
					return $.quoteString(o);
				if (type == 'object') {
					if (typeof o.toJSON == "function")
						return $.toJSON(o.toJSON());
					if (o.constructor === Date) {
						var month = o.getUTCMonth() + 1;
						if (month < 10)
							month = '0' + month;
						var day = o.getUTCDate();
						if (day < 10)
							day = '0' + day;
						var year = o.getUTCFullYear();
						var hours = o.getUTCHours();
						if (hours < 10)
							hours = '0' + hours;
						var minutes = o.getUTCMinutes();
						if (minutes < 10)
							minutes = '0' + minutes;
						var seconds = o.getUTCSeconds();
						if (seconds < 10)
							seconds = '0' + seconds;
						var milli = o.getUTCMilliseconds();
						if (milli < 100)
							milli = '0' + milli;
						if (milli < 10)
							milli = '0' + milli;
						return '"' + year + '-' + month + '-' + day + 'T' + hours + ':'
								+ minutes + ':' + seconds + '.' + milli + 'Z"';
					}
					if (o.constructor === Array) {
						var ret = [];
						for ( var i = 0; i < o.length; i++)
							ret.push($.toJSON(o[i]) || "null");
						return "[" + ret.join(",") + "]";
					}
					var pairs = [];
					for ( var k in o) {
						var name;
						var type = typeof k;
						if (type == "number")
							name = '"' + k + '"';
						else if (type == "string")
							name = $.quoteString(k);
						else
							continue;
						if (typeof o[k] == "function")
							continue;
						var val = $.toJSON(o[k]);
						pairs.push(name + ":" + val);
					}
					return "{" + pairs.join(", ") + "}";
				}
			},
			// 将字符串转成JSON对象
			evalJSON: function(src) {
				if (typeof (JSON) == 'object' && JSON.parse)
					return JSON.parse(src);
				return eval("(" + src + ")");
			}
		});
	})(jQuery);

});