const pi = parseFloat(3.14);
function point(a, b = null) {
    if (a instanceof MouseEvent) {
        return {
            x: Math.round((a.pageX * CanvQualityEnhanceVector / Board.scaleFactor - (Board._startPoint.x))),
            y: Math.round((a.pageY * CanvQualityEnhanceVector / Board.scaleFactor - (Board._startPoint.y))),
            mouse: a
        }
    }
    
    if (a.constructor === Object) {
        
        return a;

    }
    if (a.constructor === Array) {
        if(a[0].constructor===Number&& a[1].constructor ===Number&&a.length==2){
        return { x: a[0], y: a[1] }
        }
            let output = [];
            for (let i = 0; i < a.length; i++) {
                const element = a[i];
                output[i]=point(element);
            }
            return output;

    }

        return ({ x: Math.round(a), y: Math.round(b) });
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
    remove: function (e, fromList) {
        var _list = fromList;
        var index = _list.indexOf(e);
        if (index != -1) {
            _list.splice(index, 1);
        }else{
            throw ('can not remove from list',fromList);
        }
        return _list;
    },
    merge: function (setA, setB) {
        setB.forEach(i => {
            setA.add(i);
        });
        return setA;
    },
    replace: function (list, key,...args){
        if(list == false){return;} 
        var _list = list;
        var index = _list.indexOf(key);
        if (index != -1) {
            _list.splice(index, 1, ...args);
        }
        return _list;
    }
}

function Vector(pointA, pointB) {
    this.p1 = pointA;
    this.p2 = pointB;
    this.radian = this.radian(this.p1, this.p2);
}

Vector.prototype.trans = function (...args) {

}
Vector.prototype.vector = function () {
    return (point(this.p1.x - this.p2.x, this.p1.y - this.p2.y));
}

Vector.radian = function (pointA_from, pointB_to) {
    let p1 = pointA_from;
    let p2 = pointB_to;
    let _x = p2.x - p1.x;
    let _y = p2.y - p1.y;
    let output = Math.atan(
        _y / _x
    );
    
    if (_x > 0 && _y >= 0) { output -= pi }
    if (_y < 0 ) { output += pi }
    if (output >= pi) { output -= pi }

    output += (pi / 2);//fix canvas default UCS rotate  
    return (output);
}


var UCS = {
    save: function () { d.save(); },
    update: function (radian = 0, point = null) {
        //move first!
        if (point == null) { return; }
        d.translate(point.x, point.y);
        if (radian != 0) {
            d.rotate(radian);
        }
    },
    restore: function () { d.restore() },
    temp: function (fx, radian = 0, point = null) {
        this.save();
        this.update(radian, point);
        fx();
        this.restore();
    }
}


var transfer = {
    floorFloat: function(_float){
        return parseFloat(_float.toFixed(2))
    },
    angle_radian: function (angle) {
        return this.floorFloat(angle / 180 * pi);
    },
    radian_angle: function (radian) {
        return this.floorFloat((radian * 180 / pi));
    }
}

var text= {
    getContent : function (content,key1,key2=null){
        let _text = content;
        if(key1.constructor == Number){
            _text= _text.slice(key1);
        }else{
            _text = _text.slice(_text.indexOf(key1)+1);
        }
        if(key2 == null){return _text}
        if(key2.constructor == Number){
            return _text.slice(0,key2);
        }
        if(key2.constructor == String){
            return _text.slice(0, _text.indexOf(key2));
        }
        }
}

