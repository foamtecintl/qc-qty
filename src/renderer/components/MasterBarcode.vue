<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12" align="center">
        <h1>Master Barcode</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <form onsubmit="return false;">
          <div class="form-group">
            <input type="text" ref="barcodeMaster" class="form-control input-lg" v-model="barcodeMaster" v-on:keyup="validateOnEnterKey" autofocus="autofocus">
          </div>
        </form>
      </div>
    </div>
    <br><br>
    <div class="row">
      <div class="col-sm-12" align="center">
        <img id="logo" src="~@/assets/images/foamtec.jpg" alt="foamtec-logo">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'master-barcode',
  data () {
    return {
      barcodeMaster: '',
      partMaster: '',
      batchMasterNo: '',
      masterQty: 0
    }
  },
  mounted () {
    this.checkStatus()
    this.$refs.barcodeMaster.focus()
  },
  methods: {
    validateOnEnterKey (event) {
      if (event.keyCode === 13) {
        if (this.barcodeMaster.length > 44) {
          this.partMaster = this.barcodeMaster.substring(0, 15)
          this.batchMasterNo = this.barcodeMaster.substring(15, 25)
          this.masterQty = parseInt(this.barcodeMaster.substring(35, this.barcodeMaster.length))
          this.$router.push({
            name: 'compare-barcode',
            params: {
              partMaster: this.partMaster,
              batchMasterNo: this.batchMasterNo,
              masterQty: this.masterQty
            }
          })
        } else {
          if (this.barcodeMaster === '1234567890') {
            this.$router.push({ name: 'log-data' })
          } else {
            alert('Barcode wong')
          }
        }
      }
    },
    checkStatus () {
      axios.post(`http://localhost:8090/check`)
        .then(res => {
          if (res.data.status === 'FAIL') {
            this.$router.push({ name: 'lock-program' })
          }
        })
        .catch(err => {
          alert(err)
        })
    }
  }
}
</script>

<style>
</style>
