/**
 * Created by corpa1 on 23/11/16.
*/
app.controller('mainTemplateController', function ($scope,$state,$localStorage,Alumno) {
    $scope.template = {};

    var logout = function(){
        Alumno.logout({},{},function(res){
            $localStorage.token = {};
            $state.go('login');
        });
    };


	$scope.navigate = function($mdOpenMenu,item){
		if(item.options){
			$mdOpenMenu()
		}
		else{
			$state.go(item.url)
		}

	}
    $scope.menu = [
        {
            title: "Dashboard",
            icon: "fa-home",
            url: "main.dashboard"
        },
        {
            title:"Google Maps",
            icon:"fa-map",
            url:"main.map"
        }, 
        {
            title: "Salir",
            icon: "fa-sign-out",
            url: '-',
            action: logout

        }

    ];


});