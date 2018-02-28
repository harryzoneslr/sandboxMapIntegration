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
            // Constants distance standards (m)
            DISTANCE_STANDARD:100,
            customerList:[
                {
                    custName:'成都日一新物流',
                    index: 1,
                    visitTime: '10:24am',
                    address: '成都市青羊区鼓楼南街117号',
                    phone:'028-86512242',
                    coordinates:[104.0711, 30.6632]
                },
                {
                    custName:'成都天府鑫谷软件园',
                    index: 2,
                    visitTime: '11:25am',
                    address: '成都市武侯区府城大道西段399号',
                    phone:'028-82345654',
                    coordinates:[104.0564, 30.5870]
                },
                {
                    custName:'成都软件园E区',
                    index: 3,
                    visitTime: '02:37pm',
                    address: '成都市高新区天府大道1366号天府软件园E区',
                    phone:'028-83245688',
                    coordinates:[104.0684, 30.5370]
                },
                {
                    custName:'美城云庭住宅区',
                    index: 4,
                    visitTime: '04:16pm',
                    address: '成都市双流区剑南大道南段338号',
                    phone:'028-85295110',
                    coordinates:[104.0454, 30.5350]
                }
            ],
            salesMan:
                {
                    employeeId:'i349035',
                    employeeName:'李小刚',
                    index: 1,
                    visitDate: '2018-02-28'
                }
        },

        ready: function () {
            navigation.loadNavigation($('#sidebar-menu'), 'MapVisits');
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

                vm.salesMan.employeeId = 'i00101';
                vm.salesMan.employeeName = '李小刚';
                vm.salesMan.visitDate = '2018-02-28';


                // create marker
                for(var i= 0; i < vm.customerList.length; i++){
                    // check status

                    var title = "客户名称： " + vm.customerList[i].custName;
                    var content ="联系电话 ：" + vm.customerList[i].phone;

                    var marker = new AMap.Marker({
                        map: vm.map,
                        icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b'+(i+1)+'.png',
                        position: vm.customerList[i].coordinates
                    });
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

                vm.planRoutes(vm.customerList);

                // ! important set the height of map.
                $("#x_map_addressInfo").height(800);
            },



            planRoutes: function (customerList) {
                var vm = this;
                var length = customerList.length;
                var start = customerList[0].coordinates;
                var end = customerList[length - 1].coordinates;
                var path = [];
                for (var i = 1; i < length - 1; i++) {
                    path.push(customerList[i].coordinates);
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
