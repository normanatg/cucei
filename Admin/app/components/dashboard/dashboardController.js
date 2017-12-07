app.controller('dashboardController', function ($scope,$rootScope,$mdDialog,$mdToast, Denuncia) {
    $scope.template.title = "Dashboard";
    var timeOut;
	$scope.search = '';
    $scope.dens = [];
    $scope.estado = 0;
    $scope.opts = {
        filter:{
            where:{
                estado : $scope.estado
            },
            skip:0,
            limit:10
        }
    };
    
    

    $scope.updateDisplay = function(){
        getResult();
    };

	$scope.searchLike = function(){
		if(timeOut) clearTimeout(timeOut);
		$scope.paging.current = 1;
		timeOut = setTimeout(getResult, 500);
	};

    var getResult = function(){
        refreshResultCount();
        $scope.opts.filter.skip =  $scope.opts.filter.limit * ($scope.paging.current-1);
        $scope.opts.filter.where.or =[
            {des:{like:$scope.search, options: 'i'}},
        ];
            Denuncia.find($scope.opts, function (res) {
                $scope.dens = res;
            });
    };

    var refreshResultCount = function(){
        Denuncia.count({
            where:{
            	estado: $scope.estado,
                des: {like:$scope.search, options: 'i'}
            }
        },function(res){
            $scope.paging.total = Math.ceil(res.count/$scope.opts.filter.limit);
        });
    };
    $scope.paging = {
        total : "",
        onPageChanged: getResult,
        current:1
    };
    var init = function(){
        refreshResultCount();
        getResult();
    };
    $scope.archiveDen = function(denId){
        Denuncia.update({
            where :{
                id : denId
            }
        },
            {
            estado: 1
        },function(res){
            if(res.count != 0) {
            	alert("Denuncia Archivada");
                getResult();
            }
        },function(res){
            console.log(res);
        });
    };

    init();

});