(function () {
    'use strict';
    var csInterface = new CSInterface();
    function init() {
        themeManager.init();
        $("#button").click(function () {
            var selectedPageSize = $("#select-page-size").val();
            var horizontalDivision = $("horizontal-division").text();
            var verticalDivision = $("vertical-division").text();
            var params = "" + selectedPageSize + "\t" + horizontalDivision + "\t" + verticalDivision;
            csInterface.evalScript('makeThumbnailList("' + params + '")');
        });
    }
    init();
}());

