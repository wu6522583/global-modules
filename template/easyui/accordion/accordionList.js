/**
 * Created by Administrator on 14-4-28.
 */
define(function(require,exports,module){
    require("lib/bootstrap/assets/css/ace.min.css");
    require("lib/bootstrap/assets/css/font-awesome.min.css");
    require("lib/bootstrap/assets/js/bootstrap.min.js");
    require("lib/bootstrap/assets/js/ace.min.js");
    var dtd = $.Deferred();
    (function($,win,undef){
        var accordionList = function( jq,_option ){
            var _str = [];
            _str.push("<ul class='nav nav-list'>");
            _str.push( this._build(_option));
            _str.push("</ul>");
            jq.append(_str.join(""));
            jq.delegate("li", "click", function( dom ){
                $(dom.delegateTarget).find(".active").removeClass("active");
                if ("submenu" == dom.target.parentNode.parentNode.className) {
                    $($(dom.delegateTarget).find(".open")[0]).addClass("active");
                }
                $(dom.target.parentNode).addClass("active");
            });
        };
        //["控制台","文字排版",{"UI组件":["组件","按钮&图表","树菜单","jQuery UI","可拖拽列表",{"三级菜单":["第一级",{"第四级":["添加产品","查看商品"]}]}]},"表格","表单","插件","日历","相册","更多页面","其他页面"];
        accordionList.prototype._build = function ( _data ) {
            var _arr = [];
            var _d = _data;
            if ( "[object Object]" == Object.prototype.toString.call(_d) ) {
                for (var p in _d) {
                    _arr.push("<li><a class='dropdown-toggle'>");
                    _arr.push("<i class='icon-desktop'></i> &nbsp;" + p + "<b class='arrow icon-angle-down'></b>");
                    _arr.push("</a>");
                    _arr.push("<ul class='submenu'>");
                    _arr.push(arguments.callee(_d[p]));
                    _arr.push("</ul>");
                    _arr.push("</li>");
                }
            }
            else if ("[object Array]" == Object.prototype.toString.call(_d)) {
                var _len = _d.length;
                for (var i = 0 ; i < _len ; i++) {
                    _arr.push(arguments.callee(_d[i]));
                }
            }
            else if ("[object String]" == Object.prototype.toString.call(_d)) {
                _arr.push("<li><a>");
                //_arr.push("<i class='icon-text-width'></i><span class='menu-text'>" + _d + "</span>");
                _arr.push("<i class='icon-text-width'></i> &nbsp;" + _d + " ");
                _arr.push("</a></li>");
            }
            return _arr.join("");
        }
        $.fn.accordionList=function(settings){
            return new accordionList(this,settings);
        };

    })(jQuery,window);
    dtd.resolve();
    module.exports = dtd;
});