var app = angular.module('myApp', []);
app.service('DataService', function($http) {
    this.getData = function() {
      return $http.get('http://localhost:8080/products?skip=0&limit=10').then(function(response) {
        return response.data;
      });
    };
    
    this.paginateData = function(data, currentPage, itemsPerPage) {
      var startIndex = (currentPage - 1) * itemsPerPage;
      var endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex);
    };
  });

  app.controller('MainCtrl', function($scope, DataService) {
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    
    DataService.getData().then(function(data) {
      $scope.data = data;
      $scope.totalItems = data.length;
      $scope.pageData = DataService.paginateData(data, $scope.currentPage, $scope.itemsPerPage);
    });
    
    $scope.pageChanged = function() {
      $scope.pageData = DataService.paginateData($scope.data, $scope.currentPage, $scope.itemsPerPage);
    };
  });
  