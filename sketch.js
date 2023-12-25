var sound1
function preload(){
  sound1 = loadSound("alex-productions-winter.mp3") //先把音樂檔載入到sound1程式碼中
}

var face_colors = "eae4e9-fff1e6-fde2e4-fad2e1-e2ece9-bee1e6-f0efeb-dfe7fd-cddafd".split("-").map(a=>"#"+a)
var eye_colors = "cc8b86-f9eae1-7d4f50-d1be9c-aa998f".split("-").map(a=>"#"+a)
// var pos_x=[200,500]
// var pos_y=[400,600]
// var sizes=[0,6,0,2]
// var colors=["#fbf8cc","#fde4cf"]
var pos_x=[]  //產生物件的x軸位置
var pos_y=[]  //產生物件的y軸位置
var sizes=[]  //產生物件的大小
var colors=[]  //產生物件的顏色
var v_y=[] //移動速度y軸
var v_x=[] //移動速度x軸
var txts //宣告一個變數，變數存放著文字框內容
var face_move_var = false
var lang = navigator.language //取得瀏覽器的語系
var myRec = new p5.SpeechRec(lang)
var face_Rot_var = false
function setup() {
  createCanvas(windowWidth, windowHeight);
    background("#faf3dd")
    analyzer = new p5.Amplitude();
    analyzer.setInput(sound1)  
  inputElement = createInput("✿🌝💫✿")  //產生一個文字，""內的文字為預設顯示的文字
  inputElement.position(10,10) //把文字框放在(10,10)
  inputElement.size(140,40) //文字框的寬與高
  inputElement.style("font-size","15px") //文字框內的文字大小
  inputElement.style("color","#0077b6")  //文字框內的文字顏色
  inputElement.style("background","#fae1dd")  //文字框的背景顏色
  // inputElement.style("border","none")   //設定文字框沒有框線
  //按鈕的設定
  btnMoveElement = createButton("移動") //產生一個按鈕，按鈕上有"移動"字
  btnMoveElement.position(170,10) //按鈕的位置
  btnMoveElement.size(80,40) //按鈕的寬與高
  btnMoveElement.style("font-size","15px") //文字框內的文字大小
  btnMoveElement.style("color","#0077b6")  //文字框內的文字顏色
  btnMoveElement.style("background","#ddb892")  //文字框的背景顏色
  btnMoveElement.mousePressed(face_move)

  btnStopElement = createButton("暫停")
  btnStopElement.position(270,10) //按鈕的位置
  btnStopElement.size(80,40) //按鈕的寬與高
  btnStopElement.style("font-size","17px") //文字框內的文字大小
  btnStopElement.style("color","#0077b6")  //文字框內的文字顏色
  btnStopElement.style("background","#ddb892")  //文字框的背景顏色
  btnStopElement.mousePressed(face_stop)

  // radio的設定，多個選項，只能選一個
  radioElement = createRadio()
  radioElement.option("暫停")
  radioElement.option("旋轉")
  radioElement.option("移動")
  radioElement.position(370,10)  //按鈕位置
  radioElement.size(200,40)  //按鈕寬與高
  radioElement.style("font-size","17px") //按鈕內的文字大小
  radioElement.style("color","#fff") //選紐內的文字顏色
  radioElement.style("background-color","#2f3e46")
 
 
  btnVoiceElement = createButton("語音")
  btnVoiceElement.position(600,10) //按鈕的位置
  btnVoiceElement.size(80,40) //按鈕的寬與高
  btnVoiceElement.style("font-size","17px") //文字框內的文字大小
  btnVoiceElement.style("color","#0077b6")  //文字框內的文字顏色
  btnVoiceElement.style("background","#ddb892")  //文字框的背景顏色
  btnVoiceElement.mousePressed(voice_go)
                                             
  sound1.play();

 
  //checkBox的設定，多個選項，可選多個 


  // for (var i=0;i<20;i=i+1){
  // drawface(face_colors[int(random(face_colors.length))],eye_colors[int(random(eye_colors.length))],random(0,3,1,2))
  // }
}

