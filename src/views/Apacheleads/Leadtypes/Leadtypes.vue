<template>
    <div>
        <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

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
                           
                            <div class="table-responsive">
                                <vuetable ref="vuetable"
                                    :css="css.table"
                                    :fields="fields"
                                    :api-mode="false"
                                    :data-manager="tableDataMgr"
                                    pagination-path="pagination"
                                    @vuetable:pagination-data="onPaginationData"
                                >
                                <div slot="actions" slot-scope="props">
                                    <base-button
                                            @click="triggerEditModal(props.rowData.id)"
                                            type="default" 
                                            class="my--1">Edit</base-button>
                                    <base-button type="warning" 
                                                     outline 
                                                     class="my--1" 
                                                     @click="deleteLeadType(props.rowData.id)">Delete</base-button>
                                   
                                </div>
                                </vuetable>
                               
                            </div>

                        </div>

                        <div class="card-footer d-flex justify-content-end bg-transparent">
                            <vuetable-pagination ref="pagination"
                                @vuetable-pagination:change-page="onChangePage"
                                :css="css.pagination"
                            ></vuetable-pagination>
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
  import Vuetable from 'vuetable-2';
  import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
  import VueTableCustomStyle from "./VueTableCustomStyle.js";
  import _ from "lodash";


    export default {
        name: 'tables',
        components: {
            AddLeadTypeModal,
            EditLeadTypeModal,
            Vuetable,
            VuetablePagination
        },

        created() {
            this.$store.dispatch('leadtypes/fetchLeadTypes').then(response => {
                this.tabledata = this.leadtypes;
                console.log("created hook: ", this.tabledata)
            });
        },

        watch: {
            tabledata (val) {
                console.log("table watch ", val);
                this.$refs.vuetable.reload();
            },
            leadtypes() {
                this.tabledata = this.leadtypes;
                this.$refs.vuetable.reload();
            }
        },

        data() {
            return {
                showAddModal: false,
                showEditModal: false,
                id: 0,
                tablePerPage: 10,
                css: VueTableCustomStyle,
                tabledata: [],
                fields: [
                    {
                        name: 'id',
                        sortField: 'id'  
                    },
                    {
                        name: 'name',
                        sortField: 'name'  
                    },
                    {
                        name: 'actions',
                        sortField: 'name'  
                    }
                ]
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
            },

            tableDataMgr(sortOrder, pagination) {
                if (this.tabledata.length < 1) return;
               
                let local = this.tabledata;

                if (sortOrder.length > 0) {
                    console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
                    local = _.orderBy(
                        local,
                        sortOrder[0].sortField,
                        sortOrder[0].direction
                    );
                }

                pagination = this.$refs.vuetable.makePagination(
                    local.length,
                    this.tablePerPage
                );


                let from = pagination.from - 1;
                let to = from + this.tablePerPage;
                console.log("tableDataMgr ",from)

                let returnObj = {
                    pagination: pagination,
                    data: _.slice(local, from, to)

                }
                    console.log("table manager return : ", returnObj);
                return returnObj;
            },

            async onPaginationData(paginationData) {
                console.log("REF: ", this.$refs.pagination)
                this.$refs.pagination.setPaginationData(paginationData);
            },

            onChangePage(page) {
                this.$refs.vuetable.changePage(page);
            },

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
</style>
