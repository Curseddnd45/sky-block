namespace SpriteKind {
    export const map = SpriteKind.create()
}
function SrtNxtLvl () {
    x = 20
    info.setLife(3)
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    NowLvl += 1
    if (NowLvl == 1) {
        tiles.setTilemap(tilemap`platformer1`)
    } else if (NowLvl == 2) {
        tiles.setTilemap(tilemap`platformer1`)
    } else {
        game.over(true)
    }
    scene.setBackgroundColor(6)
    mySprite = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......fd1111111f.......
        ......fdd1111111df......
        ......fddd111111df......
        ......fdddddd111df......
        ......fbddddbfd1df......
        ......fcbbbdcfddbf......
        .......fcbb11111f.......
        ........fffff1b1f.......
        ........fb111cfbf.......
        ........ffb1b1ff........
        ......f.fffbfbf.........
        ......ffffffff..........
        .......fffff............
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Player)
    controller.moveSprite(mySprite, 100, 0)
    mySprite.ay = 500
    scene.cameraFollowSprite(mySprite)
    tiles.placeOnRandomTile(mySprite, sprites.builtin.forestTiles0)
    for (let value of tiles.getTilesByType(sprites.swamp.swampTile13)) {
        HehehawEnemy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . c c c c . . 
            . c c c c c . c c c c c f c c . 
            c c a c c c c c 8 f f c f f c c 
            c a f a a c c a f f c a a f f c 
            c a 8 f a a c a c c c a a a a c 
            c b c f a a a a a c c c c c c c 
            c b b a a c f 8 a c c c 8 c c c 
            . c b b a b c f a a a 8 8 c c . 
            . . . . a a b b b a a 8 a c . . 
            . . . . c b c a a c c b . . . . 
            . . . . b b c c a b b a . . . . 
            . . . . b b a b a 6 a . . . . . 
            . . . . c b b b 6 6 c . . . . . 
            . . . . . c a 6 6 b c . . . . . 
            . . . . . . . c c c . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(HehehawEnemy, value)
        HehehawEnemy.ay = 500
        HehehawEnemy.follow(mySprite, 30)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -200
})
scene.onOverlapTile(SpriteKind.Player, sprites.swamp.swampTile1, function (sprite, location) {
    SrtNxtLvl()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -200
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.forestTiles10, function (sprite, location) {
    game.over(false, effects.melt)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (mySprite.bottom < otherSprite.y) {
        mySprite.vy = -150
    } else {
        info.changeLifeBy(-1)
    }
})
let myMinimap: minimap.Minimap = null
let mySprite2: Sprite = null
let HehehawEnemy: Sprite = null
let mySprite: Sprite = null
let NowLvl = 0
let x = 0
SrtNxtLvl()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            if (value.vx < 0 && (value.tileKindAt(TileDirection.Left, sprites.castle.tilePath3) || value.tileKindAt(TileDirection.Left, sprites.castle.tilePath6))) {
                value.vy = -250
            } else if (value.vx > 0 && (value.tileKindAt(TileDirection.Right, sprites.castle.tilePath1) || value.tileKindAt(TileDirection.Right, sprites.castle.tilePath4))) {
                value.vy = -250
            }
        } else if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = 30
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = -30
        }
    }
})
game.onUpdateInterval(1, function () {
    sprites.destroy(mySprite2)
    myMinimap = minimap.minimap(MinimapScale.Eighth, 2, 0)
    mySprite2 = sprites.create(minimap.getImage(myMinimap), SpriteKind.map)
    mySprite2.setPosition(scene.cameraProperty(CameraProperty.X) - x, scene.cameraProperty(CameraProperty.Y) - 55)
    minimap.includeSprite(myMinimap, mySprite)
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        minimap.includeSprite(myMinimap, value)
    }
})
forever(function () {
    if (info.life() == 2) {
        x = 28
    }
})
forever(function () {
    if (info.life() == 1) {
        x = 38
    }
})
