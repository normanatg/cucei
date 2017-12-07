app.controller('mapController', function ($scope, Denuncia) {
	$scope.template.title = "Map";
	var beaches = [];
	function init(){
		Denuncia.find({
			filter:{
				where:{
					estado:0
				}
			}
		},function(res){
			beaches = res;
			initMap();
		});
	};
	
    
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: {lat: 20.657252, lng: -103.3247564}
        });
        setMarkers(map);
      }

      function setMarkers(map) {
        var image = {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          size: new google.maps.Size(20, 32),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 32)
        };
        var shape = {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: 'poly'
        };
        for (var i = 0; i < beaches.length; i++) {
          var beach = beaches[i];
          var marker = new google.maps.Marker({
            position: {lat: Number(beach['latitud']), lng: Number(beach['longitud'])},
            map: map,
            icon: image,
            shape: shape,
            title: beach['des'],
            zIndex: i
          });
        }
      }
      init();
  		
});