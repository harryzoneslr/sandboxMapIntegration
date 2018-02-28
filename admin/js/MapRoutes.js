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
            ],
            salesMan:
                {
                    employeeId:'i349035',
                    employeeName:'李小刚',
                    index: 1,
                    visitDate: '2018-02-28'
                },
            visitRecords: [
                {
                    index: 1,
                    visitTime: '10:24am',
                    actualLngLats: [104.0721, 30.6633],
                    customerName: '成都日一新物流',
                    customerLngLats: [104.0711, 30.6632],
                    checkStatus: '',
                    checkStatusLabel:'',
                    checkStatusClass:'',
                    distance:0
                },
                {
                    index: 2,
                    visitTime: '11:25am',
                    actualLngLats: [104.0566, 30.5880],
                    customerName: '成都天府鑫谷软件园',
                    customerLngLats: [104.0564, 30.5870],
                    checkStatus: '',
                    checkStatusLabel:'',
                    checkStatusClass:'',
                    distance:0
                },
                {
                    index: 3,
                    visitTime: '02:37pm',
                    actualLngLats: [104.0683, 30.5360],
                    customerName: '成都软件园E区',
                    customerLngLats: [104.0684, 30.5370],
                    checkStatus: '',
                    checkStatusLabel:'',
                    checkStatusClass:'',
                    distance:0
                },
                {
                    index: 4,
                    visitTime: '04:16pm',
                    actualLngLats: [104.0464, 30.5350],
                    customerName: '美城云庭住宅区',
                    customerLngLats: [104.0454, 30.5350],
                    checkStatus: '',
                    checkStatusLabel:'',
                    checkStatusClass:'',
                    distance:0
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

                vm.salesMan.employeeId = 'i00101';
                vm.salesMan.employeeName = '李小刚';
                vm.salesMan.visitDate = '2018-02-28';


                // create marker
                for(var i= 0; i < vm.visitRecords.length; i++){
                    // check status
                    vm.visitRecords[i].distance = vm.calDistance(vm.visitRecords[i].actualLngLats, vm.visitRecords[i].customerLngLats);
                    vm.visitRecords[i].checkStatus = vm.checkVisitStatus(vm.visitRecords[i].distance);
                    vm.updateCheckStatusLabelClass(vm.visitRecords[i]);
                    var title = "客户名称： " + vm.customerList[i].custName;
                    var content ="联系电话 ：" + vm.customerList[i].phone;
                    var flag = vm.visitRecords[i].checkStatus;
                    if (flag) {
                        var marker = new AMap.Marker({
                            map: vm.map,
                            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b'+(i+1)+'.png',
                            position: vm.visitRecords[i].customerLngLats
                        });
                    } else {
                        var marker = new AMap.Marker({
                            map: vm.map,
                            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r'+(i+1)+'.png',
                            position: vm.visitRecords[i].customerLngLats
                        });
                    }
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

                vm.planRoutes(vm.visitRecords);

                // ! important set the height of map.
                $("#x_map_addressInfo").height(800);
            },

            /**
             * Calculate distance(m) by comparing two longitude&latitude.
             * @param aclnglat
             * @param cuslnglat
             */
            calDistance: function (aclnglat, cuslnglat) {
                var lnglat = new AMap.LngLat(aclnglat[0], aclnglat[1]);
                var distance =lnglat.distance(cuslnglat);
                return distance;
            },

            /**
             * Caculate the Visit status by distance
             * @param distance
             * @returns {boolean}
             */
            checkVisitStatus: function(distance){
                if (distance <= this.DISTANCE_STANDARD) {
                    return true;
                } else {
                    return false;
                }
            },

            /**
             * Logic to update visitRecord modal check status label and style class by check status
             * @param visitRecord
             */
            updateCheckStatusLabelClass: function(visitRecord){
                if(visitRecord.checkStatus){
                    visitRecord.checkStatusLabel = "合格";
                    visitRecord.checkStatusClass = "glyphicon glyphicon-ok content-green";
                }else{
                    visitRecord.checkStatusLabel = "不合格";
                    visitRecord.checkStatusClass = "glyphicon glyphicon-remove content-red";
                }
            },

            planRoutes: function (postions) {
                var vm = this;
                var length = postions.length;
                var start = postions[0].actualLngLats;
                var end = postions[length - 1].actualLngLats;
                var path = [];
                for (var i = 1; i < length - 1; i++) {
                    path.push(postions[i].actualLngLats);
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
