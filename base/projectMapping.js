define(function(require,exports,module){
	function projectMapping() {
		this.localMapping = {};
							
	}
	projectMapping.prototype.setMapping = function ( _json ) {
		this.localMapping = _json;
	}
	projectMapping.prototype.setUrl = function ( _href ) {
		seajs.config({
            vars: {
                "varEmit" : this.localMapping[_href]
            }
        });
	}
	module.exports = projectMapping;
});