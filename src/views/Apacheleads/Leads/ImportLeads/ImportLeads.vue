<template>
    <div>
        <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>
        <page-spinner :fullPage="true" :isLoading="activateSpinner"></page-spinner>
        
        <div class="container-fluid mt--9">
            <div class="row">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <div class="card shadow">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="import-tab-content">Import Leads</el-menu-item>
                            <el-menu-item index="vald-leads-tab-content" :disabled="valid_data_count == 0">
                                Valid Leads <span v-if="valid_data_count != 0" class="badge badge-success">{{ valid_data_count }}</span>
                            </el-menu-item>
                            <el-menu-item index="bad-leads" disabled>Bad Leads</el-menu-item>
                            <el-menu-item index="duplicates" disabled>Duplicate Leads</el-menu-item>
                        </el-menu>
                        <div class="line"></div>
                            
                        <div class="card-content">
                            <keep-alive>
                            <component
                                v-bind:is="activeIndex"
                                class="tab"
                                ref="tab-contents"
                                :importResponse="importResponse"
                                @on-import="onImportEvent"
                            ></component>
                            </keep-alive>
                        </div>

                        <div class="card-footer">
                            <base-button
                                    @click="saveValidLeads()"
                                    v-if="activeIndex == 'vald-leads-tab-content'" 
                                    type="default">Import Leads</base-button>
                        </div>
            
                       
                    </div>
                

                </div>

                <div class="col-xl-4">
                    <div class="card shadow page-table-card">
                        <div class="card-content">
                           
                                <div>
                                    <h3 v-if="leadtype_id == 0"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No Lead Type selected</h3>
                                    <h2 v-else>{{ leadtype_name }} Headers:</h2>
                                </div>

                                <div>
                                    <ul  
                                        v-if="leadtype_fields.length != 0" 
                                        class="list-group list-group-flush border" style="height: 400px; overflow-y:scroll">
                                        <li v-for="(field, index) in leadtype_fields" :key="index" class="list-group-item">{{field.order}} {{ field.name }}</li>
                                        
                                    </ul>
                                </div>
                            
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
    import ImportTab from './ImportTab';
    import ValidLeadsTab from './ValidLeadsTab';
  

  export default {
    name: 'leads',
    components: {
        vSelect,
        'import-tab-content': ImportTab,
        'vald-leads-tab-content': ValidLeadsTab
    },
    data() {
      return {
        activateSpinner: false,
        activeIndex: 'import-tab-content',
        leadtype_fields: [],
        leadtype_name: "",
        importResponse: null,
        valid_data_count: 0,
        importError: false
      }
    },
    created() {
        this.$store.dispatch('leadtypes/fetchLeadTypes');
    },

    watch: {
        leadtype_id: function(value) {
            this.leadtype_fields = (value != null) ? this.leadtype(value).fields : [];
            this.leadtype_name = (value != null) ? this.leadtype(value).name : "";
        }
    },

    computed: {
        ...mapGetters({
            user: 'auth/user',
            leadtypes: 'leadtypes/leadtypes',
            leadtype: 'leadtypes/leadtype',
            leadtype_id: 'leadtypes/leadtype_id'
        })
        
    },

    methods: {
        handleSelect(key, keyPath) {
            console.log("key: ", key)
            console.log("key path: ", keyPath)
            this.activeIndex = key;

            console.log(this.$refs)
        },

        onImportEvent(event) {
            const {import_data, valid_leads_count, error} = event;
            this.importResponse = event ? import_data : null;
            this.valid_data_count = event ? valid_leads_count : 0;
            this.importError = error || false;
            
            if (this.importError == false) {
                this.activeIndex ='vald-leads-tab-content';
            }
        },
        
        async saveValidLeads() {
            let payload = {
                data: this.importResponse
            },
            self = this;
            axios.post('/leads', payload).then((reponse) => {
                 this.$swal({
                    title: 'Success!',
                    text: 'Valid Leads have been saved successfully',
                    type: 'success',
                    confirmButtonText: 'Ok'
                })
                .then((result) => {
                    // this.$router.go('/import-leads');
                    // this.$store.dispatch('leadtypes/fetchLeadTypes');
                });
            })
            .catch((e) => {
                    
            });
        }
    }
  };
</script>

<style>
    .page-table-card {
        min-height: 70vh;
    }

    .card-content {
        padding: 4rem 2rem;
    }

    .v-select .vs--single .vs--searchable .required {
        border: solid 1px #f5365c;
        border-radius: 4px !important;
    }
</style>
