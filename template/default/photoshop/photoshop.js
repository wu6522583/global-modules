define(function(require,exports,module){
    require("dialog");
    require("./editImage");

    (function($){
        $.fn.photoshop = function(options, param){
            var opt = {
                title:'图片编辑',
                content: '<div id="imageEditContent" />',
                width:1024,
                height:768,
                modal:true,
                onOpen:function(a){
                    $("#imageEditContent").editImage(options);
                },
                onClose : function() {
                    $(this).dialog('destroy');
                }
            }
            $('<div/>').dialog(opt);
        };
    })(jQuery);
});