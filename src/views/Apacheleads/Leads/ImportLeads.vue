<template>
    <div>
        <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

        <div class="container-fluid mt--9">
            <div class="row">
                <div class="col">
                    <div class="card shadow page-table-card">
                        <div class="card-header border-0 bg-transparent">
                               
                         
                        </div>

                       

                        <div class="card-footer bg-transparent">
                            <form role="form">
                                 <input type="file" 
                                                id="file"
                                                class="form-control"
                                                accept=".csv"
                                                @change="onFileChange">

                                <div class="text-center">
                                    <base-button
                                            @click="submitForImport()" 
                                            type="primary" 
                                            class="my-4">Import</base-button>
                                </div>
                            </form>
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
    data() {
      return {
        file: null,
        leadtype_id: 0
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
                formData.append('leadtype_id', 3);

                axios.post('/leads/import', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function(){
                    console.log('SUCCESS!!');
                })
                .catch(function(){
                    console.log('FAILURE!!');
                });
        }
    }
  };
</script>
<style></style>
