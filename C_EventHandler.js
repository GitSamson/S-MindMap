
function EventHandler(CANV) {
    var onElement;
    CANV.ondblclick = function (e) {
        dblclick(e);
    };

    CANV.onmousedown = function (e) {
        var p = point(e);
        move = p;
        onElement = Overall.isOn(p);
        CANV.onmousemove = function (x) {
             move = x;
            dragging(p, onElement);
        };
    }
    CANV.onclick = function (d) {
        CANV.onmousemove = null;
        move = point(move);
        var p = point(d);
        move = !(p.x == move.x && p.y == move.y);
        onElement = Overall.isOn(p);
        move && Board.redraw();
        !move && click(onElement);
    }
    function click(onElement) {
        (onElement instanceof eBattery) && doEvent.singleSelect(onElement);
        (onElement instanceof eLink) && doEvent.remove(onElement);
        (onElement == null) && doEvent.resetSelect();
        Board.redraw();
    }
    function dragging(k, onElement) {
        (onElement instanceof eNode) && doEvent.create(onElement);
        (onElement == null) && doEvent.multiplySelect(k);
        if (onElement instanceof eBattery) {
            if (onElement.selected == false) {
                doEvent.singleSelect(onElement);
            }
            doEvent.move(onElement, k);
        }
        (onElement instanceof Graphic && onElement.parent instanceof eBattery) && doEvent.size(onElement, k);

    }
    function dblclick(e) {
        p = point(e);

        var onElement = Overall.isOn(p);
        (onElement == null) && doEvent.create(new eBattery(p.x - 25, p.y - 25));
        onElement instanceof eNode && doEvent.remove(onElement);
        onElement instanceof eBattery && doEvent.textEdit(onElement);
        Board.redraw();
        return;
    }
}