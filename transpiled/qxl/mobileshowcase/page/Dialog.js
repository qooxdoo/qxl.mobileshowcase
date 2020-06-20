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
      "qx.ui.mobile.basic.Label": {},
      "qx.ui.mobile.form.Group": {},
      "qx.ui.mobile.dialog.BusyIndicator": {},
      "qx.ui.mobile.dialog.Popup": {},
      "qx.ui.mobile.form.Button": {},
      "qx.data.Array": {},
      "qx.ui.mobile.dialog.Menu": {},
      "qx.lang.Function": {},
      "qx.ui.mobile.layout.VBox": {},
      "qx.ui.mobile.container.Composite": {},
      "qx.ui.mobile.layout.HBox": {},
      "qx.ui.mobile.control.Picker": {},
      "qx.locale.Date": {},
      "qx.locale.Manager": {}
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
   * Mobile page responsible for showing all dialog widgets available:
   * - Popup
   * - Confirm dialogs
   * - Anchor dialogs
   */
  qx.Class.define("qxl.mobileshowcase.page.Dialog", {
    extend: qxl.mobileshowcase.page.Abstract,
    construct: function construct() {
      qxl.mobileshowcase.page.Abstract.constructor.call(this, false);
      this.setTitle("Dialog Widgets");
    },
    members: {
      __P_11_0: null,
      __P_11_1: null,
      __P_11_2: null,
      __P_11_3: null,
      __P_11_4: null,
      __P_11_5: null,
      __P_11_6: null,
      __P_11_7: null,
      __P_11_8: null,
      // overridden
      _initialize: function _initialize() {
        qxl.mobileshowcase.page.Dialog.prototype._initialize.base.call(this);

        this.__P_11_8 = new qx.ui.mobile.basic.Label("No events received so far.");
        var resultsGroup = new qx.ui.mobile.form.Group([this.__P_11_8]); // EXAMPLE WIDGETS

        var busyIndicator = new qx.ui.mobile.dialog.BusyIndicator("Please wait...");
        this.__P_11_2 = new qx.ui.mobile.dialog.Popup(busyIndicator); // DEFAULT POPUP

        this.__P_11_1 = null;
        var closeDialogButton1 = new qx.ui.mobile.form.Button("Close Popup");
        this.__P_11_1 = new qx.ui.mobile.dialog.Popup(closeDialogButton1);

        this.__P_11_1.setTitle("A Popup");

        closeDialogButton1.addListener("tap", function () {
          this.__P_11_1.hide();
        }, this); // ANCHOR POPUP

        var showAnchorButton = new qx.ui.mobile.form.Button("Anchor Popup");
        showAnchorButton.addListener("tap", function (e) {
          this.__P_11_0.show();
        }, this);
        this.__P_11_0 = this.__P_11_9(showAnchorButton); // MENU DIALOG

        var menuModel = new qx.data.Array();

        for (var i = 0; i < 50; i++) {
          menuModel.push("Action " + i);
        }

        this.__P_11_3 = new qx.ui.mobile.dialog.Menu(menuModel);

        this.__P_11_3.setTitle("Menu");

        this.__P_11_3.addListener("changeSelection", this.__P_11_10, this);

        this.__P_11_3.setVisibleListItems(10); // PICKER DIALOG


        var showPickerButton = new qx.ui.mobile.form.Button("Picker");
        showPickerButton.addListener("tap", function (e) {
          this.__P_11_5.show();
        }, this);

        this._createPicker(showPickerButton); // ANCHORED MENU POPUP


        var showAnchorMenuButton = new qx.ui.mobile.form.Button("Anchor Menu");
        showAnchorMenuButton.addListener("tap", function (e) {
          this.__P_11_7.show();
        }, this);
        var anchorMenuModel = new qx.data.Array(["Red", "Green", "Blue"]);
        this.__P_11_7 = new qx.ui.mobile.dialog.Menu(anchorMenuModel, showAnchorMenuButton);

        this.__P_11_7.setTitle("Colors");

        this.__P_11_7.addListener("changeSelection", this.__P_11_10, this); // BUTTONS


        var showPopupButton = new qx.ui.mobile.form.Button("Popup");
        showPopupButton.addListener("tap", function (e) {
          this.__P_11_1.show();
        }, this);
        var busyIndicatorButton = new qx.ui.mobile.form.Button("Busy Indicator");
        busyIndicatorButton.addListener("tap", function (e) {
          this.__P_11_2.toggleVisibility();

          qx.lang.Function.delay(this.__P_11_2.hide, 3000, this.__P_11_2);
        }, this);
        var showMenuButton = new qx.ui.mobile.form.Button("Menu");
        showMenuButton.addListener("tap", function (e) {
          this.__P_11_3.show();
        }, this);
        var popupGroup = new qx.ui.mobile.form.Group([], false);
        popupGroup.add(this._createGroupTitle("Popup"));
        popupGroup.setLayout(new qx.ui.mobile.layout.VBox());
        popupGroup.add(showPopupButton, {
          flex: 1
        });
        popupGroup.add(showAnchorButton, {
          flex: 1
        });
        var menuGroup = new qx.ui.mobile.form.Group([], false);
        menuGroup.add(this._createGroupTitle("Menu"));
        menuGroup.setLayout(new qx.ui.mobile.layout.VBox());
        menuGroup.add(showMenuButton, {
          flex: 1
        });
        menuGroup.add(showAnchorMenuButton, {
          flex: 1
        });
        var otherGroup = new qx.ui.mobile.form.Group([], false);
        otherGroup.add(this._createGroupTitle("Other"));
        otherGroup.setLayout(new qx.ui.mobile.layout.VBox());
        otherGroup.add(busyIndicatorButton, {
          flex: 1
        });
        otherGroup.add(showPickerButton, {
          flex: 1
        });
        var groupContainer = new qx.ui.mobile.container.Composite();
        groupContainer.addCssClass("dialog-group");
        groupContainer.setLayout(new qx.ui.mobile.layout.HBox());
        groupContainer.add(popupGroup, {
          flex: 1
        });
        groupContainer.add(menuGroup, {
          flex: 1
        });
        groupContainer.add(otherGroup, {
          flex: 1
        });
        this.getContent().add(groupContainer);
        this.getContent().add(resultsGroup);

        this._updatePickerDaySlot();
      },

      /**
      * Creates the date picker dialog.
      * @param anchor {qx.ui.mobile.core.Widget} the anchor of the popup.
      */
      _createPicker: function _createPicker(anchor) {
        var pickerDialog = this.__P_11_5 = new qx.ui.mobile.dialog.Popup(anchor);
        pickerDialog.setTitle("Picker");
        var picker = this.__P_11_4 = new qx.ui.mobile.control.Picker();
        picker.addListener("changeSelection", this.__P_11_11, this);
        this.__P_11_6 = this._createDayPickerSlot(0, new Date().getFullYear());
        picker.addSlot(this.__P_11_6);
        picker.addSlot(this._createMonthPickerSlot());
        picker.addSlot(this._createYearPickerSlot());
        var hidePickerButton = new qx.ui.mobile.form.Button("OK");
        hidePickerButton.addListener("tap", function (e) {
          pickerDialog.hide();
        }, this);
        var pickerDialogContent = new qx.ui.mobile.container.Composite();
        pickerDialogContent.add(picker);
        pickerDialogContent.add(hidePickerButton);
        pickerDialog.add(pickerDialogContent);
      },

      /**
       * Creates the picker slot data for days in month.
       * @param month {Integer} current month.
       * @param year {Integer} current year.
       */
      _createDayPickerSlot: function _createDayPickerSlot(month, year) {
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var slotData = [];

        for (var i = 1; i <= daysInMonth; i++) {
          slotData.push({
            title: "" + i
          });
        }

        return new qx.data.Array(slotData);
      },

      /**
       * Creates the picker slot data for month names, based on current locale settings.
       */
      _createMonthPickerSlot: function _createMonthPickerSlot() {
        var names = qx.locale.Date.getMonthNames("wide", qx.locale.Manager.getInstance().getLocale());
        var slotData = [];

        for (var i = 0; i < names.length; i++) {
          slotData.push({
            title: "" + names[i]
          });
        }

        return new qx.data.Array(slotData);
      },

      /**
       * Creates the picker slot data from 1950 till current year.
       */
      _createYearPickerSlot: function _createYearPickerSlot() {
        var slotData = [];

        for (var i = new Date().getFullYear(); i > 1950; i--) {
          slotData.push({
            title: "" + i
          });
        }

        return new qx.data.Array(slotData);
      },

      /**
       * Creates the anchor popup.
       */
      __P_11_9: function __P_11_9(anchor) {
        if (this.__P_11_0) {
          return this.__P_11_0;
        }

        var buttonsWidget = new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.HBox());
        var okButton = new qx.ui.mobile.form.Button("Yes");
        var cancelButton = new qx.ui.mobile.form.Button("No");
        buttonsWidget.add(okButton);
        buttonsWidget.add(cancelButton);
        okButton.addListener("tap", function () {
          this.__P_11_0.hide();
        }, this);
        cancelButton.addListener("tap", function () {
          this.__P_11_0.hide();
        }, this);
        var popup = new qx.ui.mobile.dialog.Popup(buttonsWidget, anchor);
        popup.setTitle("Are you sure?");
        return popup;
      },

      /**
       * Reacts on "changeSelection" event on picker, and displays the values on resultsLabel.
       */
      __P_11_11: function __P_11_11(e) {
        if (e.getData().slot > 0) {
          if (this._updatePickerTimer) {
            clearTimeout(this._updatePickerTimer);
            this._updatePickerTimer = null;
          }

          this._updatePickerTimer = setTimeout(function () {
            this._updatePickerDaySlot();
          }.bind(this), 250);
        }

        if (e.getData().item) {
          this.__P_11_8.setValue("Received <b>changeSelection</b> from Picker Dialog. [slot: " + e.getData().slot + "] [item: " + e.getData().item.title + "]");
        }
      },

      /**
      * Updates the shown days in the picker slot.
      */
      _updatePickerDaySlot: function _updatePickerDaySlot() {
        var dayIndex = this.__P_11_4.getSelectedIndex(0);

        var monthIndex = this.__P_11_4.getSelectedIndex(1);

        var yearIndex = this.__P_11_4.getSelectedIndex(2);

        var slotData = this._createDayPickerSlot(monthIndex, new Date().getFullYear() - yearIndex);

        var oldDayData = this.__P_11_4.getModel().getItem(0);

        var diff = slotData.length - oldDayData.length;

        if (diff < 0) {
          for (var i = 0; i < -diff; i++) {
            oldDayData.pop();
          }
        } else if (diff > 0) {
          var ref = oldDayData.length;

          for (var i = 0; i < diff; i++) {
            oldDayData.push({
              title: "" + (ref + i + 1)
            });
          }
        }

        this.__P_11_4.setSelectedIndex(0, dayIndex, false);
      },

      /**
      * Creates a group title for the dialow showcase.
      * @return {qx.ui.mobile.form.Label} the group title label.
      */
      _createGroupTitle: function _createGroupTitle(value) {
        var titleLabel = new qx.ui.mobile.basic.Label(value);
        titleLabel.addCssClass("dialog-group-title");
        titleLabel.addCssClass("gap");
        return titleLabel;
      },

      /**
       * Reacts on "confirmSelection" event on picker, and displays the values on resultsLabel.
       */
      __P_11_12: function __P_11_12(e) {
        this.__P_11_8.setValue("");

        for (var i = 0; i < e.getData().length; i++) {
          var data = e.getData()[i];

          this.__P_11_8.setValue(this.__P_11_8.getValue() + " Received <b>confirmSelection</b> from Picker Dialog. [slot: " + data.slot + "] [item: " + data.item + "] <br>");
        }
      },

      /**
       * Reacts on "changeSelection" event on Menu, and displays the values on resultsLabel.
       */
      __P_11_10: function __P_11_10(e) {
        this.__P_11_8.setValue("Received <b>changeSelection</b> from Menu Dialog. [index: " + e.getData().index + "] [item: " + e.getData().item + "]");
      }
    }
  });
  qxl.mobileshowcase.page.Dialog.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dialog.js.map?dt=1592642581160