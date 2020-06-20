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
      "qx.ui.mobile.form.renderer.Single": {},
      "qx.ui.mobile.form.Label": {},
      "qx.ui.mobile.container.Composite": {},
      "qx.ui.mobile.form.Button": {},
      "qx.ui.mobile.dialog.Popup": {},
      "qx.ui.mobile.form.Form": {},
      "qx.ui.mobile.form.TextField": {},
      "qx.ui.mobile.form.PasswordField": {},
      "qx.ui.mobile.form.CheckBox": {},
      "qx.ui.mobile.form.NumberField": {},
      "qx.ui.mobile.form.RadioButton": {},
      "qx.ui.mobile.form.RadioGroup": {},
      "qx.data.Array": {},
      "qx.ui.mobile.form.SelectBox": {},
      "qx.ui.mobile.form.TextArea": {},
      "qx.ui.mobile.form.Slider": {},
      "qx.ui.mobile.form.ToggleButton": {}
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
   * Mobile page responsible for showing the "form" showcase.
   */
  qx.Class.define("qxl.mobileshowcase.page.Form", {
    extend: qxl.mobileshowcase.page.Abstract,
    construct: function construct() {
      qxl.mobileshowcase.page.Abstract.constructor.call(this);
      this.setTitle("Form");
    },
    members: {
      __P_9_0: null,
      __P_9_1: null,
      __P_9_2: null,
      __P_9_3: null,
      __P_9_4: null,
      __P_9_5: null,
      __P_9_6: null,
      __P_9_7: null,
      __P_9_8: null,
      __P_9_9: null,
      __P_9_10: null,
      __P_9_11: null,
      __P_9_12: null,
      __P_9_13: null,
      __P_9_14: null,
      __P_9_15: null,
      // overridden
      _initialize: function _initialize() {
        qxl.mobileshowcase.page.Form.prototype._initialize.base.call(this);

        this.__P_9_12 = this.__P_9_16();
        this.getContent().add(new qx.ui.mobile.form.renderer.Single(this.__P_9_12));
        this.__P_9_13 = this._createSubmitButton();
        this.getContent().add(this.__P_9_13);
        this.__P_9_14 = this._createResetButton();
        this.getContent().add(this.__P_9_14);
        this.__P_9_4 = new qx.ui.mobile.form.Label();

        this.__P_9_4.addCssClass("registration-result");

        var popupContent = new qx.ui.mobile.container.Composite();
        this.__P_9_6 = new qx.ui.mobile.form.Button("OK");

        this.__P_9_6.addListener("tap", function () {
          this.__P_9_5.hide();
        }, this);

        popupContent.add(this.__P_9_4);
        popupContent.add(this.__P_9_6);
        this.__P_9_5 = new qx.ui.mobile.dialog.Popup(popupContent);

        this.__P_9_5.setTitle("Registration Result");
      },

      /**
      * Factory for the Submit Button.
      * @return {qx.ui.mobile.form.Button} reset button
      */
      _createSubmitButton: function _createSubmitButton() {
        var submitButton = new qx.ui.mobile.form.Button("Submit");
        submitButton.addListener("tap", this._onSubmitButtonTap, this);
        submitButton.setEnabled(false);
        return submitButton;
      },

      /**
      * Factory for the Reset Button.
      * @return {qx.ui.mobile.form.Button} reset button
      */
      _createResetButton: function _createResetButton() {
        var resetButton = new qx.ui.mobile.form.Button("Reset");
        resetButton.addListener("tap", this._onResetButtonTap, this);
        return resetButton;
      },

      /**
       * Creates the form for this showcase.
       *
       * @return {qx.ui.mobile.form.Form} the created form.
       */
      __P_9_16: function __P_9_16() {
        var form = new qx.ui.mobile.form.Form(); // NAME FIELD

        this.__P_9_1 = new qx.ui.mobile.form.TextField().set({
          placeholder: "Username"
        });

        this.__P_9_1.setRequired(true);

        this.__P_9_1.setLiveUpdate(true);

        form.addGroupHeader("Contact");
        form.add(this.__P_9_1, "Username"); // PASSWORD FIELD

        this.__P_9_0 = new qx.ui.mobile.form.PasswordField().set({
          placeholder: "Password"
        });

        this.__P_9_0.setLiveUpdate(true);

        form.add(this.__P_9_0, "Password"); // REMEMBER PASSWORD CHECKBOX

        this.__P_9_9 = new qx.ui.mobile.form.CheckBox();
        form.add(this.__P_9_9, "Remember password? ");

        this.__P_9_9.setModel("password_reminder");

        this.__P_9_9.bind("model", this.__P_9_0, "value");

        this.__P_9_0.bind("value", this.__P_9_9, "model"); // NUMBER FIELD


        this.__P_9_15 = new qx.ui.mobile.form.NumberField();

        this.__P_9_15.setMaximum(150);

        this.__P_9_15.setMinimum(0);

        this.__P_9_15.setLiveUpdate(true);

        form.add(this.__P_9_15, "Age");
        form.addGroupHeader("Gender");
        this.__P_9_10 = new qx.ui.mobile.form.RadioButton();
        this.__P_9_11 = new qx.ui.mobile.form.RadioButton();
        var radioGroup = new qx.ui.mobile.form.RadioGroup();
        radioGroup.setAllowEmptySelection(true);
        radioGroup.add(this.__P_9_10, this.__P_9_11);
        form.add(this.__P_9_10, "Male");
        form.add(this.__P_9_11, "Female");
        form.addGroupHeader("Feedback");
        var dd = new qx.data.Array(["Web search", "From a friend", "Offline ad", "Magazine", "Twitter", "Other"]);
        var selQuestion = "How did you hear about us ?";
        this.__P_9_8 = new qx.ui.mobile.form.SelectBox();

        this.__P_9_8.set({
          required: true
        });

        this.__P_9_8.set({
          placeholder: "Unknown"
        });

        this.__P_9_8.setClearButtonLabel("Clear");

        this.__P_9_8.setDialogTitle(selQuestion);

        this.__P_9_8.setModel(dd);

        form.add(this.__P_9_8, selQuestion);
        form.addGroupHeader("License");
        this.__P_9_2 = new qx.ui.mobile.form.TextArea().set({
          placeholder: "Terms of Service",
          readOnly: true
        });
        form.add(this.__P_9_2, "Terms of Service");

        this.__P_9_2.setValue("qooxdoo Licensing Information\n=============================\n\nqooxdoo is licensed under the MIT License (MIT). \n The above holds for any newer qooxdoo release. Only legacy versions 5.0 and below were licensed under LGPL/EPL.");

        this.__P_9_7 = new qx.ui.mobile.form.Slider();

        this.__P_9_7.setDisplayValue("percent");

        form.add(this.__P_9_7, "Are you human? Drag the slider to prove it.");
        this.__P_9_3 = new qx.ui.mobile.form.ToggleButton(false, "YES", "NO", 13);

        this.__P_9_3.addListener("changeValue", this._enableFormSubmitting, this);

        form.add(this.__P_9_3, "Agree?");

        this._createValidationRules(form.getValidationManager()); // make sure to restore the defaults on reset


        form.redefineResetter();
        return form;
      },

      /**
       * Adds all validation rules of the form.
       * @param validationManager {qx.ui.form.validation.Manager} the created form.
       */
      _createValidationRules: function _createValidationRules(validationManager) {
        // USERNAME validation
        validationManager.add(this.__P_9_1, function (value, item) {
          var valid = value != null && value.length > 3;

          if (!valid) {
            item.setInvalidMessage("Username should have more than 3 characters!");
          }

          return valid;
        }, this); // PASSWORD validation

        validationManager.add(this.__P_9_0, function (value, item) {
          var valid = value != null && value.length > 3;

          if (!valid) {
            item.setInvalidMessage("Password should have more than 3 characters!");
          }

          return valid;
        }, this); // AGE validation

        validationManager.add(this.__P_9_15, function (value, item) {
          if (value == null || value == "0") {
            item.setInvalidMessage("Please enter your age.");
            return false;
          }

          if (value.length == 0 || value.match(/[\D]+/)) {
            item.setInvalidMessage("Please enter a valid age.");
            return false;
          }

          if (value < item.getMinimum() || value > item.getMaximum()) {
            item.setInvalidMessage("Value out of range: " + item.getMinimum() + "-" + item.getMaximum());
            return false;
          }

          return true;
        }, this);
      },
      _enableFormSubmitting: function _enableFormSubmitting(evt) {
        this.__P_9_13.setEnabled(evt.getData());
      },

      /**  Event handler */
      _onResetButtonTap: function _onResetButtonTap() {
        this.__P_9_12.reset();
      },

      /** Event handler. */
      _onSubmitButtonTap: function _onSubmitButtonTap() {
        if (this.__P_9_12.validate()) {
          var result = [];
          result.push("Username: " + this.__P_9_1.getValue());
          result.push("Password: " + this.__P_9_0.getValue());
          result.push("Age: " + this.__P_9_15.getValue());
          result.push("Male: " + this.__P_9_10.getValue());
          result.push("Female: " + this.__P_9_11.getValue());
          result.push("Agree on our terms: " + this.__P_9_3.getValue());
          result.push("How did you hear about us : " + this.__P_9_8.getValue());
          result.push("Are you human? : " + this.__P_9_7.getValue() + "%");

          this.__P_9_4.setValue(result.join("<br>"));

          this.__P_9_5.show();
        } else {
          // Scroll to invalid field.
          var invalidItems = this.__P_9_12.getInvalidItems();

          this._getScrollContainer().scrollToWidget(invalidItems[0].getLayoutParent(), 500);
        }
      },
      // overridden
      _stop: function _stop() {
        if (this.__P_9_5) {
          this.__P_9_5.hide();
        }

        qxl.mobileshowcase.page.Form.prototype._stop.base.call(this);
      }
    }
  });
  qxl.mobileshowcase.page.Form.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Form.js.map?dt=1592642580947