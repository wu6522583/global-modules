define(function(require,exports,module){
    require("editImage");
    function editI(){}
    editI.prototype.init = function () {
        $("#edim").editImage({
            "imageUrl":"1.jpg"
        });
    }
    module.exports = editI;
});