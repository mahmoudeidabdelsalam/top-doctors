<template>
  <section class="datatable-page">
    <v-container fluid>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          outlined
        ></v-text-field>
      </v-card-title>
      <v-data-table
        height="auto"
        :headers="headers"
        :items="patients"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!patients.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Patients</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <div class="col d-lg-flex justify-content-lg-end">
              <Notification></Notification>
            </div>
            <!-- New item dialog -->
            <v-dialog v-model="newDialog" persistent max-width="700px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  New Patient
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Patient</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="patientData.enName"
                          :rules="[rules.required, rules.counter]"
                          label="En Name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="patientData.arName"
                          :rules="[rules.required, rules.counter]"
                          label="Ar Name"
                          dir="rtl"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          type="email"
                          v-model="patientData.email"
                          :rules="[rules.required, rules.email]"
                          label="Emali"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="patientData.personalPhone"
                          label="Phone Number"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-select
                          :items="genders"
                          v-model="patientData.gender"
                          label="gender"
                        ></v-select>
                      </v-col>
                      <v-row>
                        <v-col cols="12" md="6">
                          <UploadImages
                            @changed="handleImages"
                            :max="1"
                            uploadMsg="Patient Photo"
                            maxError="Max files exceed"
                            fileError="images files only accepted"
                            clearAll="Remove all"
                          />
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="newDialog = false">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="addPatient">
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Image -->
        <template v-slot:[`item.profile`]="{ item }">
          <router-link :to="{ name: 'DoctorProfile' }">
            <img
              :src="item.profile"
              style="width: 40px; height: 40px; object-fit: cover"
              class="rounded-circle"
            />
          </router-link>
        </template>

        <!-- Name -->
        <template v-slot:[`item.full_name`]="{ item }">
          <router-link class="item-name" :to="{ name: 'DoctorProfile' }">
            <span>{{ item.full_name }}</span>
          </router-link>
        </template>
      </v-data-table>
    </v-container>
  </section>
</template>

<script>
// import upload images component
import UploadImages from "vue-upload-drop-images";
// import mixins
import crudActionsMixins from "@/mixins/crud-actions-mixins";
//import Notification
import Notification from "./Notifications.vue";

export default {
  name: "Patients",
  components: {
    UploadImages,
    Notification,
  },
  data() {
    return {
      // All patients
      patients: [],
      // search
      search: "",
      // single select
      singleSelect: false,
      // selected patient
      selected: [],
      // table headers
      headers: [
        { text: "Patient", sortable: false, value: "profile" },
        { text: "Name", align: "start", value: "full_name" },
        { text: "Email", value: "email" },
        { text: "Telephone", value: "phone_number" },
        { text: "Balance", sortable: false, value: "balance" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // patient data
      patientData: {
        department: "",
        enName: "",
        arName: "",
        enTitle: "",
        arTitle: "",
        gender: "",
        email: "",
        workPhone: "",
        personalPhone: "",
        sessionPrice: "",
        photo: null,
      },
      // departments
      departments: "",
      // genders
      genders: "",
      // validation rules
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length >= 4 || "Min 4 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  mounted() {
    // Get all patients
    this.getItems(
      `${localStorage.companyApiUrl}/dashboard/patients`,
      this.patients
    );

    // Get all departments
    this.axios
      .get(`${localStorage.companyApiUrl}/dashboard/departments`, {
        headers: { Authorization: `Bearer ${localStorage.userToken}` },
      })
      .then((response) => {
        this.departments = response.data.data.map((department) => {
          return {
            text: department.name,
            value: department.id,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // mapping genders
    this.genders = [
      {
        id: 0,
        name: "Female",
      },
      {
        id: 1,
        name: "Male",
      },
    ].map((gender) => {
      return {
        text: gender.name,
        value: gender.id,
      };
    });
  },
  mixins: [crudActionsMixins],
  methods: {
    // Handle item image
    handleImages(files) {
      console.log(files);
      files.forEach((element) => {
        this.patientData.photo = element;
      });
    },

    // Add item
    addPatient() {
      let data = new FormData();
      data.append("full_name[en]", this.patientData.enName);
      data.append("full_name[ar]", this.patientData.arName);
      data.append("gender", this.patientData.gender);
      data.append("email", this.patientData.email);
      data.append("work_phone", this.patientData.workPhone);
      data.append("phone_number", this.patientData.personalPhone);
      data.append("title[en]", this.patientData.enTitle);
      data.append("title[ar]", this.patientData.arTitle);
      data.append("department_id", this.patientData.department);
      data.append("session_price", this.patientData.sessionPrice);
      data.append("image", this.patientData.photo);

      this.addItem(
        `${localStorage.companyApiUrl}/dashboard/patients`,
        data,
        this.patients,
        this.patientData
      );
    },

    // Bind item data
    bindpatientData(item) {
      // Get single patients by id
      this.axios
        .get(`${localStorage.companyApiUrl}/dashboard/patients/${item.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.userToken}`,
            lang: this.$i18n.locale === "en" ? "ar" : "en",
          },
        })
        .then((response) => {
          this.patientData.sessionPrice = item.session_price;
          this.patientData.personalPhone = item.phone_number;
          this.patientData.workPhone = item.personal_phone;
          this.patientData.department = item.department_id;
          this.patientData.gender = JSON.parse(item.gender);

          if (this.$i18n.locale == "en") {
            this.patientData.enName = item.full_name;
            this.patientData.arName = response.data.data.full_name;
            this.patientData.enTitle = item.title;
            this.patientData.arTitle = response.data.data.title;
          } else {
            this.patientData.arName = item.full_name;
            this.patientData.enName = response.data.data.full_name;
            this.patientData.arTitle = item.title;
            this.patientData.enTitle = response.data.data.title;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Update item
    updatePatient(item) {
      Patient;
      let data = new URLSearchParams();
      data.append("full_name[en]", this.patientData.enName);
      data.append("full_name[ar]", this.patientData.arName);
      data.append("gender", this.patientData.gender);
      data.append("email", this.patientData.email);
      data.append("work_phone", this.patientData.workPhone);
      data.append("phone_number", this.patientData.personalPhone);
      data.append("title[en]", this.patientData.enTitle);
      data.append("title[ar]", this.patientData.arTitle);
      data.append("department_id", this.patientData.department);
      data.append("session_price", this.patientData.sessionPrice);
      data.append("image", this.patientData.photo);

      this.axios
        .put(
          `${localStorage.companyApiUrl}/dashboard/patients/${item.id}`,
          data,
          {
            "Content-Type": "application/x-www-form-urlencoded",
            headers: { Authorization: `Bearer ${localStorage.userToken}` },
          }
        )
        .then((response) => {
          // close dialog
          this.editDialog = false;
          // empty department data
          this.patientData = {};
          // success message
          this.$toast.success(response.data.message);
          // update item in array
          this.patients.splice(
            this.patients.indexOf(item),
            1,
            response.data.data
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Delete item
    deletePatient(item) {
      this.deleteItem(
        `${localStorage.companyApiUrl}/dashboard/patients/${item.id}`,
        item,
        this.patients
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>
