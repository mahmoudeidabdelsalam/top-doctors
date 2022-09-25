<template>
  <section class="statistics">
    <div class="upcoming-reservations">
      <div class="icon">
        <v-icon>mdi-calendar</v-icon>
      </div>
      <span class="number">12</span>
      <div class="text">
        <span class="main-title">Upcoming Reservations</span>
        <span class="regular">Today</span>
      </div>
      <v-spacer></v-spacer>
      <router-link class="see-reservations-btn" :to="{ name: 'Reservations' }">See Reservations</router-link>
    </div>
    
    <div class="boxs">
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
          <div class="box">
            <span class="main-title">Departments</span>
            <div class="center">
              <span class="number">24</span>
              <v-icon>mdi-view-dashboard</v-icon>
            </div>
            <span class="description">In August 2022</span>
          </div>
        </div>

        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
          <div class="box">
            <span class="main-title">Employees</span>
            <div class="center">
              <span class="number">37</span>
              <v-icon>mdi-human-male-male</v-icon>
            </div>
            <span class="description">In August 2022</span>
          </div>
        </div>

        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
          <div class="box">
            <span class="main-title">Projects</span>
            <div class="center">
              <span class="number">8</span>
              <v-icon>mdi-folder-plus</v-icon>
            </div>
            <span class="description">In August 2022</span>
          </div>
        </div>

        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
          <div class="box">
            <span class="main-title">Doctors</span>
            <div class="center">
              <span class="number">2</span>
              <v-icon>mdi-doctor</v-icon>
            </div>
            <span class="description">In August 2022</span>
          </div>
        </div>

        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
          <div class="box">
            <span class="main-title">Assistants</span>
            <div class="center">
              <span class="number">6</span>
              <v-icon>mdi-hand-heart</v-icon> 
            </div>
            <span class="description">In August 2022</span>
          </div>
        </div>

        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
          <div class="box">
            <span class="main-title">Leads</span>
            <div class="center">
              <span class="number">784</span>
              <v-icon>mdi-face-recognition</v-icon>
            </div>
            <span class="description">In August 2022</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Statistics",
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.statistics {
  .upcoming-reservations {
    display: flex;
    align-items: center;
    padding: 20px;
    margin: 0 5px 20px;
    background-color: var(--white-color);
    border-radius: 8px;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .icon {
      background-color: var(--sky-color);
      padding: 15px;
      border-radius: 50%;
      .v-icon {
        color: var(--main-color);
      }
    }

    .number {
      font-size: 2.5rem;
      font-weight: 600;
      color: var(--dark-color);
      margin: 0 25px;
      @media (max-width: 767px) {
        margin: 0;
      }
    }

    .text {
      .main-title {
        display: block;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--dark-color);
      }
      .regular {
        font-size: 1rem;
        font-weight: 500;
        color: var(--secondary-color);
      }
    }

    .see-reservations-btn {
      padding: 11px 20px;
      background-color: var(--main-color);
      opacity: 0.8;
      border-radius: 2000px;
      font-size: .8125rem;
      font-weight: 500;
      color: var(--white-color);
      &:hover {
        opacity: 1;
      }
    }
  }
  
  .boxs {
    padding: 5px;

    .box {
      background-color: var(--white-color);
      padding: 20px;
      border-radius: 8px;
      box-shadow: 1px 0px 10px 1px rgba(0, 0, 0, .1);
      overflow: hidden;
      
      .main-title {
        display: block;
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--dark-color);
        margin-bottom: 10px;
      }

      .center {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .number {
          font-size: 2.5rem;
          font-weight: 600;
          color: var(--dark-color);
        }

        .v-icon {
          background-color: var(--sky-color);
          color: var(--main-color);
          padding: 15px;
          border-radius: 50%;
        }
      }

      .description {
        font-size: .8rem;
        font-weight: 500;
        color: var(--secondary-color);
      }
    }
  }
}
</style>