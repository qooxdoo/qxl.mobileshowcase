(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.mobileshowcase.page.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.bom.client.Device": {
        "construct": true
      },
      "qx.ui.mobile.navigationbar.Button": {},
      "qx.bom.Viewport": {},
      "qx.ui.mobile.embed.Canvas": {},
      "qx.bom.Event": {},
      "qx.bom.element.Style": {},
      "qx.ui.mobile.container.Composite": {},
      "qx.bom.element.Location": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "device.pixelRatio": {
          "construct": true,
          "className": "qx.bom.client.Device"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * Mobile page showing a HTML5 canvas example.
   *
   * @asset(qx/mobile/css/*)
   */
  qx.Class.define("qxl.mobileshowcase.page.Canvas", {
    extend: qxl.mobileshowcase.page.Abstract,
    construct: function construct() {
      qxl.mobileshowcase.page.Abstract.constructor.call(this, false);
      this.setTitle("Canvas");
      this.__P_13_0 = qx.core.Environment.get("device.pixelRatio");
    },
    members: {
      __P_13_1: 0,
      __P_13_2: 0,
      __P_13_3: null,
      __P_13_4: null,
      __P_13_5: 1000,
      __P_13_0: 1,
      // overridden
      _initialize: function _initialize() {
        qxl.mobileshowcase.page.Canvas.prototype._initialize.base.call(this);

        this.__P_13_4 = {};
        var clearButton = new qx.ui.mobile.navigationbar.Button("Clear");
        clearButton.addListener("tap", this.__P_13_6, this);
        this.getRightContainer().add(clearButton);
        var canvasSize = Math.max(qx.bom.Viewport.getWidth() * 1.5, qx.bom.Viewport.getHeight() * 1.5); // Limit to maximum canvas size of iOS devices.

        canvasSize = Math.min(canvasSize, 1448 / this.__P_13_0);
        this.__P_13_5 = canvasSize;
        var canvas = this.__P_13_3 = new qx.ui.mobile.embed.Canvas();
        canvas.addListener("trackstart", this._onTrackStart, this);
        canvas.addListener("trackend", this._onTrackEnd, this);
        canvas.addListener("track", this._onTrack, this);
        canvas.addListener("touchstart", qx.bom.Event.preventDefault, this);
        canvas.setWidth(this._to(this.__P_13_5));
        canvas.setHeight(this._to(this.__P_13_5));
        qx.bom.element.Style.set(canvas.getContentElement(), "width", this.__P_13_5 + "px");
        qx.bom.element.Style.set(canvas.getContentElement(), "height", this.__P_13_5 + "px");
        this.getContent().add(canvas);

        this.__P_13_6();

        this._drawExample();
      },
      _createScrollContainer: function _createScrollContainer() {
        return new qx.ui.mobile.container.Composite();
      },

      /**
      * Calculates the correct position in relation to the device pixel ratio.
      * @return {Number} the correct position.
      */
      _to: function _to(value) {
        return value * this.__P_13_0;
      },

      /**
       * Draws the example on the canvas.
       */
      _drawExample: function _drawExample() {
        // Comment in Text
        var ctx = this.__P_13_3.getContext2d();

        ctx.fillStyle = 'gray';
        ctx.font = 'bold ' + this._to(16) + 'px Helvetica';
        ctx.fillText('Start drawing here ...', this._to(15), this._to(25)); // Smiley

        ctx.strokeStyle = '#3D72C9';
        ctx.beginPath();
        ctx.arc(475, 85, 50, 0, Math.PI * 2, true);
        ctx.moveTo(510, 85);
        ctx.arc(475, 85, 35, 0, Math.PI, false);
        ctx.moveTo(465, 75);
        ctx.arc(460, 75, 5, 0, Math.PI * 2, true);
        ctx.moveTo(495, 75);
        ctx.arc(490, 75, 5, 0, Math.PI * 2, true);
        ctx.stroke();
      },

      /**
       * Removes any drawings off the canvas.
       */
      __P_13_6: function __P_13_6() {
        this.__P_13_3.getContentElement().width = this.__P_13_3.getContentElement().width;

        var ctx = this.__P_13_3.getContext2d();

        ctx.clearRect(0, 0, this._to(this.__P_13_5), this._to(this.__P_13_5));
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, this._to(this.__P_13_5), this._to(this.__P_13_5));
        ctx.fill();
      },

      /**
       * Handles the <code>trackstart</code>  event on canvas.
       */
      _onTrackStart: function _onTrackStart(evt) {
        this.__P_13_1 = qx.bom.element.Location.getLeft(this.__P_13_3.getContentElement(), "padding");
        this.__P_13_2 = qx.bom.element.Location.getTop(this.__P_13_3.getContentElement(), "padding");

        this.__P_13_7(evt);
      },

      /**
       * Handles the <code>track</code>  event on canvas.
       */
      _onTrack: function _onTrack(evt) {
        this.__P_13_7(evt);

        evt.preventDefault();
        evt.stopPropagation();
      },

      /**
       * Handles the <code>trackend</code> event on canvas.
       */
      _onTrackEnd: function _onTrackEnd(evt) {
        this.__P_13_4 = {};
      },

      /**
       * Draws the line on canvas.
       */
      __P_13_7: function __P_13_7(evt) {
        var ctx = this.__P_13_3.getContext2d();

        var lastPoint = this.__P_13_4[evt.getPointerId()];

        var pointerLeft = evt.getViewportLeft() - this.__P_13_1;

        var pointerTop = evt.getViewportTop() - this.__P_13_2;

        var opacity = null;

        if (lastPoint) {
          ctx.beginPath();
          ctx.lineCap = 'round';
          ctx.moveTo(this._to(lastPoint.x), this._to(lastPoint.y));
          ctx.lineTo(this._to(pointerLeft), this._to(pointerTop));
          var deltaX = Math.abs(lastPoint.x - pointerLeft);
          var deltaY = Math.abs(lastPoint.y - pointerTop);
          var velocity = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
          opacity = (100 - velocity) / 100;
          opacity = Math.round(opacity * Math.pow(10, 2)) / Math.pow(10, 2);

          if (!lastPoint.opacity) {
            lastPoint.opacity = 1;
          }

          if (opacity < 0.1) {
            opacity = 0.1;
          } // linear gradient from start to end of line


          var grad = ctx.createLinearGradient(lastPoint.x, lastPoint.y, pointerLeft, pointerTop);
          grad.addColorStop(0, 'rgba(61,114,201,' + lastPoint.opacity + ')');
          grad.addColorStop(1, 'rgba(61,114,201,' + opacity + ')');
          ctx.strokeStyle = grad;
          ctx.lineWidth = this._to(1.5);
          ctx.stroke();
        }

        this.__P_13_4[evt.getPointerId()] = {
          "x": pointerLeft,
          "y": pointerTop,
          "opacity": opacity
        };
      }
    },
    destruct: function destruct() {
      this._disposeObjects();
    }
  });
  qxl.mobileshowcase.page.Canvas.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Canvas.js.map?dt=1592642581325