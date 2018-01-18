/**
 * Created by Zhang,hang on 4/24/2017.
 */


var Navigator = new Vue({
    el: "#x_navigation",
    data: {
        label: {
            group:{
                system: "",
                production: ""
            },

            admin: {
                Role: "",
                LogonUser: ""
            },
            production: {
                DevicePart: "",
                DeviceManagement: "",
                SupplierDefinition: "",
                SystemInterfaceDefinition: "",
                SystemDeviceDefinition:"",
                DevicePin: "",
                DeviceFunctionCategory: "",
                LogicFunctionCategory: "",
                SignalSeperationCode: "",
                SignalEMIDefinition: "",
                GroundTypeDefinition: "",
                ZoneFeatureDefinition: "",
                ZoneDefinition: "",
                AccessDoorDefinition: "",
                WireGaugeDefinition: "",
                ColorCodeDefinition: "",
                DeviceManagement: "",
                GlobalConfiguration: "",
                ProjectManagement: "",
                SupplierDefinition: "",
                SystemDefinition:"",
                SystemManagement: "",
                SystemInterfaceDefinition: ""
            }
        }
    },

    ready: function () {
        var vm = this;
    },

    methods: {
        setI18nProperties: function () {
            getCommonI18n(jQuery.i18n, this.setI18nCommonProperties);
            jQuery.i18n.properties({
                name: 'index', //properties file name
                path: getI18nRootPath() + this.getI18nPath(), //path for properties files
                mode: 'map', //Using map mode to consume properties files
                language: getLan(),
                callback: this.setI18nNavigation
            });
        },

        getI18nPath: function () {
            return "foundation/";
        },

        setI18nNavigation: function () {
            this.setI18nNavGroup();
            this.setI18nProduction();
            this.setI18nAdmin();
        },


        setI18nNavGroup: function () {
            this.label.group.system = $.i18n.prop('system');
            this.label.group.production = $.i18n.prop('production');
        },

        setI18nAdmin: function () {
            this.label.group.Role = $.i18n.prop('Role');
            this.label.group.LogonUser = $.i18n.prop('LogonUser');
        },

        setI18nProduction: function () {
            this.label.production.DevicePart = $.i18n.prop('DevicePart');
            this.label.production.DeviceManagement = $.i18n.prop('DeviceManagement');
            this.label.production.SupplierDefinition = $.i18n.prop('SupplierDefinition');
            this.label.production.SystemInterfaceDefinition = $.i18n.prop('SystemInterfaceDefinition');
            this.label.production.SystemDeviceDefinition = $.i18n.prop('SystemDeviceDefinition');
            this.label.production.DevicePin = $.i18n.prop('DevicePin');

            this.label.production.DeviceFunctionCategory = $.i18n.prop('DeviceFunctionCategory');
            this.label.production.LogicFunctionCategory = $.i18n.prop('LogicFunctionCategory');
            this.label.production.SignalSeperationCode = $.i18n.prop('SignalSeperationCode');
            this.label.production.SignalEMIDefinition = $.i18n.prop('SignalEMIDefinition');
            this.label.production.GroundTypeDefinition = $.i18n.prop('GroundTypeDefinition');
            this.label.production.ZoneFeatureDefinition = $.i18n.prop('ZoneFeatureDefinition');
            this.label.production.ZoneDefinition = $.i18n.prop('ZoneDefinition');
            this.label.production.AccessDoorDefinition = $.i18n.prop('AccessDoorDefinition');
            this.label.production.WireGaugeDefinition = $.i18n.prop('WireGaugeDefinition');
            this.label.production.ColorCodeDefinition = $.i18n.prop('ColorCodeDefinition');
            this.label.production.DeviceManagement = $.i18n.prop('DeviceManagement');
            this.label.production.SystemDefinition = $.i18n.prop('SystemDefinition');

            this.label.production.GlobalConfiguration = $.i18n.prop('GlobalConfiguration');
            this.label.production.ProjectManagement = $.i18n.prop('ProjectManagement');
            this.label.production.SupplierDefinition = $.i18n.prop('SupplierDefinition');
            this.label.production.SystemManagement = $.i18n.prop('SystemManagement');
            this.label.production.SystemInterfaceDefinition = $.i18n.prop('SystemInterfaceDefinition');
        },

        getLabelById: function (id) {
            if (this.label.group[id]) {
                return this.label.group[id];
            }
            if (this.label.admin[id]) {
                return this.label.admin[id];
            }
            if (this.label.production[id]) {
                return this.label.production[id];
            }
            return id;
        },


        /**
         * @private Generate Navigation side panel Html content.
         * @param data
         * @param groupId
         * @param navigationId
         * @returns {Element}
         */
        _generateNavigationHtml: function (xmlDoc, data, navigationId) {
            var vm = this;
            var navigationList = data.navigationList;
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
                var textNode = xmlDoc.createTextNode(' ' + vm.getLabelById(navigation.id));
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
                var textNode = xmlDoc.createTextNode(vm.getLabelById(navigation.id));
                ahrefElement.appendChild(textNode);
                var nextSubNavigationList = navigation.subNavigationList;
                if (nextSubNavigationList && nextSubNavigationList.length > 0) {
                    vm._generateSubNaviHtmlWrapper(liElement, xmlDoc, nextSubNavigationList);
                }
            }
        },

        /**
         * @private filter navigation union from navigation list parsing from configure file.
         * @param navigationList
         * @param groupId
         * @returns {*}
         * @private
         */
        _filterNavGroupUnion: function (navigationList, groupId) {
            if (!navigationList) {
                return;
            }
            for (var i = 0; i < navigationList.length; i++) {
                if (navigationList[i].id === groupId) {
                    return navigationList[i];
                }
            }
        },


        /**
         * @private generate navigation group html content.
         * @param xmlDoc
         * @param groupId
         * @param navGroupList
         *
         */
        _generateNavigationGroupHtml: function (xmlDoc, groupId, navGroupList) {
            var vm = this;
            var navElement = xmlDoc.createElement("ul");
            navElement.setAttribute("class", "nav navbar-nav hidden-xs");
            if (navGroupList) {
                for (var i = 0; i < navGroupList.length; i++) {
                    var navGroup = navGroupList[i];
                    var liElement = xmlDoc.createElement("li");
                    navElement.appendChild(liElement);
                    var ahrefElement = xmlDoc.createElement("a");
                    if (navGroup.defaultUrl) {
                        ahrefElement.setAttribute("href", navGroup.defaultUrl);
                    } else {
                        ahrefElement.setAttribute("href", "#");
                    }

                    if (groupId === navGroup.id) {
                        liElement.setAttribute("class", "active");
                    }
                    ahrefElement.setAttribute("class", "waves-effect");
                    liElement.appendChild(ahrefElement);
                    var textNode = xmlDoc.createTextNode(vm.getLabelById(navGroupList[i].id));
                    ahrefElement.appendChild(textNode);
                }
            }
            return navElement;
        },

        /**
         * @public LoadNavigation entrance method, generate navigation dom.
         * @param $groupElement: Parent DOM element to locate navigation group html content.
         * @param $naviElement: Parent DOM element to locate navigation resource html content.
         * @param groupId: current active navigation group id.
         * @param navigationId: current active navigation resource id.
         */
        loadNavigation: function ($groupElement, $naviElement, groupId, navigationId) {
            var vm = this;
            var ser = new XMLSerializer();
            var groupResponse = $.getJSON("js/navigation.json", function (data) {
                jQuery.i18n.properties({
                    name: 'NavigationElementResource', //properties file name
                    path: getI18nRootPath() + vm.getI18nPath(), //path for properties files
                    mode: 'map', //Using map mode to consume properties files
                    language:getLan(),
                    callback: vm.setI18nNavigation
                });
            });
            groupResponse.then(function (data) {
                var navigationList = data.navigationList;
                var xmlDoc = document.implementation.createDocument("", "", null);
                var navGroupHtmlContent = vm._generateNavigationGroupHtml(xmlDoc, groupId, navigationList);
                var htmlContentGroup = ser.serializeToString(navGroupHtmlContent);
                $groupElement.prepend(htmlContentGroup);
                var navigationUnion = vm._filterNavGroupUnion(navigationList, groupId);
                if (navigationUnion) {
                    var navigationResponse = $.getJSON("js/" + navigationUnion.url).then(function (data) {
                        var ulElement = vm._generateNavigationHtml(xmlDoc, data, navigationId);
                        var htmlContent = ser.serializeToString(ulElement);
                        $naviElement.prepend(htmlContent);
                        window.jQuery.Sidemenu.$menuItem = $("#sidebar-menu a");
                        window.jQuery.Sidemenu.init();
                    });
                }

            });
        }

    }
});

