/**
 * doEvent can do element level operation
 * create/remove/size/move/size/textEdit/textCancel/select/unselect
 */

var doEvent = {
    checkMode: function(e){
        var p =point(e);
        CanvDraw.c(p.x, p.y, 2);
        CanvStyle.Element();
        console.log('----------------');

        CanvDraw.c(-Board._startPoint.x, -Board._startPoint.y, 20);
        CanvStyle.Element();

        CanvDraw.c(0, 0, 2);
        CanvStyle.Element();

        CanvStyle.Text();
        CanvDraw.t('mouse:' + e.pageX + ' ' + e.pageY, p.x, p.y + _singleLetterHeight, 200);
        console.log('mouse:' + e.pageX + ' ' + e.pageY);


        CanvDraw.t("startPoint:" + Board._startPoint.x + ' ' + Board._startPoint.y, p.x, p.y + (_singleLetterHeight * 3), 200);
        console.log("startPoint:" + Board._startPoint.x + ' ' + Board._startPoint.y);

        CanvDraw.t('scaleFactor:' + Board.scaleFactor, p.x, p.y + (_singleLetterHeight * 4), 200);
        console.log('scaleFactor:' + Board.scaleFactor);
        CanvDraw.t('point:' + p.x + ' ' + p.y, p.x, p.y + (_singleLetterHeight * 2), 200);
        console.log('point:' + p.x + ' ' + p.y);
    },
    scroll: function (e) {
        let _factor = e.deltaY < 0 ? 1.1 : 0.9;
        Board.scaleFactor *=  _factor ;
        Board._startPoint.x /= _factor;
        Board._startPoint.y /= _factor;

        canv.scale(_factor, _factor);
        Board.redraw();
    },
    StartMove: function (k) {

        let fromE = point(k.mouse.pageX, k.mouse.pageY);
        Canvas.onmousemove = function (e) {
            let p = point(e.pageX,e.pageY);
            let _offset = point((p.x - fromE.x )/ Board.scaleFactor,( p.y - fromE.y )/ Board.scaleFactor);
            Board._startPoint.x += _offset.x;
            Board._startPoint.y += _offset.y;
            canv.translate(_offset.x, _offset.y);
            Board.redraw();
            fromE = p;
        }
        Canvas.onmouseup = function () {
            Canvas.onmousemove = null;
            Board.redraw();
        }
    },
    create: function (input) {
        if (input instanceof eBattery == true) {
            _ResourceManager.push(input);
            _History.record();
            return;
        }
        if (input instanceof eNode == true) {
            var TempConnectElement;
            Canvas.onmousemove = function (move_e) {
                var onMagnet = Board.magnetPoint(move_e);
                TempConnectElement = onMagnet.element;
                Board.redraw()
                input.drawPointLine(onMagnet.position);
            }
            Canvas.onmouseup = function () {
                Canvas.onmouseup = null;
                if (TempConnectElement) {
                    doEvent.create(new eLink(input, TempConnectElement));
                    _History.record();
                    Board.redraw();
                }
                else {
                    Board.redraw();
                }
            }
        }

        if (input instanceof eLink) {
            input.from.linkTo.add(input);
            input.to.linked.add(input);
            _ResourceManager.push(input);

            return;
        }
    },
    remove: function (input) {
        if (input instanceof eLink) {
            input.from.linkTo.delete(input);
            input.to.linked.delete(input);
            _ResourceManager.del(input);
            _History.record();


            return;
        }
        if (input instanceof eNode) {
            this.remove(input.bundle);


            return;
        }
        if (input instanceof eLinkBundle) {
            input.linked.forEach((j) => {
                doEvent.remove(j)
            });
            input.linkTo.forEach((i) => {
                doEvent.remove(i)
            });
            _History.record();


            return;
        }

        if (input == 'element') {
            _ResourceManager.elementSelection.forEach(i => {
                _ResourceManager.elements.delete(i);
                i.node.left.bundle.clear();
                i.node.right.bundle.clear();
            });
            _ResourceManager.elementSelection.clear();

            _History.record();
            return;
        }
    },
    size: function (input, e = null) {
        if (input.parent instanceof eBattery) {
            var last_e = e;
            Canvas.onmouseup = function () {
                _History.record();

                Canvas.onmousemove = null;
            };
            Canvas.onmousemove = function (mousemove_e) {
                var p = point(mousemove_e);
                var offset = point( (p.x - last_e.x), (p.y - last_e.y) );
                _ResourceManager.elementSelection.forEach(function (i) {
                    i.width = i.width + offset.x;
                    i.height = i.height + offset.y;
                    i.node.left.update();
                    i.node.right.update();
                });
                Board.redraw();
                last_e = p;
            }
        }
    },
    move: function (input, e = null) {
        if (input instanceof eBattery == false) { return; }
        var last_e = e;
        Canvas.onmouseup = function () {
            Canvas.onmousemove = null;
        };
        Canvas.onmousemove = function (mousemove_e) {
            var p = point(mousemove_e);
            var offset = point((p.x - last_e.x), (p.y - last_e.y));
            _ResourceManager.elementSelection.forEach(function (i) {
                i.x += offset.x;
                i.y += offset.y;
                i.node.left.update();
                i.node.right.update();
            });
            Board.redraw();
            last_e = p;
        }

    },
    multiplySelect: function (k) {

        var fromE = point(k);
        Canvas.onmousemove = function (e) {
            p = point(e);
            //## forEach find inSelctBox element
            _ResourceManager.elements.forEach(function (i) {
                if ((fromE.x < i.x) && (p.x > i.x + i.width) && (fromE.y < i.y) && (p.y > i.y + i.height)) {
                    !i.selected && doEvent.select(i);
                } else {
                    doEvent.unselect(i);
                }
            })
            Board.redraw();
            CanvDraw.rect(fromE.x, fromE.y, p.x - fromE.x, p.y - fromE.y);
            CanvStyle.SelectionBox();
        }
        return false;
    },
    singleSelect: function (input) {
        this.resetSelect();
        doEvent.select(input);
    },
    resetSelect: function () {
        if (_ResourceManager.size == 0) return;
        _ResourceManager.elementSelection.forEach(function (i) {
            doEvent.unselect(i);
            // reset onControl statement
        });

        _ResourceManager.elementSelection.clear();
    },
    textEdit: function (input) {

        var text = document.createElement('textarea');
        text.setAttribute('elementID', input.id);
        text.id = 'ElementAtt';
        text.value = input.Text;

        var t = text.style;
        t.left = input.x / CanvQualityEnhanceVector + 'px';
        t.top = input.y / CanvQualityEnhanceVector + 'px';
        t.width = input.width / CanvQualityEnhanceVector + 'px';
        t.height = input.height / CanvQualityEnhanceVector + 'px';
        t.position = 'absolute';
        t.margin = "0";
        t.padding = "5px";
        t.border = "0";
        t.outline = "1";
        t.whiteSpace = "pre-wrap";
        t.fontSize = 17 + 'px';
        t.overflow = "hidden";
        text.onblur = function () {
            doEvent.textCancel(this, input);
        };
        text.focus();
        text.select();
        body.appendChild(text);
        text.focus();
    },
    textCancel: function (text, onElement) {
        onElement.Text = text.value;
        onElement.tNode.content = text.value;
        onElement.width = parseFloat(text.style.width) * CanvQualityEnhanceVector;
        onElement.height = parseFloat(text.style.height) * CanvQualityEnhanceVector;
        body.removeChild(text);
        Board.redraw();
        // update Textarea
        let a = TextRegenerate(_ResourceManager.tNodeChain[0]).join('\n');
        inputTextarea.value = a;
    },
    select: function (input) {

        input.selected = true;
        //in case repeated 
        _ResourceManager.elementSelection.add(input);

    },
    unselect: function (input) {
        if (input.selected) {

            input.selected = false;
            _ResourceManager.elementSelection.delete(input);
        }
    }
}

