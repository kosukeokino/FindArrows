let opts = {
    canvasWidth : 750,     //キャンバスの幅
    canvasHeight : 550,     //キャンバスの高さ
    cellSize : 50,        //マス目のサイズ(縦横同じ設定)
    matX : 10,        //マス目の横方向の数
    matY : 10,         //マス目の縦方向の数
    originX : 200,          //マス目描画のX始点
    originY : 30,           //マス目描画のY始点
    choice : 5,              //鬼の選択数
    stamina : 5             //移動可能数
    }
    let angle = 0;
function Scene2(){

    let testa;
    let matMap = [];
    let arrow1;

	this.setup = function(){
        
        
        background(100, 200, 100);
        for(let ih=0; ih <opts.matY; ih++){
            matMap[ih] = [];
            for(let iw=0; iw <opts.matX; iw++){
                matMap[ih][iw] = 0;
            }
        }
        console.log(matMap);
        arrow1 = new Arrow(3,2,'r');

	}

	this.draw = function(){
        let tex =  this.sceneArgs;
		textAlign(CENTER);
        text(tex.h +' & '+ tex.s, width*0.5, height*0.5);
        testa = tex;
        /////////////////////////////////////////
        background(0,255,255);
        matMap[3][4]=1;
        matMap[1][3]=1;
        matMap[1][4]=1;
        matMap[5][6]=1;
        for(let ih = 0; ih < opts.matY; ih++){
            stroke('black');
            strokeWeight(8);
            for(let iw = 0; iw < opts.matX; iw++){
                let x = opts.originX + iw * opts.cellSize;
                let y = opts.originY + ih * opts.cellSize;
                //0<=matMap<1 ならマスを描画
                if(0 <= matMap[ih][iw] && matMap[ih][iw] < 1){
                    rect(x,y,opts.cellSize,opts.cellSize); 
                }
                if(matMap[ih][iw]==0.5){
                        sHexag(x+opts.cellSize/2, y+opts.cellSize/2,15,'red',5);
                }
            }
        }
        arrow1.show();
        arrow1.move();
	}

	this.mousePressed = function(){
        console.log('bf');
        socket.emit("test",testa);
        console.log('af');
        // this.sceneManager.showNextScene();
    }
    this.keyPressed = function() {
        arrow1.turn();
    }
}
    class Arrow {
        constructor(xc0,yc0,d0='u'){
            this.xc = opts.originX + xc0 *opts.cellSize -1/2*opts.cellSize;
            this.yc = opts.originY + yc0 *opts.cellSize -1/2*opts.cellSize;
            this.xc_prv = this.xc;
            this.yc_prv = this.yc;
            this.mvCounter = opts.stamina;
            switch(d0){
                case 'l':
                    angle = 270;
                    break;
                case 'r':
                    angle = 90;
                    break;
                case 'd':
                    angle = 180;
                    break
                case 'u':
                default:
                    angle = 0;
                    break;
            }
            this.angle_prv = angle;
        }
        show() {
            push();
            fill(0);
            stroke(255);
            strokeWeight(2);
            translate(this.xc, this.yc);
            // translate(100, 100);
            rotate(radians(angle));
            let h = 3/8;
            let w = 1/4;
            triangle(-opts.cellSize*w ,opts.cellSize*h, 0, -opts.cellSize*h, opts.cellSize*w, opts.cellSize*h);
            pop();
        }
        turn(){
            if(this.mvCounter > 0){
                if        (keyCode === 37) {
                    if(angle === 270 && this.xc > opts.originX+opts.cellSize){
                        this.xc -= opts.cellSize;
                    } else if(angle === 270 && this.xc < opts.originX+opts.cellSize){
                        mvCounter++;
                    } else {
                        angle = 270;
                    }
                } else if (keyCode === 38) {
                    if(angle === 0 && this.yc > opts.originY+opts.cellSize){
                        this.yc -= opts.cellSize;
                    } else if(angle === 0 && this.yc < opts.originY+opts.cellSize){
                        mvCounter++;
                    } else {
                        angle = 0;
                    }
                } else if (keyCode === 39) {
                    if(angle === 90 && this.xc < opts.originX+(opts.matX-1)*opts.cellSize){
                        this.xc += opts.cellSize;
                    } else if(angle === 90 && this.xc > opts.originX+(opts.matX-1)*opts.cellSize){
                        mvCounter++;
                    } else {
                        angle = 90;
                    }
                } else if (keyCode === 40) {
                    if(angle === 180 && this.yc < opts.originY+(opts.matY-1)*opts.cellSize){
                        this.yc += opts.cellSize;
                    } else if(angle === 180 && this.yc > opts.originY+(opts.matY-1)*opts.cellSize){
                        mvCounter++;
                    } else {
                        angle = 180;
                    }
                }
                this.mvCounter--;
            }
        }
        _wCI(){
            return {
                x : floor( (this.xc-opts.originX) /opts.cellSize),
                y : floor( (this.yc-opts.originY) /opts.cellSize)
            }
        }
        move(){
            // console.log(this.angle)
        //     console.log(this.mvCounter);
        //     console.log(matMap[this._wCI().y][this._wCI().x]);
            if(this.mvCounter == 0 && matMap[this._wCI().y][this._wCI().x]==1){
                this.mvCounter = opts.stamina;
                this.xc = this.xc_prv;
                this.yc = this.yc_prv;
                angle = this.angle_prv;
            }
        }
    }