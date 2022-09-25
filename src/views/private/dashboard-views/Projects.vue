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
        :items="projects"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!projects.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Projects</v-toolbar-title>
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
                  New Project
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Project</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="projectData.enName"
                          :rules="[rules.required, rules.counter]"
                          label="En Name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="projectData.arName"
                          :rules="[rules.required, rules.counter]"
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
                          v-model="projectData.enDescription"
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
                          v-model="projectData.arDescription"
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
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="projectData.due_date"
                              label="Due date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="projectData.due_date"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <UploadImages @changed="handleImages" :max="1" uploadMsg="Project photo" maxError="Max files exceed" fileError="images files only accepted" clearAll="Remove all" />
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
                    @click="addProject"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Image and info -->
        <template v-slot:[`item.project`]="{ item }">
          <router-link :to="{ name: 'ProjectProfile', params: { profileId: item.id } }" class="compo link">
            <img :src="item.image" />
            <div class="text">
              <span class="name d-block">{{ item.name }}</span>
              <span class="sub d-block">{{ item.description }}</span>
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
                @click="bindProjectData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Project</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="projectData.enName"
                        :rules="[rules.required, rules.counter]"
                        label="En Name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="projectData.arName"
                        :rules="[rules.required, rules.counter]"
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
                        v-model="projectData.enDescription"
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
                        v-model="projectData.arDescription"
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
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="projectData.due_date"
                            label="Due date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="projectData.due_date"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <UploadImages @changed="handleImages" :max="1" uploadMsg="Project photo" maxError="Max files exceed" fileError="images files only accepted" clearAll="Remove all" />
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
                  @click="updateProject(item)"
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
                <span class="text-h5">Delete Project</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this project?
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
                  @click="deleteProject(item)"
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
  name: "Projects",
  components: {
    UploadImages
  },
  data() {
    return {
      // All projects
      projects: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected project
      selected: [],
      // table headers
      headers: [
        { text: 'Project', value: 'project' },
        { text: 'Start date', value: 'due_date' },
        { text: 'Countdown', value: 'countdown' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', sortable: false, value: 'actions' }
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // project data
      projectData: {
        enName: "",
        arName: "",
        enDescription: "",
        arDescription: "",
        due_date: "",
        photo: ""
      },
      // daet picker
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu2: false,
      // validation rules
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length >= 4 || 'Min 4 characters',
      },
    }
  },

  mounted() {
    // Get all projects
    this.getItems(`${localStorage.companyApiUrl}/dashboard/projects`, this.projects);
  },

  mixins: [crudActionsMixins],

  methods: {
    // Handle item image
    handleImages(files){
      
      console.log(files);
      files.forEach(element => {
        this.projectData.photo = element;
      });
    },

    // Add item
    addProject() {

      let data = new FormData();
      data.append("name[en]", this.projectData.enName);
      data.append("name[ar]", this.projectData.arName);
      data.append("description[en]", this.projectData.enDescription);
      data.append("description[ar]", this.projectData.arDescription);
      data.append("due_date", this.projectData.due_date);
      data.append("project_image", this.projectData.photo);

      this.addItem(`${localStorage.companyApiUrl}/dashboard/projects`, data, this.projects, this.projectData);
    },
    
    // Bind item data
    bindProjectData(item) {
      // Get single projects by id
      this.axios
      .get(`${localStorage.companyApiUrl}/dashboard/projects/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.projectData = response.data.data;
        if (this.$i18n.locale == "en") {
          this.projectData.enName = item.name;
          this.projectData.arName = response.data.data.name;
          this.projectData.enDescription = item.description;
          this.projectData.arDescription = response.data.data.description;
        } else {
          this.projectData.arName = item.name;
          this.projectData.enName = response.data.data.name;
          this.projectData.arDescription = item.description;
          this.projectData.enDescription = response.data.data.description;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateProject(item) {

      let data = new FormData();
      data.append("name[en]", this.projectData.enName);
      data.append("name[ar]", this.projectData.arName);
      data.append("description[en]", this.projectData.enDescription);
      data.append("description[ar]", this.projectData.arDescription);
      data.append("due_date", this.projectData.due_date);
      data.append("project_image", this.projectData.photo);
      data.append("_method", 'PUT');

      this.axios
      .post(`${localStorage.companyApiUrl}/dashboard/projects/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.editDialog = false;
        // empty project data
        this.projectData = {};
        // success message
        this.$toast.success(response.data.message);
        // update item in array
        this.projects.splice(this.projects.indexOf(item), 1, response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Delete item
    deleteProject(item) {
      this.deleteItem(`${localStorage.companyApiUrl}/dashboard/projects/${item.id}`, item, this.projects);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>