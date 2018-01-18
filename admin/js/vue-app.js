var Sidemenu = new Vue({
    el: "#sidebar-menu",
    data: {

    },

    ready: function () {
        $body = $("body");
            $openLeftBtn = $(".open-left");
            $menuItem = $("#sidebar-menu a");
    },

    methods: {

        openLeftBar:function() {
            $("#wrapper").toggleClass("enlarged");
            $("#wrapper").addClass("forced");

            if($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
                $("body").removeClass("fixed-left").addClass("fixed-left-void");
            } else if(!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
                $("body").removeClass("fixed-left-void").addClass("fixed-left");
            }

            if($("#wrapper").hasClass("enlarged")) {
                $(".left ul").removeAttr("style");
            } else {
                $(".subdrop").siblings("ul:first").show();
            }
            toggle_slimscroll(".slimscrollleft");
            $("body").trigger("resize");
        },

        menuItemClick:function(e) {
            if(!$("#wrapper").hasClass("enlarged")){
                if($(this).parent().hasClass("has_sub")) {

                }
                if(!$(this).hasClass("subdrop")) {
                    // hide any open menus and remove all other classes
                    $("ul",$(this).parents("ul:first")).slideUp(350);
                    $("a",$(this).parents("ul:first")).removeClass("subdrop");
                    $("#sidebar-menu .pull-right i").removeClass("md-remove").addClass("md-add");

                    // open our new menu and add the open class
                    $(this).next("ul").slideDown(350);
                    $(this).addClass("subdrop");
                    $(".pull-right i",$(this).parents(".has_sub:last")).removeClass("md-add").addClass("md-remove");
                    $(".pull-right i",$(this).siblings("ul")).removeClass("md-remove").addClass("md-add");
                }else if($(this).hasClass("subdrop")) {
                    $(this).removeClass("subdrop");
                    $(this).next("ul").slideUp(350);
                    $(".pull-right i",$(this).parent()).removeClass("md-remove").addClass("md-add");
                }
            }
        },

        init:function() {
            var $this  = this;

            var ua = navigator.userAgent,
                event = (ua.match(/iP/i)) ? "touchstart" : "click";

            //bind on click
            this.$openLeftBtn.on(event, function(e) {
                e.stopPropagation();
                $this.openLeftBar();
            });

            // LEFT SIDE MAIN NAVIGATION
            $this.$menuItem.on(event, $this.menuItemClick);

            // NAVIGATION HIGHLIGHT & OPEN PARENT
            $("#sidebar-menu ul li.has_sub a.active").parents("li:last").children("a:first").addClass("active").trigger("click");
        },

    }
});