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
        :items="leads"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!leads.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Leads</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <!-- Lead -->
        <template v-slot:[`item.lead`]="{ item }">
          <router-link :to="{ name: 'DoctorProfile', params: { profileId: item.id } }" class="compo link">
            <img :src="item.profile" />
            <div class="text">
              <span class="name d-block">{{ item.full_name }}</span>
            </div>
          </router-link>
        </template>

        <!-- Department -->
        <template v-slot:[`item.department`]="{ item }">
          <router-link :to="{ name: 'DepartmentProfile', params: { profileId: item.id } }" class="compo link">
            <div class="text">
              <span class="name d-block">{{ item.department.name }}</span>
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
                @click="bindLeadData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Lead</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="leadData.first_name"
                        label="First name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="leadData.last_name"
                        label="Last name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="leadData.email"
                        label="Email"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="leadData.phone_number"
                        label="Phone"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="leadData.national_id"
                        label="National ID"
                        required
                      ></v-text-field>
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
                  @click="updateLead(item)"
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
                <span class="text-h5">Delete Lead</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this lead?
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
                  @click="deleteLead(item)"
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
// import mixins
import crudActionsMixins from '@/mixins/crud-actions-mixins'

export default {
  name: "Leads",
  data() {
    return {
      // All leads
      leads: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected lead
      selected: [],
      // table headers
      headers: [
        { text: 'Lead', value: 'lead' },
        { text: 'Department', value: 'department' },
        { text: 'Available time', value: 'available_time' },
        { text: 'Status', value: 'status.name' },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      leadDialog: {},
      // lead data
      leadData: {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        national_id: "",
      }
    }
  },
  mounted() {
    // Get all leads
    this.getItems(process.env.VUE_APP_API_URL + `/dashboard/leads`, this.leads);
  },
  mixins: [crudActionsMixins],
  methods: {
    // Add item
    addLead() {

      let data = new FormData();
      data.append("name[en]", this.leadData.enName);
      data.append("name[ar]", this.leadData.arName);
      data.append("description[en]", this.leadData.enDescription);
      data.append("description[ar]", this.leadData.arDescription);

      this.addItem(process.env.VUE_APP_API_URL + `/dashboard/leads`, data, this.leads, this.leadData);
    },
    
    // Bind item data
    bindLeadData(item) {
      // Get single leads by id
      this.axios
      .get(process.env.VUE_APP_API_URL + `/dashboard/leads/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.leadData = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateLead(item) {

      let data = new URLSearchParams();
      data.append("first_name", this.leadData.first_name);
      data.append("last_name", this.leadData.last_name);
      data.append("phone_number", this.leadData.phone_number);
      data.append("email", this.leadData.email);
      data.append("national_id", this.leadData.national_id);

      this.axios
      .put(process.env.VUE_APP_API_URL + `/dashboard/leads/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.editDialog = false;
        // empty lead data
        this.leadData = {};
        // success message
        this.$toast.success(response.data.message);
        // update item in array
        this.leads.splice(this.leads.indexOf(item), 1, response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Delete item
    deleteLead(item) {
      this.deleteItem(process.env.VUE_APP_API_URL + `/dashboard/leads/${item.id}`, item, this.leads);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>