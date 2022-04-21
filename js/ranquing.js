var load_obj = function(){
	var vue_instance = new Vue({
		el: "#saves_id",
		data: {
			saves2: []
		},
		created: function(){
			let arrayPartides2 = [];
			if(localStorage.partides2){
				arrayPartides2 = JSON.parse(localStorage.partides2);
				if(!Array.isArray(arrayPartides2)) arrayPartides2 = [];
			}
			this.saves2 = arrayPartides2;
		},
		methods: { 
			load: function(i){
				sessionStorage.idPartida2 = i;
				loadpage("../html/game.html");
			}			
		}
	});
	return {}; 
}();

