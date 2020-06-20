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
      "qx.ui.mobile.form.Title": {},
      "qx.ui.mobile.toolbar.ToolBar": {},
      "qx.ui.mobile.toolbar.Button": {},
      "qx.lang.Function": {},
      "qx.ui.mobile.dialog.Manager": {},
      "qx.ui.mobile.container.Composite": {},
      "qx.ui.mobile.layout.HBox": {},
      "qx.ui.mobile.form.Button": {},
      "qx.ui.mobile.dialog.Popup": {},
      "qx.ui.mobile.dialog.BusyIndicator": {},
      "qx.ui.mobile.layout.VBox": {},
      "qx.ui.mobile.form.TextField": {}
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
       * Gabriel Munteanu (gabios)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /**
   * Mobile page responsible for showing the different showcases.
   *
   * @asset(qxl/mobileshowcase/icon/camera.png)
   */
  qx.Class.define("qxl.mobileshowcase.page.Toolbar", {
    extend: qxl.mobileshowcase.page.Abstract,
    statics: {
      __P_8_0: ["qxl/mobileshowcase/icon/arrowleft.png", "qxl/mobileshowcase/icon/camera.png"]
    },
    construct: function construct() {
      qxl.mobileshowcase.page.Abstract.constructor.call(this, false);
      this.setTitle("Toolbar");
    },
    events: {
      /** The page to show */
      "show": "qx.event.type.Data"
    },
    members: {
      /**
       * The toolbar
       */
      __P_8_1: null,
      __P_8_2: null,
      __P_8_3: null,
      __P_8_4: null,
      __P_8_5: null,
      __P_8_6: null,
      __P_8_7: null,
      __P_8_8: null,
      // overridden
      _initialize: function _initialize() {
        qxl.mobileshowcase.page.Toolbar.prototype._initialize.base.call(this);

        var label = new qx.ui.mobile.form.Title("Search");
        this.getContent().add(label);
        var toolbar = this.__P_8_1 = new qx.ui.mobile.toolbar.ToolBar();
        this.add(toolbar);
        var searchBtn = new qx.ui.mobile.toolbar.Button("Search");
        searchBtn.addListener("tap", function () {
          var searchDialog = this.__P_8_9();

          searchDialog.show();
        }, this);
        this.__P_8_7 = new qx.ui.mobile.toolbar.Button(null, qxl.mobileshowcase.page.Toolbar.__P_8_0[0]);

        this.__P_8_7.setShow("icon");

        this.__P_8_7.addListener("tap", function () {
          var popup = this.__P_8_10(this.__P_8_7);

          popup.show();
        }, this);

        this.__P_8_8 = new qx.ui.mobile.toolbar.Button(null, qxl.mobileshowcase.page.Toolbar.__P_8_0[1]);

        this.__P_8_8.setShow("icon");

        this.__P_8_8.addListener("tap", function () {
          var popup = this.__P_8_11();

          popup.show();
          qx.lang.Function.delay(popup.hide, 3000, popup);
        }, this);

        var deleteButton = new qx.ui.mobile.toolbar.Button("Delete");
        deleteButton.addListener("tap", function () {
          this.__P_8_6 = qx.ui.mobile.dialog.Manager.getInstance().warning('Deleting', 'Are you sure?', this.__P_8_12, this, ["Yes", "No"]);
        }, this);
        toolbar.add(searchBtn);
        toolbar.add(this.__P_8_7);
        toolbar.add(this.__P_8_8);
        toolbar.add(deleteButton);
      },
      __P_8_12: function __P_8_12(index) {
        if (index == 0) {
          this.__P_8_6.destroy();
        } else {
          this.__P_8_6.destroy();
        }
      },

      /**
       * Creates the popup widget to show when backButton is tapped
       */
      __P_8_10: function __P_8_10(anchor) {
        if (this.__P_8_4) {
          return this.__P_8_4;
        }

        var buttonsWidget = new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.HBox());
        var okButton = new qx.ui.mobile.form.Button("Yes");
        var cancelButton = new qx.ui.mobile.form.Button("No");
        buttonsWidget.add(okButton, {
          flex: 1
        });
        buttonsWidget.add(cancelButton, {
          flex: 1
        });
        okButton.addListener("tap", function () {
          this.__P_8_4.hide();
        }, this);
        cancelButton.addListener("tap", function () {
          this.__P_8_4.hide();
        }, this);
        this.__P_8_4 = new qx.ui.mobile.dialog.Popup(buttonsWidget, anchor);

        this.__P_8_4.setTitle("Are you sure?");

        return this.__P_8_4;
      },

      /**
       * Creates the popup widget to show when backButton is tapped
       */
      __P_8_11: function __P_8_11(attachedToWidget) {
        if (this.__P_8_2) {
          return this.__P_8_2;
        }

        var busyIndicator = new qx.ui.mobile.dialog.BusyIndicator("Data connection...");
        this.__P_8_2 = new qx.ui.mobile.dialog.Popup(busyIndicator, attachedToWidget);

        this.__P_8_2.setTitle("Loading...");

        return this.__P_8_2;
      },

      /**
       * Creates the popup widget to show when backButton is tapped
       */
      __P_8_9: function __P_8_9() {
        if (this.__P_8_5) {
          return this.__P_8_5;
        }

        var popupWidget = new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox());
        var searchField = new qx.ui.mobile.form.TextField();
        searchField.addListener("keydown", function (evt) {
          if (evt.getKeyIdentifier() == "Enter") {
            this.__P_8_5.hide();
          }
        }.bind(this));
        var searchButton = new qx.ui.mobile.form.Button("Search");
        searchButton.addListener("tap", function () {
          this.__P_8_5.hide();
        }, this);
        popupWidget.add(searchField);
        popupWidget.add(searchButton);
        this.__P_8_5 = new qx.ui.mobile.dialog.Popup(popupWidget);

        this.__P_8_5.setHideOnBlockerTap(true);

        this.__P_8_5.setModal(true);

        this.__P_8_5.setTitle('Search ...');

        return this.__P_8_5;
      },
      // overridden
      _stop: function _stop() {
        if (this.__P_8_6) {
          this.__P_8_6.hide();
        }

        if (this.__P_8_4) {
          this.__P_8_4.hide();
        }

        if (this.__P_8_2) {
          this.__P_8_2.hide();
        }

        if (this.__P_8_5) {
          this.__P_8_5.hide();
        }
      }
    }
  });
  qxl.mobileshowcase.page.Toolbar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Toolbar.js.map?dt=1592642580863