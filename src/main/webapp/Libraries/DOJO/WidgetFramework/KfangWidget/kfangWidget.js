
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/form/Button",
    "dojo/text!./theHTML/kfanglab.html"
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Button, template) {

    return declare("example.SomeWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin
    ], {

        templateString: template,

        commandHello : function()
        {
            alert('Yes');
        }
    });

});

// Some Pure JavaScript Code
window.onload = function () {

    document.getElementById("what").onclick = function () {

        alert(this.innerHTML);

    };

}