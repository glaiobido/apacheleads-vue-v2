<template>
    <modal :show.sync="showModal"
               body-classes="p-0"
               modal-classes="modal-dialog-centered">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
               
                <template>
                    <div class="text-center text-muted mb-4">
                        <h1 class="display-4">Create an Order</h1>
                    </div>
                    <form role="form" @submit.prevent="generateLeads">
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col">
                                            <label class="form-control-label">Customer Email: </label>
                                        </div>
                                    </div>
                                    <el-select 
                                        v-model="form.customer"
                                        no-data-text="No customers registered"
                                        no-match-text="Customer not found"
                                        filterable size="large"
                                        placeholder="Search or Select customer Email">
                                        <el-option
                                            v-for="(item, index) in allcustomers"
                                            :key="index"
                                            :label="item.email"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <base-input alternative
                                                type="number"
                                                label="Lead Age (days old)"
                                                v-model="form.lead_age"
                                                class="mb-3"
                                                placeholder="Lead Age">
                                    </base-input>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>

                            <div class="col">
                               <div class="form-group">
                                    <label class="form-control-label">Select Lead Type: </label>
                                    <v-select :options="leadtypes" 
                                                :reduce="leadtype => leadtype.id"
                                                v-model="form.leadtype_id"
                                                label="name"  />
                                </div>
                            
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <base-input alternative
                                                type="number"
                                                label="Quantity"
                                                v-model="form.quantity"
                                                class="mb-3"
                                                placeholder="Number of leads to generate">
                                    </base-input>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                                        <flat-picker slot-scope="{focus, blur}"
                                                    @on-open="focus"
                                                    @on-close="blur"
                                                    :config="{allowInput: true}"
                                                    class="form-control datepicker"
                                                    v-model="form.import_date">
                                        </flat-picker>
                                    </base-input>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>

                           
                        </div> -->
                        <hr>
                      
                        
                        <div class="text-center">
                            <base-button 
                                type="default" 
                                class="my-4" 
                                nativeType="submit">Get Leads</base-button>
                            <base-button type="secondary" class="my-4" @click="$emit('closeModal')">Cancel</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
</template>

<script>

import Modal from "@/components/Modal.vue";
import axios from 'axios';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { mapGetters } from 'vuex';
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
    props: ['showModal'],
    name: 'add-lead-type-modal',
    components: {
        Modal,
        'v-select': vSelect,
        flatPicker
    },
    
    data() {
        return {
            form: {
                customer: null,
                country: 'AU',
                leadtype_id: 0,
                import_date: "",
                lead_age: 0,
                quantity: 0
            }
        }
    },
    created() {

    },

    computed: {
        ...mapGetters({
            user: 'auth/user',
            leadtypes: 'leadtypes/leadtypes',
            leadtype: 'leadtypes/leadtype',
            customers: 'users/customers'
        }),

        allcustomers: function() {
            let formattedCustomers = this.customers.map(customer => {
                let obj = {};
                obj.customerName = customer.firstname + " " + customer.lastname,
                obj.id = customer.id;
                obj.email = customer.email;
                return obj;
            });

            return formattedCustomers;
        }
    },

    watch: {
        fields: function (newQuestion, oldQuestion) {
            
        }
    },

    methods: {
       

        async generateLeads() {
            let self = this;
            await axios.get('/generate', { params: this.form }).then((response) => {
                console.log("response order generate: ", response);
                const {data} = response;

                self.$store.dispatch('leads/setFetchedLeads', data);
                self.$swal({
                    title: 'Success!',
                    text: 'Lead Type has been added successfully',
                    type: 'success',
                    confirmButtonText: 'Ok'
                }).then(response => {
                    
                    self.$emit('closeModal', self.form.customer);
                });
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

    .el-select--large {
        width: 100% !important;
    }
</style>