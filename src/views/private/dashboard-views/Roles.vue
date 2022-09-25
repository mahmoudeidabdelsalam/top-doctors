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
        :items="roles"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!roles.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Roles</v-toolbar-title>
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
                  New Roles
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Roles</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="roleData.enName"
                          label="En Name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="roleData.arName"
                          label="Ar Name"
                          dir="rtl"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                      >
                        <v-select
                          :items="permissions"
                          v-model="roleData.permissions"
                          label="Permissions"
                          multiple
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
                    @click="addRole"
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
                @click="bindRoleData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Role</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="roleData.enName"
                        label="En Name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="roleData.arName"
                        label="Ar Name"
                        dir="rtl"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                      >
                        <v-select
                          :items="permissions"
                          v-model="roleData.permissions"
                          label="Permissions"
                          multiple
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
                  @click="updateRole(item)"
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
                <span class="text-h5">Delete Role</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this role?
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
                  @click="deleteRole(item)"
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
  name: "Roles",
  data() {
    return {
      // All roles
      roles: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected employee
      selected: [],
      // table headers
      headers: [
        { text: 'Name', align: 'start', value: 'name' },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // employee data
      roleData: {
        enName: "",
        arName: "",
        permissions: [],
      },
      // permissions
      permissions: [],
    }
  },
  mounted() {
    // Get all roles
    this.getItems(`${localStorage.companyApiUrl}/dashboard/roles`, this.roles);

    // Get all roles permissions
    this.axios
    .get(`${localStorage.companyApiUrl}/dashboard/permissions`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    .then((response) => {
      this.permissions = response.data.data.map((permission) => {
        return {
          text: permission.name,
          value: permission.id,
        };
      });
    })
    .catch((error) => {
      console.log(error);
    });
  },
  mixins: [crudActionsMixins],
  methods: {
    // Add item
    addRole() {

      let data = new FormData();
      data.append("name[en]", this.roleData.enName);
      data.append("name[ar]", this.roleData.arName);
      for (let i = 0; i < this.roleData.permissions.length; i++) {
        data.append(`permissions[]`, this.roleData.permissions[i]);
      }

      this.addItem(`${localStorage.companyApiUrl}/dashboard/roles`, data, this.roles, this.roleData);
    },
    
    // Bind item data
    bindRoleData(item) {
      // Get single roles by id
      this.axios
      .get(`${localStorage.companyApiUrl}/dashboard/roles/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.roleData = response.data.data;
        this.roleData.permissions = response.data.data.permissions.map((permission) => {
          return permission.id;
        });
        if (this.$i18n.locale == "en") {
          this.roleData.enName = item.name;
          this.roleData.arName = response.data.data.name;
        } else {
          this.roleData.arName = item.name;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateRole(item) {

      let data = new URLSearchParams();
      data.append("name[en]", this.roleData.enName);
      data.append("name[ar]", this.roleData.arName);
      for (let i = 0; i < this.roleData.permissions.length; i++) {
        data.append(`permissions[]`, this.roleData.permissions[i]);
      }

      this.axios
      .put(`${localStorage.companyApiUrl}/dashboard/roles/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.editDialog = false;
        // empty role data
        this.roleData = {};
        // success message
        this.$toast.success(response.data.message);
        // update item in array
        this.roles.splice(this.roles.indexOf(item), 1, response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Delete item
    deleteRole(item) {
      this.deleteItem(`${localStorage.companyApiUrl}/dashboard/roles/${item.id}`, item, this.roles);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>