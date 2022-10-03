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
        :items="coupones"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!coupones.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Coupones</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
                <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          New Coupone
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Coupone</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                
                md="4"
              >
                <v-text-field
                  label="Code"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                
                md="4"
              >
                <v-text-field
                  label="Percent"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                
                md="4"
              >
                <v-select
                  :items="['department 1', 'department 2', 'department 3', 'department 4']"
                  label="Discount On"
                  required
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
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
          </v-toolbar>
        </template>

  <v-row justify="center">

  </v-row>
  
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
                @click="bindCouponesData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Coupone</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="couponesData.code"
                        label="Tax Type"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="couponesData.parcent"
                        label="Parcent"
                        dir="rtl"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                    <v-select
                      :items="['department 1', 'department 2', 'department 3', 'department 4']"
                      label="Discount On"
                      required
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
                  @click="updateCoupones(item)"
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
                <span class="text-h5">Delete Coupone</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this Coupone?
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
                  @click="deleteCoupones(item)"
                >
                  Yes, Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>

        <template slot="item.switch" slot-scope="{ item }">
            <v-switch v-model="item.switch"></v-switch>
        </template>

        
      </v-data-table>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Coupones",
  data() {
    return {
      dialog: false,
      // All coupones
      coupones: [
        {
          id:1,
          code: '1654',
          percent: '0%',
          discount:'department 1',
          status: true,
        },
        {
          id:2,
          code: '2657',
          percent: '5%',
          discount:'department 2',
          status: true,
        },
        {
          id:3,
          code: '5456',
          percent: '7%',
          discount:'department 3',
          status: true,
        },
        {
          id:4,
          code: '4135',
          percent: '0%',
          discount:'department 4',
          status: true,
        },
        {
          id:5,
          code: '5874',
          percent: '12%',
          discount:'department 5',
          status: true,
        },
        
      ],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected coupones
      selected: [],
      // table headers
      headers: [
        { text: 'Code', align: 'start', value: 'code' },
        { text: 'Percent', align: 'start', value: 'percent' },
        { text: 'Discount on', align: 'start', value: 'discount' },
        { text: 'Status', align: 'start', value: 'switch' },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // Coupones data
      couponesData: {
        type: "",
        percent: "",
      }
    }
  },
  mounted() {
  },
  methods: {
    // Add item
    addCoupones() {

      let data = new FormData();
      data.append("name[en]", this.couponesData.type);
      data.append("name[ar]", this.couponesData.percent);

      this.axios
      .post(process.env.VUE_APP_API_URL + `/v1/dashboard/coupones`, data, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.newDialog = false;
        // empty coupones data
        this.couponesData = {};
        // success message
        this.$toast.success(response.data.message);
        // push new item to array
        this.coupones.push(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    
    // Bind item data
    bindCouponesData(item) {
      // Get single coupones by id
      this.axios
      .get(process.env.VUE_APP_API_URL + `/v1/dashboard/coupones/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.couponesData = response.data.data;
        if (this.$i18n.locale == "en") {
          this.couponesData.enName = item.name;
          this.couponesData.arName = response.data.data.name;
          this.couponesData.enDescription = item.description;
          this.couponesData.arDescription = response.data.data.description;
        } else {
          this.couponesData.arName = item.name;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateCoupones(item) {

        let data = new URLSearchParams();
        data.append("name[en]", this.couponesData.type);
        data.append("name[ar]", this.couponesData.percent);

        this.axios
        .put(process.env.VUE_APP_API_URL + `/v1/dashboard/coupones/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then((response) => {
          // close dialog
          this.editDialog = false;
          // empty coupones data
          this.couponesData = {};
          // success message
          this.$toast.success(response.data.message);
          // update item in array
          this.coupones.splice(this.coupones.indexOf(item), 1, response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Delete item
    deleteCoupones(item) {
        this.axios
        .delete(process.env.VUE_APP_API_URL + `/v1/dashboard/coupones/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then((response) => {
          // close dialog
          this.deleteDialog = false;
          // success message
          this.$toast.success(response.data.message);
          // splice item from array
          this.coupones.splice(this.coupones.indexOf(item), 1);
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