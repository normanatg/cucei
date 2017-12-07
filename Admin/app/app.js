var app = angular.module('app',['ui.router', 'angularFileUpload',
    'ngSanitize', 'ngMaterial','ngMessages', 'ngStorage', 'ngAnimate', 'ngMap',
    'lbServices','cl.paging']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    '$httpProvider', '$mdThemingProvider','$qProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider,$qProvider) {

		$stateProvider
			.state('main', {
				url: '/main',
				templateUrl: 'app/templates/main.tpl.html',
				controller: 'mainTemplateController',
				abstract: true
			})
			.state('login', {
				url: '/login',
				templateUrl: 'app/components/login/login.html',
				controller: 'loginController'
			})
			.state('main.dashboard', {
				url: '^/dashboard',
				views: {
					'content': {
						templateUrl: 'app/components/dashboard/dashboard.html',
						controller: 'dashboardController'
					}
				}
			})
			.state('main.map',{
				url:"^/map",
				views:{
					'content':{
						templateUrl:'app/components/map/map.html',
						controller: 'mapController'
					}
				}
			})
		;
        $urlRouterProvider.otherwise("login");
    }
]);