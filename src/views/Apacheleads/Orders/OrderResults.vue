<template>
    <div class="row">
                                
        <div class="col-12 col-md-12">
            <el-card shadow="hover">
                <div class="row m-2">
                    <div class="col-8 col-sm-9">
                        <h5 class="card-title text-uppercase text-muted mb-0">Total Leads Generated</h5>
                        <span class="h2 font-weight-bold mb-0">{{ leads.length || 0 }}</span>
                        <div class="row mt-2 ml-1">
                            <form @submit.prevent="sendEmail">
                            <div class="col px-0">
                                <el-button
                                        type="primary" 
                                        nativeType="submit"
                                        size="medium" 
                                        round><i class="el-icon-message"></i> Deliver Order</el-button>
                                <el-button
                                        type="primary" 
                                        size="medium"
                                        @click="attachCsv"  
                                        round><i class="ni ni-cloud-download-95"></i> Preview CSV</el-button>
                                <!-- <el-button class="ml-2" size="medium" round plain><i class="el-icon-search"></i> View</el-button> -->

                            </div>
                            </form>
                        </div>
                            
                    </div>
                    <div class="col-4 col-sm text-right">
                        <div class="icon icon-shape text-white rounded-circle shadow bg-gradient-indigo">
                            <i class="ni ni-check-bold"></i>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <!-- <div class="col col-md">
            <el-card shadow="hover" id="missing-lead">
                <div class="row m-2">
                    <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">Missing Leads</h5>
                            <span class="h2 font-weight-bold mb-0">350,897</span>
                    </div>
                    <div class="col-auto">
                        <div class="icon icon-shape text-white rounded-circle shadow bg-gradient-red">
                            <i class="ni ni-bell-55"></i>
                        </div>
                    </div>
                </div>
            </el-card>
        </div> -->
    </div>
</template>

<script>

import axios from 'axios';
import { mapGetters } from 'vuex';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
    components: {
        vSelect,
        flatPicker
    },

    props: ['customerData'],

    created() {
        this.$store.dispatch('leadtypes/fetchLeadTypes');
        this.$store.dispatch('users/fetchAllCustomers');
    
        if (this.customerData) {
            this.disabledExport = false;
        } else {
            this.disabledExport = true;
        }
    },

    data() {
        return {
            order_data: [],
            form: {
                customer_email: 0,
                customer_id: 0,
                customer: 0,
                ordered_leads: []
            }
        }
    },
    computed: {
        ...mapGetters({
                user: 'auth/user',
                leadtypes: 'leadtypes/leadtypes',
                leadtype: 'leadtypes/leadtype',
                customers: 'users/customers',
                leads: 'leads/leads'
        }),
    },

    watch: {
        leads: function(value) {
            this.order_data = value;

            this.form.customer_email = this.customerData.email;
            this.form.customer_id = this.customerData.id;
            this.form.customer = this.customerData;
        }
    },

    methods: {
        toggleExportbtn() {
            if (this.leads.length > 0) {
                this.disabledExport = false;
            } else {
                this.disabledExport = true;
            }
        },

        sendEmail() {

            let self = this;
            this.activateSpinner = true;
            let leads = JSON.stringify(this.order_data);
            this.form.ordered_leads = leads;
            
            axios.post('/send-order',  this.form).then(function(response){
                const { data } = response;
                
                self.$swal({
                    title: 'Order Delivered',
                    text: "Your File has been emailed to customer",
                    type: 'Success',
                })
                
                self.activateSpinner = false;
               
                self.form.customer_email = "";
                self.form.customer_id = 0;
                self.form.customer = 0;

                self.$store.dispatch('leads/setFetchedLeads',[]);
                
                
            })
            .catch(function(e){
                console.log('FAILURE!!', e);
            });
        },

        async attachCsv() {
            let self = this;
            this.activateSpinner = true;
            let leads = JSON.stringify(this.order_data);

            axios.get('/generate-order-csv', { params: { "ordered_leads": leads} }).then(function(response){
                const { data } = response;
                console.log("to export: ", data);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;

                let filename = "ApacheLeads-" + self.$moment().format('Y-M-d') + '.csv';
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                
                self.activateSpinner = false;
               
                
                
            })
            .catch(function(e){
                console.log('FAILURE!!', e);
            });
        },
    }
}
</script>

<style>
   

</style>
