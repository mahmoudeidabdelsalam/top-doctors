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
        :items="departmetsServices"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!departmetsServices.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>My Tasks</v-toolbar-title>
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
                  New Task
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Task</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <v-select
                          :items="departments"
                          v-model="departmentServiceData.department_id"
                          label="Title"
                        ></v-select>
                      </v-col>

                      <v-col
                        cols="12"
                      >
                        <v-select
                          :items="services"
                          v-model="departmentServiceData.service_id"
                          label="Count Down"
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
                    @click="addDepartmentService"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Status -->
        <template v-slot:[`item.status`]="{ item }">
          <v-switch
            v-model="item.status"
            color="info"
          ></v-switch>
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
                @click="bindDepartmentServiceData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Task</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-select
                        :items="departments"
                        v-model="departmentServiceData.department_id"
                        label="Title"
                      ></v-select>
                    </v-col>

                    <v-col
                      cols="12"
                    >
                      <v-select
                        :items="services"
                        v-model="departmentServiceData.service_id"
                        label="Count Down"
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
                  @click="updateDepartmentService(item)"
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
                <span class="text-h5">Delete Task</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this Task?
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
                  @click="deleteDepartmentService(item)"
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
  name: "DepartmentsServices",
  data() {
    return {
      // All departmets services
      departmetsServices: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected departmet ervices
      selected: [],
      // table headers
      headers: [
        { text: 'Title', align: 'start', value: 'service.name' },
        { text: 'Count Down', align: 'start', value: 'department.name' },
        { text: 'Status', align: 'start', value: 'status' },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // service data
      departmentServiceData: {
        department_id: '',
        service_id: '',
      },
      // departments
      departments: null,
      // services
      services: null,
    }
  },
  mounted() {
    // Get all departmets services
    this.axios
    .get(process.env.VUE_APP_API_URL + `/dashboard/departments-services`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    .then((response) => {
      this.departmetsServices = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });

    // Get all departments
    this.axios
    .get(process.env.VUE_APP_API_URL + `/dashboard/departments`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
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

    // Get all services
    this.axios
    .get(process.env.VUE_APP_API_URL + `/dashboard/services`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    .then((response) => {
      this.services = response.data.data.map((service) => {
        return {
          text: service.name,
          value: service.id,
        };
      });
      console.log(this.services);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  methods: {
    // Add item
    addDepartmentService() {

      let data = new FormData();
      data.append("department_id", this.departmentServiceData.department_id);
      data.append("service_id[]", this.departmentServiceData.service_id);

      this.axios
      .post(process.env.VUE_APP_API_URL + `/dashboard/departments-services`, data, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.newDialog = false;
        // empty department service data
        this.departmentServiceData = {};
        // success message
        this.$toast.success(response.data.message);
        // push new item to array [0]
        this.departmetsServices.splice(0, 0, response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    
    // Bind item data
    bindDepartmentServiceData(item) {
      this.departmentServiceData = {
        department_id: item.department.id,
        service_id: item.service.id,
      };
    },

    // Update item
    updateDepartmentService(item) {
      
      let data = new FormData();
      data.append("department_id", this.departmentServiceData.department_id);
      data.append("service_id[]", this.departmentServiceData.service_id);

      var status = 1;
      if(this.departmentServiceData.status === "false") {
        status = 0;
      } 

      this.axios
      .put(process.env.VUE_APP_API_URL + `/dashboard/departments-services/${item.id}?status=${status}`, data, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.editDialog = false;
        // empty department service data
        this.departmentServiceData = {};
        // success message
        this.$toast.success(response.data.message);
        // update item in array
        this.departmetsServices.splice(this.departmetsServices.indexOf(item), 1, response.data.data); 
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Delete item
    deleteDepartmentService(item) {
      this.axios
      .delete(process.env.VUE_APP_API_URL + `/dashboard/departments-services/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.deleteDialog = false;
        // empty department service data
        this.departmentServiceData = {};
        // success message
        this.$toast.success(response.data.message);
        // splice item from array
        this.departmetsServices.splice(this.departmetsServices.indexOf(item), 1);
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