export default {
  methods: {
    // Get items
    getItems(url, array) {
      this.axios
      .get(url, { headers: { Authorization: `Bearer ${localStorage.userToken}` } })
      .then((response) => {
        // push every item to the array
        response.data.data.forEach((item) => {
          array.push(item);
        });
      })
      .catch((error) => {
        this.handleErrors(error);
      });
    },

    // Add item (you must pass the full api url, item data object you want to add, array of items and item object to empty it after adding)
    addItem(url, itemData, array, itemObject) {
      this.axios
      .post(url, itemData, { headers: { Authorization: `Bearer ${localStorage.userToken}` } })
      .then((response) => {
        // close dialog
        this.newDialog = false;
        // empty item data object
        Object.keys(itemObject).forEach(key => {
          itemObject[key] = '';
        });
        // success message
        this.$toast.success(response.data.message);
        // push new item to array [0]
        array.splice(0, 0, response.data.data);
      })
      .catch((error) => {
        this.handleErrors(error);
      });
    },

    // Delete item (you must pass the full api url, item you want to delete and array of items)
    deleteItem(url, item, array) {
      this.axios
      .delete(url, { headers: { Authorization: `Bearer ${localStorage.userToken}` } })
      .then((response) => {
        // close dialog
        this.deleteDialog = false;
        // success message
        this.$toast.success(response.data.message);
        // splice item from array
        array.splice(array.indexOf(item), 1);
      })
      .catch((error) => {
        this.handleErrors(error);
      });
    },

    // Handle errors
    handleErrors(error) {
      if(error.response) {
        if (error.response.status === 401) {
          this.$toast.error(this.$i18n.locale === 'en' ? 'Please sign in first.' : 'برجاء تسجيل الدخول اولا.');
          // redirect to login page
          this.$router.push({ name: 'Login' });
        }
        if (error.response.status === 403) {
          this.$toast.error(this.$i18n.locale === 'en' ? 'You are not authorized to perform this action.' : 'أنت لست مصرح بالقيام بهذا الإجراء.');
        }
        if (error.response.status === 404) {
          this.$toast.error(this.$i18n.locale === 'en' ? 'Not found.' : 'غير موجود.');
        }
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
          for (let [key, value] of Object.entries(this.errors)) {
            this.$toast.error(value[0]);
          }
        }
        if (error.response.status === 500) {
          this.$toast.error(this.$i18n.locale === 'en' ? 'Unknown error, try again later.' : 'خطا غير معروف، حاول لاحقاً.');
        }
      }
    }
  }
}