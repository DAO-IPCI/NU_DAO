import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      items: {}
    };
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch('auth/logout')
        .then(() => this.$router.push('/login'));
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  }
};
