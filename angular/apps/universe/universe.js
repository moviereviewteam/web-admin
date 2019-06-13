(function () {
    'use strict';
    angular
        .module('app')
        .factory('UniverseService', UniverseService)
        .controller('UniverseCtrl', UniverseCtrl);
    UniverseService.$inject = ['$http'];
    function UniverseService($http) {
        var UniverseService = {};
        return UniverseService;
    }

    UniverseCtrl.$inject = ['$scope', '$compile', '$state', '$localStorage', '$location', '$http', '$filter', 'UniverseService', 'DTOptionsBuilder', 'DTColumnBuilder', 'Notification'];
    function UniverseCtrl($scope, $compile, $state, $localStorage, $location, $http, $filter, UniverseService, DTOptionsBuilder, DTColumnBuilder, Notification) {
        var vm = $scope;

        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                headers: {
                    Authorization: $http.defaults.headers.common.Authorization
                },
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
            DTColumnBuilder.newColumn('index').withTitle('#').notSortable(),
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