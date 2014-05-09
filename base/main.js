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
var _ct = "";
var easyui = {
		"CSS" : [
	                "lib/easyui/themes/default/easyui.css",
	                "lib/easyui/themes/icon.css",
	                "lib/easyui/demo/demo.css"
	            ],
	     "Preload" : ["lib/easyui/jquery.min"],
	     "Plugins" : {
	 		"draggable" : "template/easyui/draggable/draggable",
			"tabs" : "template/easyui/tabs/tabs",
			"droppable" : "template/easyui/droppable/droppable",
			"resizable" : "template/easyui/resizable/resizable",
			"linkbutton" : "template/easyui/linkbutton/linkbutton",
			"progressbar" : "template/easyui/progressbar/progressbar",
			"tooltip" : "template/easyui/tooltip/tooltip",
			"pagination" : "template/easyui/pagination/pagination",
			"datagrid" : "template/easyui/datagrid/datagrid",
			"treegrid" : "template/easyui/treegrid/treegrid",
			"propertygrid" : "template/easyui/propertygrid/propertygrid",
			"panel" : "template/easyui/panel/panel",
			"window" : "template/easyui/window/window",
			"dialog" : "template/easyui/dialog/dialog",
			"messager" : "template/easyui/messager/messager",
			"layout" : "template/easyui/layout/layout",
			"form" : "template/easyui/form/form",
			"menu" : "template/easyui/menu/menu",
			"menubutton" : "template/easyui/menubutton/menubutton",
			"splitbutton" : "template/easyui/splitbutton/splitbutton",
			"accordion" : "template/easyui/accordion/accordion",
            "accordionList":"template/easyui/accordion/accordionList",
			"calendar" : "template/easyui/calendar/calendar",
			"combo" : "template/easyui/combo/combo",
			"combobox" : "template/easyui/combobox/combobox",
			"combotree" : "template/easyui/combotree/combotree",
			"combogrid" : "template/easyui/combogrid/combogrid",
			"validatebox" : "template/easyui/validatebox/validatebox",
			"validateform" : "template/easyui/validatebox/validateform",
			"Validform" : "template/easyui/Validform/Validform",
			"verifyForm" : "template/easyui/verifyForm/verifyForm",
			"datePicker" : "template/easyui/datePicker/datePicker",
			"numberbox" : "template/easyui/numberbox/numberbox",
			"searchbox" : "template/easyui/searchbox/searchbox",
			"spinner" : "template/easyui/spinner/spinner",
			"numberspinner" : "template/easyui/numberspinner/numberspinner",
			"timespinner" : "template/easyui/timespinner/timespinner",
			"tree" : "template/easyui/tree/tree",
			"datebox" : "template/easyui/datebox/datebox",
			"datetimebox" : "template/easyui/datetimebox/datetimebox",
			"slider" : "template/easyui/slider/slider",
			"tooltip" : "template/easyui/tooltip/tooltip",
			"parser" : "template/easyui/parser/parser"
		}
};

var bootstrap = {
		"JS" : ["lib/bootstrap/assets/js/jquery-2.0.3.min.js"],
		"CSS" : ["lib/bootstrap/assets/css/bootstrap.min.css",
	                "lib/bootstrap/assets/css/font-awesome.min.css",
	                "lib/bootstrap/assets/css/ace.min.css",
	                "lib/bootstrap/assets/css/ace-rtl.min.css"]
};


var locales = {
		'af':'lib/easyui/locale/easyui-lang-af',
		'ar':'lib/easyui/locale/easyui-lang-ar',
		'bg':'lib/easyui/locale/easyui-lang-bg',
		'ca':'lib/easyui/locale/easyui-lang-ca',
		'cs':'lib/easyui/locale/easyui-lang-cs',
		'cz':'lib/easyui/locale/easyui-lang-cz',
		'da':'lib/easyui/locale/easyui-lang-da',
		'de':'lib/easyui/locale/easyui-lang-de',
		'el':'lib/easyui/locale/easyui-lang-el',
		'en':'lib/easyui/locale/easyui-lang-en',
		'es':'lib/easyui/locale/easyui-lang-es',
		'fr':'lib/easyui/locale/easyui-lang-fr',
		'it':'lib/easyui/locale/easyui-lang-it',
		'jp':'lib/easyui/locale/easyui-lang-jp',
		'nl':'lib/easyui/locale/easyui-lang-nl',
		'pl':'lib/easyui/locale/easyui-lang-pl',
		'pt_BR':'lib/easyui/locale/easyui-lang-pt_BR',
		'ru':'lib/easyui/locale/easyui-lang-ru',
		'sv_SE':'lib/easyui/locale/easyui-lang-sv_SE',
		'tr':'lib/easyui/locale/easyui-lang-tr',
		'zh_CN':'lib/easyui/locale/easyui-lang-zh_CN',
		'zh_TW':'lib/easyui/locale/easyui-lang-zh_TW'
	};


_ct = easyui;

seajs.config({
	preload: _ct.Preload,
	alias : _ct.Plugins,
	paths: {
	    'style-module': "../../../lib/easyui/themes/bootstrap"
	},
	debug:true,
	vars: {
		'locale_properties': locales["zh_CN"]
	}
});

seajs.use(_ct.CSS);
seajs.use("gp-themes/base.css");