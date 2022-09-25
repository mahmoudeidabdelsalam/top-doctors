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
        :items="doctors"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!doctors.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Doctors</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <!-- New item dialog -->
            <v-dialog
              v-model="newDialog"
              persistent
              max-width="700px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  New Doctor
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Doctor</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-select
                          :items="departments"
                          v-model="doctorData.department"
                          label="Department"
                        ></v-select>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-select
                          :items="genders"
                          v-model="doctorData.gender"
                          label="gender"
                        ></v-select>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="doctorData.enName"
                          :rules="[rules.required, rules.counter]"
                          label="En Name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="doctorData.arName"
                          :rules="[rules.required, rules.counter]"
                          label="Ar Name"
                          dir="rtl"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="doctorData.enTitle"
                          :rules="[rules.required, rules.counter]"
                          label="En Title"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="doctorData.arTitle"
                          :rules="[rules.required, rules.counter]"
                          label="Ar Title"
                          dir="rtl"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          type="email"
                          v-model="doctorData.email"
                          :rules="[rules.required, rules.email]"
                          label="Emali"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          type="number"
                          v-model="doctorData.sessionPrice"
                          label="Session Price"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="doctorData.personalPhone"
                          label="Personal phone"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="doctorData.workPhone"
                          label="Work phone"
                          required
                        ></v-text-field>
                      </v-col>
                      
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <UploadImages @changed="handleImages" :max="1" uploadMsg="Doctor photo" maxError="Max files exceed" fileError="images files only accepted" clearAll="Remove all" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="newDialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="addDoctor"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Image and info -->
        <template v-slot:[`item.doctor`]="{ item }">
          <router-link :to="{ name: 'DoctorProfile', params: { profileId: item.id } }" class="compo link">
            <img :src="item.profile" />
            <div class="text">
              <span class="name d-block">{{ item.full_name }}</span>
            </div>
          </router-link>
        </template>

        <!-- Acions -->
        <template v-slot:[`item.actions`]="{ item }">
          <!-- Edit item dialog -->
          <v-dialog
            v-model="editDialog[item.id]"
            persistent
            max-width="700px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ma-2"
                outlined
                x-small
                fab
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="bindDoctorData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Doctor</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-select
                        :items="departments"
                        v-model="doctorData.department"
                        label="Department"
                      ></v-select>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-select
                        :items="genders"
                        v-model="doctorData.gender"
                        label="gender"
                      ></v-select>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="doctorData.enName"
                        :rules="[rules.required, rules.counter]"
                        label="En Name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="doctorData.arName"
                        :rules="[rules.required, rules.counter]"
                        label="Ar Name"
                        dir="rtl"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="doctorData.enTitle"
                        :rules="[rules.required, rules.counter]"
                        label="En Title"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="doctorData.arTitle"
                        :rules="[rules.required, rules.counter]"
                        label="Ar Title"
                        dir="rtl"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        type="email"
                        v-model="doctorData.email"
                        :rules="[rules.required, rules.email]"
                        label="Emali"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        type="number"
                        v-model="doctorData.sessionPrice"
                        label="Session Price"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="doctorData.personalPhone"
                        label="Personal phone"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="doctorData.workPhone"
                        label="Work phone"
                        required
                      ></v-text-field>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <UploadImages @changed="handleImages" :max="1" uploadMsg="Doctor photo" maxError="Max files exceed" fileError="images files only accepted" clearAll="Remove all" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="editDialog[item.id] = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="updateDoctor(item)"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Delete item dialog -->
          <v-dialog
            v-model="deleteDialog[item.id]"
            persistent
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ma-2"
                outlined
                x-small
                fab
                color="red"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Delete Doctor</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this doctor?
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteDialog[item.id] = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="red darken-1"
                  text
                  @click="deleteDoctor(item)"
                >
                  Yes, Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-container>
  </section>
</template>

<script>
// import upload images component
import UploadImages from "vue-upload-drop-images";
// import mixins
import crudActionsMixins from '@/mixins/crud-actions-mixins'

