<template>
  <div class="container" style="margin-top:10px;">
    <div class="columns">
      <div class="column">
        AAA
      </div>
      <div class="column">
        {{ user }}
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import axios from 'axios';
import router from '../router'
export default {
  name: 'HomeView',
  data(){
    return {
      user: {},
    }
  },
  created(){
    console.log(this.fetchUser());
  },
  methods: {
    fetchUser(){
    const token = Cookies.get('jwt');
      axios.get('/protected', { headers: { Authorization: 'Bearer ' + token }, withCredentials: true }).then(res => {
        this.user = res.data.user
        console.log(res)
      }).catch(e => {
        // console.log(e)
        if (e.response.status == 403) {
          router.push('/login');
          axios.post('/auth/logout');
        }
      })
    }
  }
}
</script>
