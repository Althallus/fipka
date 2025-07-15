// --------------------------------------------------------------------
// === ZPRACOVANI KALKULACE A VYTVORENI PDF 
// === VYTVORENI POROVNANI 
function processPorovnani_NEW(formObject) {
  
  //DATA DO INPUT_List
  sh_INPUT_List.appendRow([null,
                    new Date,
                    formObject.cons_name,
                    formObject.phone,
                    formObject.email,
                    formObject.jmeno_klienta,
                    formObject.datum_nabidky,
                    formObject.motiv_klienta,
                    formObject.jednoraz_sum,
                    formObject.pravidelka_sum,
                    formObject.inv_horizont,
                    null,
                    formObject.inflace,
                    formObject.sleva,

                    formObject.fond_1,
                    null,
                    null,
                    null,
                    null,
                    null,

                    formObject.fond_2,
                    null,
                    null,
                    null,
                    null,
                    null,
                    
                    formObject.fond_3,
                    null,
                    null,
                    null,
                    null,
                    null,
                    formObject.fond_4,
                    null,
                    null,
                    null,
                    null,
                    null,
                    formObject.fond_5,
                    null,
                    null,
                    null,
                    null,
                    null,
                    // formObject.typ_navrhu,
                    ]);


    //DATA DO INV_UTILITY
    //PORADCE A KLIENT
    sh_INV_UTILITY.getRange(46,2,7,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.cons_name],
              [formObject.phone],
              [formObject.email],
              [formObject.jmeno_klienta],
              [formObject.datum_nabidky],
              [null],
              [formObject.motiv_klienta],
              ]);  


              //HROMADNE ZADANI A ZASKRTNUTI
              sh_INV_UTILITY.getRange(56,2,7,1)//(start row, start column, number of rows, number of columns
   .setValues([
              ['TRUE'],
              [formObject.jednoraz_sum],
              [formObject.pravidelka_sum],
              [formObject.inv_horizont],
              [null],
              [formObject.sleva],
              [formObject.inflace],
              ]);


              //FOND 1
              sh_INV_UTILITY.getRange(67,2,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_1],
              [null],
              [null],
              [null],
              [formObject.vynos_1],
              [null],
              ]);   

               //FOND 2
              sh_INV_UTILITY.getRange(67,3,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_2],
              [null],
              [null],
              [null],
              [formObject.vynos_2],
              [null],
              ]);  

              //FOND 3
              sh_INV_UTILITY.getRange(67,4,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_3],
              [null],
              [null],
              [null],
              [formObject.vynos_3],
              [null],
              ]);  

              //FOND 4
              sh_INV_UTILITY.getRange(67,5,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_4],
              [null],
              [null],
              [null],
              [formObject.vynos_4],
              [null],
              ]);  

              //FOND 5
              sh_INV_UTILITY.getRange(67,6,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_5],
              [null],
              [null],
              [null],
              [formObject.vynos_5],
              [null],
              ]);  


  var lastRow = sh_INPUT_List.getLastRow();
  
  // SpreadsheetApp.flush(); 
  
  var jmeno = sh_INPUT_List.getRange("F"+lastRow).getValue(); //Jméno

var dnes = new Date();
var dd = String(dnes.getDate()).padStart(2, '0');
var mm = String(dnes.getMonth() + 1).padStart(2, '0'); // měsíce jsou 0–11
var rrrr = dnes.getFullYear();

var datum = dd + '.' + mm + '.' + rrrr;

  var filename = jmeno + " Porovnání variant řešení " + datum + ".pdf"; // Název souboru

  sh_MI_ALL_COLUMN.hideRows(177,221);
  sh_MI_ALL_COLUMN.showRows(177,126);
 
  var sheetId = sh_MI_ALL_COLUMN.getSheetId();


SpreadsheetApp.flush(); 


  // Creat PDF file as a temporary file and create URL for downloading.
  var url = "https://docs.google.com/a/mydomain.org/spreadsheets/d/" + ss.getId() 
  + "/export?exportFormat=pdf&format=pdf"
  + '&size=A4'
  + '&portrait=true'
  + '&fitw=true'       
  // + '&top_margin=0.1968503937'              
  + '&top_margin=0.05'              
  + '&bottom_margin=0.05'          
  // + '&bottom_margin=0.1968503937'          
  + '&left_margin=0.0'             
  + '&right_margin=0.0'           
  + '&sheetnames=false&printtitle=false'
  + '&pagenum=false'
  + '&gridlines=false'
  + '&horizontal_alignment=center'
  + '&fzr=FALSE'
  + "&gid=" 
  + sheetId 
  + "&access_token=" 
  + ScriptApp.getOAuthToken();
  
    var blob = UrlFetchApp.fetch(url).getBlob().setName(filename);
    var file = DriveApp.getFolderById("1hd9piJaGbyn0CBtYVaPlSbrVceRpvGzg").createFile(blob);
    var dlUrl = "https://drive.google.com/uc?export=download&id=" + file.getId();
  
 file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);

