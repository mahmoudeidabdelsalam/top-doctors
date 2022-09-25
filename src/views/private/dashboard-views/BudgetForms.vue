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
        :items="forms"
        item-key="id"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        class="elevation-1"
        item-class="best-selling-item"
        :loading="!forms.length"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <!-- top -->
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Budget Forms</v-toolbar-title>
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
                  New Budget Form
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Budget Form</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="formData.name"
                          label="Name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="formData.form_id"
                          label="Form name"
                          required
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
                              v-model="formData.start_date"
                              label="Start date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="formData.start_date"
                            @input="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
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
                              v-model="formData.end_date"
                              label="End date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="formData.end_date"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="formData.daily_budget"
                          type="number"
                          label="Daily budget"
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
                    @click="newDialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="addBudgetForm"
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
                @click="bindBudgetFormData(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Budget Form</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="formData.name"
                        label="Name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="formData.form_id"
                        label="Form name"
                        required
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
                            v-model="formData.start_date"
                            label="Start date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="formData.start_date"
                          @input="menu1 = false"
                        ></v-date-picker>
                      </v-menu>
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
                            v-model="formData.end_date"
                            label="End date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="formData.end_date"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="formData.daily_budget"
                        type="number"
                        label="Daily budget"
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
                  @click="updateBudgetForm(item)"
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
                <span class="text-h5">Delete Budget Form</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    Are you sure you want to delete this budget form?
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
                  @click="deleteBudgetForm(item)"
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
  name: "BudgetForms",
  data() {
    return {
      // All forms
      forms: [],
      // search
      search: '',
      // single select
      singleSelect: false,
      // selected form
      selected: [],
      // table headers
      headers: [
        { text: 'Form', align: 'start', value: 'name' },
        { text: 'Daily budget', align: 'start', value: 'daily_budget' },
        { text: 'Start date', align: 'start', value: 'start_date' },
        { text: 'End date', align: 'start', value: 'end_date' },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      // dialogs
      newDialog: false,
      editDialog: {},
      deleteDialog: {},
      // form data
      formData: {
        name: "",
        form_id: "",
        start_date: "",
        end_date: "",
        daily_budget: "",
      },
      // daet picker
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
    }
  },
  mounted() {
    // Get all budget forms
    this.getItems(`${localStorage.companyApiUrl}/dashboard/budgets-forms`, this.forms);
  },
  mixins: [crudActionsMixins],
  methods: {
    // Add item
    addBudgetForm() {

      let data = new FormData();
      data.append("name", this.formData.name);
      data.append("form_id", this.formData.form_id);
      data.append("start_date", this.formData.start_date);
      data.append("end_date", this.formData.end_date);
      data.append("daily_budget", this.formData.daily_budget);

      this.addItem(`${localStorage.companyApiUrl}/dashboard/budgets-forms`, data, this.forms, this.formData);
    },
    
    // Bind item data
    bindBudgetFormData(item) {
      this.formData = item;
    },

    // Update item
    updateBudgetForm(item) {

      let data = new URLSearchParams();
      data.append("name", this.formData.name);
      data.append("form_id", this.formData.form_id);
      data.append("start_date", this.formData.start_date);
      data.append("end_date", this.formData.end_date);
      data.append("daily_budget", this.formData.daily_budget);

      this.axios
      .put(`${localStorage.companyApiUrl}/v1/dashboard/budgets-forms/${item.id}`, data, { 'Content-Type': 'application/x-www-form-urlencoded', headers: { Authorization: `Bearer ${localStorage.userToken}` }})
      .then((response) => {
        // close dialog
        this.editDialog = false;
        // empty form data
        this.formData = {};
        // success message
        this.$toast.success(response.data.message);
        // update item in array
        this.forms.splice(this.forms.indexOf(item), 1, response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Delete item
    deleteBudgetForm(item) {
      this.deleteItem(`${localStorage.companyApiUrl}/v1/dashboard/budgets-forms/${item.id}`, item, this.forms);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/private/_datatable-page.scss";
</style>