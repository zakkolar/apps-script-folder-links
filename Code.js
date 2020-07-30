function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("List of Links")
  .addItem("Create list of links", 'showSidebar')
  .addToUi();
}

function createList(folderId, mode){
  var folder = DriveApp.getFolderById(folderId);
  folder.g
  var ss = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
  ss.setName(uniqueName(folder.getName()));
  
  var titleCells = ss.getRange(1,1,1,2);
  titleCells.setValues(
    [
      ["File name", "URL"]
    ]
  );
  
  var files = folder.getFiles();
  var currentRow = 2;
  
  var specialModeTypes = [
    MimeType.GOOGLE_DOCS,
    MimeType.GOOGLE_DRAWINGS,
    MimeType.GOOGLE_FORMS,
    MimeType.GOOGLE_SHEETS,
    MimeType.GOOGLE_SLIDES
    ];
  
  while(files.hasNext()){
    var file = files.next();
    var range = ss.getRange(currentRow, 1, 1, 2);
    var url = file.getUrl();
    Logger.log(mode);
    if(specialModeTypes.indexOf(file.getMimeType())>-1){
      if(mode === 'copy'){
      url = url.replace('edit','copy');
      }
      else if(mode === 'preview'){
        url = url.replace('edit','template/preview');
      }
    }
    
    range.setValues([
      [file.getName(), url]  
    ]);
    currentRow++;
  }
  
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Create list of links')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
}

function uniqueName(base){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var num = 1;
    var name = base;
  while(ss.getSheetByName(name)!=null){
      name = base+" "+num;
      num++;
      }
    return name;
  } 