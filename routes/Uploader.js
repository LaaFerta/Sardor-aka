

const cloudinary = require('cloudinary').v2

cloudinary.config({
   cloud_name: 'dkndvpxs7',
   api_key: '949456589117577',
   api_secret: 'cFaLuNrn3Luo3E1_C2e2pd5F96U'
})

const options = {
   overwrite: true,
   invlaiddata: true,
   recource_type: 'auto',
}

const uploadPhoto = (photo, folder) => {
   return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(photo, {...options, folder: folder}, (error, result) => {
         if(result && result.secure_url) {
            return resolve(result.secure_url)
         }
         console.log(error.message);
         return reject({error: error.message})
      })
   })
}


module.exports = uploadPhoto