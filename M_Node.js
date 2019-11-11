function eNode(element, type = ('left' | 'right')) {
    this.parentElement = element;
    this.type = type;
    this.bundle = new eLinkBundle(this);
    if(this.type=='left'){
        this.graphic = new Graphic(this, 'c', 
        this.parentElement.graphic.left.x, 
        this.parentElement.graphic.left.y,10);
    }else{
        this.graphic = new Graphic(this, 'c',
            this.parentElement.graphic.right.x,
            this.parentElement.graphic.right.y, 10);
    }
 }

eNode.prototype.update = function(){
    this.graphic.x = this.type == 'left' ? this.parentElement.graphic.left.x : this.parentElement.graphic.right.x;
    this.graphic.y = this.type == 'left' ? this.parentElement.graphic.left.y : this.parentElement.graphic.right.y;
    
}
eNode.prototype.push = function (node) {
   this.bundle.push(node);
}
Object.defineProperties(eNode.prototype, {
    
    position:{ 
        get: function(){
            return ({
                x: this.type == 'left' ? this.parentElement.graphic.left.x : this.parentElement.graphic.right.x ,
                y: this.type == 'left' ? this.parentElement.graphic.left.y : this.parentElement.graphic.right.y
            });
        }
    } ,
    x: {
        get: function(){
            return this.type == 'left' ? this.parentElement.graphic.left.x : this.parentElement.graphic.right.x 
        }
    },
    y : {
        get: function (){
            return this.type == 'left' ? this.parentElement.graphic.left.y : this.parentElement.graphic.right.y;
        },
    }
})

eNode.prototype.isOnNode = function (e) {
    p= point(e);
    if (Di_lessThan(this.position, { x: p.x, y: p.y }, Board.ConnectionNodeSize * 2)) {
        return true;
    } else {
        return false;
    }
}
eNode.prototype.drawPointLine = function (mouse) {
    // when on dragging, draw pointed line to mouse Location
    d.beginPath();
    d.moveTo(this.position.x, this.position.y);
    d.lineTo(mouse.x, mouse.y);
    CanvStyle.LinkTo();
}