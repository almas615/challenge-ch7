// pilihan com

function reset() {
    tampilanVS.style.removeProperty("display");
    boxHasil.style.display = "none";
    playerItems.forEach(function(item) {
        item.style.removeProperty("background-color");
    });
    compItems.forEach(function(item) {
        item.style.removeProperty("background-color");
    });
}

function acakComp() {
    let i = 0
    
    let acak = setInterval(function () {
        compItems.forEach(function(item,index){
            (i==index)? item.style.backgroundColor = "#C4C4C4" : item.style.removeProperty("background-color");
        });
        i++;
        if ( i == compItems.length) return i = 0 ;
        
    },150);
    setTimeout(function() {
        clearInterval(acak)
    },1000)
}

function PilihanCom() {
    const comp = Math.floor(Math.random() * 11);
    if(comp <= 3) return 0; /* batu */
    if(comp > 3 && comp <= 6) return 1; /* kertas */
    return 2; /* gunting */
}

function rule(player,comp) {
    if(player == comp) return "seri";
    if(player == 0) return (comp == 1)? "kalah" : "menang" ;
    if(player == 1) return (comp == 0)? "menang" : "kalah" ;
    if(player == 2) return (comp == 1)? "menang" : "kalah" ;
}

function ubahBgItems(itemBg, i) {
    itemBg.forEach(function (bgItem,bgI) {
        if (i == bgI) {
            bgItem.style.backgroundColor = "#C4C4C4";
        } else{
            bgItem.style.removeProperty("background-color");
        }
    });
}

function ubahStatus(hasil) {
    if (hasil=="menang") {
        tampilanVS.style.display="none";
        boxHasil.style.removeProperty("display");
        boxHasil.style.backgroundColor = "#4C9654";
        playerName.innerText = "player 1 \n win";
        
    }
    else if (hasil == "kalah" ) {
        tampilanVS.style.display="none";
        boxHasil.style.removeProperty("display");
        boxHasil.style.backgroundColor = "#4C9654";
        playerName.innerText = "com \n win";
        
    } else {
        tampilanVS.style.display="none";
        boxHasil.style.removeProperty("display");
        boxHasil.style.backgroundColor = "#035B0C";
        playerName.innerText = "draw ";
        
    }
}


const tampilanVS = document.getElementById("vs");
const boxHasil = document.getElementById("boxHasil");
const playerName = document.getElementById("playerName");

var playerItems = document.querySelectorAll(".item-content.player");
var compItems = document.querySelectorAll(".item-content.comp");  
reset();


playerItems.forEach(function(item,i) {
    item.addEventListener("click", function() {
        ubahBgItems(playerItems,i);
        acakComp();
        setTimeout(function() {
            const comp = PilihanCom();
            ubahBgItems(compItems,comp)
            const player = i;
            const hasil = rule(player,comp);
            ubahStatus(hasil);
        },1000);
    });
});

