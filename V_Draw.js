Canvas = document.getElementById('MyCanvas');
canv = Canvas.getContext('2d');

function Draw(s, type = null) {
    var input = s;
    input instanceof ResourceManager && Draw(input.eBattery);
    input instanceof eBattery && d_ele(input);
    input instanceof eNode && d_node(input);
    input instanceof eLinkBundle && d_bundleLink(input);
    input instanceof eLink && d_link(input);

    function d_ele(el) {
        el.graphic.draw();  
        CanvStyle.Element();
        if (el.selected) {
            CanvStyle.ElementSelected();
            Draw(el.node.left);
            Draw(el.node.right);
            drawCtrl(el.node.left.bundle);
            drawCtrl(el.node.right.bundle);
            drawCtrl(el);
        }
        d_text(el);
    }
    function d_link(s) {

        var start = s.positionFrom;
        var target = s.positionTo;

        var startOffset = s.from.offset;
        var targetOffset = s.to.offset;
        canv.beginPath();
        canv.moveTo(start.x, start.y);
        canv.lineTo(start.x + startOffset, start.y);
        canv.lineTo(target.x + targetOffset, target.y);
        canv.lineTo(target.x, target.y);
        CanvStyle.Link();
    }
    function d_node(s) {
        
        s.graphic.draw();
        CanvStyle.Node();
    }

    function d_text(s) {
        
        if(!s.Text){
            return;
        }

        var textContent = Handle_text.lineSeperator(s.Text);
        textContent = Handle_text.TextInGraphic(textContent,s.graphic);
        for (let i = 0; i < textContent.length; i++) {
                CanvStyle.Text();
                let _y = (((s.height)/(textContent.length+1))* (i+1)) + s.y +(_singleLetterHeight/2)-5;
            CanvDraw.t(textContent[i], s.x + _margin, _y, s.width);
        }
        

    }
    function d_bundleLink(s) {
        var s = s.linkTo;

        if (s) {

            s.forEach(i => {
                Draw(i);
            });
        }
    }

}

function drawCtrl(s) {
    s instanceof eBattery && dc_eBattery(s);
    s instanceof eLinkBundle && dc_bundle(s);
    s instanceof eLink && dc_link(s);
    s instanceof eNode && dc_bundle(s.bundle);


    function dc_eBattery(s) {

        s.graphic_C.draw();
        CanvStyle.CtrlDot();
    }
    function dc_dashLink(s) {
        canv.beginPath();
        canv.setLineDash([2, 2]);
        canv.moveTo(this.position.x, this.position.y);
        canv.lineTo(mouse.x, mouse.y);
        canv.stroke();
    }
    function dc_link(s) {
        s.graphic_C.draw();
        CanvStyle.CtrlDot();
        return;
    }
    function dc_bundle(s) {
        var slinkTo = s.linkTo;
        var slinked = s.linked;


        if (slinked) {
            slinked.forEach(j => {
                j.update()
                drawCtrl(j);
            });
        }
        if (slinkTo) {
            slinkTo.forEach(i => {
                i.update();
                drawCtrl(i);
            });
        }
        return;
    }
}