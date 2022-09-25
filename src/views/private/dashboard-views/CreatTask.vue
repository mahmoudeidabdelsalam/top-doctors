<template>
  <div>

    <b-button id="New-btn" @click="showNew" class="mx-3 btn-theme" variant="primary">
      <i class="fa-solid fa-circle-plus mr-3"></i>
      <span>{{ pageData.addNew }}</span>
    </b-button>

    <b-modal ref="my-new" centered hide-footer hide-header size="lg">
      <div class="d-block">
        <h3 class="title">{{ pageData.AddTitle }}</h3>
        <p>{{ pageData.EnterAll }}</p>



        <b-form v-if="show" @submit.prevent="checkDate()" id="Newappointment" class="dashboard-form">
          <div class="row">

          
            <div class="form-group mt-2 col-lg-12 col-md-12" id="input-group-1">
                <label id="input-group-label-1" for="input-1" class="d-block">{{ pageData.title }}</label>
                <input type="textarea" class="form-control" placeholder="title" required>
            </div>

            <div class="form-group mt-2 col-lg-12 col-md-12" id="input-group-2">
              <label id="input-group-label-2" for="input-2" class="d-block">{{ pageData.status }}</label>
              <select  id="input-2" required="required" aria-required="true" class="form-control custom-select">
                <option value="op1">Follow Up</option>
                <option value="op2">New</option>
              </select>
            </div>
          
            <div id="datesAvailable"></div>

            <div class="mt-3 form-footer">
                <button @click="hideNew" class="btn btn-outline-primary btn-theme">{{ pageData.Cancel }}</button>
                <button type="button" class="btn btn-primary btn-theme mx-3">{{ pageData.Add }}</button>
            </div> 


          </div> 
        </b-form>



      </div>
    </b-modal>

  </div>
</template>

<script>
  // Languages
  import enAppointments from "../../../components/languages/pages/dashboard/my-tasks/en_my-tasks.json";
  import arAppointments from "../../../components/languages/pages/dashboard/my-tasks/ar_my-tasks.json";


  export default {
    name:"CreateTask",
    data() {
      return {
        pageLang: window.localStorage.lang,
        appointments: null,
        userToken: JSON.parse(window.localStorage.userToken),
        // Form
        form: {
          customer: null,
          doctor: null,
          date: null,
          time: null,
        },
        // show form
        show: true,
        doctors: [],
        employees: [],
        availableDate: [],
      }
    },
        
    created() {
      // Set page fixed data
      if (window.localStorage.lang === "en") {
          this.pageData = enAppointments;
      } else {
          this.pageData = arAppointments;
      }
    },

    methods: {
      
      addnewAppointments() {
        let data = new FormData();

        var date = new Date(this.form.date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear(); 

        var NewDate = day + '-' + month + '-' + year;

        var time = $('input[name="time"]:checked').val();

        data.append("client_id", this.form.customer);
        data.append("doctor_id", this.form.doctor);
        data.append("date", NewDate);
        data.append("time", time);

        this.axios.post(`${window.localStorage.companyApiUrl}/v1/dashboard/appointments`, data, { headers: { Authorization: `Bearer ${this.userToken}` }}).then((response) => {
          this.$refs['my-new'].hide();
          this.form = {};
          this.$snotify.success(response.data.message);

          setTimeout( function() {
            window.location.reload();
          }, 300);
        })
        .catch((error) => {
          this.invalids = error.response.data.errors;
          console.log(this.invalids);
          for (let [key, value] of Object.entries(this.invalids)) {
            this.$snotify.error(`${value}`);
          }
        });
      },

      checkDate() {
        let data = new FormData();
        
        var date = new Date(this.form.date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear(); 

        var NewDate = day + '-' + month + '-' + year;

        data.append("doctor_id", this.form.doctor);
        data.append("appointment_date", NewDate);


        this.axios.post(`${window.localStorage.companyApiUrl}/v1/dashboard/appointments/get-available-dates`, data, { headers: { Authorization: `Bearer ${this.userToken}` }}).then((response) => {
          $('#datesAvailable').html("");
          this.$snotify.success(response.data.message);
          this.availableDate = response.data.data;
          console.log(this.availableDate);
          for (let i = 0; i < this.availableDate.length; i++) {
            $('#datesAvailable').append(`<div class="custom-radio"><input id="time${i}" type="radio" name="time" value="${this.availableDate[i]}"> <label for="time${i}">${this.availableDate[i]}</label></div>`);
          };
        })
        .catch((error) => {
          this.invalids = error.response.data.errors;
          console.log(this.invalids);
          for (let [key, value] of Object.entries(this.invalids)) {
            this.$snotify.error(`${value}`);
          }
        });
      },


      showNew() {
        this.$refs['my-new'].show();
        // Get all employees
        this.axios.get(`${window.localStorage.companyApiUrl}/v1/dashboard/employees`, { headers: { Authorization: `Bearer ${this.userToken}`, lang: this.pageLang }}).then((response) => {
          this.employees = response.data.data;
          for (let i = 0; i < this.employees.length; i++) {
            $('#input-1').append(`<option value="${this.employees[i].id}" label="${this.employees[i].full_name}"></option>`);
          };
        }).catch((error) => {
          console.log(error);
        });

        // Get all Doctors
        this.axios.get(`${window.localStorage.companyApiUrl}/v1/dashboard/doctors`, { headers: { Authorization: `Bearer ${this.userToken}`, lang: this.pageLang }}).then((response) => {
          this.doctors = response.data.data;
          for (let i = 0; i < this.doctors.length; i++) {
            $('#input-2').append(`<option value="${this.doctors[i].id}" label="${this.doctors[i].full_name}"></option>`);
          };
        }).catch((error) => {
          console.log(error);
        });

      },

      hideNew() {
        this.$refs['my-new'].hide();
      },
    }
  }
</script>

<style>
::-webkit-input-placeholder {
  color: #ccc;
  font-size: 12px;
}

:-ms-input-placeholder {
  color: #ccc;
  font-size: 12px;
}

::placeholder {
  color: #ccc;
  font-size: 12px;
}

.title {
  font-size: 26px;
  font-weight: 500;
  color: #164db0;
  margin-bottom: 0;
  text-transform: capitalize;
}

.form-control {
    padding: 20px;
    border-radius: 18px;
    border: 1px solid #d5d9e0;
    font-size: 14px;
    color: #808080;
}

div#datesAvailable {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
}

div#datesAvailable .custom-radio {
    margin: 10px;
}

div#datesAvailable .custom-radio label {
    border: 1px solid #ccc;
    padding: 10px;
    cursor: pointer;
}

div#datesAvailable .custom-radio [type="radio"] {
    display: none;
}

div#datesAvailable .custom-radio [type="radio"]:checked + label {
    background: green;
    color: var(--white-color);
}
</style>