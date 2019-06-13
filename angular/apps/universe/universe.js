(function () {
    'use strict';
    angular
        .module('app')
        .factory('UniverseService', UniverseService)
        .controller('UniverseCtrl', UniverseCtrl);
    UniverseService.$inject = ['$http'];
    function UniverseService($http) {
        var UniverseService = {};
        // UniverseService.deleteUniverse = deleteUniverse;
        // UniverseService.addUniverse = addUniverse;
        UniverseService.getUniverse = getUniverse;
        return UniverseService;

        function getUniverse() {
            var request = $http.get(apiHost + "/api/v1/universe/admin/get-all");
            return request;
        }
        
        // function addUniverse(model) {
        //     var formdata = new FormData();
        //     formdata.append("name", model.Name);
        //     formdata.append("address", model.Address);
        //     formdata.append("phoneNumber", model.PhoneNumber);
        //     formdata.append("description", model.Description);
        //     formdata.append("type", model.Type);
        //     formdata.append("unit", model.Unit);
        //     formdata.append("IsShowPreviousInsurer", model.IsShowPreviousInsurer);
        //     formdata.append("isActive", model.IsActive);
        //     formdata.append("langId", model.LangId);
        //     var input = $("#upload")[0]
        //     if (input.files && input.files[0]) {
        //         formdata.append("imagePost", input.files[0]);
        //     }
        //     console.log(input.files[0]);
        //     var req = {
        //         method: 'POST',
        //         url: apiHost + '/api/v1/Universe/admin/update_Universe',
        //         headers: {
        //             'Content-Type': undefined
        //         },
        //         data: formdata,
        //         transformRequest: angular.identity
        //     }
        //     var request = $http(req);
        //     return request;
        // }

        // function deleteUniverse(UniverseId) {
        //     var req = {
        //         method: 'POST',
        //         url: apiHost + '/api/v1/Universe/admin/delete_Universe',
        //         headers: {
        //             'Content-Type': "application/json"
        //         },
        //         data: {
        //             id: UniverseId,
        //         }
        //     }
        //     var request = $http(req);
        //     return request;
        // }
    }

    UniverseCtrl.$inject = ['$scope', '$compile', '$state', '$localStorage', '$location', '$http', '$filter', 'UniverseService', 'DTOptionsBuilder', 'DTColumnBuilder', 'Notification'];
    function UniverseCtrl($scope, $compile, $state, $localStorage, $location, $http, $filter, UniverseService, DTOptionsBuilder, DTColumnBuilder, Notification) {
        var vm = $scope;
        // vm.reloadData = reloadData;
        // vm.initUpdate = initUpdate;
        // vm.createUniverse = createUniverse;
        vm.dtInstance = {};
        vm.modelCreate = {};
        vm.modelUpdate = {};
        //vm.changeImage = changeImage;
        
        // vm.goToUpdate = function (UniverseId) {
        //     $state.go("app.Universe_update", { "id": UniverseId });
        // }

        // function initUpdate() {
        //     UniverseService.getUniverse($state.params.id, $localStorage.language).then(function successCallback(response) {
        //         var data = response.data.data;
        //         vm.modelUpdate.Id = data.id;
        //         vm.modelUpdate.Name = data.name;
        //         vm.modelUpdate.Address = data.address;
        //         vm.modelUpdate.PhoneNumber = data.phoneNumber;
        //         vm.modelUpdate.Description = data.description;
        //         vm.modelUpdate.Unit = Number(data.unit);
        //         vm.modelUpdate.Image = data.image;
                
        //         vm.types = UniverseType;
        //         if (data.isActive) {
        //             $("#isActive").prop('checked', true);
        //         } else {
        //             $("#isActive").prop('checked', false);
        //         }
        //         if (data.IsShowPreviousInsurer) {
        //             $("#IsShowPreviousInsurer").prop('checked', true);
        //         } else {
        //             $("#IsShowPreviousInsurer").prop('checked', false);
        //         }
        //     }).catch(function (error) {
        //         console.log(error.data.error);
        //     });;
        // }

        // vm.clear = function () {
        //     vm.types.selected = undefined;
        // };

        // vm.initCreate = function () {
        //     vm.types = UniverseType;
        // }

        // function createUniverse() {
        //     var model = vm.modelCreate;
        //     model.Type = vm.types.selected !== undefined ? vm.types.selected.value : 0;
        //     model.LangId = $localStorage.language;
        //     model.IsActive = $("#isActive").prop("checked");
        //     model.IsShowPreviousInsurer = $("#IsShowPreviousInsurer").prop("checked");
        //     if (!model.Name || !model.Type || !model.LangId) {
        //         return;
        //     }
        //     UniverseService.addUniverse(model).then(function successCallback(response) {
        //         $state.go('app.Universe');
        //         Notification.success({ message: 'Add Success', delay: 3000 });

        //     }).catch(function (error) {
        //         console.log(error.data.error);
        //     });;
        // }

        // vm.goToDelete = function (UniverseId) {
        //     vm.currentSelect = -1;
        //     vm.currentSelect = UniverseId;
        //     $("#confirmModal").modal("show");
        // }

        // vm.cancelDelete = function () {
        //     vm.currentSelect = -1;
        //     $("#confirmModal").modal("hide");
        // }

        // vm.confirmDelete = function () {
        //     if (vm.currentSelect > 0) {
        //         UniverseService.deleteUniverse(vm.currentSelect).then(function successCallback(response) {
        //             vm.reloadData();
        //             $("#confirmModal").modal("hide");
        //             Notification.success({ message: 'Delete Success', delay: 3000 });
        //         }).catch(function (error) {
        //             console.log(error.data.error);
        //             $("#confirmModal").modal("hide");
        //         });;
        //     }
        // }

        // function reloadData() {
        //     var resetPaging = false;
        //     vm.dtInstance.reloadData(callback, resetPaging);
        // }

        // function callback(json) {
        //     console.log(json);
        // }

        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        // function preview(input) {
        //     if (input.files && input.files[0]) {
        //         var reader = new FileReader();
        //         reader.onload = function (e) { $('#img').attr('src', e.target.result); }
        //         reader.readAsDataURL(input.files[0]);
        //     }
        // }

        // function changeImage(image) {
        //     $("#img").css({ top: 0, left: 0 });
        //     preview(image);
        // };

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                // headers: {
                //     Authorization: $http.defaults.headers.common.Authorization
                // },
                url: apiHost + '/api/v1/universe/admin/get-all',
                type: 'GET',
            })
            .withDataProp('data')
            .withOption('processing', true)
            .withOption('filter', true)
            .withOption('order', false)
            .withOption('serverSide', false)
            .withOption('search', false)
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);
        vm.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID').notSortable(),
            DTColumnBuilder.newColumn('name').withTitle('Name').notSortable(),
            DTColumnBuilder.newColumn('new').withTitle().notSortable().renderWith(function (data, type, full, meta) {
                var content = `
                                <div class="col-xs-12 text-right">
                                <button class="btn btn-sm primary" type="button" ng-click="goToUpdate(`+ full.id + `)">
                                    <i class="fa fa-pencil">
                                    </i>
                                </button>
                                <button class="btn btn-sm red" type="button" ng-click="goToDelete(`+ full.id + `)">
                                    <i class="fa fa-times">
                                    </i>
                                </button>
                                </div>

                                `
                return content;
            }).notSortable(),
        ];
    }
})();