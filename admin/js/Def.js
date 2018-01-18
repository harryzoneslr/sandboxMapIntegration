define('Def', function () {
    //Do setup work here
    // var shirt = {
    //     color: "black",
    //     size: "unisize",
    //     getShirt: function(){
    //         return "shirt";
    //     }
    // }


    var shirt1 = {
        data: {

            shirtList:[
                {
                    "id":"AutoNaviMap",
                    "text": "Auto Navi Map",
                    "icon":"ion-wrench",
                    "subNavigationList":[
                        {
                            "id":"MapBasic",
                            "url":"MapBasic.html",
                            "text":"Basic Map"
                        },
                        {
                            "id":"LogonUser",
                            "url":"LogonUserList.html",
                            "text":"Basic Map"
                        }
                    ]
                }
            ]


        }
    };

    return shirt1;
});