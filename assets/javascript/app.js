let samusHP = 100
let enemyHP = 100
let gameOver = false
let enemies = ['Ridley', 'Kraid', 'Mother Brain']
let battlePhase = 0;
let samusDamage = 0;
let samusBonus = 0;
let enemyDamage = 0;
let currentEnemy = '';
let enemyChoice = Math.floor(Math.random() * enemies.length) + 1

$('.attack').on('click', function () {
    switch (battlePhase) {
        case 0:
            samusDamage = Math.floor(Math.random() * 10)
            samusBonus = Math.floor(Math.random() * 10) + 5
            displayDamage()
            battlePhase++
            break
        case 1:
            displayDamage()
            displayDamage1()
            break
        case 3:
            displayDamage()
            displayDamage1()
            break
        case 5:
            displayDamage()
            displayDamage1()
            break
        case -1:
            reset()
            break
        case 2:
            bossSetup()
            break
        case 4:
            bossSetup()
            break
        case 6:
            reset()
            break

    }
})

$(document).ready(function () {
    bossSetup()
})

function bossSetup() {
    
    currentEnemy = enemies[enemyChoice - 1]
    $('#enemyName').text(currentEnemy)
    $('#enemy1').attr('src', 'assets/images/enemy' + enemyChoice + '.png')
    $('#message').css("visibility", "hidden")
    if (battlePhase === 0) {
        enemyHP = 100
    } else if (battlePhase === 2) {
        enemyHP = 200
    } else if (battlePhase === 4) {
        enemyHP = 400
    }
}



function attack() {

}

function displayDamage() {
    // displays damage taken by ENEMY, animates, and updates hp
    $(".enemyDT").text("-" + samusDamage)
    $(".enemyDT").show()
    $(".enemyDT").animate({ top: '250px', opacity: 0 }, 1000)
    enemyHP -= samusDamage
    $('#enemyHP1').text(enemyHP)

    // log for testing purposes
    console.log(`Enemy HP: ${enemyHP}`)
    console.log(`Enemy damage taken: ${samusDamage}`)
    checkEnemyHealth()
    //checkEnemyHealth() just adds button logic & functionality

    // calculate enemyDamage, display next to samus, animate, update HP
    enemyDamage = Math.floor(Math.random() * 15)
    $(".samusDT").text("-" + enemyDamage)
    $(".samusDT").show()
    $(".samusDT").animate({ top: '250px', opacity: 0 }, 1000)
    samusHP -= enemyDamage
    $('#samusHP').text(samusHP)

    // log for testing purposes
    console.log(`Samus HP: ${samusHP}`)
    console.log(`Samus damage taken: ${enemyDamage}`)
    
    checkSamusHealth()
    samusDamage += samusBonus
}

function displayDamage1() {
    $(".enemyDT").css("opacity", "1")

}


function checkEnemyHealth() {
    if (enemyHP <= 0) {
        defeatBoss()
    }
}

function checkSamusHealth() {
    if (samusHP <= 0) {
        lose()
    }
}

function defeatBoss() {
    // increment battlePhase, change button appropriately if boss is defeated
    battlePhase++
    console.log(battlePhase)
    enemies[enemyChoice - 1] = ''
    $('#enemyHP1').text(0)
    $('#message').text('Victory! Your next challenger awaits.')
    $('#message').css("visibility", "visible")
    if (battlePhase === 6) {
        $('#button').text('Start Over')
    } else {
        $('#button').text('Next Boss')
    }
}

function lose() {
    $('#message').text('You lose! Press the button to try again.')
    battlePhase = -1
}

// 0 set up boss
// 1 fighting first boss
// 2 defeated first boss, display 'victory! your next challenge awaits.'
// victory message displayed once enemy hp <= 0, not on click
// 3 set up second boss with new hp (200), DO NOT CALCULATE ANY DAMAGE HERE
// 1 repeat 1
//  repeat 2
//  set up third boss with new hp (400), DO NOT CALCULATE ANY DAMAGE HERE
//  repeat 1
//  repeat 2
//  