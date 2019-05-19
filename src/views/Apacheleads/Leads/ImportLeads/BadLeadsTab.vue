<template>
<div>
        <base-alert type="danger">
            <strong><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Cannot Import the Following Leads.</strong> Lead emails are of invalid format and/or no emails provided.
        </base-alert>
    <div class="row">
        
        <div class="col">
            <el-table
                :data="tabledata"
                style="width: 100%"
                height="400"
                empty-text="No Data Available">

                <el-table-column
                    sortable
                    v-for="(field, index) in formatted_fields" :key="index"
                    :prop="field.name"
                    :label="field.name">
                </el-table-column>
            </el-table>
        </div>
        
    </div>

    
</div>
</template>

<script>

import { mapGetters } from 'vuex';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
    name: "bad-leads-tab-content",
    props: ['badLeads'],
    components: {},
    data() {
        return {
            
        }
    },

    computed: {
        ...mapGetters({
            user: 'auth/user',
            leadtypes: 'leadtypes/leadtypes',
            leadtype: 'leadtypes/leadtype',
            leadtype_id: 'leadtypes/leadtype_id',
        }),

        formatted_fields() {
            let newFields = (this.leadtype_id) ? this.leadtype(this.leadtype_id).fields.map(data => {
                let obj = {};
                obj.name = data.name.replace(/ /g,"_");
                obj.id = data.id;
                obj.order = data.order,
                obj.lead_type_id = data.lead_type_id;
                return obj;
            }) : [];

            return newFields;
        },

        tabledata() {
            let returnData = [];
            returnData = this.badLeads ? this.badLeads.map(data => data.info) : [];
            return returnData;
        }
    },

    methods: {
        async formatTableData() {
            return [];
        }
    }
}
</script>

<style>

</style>
