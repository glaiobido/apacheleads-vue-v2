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
                                        Lead Types
                                    </h3>
                                </div>
                                <div class="col text-right">
                                    <base-button 
                                            type="default"
                                            @click="showAddModal = true" 
                                            >Add Lead Type</base-button>
                                    </div>
                                </div>
                            </div>
                        
                         <div class="card-body">
                            
                            <div class="row">
                                <div class="col">
                                    <el-table
                                        :data="tabledata.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                                        style="width: 100%"
                                        height="400"
                                        empty-text="No Data Available">

                                        <el-table-column
                                            sortable
                                            label="ID"
                                            prop="id">
                                        </el-table-column>

                                        <el-table-column
                                            sortable
                                            label="Name"
                                            prop="name">
                                        </el-table-column>

                                    
                                        <el-table-column
                                            align="right">

                                        <template slot="header" slot-scope="scope">
                                            <el-input
                                            v-model="search"
                                            size="mini"
                                            placeholder="Search Lead Type"/>
                                        </template>

                                        <template slot-scope="scope">
                                            <el-button
                                                type="primary"
                                                id="edit-btn-primary"
                                                @click="triggerEditModal(scope.row.id)">Edit</el-button>
                                            <el-button
                                                type="danger"
                                                @click="deleteLeadType(scope.row.id)">Delete</el-button>
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


        <add-lead-type-modal :showModal="showAddModal" @closeModal="showAddModal=false"></add-lead-type-modal>
        <edit-lead-type-modal 
            :showModal="showEditModal"
            :leadTypeId="id" 
            @closeModal="showEditModal=false"></edit-lead-type-modal>
    </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import ProjectsTable from '../../Tables/ProjectsTable';
  import AddLeadTypeModal from './AddLeadTypeModal'
  import EditLeadTypeModal from './EditLeadTypeModal';


    export default {
        name: 'tables',
        components: {
            AddLeadTypeModal,
            EditLeadTypeModal
        },

        created() {
            this.activateSpinner = true;
            this.$store.dispatch('leadtypes/fetchLeadTypes').then(response => {
                this.tabledata = this.leadtypes;
                this.activateSpinner = false;
                
            });
        },

        watch: {
            // tabledata (val) {
            //     // this.$refs.vuetable.reload();
            //     this.activateSpinner = false;
            // },
            leadtypes() {
                this.activateSpinner = true;
                this.tabledata = this.leadtypes;
                this.activateSpinner =false;
                // this.$refs.vuetable.reload();
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
                leadtypes: 'leadtypes/leadtypes'
            })
        },

        methods: {
            triggerEditModal(lead_type_id) {
                this.id = lead_type_id;
                this.showEditModal = true;
            },

            async deleteLeadType(lead_type_id) {

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
                        axios.delete(`/leadtypes/${lead_type_id}`).then(response => {
                           this.$store.dispatch('leadtypes/fetchLeadTypes');
                        });
                        this.$swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                });
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