function draw() {
  background("#e0aaff");
  mode= radioElement.value()
  for(var i=0;i<pos_x.length;i=i+1)
  {
    push()
      txts = inputElement.value(); //把文字框文字內容，放入txts變數內
      translate(pos_x[i],pos_y[i])
      if(mode=="旋轉"||face_Rot_var){
        rotate(sin(frameCount/10*v_y[i])) //如旋轉角度一正一負
      }
      // else
      // {
      //   if(mode=="移動"){
      //     face_move_var =true  
      //   }
      //     else{ //暫停
      //     face_move_var=false
      //   }
      //   }
        drawface(colors[i],0,sizes[i])
      pop()
      if(face_move_var || mode=="移動"){
       pos_y[i] = pos_y[i] + v_y[i]//移動
      }
       if(pos_y[i]>height  ||  pos_y[i]<0) //判斷有無碰到上下邊
    {
      pos_x.splice(i,1)
      pos_y.splice(i,1)
      sizes.splice(i,1)
      colors.splice(i,1)
      v_y.splice(i,1)
      }
    }

}

function drawface(face_clr=255,eye_clr=0,size=1){  //255與0為預設的值
  push()  //自行設定格式
  // translate(random(width),random(height))  //原點移動到(200,200)
  scale(size)  //放大縮小

  fill("#fff")  //設定文字顏色
  textSize(50)  //文字大小
  text(txts,-50,250) //顯示文字，文字內容為txts，放在位置座標為(50,250)

  fill(face_clr)
  //臉蛋
  ellipse(-50,-50,250,250)
  //眼睛
  ellipse(-100,-120,30,20)
  ellipse(0,-120,30,20)
  //眼珠
  fill(eye_clr)
  ellipse(-100,-120,10)
  ellipse(0,-120,10)
  //嘴巴
  fill(180)
  arc(-50,-20,150,100,0,PI)  //下嘴唇
  fill(face_clr)
  arc(-50,-20,100,50,0,PI)  //上嘴唇
  //腮紅
  fill(255,182,193)
  ellipse(-135,-40,50,20)
  ellipse(25,-40,50,20)
  //鼻
  fill(eye_clr)
  ellipse(-50,-50,40,40)
  //耳朵
  fill(face_clr)
  ellipse(-110,-190,80,90)
  ellipse(10,-190,80,90)
  //內耳
  fill(150)
  ellipse(-110,-190,40,50)
  ellipse(10,-190,40,50)
  pop()  //把原本設定格式全部取消
}

function mousePressed(){
  if(mouseY>50){  //設定y軸為0-60間的座標值都不產生新的物件
    //產生一個新的物件
    pos_x.push(mouseX)
    pos_y.push(mouseY)
    sizes.push(random(0.5,1))
    colors.push(face_colors[int(random(face_colors.length))])
    v_y.push(random(-1,1))
  }
}

function face_move(){
  face_move_var = true
}

function face_stop(){
  face_move_var = false
}

function voice_go(){
  myRec.onResult = showResult //取的語音辨識後去執行function showResult
  myRec.start()  //開始辨識
}

function showResult(){
 if(myRec.resultValue == true)
 {
   print(myRec.resultString)
   if(myRec.resultString.indexOf ("走") !== -1){
    face_move_var = true
   } 
   if(myRec.resultString.indexOf("停") !== -1){
    face_move_var = false
    face_Rot_var = false
   }
 }
    if(myRec.resultString.indexOf("轉動") !== -1){
      face_Rot_var = true
    }

    function preload() {
      sound1 = loadSound("happy-holiday-120132.mp3", loaded);
    }
    
    function loaded() {
      console.log("Sound loaded successfully");
    }
    }
//按下滑鼠播放音樂
// function mousePressed(){
  if(sound1.isPlaying()){
    sound1.stop();
  }else{
    sound1.play();
  }

// }
