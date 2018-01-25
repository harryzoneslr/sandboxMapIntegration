require( ["Navigation"], function(navigation) {

    var searchModel = new Vue({
        el: "#x_data",
        data: {
            content: {
                latitude: "",
                longitude: "",
                addressInfo: ""
            },
            map: {},
            elMap: 'x_map_addressInfo',
            DEFAULT_X: 103.56,
            DEFAULT_Y: 30.35,
            customerList:[
                {
                    custName:'成都日一新物流',
                    index: 1,
                    address: '成都市青羊区鼓楼南街117号',
                    phone:'028-86512242',
                    coordinates:[104.0711, 30.6632]
                },
                {
                    custName:'成都天府鑫谷软件园',
                    index: 2,
                    address: '成都市武侯区府城大道西段399号',
                    phone:'028-82345654',
                    coordinates:[104.0564, 30.5870]
                },
                {
                    custName:'成都软件园E区',
                    index: 3,
                    address: '成都市高新区天府大道1366号天府软件园E区',
                    phone:'028-83245688',
                    coordinates:[104.0684, 30.5370]
                },
                {
                    custName:'美城云庭住宅区',
                    index: 4,
                    address: '成都市双流区剑南大道南段338号',
                    phone:'028-85295110',
                    coordinates:[104.0454, 30.5350]
                }
            ]
        },

        ready: function () {
            navigation.loadNavigation($('#sidebar-menu'), 'MapRoutes');
            this.refreshOnMap();
        },

        methods: {
            refreshOnMap: function(){
                var vm = this;

                // init map
                vm.map = {};
                vm.map = new AMap.Map(this.elMap, {
                    resizeEnable: true,
                    zoom: 11,
                    center: [104.049298, 30.546702]
                });

                // create marker
                for(var i= 0; i < vm.customerList.length; i++){
                    var marker = new AMap.Marker({            
                        map: vm.map,
                        icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b'+(i+1)+'.png',
                        position: vm.customerList[i].coordinates
                    });
                    var title = vm.customerList[i].custName;
                    var content ="联系电话 ：" + vm.customerList[i].phone;
                    marker.content = vm.createInfoWindow(title, content);
                    marker.on('click', function (e) {
                        var infoWindow = new AMap.InfoWindow({
                            isCustom: true,
                            content: e.target.content,
                            offset: new AMap.Pixel(16, -45)
                        });
                        infoWindow.open(e.target.getMap(), e.target.getPosition());
                    });
                    marker.emit('click', {target: marker});
                }

                 vm.planRoutes();

                // ! important set the height of map.
                $("#x_map_addressInfo").height(800);
            },

            // define infoWindow
            createInfoWindow: function (title, content) {
                var vm = this;
                var info = document.createElement("div");
                info.className = "info";

                // define top
                var top = document.createElement("div");
                var titleD = document.createElement("div");
                var closeX = document.createElement("img");
                top.className = "info-top";
                titleD.innerHTML = title;
                closeX.src = "http://webapi.amap.com/images/close2.gif";
                closeX.onclick = function () {
                    vm.map.clearInfoWindow();
                };

                top.appendChild(titleD);
                top.appendChild(closeX);
                info.appendChild(top);

                // define middle content
                var middle = document.createElement("div");
                middle.className = "info-middle";
                middle.style.backgroundColor = 'white';
                middle.innerHTML = content;
                info.appendChild(middle);

                // define bottom
                var bottom = document.createElement("div");
                bottom.className = "info-bottom";
                bottom.style.position = 'relative';
                bottom.style.top = '0px';
                bottom.style.margin = '0 auto';
                var sharp = document.createElement("img");
                sharp.src = "http://webapi.amap.com/images/sharp.png";
                bottom.appendChild(sharp);
                info.appendChild(bottom);
                return info;
            }

            refreshOnMap: function(){
                this.map = {};
                this.map = new AMap.Map(this.elMap, {
                    resizeEnable: true,
                    zoom: 11,
                    center: [104.049298, 30.546702]
                });
                for(var i= 0; i < this.customerList.length; i++){
                    var marker = new AMap.Marker({
                        map: this.map,
                        position: this.customerList[i].coordinates
                    });
                }
                // ! important set the height of map.
                $("#x_map_addressInfo").height(800);
            },

            planRoutes: function () {
                var vm = this;
                var length = vm.customerList.length;
                var start = vm.customerList[0].coordinates;
                var end = vm.customerList[length - 1].coordinates;
                var path = [];
                for (var i = 1; i < length - 1; i++) {
                    path.push(vm.customerList[i].coordinates);
                }

                AMap.plugin(["AMap.Driving"], function () {
                    var driving = new AMap.Driving({
                        map: vm.map,
                        hideMarkers: true
                    });
                    driving.search(start, end, {waypoints: path});
                });
            }
        }
    });

    return searchModel;

});
