/* =========================== Start ===================== */
/* =========================== O'zgaruvchilar ===================== */
let maydon = document.querySelector('.maydon')
let kadr = 1000 / 35
let oyinchi = {
    el: false,
    x: 700,
    y: 595,
    qadam: 4,
    yurish: false,
    tamon: 1, //1 (oldinga),   2(o'nga),    3(orqaga),    4(chapga)
    w: 65,
    h: 50,
}
let oqTezlik = 10

let oraliq = {
    yurish: false,
    oq: false,
    bot: false,
    botQoshish: false,
    botOq: false,
    botxujum: false,
    olimOqi: false
}
let ochko = 0
let jon = 100
    /* =========================== Holat ===================== */
function holat() {
    if (jon == 0) {
        jon = 100
        document.querySelector('.oyinchi-joni').innerHTML = jon
        ochko = 0
        document.querySelector('.oyinchi-ochko').innerHTML = ochko
    }
    document.querySelector('.tugadi').classList.remove("active")
    oyinchi.x = maydon.getBoundingClientRect().width / 2 - oyinchi.w
    oyinchi.y = maydon.getBoundingClientRect().height - oyinchi.h - 30
    maydon.innerHTML += `<div class="oyinchi" style="left: ${oyinchi.x}px; top: ${oyinchi.y}px;"></div>`;
    oyinchi.el = document.querySelector('.oyinchi');
}
/* =========================== Oraliqlar ===================== */
function oraliqlar() {
    oraliq.yurish = setInterval(function() {
        if (oyinchi.yurish) {
            switch (oyinchi.tamon) {
                case 1: //oldinga
                    if (oyinchi.y > 3) {
                        oyinchi.y -= oyinchi.qadam;
                        oyinchi.el.style.top = `${oyinchi.y}px`;
                    }
                    break
                case 3: //orqaga
                    if (oyinchi.y < maydon.getBoundingClientRect().bottom - oyinchi.h - 22) {
                        oyinchi.y += oyinchi.qadam;
                        oyinchi.el.style.top = `${oyinchi.y}px`;
                    }
                    break
                case 2: //o'nga
                    if (oyinchi.x < maydon.getBoundingClientRect().right - oyinchi.w)
                        oyinchi.x += oyinchi.qadam;
                    oyinchi.el.style.left = `${oyinchi.x}px`;
                    break
                case 4: //chapga
                    if (oyinchi.x > 12) {
                        oyinchi.x -= oyinchi.qadam;
                        oyinchi.el.style.left = `${oyinchi.x}px`;
                    }
                    break
            }

        }
    }, kadr)
    oraliq.oq = setInterval(function() {
        let oqlar = document.querySelectorAll(".xujum")
        oqlar.forEach((oq) => {
            let yonalish = oq.getAttribute("yonalish")
            switch (yonalish) {
                case "top":
                    if (oq.getBoundingClientRect().top < 10) {
                        oq.parentNode.removeChild(oq)
                    } else { oq.style.top = oq.getBoundingClientRect().top - oqTezlik + `px`; }
                    break
                case "right":
                    if (oq.getBoundingClientRect().right + 10 > maydon.getBoundingClientRect().width - 8) {
                        oq.parentNode.removeChild(oq)
                    } else { oq.style.left = oq.getBoundingClientRect().left + oqTezlik + `px`; }
                    break
                case "bottom":
                    if (oq.getBoundingClientRect().bottom + 10 > maydon.getBoundingClientRect().height - 8) {
                        oq.parentNode.removeChild(oq)
                    } else { oq.style.top = oq.getBoundingClientRect().top + oqTezlik + `px`; }
                    break
                case "left":
                    if (oq.getBoundingClientRect().left < 10) {
                        oq.parentNode.removeChild(oq)
                    } else { oq.style.left = oq.getBoundingClientRect().left - oqTezlik + `px`; }
                    break
            }
        })
    }, kadr)
    oraliq.bot = setInterval(() => {
        let botlar = document.querySelectorAll('.bot');
        oyinchi.el = document.querySelector('.oyinchi');
        botlar.forEach((bot) => {
            const oyinchitepasi = oyinchi.el.getBoundingClientRect().top
            const oyinchiongi = oyinchi.el.getBoundingClientRect().right
            const oyinchichapi = oyinchi.el.getBoundingClientRect().left
            const oyinchipasi = oyinchi.el.getBoundingClientRect().bottom
            const bottepasi = bot.getBoundingClientRect().top
            const botongi = bot.getBoundingClientRect().right
            const botchapi = bot.getBoundingClientRect().left
            const botpasi = bot.getBoundingClientRect().bottom

            if (oyinchitepasi < botpasi &&
                oyinchipasi > bottepasi &&
                oyinchiongi > botchapi &&
                oyinchichapi < botongi) {
                urunish()
            }
            let oqlar = document.querySelectorAll('.xujum');
            oqlar.forEach((oq) => {
                let yonalish = oq.getAttribute('yonalish')
                if (yonalish === "top" || yonalish === "left" || yonalish === "right") {
                    if (oq.getBoundingClientRect().top < botpasi &&
                        oq.getBoundingClientRect().bottom > bottepasi &&
                        oq.getBoundingClientRect().right > botchapi &&
                        oq.getBoundingClientRect().left < botongi) {
                        bot.parentNode.removeChild(bot)
                        oq.parentNode.removeChild(oq)
                        ochko += 1
                        document.querySelector('.oyinchi-ochko').innerHTML = ochko

                    }
                } else {
                    if (oq.getBoundingClientRect().bottom > bottepasi && //////////////////////////////////////////////////////////////////////////// shuni korish kerak
                        oq.getBoundingClientRect().right > botchapi &&
                        oq.getBoundingClientRect().left < botongi) {
                        bot.parentNode.removeChild(bot)
                        oq.parentNode.removeChild(oq)
                        ochko += 1
                        document.querySelector('.oyinchi-ochko').innerHTML = ochko
                    }
                }
            })


            let yonalish = bot.getAttribute("yonalish")

            switch (yonalish) {

                case "right":
                    if (botongi >= maydon.getBoundingClientRect().width - 10) {
                        bot.parentNode.removeChild(bot)
                    } else {
                        bot.style.left = botchapi + 2 + `px`
                    }
                    break
                case "left": //18:50 
                    if (botchapi <= 10) {
                        bot.parentNode.removeChild(bot)
                    } else {
                        bot.style.left = botchapi - 2 + `px`
                    }
                    break
                case "top":
                    if (bottepasi <= 10) {
                        bot.parentNode.removeChild(bot)
                    } else {
                        bot.style.top = bottepasi - 2 + `px`
                    }
                    break
                case "bottom":
                    if (botpasi >= maydon.getBoundingClientRect().height - 10) {
                        bot.parentNode.removeChild(bot)
                    } else {
                        bot.style.top = bottepasi + 2 + `px`
                    }

                    break
            }
        })
    }, kadr);
    oraliq.botQoshish = setInterval(function() {
        let yonalish = randomBot(1, 5);
        console.log(yonalish)
        switch (yonalish) {
            case 1: //tepaga
                maydon.innerHTML += `<div class="bot" 
                 style="transform:rotate(-90deg); top:${maydon.getBoundingClientRect().height-oyinchi.h}px; left:${randomBot(10,maydon.getBoundingClientRect().width-100)}px" yonalish="top"></div>` //
                break
            case 2: //onga
                maydon.innerHTML += `<div class="bot" 
                style="transform:rotate(0deg); top:${randomBot(10,maydon.getBoundingClientRect().height-100)}px; left:0" yonalish="right"></div>`
                break
            case 3: //pastga 
                maydon.innerHTML += `<div class="bot" 
                     style="transform:rotate(90deg); top:0px; left:${randomBot(10,maydon.getBoundingClientRect().width-100)}px" yonalish="bottom"></div>`
                break
            case 4: //chapga
                maydon.innerHTML += `<div class="bot" 
                style="transform:rotate(-180deg);top:${randomBot(10,maydon.getBoundingClientRect().height-100)}px; left:${maydon.getBoundingClientRect().width-oyinchi.w-10}px" yonalish="left"></div>`
                break
        }

        oyinchi.el = document.querySelector('.oyinchi');
    }, 2800);
    oraliq.botOq = setInterval(() => {
        let botlar = document.querySelectorAll('.bot');
        oyinchi.el = document.querySelector('.oyinchi');
        botlar.forEach((bot) => {
            const oyinchitepasi = oyinchi.el.getBoundingClientRect().top
            const oyinchiongi = oyinchi.el.getBoundingClientRect().right
            const oyinchichapi = oyinchi.el.getBoundingClientRect().left
            const oyinchipasi = oyinchi.el.getBoundingClientRect().bottom
            const bottepasi = bot.getBoundingClientRect().top
            const botongi = bot.getBoundingClientRect().right
            const botchapi = bot.getBoundingClientRect().left
            const botpasi = bot.getBoundingClientRect().bottom
            let yonalish = bot.getAttribute("yonalish")
            switch (yonalish) {
                case "right": //chapdan o'nga
                    if (oyinchitepasi > bottepasi &&
                        oyinchitepasi < botpasi &&
                        oyinchichapi > botongi) {
                        maydon.innerHTML += `<div class="bot-xujum" yonalish="right" style="left: ${botchapi+(oyinchi.w-10)}px; top: ${bottepasi+18}px;"></div>`
                        oyinchi.el = document.querySelector('.oyinchi');
                    }
                    if (botongi >= maydon.getBoundingClientRect().width - 10) {
                        bot.parentNode.removeChild(bot)
                    } else {
                        bot.style.left = botchapi + 2 + `px`
                    }
                    break
                case "left": //18:50 //o'ngdan chapga
                    if (oyinchitepasi > bottepasi &&
                        oyinchitepasi < botpasi &&
                        oyinchichapi < botongi) {
                        maydon.innerHTML += `<div class="bot-xujum" yonalish="left" style="left: ${botchapi-(oyinchi.w)+50}px; top: ${bottepasi+23}px;"></div>`
                        oyinchi.el = document.querySelector('.oyinchi');
                    }
                    if (botchapi <= 10) {
                        bot.parentNode.removeChild(bot)
                    } else {
                        bot.style.left = botchapi - 2 + `px`
                    }
                    break
                case "top":
                    if ((oyinchiongi > bottepasi &&
                            oyinchiongi > botchapi &&
                            oyinchiongi < botongi + 50)) {
                        maydon.innerHTML += `<div class="bot-xujum" yonalish="top" style="left: ${botchapi+19}px; top: ${bottepasi-10}px;"></div>`
                        oyinchi.el = document.querySelector('.oyinchi');
                    }
                    if (bottepasi <= 10) {
                        bot.parentNode.removeChild(bot)
                    } else {
                        bot.style.top = bottepasi - 2 + `px`
                    }
                    break
                case "bottom":
                    if ((oyinchiongi > bottepasi &&
                            oyinchiongi > botchapi &&
                            oyinchiongi < botongi + 50)) {
                        maydon.innerHTML += `<div class="bot-xujum" yonalish="bottom" style="left: ${botchapi+24}px; top: ${bottepasi+50}px;"></div>`
                        oyinchi.el = document.querySelector('.oyinchi');
                    }
                    if (botpasi >= maydon.getBoundingClientRect().height - 10) {
                        bot.parentNode.removeChild(bot)
                    } else {
                        bot.style.top = bottepasi + 2 + `px`
                    }

                    break
            }
        })
    }, 400);
    oraliq.botxujum = setInterval(() => {
        let oqlar = document.querySelectorAll(".bot-xujum")
        oqlar.forEach((oq) => {
            let yonalish = oq.getAttribute("yonalish")
            switch (yonalish) {
                case "top":
                    if (oq.getBoundingClientRect().top < 10) {
                        oq.parentNode.removeChild(oq)
                    } else { oq.style.top = oq.getBoundingClientRect().top - oqTezlik / 2 + `px`; }
                    break
                case "right":
                    if (oq.getBoundingClientRect().right + 10 > maydon.getBoundingClientRect().width - 8) {
                        oq.parentNode.removeChild(oq)
                    } else { oq.style.left = oq.getBoundingClientRect().left + oqTezlik / 2 + `px`; }
                    break
                case "bottom":
                    if (oq.getBoundingClientRect().bottom + 10 > maydon.getBoundingClientRect().height - 8) {
                        oq.parentNode.removeChild(oq)
                    } else { oq.style.top = oq.getBoundingClientRect().top + oqTezlik / 2 + `px`; }
                    break
                case "left":
                    if (oq.getBoundingClientRect().left < 10) {
                        oq.parentNode.removeChild(oq)
                    } else { oq.style.left = oq.getBoundingClientRect().left - oqTezlik / 2 + `px`; }
                    break
            }
        })
    }, kadr);
    oraliq.olimOqi = setInterval(() => {
        let oqlar = document.querySelectorAll('.bot-xujum');
        oqlar.forEach((oq) => {
            const oyinchitepasi = oyinchi.el.getBoundingClientRect().top
            const oyinchiongi = oyinchi.el.getBoundingClientRect().right
            const oyinchichapi = oyinchi.el.getBoundingClientRect().left
            const oyinchipasi = oyinchi.el.getBoundingClientRect().bottom
            let yonalish = oq.getAttribute('yonalish')
            if (yonalish === "top" || yonalish === "left" || yonalish === "right") {
                if (oq.getBoundingClientRect().top < oyinchipasi &&
                    oq.getBoundingClientRect().bottom > oyinchitepasi &&
                    oq.getBoundingClientRect().right > oyinchichapi &&
                    oq.getBoundingClientRect().left < oyinchiongi) {
                    urunish()
                    oq.parentNode.removeChild(oq)
                }
            } else {
                if (oq.getBoundingClientRect().bottom > oyinchitepasi && //////////////////////////////////////////////////////////////////////////// shuni korish kerak
                    oq.getBoundingClientRect().right > oyinchichapi &&
                    oq.getBoundingClientRect().left < oyinchiongi) {
                    urunish()
                    oq.parentNode.removeChild(oq)

                }
            }
        })
    }, kadr);
}
/* =========================== Boshqaruv ===================== */
function boshqaruv() {
    document.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            case 38: //oldinga
                oyinchi.el.style.transform = "rotate(0deg)";
                oyinchi.yurish = true
                oyinchi.tamon = 1
                break;
            case 87: //oldinga
                oyinchi.el.style.transform = "rotate(0deg)";
                oyinchi.yurish = true
                oyinchi.tamon = 1
                break;
            case 40: //orqaga
                oyinchi.el.style.transform = "rotate(180deg)";
                oyinchi.yurish = true
                oyinchi.tamon = 3
                break;
            case 83: //orqaga
                oyinchi.el.style.transform = "rotate(180deg)";
                oyinchi.yurish = true
                oyinchi.tamon = 3
                break;
            case 39: //o'nga
                oyinchi.el.style.transform = "rotate(90deg)";
                oyinchi.yurish = true
                oyinchi.tamon = 2
                break;
            case 68: //o'nga
                oyinchi.el.style.transform = "rotate(90deg)";
                oyinchi.yurish = true
                oyinchi.tamon = 2
                break;
            case 37: //chapga
                oyinchi.el.style.transform = "rotate(-90deg)";
                oyinchi.yurish = true
                oyinchi.tamon = 4
                break;
            case 65: //chapga
                oyinchi.el.style.transform = "rotate(-90deg)";
                oyinchi.yurish = true
                oyinchi.tamon = 4
                break;
            case 32: //xujum
                oq()
                break;
        }
    });
    document.addEventListener('keyup', (e) => {
        if ([38, 40, 39, 37, 87, 83, 65, 68].includes(e.keyCode))
            oyinchi.yurish = false;
    })
}
/* =========================== Sensor ===================== */
function topDown() {
    oyinchi.el.style.transform = "rotate(0deg)";
    oyinchi.yurish = true
    oyinchi.tamon = 1
}

