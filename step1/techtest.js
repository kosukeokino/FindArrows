

let opts = {
    canvasWidth : 1000,     //キャンバスの幅
    canvasHeight : 700,     //キャンバスの高さ
    cellSize : 50,        //マス目のサイズ(縦横同じ設定)
    matX : 10,        //マス目の横方向の数
    matY : 8,         //マス目の縦方向の数
    originX : 200,          //マス目描画のX始点
    originY : 100,           //マス目描画のY始点
    choice : 5              //鬼の選択数
}
let matMap = [];


function setup(){
    //キャンバスの作成
    createCanvas(opts.canvasWidth, opts.canvasHeight);
    //マップの作成（マス目分の0の2次元配列）
    for(let ih=0; ih <opts.matY; ih++){
        matMap[ih] = [];
        for(let iw=0; iw <opts.matX; iw++){
            matMap[ih][iw] = 0;
        }
    }
    angleMode(DEGREES);
    console.log(matMap);
}

function draw(){
    background(0);

    //ステータス表示
    fill(255);
    textSize(20);
    text("選択数："+ counter(0.5) + " / "　+　opts.choice, 10, 200);

    //描画テスト
    //matMap[3][4]=1;
    //matMap[5][6]=0.5;
    //

    //テーブルの描画

    for(let ih = 0; ih < opts.matY; ih++){
        push();
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
        pop();
    }
    //テスト用マス目描画
//     fill(255);
//     rect(opts.originX, opts.originY, opts.cellSize,opts.cellSize);
//     rect(opts.originX+opts.cellSize, opts.originY, opts.cellSize,opts.cellSize);
    
    //マウスオーバーで選択でピックアップ
    for(let ih = 0; ih < opts.matY; ih++){
        for(let iw = 0; iw < opts.matX; iw++){
            let x = opts.originX + iw * opts.cellSize;
            let y = opts.originY + ih * opts.cellSize;
            //matMap==0ならマスを描画
            if(matMap[ih][iw]==0 && x < mouseX && mouseX < x + opts.cellSize && y < mouseY && mouseY < y + opts.cellSize){
                        fill(0);
                        rect(x, y, opts.cellSize,opts.cellSize);
                        fill(255);
                        noStroke();
                        rect(x-3, y-3, opts.cellSize-8,opts.cellSize-8);
                        break;
            }
        }
    }

    
}

function mouseClicked(){
    //console.log("clked");
    matMap[_wCI().y][_wCI().x]= (-1)*matMap[_wCI().y][_wCI().x]+  0.5;      //2回クリックで0に戻る
    console.log(counter(0.5));
    
}
//マウスがクリックしたセルを計算する関数
function _wCI(){
    return {
        x : floor( (mouseX-opts.originX) /opts.cellSize),
        y : floor( (mouseY-opts.originY) /opts.cellSize)
    }
}
//要素の数を数える関数
function counter(item){
    let itemnum = 0;
    for(let i = 0; i<opts.matY; i++){
      for(let j = 0; j<opts.matX; j++){
        if(matMap[i][j] == item){
          itemnum++;
        }
      }
    }
    return itemnum;
  }
//Enterキーで選択を反映
function keyPressed(){
    if(counter(0.5)==opts.choice && key === "Enter"){
        for(let i = 0; i<opts.matY; i++){
            for(let j = 0; j<opts.matX; j++){
                matMap[i][j] = floor(matMap[i][j] + 0.5);
            }
        }
    }
}