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
        :items="subscribers"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!subscribers.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Voucher Subscribers</v-toolbar-title>
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
          New Subscriber
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Voucher Subscribers</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                
                md="4"
              >
                <v-text-field
                  label="Recipient"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                
                md="4"
              >
                <v-text-field
                  label="Donor"
                ></v-text-field>
              </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label="Subscribtion date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
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
                @click="bindSubscribersData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Subscribers</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="subscribersData.recipient"
                        label="Tax Type"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="subscribersData.parcent"
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
                      label="date On"
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
                  @click="updateSubscribers(item)"
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
                <span class="text-h5">Delete Subscriber</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this Subscriber?
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
                  @click="deleteSubscribers(item)"
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
  name: "Subscribers",
  data() {
    return {
      dialog: false,
      // All coupones
      subscribers: [
        {
          id:1,
          recipient: '1654',
          donor: '0%',
          date:'24-5-2022',
          status: true,
          amount:'250',
        },
        {
          id:2,
          recipient: '2657',
          donor: '5%',
          date:'24-5-2022',
          status: true,
          amount:'250',
        },
        {
          id:3,
          recipient: '5456',
          donor: '7%',
          date:'24-5-2022',
          status: true,
          amount:'250',
        },
        {
          id:4,
          recipient: '4135',
          donor: '0%',
          date:'24-5-2022',
          status: true,
          amount:'250',
        },
        {
          id:5,
          recipient: '5874',
          donor: '12%',
          date:'24-5-2022',
          status: true,
          amount:'250',
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
        { text: 'Recipient', align: 'start', value: 'recipient' },
        { text: 'Donor', align: 'start', value: 'donor' },
        { text: 'Subscription Date', align: 'start', value: 'date' },
        { text: 'Status', align: 'start', value: 'Status' },
        { text: 'Remaining amount', align: 'start', value: 'amount' },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // Coupones data
      subscribersData: {
        type: "",
        Donor: "",
      }
    }
  },
  mounted() {
    // Get all subscribers
    // this.axios
    // .get(`${localStorage.companyApiUrl}/v1/dashboard/subscribers`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    // .then((response) => {
    //   this.subscribers = response.data.data;
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  },
  methods: {
    // Add item
    addSubscribers() {

      let data = new FormData();
      data.append("name[en]", this.subscribersData.type);
      data.append("name[ar]", this.subscribersData.Donor);

      this.axios
      .post(`${localStorage.companyApiUrl}/v1/dashboard/subscribers`, data, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.newDialog = false;
        // empty subscribers data
        this.subscribersData = {};
        // success message
        this.$toast.success(response.data.message);
        // push new item to array
        this.subscribers.push(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    
    // Bind item data
    bindSubscribersData(item) {
      // Get single subscribers by id
      this.axios
      .get(`${localStorage.companyApiUrl}/v1/dashboard/subscribers/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}`, lang: this.$i18n.locale === 'en' ? 'ar' : 'en' }})
      .then((response) => {
        this.subscribersData = response.data.data;
        if (this.$i18n.locale == "en") {
          this.subscribersData.enName = item.name;
          this.subscribersData.arName = response.data.data.name;
          this.subscribersData.enDescription = item.description;
          this.subscribersData.arDescription = response.data.data.description;
        } else {
          this.subscribersData.arName = item.name;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Update item
    updateSubscribers(item) {

        let data = new URLSearchParams();
        data.append("name[en]", this.subscribersData.type);
        data.append("name[ar]", this.subscribersData.Donor);

        this.axios
        .put(`${localStorage.companyApiUrl}/v1/dashboard/subscribers/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlenrecipientd', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then((response) => {
          // close dialog
          this.editDialog = false;
          // empty subscribers data
          this.subscribersData = {};
          // success message
          this.$toast.success(response.data.message);
          // update item in array
          this.subscribers.splice(this.subscribers.indexOf(item), 1, response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Delete item
    deleteSubscribers(item) {
        this.axios
        .delete(`${localStorage.companyApiUrl}/v1/dashboard/subscribers/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then((response) => {
          // close dialog
          this.deleteDialog = false;
          // success message
          this.$toast.success(response.data.message);
          // splice item from array
          this.subscribers.splice(this.subscribers.indexOf(item), 1);
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