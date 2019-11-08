var CanvStyle = {
    SelectionBox: function () {
        d.strokeStyle = 'grey';

        d.lineWidth = 2;
        d.fillStyle = "";
        d.setLineDash([12, 12]);
        d.stroke();
    },
    Element: function () {
        d.strokeStyle = 'black';

        d.setLineDash([]);
        d.lineWidth = 3;
        d.fillStyle = "white";
        d.fill();
        d.stroke();
    },
ElementSelected: function () {
    d.strokeStyle = '#0066FF';

        d.lineWidth = 3;
        d.setLineDash([]);
        d.fillStyle = "lightGrey";
        d.fill();
        d.stroke();
    },

Node: function() {
    d.strokeStyle = 'grey';

        d.lineWidth = 2;
        d.setLineDash([]);
        d.fillStyle = "white";
        d.fill();
        d.stroke();
    },

Text: function() {
    
    d.setLineDash([]);
    d.font = _singleLetterHeight+'px Calibri';
        d.fillStyle = 'black'
    },
CtrlDot : function(){
    d.strokeStyle = 'grey';
    d.setLineDash([]);
    d.fillStyle = '#0066FF';
    d.fill();
},
Link : function(){
    d.strokeStyle = 'grey';
    d.setLineDash([]);
    d.lineWidth = 2;
    d.stroke();
},
LinkTo : function(){
    d.setLineDash([5,5]);
    d.lineWidth = 1;
    d.stroke();
}


}

