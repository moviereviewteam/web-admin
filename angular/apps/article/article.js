(function () {
    'use strict';
    angular
        .module('app')
        .factory('ArticleService', ArticleService)
        .controller('ArticleCtrl', ArticleCtrl);
    ArticleService.$inject = ['$http'];
    function ArticleService($http) {
        var ArticleService = {};
        return ArticleService;
    }

    ArticleCtrl.$inject = ['$scope', '$compile', '$state', '$localStorage', '$location', '$http', '$filter', 'ArticleService', 'DTOptionsBuilder', 'DTColumnBuilder', 'Notification'];
    function ArticleCtrl($scope, $compile, $state, $localStorage, $location, $http, $filter, ArticleService, DTOptionsBuilder, DTColumnBuilder, Notification) {
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
                url: apiHost + '/api/v1/Article/admin/get-all',
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
            DTColumnBuilder.newColumn('title').withTitle('Title').notSortable(),
            DTColumnBuilder.newColumn('movie').withTitle('Movie').notSortable(),
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