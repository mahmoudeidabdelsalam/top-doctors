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
        :items="Branches"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!Branches.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>{{ $t('Branches.title') }}</v-toolbar-title>
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
                  {{ $t('Branches.Create') }}
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ $t('Branches.Create') }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.Patient_name"
                          :label="$t('Branches.Patient_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.Doctor"
                          :label="$t('Branches.Doctor')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.En_name"
                          :label="$t('Branches.En_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.Ar_name"
                          :label="$t('Branches.Ar_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.Surgery_date"
                          :label="$t('Branches.Surgery_date')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.Price_Surgery"
                          :label="$t('Branches.Price_Surgery')"
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
                    @click="addBranche"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Image and info -->
        <template v-slot:[`item.branch`]="{ item }">
          <div class="compo">
            <img :src="item.logo" />
            <div class="text">
              <span class="name d-block">{{ item.name }}</span>
            </div>
          </div>
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
                @click="bindBranchesData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Branche</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.Patient_name"
                          :label="$t('Branches.Patient_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.Doctor"
                          :label="$t('Branches.Doctor')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.En_name"
                          :label="$t('Branches.En_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.Ar_name"
                          :label="$t('Branches.Ar_name')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.Surgery_date"
                          :label="$t('Branches.Surgery_date')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="BranchesData.Price_Surgery"
                          :label="$t('Branches.Price_Surgery')"
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
                  @click="updateBranche(item)"
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
                <span class="text-h5">Delete Branche</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this Branche?
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
                  @click="deleteBranche(item)"
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
  name: "Branches",
  components: {
  },
  data() {
    return {
      // All Branches
      Branches: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected Branche
      selected: [],
      // table headers
      headers: [
        { text: "Branche", value: "branch" },
        { text: "Email", value: "email" },
        { text: "Telephone", sortable: false, value: "telephone" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // Branche data
      BranchesData: {
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
    // Get all Branches
    this.axios
    .get(`${localStorage.companyApiUrl}/dashboard/departments`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    .then((response) => {
      this.Branches = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
  },

  mixins: [crudActionsMixins],

  methods: {

    // Add item
    addBranche() {

      let data = new FormData();
      data.append("name[en]", this.departmentData.enName);
      data.append("name[ar]", this.departmentData.arName);
      data.append("description[en]", this.departmentData.enDescription);
      data.append("description[ar]", this.departmentData.arDescription);
      data.append("email", this.departmentData.email);
      data.append("telephone", this.departmentData.telephone);
      data.append("image", this.departmentData.photo);

      this.addItem(`${localStorage.companyApiUrl}/v1/dashboard/departments`, data, this.departments, this.departmentData);
    },

    // Bind item data
    bindBranchesData(item) {
      // Get single departments by id
      this.axios
      .get(`${localStorage.companyApiUrl}/v1/dashboard/departments/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.departmentData = response.data.data;
        if (this.$i18n.locale == "en") {
          this.departmentData.enName = item.name;
          this.departmentData.arName = response.data.data.name;
          this.departmentData.enDescription = item.description;
          this.departmentData.arDescription = response.data.data.description;
        } else {
          this.departmentData.arName = item.name
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateBranche(item) {

      let data = new URLSearchParams();
      data.append("name[en]", this.departmentData.enName);
      data.append("name[ar]", this.departmentData.arName);
      data.append("description[en]", this.departmentData.enDescription);
      data.append("description[ar]", this.departmentData.arDescription);
      data.append("email", this.departmentData.email);
      data.append("telephone", this.departmentData.telephone);
      data.append("image", this.departmentData.photo);

      this.axios
      .put(`${localStorage.companyApiUrl}/v1/dashboard/departments/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.editDialog = false;
        // empty department data
        this.departmentData = {};
        // success message
        this.$toast.success(response.data.message);
        // update item in array
        this.departments.splice(this.departments.indexOf(item), 1, response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Delete item
    deleteBranche(item) {
      this.deleteItem(`${localStorage.companyApiUrl}/v1/dashboard/departments/${item.id}`, item, this.departments);
    },

  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>