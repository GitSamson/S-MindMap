function eBattery(x, y, width = 50, height = 50, Text = null) {
    this.graphic = new Graphic(this, 'rect', x, y, width, height);
    this.selected = false;
    this.Text = Text;
    this.node = { left: new eNode(this, 'left'), right: new eNode(this, 'right') };
    this.graphic_C = new Graphic(this, 'squ', this.rightBot.x, this.rightBot.y, 6);
    this.graphic_left = new Graphic(this, 'diamond',this.left);
    
}

//Content Draw funciton
Object.defineProperties(eBattery.prototype, {
    x: {
        get: function () { return this.graphic.get().x },
        set: function (input) {
            this.graphic.x = input;
            this.update();
        }
    },
    y: {
        get: function () { return this.graphic.get().y },
        set: function (input) {
            this.graphic.y = input;
            this.update();
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
            this.update();
        },
        get: function () {
            return this.graphic.get().width;
        }
    },
    height: {
        get: function () {
            return this.graphic.get().height;
        },
        set: function (input) {
            this.graphic.height = input > 50 ? input : 50;
            this.update();
        }
    },
    center: {
        get: function () {
            return (point(this.x + (this.width / 2), this.y + (this.height / 2)));
        }
    },
    left: {
        get: function () {
            return this.graphic.get().left;
        }
    },
    right: {
        get: function () {
            return this.graphic.get().right
        }
    }
});
eBattery.prototype.update=function(){
    this.node.left.x = this.graphic.left.x;
    this.node.left.y = this.graphic.left.y;
    this.node.right.x = this.graphic.right.x;
    this.node.right.y = this.graphic.bot;
    this.graphic_C.x= this.graphic.right.x;
    this.graphic_C.y = this.graphic.bot;
}
eBattery.prototype.isOnControl = function (e) {
    if (this.node.left.isOnNode(e)) { return this.node.left; }
    if (this.node.right.isOnNode(e)) { return this.node.right; }
    return false;
}