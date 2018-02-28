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
            DISTANCE_STANDARD: 100,
            customerList: [
                {
                    custName: '成都日一新物流',
                    index: 1,
                    address: '成都市青羊区鼓楼南街117号',
                    phone: '028-86512242',
                    coordinates: [104.0711, 30.6632]
                },
                {
                    custName: '成都天府鑫谷软件园',
                    index: 2,
                    address: '成都市武侯区府城大道西段399号',
                    phone: '028-82345654',
                    coordinates: [104.0564, 30.5870]
                },
                {
                    custName: '成都软件园E区',
                    index: 3,
                    address: '成都市高新区天府大道1366号天府软件园E区',
                    phone: '028-83245688',
                    coordinates: [104.0684, 30.5370]
                },
                {
                    custName: '美城云庭住宅区',
                    index: 4,
                    address: '成都市双流区剑南大道南段338号',
                    phone: '028-85295110',
                    coordinates: [104.0454, 30.5350]
                }
            ],
            salesMan:
                {
                    employeeId: 'i349035',
                    employeeName: '李小刚',
                    index: 1,
                    visitDate: '2018-02-28'
                },

            pointList: [
                {
                    lng: 104.0711,
                    lat: 30.6633
                },
                {
                    lng: 104.0721,
                    lat: 30.6433
                },
                {
                    lng: 104.0699,
                    lat: 30.6125
                },
                {
                    lng: 104.0643,
                    lat: 30.5998
                },
                {
                    lng: 104.0566,
                    lat: 30.5880
                },
                {
                    lng: 104.0895,
                    lat: 30.5880
                },
                {
                    lng: 104.0695,
                    lat: 30.5880
                },
                {
                    lng: 104.0683,
                    lat: 30.5360
                },
                {
                    lng: 104.0464,
                    lat: 30.5350
                }

            ],

            visitRecords: [
                {
                    index: 1,
                    visitTime: '10:24am',
                    actualLngLats: [104.0721, 30.6633],
                    customerName: '成都日一新物流',
                    customerLngLats: [104.0711, 30.6632],
                    checkStatus: '',
                    checkStatusLabel: '',
                    checkStatusClass: '',
                    distance: 0
                },
                {
                    index: 2,
                    visitTime: '11:25am',
                    actualLngLats: [104.0566, 30.5880],
                    customerName: '成都天府鑫谷软件园',
                    customerLngLats: [104.0564, 30.5870],
                    checkStatus: '',
                    checkStatusLabel: '',
                    checkStatusClass: '',
                    distance: 0
                },
                {
                    index: 3,
                    visitTime: '02:37pm',
                    actualLngLats: [104.0683, 30.5360],
                    customerName: '成都软件园E区',
                    customerLngLats: [104.0684, 30.5370],
                    checkStatus: '',
                    checkStatusLabel: '',
                    checkStatusClass: '',
                    distance: 0
                },
                {
                    index: 4,
                    visitTime: '04:16pm',
                    actualLngLats: [104.0464, 30.5350],
                    customerName: '美城云庭住宅区',
                    customerLngLats: [104.0454, 30.5350],
                    checkStatus: '',
                    checkStatusLabel: '',
                    checkStatusClass: '',
                    distance: 0
                }
            ]
        },

        ready: function () {

            navigation.loadNavigation($('#sidebar-menu'), 'MapPolyline');

            // init map
            var vm = this;
            vm.map = {};
            vm.map = new AMap.Map(this.elMap, {
                resizeEnable: true,
                zoom: 11,
                center: [104.049298, 30.546702]
            });
            this.refreshOnMap();
            this.refreshPolyline();
        },

        methods: {

            refreshPolyline: function () {
                var vm = this;

                AMapUI.setDomLibrary($);
                AMapUI.load(['ui/misc/PathSimplifier', 'lib/$', 'lib/utils'], function (PathSimplifier, $, utils) {

                    if (!PathSimplifier.supportCanvas) {
                        alert('当前环境不支持 Canvas！');
                        return;
                    }

                    var defaultRenderOptions = {
                        pathNavigatorStyle: {
                            initRotateDegree: 0,
                            width: 16,
                            height: 16,
                            autoRotate: true,
                            lineJoin: 'round',
                            content: 'defaultPathNavigator',
                            fillStyle: '#087EC4',
                            strokeStyle: '#116394', //'#eeeeee',
                            lineWidth: 1,
                            pathLinePassedStyle: {
                                lineWidth: 2,
                                strokeStyle: 'rgba(8, 126, 196, 1)',
                                borderWidth: 1,
                                borderStyle: '#eeeeee',
                                dirArrowStyle: false
                            }
                        }
                    };

                    var pathSimplifierIns = new PathSimplifier({
                        zIndex: 100,
                        map: vm.map,
                        getPath: function (pathData, pathIndex) {
                            return pathData.path;
                        },
                        getHoverTitle: function (pathData, pathIndex, pointIndex) {
                            if (pointIndex >= 0) {
                                //point
                                return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
                            }
                            return pathData.name + '，点数量' + pathData.path.length;
                        },
                        renderOptions: defaultRenderOptions
                    });

                    window.pathSimplifierIns = pathSimplifierIns;


                    var pointList = [];
                    var union, i = 0;
                    var pointLength = vm.pointList.length;
                    for (var i = 0; i < pointLength; i++) {
                        union = [];
                        union.push(vm.pointList[i].lng);
                        union.push(vm.pointList[i].lat);
                        pointList.push(union);
                    }


                    pathSimplifierIns.setData([{
                        name: 'Test',
                        // Exmple:
                        // path: [[116.405289, 39.904987], [104.0721, 30.6633],
                        // [104.0721, 30.6633],[104.0721, 30.6633]]
                        path: pointList
                    }]);

                    pathSimplifierIns.setSelectedPathIndex(0);
                    var navg = pathSimplifierIns.createPathNavigator(0, {
                        loop: true,
                        speed: 7000,
                        pathNavigatorStyle: {
                            //content: 'none'
                        }
                    });

                    navg.start();

                    var customContainer = document.getElementById('x_map_addressInfo');

                    function createKeyNavigatorStyleGui(target) {

                        var keyNavigatorStyleGui = new dat.GUI({
                            width: 260,
                            autoPlace: false,
                        });

                        var keyNavigatorStyleParams = utils.extend({}, defaultRenderOptions[target]);

                        //形状类型
                        keyNavigatorStyleGui.add(keyNavigatorStyleParams,
                            'content', ['defaultPathNavigator', 'defaultArrow', 'plane_icon', 'circle', 'none']).onChange(render);


                        keyNavigatorStyleGui.add(keyNavigatorStyleParams, 'autoRotate').onChange(render);

                        keyNavigatorStyleGui.add(keyNavigatorStyleParams, 'initRotateDegree', 0, 360).step(1).onChange(render);

                        keyNavigatorStyleGui.add(keyNavigatorStyleParams, 'height', 10, 50).step(1).onChange(render);

                        keyNavigatorStyleGui.addColor(keyNavigatorStyleParams, 'fillStyle').onChange(render);

                        keyNavigatorStyleGui.addColor(keyNavigatorStyleParams, 'strokeStyle').onChange(render);

                        keyNavigatorStyleGui.add(keyNavigatorStyleParams, 'lineWidth', 1, 20).step(1).onChange(render);

                        addGuiPanel(target, target, keyNavigatorStyleGui);

                        return keyNavigatorStyleParams;
                    }

                    function createPathLineStyleGui(target) {

                        var pathLineStyleGui = new dat.GUI({
                            width: 260,
                            autoPlace: false,
                        });

                        var parts = target.split('.');

                        var pathLineStyleParams = utils.extend({}, defaultRenderOptions[parts[0]][parts[1]]);

                        pathLineStyleGui.addColor(pathLineStyleParams, 'strokeStyle').onChange(render);

                        pathLineStyleGui.add(pathLineStyleParams, 'lineWidth', 1, 20).step(1).onChange(render);

                        pathLineStyleGui.addColor(pathLineStyleParams, 'borderStyle').onChange(render);

                        pathLineStyleGui.add(pathLineStyleParams, 'borderWidth', 1, 20).step(1).onChange(render);

                        pathLineStyleGui.add(pathLineStyleParams, 'dirArrowStyle').onChange(render);

                        addGuiPanel(target, target, pathLineStyleGui);

                        return pathLineStyleParams;
                    }

                    function addGuiPanel(id, title, gui) {

                        var container = document.createElement('div');

                        container.id = id;

                        if (title) {
                            var tEle = document.createElement('h3');
                            tEle.innerHTML = title;
                            container.appendChild(tEle);
                        }

                        container.appendChild(gui.domElement);

                        customContainer.appendChild(container);
                    }

                    var keyNavigatorStyleOptions = ['pathNavigatorStyle'],
                        pathLineStyleOptions = ['pathNavigatorStyle.pathLinePassedStyle'];


                    var styleParamsMap = {};

                    for (var i = 0, len = keyNavigatorStyleOptions.length; i < len; i++) {
                        styleParamsMap[keyNavigatorStyleOptions[i]] = createKeyNavigatorStyleGui(keyNavigatorStyleOptions[i]);
                    }

                    for (var i = 0, len = pathLineStyleOptions.length; i < len; i++) {
                        styleParamsMap[pathLineStyleOptions[i]] = createPathLineStyleGui(pathLineStyleOptions[i]);
                    }


                    var customContentMap = {
                        'plane_icon': function (params) {

                            return utils.extend(params, {
                                //使用图片
                                content: PathSimplifier.Render.Canvas.getImageContent(
                                    './imgs/plane.png',
                                    function onload() {
                                        pathSimplifierIns.renderLater();
                                    },
                                    function onerror(e) {
                                        alert('图片加载失败！');
                                    })
                            });
                        }
                    };


                    function getStyleParams() {

                        var params = utils.extend({}, styleParamsMap['pathNavigatorStyle']);

                        params = fixColors(params);

                        if (params['content'] && customContentMap[params['content']]) {
                            params = customContentMap[params['content']](params);
                        }

                        params.pathLinePassedStyle = utils.extend({}, styleParamsMap['pathNavigatorStyle.pathLinePassedStyle']);

                        params.pathLinePassedStyle = fixColors(params.pathLinePassedStyle);

                        return {
                            pathNavigatorStyle: params
                        };
                    }

                    var colorFlds = ['fillStyle', 'strokeStyle', 'borderStyle'],
                        rgbAlphaRegx = /([\d\.]+)\s*\)/i;

                    function isEmptyColor(color) {

                        if (color.indexOf('rgba') !== 0) {
                            return false;
                        }

                        var match = color.match(rgbAlphaRegx);

                        if (match && parseFloat(match[1]) < 0.01) {
                            return true;
                        }

                        return false;
                    }

                    function fixColors(opts) {

                        if (utils.isObject(opts)) {

                            for (var i = 0, len = colorFlds.length; i < len; i++) {

                                if (opts[colorFlds[i]] && isEmptyColor(opts[colorFlds[i]])) {
                                    opts[colorFlds[i]] = null;
                                }
                            }
                        }

                        return opts;
                    }

                    function render() {

                        pathSimplifierIns.renderEngine.setOptions(getStyleParams());

                        pathSimplifierIns.renderLater(200);

                        refreshConfigPanel();
                    }


                    function exportRenderOptions() {

                        var options = getStyleParams();

                        return options;
                    }

                    function refreshConfigPanel() {

                        var options = exportRenderOptions();

                        var configStr = 'renderOptions: ' + JSON.stringify(options, null, 2);

                        $('#exportConfigPanel').find('pre').html(configStr);
                    }

                    $('#exportBtn').click(function () {

                        var panel = $('#exportConfigPanel');

                        if (!panel.length) {
                            panel = $('<div id="exportConfigPanel"><pre></pre></div>').appendTo(document.body);
                            $(this).html('隐藏配置信息');

                        } else {
                            $(this).html('显示配置信息');
                            panel.remove();
                            return;
                        }
                        refreshConfigPanel();
                    });

                    render();
                });
            },
            refreshOnMap: function () {
                var vm = this;


                vm.salesMan.employeeId = 'i00101';
                vm.salesMan.employeeName = '李小刚';
                vm.salesMan.visitDate = '2018-02-28';


                // create marker
                for (var i = 0; i < vm.visitRecords.length; i++) {
                    // check status
                    vm.visitRecords[i].distance = vm.calDistance(vm.visitRecords[i].actualLngLats, vm.visitRecords[i].customerLngLats);
                    vm.visitRecords[i].checkStatus = vm.checkVisitStatus(vm.visitRecords[i].distance);
                    vm.updateCheckStatusLabelClass(vm.visitRecords[i]);
                    var title = "客户名称： " + vm.customerList[i].custName;
                    var content = "联系电话 ：" + vm.customerList[i].phone;
                    var flag = vm.visitRecords[i].checkStatus;
                    if (flag) {
                        var marker = new AMap.Marker({
                            map: vm.map,
                            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',
                            position: vm.visitRecords[i].customerLngLats
                        });
                    } else {
                        var marker = new AMap.Marker({
                            map: vm.map,
                            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r' + (i + 1) + '.png',
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


            polyline: function () {
                marker3 = new AMap.Marker({
                    map: map,
                    draggable: true, //是否可拖动
                    position: new AMap.LngLat(x, y),//基点位置
                    icon: "http://code.mapabc.com/images/car_03.png", //marker图标，直接传递地址url
                    offset: new AMap.Pixel(-26, -13), //相对于基点的位置
                    autoRotation: true
                });
                var lngX;
                var latY;
                var lineArr = [];
                for (var i = 1; i < this.pointList.length; i++) {
                    lngX = this.pointList[i].lng;
                    latY = this.pointList[i].lat;
                    lineArr.push(new AMap.LngLat(lngX, latY));
                }
            },

            /**
             * Calculate distance(m) by comparing two longitude&latitude.
             * @param aclnglat
             * @param cuslnglat
             */
            calDistance: function (aclnglat, cuslnglat) {
                var lnglat = new AMap.LngLat(aclnglat[0], aclnglat[1]);
                var distance = lnglat.distance(cuslnglat);
                return distance;
            },

            /**
             * Caculate the Visit status by distance
             * @param distance
             * @returns {boolean}
             */
            checkVisitStatus: function (distance) {
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
            updateCheckStatusLabelClass: function (visitRecord) {
                if (visitRecord.checkStatus) {
                    visitRecord.checkStatusLabel = "合格";
                    visitRecord.checkStatusClass = "glyphicon glyphicon-ok content-green";
                } else {
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