<template>
    <div class="row justify-content-center">
        <div class="col-lg-7 col-md-5">
            <div class="card bg-secondary shadow border-0">
                
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="row justify-content-center">
                        <img src="img/brand/apacheleadslogo.png" alt="" id="login-brand">
                    </div>
                    <div class="text-center text-muted mb-4">
                        <h3>Sign Up</h3>
                        <small>Admin Account sign up with credentials</small>
                    </div>
                    <form role="form">

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="First Name"
                                    addon-left-icon="ni ni-single-02"
                                    v-model="form.firstname">
                        </base-input>
                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Last Name"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="form.lastname">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Email"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="form.email">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="form.password">
                        </base-input>
                        <base-input class="input-group-alternative"
                                    placeholder="Re-enter password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="form.password_confirmation">
                        </base-input>

                        <!-- <div class="text-muted font-italic">
                            <small>password strength: <span class="text-success font-weight-700">strong</span></small>
                        </div> -->

                        <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative">
                                    <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                                </base-checkbox>
                            </div>
                        </div>
                        <div class="text-center">
                            <base-button type="primary" class="my-4" @click="saveUser()">Create account</base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        <small>Forgot password?</small>
                    </a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
    name: 'register',

    data() {
      return {
        form: {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          password_confirmation: ''
        }
      }
    },

    computed: {
        ...mapGetters({
            auth_user: 'auth/user',
            users: 'users/users'
        })
    },

    methods: {

        // async saveUser() {
        //     await this.$store.dispatch('users/register', this.form).then(response => {
        //         this.$router.go({name: 'dashboard'});
        //     });
        // },

        async saveUser() {
            axios.post('/users', this.form).then((reponse) => {
                 this.$swal({
                    title: 'Success!',
                    text: 'Account has been registered successfully',
                    type: 'success',
                    confirmButtonText: 'Ok'
                })
                .then((result) => {
                    this.$router.replace({name: 'login'});
                    // this.$store.dispatch('users/users');
                    // this.$emit('closeModal')
                });
            })
            .catch((e) => {
                    
            });
        }

        
    }
  }
</script>


<style>

#login-brand {
    width: 70%;
}
</style>
