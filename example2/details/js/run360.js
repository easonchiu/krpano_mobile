function run360(o) {
    this.init(o);
    var t = this;
}
run360.prototype.run = function (r) {
    var o = this.data;
    if (!this.mulit) {
        if (r == "right") {
            o.current++;
            if (o.current > o.count) {
                o.current = 1;
            }
            o.el.setAttribute("class", o.name + " angle-" + o.angle + " position-" + o.current);
        } else if (r == 'left') {
            o.current--;
            if (o.current < 1) {
                o.current = o.count;
            }
            o.el.setAttribute("class", o.name + " angle-" + o.angle + " position-" + o.current);
        } else {
            o.el.setAttribute("class", o.name + " angle-" + o.angle + " position-" + o.current);
        }
    }
}
run360.prototype.init = function (o) {
    var th = this;
    th.data = o;
    th.data.maxAngle = o.angle;
    th.data.angle = Math.ceil(th.data.maxAngle / 2);
    th.set(o.width, o.height, o.scale);
    th.run();
    th.data.scaleEnd = o.scale;
}
run360.prototype.gestureStart = function (e, th) {
    clearTimeout(th.timeout2);
    th.mulit = true;
}
run360.prototype.gestureChange = function (e, th) {
    th = th.data;

    th.scale = e.scale - 1 + th.scaleEnd;
    if (th.scale < th.scaleRange[0]) {
        th.scale = th.scaleRange[0];
    } else if (th.scale > th.scaleRange[1]) {
        th.scale = th.scaleRange[1];
    }

    th.el.setAttribute('style', 'width:' + th.width + 'px;height:' + th.height + 'px;-webkit-transform:scale(' + th.scale + ') translate(-50%,-50%)');
}
run360.prototype.gestureEnd = function (e, th) {
    th.data.scaleEnd = th.data.scale;
    clearTimeout(th.timeout2);
    th.timeout2 = setTimeout(function () {
        th.mulit = false;
    }, 100);
    th.afterMulit = true;
}
run360.prototype.moveStart = function (e, th) {

    th.pinchEl.on('panmove', function (e) {
        th.move(e, th);
    });
    th.pinchEl.on('panend', function (e) {
        th.moveEnd(e, th);
    });

    clearTimeout(th.timeout3);
    th.startX = e.pointers[0].pageX;
    th.startY = e.pointers[0].pageY;
    th._startX = th.startX;
    th.startTime = new Date().getTime();
    e.preventDefault();
    th.afterMulit = false;
}
run360.prototype.move = function (e, th) {

    var x = e.pointers[0].pageX;
    var y = e.pointers[0].pageY;
    var yy = th.startY - y;
    var xx = th.startX - x;

    if (xx > 25) {
        th.startX = x;
        th.run('right');
    } else if (xx < -25) {
        th.startX = x;
        th.run('left');
    }
    if (yy > 25) {
        th.startY = y;
        if (th.data.angle > 1) {
            th.data.angle--;
            th.run();
        }
    } else if (yy < -25) {
        th.startY = y;
        if (th.data.angle < th.data.maxAngle) {
            th.data.angle++;
            th.run();
        }
    }
}
run360.prototype.moveEnd = function (e, th) {

    th.pinchEl.off('panmove');
    th.pinchEl.off('panend');

    var x = e.pointers[0].pageX;
    var y = e.pointers[0].pageY;

    th.startY = y;
    th.startX = x;

    var t = new Date().getTime() - th.startTime;
    if (th._startX < x) {
        th.direction = "left";
    } else {
        th.direction = "right";
    }
    var distance = Math.abs(th._startX - x);
    clearTimeout(th.timeout3);

    if (t < 250 && distance > 50) {
        th.ani(distance / t);
    }
}
run360.prototype.ani = function (speed) {
    if (speed < 1) {
        speed = 1;
    }
    var th = this;
    if (!th.afterMulit) {
        clearTimeout(th.timeout);
        if (speed < 100) {
            th.timeout = setTimeout(function () {
                th.ani(speed * 2);
                th.run(th.direction);
            }, speed);
        } else {
            th.moveType = undefined;
        }
    } else {
        th.moveType = undefined;
    }
}
run360.prototype.set = function (w, h, s) {
//        s = 414 / 600;
    var style = "width:" + w + "px; height:" + h + "px; -webkit-transform: scale(" + s + "," + s + ") translate(-50%,-50%);";
//        var style = "-webkit-transform: scale(" + s + "," + s + ") translate(-50%,-50%);";

    this.data.el.setAttribute('style', style);
//        console.log(600 * s)
    this.data.el.parentNode.style.height = (600 * s) + 'px';
    var top = (600 * s) / 2;
    this.data.el.style.top = top + 'px';
}
run360.prototype.play = function () {
    var th = this;
    th.pause();

    clearTimeout(th.__timer);
    th.__timer = setTimeout(function () {

        th.pinchEl = new Hammer(document.body);
        th.pinchEl.parent = th;
        th.pinchEl.get('pinch').set({enable: true});
        th.pinchEl.off('panstart panmove panend gesturestart gesturemove gestureend');

        th.pinchEl.on('panstart', function (e) {
            th.moveStart(e, th);
        });
        th.pinchEl.on('pinchstart', function (e) {
            th.gestureStart(e, th);
        });
        th.pinchEl.on('pinchmove', function (e) {
            th.gestureChange(e, th);
        });
        th.pinchEl.on('pinchend', function (e) {
            th.gestureEnd(e, th);
        });

    }, 100);
}
run360.prototype.destroy = run360.prototype.pause = function () {
    var th = this;

    clearTimeout(th.__timer);
    clearTimeout(th.timeout);
    clearTimeout(th.timeout2);
    clearTimeout(th.timeout3);

    if (th.pinchEl) {
        th.pinchEl.off('panstart panmove panend gesturestart gesturemove gestureend');
    }

}