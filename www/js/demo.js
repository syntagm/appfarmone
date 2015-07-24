var demoApp = angular.module('demoApp',[]);

  /*      function SimpleController($scope) {
          $scope.customers = [
            { name: 'Barrie vd Berg', city: 'Sandton'},
            { name: 'Ray Parker', city: 'Stellies'},
            { name: 'Niel Joubert', city: 'Montagu'},
            { name: 'Emile Klopper', city: 'Witbank'}
          ];
        }
        demoApp.controller('SimpleController', SimpleController); */
// compare above and below. See the controller has been moved in
        var controllers = {};
        controllers.SimpleController = function ($scope) {
          $scope.customers = [
            { name: 'Barrie vd Berg', city: 'Sandton'},
            { name: 'Ray Parker', city: 'Stellies'},
            { name: 'Niel Joubert', city: 'Montagu'},
            { name: 'Emile Klopper', city: 'Witbank'}
          ];

        };

        demoApp.controller(controllers);
