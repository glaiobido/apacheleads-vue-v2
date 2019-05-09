<template>
    <modal :show.sync="showModal"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-lg">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
               
                <template>
                    <div class="text-center text-muted mb-4">
                        <h1 class="display-4"><i class="fa fa-user-plus" aria-hidden="true"></i>   New Customer</h1>
                    </div>
                    <form role="form" @submit.prevent="saveNewCustomer()">
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <base-input alternative
                                                label="First Name"
                                                v-model="form.firstname"
                                                class="mb-3"
                                                placeholder="First Name">
                                    </base-input>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>

                            <div class="col">
                                 <div class="form-group">
                                    <base-input alternative
                                                label="Last Name"
                                                v-model="form.lastname"
                                                class="mb-3"
                                                placeholder="Last Name">
                                    </base-input>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <base-input alternative
                                                label="Email"
                                                v-model="form.email"
                                                class="mb-3"
                                                placeholder="Email Address">
                                    </base-input>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>

                            <div class="col">
                                 <div class="form-group">
                                    <base-input alternative
                                                label="Phone Number"
                                                v-model="form.contact_no"
                                                class="mb-3"
                                                placeholder="Phone Number">
                                    </base-input>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label class="form-control-label">Date of Birth</label>
                                    <base-input 
                                        addon-left-icon="ni ni-calendar-grid-58">
                                        <flat-picker slot-scope="{focus, blur}"
                                                    @on-open="focus"
                                                    @on-close="blur"
                                                    :config="{allowInput: true, dateFormat: 'M d, Y'}"
                                                    class="form-control datepicker"
                                                    v-model="form.birthdate">
                                        </flat-picker>
                                    </base-input>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <div class="form-group">
                                        <label class="form-control-label">Country</label>
                                        <v-select :options="countries"
                                                :reduce="country => country.country_code" 
                                                v-model="form.country"
                                                label="country"  />
                                        <small class="form-text text-muted"></small>
                                    </div>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <div class="form-group">
                                        <label class="form-control-label">State</label>
                                        <v-select :options="states"
                                                :reduce="state => state.state_code"  
                                                v-model="form.state"
                                                label="state"  />
                                        <small class="form-text text-muted"></small>
                                    </div>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>

                            
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <div class="form-group">
                                        <label class="form-control-label">Home Address</label>
                                        <textarea v-model="form.address1" rows="3" class="form-control"></textarea>
                                        <small class="form-text text-muted"></small>
                                    </div>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>

                            <div class="col">
                                <div class="form-group">
                                    <label class="form-control-label">Permanent Address</label>
                                    <textarea v-model="form.address2" rows="3" class="form-control"></textarea>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>

                          
                        </div>
                        
                        <div class="text-center">
                            <base-button
                                nativeType="submit" 
                                type="default" 
                                class="my-4">Save</base-button>
                            <base-button type="secondary" class="my-4" @click="$emit('closeModal')">Cancel</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
</template>

<script>

import Modal from "@/components/Modal.vue";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    props: ['showModal'],
    components: {
        Modal,
        flatPicker,
        vSelect
    },
    
    data() {
        return {
            form: {
                firstname: null,
                lastname: null,
                email: null,
                birthdate: null,
                address1: null,
                address2: null,
                contact_no: null,
                country: '',
                state: ''
            }
        }
    },
    created() {

    },

    watch: {
        'form.country': function(value) {
            this.$store.dispatch('countries/fetchStates', {'country': value});
        }
    },

    computed: {
        ...mapGetters({
            user: 'auth/user',
            leadtypes: 'leadtypes/leadtypes',
            customers: 'users/customers',
            countries: 'countries/countries',
            states: 'countries/states'
        })
    },

    methods: {

        async saveNewCustomer() {
            
            axios.post('/customers', this.form).then((reponse) => {
                 this.$swal({
                    title: 'Success!',
                    text: 'Lead Type has been added successfully',
                    type: 'success',
                    confirmButtonText: 'Ok'
                })
                .then((result) => {
                    this.$store.dispatch('users/fetchAllCustomers');
                    this.$emit('closeModal')
                });
            })
            .catch((e) => {
                    
            });
        }
    }
};
</script>
<style>
    .vs__dropdown-toggle {
        padding: 6px;
        background-color: #fff;
    }
    
</style>