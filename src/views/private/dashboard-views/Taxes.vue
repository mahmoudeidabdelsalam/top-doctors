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
        :items="taxes"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!taxes.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Taxes</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
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
                @click="bindTaxesData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Tax</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="taxesData.type"
                        label="Tax Type"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="taxesData.percent"
                        label="Parcent"
                        dir="rtl"
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
                  @click="updateTaxes(item)"
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
                <span class="text-h5">Delete Tax</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this Tax?
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
                  @click="deleteTaxes(item)"
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
  name: "Taxes",
  data() {
    return {
      // All taxes
      taxes: [
        {
          id:1,
          type:'Samantha Keller',
          percent: '0%',
          status: true,
        },
        {
          id:2,
          type:'Idola Salasdsds',
          percent: '5%',
          status: true,
        },
        {
          id:3,
          type:'Irure eum et dolorib',
          percent: '7%',
          status: true,
        },
        {
          id:4,
          type:'Deserunt assumenda n',
          percent: '0%',
          status: true,
        },
        {
          id:5,
          type:'Samantha Keller',
          percent: '12%',
          status: true,
        },
        
      ],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected taxes
      selected: [],
      // table headers
      headers: [
        { text: 'Type', align: 'start', value: 'type' },
        { text: 'Percent', align: 'start', value: 'percent' },
        { text: 'Status', align: 'start', value: 'switch' },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // taxes data
      taxesData: {
        type: "",
        percent: "",
      }
    }
  },
  mounted() {
    // Get all taxes
    // this.axios
    // .get(process.env.VUE_APP_API_URL + `/v1/dashboard/taxes`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    // .then((response) => {
    //   this.taxes = response.data.data;
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  },

  methods: {
    // Add item
    addTaxes() {

      let data = new FormData();
      data.append("name[en]", this.taxesData.type);
      data.append("name[ar]", this.taxesData.percent);

      this.axios
      .post(process.env.VUE_APP_API_URL + `/v1/dashboard/services`, data, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.newDialog = false;
        // empty Taxes data
        this.taxesData = {};
        // success message
        this.$toast.success(response.data.message);
        // push new item to array
        this.taxes.push(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    
    // Bind item data
    bindTaxesData(item) {
      this.taxesData=item
    },

    // Update item
    updateTaxes(item) {

        let data = new URLSearchParams();
        data.append("name[en]", this.taxesData.type);
        data.append("name[ar]", this.taxesData.percent);

        this.axios
        .put(process.env.VUE_APP_API_URL + `/v1/dashboard/services/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then((response) => {
          // close dialog
          this.editDialog = false;
          // empty taxes data
          this.taxesData = {};
          // success message
          this.$toast.success(response.data.message);
          // update item in array
          this.taxes.splice(this.taxes.indexOf(item), 1, response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Delete item
    deleteTaxes(item) {
        this.axios
        .delete(process.env.VUE_APP_API_URL + `/v1/dashboard/services/${item.id}`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
        .then((response) => {
          // close dialog
          this.deleteDialog = false;
          // success message
          this.$toast.success(response.data.message);
          // splice item from array
          this.taxes.splice(this.taxes.indexOf(item), 1);
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