
const _tabText = '-'; // this is tab letter in textarea;


var Handle_text = {
    lineSeperator: function (input) {
        // input is get from textarea, handle new line event
        // return a array of strings, contain lines
        if (input == null) {
            return null;
        }

        // if (input instanceof String != true) throw ('lineSeperator handler error : ', input);

        var text = new String(input);
        text = text.split('\n');
        return text;
    },

    FrontKeywordsCount: function (sourceText, keyword) {

        var _count = 0;
        var _text = sourceText;
        
        if (_text == null){return 0}

        if (_text.indexOf(keyword) != 0) { return _count }
        while (_text.indexOf(keyword) == 0) {
            _count++;
            _text = _text.slice(1);
        }
        return _count;
    },

    FrontKeywordsFilter: function (sourceText, keyword) {
        var _count = 0;
        var _text = sourceText;
        if(_text == null){
            return _text;
        }
        while (_text.indexOf(keyword) == 0) {
            _count++;
            _text = _text.slice(1);
        }
        return _text;
    },

    levelGenerator: function (input) {
        // raw text will transfer to lineSeperator:
        var _lineSepertedText = input instanceof Array == true ? input : this.lineSeperator(input);
        //initialize container
        var outputNodes = [null];
        //read items in line Seperated Text;
        for (let i = 0; i < _lineSepertedText.length; i++) {
            outputNodes.push(new t_Node(_lineSepertedText[i], outputNodes[outputNodes.length - 1]));
        }

        return outputNodes;
        //initialize Node;

    },

    TextInGraphic: function (textContent, graphic) {
        if (graphic.type != "rect") {
            throw ('Not support this graphic type :', graphic.type);
        }
        var s = graphic;

        if (textContent) {
            let textArea_Width = s.width - (_margin * 2);
            let textArea_Height = (s.height - (_margin * 2)) / _singleLetterHeight;
            var renderText = textContent;
            var LetterWidthMaximum = null;

            for (let i = 0; i < renderText.length; i++) {
                if (i > textArea_Height - 1) {
                    // if out of height, break;
                    // and renderText == where it is.
                    renderText = renderText.slice(0, i);
                    break;
                }

                let j = renderText[i];
                if (d.measureText(j).width > textArea_Width) {
                    // out of width; start splite;

                    if (LetterWidthMaximum == null) {
                        //initial maximum letter count
                        let LetterTest = j;
                        for (let k = LetterTest.length - 1; k > 1; k--) {
                            let texts = LetterTest.slice(0, k);
                            if (d.measureText(texts).width < textArea_Width) {
                                LetterWidthMaximum = k;
                                break;
                            }
                        }
                    }
                    renderText.splice(i, 1, renderText[i].slice(0, LetterWidthMaximum), renderText[i].slice(LetterWidthMaximum));
                }
            }
            return renderText;
        }
    }
}