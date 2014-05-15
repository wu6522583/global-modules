/**
 * Created by Administrator on 14-4-10.
 * 
 * 
 * 1.实现静态类
 * 2.不需要在iframe页面里面再次引入
 * 3.引入外部非define模块不需要定义
 * 4.插件之间独立的使用jquery (插件不同，所以使用的jquery版本不同。会有版本上的差异。)
 * 5.支持多语种 多样式。（只支持多语种、但是只有原easyui插件支持多语种。而且语种切换方式有时候会有许多资源浪费，优化没有最大化。）
 * 6.各种导入文件路径不统一杂乱无章，看起来毫无头绪。
 */
define(function(require,exports,module){
    var defaultTemplate = {
        "draggable" : "{globalPath}/draggable/draggable",
        "tabs" : "{globalPath}/tabs/tabs",
        "droppable" : "{globalPath}/droppable/droppable",
        "resizable" : "{globalPath}/resizable/resizable",
        "linkbutton" : "{globalPath}/linkbutton/linkbutton",
        "progressbar" : "{globalPath}/progressbar/progressbar",
        "tooltip" : "{globalPath}/tooltip/tooltip",
        "pagination" : "{globalPath}/pagination/pagination",
        "datagrid" : "{globalPath}/datagrid/datagrid",
        "treegrid" : "{globalPath}/treegrid/treegrid",
        "propertygrid" : "{globalPath}/propertygrid/propertygrid",
        "panel" : "{globalPath}/panel/panel",
        "window" : "{globalPath}/window/window",
        "dialog" : "{globalPath}/dialog/dialog",
        "messager" : "{globalPath}/messager/messager",
        "layout" : "{globalPath}/layout/layout",
        "form" : "{globalPath}/form/form",
        "menu" : "{globalPath}/menu/menu",
        "menubutton" : "{globalPath}/menubutton/menubutton",
        "splitbutton" : "{globalPath}/splitbutton/splitbutton",
        "accordion" : "{globalPath}/accordion/accordion",
        "accordionList":"{globalPath}/accordion/accordionList",
        "calendar" : "{globalPath}/calendar/calendar",
        "combo" : "{globalPath}/combo/combo",
        "combobox" : "{globalPath}/combobox/combobox",
        "combotree" : "{globalPath}/combotree/combotree",
        "combogrid" : "{globalPath}/combogrid/combogrid",
        "validatebox" : "{globalPath}/validatebox/validatebox",
        "validateform" : "{globalPath}/validatebox/validateform",
        "Validform" : "{globalPath}/Validform/Validform",
        "verifyForm" : "{globalPath}/verifyForm/verifyForm",
        "datePicker" : "{globalPath}/datePicker/datePicker",
        "numberbox" : "{globalPath}/numberbox/numberbox",
        "searchbox" : "{globalPath}/searchbox/searchbox",
        "spinner" : "{globalPath}/spinner/spinner",
        "numberspinner" : "{globalPath}/numberspinner/numberspinner",
        "timespinner" : "{globalPath}/timespinner/timespinner",
        "tree" : "{globalPath}/tree/tree",
        "datebox" : "{globalPath}/datebox/datebox",
        "datetimebox" : "{globalPath}/datetimebox/datetimebox",
        "slider" : "{globalPath}/slider/slider",
        "tooltip" : "{globalPath}/tooltip/tooltip",
        "parser" : "{globalPath}/parser/parser"
    };
    var languageMapping = {
        'en':'language/easyui-lang-en',
        'zh_CN':'language/easyui-lang-zh_CN'
    };

    function isType(type) {
        return function(obj) {
            return {}.toString.call(obj) == "[object " + type + "]"
        }
    }
    var isObject = isType("Object");
    var isString = isType("String");
    var isArray = Array.isArray || isType("Array");
    var isFunction = isType("Function");

    function sysConfig(){
        this.mapping;
        this.languageMapping;
        this.pluginTemplate;
        this.skin;
    }
    sysConfig.prototype.init = function () {
    	this.setTemplate(defaultTemplate);
        this.languageMapping = languageMapping;
        seajs.config({
            alias : this.mapping,
            debug:2,
            vars: {
                "globalPath":"template/default",
                "varEmit" : ""
            }
        });
        this.setLanguage("zh_CN");
        this.setSkin("../../../themes/bootstrap");
    }
    sysConfig.prototype.addPlugin = function ( name , dir ) {
        if ( isString(name) && isString(dir) ) {
            this.mapping[name] = dir;
        }
    }
    sysConfig.prototype.addLanguage = function ( name , dir ) {
        if ( isString(name) && isString(dir) ) {
            this.mapping[name] = dir;
        }
    }
    sysConfig.prototype.setLanguage = function ( str ) {
        if ( isString(str) && this.languageMapping[str] ) {
            seajs.config({vars: {'locale_properties': this.languageMapping[str]}});
        }
    }
    sysConfig.prototype.setSkin = function ( str ) {
        if ( isString(str) ) {
            seajs.config({paths: {'skin': str}});
        }
    }
    sysConfig.prototype.setTemplate = function (tem) {
    	this.mapping = tem;
    }
    module.exports = sysConfig;
});

//var easyui = {
//		"CSS" : [
//	                "lib/easyui/themes/default/easyui.css",
//	                "lib/easyui/themes/icon.css",
//	                "lib/easyui/demo/demo.css"
//	            ],
//	     "Plugins" :
//};
//var bootstrap = {
//		"JS" : ["lib/bootstrap/assets/js/jquery-2.0.3.min.js"],
//		"CSS" : ["lib/bootstrap/assets/css/bootstrap.min.css",
//	                "lib/bootstrap/assets/css/font-awesome.min.css",
//	                "lib/bootstrap/assets/css/ace.min.css",
//	                "lib/bootstrap/assets/css/ace-rtl.min.css"]
//};

//seajs.use(_ct.CSS);
//seajs.use("gp-themes/base.css");