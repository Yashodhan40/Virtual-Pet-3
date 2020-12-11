//Create variables here
var dog,Hdog,database,foodS,foodStock;
var dog1,foodObj;
var x=20;
var TimeJson,Time;
var datetime,hour;
var lastfed,fedTime;
var gameStat;
var changeGameState,readGameState;
var gar,bed,wash;
var currentTime;
var live,b,l,vaccine,DEAD,inj,runL,runR;
function preload()
{
  wash = loadImage("Wash Room.png");
  gar = loadImage("Garden.png");
  bed = loadImage("Bed Room.png");
  dog = loadImage("dogImg1.png");
  Hdog = loadImage("dogImg.png");
  live = loadImage("Living Room.png");
  b = loadImage("Living Room.png");
  l = loadImage("Lazy.png");
  vaccine = loadImage("Vaccination.jpg");
  DEAD = loadImage("deadDog.png");
  Dvaccine = loadImage("dogVaccination.png");
  inj = loadImage("Injection.png");
  runL = loadImage("runningLeft.png");
  runR = loadImage("running.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800,800);
  
  foodObj = new milk();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",(data)=>{
    lastfed=data.val();
  });
  
  readGameState=database.ref('gameState');
  readGameState.on("value",(data)=>{
    gameStat=data.val();
  })

  dog1 = createSprite(690,300,30,30);
  dog1.addImage("s",dog);
  dog1.scale=0.3;
 
  button=createButton('Feed The Dog');
  buy=createButton('Buy Food');
 
  button.position(640,105);
  buy.position(760,105);
  
  button.mousePressed(feedDog);
  buy.mousePressed(addFoods);
  
 
  
  
  console.log(hour());
  
  
}


function draw() {  
  currentTime=hour();
  //background(0,20,90);
   
 
  
  
   // foodObj.display();
   
if (currentTime===(lastfed+1))
  {
    update("Playing");
    foodObj.garden();
  }else if(currentTime===(lastfed+2))
  {
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastfed+2) && currentTime<=(lastfed+4))
  {
    update("Bathing");
    foodObj.washroom();
  }else if(currentTime>(lastfed+4)){
    update("Lazy");
    foodObj.lazy();
  }
  else if(currentTime>(lastfed+5)){
    update("happy");
    foodObj.Rl();
    foodObj.RR();
  }
  
  else if(currentTime>(lastfed+144)){
    update("vaccineTable");
    foodObj.vac();
  } else if(currentTime>(lastfed+168)){
    update("vaccine");
    foodObj.vacc();
}else if (currentTime>(lastfed+169)){
    update("Vaccination");
    foodObj.v();
}
else if(currentTime>(lastfed+48)){
    update("Dead");
    foodObj.dead();
  }
  else {
    update("Hungry");
    foodObj.display();
  }
  if (gameStat!="Hungry"){
    button.hide();
    buy.hide();
    dog1.remove();
  }else{
    button.show();
    buy.show();
    dog1.addImage(dog);
  }

  drawSprites();
  
  
}

function readStock(data){
  foodStock = data.val();
  foodObj.updateFoodStock(foodStock);
    
}

function feedDog(){
  dog1.addImage(Hdog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}


function addFoods(){
  foodStock++;
  database.ref('/').update({
    Food:foodStock
  })
}
function update(state){
  database.ref('/').update({
      gameState:state
  });
}
