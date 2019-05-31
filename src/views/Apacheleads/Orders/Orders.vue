<template>
    <div>
        <page-spinner :fullPage="true" :isLoading="activateSpinner"></page-spinner>
        <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

        <div class="container-fluid mt--9">
            <div class="row">
                <div class="col">
                    <div class="card shadow page-table-card">
                        <div class="card-header border-0 bg-transparent">
                            <div class="d-flex flex-row-reverse">
                                <base-button 
                                        
                                        type="default"
                                        @click="showAddModal = true" 
                                        >New Order</base-button>
                                </div>
                            </div>          
                        

                        <div class="card-body" >
                            <router-view :customerData="customer(customerID)"></router-view>
                        </div>

                        <div class="card-footer d-flex justify-content-end bg-transparent">
                           
                        </div>

                    </div>


                </div>
            </div>

        </div>
       <generate-order :showModal="showAddModal" @closeModal="onCloseGenerateModal"></generate-order>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import flatPicker from "vue-flatpickr-component";
    import "flatpickr/dist/flatpickr.css";
    import GenerateOrder from './GenerateOrder'
  

    export default {
        
        components: {
            vSelect,
            flatPicker,
            GenerateOrder

        },

        created() {
            this.$store.dispatch('leadtypes/fetchLeadTypes');
            this.$store.dispatch('users/fetchAllCustomers');
        },

        data() {
            return {
                activateSpinner: false,
                showAddModal: false,
                customerID: 0,
                unAllowExport: true,
                form: {
                    leadtype_id: null,
                    import_date: null,
                    page: 1
                },
                tableData: [{
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                    }, {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                    }, {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                    }, {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                }]
            }
        },

        computed: {
            ...mapGetters({
                user: 'auth/user',
                leadtypes: 'leadtypes/leadtypes',
                leadtype: 'leadtypes/leadtype',
                customers: 'users/customers',
                customer: 'users/customer',
                leads: 'leads/leads'
            }),


            formatted_fields: function() {
                let newFields = [];
                if (this.tableData.length > 0 && this.form.leadtype_id != null) {
                  
                    newFields =  Object.keys(this.tableData[0]).map(data => {
                        let obj = {};
                        obj.code = data;
                        obj.name = data.toUpperCase().replace(/_/g, " ");
                        return obj;
                    });

                    return newFields;
                }

                return newFields;
            }
        },

        methods: {
            async fetchLeads() {
                
                let self = this;
                this.activateSpinner = true;
                axios.get('/leads', {params: this.form}).then((response) => {
                    let {data} = response;
                    this.$store.dispatch('leads/setFetchedLeads', data);
                    // console.log("RESPONSE LEAD: ", response)
                    self.tableData = data.new_data;
                    self.activateSpinner = false;
                })
                .catch((e) => {
                        
                });
            },

            async onCloseGenerateModal(event) {
                this.showAddModal = false;
                this.customerID = event ? event : 0;
                this.unAllowExport = this.leads.length > 0 ? false :true;
            }
        }

    };
</script>
<style>
    .bg-gradient-default {
        background: linear-gradient(87deg, #172b4d 0, #37b8f5 100%) !important;
    }

    .page-table-card {
        min-height: 70vh;
    }

    .vs__dropdown-toggle {
        padding: 6px;
        background-color: #fff;
    }
    #missing-lead {
        min-height: 20vh !important;
    }
</style>
