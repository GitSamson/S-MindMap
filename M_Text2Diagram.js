
function Text2Diagram(input) {
    var s = input;
    if (s == false) { return; }
    s = Handle_text.lineSeperator(s).reverse();
    // s is a reversed list contain all text
    s = t_NodeGenerator(s);
    // s is a tNode chain list 

    s[0].locationUpdate(10, 15);
    s[0].draw();
    Board.redraw();
    return s;
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
var _t_Node = t_Node.prototype;

_t_Node.locationUpdate = function (Xstart, Ystart) {
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
    var  lastOperateNode = null;
    let _levelList = [];

    for (let i = 0; i < s.length; i++) {
        let _item = s[i];
        var _node = new t_Node(_item);
        
        _node.nextNode = lastOperateNode;

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
        lastOperateNode = _node;
    }

    _levelList = _levelList.filter((x)=> x);

    // first node is null, just dont rend
    var _startNode = new t_Node(null);
    _startNode.level = 0;
    _startNode.x = 10;
    _startNode.y = 50;
    _startNode.child = _levelList[0];
    _startNode.nextNode = lastOperateNode;
    // unshift to list
    _tnodeChain.unshift(_startNode);

    return (_tnodeChain);

}

_t_Node.draw = function () {
    if (this.content != null) {
        this.battery = new eBattery(this.x, this.y, this.width + _margin * 2, this.height + _margin * 2, this.content);
        //link this to battery
        this.battery.tNode = this;
        //regist battery 
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

var TextRegenerate = function (rootNode) {
    var textList = [];
    let nodePoint = rootNode.nextNode;
    //point to root's nextNode, root.next = null;

    while(nodePoint!=null){
        console.log();

        textList.push(
            "-".repeat(nodePoint.level-1)
            // nodePoint level +1 cause root tnode
            +nodePoint.content);
        nodePoint = nodePoint.nextNode;
    }

    return textList;
}