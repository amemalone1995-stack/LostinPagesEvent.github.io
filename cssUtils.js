
export function getRootCssStyles(rootRule = ":root") {
    const cssRulesArray = [...document.styleSheets]
        .map(styleSheet => {
            try {
                return [...styleSheet.cssRules]
                    .map(rule => rule);
            } catch (e) {
                // Ignore inaccessible stylesheets
            }
        });

    var cssVars = [];

    Object.values(cssRulesArray).forEach(arrayElement => {
        Object.values(arrayElement || {}).forEach(ruleElement => {
            if (ruleElement.selectorText === rootRule) {
                Object.values(ruleElement.style).forEach(style => {
                    if (
                        style.startsWith('--spine-') &&
                        cssVars.indexOf(style) === -1
                    ) {
                        cssVars.push(style);
                    }
                });
            }
        });
    });

    return cssVars;
}
