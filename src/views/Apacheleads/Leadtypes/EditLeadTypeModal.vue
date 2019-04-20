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
                        <h1 class="display-4">Update Lead Type</h1>
                    </div>
                    <form role="form">
                         <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <base-input alternative
                                                label="Lead Type Name"
                                                v-model="form.name"
                                                class="mb-3"
                                                placeholder="Name">
                                    </base-input>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>

                            <div class="col">
                                <div class="form-group">
                                    <label class="form-control-label">Country:</label>            
                                    <select class="form-control input-group-alternative" v-model="form.country">
                                        <option value="AU">Australia</option>
                                        <option value="US">USA</option>
                                    </select>
                                    <small class="form-text text-muted"></small>
                                </div>
                            
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <h4>Add fields: </h4>

                                <div class="form-group" v-for="(field, index) of form.fields" :key="index">
                                    <div class="my-1">
                                        <base-button
                                            @click="addField()"
                                            size="sm" 
                                            type="default">Add</base-button>
                                        <base-button
                                            v-if="index != 0 && field.is_new == true" 
                                            size="sm"
                                            @click="removeField(index)" 
                                            type="warning">Remove</base-button>
                                    </div>
                                
                                    <base-input alternative
                                                v-model="field.name" 
                                                class="mb-2"
                                                placeholder="Field name">
                                    </base-input>
                                    <small class="form-text text-muted"></small>
                                </div>
                               
                            </div>
                          
                        </div>
                        
                        <div class="text-center">
                            <base-button type="default" class="my-4" @click="saveLeadType()">Save</base-button>
                            <base-button type="secondary" class="my-4" @click="$emit('closeModal')">Cancel</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
</template>

<script>

import axios from 'axios';
import { mapGetters } from 'vuex';
import Modal from "@/components/Modal.vue";

export default {
    props: ['showModal', 'leadTypeId'],
    components: {
        Modal
    },
    
    data() {
        return {
            form: {
                name: null,
                country: 'AU',
                fields: [
                   {'name': "", 'is_new': false}
                ],

            },
        }
    },
    created() {
       
    },

    computed: {
        ...mapGetters({
            user: 'auth/user',
            leadtype: 'leadtypes/leadtype', 
            leadtypes: 'leadtypes/leadtypes' 
        })
    },

    watch: {
        showModal: function(val) {
           this.getDetails();
        }
    },

    methods: {
        addField() {
            this.form.fields.push({
                name: '',
                is_new: true,
                id: 0
            })
        },

        async saveLeadType() {
            axios.put(`/leadtypes/${this.leadTypeId}`, this.form).then((reponse) => {
                this.$store.dispatch('leadtypes/fetchLeadTypes');
                this.$swal({
                    title: 'Success!',
                    text: 'Changes have been saved successfully',
                    type: 'success',
                    confirmButtonText: 'Ok'
                });
                this.$emit('closeModal')
            })
            .catch((e) => {
                this.$swal({
                    title: 'Unable to save',
                    text: 'Please try saving changes again',
                    type: 'error',
                    confirmButtonText: 'Ok'
                }); 
            });
        },

        async getDetails() {
            var data = this.leadtype(this.leadTypeId);

            this.form.name = data.name;
            this.form.country = "AU"; // data.country;

            this.form.fields = data.fields.map(field => {
                return { 
                    'name': field.name,
                    'id': field.id,
                    'is_new': false
                }
            });
        },

        closeModal() {
            this.$emit('closeModal');
        },

        removeField(index) {
            this.form.fields.splice(index, 1);
        }
    }
};
</script>
