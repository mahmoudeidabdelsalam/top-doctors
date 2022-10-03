<template>
  <section class='doctor-profile'>
    <v-container fluid>
      <v-row>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
          <div class="doctor-card">
            <div class="image">
              <img :src="doctor.profile" :alt="doctor.full_name">
            </div>
            <span class="name d-block">{{ doctor.full_name }}</span>
            <span class="job d-block">{{ doctor.title }}</span>
            <p class="description">
              {{ doctor.description }}
            </p>
            <div class="contact-boxs">
              <div class="contact-box">
                <v-icon>mail_outline</v-icon>
                <span class="type">Email</span>
                <span class="sub">{{ doctor.email }}</span>
              </div>
              <div class="contact-box">
                <v-icon>call</v-icon>
                <span class="type">Work phone</span>
                <span class="sub">{{ doctor.work_phone }}</span>
              </div>
            </div>
            <div class="contact-boxs">
              <div class="contact-box">
                <v-icon>payments</v-icon>
                <span class="type">Session price</span>
                <span class="sub">{{ doctor.session_price }} SAR</span>
              </div>
              <div class="contact-box">
                <v-icon>calendar_month</v-icon>
                <span class="type">Birthday</span>
                <span class="sub">{{ doctor.birthday }}</span>
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
                  <v-icon>schedule</v-icon>
                </div>
                <div class="text">
                  <span class="main-title d-block">Appointments</span>
                  <span class="subtitle">Learn new rules</span>
                </div>
              </div>
              <div class="statistic mb-3">
                <span class="number">0</span>
                <div class="icon">
                  <v-icon>local_offer</v-icon>
                </div>
                <div class="text">
                  <span class="main-title d-block">Offers</span>
                  <span class="subtitle">Offers subscriptions</span>
                </div>
              </div>
              <div class="statistic">
                <span class="number">0</span>
                <div class="icon">
                  <v-icon>night_shelter</v-icon>
                </div>
                <div class="text">
                  <span class="main-title d-block">Surgeries</span>
                  <span class="subtitle">Train your skill</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-12">
          <div class="chart mb-5">
            <span class="chart-title">ROI</span>
            <apexcharts :width="chartWidth+'%'" height="350" type="bar" :options="chartOptions" :series="series"></apexcharts>
          </div>
          <div class="chart">
            <span class="chart-title">Sales Funnel in Current Month</span>
            <apexcharts :width="chartWidth+'%'" height="390" type="radialBar" :options="radialBarOptions" :series="radialBarSeries"></apexcharts>
          </div>
        </div>
      </v-row>
    </v-container>
  </section>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  export default {
    name: 'DoctorProfile',
    components: {
      apexcharts: VueApexCharts,
    },
    data() {
      return {
        // doctor profile id
        profileId: this.$route.params.profileId,
        // doctor
        doctor: [],

        // chart width
        chartWidth: 1,

        chartOptions: {
          barWidth: '10',
          colors:['#164db0'],
          chart: {
            type: 'basic-bar',
            fontFamily: 'DM Sans, sans-serif',
          },
          xaxis: {
            categories: ['Sales', 'Budget']
          },
          plotOptions: {
            bar: {
              columnWidth: '20',
            }
          }
        },
        series: [{
          name: 'Value',
          data: [30, 40]
        }],

        radialBarSeries: [85, 65, 45],
        radialBarOptions: {
          chart: {
            type: 'radialBar',
            fontFamily: 'DM Sans, sans-serif',
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                }
              }
            }
          },
          colors: ['#164db0', '#4A4DE6', '#FFAB2D'],
          labels: ['Leads', 'Patients', 'No show'],
          legend: {
            show: true,
            floating: true,
            fontSize: '14px',
            fontWeight: '500',
            position: 'left',
            offsetX: 160,
            offsetY: 15,
            labels: {
              useSeriesColors: true,
            },
            markers: {
              size: 0
            },
            formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
              vertical: 3
            }
          },
          responsive: [{
            breakpoint: 992,
            options: {
              legend: {
                show: false
              }
            }
          }]
        },
        // notify dialog
        notifyDialog: false,
      }
    },
    mounted() {
      // Get doctor
      this.axios
      .get(process.env.VUE_APP_API_URL + `/dashboard/doctors/${this.profileId}`, { headers: { Authorization: `Bearer ${localStorage.userToken}` } })
      .then((response) => {
        this.doctor = response.data.data
      })
      .catch((error) => {
        this.handleErrors(error);
      });

      // set chart width 100% after 1 second to fix chart width issue
      setTimeout(() => {
        this.chartWidth = 100
      }, 500);
    },
    methods: {
      whatsappChat() {
        window.open(
          `https://wa.me/${this.doctor.work_phone}`,
          '_blank'
        );
      }
    }
  };
</script>

<style lang='scss' scoped>
  .doctor-profile {
    padding: 20px;

    .doctor-card {
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
      }

      .description {
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

    .chart {
      padding: 30px;
      background-color: var(--white-color);
      border-radius: 4px;

      .chart-title {
        display: block;
        font-size: 1rem;
        font-weight: 600;
        color: var(--dark-color);
        margin-bottom: 20px;
      }
    }
  }
</style>