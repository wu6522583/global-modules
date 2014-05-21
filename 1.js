define(function(require,exports,module){
    require("editImage");
    function editI(){}
    editI.prototype.init = function () {
        $("#edim").editImage({
            "imageUrl":"2.jpg"
        });
    }
    module.exports = editI;
});