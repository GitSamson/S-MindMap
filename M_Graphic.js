function Graphic(parent, type = ("rect" | 'c' | 'tri' | 'squ' | 'diamond'), x, y, w_r = 0, h = 0) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.type = type;

    switch (type) {
        case 'rect':
            this.width = w_r;
            this.height = h;
            break;
        case ('c'):
            this.radius = w_r;
            break;
            case('diamond'):
            this.radius = w_r;
            break;
        case 'squ':
            this.edge = w_r;
            break;
    }

}
Object.defineProperties(Graphic.prototype, {
    position: {
        get: function () {
            return (point(this.x, this.y));
        }
    },
    top: {
        get: function () {
            switch (this.type) {
                case 'rect':
                    return this.y;
                case( 'c' ):
                    return( this.y - this.radius);
                case ('diamond'):
                    return (this.y - this.radius);
                case 'squ':
                    return (this.y - (this.edge));

            }

        }
    },
    bot: {
        get: function () {
            if (this.type == 'rect') { return (this.y + this.height) }
            if (this.type == 'c' || 'diamond') { return this.y + this.radius }
            if (this.type == 'squ') { return this.y + (this.edge) }
            return (this.y + (this.type == 'rect' ? this.height : this.radius));
        }
    },

    left: {
        get: function () {
            if (this.type == 'squ') { return (this.x - (this.edge)) }

            if (this.type == 'rect') {
                return ({ x: (this.x), y: (this.y + (this.height / 2)) })
            }
            if (this.type == 'c' || 'diamond') {
                return (point(this.x, this.y));
            }

        }
    },
    right: {
        get: function () {
            if (this.type == 'squ') { return (this.x + (this.edge)) }
            if (this.type == 'rect') {
                return ({ x: (this.x + this.width), y: (this.y + (this.height / 2)) })
            }
            if (this.type == 'c' || 'diamond') {
                return (point(this.x, this.y));
            }
        }
    },
    center: {
        get: function () {

            if (this.type == 'rect') {
                return (point(this.x + (this.width / 2), this.y + (this.height / 2)))
            }
            if (this.type == 'c' || 'squ' || 'diamond') {
                return (point(this.x, this.y))
            }
        },
        set: ({ x: x, y: y }) => {
            if (this.type == 'rect') {
                this.x = x - this.width / 2;
                this.y = y - this.height / 2;
                return;
            }
            if (this.type == 'c' || 'squ'|| 'diamond') {
                this.x = x;
                this.y = y;
            }
        }
    },

});
Graphic.prototype.isOn = function (e) {
    let ex = e.x;
    let ey = e.y;
    const senseArea = 2;
    if (this.type == 'rect') {
        return (
            this.left.x - senseArea <= ex &&
            this.right.x + senseArea >= ex &&
            this.top - senseArea < ey &&
            this.bot + senseArea > ey);
    }

    if (this.type == 'squ') {
        return (
            this.x - (this.edge) - senseArea < ex &&
            this.x + (this.edge) - senseArea > ex &&
            this.top - senseArea < ey &&
            this.bot + senseArea > ey);
    }
    if (this.type == 'c'||'diamond') {
        let result = Di_lessThan(this.center, e, this.radius + senseArea);
        return (result);
    }
}
Graphic.prototype.draw = function () {
    switch (this.type) {
        case 'rect':
            CanvDraw.rect(this.x, this.y, this.width, this.height);
            break;
        case ('c'):
            CanvDraw.c(this.x, this.y, this.radius);
            break;
        case 'squ':
            CanvDraw.rect(this.x - (this.edge),
                this.y - (this.edge),
                this.edge * 2,
                this.edge * 2);
            break;
        case 'diamond':
            
            CanvDraw.pl([this.x-this.radius,this.y],[this.x,this.y-this.radius],[this.x+this.radius,this.y],[this.x,this.y+this.radius]);
            CanvStyle.CtrlDot();
            break;
    }


}