<template>
    <modal :show.sync="showModal"
               body-classes="p-0"
               modal-classes="modal-dialog-centered">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
               
                <template>
                    <div class="text-center text-muted mb-4">
                        <h1 class="display-4">Create an Order</h1>
                    </div>
                    <form role="form">
                         <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <base-input alternative
                                                label="Customer Email"
                                                v-model="form.name"
                                                class="mb-3"
                                                placeholder="email">
                                    </base-input>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>

                            <div class="col">
                               <div class="form-group">
                                    <label class="form-control-label">Select Lead Type: </label>
                                    <v-select :options="leadtypes" 
                                                :reduce="leadtype => leadtype.id"
                                                v-model="form.leadtype_id"
                                                label="name"  />
                                </div>
                            
                            </div>
                        </div>
                         <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                                        <flat-picker slot-scope="{focus, blur}"
                                                    @on-open="focus"
                                                    @on-close="blur"
                                                    :config="{allowInput: true}"
                                                    class="form-control datepicker"
                                                    v-model="form.import_date">
                                        </flat-picker>
                                    </base-input>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>

                           
                        </div>
                        <hr>
                      
                        
                        <div class="text-center">
                            <base-button type="default" class="my-4" @click="saveLeadType()">Generate CSV</base-button>
                            <base-button type="secondary" class="my-4" @click="$emit('closeModal')">Cancel</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
</template>

<script>

import Modal from "@/components/Modal.vue";
import axios from 'axios';
import draggable from 'vuedraggable';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { mapGetters } from 'vuex';
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
    props: ['showModal'],
    name: 'add-lead-type-modal',
    components: {
        Modal,
        draggable,
        'v-select': vSelect,
        flatPicker
    },
    
    data() {
        return {
            form: {
                name: null,
                country: 'AU',
                leadtype_id: 0,
                fields: [
                   {'name': ""}
                ],
                import_date: ""
            }
        }
    },
    created() {

    },

    computed: {
        ...mapGetters({
            user: 'auth/user',
            leadtypes: 'leadtypes/leadtypes',
            leadtype: 'leadtypes/leadtype'
        })
    },

    watch: {
        fields: function (newQuestion, oldQuestion) {
            
        }
    },

    methods: {
        addField() {
            this.form.fields.push({
                name: ''
            })
        },
        removeField(index) {
            this.form.fields.splice(index, 1);
        },

        saveLeadType() {
            // axios.post('/leadtypes', this.form).then((reponse) => {
            //      this.$swal({
            //         title: 'Success!',
            //         text: 'Lead Type has been added successfully',
            //         type: 'success',
            //         confirmButtonText: 'Ok'
            //     })
            //     .then((result) => {
            //         this.$store.dispatch('leadtypes/fetchLeadTypes');
            //         this.$emit('closeModal')
            //     });
            // })
            // .catch((e) => {
                    
            // });
        }
    }
};
</script>
<style>
    .vs__dropdown-toggle {
        padding: 6px;
        background-color: #fff;
    }
</style>