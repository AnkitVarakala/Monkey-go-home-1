var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var bananas ,bananasImage, obstacles, obstaclesImage
var bananasGroup, obstaclesGroup
var ground, invisibleGround, groundImage
var score

var survivalTime;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  groundImage = loadImage("ground.png");
  
  bananasImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 500);

  //creating monkey
  monkey = createSprite(80,420,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1
  
  ground = createSprite(10,450,2000,10);
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(10,455,2000,10);
  invisibleGround.visible = true;
  
   //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
}


function draw() {
  //set background color 
  background(225);
  
  // displaying score
   stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+ score,450,50);
  
  //displaying survivalTime
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survivalTime:" + survivalTime, 30,50);

  
  if(gameState === PLAY){
    
    ground.velocityX = -(4 + 3* score/100)
    
    //scoring
    score = score + Math.round(getFrameRate()/60);
    //survivalTime
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
   if(ground.x < 0){
    ground.x = ground.width/2;
  } 
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 160) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8 
    
  //spawn the bananas
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
  
   if(obstaclesGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
        gameState = END;
    }
  }

   else if (gameState === END) {
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0;
     
     
     //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0);
   }
  
  //stop monkey from falling down
  monkey.collide(invisibleGround);

  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacles = createSprite(600,407,10,40);
    obstacles.addImage(obstaclesImage);
    obstacles.scale = 0.2;
   obstacles.velocityX = -(6 + score/100);
   
     //assign lifetime to the variable
    obstacleslifetime = 200;
  
    //add each obstacle to the group
    obstaclesGroup.add(obstacles);
 }
}

function spawnBananas(){
 if (frameCount % 80 === 0){
   var Bananas = createSprite(600,165,10,40);
    Bananas.y = Math.round(random(80,120));
    Bananas.addImage(bananasImage);
    Bananas.scale = 0.1;
   Bananas.velocityX = -(6 + score/100);
   
     //assign lifetime to the variable
    Bananaslifetime = 200;
    
    //adjust the depth
    Bananas.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each obstacle to the group
    bananasGroup.add(Bananas);
 }
}





