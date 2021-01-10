var arrowimg,playerimg,Enemyimg ,bgimg;
var player,edges,EnemyG,WeaponG,score =0;
var enemy;
var gameState = "play";

function preload(){
  arrowimg =loadImage("fb (2).png") 
 Enemyimg = loadImage("a1.png") 
 Enemyimg1 = loadImage("sp2.png") 
 Enemyimg2 = loadImage("enemy2.png") 
  bgimg=loadAnimation("bg.jpg")
  bgover = loadImage("bg3.jpg");
  shot = loadSound("shoot.wav");
  kill = loadSound("invaderkilled.wav");
  
  playerimg = loadAnimation("download.png","download (1).png","download (2).png");
 // playerimg =loadAnimation("astrounat-removebg-preview (2).png","astrounat-removebg-preview (3).png","astrounat-removebg-preview (4).png","astrounat-removebg-preview (5).png")
}
function setup() {
  createCanvas(windowWidth,windowHeight); 
  background= createSprite(width/2,height/2,width,height);
  background.addAnimation("animation",bgimg) 
 

  edges=createEdgeSprites();
  player=createSprite(70,height-30,70,70)
  player.addAnimation("player",playerimg);
  //player.scale = 1.5;

 
 // player.velocityX =3; 
  EnemyG=new Group();
  WeaponG=new Group();
  
  
  
}

function draw() {
 // background("black");


 if(gameState === "play"){
 background.velocityY =3;
 
 
 if (background.y > 510 ){
  background.y = height/2
}
  
  if(keyDown(RIGHT_ARROW)){
    player.velocityX = 5;
    
  }
  else{
   player.velocityX = 0;
  }

  if(keyDown(LEFT_ARROW)){
   player.velocityX = -5;
  }
  
  if(keyDown(UP_ARROW)){
   player.velocityY = -5;
   
  }
  else{
    player.velocityY = 0;

  }
  
  if(keyDown(DOWN_ARROW)){
  player.velocityY = 5;
  }
  player.bounceOff(edges);
  if(keyDown("space")){
    Weapon();
  } 
  Enemy();
  for(var i =0;i<EnemyG.length;i++){
    if(EnemyG.get(i).isTouching(WeaponG)){
      EnemyG.get(i).destroy();
      shot.play();
     score= score+1
    }
  } 

   for(var i =0;i<EnemyG.length;i++){
    if(EnemyG.get(i).isTouching(player)){
      player.destroy();
      kill.play();
      gameState = "end";
    }
  }
  } 
  if(gameState === "end"){
  EnemyG.destroyEach();
  background= createSprite(width/2,height/2,width,height);
  background.addAnimation("animationgameover",bgover) ;
  background.scale = 3.2;
} 
  drawSprites();
  fill("red");
  textSize(35)
   text("SCORE: "+score ,width/2+400,30);

  
}
function Enemy(){
  if(frameCount %20 === 0){
    enemy =createSprite(width/2,-5,20,20);
    
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: enemy.addImage(Enemyimg);
      break;
      case 2: enemy.addImage(Enemyimg1);
      break;
      case 3: enemy.addImage(Enemyimg2);
      break;
      default: break;
    }
   
    enemy.scale = 1;
    enemy.x =Math.round(random(0,width))
    enemy.velocityY = 5; 
    EnemyG.add(enemy);  
   }   
}
function Weapon(){
 if(frameCount %5 === 0){
  var weapon = createSprite(70,320,5,20);
   weapon.addImage(arrowimg)
   weapon.x = player.x+20; 
   weapon.y = player.y; 
   weapon.scale = 1.0;
   weapon.velocityY = -10; 
   WeaponG.add(weapon); 
}
}  

