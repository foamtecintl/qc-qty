<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12" align="center">
        <h1>Compare Barcode</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-7">
          <div class="panel panel-primary">
            <div class="panel-heading" align="center">
              <h3 class="panel-title">Part Number Master</h3>
            </div>
            <div class="panel-body" align="center">
              <h3>{{ partMaster }}</h3>
            </div>
          </div>
      </div>
      <div class="col-sm-5">
        <div class="panel panel-info">
          <div class="panel-heading" align="center">
            <h3 class="panel-title">QTY Master</h3>
          </div>
          <div class="panel-body" align="center">
            <h3>{{ masterQty }}</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <form onsubmit="return false;">
            <div class="form-group">
              <input type="text" ref='barcodeCompare' class="form-control input-lg" v-model="barcodeCompare" v-on:keyup="compareOnEnterKey" autofocus="autofocus">
            </div>
          </form>
        </div>
      </div>
      <div class="row" v-if="dataShow">
        <div class="col-sm-7">
          <div class="row">
            <div class="col-sm-12">
              <div class="panel panel-info">
                <div class="panel-body">
                  <h4>Part No : <label>{{ partCompare }}</label></h4>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="panel panel-info">
                <div class="panel-body">
                  <h4>QTY. : <label>{{ compareQty }}</label></h4>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="panel panel-danger">
                <div class="panel-body" :style="{'background-color': bgColor}">
                  <h4>Total qty balance : <label>{{ totalBalance }}</label></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-5">
          <div class="row">
            <div class="col-sm-12" align="center">
              <img src="~@/assets/images/pass.png" alt="images" height="260" width="260" v-if="showImages">
              <img src="~@/assets/images/fail.png" alt="images" height="260" width="260" v-if="!showImages">
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12" align="center">
          <form onsubmit="return false;">
            <button class="btn btn-primary btn-lg" v-on:click="insertDataToDB">Insert DB</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'compare-barcode',
  data () {
    return {
      partMaster: '',
      bachNumberMaster: '',
      masterQty: 0,
      barcodeCompare: '',
      partCompare: '',
      compareQty: 0,
      totalBalance: 0,
      dataShow: false,
      bgColor: '#f1c40f',
      showImages: false,
      mp3Pass: new Audio(require('../assets/mp3/pass.mp3')),
      mp3Fail: new Audio(require('../assets/mp3/fail.mp3'))
    }
  },
  mounted () {
    this.partMaster = this.$route.params.partMaster
    this.bachNumberMaster = this.$route.params.batchMasterNo
    this.masterQty = this.$route.params.masterQty
    this.totalBalance = this.masterQty
    this.$refs.barcodeCompare.focus()
  },
  methods: {
    compareOnEnterKey (event) {
      if (event.keyCode === 13) {
        if (this.barcodeCompare.length > 44) {
          this.partCompare = this.barcodeCompare.substring(0, 15)
          this.compareQty = parseInt(this.barcodeCompare.substring(35, this.barcodeCompare.length))
          this.comparePart()
          this.dataShow = true
          this.barcodeCompare = ''
        }
      }
    },
    setBackgroundColor (balance) {
      if (balance > 0) {
        this.mp3Pass.play()
      }
      if (balance === 0) {
        this.mp3Pass.play()
        this.bgColor = '#2ecc71'
      }
      if (balance < 0) {
        this.bgColor = '#c0392b'
        this.mp3Fail.play()
      }
    },
    comparePart () {
      if (this.partMaster === this.partCompare) {
        this.totalBalance -= this.compareQty
        this.setBackgroundColor(this.totalBalance)
        this.showImages = true
      } else {
        this.showImages = false
        this.mp3Fail.play()
      }
    },
    insertDataToDB () {
      console.log('test')
    }
  }
}
</script>

<style>
</style>
