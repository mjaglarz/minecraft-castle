let castleLength = 15
let gateLength = 3
let gateHeight = 3
let wallHeight1 = 4
let wallHeight2 = 1
let towerLength = 4
let towerHeight = 8
let windowsNumber = 2
let moatDepth = 3
let bridgeLength = 8


function createSquare(length: number, height: number, material: Block) {
    createWall(length, 0, height, material)
    createWall(0, length, height, material)
    createWall(-length, 0, height, material)
    createWall(0, -length, height, material)
}

function createWall(x: number, z: number, height: number, material: Block) {
    builder.mark()
    builder.shift(x, 0, z)
    builder.raiseWall(material, height)
}

function createTowers(length: number, height: number, castleLength: number, material: Block) {
    createTower(length, height, material)
    builder.move(FORWARD, castleLength-length)
    createTower(length, height, material)
    builder.turn(LEFT_TURN)
    builder.move(FORWARD, castleLength-length)
    builder.move(LEFT, -length)
    createTower(length, height, material)
    builder.move(LEFT, castleLength-length)
    createTower(length, height, material)
    builder.move(LEFT, -length)
    builder.move(BACK, -length)
}

function createTower(length: number, height: number, material: Block) {
    builder.mark()
    for (let index = 0; index < 4; ++index) {
        builder.move(FORWARD, length)
        builder.turn(LEFT_TURN)
    }
    builder.raiseWall(material, height)
}

function createGate(length: number, height: number, material: Block) {
    builder.mark()
    builder.move(RIGHT, length)
    builder.raiseWall(material, height)
}

function createAllWindows(length: number, windowsNumber: number, material: Block) {
    for (let index = 0; index < 4; ++index) {
        createWindowsSide(windowsNumber, material)
        builder.move(FORWARD, 1)
        builder.turn(LEFT_TURN)
        builder.move(FORWARD, 1)
        createWindowsSide(windowsNumber, material)

        builder.move(FORWARD, length)
    }
}

function createWindowsSide(windowsNumber: number, material: Block){
    createWindows(windowsNumber, material)
    builder.move(FORWARD, 1)
    createWindows(windowsNumber, material)
}

function createWindows(windowsNumber: number, material: Block) {
    for (let index = 0; index < windowsNumber; ++index) {
        builder.place(material)
        builder.move(DOWN, 1)
    }
    builder.move(UP, windowsNumber)
}

function createBridge(length: number, material: Block) {
    for (let index = 0; index < length; ++index) {
        builder.place(material)
        builder.move(RIGHT, 1)
    }
}

function createColumn(height1: number, height2: number, material1: Block, material2: Block) {
    builder.mark()
    builder.raiseWall(material1, height1)
    builder.move(UP, height1)
    builder.mark()
    builder.raiseWall(material2, height2)
}

function createLadder(height: number) {
    for (let index = 0; index < height; ++index) {
         builder.place(LADDER)
         builder.move(UP, 1)
    }
}

player.onChat("castle", function () {
    builder.teleportTo(pos(-5, 0, castleLength/2-1))
    
    //Inner castle
    createSquare(castleLength-1, wallHeight1, STONE_BRICKS)
    builder.shift(-1, 0, -1)
    createSquare(castleLength-1, wallHeight1, STONE_BRICKS)

    //Outer castle
    createSquare(castleLength, wallHeight1, STONE_BRICKS)
    builder.move(UP, wallHeight1)
    createSquare(castleLength, wallHeight2, PLANKS_OAK)

    //Towers
    builder.move(DOWN, wallHeight1)
    createTowers(towerLength-1, towerHeight, castleLength, MOSSY_STONE_BRICKS)

    //Gate
    builder.move(BACK, castleLength-1)
    createGate(gateLength, gateHeight, IRON_BARS)
    builder.move(BACK, 1)
    builder.move(LEFT, gateLength)
    createGate(gateLength, gateHeight, IRON_BARS)

    //Windows
    builder.move(RIGHT, towerLength)
    builder.move(UP, towerHeight-2)
    builder.turn(RIGHT_TURN)
    createAllWindows(castleLength-towerLength, windowsNumber, GLASS)

    //Moat
    builder.turn(LEFT_TURN)
    builder.move(RIGHT, towerLength-1)
    builder.move(DOWN, towerHeight+1)
    builder.move(BACK, 1)
    createSquare(castleLength+2, moatDepth, WATER)

    //Bridge
    builder.move(LEFT, castleLength-towerLength+1)
    builder.move(UP, moatDepth-1)
    createBridge(bridgeLength, PLANKS_DARK_OAK)

    //Columns
    builder.move(LEFT, 1)
    builder.move(UP, 1)
    createColumn(wallHeight1, wallHeight2+1, STONE_BRICKS, PLANKS_OAK)
    builder.move(LEFT, bridgeLength-1)
    builder.move(DOWN, wallHeight1)
    createColumn(wallHeight1, wallHeight2+1, STONE_BRICKS, PLANKS_OAK)
    
    //Ladders
    builder.move(RIGHT, bridgeLength-2)
    builder.move(DOWN, wallHeight1)
    createLadder(wallHeight1+wallHeight2)
    builder.move(RIGHT, 1)
    builder.move(FORWARD, 1)
    createLadder(towerHeight-(wallHeight1+wallHeight2))
})