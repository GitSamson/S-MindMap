function point(a, b = null) {
    if (a instanceof MouseEvent) {
        return {
            x: Math.round((a.pageX* CanvQualityEnhanceVector/ Board.scaleFactor- (Board._startPoint.x )) ),
            y: Math.round((a.pageY* CanvQualityEnhanceVector/ Board.scaleFactor- (Board._startPoint.y )) ),
            mouse: a
        }

    }
    if (b === null) {
        return a;
    }
    else {
        return ({ x: Math.round(a), y: Math.round(b) });
    }
}
function Di_PowDistance(P1, P2) {
    if (P1 != P2) {
        return (((P2.x - P1.x) * (P2.x - P1.x)) + ((P2.y - P1.y) * (P2.y - P1.y)))
    }
    else {
        return 0
    }
}
function Di_lessThan(P1, P2, c, lessThan = true) {

    if (P1 != P2) {
        var x = ((Math.pow((P1.x - P2.x), 2) + Math.pow(P1.y - P2.y, 2)) < Math.pow(c, 2));

    } else {
        var x = 0;
    }

    // P1 to P2 < c
    if (lessThan) {
        return (x);
    }
    else {
        return (!x);
    }

}
function Di_Closest(P1, P2, e) {
    var x = Math.pow(P1.x - e.x, 2) + Math.pow(P1.y - e.y, 2) <= Math.pow(P2.x - e.x, 2) + Math.pow(P2.y - e.y, 2) ? P1 : P2;
    return x;
}

function midPoint(a, b) {
    {
        if (a instanceof Number && !(b instanceof Number)) {
            return (point(b.x + (a / 2), b.y));
        }
        if (!(a instanceof Number) && (b instanceof Number)) {
            return (point(a.x, a.y + (b / 2)));
        }
        if ((!(a instanceof Number) && !(b instanceof Number))) {

            return (point((a.x + b.x) / 2, (a.y + b.y) / 2));
        }
    }
}


var List = {
    remove: function (e, list) {
        var index = list.indexOf(e);
        if (index != -1) {
            list.splice(index, 1);
        }
        return list;
    },
    merge: function (setA, setB) {
        setB.forEach(i => {
            setA.add(i);
        });
        return setA;
    },
    remove: function (item, list) {
        var a = new Set(list);
        a.delete(a);
        return [...a]
    }

}

function Vector(pointA,pointB){
    this.p1 = pointA;
    this.p2 = pointB;
}


Vector.prototype.trans = function(...args){

}
Vector.prototype.vector=function(){
    return(point(this.p1.x-this.p2.x,this.p1.y-this.p2.y));
}
var UCS = {
    save : function(){d.save();},
    update : function(angle=0,point){
        if(!angle){
            var _angle = Math.PI/(180/angle);
            d.rotate(_angle);
        }
        if(point==null){return;}
        d.translate(point.x, point.y);
    },
    restore:function(){d.restore()},
    temp: function (fx,angle = 0, point){
        this.save();
        this.update(angle,point);
        fx();
        this.restore();
    }
}