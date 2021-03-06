//参照：http://blog.livedoor.jp/reona396/archives/55768147.html

let N = 6;
function setup(){
    //キャンバスの作成
    createCanvas(200, 200);
    // //マップの作成（マス目分の0の2次元配列）
    // for(let ih=0; ih <opts.matY; ih++){
    //     matMap[ih] = [];
    //     for(let iw=0; iw <opts.matX; iw++){
    //         matMap[ih][iw] = 0;
    //     }
    // }
    // //angleMode(DEGREES);
    // console.log(matMap);
    // arrow1 = new Arrow(3,2,'r');
}
//八角形を一つ描画する関数
function sHexag(px, py, rad,c,w){
    push();
    translate(px, py);
    stroke(c);
    noFill();
    strokeWeight(w);
    
    beginShape();
    for (let theta = 0; theta < 360; theta++) {
        let pos = _calcPos(rad, theta);
        let x = pos[0];
        let y = pos[1];
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();
}
//八角形のための頂点の座標を求める関数
function _calcPos(r, t) {
    
    let x = r * sin(t) * _func(t);
    let y = r * cos(t) * _func(t);

    return [x, y];
}
//calcPosの補助計算用関数
function _func(t) {
    let A = cos(180 / N);
    let b = 360 / N;
    let B = cos(b * (t / b - floor(t / b)) - 180 / N);

    return A / B;
}