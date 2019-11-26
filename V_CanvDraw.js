const _margin = 5;
const _singleLetterHeight = 30;

var CanvDraw = {
    rect: function (x, y, w, h) {
        d.beginPath();
        d.rect(x, y, w, h);
        d.closePath();
    },
    c: function (x, y, r) {
        d.beginPath();
        d.arc(x, y, r, 0, Math.PI * 2);
        d.closePath();
    },
    t: function (t, x, y, width, height = _singleLetterHeight) {

        d.fillText(t, x, y, width, height);
    },
    pl: function (...args) {
        let _position = this.symbol(false,...args);
        CanvStyle.Link();
        let beginning = point(_position[0]);
        let end = point(_position[_position.length - 1]);
        return ({
            p: _position,
            beginningRadian: Vector.radian(point(_position[1]),beginning),
            endRadian: Vector.radian(point(_position[_position.length - 2]),end),
            beginning,
            end
        });
    },
    symbol: function(closePath=true,...args){
        let _position =point( Array.prototype.slice.call(args));
        
        d.beginPath();
        
        d.moveTo(_position[0].x, _position[0].y);
        for (let i = 1; i < _position.length; i++) {
            d.lineTo(_position[i].x, _position[i].y);
        }
        closePath && d.closePath();
        return _position;
    },
    arrow: function(fromPoint,endPoint,type='0'){
        var p1 = point(fromPoint);
        var p2 = point(endPoint);
        switch (type) {
            case '1':
                var drawType = function(){
                    CanvDraw.symbol(false,
                    [-5,-5],[0, 0], [5, -5]);
                    CanvStyle.Link();
                }
                break;
            case '2':
                var drawType = function () {
                    CanvDraw.symbol(false,
                        [-5, 0],[5, 0]);
                    CanvStyle.Link();
                }
                break;
            case '3':
                var drawType = function () {
                    CanvDraw.c(0,-3,3);
                    CanvStyle.Arrow();
                }
                break;
            case '4':
                var drawType =function(){ 
                    CanvDraw.pl([0, -5], [-5, -5],
                    [0, 0], [5, -5], [0, -5]);
                    CanvStyle.Arrow();
                }
                break;
            default:
                return;

        }

        UCS.temp(drawType,
            Vector.radian(p1, p2),
            p2);
    }
}


