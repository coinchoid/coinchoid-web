angular.module("app.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!DOCTYPE html><html lang=\"en\" ng-app=\"Coinchoid\"><head><title>Coinchoid</title><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"stylesheet\" href=\"css/vendor.css\"><link rel=\"stylesheet\" href=\"css/app.css\"><link rel=\"icon\" type=\"image/x-icon\" href=\"images/favicon.ico\"></head><body><md-content ui-view layout=\"column\" class=\"grey-background\"></md-content><script src=\"js/vendor.js\"></script><script src=\"js/templates.js\"></script><script src=\"js/app.js\"></script></body></html>");
$templateCache.put("states/resultats/view.html","<md-list><md-list-item ng-repeat=\"partie in parties\"><span>Nous : {{ partie.nous }} - Eux : {{ partie.eux }}</span></md-list-item></md-list><md-button ui-sref=\"annonce\" class=\"md-primary md-raised\">Nouvelle annonce</md-button><md-button ng-click=\"reset()\" class=\"md-primary\">Commencer une nouvelle Partie</md-button>");
$templateCache.put("states/donne/view.html","<div class=\"container\"><h1>Nouvelle Donne</h1><h3>Annonce</h3><md-slider ng-model=\"annonce\" step=\"10\" md-discrete=\"\" min=\"80\" max=\"250\" aria-label=\"Annonce\"></md-slider><md-radio-group ng-model=\"bonus\"><md-radio-button value=\"normal\" class=\"md-primary\">Normal</md-radio-button><md-radio-button value=\"coinche\" class=\"md-primary\"> Coinché </md-radio-button><md-radio-button value=\"surcoinche\" class=\"md-primary\">Surcoinché</md-radio-button></md-radio-group><h3>Qui prend ?</h3><md-radio-group ng-model=\"quiPrend\"><md-radio-button value=\"nous\" class=\"md-primary\">Nous</md-radio-button><md-radio-button value=\"eux\" class=\"md-primary\"> Eux </md-radio-button></md-radio-group><md-button ng-click=\"nous(annonce, bonus)\" class=\"md-raised md-primary\">C\'est fait !</md-button><md-button ng-click=\"eux(annonce, bonus)\" class=\"md-raised md-warning\">C\'est chu !</md-button></div>");}]);