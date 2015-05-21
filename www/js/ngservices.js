// JavaScript Document
angular.module('starter',['ionic', 'ngCordovaOauth']).factory('TwitterService', function($cordovaOauth, $cordovaOauthUtility, $http, $resource, $q) {
                // 1
                var twitterKey = "STORAGE.TWITTER.KEY";
                var clientId = '21XSbS4Ea1w8Q9Y05gwPiDh8X';
                var clientSecret = 'olRumfs3GxdQGHa0qhmBdOFJ8eOpCLkIU20jJgouGC70JhGaBY';

                // 2
                function storeUserToken(data) {
                    window.localStorage.setItem(twitterKey, JSON.stringify(data));
                }

                function getStoredToken() {
                    return window.localStorage.getItem(twitterKey);
                }

                // 3
                function createTwitterSignature(method, url) {
                    var token = angular.fromJson(getStoredToken());
                    var oauthObject = {
                        oauth_consumer_key: clientId,
                        oauth_nonce: $cordovaOauthUtility.createNonce(32),
                        oauth_signature_method: "HMAC-SHA1",
                        oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
                        oauth_token: token.oauth_token,
                        oauth_version: "1.0"
                    };
                    var signatureObj = $cordovaOauthUtility.createSignature(method, url, oauthObject, {}, clientSecret, token.oauth_token_secret);
                    $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
                }

                function createTwitterPostSignature(method, url, message) {
                    var token = angular.fromJson(getStoredToken());
                    var oauthObject = {
                        oauth_consumer_key: clientId,
                        oauth_nonce: $cordovaOauthUtility.createNonce(32),
                        oauth_signature_method: "HMAC-SHA1",
                        oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
                        oauth_token: token.oauth_token,
                        oauth_version: "1.0",
                        status: message
                    };
                    var signatureObj = $cordovaOauthUtility.createSignature(method, url, oauthObject, oauthObject, clientSecret, token.oauth_token_secret);
                    $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
                }

                return {
                    // 4
                    initialize: function() {
                        var deferred = $q.defer();
                        var token = getStoredToken();
                        alert(token);
                        if (token !== null) {
                            deferred.resolve(true);
                        } else {
                            $cordovaOauth.twitter(clientId, clientSecret).then(function(result) {
                                storeUserToken(result);
                                deferred.resolve(true);
                            }, function(error) {
                                deferred.reject(false);
                            });
                        }
                        return deferred.promise;
                    },
                    // 5
                    isAuthenticated: function() {
                        return getStoredToken() !== null;
                    },
                    // 6
                    getHomeTimeline: function() {
                        var home_tl_url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
                        createTwitterSignature('GET', home_tl_url);
                        return $resource(home_tl_url).query().$promise;
                    },
                    updateStatus: function() {
                        var message = "test from ionic";
                        var update_url = 'https://api.twitter.com/1.1/statuses/update.json';
                        var results = createTwitterPostSignature('POST', update_url, message);
                        return $resource(update_url, {'status': message}).save().$promise;
                    },
                    storeUserToken: storeUserToken,
                    getStoredToken: getStoredToken,
                    createTwitterSignature: createTwitterSignature,
                    createTwitterPostSignature: createTwitterPostSignature
                };
            })
