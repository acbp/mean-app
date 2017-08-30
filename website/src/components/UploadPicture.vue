<template>
  <div class="input-group">
      <input type="file" id="productFileUpload" accept=".png, .jpeg, .gif, .bmp, .tif, .tiff|images/*" name="foto" alt="foto">
      <span class="input-group-btn">
        <button class="btn btn-secondary" type="button" @click="upload()">Enviar</button>
      </span>
    </div>
</template>
<script>
  import axios from 'axios'

  const uploadImage = (data) => {
    axios.post('http://localhost:1337/api/products/picture/59a6cdca2319e027435743cb', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.info('SUCCESS',res);
      //emit
    }).catch((err) => {
      console.error(err);
    })
  }

  export default {
    methods:{
      upload:() => {

        let imagefile = document.querySelector('#file')

        if (imagefile&&imagefile.files&&imagefile.files.length) {
          let formData
          for (let i = 0; i < imagefile.files.length; i++) {
            formData = new FormData()
            formData.append("image", imagefile.files[i])
            uploadImage(formData)
          }
        }
      }
    }
  }
</script>
