// Création du contexte graphique

const cvs = document.getElementById("zone-de-dessin");
cvs.width = 800;
cvs.height = 850;


// contexte graphique 2d associé au canvas
const ctx = cvs.getContext("2d");
const largeImg = 120;
const hautImg = 160;
const x0 = 10; //décalage pixel
const y0 = 10;
let tabImaqueCliquee1 = [];
let tabImaqueCliquee2 = [];
const imgWidth = 120;
const imgHeight = 160;
let compteurImg = 0
let compteurImgTrouvees = 0
let finDeJeu = false

//Création des sons
const sonClick = new Audio();
sonClick.src = "sons/piece.wav"
const sonDouble = new Audio();
sonDouble.src = "sons/up.wav"
const sonFindeJeu = new Audio();
sonFindeJeu.src = "sons/monde-termine.wav"
// Réduire le volume des sons à 50%
sonClick.volume = 0.1;
sonDouble.volume = 0.5;
sonFindeJeu.volume = 0.3;

const imgFin = new Image();
imgFin.src = "images/finLeo.jpg";

//calcul du nombre de clic
let nbOfClick = 0;


//création des images
for (let i = 0; i <= 8; i++) {
    window["img" + i] = new Image();
    window["img" + i].src = "images/img" + i + ".jpg";

}

// Stockage dans un tableau
const tabImages = []
for (let i = 0; i <= 7; i++) {
    tabImages[2 * i] = window["img" + (i + 1)];
    tabImages[2 * i + 1] = window["img" + (i + 1)]; // on crée le double des images
}

//Mélande aléatoire des cartes
tabImages.sort(() => Math.random() - 0.5);

// Création du tableau des images trouvées
const tabImgTrouvees = []
for (let i = 0; i <= 15; i++) {
    tabImgTrouvees[i] = img0;
}

// Dessin des images vignettes
function dessineImage(ctx, tabImg) {

    //Définir la taille des image


    for (let i = 0; i <= 3; i++) {
        ctx.drawImage(tabImg[i], x0 + i * largeImg, y0, imgWidth, imgHeight)
        ctx.drawImage(tabImg[4 + i], x0 + i * largeImg, y0 + hautImg, imgWidth, imgHeight)
        ctx.drawImage(tabImg[8 + i], x0 + i * largeImg, y0 + 2 * hautImg, imgWidth, imgHeight)
        ctx.drawImage(tabImg[12 + i], x0 + i * largeImg, y0 + 3 * hautImg, imgWidth, imgHeight)
    }
}

//Dessin de la grille
function dessinGrille(ctx) {
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= 4; i++) {
        //lignes verticales
        ctx.moveTo(x0 + i * largeImg, y0)
        ctx.lineTo(x0 + i * largeImg, y0 + 4 * hautImg);
        //lingnes horizontales
        ctx.moveTo(x0, y0 + i * hautImg)
        ctx.lineTo(x0 + 4 * largeImg, y0 + i * hautImg);
    }
    ctx.stroke();
}

