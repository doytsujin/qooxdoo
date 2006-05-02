/* ************************************************************************

   qooxdoo - the new era of web interface development

   Copyright:
     (C) 2004-2006 by Schlund + Partner AG, Germany
         All rights reserved

   License:
     LGPL 2.1: http://creativecommons.org/licenses/LGPL/2.1/

   Internet:
     * http://qooxdoo.oss.schlund.de

   Authors:
     * Sebastian Werner (wpbasti)
       <sebastian dot werner at 1und1 dot de>
     * Andreas Ecker (aecker)
       <andreas dot ecker at 1und1 dot de>
     * Til Schneider (til132)
       <tilman dot schneider at stz-ida dot de>

************************************************************************ */

/* ************************************************************************

#require(qx.ui.table.CellEditorFactory)
#use(qx.Const)

************************************************************************ */

/**
 * A cell editor factory creating text fields.
 */
qx.OO.defineClass("qx.ui.table.TextFieldCellEditorFactory", qx.ui.table.CellEditorFactory,
function() {
  qx.ui.table.CellEditorFactory.call(this);
});


// overridden
qx.Proto.createCellEditor = function(cellInfo) {
  var cellEditor = new qx.ui.form.TextField;
  cellEditor.setAppearance("table-editor-textfield");
  cellEditor.originalValue = cellInfo.value;
  cellEditor.setValue("" + cellInfo.value);

  cellEditor.addEventListener(qx.constant.Event.APPEAR, function() {
    this.selectAll();
  });

  return cellEditor;
};


// overridden
qx.Proto.getCellEditorValue = function(cellEditor) {
  // Workaround: qx.ui.form.TextField.getValue() delivers the old value, so we use the
  //             value property of the DOM element directly
  var value = cellEditor.getElement().value;

  if (typeof cellEditor.originalValue == "number") {
    value = parseFloat(value);
  }
  return value;
};
