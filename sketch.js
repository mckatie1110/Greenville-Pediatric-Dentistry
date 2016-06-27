var images=[];
var angles=[0,0,0,0,0,0,0,0,0,0,0,0];
var imageFileNames=["data/H001.jpg","data/H002.jpg","data/H003.jpg","data/H004.jpg","data/H005.jpg","data/H006.jpg","data/H007.jpg","data/H008.jpg"];
var imgNum=0;
var timer=0;
var interval=2500;
var picBs=[];
var paused=false;
var arrowImg;
var pauseImg;
var buttonPressed;
var update=true;
function preload()
{
arrowImg=loadImage("data/ArrowButton.png");
pauseImg=loadImage("Data/PauseButton.png");
for(var i=0; i<imageFileNames.length;i++)
  {images[i]=loadImage(imageFileNames[i]);}
}

function setup()
{createCanvas(600,400);
var buttonSize=width/20;
for(var i=0; i<3;i++)
  {picBs[i]=new Button("IMAGE","",arrowImg);
  picBs[i].dims(width/2-buttonSize*2+i*buttonSize*2,height*9/10,buttonSize,buttonSize,0,width/100);
  picBs[i].colors(color(245,209,169),0,true,0,0);
  }
picBs[2].angle=PI;
picBs[1].imgB=pauseImg;
}

function draw() {

if(millis()-timer>interval && !paused)
  {buttonPressed=false; timer=millis();
  imgNum++;
  if(imgNum>images.length-1){imgNum=0;}
  if(imgNum<0){imgNum=images.length-1;}
  //background(220);
   displayImages();
   update=true;
  }
if(buttonPressed)
  {if(imgNum>images.length-1){imgNum=0;}
  if(imgNum<0){imgNum=images.length-1;}
   displayImages();update=true; 
  }
if(picBs[0].check(mouseIsReleased)==1){paused=false; imgNum=imgNum-1; timer=millis(); buttonPressed=true;}
if(picBs[1].check(mouseIsReleased)==1){paused=!paused; buttonPressed=true; timer=millis();}
if(picBs[2].check(mouseIsReleased)==1){paused=false; imgNum++; timer=millis(); buttonPressed=true;}
mouseIsReleased=false; update=false;
}

function displayImages()
{
//background(100);
clear();
imageMode(CENTER);
var imgSize=mapMedia(images[imgNum],width,height,angles[imgNum]);
push();
translate(width/2,height/2);
rotate(angles[imgNum]*PI/180);
image(images[imgNum],0,0,imgSize[0],imgSize[1]);
pop(); 
}

function mapMedia(img, WL, HL,angle)
{
var imgW=float(img.width);
var imgH=float(img.height);
var returnWH=[0,0];
var ratio=imgH/imgW;
var w=0; var h=0;
if(angle===0 || angle ==180)
  {
  h=HL;
  w=HL/ratio;
  if(w>WL)
    {
    w=WL;
    h=WL/ratio; 
    }
  }
else if(angle==90 || angle == 270)
  {
  h=WL;
  w=WL/ratio;
  if(w>HL)
    {
    w=HL;
    h=HL*ratio;
    println("+");
    }
  }
  
returnWH[0]=w;
returnWH[1]=h;

return(returnWH);
}


