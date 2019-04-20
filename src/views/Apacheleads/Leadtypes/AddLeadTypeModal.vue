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
                        <h1 class="display-4">New Lead Type</h1>
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

                                <div class="form-group" v-for="(field, index) of form.fields" v-bind:key="index">
                                    <div class="my-1">
                                        <base-button
                                            @click="addField()"
                                            size="sm" 
                                            type="default">Add</base-button>
                                        <base-button
                                            v-if="index != 0" 
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

import Modal from "@/components/Modal.vue";
import axios from 'axios';

export default {
    props: ['showModal'],
    components: {
        Modal
    },
    
    data() {
        return {
            form: {
                name: null,
                country: 'AU',
                fields: [
                   {'name': ""}
                ],

            }
        }
    },
    created() {

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
            axios.post('/leadtypes', this.form).then((reponse) => {
                 this.$swal({
                    title: 'Success!',
                    text: 'Lead Type has been added successfully',
                    type: 'success',
                    confirmButtonText: 'Ok'
                })
                .then((result) => {
                    this.$store.dispatch('leadtypes/fetchLeadTypes');
                    this.$emit('closeModal')
                });
            })
            .catch((e) => {
                    
            });
        }
    }
};
</script>
