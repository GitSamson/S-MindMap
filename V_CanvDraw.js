const _margin = 5;
const _singleLetterHeight = 30;

var CanvDraw = {
    rect: function (x , y , w , h ){
        d.beginPath();
        d.rect(x, y, w, h);
        d.closePath();
    },
    c: function (x,y,r){
        d.beginPath();
        d.arc(x, y, r, 0, Math.PI * 2);
        d.closePath();
    },
    t:function(t,x,y,width,height = _singleLetterHeight){
        
        d.fillText(t, x , y  , width,height);
    },
    pl : function (positionArray,closePath = true){
        let _position = positionArray;
        d.beginPath();
        d.moveTo(_position[0][0], _position[0][1]);
        
        for (let i = 1; i < (_position.length); i++) {
            d.lineTo(_position[i][0],_position[i][1]);
        }
        closePath && d.closePath();
    }
}