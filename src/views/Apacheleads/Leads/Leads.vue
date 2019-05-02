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
                                    Leads
                                </h3>
                                </div>
                                <div class="col text-right">
                                <!-- <base-button 
                                        type="default"
                                        @click="showAddModal = true" 
                                        >Add Lead Type</base-button> -->
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <base-table class="table align-items-center table-flush dark"
                                        thead-classes="thead-light"
                                        tbody-classes="list"
                                        :data="leadtypes">

                                <template slot="columns">
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th></th>
                                </template>

                                <template slot-scope="{row}">
                                    <td class="budget">
                                        {{row.id}}
                                    </td>
                                    <td class="budget">
                                        {{row.name}}
                                    </td>
                                    <td class="budget">
                                        AU
                                    </td>
                                    <td class="budget">
                                        <base-button
                                            @click="triggerEditModal(row.id)" 
                                            type="default" 
                                            class="my--1">Edit</base-button>
                                        <base-button type="warning" 
                                                     outline 
                                                     class="my--1" 
                                                     @click="deleteLeadType(row.id)">Delete</base-button>
                                    </td>
                                </template>

                            </base-table>
                        </div>

                        <div class="card-footer d-flex justify-content-end bg-transparent">
                           
                        </div>

                    </div>


                </div>
            </div>
          
        </div>
       
    </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  
  

    export default {
        name: 'tables',
        components: {
         
        },

        created() {
            this.$store.dispatch('leadtypes/fetchLeadTypes');
        },

        data() {
            return {
                showAddModal: false,
                showEditModal: false,
                id: 0
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
</style>
