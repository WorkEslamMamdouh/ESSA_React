function reduceImageSize(file, desiredWidth, desiredHeight, targetFileSizeKB, callback) {
    var reader = new FileReader();

    reader.onload = function (e) {
        var img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // Set canvas dimensions to the desired resolution
            canvas.width = desiredWidth;
            canvas.height = desiredHeight;

            // Draw the image onto the canvas with the desired resolution
            ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);

            // Convert the canvas to a data URL with reduced resolution
            var dataUrl = canvas.toDataURL('image/jpeg', 0.8); // You can adjust the quality (0-1) as needed

            // Convert the data URL to a Blob
            var blob = dataURItoBlob(dataUrl);

            // Check the size of the Blob
            var currentSizeKB = blob.size / 1024;

            // If the current size is below the target, pass the data URL to the callback
            if (currentSizeKB <= targetFileSizeKB) {
                callback(dataUrl);
            } else {
                // If the current size exceeds the target, recursively call the function
                // with a slightly lower quality to reduce the file size
                reduceImageSize(file, desiredWidth, desiredHeight, targetFileSizeKB, callback);
            }
        };
    };

    reader.readAsDataURL(file);
}

// Function to convert data URL to Blob
function dataURItoBlob(dataUrl) {
    var arr = dataUrl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}

function onchangeFile() {
     
    // Example usage
    var fileInput = document.getElementById("fileUploadInput");
    var desiredWidth = 800;  // Adjust the desired width based on your requirements
    var desiredHeight = 600; // Adjust the desired height based on your requirements
    var targetFileSizeKB = 100; // Adjust the target file size in kilobytes based on your requirements


    var file = fileInput.files[0];



    if (file != undefined && file != 'undefined') {
        //$("#fileName").val("" + file.name + "")
        $("#" + $("#IdName_View_Img").val() + "").attr('src', '/images/Loder.gif');

        //reduceImageSize(file, desiredWidth, desiredHeight, targetFileSizeKB, function (reducedImageDataUrl) {

            $("#BtnUpload").removeClass("display_none");
            $("#fileUploadInput").attr("style", "background: #0ea300;color: aliceblue;font-weight: bold;");


            setTimeout(function () {
                $('#BtnUpload').click();
            }, 100);
        //});

    }
    else {
        $("#BtnUpload").addClass("display_none");
        $("#fileUploadInput").attr("style", "background: #0051a3;color: aliceblue;font-weight: bold;");

        $("#_ImageUpload").attr('src', '');
    }


}




function uploadImg() {

    debugger

    $("#" + $("#IdName_View_Img").val() + "").val("loading...")

    var fileInput = document.getElementById("fileUploadInput");
    var file = fileInput.files[0];
     
    if (file != undefined && file != 'undefined') {


        var formData = new FormData();
        formData.append("fileUpload", file);
         

        //path = 'D:/Ahmed_Work/Kids4/WebUI/Upload_Img/';
        if ($('#Name_Folder').val().trim() == '') {
            path = $('#Path_Save').val();
        }
        else {
            path = $('#Path_Save').val() + '/' + $('#Name_Folder').val().trim() + '/';
        }

        formData.append("Path_Url", path);

        // 🟢 الامتداد الحقيقي
        var extension = file.name.split('.').pop().toLowerCase();

        //formData.append("fileName", $('#fileName').val() + fileInput.accept);
        formData.append("fileName", $('#fileName').val() + '.' + extension);



        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/FileUpload/Upload"); // Replace with your server endpoint URL
        xhr.onload = function () {
            if (xhr.status === 200) {
                // File uploaded successfully
                console.log("File uploaded!");
                //alert("File uploaded!")
                $('#Btn_fileUpload').click();

                  
                $("#" + $("#IdName_View_Img").val() + "").val("Done")
                $("#" + $("#IdName_View_Img").val() + "").addClass("_backColor")
                $("#" + $("#IdName_View_Img").val() + "").attr('Name_Img', $("#fileName").val());
                $("#" + $("#IdName_View_Img").val() + "").attr('src', $("#UrlImg").val());


                //$("#_ImageUpload").html('<img id="" class="w-100" src="/Upload_Img/' + $('#fileName').val() + fileInput.accept + '" />');
                //$("#_ImageUpload").html('<img id="" class="w-100" src="' + $('#Path_Upload').val()+ $('#fileName').val() + fileInput.accept + '" />');

            } else {
                // File upload failed
                console.error("File upload failed!");
                alert("File upload failed!")
            }
        };
        xhr.send(formData);
    }
    else {

        alert("You Must Select a File")
    }

}




//*************************************



