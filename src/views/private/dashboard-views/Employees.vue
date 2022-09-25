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
        :items="employees"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!employees.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Employees</v-toolbar-title>
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
                  New Employee
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Employee</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="employeeData.enName"
                          label="En Name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="employeeData.arName"
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
                          v-model="employeeData.work_phone"
                          label="Work Phone"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="employeeData.personal_phone"
                          label="Personal Phone"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="employeeData.email"
                          label="Email"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-select
                          :items="genders"
                          v-model="employeeData.gender"
                          label="gender"
                        ></v-select>
                      </v-col>

                      <v-col
                        cols="12"
                      >
                        <v-select
                          :items="roles"
                          v-model="employeeData.role"
                          label="Roles"
                        ></v-select>
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
                    @click="addEmployee"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Image and info -->
        <template v-slot:[`item.employee`]="{ item }">
          <router-link :to="{ name: 'EmployeeProfile', params: { profileId: item.id } }" class="compo link">
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
                @click="bindEmployeeData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Employee</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="employeeData.enName"
                        label="En Name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="employeeData.arName"
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
                        v-model="employeeData.enDescription"
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
                        v-model="employeeData.arDescription"
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
                <span class="text-h5">Delete Employee</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this employee?
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
                  @click="deleteEmployee(item)"
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
  name: "Employees",
  components: {
    UploadImages
  },
  data() {
    return {
      // All employees
      employees: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected employee
      selected: [],
      // table headers
      headers: [
        { text: "Employee", value: "employee" },
        { text: 'Role', align: 'start', value: 'role' },
        { text: 'Email', align: 'start', value: 'email' },
        { text: 'Telephone', align: 'start', value: 'work_phone' },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // employee data
      employeeData: {
        enName: "",
        arName: "",
        work_phone: "",
        personal_phone: "",
        email: "",
        gender: "",
        role: "",
        photo: "",
      },
      // roles
      roles: "",
      // genders
      genders: ''
    }
  },
  mounted() {
    // Get all employees
    this.getItems(`${localStorage.companyApiUrl}/dashboard/employees`, this.employees);

    // Get all roles
    this.axios
    .get(`${localStorage.companyApiUrl}/dashboard/roles`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    .then((response) => {
      this.roles = response.data.data.map((role) => {
        return {
          text: role.name,
          value: role.id
        }
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
        this.employeeData.photo = element;
      });
    },

    // Add item
      addEmployee() {

        let data = new FormData();
        data.append("full_name[en]", this.employeeData.enName);
        data.append("full_name[ar]", this.employeeData.arName);
        data.append("work_phone", this.employeeData.work_phone);
        data.append("personal_phone", this.employeeData.personal_phone);
        data.append("email", this.employeeData.email);
        data.append("gender", this.employeeData.gender);
        data.append("role", this.employeeData.role);
        data.append("image", this.employeeData.photo);

        this.addItem(`${localStorage.companyApiUrl}/dashboard/employees`, data, this.employees, this.employeeData);
      },
    
    // Bind item data
    bindDeleteEmployeeData(item) {
      // Get single employees by id
      this.axios
      .get(`${localStorage.companyApiUrl}/dashboard/employees/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.employeeData = response.data.data;
        if (this.$i18n.locale == "en") {
          this.employeeData.enName = item.name;
          this.employeeData.arName = response.data.data.name;
          this.employeeData.enDescription = item.description;
          this.employeeData.arDescription = response.data.data.description;
        } else {
          this.employeeData.arName = item.name;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateEmployee(item) {

      let data = new URLSearchParams();
      data.append("name[en]", this.employeeData.enName);
      data.append("name[ar]", this.employeeData.arName);
      data.append("description[en]", this.employeeData.enDescription);
      data.append("description[ar]", this.employeeData.arDescription);

      this.axios
      .put(`${localStorage.companyApiUrl}/dashboard/employees/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.editDialog = false;
        // empty employee data
        this.employeeData = {};
        // success message
        this.$toast.success(response.data.message);
        // update item in array
        this.employees.splice(this.employees.indexOf(item), 1, response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Delete item
    deleteEmployee(item) {
      this.deleteItem(`${localStorage.companyApiUrl}/dashboard/employees/${item.id}`, item, this.employees);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>