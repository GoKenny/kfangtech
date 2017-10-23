
// 1. Make Local Customized DOJO Widget Importable 
var dojoConfig = {
    async: true,
    packages: [{
        name: "KfangWidget",
        location: location.pathname.replace(/\/[^/]*$/, '') + '/KfangWidget'
    }]
};

window.onload = function(){

    // 2. Import My Library of Module And Widget
    require([
               'dojo/dom',
               'KfangWidget/kfangModule',
               'KfangWidget/kfangWidget',
               'dojo/domReady!'
    ], function (dom, myModule, kfangWidget) {

        // 1. Use The My Module To Do Something
        myModule.setText('greeting', "Testing The Customized Module Code");
        setTimeout(function () {
            myModule.restoreText('greeting');
        }, 1500);

        // 2. Use My Widget To Insert HTML
        var widgetTarget = dom.byId('widgetTarget');
        var widget = new kfangWidget().placeAt(widgetTarget);
    });


}




//document.addEventListener("DOMContentLoaded", function (event) {
//});