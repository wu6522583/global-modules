define(function(require,exports,module){
	function projectMapping() {
		this.localMapping = {"http://127.0.0.1:8080/cms-web/dict/go_dict_list.do":"./dict/dict_list",
							"http://127.0.0.1:8080/cms-web/auth/go_auth_list.do":"./auth/auth_list",
							"http://127.0.0.1:8080/cms-web/role/list_page.do":"./role/role_list",
							"http://127.0.0.1:8080/cms-web/dept/list_page.do":"./dept/dept_list",
							"http://127.0.0.1:8080/cms-web/user/go_user_list.do":"./user/user_list"};
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