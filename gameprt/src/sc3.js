
function Scene3(){

	this.setup = function(){
		background(100, 100, 200);
	}

	this.draw = function(){
		textAlign(CENTER);
		text("Scene3", width*0.5, height*0.5);
	}

	this.mousePressed = function(){
		this.sceneManager.showNextScene();
	}
}