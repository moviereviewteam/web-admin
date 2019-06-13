(function () {
    'use strict';
    angular
        .module('app')
        .factory('ActorService', ActorService)
        .controller('ActorCtrl', ActorCtrl);
    ActorService.$inject = ['$http'];
    function ActorService($http) {
        var ActorService = {};
        return ActorService;
    }

    ActorCtrl.$inject = ['$scope', '$compile', '$state', '$localStorage', '$location', '$http', '$filter', 'ActorService', 'DTOptionsBuilder', 'DTColumnBuilder', 'Notification'];
    function ActorCtrl($scope, $compile, $state, $localStorage, $location, $http, $filter, ActorService, DTOptionsBuilder, DTColumnBuilder, Notification) {
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
                url: apiHost + '/api/v1/actor/admin/get-all',
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
            DTColumnBuilder.newColumn('dateOfBirth').withTitle('Date of Birth').notSortable(),
            DTColumnBuilder.newColumn('placeOfBirth').withTitle('Place of Birth').notSortable(),
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