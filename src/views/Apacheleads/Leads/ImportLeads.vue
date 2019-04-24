<template>
    <div>
        <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

        <div class="container-fluid mt--9">
            <div class="row">
                <div class="col">
                    <div class="card shadow page-table-card">
                        <div class="card-header border-0 bg-transparent">
                            <form action="">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="form-group">
                                            <label class="form-control-label">Select Lead Type: </label>
                                            <v-select :options="leadtypes" 
                                                      :reduce="leadtype => leadtype.id"
                                                       v-model="leadtype_id"
                                                      label="name"  />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <label class="form-control-label">Select CSV file: </label>
                                        <base-input 
                                            class="input-group-alternative"
                                            accept=".csv"
                                            @change="onFileChange"
                                            type="file"/>
            
                                    </div>
                                    <div class="col text-right">
                                        <div class="form-group">
                                            <base-button
                                                    @click="submitForImport()" 
                                                    type="default" 
                                                    class="my-4">Import</base-button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                         
                        </div>
                            
                         <div class="table-responsive">
                            <base-table class="table align-items-center table-flush dark"
                                        thead-classes="thead-light"
                                        tbody-classes="list"
                                        :data="imported_data">

                                <template v-if="leadtype_id != null" slot="columns">
                                    <th v-for="(field, index) in fields" :key="index">{{ field.name }}</th>
                                   
                                </template>

                                <template slot-scope="{row}">
                                    
                                </template>

                            </base-table>
                        </div>
                       

                        <div class="card-footer bg-transparent">
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
  

  export default {
    name: 'leads',
    components: {
        'v-select': vSelect
    },
    data() {
      return {
        file: null,
        leadtype_id: null,
        imported_data: []
      }
    },
    created() {
        this.$store.dispatch('leadtypes/fetchLeadTypes');
    },

    computed: {
        ...mapGetters({
            user: 'auth/user',
            leadtypes: 'leadtypes/leadtypes',
            leadtype: 'leadtypes/leadtype'
        }),

        fields: function() {
            return (this.leadtype_id != null) ? this.leadtype(this.leadtype_id).fields : [];
        }
    },

    methods: {
        onFileChange(event) {
            this.file = event.target.files[0];
            console.log("file: ", event.target.files)
        },
        
        async submitForImport() {
                let formData = new FormData();
                formData.append('file', this.file);
                formData.append('leadtype_id', this.leadtype_id);

                axios.post('/leads/import', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function(response){
                    console.log("response " , response.data[0])
                    this.imported_data = response;
                })
                .catch(function(){
                    console.log('FAILURE!!');
                });
        }
    }
  };
</script>
<style></style>
