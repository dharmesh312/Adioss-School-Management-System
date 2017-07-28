import {Id} from './find_student';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import React, { Component } from 'react';
import { AppBar, Checkbox, IconButton, Button} from 'react-toolbox';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import Navigation from 'react-toolbox/lib/navigation';
import Input from 'react-toolbox/lib/input';
import {Tab, Tabs} from 'react-toolbox';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Chip from 'react-toolbox/lib/chip';
PouchDB.plugin(require('pouchdb-find'));
import {attendance_database_three_A} from '../App'
import {attendance_database_three_A_temp} from '../App'
import {attendance_database_three_B} from '../App'
import {classWiseSubjectDB} from '../App'
import {classWiseSubjectFacultyDB} from '../App'
import {employee_attendance_database} from '../App'
import {employee_details_database} from '../App'
import {employee_details_database_two} from '../App'
import {feepay_database} from '../App'
import {finance_database_four_A} from '../App'
import {finance_database_four_B} from '../App'
import {login_details} from '../App'
import {main_database_one} from '../App'
import {main_database_zero} from '../App'
import {marks_entry_database_one_B} from '../App'
import {student_database_one} from '../App'
import {student_id_database} from '../App'
import {subjectclass_database} from '../App'

var id=Id;
var subject=[];
var data1=[];
var data2=[]

const sortByIdAsc = (a, b) => {
  if (a._id < b._id) return -1;
  if (a._id > b._id) return 1;
  return 0;
};

const sortByIdDesc = (a, b) => {
  if (a._id > b._id) return -1;
  if (a._id < b._id) return 1;
  return 0;
};

class Profile extends React.Component {
  constructor(props) {
         super(props);

       this.state = {
             _id: '' ,  name: 'Vishal Kumar', phone: '+919954246254', email: 'vishal.km@iitg.ac.in', gendervalue:'Male', date1: '18/04/1998', classvalue:'',sectionvalue:'A', nationality:'Indian',
             address_line1: 'Manas Hostel', address_line2: 'IIT Guwahati', address_City: 'Kamrup', address_Pincode: '781039', address_State: 'Rajasthan'
                 ,father_age:'N/A',father_name:'TejPrakash',father_qual:'N/A',father_email:'N/A',father_office:'N/A',father_mobile:'N/A',father_occupation:'N/A',
                 father_office_phone:'N/A',Mother_age:'40',Mother_name:'Suman',Mother_qual:'Bachelor',Mother_email:'XYZ',Mother_office:'XYZ',Mother_office_phone:'XYZ',Mother_mobile:'XYZ',
                 Mother_occupation:''
               };
               this.baseState = this.state ;
           }

     state1 = {
         index: 1,
         fixedIndex: 1,
         inverseIndex: 1
     };

     state2 = {
       selected: [],
       selected1:[],
       sorted: 'asc',
       name:''
     };

    componentDidMount() {
  	setTimeout(function(){ this.state._id = Id; this.forceUpdate() }.bind(this), 1000);
    student_database_one.find({
     selector: {_id :Id}
   }).then((result)=>{
      this.state=result.docs[0];
    }).catch(function (err) {
       console.log(err);
     });

     console.log(this.state._id)

  }


    getSortedData = () => {
      const compare = this.state2.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
        return data1.sort(compare);
    };

    getSortedData1 = () => {
      const compare = this.state2.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
        return data2.sort(compare);
    };

    handleRowSelect = selected => {
      const sortedData = this.getSortedData();
      const sortedData1 = this.getSortedData1();
      this.setState({ selected: selected.map(item => sortedData[item].subject) });
      this.setState({ selected1: selected.map(item => sortedData1[item].date) });
    };

    handleSortClick = () => {
      const { sorted } = this.state2;
      const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
      this.setState({ sorted: nextSorting });
    };

  handleTabChange = (index) => {

    marks_entry_database_one_B.find({
     selector: {enroll :Id}
   }).then((result)=>{
         data1=[]
     result.docs.forEach(function(Object){
       data1.push(Object)
     })
  }).catch(function (err) {
       console.log(err);
     });


     attendance_database_three_B.find({
      selector: {enroll :Id}
    }).then((result)=>{
       data2=[]
      result.docs.forEach(function(Object){
        data2.push(Object)
      })
   }).catch(function (err) {
        console.log(err);
      });


    this.setState({index});
    console.log(Id);

  };


