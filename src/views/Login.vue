<template>
        <div class="row justify-content-center">
        <page-spinner :fullPage="true" :isLoading="activateSpinner"></page-spinner>
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                   
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="row">
                            <img src="img/brand/apacheleadslogo.png" alt="" id="login-brand">
                        </div>
                        <div class="text-center text-muted mb-4">
                            <small>Sign in with credentials</small>
                        </div>
                        <form role="form" @submit.prevent="login()">
                            <base-input class="input-group-alternative mb-3"
                                        validationRule="'required|email'"
                                        name="email"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="form.email">
                            </base-input>
                            <span>{{ errors.first('email') }}</span>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="form.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button
                                        nativeType="submit"
                                        type="primary" 
                                        class="my-4">Sign in</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <!-- <a href="#" class="text-light"><small>Forgot password?</small></a> -->
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    
    export default {
        name: 'login',
        data() {
            return {
                activateSpinner: false,
                form: {
                email: '',
                password: ''
                }
            }
        },

        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        },
         
        methods: {
            async login() {
                this.activateSpinner = true;
                await this.$store.dispatch('auth/login', this.form).then(response => {
                    this.activateSpinner = false;
                    this.$router.replace({name: 'dashboard'});
                });
            }
        }
    }
</script>
<style>
    #login-brand {
        height: 100%;
        width: 100%;
    }
</style>
