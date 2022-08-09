<template>
  <div class="db">
    <h1>This is the Database Page</h1>
    <!-- Section for Employee Creation -->
    First Name:<input type="text" v-model="firstName" />
    <br>
    Last Name:<input type="text" v-model="lastName" />
    <br>
    <button @click="createEmployee()">Create</button>
    <br>
    
    <!-- Section for Employee Query -->
    First Name Filter:<input type="text" v-model="employeeFilter" />
    <br>
    <button @click="queryEmployees()">Query</button>
    <template v-for="employee in employees">
      <p>{{ employee.firstName || 'Missing First Name' }} {{ employee.lastName || 'Missing Last Name' }} - {{ employee.id }}</p>
    </template>
    <br>
    <!-- Section for Employee Read -->
    ID Lookup:<input type="text" v-model="employeeReadId" />
    <br>
    <button @click="readEmployee()">Read</button>
    <template v-if="readEmployeesData">
      <p>{{ readEmployeesData.firstName || 'Missing First Name' }} {{ readEmployeesData.lastName || 'Missing Last Name' }} - {{ readEmployeesData.id }}</p>
    </template>
    <br>
    <!-- Section for Employee Delete -->
    ID Delete:<input type="text" v-model="employeeDeleteId" />
    <br>
    <button @click="deleteEmployee()">Delete</button>
  </div>
</template>
<script>
import { db } from '../firebaseResources';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore'
export default {
  data() {
    return {
      // data for display
      employees: [],
      readEmployeesData: null,
      // v-model variables for creation
      firstName: null,
      lastName: null,
      // v-model variable for query
      employeeFilter: null,
      // v-model variable for read
      employeeReadId: null,
      // v-model variable for delete
      employeeDeleteId: null,
    };
  },
  methods: {
    async createEmployee() {
      if (this.firstName != null && this.lastName != null) {
        try {
          console.log('Calling createEmployee');
          console.log('Creating employee:', { firstName: this.firstName, lastName: this.lastName });
          // We use the addDoc function to insert a document into the database. We start with the
          // collection that we want to insert into (in this case eployees) followed by an object
          // representing the data we want to write. We can write complex objects to the database
          // (you can read online all the types that firestore supports) but you can't/shouldn't
          // write things like functions. If you create classes to represent you data (which I
          // recommend in many cases) then you can create a converter function that returns an
          // object representing how the class should be written to the database
          const docReference = await addDoc(
            collection(db, 'employees'), 
            {
              firstName: this.firstName,
              lastName: this.lastName,
            }
          );
          // We could specify the id of the new document were inserting by adding it to the end of
          // the collection like 'collection(db, 'employees', someId)' but if we omit that then it
          // will have a random id generated automatically
          console.log('New employee has ID:', docReference.id);
          console.log('Completed createEmployee')
        } catch(err) {
          console.error(err);
        }
      }
    },
    async queryEmployees() {
      try {
        console.log('Calling queryEmployees');
        // Reset the employees data, typically you would hide data loads
        // behind a loader which you would turn on when this operation starts
        // and turn off when the data is loaded
        this.employees = [];
        // Create a query against the employees collection
        let q = query(collection(db, 'employees'));
        // If the employeeFilter input has some value (is not falsy) then we
        // apply a where filter to check for matching first names. Note that
        // we actually create a new query using the existing one and the
        // additional filter
        if (this.employeeFilter) {
          console.log('Adding filter', this.employeeFilter);
          q = query(q, where('firstName', '==', this.employeeFilter));
        }
        // We use getDocs (with an s) to query while we use getDoc (no s) to
        // get a single record
        const queryResponse = await getDocs(q);
        // Iterate over the results to add them to the employees reactive variable
        queryResponse.forEach((responseItem) => {
          console.log({ id: responseItem.id, data: responseItem.data() });
          // Note that here we add objects to the employees reactive variable, and
          // that object includes the id of the record as well as spreading all the
          // fields the record itself contains. This allows us to reference each field
          // in the document directly (as well as the id if needed)
          this.employees.push({
            id: responseItem.id,
            ...responseItem.data(),
          });
        });
        console.log('Completed queryEmployees');
      } catch(err) {
        console.error(err);
      }
    },
    async readEmployee() {
      if (this.employeeReadId) {
        try {
          console.log('Calling readEmployee');
          // Create a doc reference with the employees collection and the
          // id of the record we want to retrieve
          const docReference = doc(db, 'employees', this.employeeReadId);
          // Call getDoc to retrieve the specific document that we want
          // This represents a specific get rather than a query and is
          // very efficient
          const response = await getDoc(docReference);
          console.log({ id: response.id, ...response.data() });
          // Note here that we create the same type of object in the read
          // case that we do in the query case. Having a consistent shape
          // of the data makes it easier for everyone to reason about how
          // to use search results. You could even create a class or function
          // that takes in the data and generates this type of object and
          // use that everywhere for consistency
          this.readEmployeesData = {
            id: response.id,
            ...response.data(),
          }
          // We could also have re-used the employees reactive variable and
          // replaced it with this data rather than using a separate variable
          // and elements
          console.log('Completed readEmployees');
        } catch(err) {
          console.error(err);
        }
      }
    },
    async deleteEmployee() {
      if (this.employeeDeleteId) {
        try {
          console.log('Calling deleteEmployee');
          const docReference = doc(db, 'employees', this.employeeDeleteId);
          // Note that deleting a document that doesn't exist doesn't throw
          // and error and the deleteDoc function returns nothing (they say
          // if you delete something that doens't exist then it was successful
          // which sorta makes sense)
          await deleteDoc(docReference);
          // If we wanted to be reactive we could do any of the following:
          // 1. Lookup the deleted id in employees array and if it exists
          //    then remove it. This is very quick, but you might need to
          //    add it back in the case that the delete actually fails
          // 2. Trigger the query function again after the delete completes
          //    to make sure we have totally up to data data. This means we
          //    will have up to date data (including changes from any other
          //    sources that might have happened elsewhere) but increases the
          //    load on the database
          // For document changes, Firestore also offers the onSnapshot and
          // snapshot listener which can be given a callback that will be 
          // triggered each time the document is updated
          console.log('Completed deleteEmployee');
        } catch(err) {
        }
      }
    },
  }
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>