  render () {
    const { sorted } = this.state2;
    const sortedData = this.getSortedData();
    const sortedData1=this.getSortedData1();

    return (<div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
            <h2> Student Profile </h2>

            <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label='Personal'><ListItem caption="Name" legend={this.state.name.toString()}/>

                                <ListItem caption="Date of Birth" legend={this.state.date1.toString()}/>
                                <ListItem caption="Father's Name" legend={this.state.father_name.toString()}/>
                                <ListItem caption="Phone" legend={this.state.phone.toString()}/>
                                <ListItem caption="Email" legend={this.state.email.toString()}/>
                                <ListItem caption="Sex" legend={this.state.gendervalue.toString()}/>
                                <ListItem caption="Class" legend={this.state.classvalue.toString()}/>
                                <ListItem caption="Section" legend={this.state.sectionvalue.toString()}/>
                                </Tab>
          <Tab label='Father' onActive={this.handleActive}> <ListItem  legend={this.state.father_name.toString()} caption="Name"  />
        <ListItem  legend={this.state.father_age.toString()} caption="Age" required/>
        <ListItem  legend={this.state.father_qual.toString()} caption="Academic Qualification" />
        <ListItem  legend={this.state.father_occupation.toString()} caption="Occupation"/>
        <ListItem  legend={this.state.father_office.toString()} caption="Office Address" />
        <ListItem  legend={this.state.father_office_phone.toString()} caption="Office Tel.no."/>
        <ListItem  legend={this.state.father_mobile.toString()} caption="Mobile" required/>
        <ListItem  legend={this.state.father_email.toString()} caption="E-mail"/></Tab>
          <Tab label='Mother' >  <ListItem  legend={this.state.Mother_name.toString()} caption="Name"   />
        <ListItem  legend={this.state.Mother_age.toString()} caption="Age" required/>
        <ListItem  legend={this.state.Mother_qual.toString()} caption="Academic Qualification" />
        <ListItem  legend={this.state.Mother_occupation.toString()} caption="Occupation"/>
        <ListItem  legend={this.state.Mother_office.toString()} caption="Office Address" />
        <ListItem  legend={this.state.Mother_office_phone.toString()} caption="Office Tel.no."/>
        <ListItem  legend={this.state.Mother_mobile.toString()} caption="Mobile" required/>
        <ListItem  legend={this.state.Mother_email.toString()} caption="E-mail"/></Tab>
          <Tab label='Address'><ListItem  legend={this.state.address_line1.toString()} caption='Address Line 1'/>
        <ListItem  legend={this.state.address_line2.toString()} caption='Address Line 2'/>
        <ListItem  legend={this.state.address_Pincode.toString()} caption='Pincode'/>
        <ListItem  legend={this.state.address_City.toString()} />
        <ListItem  legend={this.state.address_State.toString()} caption='State'/></Tab>
        <Tab label='Attendance Record'>
          <Chip>Total days present is {data2.length.toString()}</Chip>
         <div style={{ flex: 1, overflowX: 'auto' }}>

         <Table  onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
           <TableHead>
             <TableCell onClick={this.handleSortClick} string sorted={sorted}>Present Date</TableCell>
             <TableCell string>Enroll</TableCell>
           </TableHead>
           {sortedData1.map((item, idx) => (
               <TableRow key={idx} selected={this.state2.selected.indexOf(item.date) !== -1}>
               <TableCell >{item.date}</TableCell>
               <TableCell>{item.enroll}</TableCell>

               </TableRow>
           ))}

         </Table>
         </div>

          </Tab>

         <Tab label='Academic Record'>
         <div style={{ flex: 1, overflowX: 'auto' }}>
         <Table  onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
           <TableHead>
             <TableCell onClick={this.handleSortClick} string sorted={sorted}>Subject Name</TableCell>
             <TableCell string>Exam Name</TableCell>
             <TableCell string>Marks</TableCell>
           </TableHead>
           {sortedData.map((item, idx) => (
               <TableRow key={idx} selected={this.state2.selected.indexOf(item.subject) !== -1}>
               <TableCell >{item.subject}</TableCell>
               <TableCell>{item.examName}</TableCell>
               <TableCell >{item.marks}</TableCell>
               </TableRow>
           ))}

         </Table>
         </div>
         </Tab>

        </Tabs>
<Button  href="#/EditProfile" label='Edit Profile'  onClick={console.log(Id)} accent raised/>

            </div>
    );
  }
}



export default Profile;
export {Id};