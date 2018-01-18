define("Map1", ["admin/js/Def"], function(shirt) {

    var map1 = new Vue({
        el: "#x_data",
        data: {

        }
    });

    return map1;

    $(document).ready(function () {
        var shirt = shirt.getShirt();
        console.log(shirt);
    });

});