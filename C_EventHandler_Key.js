var _keyState = {
    space: false
}

onkeydown = function(){
    event.keyCode=='46'&& doEvent.remove('element');
    event.keyCode == '90' && event.ctrlKey && _History.undo();
    event.code == 'KeyY' && event.ctrlKey&& _History.redo();
    // this.event.keyCode =='32'&&this.alert('asd');
    Board.redraw();
}

onkeypress = function(){
    this.event.keyCode =='32'&&(_keyState.space = true);
    EventHandler.mouse();
}



onkeyup= function(){
    _keyState.space = false;
    EventHandler.mouse();
}
EventHandler.mouse = function(){
    _keyState.space && (Canvas.style.cursor = 'hand') || (Canvas.style.cursor = 'default');
} 