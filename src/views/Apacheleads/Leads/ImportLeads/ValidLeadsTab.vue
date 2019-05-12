<template>
     <div class="row">
        <div class="col">
            <el-table
                :data="tabledata"
                style="width: 100%"
                height="400"
                empty-text="No Data Available">

                <el-table-column
                    sortable
                    v-for="(field, index) in leadtype(leadtype_id).fields" :key="index"
                    :label="field.name">
                </el-table-column>


            </el-table>
        </div>
        
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
    name: "vald-leads-tab-content",
    props: ['importResponse'],
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

        tabledata() {
            const {data} = this.importResponse;

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
