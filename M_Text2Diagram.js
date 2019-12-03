
function Text2Diagram(input) {
    var s = input;
    if (s == false) { return; }
    s = Handle_text.lineSeperator(s).reverse();
    // s is a reversed list contain all text
    s = t_NodeGenerator(s);
    // s is a tNode chain list 

    s[0].locationUpdate(0, 15);
    s[0].bindBattery();
    Board.redraw();
    return s;
}


const _startLocation = point(10, 50);
const _lineHeight = _singleLetterHeight;
const _lineWidth = 20;
const _gapping = 20;
const _xgapping = 80;
const _ygapping = 30;


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

    if (!this.child) { return; }

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
    var lastOperateNode = null;
    let _levelList = [];

    //analysis list
    for (let i = 0; i < s.length; i++) {

        const _item = s[i];
        var _node = new t_Node(_item);
        lastOperateNode!= null && (lastOperateNode.previousNode = _node) // record last one processed point to this one;
        _node.nextNode = lastOperateNode; // record nextNode is last one processed
        _levelList[_node.level + 1] && (_node.child = _levelList[_node.level + 1]);

        // define this node's childrens height;

        if (_node.child == false) { // leave tnode's height case:
            _node.childHeight = _node.height + _ygapping;
            _node.childWidth = _node.width + _xgapping;
        } else { // add childs' node's children height
            _node.child.forEach(i => {
                _node.childHeight += i.childHeight;
                _node.childWidth < i.width && (_node.childWidth = i.width);

                i.parent = _node; // update child's father property;
            })
        }
        _levelList[_node.level + 1] && delete _levelList[_node.level + 1];
        !_levelList[_node.level] && (_levelList[_node.level] = [])
        _levelList[_node.level].unshift(_node);
        _tnodeChain.unshift(_node);
        lastOperateNode = _node;
    }

    _levelList = _levelList.filter(x => x);

    // define root node:
    var _startNode = new t_Node(null);
    _startNode.level = 0;
    _startNode.child = _levelList[0];
    _startNode.nextNode = lastOperateNode;

    // unshift to list
    _tnodeChain.unshift(_startNode);

    return (_tnodeChain);
}

_t_Node.bindBattery = function () {
    if (this.content != null) {
        this.battery = new eBattery(this.x, this.y, this.width + _margin * 2, this.height + _margin * 2, this.content);
        //link this to battery
        this.battery.tNode = this;
        //regist battery 
        _ResourceManager.push(this.battery);
    }
    if (this.child == false) { return; }
    this.child.map(i => {
        i.bindBattery();
        this.battery && doEvent.create(new eLink(this.battery.node.right,
            i.battery.node.left));
    });
    return this.battery;
}

_t_Node.levelUpdate = function (level = null) {
    if (level == null) {
        this.level = this.parent.level + 1;
        this.child!=false && this.child.map(i => {
            i.levelUpdate();
        });
        return this.level;
    }else{
        this.level = level;
        if (this.level <= this.parent.level) {
            throw ('level update error: greater than parent level', this);
        }
        this.child != false && this.child.map(i => {
            i.levelUpdate();
        });
        return this.level;
    }

}
_t_Node.remove = function () {
    // this parent child remove this, push this child upgrade;
    this.child != false && (this.parent.child = List.replace(this.parent.child, this, this.child));
    this.child == false && (this.parent.child = List.remove(this,this.parent.child));
    this.child!= false && Bothis.child.map(i => {
        i.parent = this.parent; // update child's father
        i.levelUpdate(this.level); // update child level = current level; 
        this.parent.battery.node.right.push(i.battery.node.left); // relink battery links

    });
    // remove this from _ResourceManager;
    _ResourceManager.tNodeChain = List.remove(this, _ResourceManager.tNodeChain);

    //relink previousNode and nexNode;
    this.previousNode.nextNode = this.nextNode; // last node's next one is this.next
    this.nextNode.previousNode = this.previousNode; //nextone's previous one is this.previous

    //remove battery
    doEvent.remove(this.battery);
        inputTextarea.value = TextRegenerate(_ResourceManager.tNodeChain[0]).join('\n');

    return this;
}

var TextRegenerate = function (rootNode) {
    var textList = [];
    let nodePoint = rootNode.nextNode;
    //point to root's nextNode, root.next = null;

    while (nodePoint != null) {
        console.log();

        textList.push(
            "-".repeat(nodePoint.level - 1)
            // nodePoint level +1 cause root tnode
            + nodePoint.content);
        nodePoint = nodePoint.nextNode;
    }

    return textList;
}

