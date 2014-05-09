define([
    "template/easyui/validatebox/lib/js/Validform_v5.3.2",
    "template/easyui/validatebox/lib/css/demo.css",
    "template/easyui/validatebox/lib/css/style.css"],
    function(require, exports, module){
    /**
     *
     * datatype
         内置基本的datatype类型有： * | *6-16 | n | n6-16 | s | s6-18 | p | m | e | url
         *：检测是否有输入，可以输入任何字符，不留空即可通过验证；
         *6-16：检测是否为6到16位任意字符；
         n：数字类型；
         n6-16：6到16位数字；
         s：字符串类型；
         s6-18：6到18位字符串；
         p：验证是否为邮政编码；
         m：手机号码格式；
         e：email格式；
         url：验证字符串是否为网址。
     * */

    (function($){
        $.fn.validateform = function(options, param){
            if (typeof options == 'string'){
                return $.fn.validateform.methods[options](this, param);
            } else {
                options = options || {};

                return this.each(function(){
                    var state = $.data(this, 'validateform');
                    if (state){
                        $.extend(state.options, options);
                    } else {
                        $.data(this, 'validateform', {
                            options: $.extend({}, $.fn.validateform.defaults, options)
                        });
                        init(this);
                    }
                });
            }
        };
        function init (jq ) {
            var _opt = $.data(jq,'validateform').options;
            var _options = _opt.data;
            var _len = _options.length;
            var validateStr = [];
            var _rule = {
                tiptype:3,
                datatype:{},
                usePlugin:{}
            };
            validateStr.push("<ul>");
            var _i = 0;
            while (_i <= _len -1) {
                var _les = _options[_i];
                switch (_les["type"]){
                    case "text":
                        var text = require("./text");
                        var str = text(_les.settings);
                        validateStr.push(str);
                        break;
                    case "password":
                        var password = require("./password");
                        var str = password(_les.settings);
                        validateStr.push(str);
                        break;
                    case "password_register":
                        var password_register = require("./password_register");
                        require("./passwordStrength");
                        var str = password_register(_les.settings);
                        validateStr.push(str);
                        _rule.usePlugin["passwordstrength"] = {
                            minLen:6,
                            maxLen:20,
                            trigger:function(obj,error){
                                if(error){
                                    obj.parent().find(".Validform_checktip").show();
                                    obj.parent().find(".passwordStrength").hide();
                                }else{
                                    obj.parent().find(".Validform_checktip").hide();
                                    obj.parent().find(".passwordStrength").show();
                                }
                            }
                        }
                        break;
                    case "password_change":
                        var password_change = require("./password_change");
                        require("./passwordStrength");
                        var str = password_change(_les.settings);
                        validateStr.push(str);
                        _rule.datatype["oldpassword"] = function(gets){
                            if(gets==$("#passwordold").val()){
                                return "新密码不能与旧密码一致！";
                            }
                        }
                        _rule.usePlugin["passwordstrength"] = {
                            minLen:6,
                            maxLen:20,
                            trigger:function(obj,error){
                                if(error){
                                    obj.parent().find(".Validform_checktip").show();
                                    obj.parent().find(".passwordStrength").hide();
                                }else{
                                    obj.parent().find(".Validform_checktip").hide();
                                    obj.parent().find(".passwordStrength").show();
                                }
                            }
                        }
                        break;
                    case "select":
                        var select = require("./select");
                        var str = select(_les.settings);
                        validateStr.push(str);
                        break;
                    case "radio":
                        var radio = require("./radio");
                        var str = radio(_les.settings);
                        validateStr.push(str);
                        break;
                    case "checkbox":
                        var checkbox = require("./checkbox");
                        var str = checkbox(_les.settings);
                        validateStr.push(str);
                        _rule.datatype["need2"] = function(gets,obj,curform,regxp){
                            var need=2,
                                numselected=curform.find("input[name='"+obj.attr("name")+"']:checked").length;
                            return  numselected >= need ? true : "请至少选择"+need+"项！";
                        }
                        _rule.datatype["max2"] = function(gets,obj,curform,regxp){
                            var atmax=2,
                                numselected=curform.find("input[name='"+obj.attr("name")+"']:checked").length;

                            if(numselected==0){
                                return false;
                            }else if(numselected>atmax){
                                return "最多只能选择"+atmax+"项！";
                            }
                            return  true;
                        }
                        break;
                    case "check_idcard":
                        var check_idcard = require("./check_idcard");
                        var str = check_idcard(_les.settings);
                        validateStr.push(str);
                        _rule.datatype["idcard"] = require("./dataType_idcard");
                        break;
                    case "textarea":
                        var textarea = require("./textarea");
                        var str = textarea(_les.settings);
                        validateStr.push(str);
                        break;
                    case "datepicker":
                        var datepicker = require("./datepicker");
                        var str = datepicker(_les.settings);
                        validateStr.push(str);
                        break;
                    case "combotree":
                        var combotree = require("./combotree");
                        var str = combotree(_les.settings);
                        validateStr.push(str);
                        break;
                }
                _i++;
            }
            var transformButton = require("./transformButton");
            var str = transformButton({});
            validateStr.push(str);
            validateStr.push("</ul>");
            jq.innerHTML = validateStr.join("");
            $(jq).Validform(_rule);
            require.async("parser",function(){
                _opt.onLoadSuccess();
            });
        }
        $.fn.validateform.methods = {

        };
        $.fn.validateform.defaults = {
            onLoadSuccess: function(){}
        };
    })(jQuery);
});
define("template/easyui/validatebox/text",[],function(require, exports, module){
    function text( _option ) {
        var _tem = [];
        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        }else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text);
        }
        _tem.push("</label><input type='text' value='' name='text' class='inputxt'");
        if ( _option.nullmsg ) {
            _tem.push( "nullmsg='"+ _option.nullmsg +"'" );
        }
        if ( _option.sucmsg ) {
            _tem.push( "sucmsg='"+ _option.sucmsg +"'" );
        }
        if ( _option.errormsg ) {
            _tem.push( "errormsg='"+ _option.errormsg +"'" );
        }
        if ( _option.dataType && _option.isNeed ) {
            _tem.push( "dataType='"+ _option.dataType +"'" );
        }
        _tem.push("/><span class='Validform_checktip'>");
        if ( _option.titlemessage ) {
            _tem.push( _option.titlemessage );
        }
        _tem.push("</span></li>");
        return _tem.join("");
    }
    module.exports = text;
});
define("template/easyui/validatebox/password",[],function(require, exports, module){
    function password( _option ){
        var _tem = [];
        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        }else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text);
        }
        _tem.push("</label><input type='password' value='' name='userpassword' class='inputxt'");
        if ( _option.nullmsg ) {
            _tem.push( "nullmsg='"+ _option.nullmsg +"'" );
        }
        if ( _option.sucmsg ) {
            _tem.push( "sucmsg='"+ _option.sucmsg +"'" );
        }
        if ( _option.errormsg ) {
            _tem.push( "errormsg='"+ _option.errormsg +"'" );
        }
        if ( _option.dataType && _option.isNeed ) {
            _tem.push( "dataType='"+ _option.dataType +"'" );
        }
        _tem.push("/><span class='Validform_checktip'>");
        if ( _option.titlemessage ) {
            _tem.push( _option.titlemessage );
        }
        _tem.push("</span></li>");
        return _tem.join("");
    }
    module.exports = password;
});
define("template/easyui/validatebox/password_register",[],function(require, exports, module){
    function password_register( _option ){
        var _tem = [];
        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        }else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text);
        }
        _tem.push("</label><input type='password' value='' plugin='passwordStrength' name='userpassword' class='inputxt'");
        if ( _option.nullmsg ) {
            _tem.push( "nullmsg='"+ _option.nullmsg +"'" );
        }
        if ( _option.sucmsg ) {
            _tem.push( "sucmsg='"+ _option.sucmsg +"'" );
        }
        if ( _option.errormsg ) {
            _tem.push( "errormsg='"+ _option.errormsg +"'" );
        }
        if ( _option.dataType && _option.isNeed ) {
            _tem.push( "dataType='"+ _option.dataType +"'" );
        }
        _tem.push("/><span class='Validform_checktip'>");
        if ( _option.titlemessage ) {
            _tem.push( _option.titlemessage );
        }
        _tem.push("</span><span class='passwordStrength' style='display:none;'><b>密码强度：</b> <span>弱</span><span>中</span><span class='last'>强</span></span></li>");
        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        } else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text2);
        }
        _tem.push("</label><input type='password' recheck='userpassword' value='' name='userpassword2' class='inputxt'");
        if ( _option.nullmsg ) {
            _tem.push( "nullmsg='"+ _option.nullmsg +"'" );
        }
        if ( _option.sucmsg ) {
            _tem.push( "sucmsg='"+ _option.sucmsg +"'" );
        }
        if ( _option.errormsg ) {
            _tem.push( "errormsg='"+ _option.errormsg +"'" );
        }
        if ( _option.dataType ) {
            _tem.push( "dataType='"+ _option.dataType +"'" );
        }
        _tem.push("/><span class='Validform_checktip'>");
        if ( _option.titlemessage ) {
            _tem.push( _option.titlemessage );
        }
        _tem.push("</span></li>");
        return _tem.join("");
    }
    module.exports = password_register;
});
define("template/easyui/validatebox/password_change",[],function(require, exports, module){
    function password_change( _option ){
        var _tem = [];
        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        } else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text);
        }
        _tem.push("</label><input type='password' value='' name='passwordold' id='passwordold' class='inputxt'");
        if ( _option.nullmsg ) {
            _tem.push( "nullmsg='"+ _option.nullmsg +"'" );
        }
        if ( _option.sucmsg ) {
            _tem.push( "sucmsg='"+ _option.sucmsg +"'" );
        }
        if ( _option.errormsg ) {
            _tem.push( "errormsg='"+ _option.errormsg +"'" );
        }
        if ( _option.dataType && _option.isNeed ) {
            _tem.push( "dataType='"+ _option.dataType +"'" );
        }
        _tem.push("/><span class='Validform_checktip'>");
        if ( _option.titlemessage ) {
            _tem.push( _option.titlemessage );
        }
        _tem.push("</span></li>");

        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        } else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text2 ) {
            _tem.push(_option.text2);
        }
        _tem.push("</label><input type='password' value='' plugin='passwordStrength' name='password' class='inputxt'");
        if ( _option.nullmsg ) {
            _tem.push( "nullmsg='"+ _option.nullmsg +"'" );
        }
        if ( _option.sucmsg ) {
            _tem.push( "sucmsg='"+ _option.sucmsg +"'" );
        }
        if ( _option.errormsg ) {
            _tem.push( "errormsg='"+ _option.errormsg +"'" );
        }
        if ( _option.dataType ) {
            _tem.push( "dataType='"+ "oldpassword," + _option.dataType +"'" );
        }
        _tem.push("/><span class='Validform_checktip'>");
        if ( _option.titlemessage2 ) {
            _tem.push( _option.titlemessage2);
        }
        _tem.push("</span><span class='passwordStrength' style='display:none;'><b>密码强度：</b> <span>弱</span><span>中</span><span class='last'>强</span></span></li>");

        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        } else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text3 ) {
            _tem.push(_option.text3);
        }
        _tem.push("</label><input type='password' value='' name='repassword' recheck='password' class='inputxt'");
        if ( _option.nullmsg ) {
            _tem.push( "nullmsg='"+ _option.nullmsg +"'" );
        }
        if ( _option.sucmsg ) {
            _tem.push( "sucmsg='"+ _option.sucmsg +"'" );
        }
        if ( _option.errormsg ) {
            _tem.push( "errormsg='"+ _option.errormsg +"'" );
        }
        if ( _option.dataType ) {
            _tem.push( "dataType='"+ _option.dataType +"'" );
        }
        _tem.push("/><span class='Validform_checktip'>");
        if ( _option.titlemessage3 ) {
            _tem.push( _option.titlemessage3 );
        }
        _tem.push("</span></li>");
        return _tem.join("");
    }
    module.exports = password_change;
});
define("template/easyui/validatebox/select",[],function(require, exports, module){
    function select( _option ){
        var _tem = [];
        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        } else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text);
        }
        _tem.push("</label><select type='text' name='province'");
        if ( _option.nullmsg ) {
            _tem.push( "nullmsg='"+ _option.nullmsg +"'" );
        }
        if ( _option.sucmsg ) {
            _tem.push( "sucmsg='"+ _option.sucmsg +"'" );
        }
        if ( _option.errormsg ) {
            _tem.push( "errormsg='"+ _option.errormsg +"'" );
        }
        if ( _option.dataType && _option.isNeed ) {
            _tem.push( "dataType='"+ _option.dataType +"'" );
        }
        _tem.push(">");
        if ( _option.data ) {
            $.each(_option.data,function( i , j ){
                if ( !i) {
                    _tem.push("<option value=''>"+ j +"</option>");
                } else {
                    _tem.push("<option value='" + i + "'>"+ j +"</option>");
                }
            });
        }
        _tem.push("</select><span class='Validform_checktip'>");
        if ( _option.titlemessage ) {
            _tem.push( _option.titlemessage );
        }
        _tem.push("</span></li>");
        return _tem.join("");
    }
    module.exports = select;
});
define("template/easyui/validatebox/radio",[],function(require, exports, module){
    function radio( _option ) {
        var _tem = [];
        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        } else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text);
        }
        _tem.push("</label>");
        if ( _option.data ) {
            $.each( _option.data ,function ( i , j ) {
                _tem.push("<input type='radio' value='" +i+ "' name='gender' id='radio" +i+ "' class='pr1'");
                if ( _option.isNeed && !i ) {
                    _tem.push("datatype='*'");
                }
                _tem.push("></input>");
                _tem.push("<label for='radio" +i+ "'>" +j+ "</label>");
            });
        }
        _tem.push("<span class='Validform_checktip'>");
        if ( _option.titlemessage ) {
            _tem.push( _option.titlemessage);
        }
        _tem.push("</span></li>");

        return _tem.join("");
    }
    module.exports = radio;
});
define("template/easyui/validatebox/checkbox",[],function(require, exports, module){
    function checkbox( _option ) {
        var _tem = [];
        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        } else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text);
        }
        _tem.push("</label>");
        if ( _option.data ) {
            $.each( _option.data ,function ( i , j ) {
                _tem.push("<input type='checkbox' value='" +i+ "' name='_checkMore' id='checkbox" +i+ "' class='rt2'");
                if ( _option.isNeed && !i ) {
                    if (!_option.dataType) {
                        _tem.push("datatype='*'");
                    } else {
                        _tem.push("datatype='" + _option.dataType + "'");
                    }
                }
                _tem.push("></input>");
                _tem.push("<label for='checkbox" +i+ "'>" +j+ "</label>");
            });
        }
        _tem.push("<span class='Validform_checktip'>");
        if ( _option.titlemessage ) {
            _tem.push( _option.titlemessage);
        }
        _tem.push("</span></li>");

        return _tem.join("");
    }
    module.exports = checkbox;
});
define("template/easyui/validatebox/check_idcard",[],function(require, exports, module){
    function check_idcard( _option ) {
        var _tem = [];
        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        }else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text);
        }
        _tem.push("</label><input type='text' value='' name='text' class='inputxt'");
        if ( _option.nullmsg ) {
            _tem.push( "nullmsg='"+ _option.nullmsg +"'" );
        }
        if ( _option.sucmsg ) {
            _tem.push( "sucmsg='"+ _option.sucmsg +"'" );
        }
        if ( _option.errormsg ) {
            _tem.push( "errormsg='"+ _option.errormsg +"'" );
        }
        if ( _option.isNeed ) {
            _tem.push( "dataType='idcard'" );
        }
        _tem.push("/><span class='Validform_checktip'>");
        if ( _option.titlemessage ) {
            _tem.push( _option.titlemessage );
        }
        _tem.push("</span></li>");
        return _tem.join("");
    }
    module.exports = check_idcard;
});
define("template/easyui/validatebox/dataType_idcard",[],function(require, exports, module){
    function dataType_idcard(gets,obj,curform,datatype){
        //该方法由佚名网友提供;
        var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子;
        var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值，10代表X;
        if (gets.length == 15) {
            return isValidityBrithBy15IdCard(gets);
        }else if (gets.length == 18){
            var a_idCard = gets.split("");// 得到身份证数组
            if (isValidityBrithBy18IdCard(gets)&&isTrueValidateCodeBy18IdCard(a_idCard)) {
                return true;
            }
            return false;
        }
        return false;

        function isTrueValidateCodeBy18IdCard(a_idCard) {
            var sum = 0; // 声明加权求和变量
            if (a_idCard[17].toLowerCase() == 'x') {
                a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
            }
            for ( var i = 0; i < 17; i++) {
                sum += Wi[i] * a_idCard[i];// 加权求和
            }
            valCodePosition = sum % 11;// 得到验证码所位置
            if (a_idCard[17] == ValideCode[valCodePosition]) {
                return true;
            }
            return false;
        }

        function isValidityBrithBy18IdCard(idCard18){
            var year = idCard18.substring(6,10);
            var month = idCard18.substring(10,12);
            var day = idCard18.substring(12,14);
            var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
            // 这里用getFullYear()获取年份，避免千年虫问题
            if(temp_date.getFullYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){
                return false;
            }
            return true;
        }
        function isValidityBrithBy15IdCard(idCard15){
            var year =  idCard15.substring(6,8);
            var month = idCard15.substring(8,10);
            var day = idCard15.substring(10,12);
            var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
            // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
            if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){
                return false;
            }
            return true;
        }
    }
    module.exports = dataType_idcard;
});
define("template/easyui/validatebox/textarea",[],function(require, exports, module){
    function textarea( _option ) {
        var _tem = [];
        _tem.push("<li><label class='label textarea'><span class='need'>");
        _tem.push("&nbsp;");
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text);
        }
        _tem.push("</label><textarea ");
        if ( _option.titlemessage ) {
            _tem.push("tip='" +_option.titlemessage+ "' altercss='gray' class='gray' name='msg' value>"+ _option.titlemessage +"</textarea>");
        }
        _tem.push("</li>");
        return _tem.join("");
    }
    module.exports = textarea;
});
define("template/easyui/validatebox/datepicker",[],function(require, exports, module){
    function datepicker( _option ) {
        var _tem = [];
        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        }else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text);
        }
        _tem.push("</label><input type='text' value='' name='date' class='inputxt easyui-datebox' ");
        if ( _option.dataType && _option.isNeed ) {
            _tem.push( "dataType='"+ _option.dataType +"'" );
        }
        _tem.push("/><span class='Validform_checktip'></span></li>");
        return _tem.join("");
    }
    module.exports = datepicker;
});
define("template/easyui/validatebox/passwordStrength",[],function(require, exports, module){
    (function($){
        $.fn.passwordStrength=function(settings){
            settings=$.extend({},$.fn.passwordStrength.defaults,settings);

            this.each(function(){
                var $this=$(this),
                    scores = 0,
                    checkingerror=false,
                    pstrength=$(this).parents("form").find(".passwordStrength");

                $this.bind("keyup blur",function(){
                    scores = $.fn.passwordStrength.ratepasswd($this.val(),settings);
                    scores>=0 && checkingerror==false && (checkingerror=true);

                    pstrength.find("span").removeClass("bgStrength");
                    if(scores < 35 && scores >=0){
                        pstrength.find("span:first").addClass("bgStrength");
                    }else if(scores < 60 && scores >=35){
                        pstrength.find("span:lt(2)").addClass("bgStrength");
                    }else if(scores >= 60){
                        pstrength.find("span:lt(3)").addClass("bgStrength");
                    }

                    if(checkingerror && ($this.val().length<settings.minLen || $this.val().length>settings.maxLen) ){
                        settings.showmsg($this,$this.attr("errormsg"),3);
                    }else if(checkingerror){
                        settings.showmsg($this,"",2);
                    }

                    settings.trigger($this,!(scores>=0));
                });
            });
        }

        $.fn.passwordStrength.ratepasswd=function(passwd,config){
            //判断密码强度
            var len = passwd.length, scores;
            if(len >= config.minLen && len <= config.maxLen){
                scores = $.fn.passwordStrength.checkStrong(passwd);
            }else{
                scores = -1;
            }

            return scores/4*100;

        }

        //密码强度;
        $.fn.passwordStrength.checkStrong=function(content){
            var modes = 0, len = content.length;
            for(var i = 0;i < len; i++){
                modes |= $.fn.passwordStrength.charMode(content.charCodeAt(i));
            }
            return $.fn.passwordStrength.bitTotal(modes);
        }

        //字符类型;
        $.fn.passwordStrength.charMode=function(content){
            if(content >= 48 && content <= 57){ // 0-9
                return 1;
            }else if(content >= 65 && content <= 90){ // A-Z
                return 2;
            }else if(content >= 97 && content <= 122){ // a-z
                return 4;
            }else{ // 其它
                return 8;
            }
        }

        //计算出当前密码当中一共有多少种模式;
        $.fn.passwordStrength.bitTotal=function(num){
            var modes = 0;
            for(var i = 0;i < 4;i++){
                if(num & 1){modes++;}
                num >>>= 1;
            }
            return modes;
        }

        $.fn.passwordStrength.defaults={
            minLen:0,
            maxLen:30,
            trigger:$.noop
        }
    })(jQuery);
});
define("template/easyui/validatebox/transformButton",[],function(require, exports, module){
    function transformButton(_option){
        var _tem = [];
        _tem.push("<li>");
        if ( _option.text ) {
            _tem.push("<input id='submit' type='submit' value='"+_option.text+"' />");
        } else {
            _tem.push("<input id='submit' type='submit' value='提 交' />");
        }
        if ( _option.text2 ) {
            _tem.push("<input id='reset' type='reset' value='" + _option.text2 + "' />");
        } else {
            _tem.push("<input id='reset' type='reset' value='重 置' />");
        }
        _tem.push("</li>");
        return _tem.join("");
    }
    module.exports = transformButton;
});
define("template/easyui/validatebox/combotree",[],function(require, exports, module){
    function combotree( _option ) {
        var _tem = [];
        _tem.push("<li><label class='label'><span class='need'>");
        if ( _option.isNeed ) {
            _tem.push("*");
        } else {
            _tem.push("&nbsp;");
        }
        _tem.push("</span>");
        if ( _option.text ) {
            _tem.push(_option.text);
        }
        if ( !_option.id ) {
            _tem.push("</label><select id='combotree_imp' class='easyui-combotree'  style='width:200px;' data-options='required:true'> </select> ");
        } else {
            _tem.push("</label><select id='" + _option.id + "' class='easyui-combotree'  style='width:200px;' data-options='required:true'> </select> ");
        }
        if ( _option.isNeed ) {
            _tem.push( "dataType='*'" );
        }
        _tem.push("<span class='Validform_checktip'></span></li>");
        return _tem.join("");
    }
    module.exports = combotree;
});

