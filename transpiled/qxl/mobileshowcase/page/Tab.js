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
      "qx.ui.mobile.tabbar.TabBar": {},
      "qx.ui.mobile.tabbar.TabButton": {},
      "qx.ui.mobile.basic.Label": {}
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
   * Mobile page responsible for showing the "tab" showcase.
   */
  qx.Class.define("qxl.mobileshowcase.page.Tab", {
    extend: qxl.mobileshowcase.page.Abstract,
    construct: function construct() {
      qxl.mobileshowcase.page.Abstract.constructor.call(this);
      this.setTitle("Tabs");
    },
    members: {
      // overridden
      _initialize: function _initialize() {
        qxl.mobileshowcase.page.Tab.prototype._initialize.base.call(this);

        var tabBar = this.__P_7_0(); // Default add TabBar after NavigationBar.


        this.addAfterNavigationBar(tabBar);
      },

      /**
       * Creates the tab bar.
       *
       * @return {qx.ui.mobile.tabbar.TabBar} created tab bar.
       */
      __P_7_0: function __P_7_0() {
        var tabBar = new qx.ui.mobile.tabbar.TabBar();

        var view1 = this.__P_7_1("<b>qx.Desktop</b><br/><br/>Create desktop oriented applications. Features a rich and extendable set of widgets. No HTML/CSS knowledge required.");

        var view2 = this.__P_7_1("<b>qx.Mobile</b><br/><br/>Create mobile apps that run on all major mobile operating systems, without writing any HTML.");

        var view3 = this.__P_7_1("<b>qx.Server</b><br/><br/>Use the same OOP pattern known from the client side, reuse code and generate files you can deploy in your server environment.");

        var view4 = this.__P_7_1("<b>qx.Website</b><br/><br/>A cross-browser DOM manipulation library to enhance websites with a rich user experience.");

        view1.addCssClass("view1");
        view2.addCssClass("view2");
        view3.addCssClass("view3");
        view4.addCssClass("view4");
        var tabButton1 = new qx.ui.mobile.tabbar.TabButton("Desktop");
        tabButton1.setView(view1);
        var tabButton2 = new qx.ui.mobile.tabbar.TabButton("Mobile");
        tabButton2.setView(view2);
        var tabButton3 = new qx.ui.mobile.tabbar.TabButton("Server");
        tabButton3.setView(view3);
        var tabButton4 = new qx.ui.mobile.tabbar.TabButton("Website");
        tabButton4.setView(view4);
        tabBar.add(tabButton4);
        tabBar.add(tabButton2);
        tabBar.add(tabButton3);
        tabBar.add(tabButton1);
        return tabBar;
      },

      /**
       * Creates the view for the tab.
       *
       * @param text {String} The text of the label used in this view.
       * @return {qx.ui.mobile.basic.Label} the created view.
       */
      __P_7_1: function __P_7_1(text) {
        var label = new qx.ui.mobile.basic.Label(text);
        this.getContent().add(label);
        return label;
      }
    }
  });
  qxl.mobileshowcase.page.Tab.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Tab.js.map?dt=1592642580802