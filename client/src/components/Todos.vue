<template>
  <div class="container" style="padding-top:5%;">
    <div class="row">
      <div class="col-md-11" style="margin:auto">
        <!-- <a @click="ShowForm">+ Todo</a> -->
        <!-- <b-btn @click="$root.$emit('show::modal','modal1')">+ Todo</b-btn> -->
        <div id="divFrm">
          <h3>Todo</h3>
          <input type="text" id="txtTitle" placeholder="input your title" v-model="form_todo.title"/><br/>
          <input type="submit" @click.prevent="saveTodo" :value="createedit" />
          <input type="reset" @click.prevent="reset" />
        </div>
        <br/>
        <br/>


        <table class="table table-striped table-bordered" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created At</th>
              <th>Finish Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in todoList">
              <td> {{todo.title}} </td>
              <td> {{todo.created_date}}</td>
              <td v-if="typeof todo.completed_date !== 'undefined'"> {{todo.completed_date}}</td>
              <td v-else> <a @click.prevent="markAsDone(todo._id)">Finish</a> </td>
              <td>
                <a @click.prevent="showEdit(todo)">Edit</a>
                <a @click.prevent="deleteTodo(todo._id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>


  import { mapGetters } from 'vuex'


  export default {
    name: 'Todos',
    data() {
      return {
        initial_todo : {
          title: '',
          _id: null
        },
        form_todo : {},
        createedit: 'CREATE'
      }
    },
    computed: {
      ...mapGetters([
        'todoList'
      ])
    },
    created: function () {
      this.$store.dispatch('getTodo');
      this.form_todo = this.initial_todo;
      $(document).ready(function() {
        $('table').DataTable();
      } );
    },
    methods: {
      markAsDone(_id) {
        this.$store.dispatch('markDone',_id);
      },
      deleteTodo(_id) {
        let cfm = confirm('Are you sure to delete? ');
        if (cfm) {
          this.$store.dispatch('deleteTodo',_id);
          this.form_todo = this.initial_todo;
        }

      },
      reset() {
        $('#txtTitle').val('');

        this.createedit = 'CREATE';
        this.form_todo = this.initial_todo
      },
      saveTodo() {
        if (this.form_todo._id !== null)
          this.$store.dispatch('updateTodo',this.form_todo);
        else
          this.$store.dispatch('createTodo',this.form_todo);

        this.reset();

      },
      showEdit(todo) {
        this.form_todo = todo;
        // console.log(this.form_todo.title)
        this.createedit = 'EDIT';
        // console.log(todo);
      }
    }
  }
</script>