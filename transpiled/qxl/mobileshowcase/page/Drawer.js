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
      "qx.ui.mobile.container.Drawer": {},
      "qx.ui.mobile.layout.VBox": {},
      "qx.ui.mobile.form.Button": {},
      "qx.ui.mobile.form.Group": {},
      "qx.ui.mobile.form.Label": {},
      "qx.ui.mobile.form.Form": {},
      "qx.ui.mobile.form.RadioGroup": {},
      "qx.ui.mobile.form.RadioButton": {},
      "qx.ui.mobile.form.renderer.Single": {},
      "qx.ui.mobile.form.Title": {}
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
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * Mobile page showing the "Drawer" showcase.
   */
  qx.Class.define("qxl.mobileshowcase.page.Drawer", {
    extend: qxl.mobileshowcase.page.Abstract,
    construct: function construct() {
      qxl.mobileshowcase.page.Abstract.constructor.call(this, false);
      this.setTitle("Drawer");
    },
    members: {
      /** Factory method for creation of drawers. */
      _createDrawer: function _createDrawer(orientation) {
        var drawer = new qx.ui.mobile.container.Drawer(this, new qx.ui.mobile.layout.VBox());
        drawer.setOrientation(orientation);
        drawer.setTapOffset(0);
        drawer.setPositionZ("below");
        return drawer;
      },

      /** Factory method for the a demo drawer's content. */
      _createDrawerContent: function _createDrawerContent(target) {
        var closeDrawerButton = new qx.ui.mobile.form.Button("Close");
        closeDrawerButton.addListener("tap", function () {
          target.hide();
        }, this);
        var drawerContent = new qx.ui.mobile.form.Group([new qx.ui.mobile.form.Label("This is the " + target.getOrientation() + " drawer."), closeDrawerButton]);
        return drawerContent;
      },

      /** Factory method for the a drawer menu. */
      _createDrawerMenu: function _createDrawerMenu(drawers) {
        var drawerGroup = new qx.ui.mobile.form.Group();

        for (var i = 0; i < drawers.length; i++) {
          var openDrawerButton = new qx.ui.mobile.form.Button("Open " + drawers[i].getOrientation() + " drawer");
          openDrawerButton.addListener("tap", drawers[i].show, drawers[i]);
          drawerGroup.add(openDrawerButton);
        }

        return drawerGroup;
      },
      // overridden
      _initialize: function _initialize() {
        qxl.mobileshowcase.page.Drawer.prototype._initialize.base.call(this); // DRAWERS


        var drawerSize = 175;

        var drawerBottom = this._createDrawer("bottom");

        drawerBottom.setSize(drawerSize);
        drawerBottom.add(this._createDrawerContent(drawerBottom));

        var drawerTop = this._createDrawer("top");

        drawerTop.setSize(drawerSize);
        drawerTop.add(this._createDrawerContent(drawerTop));

        var drawerLeft = this._createDrawer("left");

        drawerLeft.setSize(drawerSize);
        drawerLeft.add(this._createDrawerContent(drawerLeft));

        var drawerRight = this._createDrawer("right");

        drawerRight.setSize(drawerSize);
        drawerRight.add(this._createDrawerContent(drawerRight)); // Z POSITION TOGGLE BUTTON

        var group = new qx.ui.mobile.form.Group([], false);
        var form = new qx.ui.mobile.form.Form();
        var radioGroup = new qx.ui.mobile.form.RadioGroup();
        var radioAbove = new qx.ui.mobile.form.RadioButton();
        radioAbove.setModel("above");
        var radioBelow = new qx.ui.mobile.form.RadioButton();
        radioBelow.setModel("below");
        radioGroup.add(radioAbove);
        radioGroup.add(radioBelow);
        form.add(radioAbove, "Above");
        form.add(radioBelow, "Below");
        radioGroup.bind("modelSelection[0]", drawerRight, "positionZ");
        radioGroup.bind("modelSelection[0]", drawerLeft, "positionZ");
        radioGroup.bind("modelSelection[0]", drawerTop, "positionZ");
        radioGroup.bind("modelSelection[0]", drawerBottom, "positionZ");
        group.add(new qx.ui.mobile.form.renderer.Single(form)); // PAGE CONTENT

        this.getContent().add(new qx.ui.mobile.form.Title("Position"));
        this.getContent().add(group);
        this.getContent().add(new qx.ui.mobile.form.Title("Action"));
        this.getContent().add(this._createDrawerMenu([drawerTop, drawerRight, drawerBottom, drawerLeft]));
      }
    }
  });
  qxl.mobileshowcase.page.Drawer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Drawer.js.map?dt=1592642580694