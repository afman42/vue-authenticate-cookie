<template>
  <div>
    <div class="container" style="margin-top: 20px">
      <div class="columns" v-if="!isLoading">
        <div class="column"></div>
        <div class="column is-half">
          <h1 class="title">Login</h1>
          <form @submit.prevent="submitHandler">
            <b-field
              label="Email"
              label-position="on-border"
              :type="error.typeField.email"
              :message="error.message.email"
            >
              <b-input type="email" v-model="form.email" maxlength="30">
              </b-input>
            </b-field>
            <b-field
              label="Password"
              label-position="on-border"
              :type="error.typeField.password"
              :message="error.message.password"
            >
              <b-input type="password" v-model="form.password" maxlength="8">
              </b-input>
            </b-field>
            <b-button
              type="is-primary is-light"
              style="margin-right: 10px"
              native-type="submit"
              >Login</b-button
            >
            <b-button type="is-danger is-light" tag="router-link" to="/register"
              >Register</b-button
            >
          </form>
        </div>
        <div class="column"></div>
      </div>
      <b-loading
        v-else
        :is-full-page="isFullPage"
        v-model="isLoading"
        :can-cancel="true"
      ></b-loading>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  name: "LoginView",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isLoading: false,
      isFullPage: true,
      error: {
        typeField: {
          email: "is-success",
          password: "is-success",
        },
        message: {
          email: "",
          password: "",
        },
      },
    };
  },
  methods: {
    submitHandler() {
      this.isLoading = true;
      axios
        .post("/auth/login", this.form,{
          withCredentials: true
        })
        .then((re) => {
          this.isLoading = false;
          if (re.status == 200) {
            router.push("/");
            this.$buefy.toast.open({
              message: re.data.message,
              type: "is-success",
            });
            this.form = {
              email: "",
              password: "",
            };
          }
        })
        .catch((er) => {
          this.isLoading = false;
          if (er.response.status == 500 || er.response.status == 400) {
            this.$buefy.toast.open({
              message: er.response.data.message,
              type: "is-danger",
            });
          }
          this.error = {
            typeField: {
              email: er.response.data.email == undefined ? "" : "is-danger",
              password:
                er.response.data.password == undefined ? "" : "is-danger",
            },
            message: {
              email:
                er.response.data.email == undefined
                  ? ""
                  : er.response.data.email,
              password:
                er.response.data.password == undefined
                  ? ""
                  : er.response.data.password,
            },
          };
        });
    },
  },
};
</script>