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
      "qx.util.ResourceManager": {},
      "qx.bom.request.Xhr": {},
      "qx.ui.mobile.form.Title": {},
      "qx.event.Registration": {},
      "qx.core.Init": {},
      "qx.module.util.Function": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.form.Group": {},
      "qx.ui.mobile.form.Form": {},
      "qx.ui.mobile.form.RadioGroup": {},
      "qx.ui.mobile.form.RadioButton": {},
      "qx.ui.mobile.form.renderer.Single": {},
      "qx.ui.mobile.basic.Image": {},
      "qx.ui.mobile.basic.Label": {},
      "qx.bom.client.Device": {},
      "qx.lang.String": {},
      "qx.ui.mobile.form.Slider": {},
      "qx.ui.mobile.form.Button": {},
      "qx.ui.mobile.core.Blocker": {},
      "qx.bom.element.Style": {},
      "qx.bom.Element": {}
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

  /*
   * If you have added resources to your app remove the leading '*' in the
   * following line to make use of them.
  
  
  ************************************************************************ */

  /**
   * Mobile page responsible for switching between provided themes.
   *
   * @asset(qx/mobile/css/*)
   */
  qx.Class.define("qxl.mobileshowcase.page.Theming", {
    extend: qxl.mobileshowcase.page.Abstract,
    construct: function construct() {
      qxl.mobileshowcase.page.Abstract.constructor.call(this, false);
      this.setTitle("Theming");

      this.__P_14_0();
    },
    statics: {
      THEMES: [{
        "name": "Indigo",
        "css": "resource/qxl/mobileshowcase/css/indigo.css"
      }, {
        "name": "Flat",
        "css": "resource/qxl/mobileshowcase/css/flat.css"
      }]
    },
    members: {
      __P_14_1: null,
      __P_14_2: null,
      __P_14_3: null,
      __P_14_4: null,

      /**
       * Preloads all css files for preventing flickering on theme switches.
       */
      __P_14_0: function __P_14_0() {
        for (var i = 0; i < qxl.mobileshowcase.page.Theming.THEMES.length; i++) {
          var cssResource = qxl.mobileshowcase.page.Theming.THEMES[i].css;
          var cssURI = qx.util.ResourceManager.getInstance().toUri(cssResource);
          var req = new qx.bom.request.Xhr();
          req.open("GET", cssURI);
          req.send();
        }
      },
      // overridden
      _initialize: function _initialize() {
        qxl.mobileshowcase.page.Theming.prototype._initialize.base.call(this);

        this.getContent().add(new qx.ui.mobile.form.Title("Select a theme"));

        this.__P_14_5();

        this.__P_14_6();

        this.__P_14_7(); // react on possible font size changes (triggering a different device pixel ratio)


        qx.event.Registration.addListener(window, "resize", this._onChangeScale);
        qx.core.Init.getApplication().getRoot().addListener("changeAppScale", this._updateDemoImageLabel, this);
      },

      /** Check on possible scale changes. */
      _onChangeScale: qx.module.util.Function.debounce(function (e) {
        var root = qx.core.Init.getApplication().getRoot();
        var appScale = root.getAppScale();
        var fontScale = root.getFontScale();

        if (appScale != this.__P_14_3 || fontScale != this.__P_14_4) {
          this.__P_14_3 = appScale;
          this.__P_14_4 = fontScale;
          root.fireEvent("changeAppScale");
        }
      }.bind(this), 200),

      /** Creates the form which controls the chosen qx.Mobile theme. */
      __P_14_5: function __P_14_5() {
        var themeGroup = new qx.ui.mobile.form.Group([], false);
        var themeForm = new qx.ui.mobile.form.Form();
        var themeRadioGroup = new qx.ui.mobile.form.RadioGroup();

        for (var i = 0; i < qxl.mobileshowcase.page.Theming.THEMES.length; i++) {
          var radioButton = new qx.ui.mobile.form.RadioButton();
          themeRadioGroup.add(radioButton);
          themeForm.add(radioButton, qxl.mobileshowcase.page.Theming.THEMES[i].name);
          radioButton.addListener("tap", this.__P_14_8, {
            "self": this,
            "index": i
          });
        }

        themeGroup.add(new qx.ui.mobile.form.renderer.Single(themeForm));
        this.getContent().add(themeGroup);
      },

      /** Creates and adds the image resolution demonstration. */
      __P_14_7: function __P_14_7() {
        this.getContent().add(new qx.ui.mobile.form.Title("Resolution-specific Images"));
        var demoImage = new qx.ui.mobile.basic.Image("qxl/mobileshowcase/icon/image.png");
        demoImage.addCssClass("resolution-demo-image");
        this.__P_14_2 = new qx.ui.mobile.basic.Label();

        this.__P_14_2.addCssClass("resolution-demo-label");

        this._updateDemoImageLabel();

        var demoImageGroup = new qx.ui.mobile.form.Group();
        demoImageGroup.add(demoImage);
        demoImageGroup.add(this.__P_14_2);
        this.getContent().add(demoImageGroup);
      },

      /**
       * Refreshes the label which displays the pixel ratio, scale factor etc.
       */
      _updateDemoImageLabel: function _updateDemoImageLabel() {
        var pixelRatio = parseFloat(qx.bom.client.Device.getDevicePixelRatio().toFixed(2));
        var fontScale = qx.core.Init.getApplication().getRoot().getFontScale();
        var appScale = qx.core.Init.getApplication().getRoot().getAppScale();
        var demoLabelTemplate = "<div>Best available image for total app scale<span>%1</span></div> <div><br/></div> <div>Device pixel ratio:<span>%2</span></div>  <div>Computed font scale:<span>%3</span></div> ";
        var labelContent = qx.lang.String.format(demoLabelTemplate, [this.__P_14_9(appScale), this.__P_14_9(pixelRatio), this.__P_14_9(fontScale)]);

        this.__P_14_2.setValue(labelContent);
      },

      /**
       * Formats a number to one or two decimals as needed.
       * @param x {Number}
       * @return {String} the formatted number
       */
      __P_14_9: function __P_14_9(x) {
        if (x === null) {
          return "(unknown)";
        }

        x = x.toFixed(2);
        x = x.replace(/(\d)0/, "$1");
        return x;
      },

      /**
       * Creates the a control widget for the theme's scale factor.
       */
      __P_14_6: function __P_14_6() {
        this.getContent().add(new qx.ui.mobile.form.Title("Adjust font scale"));
        var form = new qx.ui.mobile.form.Form();
        var slider = this.__P_14_1 = new qx.ui.mobile.form.Slider();
        slider.set({
          "displayValue": "value",
          "minimum": 50,
          "maximum": 200,
          "value": 100,
          "step": 10
        });
        form.add(slider, "Custom Font Scale in %");
        var useScaleButton = new qx.ui.mobile.form.Button("Apply");
        useScaleButton.addListener("tap", this._onApplyScaleButtonTap, this);
        form.addButton(useScaleButton);
        var scaleGroup = new qx.ui.mobile.form.Group([new qx.ui.mobile.form.renderer.Single(form)], false);
        this.getContent().add(scaleGroup);
      },

      /**
      * Handler for "tap" event on applyScaleButton. Applies the app's root font size in relation to slider value.
      */
      _onApplyScaleButtonTap: function _onApplyScaleButtonTap() {
        qx.core.Init.getApplication().getRoot().setFontScale(this.__P_14_1.getValue() / 100);

        this._updateDemoImageLabel();

        var lastValue = this.__P_14_1.getValue();

        this.__P_14_1.setValue(0);

        this.__P_14_1.setValue(lastValue);

        qx.core.Init.getApplication().getRouting().executeGet("/theming", {
          reverse: false
        });
      },

      /**
       * Changes the used CSS of the application.
       * @param cssFile {String} The css file url.
       */
      __P_14_10: function __P_14_10(cssFile) {
        var blocker = qx.ui.mobile.core.Blocker.getInstance();
        var blockerElement = blocker.getContentElement();
        qx.bom.element.Style.set(blockerElement, "transition", "all 500ms");
        qx.bom.element.Style.set(blockerElement, "backgroundColor", "rgba(255,255,255,0)");
        blocker.show();
        qx.bom.Element.addListener(blockerElement, "transitionEnd", this._onAppFadedOut, {
          "self": this,
          "cssFile": cssFile
        });
        setTimeout(function () {
          qx.bom.element.Style.set(blockerElement, "backgroundColor", "rgba(255,255,255,1)");
        }, 0);
      },

      /**
       * Event handler when Application has faded out.
       */
      _onAppFadedOut: function _onAppFadedOut() {
        var blocker = qx.ui.mobile.core.Blocker.getInstance();
        qx.bom.Element.removeListener(blocker.getContentElement(), "transitionEnd", this.self._onAppFadedOut, this);
        var root = qxWeb(".root");
        root.setStyle("color", "white");
        qxWeb("link[rel^='stylesheet']")[0].remove();
        var newCssLink = document.createElement("link");
        newCssLink.setAttribute("rel", "stylesheet");
        newCssLink.setAttribute("type", "text/css");
        newCssLink.setAttribute("href", this.cssFile);
        qxWeb("head")[0].append(newCssLink);
        root.setStyle("color", null);
        setTimeout(function () {
          qx.bom.Element.addListener(blocker.getContentElement(), "transitionEnd", this.self._onAppFadedIn, this);
          qx.bom.element.Style.set(blocker.getContentElement(), "backgroundColor", "rgba(255,255,255,0)");
        }.bind(this), 100);
      },

      /**
       * Event handler when Application has faded in again.
       */
      _onAppFadedIn: function _onAppFadedIn() {
        var blocker = qx.ui.mobile.core.Blocker.getInstance();
        qx.bom.Element.removeListener(blocker.getContentElement(), "transitionEnd", this.self._onAppFadedIn, this);
        qx.bom.element.Style.set(blocker.getContentElement(), "transition", null);
        qx.bom.element.Style.set(blocker.getContentElement(), "backgroundColor", null);
        blocker.hide();
      },

      /**
       * Switches the theme of the application to the target theme.
       * @param src {qx.ui.mobile.core.Widget} Source widget of this event.
       */
      __P_14_8: function __P_14_8() {
        var cssResource = this.self.self(arguments).THEMES[this.index].css;
        var cssURI = qx.util.ResourceManager.getInstance().toUri(cssResource);

        this.self.__P_14_10(cssURI);
      },

      /**
       * Adds a new theme data object to the theme switcher.
       * @param cssFile {String} The css file url.
       */
      appendTheme: function appendTheme(themeData) {
        qxl.mobileshowcase.page.Theming.THEMES.push(themeData);
      },
      destruct: function destruct() {
        qx.event.Registration.removeListener(window, "resize", this._onChangeScale);
        qx.core.Init.getApplication().getRoot().removeListener("changeAppScale", this._updateDemoImageLabel, this);
      }
    }
  });
  qxl.mobileshowcase.page.Theming.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Theming.js.map?dt=1592642581397