<template>
<div class="">
    <page-spinner :fullPage="true" :isLoading="activateSpinner"></page-spinner>
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
                <div class="col text-right">
                    <base-button type="default">Import Leads</base-button>
                </div>
            </div>
        </form>
    
</div>
</template>

<script>

import axios from 'axios';
import { mapGetters } from 'vuex';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
    props: ['importResponse'],
    name: 'import-tab-content',
    components: {
        vSelect
    },
    data() {
        return {
            activateSpinner: false,
            file: null,
            leadtype_id: null,
            imported_data: [],
            importbtn: false,
            import_error: null
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            leadtypes: 'leadtypes/leadtypes',
            leadtype: 'leadtypes/leadtype'
        })
    },

    watch: {
        leadtype_id: function(value) {
            this.fileButtonStatus(value);
            this.$store.dispatch('leadtypes/assignLeadtypeID', {'id': value})
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
                    self.$emit('on-import', data);
                    
                })
                .catch(function(e){
                    console.log('FAILURE!!', e);
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
}
</script>

<style>

</style>
