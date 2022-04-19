var json = localStorage.getItem("config");
if(json){
	options_data = JSON.parse(json);
}
else{
	options_data.cards = 2;
	options_data.dificulty = "hard";
}

class GameScene extends Phaser.Scene {
	
	constructor (){
        super('GameScene');
		this.numCards = options_data.cards * 2;
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.puntuacio = 20;
		this.correct = 0;
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){	

		let totalArrayCards = ['co', 'sb', 'cb', 'so', 'tb', 'to'];
		let arraycards = [];
		for(let y=0; y<this.numCards/2; y++){
			arraycards.push(totalArrayCards[y]);
			arraycards.push(totalArrayCards[y]);
		}
		arraycards.sort(function(){return Math.random() - 0.5}); //array aleatoria

		this.cameras.main.setBackgroundColor(0xBFFCFF);

		var a = 450 - this.numCards/2*100; //Imatges quedin centrades
		for(let x=0; x<this.numCards; x++){
			this.add.image(a, 300, arraycards[x]);
			a+=100;
		}

		//this.add.image(250, 300, arraycards[0]);
		//this.add.image(350, 300, arraycards[1]);
		//this.add.image(450, 300, arraycards[2]);
		//this.add.image(550, 300, arraycards[3]);
		
		this.cards = this.physics.add.staticGroup();
		
		var b = 450 - this.numCards/2*100; //Imatges quedin centrades
		for(let x=0; x<this.numCards; x++){
			this.cards.create(b, 300, 'back');
			b+=100;
		}

		//this.cards.create(250, 300, 'back');
		//this.cards.create(350, 300, 'back');
		//this.cards.create(450, 300, 'back');
		//this.cards.create(550, 300, 'back');

		//DIFICULTAT
		var dificultat = options_data.dificulty;
		var sec = 5000;
		if(dificultat == 'normal') {sec = 3000; this.puntuacio = 25}
		else if(dificultat == 'hard') { sec = 1000; this.puntuacio = 50}
		//MOSTRAR CARTES
		var timer = this.time.addEvent({ delay: sec, callback: onEvent, callbackScope: this, loop: false });
		this.cards.children.iterate((card)=>{
			card.disableBody(true,true);
			setTimeout(this.desmostrarInicial, sec);
		});
		//AMAGAR CARTES
		function onEvent (){
			this.cards.children.iterate((card)=>{
				card.enableBody(false, 0, 0, true, true);
			});
		}
		
		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){ 
					if (this.firstClick.card_id !== card.card_id){ //Si fallem la carta
						this.score -= this.puntuacio;
						this.firstClick.disableBody(true,true);
						var timer2 = this.time.addEvent({ delay: 1000, callback: onEvent2, callbackScope: this, loop: false });

						function onEvent2(){
							this.firstClick.enableBody(false, 0, 0, true, true);
							card.enableBody(false, 0, 0, true, true);
							if (this.score <= 0){ //Si perdem
								alert("Game Over"); 
								loadpage("../");
							}
							this.firstClick = null;
						}	
					}
					else{ //Si encertem la carta
						this.correct++;
						if (this.correct >= this.numCards/2){ //Si guanyem
							alert("You Win with " + this.score + " points.");
							loadpage("../");
						}
						this.firstClick = null;
					}
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}
	
	update (){	}
}

