const form = document.getElementById("feedbackForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");
const feedbackInput = document.getElementById("feedback");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const courseError = document.getElementById("courseError");
const feedbackError = document.getElementById("feedbackError");
const storedData = document.getElementById("storedData");
const sessionUser = document.getElementById("sessionUser");
function showSessionUser(){
    let user = sessionStorage.getItem("studentName");
    if(user){
        sessionUser.innerHTML = "Current Session User: " + user;
    }
    else{
        sessionUser.innerHTML = "";
    }
}
function showStoredData(){
    let data = localStorage.getItem("feedback");
    if(data){
        let student = JSON.parse(data);
        storedData.innerHTML =
        "<b>Name:</b> " + student.name + "<br><br>" +
        "<b>Email:</b> " + student.email + "<br><br>" +
        "<b>Course:</b> " + student.course + "<br><br>" +
        "<b>Feedback:</b> " + student.feedback;
    }
    else{
        storedData.innerHTML = "No feedback stored.";
    }
}
function validateName(){
    if(nameInput.value.trim()===""){
        nameError.innerHTML="Name cannot be empty.";
        return false;
    }
    if(nameInput.value.trim().length<3){
        nameError.innerHTML="Name must contain at least 3 characters.";
        return false;
    }
    nameError.innerHTML="";
    return true;
}
function validateEmail(){
    if(emailInput.value.trim()===""){
        emailError.innerHTML="Email cannot be empty.";
        return false;
    }
    let pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!pattern.test(emailInput.value.trim())){
        emailError.innerHTML="Enter a valid email.";
        return false;
    }
    emailError.innerHTML="";
    return true;
}
function validateCourse(){
    if(courseInput.value===""){
        courseError.innerHTML="Please select a course.";
        return false;
    }
    courseError.innerHTML="";
    return true;
}
function validateFeedback(){
    if(feedbackInput.value.trim()===""){

        feedbackError.innerHTML="Please enter feedback.";
        return false;
    }
    feedbackError.innerHTML="";
    return true;
}
nameInput.addEventListener("input",validateName);
emailInput.addEventListener("input",validateEmail);
courseInput.addEventListener("change",validateCourse);
feedbackInput.addEventListener("input",validateFeedback);
form.addEventListener("submit",function(event){
    event.preventDefault();
    let valid=true;
    if(!validateName()) valid=false;
    if(!validateEmail()) valid=false;
    if(!validateCourse()) valid=false;
    if(!validateFeedback()) valid=false;
    if(valid){
        let student={
            name:nameInput.value.trim(),
            email:emailInput.value.trim(),
            course:courseInput.value,
            feedback:feedbackInput.value.trim()
        };
        localStorage.setItem("feedback",JSON.stringify(student));
        sessionStorage.setItem("studentName",student.name);
        showStoredData();
        showSessionUser();
        alert("Feedback Submitted Successfully.");
        form.reset();
    }
});
document.getElementById("deleteBtn").addEventListener("click",function(){

    localStorage.removeItem("feedback");

    sessionStorage.removeItem("studentName");

    showStoredData();
    showSessionUser();
});
showStoredData();
showSessionUser();