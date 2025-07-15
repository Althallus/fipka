\# FiDos INVESTIČNÍ POROVNÁVAČ



Tento projekt je webová aplikace postavená na platformě Google Apps Script, která slouží jako nástroj pro finanční poradce. Umožňuje vytvářet, porovnávat a prezentovat investiční návrhy pro klienty, včetně generování profesionálních PDF výstupů.



\## Klíčové funkce



\* \*\*Interaktivní kalkulačky:\*\* Aplikace obsahuje řadu kalkulaček pro finanční plánování:

&nbsp;   \* Výpočet budoucí hodnoty investice

&nbsp;   \* Kalkulace potřebné částky pro dosažení cíle

&nbsp;   \* Plánování renty

&nbsp;   \* Odhad starobního důchodu

&nbsp;   \* Analýza vlivu inflace

* \*\*Výběr cíle uživatelem a nadefinování nabídky dle cíle

\* \*\*Správa portfolia:\*\* Možnost sestavit portfolio až z pěti různých investičních nástrojů.

\* \*\*Předdefinované strategie:\*\* Obsahuje vzorová portfolia od společností VIG a FiD (konzervativní, vyvážené, dynamické atd.).

\* \*\*Generování PDF:\*\* Aplikace umí na základě zadaných dat vygenerovat a nabídnout ke stažení profesionální PDF soubor s investičním návrhem.

\* \*\*Propojení s Google Sheets:\*\* Využívá Google Sheets jako databázi pro seznamy fondů, data poradců a logování vstupů.



\## Použité technologie



\* \*\*Backend:\*\* Google Apps Script

\* \*\*Frontend:\*\* HTML5, CSS3, JavaScript (ES6)

\* \*\*Frameworky a knihovny:\*\*

&nbsp;   \* Bootstrap 4

&nbsp;   \* jQuery

&nbsp;   \* Highcharts.js pro grafy

&nbsp;   \* Font Awesome pro ikony



\## Struktura projektu



Projekt je rozdělen do několika logických částí:



\* `appsscript.json`: Manifest a konfigurace projektu, včetně potřebných služeb Google (Sheets, Drive, BigQuery).

\* `#Runner.js`: Hlavní serverový skript, který obsluhuje `doGet` požadavek, renderuje HTML šablony a načítá data z Google Sheets.

\* `#Server-Scripts.js`: Serverové funkce pro zpracování dat z formuláře a generování PDF.

\* `Index-Main.html`: Hlavní HTML soubor, který skládá celou stránku z dílčích komponent (`include` funkce).

\* \*\*HTML Komponenty:\*\* Soubory jako `Navbar.html`, `Modaly.html`, `Calculator-Cards.html` atd., které představují znovupoužitelné části uživatelského rozhraní.

\* \*\*Klientské skripty:\*\* Logika na straně klienta je rozdělena do souborů jako `Skripty.html` (starší, monolitický), `Vypocty.html` a novějších, modularizovaných souborů `Scripts-\*.html`.

\* `Styly.html`: Veškeré CSS styly pro aplikaci.



\## Instalace a nasazení



1\.  \*\*Vytvořte Google Sheet:\*\* Aplikace vyžaduje Google Sheet jako databázi. Struktura musí odpovídat tomu, jak na ni přistupují skripty (listy `LISTS\_FONDY`, `INPUT\_List` atd.).

2\.  \*\*Clasp:\*\* Pro lokální vývoj a správu souborů se používá nástroj `clasp`.

3\.  \*\*Konfigurace:\*\* Ujistěte se, že `scriptId` v souboru `.clasp.json` odpovídá vašemu Google Apps Script projektu.

4\.  \*\*Nasazení:\*\* Nasaďte projekt jako webovou aplikaci s přístupem `ANYONE\_ANONYMOUS`, aby byla veřejně dostupná.



\## Pokyny



1. kontrola struktury scriptu
2. Přidání prvků karet pro různé druhy výpočtů a cílů klienta
