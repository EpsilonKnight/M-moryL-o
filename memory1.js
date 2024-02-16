// Création du contexte graphique

const cvs = document.getElementById("zone-de-dessin");
cvs.width = 800;
cvs.height = 850;
// contexte graphique 2d associé au canvas
const ctx = cvs.getContext("2d");
const largeImg = 120;
const hautImg = 160;
const x0 = 10;
const y0 = 10;



//création des images
for(let i=0; i<=8; i++){
  window["img" +i] = new Image();
  window["img" +i].src = "images/img" + i + ".jpg";
  
}

// Stockage dans un tableau
const tabImages = []
for(let i=0; i<=7; i++ ){
    tabImages[2*i] = window["img" + (i+1)];
    tabImages[2*i+1] = window["img" + (i+1)]; // on crée le double des images
}

//Mélande aléatoire des cartes
tabImages.sort(() => Math.random() -0.5);

// Dessin des images vignettes
function dessineImage(ctx, tabImg){

    //Définir la taille des image
    const imgWidth = 120;
    const imgHeight = 160;

    for(let i=0; i<=3 ; i++){
        ctx.drawImage(tabImg[i], x0 +i*largeImg, y0, imgWidth, imgHeight)
        ctx.drawImage(tabImg[4+i], x0 +i*largeImg, y0 + hautImg, imgWidth, imgHeight)
        ctx.drawImage(tabImg[8+i], x0 +i*largeImg, y0 + 2*hautImg, imgWidth, imgHeight)
        ctx.drawImage(tabImg[12+i], x0 +i*largeImg, y0 + 3*hautImg, imgWidth, imgHeight)
    }
}

//Dessin de la grille
function dessinGrille(ctx){
    ctx.strokeStyle = "gold";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for(let i=0; i<=4 ; i++){
        //lignes verticales
        ctx.moveTo(x0 +i*largeImg, y0)
        ctx.lineTo(x0 +i*largeImg, y0 + 4*hautImg);
        //lingnes horizontales
        ctx.moveTo(x0, y0 + i*hautImg)
        ctx.lineTo(x0 + 4*largeImg, y0 + i*hautImg);
    }
    ctx.stroke();
}

function dessine(){
    dessineImage(ctx, tabImages);
    dessinGrille(ctx);
}

window.onload = () => {
    dessine();
}