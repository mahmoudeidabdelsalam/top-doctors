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
        :items="departments"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!departments.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Departments</v-toolbar-title>
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
                  New Department
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Department</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="departmentData.enName"
                          label="En Name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="departmentData.arName"
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
                          v-model="departmentData.enDescription"
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
                          v-model="departmentData.arDescription"
                          label="Ar Description"
                          dir="rtl"
                          rows="4"
                          required
                        ></v-textarea>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="departmentData.email"
                          label="Emali"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="departmentData.telephone"
                          label="Telephone"
                          required
                        ></v-text-field>
                      </v-col>
                      
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <UploadImages @changed="handleImages" :max="1" uploadMsg="Department photo" maxError="Max files exceed" fileError="images files only accepted" clearAll="Remove all" />
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
                    @click="addDepartment"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Image and info -->
        <template v-slot:[`item.department`]="{ item }">
          <router-link :to="{ name: 'DepartmentProfile', params: { profileId: item.id } }" class="compo link">
            <img :src="item.logo" />
            <div class="text">
              <span class="name d-block">{{ item.name }}</span>
            </div>
          </router-link>
        </template>

        <!-- Services button -->
        <template v-slot:[`item.services`]="{ item }">
          <router-link :to="{ name: 'DepartmentServices', params: { id: item.id } }" class="compo link">
            <v-btn
              class="ma-2"
              outlined
              x-small
              fab
              color="primary"
            >
              <v-icon>link</v-icon>
            </v-btn>
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
                @click="bindDepartmentData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Department</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="departmentData.enName"
                        label="En Name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="departmentData.arName"
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
                        v-model="departmentData.enDescription"
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
                        v-model="departmentData.arDescription"
                        label="Ar Description"
                        dir="rtl"
                        rows="4"
                        required
                      ></v-textarea>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="departmentData.email"
                        label="Emali"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="departmentData.telephone"
                        label="Telephone"
                        required
                      ></v-text-field>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <UploadImages @changed="handleImages" :max="1" uploadMsg="Department photo" maxError="Max files exceed" fileError="images files only accepted" clearAll="Remove all" />
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
                  @click="updateDepartment(item)"
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
                <span class="text-h5">Delete Department</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this department?
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
                  @click="deleteDepartment(item)"
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
  name: "Departments",
  components: {
    UploadImages
  },
  data() {
    return {
      // All departments
      departments: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected department
      selected: [],
      // table headers
      headers: [
        { text: "Department", value: "department" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "telephone" },
        { text: "Services", sortable: false, value: "services" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // department data
      departmentData: {
        enName: "",
        arName: "",
        enDescription: "",
        arDescription: "",
        email: "",
        telephone: "",
      }
    }
  },
  mixins: [crudActionsMixins],
  mounted() {
    // Get all departments
    this.getItems(`${localStorage.companyApiUrl}/dashboard/departments`, this.departments);
  },
  methods: {
    // Handle item image
    handleImages(files){
      
      console.log(files);
      files.forEach(element => {
        this.departmentData.photo = element;
      });
    },

    // Add item
    addDepartment() {

      let data = new FormData();
      data.append("name[en]", this.departmentData.enName);
      data.append("name[ar]", this.departmentData.arName);
      data.append("description[en]", this.departmentData.enDescription);
      data.append("description[ar]", this.departmentData.arDescription);
      data.append("email", this.departmentData.email);
      data.append("telephone", this.departmentData.telephone);
      data.append("image", this.departmentData.photo);

      this.addItem(`${localStorage.companyApiUrl}/dashboard/departments`, data, this.departments, this.departmentData);
    },
    
    // Bind item data
    bindDepartmentData(item) {
      // Get single departments by id
      this.axios
      .get(`${localStorage.companyApiUrl}/dashboard/departments/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
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
    updateDepartment(item) {

      let data = new URLSearchParams();
      data.append("name[en]", this.departmentData.enName);
      data.append("name[ar]", this.departmentData.arName);
      data.append("description[en]", this.departmentData.enDescription);
      data.append("description[ar]", this.departmentData.arDescription);
      data.append("email", this.departmentData.email);
      data.append("telephone", this.departmentData.telephone);
      data.append("image", this.departmentData.photo);

      this.axios
      .put(`${localStorage.companyApiUrl}/dashboard/departments/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
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
    deleteDepartment(item) {
      this.deleteItem(`${localStorage.companyApiUrl}/dashboard/departments/${item.id}`, item, this.departments);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>