export default {
  name: "Doctors",
  components: {
    UploadImages
  },
  data() {
    return {
      // All doctors
      doctors: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected doctor
      selected: [],
      // table headers
      headers: [
        { text: "Doctor", sortable: false, value: "doctor" },
        { text: "Email", value: "email" },
        { text: "Telephone", value: "work_phone" },
        { text: "Session price", value: "session_price" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // doctor data
      doctorData: {
        department: '',
        enName: '',
        arName: '',
        enTitle: '',
        arTitle: '',
        gender: '',
        email: '',
        workPhone: '',
        personalPhone: '',
        sessionPrice: '',
        photo: null,
      },
      // departments
      departments: '',
      // genders
      genders: '',
      // validation rules
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length >= 4 || 'Min 4 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  mounted() {
    // Get all doctors
    this.getItems(`${localStorage.companyApiUrl}/dashboard/doctors`, this.doctors);

    // Get all departments
    this.axios
    .get(`${localStorage.companyApiUrl}/dashboard/departments`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
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
        name: "Female"
      },
      {
        id: 1,
        name: "Male"
      }
    ].map((gender) => {
      return {
        text: gender.name,
        value: gender.id
      }
    });
  },
  mixins: [crudActionsMixins],
  methods: {
    // Handle item image
    handleImages(files){
      
      console.log(files);
      files.forEach(element => {
        this.doctorData.photo = element;
      });
    },

    // Add item
      addDoctor() {

        let data = new FormData();
        data.append("full_name[en]", this.doctorData.enName);
        data.append("full_name[ar]", this.doctorData.arName);
        data.append("gender", this.doctorData.gender);
        data.append("email", this.doctorData.email);
        data.append("work_phone", this.doctorData.workPhone);
        data.append("personal_phone", this.doctorData.personalPhone);
        data.append("title[en]", this.doctorData.enTitle);
        data.append("title[ar]", this.doctorData.arTitle);
        data.append("department_id", this.doctorData.department);
        data.append("session_price", this.doctorData.sessionPrice);
        data.append("image", this.doctorData.photo);

        this.addItem(`${localStorage.companyApiUrl}/dashboard/doctors`, data, this.doctors, this.doctorData);
    },
    
    // Bind item data
    bindDoctorData(item) {
      // Get single doctors by id
      this.axios
      .get(`${localStorage.companyApiUrl}/dashboard/doctors/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.doctorData.sessionPrice = item.session_price;
        this.doctorData.personalPhone = item.personal_phone;
        this.doctorData.workPhone = item.personal_phone;
        this.doctorData.department = item.department_id;
        this.doctorData.gender = JSON.parse(item.gender);

        if (this.$i18n.locale == "en") {
          this.doctorData.enName = item.full_name;
          this.doctorData.arName = response.data.data.full_name;
          this.doctorData.enTitle = item.title;
          this.doctorData.arTitle = response.data.data.title;
        } else {
          this.doctorData.arName = item.full_name;
          this.doctorData.enName = response.data.data.full_name;
          this.doctorData.arTitle = item.title;
          this.doctorData.enTitle = response.data.data.title;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateDoctor(item) {

        let data = new URLSearchParams();
        data.append("full_name[en]", this.doctorData.enName);
        data.append("full_name[ar]", this.doctorData.arName);
        data.append("gender", this.doctorData.gender);
        data.append("email", this.doctorData.email);
        data.append("work_phone", this.doctorData.workPhone);
        data.append("personal_phone", this.doctorData.personalPhone);
        data.append("title[en]", this.doctorData.enTitle);
        data.append("title[ar]", this.doctorData.arTitle);
        data.append("department_id", this.doctorData.department);
        data.append("session_price", this.doctorData.sessionPrice);
        data.append("image", this.doctorData.photo);

        this.axios
        .put(`${localStorage.companyApiUrl}/dashboard/doctors/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then((response) => {
          // close dialog
          this.editDialog = false;
          // empty department data
          this.doctorData = {};
          // success message
          this.$toast.success(response.data.message);
          // update item in array
          this.doctors.splice(this.doctors.indexOf(item), 1, response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Delete item
    deleteDoctor(item) {
      this.deleteItem(`${localStorage.companyApiUrl}/dashboard/doctors/${item.id}`, item, this.doctors);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>