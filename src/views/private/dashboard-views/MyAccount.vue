<template>
  <section class="datatable-page">
    <v-container fluid>
      <div class="col">
        <div class="dashboard-section-heading">
          <span class="title">{{ $t('MyAccount.pageTitle') }}</span>
          <p>{{ $t('MyAccount.pageDescription') }}</p>
        </div>
      </div>
      <div class="col">
        <v-card>
          <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="#164DB0"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item"> {{ item }} </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <!-- Profile -->
            <v-tab-item> 
              <v-card flat>
                <div class="bg-white border-rounded p-4">
                  <div class="row justify-content-center">
                    <div v-if="loading" class="loading">
                      <div class="spinner"></div>
                    </div>

                    <div class="col-md-3 col-12 h-100">
                      <UploadImages @changed="handleImages" :max="1" uploadMsg="Profile Image" maxError="Max files exceed" fileError="images files only accepted" clearAll="Remove all"/>
                    </div>

                    <div class="form-group col-md-5 col-sm-12 col-12">
                      <v-container fluid> 
                        <v-text-field  v-model="name"  :counter="20"  :rules="nameRules" :error-messages="errors" :label="$t('MyAccount.ArName')"  required></v-text-field>
                      </v-container>

                      <v-container fluid > 
                        <v-text-field  v-model="name"  :counter="20"  :rules="nameRules" :error-messages="errors" :label="$t('MyAccount.EnName')"  required></v-text-field>
                      </v-container>

                      <validation-observer  ref="observer">
                        <form @submit.prevent="submit">
                          <v-container fluid>
                            <v-text-field  v-model="phoneNumber" :counter="11" :error-messages="errors" :label="$t('MyAccount.Phone')"  required></v-text-field>
                          </v-container>
                        </form>
                      </validation-observer>

                      <v-container fluid>
                        <v-text-field  v-model="email"  :error-messages="errors"  :label="$t('MyAccount.Email')" required></v-text-field>
                      </v-container>

                      <v-container fluid>
                        <v-textarea  clearable  clear-icon="mdi-close-circle"  :label="$t('MyAccount.ArDesc')"  value="Ar Discription"></v-textarea>
                      </v-container> 

                      <v-container fluid>
                        <v-textarea  clearable  clear-icon="mdi-close-circle"  :label="$t('MyAccount.EnDesc')"  value="En Discription"></v-textarea>
                      </v-container> 

                      <v-container fluid>
                        <v-select  v-model="select"  :items="clinics"  :error-messages="errors"  :label="$t('MyAccount.DentalClinic')"  data-vv-name="select"  required></v-select>
                      </v-container>


                      <v-row>
                        <v-switch  v-model="showMessages"  :label="$t('MyAccount.SubsidiarySet')" ></v-switch>
                      </v-row>   

                     
                      <v-btn   color="primary"  class="mr-4"  @click="validate">
                        {{$t('MyAccount.Update' )}}
                      </v-btn>      
                    </div>
                  </div>
                </div>
              </v-card>
            </v-tab-item>

            <!-- Clinic Info -->
            <v-tab-item>
              <div class="bg-white border-rounded p-4">
                <div class="row justify-content-center">
                  <div v-if="loading" class="loading">
                    <div class="spinner"></div>
                  </div>
                  <div class="form-group p-l-25 p-r-25 col-md-6 col-sm-12 col-12">
                    <v-container fluid>
                      <v-select  v-model="select"  :items="clinics"  :error-messages="errors"  :label="$t('MyAccount.Country')"  data-vv-name="select"  required></v-select>
                    </v-container> 
                    <v-container fluid>
                      <v-select  v-model="select"  :items="clinics"  :error-messages="errors"  :label="$t('MyAccount.City')"  data-vv-name="select"  required></v-select>
                    </v-container>
                    <v-container fluid>
                      <v-textarea  clearable  clear-icon="mdi-close-circle"  :label="$t('MyAccount.ArAddress')"  value="Ar Address"></v-textarea>
                    </v-container> 
                    <v-container fluid>
                      <v-textarea  clearable  clear-icon="mdi-close-circle"  :label="$t('MyAccount.EnAddress')"  value="En Address"></v-textarea>
                    </v-container>
                    <v-btn  color="primary"  class="mr-4"  @click="validate">
                      {{$t('MyAccount.Update' )}}
                    </v-btn> 
                  </div>
                </div>
              </div>
            </v-tab-item>

            <!-- Social Media -->
            <v-tab-item>
              <div class="bg-white border-rounded p-4">
                <div class="row justify-content-center">
                  <div v-if="loading" class="loading">
                    <div class="spinner"></div>
                  </div>
                  <div class="form-group p-l-25 p-r-25 col-md-8 col-12">
                    <v-container fluid>
                      <v-text-field v-model="urlString" :placeholder="$t('MyAccount.Facebook')" :rules="rules"
                        :error-messages="errors"> </v-text-field>
                    </v-container>
                    <v-container fluid>
                      <v-text-field v-model="urlString" :placeholder="$t('MyAccount.Twitter')" :rules="rules"
                        :error-messages="errors"> </v-text-field>
                    </v-container>
                    <v-container fluid>
                      <v-text-field v-model="urlString" :placeholder="$t('MyAccount.Instagram')" :rules="rules"
                        :error-messages="errors"> </v-text-field>
                    </v-container>
                    <v-container fluid>
                      <v-text-field v-model="urlString" :placeholder="$t('MyAccount.Website')" :rules="rules"
                        :error-messages="errors"> </v-text-field>
                    </v-container>
                    <br><br>
                    <v-btn color="primary" class="mr-4" @click="validate">
                      {{ $t('MyAccount.Update') }}
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-tab-item>

            <!-- General Info -->
            <v-tab-item>
              <div class="bg-white border-rounded p-4">
                <div class="row justify-content-center">
                  <div v-if="loading" class="loading">
                    <div class="spinner"></div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12 col-12">
                    <v-container fluid>
                      <v-textarea clearable clear-icon="mdi-close-circle" :label="$t('MyAccount.ArAboutApp')"
                        value="Ar About App .."></v-textarea>
                    </v-container>
                    <v-container fluid>
                      <v-textarea clearable clear-icon="mdi-close-circle" :label="$t('MyAccount.EnAboutApp')"
                        value="En About App .."></v-textarea>
                    </v-container>
                    <br><br>
                    <v-btn color="primary" class="mr-4" @click="validate">
                      {{$t('MyAccount.Update' )}}
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>
    </v-container>
  </section>
