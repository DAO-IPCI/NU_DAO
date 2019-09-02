<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Войти</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="form.fields.login"
                :rules="required"
                label="Login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="form.fields.password"
                :rules="required"
                label="Password"
                prepend-icon="mdi-lastpass"
                type="password"
              ></v-text-field>
              <v-alert v-model="error" type="error" class="mb-4">Error</v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="submit">Войти</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      valid: true,
      form: {
        fields: {
          login: "",
          password: ""
        }
      },
      required: [v => !!v || "Field is required"]
    };
  },
  methods: {
    submit() {
      this.error = false;
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("auth/request", {
            login: this.form.fields.login,
            password: this.form.fields.password
          })
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {
            this.error = true;
          });
      }
    }
  }
};
</script>
