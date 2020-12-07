const fs = require('fs');
const sharp = require('sharp');
const PDF = require('pdfkit');

const Proceso = async (file,dir,res)=>{
    const namefile = 'Proteccion'+''+ new Date().toISOString() +''+ file.originalname.replace(/ /g, "");
    const namesincaracteres = namefile.replace(/ |:|-|_/g, "");
    try{
        fs.access(dir, (err)=>{
            if(err){
               fs.mkdirSync(dir);
            }
        });
        const metadata = await sharp(file.buffer).metadata();
        const namepdf = namesincaracteres.replace(/.jpg|jpeg/gi,'');
        //Serie de condiciones para definir si la imagen se debe recortar o se debe de dejar tal cual
        //o si en su defecto el PDF a crear de hoja A4 debe ser de que tamaño
        if((metadata.width > 794 && metadata.height < 1020) && (metadata.width > metadata.height)){
            //se dice que el PDf que se va a crear va a ser definido como horizontal por el tamaño de la imagen original
            let doc = new PDF({
                layout : "landscape"
                });
            
            await sharp(file.buffer)
            .resize({width:794,height :1123,fit:'inside'}) //se da el tamaño definido por entidad
            .toFile(dir+'/'+namesincaracteres);
            doc.pipe(fs.createWriteStream(__dirname + '/../public/pdf/' + namepdf + '.pdf'));
            doc.image(dir+'/'+namesincaracteres,0, 0,{fit: [794, 794]});
            doc.end();
        }else if((metadata.width > 794 && metadata.height < 1020) && (metadata.width < metadata.height)){
            let doc = new PDF();
            await sharp(file.buffer)
            .resize({width:794,height :1123,fit:'inside'})//se da el tamaño definido por entidad
            .toFile(dir+'/'+namesincaracteres);
            doc.pipe(fs.createWriteStream(__dirname + '/../public/pdf/' + namepdf + '.pdf'));
            doc.image(dir+'/'+namesincaracteres,0, 0,{fit: [620, 620]});
            doc.end();
        }else if((metadata.width > 794 && metadata.width < 1020 && metadata.height > 1400) && (metadata.width < metadata.height)){
            let doc = new PDF();
            await sharp(file.buffer)
            .resize({width:794,height :1123,fit:'inside'})//se da el tamaño definido por entidad
            .toFile(dir+'/'+namesincaracteres);
            doc.pipe(fs.createWriteStream(__dirname + '/../public/pdf/' + namepdf + '.pdf'));
            doc.image(dir+'/'+namesincaracteres,0, 0,{fit: [794, 794]});
            doc.end();
        }else if((metadata.width > 1400 && metadata.height < 1400)){
            let doc = new PDF({
                layout : "landscape"
                });
            await sharp(file.buffer)
            .resize({width:794,height :1123,fit:'inside'})//se da el tamaño definido por entidad
            .toFile(dir+'/'+namesincaracteres);
            doc.pipe(fs.createWriteStream(__dirname + '/../public/pdf/' + namepdf + '.pdf'));
            doc.image(dir+'/'+namesincaracteres,0, 0,{fit: [794, 794]});
            doc.end();
        }else if((metadata.width >490) && (metadata.width < metadata.height)){
            let doc = new PDF();

            //Para este caso por las medidas de la imagen, la imagen no se debe de ajustar si no que se define cual va hacer el tamaño a mostrar en el PDF
            await sharp(file.buffer)
            .toFile(dir+'/'+namesincaracteres);
            
            doc.pipe(fs.createWriteStream(__dirname + '/../public/pdf/' + namepdf + '.pdf'));
            doc.image(dir+'/'+namesincaracteres,0, 0,{fit: [794, 794]});
            doc.end();
        }else if((metadata.width >1400) && (metadata.height>1400) && (metadata.width > metadata.height)){
            let doc = new PDF({
                layout : "landscape"
                });

            //Para este caso por las medidas de la imagen, la imagen no se debe de ajustar si no que se define cual va hacer el tamaño a mostrar en el PDF
            await sharp(file.buffer)
            .resize({width:794,height :1123,fit:'inside'})//se da el tamaño definido por entidad
            .toFile(dir+'/'+namesincaracteres);
            
            doc.pipe(fs.createWriteStream(__dirname + '/../public/pdf/' + namepdf + '.pdf'));
            doc.image(dir+'/'+namesincaracteres,0, 0,{fit: [794, 794]});
            doc.end();
        }else if((metadata.width >1400) && (metadata.height>1400) && (metadata.width < metadata.height)){
            let doc = new PDF();

            //Para este caso por las medidas de la imagen, la imagen no se debe de ajustar si no que se define cual va hacer el tamaño a mostrar en el PDF
            await sharp(file.buffer)
            .resize({width:794,height :1123,fit:'inside'})//se da el tamaño definido por entidad
            .toFile(dir+'/'+namesincaracteres);
            
            doc.pipe(fs.createWriteStream(__dirname + '/../public/pdf/' + namepdf + '.pdf'));
            doc.image(dir+'/'+namesincaracteres,0, 0,{fit: [794, 794]});
            doc.end();
        }else{
            let doc = new PDF();
            await sharp(file.buffer)
            .toFile(dir+'/'+namesincaracteres);

            doc.pipe(fs.createWriteStream(__dirname + '/../public/pdf/' + namepdf + '.pdf'));
            doc.image(dir+'/'+namesincaracteres,0, 0);
            doc.end();
        }    
        
    }catch(error){
        console.log(error);
        res.json('Error en la subida de adjuntos');
        return false;
    }
   
    
}
module.exports = Proceso;