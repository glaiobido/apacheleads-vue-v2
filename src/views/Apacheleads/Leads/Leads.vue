<template>
    <div>
        <page-spinner :fullPage="true" :isLoading="activateSpinner"></page-spinner>
        <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

        <div class="container-fluid mt--9">
            <div class="row">
                <div class="col">
                    <div class="card shadow page-table-card">
                        <div class="card-header border-0 bg-transparent">
                            <form @submit.prevent="fetchLeads">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-control-label">Select Lead Type: </label>
                                            <v-select :options="leadtypes" 
                                                    :reduce="leadtype => leadtype.id"
                                                    v-model="form.leadtype_id"
                                                    class="required"
                                                    label="name"  />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-control-label">Leads Imported Up To Date: </label>
                                            <base-input addon-left-icon="ni ni-calendar-grid-58">
                                                <flat-picker slot-scope="{focus, blur}"
                                                            @on-open="focus"
                                                            @on-close="blur"
                                                            :config="{allowInput: true}"
                                                            class="form-control datepicker"
                                                            v-model="form.import_date">
                                                </flat-picker>
                                            </base-input>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group mb-0">
                                            <label class="form-control-label"></label>
                                            <base-button
                                                nativeType="submit" 
                                                type="default">
                                                Get Leads
                                            </base-button>
                                        </div>
                                    </div>
                                </div>
                            </form>                            
                        </div>

                        <div class="card-body" >
                            <div class="row">
                                <div class="col">
                                    <el-table
                                        :data="leads"
                                        style="width: 100%"
                                        height="400"
                                        empty-text="No Data Available">

                                        <el-table-column
                                            sortable
                                            v-for="(field, index) in formatted_fields" :key="index"
                                            :fixed="index == 0"
                                            :label="field"
                                            width="150">
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

        created() {
            this.$store.dispatch('leadtypes/fetchLeadTypes');
        },

        data() {
            return {
                activateSpinner: false,
                form: {
                    leadtype_id: null,
                    import_date: null
                }
            }
        },

        computed: {
            ...mapGetters({
                user: 'auth/user',
                leadtypes: 'leadtypes/leadtypes',
                leadtype_id: 'leadtypes/leadtype_id',
                leads: 'leads/leads'
            }),

            formatted_fields() {
                if (this.leads.length > 0) {
                    return Object.keys(this.leads[0]);
                }

                return [];
            }
        },

        methods: {
            async fetchLeads() {
                
                let self = this;
                console.log("submit get: ", this.form)
                this.activateSpinner = true;
                axios.get('/leads', {params: this.form}).then((response) => {
                    let {data} = response;
                    this.$store.dispatch('leads/setFetchedLeads', data);
                    console.log("RESPONSE LEAD: ", data)
                    self.activateSpinner = false;
                })
                .catch((e) => {
                        
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

    .vs__dropdown-toggle {
        padding: 6px;
        background-color: #fff;
    }
</style>
