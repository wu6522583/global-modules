/**
 * Created by Administrator on 14-4-15.
 */
(function( global, factory ) {
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
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
    /**
     * Transition Frame
     * */
    var strundefined = typeof undefined;
    var TF = function TF( container ){
        return new TF.fn.init( container );
    }
    TF.fn = TF.prototype = {
        init: function( container ){
            this._container = $(container);
            return this._container;
        },
        tree: function () {},
        tabs: function () {},
        pagination: function () {},
        datagrid: function () {}
    }
    TF.fn.init.prototype = TF.fn;

    if ( typeof noGlobal === strundefined ) {
        window.TF = TF;
    }
    return TF;
}))