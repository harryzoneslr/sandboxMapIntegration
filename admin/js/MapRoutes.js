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

            searchOnMap: function () {
                this.searchOnAddressMap(this.content.addressInfo);
            },



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
