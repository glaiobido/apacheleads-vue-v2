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
                                                    v-if="importbtn"
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
                                        :data="details">

                                <template v-if="leadtype_id != null" slot="columns">
                                    <th v-for="(field, index) in fields" :key="index">{{ field.name }}</th>
                                   
                                </template>

                                <template slot-scope="{row}">
                                    <td class="budget" v-for="(data, index) in row" :key="index">
                                        {{data}}
                                    </td>
                                    
                                   
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
        imported_data: [],
        importbtn: false
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
        },

        details: function() {
            return this.imported_data.map(data => {
                
                if (data.hasOwnProperty('info')) {
                    return data.info;
                } else {
                    return;
                }
            })
        }
    },

    methods: {
        onFileChange(event) {
            this.file = event.target.files[0];
            this.importbtn = true;
            console.log("file: ", event.target.files);

            let formData = new FormData();
                formData.append('file', this.file);
                formData.append('leadtype_id', this.leadtype_id);
            let self = this;

                axios.post('/leads/import', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function(response){
                    const { data } = response;
                    console.log("response " , data.import_data)

                    self.imported_data =data.import_data;
                    
                })
                .catch(function(){
                    console.log('FAILURE!!');
                });
        },
        
        async submitForImport() {
                 this.$swal({
                    title: 'Importing file...',
                    text: "File contents will be saved to our database",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Proceed'
                }).then((result) => {
                    if (result.value) {
                      
                        this.$swal(
                            'Success!',
                            'Your file has been successfully imported.',
                            'success'
                        )
                    }
                });
        }
    }
  };
</script>
<style></style>
