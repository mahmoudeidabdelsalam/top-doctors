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
        :items="reservations"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!reservations.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Reservations</v-toolbar-title>
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
                  New Reservation
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Reservation</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                  <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-select
                          :items="doctors"
                          v-model="reservationsData.doctorName"
                          label="Doctor Name"
                        ></v-select>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-select
                          :items="patients"
                          v-model="reservationsData.patientName"
                          label="Patient Name"
                        ></v-select>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Detection Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>      
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-select
                        :items="times"
                        v-model="reservationsData.detectionDate"
                        label="Detection Time"
                      ></v-select>
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
                    @click="addReservation"
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
          <router-link :to="{ name: 'ReservationProfile', params: { profileId: item.id } }" class="compo link">
            <div class="compo">
              <img :src="item.doctor.profile" />
              <div class="text">
                <span class="name d-block">{{ item.doctor.full_name }}</span>
                <span class="sub d-block">{{ item.doctor.email }}</span>
                <span class="number d-block">{{ item.doctor.phone_number }}</span>
              </div>
            </div>
          </router-link>
        </template>

        <!-- Image and info -->
        <template v-slot:[`item.patient`]="{ item }">
          <div class="compo">
            <div class="text">
              <span class="name d-block">{{ item.patient.full_name }}</span>
              <span class="sub d-block">{{ item.patient.email }}</span>
              <span class="number d-block">{{ item.patient.phone_number }}</span>
            </div>
          </div>
        </template>

        <!-- Payment status -->
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            :color="getColor(item.status)"
            dark
          >
            {{ item.status }}
          </v-chip>
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
                @click="bindReservationsData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Reservation</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-select
                          :items="doctors"
                          v-model="reservationsData.doctorName"
                          label="Doctor Name"
                        ></v-select>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-select
                          :items="patients"
                          v-model="reservationsData.patientName"
                          label="Patient Name"
                        ></v-select>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Detection Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>      
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-select
                        :items="times"
                        v-model="reservationsData.detectionDate"
                        label="Detection Time"
                      ></v-select>
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
                  @click="updateReservations(item)"
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
                <span class="text-h5">Delete Reservation</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this reservation?
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
                  @click="deleteReservations(item)"
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
import crudActionsMixins from '@/mixins/crud-actions-mixins';

export default {
  name: "Reservations",
  components: {
    UploadImages
  },
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      // All Reservations
      reservations: [],
      doctors:[],
      patients:[],
      times:[],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected reservations
      selected: [],
      // table headers
      headers: [
        { text: 'Doctor', align: 'start', value: 'doctor' },
        { text: 'Patient', align: 'start', value: 'patient' },
        { text: "Date", value: "reservation_day" },
        { text: "Start Time", value: "reservation_time_start" },
        { text: "End Time", value: "reservation_time_end" },
        { text: "Payment Status", value: "status" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // reservations data
      reservationsData: {
        doctorName: '',
        patientName: '',
        detectionDate: '',
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
    //get all doctors
    this.axios
    .get(process.env.VUE_APP_API_URL + `/dashboard/doctors`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    .then((response) => {
      this.doctors = response.data.data.map((doctor) => {
        return {
          text: doctor.full_name,
          value: doctor.id,
        };
      });
    })
    .catch((error) => {
      console.log(error);
    });

    //get all patients
    this.axios
    .get(process.env.VUE_APP_API_URL + `/dashboard/patients`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    .then((response) => {
      this.patients = response.data.data.map((patient) => {
        return {
          text: patient.full_name,
          value: patient.id,
        };
      });
    })
    .catch((error) => {
      console.log(error);
    });

    // Get all reservations
    this.getItems(process.env.VUE_APP_API_URL + `/dashboard/reservations`, this.reservations);

    // Get all Avalibale Time
    this.axios
    .get(process.env.VUE_APP_API_URL + `/dashboard/reservations/get-available-dates`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    .then((response) => {
      this.times = response.data.data
      console.log(this.times)
    })
    .catch((error) => {
      console.log(error);
    });

  },
  mixins: [crudActionsMixins],
  methods: {
    getColor (status) {
      if (status == "Cancelled") return 'red'
      else if (status == "Pending") return 'orange'
      else if (status == 'Completed') return 'green'
      else if (status == 'Refunded') return 'blue'
    },
    // Add item
      addReservation() {

        let data = new FormData();
        data.append("doctor.full_name", this.reservationsData.doctorName);
        data.append("patient.full_name", this.reservationsData.patientName);
        data.append("reservation_day", this.reservationsData.detectionDate);
        // data.append("image", this.reservationsData.photo);

        this.addItem(process.env.VUE_APP_API_URL + `/dashboard/reservations`, data, this.reservations, this.reservationsData);
    },
    
    // Bind item data
    bindReservationsData(item) {
      // Get single reservations by id
      this.axios
      .get(process.env.VUE_APP_API_URL + `/dashboard/reservations/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.reservationsData.doctorName = item.doctor.full_name;
        this.reservationsData.patientName = item.patient.full_name;
        this.reservationsData.detectionDate = item.reservation_day;
        

        if (this.$i18n.locale == "en") {
          this.reservationsData.doctorName = item.doctor.full_name;
          this.reservationsData.patientName = item.patient.full_name;
          this.reservationsData.detectionDate = item.reservation_day;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateReservations(item) {

        let data = new URLSearchParams();
        data.append("doctor.full_name", this.reservationsData.doctorName);
        data.append("patient.full_name", this.reservationsData.patientName);
        data.append("reservation_day", this.reservationsData.detectionDate);

        this.axios
        .put(process.env.VUE_APP_API_URL + `/dashboard/reservations/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then((response) => {
          // close dialog
          this.editDialog = false;
          // empty department data
          this.reservationsData = {};
          // success message
          this.$toast.success(response.data.message);
          // update item in array
          this.reservations.splice(this.reservations.indexOf(item), 1, response.data.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Delete item
    deleteReservations(item) {
      this.deleteItem(process.env.VUE_APP_API_URL + `/dashboard/reservations/${item.id}`, item, this.reservations);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>