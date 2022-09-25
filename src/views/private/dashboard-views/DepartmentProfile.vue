<template>
  <section class='depart-profile'>
    <v-container fluid>
      <v-row>
        <v-col class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="depart-card">
            <div class="image">
              <img :src="department.logo" alt="">
            </div>
            <span class="name d-block">{{ department.name }}</span>
              <div class="contact-box">
                <span class="sub">{{ department.email }}</span>
              </div>
              <v-spacer></v-spacer>
            <p class="description">
              {{ department.description }}
            </p>
            <div class="statistics">
              <div class="statistic mb-3">
                <span class="number">0</span>
                <div class="icon">
                  <v-icon class="material-icons">group</v-icon>
                </div>
                <div class="text">
                  <span class="main-title d-block">Doctors</span>
                </div>
              </div>
              
              <div class="statistic mb-3">
                <span class="number">0</span>
                <div class="icon">
                  <v-icon class="main-title d-block">groups_2</v-icon>
                </div>
                <div class="text">
                  <span  class="main-title d-block">Clients</span>
                </div>
              </div>

              <div class="statistic mb-3">
                <span class="number">0</span>
                <div class="icon">
                  <v-icon>local_offer</v-icon>
                </div>
                <div class="text">
                  <span class="main-title d-block">Offers</span>
                </div>
              </div>
              <div class="statistic">
                <span class="number">0</span>
                <div class="icon">
                  <v-icon>star</v-icon>
                </div>
                <div class="text">
                  <span class="main-title d-block">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <!-- Doctors Section -->
        <v-col class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="depart-card">
            <span class="title d-block">Doctors</span>
            <div class="content" v-for="(doctor, id) in doctors" :key="id">
              <v-col class="image">
                <img :src="doctor.profile">
              </v-col>
              <v-col class="name">
                <span>{{doctor.name}}</span>
              </v-col>
              <v-col class="sup">
                <span>{{doctor.setion_price}}</span>
              </v-col>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
  export default {
    name: 'DepartmentProfile',
    data() {
      return {
        // department profile id
        profileId: this.$route.params.profileId,
        // department
        department: [],
        //doctors
        doctors:[
          {
            id:1,
            name:"doc1",
            profile:"https://the360.marketing//uploads/admin/companies/images/doctor.jpg",
            setion_price:"200 SR"
          },
          {
            id:2,
            name:"doc2",
            profile:"https://the360.marketing//uploads/admin/companies/images/doctor.jpg",
            setion_price:"200 SR"
          },
          {
            id:3,
            name:"doc3",
            profile:"https://the360.marketing//uploads/admin/companies/images/doctor.jpg",
            setion_price:"200 SR"
          },
        ],
      }
    },
    mounted() {
      // Get department
      this.axios
      .get(`${localStorage.companyApiUrl}/dashboard/departments/${this.profileId}`, { headers: { Authorization: `Bearer ${localStorage.userToken}` } })
      .then((response) => {
        this.department = response.data.data
      })
      .catch((error) => {
        this.handleErrors(error);
      });
    },
    methods: {
      whatsappChat() {
        console.log(window.location.port);
      }
    }
  };
</script>

<style lang='scss' scoped>
  .depart-profile {
    padding: 20px;

    .content{
      display: flex;
      justify-content: space-around;
      align-content: center;
      align-items: center;
    }
    .depart-card {
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
          height: 100%;
          object-fit:contain;
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
          align-items:center;
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
</style>