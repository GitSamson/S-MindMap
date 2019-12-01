// mouseState :
var _mouseState = {
    Shift: 'crosshair',
    ' ': 'hand',
    key: function (key = null) {
        if (!key || this[key] == undefined) return 'default';
        return this[key];
    }
}
EventHandler.mouse = function (mouseState = 'default') {
    Canvas.style.cursor = mouseState;
} 

var _keyState = {
    ' ': false,
    Shift:false,
    stateChange : function(key){
        key=='Shift'&&(key = 'Shift');
        this[key] != undefined && (this[key] = !this[key]);
    },
    keyDown : function(){

        let key = this.event.key;
        
        key == 'Delete' && doEvent.remove('element');
        key == 'z' && event.ctrlKey && _History.undo();
        key == 'y' && event.ctrlKey && _History.redo();
        _keyState.stateChange(key);
        EventHandler.mouse(_mouseState[key]);
        keyDownPrevent();
        // Board.redraw();
    },


}
keyDownPrevent= function() {
    onkeydown =  (onkeydown != null ? null : _keyState.keyDown);
}
//why can not bind to Canvas!!!! dont get it.


keyDownPrevent()

this.onkeyup= function(){

    let key = this.event.key;

    _keyState.stateChange(key);

    //reset mouse pointer 
    EventHandler.mouse();
    keyDownPrevent()

}

