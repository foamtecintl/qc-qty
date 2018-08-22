<template>
  <div class="container">
    <br>
    <div class="row">
      <div class="col-sm-12" align="center">
        <img src="~@/assets/images/lock.jpg" class="img-responsive" alt="Responsive image">
        <h3><label>please contact Team Leader Unlock</label></h3>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-primary">
          <div class="panel-heading" align="center">
            <h3 class="panel-title">Lock Detail</h3>
          </div>
          <div class="panel-body" align="center">
            <h4>{{ lockDetail }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-primary">
          <div class="panel-body" align="center">
            <h3>Password unlock</h3>
            <input type="password" ref='passwordUnlock' class="form-control input-lg" v-model="password" v-on:keyup="unlock" autofocus="autofocus">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'lock-program',
  data () {
    return {
      lockDetail: '',
      password: '',
      user: ''
    }
  },
  mounted () {
    this.$refs.passwordUnlock.focus()
    this.checkStatus()
  },
  methods: {
    checkStatus () {
      axios.post(`http://localhost:8090/check`)
        .then(res => {
          this.lockDetail = res.data.detail
        })
        .catch(err => {
          alert(err)
        })
    },
    unlock (event) {
      if (event.keyCode === 13) {
        axios.post(`http://localhost:8090/unlock`, JSON.stringify({ password: this.password }))
          .then(res => {
            if (res.data.status === 'success') {
              this.user = res.data.name
              this.update()
            } else {
              this.password = ''
              alert('Invalid password')
            }
          })
          .catch(err => {
            alert(err)
          })
      }
    },
    update () {
      let dataSave = {
        partMaster: 'NON',
        qtyMaster: '0',
        status: 'UNLOCK',
        detail: 'User unlock',
        unlockBy: this.user
      }
      axios.post(`http://localhost:8090/save`, JSON.stringify(dataSave))
        .then(res => {
          this.$router.push({ name: 'master-barcode' })
        })
        .catch(err => {
          alert(err)
        })
    }
  }
}
</script>

