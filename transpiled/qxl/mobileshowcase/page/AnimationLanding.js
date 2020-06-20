(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.mobileshowcase.page.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.list.List": {},
      "qxl.mobileshowcase.page.Animation": {},
      "qx.data.Array": {},
      "qx.core.Init": {}
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
   * Mobile page responsible for showing the landing page for the "animation" showcase.
   */
  qx.Class.define("qxl.mobileshowcase.page.AnimationLanding", {
    extend: qxl.mobileshowcase.page.Abstract,
    construct: function construct() {
      qxl.mobileshowcase.page.Abstract.constructor.call(this, true);
      this.setTitle("Page Transitions");
      this.setShowBackButtonOnTablet(true);
    },
    properties: {
      /**
       * The current animaton.
       */
      animation: {
        check: "String",
        init: ""
      }
    },
    members: {
      // overridden
      _initialize: function _initialize() {
        qxl.mobileshowcase.page.AnimationLanding.prototype._initialize.base.call(this);

        if (this._isTablet) {
          this.addListener("disappear", this.__P_10_0, this);
        }

        var list = new qx.ui.mobile.list.List({
          configureItem: function configureItem(item, data, row) {
            item.setTitle(data.title);
            item.setShowArrow(true);
          }
        });
        list.addCssClass("animation-list-2");
        var animationData = qxl.mobileshowcase.page.Animation.ANIMATION_DATA;
        list.setModel(new qx.data.Array(animationData));
        list.addListener("changeSelection", function (evt) {
          // In Tablet Mode, animation should be shown for this showcase part.
          // On animation landing >> setShowAnimation(false) is called.
          this.getLayoutParent().getLayout().setShowAnimation(true);
          qx.core.Init.getApplication().getRouting().executeGet("/animation/" + animationData[evt.getData()].animation);
        }, this);
        this.getContent().add(list);
      },

      /**
       * Deactivates the animation on parentContainer's layout.
       */
      __P_10_0: function __P_10_0() {
        this.getLayoutParent().getLayout().setShowAnimation(false);
      },
      // overridden
      _back: function _back() {
        qx.core.Init.getApplication().getRouting().executeGet("/animation", {
          animation: this.getAnimation(),
          reverse: true
        });
      }
    }
  });
  qxl.mobileshowcase.page.AnimationLanding.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AnimationLanding.js.map?dt=1592642581022