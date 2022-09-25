<template>
  <section class="depart-profile">
    <v-container fluid>
      <v-row>
        <v-col class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">

          <!-- Patient Section -->
          <div class="depart-card">
            <span class="title d-block">Patient</span>
            <div class="image">
              <img
                src="https://the360.marketing//uploads/admin/companies/images/employee.jpg"
                alt=""
              />
            </div>
            <span class="name d-block">{{
              reservation.patient.full_name
            }}</span>
            <div class="contact-box">
              <span class="sub">{{ reservation.patient.email }}</span>
              <span class="sub">{{ reservation.patient.phone_number }}</span>
            </div>
          </div>
              
          <!-- Doctor Section -->
          <div class="depart-card">
            <span class="title d-block">Doctor</span>
            <div class="image">
              <img :src="reservation.doctor.profile" alt="" />
            </div>
            <span class="name d-block">{{ reservation.doctor.full_name }}</span>
            <div class="contact-box">
              <span class="sub">{{ reservation.doctor.email }}</span>
              <span class="sub">{{ reservation.doctor.phone_number }}</span>
            </div>
            <v-spacer></v-spacer>
            <div class="contact-box">
              <span class="name d-block">Department</span>
              <span class="sub">{{ reservation.doctor.department.name }}</span>
            </div>
          </div>

          <!-- Invoice Section -->
          <div class="depart-card">
            <span class="title d-block">Invoice</span>
            <div class="content">
              <v-col class="name">
                <span style="margin-right: 10px">{{
                  reservation.invoice.sub_total
                }}</span>
                <span>{{ reservation.invoice.currency }} - </span>
                <span>{{ reservation.invoice.status }}</span>
              </v-col>
              <v-col class="name">
                <span>{{ reservation.invoice.is_paid }}</span>
              </v-col>
            </div>
          </div>
        
        </v-col>

        <!-- Medical Tests Section -->
        <v-col class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
            <div class="depart-card">
              <span class="title d-block">Medical Tests</span>
              <div class="content">
                <div class="image">
                  <img src="" alt="" />
                </div>
                <v-col class="name">
                  <span>Test Name</span>
                </v-col>

                <v-col class="name">
                  <span style="margin-right: 10px">54.65</span>
                  <span>EUR</span>
                </v-col>

                <v-col class="name">
                  <template>
                    <v-chip
                      :color="getColorIsPaid(reservation.invoice.is_paid)"
                      dark
                    >
                      <div v-if="reservation.invoice.is_paid == 'Paid'">
                        Paid
                      </div>
                      <div v-if="reservation.invoice.is_paid == 'Unpaid'">
                        Un Paid
                      </div>
                    </v-chip>
                  </template>
                </v-col>

                <v-col class="name">
                  <template>
                    <v-chip
                      :color="getColorStatus(reservation.invoice.status)"
                      dark
                    >
                      <div v-if="reservation.invoice.status == 'Pending'">
                        Pending
                      </div>
                      <div v-if="reservation.invoice.status == 'Completed'">
                        Completed
                      </div>
                      <div v-if="reservation.invoice.status == 'Cancelled'">
                        Cancelled
                      </div>
                    </v-chip>
                  </template>
                </v-col>

                <v-col>
                  <template v-slot:[`item.actions`]="{ item }">
                    <!-- Edit item dialog -->
                    <v-dialog
                      v-model="editDialog[item.id]"
                      persistent
                      max-width="700px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="ma-1"
                          outlined
                          x-small
                          fab
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Edit Invoice</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row> Update Invoice. </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text> Close </v-btn>
                          <v-btn color="blue darken-1" text> Save </v-btn>
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
                          class="ma-1"
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
                          <span class="text-h5">Delete Invoice</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              Are you sure you want to delete this Invoice?
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text> Close </v-btn>
                          <v-btn color="red darken-1" text> Yes, Delete </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                </v-col>
              </div>
            </div>

          <!-- Medicine Section -->
          <div class="depart-card">
            <span class="title d-block">Medicine</span>
            <v-data-table
              height="auto"
              :headers="headers"
              show-select
              class="elevation-1"
              loading-text="Loading... Please wait"
            >
            </v-data-table>
          </div>

        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "ReservationProfile",
  data() {
    return {
      // reservation profile id
      profileId: this.$route.params.profileId,
      // reservation
      reservation: [],
      //doctors
      doctors: [
        {
          id: 1,
          name: "doc1",
          profile:
            "https://the360.marketing//uploads/admin/companies/images/doctor.jpg",
          setion_price: "200 SR",
        },
      ],
      //headers
      headers: [
        { text: "Name", value: "" },
        { text: "Dose", value: "" },
        { text: "Duration", value: "" },
        { text: "Frequency", value: "" },
        { text: "Delete", value: "" },
      ],
    };
  },
  mounted() {
    // Get reservation
    this.axios
      .get(
        `${localStorage.companyApiUrl}/dashboard/reservations/${this.profileId}`,
        { headers: { Authorization: `Bearer ${localStorage.userToken}` } }
      )
      .then((response) => {
        this.reservation = response.data.data;
      })
      .catch((error) => {
        this.handleErrors(error);
      });
  },
  methods: {
    whatsappChat() {
      console.log(window.location.port);
    },
    getColorIsPaid(is_paid) {
      if (is_paid == "Paid") return "green";
      else if (is_paid == "Unpaid") return "red";
    },
    getColorStatus(status) {
      if (status == "Pending") return "orange";
      else if (status == "Completed") return "green";
      else if (status == "Cancelled") return "red";
    },
  },
};
</script>

<style lang="scss" scoped>
.depart-profile {
  padding: 20px;

  .content {
    display: flex;
    justify-content: space-around;
    align-content: center;
    align-items: center;
  }
  .depart-card {
    padding: 30px;
    background-color: var(--white-color);
    border-radius: 4px;
    margin-bottom: 25px;

    .image {
      width: 100px;
      height: 100px;
      margin: 0 auto 10px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
    }

    .name {
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      color: var(--dark-color);
    }

    .title {
      text-align: start;
      font-size: 16px;
      font-weight: 500;
      color: var(--dark-color);
      margin-bottom: 20px;
    }

    .dr-title {
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: var(--secondary-color);
    }

    .description {
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: var(--secondary-color);
      margin-bottom: 30px;
    }

    .contact-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 25px;
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

    .actions {
      display: flex;
      justify-content: space-around;
      align-items: center;

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
        font-size: 0.8125rem;
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
          font-size: 0.8125rem;
          font-weight: 400;
          color: var(--secondary-color);
        }
      }
    }
  }
}
</style>
