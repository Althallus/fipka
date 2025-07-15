/**
 * ===================================================================
 * RUNNER.GS - ZJEDNODUŠENÁ VERZE BEZ CACHE
 * ===================================================================
 * Hlavní konfigurační soubor pro Google Apps Script
 * Obsahuje: konfiguraci, načítání dat, rendering
 */

// === KONFIGURACE ===
const CONFIG = {
  SPREADSHEET_ID: "1YM5oTdG9yo8XU-4pVoN044Q9J-aA0tgkktsxxjoRS6M",
  LOG_SPREADSHEET_ID: "1spyAuJ1rXqDR5ZgrWd46nn3tc7Sd4YWSiroBAAbukrI"
};

// === INICIALIZACE GOOGLE SHEETS ===
const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
const SHEETS = {
  LISTS_FONDY: ss.getSheetByName("LISTS_FONDY"),
  INPUT_List: ss.getSheetByName("INPUT_List"),
  INV_UTILITY: ss.getSheetByName("INV_UTILITY"),
  MI_ALL_COLUMN: ss.getSheetByName("MI_ALL_COLUMN"),
  Poradci: ss.getSheetByName("Poradci")
};

/**
 * ===================================================================
 * NAČÍTÁNÍ DAT ZE SHEETS
 * ===================================================================
 */

/**
 * Načte seznam fondů z listu LISTS_FONDY
 * @returns {Array} Array fondů [název, další_data]
 */
function getFundList() {
  try {
    console.log("Načítám seznam fondů...");
    
    if (!SHEETS.LISTS_FONDY) {
      throw new Error("List LISTS_FONDY nenalezen");
    }
    
    const startRow = 3;
    const lastRow = SHEETS.LISTS_FONDY.getRange("C3").getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
    
    if (lastRow < startRow) {
      console.warn("Žádná data fondů nenalezena");
      return [];
    }
    
    const data = SHEETS.LISTS_FONDY.getRange(startRow, 3, lastRow - startRow + 1, 2).getValues();
    const filteredData = data.filter(row => row[0] && row[0].toString().trim() !== '');
    
    console.log(`Načteno ${filteredData.length} fondů`);
    return filteredData;
    
  } catch (error) {
    console.error("Chyba při načítání fondů:", error);
    return [];
  }
}

/**
 * Načte data poradců z listu Poradci
 * @returns {Array} Array poradců [jméno, telefon, email]
 */
function getPoradciData() {
  try {
    console.log("Načítám seznam poradců...");
    
    if (!SHEETS.Poradci) {
      throw new Error("List Poradci nenalezen");
    }
    
    const lastRow = SHEETS.Poradci.getLastRow();
    if (lastRow < 2) {
      console.warn("Žádná data poradců nenalezena");
      return [];
    }
    
    const data = SHEETS.Poradci.getRange(2, 1, lastRow - 1, 3).getValues();
    const filteredData = data.filter(row => row[0] && row[0].toString().trim() !== '');
    
    console.log(`Načteno ${filteredData.length} poradců`);
    console.log("Data poradců:", filteredData);
    
    return filteredData;
    
  } catch (error) {
    console.error("Chyba při načítání poradců:", error);
    return [];
  }
}

/**
 * ===================================================================
 * FUNKCE PRO ZÍSKÁNÍ KONTAKTŮ PORADCE
 * ===================================================================
 */

/**
 * Vytvoří HTML options pro select dropdown s poradci (pro template engine)
 * @returns {string} HTML string s option elementy
 */
function getPoradce() {
  try {
    const data_Poradci = getPoradciData();
    
    if (!data_Poradci || data_Poradci.length === 0) {
      console.warn("Žádní poradci nenalezeni pro dropdown");
      return '<option value="">Žádní poradci k dispozici</option>';
    }
    
    const options = data_Poradci.map(row => `<option value="${row[0]}">${row[0]}</option>`).join('');
      
    console.log(`Vytvořeno HTML pro ${data_Poradci.length} poradců`);
    console.log("HTML options:", options);
    
    return options;
    
  } catch (error) {
    console.error("Chyba při vytváření HTML pro poradce:", error);
    return '<option value="">Chyba při načítání poradců</option>';
  }
}

/**
 * Vrací telefon poradce podle jména
 * @param {string} inputCons - Jméno poradce
 * @returns {string|null} Telefon nebo null
 */
function getConsTel(inputCons) {
  try {
    if (!inputCons || inputCons.trim() === '') {
      return null;
    }
    
    const poradci = getPoradciData();
    const poradce = poradci.find(row => row[0] === inputCons);
    
    if (!poradce) {
      console.warn(`Poradce "${inputCons}" nenalezen`);
      return null;
    }
    
    return poradce[1] || null;
    
  } catch (error) {
    console.error("Chyba při získávání telefonu poradce:", error);
    return null;
  }
}

/**
 * Vrací email poradce podle jména
 * @param {string} inputCons - Jméno poradce
 * @returns {string|null} Email nebo null
 */
