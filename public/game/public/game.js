window.userList = {
    len: 0,
};

window.userArr = [];

function createUser(userInfo) {
    window.userList.len++;
    window.userList[userInfo.uniqueId] = userInfo;
}

let game;
let gameOptions = {
    gemSize: 100,
    rotateSpeed: 100,
    fallSpeed: 100,
    destroySpeed: 200,
    boardOffset: {
        x: 0,
        y: 0,
    },
    rows: 26,
    cols: 14,
    ballSpeed: 200,
    balls: window.userList.length,
    ballRadius: 20,
    growRate: 1,
};

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            parent: "thegame",
            width: 750,
            height: 1334,
        },
        physics: {
            default: "arcade",
        },
        scene: playGame,
    };
    game = new Phaser.Game(gameConfig);
    window.focus();
};
class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    preload() {
        this.load.spritesheet("gems", "assets/sprites/gems.png", {
            frameWidth: gameOptions.gemSize,
            frameHeight: gameOptions.gemSize,
        });

        this.load.spritesheet("diamond", "assets/sprites/diamonds32x24x5.png", {
            frameWidth: 32,
            frameHeight: 24,
        });

        for (let item of window.userArr) {
            createUser(item);
            this.load.image(item.uniqueId, item.profilePictureUrl);
        }
    }
    create() {
        this.match3 = new Match3({
            rows: gameOptions.rows,
            columns: gameOptions.cols,
            items: 4,
        });

        this.lockNumber = 0;

        this.result = [];
        for (let i = 0; i < gameOptions.rows; i++) {
            this.result[i] = [];
            for (let j = 0; j < gameOptions.cols; j++) {
                this.result[i][j] = false;
            }
        }
        this.match3.generateField();
        this.canPick = true;
        this.drawField();
        this.add.sprite(50, 50, "diamond", 1).setScale(2);
        this.add.sprite(650, 50, "diamond", 2).setScale(2);
        this.add.sprite(50, 1150, "diamond", 3).setScale(2);
        this.add.sprite(650, 1150, "diamond", 4).setScale(2);
        this.drwaAvatar();
        // this.input.on("pointerdown", this.gemSelect, this);

        const tid = setInterval(() => {
            this.updateUser();
        }, 1000);
    }

    updateUser() {
        let gameArea = new Phaser.Geom.Rectangle(
            0,
            0,
            game.config.width,
            game.config.width
        );
        const arr = window.userArr.slice(window.userList.len);
        for (let i in arr) {
            let randomPosition = Phaser.Geom.Rectangle.Random(gameArea);
            let directionVector = Phaser.Math.RandomXY(
                new Phaser.Math.Vector2(),
                gameOptions.ballSpeed
            );
            createUser(arr[i]);

            this.load.once(
                "complete",
                () => {
                    let ball = this.ballGroup.create(
                        randomPosition.x,
                        randomPosition.y,
                        arr[i].uniqueId
                    );

                    window.userList[arr[i].uniqueId].ball = ball;

                    ball.setCircle(150);
                    ball.camp = window.userList.len % 4;
                    ball.setCollideWorldBounds(true);
                    ball.setVelocity(directionVector.x, directionVector.y);
                    ball.setBounce(1);
                    ball.setDisplaySize(50, 50);
                },
                this
            );
            this.load.image(arr[i].uniqueId, arr[i].profilePictureUrl);
            this.load.start();
        }
    }

    update() {
        const arr = this.ballGroup.getChildren();
        for (let i = 0; i < arr.length; i++) {
            let row = Math.floor(
                (arr[i].y - gameOptions.boardOffset.y) / (gameOptions.gemSize / 2)
            );
            let col = Math.floor(
                (arr[i].x - gameOptions.boardOffset.x) / (gameOptions.gemSize / 2)
            );

            if (this.match3.validPick(row, col)) {
                this.tweens.add({
                    targets: this.match3.customDataOf(row, col),
                    angle: 90,
                    duration: gameOptions.rotateSpeed,
                    callbackScope: this,
                    onComplete: function() {
                        this.match3.customDataOf(row, col).angle = 0;
                        // this.match3.incValueAt(row, col);
                        this.match3.customDataOf(row, col).setFrame(arr[i].camp);
                    },
                });
            }
            try {
                this.result[row][col] = true;
            } catch {}
        }
    }
    handleRestart() {
        if (this.lockNumber === gameOptions.rows * gameOptions.cols) {
            this.scene.restart();
        }
    }
    drwaAvatar() {
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height);
        this.ballGroup = this.physics.add.group();
        this.shapeArr = [];

        let gameArea = new Phaser.Geom.Rectangle(
            0,
            0,
            game.config.width,
            game.config.width
        );
        for (let i = 0; i < window.userArr.length; i++) {
            let randomPosition = Phaser.Geom.Rectangle.Random(gameArea);
            let directionVector = Phaser.Math.RandomXY(
                new Phaser.Math.Vector2(),
                gameOptions.ballSpeed
            );
            let ball = this.ballGroup.create(
                randomPosition.x,
                randomPosition.y,
                window.userArr[i].uniqueId
            );

            window.userList[window.userArr[i].uniqueId].ball = ball;

            ball.setCircle(150);
            ball.camp = i % 4;
            ball.setCollideWorldBounds(true);
            ball.setVelocity(directionVector.x, directionVector.y);
            ball.setBounce(1);

            const shape1 = this.make.graphics().fillCircle(0, 0, 20);
            const geomask1 = shape1.createGeometryMask();
            //   ball.setMask(geomask1);
            this.shapeArr.push(shape1);

            // ball.setScale(0.8);

            ball.setDisplaySize(50, 50);
            //   ball.setCrop(0,0,10,20)
            // ball.setSize(50,50)
        }

        // this.ballGroup.setBlendMode('ERASE')
        this.physics.add.collider(this.ballGroup);
    }
    drawField() {
        this.poolArray = [];
        for (let i = 0; i < this.match3.getRows(); i++) {
            for (let j = 0; j < this.match3.getColumns(); j++) {
                let gemX =
                    gameOptions.boardOffset.x +
                    (gameOptions.gemSize / 2) * j +
                    gameOptions.gemSize / 2 / 2;
                let gemY =
                    gameOptions.boardOffset.y +
                    (gameOptions.gemSize / 2) * i +
                    gameOptions.gemSize / 2 / 2;
                let gem;
                let halfRows = this.match3.rows / 2;
                let halfColumns = this.match3.columns / 2;
                // gem = this.add.sprite(gemX, gemY, "gems", 0);
                if (i < halfRows && j < halfColumns) {
                    gem = this.add.sprite(gemX, gemY, "gems", 0);
                }
                if (i < halfRows && j >= halfColumns) {
                    gem = this.add.sprite(gemX, gemY, "gems", 1);
                }
                if (i >= halfRows && j < halfColumns) {
                    gem = this.add.sprite(gemX, gemY, "gems", 2);
                }
                if (i >= halfRows && j >= halfColumns) {
                    gem = this.add.sprite(gemX, gemY, "gems", 3);
                }
                this.match3.setCustomData(i, j, gem);
                gem.setScale(0.5);
            }
        }
    }
    gemSelect(pointer) {
        if (this.canPick) {
            this.canPick = false;
            let row = Math.floor(
                (pointer.y - gameOptions.boardOffset.y) / gameOptions.gemSize
            );
            let col = Math.floor(
                (pointer.x - gameOptions.boardOffset.x) / gameOptions.gemSize
            );
            // if (this.match3.validPick(row, col) && !this.match3.isLocked(row, col)) {
            //     this.tweens.add({
            //         targets: this.match3.customDataOf(row, col),
            //         angle: 90,
            //         duration: gameOptions.rotateSpeed,
            //         callbackScope: this,
            //         onComplete: function() {
            //             this.match3.customDataOf(row, col).angle = 0;
            //             this.match3.incValueAt(row, col);
            //             this.match3
            //                 .customDataOf(row, col)
            //                 .setFrame(this.match3.valueAt(row, col));
            //             this.handleMatches();
            //         },
            //     });
            // } else {
            //     this.canPick = true;
            // }
        }
    }
    handleMatches() {
        if (this.match3.matchInBoard()) {
            let gemsToRemove = this.match3.getMatchList();
            let destroyed = 0;
            gemsToRemove.forEach(
                function(gem) {
                    this.poolArray.push(this.match3.customDataOf(gem.row, gem.column));
                    destroyed++;
                    this.tweens.add({
                        targets: this.match3.customDataOf(gem.row, gem.column),
                        alpha: 0,
                        duration: gameOptions.destroySpeed,
                        callbackScope: this,
                        onComplete: function(event, sprite) {
                            destroyed--;
                            if (destroyed == 0) {
                                this.makeGemsFall();
                            }
                        },
                    });
                }.bind(this)
            );
        } else {
            for (let i = 0; i < 5; i++) {
                let locked = this.match3.lockRandomItem();
                if (locked) {
                    this.match3
                        .customDataOf(locked.row, locked.column)
                        .setFrame(4 + this.match3.valueAt(locked.row, locked.column));
                }
            }
            this.canPick = true;
        }
    }
    makeGemsFall() {
        let moved = 0;
        this.match3.removeMatches();
        let fallingMovements = this.match3.arrangeBoardAfterMatch();
        fallingMovements.forEach(
            function(movement) {
                moved++;
                this.tweens.add({
                    targets: this.match3.customDataOf(movement.row, movement.column),
                    y: this.match3.customDataOf(movement.row, movement.column).y +
                        movement.deltaRow * gameOptions.gemSize,
                    duration: gameOptions.fallSpeed * Math.abs(movement.deltaRow),
                    callbackScope: this,
                    onComplete: function() {
                        moved--;
                        if (moved == 0) {
                            this.endOfMove();
                        }
                    },
                });
            }.bind(this)
        );
        let replenishMovements = this.match3.replenishBoard();
        replenishMovements.forEach(
            function(movement) {
                moved++;
                let sprite = this.poolArray.pop();
                sprite.alpha = 1;
                sprite.y =
                    gameOptions.boardOffset.y +
                    gameOptions.gemSize * (movement.row - movement.deltaRow + 1) -
                    gameOptions.gemSize / 2;
                (sprite.x =
                    gameOptions.boardOffset.x +
                    gameOptions.gemSize * movement.column +
                    gameOptions.gemSize / 2),
                (sprite.angle = 0);
                sprite.setFrame(this.match3.valueAt(movement.row, movement.column));
                this.match3.setCustomData(movement.row, movement.column, sprite);
                this.tweens.add({
                    targets: sprite,
                    y: gameOptions.boardOffset.y +
                        gameOptions.gemSize * movement.row +
                        gameOptions.gemSize / 2,
                    duration: gameOptions.fallSpeed * movement.deltaRow,
                    callbackScope: this,
                    onComplete: function() {
                        moved--;
                        if (moved == 0) {
                            this.endOfMove();
                        }
                    },
                });
            }.bind(this)
        );
    }
    endOfMove() {
        if (this.match3.matchInBoard()) {
            this.time.addEvent({
                delay: 250,
                callback: this.handleMatches(),
            });
        } else {
            this.canPick = true;
            this.selectedGem = null;
        }
    }
}

