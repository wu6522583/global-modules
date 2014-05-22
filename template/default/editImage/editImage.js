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
    var _html = '' +
        '<div id="controlContent" class="easyui-tabs" data-options="tabWidth:112" style="width:700px;height:100px">' +
            '<div title="图像裁剪" style="padding:10px">' +
                '宽度：<input id="clipWidth" maxlength="4" /> 高度：<input id="clipHeight" maxlength="4" /> <input type="button" id="sureClip" value="剪切" />' +
            '</div>' +
            '<div title="图片旋转" style="padding:10px">' +
                '<input id="sliderSize" style="width:150px" data-options="showTip:true" /> <input type="button" id="saveRotate" value="应用" />' +
            '</div>' +
            '<div title="图片水印" style="padding:10px">' +
                '<input type="file" id="changeFile"/><input type="button" id="buildWaterMark" value="生成">' +
            '</div>' +
            '<div title="文字水印" style="padding:10px">' +
                '<p>History Content.</p>' +
            '</div>' +
            '<div title="缩略设置" style="padding:10px">' +
                '<p>References Content.</p>' +
            '</div>' +
        '</div>';
    var _imageControl = '<div id="divEditImage">' +
            '<img id="editImage" />' +
        '</div>';
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
                window.open(canvasObj.toDataURL("image/png"),"smallwin","width=800,height=700");
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
                window.open(canvasObj.toDataURL("image/png"),"smallwin","width=1440,height=900");
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
                    window.open(canvasObj.toDataURL("image/png"),"smallwin","width=1440,height=900");
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
        function initClipPlugin(){
            clipApi = $("#editImage").Jcrop({
                onChange: showCoords,
                onSelect: showCoords
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
            jq.append(_imageControl);
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
            opts = $.data(target, 'editImage').options;
            jq = $(target);
            parentWidth = jq.parent().width();
            parentHeight = jq.parent().height();
            jq.append(_html);

            $("#controlContent").tabs({
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
                        case 1:

                            break;
                        case 2:
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
                onChange:function(_s){
                    rotateVal = _s*3.6;
                    imageRoate(rotateVal);
                }
            });
            setRootImage();
            _buildCanvas();
            $("#sureClip").click(function(){
                clipImage();
            });
            $("#saveRotate").click(function(){
                rotateImage();
            });
            $("#changeFile").change(function(){
                readLocalFileI(arguments[0].currentTarget.files[0]).done(function(IO){
                    var imgObj = new Image();
                    imgObj.src = IO;
                    addImageWatermark(imgObj);
                });
            });
            $("#buildWaterMark").click(function(){
                _buildIWatermark();
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