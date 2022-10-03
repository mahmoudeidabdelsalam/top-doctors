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
        :items="services"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!services.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Services</v-toolbar-title>
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
                  New Service
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Service</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="serviceData.enName"
                          label="En Name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="serviceData.arName"
                          label="Ar Name"
                          dir="rtl"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-textarea
                          v-model="serviceData.enDescription"
                          label="En Description"
                          rows="4"
                          required
                        ></v-textarea>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-textarea
                          v-model="serviceData.arDescription"
                          label="Ar Description"
                          dir="rtl"
                          rows="4"
                          required
                        ></v-textarea>
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
                    @click="addService"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
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
                @click="bindServiceData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Service</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="serviceData.enName"
                        label="En Name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="serviceData.arName"
                        label="Ar Name"
                        dir="rtl"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-textarea
                        v-model="serviceData.enDescription"
                        label="En Description"
                        rows="4"
                        required
                      ></v-textarea>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-textarea
                        v-model="serviceData.arDescription"
                        label="Ar Description"
                        dir="rtl"
                        rows="4"
                        required
                      ></v-textarea>
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
                  @click="updateService(item)"
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
                <span class="text-h5">Delete Service</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this service?
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
                  @click="deleteService(item)"
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
  name: "Services",
  data() {
    return {
      // All services
      services: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected service
      selected: [],
      // table headers
      headers: [
        { text: 'Service', align: 'start', value: 'name' },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // service data
      serviceData: {
        enName: "",
        arName: "",
        enDescription: "",
        arDescription: "",
      }
    }
  },
  mounted() {
    // Get all services
    this.getItems(process.env.VUE_APP_API_URL + `/dashboard/services`, this.services);
  },
  mixins: [crudActionsMixins],
  methods: {
    // Add item
    addService() {

      let data = new FormData();
      data.append("name[en]", this.serviceData.enName);
      data.append("name[ar]", this.serviceData.arName);
      data.append("description[en]", this.serviceData.enDescription);
      data.append("description[ar]", this.serviceData.arDescription);

      this.addItem(process.env.VUE_APP_API_URL + `/dashboard/services`, data, this.services, this.serviceData);
    },
    
    // Bind item data
    bindServiceData(item) {
      // Get single services by id
      this.axios
      .get(process.env.VUE_APP_API_URL + `/dashboard/services/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.serviceData = response.data.data;
        if (this.$i18n.locale == "en") {
          this.serviceData.enName = item.name;
          this.serviceData.arName = response.data.data.name;
          this.serviceData.enDescription = item.description;
          this.serviceData.arDescription = response.data.data.description;
        } else {
          this.serviceData.arName = item.name;
          this.serviceData.enName = response.data.data.name;
          this.serviceData.arDescription = item.description;
          this.serviceData.enDescription = response.data.data.description;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateService(item) {

      let data = new URLSearchParams();
      data.append("name[en]", this.serviceData.enName);
      data.append("name[ar]", this.serviceData.arName);
      data.append("description[en]", this.serviceData.enDescription);
      data.append("description[ar]", this.serviceData.arDescription);

      this.axios
      .put(process.env.VUE_APP_API_URL + `/dashboard/services/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.editDialog = false;
        // empty service data
        this.serviceData = {};
        // success message
        this.$toast.success(response.data.message);
        // update item in array
        this.services.splice(this.services.indexOf(item), 1, response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Delete item
    deleteService(item) {
      this.deleteItem(process.env.VUE_APP_API_URL + `/dashboard/services/${item.id}`, item, this.services);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>