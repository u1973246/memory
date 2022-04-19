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
		
		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= 20;
						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);
						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= 2){
							alert("You Win with " + this.score + " points.");
							loadpage("../");
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}
	
	update (){	}
}

