angular.module("app.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!DOCTYPE html><html lang=\"en\" ng-app=\"Coinchoid\"><head><title>Coinchoid</title><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"stylesheet\" href=\"css/vendor.css\"><link rel=\"stylesheet\" href=\"css/app.css\"><!-- https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML -->\n<!-- third-generation iPad with high-resolution Retina display: --><link rel=\"apple-touch-icon-precomposed\" sizes=\"144x144\" href=\"images/icons/icon-144x144.png\"><!-- iPhone with high-resolution Retina display: --><link rel=\"apple-touch-icon-precomposed\" sizes=\"114x114\" href=\"images/icons/icon-114x114.png\"><!-- first- and second-generation iPad: --><link rel=\"apple-touch-icon-precomposed\" sizes=\"72x72\" href=\"images/icons/icon-72x72.png\"><!-- non-Retina iPhone, iPod Touch, and Android 2.1+ devices: --><link rel=\"apple-touch-icon-precomposed\" href=\"images/icons/icon-57x57.png\"><!-- basic favicon --><link rel=\"shortcut icon\" href=\"images/icons/icon-32x32.png\"><link rel=\"icon\" type=\"image/x-icon\" href=\"images/icons/icon-32x32.ico\"><!-- https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app/step-07?hl=en --><link rel=\"manifest\" href=\"/manifest.json\"><!-- Add to home screen for Safari on iOS --><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Coinchoid\"><link rel=\"apple-touch-icon\" href=\"images/icons/icon-152x152.png\"><!-- Tile Icon for Windows --><meta name=\"msapplication-TileImage\" content=\"images/icons/icon-144x144.png\"><meta name=\"msapplication-TileColor\" content=\"#85B22C\"></head><body layout=\"column\" class=\"unselectable\"><md-content ui-view flex=\"grow\" layout=\"column\"></md-content><script src=\"js/vendor.js\"></script><script src=\"js/templates.js\"></script><script src=\"js/app.js\"></script><script>if(\'serviceWorker\' in navigator) {\n  navigator.serviceWorker\n    .register(\'/sw.js\')\n    .then(function() { console.log(\"Service Worker Registered\"); });\n}</script></body></html>");
$templateCache.put("states/nav.html","<div layout=\"column\" flex=\"grow\" class=\"main\"><md-toolbar><div class=\"md-toolbar-tools\"><score flex=\"grow\"></score><md-button aria-label=\"Edit score\" ng-click=\"openDetails()\" class=\"md-icon-button\"><md-icon md-svg-icon=\"pencil\"></md-icon></md-button><md-button aria-label=\"Restart\" ng-click=\"reset()\" class=\"md-icon-button\"><md-icon md-svg-icon=\"reload\"></md-icon></md-button></div></md-toolbar><div ui-view flex=\"grow\" layout=\"vertical\" class=\"container\"></div></div>");
$templateCache.put("components/details/view.html","<md-bottom-sheet class=\"md-list\"><table class=\"results\"><tr><th width=\"50%\">Nous</th><th width=\"50%\">Eux</th><th></th></tr><tr ng-repeat=\"partie in parties\" ng-click=\"edit($index, $event)\"><td width=\"50%\">{{ partie.nous }}</td><td width=\"50%\">{{ partie.eux }}</td></tr></table></md-bottom-sheet>");
$templateCache.put("components/editor/view.html","<md-dialog aria-label=\"Editor\"><md-dialog-content><div class=\"md-dialog-content\"><md-input-container><label>Nous</label><input ng-model=\"result.nous\"></md-input-container><md-input-container><label>Eux</label><input ng-model=\"result.eux\"></md-input-container></div></md-dialog-content><md-dialog-actions layout=\"row\"><md-button aria-label=\"cancel\" ng-click=\"cancel()\">Annuler</md-button><md-button ng-click=\"save(result.nous, result.eux)\">Sauvegarder</md-button></md-dialog-actions></md-dialog>");
$templateCache.put("components/info/view.html","<md-dialog aria-label=\"Info\"><md-list flex><md-subheader class=\"md-no-sticky\">Pour faire chuter</md-subheader><md-list-item>Sans atout: {{ annonce.chuSansAtout }}</md-list-item><md-list-item>Tout atout: {{ annonce.chuToutAtout }}</md-list-item><md-divider></md-divider><md-subheader class=\"md-no-sticky\">Pour chuter</md-subheader><md-list-item>Sans atout: {{ annonce.reussiSansAtout }}</md-list-item><md-list-item>Tout atout: {{ annonce.reussiToutAtout }}</md-list-item></md-list></md-dialog>");
$templateCache.put("components/point-selector/view.html","<md-grid-list md-cols=\"4\" md-row-height=\"2:1\" md-row-height-gt-xs=\"2:1\" md-cols-gt-xs=\"6\" md-gutter=\"1px\"><md-grid-tile ng-if=\"firstRangeAnnonce\" ng-repeat=\"value in [80, 90, 100, 110, 120, 130, 140]\" ng-click=\"select(value)\" ng-class=\"{\'md-primary\': value === annonce, \'md-accent\': value !== annonce}\"><h3>{{value}}</h3></md-grid-tile><md-grid-tile ng-if=\"firstRangeAnnonce\" ng-click=\"toggleAnnonces()\" class=\"md-accent\"><md-icon md-svg-icon=\"arrow-right-bold\"></md-icon></md-grid-tile><md-grid-tile ng-if=\"!firstRangeAnnonce\" ng-click=\"toggleAnnonces()\" class=\"md-accent\"><md-icon md-svg-icon=\"arrow-left-bold\"></md-icon></md-grid-tile><md-grid-tile ng-if=\"!firstRangeAnnonce\" ng-repeat=\"value in [130, 140, 150, 160, 170, 180, 250]\" ng-click=\"select(value)\" ng-class=\"{\'md-primary\': value === annonce, \'md-accent\': value !== annonce}\"><h3>{{value === 250 ? \'capot\' : value }}</h3></md-grid-tile></md-grid-list><div class=\"coinche\"><md-radio-group ng-model=\"bonus\" flex layout=\"row\"><div flex layout=\"column\" layout-align=\"center center\" ng-click=\"bonus = \'NORMAL\'\" class=\"options\"><md-radio-button value=\"NORMAL\" aria-label=\"normal\" class=\"md-primary\"></md-radio-button><div>Normal</div></div><div flex layout=\"column\" layout-align=\"center center\" ng-click=\"bonus = \'COINCHE\'\" class=\"options\"><md-radio-button value=\"COINCHE\" aria-label=\"coinche\" class=\"md-primary\"></md-radio-button><div>Coinché !</div></div><div flex layout=\"column\" layout-align=\"center center\" ng-click=\"bonus = \'SURCOINCHE\'\" class=\"options\"><md-radio-button value=\"SURCOINCHE\" aria-label=\"surcoinche\" class=\"md-primary\"></md-radio-button><div>Surcoinché !!</div></div></md-radio-group></div>");
$templateCache.put("components/scores/view.html","<h3>Nous : {{ score.nous }} | Eux : {{ score.eux }}</h3>");
$templateCache.put("states/donne/view.html","<div flex layout=\"column\"><div><h3>Annonce</h3><point-selector annonce=\"annonce\" bonus=\"bonus\"></point-selector></div><div flex=\"grow\" layout=\"column\" layout-align=\"center\"><h3>Qui prend ?</h3><md-radio-group ng-model=\"team\" flex=\"initial\" layout=\"row\" layout-align=\"space-around\"><md-radio-button value=\"NOUS\" class=\"md-primary\">Nous</md-radio-button><md-radio-button value=\"EUX\" class=\"md-primary\"> Eux </md-radio-button></md-radio-group></div><div><div layout=\"column\" layout-align=\"center center\"><h3 flex>Résultats <md-icon md-svg-icon=\"information-outline\" ng-click=\"openInfo(annonce, $event)\"></md-icon></h3></div><md-grid-list md-cols=\"2\" md-row-height=\"2:1\" md-gutter=\"1px\"><md-grid-tile ng-click=\"ko(team, annonce, bonus)\" class=\"md-raised md-accent\"><h3>C\'est chu !</h3></md-grid-tile><md-grid-tile ng-click=\"ok(team, annonce, bonus)\" class=\"md-raised md-primary\"><h3>C\'est fait !</h3></md-grid-tile></md-grid-list></div></div>");}]);