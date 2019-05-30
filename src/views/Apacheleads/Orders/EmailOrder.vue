<template>
<div>
    <div class="row justify-content-center">
       
        <div class="col-10">
            <el-card shadow="hover">
                
                <form role="form" @submit.prevent="sendEmail">
                    <h1 class="mb-5 mt-4 text-center display-3">Order Delivery</h1>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Email address</label>
                        <input
                            v-model="form.customer_email" 
                            type="email" 
                            class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Subject</label>
                        <input type="text" class="form-control" v-model="form.subject">
                    </div>

                    <hr>
                    <div class="form-group">
                        <el-input
                            type="textarea"
                            placeholder="Email Message here"
                            v-model="form.body"
                            :rows="5"
                            maxlength="200"
                            show-word-limit
                            />
                    </div>

                    <div class="row">
                        <div class="col text-left">
                            <div class="form-group">
                                 <base-button
                                    @click="attachCsv" 
                                    type="success"><i class="ni ni-cloud-download-95"></i> Preview CSV</base-button>
                            </div>
                        </div>
                        
                        <div class="col text-right">
                            <div class="form-group">
                                <base-button
                                    nativeType="submit" 
                                    type="default"><i class="ni ni-send"></i> Deliver Order</base-button>
                                <base-button
                                    @click="onCancel" 
                                    outline 
                                    type="danger">Cancel</base-button>
                            </div>
                        </div>
                    </div>
                    
                </form>
            </el-card>
        </div>
    </div>

</div>
</template>

<script>

import axios from 'axios';
import { mapGetters, mapState } from 'vuex';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";


export default {
    components: {
        vSelect,
        flatPicker
    },
    beforeRouteEnter (to, from, next) {
        
    },
    props: ['customerData'],
    data() {
        return {
            activateSpinner: false,
            form: {
                subject: "",
                body: "",
                customer_email: "",
                ordered_leads: [],
                customer: null
            },
            toAttach: []
        }
    },

    created() {
        this.$store.dispatch('leadtypes/fetchLeadTypes');
        this.$store.dispatch('users/fetchAllCustomers');
    },
    mounted() {
        this.form.customer_email = this.customerData.email;
        this.form.customer_id = this.customerData.id;
        this.form.customer = this.customerData;
    },
   
    computed: {
        ...mapGetters({
                user: 'auth/user',
                leadtypes: 'leadtypes/leadtypes',
                leadtype: 'leadtypes/leadtype',
                customers: 'users/customers',
                leads: 'leads/leads'
        }),

        ...mapState({
            customer: 'users/customer'
        })
    },

    watch: {
       
    },
  

    methods: {
        onCancel() {
            this.$router.push("/orders");
        },

        async attachCsv() {
            let self = this;
            this.activateSpinner = true;
            let leads = JSON.stringify(this.leads);

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

        sendEmail() {

            let self = this;
            this.activateSpinner = true;
            let leads = JSON.stringify(this.leads);
            this.form.ordered_leads = leads;

            axios.post('/send-order',  this.form).then(function(response){
                const { data } = response;
                console.log(data);
                // const url = window.URL.createObjectURL(new Blob([response.data]));
                // const link = document.createElement('a');
                // link.href = url;

                // let filename = "ApacheLeads-" + self.$moment().format('Y-M-d') + '.csv';
                // link.setAttribute('download', filename);
                // document.body.appendChild(link);
                // link.click();
                
                self.activateSpinner = false;
               
                
                
            })
            .catch(function(e){
                console.log('FAILURE!!', e);
            });
        }
    }
}
</script>

<style scoped>
    .el-card {
        background-color: #f5f1ff !important;
    }
</style>
