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
 * Abstract page for Mobile Showcase.
 */
qx.Class.define("qxl.mobileshowcase.page.Abstract", {
  extend: qx.ui.mobile.page.NavigationPage,

  construct(wrapContentByGroup) {
    super(wrapContentByGroup);
    this.setShowBackButton(true);
    this.setBackButtonText("Back");
  },

  members: {
    // overridden
    _back() {
      qx.core.Init.getApplication().getRouting().back();
    },
  },
});
