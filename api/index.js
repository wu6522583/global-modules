/**
 * Created by Administrator on 2014/6/16.
 */
define(function(require,exports,module){
    require("layout");
    require("tree");
    require("tabs");
    require("combo");
    require("combogrid");
    require("datebox");
    require("datagrid");
    require("menu");
    require("menubutton");
    require("linkbutton");
    require("messager");
    require("treegrid");
    require("../themes/easyui/default/easyui.css");
    require("../themes/easyui/icon.css");
    require("../themes/easyui/demo.css");
    require("./prettify");
    require("./prettify.css");
    require("./main.css");
    function api(){}
    api.prototype.init = function () {
        $("#t_tree").tree({
            url:'index.json',
            onClick: function(node){
                var url = "./"+node.text+"/"+node.text+".html";
                $('#mainTabs').tabs('add',{
                    title:node.text,
                    href:url,
                    closable:true,
                    icon:node.iconCls
                });
            }
        });
    }
    module.exports = new api().init();
})