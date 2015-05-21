// JavaScript Document
// angular.module('starter').controller('AppCtrl', function($scope, $ionicPlatform, $ionicPopup, TwitterService) {
            // Should we show the post tweet button
          //  $scope.showUpdateStatus = true;
angular.module('starter')
.controller('AppCtrl', function($scope, $ionicPlatform, TwitterService) {
            // 1
            $scope.correctTimestring = function(string) {
                return new Date(Date.parse(string));
            };
            // 2
            $scope.showHomeTimeline = function() {
                alert("1");
                TwitterService.getHomeTimeline().then(function(res) {
                    alert("home_timeline");
                  $scope.home_timeline = res;
                }, function(req) {
                  console.log(req);
                });
            };
            // 3
            $scope.doRefresh = function() {
                $scope.showHomeTimeline();
                $scope.$broadcast('scroll.refreshComplete');
            };
            $scope.updateStatus = function() {
                TwitterService.updateStatus().then(function(res) {
                  $scope.showUpdateStatus = false;
                  $scope.doRefresh();
                }, function(req) {
                  console.log(req);
                });
            }
            // 4
            $ionicPlatform.ready(function() {
                if (TwitterService.isAuthenticated()) {
                    $scope.showHomeTimeline();
                } else {
                    TwitterService.initialize().then(function(result) {
                        if(result === true) {
                            $scope.showHomeTimeline();
                        }
                    });
                }
            });
        });
