/**
 * Created by Administrator on 2014/5/13.
 */
define(function(require,exports,module){
    function adapter(){}
    adapter.prototype.adapterjQuery = function( win ){
        win.jQuery = jQuery;
        return (function( global, factory ) {
            if ( typeof module === "object" && typeof module.exports === "object" ) {
                module.exports = global.document ?
                    factory( global, true ) :
                    function( w ) {
                        if ( !w.document ) {
                            throw new Error( "jQuery requires a window with a document" );
                        }
                        return factory( w );
                    };
            } else {
                factory( global );
            }
        })(typeof win !== "undefined" ? win : this, function( win, noGlobal ) {
            /**
             * Transition Frame
             * */
            var strundefined = typeof undefined;
            var rootDoc = win.document;
            var ajQuery = function ( selector, context ){
                context = rootDoc;
                return new ajQuery.fn.init( selector, context );
            }
            ajQuery.fn = ajQuery.prototype = {
                init: function( selector, context ){
                    return win.jQuery(selector, context);
                }
            }
            ajQuery.fn.init.prototype = ajQuery.fn;

            if ( typeof noGlobal === strundefined ) {
                win.$ = ajQuery;
            }
            return  win.$;
        });
    }
    module.exports = adapter;
});