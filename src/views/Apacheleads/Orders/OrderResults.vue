<template>
    <div class="row">
                                
        <div class="col-12 col-md-12">
            <el-card shadow="hover">
                <div class="row m-2">
                    <div class="col-8 col-sm-9">
                        <h5 class="card-title text-uppercase text-muted mb-0">Total Leads Generated</h5>
                        <span class="h2 font-weight-bold mb-0">{{ leads.length || 0 }}</span>
                        <div class="row mt-2 ml-1">
                            <div class="col px-0">
                                <router-link to="/deliver">
                                    <el-button
                                        :disabled="disabledExport"
                                        type="primary" 
                                        size="medium" 
                                        round><i class="el-icon-message"></i> Export</el-button>
                                </router-link>
                                <!-- <el-button class="ml-2" size="medium" round plain><i class="el-icon-search"></i> View</el-button> -->

                            </div>
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

    beforeRouteLeave (to, from, next) {
        // called when the route that renders this component is about to
        // be navigated away from.
        // has access to `this` component instance.
        
       
    },

    created() {
        this.$store.dispatch('leadtypes/fetchLeadTypes');
        this.$store.dispatch('users/fetchAllCustomers');
        console.log("prop", this.customerData)
    
        if (this.customerData) {
            this.disabledExport = false;
        } else {
            this.disabledExport = true;
        }
    },

    data() {
        return {
            disabledExport: true
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

    methods: {
        toggleExportbtn() {
            if (this.leads.length > 0) {
                this.disabledExport = false;
            } else {
                this.disabledExport = true;
            }
        }
    }
}
</script>

<style>
   

</style>
