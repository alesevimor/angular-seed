angular-locale
==============

Modul für AngularJS zur Verwaltung von Mehrsprachigkeit über Direktiven, sowie optional über Filter.
Kein Neuladen der Seite erforderlich. 
Alle definierten Lokalisierungen werden via data binding direkt gesetzt. 

Der Service setzt die Sprache der Anwendung nach folgendem Schema:

- Falls die Seite mit einem Query Parameter aufgerufen wird, konsumiert der Service diesen und setzt die Sprache entsprechend. **http://www.example.de/?language=de_DE**
  
- Falls bereits eine Sprache per Cookie gesetzt ist, wird diese geladen.

- Falls kein Cookie gesetzt ist analysiert der Service die Browsersprache und selektiert abhängig davon eine, über das Plugin initialisierte, verfügbare Sprache.

- Falls keine verfügbare Sprache gefunden werden konnte wird der default-locale geladen.

Bei Wechsel der Sprache setzt der Service einen Cookie bzw. speichert die Sprache im Localestorage des Browsers. 

Anwendung
--------------

Das Modul wird einfach als Dependency reingeladen, ist über den Provider konfigurierbar und muss danach nur noch in einem run-Block initiiert werden.

<pre>
angular.module('app', ['LocaleModule'], function(LocaleProvider) {
        LocaleProvider.setAvailableLocales([
            {name: 'Deutsch', value: 'de_DE'},
            {name: 'English', value: 'en_GB'},
            {name: 'Espanol', value: 'es_ES'}
        ]);
        LocaleProvider.setDefaultLocale('de_DE');
    })

    .run(['Locale', function(Locale) {
        Locale.initLocale();
    }]);
</pre>

Als Grundlage wird eine Sprachdatei definiert, die eine Variable **Localization** in den globalen Context lädt:

<pre>
var Localization = {
    home : {
        de_DE : "zu Hause",
        en_GB : "home",
        es_ES : "en casa"
    }
};
</pre>

Die Localization Variable kann beliebig geschachtelt werden und anhand des Property-Pfades angesprochen werden.
Danach gibt es mehrere Möglichkeiten darauf zuzugreifen:

<pre>
<span data-ng-bind="'home' | localized"></span>
<span data-locale-string='home'></span>
</pre>

Alternativ kann natürlich auch im Controller per Filteraufruf, die Lokalisierung geladen werden:

<pre>
function AppController($scope, $filter) {
    $scope.string = $filter('localized')('home');
}
</pre>

Der Service **Locale** kann benutzt werden, um die Sprache zu wechseln:

<pre>
function LocaleController($scope, Locale) {
    $scope.changeLocale = function(locale) {
        Locale.changeLocale(locale);
    };
}
</pre>



