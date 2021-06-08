//Universal variables
var GameState = "Story";

var IMG = 1, scale = 1;

var life = 3;
var score = 0;

var bg;

var i = 0;
var o = 0;

var barrier1, barrier2;

//Story level variables
var button;
//Level 1 variables
var EnemySpaceship1;
var Player;
var bullet1;
var Missiles;
var EnemySpaceship1Grp, MissilesGrp, BulletsGrp;
var SquadronSpaceship;

//Variables for Images
var PlayerImg;
var EnemySpaceship1Img, EnemySpaceship2Img, EnemySpaceship3Img,
    EnemySpaceship4Img, EnemySpaceship5Img;
var SquadronSpaceshipImg;
var MissilesImg, bulletsImg;
var livesImg;

function preload(){
    PlayerImg = loadImage("images/Player Spaceship.png");
    bulletsImg = loadImage("images/bullet.png");


    bg = loadImage("images/Background.gif");

    livesImg = loadImage("images/Lives.png");

    SquadronSpaceshipImg = loadImage("images/Squadron Spaceship.png")
}
function setup(){
    createCanvas(displayWidth-40, displayHeight-30);

    //The player Sprite and spaceship we'll add Image afterwards
    player = createSprite(width/2, height-70, 150, 150);
    player.addImage(PlayerImg);
    player.scale = 0.4;
    //player.debug = true;
    player.setCollider("circle", 0, 0, 150)

    button = createButton("Play");
    button.position(displayWidth - 30, displayHeight - 70);
    button.style('background', 'yellow');

    barrier1 = createSprite(0, displayHeight/2, 2, displayHeight);
    barrier1.visibility = false;

    barrier2 = createSprite(displayWidth-40, displayHeight/2, 2, displayHeight);
    barrier2.visibility = false;

    //Creating Groups For level1 variables
    EnemySpaceship1Grp = new Group();
    MissilesGrp = new Group();
    BulletsGrp = new Group();
    
}

function draw(){
    background(bg);
    textSize(20);
    
    if(GameState === "Story")
    {
        textAlign(CENTER);
        textSize(25)
        text("I am a space warrior. My name is Jones Alex Carl Orion Balcum lll.Jacob for short.", displayWidth/2, 300);
        text("I am fighting against the species of planet Exo21A. The species name is giraffa sapiens.", displayWidth/2, 350);
        text("They have decided to take over our Balaria, our planet, that is why we are fighting.", displayWidth/2, 400);
        text("I am on a mission to defeat one of their squadron. Who are disturbing our Planet.", displayWidth/2, 450);

        text("Rules", displayWidth/2, 600);
        text("Rule 1: Don't let the spaceships touch you, else you will lose a life everytime.", displayWidth/2, 630);
        text("Rule 2: Remember that you only have three lives.", displayWidth/2, 660);
        text("Rule 3: You have to shoot as many spaceships as you can.", displayWidth/2, 690);
        text("Rule 4: You earn 50 points everytime you destroy a spaceship, and your target is 2500", displayWidth/2, 720);

        text("Instructions : Press 'S' to fire bullets and you can only fire 5 bullets at a time.", displayWidth/2, 770);
        text("Press left and right arrow keys to move in those directions to dodge some spaceships.", displayWidth/2, 800);

        /*button.mousePressed(){
            GameState = "level1";
            button.hide();
        }*/
    }

    if(GameState === "level1")
    {
        text("Score : " + score, 50, 50);

        player.collide(barrier1);
        player.collide(barrier2);

        var x = 50;
        for(var v = 1; v <= life; v++)
        {
            image(livesImg, x, 75, 50, 50);

            x += 50;
        }
        if(keyIsDown(LEFT_ARROW))
        {
            player.x -= 2;
        }

        if(keyIsDown(RIGHT_ARROW))
        {
            player.x += 2;
        }

        if(frameCount % 150 === 0)
        {
            SpawnSpaceships1();
        }

        for(i = 0; i < EnemySpaceship1Grp.length; i++)
        {
            if(EnemySpaceship1Grp.get(i).isTouching(BulletsGrp))
            {
                EnemySpaceship1Grp.get(i).destroy();
                BulletsGrp.get(o).destroy();
                score += 50;            
            }

         /*for(o = 0; o < BulletsGrp.length; o++){
                    if(BulletsGrp.get(o).isTouching(EnemySpaceship1Grp))
                    {
                        BulletsGrp.get(o).destroy();
                    }
                }*/
            if(EnemySpaceship1Grp.get(i).isTouching(player))
            {
                EnemySpaceship1Grp.get(i).destroy();
                life -= 1;
            }
        }

        if(life === 0 && GameState === "level1")
        {
            GameState = "End";
        }

        if(GameState === "level1" && score >= 300)
        {
            GameState = "Won";
        }

        
        drawSprites();
    }

    if(GameState === "Won")
        {
            //bg = 255;
            stroke("green");
            textSize(25);
            text("Score : "+score, displayWidth/2, displayHeight/2-50);
            text("You have cleared level 1", displayWidth/2-50, displayHeight/2);
            
        }
        if(GameState === "End")
        {
            //background(255);
            //bg = 255;
            stroke("green");
            textSize(25);
            text("You Lose", displayWidth/2-20, displayHeight/2-20);

        }
}

function SpawnBullets()
{
    bullet1 = createSprite(player.x, player.y-30, 10, 10);
    bullet1.velocityY = -1.5;
    bullet1.addImage(bulletsImg);
    bullet1.scale = 0.1;
    bullet1.lifetime = 400;
    BulletsGrp.add(bullet1);

    BulletsGrp.setLifetimeEach(400);

}
function SpawnSpaceships1()
{
    var b = 85;

    switch(IMG)
        {
            case(1):
            EnemySpaceship1Img = loadImage("images/Enemy Spaceship1.png");
            IMG++;
            break;

            case(2):
            EnemySpaceship1Img = loadImage("images/Enemy Spaceship2.png");
            IMG++;
            break;

            case(3):
            EnemySpaceship1Img = loadImage("images/Enemy Spaceship3.png");
            IMG++;
            break;

            case(4):
            EnemySpaceship1Img = loadImage("images/Enemy Spaceship4.png");
            IMG++;
            break;

            case(5):
            EnemySpaceship1Img = loadImage("images/Enemy Spaceship5.png");
            IMG = 1;

            break;

            default: break;
        }
    for(var a = 0; a <= 5; a++)
    {
                
        EnemySpaceship1 = createSprite(b, 50, 75, 75);
        b += 225;
        
        EnemySpaceship1.addImage(EnemySpaceship1Img);

        EnemySpaceship1Grp.add(EnemySpaceship1);
        
    }
    EnemySpaceship1Grp.setVelocityYEach(2);
    EnemySpaceship1Grp.setLifetimeEach(350);
}

function keyPressed()
{
    if(GameState === "level1" && keyCode === 115 || keyCode === 83 && BulletsGrp.length < 5)
    {
        SpawnBullets();
    }
}