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
        :items="Surgeries"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!Surgeries.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>{{ $t('surgeries.title') }}</v-toolbar-title>
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
                  {{ $t('surgeries.Create') }}
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ $t('surgeries.Create') }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.Patient_name"
                          :label="$t('surgeries.Patient_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.Doctor"
                          :label="$t('surgeries.Doctor')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.En_name"
                          :label="$t('surgeries.En_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.Ar_name"
                          :label="$t('surgeries.Ar_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.Surgery_date"
                          :label="$t('surgeries.Surgery_date')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.Price_Surgery"
                          :label="$t('surgeries.Price_Surgery')"
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
                    @click="newDialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="addSurgerie"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Image -->
        <template v-slot:[`item.logo`]="{ item }">
          <router-link :to="{ name: 'SurgerieProfile' }">
            <img :src="item.logo" style="width: 40px; height: 40px; object-fit: cover;" class="rounded-circle" />
          </router-link>
        </template>

        <!-- Name -->
        <template v-slot:[`item.name`]="{ item }">
          <router-link class="item-name" :to="{ name: 'SurgerieProfile' }">
            <span>{{ item.name }}</span>
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
                @click="bindsurgeriesData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Surgerie</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.Patient_name"
                          :label="$t('surgeries.Patient_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.Doctor"
                          :label="$t('surgeries.Doctor')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.En_name"
                          :label="$t('surgeries.En_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.Ar_name"
                          :label="$t('surgeries.Ar_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.Surgery_date"
                          :label="$t('surgeries.Surgery_date')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="surgeriesData.Price_Surgery"
                          :label="$t('surgeries.Price_Surgery')"
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
                  @click="updateSurgerie(item)"
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
                <span class="text-h5">Delete Surgerie</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this Surgerie?
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
                  @click="deleteSurgerie(item)"
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

export default {
  name: "Surgeries",
  components: {
  },
  data() {
    return {
      // All Surgeries
      Surgeries: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected Surgerie
      selected: [],
      // table headers
      headers: [
        { text: "Surgerie", sortable: false, value: "logo" },
        { text: 'Name', align: 'start', value: 'name' },
        { text: "Email", value: "email" },
        { text: "Telephone", sortable: false, value: "telephone" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // Surgerie data
      surgeriesData: {
        Patient_name: "",
        Doctor: "",
        En_name: "",
        Ar_name: "",
        Surgery_date: "",
        Price_Surgery: "",
      }
    }
  },
  mounted() {
    // Get all Surgeries
    this.axios
    .get(process.env.VUE_APP_API_URL + `/v1/dashboard/departments`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    .then((response) => {
      this.Surgeries = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
  },
  methods: {

    // Add item
      addSurgerie() {

        let data = new FormData();
        data.append("patient_name", this.surgeriesData.Patient_name);

        this.axios
        .post(process.env.VUE_APP_API_URL + `/v1/dashboard/departments`, data, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then((response) => {
          // close dialog
          this.newDialog = false;
          // empty Surgerie data
          this.surgeriesData = {};
          // success message
          this.$toast.success(response.data.message);
          // Get all Surgeries
          this.axios
          .get(process.env.VUE_APP_API_URL + `/v1/dashboard/departments`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
          .then((response) => {
            this.Surgeries = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    },
    
    // Bind item data
    bindsurgeriesData(item) {
      // Get single Surgeries by id
      this.axios
      .get(process.env.VUE_APP_API_URL + `/v1/dashboard/departments/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.surgeriesData = response.data.data;
        if (this.$i18n.locale == "en") {
          this.surgeriesData.enName = item.name;
          this.surgeriesData.arName = response.data.data.name;
          this.surgeriesData.enDescription = item.description;
          this.surgeriesData.arDescription = response.data.data.description;
        } else {
          this.surgeriesData.arName = item.name
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateSurgerie(item) {

        let data = new URLSearchParams();
        data.append("patient_name", this.surgeriesData.Patient_name);

        this.axios
        .put(process.env.VUE_APP_API_URL + `/v1/dashboard/departments/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then((response) => {
          // close dialog
          this.editDialog = false;
          // empty Surgerie data
          this.surgeriesData = {};
          // success message
          this.$toast.success(response.data.message);
          // Get all Surgeries
          this.axios
          .get(process.env.VUE_APP_API_URL + `/v1/dashboard/departments`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
          .then((response) => {
            this.Surgeries = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Delete item
    deleteSurgerie(item) {
        this.axios
        .delete(process.env.VUE_APP_API_URL + `/v1/dashboard/departments/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then((response) => {
            // close dialog
            this.deleteDialog = false;
            // success message
            this.$toast.success(response.data.message);
            // Get all Surgeries
            this.axios
            .get(process.env.VUE_APP_API_URL + `/v1/dashboard/departments`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
            .then((response) => {
              this.Surgeries = response.data.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>