class Match3 {
    // constructor, simply turns obj information into class properties
    constructor(obj) {
        if (obj == undefined) {
            obj = {};
        }
        this.rows = obj.rows != undefined ? obj.rows : 8;
        this.columns = obj.columns != undefined ? obj.columns : 7;
        this.items = obj.items != undefined ? obj.items : 6;
    }

    // generates the game field
    generateField() {
        this.gameArray = [];
        this.selectedItem = false;
        for (let i = 0; i < this.rows; i++) {
            this.gameArray[i] = [];
            for (let j = 0; j < this.columns; j++) {
                do {
                    let randomValue = Math.floor(Math.random() * this.items);
                    this.gameArray[i][j] = {
                        value: randomValue,
                        isLocked: false,
                        isEmpty: false,
                        row: i,
                        column: j,
                    };
                } while (this.isPartOfMatch(i, j));
            }
        }
    }

    // locks the item at row, column
    lockAt(row, column) {
        this.gameArray[row][column].isLocked = true;
    }

    // locks a random Item and returns item coordinates, or false
    lockRandomItem() {
        let unlockedItems = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (!this.isLocked(i, j)) {
                    unlockedItems.push({
                        row: i,
                        column: j,
                    });
                }
            }
        }
        if (unlockedItems.length > 0) {
            let item =
                unlockedItems[Math.floor(Math.random() * unlockedItems.length)];
            this.lockAt(item.row, item.column);
            return item;
        }
        return false;
    }

    // returns a random row number
    randomRow() {
        return Math.floor(Math.random() * this.rows);
    }

    // returns a random column number
    randomColumn() {
        return Math.floor(Math.random() * this.columns);
    }

    // returns true if item at row, column is locked
    isLocked(row, column) {
        return this.gameArray[row][column].isLocked;
    }

    // returns true if there is a match in the board
    matchInBoard() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.isPartOfMatch(i, j)) {
                    return true;
                }
            }
        }
        return false;
    }

    // returns true if the item at (row, column) is part of a match
    isPartOfMatch(row, column) {
        return (
            this.isPartOfHorizontalMatch(row, column) ||
            this.isPartOfVerticalMatch(row, column)
        );
    }

    // returns true if the item at (row, column) is part of an horizontal match
    isPartOfHorizontalMatch(row, column) {
        return (
            (this.valueAt(row, column) === this.valueAt(row, column - 1) &&
                this.valueAt(row, column) === this.valueAt(row, column - 2)) ||
            (this.valueAt(row, column) === this.valueAt(row, column + 1) &&
                this.valueAt(row, column) === this.valueAt(row, column + 2)) ||
            (this.valueAt(row, column) === this.valueAt(row, column - 1) &&
                this.valueAt(row, column) === this.valueAt(row, column + 1))
        );
    }

    // returns true if the item at (row, column) is part of an horizontal match
    isPartOfVerticalMatch(row, column) {
        return (
            (this.valueAt(row, column) === this.valueAt(row - 1, column) &&
                this.valueAt(row, column) === this.valueAt(row - 2, column)) ||
            (this.valueAt(row, column) === this.valueAt(row + 1, column) &&
                this.valueAt(row, column) === this.valueAt(row + 2, column)) ||
            (this.valueAt(row, column) === this.valueAt(row - 1, column) &&
                this.valueAt(row, column) === this.valueAt(row + 1, column))
        );
    }

    // increments the value of the item
    incValueAt(row, column) {
        this.gameArray[row][column].value =
            (this.gameArray[row][column].value + 1) % this.items;
    }

    // returns the value of the item at (row, column), or false if it's not a valid pick
    valueAt(row, column) {
        if (!this.validPick(row, column)) {
            return false;
        }
        return this.gameArray[row][column].value;
    }

    // returns true if the item at (row, column) is a valid pick
    validPick(row, column) {
        return (
            row >= 0 &&
            row < this.rows &&
            column >= 0 &&
            column < this.columns &&
            this.gameArray[row] != undefined &&
            this.gameArray[row][column] != undefined
        );
    }

    // returns the number of board rows
    getRows() {
        return this.rows;
    }

    // returns the number of board columns
    getColumns() {
        return this.columns;
    }

    // sets a custom data on the item at (row, column)
    setCustomData(row, column, customData) {
        this.gameArray[row][column].customData = customData;
    }

    // returns the custom data of the item at (row, column)
    customDataOf(row, column) {
        return this.gameArray[row][column].customData;
    }

    // returns the selected item
    getSelectedItem() {
        return this.selectedItem;
    }

    // set the selected item as a {row, column} object
    setSelectedItem(row, column) {
        this.selectedItem = {
            row: row,
            column: column,
        };
    }

    // deleselects any item
    deleselectItem() {
        this.selectedItem = false;
    }

    // checks if the item at (row, column) is the same as the item at (row2, column2)
    areTheSame(row, column, row2, column2) {
        return row == row2 && column == column2;
    }

    // returns true if two items at (row, column) and (row2, column2) are next to each other horizontally or vertically
    areNext(row, column, row2, column2) {
        return Math.abs(row - row2) + Math.abs(column - column2) == 1;
    }

    // swap the items at (row, column) and (row2, column2) and returns an object with movement information
    swapItems(row, column, row2, column2) {
        let tempObject = Object.assign(this.gameArray[row][column]);
        this.gameArray[row][column] = Object.assign(this.gameArray[row2][column2]);
        this.gameArray[row2][column2] = Object.assign(tempObject);
        return [{
                row: row,
                column: column,
                deltaRow: row - row2,
                deltaColumn: column - column2,
            },
            {
                row: row2,
                column: column2,
                deltaRow: row2 - row,
                deltaColumn: column2 - column,
            },
        ];
    }

    // return the items part of a match in the board as an array of {row, column} object
    getMatchList() {
        let matches = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.isPartOfMatch(i, j)) {
                    matches.push({
                        row: i,
                        column: j,
                    });
                }
            }
        }
        return matches;
    }

    // removes all items forming a match
    removeMatches() {
        let matches = this.getMatchList();
        matches.forEach(
            function(item) {
                this.setEmpty(item.row, item.column);
            }.bind(this)
        );
    }

    // set the item at (row, column) as empty
    setEmpty(row, column) {
        this.gameArray[row][column].isEmpty = true;
    }

    // returns true if the item at (row, column) is empty
    isEmpty(row, column) {
        return this.gameArray[row][column].isEmpty;
    }

    // returns the amount of empty spaces below the item at (row, column)
    emptySpacesBelow(row, column) {
        let result = 0;
        if (row != this.getRows()) {
            for (let i = row + 1; i < this.getRows(); i++) {
                if (this.isEmpty(i, column)) {
                    result++;
                }
            }
        }
        return result;
    }

    // arranges the board after a match, making items fall down. Returns an object with movement information
    arrangeBoardAfterMatch() {
        let result = [];
        for (let i = this.getRows() - 2; i >= 0; i--) {
            for (let j = 0; j < this.getColumns(); j++) {
                let emptySpaces = this.emptySpacesBelow(i, j);
                if (!this.isEmpty(i, j) && emptySpaces > 0) {
                    this.swapItems(i, j, i + emptySpaces, j);
                    result.push({
                        row: i + emptySpaces,
                        column: j,
                        deltaRow: emptySpaces,
                        deltaColumn: 0,
                    });
                }
            }
        }
        return result;
    }

    // replenished the board and returns an object with movement information
    replenishBoard() {
        let result = [];
        for (let i = 0; i < this.getColumns(); i++) {
            if (this.isEmpty(0, i)) {
                let emptySpaces = this.emptySpacesBelow(0, i) + 1;
                for (let j = 0; j < emptySpaces; j++) {
                    let randomValue = Math.floor(Math.random() * this.items);
                    result.push({
                        row: j,
                        column: i,
                        deltaRow: emptySpaces,
                        deltaColumn: 0,
                    });
                    this.gameArray[j][i].value = randomValue;
                    this.gameArray[j][i].isEmpty = false;
                    this.gameArray[j][i].isLocked = false;
                }
            }
        }
        return result;
    }
}