function getConsEmail(inputCons) {
  try {
    if (!inputCons || inputCons.trim() === '') {
      return null;
    }
    
    const poradci = getPoradciData();
    const poradce = poradci.find(row => row[0] === inputCons);
    
    if (!poradce) {
      console.warn(`Poradce "${inputCons}" nenalezen`);
      return null;
    }
    
    return poradce[2] || null;
    
  } catch (error) {
    console.error("Chyba při získávání emailu poradce:", error);
    return null;
  }
}

/**
 * ===================================================================
 * LOGGING A ANALYTICS
 * ===================================================================
 */

/**
 * Loguje jednoduchý přístup na stránku
 * @param {string} userId - ID uživatele (nebo 'anonym')
 */
function logSimpleAccess(userId = 'anonym') {
  try {
    const logSheet = SpreadsheetApp.openById(CONFIG.LOG_SPREADSHEET_ID).getSheetByName('FIPKA');
    const date = new Date();
    logSheet.appendRow([date, userId]);
    console.log(`Zalogován přístup pro uživatele: ${userId}`);
  } catch (error) {
    console.error("Chyba při logování přístupu:", error);
  }
}

/**
 * ===================================================================
 * HTML RENDERING FUNKCE
 * ===================================================================
 */

/**
 * Vloží obsah HTML souboru
 * @param {string} filename - Název souboru
 * @returns {string} Obsah HTML souboru
 */
function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (error) {
    console.error(`Chyba při načítání souboru ${filename}:`, error);
    return `<!-- Chyba: Soubor ${filename} nenalezen -->`;
  }
}

/**
 * Vykreslí stránku s předanými parametry
 * @param {string} file - Název template souboru
 * @param {Object} argsObject - Objekty k předání do template
 * @returns {HtmlOutput} HTML výstup
 */
function render(file, argsObject = {}) {
  try {
    const tmp = HtmlService.createTemplateFromFile(file);
    
    // Předej parametry do template
    Object.keys(argsObject).forEach(key => {
      tmp[key] = argsObject[key];
    });
    
    return tmp.evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setTitle('F!Dos INVESTIČNÍ POROVNÁVAČ')
      .setFaviconUrl('https://i.imgur.com/QLNppCE.png');
      
  } catch (error) {
    console.error(`Chyba při renderování ${file}:`, error);
    
    const errorTemplate = HtmlService.createTemplate(`
      <html>
        <body>
          <h1>Chyba při načítání stránky</h1>
          <p>Omlouváme se, došlo k chybě: <?= error ?></p>
        </body>
      </html>
    `);
    errorTemplate.error = error.toString();
    return errorTemplate.evaluate();
  }
}

/**
 * ===================================================================
 * HLAVNÍ FUNKCE PRO ZOBRAZENÍ STRÁNKY
 * ===================================================================
 */

/**
 * Hlavní funkce pro zobrazení stránky (doGet handler)
 * @returns {HtmlOutput} Vykreslená stránka
 */
function doGet() {
  try {
    console.log("=== SPOUŠTÍM doGet ===");
    
    // Načti seznam fondů pro dropdown
    const fundList = getFundList();
    const htmlListArray = fundList
      .filter(item => item[0] && item[0].toString().trim() !== '')
      .map(item => `<option value="${item[0]}">${item[0]}</option>`)
      .join('');
    
    // Načti seznam poradců pro dropdown
    const poradciList = getPoradciData();
    const poradciHtmlArray = poradciList
      .filter(item => item[0] && item[0].toString().trim() !== '')
      .map(item => `<option value="${item[0]}">${item[0]}</option>`)
      .join('');
    
    console.log(`Renderuji stránku s ${fundList.length} fondy a ${poradciList.length} poradci`);
    console.log("HTML pro poradce:", poradciHtmlArray);
    
    return render("Index-Main", { 
      fondy_seznam: htmlListArray,
      poradci_seznam: poradciHtmlArray
    });
    
  } catch (error) {
    console.error("Chyba v doGet:", error);
    
    return HtmlService.createHtmlOutput(`
      <html>
        <body>
          <h1>Omlouváme se</h1>
          <p>Došlo k chybě při načítání aplikace. Zkuste to prosím později.</p>
          <p><small>Chyba: ${error.toString()}</small></p>
        </body>
      </html>
    `).setTitle('Chyba - F!Dos INVESTIČNÍ POROVNÁVAČ');
  }
}

/**
 * ===================================================================
 * TESTOVACÍ FUNKCE (pro development)
 * ===================================================================
 */

/**
 * Testovací funkce pro kontrolu dat poradců
 */
function testPoradci() {
  console.log("=== TEST PORADCŮ ===");
  
  const poradci = getPoradciData();
  console.log("Raw data poradců:", poradci);
  
  if (poradci.length > 0) {
    const prvniPoradce = poradci[0][0];
    console.log("Test telefonu pro", prvniPoradce, ":", getConsTel(prvniPoradce));
    console.log("Test emailu pro", prvniPoradce, ":", getConsEmail(prvniPoradce));
  }
}

/**
 * Testovací funkce pro kontrolu dat fondů
 */
function testFondy() {
  console.log("=== TEST FONDŮ ===");
  
  const fondy = getFundList();
  console.log("Raw data fondů:", fondy);
  console.log("Počet fondů:", fondy.length);
}