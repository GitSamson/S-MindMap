// function Draw_CreateElement(e) {
//     diagram.push(new element(e.pageX-25, e.pageY-25));
// }

function Draw_MoveElements(e) {

    // Canvas.onmouseup = function () {
    //     Canvas.onmousemove = null;
    // }
    // var last_e = e;
    // Canvas.onmousemove = function (mousemove_e) {
    //     var offset = { x: (mousemove_e.pageX - last_e.pageX), y: (mousemove_e.pageY - last_e.pageY) }

    //     diagram.elementSelection.forEach(function (i) {
    //         i.graphic.x = i.graphic.x + offset.x;
    //         i.graphic.y = i.graphic.y + offset.y;
    //         i.node.left.update();
    //         i.node.right.update();
    //     });
    //     Board.redraw();
    //     last_e = mousemove_e;
    // }
}


function Element_Select(element) {
    // inSelectionList = diagram.elementSelection.indexOf(element);
    // if (inSelectionList == -1) {
    //     element.selected = true;
    //     //in case repeated 
    //     diagram.elementSelection.push(element);
    // } else {
    //     return;
    // }
}
function Element_Unselect(element) {
    // element.selected = false;
    // remove(element,diagram.elementSelection)

}

function Draw_SelectionBox(e) {

    // mousedown = { x: e.pageX, y: e.pageY };

    // Canvas.onmousemove = function (e) {
    //     Board.onSelection = true;
    //     //## forEach find inSelctBox element
    //     diagram.element.forEach(function (i) {
    //         if ((mousedown.x < i.x) && (e.pageX > i.x + i.width) && (mousedown.y < i.y) && (e.pageY > i.y + i.height)) {
    //             Element_Select(i);
    //         } else {
    //             Element_Unselect(i);
    //         }
    //     })
    //     Board.redraw();
    //     d.beginPath();
    //     d.rect(mousedown.x, mousedown.y, e.pageX - mousedown.x, e.pageY - mousedown.y);
    //     d.closePath();
    //     CanvStyle.SelectionBox();
    // }

    //referesh mouseup EventListener
    Canvas.addEventListener('mouseup', function (e) {
        // Canvas.onmousemove = null;
        // Board.redraw();
    })
}

function Draw_Select(element) {
    // Element_Select(element);
    // Board.redraw();
}




function Connection_onMouseDown(e, node) {
    // var TempConnectElement;

    // Canvas.onmousemove = function (move_e) {
    //     var onMagnet = Board.magnetPoint(move_e);

    //     TempConnectElement = onMagnet.element;
    //     Board.redraw()
    //     node.drawPointLine(onMagnet.position);
    // }



    // Canvas.onmouseup = function (e) {
    //     Canvas.onmousemove = null;
    //     if (TempConnectElement) {
    //         node.push(TempConnectElement);
    //         Board.redraw();
    //         return;
    //     }
    //     else {
    //         Board.redraw();
    //     }
    // }
}