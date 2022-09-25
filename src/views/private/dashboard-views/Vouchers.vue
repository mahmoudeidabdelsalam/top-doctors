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
        :items="vouchers"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!vouchers.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Vouchers</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  New Voucher
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Voucher</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field label="Code" required></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field label="Amount"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <v-row justify="center"> </v-row>

        <!-- Acions -->
        <template v-slot:[`item.actions`]="{ item }">
          <!-- Edit item dialog -->
          <v-dialog v-model="editDialog[item.id]" persistent max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ma-2"
                outlined
                x-small
                fab
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="bindVouchersData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Voucher</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="vouchersData.code"
                        label="Code"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="vouchersData.amount"
                        label="Amount"
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
                <v-btn color="blue darken-1" text @click="updateVouchers(item)">
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
                <span class="text-h5">Delete Voucher</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row> Are you sure you want to delete this Voucher? </v-row>
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
                <v-btn color="red darken-1" text @click="deleteVouchers(item)">
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
  name: "Vouchers",
  data() {
    return {
      dialog: false,
      // All vouchers
      vouchers: [
        {
          id: 1,
          code: "1654",
          amount: "500.00",
          status: true,
        },
        {
          id: 2,
          code: "2657",
          amount: "210.00",
          status: true,
        },
        {
          id: 3,
          code: "5456",
          amount: "300.00",
          status: true,
        },
        {
          id: 4,
          code: "4135",
          amount: "250.00",
          status: true,
        },
        {
          id: 5,
          code: "5874",
          amount: "460.00",
          status: true,
        },
      ],
      // search
      search: "",
      // single select
      singleSelect: false,
      // selected vouchers
      selected: [],
      // table headers
      headers: [
        { text: "Code", align: "start", value: "code" },
        { text: "Amount", align: "start", value: "amount" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // vouchers data
      vouchersData: {
        type: "",
        percent: "",
      },
    };
  },
  mounted() {
    // Get all vouchers
    // this.axios
    // .get(`${localStorage.companyApiUrl}/v1/dashboard/vouchers`, { headers: { Authorization: `Bearer ${localStorage.userToken}` }})
    // .then((response) => {
    //   this.vouchers = response.data.data;
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  },
  methods: {
    // Add item
    addVouchers() {
      let data = new FormData();
      data.append("name[en]", this.vouchersData.type);
      data.append("name[ar]", this.vouchersData.percent);

      this.axios
        .post(`${localStorage.companyApiUrl}/v1/dashboard/vouchers`, data, {
          headers: { Authorization: `Bearer ${localStorage.userToken}` },
        })
        .then((response) => {
          // close dialog
          this.newDialog = false;
          // empty vouchers data
          this.vouchersData = {};
          // success message
          this.$toast.success(response.data.message);
          // push new item to array
          this.vouchers.push(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Bind item data
    bindVouchersData(item) {
      // Get single vouchers by id
      this.axios
        .get(`${localStorage.companyApiUrl}/v1/dashboard/vouchers/${item.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.userToken}`,
            lang: this.$i18n.locale === "en" ? "ar" : "en",
          },
        })
        .then((response) => {
          this.vouchersData = response.data.data;
          if (this.$i18n.locale == "en") {
            this.vouchersData.enName = item.name;
            this.vouchersData.arName = response.data.data.name;
            this.vouchersData.enDescription = item.description;
            this.vouchersData.arDescription = response.data.data.description;
          } else {
            this.vouchersData.arName = item.name;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Update item
    updateVouchers(item) {
      let data = new URLSearchParams();
      data.append("name[en]", this.vouchersData.type);
      data.append("name[ar]", this.vouchersData.percent);

      this.axios
        .put(
          `${localStorage.companyApiUrl}/v1/dashboard/vouchers/${item.id}`,
          data,
          {
            "Content-Type": "application/x-www-form-urlencoded",
            headers: { Authorization: `Bearer ${localStorage.userToken}` },
          }
        )
        .then((response) => {
          // close dialog
          this.editDialog = false;
          // empty vouchers data
          this.vouchersData = {};
          // success message
          this.$toast.success(response.data.message);
          // update item in array
          this.vouchers.splice(
            this.vouchers.indexOf(item),
            1,
            response.data.data
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Delete item
    deleteVouchers(item) {
      this.axios
        .delete(
          `${localStorage.companyApiUrl}/v1/dashboard/vouchers/${item.id}`,
          { headers: { Authorization: `Bearer ${localStorage.userToken}` } }
        )
        .then((response) => {
          // close dialog
          this.deleteDialog = false;
          // success message
          this.$toast.success(response.data.message);
          // splice item from array
          this.vouchers.splice(this.vouchers.indexOf(item), 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>
