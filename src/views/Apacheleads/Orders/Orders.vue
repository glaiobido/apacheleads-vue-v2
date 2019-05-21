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
                        </div>

                        <div class="card-body" >
                            
                            <div class="row">
                                <div class="col">
                                    <el-table
                                        :data="tableData"
                                        style="width: 100%"
                                        height="400"
                                        stripe
                                        empty-text="No Data Available">

                                        <el-table-column
                                            sortable
                                            v-for="(field, index) in formatted_fields" :key="index"
                                            :fixed="index == 0"
                                            :label="field.name"
                                            :prop="field.code"
                                            width="200">
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
          
            <add-lead-type-modal :showModal="showAddModal" @closeModal="showAddModal=false"></add-lead-type-modal>
        </div>
       
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import flatPicker from "vue-flatpickr-component";
    import "flatpickr/dist/flatpickr.css";
    import AddLeadTypeModal from './AddLeadTypeModal'
  

    export default {
        
        components: {
            vSelect,
            flatPicker,
            'add-lead-type-modal': AddLeadTypeModal

        },

        created() {
            this.$store.dispatch('leadtypes/fetchLeadTypes');
        },

        data() {
            return {
                activateSpinner: false,
                tableData: [],
                currentPage: 1,
                showAddModal: false,
                showEditModal: false
            }
        },

        computed: {
            ...mapGetters({
                user: 'auth/user',
                leadtypes: 'leadtypes/leadtypes',
                leadtype: 'leadtypes/leadtype',
                // leadtype_id: 'leadtypes/leadtype_id',
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
</style>
