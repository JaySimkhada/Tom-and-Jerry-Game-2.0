var bg, bgImg
var jerry, jerryImg
var tom, tomImg
var cheese, cheeseImg, fish, fishImg, mouseTrap, mouseTrapImg;
var PLAY = 1, END = 0, WIN = 2;
var gameState = PLAY;
var tomScore = 0;
var jerryScore =0;
var gameOver, GameOverImg;
var restart, restartImg;
var cheeseGroup, fishGroup, mouseTrapGroup;
var invisibleGround;

function preload(){
bgImg = loadImage("assets/floor.jpeg");
jerryImg = loadImage("assets/jerry.png");
tomImg = loadImage("assets/tom.png");
cheeseImg = loadImage("assets/cheese.png");
fishImg = loadImage("assets/fish.png");
mouseTrapImg = loadImage("assets/mousetrap.png");
}

function setup(){

createCanvas(1400,600);

//background image
bg = createSprite(300,300,600,20);
bg.addImage(bgImg);
bg.scale = 2.5;
bg.x = width/2;

//invisible ground

invisibleGround = createSprite(300,550,1400,10);
invisibleGround.visible = false;

//PC Characters

tom = createSprite(100,300,20,150);
tom.addImage(tomImg);
tom.scale = 0.20;

jerry = createSprite(1000,300,20,150);
jerry.addImage(jerryImg);
jerry.scale = 0.10;

cheeseGroup = new Group();

fishGroup = new Group();

mouseTrapGroup = new Group();
}

function draw() {
  
  background("black");

  tom.x = camera.position.x - 270;

  if(gameState === PLAY) {
    bg.velocityX = -3
  

    if(bg.x<300) {
    bg.x = 600;
    }

    //Tom's Movement

    if(keyDown("W")&&(tom.y > 270)) {
      tom.velocityY -= 5;
    }

    //Jerry's Movement

    if(keyDown(UP_ARROW)&&(jerry.y>270)) {
      jerry.velovityY -= 5;
    }

    tom.velocityY = tom.velocityY + 0.8;

    cheeseObs();

    fishObs();

    mouseTrapObs();

    tom.collide(invisibleGround);

    if(mouseTrap.isTouching(tom)) {
      tomScore = tomScore - 10;
    }
  
    if(mouseTrap.isTouching(jerry)) {
      jerryScore = jerryScore - 10;
    }

    if(tom.isTouching(jerry)) {
      gamestate = END;
    }
  }
    else if(gameState===END) {

    }

    else if(gamestate===WIN) {

    }

        drawSprites();

        textSize(20); 
        stroke(3); 
        fill("black") 
        text("Score: "+ score, camera.position.x,50); 

        if(jerryScore >= 25 || tomScore >= 25) { 
          tom.visible = false; 
          jerry.visible = false; 
          textSize(30); 
          stroke(3); 
          fill("black"); 
          text("Congragulations!! You win the game!! ", 70,200); 
          gameState = WIN; 
        }      
}

function cheeseObs() {
  if(frameCount % 100 === 0) { 
    cheese = createSprite(camera.position.x+400,330,40,10); 
    cheese.setCollider("rectangle",0,0,200,200) 
    cheese.addImage(cheeseImg); 
    cheese.velocityX = -(6 + 3*score/100) 
    cheese.scale = 0.1; 
    //assign scale and lifetime to the obstacle 
    cheese.lifetime = 400; 
    //add each obstacle to the group 
    cheeseGroup.add(cheese); 
  }
}

function fishObs() {
  if(frameCount % 120 === 0) { 
    fish = createSprite(camera.position.x+400,330,40,40); 
    fish.setCollider("rectangle",0,0,200,200) 
    fish.addImage(fishImg); 
    fish.velocityX = -(6 + 3*score/100) 
    fish.scale = 0.02; 
    //assign scale and lifetime to the obstacle 
    fish.lifetime = 400; 
    //add each obstacle to the group 
    fishGroup.add(fish); 
  }
}

function mouseTrapObs() {
  if(frameCount % 150 === 0) { 
    mouseTrap = createSprite(camera.position.x+400,330,40,40); 
    mouseTrap.setCollider("rectangle",0,0,200,200) 
    mouseTrap.addImage(mouseTrapImg); 
    mouseTrap.velocityX = -(6 + 3*score/100) 
    mouseTrap.scale = 0.15; 
    //assign scale and lifetime to the obstacle 
    mouseTrap.lifetime = 400; 
    //add each obstacle to the group 
    mouseTrapGroup.add(mouseTrap); 
  }
}