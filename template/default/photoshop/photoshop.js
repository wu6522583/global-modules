define(function(require,exports,module){
    require("dialog");
    require("./editImage");

    (function($){
        $.fn.photoshop = function(options, param){
            var opt = {
                title:'图片编辑',
                content: '<div id="imageEditContent" />',
                width:1024,
                height:800,
                onOpen:function(a){
                    $("#imageEditContent").editImage(options);
                },
                onClose : function() {
                    $(this).dialog('destroy');
                },
                buttons:[
                    {text:'保存',iconCls:'save',handler:function(){
                    }},
                    {text:'取消',iconCls:'close',handler:function(){

                    }}
                ]
            }
            this.dialog(opt);
        };
    })(jQuery);
});