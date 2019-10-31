var cloudinary = require('cloudinary').v2;
import fs from 'fs';  
import moment from 'moment';
import { cloudinaryCreds } from '../core/config/image.config';

cloudinary.config({ 
    cloud_name: cloudinaryCreds.cloudName, 
    api_key: cloudinaryCreds.apiKey, 
    api_secret: cloudinaryCreds.apiSecret 
  });
export const uploadImage =async (req) =>{
    let basePath = req.projectBaseUrl;
    let img = req.body.imageData;
    let data = img.replace(/^data:image\/\w+;base64,/, "");
    // console.log('image path ',basePath+"/images/"+req.body.name+moment().unix()+".jpg");
    var buf = new Buffer.from(data, 'base64');
    let imageUrl = basePath+"/images/"+req.body.name+moment().unix()+".png";
    fs.writeFileSync(basePath+"/images/"+req.body.name+moment().unix()+".png", buf);
    try{
        let result = await cloudinary.uploader.upload(imageUrl)
        // console.log('-cloudary success', result)
        return result;
    }catch(error){
        console.log('-cloudary error', error)
        return error;
    }
    
    // function (error, result) {
    //     console.log(result, error)
    // });
}