<template>
    <div>
        <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>
        <page-spinner :fullPage="true" :isLoading="activateSpinner"></page-spinner>
        <div class="container-fluid mt--9">
            <div class="row">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <div class="card shadow page-table-card">
                        
                        <div class="card-content">
                            <h1 class="display-4">Hello, {{ user && user.firstname ? user.firstname : "" }}!</h1>
                            <p class="lead">Please Select your CSV File of Leads to import.</p>
                            <p>Take note of the following before uploading your file:</p>
                            <ul>
                                <li>Choose a Lead Type for this import.</li>
                                <li>Row Headings in your file is required.</li>
                                <li>Columns should be in the same order as listed upon selecting your Lead Type</li>
                            </ul>
                            <hr class="my-4">
                            
                                <form role="form">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <div class="form-group">
                                                <label class="form-control-label">1. Select Lead Type: </label>
                                                <v-select :options="leadtypes" 
                                                        :reduce="leadtype => leadtype.id"
                                                        v-model="leadtype_id"
                                                        class="required"
                                                        label="name"  />
                                            </div>
                                        </div>

                                        <div class="col">
                                            <label class="form-control-label">2. Select CSV file: </label>
                                            <base-input 
                                                class="input-group-alternative"
                                                disabled=""
                                                id="file-uploader"
                                                accept=".csv"
                                                @change="onFileChange"
                                                type="file"/>
                
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-4">
                                            <base-button type="default" size="lg">Import Leads</base-button>
                                        </div>
                                        <p class="lead">

                                        </p>
                                    </div>
                                </form>
                            
                        </div>
                      
                       
                    </div>


                </div>

                <div class="col-xl-4">
                    <div class="card shadow">
                        <div class="card-content">
                           
                                <div>
                                    <h3 v-if="leadtype_id == null"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No Lead Type selected</h3>
                                    <h2 v-else>{{ leadtype_name }} Headers:</h2>
                                </div>

                                <div>
                                    <ol>
                                        <li v-for="(field, index) in fields" :key="index">{{ field }}</li>
                                    </ol>
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
        importbtn: false,
        activateSpinner: false
      }
    },
    created() {
        this.$store.dispatch('leadtypes/fetchLeadTypes');
    },

    watch: {
        leadtype_id: function(value) {
            this.fileButtonStatus(value);


        }
    },

    computed: {
        ...mapGetters({
            user: 'auth/user',
            leadtypes: 'leadtypes/leadtypes',
            leadtype: 'leadtypes/leadtype'
        }),


        details: function() {
            if (this.imported_data.length > 0) {

                return this.imported_data.map(data => {
                    
                    if (data.hasOwnProperty('info')) {
                        return data.info;
                    } else {
                        return;
                    }
                })
            } else {
                return [];
            }

        },

        leadtype_name: function() {
            return (this.leadtype_id != null) ? this.leadtype(this.leadtype_id).name : "";
        },

        fields: function() {
            return (this.leadtype_id != null) ? this.leadtype(this.leadtype_id).fields : ['test'];
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
                this.activateSpinner = true;
                axios.post('/leads/import', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function(response){
                    const { data } = response;
                    console.log("response " , data.import_data)

                    self.imported_data = data.import_data;
                    self.activateSpinner = false;
                    
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
        },

        fileButtonStatus(id) {
            const filebtn = document.getElementById('file-uploader');
            if (id != null) {
                // enable button
                filebtn.removeAttribute("disabled");
            } else {
                filebtn.setAttribute("disabled", "true");
            }
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
