var InitialAll = function () {
    _ResourceManager = new ResourceManager;
    Board = new Canv(d, _ResourceManager);
    CanvStyle.Text();
    _History = new history();
    _History.record();
    _EventListener = new EventHandler(Canvas);
    Board.redraw();
    
}
var Overall = {
    isOn: function (e) {
        var list = [...this.operateList()];
        var p = e;
        var on = null;
        for (let i = 0; i < list.length; i++) {
            var j = list[i];
            if (j instanceof eLink == true) {
                if (j.graphic_C.isOn(p)) {
                    on = j;
                    break;
                }
            }
            else if (j instanceof Graphic == true) {
                if (j.isOn(p)) {
                    on = j;
                    break;
                }
            }
            else if (j.graphic.isOn(p)) {
                on = j;
                break;
            }
        }
        return on;
    },
    operateList: function () {

        var result = new Set();
        if (_ResourceManager.elementSelection.size != 0) {

            _ResourceManager.elementSelection.forEach(i => {
                result.add(i.graphic_C);
                result.add(i.node.right);
                result.add(i.node.left);
                List.merge(result, i.node.left.bundle.linkTo);
                List.merge(result, i.node.right.bundle.linkTo);
                List.merge(result, i.node.left.bundle.linked);
                List.merge(result, i.node.right.bundle.linked);
            });

            List.merge(result, _ResourceManager.elements)

            return (result);
        } else {
            return _ResourceManager.elements;
        }
    },
    Status: function () {
        if (_ResourceManager.elementSelection.size != 0) {
            return ("onSelection");
        }
        if (_ResourceManager.elementSelection.size == 0) {
            return ('Noselection');
        }
    },
    Del: function (input) {
        if (input instanceof eBattery) {
            _ResourceManager.del(input);
            _History.record()
        }
    }

};

