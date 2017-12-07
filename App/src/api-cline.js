const URL = 'http://192.168.1.84:51510/api';

function getDenuncia() {
	return fetch(URL+"/denuncias?filter=%7B%22estado%22%3A0%7D&access_token=u3molQUL7rxLTROLkkvF9AIvROSLkJHrA3tEGADSu0fYV3c6kmoCu73Pi5jFoVJX")
		.then(res => res.json())
		.then(data => data.map(dat => {
			return {
				id: data.indexOf(dat),
				foto: dat.foto,
				des: dat.des
			}
		}))
}
function getLogin(cod, nip){
	return fetch(URL+"/alumnos/login",{
		method: "POST",
		headers: {
    		Accept: "application/json",
    		"Content-Type": "application/json"
  		},
        body:JSON.stringify({
        	username:cod,
        	password:nip
        })
	})
	.then(res => res.json())
	.then(data => {
		return data;
	})
	.catch((error) => {
        console.warn(error);
    });
}
function getSaveDenuncia(lat, log, des){
	return fetch(URL+"/denuncias?access_token=u3molQUL7rxLTROLkkvF9AIvROSLkJHrA3tEGADSu0fYV3c6kmoCu73Pi5jFoVJX",{
		method: "POST",
		headers: {
    		Accept: "application/json",
    		"Content-Type": "application/json"
  		},
        body:JSON.stringify({
        	"alumnoId":"5a236449d6ddf474728ab4a1",
			"latitud":lat,
			"longitud":log,
			"des":des,
			"foto":"https://source.unsplash.com/random"
		})
	})
	.then(res => res.json())
	.then(data => {
		return data;
	})
	.catch((error) => {
        console.warn(error);
    });
}
export {getDenuncia,getLogin,getSaveDenuncia}