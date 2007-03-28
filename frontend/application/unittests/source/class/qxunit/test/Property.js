qx.Class.define("qxunit.test.Property",
{
  extend: qxunit.TestCase,

  members :
  {
    testBasic : function()
    {
      this.debug("Exec: testBasic");

      this.assertNotUndefined(qx.core.Property);

      // Check instance
      var inst = new qxunit.test.PropertyHelper;
      this.assertNotUndefined(inst, "instance");

      // Public setter/getter etc.
      this.assertFunction(inst.setPublicProp, "public setter");
      this.assertFunction(inst.getPublicProp, "public getter");
      this.assertFunction(inst.resetPublicProp, "public reset");
      this.assertUndefined(inst.togglePublicProp, "public toggler");
      this.assertUndefined(inst.stylePublicProp, "public style");

      // Protected setter/getter etc.
      this.assertFunction(inst._setProtectedProp, "protected setter");
      this.assertFunction(inst._getProtectedProp, "protected getter");
      this.assertFunction(inst._resetProtectedProp, "protected reset");
      this.assertUndefined(inst._toggleProtectedProp, "protected toggler");
      this.assertUndefined(inst._styleProtectedProp, "protected style");

      // Private setter/getter etc.
      this.assertFunction(inst.__setPrivateProp, "private setter");
      this.assertFunction(inst.__getPrivateProp, "private getter");
      this.assertFunction(inst.__resetPrivateProp, "private reset");
      this.assertUndefined(inst.__togglePrivateProp, "private toggler");
      this.assertUndefined(inst.__stylePrivateProp, "private style");

      // Boolean property
      this.assertFunction(inst.toggleBooleanProp, "boolean toggler");

      this.debug("Done: testBasic");
    },

    testBuiltinTypes : function()
    {
      this.debug("Exec: testBuiltinTypes");

      this.assertNotUndefined(qx.core.Property);

      // Check instance
      var inst = new qxunit.test.PropertyHelper;
      this.assertNotUndefined(inst, "instance");

      // Type checks: String
      this.assertIdentical("Hello", inst.setStringProp("Hello"), "string property, set");
      this.assertIdentical("Hello", inst.getStringProp(), "string property, get");

      // Type checks: Boolean, true
      this.assertIdentical(true, inst.setBooleanProp(true), "boolean property, set");
      this.assertIdentical(true, inst.getBooleanProp(), "boolean property, get");

      // Type checks: Boolean, false
      this.assertIdentical(false, inst.setBooleanProp(false), "boolean property, set");
      this.assertIdentical(false, inst.getBooleanProp(), "boolean property, get");

      // Type checks: Number, int
      this.assertIdentical(3, inst.setNumberProp(3), "number property, set");
      this.assertIdentical(3, inst.getNumberProp(), "number property, get");

      // Type checks: Number, float
      this.assertIdentical(3.14, inst.setNumberProp(3.14), "number property, set");
      this.assertIdentical(3.14, inst.getNumberProp(), "number property, get");

      // Type checks: Object, inline
      var obj = {};
      this.assertIdentical(obj, inst.setObjectProp(obj), "object property, set");
      this.assertIdentical(obj, inst.getObjectProp(), "object property, get");

      // Type checks: Object, new
      var obj = new Object;
      this.assertIdentical(obj, inst.setObjectProp(obj), "object property, set");
      this.assertIdentical(obj, inst.getObjectProp(), "object property, get");

      // Type checks: Array, inline
      var arr = [];
      this.assertIdentical(arr, inst.setArrayProp(arr), "array property, set");
      this.assertIdentical(arr, inst.getArrayProp(), "array property, get");

      // Type checks: Array, new
      var arr = new Array;
      this.assertIdentical(arr, inst.setArrayProp(arr), "array property, set");
      this.assertIdentical(arr, inst.getArrayProp(), "array property, get");

      this.debug("Done: testBuiltinTypes");
    },

    testInheritance : function()
    {
      this.debug("Exec: testInheritance");

      this.assertNotUndefined(qx.core.Property);

      var pa = new qxunit.test.Layout;
      var ch1 = new qxunit.test.Layout;
      var ch2 = new qxunit.test.Layout;
      var ch3 = new qxunit.test.Layout;
      var chh1 = new qxunit.test.Layout;
      var chh2 = new qxunit.test.Layout;
      var chh3 = new qxunit.test.Layout;

      pa.add(ch1, ch2, ch3);
      ch2.add(chh1, chh2, chh3);

      // Simple: Only inheritance, no local values
      this.assertTrue(pa._setEnabled(true), "a1");
      this.assertTrue(pa._getEnabled(), "a2");
      this.assertTrue(ch1._getEnabled(), "a3");
      this.assertTrue(ch2._getEnabled(), "a4");
      this.assertTrue(ch3._getEnabled(), "a5");
      this.assertTrue(chh1._getEnabled(), "a6");
      this.assertTrue(chh2._getEnabled(), "a7");
      this.assertTrue(chh3._getEnabled(), "a8");

      // Enabling local value
      this.assertFalse(ch2._setEnabled(false), "b1");
      this.assertFalse(ch2._getEnabled(), "b2");
      this.assertFalse(chh1._getEnabled(), "b3");
      this.assertFalse(chh2._getEnabled(), "b4");
      this.assertFalse(chh3._getEnabled(), "b5");

      // Reset local value
      this.assertUndefined(ch2._resetEnabled(), "c1");
      this.assertTrue(ch2._getEnabled(), "c2");
      this.assertTrue(chh1._getEnabled(), "c3");
      this.assertTrue(chh2._getEnabled(), "c4");
      this.assertTrue(chh3._getEnabled(), "c5");

      this.debug("Done: testInheritance");
    },

    testParent : function()
    {
      var pa = new qxunit.test.Layout;
      var ch1 = new qxunit.test.Layout;
      var ch2 = new qxunit.test.Layout;
      var ch3 = new qxunit.test.Layout;

      this.assertIdentical(pa._getEnabled(), "inherit", "d1");
      this.assertIdentical(ch1._getEnabled(), "inherit", "d2");
      this.assertIdentical(ch2._getEnabled(), "inherit", "d3");
      this.assertIdentical(ch3._getEnabled(), "inherit", "d4");

      ch1.setParent(pa);

      this.assertTrue(pa._setEnabled(true), "a1"); // ch1 gets enabled, too
      this.assertFalse(ch3._setEnabled(false), "a2");

      this.assertTrue(pa._getEnabled(), "b1");
      this.assertTrue(ch1._getEnabled(), "b2");
      this.assertIdentical(ch2._getEnabled(), "inherit", "b3");
      this.assertFalse(ch3._getEnabled(), "b4");

      ch2.setParent(pa); // make ch2 enabled through inheritance
      ch3.setParent(pa); // keep ch2 disabled, user value has higher priority

      this.assertTrue(pa._getEnabled(), "c1");
      this.assertTrue(ch1._getEnabled(), "c2");
      this.assertTrue(ch2._getEnabled(), "c3");
      this.assertFalse(ch3._getEnabled(), "c4");
    },

    testMultiValues : function()
    {
      this.debug("Exec: testMultiValues");

      this.assertNotUndefined(qx.core.Property);

      // Check instance
      var inst = new qxunit.test.PropertyHelper;
      this.assertNotUndefined(inst, "instance");

      // Check init value
      this.assertIdentical(inst.getInitProp(), "foo", "a1");
      this.assertIdentical(inst.setInitProp("hello"), "hello", "a2");
      this.assertIdentical(inst.getInitProp(), "hello", "a3");
      this.assertIdentical(inst.resetInitProp(), undefined, "a4");
      this.assertIdentical(inst.getInitProp(), "foo", "a5");

      // Check null value
      this.assertIdentical(inst.getNullProp(), "bar", "b1");
      this.assertIdentical(inst.setNullProp("hello"), "hello", "b2");
      this.assertIdentical(inst.getNullProp(), "hello", "b3");
      this.assertIdentical(inst.setNullProp(null), null, "b4");
      this.assertIdentical(inst.getNullProp(), null, "b5");
      this.assertIdentical(inst.resetNullProp(), undefined, "b6");
      this.assertIdentical(inst.getNullProp(), "bar", "b7");

      // Check appearance value
      this.assertIdentical(inst.styleAppearanceProp("black"), "black", "c1");
      this.assertIdentical(inst.getAppearanceProp(), "black", "c2");
      this.assertIdentical(inst.setAppearanceProp("white"), "white", "c3");
      this.assertIdentical(inst.getAppearanceProp(), "white", "c4");
      this.assertIdentical(inst.resetAppearanceProp(), undefined, "c5");
      this.assertIdentical(inst.getAppearanceProp(), "black", "c6");

      // No prop
      this.assertIdentical(inst.getNoProp(), null, "c1");

      this.debug("Done: testMultiValues");
    },

    testInvalidPropertyDef : function()
    {
      this.assertException(function()
      {
        qx.Class.define("qxunit." + Math.round(Math.random()*100000),
        {
          extend : Object,
          properties : { invalid1 : {} }
        });
      }, Error, new RegExp('is not nullable but does not have an init value'), "a1");




    }
  }
});

