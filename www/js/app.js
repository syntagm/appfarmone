// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var example = angular.module('starter', ['ionic', 'ngSanitize']);

example.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

example.controller("ExampleController", function($scope) {
    $scope.myHTML = 'Check out my programming <a href="http://www.appfarm.co.za">blog</a> while you are here';
});


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.twitterFeed', {
    url: "/twitterFeed",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/twitterFeed.html",
        controller: 'TwitterFeedCtrl'
      }
    }
  })

  .state('app.emptyPage', {
    url: "/emptyPage",
    views: {
      'menuContent': {
        templateUrl: "templates/emptyPage.html",
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/twitterFeed');
});
