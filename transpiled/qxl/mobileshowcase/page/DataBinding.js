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
      "qx.event.Timer": {
        "construct": true
      },
      "qx.data.Array": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Init": {},
      "qx.ui.mobile.form.Button": {},
      "qx.ui.mobile.form.Title": {},
      "qx.ui.mobile.form.renderer.Single": {},
      "qx.bom.element.Style": {},
      "qx.ui.mobile.form.Form": {},
      "qx.ui.mobile.form.Slider": {},
      "qx.ui.mobile.form.TextField": {},
      "qx.ui.mobile.list.List": {}
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
       * Christopher Zündorf (czuendorf)
  
  ************************************************************************ */

  /**
   * Mobile page responsible for showing the "DataBinding" showcase.
   */
  qx.Class.define("qxl.mobileshowcase.page.DataBinding", {
    extend: qxl.mobileshowcase.page.Abstract,
    construct: function construct() {
      qxl.mobileshowcase.page.Abstract.constructor.call(this);
      this.setTitle("Data Binding");
      this.__P_12_0 = new qx.event.Timer(50);

      this.__P_12_0.addListener("interval", this.__P_12_1, this);
    },

    /*
    *****************************************************************************
      PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      listData: {
        init: new qx.data.Array(),
        nullable: true,
        event: "updateListData"
      }
    },

    /*
    *****************************************************************************
      EVENTS
    *****************************************************************************
    */
    events: {
      /** Event which occurs when the listData is updated. */
      "updateListData": "qx.event.type.Data"
    },
    members: {
      __P_12_2: true,
      __P_12_3: null,
      __P_12_4: null,
      __P_12_5: null,
      __P_12_0: null,
      __P_12_6: null,
      __P_12_7: null,
      __P_12_8: null,
      __P_12_9: null,
      // overridden
      _initialize: function _initialize() {
        qxl.mobileshowcase.page.DataBinding.prototype._initialize.base.call(this);

        this.__P_12_6 = this.__P_12_10();
        this.__P_12_7 = this.__P_12_11();

        this.__P_12_7.setVisibility("hidden");

        var root = qx.core.Init.getApplication().getRoot();
        this.__P_12_4 = new qx.ui.mobile.form.Button("+");

        this.__P_12_4.addListener("pointerdown", this.__P_12_12, this);

        root.addListener("pointerup", this.__P_12_13, this);
        this.__P_12_3 = new qx.ui.mobile.form.Button("-");

        this.__P_12_3.addListener("pointerdown", this.__P_12_14, this);

        root.addListener("pointerup", this.__P_12_13, this);
        this.__P_12_5 = new qx.ui.mobile.form.Button("Take Time Snapshot");

        this.__P_12_5.addListener("tap", this.__P_12_15, this); // Slider Data Binding


        this.getContent().add(new qx.ui.mobile.form.Title("Slider"));
        this.getContent().add(new qx.ui.mobile.form.renderer.Single(this.__P_12_6));
        this.getContent().add(this.__P_12_4);
        this.getContent().add(this.__P_12_3); // List Data Binding

        this.getContent().add(new qx.ui.mobile.form.Title("Dynamic List"));
        this.getContent().add(this.__P_12_5);
        this.getContent().add(new qx.ui.mobile.form.Title(" "));
        this.getContent().add(this.__P_12_7); // prevent iOS8 flickering

        qx.bom.element.Style.set(this.getContent().getContentElement(), "WebkitBackfaceVisibility", "hidden");
      },

      /**
       * Reacts on tap of Stop time button.
       */
      __P_12_15: function __P_12_15() {
        var now = new Date();
        var date = now.toLocaleTimeString();
        this.getListData().insertAt(0, date);

        this.__P_12_7.setVisibility("visible");
      },

      /**
        * Called on interval event of timer.
        */
      __P_12_1: function __P_12_1() {
        var old = parseInt(this.__P_12_8.getValue(), 10);

        if (this.__P_12_2) {
          if (old < 500) {
            this.__P_12_8.setValue(old + 1);
          } else {
            this.__P_12_0.stop();
          }
        } else {
          if (old > 0) {
            this.__P_12_8.setValue(old - 1);
          } else {
            this.__P_12_0.stop();
          }
        }
      },

      /**
       * Called on interval event of timer.
       */
      __P_12_13: function __P_12_13() {
        this.__P_12_0.stop();
      },

      /**
       * Called on button increase.
       */
      __P_12_12: function __P_12_12() {
        this.__P_12_2 = true;

        this.__P_12_0.start();
      },

      /**
       *  Called on button decrease.
       */
      __P_12_14: function __P_12_14() {
        this.__P_12_2 = false;

        this.__P_12_0.start();
      },

      /**
       * Creates the slider and slider value label and binds vice-versa.
       */
      __P_12_10: function __P_12_10() {
        var form = new qx.ui.mobile.form.Form();
        this.__P_12_9 = new qx.ui.mobile.form.Slider();

        this.__P_12_9.setDisplayValue("value");

        this.__P_12_9.setMaximum(500);

        form.add(this.__P_12_9, "Move slider:");
        this.__P_12_8 = new qx.ui.mobile.form.TextField();

        this.__P_12_8.setValue("0");

        this.__P_12_8.setReadOnly(true);

        form.add(this.__P_12_8, " Slider value: ");

        this.__P_12_8.bind("value", this.__P_12_9, "value");

        this.__P_12_9.bind("value", this.__P_12_8, "value");

        return form;
      },

      /**
       * Creates a list and returns it.
       */
      __P_12_11: function __P_12_11() {
        var self = this;
        var list = new qx.ui.mobile.list.List({
          configureItem: function configureItem(item, data, row) {
            var stopCount = self.getListData().getLength() - row;
            item.setTitle("Stop #" + stopCount);
            item.setSubtitle(data);
          }
        });
        this.bind("listData", list, "model");
        return list;
      },
      destruct: function destruct() {
        this.__P_12_0.removeListener("interval", this.__P_12_1, this);

        this._disposeObjects("__P_12_2", "__P_12_3", "__P_12_4", "__P_12_5", "__P_12_0", "__P_12_8", "__P_12_9", "__P_12_6", "__P_12_7");
      }
    }
  });
  qxl.mobileshowcase.page.DataBinding.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DataBinding.js.map?dt=1592642581220