var processModel = new Vue({
    el:"#x_process_model",
    data:{
        label:{
            add: '',
            search: '',
            searchModuleURL: '../logonUser/searchModuleService.html'
        }
    },
    methods: {
        searchModule:function() {
            var vm = this;
            var requestData = searchModel.content;this.$http.post(vm.searchModuleURLrequestData).then(function (response) {
                listVar.$set('items', JSON.parse(response.data).content);
            })},
        newModule:function() {
            window.location.href='LogonUserInit.html';
        }
    }
});
var searchModel = new Vue({
    el: "#x_data_search",
    data:{
        content:{
            logonUserUIModel:{
                id: "",
                userType: "",
                name: "",
                note: "",
                passwordInitFlag: ""
            }
        },

        label:{
            advancedSearchCondition: '',
            id: "",
            name:'',
            userType:''
        }
    }
});
var listVar = new Vue({
    el: "#x_data_List",
    data:{
        label:{
            id:'',
            name:'',
            note:'',
            userTypeStr:'',
            organizationName: '',
            roleID: '',
            roleName: '',

            msgConnectFailure:'',
            msgLoadDataFailure:'',
            index:'',
            lockFailureMessage:'',
            buttonEdit:'',
            buttonView:''
        },
        tableId:'#x_table_logonUser',
        datatable: '',
        items: [],
        loadModuleListURL: '../logonUser/loadModuleListService.html',
        preLockURL:'../logonUser/preLockService.html'
    },
    ready:function() {
        var vm = this;
        Navigator.loadNavigation($('#x_navigationGroup'), $('#sidebar-menu'), 'system', 'LogonUser');
        this.datatable = new ServiceDataTable(this.tableId);
        this.setI18nProperties();
        this.loadModuleList();
    },
    methods: {
        setI18nCommonProperties:function() {
            this.label.msgConnectFailure= $.i18n.prop('msgConnectFailure');
            this.label.msgLoadDataFailure= $.i18n.prop('msgLoadDataFailure');
            this.label.index= $.i18n.prop('index');
            this.label.lockFailureMessage= $.i18n.prop('lockFailureMessage');
            this.label.buttonEdit= $.i18n.prop('edit');
            this.label.buttonView= $.i18n.prop('view');
            processModel.label.search = $.i18n.prop('search');
            processModel.label.add = $.i18n.prop('add');
            searchModel.label.advancedSearchCondition = $.i18n.prop('advancedSearchCondition');

        },
        setNodeI18nPropertiesCore: function () {
            searchModel.label.name = $.i18n.prop('name');
            searchModel.label.id = $.i18n.prop('id');
            searchModel.label.userType = $.i18n.prop('userTypeStr');
            this.label.id= $.i18n.prop('id');
            this.label.name= $.i18n.prop('name');
            this.label.note= $.i18n.prop('note');
            this.label.userTypeStr= $.i18n.prop('userTypeStr');
            this.label.organizationName= $.i18n.prop('organizationName');
            this.label.roleID= $.i18n.prop('roleID');
            this.label.roleName= $.i18n.prop('roleName');
        },
        setI18nProperties:function() {
            getCommonI18n(jQuery.i18n, this.setI18nCommonProperties); jQuery.i18n.properties({
                name: 'LogonUser', //properties file name
                path: getI18nRootPath() + this.getI18nPath(), //path for properties files
                mode: 'map', //Using map mode to consume properties files
                language: getLan(),
                callback: this.setNodeI18nPropertiesCore});
        },
        getI18nPath:function() {
            return '/foundation/common/';
        },
        loadModuleList:function() {
            var vm = this;
            this.$http.get(vm.loadModuleListURL).then(function (response) {
                vm.$set('items', JSON.parse(response.data).content);
                setTimeout(function () {
                    vm.datatable.build();
                }, 0);
            })
        },
        editModule:function(uuid) {
            var vm = this;
            var requestData = generateServiceSimpleContentUnion("uuid", uuid);
            this.$http.post(vm.preLockURL, requestData).then(function (response) {
                if (JSON.parse(response.data).RC == 1) {
                    window.location.href = genCommonEditURL("LogonUserEditor.html", uuid); }else{
                    swal(this.label.lockFailureMessage,  JSON.parse(response.data).MSG);}
            });
        },
        preLock:function() {
        }
    }
});
