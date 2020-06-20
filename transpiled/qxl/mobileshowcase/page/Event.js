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
      "qx.bom.client.Browser": {
        "construct": true
      },
      "qx.bom.client.Engine": {
        "construct": true
      },
      "qx.ui.mobile.container.Composite": {},
      "qx.ui.mobile.layout.VBox": {},
      "qx.ui.mobile.basic.Image": {},
      "qx.bom.client.OperatingSystem": {},
      "qx.ui.mobile.basic.Label": {},
      "qx.ui.mobile.form.Group": {},
      "qx.bom.element.Style": {},
      "qx.bom.AnimationFrame": {},
      "qx.bom.client.Scroll": {},
      "qx.bom.element.Location": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "browser.name": {
          "construct": true,
          "className": "qx.bom.client.Browser"
        },
        "engine.name": {
          "construct": true,
          "className": "qx.bom.client.Engine"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "os.version": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "qx.mobile.nativescroll": {
          "className": "qx.bom.client.Scroll"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * Mobile page responsible for showing the "event" showcase.
   */
  qx.Class.define("qxl.mobileshowcase.page.Event", {
    extend: qxl.mobileshowcase.page.Abstract,
    construct: function construct() {
      qxl.mobileshowcase.page.Abstract.constructor.call(this, false);
      this.setTitle("Events");
      this.__P_6_0 = [];
      this.__P_6_1 = {};

      if (qx.core.Environment.get("browser.name") == "firefox") {
        this.__P_6_2 = "moz";
      } else if (qx.core.Environment.get("engine.name") == "mshtml") {
        this.__P_6_2 = "ms";
      }
    },
    members: {
      __P_6_3: null,
      __P_6_4: null,
      __P_6_5: null,
      __P_6_6: null,
      __P_6_7: null,
      __P_6_8: null,
      __P_6_0: null,
      __P_6_9: 0.3,
      __P_6_10: -15,
      __P_6_11: -15,
      __P_6_12: 0.3,
      __P_6_13: 1.5,
      __P_6_14: 0.3,
      __P_6_15: 0,
      __P_6_2: "webkit",
      __P_6_16: -130,
      __P_6_17: -130,
      __P_6_18: 0,
      __P_6_19: 0,
      __P_6_1: null,
      // overridden
      _initialize: function _initialize() {
        qxl.mobileshowcase.page.Event.prototype._initialize.base.call(this);

        var container = this.__P_6_4 = new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox().set({
          alignX: "center",
          alignY: "middle"
        }));
        container.addCssClass("eventcontainer");
        container.addListener("touchmove", function (evt) {
          evt.preventDefault();
        }, this); // CONTAINER TOUCH AREA

        var containerTouchArea = this.__P_6_3 = new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox().set({
          alignX: "center",
          alignY: "middle"
        }));
        containerTouchArea.addCssClass("container-touch-area");
        container.addListener("contextmenu", function (e) {
          e.preventDefault();
        });
        containerTouchArea.addListener("tap", this._onGesture, this);
        containerTouchArea.addListener("dbltap", this._onGesture, this);
        containerTouchArea.addListener("longtap", this._onGesture, this);
        containerTouchArea.addListener("swipe", this._onGesture, this);
        containerTouchArea.addListener("pointerdown", this._onPointer, this);
        containerTouchArea.addListener("pointermove", this._onPointer, this);
        containerTouchArea.addListener("pointerup", this._onPointer, this);
        containerTouchArea.addListener("pointercancel", this._onPointer, this);
        containerTouchArea.addListener("pointerout", this._onPointer, this);
        container.add(containerTouchArea); // GESTURE TARGET OBJECT

        this.__P_6_5 = new qx.ui.mobile.basic.Image("qxl/mobileshowcase/icon/HTML5_Badge_512.png");

        this.__P_6_5.addCssClass("gesture-target");

        this.__P_6_5.addListener("trackstart", this.__P_6_20, this);

        this.__P_6_5.addListener("track", this.__P_6_21, this);

        this.__P_6_5.addListener("trackend", this.__P_6_22, this);

        this.__P_6_5.addListener("pinch", this.__P_6_23, this);

        this.__P_6_5.addListener("rotate", this.__P_6_24, this);

        this.__P_6_5.setDraggable(false);

        this.__P_6_5.setTranslateX(-5000); // If OS is Android 2 remove HTML5 badge logo, because Android is not able to scale and rotate on the same element.


        var isAndroid2 = qx.core.Environment.get("os.name") == "android" && parseInt(qx.core.Environment.get("os.version").charAt(0)) < 4;

        if (isAndroid2) {
          this.__P_6_5.exclude();
        }

        container.add(this.__P_6_5); // POINTER VISUALISATION CIRCLES

        for (var i = 0; i < 15; i++) {
          var circle = new qx.ui.mobile.container.Composite();
          circle.addCssClass("touch");

          this.__P_6_0.push(circle);

          circle.setTranslateX(-5000);
          circle.setAnonymous(true);
          circle.setTransformUnit("px");
          containerTouchArea.add(circle);
        }

        var label = this.__P_6_7 = new qx.ui.mobile.basic.Label("Touch / Tap / Swipe this area");
        containerTouchArea.add(label);
        var descriptionText = "<b>Testing Pointer Events:</b> Touch / Tap / Swipe the area<br />\n\
      <b>Testing Multi-Pointer Events:</b> Touch the area with multiple fingers<br />\n\
      ";

        if (!isAndroid2) {
          descriptionText += "<b>Testing Pinch/Zoom Gesture:</b> Touch HTML5 logo with two fingers<br />";
        }

        descriptionText += "<b>Testing OrientationChange Event</b>: Rotate your device / change browser size";
        var descriptionLabel = new qx.ui.mobile.basic.Label(descriptionText);
        var descriptionGroup = new qx.ui.mobile.form.Group([descriptionLabel]);
        var containerGroup = new qx.ui.mobile.form.Group([container]);
        this.getContent().add(descriptionGroup, {
          flex: 1
        });
        this.getContent().add(containerGroup, {
          flex: 1
        }); // Center background gradient, when multiple pointers are available.

        qx.bom.element.Style.set(this.__P_6_3.getContentElement(), "background", "-" + this.__P_6_2 + "-radial-gradient(50% 50%, cover, #1a82f7, #2F2727)"); // Start rendering

        qx.bom.AnimationFrame.request(this._renderLabel, this);
        qx.bom.AnimationFrame.request(this._renderLogo, this);
      },

      /**
       * Event handler.
       *
       * @param evt {qx.event.type.Track} The track event.
       */
      __P_6_20: function __P_6_20(evt) {
        this.__P_6_18 = this.__P_6_16;
        this.__P_6_19 = this.__P_6_17;
      },

      /**
       * Event handler.
       *
       * @param evt {qx.event.type.Track} The track event.
       */
      __P_6_21: function __P_6_21(evt) {
        if (qx.core.Environment.get("qx.mobile.nativescroll") === false) {
          this._getScrollContainer().disable();
        }

        var delta = evt.getDelta();
        this.__P_6_16 = this.__P_6_18 + delta.x;
        this.__P_6_17 = this.__P_6_19 + delta.y;
        qx.bom.AnimationFrame.request(this._renderLogo, this);
      },

      /**
       * Event handler.
       *
       * @param evt {qx.event.type.Track} The track event.
       */
      __P_6_22: function __P_6_22() {
        if (qx.core.Environment.get("qx.mobile.nativescroll") === false) {
          this._getScrollContainer().enable();
        }

        this.__P_6_10 = this.__P_6_11;
        this.__P_6_9 = this.__P_6_12;
      },

      /**
       * Event handler.
       *
       * @param evt {qx.event.type.Rotate} The rotate event.
       */
      __P_6_24: function __P_6_24(evt) {
        this.__P_6_11 = this.__P_6_10 + evt.getAngle();
        qx.bom.AnimationFrame.request(this._renderLogo, this);
      },

      /**
       * Event handler.
       *
       * @param evt {qx.event.type.Pinch} The pinch event.
       */
      __P_6_23: function __P_6_23(evt) {
        var scale = evt.getScale() * this.__P_6_9;

        this.__P_6_12 = Math.round(scale * 100) / 100;
        this.__P_6_12 = Math.max(this.__P_6_12, this.__P_6_14);
        this.__P_6_12 = Math.min(this.__P_6_12, this.__P_6_13);
        qx.bom.AnimationFrame.request(this._renderLogo, this);
      },

      /**
       * Event handler.
       *
       * @param evt {qx.event.type.Pointer} The pointer event.
       */
      _onGesture: function _onGesture(evt) {
        var pointer = this.__P_6_1[evt.getPointerId()];

        if (pointer) {
          this.__P_6_1[evt.getPointerId()].events.push(evt.getType());
        }

        qx.bom.AnimationFrame.request(this._renderLabel, this);
      },

      /**
       * Reacts on pointer events and updates the event container background and pointer markers.
       *
       * @param evt {qx.event.type.Pointer} The pointer event.
       */
      _updatePointerPosition: function _updatePointerPosition(evt) {
        var position = this._getPointerPosition(evt);

        this._setPointerCirclePosition(evt.getPointerId(), position[0], position[1]);
      },

      /**
      * Resets the pointer circle position.
      *
      * @param pointerId {Integer} corresponding pointerId.
      */
      _resetPointerPosition: function _resetPointerPosition(pointerId) {
        var pointer = this.__P_6_1[pointerId];

        if (pointer && pointer.target && !pointer.remove) {
          this.__P_6_0.push(pointer.target);

          pointer.remove = true;
          pointer.target.setTranslateX(-1000);
          pointer.target.setTranslateY(-1000);
        }
      },

      /**
      * Sets the pointer circle position.
      *
      * @param pointerId {Integer} corresponding pointerId.
      * @param x {Integer} pointer position x.
      * @param y {Integer} pointer position y.
      */
      _setPointerCirclePosition: function _setPointerCirclePosition(pointerId, x, y) {
        // Disable pointer circles Windows Phone 8 as no pointer-events:none is available.
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
          return;
        }

        var pointer = this.__P_6_1[pointerId];

        if (pointer && pointer.target && pointer.remove == false) {
          pointer.target.setTranslateX(x);
          pointer.target.setTranslateY(y);
        }
      },

      /**
      * Calculates the pointer position relative to its container.
      *
      * @param evt {qx.event.type.Pointer} The pointer event.
      */
      _getPointerPosition: function _getPointerPosition(evt) {
        var containerLeft = qx.bom.element.Location.getLeft(this.__P_6_3.getContentElement(), "padding");
        var containerTop = qx.bom.element.Location.getTop(this.__P_6_3.getContentElement(), "padding");
        return [evt.getViewportLeft() - containerLeft, evt.getViewportTop() - containerTop];
      },

      /**
       * Event handler.
       *
       * @param evt {qx.event.type.Pointer} The pointer event.
       */
      _onPointer: function _onPointer(evt) {
        var type = evt.getType();
        var pointerId = evt.getPointerId();

        if (type == "pointerdown") {
          for (var key in this.__P_6_1) {
            var pointerToDelete = this.__P_6_1[key];

            if (pointerToDelete.remove) {
              delete this.__P_6_1[key];
            }
          } // Disable iScroll before


          if (qx.core.Environment.get("qx.mobile.nativescroll") == false) {
            this._getScrollContainer().disable();
          }

          this.__P_6_1[pointerId] = {
            target: this.__P_6_0.pop(),
            events: [],
            remove: false
          };

          this._updatePointerPosition(evt);
        }

        if (type == "pointermove") {
          this._updatePointerPosition(evt);
        }

        if (this.__P_6_1[pointerId] && !this.__P_6_1[pointerId].remove) {
          var pointerEvents = this.__P_6_1[pointerId].events;

          if (pointerEvents.length > 0) {
            var lastEventType = pointerEvents[pointerEvents.length - 1];

            if (lastEventType != type) {
              pointerEvents.push(type);
            }
          } else {
            pointerEvents.push(type);
          }
        }

        if (type == "pointerup" || type == "pointercancel" || type == "pointerout") {
          // Remove all circles out of visible area
          this._resetPointerPosition(pointerId);

          if (evt.isPrimary()) {
            this.__P_6_10 = this.__P_6_11;
            this.__P_6_9 = this.__P_6_12;
          } // Re-enable iScroll


          if (qx.core.Environment.get("qx.mobile.nativescroll") == false) {
            this._getScrollContainer().enable();
          }
        }

        qx.bom.AnimationFrame.request(this._renderLabel, this);
      },

      /**
      * Renders the position of the HTML5 Logo.
      */
      _renderLogo: function _renderLogo() {
        // Render HTML5 logo: rotation and scale.
        var gestureTargetElement = this.__P_6_5.getContentElement();

        var transitionValue = "translate(" + this.__P_6_16 + "px" + "," + this.__P_6_17 + "px) ";
        transitionValue = transitionValue + " scale(" + this.__P_6_12 + ")";
        transitionValue = transitionValue + " rotate(" + this.__P_6_11 + "deg)";
        qx.bom.element.Style.set(gestureTargetElement, "transform", transitionValue);
      },

      /**
      * Renders the label text.
      */
      _renderLabel: function _renderLabel() {
        var labelBuffer = "";

        for (var pointerId in this.__P_6_1) {
          var pointer = this.__P_6_1[pointerId];
          labelBuffer = labelBuffer + "<div class='pointers'>";
          labelBuffer = labelBuffer + "<span class='pointer'>" + pointerId + "</span>";

          for (var i = 0; i < pointer.events.length; i++) {
            labelBuffer = labelBuffer + " <span class='event'>" + pointer.events[i] + "</span>";
          }

          ;
          labelBuffer = labelBuffer + "</div>";
        }

        ;

        this.__P_6_7.setValue(labelBuffer);
      }
    }
  });
  qxl.mobileshowcase.page.Event.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Event.js.map?dt=1592642580599