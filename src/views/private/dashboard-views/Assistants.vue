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
        :items="assistants"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!assistants.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Assistants</v-toolbar-title>
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
                  New Assistant
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Assistant</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="assistantData.enName"
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
                          v-model="assistantData.arName"
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
                        <v-text-field
                          type="email"
                          v-model="assistantData.email"
                          :rules="[rules.required, rules.email]"
                          label="Emali"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-select
                          :items="genders"
                          v-model="assistantData.gender"
                          label="gender"
                        ></v-select>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="assistantData.personalPhone"
                          label="Personal phone"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="assistantData.workPhone"
                          label="Work phone"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                      >
                        <v-select
                          :items="doctors"
                          v-model="assistantData.doctors"
                          label="Doctors"
                          multiple
                        ></v-select>
                      </v-col>
                      
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <UploadImages @changed="handleImages" :max="1" uploadMsg="Assistant photo" maxError="Max files exceed" fileError="images files only accepted" clearAll="Remove all" />
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
                    @click="addAssistant"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Image and info -->
        <template v-slot:[`item.assistant`]="{ item }">
          <router-link :to="{ name: 'AssistantProfile', params: { profileId: item.id } }" class="compo link">
            <img :src="item.profile" />
            <div class="text">
              <span class="name d-block">{{ item.full_name }}</span>
              <span class="sub d-block">{{ item.email }}</span>
              <span class="number d-block">{{ item.work_phone }}</span>
            </div>
          </router-link>
        </template>

        <!-- Image and info -->
        <template v-slot:[`item.doctor`]="{ item }">
          <div class="compo">
            <img :src="item.doctors[0].profile" />
            <div class="text">
              <span class="name d-block">{{ item.doctors[0].full_name }}</span>
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
                @click="bindAssistantData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Assistant</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="assistantData.enName"
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
                        v-model="assistantData.arName"
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
                      <v-text-field
                        type="email"
                        v-model="assistantData.email"
                        :rules="[rules.required, rules.email]"
                        label="Emali"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-select
                        :items="genders"
                        v-model="assistantData.gender"
                        label="gender"
                      ></v-select>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="assistantData.personalPhone"
                        label="Personal phone"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="assistantData.workPhone"
                        label="Work phone"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                    >
                      <v-select
                        :items="doctors"
                        v-model="assistantData.doctors"
                        label="Doctors"
                        multiple
                      ></v-select>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <UploadImages @changed="handleImages" :max="1" uploadMsg="Assistant photo" maxError="Max files exceed" fileError="images files only accepted" clearAll="Remove all" />
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
                  @click="updateAssistant(item)"
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
                <span class="text-h5">Delete Assistant</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this assistant?
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
                  @click="deleteAssistant(item)"
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
  name: "Assistants",
  components: {
    UploadImages
  },
  data() {
    return {
      // All assistants
      assistants: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected items
      selected: [],
      // table headers
      headers: [
        { text: "Assistant", value: "assistant" },
        { text: "Doctor", value: "doctor" },
        { text: "Birthday", value: "birthday" },
        { text: "Available", value: "available" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // item data
      assistantData: {
        enName: '',
        arName: '',
        email: '',
        gender: '',
        workPhone: '',
        personalPhone: '',
        doctors: '',
        photo: null,
      },
      // doctors
      doctors: '',
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
    // Get all assistants
    this.getItems(process.env.VUE_APP_API_URL + `/dashboard/assistants`, this.assistants);

    // Get all doctors
    this.axios
    .get(process.env.VUE_APP_API_URL + `/dashboard/doctors`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    .then((response) => {
      this.doctors = response.data.data.map((doctor) => {
        return {
          text: doctor.full_name,
          value: doctor.id,
        };
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
      files.forEach(element => {
        this.assistantData.photo = element;
      });
    },

    // Add item
    addAssistant() {

      let data = new FormData();
      data.append("full_name[en]", this.assistantData.enName);
      data.append("full_name[ar]", this.assistantData.arName);
      data.append("gender", this.assistantData.gender);
      data.append("email", this.assistantData.email);
      data.append("work_phone", this.assistantData.workPhone);
      data.append("personal_phone", this.assistantData.personalPhone);
      data.append("image", this.assistantData.photo);
      for (let i = 0; i < this.assistantData.doctors.length; i++) {
        data.append(`doctors[]`, this.assistantData.doctors[i]);
      }

      this.addItem(process.env.VUE_APP_API_URL + `/dashboard/assistants`, data, this.assistants, this.assistantData);
    },
    
    // Bind item data
    bindAssistantData(item) {
      // Get single assistants by id
      this.axios
      .get(process.env.VUE_APP_API_URL + `/dashboard/assistants/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.assistantData.email = item.email;
        this.assistantData.personalPhone = item.personal_phone;
        this.assistantData.workPhone = item.personal_phone;
        this.assistantData.gender = JSON.parse(item.gender);
        this.assistantData.doctors = item.doctors.map((doctor) => {
          return {
            text: doctor.full_name,
            value: doctor.id
          }
        });

        if (this.$i18n.locale == "en") {
          this.assistantData.enName = item.full_name;
          this.assistantData.arName = response.data.data.full_name;
        } else {
          this.assistantData.arName = item.full_name;
          this.assistantData.enName = response.data.data.full_name;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateAssistant(item) {

      let data = new FormData();
      data.append("full_name[en]", this.assistantData.enName);
      data.append("full_name[ar]", this.assistantData.arName);
      data.append("gender", this.assistantData.gender);
      data.append("email", this.assistantData.email);
      data.append("work_phone", this.assistantData.workPhone);
      data.append("personal_phone", this.assistantData.personalPhone);
      data.append("image", this.assistantData.photo);
      for (let i = 0; i < this.assistantData.doctors.length; i++) {
        data.append(`doctors[${i}]`, this.assistantData.doctors[i].value);
      }
      data.append("_method", 'PUT');

      this.axios
      .post(process.env.VUE_APP_API_URL + `/dashboard/assistants/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.editDialog = false;
        // empty department data
        this.assistantData = {};
        // success message
        this.$toast.success(response.data.message);
        // update item in array
        this.assistants.splice(this.assistants.indexOf(item), 1, response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Delete item
    deleteAssistant(item) {
      this.deleteItem(process.env.VUE_APP_API_URL + `/dashboard/assistants/${item.id}`, item, this.assistants);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>