<template>
  <div class="container" style="margin-top: 10px">
    <div class="columns">
      <div class="column">
        <ul>
          <li>The Timer: 180 seconds</li>
        </ul>
      </div>
      <div class="column">
        <h3 class="subtitle">{{ user.email }}</h3>
        <b-button type="is-danger is-light" @click="logout">Logout</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";
import router from "../router";
export default {
  name: "HomeView",
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      const token = Cookies.get("jwt");
      axios
        .get("/protected", {
          headers: { Authorization: "Bearer " + token },
          withCredentials: true,
        })
        .then((res) => {
          this.user = res.data.user;
          console.log(res);
        })
        .catch((e) => {
          // console.log(e)
          if (e.response.status == 403) {
            router.push("/login");
            this.$buefy.toast.open({
              message: "Logout Successfully",
              type: "is-success",
            });
          }
        });
    },
    async logout() {
      // Cookies.remove('jwt');
      await axios.post("/auth/logout", { withCredentials: true }).then((r) => {
        console.log(r)
        router.push("/login");
        this.$buefy.toast.open({
          message: "Logout Successfully",
          type: "is-success",
        });
      });
    },
  },
};
</script>
