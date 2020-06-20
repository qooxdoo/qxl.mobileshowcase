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
      "qx.data.Array": {},
      "qx.core.Init": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * Mobile page responsible for showing the "animation" showcase.
   */
  qx.Class.define("qxl.mobileshowcase.page.Animation", {
    extend: qxl.mobileshowcase.page.Abstract,
    construct: function construct() {
      qxl.mobileshowcase.page.Abstract.constructor.call(this);
      this.setTitle("Page Transitions");
    },
    statics: {
      ANIMATION_DATA: [{
        title: "Slide",
        animation: "slide"
      }, {
        title: "Pop",
        animation: "pop"
      }, {
        title: "Fade",
        animation: "fade"
      }, {
        title: "Slide up",
        animation: "slideup"
      }, {
        title: "Flip",
        animation: "flip"
      }, {
        title: "Swap",
        animation: "swap"
      }, {
        title: "Cube",
        animation: "cube"
      }]
    },
    members: {
      // overridden
      _initialize: function _initialize() {
        qxl.mobileshowcase.page.Animation.prototype._initialize.base.call(this);

        var list = new qx.ui.mobile.list.List({
          configureItem: function configureItem(item, data, row) {
            item.setTitle(data.title);
            item.setShowArrow(true);
          }
        });
        list.addCssClass("animation-list-1");
        list.setModel(new qx.data.Array(qxl.mobileshowcase.page.Animation.ANIMATION_DATA));
        list.addListener("changeSelection", function (evt) {
          // In Tablet Mode, animation should be shown for this showcase part.
          // On animation landing >> setShowAnimation(false) is called.
          this.getLayoutParent().getLayout().setShowAnimation(true);
          var animation = qxl.mobileshowcase.page.Animation.ANIMATION_DATA[evt.getData()].animation;
          qx.core.Init.getApplication().getRouting().executeGet("/animation/" + animation);
        }, this);
        this.getContent().add(list);
      }
    }
  });
  qxl.mobileshowcase.page.Animation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Animation.js.map?dt=1592642580983