/**
 * Created by Administrator on 2014/6/18.
 */
define(function(require , exports , module){
    require("./Validform/demo/css/demo.css");
    require("./Validform/demo/css/style.css");
    require("./Validform/demo/css/wp-syntax.css");
    $("#Validform_Tree").tree({
        url:'./Validform/list.json',
        onClick: function(node){
            var url = "./Validform/Validform/"+node.text+".html";
            $('#Validform_Tabs').tabs('add',{
                title:node.text,
                href:url,
                closable:true,
                icon:node.iconCls
            });
        }
    });
});