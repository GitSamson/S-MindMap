
function EventHandler(CANV) {
    var onElement;
    document.addEventListener("wheel", doEvent.scroll, false);
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
   
        CanvDraw.c(p.x, p.y, 2);
        CanvStyle.Element();
console.log('----------------')
        CanvDraw.c(-Board._startPoint.x, -Board._startPoint.y, 2);
        CanvStyle.Element();
        CanvStyle.Text();
        CanvDraw.t('mouse:' + e.pageX + ' ' + e.pageY, p.x, p.y + _singleLetterHeight, 200);
        console.log('mouse:' + e.pageX + ' ' + e.pageY);


        CanvDraw.t("startPoint:" + Board._startPoint.x + ' ' + Board._startPoint.y, p.x, p.y + (_singleLetterHeight * 3), 200);
        console.log("startPoint:" + Board._startPoint.x + ' ' + Board._startPoint.y);

        CanvDraw.t('scaleFactor:' + Board.scaleFactor, p.x, p.y + (_singleLetterHeight * 4), 200);
        console.log('scaleFactor:' + Board.scaleFactor);
        CanvDraw.t('point:' + p.x + ' ' + p.y, p.x, p.y + (_singleLetterHeight * 2), 200);
        console.log('point:' + p.x + ' ' + p.y, p.x);


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
        if(onElement == null)  {
            _keyState.space ? doEvent.StartMove(k) : doEvent.multiplySelect(k);
        }
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
        // (onElement == null) && doEvent.create(new eBattery(p.x - 25, p.y - 25));
        onElement instanceof eNode && doEvent.remove(onElement);
        onElement instanceof eBattery && doEvent.textEdit(onElement);
        Board.reset();
        Board.redraw();
        return;
    }
}