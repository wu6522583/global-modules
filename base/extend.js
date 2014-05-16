define(function(require,exports,module){
	function extend(){
	}
	extend.prototype.startExtend = function () {
		var iflist = document.getElementsByTagName("iframe"),self = this,arg = window.staticObjectArr.length;
		if ( !iflist ) {
	        return;
	    }
		var _len = iflist.length,_i=0,_d=0;
		for (; _i < _len ; _i++) {
			var ifwindow = iflist[_i].contentWindow;
			for ( ; _d < arg ; _d++) {
		    	iflist[_i].contentWindow[window.staticObjectArr[_d]] = window[window.staticObjectArr[_d]];
		    }
			this.adapterjQuery(ifwindow);
		}
//		  if ( !iflist ) {
//		      return;
//		  }
//		  for (i=0;i<iflist.length;i++) {
//		      var ifr = iflist[i];
//		      if (ifr.attachEvent){
//		          ifr.attachEvent("onload", function(){
//		              self.ifrlist.push(this);
//		              self.copyObject();
//		          });
//		      } else {
//		          ifr.onload = function(){
//		              self.ifrlist.push(this);
//		              self.copyObject();
//		          };
//		      }
//		  }
	}
//	extend.prototype.copyObject = function () {
//		var ifrLen = this.ifrlist.length,arg = window.staticObjectArr.length;
//		for (var b = 0;b < ifrLen ; b++) {
//		    var ifwindow = this.ifrlist[b].contentWindow;
////		    ifwindow.seajs = window.seajs;
//		    for ( var d = 0 ; d < arg ; d++) {
//		    	this.ifrlist[b].contentWindow[window.staticObjectArr[d]] = window[window.staticObjectArr[d]];
//		    }
//		    
//		}
//	}
	extend.prototype.adapterjQuery = function ( win ) {
	  seajs.use("base/adapter",function(adapter){
	      new adapter().adapterjQuery(win);
	  });
	}
	module.exports = extend;
});