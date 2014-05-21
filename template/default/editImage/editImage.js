define(function(require,exports,module){
    require("tabs");
    require("slider");
    require("./css/editImage.css");
    require("./css/jquery.Jcrop.css");
    require("./plugin/jquery.Jcrop");

//    var _html = "<ul class='eul'>" +
//        "<li>" +
//            "<ul id='tableUlLeft'>" +
//                "<li><h3>裁剪</h3></li>" +
//                "<li>宽度：<input id='clipWidth' maxlength='4' /> PX</li>" +
//                "<li>高度：<input id='clipHeight' maxlength='4' /> PX</li><li><input type='button' id='sureClip' value='剪切' /></li><li><input id='sliderSize' style='width:150px' data-options='showTip:true'></li>" +
//            "</ul>" +
//        "</li>" +
//        "<li>" +
//            "<div id='divEditImage'>" +
//        "<img id='editImage' />" +
//        "</div>"
//        "</li>" +"<li>" +
//        "<ul id='tableUlRight'></ul>" +
//        "</li>" +
//        "</ul>";
    var _html = "<div id='divEditImage'><img id='editImage' /></div>";
    (function($){
        var clipAreaO = [ 0 , 0 , 0 , 0];
        var clipApi;
        var parentWidth ;
        var parentHeight ;
        var jq ;
        var opts ;
        var ctx;
        var canvasObj;
        var bgiw;
        var bgih;
        var img;
        var rotateVal = 0;
        function showCoords(c) {
            clipAreaO[0] = c.x;
            clipAreaO[1] = c.y;
            clipAreaO[2] = c.x2;
            clipAreaO[3] = c.y2;
            if ( c.w ) {
                $("#clipWidth").val(c.w);
            }
            if (c.h) {
                $("#clipHeight").val(c.h);
            }
        }
        function clipImage () {
            var width = clipAreaO[2] - clipAreaO[0];
            var height = clipAreaO[3] - clipAreaO[1];

            $("#divEditImage").append("<canvas />");
            canvasObj = document.getElementsByTagName("canvas")[0];
            ctx = canvasObj.getContext('2d');
            if ( opts.imageUrl ) {
                img = new Image();
                img.src = opts.imageUrl;
                img.onload = function () {
                    canvasObj.width = width;
                    canvasObj.height = height;
                    ctx.drawImage(img, clipAreaO[0], clipAreaO[1], width, height ,0 , 0, width, height);
//                    $("#editImage").attr("src",canvasObj.toDataURL("image/png"));
                    window.open(canvasObj.toDataURL("image/png"),"smallwin","width=800,height=700");
                }
            }
            $(clipApi).data('Jcrop').release();
        }
        function rotateImage () {
            $("#divEditImage").find("canvas").remove();
            $("#divEditImage").append("<canvas />");
            canvasObj = document.getElementsByTagName("canvas")[0];
            ctx = canvasObj.getContext('2d');
            if ( opts.imageUrl ) {
                img = new Image();
                img.src = opts.imageUrl;
                img.onload = function () {
                    canvasObj.width = img.width;
                    canvasObj.height = img.height;
                    ctx.translate(  -(img.width/2) , -(img.height/2) );
                    ctx.rotate(Math.PI * 2 / 36 );
                    ctx.drawImage(img, (img.width/2) , (img.height/2) , $("#edim").width(), $("#edim").height() );
                    window.open(canvasObj.toDataURL("image/png"),"smallwin","width="+$("#edim").width()+",height="+$("#edim").height()+"");
                }
            }
        }

        function init(target){
            opts = $.data(target, 'editImage').options;
            jq = $(target);
            parentWidth = jq.parent().width();
            parentHeight = jq.parent().height();
            jq.html("<div id='controlContent'></div>");
            $("#controlContent").tabs({
                onSelect : function ( tit , _index ) {
                    if ( clipApi ) {
                        $(clipApi).data('Jcrop').release();
                    }
                }
            });
            $("#controlContent").tabs('add',{
                title:'剪切',
                content:"宽度：<input id='clipWidth' maxlength='4' /> 高度：<input id='clipHeight' maxlength='4' /> <input type='button' id='sureClip' value='剪切' />",
                tabWidth : "100"
            });
            $("#controlContent").tabs('add',{
                title:'图片旋转',
                content:"<br/><input id='sliderSize' style='width:150px' data-options='showTip:true' /> <input type='button' id='saveRotate' value='应用' />",
                tabWidth : "100"
            });
            $("#controlContent").tabs('add',{
                title:'图片水印',
                content:'<br/><br/>',
                tabWidth : "100"
            });
            $("#controlContent").tabs('add',{
                title:'文字水印',
                content:'<br/><br/>',
                tabWidth : "100"
            });
            $("#controlContent").tabs('add',{
                title:'缩略设置',
                content:'<br/><br/>',
                tabWidth : "100"
            });
            $("#controlContent").tabs({"selected":"0"});

            jq.append(_html);
            $("#sliderSize").slider({
                onChange:function(_s){
                    rotateVal = _s;
                    $("#divEditImage").css("transform","rotate("+ 3.6*_s +"deg)");
                    $("#divEditImage").css("-webkit-transform","rotate("+ 3.6*_s +"deg)");
                    $("#divEditImage").css("-moz-transform","rotate("+ 3.6*_s +"deg)");
                }
            });
            $("#editImage").attr("src",opts.imageUrl);

            var image = new Image();
            image.src = opts.imageUrl;
            image.onload = function () {
                $("#divEditImage").width(image.width);
                $("#divEditImage").height(image.height + 50);
                $("#edim").css("overflow","auto");
            }

            clipApi = $("#editImage").Jcrop({
                onChange: showCoords,
                onSelect: showCoords
            });
            $("#clipWidth").keyup(function(ev) {
                clipAreaO[2] = clipAreaO[0] + parseInt(ev.currentTarget.value);
                $(clipApi).data('Jcrop').setSelect(clipAreaO);
            });
            $("#clipHeight").keyup(function(ev) {
                clipAreaO[3] = clipAreaO[1] + parseInt(ev.currentTarget.value);
                $(clipApi).data('Jcrop').setSelect(clipAreaO);
            });
            $("#sureClip").click(function(){
                clipImage();
            });
            $("#saveRotate").click(function(){
                rotateImage();
            });
        }
        $.fn.editImage = function(options, param){
            if (typeof options == 'string'){
                return $.fn.editImage.methods[options](this, param);
            }
            options = options || {};
            return this.each(function(){
                var state = $.data(this, 'editImage');
                if (state){
                    $.extend(state.options, options);
                } else {
                    $.data(this, 'editImage', {
                        options: $.extend({}, $.fn.editImage.defaults, $.fn.editImage.parseOptions(this), options)
                    });
                }
                init(this);
            });
        };

        $.fn.editImage.methods = {
            options: function(jq){
                return $.data(jq[0], 'editImage').options;
            }
        };

        $.fn.editImage.parseOptions = function(target){
            var t = $(target);
            return $.extend({}, $.parser.parseOptions(target,[]), {});
        };

        $.fn.editImage.defaults = {
            imageUrl:""
        };

    })(jQuery);
});