
function onchangeFile() {

     
    var modal = document.getElementById("myModalLoder");
    modal.style.display = "block";

    setTimeout(function () { handleFile(); }, 100);

}

function handleFile() {
     
    $("#btnChooseFileExcel").attr('style', 'width: 100%;background-color:#46b8da;')
    $("#btnChooseFileExcel").html("ChooseFileExcel 🔰");

    const fileInput = document.getElementById('ChooseFileExcel');
    const output = document.getElementById('OutPutExcel');

    const file = fileInput.files[0];
    const reader = new FileReader();

    try {

        $("#fileName").val("" + file.name + "")

 
        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const range = XLSX.utils.decode_range(sheet['!ref']);
            const dataArray = [];
         
            for (let row = range.s.r; row <= range.e.r; row++) {
                const rowData = {};
                for (let col = range.s.c; col <= range.e.c; col++) {
                    const cellAddress = { c: col, r: row };
                    const cellRef = XLSX.utils.encode_cell(cellAddress);
                    const cell = sheet[cellRef];
                    const header = sheet[XLSX.utils.encode_cell({ c: col, r: 0 })].v; // Get header name from first row

                    if (cell && cell.v !== undefined) {
                        rowData[header] = cell.v;
                    } else {
                        rowData[header] = "";
                    }
                }
                if (row !== 0) { // Skip the first row as it contains headers
                    dataArray.push(rowData);
                }
            }

     

            console.log(dataArray); // Optional: Log the data to console

            output.innerHTML = JSON.stringify(dataArray); // Display data on the page

          

            $("#btnChooseFileExcel").html($("#fileName").val());
            $("#btnChooseFileExcel").attr('style', 'width: 100%;background-color: #035400;')
          
            setTimeout(function () { $('#btnUploadFileExcel').click(); }, 200);


        };

       
        reader.readAsArrayBuffer(file);
    } catch (e) {
        alert('يوجد خطاء في ملف الاكسل')
    }
}



function SaveFile() {

     
    var modal = document.getElementById("myModalLoder");
    modal.style.display = "block";

    setTimeout(function () {

         
        let NamefileInput = localStorage.getItem(GetParameterByName('App') + "NamefileInput")
        let path = localStorage.getItem(GetParameterByName('App') + "Path")
        let fileName = localStorage.getItem(GetParameterByName('App') + "FileName")

        var fileInput = document.getElementById(NamefileInput);
        var file = fileInput.files[0];
         
        if (file != undefined && file != 'undefined') {


            var formData = new FormData();
            formData.append("fileUpload", file);

            formData.append("Path_Url", path);

            formData.append("fileName", fileName  );


            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/FileUpload/Upload"); // Replace with your server endpoint URL
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // File uploaded successfully
                    console.log("File uploaded!");
                    //alert("File uploaded!")
                     

                    var modal = document.getElementById("myModalLoder");
                    modal.style.display = "none";


                } else {
                    // File upload failed
                    var modal = document.getElementById("myModalLoder");
                    modal.style.display = "none";
                    console.error("File upload failed!");
                    alert("File Save failed!")
                }
            };
            xhr.send(formData);
        }
        else {

            var modal = document.getElementById("myModalLoder");
            modal.style.display = "none";

            alert("You Must Select a File")
        }
    }, 100);
}



