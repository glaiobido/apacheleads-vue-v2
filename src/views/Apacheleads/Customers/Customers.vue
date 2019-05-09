<template>
    <div>
        <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>
        <page-spinner :fullPage="true" :isLoading="activateSpinner"></page-spinner>

        <div class="container-fluid mt--9">
            <div class="row">
                <div class="col">
                    <div class="card shadow page-table-card">
                        <div class="card-header border-0 bg-transparent">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h3 class="mb-0 text-dark">
                                        
                                    </h3>
                                </div>
                                <div class="col text-right">
                                    <base-button 
                                            type="default"
                                            @click="showAddModal = true" 
                                            >Add New Customer</base-button>
                                    </div>
                                </div>
                            </div>
                        
                         <div class="card-body">
                            
                            <div class="row">
                                <div class="col">
                                    <el-table
                                        :data="tabledata.filter(data => !search || data.firstname.toLowerCase().includes(search.toLowerCase()) || data.lastname.toLowerCase().includes(search.toLowerCase()))"
                                        style="width: 100%"
                                        height="400"
                                        empty-text="No Data Available">

                                        <el-table-column
                                            sortable
                                            label="ID"
                                            prop="id">
                                        </el-table-column>

                                        <el-table-column
                                            sortable="false"
                                            sort-by="id"
                                            label="Name"
                                            :formatter="formatterFullname">
                                        </el-table-column>

                                        <el-table-column
                                            sortable
                                            label="Email"
                                            prop="email">
                                        </el-table-column>

                                    
                                        <el-table-column
                                            align="right">

                                        <template slot="header" slot-scope="scope">
                                            <el-input
                                            v-model="search"
                                            size="mini"
                                            placeholder="Search Customer"/>
                                        </template>

                                        <template slot-scope="scope">
                                            <el-button
                                                type="primary"
                                                id="edit-btn-primary"
                                                @click="triggerEditModal(scope.row.id)">Edit</el-button>
                                            <el-button
                                                type="danger"
                                                @click="deleteCustomer(scope.row.id)">Delete</el-button>
                                        </template>

                                        </el-table-column>
                                    </el-table>
                                </div>
                               
                            </div>

                        </div>

                        <div class="card-footer d-flex justify-content-end bg-transparent">
                          
                        </div>

                    </div>


                </div>
            </div>
          
        </div>

        <new-customer-modal 
            :showModal="showAddModal" 
            @closeModal="showAddModal=false"></new-customer-modal>
        
        <edit-customer-modal 
            :showModal="showEditModal"
            :customerID="id" 
            @closeModal="showEditModal=false"></edit-customer-modal>
    </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import NewCustomerModal from './NewCustomerModal.vue';
  import EditCustomerModal from './EditCustomerModal.vue';


    export default {
        name: 'tables',
        components: {
           NewCustomerModal,
           EditCustomerModal
        },

        created() {
            this.activateSpinner = true;
            this.$store.dispatch('users/fetchAllCustomers').then(response => {
                this.tabledata = this.customers;
                this.$store.dispatch('countries/fetchCountries');
            });
            this.activateSpinner = false;
                

        },

        watch: {
           
            customers() {
                this.activateSpinner = true;
                this.tabledata = this.customers;
                this.activateSpinner = false;
            }
        },

        data() {
            return {
                activateSpinner: false,
                showAddModal: false,
                showEditModal: false,
                id: 0,
                tablePerPage: 10,
                tabledata: [],
                search: ''
            }
        },

        computed: {
            ...mapGetters({
                user: 'auth/user',
                leadtypes: 'leadtypes/leadtypes',
                customers: 'users/customers',
                countries: 'countries/countries'
            })
        },

        methods: {
            triggerEditModal(customer_id) {
                this.id = customer_id;
                this.showEditModal = true;
            },

            async deleteCustomer(customer_id) {

                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        
                        axios.delete(`/customers/${customer_id}`).then(response => {
                           this.$store.dispatch('users/fetchAllCustomers');
                        });
                        this.$swal(
                            'Deleted!',
                            'Customer has been deleted.',
                            'success'
                        )
                    }
                });
            },

            
            formatterFullname(row, column, cellValue, index) {
                let fullname = (Object.entries(row).length > 0) ? row.firstname + " " + row.lastname : "";
                // console.log("rows: ", fullname)
                return fullname;
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

    #edit-btn-primary {
        background-color: #162b4d !important;
        border-color: #162b4d !important;
    }
</style>