sh_INPUT_List.getRange("A"+lastRow).setValue(dlUrl); 

return file.getId(); 

}
// =======================================================

// ----------------------------------------------------------------------
// === VYTVORENI PREKALKULACE POROVNANI 
function processPorovnani_predkalkulace(formObject) {
  

    //DATA DO INV_UTILITY
    //PORADCE A KLIENT
    sh_INV_UTILITY.getRange(46,2,7,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.cons_name],
              [formObject.phone],
              [formObject.email],
              [formObject.jmeno_klienta],
              [formObject.datum_nabidky],
              [null],
              [formObject.motiv_klienta],
              ]);  


              //HROMADNE ZADANI A ZASKRTNUTI
              sh_INV_UTILITY.getRange(56,2,7,1)//(start row, start column, number of rows, number of columns
   .setValues([
              ['TRUE'],
              [formObject.jednoraz_sum],
              [formObject.pravidelka_sum],
              [formObject.inv_horizont],
              [null],
              [formObject.sleva],
              [formObject.inflace],
              ]);


              //FOND 1
              sh_INV_UTILITY.getRange(67,2,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_1],
              [null],
              [null],
              [null],
              [formObject.vynos_1],
              [null],
              ]);   

               //FOND 2
              sh_INV_UTILITY.getRange(67,3,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_2],
              [null],
              [null],
              [null],
              [formObject.vynos_2],
              [null],
              ]);  

              //FOND 3
              sh_INV_UTILITY.getRange(67,4,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_3],
              [null],
              [null],
              [null],
              [formObject.vynos_3],
              [null],
              ]);  

              //FOND 4
              sh_INV_UTILITY.getRange(67,5,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_4],
              [null],
              [null],
              [null],
              [formObject.vynos_4],
              [null],
              ]);  

              //FOND 5
              sh_INV_UTILITY.getRange(67,6,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_5],
              [null],
              [null],
              [null],
              [formObject.vynos_5],
              [null],
              ]);  


SpreadsheetApp.flush(); 

var nalezenaData = sh_INV_UTILITY.getRange(156,2,42,5).getValues(); //(start row, start column, number of rows, number of columns

  return nalezenaData;

}
// ==============================================================================================================


// -----------------------------------------------------------------------------------
// === VYTVORENI SOUHRNEHO PORTFOLIA
function processSouhrn_NEW(formObject) {
  
  sh_INPUT_List.appendRow([null,
                    new Date,
                    formObject.cons_name,
                    formObject.phone,
                    formObject.email,
                    formObject.jmeno_klienta,
                    formObject.datum_nabidky,
                    formObject.motiv_klienta,
                    null,
                    null,
                    formObject.inv_horizont,
                    null,
                    formObject.inflace,
                    formObject.sleva,

                    formObject.fond_1,
                    formObject.jednoraz_1,
                    formObject.pravidelka_1,
                    null,
                    formObject.vynos_1,
                    null,

                    formObject.fond_2,
                    formObject.jednoraz_2,
                    formObject.pravidelka_2,
                    null,
                    formObject.vynos_2,
                    null,
                    
                    formObject.fond_3,
                    formObject.jednoraz_3,
                    formObject.pravidelka_3,
                    null,
                    formObject.vynos_3,
                    null,

                    formObject.fond_4,
                    formObject.jednoraz_4,
                    formObject.pravidelka_4,
                    null,
                    formObject.vynos_4,
                    null,

                    formObject.fond_5,
                    formObject.jednoraz_5,
                    formObject.pravidelka_5,
                    null,
                    formObject.vynos_5,
                    null,
                    // formObject.typ_navrhu,
                    ]);



     sh_INV_UTILITY.getRange(46,2,7,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.cons_name],
              [formObject.phone],
              [formObject.email],
              [formObject.jmeno_klienta],
              [formObject.datum_nabidky],
              [null],
              [formObject.motiv_klienta],
              ]);  



          //HROMADNE ZADANI A ZASKRTNUTI
              sh_INV_UTILITY.getRange(56,2,7,1)//(start row, start column, number of rows, number of columns
   .setValues([
              ['FALSE'],
              [''],
              [''],
              [formObject.inv_horizont],
              [null],
              [formObject.sleva],
              [formObject.inflace],
              ]);

              
              //FOND 1
              sh_INV_UTILITY.getRange(67,2,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_1],
              [formObject.jednoraz_1],
              [formObject.pravidelka_1],
              [null],
              [formObject.vynos_1],
              [null],
              ]);   

               //FOND 2
              sh_INV_UTILITY.getRange(67,3,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_2],
              [formObject.jednoraz_2],
              [formObject.pravidelka_2],
              [null],
              [formObject.vynos_2],
              [null],
              ]);  

              //FOND 3
              sh_INV_UTILITY.getRange(67,4,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_3],
              [formObject.jednoraz_3],
              [formObject.pravidelka_3],
              [null],
              [formObject.vynos_3],
              [null],
              ]);  

              //FOND 4
              sh_INV_UTILITY.getRange(67,5,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_4],
              [formObject.jednoraz_4],
              [formObject.pravidelka_4],
              [null],
              [formObject.vynos_4],
              [null],
              ]);  

              //FOND 5
              sh_INV_UTILITY.getRange(67,6,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_5],
              [formObject.jednoraz_5],
              [formObject.pravidelka_5],
              [null],
              [formObject.vynos_5],
              [null],
              ]);  

 var lastRow = sh_INPUT_List.getLastRow();

 sh_MI_ALL_COLUMN.hideRows(177,221);
  sh_MI_ALL_COLUMN.showRows(303,95);
  
  var jmeno = sh_INPUT_List.getRange("F"+lastRow).getValue(); //Jméno

