<template>
  <section class='assistant-profile'>
    <v-container fluid>
      <v-row>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
          <div class="assistant-card">
            <div class="image">
              <img :src="assistant.profile" :alt="assistant.full_name">
            </div>
            <span class="name d-block">{{ assistant.full_name }}</span>
            <span class="job d-block">{{ assistant.available ? 'Available' : 'Not available' }}</span>
            <div class="contact-boxs">
              <div class="contact-box">
                <v-icon>mail_outline</v-icon>
                <span class="type">Email</span>
                <span class="sub">{{ assistant.email }}</span>
              </div>
              <div class="contact-box">
                <v-icon>calendar_month</v-icon>
                <span class="type">Birthday</span>
                <span class="sub">{{ assistant.birthday }}</span>
              </div>
            </div>
            <div class="contact-boxs">
              <div class="contact-box">
                <v-icon>call</v-icon>
                <span class="type">Work phone</span>
                <span class="sub">{{ assistant.work_phone }}</span>
              </div>
              <div class="contact-box">
                <v-icon>call</v-icon>
                <span class="type">Personal phone</span>
                <span class="sub">{{ assistant.personal_phone }}</span>
              </div>
            </div>
            <div class="actions">
              <v-dialog
                v-model="notifyDialog"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <button
                    v-bind="attrs"
                    v-on="on"
                    class="action-btn"
                  >
                    <v-icon>notifications_active</v-icon>
                  </button>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">User Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                        >
                          <v-text-field
                            label="Subject"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <v-textarea
                            name="input-7-1"
                            label="Notification in english"
                          ></v-textarea>
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <v-textarea
                            name="input-7-1"
                            label="Notification in arabic"
                            dir="rtl"
                          ></v-textarea>
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <v-text-field
                            label="Footer"
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
                      @click="notifyDialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="notifyDialog = false"
                    >
                      Send Notification
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <button class="action-btn" @click="whatsappChat">
                <v-icon>chat</v-icon>
              </button>
            </div>
            <div class="statistics">
              <div class="statistic mb-3">
                <span class="number">0</span>
                <div class="icon">
                  <v-icon>task</v-icon>
                </div>
                <div class="text">
                  <span class="main-title d-block">Tasks</span>
                </div>
              </div>
              <div class="statistic">
                <span class="number">{{ assistantDoctors.length }}</span>
                <div class="icon">
                  <v-icon>group</v-icon>
                </div>
                <div class="text">
                  <span class="main-title d-block">Doctors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-12">
          <v-card>
            <v-tabs v-model="tab">
              <v-tab>Tasks</v-tab>
              <v-tab>Doctor</v-tab>
              <v-tab>Settings</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <div class="content">
                  <span class="head">Assistant Tasks</span>
                </div>
              </v-tab-item>
              <v-tab-item>
                <div class="content">
                  <span class="head">Assistant Doctor</span>
                  <div class="doctor" v-for="doctor in assistantDoctors" :key="doctor.id">
                    <img :src="doctor.profile" :alt="doctor.full_name">
                    <div class="text">
                      <span class="name">{{ doctor.full_name }}</span>
                      <button>Remove</button>
                    </div>
                  </div>
                </div>
              </v-tab-item>
              <v-tab-item>
                <div class="content">
                  <span class="head">Assistant Settings</span>
                  <v-form v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <v-text-field
                            v-model="formData.first_name"
                            label="First name"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          md="6"
                        >
                          <v-text-field
                            v-model="formData.last_name"
                            label="Last name"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          md="6"
                        >
                          <v-text-field
                            v-model="formData.email"
                            :rules="emailRules"
                            label="Email"
                            type="email"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          md="6"
                        >
                          <v-text-field
                            v-model="formData.phone_number"
                            :rules="phoneNumberRules"
                            label="Phone Number"
                            type="tel"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                        >
                          <v-text-field
                            v-model="formData.national_id"
                            :rules="nationalIdRules"
                            label="National ID"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-btn
                          color="primary"
                          @click="updateAssistant"
                        >
                          Submit
                        </v-btn>
                      </v-row>
                    </v-container>
                  </v-form>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </div>
      </v-row>
    </v-container>
  </section>
</template>

