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
    var subjectArray = JSON.parse(student.dataValues.subjectsList);
    res.render("addMarks",{subjectArray});
      
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

    res.render("home");
      
    } catch (error) {
      console.log(error);
    }
   
  }