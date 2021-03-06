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
            CUST_TYPE_NORMAL: 1,
            CUST_TYPE_PROSPECT: 2,
            customerList:[
                {
                    custName:'成都日一新物流',
                    index: 1,
                    address: '成都市青羊区鼓楼南街117号',
                    phone:'028-86512242',
                    coordinates:[104.0711, 30.6632],
                    type:1,
                    typeLabel: '',
                    typeClass: ''
                },
                {
                    custName:'成都天府鑫谷软件园',
                    index: 2,
                    address: '成都市武侯区府城大道西段399号',
                    phone:'028-82345654',
                    coordinates:[104.0564, 30.5870],
                    type:2,
                    typeLabel: '',
                    typeClass: ''
                },
                {
                    custName:'成都软件园E区',
                    index: 3,
                    address: '成都市高新区天府大道1366号天府软件园E区',
                    phone:'028-83245688',
                    coordinates:[104.0684, 30.5370],
                    type:2,
                    typeLabel: '',
                    typeClass: ''
                },
                {
                    custName:'美城云庭住宅区',
                    index: 4,
                    address: '成都市双流区剑南大道南段338号',
                    phone:'028-85295110',
                    coordinates:[104.0454, 30.5350],
                    type:1,
                    typeLabel: '',
                    typeClass: ''
                }
            ]
        },

        ready: function () {
            navigation.loadNavigation($('#sidebar-menu'), 'MapMarkers');
            this.refreshOnMap();
        },

        methods: {

            searchOnMap: function () {
                this.searchOnAddressMap(this.content.addressInfo);
            },

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
                    var marker;
                    vm.setTypeLabel(vm.customerList[i]);
                    if(vm.customerList[i].type === vm.CUST_TYPE_NORMAL){
                        marker = new AMap.Marker({
                            map: vm.map,
                            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b'+(i+1)+'.png',
                            position: vm.customerList[i].coordinates
                        });


                    }else{
                        marker = new AMap.Marker({
                            map: vm.map,
                            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r'+(i+1)+'.png',
                            position: vm.customerList[i].coordinates
                        });

                    }

                    var title = "客户名称： " + vm.customerList[i].custName;
                    var content ="联系电话 ：" + vm.customerList[i].phone;
                    marker.content = title + "</br>" + content;
                    marker.on('click', function (e) {
                        var infoWindow = new AMap.InfoWindow({
                            isCustom: false,
                            content: e.target.content,
                            offset: new AMap.Pixel(16, -45)
                        });
                        infoWindow.open(e.target.getMap(), e.target.getPosition());
                    });
                    marker.emit('click', {target: marker});

                }
                // ! important set the height of map.
                $("#x_map_addressInfo").height(800);
            },

            /**
             * Set customer type label by type.
             */
            setTypeLabel: function(customer){
                if(customer.type === this.CUST_TYPE_NORMAL){
                    customer.typeLabel = "普通客户";
                    customer.typeClass = "glyphicon glyphicon-star content-green";
                }
                if(customer.type === this.CUST_TYPE_PROSPECT){
                    customer.typeLabel = "潜在客户";
                    customer.typeClass = "glyphicon glyphicon-star-empty content-red";
                }
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
            },

            // hanlder method for send message
            searchOnAddressMap: function (location) {

                var vm = this;

                var localSearch = new BMap.LocalSearch(vm.map, { renderOptions: { map: vm.map, autoViewport: true} });
                vm.map.clearOverlays(); // Clear the old markers on map

                localSearch.setSearchCompleteCallback(function (searchResult) {
                    var poi = searchResult.getPoi(0);
                    if (!poi) {
                        alert("没有找到地址！");
                        return;
                    }
                    var latitude = poi.point.lat;
                    var longitude = poi.point.lng;
                    // set on page
                    vm.content.latitude = latitude;
                    vm.content.longitude = longitude;
                    vm.map.centerAndZoom(poi.point, 13);
                    var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // Create new mark
                    vm.map.addOverlay(marker);
                    var content = "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat;
                    var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
                    marker.addEventListener("click", function () {
                        this.openInfoWindow(infoWindow);
                    });
                    // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //GIF cartoon
                });
                localSearch.search(location);
            }
        }
    });

    return searchModel;

});
