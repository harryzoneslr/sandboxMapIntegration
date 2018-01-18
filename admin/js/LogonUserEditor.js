var dataVar = new Vue({
    el: "#x_data",
    data:{
        userroleTableId:'#x_table_role',
        userroleTable: {},
        organizationTableId:'#x_table_organization',
        organizationTable: {},
        equipmentreferenceTableId:'#x_table_equipmentreference',
        equipmentreferenceTable: {},
        label:{
            name:'',
            id:'',
            userType:'',
            tryFailedTimes:'',
            checkSystemMessageFlag:'',
            lockUserFlag:'',
            password:'',
            initPassword:'',
            passwordNeedFlag:'',
            passwordInitFlag:'',
            logonTime:'',
            note:'',
            workRole:'',
            organizationName:'',
            organizationID:'',
            organizationUUID: '',
            organizationType:'',
            organizationTypeValue:'',
            organizationAddress:'',
            roleID:'',
            roleName: '',
            roleNote: '',

            logonUserSection:'',
            organizationSection:'',
            authorizationSection:'',
            logonEquipmentReferenceSection:'',

            msgSaveOK:'',
            msgSaveOKComment:'',
            msgConnectFailure:'',
            msgLoadDataFailure:'',
            index:'',
            lockFailureMessage:'',
            save:'',
            exit:''
        },
        content:{
            logonUserUIModel:{
                name:'',
                id:'',
                userType:'',
                tryFailedTimes:'',
                checkSystemMessageFlag:'',
                lockUserFlag:'',
                password:'',
                initPassword:'',
                passwordNeedFlag:'',
                passwordInitFlag:'',
                logonTime:'',
                note:'',
                workRole:'',
                organizationName:'',
                organizationID:'',
                organizationUUID: '',
                organizationType:'',
                organizationTypeValue:'',
                organizationAddress:'',
                roleUUID:'',
                roleID:'',
                roleName: '',
                roleNote: ''
            },
            roleUIModelList:[],
            organizationList:[]
        },
        eleRefOrgUUID: '#x_refOrgUUID',
        eleRefRoleUUID: '#x_refRoleUUID',
        loadModuleEditURL: '../logonUser/loadModuleEditService.html',
        saveModuleURL: '../logonUser/saveModuleService.html',
        exitModuleURL: '../logonUser/exitModuleURL.html',
        newModuleServiceURL: '../logonUser/newModuleService.html',
        loadRoleSelectListURL:'../role/loadModuleListService.html',
        loadOrganizationSelectListURL:'../organization/loadModuleListService.html',
        loadRoleURL:'../role/loadModuleService.html',
        loadOrganURL:'../organization/loadModuleService.html',
        exitURL:'../logonUser/exitEditor.html',
        postExitURL:'logonUserList.html'
    },

    ready:function() {
        var vm = this;
        Navigator.loadNavigation($('#x_navigationGroup'), $('#sidebar-menu'), 'system', 'LogonUser');
        this.setI18nProperties();
        this.loadModuleEdit();
        this.userroleTable = new ServiceDataTable(this.userroleTableId);
        this.organizationTable = new ServiceDataTable(this.organizationTableId);
        this.equipmentreferenceTable = new ServiceDataTable(this.equipmentreferenceTableId);
        this.initSelectConfigure();

    },

    methods: {
        setI18nCommonProperties:function() {
            this.label.msgSaveOK= $.i18n.prop('msgSaveOK');
            this.label.msgSaveOKComment= $.i18n.prop('msgSaveOKComment');
            this.label.msgConnectFailure= $.i18n.prop('msgConnectFailure');
            this.label.msgLoadDataFailure= $.i18n.prop('msgLoadDataFailure');
            this.label.index= $.i18n.prop('index');
            this.label.lockFailureMessage= $.i18n.prop('lockFailureMessage');
            this.label.save= $.i18n.prop('save');
            this.label.exit= $.i18n.prop('exit');

        },

        setNodeI18nPropertiesCore:function() {
            this.label.name= $.i18n.prop('name');
            this.label.id= $.i18n.prop('id');
            this.label.userType= $.i18n.prop('userType');
            this.label.tryFailedTimes= $.i18n.prop('tryFailedTimes');
            this.label.checkSystemMessageFlag= $.i18n.prop('checkSystemMessageFlag');
            this.label.lockUserFlag= $.i18n.prop('lockUserFlag');
            this.label.password= $.i18n.prop('password');
            this.label.initPassword= $.i18n.prop('initPassword');
            this.label.passwordNeedFlag= $.i18n.prop('passwordNeedFlag');
            this.label.passwordInitFlag= $.i18n.prop('passwordInitFlag');
            this.label.logonTime= $.i18n.prop('logonTime');
            this.label.note= $.i18n.prop('note');
            this.label.workRole= $.i18n.prop('workRole');
            this.label.organizationName= $.i18n.prop('organizationName');
            this.label.organizationID= $.i18n.prop('organizationID');
            this.label.organizationFunction= $.i18n.prop('organizationFunction');
            this.label.organizationType= $.i18n.prop('organizationType');
            this.label.refOrganizationFunction= $.i18n.prop('refOrganizationFunction');
            this.label.organizationAddress= $.i18n.prop('organizationAddress');
            this.label.roleID = $.i18n.prop('roleID');
            this.label.roleName= $.i18n.prop('roleName');
            this.label.roleNote = $.i18n.prop('roleNote');
            this.label.logonUserSection= $.i18n.prop('logonUserSection');
            this.label.organizationSection= $.i18n.prop('organizationSection');
            this.label.authorizationSection= $.i18n.prop('authorizationSection');
            this.label.logonEquipmentReferenceSection= $.i18n.prop('logonEquipmentReferenceSection');
        },

        setI18nReferenceSectionProperties:function() {
            this.label.parentNodeUUID= $.i18n.prop('parentNodeUUID');
            this.label.uuid= $.i18n.prop('uuid');
            this.label.refUUID= $.i18n.prop('refUUID');
            this.label.refNodeName= $.i18n.prop('refNodeName');
        },

        setI18nRoleSectionProperties:function() {
            this.label.parentNodeUUID= $.i18n.prop('parentNodeUUID');
            this.label.refNodeName= $.i18n.prop('refNodeName');
            this.label.refUUID= $.i18n.prop('refUUID');
            this.label.uuid= $.i18n.prop('uuid');
            this.label.id= $.i18n.prop('id');
            this.label.enableFlag= $.i18n.prop('enableFlag');
            this.label.name= $.i18n.prop('name');

        },

        setI18nProperties:function() {
            getCommonI18n(jQuery.i18n, this.setI18nCommonProperties);
            jQuery.i18n.properties({
                name: 'LogonUser', //properties file name
                path: getI18nRootPath() + this.getI18nPath(), //path for properties files
                mode: 'map', //Using map mode to consume properties files
                language: getLan(),
                callback: this.setNodeI18nPropertiesCore});
        },

        getI18nPath:function() {
            return "foundation/common/";
        },

        initSelectConfigure:function() {
            var vm = this;
            $(vm.eleRefOrgUUID).on("select2:close", function (e) {
                // Set value to vue from select2 manually by select2's bug
                vm.$set('content.logonUserUIModel.organizationUUID',$(vm.eleRefOrgUUID).val());
                var url = vm.loadOrganURL + "?uuid=" + $(vm.eleRefOrgUUID).val();
                vm.$http.get(url).then(function (response) {
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
                    var content = JSON.parse(response.data).content;
                    vm.$set('content.logonUserUIModel.organizationName', content.name);
                    vm.$set('content.logonUserUIModel.organizationType', content.organType);
                });
            });

            $(vm.eleRefRoleUUID).on("select2:close", function (e) {
                // Set value to vue from select2 manually by select2's bug
                vm.$set('content.logonUserUIModel.roleUUID',$(vm.eleRefRoleUUID).val());
                var url = vm.loadRoleURL + "?uuid=" + $(vm.eleRefRoleUUID).val();
                vm.$http.get(url).then(function (response) {
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
                    var content = JSON.parse(response.data).content;
                    vm.$set('content.logonUserUIModel.roleName', content.name);
                    vm.$set('content.logonUserUIModel.roleNote', content.note);
                });
            });

        },

        loadModuleEdit:function() {
            var vm = this;
            var baseUUID = getUrlVar("uuid");
            var processMode = getUrlVar(LABEL_PROCESSMODE);
            if (processMode == PROCESSMODE_NEW) {
// in case [Create mode]
                var url = this.newModuleServiceURL;
                vm.$http.post(url, requestData).then(function (response) {
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
                vm.$http.get(url).then(function (response) {
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

        saveModule:function() {
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

        exitModule:function() {
            var vm = this;
            //var baseUUID = vm.content.logonUserUIModel.parentNodeUUID;
            //window.location.href = genCommonEditURL("LogonUserList.html", baseUUID);
            var baseUUID = vm.content.logonUserUIModel.uuid;
            defaultExitEditor(baseUUID, this.exitURL,
                this.postExitURL, UIFLAG_STANDARD);

        },

        loadOrganizationSelectList:function(content) {
            var vm = this;
            this.$http.get(this.loadOrganizationSelectListURL).then(function (response) {
                if (!JSON.parse(response.body).content) {
                    // pop up error message
                }
                var resultList = formatSelectResult(JSON.parse(response.body).content, 'uuid', 'name');
                setTimeout(function(){
                    $(vm.eleRefOrgUUID).select2({
                        data: resultList
                    })
                    // manually set initial value
                    $(vm.eleRefOrgUUID).val(content.logonUserUIModel.organizationUUID);
                    $(vm.eleRefOrgUUID).trigger("change");
                }, 0);
            });

            this.$http.get(this.loadRoleSelectListURL).then(function (response) {
                if (!JSON.parse(response.body).content) {
                    // pop up error message
                }
                var resultList = formatSelectResult(JSON.parse(response.body).content, 'uuid', 'name');
                setTimeout(function(){
                    $(vm.eleRefRoleUUID).select2({
                        data: resultList
                    })
                    // manually set initial value
                    $(vm.eleRefRoleUUID).val(content.logonUserUIModel.roleUUID);
                    $(vm.eleRefRoleUUID).trigger("change");
                }, 0);
            });

        },

        setModuleToUI:function(content){
            var vm = this;
            vm.$set('content.logonUserUIModel', content.logonUserUIModel);
            vm.$set('content.roleUIModelList', content.userRoleUIModelList);
            vm.$set('content.organizationList', content.logonUserOrganizationUIModelList);
            vm.loadOrganizationSelectList(content);
        }

    }
});
