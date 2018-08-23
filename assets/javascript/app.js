let samusHP = 100
let enemyHP = 100
let gameOver = false
let enemies = ['Ridley', 'Kraid', 'Mother Brain']
let battlePhase = 0;
let samusDamage = 0;
let samusBonus = 0;
let enemyDamage = 0;
let currentEnemy = '';

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
            break
        case 3:

        case 5:
            displayDamage()
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
    let enemyChoice = Math.floor(Math.random() * enemies.length) + 1
    currentEnemy = enemies[enemyChoice - 1]
    $('#enemyName').text(currentEnemy)
    $('#enemy1').attr('src', 'assets/images/enemy' + enemyChoice + '.png')
    enemies[enemyChoice - 1] = ''
    $('#message').css("visibility", "hidden")
    if (battlePhase === 0) {
        enemyHP = 100
    } else {
        enemyHP = battlePhase * 100
    }
}



function attack() {

}

function displayDamage() {
    $("#enemyDT").text("-" + samusDamage)
    $("#enemyDT").show()
    $("#enemyDT").animate({ top: '250px', opacity: 0 }, 1000)
    enemyHP -= samusDamage
    $('#enemyHP1').text(enemyHP)
    console.log(`Enemy HP: ${enemyHP}`)
    console.log(`Enemy damage taken: ${samusDamage}`)
    checkEnemyHealth()
    enemyDamage = Math.floor(Math.random() * 15)
    $("#samusDT").text("-" + enemyDamage)
    $("#samusDT").show()
    $("#samusDT").animate({ top: '250px', opacity: 0 }, 1000)
    samusHP -= enemyDamage
    console.log(`Samus HP: ${samusHP}`)
    console.log(`Samus damage taken: ${enemyDamage}`)
    $('#samusHP').text(samusHP)
    checkSamusHealth()
    samusDamage += samusBonus
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
    battlePhase++
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