let sManager;

/////宣言エリア/////
//Playerクラス
// class Player{
//     constructor(name, role){
//         this.name = name;
//         this.role = role;
//         this.score = 0;
//     }
// }
// let players = {};
let playername;
let myindex;

//io
let socket;
socket = io.connect('http://localhost:3000');

//初期化
let matMap = [];
for(let ih=0; ih <opts.matY; ih++){
    matMap[ih] = [];
    for(let iw=0; iw <opts.matX; iw++){
        matMap[ih][iw] = 0;
    }
}
//確認用////////////////////////
matMap[1][1]=1;
matMap[2][2]=1;
matMap[3][3]=1;
matMap[4][4]=1;
////////////////////////////////
console.log(matMap);
let data={
  arrX: 2,
  arrY: 6,
  matMap: matMap
}
//ゲーム画面表示
  socket.on('play', function(players){
    // console.log(nextrole);
    // playgame(nextrole);
    sManager.showScene(Scene2,data);
    // sManager.showScene(ARROW);
    // location.href='src/arrow.html';
  });


  const playgame = function(role){
    if(role == 'C'){
      // RUN();
    } else if(role == 'R') {
      calljs("arrow.js");
    }
  }



//ユーザー名入力補助
const cleanInput = (input) => {
  return $('<div/>').text(input).html();
}

//

socket.on('you are', function(player){
    if(player.role == 'R'){
        calljs("sam1.js");
    } else if(player.role == 'C') {
        calljs("sam2.js");
    }
});


////scenemanager検証////////////////////////////////////////////////////////////////////////////////////////////////////




function setup(){
	console.log("setup");
	createCanvas(750, 750);
	background(255);
	frameRate(16);
	angleMode(DEGREES);
	rectMode(CENTER);
	fill(255, 255, 255);
	noStroke();

	// SceneManager
  sManager = new SceneManager();
  // sManager.addScene(Scene2);
	// sManager.addScene(Scene3);
}
function draw(){
	// SceneManager
	sManager.draw();
}
function mousePressed(){
	console.log("mousePressed");

	// SceneManager
	sManager.mousePressed();
}
function keyPressed(){
  console.log("keyPressed");
  sManager.keyPressed();
}

