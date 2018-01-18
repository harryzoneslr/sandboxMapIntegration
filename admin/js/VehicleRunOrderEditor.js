var dataVar = new Vue({
    el: "#x_data",
    data: {
        loadingplanTableId: '#x_table_loadingplan',
        loadingplanTable: {},
        label: {
            name: '',
            id: '',
            uuid: '',
            vehicleFeeInCash: '',
            otherFee: '',
            actualEndTime: '',
            endTime: '',
            runStatus: '',
            grossWeight: '',
            driverId: '',
            driverTelephone: '',
            grossVolume: '',
            actualStartTime: '',
            status: '',
            lineType: '',
            grossNumber: '',
            grossTransCost: '',
            vehicleFeeInMonth: '',
            priorityCode: '',
            paymentDescription: '',
            note: '',
            vehicleFeeInReceive: '',
            vehicleFee: '',
            loadingFee: '',
            driverName: '',
            vehicleFeeInReceipt: '',
            startTime: '',
            uuid: '',
            refNodeName: '',
            refUUID: '',
            refPackageName: '',
            parentNodeUUID: '',
            uuid: '',
            id: '',
            uuid: '',
            vehicleWidth: '',
            operationType: '',
            trademark: '',
            defDriverMobileNumber: '',
            maxLoadWeight: '',
            vehicleLength: '',
            maxLoadVolume: '',
            defDriverTelephone: '',
            vehicleIDNumber: '',
            engineCategory: '',
            vehicleHeight: '',
            vehicleType: '',
            engineNumber: '',
            vehicleContainerSize: '',

            msgSaveOK: '',
            msgSaveOKComment: '',
            msgConnectFailure: '',
            msgLoadDataFailure: '',
            index: '',
            lockFailureMessage: '',
            buttonSave: '',
            buttonExit: ''
        },
        content: {
            vehicleRunOrderUIModel: {
                name: '',
                id: '',
                uuid: '',
                vehicleFeeInCash: '',
                otherFee: '',
                actualEndTime: '',
                endTime: '',
                runStatus: '',
                grossWeight: '',
                driverId: '',
                driverTelephone: '',
                grossVolume: '',
                actualStartTime: '',
                status: '',
                lineType: '',
                grossNumber: '',
                grossTransCost: '',
                vehicleFeeInMonth: '',
                priorityCode: '',
                paymentDescription: '',
                note: '',
                vehicleFeeInReceive: '',
                vehicleFee: '',
                loadingFee: '',
                driverName: '',
                vehicleFeeInReceipt: '',
                startTime: '',
                uuid: '',
                refNodeName: '',
                refUUID: '',
                refPackageName: '',
                parentNodeUUID: '',
                uuid: '',
                id: '',
                uuid: '',
                vehicleWidth: '',
                operationType: '',
                trademark: '',
                defDriverMobileNumber: '',
                maxLoadWeight: '',
                vehicleLength: '',
                maxLoadVolume: '',
                defDriverTelephone: '',
                vehicleIDNumber: '',
                engineCategory: '',
                vehicleHeight: '',
                vehicleType: '',
                engineNumber: '',
                vehicleContainerSize: ''
            },
            vehicleRunOrderLoadingPlanUIModelList: []
        },
        eleVehicleFeeInCash: '#x_vehicleFeeInCash',
        eleStatus: '#x_status',
        eleLineType: '#x_lineType',
        elePriorityCode: '#x_priorityCode',
        elePaymentDescription: '#x_paymentDescription',
        loadModuleEditURL: '../VehicleRunOrder/loadModuleEditService.html',
        saveModuleURL: '../VehicleRunOrder/saveModuleService.html',
        exitModuleURL: '../VehicleRunOrder/exitModuleURL.html',
        newModuleServiceURL: '../VehicleRunOrder/newModuleServiceURL.html', loadVehicleRunOrderSelectList: '../VehicleRunOrder/loadVehicleRunOrderSelectList.html',
        getStatusURL: '',
        getLineTypeURL: '../VehicleRunOrder/getLineType.html',
        getPriorityCodeURL: '../VehicleRunOrder/getPriorityCode.html',
        getPaymentDescriptionURL: '../VehicleRunOrder/getPaymentDescription.html'
    },

    ready: function () {
        var vm = this;
        this.setI18nProperties();
        this.loadModuleEdit();
        this.loadingplanTable = new ServiceDataTable(this.loadingplanTableId);
        this.initSelectConfigure();

    },

    methods: {
        setI18nCommonProperties: function () {
            this.label.msgSaveOK = $.i18n.prop('msgSaveOK');
            this.label.msgSaveOKComment = $.i18n.prop('msgSaveOKComment');
            this.label.msgConnectFailure = $.i18n.prop('msgConnectFailure');
            this.label.msgLoadDataFailure = $.i18n.prop('msgLoadDataFailure');
            this.label.index = $.i18n.prop('index');
            this.label.lockFailureMessage = $.i18n.prop('lockFailureMessage');
            this.label.nSav = $.i18n.prop('nSav');
            this.label.nExi = $.i18n.prop('nExi');

        },

        setNodeI18nPropertiesCore: function () {
            this.label.name = $.i18n.prop('name');
            this.label.id = $.i18n.prop('id');
            this.label.uuid = $.i18n.prop('uuid');
            this.label.vehicleFeeInCash = $.i18n.prop('vehicleFeeInCash');
            this.label.otherFee = $.i18n.prop('otherFee');
            this.label.actualEndTime = $.i18n.prop('actualEndTime');
            this.label.endTime = $.i18n.prop('endTime');
            this.label.runStatus = $.i18n.prop('runStatus');
            this.label.grossWeight = $.i18n.prop('grossWeight');
            this.label.driverId = $.i18n.prop('driverId');
            this.label.driverTelephone = $.i18n.prop('driverTelephone');
            this.label.grossVolume = $.i18n.prop('grossVolume');
            this.label.actualStartTime = $.i18n.prop('actualStartTime');
            this.label.status = $.i18n.prop('status');
            this.label.lineType = $.i18n.prop('lineType');
            this.label.grossNumber = $.i18n.prop('grossNumber');
            this.label.grossTransCost = $.i18n.prop('grossTransCost');
            this.label.vehicleFeeInMonth = $.i18n.prop('vehicleFeeInMonth');
            this.label.priorityCode = $.i18n.prop('priorityCode');
            this.label.paymentDescription = $.i18n.prop('paymentDescription');
            this.label.note = $.i18n.prop('note');
            this.label.vehicleFeeInReceive = $.i18n.prop('vehicleFeeInReceive');
            this.label.vehicleFee = $.i18n.prop('vehicleFee');
            this.label.loadingFee = $.i18n.prop('loadingFee');
            this.label.driverName = $.i18n.prop('driverName');
            this.label.vehicleFeeInReceipt = $.i18n.prop('vehicleFeeInReceipt');
            this.label.startTime = $.i18n.prop('startTime');
            this.label.uuid = $.i18n.prop('uuid');
            this.label.refNodeName = $.i18n.prop('refNodeName');
            this.label.refUUID = $.i18n.prop('refUUID');
            this.label.refPackageName = $.i18n.prop('refPackageName');
            this.label.parentNodeUUID = $.i18n.prop('parentNodeUUID');
            this.label.uuid = $.i18n.prop('uuid');
            this.label.id = $.i18n.prop('id');
            this.label.uuid = $.i18n.prop('uuid');
            this.label.vehicleWidth = $.i18n.prop('vehicleWidth');
            this.label.operationType = $.i18n.prop('operationType');
            this.label.trademark = $.i18n.prop('trademark');
            this.label.defDriverMobileNumber = $.i18n.prop('defDriverMobileNumber');
            this.label.maxLoadWeight = $.i18n.prop('maxLoadWeight');
            this.label.vehicleLength = $.i18n.prop('vehicleLength');
            this.label.maxLoadVolume = $.i18n.prop('maxLoadVolume');
            this.label.defDriverTelephone = $.i18n.prop('defDriverTelephone');
            this.label.vehicleIDNumber = $.i18n.prop('vehicleIDNumber');
            this.label.engineCategory = $.i18n.prop('engineCategory');
            this.label.vehicleHeight = $.i18n.prop('vehicleHeight');
            this.label.vehicleType = $.i18n.prop('vehicleType');
            this.label.engineNumber = $.i18n.prop('engineNumber');
            this.label.vehicleContainerSize = $.i18n.prop('vehicleContainerSize');

        },

        setI18nLoadingPlanProperties: function () {
            this.label.planDepartureTime = $.i18n.prop('planDepartureTime');
            this.label.arriveIndex = $.i18n.prop('arriveIndex');
            this.label.refWarehouseAreaUUID = $.i18n.prop('refWarehouseAreaUUID');
            this.label.refUUID = $.i18n.prop('refUUID');
            this.label.departureTime = $.i18n.prop('departureTime');
            this.label.planLoadStartTime = $.i18n.prop('planLoadStartTime');
            this.label.viaType = $.i18n.prop('viaType');
            this.label.planArriveTime = $.i18n.prop('planArriveTime');
            this.label.uuid = $.i18n.prop('uuid');
            this.label.departureStatus = $.i18n.prop('departureStatus');
            this.label.refWarehouseUUID = $.i18n.prop('refWarehouseUUID');
            this.label.refLoadingPointUUID = $.i18n.prop('refLoadingPointUUID');
            this.label.arrivedStatus = $.i18n.prop('arrivedStatus');
            this.label.planLoadEndTime = $.i18n.prop('planLoadEndTime');
            this.label.arriveTime = $.i18n.prop('arriveTime');
            this.label.refNodeName = $.i18n.prop('refNodeName');
            this.label.parentNodeUUID = $.i18n.prop('parentNodeUUID');

        },

        setI18nProperties: function () {
            getCommonI18n(jQuery.i18n, this.setI18nCommonProperties);
            jQuery.i18n.properties({
                name: 'VehicleRunOrder', //properties file name
                path: getI18nRootPath() + this.getI18nPath(), //path for properties files
                mode: 'map', //Using map mode to consume properties files
                language: getLan(),
                callback: this.setNodeI18nPropertiesCore});
            jQuery.i18n.properties({
                name: 'VehicleRunOrderLoadingPlan', //properties file name
                path: getI18nRootPath() + this.getI18nPath(), //path for properties files
                mode: 'map', //Using map mode to consume properties files
                language: getLan(),
                callback: this.setI18nLoadingPlanProperties});

        },

        getI18nPath: function () {
            return "foundation/installation/";
        },

        initSelectConfigure: function () {
            var vm = this;
            $(vm.eleVehicleFeeInCash).on("select2:close", function (e) {
                // Set value to vue from select2 manually by select2's bug
                vm.$set('content.vehicleRunOrderUIModel.vehicleFeeInCash', $(vm.eleVehicleFeeInCash).val());
            });
            $(vm.eleStatus).on("select2:close", function (e) {
                // Set value to vue from select2 manually by select2's bug
                vm.$set('content.vehicleRunOrderUIModel.status', $(vm.eleStatus).val());
            });
            $(vm.eleLineType).on("select2:close", function (e) {
                // Set value to vue from select2 manually by select2's bug
                vm.$set('content.vehicleRunOrderUIModel.lineType', $(vm.eleLineType).val());
            });
            $(vm.elePriorityCode).on("select2:close", function (e) {
                // Set value to vue from select2 manually by select2's bug
                vm.$set('content.vehicleRunOrderUIModel.priorityCode', $(vm.elePriorityCode).val());
            });
            $(vm.elePaymentDescription).on("select2:close", function (e) {
                // Set value to vue from select2 manually by select2's bug
                vm.$set('content.vehicleRunOrderUIModel.paymentDescription', $(vm.elePaymentDescription).val());
            });

        },

        loadModuleEdit: function () {
            var vm = this;
            var baseUUID = getUrlVar("uuid");
            var processMode = getUrlVar(LABEL_PROCESSMODE);
            if (processMode == PROCESSMODE_NEW) {
// in case [Create mode]
                var url = this.newModuleServiceURL;
                var name = getUrlVar("name");
                var lineType = getUrlVar("lineType");
                var id = getUrlVar("id");
                var requestData = generateServiceSimpleContentUnion("name", name, "lineType", lineType, "id", id);
                this.$http.post(url, requestData).then(function (response) {
                    if (!JSON.parse(response.data).content) {
                        swal({
                            title: this.label.msgConnectFailure,
                            text: this.label.msgLoadDataFailure,
                            type: "error",
                            confirmButtonClass: 'btn-danger waves-effect waves-light',
                            confirmButtonText: this.label.confirm
                        });
                        return;
                    }
                    this.setModuleToUI(JSON.parse(response.data).content);
                });
            }
            if (processMode == PROCESSMODE_EDIT) {
// In case [Edit mode]
                var url = this.loadModuleEditURL + "?uuid=" + baseUUID;
                this.$http.get(url).then(function (response) {
                    if (!JSON.parse(response.data).content) {
                        swal({
                            title: this.label.msgConnectFailure,
                            text: this.label.msgLoadDataFailure,
                            type: "error",
                            confirmButtonClass: 'btn-danger waves-effect waves-light',
                            confirmButtonText: this.label.confirm
                        });
                        return;
                    }
                    this.setModuleToUI(JSON.parse(response.data).content);
                });
            }


        },

        saveModule: function () {
            var vm = this;
            var formArray = $('#x_form_data');
            if (!$('#x_form_data').parsley().validate()) {
                return;
            }
            this.$http.post(vm.saveModuleURL, vm.content).then(function (response) {
                $.Notification.notify('success', 'top left', this.label.msgSaveOK, this.label.msgSaveOKComment);
                this.setModuleToUI(JSON.parse(response.data).content);
            });
        },

        exitModule: function () {
            var vm = this;
            var baseUUID = vm.content.vehicleRunOrderUIModel.parentNodeUUID;
            window.location.href = genCommonEditURL("VehicleRunOrderList.html", baseUUID);

        },

        getVehicleFeeInCash: function () {
            var vm = this;
            this.$http.get(this.loadVehicleRunOrderSelectList).then(function (response) {
                if (!JSON.parse(response.body).content) {
                    // pop up error message
                }
                var resultList = formatSelectResult(JSON.parse(response.body).content, 'uuid', 'name');
                setTimeout(function () {
                    $(vm.eleVehicleFeeInCash).select2({
                        data: resultList
                    })
                    // manually set initial value$(vm.eleVehicleFeeInCash).val(content.vehicleRunOrderUIModel.vehicleFeeInCash);
                    $(vm.eleVehicleFeeInCash).trigger("change");
                }, 0);
            });

        },


        getLineType: function () {
            var vm = this;
            this.$http.get(this.getLineTypeURL).then(function (response) {
                if (!JSON.parse(response.body).content) {
                    // pop up error message
                }
                setTimeout(function () {
                    $(vm.eleLineType).select2({
                        data: JSON.parse(response.body)
                    })
                    // manually set initial value$(vm.eleLineType).val(content.vehicleRunOrderUIModel.lineType);
                    $(vm.eleLineType).trigger("change");
                }, 0);
            });

        },

        getPriorityCode: function () {
            var vm = this;
            this.$http.get(this.getPriorityCodeURL).then(function (response) {
                if (!JSON.parse(response.body).content) {
                    // pop up error message
                }
                setTimeout(function () {
                    $(vm.elePriorityCode).select2({
                        data: JSON.parse(response.body)
                    })
                    // manually set initial value$(vm.elePriorityCode).val(content.vehicleRunOrderUIModel.priorityCode);
                    $(vm.elePriorityCode).trigger("change");
                }, 0);
            });

        },

        getPaymentDescription: function () {
            var vm = this;
            this.$http.get(this.getPaymentDescriptionURL).then(function (response) {
                if (!JSON.parse(response.body).content) {
                    // pop up error message
                }
                setTimeout(function () {
                    $(vm.elePaymentDescription).select2({
                        data: JSON.parse(response.body)
                    })
                    // manually set initial value$(vm.elePaymentDescription).val(content.vehicleRunOrderUIModel.paymentDescription);
                    $(vm.elePaymentDescription).trigger("change");
                }, 0);
            });

        },

        setModuleToUI: function (content) {
            var vm = this;
            vm.$set('content.vehicleRunOrderUIModel', content.vehicleRunOrderUIModel);
            vm.$set('content.vehicleRunOrderLoadingPlanUIModelList', content.vehicleRunOrderLoadingPlanUIModelList);
            vm.getVehicleFeeInCash();
            vm.();
            vm.getLineType();
            vm.getPriorityCode();
            vm.getPaymentDescription();

        }

    }
});
