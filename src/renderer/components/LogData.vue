<template>
  <div class="container">
    <br><br>
    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-primary">
          <div class="panel-heading" align="center">
            <h3 class="panel-title">Histrory</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-sm-12">
                <input type="text" class="form-control" placeholder="search part" v-model="partNumber">
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-sm-12">
                <table class="table table-hover table-bordered table-condensed">
                  <thead>
                    <tr class="info">
                      <th>ID</th>
                      <th>Date</th>
                      <th>Part Number</th>
                      <th>Qty</th>
                      <th>Status</th>
                      <th>Detail</th>
                      <th>Unlock By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in filteredPart" v-bind:key="index">
                      <th>{{ index + 1 }}</th>
                      <th>{{ item.CreateDate }}</th>
                      <th>{{ item.PartMaster }}</th>
                      <th>{{ item.QtyMaster }}</th>
                      <th>{{ item.Status }}</th>
                      <th>{{ item.Detail }}</th>
                      <th>{{ item.UnlockBy }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
        <div class="col-sm-12" align="center">
          <form onsubmit="return false;">
            <button class="btn btn-warning btn-lg" v-on:click="goBack">GO BACK</button>
          </form>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'log-data',
  data () {
    return {
      partNumber: '',
      dataTable: []
    }
  },
  mounted () {
    axios.post(`http://localhost:8090/logdata`)
      .then(res => {
        this.dataTable = res.data.dataList
      })
      .catch(err => {
        alert(err)
      })
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'master-barcode' })
    }
  },
  computed: {
    filteredPart () {
      return this.dataTable.filter(item => {
        return item.PartMaster.indexOf(this.partNumber) > -1
      })
    }
  }
}
</script>

