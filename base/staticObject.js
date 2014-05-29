/**
 * Created by Administrator on 2014/5/13.
 * 鏈枃浠舵墿灞曚簡涓�笅seajs鐨勫姛鑳�
 */
define(function(require,exports,module){
    var ifrCallBack = [];
    function staticObject() {
        this.staticRule = [];
    }
    staticObject.prototype.constantObject = function ( list ) {
    	var def = $.Deferred();
        var _m = 0,len = list.length,_k = 0,_arr_key = [],_arr_idr = [],self = this;
        for ( ; _k < len ; _k++ ) {
            for ( _p in list[_k] ) {
                _arr_idr.push(list[_k][_p]);
                _arr_key.push(_p);
            }
        }
        seajs.use(_arr_idr,function(){
            var arg = arguments.length;
            for (var v = 0 ; v < arg ; v ++) {
                if (!arguments[v]) continue;
                window[_arr_key[v]] = new arguments[v]();
            }
            window.staticObjectArr = self.staticObjectArr;
            def.resolve();
        });
        return def.promise();
    }

    staticObject.prototype.start = function ( auto ) {
        var self = this;
        var def = $.Deferred();
        if (auto["static"]) {
            self.constantObject(auto["static"]).done(function(){
            	def.resolve();
            });
        }
        return def.promise();
    }
    module.exports = staticObject;
 });