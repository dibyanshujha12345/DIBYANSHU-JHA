var spaceImg,space,meteorImg,meteor,meteorG,star,starImg,starG;
var rocketImg,rocket,iss,issImg,issG,comet,cometImg,cometG,wow,over;
var gameState="serve";
var PLAY;
var PAUSE;
var END;
var score=0;
var LIVES=5;
var STARS=0;

function preload(){

  
  meteorImg = loadImage("meteor.png");
  starImg = loadImage("star1.png");
  spaceImg = loadImage("space.jpg");
  issImg = loadImage("ISS1.png");
  rocketImg = loadImage("rocket.png");
  cometImg = loadImage("comet.png");


  
 wow = loadSound("wow.wav");
 over=loadSound("over.mp3");


  meteorG = new Group ();
  starG = new Group();
 issG = new Group();
 cometG = new Group();

 

}

function setup() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if(isMobile ){
      canW = displayWidth;
      canH = displayHeight;
      createCanvas(displayWidth+80,displayHeight);
    }else{
      canW = windowWidth;
      canH = windowHeight;
      createCanvas(windowWidth,windowHeight);
    }


space = createSprite(width-700,height-300)
space.addImage("space",spaceImg);


rocket = createSprite(width/2,height/2);
rocket.addImage(rocketImg);
rocket.scale=0.08;

rocket.setCollider('rectangle',0,0,950,2000);
//rocket.debug=true;





}

function draw() {
 
    background(0);
    

    if(keyDown("space")||touches.length > 0 ){
        gameState="PLAY";
        touches = [];
    }


if(gameState==="PLAY"){
    rocket.x=mouseX;
   
   space.velocityY=10;
edges = createEdgeSprites();
rocket.collide(edges);
    if(space.y>height-10){
        space.y=height/2;
    }
    score = score + Math.round(getFrameRate()/60);
    
    
    

    spawnMeteors();
    spawnStars();
    spawnStation();
    spawnComets();

space.velocityY=(space.velocityY+score/200);

    if(rocket.isTouching(starG)){
        STARS=STARS+1;
        starG.destroyEach();
        wow.play();
    }
   
    if(rocket.isTouching(cometG)){
        LIVES=LIVES-1;
       cometG.destroyEach();
       over.play();
        
    }
    if(rocket.isTouching(meteorG)){
        LIVES=LIVES-1;
        meteorG.destroyEach();
        over.play();
    }



}

 if(LIVES===0){
     gameState="END";
     over.play();
 }
    if(rocket.isTouching(issG)){
        gameState="PAUSE";
    }




if(gameState==="END"){
space.velocityY=0;

    starG.setVelocityYEach(0);
    starG.setLifetimeEach(-1);

    issG.setVelocityYEach(0);
    issG.setLifetimeEach(-1);

    cometG.setVelocityYEach(0);
    cometG.setLifetimeEach(-1);

    meteorG.setVelocityYEach(0);
    meteorG.setLifetimeEach(-1);


  

    


    
}











    drawSprites()
    textSize(20);
    fill(255);
    text("SCORE:"+score,50,50);
    text("LIVES:"+LIVES,50,75);
    text("STARS:"+STARS,50,100);

    if(gameState==="serve"){
        textSize(20);
        fill("red");
        text("1.CONTROL ROCKET WITH MOUSE X",10,130);
        text("2.DO NOT TOUCH THE COMET AND METEOR",10,150);
        text("3.EARN STARS TO GET MORE POINTS",10,170);
        text("4.TO PAUSE TOUCH THE SPACE STATION",10,190);
        text("5.PRESS 'SPACE' TO START",10,210);
        text("GOOD LUCK",10,230);
    }
    if(gameState==="PAUSE"){
        textSize(40);
        fill("red");
        text("PRESS SPACE TO RESUME",width/2,height/2);
        space.velocityY=0;
        score=score;
        LIVES=LIVES;
        STARS=STARS;
        starG.setVelocityYEach(0);
        meteorG.setVelocityYEach(0);
        cometG.setVelocityYEach(0);
        issG.setVelocityYEach(0);

        starG.setLifetimeEach(0);
        meteorG.setLifetimeEach(0);
        cometG.setLifetimeEach(0);
        issG.setLifetimeEach(0);


       
    }
    
   
    if(gameState==="END"){
        textSize(40);
        fill("red");
        text("GAME OVER  ",width/2,height/2);
    }
}

function spawnMeteors(){
    if(frameCount % 60 === 0){
        meteor= createSprite(Math.round(random(50,width-10)),-70);
        meteor.addImage(meteorImg);
        meteor.velocityY=5;
        meteor.scale=0.09;
        meteorG.add(meteor);

        meteor.lifetime=120;
        meteor.velocityY=(3+score/200);
       
    }
}

function spawnStars(){
    if(frameCount%100 === 0){
        star=createSprite(Math.round(random(50,width-10)),-50);
        star.addImage(starImg);
        star.velocityY=3;
        star.scale=0.03;
        starG.add(star);

        star.lifetime=200;
        star.velocityY=(3+score/200);
        
    }
}

function spawnStation(){
    if(frameCount%600 === 0){
 iss = createSprite(Math.round(random(50,width-10)),-120);
 iss.addImage(issImg);
 iss.velocityY=3;
 iss.scale=0.4;
 issG.add(iss);

 iss.velocityY=(3+score/200);
iss.lifetime=200;
 
    }
}
function spawnComets(){
    if(frameCount%150 === 0){

        comet = createSprite(Math.round(random(50,width-10)),-50);
        comet.addImage(cometImg);
        comet.velocityY=5;
        comet.scale=0.03;
        cometG.add(comet);
        comet.velocityY=(3+score/200);
      comet.lifetime=120;
    }
}