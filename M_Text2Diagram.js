
function Text2Diagram(input) {
    var s = input;
    if (s == false) { return; }
    s = Handle_text.lineSeperator(s).reverse();
    s = t_NodeGenerator(s);
    s[0].locationUpdate(10, 15);
    s[0].draw();
    Board.redraw();
}


const _startLocation = point(50,50);
const _lineHeight = _singleLetterHeight;
const _lineWidth = 20;
const _gapping = 20;
const _xgapping = 100;
const _ygapping = 50;


function t_Node(splitedString) {
    if (splitedString != false) {
        this.level = ((Handle_text.FrontKeywordsCount(splitedString, _tabText)) + 1);
        this.content = Handle_text.FrontKeywordsFilter(splitedString, _tabText);
    } else {
        this.content = null;
    }

    this.width = d.measureText(this.content).width;
    this.height = _lineHeight;
    this.child = [];
    this.childHeight = 0;
    this.childWidth = 0;
}

t_Node.prototype.locationUpdate = function (Xstart, Ystart) {
    this.groupX = Xstart;
    this.groupY = Ystart;
    this.x = this.groupX;
    this.y = this.groupY + (this.childHeight / 2);

    if (!this.child) {
        return;
    }

    var _yAddtion = 0;
    for (let i = 0; i < this.child.length; i++) {
        let _item = this.child[i];
        _item.locationUpdate(this.groupX + this.width + _xgapping, this.groupY + _yAddtion);
        _item.groupY = this.groupY + _yAddtion;
        _yAddtion += _item.childHeight;
    }
}


function t_NodeGenerator(list) {
    let _tnodeChain = [];
    let s = list;
    let _levelList = [];

    for (let i = 0; i < s.length; i++) {
        var _item = s[i];
        var _node = new t_Node(_item);
        _levelList[_node.level + 1] && (_node.child = _levelList[_node.level + 1]);

        // childrens height;
        if (_node.child == false) {
            _node.childHeight = _node.height + _ygapping;
            _node.childWidth = _node.width + _xgapping;
        } else {
            _node.child.forEach(i => {
                _node.childHeight += i.childHeight;
                _node.childWidth < i.width && (_node.childWidth = i.width);
            })
        }
        _levelList[_node.level + 1] && delete _levelList[_node.level + 1];
        !_levelList[_node.level] && (_levelList[_node.level] = [])
        _levelList[_node.level].unshift(_node);
        _tnodeChain.unshift(_node);
    }

    _levelList = _levelList.filter(function (x) {
        return x
    });

    // first node is null, just dont rend
    var _startNode = new t_Node(null);
    _startNode.level = 0;
    _startNode.x = 10;
    _startNode.y = 50;
    _startNode.child = _levelList[0];

    // unshift to list
    _tnodeChain.unshift(_startNode);

    return (_tnodeChain);

}

t_Node.prototype.draw = function () {
    if (this.content != null) {
        this.battery = new eBattery(this.x, this.y, this.width + _margin * 2, this.height + _margin * 2, this.content);
        _ResourceManager.push(this.battery);
    }
    if (this.child == false) {
        return;
    }
    for (let i = 0; i < this.child.length; i++) {
        this.child[i].draw();

        this.battery && doEvent.create(new eLink(this.battery.node.right,
            this.child[i].battery.node.left));
    }
}

var TextComparison = function (sourceText_splited, comparisonText_Splited) {
    let _changedIndex_begin = 0;
    let _changedIndex_end = 0;

    for (let i = 0; i < sourceText_splited.length; i++) {
        const element = sourceText_splited[i];
        if (element == comparisonText_Splited[i]) {
            _changedIndex_begin = i;
        } else {
            break;
        }
    }
    for (let j = sourceText_splited.length; j > _changedIndex_begin; j--) {
        const element = sourceText_splited[j];
        if (element == comparisonText_Splited[j]) {
            _changedIndex_end = j;
        } else {
            return;
        }
    }
    console.log([_changedIndex_begin, _changedIndex_end]);

    return [_changedIndex_begin, _changedIndex_end];
    // 3 case:
    // 1 left : content change;
    // 0 left : deleted change;
    // 2 left : added new line;
}