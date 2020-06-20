(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.log.appender.Console": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Mobile": {
        "require": true
      },
      "qxl.mobileshowcase.page.Overview": {},
      "qxl.mobileshowcase.page.Event": {},
      "qxl.mobileshowcase.page.Carousel": {},
      "qxl.mobileshowcase.page.Drawer": {},
      "qxl.mobileshowcase.page.List": {},
      "qxl.mobileshowcase.page.Tab": {},
      "qxl.mobileshowcase.page.Toolbar": {},
      "qxl.mobileshowcase.page.Form": {},
      "qxl.mobileshowcase.page.Animation": {},
      "qxl.mobileshowcase.page.AnimationLanding": {},
      "qxl.mobileshowcase.page.Basic": {},
      "qxl.mobileshowcase.page.Dialog": {},
      "qxl.mobileshowcase.page.DataBinding": {},
      "qxl.mobileshowcase.page.Maps": {},
      "qxl.mobileshowcase.page.Canvas": {},
      "qxl.mobileshowcase.page.Theming": {},
      "qx.ui.mobile.page.Manager": {},
      "qx.bom.client.Device": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "device.type": {
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
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /*
   * If you have added resources to your app remove the leading '*' in the
   * following line to make use of them.
  
  
  ************************************************************************ */

  /**
   * This is the main application class for the mobile showcase app.
   * @require(qx.log.appender.Console)
   * @asset(qxl/mobileshowcase/*)
   */
  qx.Class.define("qxl.mobileshowcase.Application", {
    extend: qx.application.Mobile,
    members: {
      /**
       * This method contains the initial application code and gets called
       * during startup of the application
       */
      main: function main() {
        // Call super class
        qxl.mobileshowcase.Application.prototype.main.base.call(this); // Enable logging in debug variant

        /*
        -------------------------------------------------------------------------
          Below is your actual application code...
        -------------------------------------------------------------------------
        */
        // Create the pages
        var overview = new qxl.mobileshowcase.page.Overview();
        var events = new qxl.mobileshowcase.page.Event();
        var carousel = new qxl.mobileshowcase.page.Carousel();
        var drawer = new qxl.mobileshowcase.page.Drawer();
        var list = new qxl.mobileshowcase.page.List();
        var tab = new qxl.mobileshowcase.page.Tab();
        var toolbar = new qxl.mobileshowcase.page.Toolbar();
        var form = new qxl.mobileshowcase.page.Form();
        var animation = new qxl.mobileshowcase.page.Animation();
        var animationLanding = new qxl.mobileshowcase.page.AnimationLanding();
        var basic = new qxl.mobileshowcase.page.Basic();
        var dialogs = new qxl.mobileshowcase.page.Dialog();
        var dataBinding = new qxl.mobileshowcase.page.DataBinding();
        var maps = new qxl.mobileshowcase.page.Maps();
        var canvas = new qxl.mobileshowcase.page.Canvas();
        var theming = new qxl.mobileshowcase.page.Theming(); // Add the pages to the page manager

        var manager = new qx.ui.mobile.page.Manager();
        manager.addMaster(overview);
        manager.addDetail([basic, events, carousel, drawer, list, tab, toolbar, form, animation, animationLanding, dialogs, dataBinding, maps, canvas, theming]); // Initialize the navigation

        var routing = this.getRouting();

        if (qx.core.Environment.get("device.type") == "tablet" || qx.core.Environment.get("device.type") == "desktop") {
          routing.onGet("/.*", this._show, overview);
          routing.onGet("/", this._show, basic);
        }

        routing.onGet("/", this._show, overview);
        routing.onGet("/basic", this._show, basic);
        routing.onGet("/dialog", this._show, dialogs);
        routing.onGet("/tab", this._show, tab);
        routing.onGet("/form", this._show, form);
        routing.onGet("/list", this._show, list);
        routing.onGet("/toolbar", this._show, toolbar);
        routing.onGet("/carousel", this._show, carousel);
        routing.onGet("/drawer", this._show, drawer);
        routing.onGet("/databinding", this._show, dataBinding);
        routing.onGet("/event", this._show, events);
        routing.onGet("/maps", this._show, maps);
        routing.onGet("/canvas", this._show, canvas);
        routing.onGet("/theming", this._show, theming);
        routing.onGet("/animation", this._show, animation);
        routing.onGet("/animation/{animation}", function (data) {
          animationLanding.setAnimation(data.params.animation);

          if (animationLanding.isVisible()) {
            animation.show({
              "animation": data.params.animation
            });
          } else {
            animationLanding.show({
              "animation": data.params.animation
            });
          }
        }, this);
        routing.init();
      },

      /**
       * Default behaviour when a route matches. Displays the corresponding page on screen.
       * @param data {Map} the animation properties
       */
      _show: function _show(data) {
        this.show(data.customData);
      }
    }
  });
  qxl.mobileshowcase.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1592642579553