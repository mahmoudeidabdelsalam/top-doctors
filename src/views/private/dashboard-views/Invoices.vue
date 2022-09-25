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
        :items="invoices"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!invoices.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Invoices</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <!-- Image and info -->
        <template v-slot:[`item.doctor`]="{ item }">
          <router-link :to="{ name: 'DoctorProfile', params: { profileId: item.id } }" class="compo link">
            <img :src="item.invoiceable.doctor.profile" />
            <div class="text">
              <span class="name d-block">{{ item.invoiceable.doctor.full_name }}</span>
              <span class="sub d-block">{{ item.invoiceable.doctor.email }}</span>
              <span class="number d-block">{{ item.invoiceable.doctor.phone_number }}</span>
            </div>
          </router-link>
        </template>

        <!-- Info -->
        <template v-slot:[`item.patient`]="{ item }">
          <div class="compo">
            <div class="text">
              <span class="name d-block">{{ item.invoiceable.patient.full_name }}</span>
              <span class="sub d-block">{{ item.invoiceable.patient.email }}</span>
              <span class="number d-block">{{ item.invoiceable.patient.phone_number }}</span>
            </div>
          </div>
        </template>

        <!-- Info -->
        <template v-slot:[`item.invoice`]="{ item }">
          <div class="compo">
            <div class="text">
              <span class="sub d-block">Number: {{ item.invoice_number }}</span>
              <span class="sub d-block">Type: {{ item.invoice_type }}</span>
              <span class="sub d-block">Date: {{ item.invoice_due }}</span>
            </div>
          </div>
        </template>

        <!-- Is Paid -->
        <template v-slot:[`item.is_paid`]="{ item }">
          <v-chip
            :color="getColorIsPaid(item.is_paid)"
            dark
          >
            <div v-if="item.is_paid==true">Paid</div>
            <div v-if="item.is_paid==false">Un Paid</div>
          </v-chip>
        </template>   

        <!-- Is Insured -->
        <template v-slot:[`item.is_insured`]="{ item }">
          <v-chip
            :color="getColorIsPaid(item.is_insured)"
            dark
          >
            <div v-if="item.is_insured==true">Insured</div>
            <div v-if="item.is_insured==false">Un Insured</div>
          </v-chip>
        </template>

        <!-- Payment status -->
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            :color="getColorStatus(item.status)"
            dark
          >
            {{ item.status }}
          </v-chip>
        </template>

        <!-- Acions -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            class="ma-1"
            outlined
            x-small
            fab
            color="indigo"
          >
            <v-icon>mdi-printer</v-icon>
          </v-btn>

          <!-- Edit item dialog -->
          <v-dialog
            v-model="editDialog[item.id]"
            persistent
            max-width="700px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ma-1"
                outlined
                x-small
                fab
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Invoice</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Update Invoice.
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
                  @click="updateEmployee(item)"
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
                class="ma-1"
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
                <span class="text-h5">Delete Invoice</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this Invoice?
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
                  @click="deleteInvoice(item)"
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
  name: "Invoices",
  components: {
    UploadImages
  },
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      // All invoices
      invoices:[],
      //options
      options:[
        { title: 'Edit' },
        { title: 'Download' },
        { title: 'Delete' }
      ],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected invoices
      selected: [],
      // table headers
      headers: [
        { text: 'Doctor', value: 'doctor' },
        { text: 'Patient', value: 'patient' },
        { text: 'Invoice', value: 'invoice' },
        { text: 'Subtotal', value: 'sub_total' },
        { text: 'Paid', value: 'is_paid' },
        { text: 'Insurance', value: 'is_insured' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', sortable: false, value: 'actions' },
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
    // Get all invoices
    this.getItems(`${localStorage.companyApiUrl}/dashboard/invoices`, this.invoices);
  },
  mixins: [crudActionsMixins],
  methods: {
    getColorStatus (status) {
      if (status == "Cancelled") return 'red'
      else if (status == "Pending") return 'orange'
      else if (status == 'Completed') return 'green'
      else if (status == 'Refunded') return 'blue'
    },
    getColorIsPaid (is_paid) {
      if (is_paid == true) return 'green' 
      else if (is_paid == false) return 'red'
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>