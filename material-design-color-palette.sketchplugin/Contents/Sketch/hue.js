var onRun = function (context) {
    // Require library files
    @import 'lib/colors.js'
    @import 'lib/functions.js'

    var doc = context.document;

    // Get current canvas
    var page = doc.currentPage();
    var artboard = doc.currentPage().currentArtboard();
    var canvas = artboard ? artboard : page;

    // Get color info
    var choice = createSelect('Select a color set', COLORS, 0);
    var choiceCode = choice[0];
    var colorIndex = choice[1];
    var colorName = COLORS[colorIndex];

    // Add color palette
    if (isSelected(choiceCode)) {
        var userColorSets = [];
        var swatchesGroups = [];

        if (colorName !== 'All Colors') {
            COLORS[0] = colorName;
            userColorSets = COLOR_SETS.filter(function (e, index) {
                return index === colorIndex;
            });
        } else {
            userColorSets = COLOR_SETS;
        }

        userColorSets.forEach(function (colorSet, index) {
            swatchesGroups[index] = createGroup({
                parent: canvas,
                name: 'Material ' + COLORS[index],
                x: 220 * index, y: 0,
                width: 200, height: colorSet.length * 50
            });
            colorSet.forEach(function (colorInfo, i) {
                addHuePalette(index, colorInfo[0], colorInfo[1], i);
            });
        });
    }
};
