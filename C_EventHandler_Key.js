onkeydown = function(){
    event.keyCode=='46'&& doEvent.remove('element');
    event.keyCode == '90' && event.ctrlKey && _History.undo();
    event.code == 'KeyY' && event.ctrlKey&& _History.redo();
   
    Board.redraw();
}

