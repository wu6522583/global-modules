define(function(require,exports,module){
    require("tabs");
    require("slider");
    require("draggable");
    require("dialog");
    require("./css/photoshop.css");
    require("./css/jquery.Jcrop.css");
    require("./js/jquery.Jcrop");

    var _html = '' +
        '<div id="controlContent" class="easyui-tabs" style="height:100px;width:auto" >' +
            '<div title="图像裁剪" >' +
                '宽度：<input id="clipWidth" maxlength="4" /> 高度：<input id="clipHeight" maxlength="4" /> ' +
            '</div>' +
            '<div title="图片旋转" >' +
                '<br/><input id="sliderSize" style="width:450px;padding-left: 50px;" data-options="showTip:false" /> ' +
            '</div>' +
            '<div title="图片水印" >' +
                '<input type="file" id="changeFile"/>' +
            '</div>' +
        '</div><div id="canvasDiv"></div>';

    var _imageControl = '<div id="divEditImage">' +
            '<img id="editImage" />' +
        '</div>';

    var _photoshop = "<div id='dlg' class='easyui-dialog' title='图片处理' data-options='buttons:"+'"#dlg-buttons"'+" ' >" +
        _html +
        "</div>" +
        "<div id='dlg-buttons'>" +
            "<a href='javascript:void(0)' class='easyui-linkbutton' >应用</a>" +
            "<a href='javascript:void(0)' class='easyui-linkbutton' >保存</a>" +
            "<a href='javascript:void(0)' class='easyui-linkbutton' >关闭</a>" +
        "</div>";
    (function($){
        var clipAreaO = [ 0 , 0 , 0 , 0];
        var clipApi;
        var parentWidth ;
        var parentHeight ;
        var jq ;
        var opts ;
        var ctx;
        var canvasObj;
        var img;
        var rotateVal = 0;
        var imageWaterMarkList = [];
        var rootImage;
        var currentSelected = 0;
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
        var _cid = 0
        function cid() {
            return _cid++
        }
        /*
        * 剪切图片，并且生成图片
        * */
        function clipImage () {
            var width = clipAreaO[2] - clipAreaO[0];
            var height = clipAreaO[3] - clipAreaO[1];
            initCanvasObj();
            img = new Image();
            img.src = rootImage;
            img.onload = function () {
                canvasObj.width = width;
                canvasObj.height = height;
                ctx.drawImage(img, clipAreaO[0], clipAreaO[1], width, height ,0 , 0, width, height);
                setRootImage(canvasObj.toDataURL("image/png"));
                _buildCanvas();
                clipAreaO[0] = 0;
                clipAreaO[1] = 0;
                clipAreaO[2] = width;
                clipAreaO[3] = height;
//                window.open(canvasObj.toDataURL("image/png"),"smallwin","width=800,height=700");
            }
            $(clipApi).data('Jcrop').release();
        }
        /**
         * 旋转图片并且生成图片
         * */
        function rotateImage () {
            initCanvasObj();
            img = new Image();
            img.src = rootImage;
            img.onload = function () {
                var imgW = img.width;
                var imgH = img.height;
                var rightAngleA;
                var rightAngleB;
                var rightAngleC;
                var rightAngleD;
                var canvasWidth = imgW;
                var canvasHeight = imgH ;
                if (rotateVal > 0 && rotateVal <= 90) {
                    rightAngleA = imgW*Math.sin( rotateVal *(Math.PI/180));
                    rightAngleB = imgW*Math.sin( (90-rotateVal) *(Math.PI/180) );
                    rightAngleC = imgH*Math.sin( rotateVal *(Math.PI/180));
                    rightAngleD = imgH*Math.sin( (90-rotateVal) *(Math.PI/180) );
                    canvasHeight = rightAngleA + rightAngleD;
                    canvasWidth = rightAngleB + rightAngleC;
                    canvasObj.width = canvasWidth;
                    canvasObj.height = canvasHeight;

                    ctx.translate( rightAngleC ,   0 );
                } else if (rotateVal > 90 && rotateVal <= 180) {
                    rightAngleA = imgW*Math.sin( (rotateVal - 90) *(Math.PI/180));
                    rightAngleB = imgW*Math.sin( (180-rotateVal) *(Math.PI/180) );
                    rightAngleC = imgH*Math.sin( (rotateVal - 90) *(Math.PI/180));
                    rightAngleD = imgH*Math.sin( (180-rotateVal) *(Math.PI/180) );
                    canvasHeight = rightAngleC + rightAngleB;
                    canvasWidth = rightAngleA + rightAngleD;
                    canvasObj.width = canvasWidth;
                    canvasObj.height = canvasHeight;
                    ctx.translate( rightAngleD+rightAngleA ,  rightAngleC );
                } else if (rotateVal > 180 && rotateVal <= 270) {
                    rightAngleA = imgW*Math.sin( (rotateVal - 180) *(Math.PI/180));
                    rightAngleB = imgW*Math.sin( (270-rotateVal) *(Math.PI/180) );
                    rightAngleC = imgH*Math.sin( (rotateVal - 180) *(Math.PI/180));
                    rightAngleD = imgH*Math.sin( (270-rotateVal) *(Math.PI/180) );
                    canvasHeight = rightAngleA + rightAngleD;
                    canvasWidth = rightAngleB + rightAngleC;
                    canvasObj.width = canvasWidth;
                    canvasObj.height = canvasHeight;
                    ctx.translate( rightAngleB ,  rightAngleA + rightAngleD );
                } else if (rotateVal > 270 && rotateVal <= 360) {
                    rightAngleA = imgW*Math.sin( (rotateVal - 270) *(Math.PI/180));
                    rightAngleB = imgW*Math.sin( (360-rotateVal) *(Math.PI/180) );
                    rightAngleC = imgH*Math.sin( (rotateVal - 270) *(Math.PI/180));
                    rightAngleD = imgH*Math.sin( (360-rotateVal) *(Math.PI/180) );
                    canvasHeight = rightAngleC + rightAngleB;
                    canvasWidth = rightAngleA + rightAngleD;
                    canvasObj.width = canvasWidth;
                    canvasObj.height = canvasHeight;
                    ctx.translate( 0 , rightAngleB );
                }
                ctx.rotate(Math.PI * rotateVal / 180 );
                ctx.drawImage(img, 0 , 0 , imgW , imgH );
                setRootImage(canvasObj.toDataURL("image/png"));
                _buildCanvas();
//                window.open(canvasObj.toDataURL("image/png"),"smallwin","width=1440,height=900");
            }
        }
        function setRootImage( _setOpt ){
            if ( !_setOpt && opts.imageUrl) {
                rootImage = opts.imageUrl;
            } else {
                rootImage = _setOpt;
            }
        }
        function initCanvasObj () {
            $("#divEditImage").find("canvas").remove();
            $("#divEditImage").append("<canvas />");
            canvasObj = document.getElementsByTagName("canvas")[0];
            ctx = canvasObj.getContext('2d');
        }
        function _eachWatermark () {
            var def = $.Deferred();
            var _index = 0;
            var _IA = imageWaterMarkList;
            $.each(_IA,function( i , I){
                $.each(I,function( k , _K ){
                    var img = new Image();
                    img.src = _K.src;
                    img.onload = function () {
                        _index ++ ;
                        var W = $("#"+k).width();
                        var H = $("#"+k).height();
                        var L = parseInt($("#"+k).css("left"));
                        var T = parseInt($("#"+k).css("top"));
                        ctx.drawImage(img, L, T, W, H);
                        if ( _index == _IA.length) {
                            def.resolve();
                        }
                    }
                });
            });
            return def.promise();
        }
        function _buildIWatermark(){
            initCanvasObj();
            img = new Image();
            img.src = rootImage;
            var width = img.width;
            var height = img.height;
            img.onload = function () {
                canvasObj.width = width;
                canvasObj.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                _eachWatermark().done(function(){
                    setRootImage(canvasObj.toDataURL("image/png"));
                    _buildCanvas();
//                    window.open(canvasObj.toDataURL("image/png"),"smallwin","width=1440,height=900");
                });
            }
        }
        function addImageWatermark( _OBJ ){
            var _OCID = "imageWaterMark_"+cid();
            var _json = {};
            _json[_OCID] = _OBJ;
            imageWaterMarkList.push(_json);
            $("#divEditImage").append('<div id="'+_OCID+'" style="position: absolute; left: 0px; top: 0px;" ></div>');
            $("#"+_OCID).width(_OBJ.width);
            $("#"+_OCID).height(_OBJ.height);
            $("#"+_OCID).append(_OBJ);
//            $("#"+_OCID).css("background-image",_OBJ);
            $("#"+_OCID).draggable({
                onDrag:function(e){
                    var d = e.data;
                    if (d.left < 0){d.left = 0}
                    if (d.top < 0){d.top = 0}
                    if (d.left + $(d.target).outerWidth() > $(d.parent).width()){
                        d.left = $(d.parent).width() - $(d.target).outerWidth();
                    }
                    if (d.top + $(d.target).outerHeight() > $(d.parent).height()){
                        d.top = $(d.parent).height() - $(d.target).outerHeight();
                    }
                }
            });
        }
        function saveImage(){
            var imageData = canvasObj.toDataURL();
            var b64 = imageData.substring(22);
            $.ajax({
                type:"post",
                url: opts.url,
                data: {files:b64}
            }).success(function(_data) {
                initSomeThing();
                opts.onSaveSuccess(_data);
            });
        }
        function initSomeThing(){
            canvasObj = null;
        }
        function createImageFile () {
            var self = this;
            if ( !canvasObj ){
                initCanvasObj();
                img = new Image();
                img.src = rootImage;
                img.onload = function () {
                    canvasObj.width = img.width;
                    canvasObj.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    saveImage();
                }
            } else {
                saveImage();
            }
        }
        function initClipPlugin(){
            clipApi = $("#editImage").Jcrop({
                onChange: showCoords,
                onSelect: showCoords,
                onDone:function(){
                    var a = 1;
                }
            });
        }
        function imageRoate( _s ){
            $("#divEditImage").css("transform","rotate("+ _s +"deg)");
            $("#divEditImage").css("-webkit-transform","rotate("+ _s +"deg)");
            $("#divEditImage").css("-moz-transform","rotate("+ _s +"deg)");
        }
        function _buildCanvas () {
            if ( $("#divEditImage") ) {
                clipApi = null;
                $("#divEditImage").remove();
            }
            $("#canvasDiv").append(_imageControl);
            $("#editImage").attr("src",rootImage);

            var image = new Image();
            image.src = rootImage;
            image.onload = function () {
                $("#divEditImage").width(image.width);
                $("#divEditImage").height(image.height);
            }
            if ( 0 == currentSelected ) {
                initClipPlugin();
            }

            $("#clipWidth").keyup(function(ev) {
                clipAreaO[2] = clipAreaO[0] + parseInt(ev.currentTarget.value);
                $(clipApi).data('Jcrop').setSelect(clipAreaO);
            });
            $("#clipHeight").keyup(function(ev) {
                clipAreaO[3] = clipAreaO[1] + parseInt(ev.currentTarget.value);
                $(clipApi).data('Jcrop').setSelect(clipAreaO);
            });
        }
        function init(target){
            opts = $.data(target, 'photoshop').options;
            jq = $(target);
            parentWidth = jq.parent().width();
            parentHeight = jq.parent().height();
            jq.append(_photoshop);
            $.parser.parse(jq.html);
            var dialogWidth = 1024;
            var dialogHeight = 800;
            if ( opts.width ) {
                dialogWidth = opts.width;
            }
            if ( opts.height ) {
                dialogHeight = opts.height;
            }
            $("#dlg").dialog({
                width:dialogWidth,
                height:dialogHeight,
                closable:false,
                onOpen:function(){
                    if ($(clipApi).data('Jcrop')) {$(clipApi).data('Jcrop').focus();}
                }});
            $("#controlContent").tabs({
                tabWidth : "152px",
                onSelect : function ( tit , _index ) {
                    currentSelected = _index;
                    switch (_index){
                        case 0:
                            if ( !clipApi ) {
                                initClipPlugin();
                            } else {
                                $("#editImage").css("display","none");
                                $(".jcrop-holder").css("display","block");
                            }
                            break;
                    }
                },
                onUnselect : function (tit , _index) {
                    switch ( _index ){
                        case 0:
                            $(".jcrop-holder").css("display","none");
                            $("#editImage").css("display","block");
                            $(clipApi).data('Jcrop').release();
                            break;
                        case 1:
                            $("#sliderSize").slider({value:0});
                            imageRoate(0);
                            break;
                        case 2:
                            $.each(imageWaterMarkList,function( m , M ){
                                $.each( M ,function( n , N){
                                    $("#"+n).remove();
                                });
                            });
                            imageWaterMarkList = [];
                            break;
                    }
                }
            });
            $("#sliderSize").slider({
                rule:[0,'|' , 45 , '|', 90 , '|', 135  , '|' , 180  , '|'  , 225 ,'|', 270 ,'|', 315 ,'|',360],
                onChange:function(_s){
                    rotateVal = _s*3.6;
                    imageRoate(rotateVal);
                }
            });
            setRootImage();
            _buildCanvas();
            $("#changeFile").change(function( _fi ){
                var _files = _fi;
                readLocalFileI(_files.currentTarget.files[0]).done(function(IO){
                    _files = null;
                    var imgObj = new Image();
                    imgObj.src = IO;
                    imgObj.onload = function(){
                        addImageWatermark(imgObj);
                    }
                });
            });
            $("#dlg-buttons").delegate("a","click",function( ev ){
                switch ( ev.currentTarget.innerText || ev.currentTarget.text) {
                    case "应用":
                        if ( 0 == currentSelected) {
                            clipImage();
                        } else if ( 1 == currentSelected) {
                            rotateImage();
                        } else if ( 2 == currentSelected) {
                            _buildIWatermark();
                        }
//                        window.open(canvasObj.toDataURL("image/png"),"smallwin","width=1440,height=900");
                        break;
                    case "保存":
                        createImageFile();
                        break;
                    case "关闭":
                        $("#dlg").dialog('destroy');
                        break;
                }
            });


        }
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
        $.fn.photoshop = function(options, param){
            if (typeof options == 'string'){
                return $.fn.photoshop.methods[options](this, param);
            }
            options = options || {};
            return this.each(function(){
                var state = $.data(this, 'photoshop');
                if (state){
                    $.extend(state.options, options);
                } else {
                    $.data(this, 'photoshop', {
                        options: $.extend({}, $.fn.photoshop.defaults, $.fn.photoshop.parseOptions(this), options)
                    });
                }
                init(this);
            });
        };
        $.fn.photoshop.methods = {
            options: function(jq){
                return $.data(jq[0], 'photoshop').options;
            }
        };
        $.fn.photoshop.parseOptions = function(target){
            var t = $(target);
            return $.extend({}, $.parser.parseOptions(target,[]), {});
        };
        $.fn.photoshop.defaults = {
            imageUrl:"",
            onSaveSuccess:function(){}
        };
    })(jQuery);
});
