function eLink(from, to) {
    from instanceof eLinkBundle && (this.from = from);
    from instanceof eNode && (this.from = from.bundle);
    to instanceof eLinkBundle && (this.to = to);
    to instanceof eNode && (this.to = to.bundle);
    this.parentElement = this.from.parentElement;
    this.type = 'pl'
    this.graphic_C = new Graphic(this, 'c', this.center.x, this.center.y, 5);
}
eLink.prototype.update = function () {
    this.graphic_C.x = this.center.x;
    this.graphic_C.y = this.center.y;
}
Object.defineProperties(eLink.prototype, {
    positionFrom: {
        get: function () {
            return (point(this.from.parentNode.graphic.x, this.from.parentNode.graphic.y));
        }
    },
    positionTo: {
        get: function () {
            return (point(this.to.parentNode.graphic.x, this.to.parentNode.graphic.y));
        }
    },
    typeFrom: {
        get: function () {
            return this.from.parentNode.type;
        }
    },
    typeTo: {
        get: function () {
            return this.to.parentNode.type;
        }
    },
    center: {
        get: function () {
            return (point((this.positionFrom.x + this.positionTo.x + this.offsetFrom + this.offsetTo) / 2, (this.positionFrom.y + this.positionTo.y) / 2));
        }
    },
    offsetFrom: {
        get: function () {
            return this.from.offset;
        }
    },
    offsetTo: {
        get: function () {
            return this.to.offset;
        }
    }

})



eLink.prototype.reverse = function () {
    var temp = this.from;
    this.from = this.to;
    this.to = temp;
}




function eLinkBundle(parentNode) {
    this.linkTo = new Set();
    this.linked = new Set();
    this.parentNode = parentNode;
    this.parentElement = parentNode.parentElement;
}


Object.defineProperties(eLinkBundle.prototype, {
    position: {
        get: function () {
            return this.parentNode.position;
        }
    },
    x: {
        get: function () {
            return this.parentNode.x;
        }
    },
    y: {
        get: function () {
            return this.parentNode.y;
        }
    },
    type: {
        get: function () {
            return this.parentNode.type;
        }
    },
    offset: {
        get: function () {
            return this.parentNode.type === "left" ? -20 : 20
        }
    }




})



eLinkBundle.prototype.clear = function () {
    this.linked.forEach((j) => {
        doEvent.remove(j)
    });
    this.linkTo.forEach((i) => {
        doEvent.remove(i)
    });
}
