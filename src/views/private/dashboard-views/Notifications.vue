<template>
  <div>
    <b-button
      id="show-btn"
      @click="showModal"
      class="btn btn-outline-primary btn-theme"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="margin-right: 1rem"
      >
        <g clip-path="url(#clip0_1234_615)">
          <path
            d="M23.655 5.621C23.322 5.227 22.834 5 22.318 5H7.79398C6.93698 5 6.21098 5.613 6.06798 6.458L4.45998 15.958C4.37398 16.467 4.51498 16.985 4.84798 17.379C5.18098 17.773 5.66798 18 6.18498 18H20.709C21.566 18 22.292 17.387 22.435 16.542L24.043 7.042C24.129 6.533 23.988 6.015 23.655 5.621ZM21.51 9.55L15.16 12.18C14.89 12.3 14.59 12.35 14.3 12.35C13.96 12.35 13.62 12.28 13.31 12.12L7.53998 9.28L7.79998 7.74L13.97 10.78C14.16 10.87 14.39 10.88 14.59 10.8L21.8 7.81L21.51 9.55ZM23.72 8.45L23.8 7.95C23.84 8.13 23.81 8.3 23.72 8.45Z"
            fill="#164DB0"
          />
          <path
            d="M4 8H1C0.447 8 0 7.552 0 7C0 6.448 0.447 6 1 6H4C4.553 6 5 6.448 5 7C5 7.552 4.553 8 4 8Z"
            fill="#164DB0"
          />
          <path
            d="M3 12H1C0.447 12 0 11.552 0 11C0 10.448 0.447 10 1 10H3C3.553 10 4 10.448 4 11C4 11.552 3.553 12 3 12Z"
            fill="#164DB0"
          />
          <path
            d="M2 16H1C0.447 16 0 15.552 0 15C0 14.448 0.447 14 1 14H2C2.553 14 3 14.448 3 15C3 15.552 2.553 16 2 16Z"
            fill="#164DB0"
          />
        </g>
        <defs>
          <clipPath id="clip0_1234_615">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span>Send Notification</span>
    </b-button>

    <b-modal ref="my-modal" centered hide-footer hide-header>
      <div class="d-block">
        <h3>Send Notification</h3>
        <b-form @submit="onSubmit" v-if="show" id="Notification">
          <b-form-group
            class="mt-4"
            id="input-group-1"
            label="test"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.subject"
              type="text"
              placeholder="testtest"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="mt-4"
            id="input-group-2"
            label="test"
            label-for="input-2"
          >
            <b-form-textarea
              id="input-2"
              v-model="form.message_ar"
              placeholder=""
              required
              row="3"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            class="mt-4"
            id="input-group-3"
            label="test"
            label-for="input-3"
          >
            <b-form-textarea
              id="input-3"
              v-model="form.message_en"
              placeholder=""
              required
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            class="mt-4"
            id="input-group-4"
            label="test"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="form.footer"
              type="text"
              placeholder="Please enter footer for this email"
              required
            ></b-form-input>
          </b-form-group>

          <b-button class="mt-4" type="submit" variant="primary">Send</b-button>
          <b-button
            class="mx-3 mt-4"
            variant="outline-primary"
            block
            @click="hideModal"
            >Cancel</b-button
          >
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name:"Notification",
  data() {
    return {
      form: {
        subject: "",
        message_ar: "",
        message_en: "",
        footer: "",
      },
      show: true,
    };
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
      document.getElementById("Notification").reset();
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
  },
};
</script>

<style scoped>
.modal-content label {
  font-size: 14px;
  line-height: 20px;
  color: #7d7d7d;
  font-weight: normal;
}

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
</style>