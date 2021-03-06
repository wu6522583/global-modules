/**
 * 此模块用来扩展seajs 里面 不支持的功能。属于 seajs的外部扩展模块。
 * */
define(function(require,exports,module){
    var eax = 0;
    seajs.dependentLoad = function ( _arr , _callback ) {
        var args = arguments;
        require.async( args[0][eax] ,function(){
            if ( args[0][eax] ) {
                eax++;
                args.callee(args[0],args[1]);
            } else {
                eax = 0;
                if( !args[1] ) return;
                args[1]();
            }
        });
//        eax++;
    }
});