</template>

<script>
import UploadImages from "vue-upload-drop-images";

export default {
  name: "MyAccount",
  components: {UploadImages},
  data() {
    return {
    
      tab: null,
      items: [
        'Profile', 'Clinic Info', 'Social Media', 'General Info',
      ],

      clinics: [
        'Clinic 1', 'Clinic 2' ,'Clinic 3' ,'Clinic 4' ,'Clinic 5'
      ], 
   
      departments: [],
      userToken: localStorage.userToken,
      pageLang: window.localStorage.lang,
      table: "",
      loading: true,
    };
  },

  mounted() {
    this.ShowList();
  },

  created() {
  },

  methods: {

    // Handle item image
    handleImages(files){
      files.forEach(element => {
        this.assistantData.photo = element;
      });
    },

    // Delete departments
    submit () {
      this.$refs.observer.validate()
    },
    
    clear () {
      this.name = ''
      this.phoneNumber = ''
      this.email = ''
      this.select = null
      this.checkbox = null
      this.$refs.observer.reset()
    },

    deleteAppointment(departments) {
      this.axios
        .delete(
          `${window.localStorage.companyApiUrl}/v1/dashboard/departments/${departments.id}`,
          { headers: { Authorization: `Bearer ${this.userToken}` } }
        )
        .then((response) => {
          this.ShowList();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ShowList: function () {
      this.loading = true;
      // Get all departments
      this.axios
        .get(`${window.localStorage.companyApiUrl}/v1/dashboard/departments`, {
          headers: {
            Authorization: `Bearer ${this.userToken}`,
            lang: this.pageLang,
          },
        })
        .then((response) => {
          this.departments = response.data.data;
          setTimeout(
            () =>
              (this.table = $("#datatable").DataTable({
                aoColumnDefs: [
                  { bSortable: false, aTargets: [0, 1, 2, 3, 4, 5] },
                ],
                language: {
                  searchPlaceholder: "Search...",
                  paginate: {
                    previous: "<",
                    next: ">",
                  },
                },
              }))
          );
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>