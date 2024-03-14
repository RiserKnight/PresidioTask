const {user}=require('../models');

module.exports.home = (req, res) => {

    try {
    res.render("home");
      
    } catch (error) {
      console.log(error);
    }
   
  }


  module.exports.students = async(req, res) => {

    try {
      const students=await user.findAll();
      let users=[];
    
      students.forEach(user => {
           users.push(user.dataValues);
      });
   
    res.render("students",{users});
  }
  catch (error) {
      console.log(error);
    }
   
  }

  module.exports.updates = async(req, res) => {

    try {
    

    res.render("updates");
      
    } catch (error) {
      console.log(error);
    }
   
  }
  module.exports.updateStudent = async(req, res) => {

    try {
    const studentID=req.body.studentID;
    const student=await user.findOne({where: {studentID}});
    if(!student)res.send("Student not found")
    var subjectArray = JSON.parse(student.dataValues.subjectsList);
    var marksList=(await user.findOne({where: {studentID}})).dataValues.subjectsMarks;
    var flag=false;
    if(marksList)
    {
      flag=true;
    var marksList = JSON.parse(marksList);
    }
    

    res.render("addMarks",{subjectArray,studentID,flag,marksList});
      
    } catch (error) {
      console.log(error);
    }
   
  }
  module.exports.add = async(req, res) => {

    try {
      const fName=req.body.firstName;
      const lName=req.body.lastName;
      const age=req.body.age;
      const dob=req.body.DOB;
      const className=req.body.class;
      var subjectsList=req.body.SubjectList;
      var subjectArray = subjectsList.split('\n');
      for(let i=0; i<subjectArray.length; i++) {
        subjectArray[i]=subjectArray[i].trim();
      }
      
  
      console.log(subjectArray);
      var subjectsList = JSON.stringify(subjectArray);

      const studentName=fName+" "+lName;
      const subjectsMarks="";
      const subjectsGrade="";
      const subjectsPer="";

      await user.create({studentName,age,dob,className,subjectsList,subjectsMarks,subjectsGrade,subjectsPer});
      res.redirect("/students");
      
    } catch (error) {
      console.log(error);
    }
   
  }
  function getGrade(per)
  {
    if(per>90)return "A+";
    else if(per>=80) return "A";  
    else if(per>=70) return "B";
    else if(per>=60) return "C";
    else if(per>=50) return "D"; 
    return "F";
  }
  module.exports.updateStudentMarks = async(req, res) => {

    try {
      const studentID=req.body.studentID;
      const student=await user.findOne({where: {studentID}});
      var subjectArray = JSON.parse(student.dataValues.subjectsList);
      const reqOb=req.body;
      const marksList=[];
      const perList=[];
      const gradeList=[];

      subjectArray.forEach((subject)=>{
        marksList.push([reqOb[subject+'ob'],reqOb[subject+'fm']]);
        const per = ((reqOb[subject + 'ob'] / reqOb[subject + 'fm']) * 100).toFixed(2);

        perList.push(per);
        gradeList.push(getGrade(per));
      })
      const subjectsMarks=JSON.stringify(marksList);
      const subjectsGrade=JSON.stringify(gradeList);
      const subjectsPer=JSON.stringify(perList);

      await user.update(
        { 
          subjectsMarks,
          subjectsGrade,
          subjectsPer
        },
        { 
          where: { studentID }
        }
      );
      res.redirect('/students');
    } catch (error) {
      console.log(error);
    }
   
  }
  module.exports.deleteStudent = async(req, res) => {
  try {
    res.render("deleteStudent");
  } catch (error) {
    console.log(error);
  }
  }

  module.exports.deleteStudentRecord = async(req, res) => {
    try {
      const studentID =req.body.studentID;
      await user.destroy({where: {studentID}});
      res.redirect("/students");
    } catch (error) {
      console.log(error);
    }
    }



    {
      search={};
      const userID1=req.body.userID1;
      const userID2=req.body.userID2;
      const userID3=req.body.userID3;
      const inputOpt1 =req.body.inputOpt1;
      const inputOpt2 =req.body.inputOpt2;
      const inputOpt3 =req.body.inputOpt3;
      if(userID1)search[inputOpt1] = userID1;
      if(userID2)search[inputOpt2] = userID2;
      if(userID3)search[inputOpt3] = userID3;
   
     const users= await dbFunct.getUsers(search);
     exports.getUsers=async(search)=>{
      let users=[];
      try{
       const demo=await user.findAll({where:search});
       demo.forEach(user => {
           users.push(user.dataValues);
       });
       return users
      }
      catch(err){
          console.log(err);
              }
  }
    }