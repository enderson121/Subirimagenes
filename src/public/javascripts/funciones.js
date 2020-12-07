$(function () {

    $(document).on("click", ".submitRequestForm", function () {

       alert("Ejecuta");
    });

})



  $(function () {
    var fileCatcher = document.getElementById('file-catcher');
    var fileInput = document.getElementById('file-input');
    var fileListDisplay = document.getElementById('file-list-display');
    var fileList = [];
    var renderFileList, sendFile;
  
    fileCatcher.addEventListener('submit', function (evnt) {
        evnt.preventDefault();
        fileList.forEach(function (file) {
            let msjdisplay = $("#msj").css('display');
            if(msjdisplay == 'block'){
                if(confirm('Recuerda alguna de tus imagenes seleccionadas no se guardaran. \n ¿ Estas seguro/a de continuar ? ')){
                    sendFile(file);
                }else{
                    location.reload(true);
                }
            }else{
                sendFile(file);
            }
        });
    });
  
    fileInput.addEventListener('change', function (evnt) {
        fileList = [];
        
        for (var i = 0; i < fileInput.files.length; i++) {
            const ext = /jpg|jpeg/;
            const mimetype = ext.test(fileInput.files[i].type);
            //validamos que la ext de la imagen cargada si se encuentre dentro de las permitidas
            if(!!mimetype){
                fileList.push(fileInput.files[i]);
            }else{
                let msj = $("#msj");
                msj.css('display','block');
                let txtmsj = $("#txtmsj");
                txtmsj.html(' No se cargaron todas las imagenes escogidas,\n' +
                            ' ya que alguna de las imagenes contaba con ext no permitidas. \n ' +
                            'Recuerda que las imagenes deben ser de tipo jpg o jpeg');
                return false;
            }
        }

        renderFileList();
    });
    //Creamos la lista de las imagenes cargadas
    renderFileList = function () {
        fileListDisplay.innerHTML = '';
        fileList.forEach(function (file, index) {
            var fileDisplayEl = document.createElement('p');
            fileDisplayEl.innerHTML = (index + 1) + ': ' + file.name;
            fileListDisplay.appendChild(fileDisplayEl);
        });
    };
    //Hacemos la ejecucuin por medio de ajax al POST postimgsubida
    sendFile = function (file) {
        var formData = new FormData();
        var request = new XMLHttpRequest();
    
        formData.set('files', file);
        request.open("POST", '/postimgsubida');
        request.onreadystatechange = function (aEvt) {
            if (request.readyState == 4) {
               if(request.status == 200){
                    let msjfile = $("#msjfile");
                    msjfile.css('display','block');
                    let txtmsjfile = $("#txtmsjfile");
                    txtmsjfile.html(request.responseText);
                    setTimeout(() => {
                        location.reload(true);
                    }, 2000);
                    console.log(request.responseText);
               }
               else{
                    let msj = $("#msj");
                    msj.css('display','block');
                    let txtmsj = $("#txtmsj");
                    txtmsj.html('hemos tenido problemas con la cargada de imagenes, intentelo de nuevo por favor.');
                    console.log("Error loading page\n");
               }
            }
          };
        request.send(formData);
    };
});