var dnes = new Date();
var dd = String(dnes.getDate()).padStart(2, '0');
var mm = String(dnes.getMonth() + 1).padStart(2, '0'); // měsíce jsou 0–11
var rrrr = dnes.getFullYear();

var datum = dd + '.' + mm + '.' + rrrr;

  var filename = jmeno + " Souhrnný návrh řešení " + datum + ".pdf"; // Název souboru

  var sheetId = sh_MI_ALL_COLUMN.getSheetId();

SpreadsheetApp.flush(); 

  // Creat PDF file as a temporary file and create URL for downloading.
  var url = "https://docs.google.com/a/mydomain.org/spreadsheets/d/" + ss.getId() 
  + "/export?exportFormat=pdf&format=pdf"
  + '&size=A4'
  + '&portrait=true'
  + '&fitw=true'       
  + '&top_margin=0.05'              
  + '&bottom_margin=0.05'          
  + '&left_margin=0.0'             
  + '&right_margin=0.0'           
  + '&sheetnames=false&printtitle=false'
  + '&pagenum=false'
  + '&gridlines=false'
  + '&horizontal_alignment=center'
  + '&fzr=FALSE'
  + "&gid=" 
  + sheetId 
  + "&access_token=" 
  + ScriptApp.getOAuthToken();
  
    var blob = UrlFetchApp.fetch(url).getBlob().setName(filename);
    var file = DriveApp.getFolderById("1hd9piJaGbyn0CBtYVaPlSbrVceRpvGzg").createFile(blob);
    var dlUrl = "https://drive.google.com/uc?export=download&id=" + file.getId();
  
 file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);

sh_INPUT_List.getRange("A"+lastRow).setValue(dlUrl); 

return file.getId(); 
}
// ====================================================================================================

// -------------------------------------------------------------------------------------------
// === VYTVORENI PREDKALKULACE SOUHRNEHO PORTFOLIA
function processSouhrn_predkalkulace(formObject) {
  

     sh_INV_UTILITY.getRange(46,2,7,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.cons_name],
              [formObject.phone],
              [formObject.email],
              [formObject.jmeno_klienta],
              [formObject.datum_nabidky],
              [null],
              [formObject.motiv_klienta],
              ]);  

          //HROMADNE ZADANI A ZASKRTNUTI
              sh_INV_UTILITY.getRange(56,2,7,1)//(start row, start column, number of rows, number of columns
   .setValues([
              ['FALSE'],
              [''],
              [''],
              [formObject.inv_horizont],
              [null],
              [formObject.sleva],
              [formObject.inflace],
              ]);

              //FOND 1
              sh_INV_UTILITY.getRange(67,2,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_1],
              [formObject.jednoraz_1],
              [formObject.pravidelka_1],
              [null],
              [formObject.vynos_1],
              [null],
              ]);   

               //FOND 2
              sh_INV_UTILITY.getRange(67,3,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_2],
              [formObject.jednoraz_2],
              [formObject.pravidelka_2],
              [null],
              [formObject.vynos_2],
              [null],
              ]);  

              //FOND 3
              sh_INV_UTILITY.getRange(67,4,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_3],
              [formObject.jednoraz_3],
              [formObject.pravidelka_3],
              [null],
              [formObject.vynos_3],
              [null],
              ]);  

              //FOND 4
              sh_INV_UTILITY.getRange(67,5,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_4],
              [formObject.jednoraz_4],
              [formObject.pravidelka_4],
              [null],
              [formObject.vynos_4],
              [null],
              ]);  

              //FOND 5
              sh_INV_UTILITY.getRange(67,6,6,1)//(start row, start column, number of rows, number of columns
   .setValues([
              [formObject.fond_5],
              [formObject.jednoraz_5],
              [formObject.pravidelka_5],
              [null],
              [formObject.vynos_5],
              [null],
              ]);  

  
  SpreadsheetApp.flush(); 

var nalezenaData = sh_INV_UTILITY.getRange(156,2,42,5).getValues(); //(start row, start column, number of rows, number of columns

  return nalezenaData;

}


// ====================================================================================================