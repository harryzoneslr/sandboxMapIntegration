define('Shoe',  function() {

        var shoe = new Vue({
            el: "#x_navigation",
            data: {

                navigationList:[
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



        });

        return shoe;
    }
);