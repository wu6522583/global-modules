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
    	this.Initialized = false;
    }
    engine.prototype.ready = function () {
    	var def = $.Deferred();
    	var self = this;
    	
    	require.async("./staticConfig",function(config){
    		staticObject.start({"static":config}).done(function(){
    			self.Initialized = true;
            	def.resolve();
            });
    	});
    	
    	return def.promise();
    }
    engine.prototype.go = function (url,callBack) {
    	var arg = arguments;
    	var self = this;
    	if ( !self.Initialized ) {
    		seajs.use(this.jQueryUrl,function(){
                self.ready().done(function(){
                    if (!arg.length)  return;
    				seajs.use(url,function(){
    					if (callBack) callBack();
    				});
    			});
            });
    	} else {
    		if (!arg.length)  return;
			seajs.use(url,function(){
				if (callBack) callBack();
			});
    	}
    	
    }
    window.engine = new engine(); 
    module.exports = window.engine;
});