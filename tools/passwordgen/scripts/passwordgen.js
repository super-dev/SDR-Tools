new Vue({
  el: '#app',
  data() {
    return {
      password: '',
      type: 'strong',
      length: 15
    }
  },
  mounted: function() {
    this.generate()
  },
  methods: {
    generate: function() {
      this.password = 'password'
    },
    copy: function() {

    },
  }
})