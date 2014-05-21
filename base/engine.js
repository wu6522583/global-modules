/**
 * Created by Administrator on 2014/5/13.
 */
define(function(require,exports,module){
    var staticObject = require("./staticObject");
    staticObject = new staticObject();

    var sysConfig = require("./sysConfig");
    sysConfig = new sysConfig();
    sysConfig.init();
    
    function engine(){
    	this.jQueryUrl = "lib/jquery/jquery.min";
    }
    engine.prototype.ready = function () {
    	var def = $.Deferred();
    	
    	require.async("./staticConfig",function(config){
    		staticObject.start({"static":config}).done(function(){
            	def.resolve();
            });
    	});
    	
    	return def.promise();
    }
    engine.prototype.go = function (url,callBack) {
    	var self = this;
    	seajs.use(this.jQueryUrl,function(){
            self.ready().done(function(){
                if (!arguments.length)  return;
				seajs.use(url,function(){
					if (callBack) callBack();
				});
			});
        });
    }
    module.exports = new engine();
});