qx.Class.define("qxunit.test.PropertyHelper",
{
  extend : qx.core.Target,

  properties :
  {
    // legacy
    legacyPure      : { _legacy : true },
    legacyString    : { _legacy : true, type : "string" },
    legacyArray     : { _legacy : true, type : "object", instance : "Array" },

    // protection
    publicProp      : { nullable : true },
    _protectedProp  : { nullable : true },
    __privateProp   : { nullable : true },

    // types
    stringProp      : { check : "String", nullable : true },
    booleanProp     : { check : "Boolean", nullable : true },
    numberProp      : { check : "Number", nullable : true },
    objectProp      : { check : "Object", nullable : true },
    arrayProp       : { check : "Array", nullable : true },
    mapProp         : { check : "Map", nullable : true },

    // multi values
    noProp          : { check : "String", nullable : true },
    initProp        : { init : "foo" },
    nullProp        : { init : "bar", nullable : true },
    appearanceProp  : { appearance : true, nullable : true },
    fullProp        : { init : 100, appearance : true }
  }
});

qx.Class.define("qxunit.test.Layout",
{
  extend : qx.ui.layout.CanvasLayout,

  properties :
  {
    _enabled : { inheritable : true },
    _width : { inheritable : true, appearance : true },
    _height : { inheritable : true, appearance : true },
    _left : { inheritable : true, appearance : true },
    _top : { inheritable : true, appearance : true }
  }
});
