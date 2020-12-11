class milk{
    constructor(){
        this.lastfed;
        this.foodStock=0;
        this.image=loadImage('Milk.png');
        
    }
   
    updateFoodStock(foodStock){
        
            this.foodStock=foodStock;

    }
    getFeedTime(lastfed){
            this.lastfed=lastfed;
    }
    deductFood(){
    if (this.foodStock>0){
        this.foodStock=this.foodStock-1;
    }
}
getFoodStock(){
    return  this.foodStock
    
}


    display(){
        background(46,139,87);

        fill(0);
        strokeWeight(1);
        stroke("cyan");
        textSize(25);
        if (lastfed>=12)
        {
          text("Last Fed: " + lastfed%12+"PM",350,30);
        }else if(lastfed===0)
        {
          text("Last Fed: 12 AM",350,30);
        }else {
          text("Last Fed: "+ lastfed + " AM",350,30);
        }
      
        var x=80,y=100;
        imageMode(CENTER);
        //image(this.image,600,240,70,70);
             if (this.foodStock!=0)
             {
            for (var i=0;i<this.foodStock;i++)
            {
                if (i%10===0){
                    x=80;
                    y=y+70;
                }
                image(this.image,x,y,80,80);
                x=x+35;;
            }
        }
     }
    bedroom(){
        background(bed,550,500);
    }
    garden(){
        background(gar,550,500);
    }
    washroom(){
        background(wash,550,500);
    }
    lazy(){
        background(l,550,500);
    }
    Rl(){
        background(runL,550,500);
    }
    RR(){
        background(runR,550,500);
    }
    vac(){
        background(Dvaccine,550,500);
    }
    vacc(){
        background(vaccine,550,500);
    }
    v(){
        background(inj,550,500);
    }
    dead(){
        background(DEAD,550,500);
    }
}
