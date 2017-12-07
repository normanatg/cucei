/**
 * Created by Norman on 02/12/17.
 */
app.controller('loginController', function ($scope, $state,$localStorage,Alumno) {
    $scope.login = function () {
        Alumno.login({
            username:$scope.codigo,
            password:$scope.password
        },function (token) {
            $localStorage.token = token;
            console.log($localStorage);
            $state.go('main.dashboard');
        },function(error){
            console.log(error);
            var errs = {
                500 : 'Ocurrio un error.Intentalo de nuevo mas tarde',
                400:'Codigo/Correo o contraseña requeridos',
                401:'Correo o contraseña invalidos',
            };

            $scope.errorMessage = errs[error.status];
        });
    };
});