// Action souris sur la zone de dessin
cvs.addEventListener("click", infoImageCliquee);
function infoImageCliquee(e) {
    if(e.clientX > x0 && e.clientX < x0 + 4*largeImg  && e.clientY > y0 && e.clientY < y0 + 4*hautImg){
        sonClick.play();
        if (finDeJeu === false) {
            // lors du console.log le click sur la bordur represente 18 en x et 18 en y donc decallage de 8 px
            const decalageSouris = 8
            let x = Math.floor((e.clientX - decalageSouris) / largeImg); // convertir en entier
            let y = Math.floor((e.clientY - decalageSouris) / hautImg);
    
            let imageCliquee;
            // console.log(x,"   ",y) 
            // pour reconnaitre les coodonnées
    
            if (y === 0) {
                switch (x) {
                    case 0: imageCliquee = tabImages[0];
                        break;
                    case 1: imageCliquee = tabImages[1];
                        break;
                    case 2: imageCliquee = tabImages[2];
                        break;
                    case 3: imageCliquee = tabImages[3];
                        break;
    
                }
            }
            else if (y === 1) {
                switch (x) {
                    case 0: imageCliquee = tabImages[4];
                        break;
                    case 1: imageCliquee = tabImages[5];
                        break;
                    case 2: imageCliquee = tabImages[6];
                        break;
                    case 3: imageCliquee = tabImages[7];
                        break;
    
                }
            }
            else if (y === 2) {
                switch (x) {
                    case 0: imageCliquee = tabImages[8];
                        break;
                    case 1: imageCliquee = tabImages[9];
                        break;
                    case 2: imageCliquee = tabImages[10];
                        break;
                    case 3: imageCliquee = tabImages[11];
                        break;
    
                }
            }
            else if (y === 3) {
                switch (x) {
                    case 0: imageCliquee = tabImages[12];
                        break;
                    case 1: imageCliquee = tabImages[13];
                        break;
                    case 2: imageCliquee = tabImages[14];
                        break;
                    case 3: imageCliquee = tabImages[15];
                        break;
    
                }
            }
    
            if (compteurImg === 0) {
                tabImaqueCliquee1 = [imageCliquee, x * largeImg + x0, y * hautImg + y0, imgWidth, imgHeight];
                tabImaqueCliquee2 = [];
                compteurImg = 1
            } else if (x * largeImg + x0 !== tabImaqueCliquee1[1] || y * hautImg + y0 !== tabImaqueCliquee1[2]) {
                //condition si on est sur la meme absisse et la meme ordonnée
                tabImaqueCliquee2 = [imageCliquee, x * largeImg + x0, y * hautImg + y0, imgWidth, imgHeight]
                compteurImg = 0
                nbOfClick++ // incrémentation de 1 lorsque il y a deux clique quil soit bon ou mauvais
                miseAJourtabImgTrouvee();
                if(compteurImgTrouvees <16){
                    setTimeout(miseAJourImages, 400);
                }else{
                    miseAJourImages();
                }
            }
            dessine();
    
        }else{
            setTimeout(rechargeLeJeu, 500);
        }
    }

    
}

function rechargeLeJeu(){
    finDeJeu = false;
    location.reload();
}

function miseAJourImages() {
    if (compteurImgTrouvees < 16) {
        dessineImage(ctx, tabImgTrouvees);
        dessinGrille(ctx);
    } else {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(imgFin, x0, y0, 4 * largeImg, 4 * hautImg);
        dessinGrille(ctx);
    }
}

function dessinImageCliquee(ctx) {
    if (tabImaqueCliquee1.length > 0) {
        ctx.drawImage(tabImaqueCliquee1[0], tabImaqueCliquee1[1], tabImaqueCliquee1[2], tabImaqueCliquee1[3], tabImaqueCliquee1[4])
    }
    if (tabImaqueCliquee2.length > 0) {
        ctx.drawImage(tabImaqueCliquee2[0], tabImaqueCliquee2[1], tabImaqueCliquee2[2], tabImaqueCliquee2[3], tabImaqueCliquee2[4])
    }
}

function miseAJourtabImgTrouvee() {
    if (tabImaqueCliquee1.length > 0 && tabImaqueCliquee2.length > 0) {
        if (tabImaqueCliquee1[0] === tabImaqueCliquee2[0]) {
            sonDouble.play(); //activer le son
            for (let i = 0; i < tabImages.length; i++) {
                if (tabImages[i] === tabImaqueCliquee1[0]) {
                    tabImgTrouvees[i] = tabImaqueCliquee1[0];
                    tabImaqueCliquee1 = [];
                    compteurImgTrouvees++;
                } else if (tabImages[i] === tabImaqueCliquee2[0]) {
                    tabImgTrouvees[i] = tabImaqueCliquee2[0];
                    tabImaqueCliquee2 = [];
                    compteurImgTrouvees++;
                }
            }
        }
    }
}
function debutDuJeu(){
    ctx.fillStyle = "black";
    ctx.font= "25px Arial, Serif";
    ctx.fillText("Cliquer sur une case pour commencer !!!" , 30 , 700)
}





function dessine() {
    if (compteurImgTrouvees < 16) {
        ctx.clearRect(0,0, cvs.width , cvs.height);
        dessineImage(ctx, tabImgTrouvees);
        dessinImageCliquee(ctx);        
        dessinGrille(ctx);
    } else {
        finDeJeu = true
        audio1.pause(); //stoper si il a gagner le jeu
        audio2.pause();
        audio3.pause();
        sonFindeJeu.play();
        ctx.font = "50px Arial, serif"
        ctx.fillText("Léo tu es trop fort !!!" , 40, 695);
        ctx.font = "15px Arial , serif";
        ctx.fillText("Nombre de clics : " + nbOfClick, 30, 730);
        ctx.font = "25px Arial , serif";
        ctx.fillText("Cliquer sur la grille pour recommencer" , 30, 760);
    }

}

window.onload = () => {
    dessine();
    debutDuJeu();
}