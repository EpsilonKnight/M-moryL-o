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
let tabImaqueCliquee1 = [];
let tabImaqueCliquee2 = [];
const imgWidth = 120;
const imgHeight = 160;




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
    ctx.strokeStyle = "gold";
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
    tabImaqueCliquee1 = [imageCliquee, x * largeImg + x0, y * hautImg + y0, imgWidth, imgHeight];

    dessine();
}

function dessinImageCliquee(ctx) {
    if (tabImaqueCliquee1.length > 0) {
        ctx.drawImage(tabImaqueCliquee1[0], tabImaqueCliquee1[1], tabImaqueCliquee1[2], tabImaqueCliquee1[3], tabImaqueCliquee1[4])
    }
}





function dessine() {
    dessineImage(ctx, tabImgTrouvees);
    dessinImageCliquee(ctx);
    dessinGrille(ctx);
}

window.onload = () => {
    dessine();
}