function onchangeFileArchive() {

    debugger 
    // Example usage
    var fileInput = document.getElementById("fileUploadInputArchive");
    var desiredWidth = 800;  // Adjust the desired width based on your requirements
    var desiredHeight = 600; // Adjust the desired height based on your requirements
    var targetFileSizeKB = 100; // Adjust the target file size in kilobytes based on your requirements


    var file = fileInput.files[0];



    if (file != undefined && file != 'undefined') {
        //$("#fileName").val("" + file.name + "")
        $("#" + $("#IdName_View_Img").val() + "").attr('src', '/images/Loder.gif');

        //reduceImageSize(file, desiredWidth, desiredHeight, targetFileSizeKB, function (reducedImageDataUrl) {

        $("#BtnUploadFileArchive").removeClass("display_none");
        $("#fileUploadInputArchive").attr("style", "background: #0ea300;color: aliceblue;font-weight: bold;");


        setTimeout(function () {
            $('#BtnUploadFileArchive').click();
        }, 100);
        //});

    }
    else {
        $("#BtnUploadFileArchive").addClass("display_none");
        $("#fileUploadInputArchive").attr("style", "background: #0051a3;color: aliceblue;font-weight: bold;");

        $("#_ImageUpload").attr('src', '');
    }


}




function uploadFileArchive() {

    debugger

    $("#" + $("#IdName_View_Img").val() + "").val("loading...")

    var fileInput = document.getElementById("fileUploadInputArchive");
    var file = fileInput.files[0];

    if (file != undefined && file != 'undefined') {


        var formData = new FormData();
        formData.append("fileUpload", file);


        //path = 'D:/Ahmed_Work/Kids4/WebUI/Upload_Img/';
        if ($('#Name_Folder').val().trim() == '') {
            path = $('#Path_Save').val();
        }
        else {
            path = $('#Path_Save').val() + '/' + $('#Name_Folder').val().trim() + '/';
        }

        formData.append("Path_Url", path);

        // 🟢 الامتداد الحقيقي
        var extension = file.name.split('.').pop().toLowerCase();

        //formData.append("fileName", $('#fileName').val() + fileInput.accept);
        formData.append("fileName", $('#fileName').val() + '.' + extension);


        $('#Arch_extension').val(extension)
        $('#Arch_IsSuccess').val("0")



        if ($('#Arch_NameFile').val().trim() == '') {
            $('#Arch_NameFile').val(file.name)
        }


        let Arch_IDUserCreate = $('#Arch_IDUserCreate').val()
        let Arch_CompCode = $('#Arch_CompCode').val()
        let Arch_MODULE_CODE = $('#Arch_MODULE_CODE').val()
        let Arch_FinYear = $('#Arch_FinYear').val()
        let Arch_TransID = $('#Arch_TransID').val()
        let Arch_NameFile = $('#Arch_NameFile').val()
        let Arch_Remarks = $('#Arch_Remarks').val() 



        formData.append("Arch_IDUserCreate", Arch_IDUserCreate);
        formData.append("Arch_CompCode", Arch_CompCode);
        formData.append("Arch_MODULE_CODE", Arch_MODULE_CODE);
        formData.append("Arch_TransID", Arch_TransID);
        formData.append("Arch_NameFile", Arch_NameFile);
        formData.append("Arch_Remarks", Arch_Remarks);
        formData.append("Arch_FinYear", Arch_FinYear);



        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/FileUpload/UploadFileArchive"); // Replace with your server endpoint URL
        xhr.onload = function () {
            if (xhr.status === 200) {
                // File uploaded successfully
                console.log("File uploaded!");
                //alert("File uploaded!")
                $('#Btn_fileUpload').click();


                $("#" + $("#IdName_View_Img").val() + "").val("Done")
                $("#" + $("#IdName_View_Img").val() + "").addClass("_backColor")
                $("#" + $("#IdName_View_Img").val() + "").attr('Name_Img', $("#fileName").val());
                $("#" + $("#IdName_View_Img").val() + "").attr('src', $("#UrlImg").val());


                //$("#_ImageUpload").html('<img id="" class="w-100" src="/Upload_Img/' + $('#fileName').val() + fileInput.accept + '" />');
                //$("#_ImageUpload").html('<img id="" class="w-100" src="' + $('#Path_Upload').val()+ $('#fileName').val() + fileInput.accept + '" />');


                $("#fileUploadInputArchive").val("");

                $('#Arch_IsSuccess').click();


            } else {
                // File upload failed

                $("#fileUploadInputArchive").val("");

                console.error("File upload failed!");
                alert("File upload failed!")
            }
        };
        xhr.send(formData);
    }
    else {
        $("#fileUploadInputArchive").val("");
        alert("You Must Select a File")
    }

}

 