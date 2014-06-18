define(function(require,exports,module){
    require("photoshop");
    $("#uplo").change(function(_fi){
        var file = _fi;
        readLocalFileI(file.currentTarget.files[0]).done(function(x){
            file = null;
            $("body").photoshop({
                "imageUrl":x,
                "width":800,
                "height":600,
                url:"aaa.do",
                "onSaveSuccess":function(){
                }
            });
        });
    });

    function readLocalFileI (fileObj ) {
        var def = $.Deferred();
        var reader = new FileReader();
        reader.onload = function(e){
            def.resolve(e.currentTarget.result);
        }
        reader.onprogress = function(e){}
        reader.onloadend = function(e){}
        reader.readAsDataURL(fileObj);
        return def.promise();
    }
});
