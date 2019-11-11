function eBattery(x, y, width = 50, height = 50, Text = null) {
    this.graphic = new Graphic(this, 'rect', x, y, width, height);
    this.selected = false;
    this.Text = Text;
    this.node = { left: new eNode(this, 'left'), right: new eNode(this, 'right') };
    this.graphic_C = new Graphic(this, 'diamond', this.rightBot.x, this.rightBot.y, 8);
    this.id ;
}

//Content Draw funciton
Object.defineProperties(eBattery.prototype, {
    x: {
        get: function () { return this.graphic.x },
        set: function (input) {
            this.graphic.x = input;
            this.graphic_C.x = this.rightBot.x;
            this.node.left.update();
            this.node.right.update();
        }
    },
    y: {
        get: function () { return this.graphic.y },
        set: function (input) {
            this.graphic.y = input;
            this.graphic_C.y = this.rightBot.y
            this.node.left.update();
            this.node.right.update();
        }
    },
    rightBot: {
        get: function () {
            return (point(this.x + this.width, this.y + this.height));
        }
    },
    width: {
        set: function (input) {
            this.graphic.width = input > 50 ? input : 50;
            this.graphic_C.x = this.rightBot.x;
            this.node.left.update();
            this.node.right.update();

        },
        get: function () {
            return this.graphic.width;
        }
    },
    height: {
        get: function () {
            return this.graphic.height;

        },
        set: function (input) {
            this.graphic.height = input > 50 ? input : 50;
            this.graphic_C.y = this.rightBot.y;
            this.node.left.update();
            this.node.right.update();

        }
    },
    center: {
        get: function () {
            return (point(this.x + (this.width / 2), this.y + (this.height / 2)));
        },
        set: function (input) {
            this.x = input.x - (this.width / 2);
            this.y = input.y - (this.height / 2);
        }
    },
    left: {
        get: function () {
            return this.graphic.left;
        }
    },
    right: {
        get: function () {
            return this.graphic.right
        }
    }
});

eBattery.prototype.isOnControl = function (e) {
    if (this.node.left.isOnNode(e)) { return this.node.left; }
    if (this.node.right.isOnNode(e)) { return this.node.right; }
    return false;
}