function topUp() {
    oyinchi.yurish = false;
}

function bottomDown() {
    oyinchi.el.style.transform = "rotate(180deg)";
    oyinchi.yurish = true
    oyinchi.tamon = 3
}

function bottomUp() {
    oyinchi.yurish = false;
}

function leftDown() {
    oyinchi.el.style.transform = "rotate(-90deg)";
    oyinchi.yurish = true
    oyinchi.tamon = 4
}

function leftUp() {
    oyinchi.yurish = false;
}

function rightDown() {
    oyinchi.el.style.transform = "rotate(90deg)";
    oyinchi.yurish = true
    oyinchi.tamon = 2
}

function rightUp() {
    oyinchi.yurish = false;
}

function boomDown() {
    oq()
}

/* =========================== O'q uzish ===================== */
function oq() {
    switch (oyinchi.tamon) {
        case 1:
            maydon.innerHTML += `<div class="xujum" yonalish="top" style="left: ${oyinchi.x+(oyinchi.w)/2-15}px; top: ${oyinchi.y-8}px;"></div>`

            break
        case 2:
            maydon.innerHTML += `<div class="xujum" yonalish="right" style="left: ${oyinchi.x+(oyinchi.w)-5}px; top: ${oyinchi.y+27}px;"></div>`

            break
        case 3:
            maydon.innerHTML += `<div class="xujum" yonalish="bottom" style="left: ${oyinchi.x+(oyinchi.w)/2-7}px; top: ${oyinchi.y+69}px;"></div>`

            break
        case 4:
            maydon.innerHTML += `<div class="xujum" yonalish="left" style="left: ${oyinchi.x+(oyinchi.w)/2-50}px; top: ${oyinchi.y+34}px;"></div>`

            break
    }

    oyinchi.el = document.querySelector('.oyinchi');
}
/* =========================== Random bot ===================== */
function randomBot(min, max) {
    let rand = Math.floor(Math.random() * (max - min)) + min
    return rand
}
/* =========================== Urunish o'yin() ===================== */
function urunish() {
    clearInterval(oraliq.yurish);
    clearInterval(oraliq.oq);
    clearInterval(oraliq.bot);
    clearInterval(oraliq.botQoshish);
    clearInterval(oraliq.botOq);
    clearInterval(oraliq.botxujum);
    clearInterval(oraliq.olimOqi);

    let botlar = document.querySelectorAll('.bot');

    botlar.forEach((bot) => {
        bot.parentNode.removeChild(bot);
    });
    let oq = document.querySelectorAll('.xujum');

    oq.forEach((oq) => {
        oq.parentNode.removeChild(oq);
    });
    let oqlar = document.querySelectorAll('.bot-xujum');

    oqlar.forEach((oq) => {
        oq.parentNode.removeChild(oq);
    });

    oyinchi.el.parentNode.removeChild(oyinchi.el);

    if (jon < 20) {
        jon = 0
        return tugadi()
    }
    jon = jon - randomBot(Math.floor(jon / 2), Math.floor(jon))
    document.querySelector('.oyinchi-joni').innerHTML = jon


    oyin();
}
/* =========================== Tugadi() ===================== */
function tugadi() {
    document.querySelector('.tugadi').classList.add("active")
}
/* =========================== O'yin() ===================== */
function oyin() {
    holat()
    boshqaruv()
    oraliqlar()
}
oyin()
