<template>
    <div>
        <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

        <div class="container-fluid mt--9">
            <div class="row">
                <div class="col">
                    <div class="card shadow page-table-card">
                        <div class="card-header border-0 bg-transparent">
                            <div class="row align-items-center">
                                <div class="col">
                                <h3 class="mb-0 text-dark">
                                    Lead Types
                                </h3>
                                </div>
                                <div class="col text-right">
                                <base-button type="default">Add Lead Type</base-button>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <base-table class="table align-items-center table-flush dark"
                                        thead-classes="thead-light"
                                        tbody-classes="list"
                                        :data="tableData">

                                <template slot="columns">
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th></th>
                                </template>

                                <template slot-scope="{row}">
                               
                                </template>

                            </base-table>
                        </div>

                        <div class="card-footer d-flex justify-content-end bg-transparent">
                           
                        </div>

                    </div>


                </div>
            </div>
          
        </div>

    </div>
</template>
<script>
  import ProjectsTable from '../../Tables/ProjectsTable'
  export default {
    name: 'tables',
    components: {
      ProjectsTable
    },

    data() {
        return {
            type: '',
            tableData: []
        }
    }

  };
</script>
<style>
    .bg-gradient-default {
        background: linear-gradient(87deg, #172b4d 0, #37b8f5 100%) !important;
    }

    .page-table-card {
        min-height: 70vh;
    }
</style>