function Scene1(){

	this.setup = function(){
		background(200, 100, 100);
	}

	this.draw = function(){

		textAlign(CENTER);
		text("Scene1", width*0.5, height*0.5);
  }
  console.log('S1');
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////
// pl.role = 'R';

// if(pl.role == 'R'){
//     calljs("sam1.js");
// } else if(pl.role == 'C') {
//     calljs("sam2.js");
// }
/////////////////////


//外部jsファイルの読み込み
function calljs(URL) {
	// このコードはIE7以降有効です
    var req = new XMLHttpRequest();
    req.open("GET", URL, false);
    req.send("");

// 上のreq.openでは同期通信(false)を指定しているので以下はレスポンスを待ってから実行される。
// 文字列をjavascriptとして実行。
    new Function(req.responseText)();
};



// const RUN = function(){
//   let opts = {
//     canvasWidth : 750,     //キャンバスの幅
//     canvasHeight : 550,     //キャンバスの高さ
//     cellSize : 50,        //マス目のサイズ(縦横同じ設定)
//     matX : 10,        //マス目の横方向の数
//     matY : 10,         //マス目の縦方向の数
//     originX : 200,          //マス目描画のX始点
//     originY : 30,           //マス目描画のY始点
//     choice : 5,              //鬼の選択数
//       stamina : 5             //移動可能数
//   }
//   let matMap = [];
//   let angle = 0;
//   let arrow1;

//   function setup(){
//       //キャンバスの作成
//       createCanvas(opts.canvasWidth, opts.canvasHeight);
//       //マップの作成（マス目分の0の2次元配列）
//       for(let ih=0; ih <opts.matY; ih++){
//           matMap[ih] = [];
//           for(let iw=0; iw <opts.matX; iw++){
//               matMap[ih][iw] = 0;
//           }
//       }
//       //angleMode(DEGREES);
//       console.log(matMap);
//       arrow1 = new Arrow(3,2,'r');
//   }

//   function draw(){
//       background(0);

//       //ステータス表示
//       fill(255);
//       textSize(20);
//       text("移動："+ arrow1.mvCounter + " / "　+　opts.stamina, 10, 200);
//       let cell = arrow1._wCI();
//       text("x："+ arrow1._wCI().x, 10, 240);
//       text("y："+ arrow1._wCI().y, 10, 270);

//       //描画テスト
//       matMap[3][4]=1;
//       matMap[1][3]=1;
//       matMap[1][4]=1;
//       matMap[5][6]=1;
      

//       //テーブルの描画

//       for(let ih = 0; ih < opts.matY; ih++){
//           stroke('black');
//           strokeWeight(8);
//           for(let iw = 0; iw < opts.matX; iw++){
//               let x = opts.originX + iw * opts.cellSize;
//               let y = opts.originY + ih * opts.cellSize;
//               //0<=matMap<1 ならマスを描画
//               if(0 <= matMap[ih][iw] && matMap[ih][iw] < 1){
//                   rect(x,y,opts.cellSize,opts.cellSize); 
//               }
//               if(matMap[ih][iw]==0.5){
//                       sHexag(x+opts.cellSize/2, y+opts.cellSize/2,15,'red',5);
//               }
//           }
//       }
//       arrow1.show();
//       arrow1.move();
//   }

//   class Arrow {
//     constructor(xc0,yc0,d0='u'){
//         this.xc = opts.originX + xc0 *opts.cellSize -1/2*opts.cellSize;
//         this.yc = opts.originY + yc0 *opts.cellSize -1/2*opts.cellSize;
//         this.xc_prv = this.xc;
//         this.yc_prv = this.yc;
//         this.mvCounter = opts.stamina;
//         switch(d0){
//             case 'l':
//                 angle = 270;
//                 break;
//             case 'r':
//                 angle = 90;
//                 break;
//             case 'd':
//                 angle = 180;
//                 break
//             case 'u':
//             default:
//                 angle = 0;
//                 break;
//         }
//         this.angle_prv = angle;
//     }
//       show() {
//           push();
//           fill(0);
//           stroke(255);
//           strokeWeight(2);
//           translate(this.xc, this.yc);
//           // translate(100, 100);
//           rotate(radians(angle));
//           let h = 3/8;
//           let w = 1/4;
//           triangle(-opts.cellSize*w ,opts.cellSize*h, 0, -opts.cellSize*h, opts.cellSize*w, opts.cellSize*h);
//           pop();
//       }
//       turn(){
//           if(this.mvCounter > 0){
//               if        (keyCode === 37) {
//                   if(angle === 270 && this.xc > opts.originX+opts.cellSize){
//                       this.xc -= opts.cellSize;
//                   } else if(angle === 270 && this.xc < opts.originX+opts.cellSize){
//                       mvCounter++;
//                   } else {
//                       angle = 270;
//                   }
//               } else if (keyCode === 38) {
//                   if(angle === 0 && this.yc > opts.originY+opts.cellSize){
//                       this.yc -= opts.cellSize;
//                   } else if(angle === 0 && this.yc < opts.originY+opts.cellSize){
//                       mvCounter++;
//                   } else {
//                       angle = 0;
//                   }
//               } else if (keyCode === 39) {
//                   if(angle === 90 && this.xc < opts.originX+(opts.matX-1)*opts.cellSize){
//                       this.xc += opts.cellSize;
//                   } else if(angle === 90 && this.xc > opts.originX+(opts.matX-1)*opts.cellSize){
//                       mvCounter++;
//                   } else {
//                       angle = 90;
//                   }
//               } else if (keyCode === 40) {
//                   if(angle === 180 && this.yc < opts.originY+(opts.matY-1)*opts.cellSize){
//                       this.yc += opts.cellSize;
//                   } else if(angle === 180 && this.yc > opts.originY+(opts.matY-1)*opts.cellSize){
//                       mvCounter++;
//                   } else {
//                       angle = 180;
//                   }
//               }
//               this.mvCounter--;
//           }
//       }
//       _wCI(){
//           return {
//               x : floor( (this.xc-opts.originX) /opts.cellSize),
//               y : floor( (this.yc-opts.originY) /opts.cellSize)
//           }
//       }
//       move(){
//           // console.log(this.angle)
//       //     console.log(this.mvCounter);
//       //     console.log(matMap[this._wCI().y][this._wCI().x]);
//           if(this.mvCounter == 0 && matMap[this._wCI().y][this._wCI().x]==1){
//               this.mvCounter = opts.stamina;
//               this.xc = this.xc_prv;
//               this.yc = this.yc_prv;
//               angle = this.angle_prv;
//           }
//       }
//   }
//   function keyPressed() {
//       arrow1.turn();
//   }
// }