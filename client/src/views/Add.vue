<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Новые данные</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="monthForm" :rules="required" label="Date" type="text"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <div v-for="(row, i) in rows" :key="i">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="row.member"
                        :rules="required"
                        label="Member"
                        :disabled="row.disabled"
                        type="text"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field v-model="row.consumption" label="Consumption" type="text"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-divider />
              </div>
            </v-form>
            <v-alert v-model="success" type="success" class="mb-4">Data saved.</v-alert>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <!-- <v-btn color="success" :disabled="request" @click="add">Добавить</v-btn> -->
            <v-btn color="primary" :disabled="request" @click="submit">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      monthForm: "",
      success: false,
      request: false,
      valid: true,
      rows: [
        {
          disabled: false,
          member: "",
          consumption: ""
        }
      ],
      required: [v => !!v || "Field is required"]
    };
  },
  computed: {
    ...mapGetters("auth", ["profile"]),
    ...mapState("data", ["members", "month"])
  },
  watch: {
    members: function() {
      this.init();
    }
  },
  mounted() {
    this.monthForm = this.month;
    this.init();
  },
  methods: {
    init() {
      this.rows = [];
      this.members.forEach(member => {
        this.rows.push({
          disabled: true,
          member: member.name,
          consumption: ""
        });
      });
    },
    add() {
      this.rows.push({
        disabled: false,
        member: "",
        consumption: ""
      });
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.request = true;
        const records = [];
        this.rows.forEach(item => {
          if (item.consumption !== "") {
            const member = this.members.find(member => {
              return member.name === item.member;
            });
            records.push({
              member_id: member.id,
              member_name: item.member,
              consumption: item.consumption
            });
          }
        });
        this.$store
          .dispatch("data/save", {
            author: this.profile.name,
            month: this.monthForm,
            records: records
          })
          .then(() => {
            this.success = true;
          });
      }
    }
  }
};
</script>
