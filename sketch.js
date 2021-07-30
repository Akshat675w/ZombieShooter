var boy , boyStanding , boysitImg , gameover , gameoverImg;
var zombie , zombie1Img , zombie2Img
var bullet , bulletImg;
var backgroundImg;
var zombieGroup , bulletGroup;
var gameState = "PLAY"
var Score = 0

function preload() {
  boyStanding = loadAnimation("Images/Boy1.png","Images/Boy2.png")
  boysitImg = loadAnimation("Images/boy3.png","Images/boy4.png")
  zombie1Img = loadAnimation("Images/Zombie1.png","Images/Zombie2.png")
  zombie2Img = loadAnimation("Images/zombie3.png","Images/Zombie4.png","Images/Zombie5.png","Images/Zombie6.png","Images/Zombie7.png")
  bulletImg = loadImage("Images/Bullet1.png");
  backgroundImg = loadImage("Images/bg.jpeg");
  gameoverImg = loadImage("Images/Gameover.png")
}

function setup() {
  createCanvas(850,600)
  boy = createSprite(90,450)
  boy.addAnimation("boy_Shooting",boyStanding)
  boy.scale = 0.65
  boy.debug = true

  gameover = createSprite(425,300)
  gameover.addImage(gameoverImg)
  gameover.visible = false

  zombieGroup = new Group()
  bulletGroup = new Group()
  
}

function draw() {

  background(backgroundImg)
  fill("white")
  textSize(20)
  text("Score :"+Score ,60,60)

  if(gameState === "PLAY"){
    gameover.visible = false
    boy.visible = true
    spawnZombie()
   
  if(keyDown("space")){
    spawnbullet()
  }

  if(zombieGroup.isTouching(bulletGroup)){
    zombie.addAnimation("zombie_Apocalypse",zombie2Img)
    bulletGroup.destroyEach();
    zombie.destroy();
    Score = Score+1
  }
  
  if(zombieGroup.isTouching(boy)){
    gameState = "END"
    gameover.visible = true
    zombieGroup.destroyEach()
    bulletGroup.destroyEach()
    }
}
else if(gameState === "END"){
  boy.visible = false
  
  gameover.visible = true
  fill("white")
  textSize(25)
  text("Press 'r' to restart ",320 ,410)
  if(keyDown("r")){
    gameState = "PLAY"
    Score = 0
  }

}
drawSprites()
}

function spawnZombie(){
  if(frameCount % 60 === 0){
    zombie = createSprite(850 , 450)
    zombie.x = Math.round(random(850,450));
    zombie.lifetime = 120

    zombie.addAnimation("zombie_Apocalypse",zombie1Img)
    zombie.velocityX = -4
    zombie.scale = 1.4
    zombieGroup.add(zombie)
  
  }
}

function spawnbullet(){

  bullet = createSprite(60,450)
  bullet.addImage(bulletImg)
  bullet.scale = 0.75
  bullet.velocityX = 3
  bullet.lifetime = 120
  
  bulletGroup.add(bullet)
  return(bullet)
  
}