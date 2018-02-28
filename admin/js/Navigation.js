define('Navigation', function() {

        var navigation = new Vue({
            el: "#x_navigation",
            data: {

                navigationList:[
                    {
                        "id":"AutoNaviMap",
                        "text": "高德地图",
                        "icon":"ion-wrench",
                        "subNavigationList":[
                            {
                                "id":"MapMarkers",
                                "url":"MapMarkers.html",
                                "text":"地图标记"
                            },
                            {
                                "id":"MapVisits",
                                "url":"MapVisits.html",
                                "text":"路线规划"
                            },
                            {
                                "id":"MapRoutes",
                                "url":"MapRoutes.html",
                                "text":"客户拜访情况"
                            },
                            {
                                "id":"MapPolyline",
                                "url":"MapPolyline.html",
                                "text":"拜访路线追踪"
                            }
                        ]
                    },
                    {
                        "id": "GoogleMap",
                        "text": "Google Map",
                        "icon": "ion-wrench"
                    }
                ]

            },

            ready: function () {
                var vm = this;
            },

            methods: {
                /**
                 * @private Generate Navigation side panel Html content.
                 * @param data
                 * @param groupId
                 * @param navigationId
                 * @returns {Element}
                 */
                _generateNavigationHtml: function (xmlDoc, navigationList, navigationId) {
                    var vm = this;
                    var navigationList = navigationList;
                    var ulElement = xmlDoc.createElement("ul");
                    for (var i = 0; i < navigationList.length; i++) {
                        var navigation = navigationList[i];
                        var liElement = xmlDoc.createElement("li");
                        liElement.setAttribute("class", "has_sub");
                        ulElement.appendChild(liElement);
                        var ahrefElement = xmlDoc.createElement("a");
                        if (navigation.url) {
                            // In case there is url on top item
                            ahrefElement.setAttribute("href", navigation.url);
                        } else {
                            ahrefElement.setAttribute("href", "javascript:void(0);");
                        }
                        var activeFlag = vm._checkNavigationResourceActive(navigation, navigationId);
                        if (i == 0) {
                            if (activeFlag) {
                                ahrefElement.setAttribute("class", "topItem waves-effect waves-primary active");
                            } else {
                                ahrefElement.setAttribute("class", "topItem waves-effect waves-primary ");
                            }
                        } else {
                            if (activeFlag) {
                                ahrefElement.setAttribute("class", "waves-effect waves-primary active");
                            } else {
                                ahrefElement.setAttribute("class", "waves-effect waves-primary");
                            }
                        }

                        liElement.appendChild(ahrefElement);
                        if (navigation.icon) {
                            var iconElement = xmlDoc.createElement("i");
                            iconElement.setAttribute("class", navigation.icon);
                            ahrefElement.appendChild(iconElement);
                        }
                        var spanElement = xmlDoc.createElement("span");
                        var textNode = xmlDoc.createTextNode(' ' + navigation.text);
                        spanElement.appendChild(textNode);
                        ahrefElement.appendChild(spanElement);

                        var numberFlag = false;
                        if (navigation.msgNumSuccess) {
                            numberFlag = true;
                            var spanNumberElement = xmlDoc.createElement("span");
                            spanNumberElement.setAttribute("class", "label label-success pull-right");
                            var textNumberNode = xmlDoc.createTextNode(' ' + navigation.msgNumSuccess + ' ');
                            spanNumberElement.appendChild(textNumberNode);
                            ahrefElement.appendChild(spanNumberElement);
                        }

                        var subNavigationList = navigation.subNavigationList;
                        if (subNavigationList && subNavigationList.length > 0) {
                            if (numberFlag === false) {
                                var spanArrowElement = xmlDoc.createElement("span");
                                spanArrowElement.setAttribute("class", "menu-arrow");
                                ahrefElement.appendChild(spanArrowElement);
                            }
                            vm._generateSubNaviHtmlWrapper(liElement, xmlDoc, subNavigationList, navigationId);
                        }
                    }
                    return ulElement;
                },

                /**
                 * @private Check if current navigation resource should be active
                 * @param navigation
                 * @param navigationId
                 * @returns {boolean}
                 *
                 */
                _checkNavigationResourceActive: function (navigation, navigationId) {
                    if (navigationId === navigation.id) {
                        return true;
                    }
                    if (!navigation.subNavigationList) {
                        return false;
                    }
                    for (var i = 0; i < navigation.subNavigationList.length; i++) {
                        if (navigationId === navigation.subNavigationList[i].id) {
                            return true;
                        }
                    }
                    return false;
                },


                _generateSubNaviHtmlWrapper: function (parentElement, xmlDoc, subNavigationList, navigationId) {
                    var vm = this;
                    var ulElement = xmlDoc.createElement("ul");
                    ulElement.setAttribute("class", "list-unstyled");
                    parentElement.appendChild(ulElement);
                    for (var i = 0; i < subNavigationList.length; i++) {
                        var navigation = subNavigationList[i];
                        var activeFlag = false;
                        activeFlag = navigationId === navigation.id;
                        var liElement = xmlDoc.createElement("li");
                        ulElement.appendChild(liElement);
                        if (activeFlag) {
                            liElement.setAttribute("class", "active");
                        }
                        var ahrefElement = xmlDoc.createElement("a");
                        if (navigation.url) {
                            ahrefElement.setAttribute("href", navigation.url);
                        }
                        liElement.appendChild(ahrefElement);
                        var textNode = xmlDoc.createTextNode(navigation.text);
                        ahrefElement.appendChild(textNode);
                        var nextSubNavigationList = navigation.subNavigationList;
                        if (nextSubNavigationList && nextSubNavigationList.length > 0) {
                            vm._generateSubNaviHtmlWrapper(liElement, xmlDoc, nextSubNavigationList);
                        }
                    }
                },

                loadNavigation: function ($naviElement, navigationId) {
                    var vm = this;
                    var ser = new XMLSerializer();
                    var navigationList = vm.navigationList;
                    var xmlDoc = document.implementation.createDocument("", "", null);
                    var ulElement = vm._generateNavigationHtml(xmlDoc, vm.navigationList, navigationId);
                    var htmlContent = ser.serializeToString(ulElement);
                    $naviElement.prepend(htmlContent);
                    window.jQuery.Sidemenu.$menuItem = $("#sidebar-menu a");
                    window.jQuery.Sidemenu.init();
                }
            }

        });

        return navigation;
    }
);