<script>
  export default {
    name: 'AssistantProfile',
    data() {
      return {
        // assistant profile id
        profileId: this.$route.params.profileId,
        // assistant
        assistant: [],
        // assistant doctors
        assistantDoctors: [],
        // tabs
        tab: null,
        // settings form data
        formData: {
          first_name: '',
          last_name: '',
          phone_number: '',
          email: '',
          national_id: '',
        },
        // form validation
        valid: false,
        firstNameRules: [
          v => !!v || 'First name is required',
          v => v.length >= 2 || 'Name must be more than 2 characters',
        ],
        lastNameRules: [
          v => !!v || 'Last name is required',
          v => v.length >= 2 || 'Name must be more than 2 characters',
        ],
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email must be valid',
        ],
        phoneNumberRules: [
          v => !!v || 'Phone number is required',
          v => /.+@.+/.test(v) || 'National id must be 13 number',
        ],
        nationalIdRules: [
          v => !!v || 'National id is required',
          v => /.+@.+/.test(v) || 'National id must be 13 number',
        ],
        // notify dialog
        notifyDialog: false,
      }
    },
    mounted() {
      // Get assistant
      this.axios
      .get(process.env.VUE_APP_API_URL + `/dashboard/assistants/${this.profileId}`, { headers: { Authorization: `Bearer ${localStorage.userToken}` } })
      .then((response) => {
        this.assistant = response.data.data
        this.formData = response.data.data
        this.assistantDoctors = response.data.data.doctors
      })
      .catch((error) => {
        this.handleErrors(error);
      });
    },
    methods: {
      whatsappChat() {
        window.open(
          `https://wa.me/${this.assistant.work_phone}`,
          '_blank'
        );
      },
      updateAssistant() {
        let data = new FormData();
        data.append('enName', this.formData.enName);
        data.append('arName', this.formData.arName);
        data.append('email', this.formData.email);
        data.append('personal_phone', this.formData.personal_phone);
        data.append('work_phone', this.formData.work_phone);
        data.append('national_id', this.formData.national_id);
        data.append('birthday', this.formData.birthday);

        this.axios
        .put(process.env.VUE_APP_API_URL + `/dashboard/assistants/${this.profileId}`, data, { headers: { Authorization: `Bearer ${localStorage.userToken}` } })
        .then((response) => {
          this.assistant = response.data.data
          // success message
          this.$toast.success(response.data.message)
        })
        .catch((error) => {
          this.handleErrors(error);
        });
      }
    }
  };
</script>

<style lang='scss' scoped>
  .assistant-profile {
    padding: 20px;

    .assistant-card {
      padding: 30px;
      background-color: var(--white-color);
      border-radius: 4px;

      .image {
        width: 100px;
        height: 100px;
        margin: 0 auto 10px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: auto;
          object-fit: cover;
          object-position: top;
        }
      }

      .name {
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        color: var(--dark-color);
      }

      .job {
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: var(--secondary-color);
        margin-bottom: 30px;
      }

      .contact-boxs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        @media (max-width: 767px) {
          flex-wrap: wrap;
          gap: 10px;
        }

        .contact-box {
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: flex-start;
          gap: 5px;
          min-width: 125px;

          .type {
            font-size: 14px;
            font-weight: 500;
            color: var(--dark-color);
          }

          .sub {
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            color: var(--secondary-color);
          }
        }
      }

      .actions {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 30px;

        button {
          padding: 15px;
          background-color: var(--sky-color);
          border-radius: 4px;
          &:hover {
            background-color: var(--main-color);
            .v-icon {
              color: var(--white-color);
            }
          }

          .v-icon {
            color: var(--main-color);
          }
        }
      }

      .statistics {
        .statistic {
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 15px;
          background-color: var(--sky-color);
          border-radius: 4px;
          padding: 20px;

          .number {
            font-size: .8125rem;
            font-weight: 500;
            color: var(--dark-color);
          }

          .icon {
            padding: 12px;
            background-color: var(--main-color);
            border-radius: 8px;
            .v-icon {
              color: var(--white-color);
            }
          }

          .text {
            .main-title {
              font-size: 1rem;
              font-weight: 500;
              color: var(--dark-color);
            }

            .subtitle {
              font-size: .8125rem;
              font-weight: 400;
              color: var(--secondary-color);
            }
          }
        }
      }
    }
    
    .v-card {
      .content {
        padding: 20px;

        .head {
          display: block;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--dark-color);
          margin-bottom: 20px;
        }

        .doctor {
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 10px;

          img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            object-position: top;
            border-radius: 4px;
          }

          .text {
            .name {
              display: block;
              font-size: 1rem;
              font-weight: 500;
              color: var(--dark-color);
              margin-bottom: 5px;
            }

            button {
              padding: 5px 10px;
              border-radius: 2000px;
              font-size: .8125rem;
              font-weight: 400;
              background-color: var(--sky-color);
              color: var(--danger-color);
            }
          }
        }
      }
    }
  }
</style>