const studentData = {
    firstName : "",
    lastName : "",
    fatherName : "",
    email : "",
    countryCode : "",
    phone : null ,
    gender : "",
    course : "", 
    skilldList : []
}
const skillsConfig = ["HTML","CSS","JavaScript","Java","C++","Bootstrap 5","ReactJS","MongoDB","NodeJS","expressJS"];
const studentSkills = studentData.skilldList;
const skillsSelector = document.getElementById('skils-select-box');
(() => {
    
    skillsConfig.forEach((skill) => {
        const option = document.createElement('option');
        option.innerText = skill;
        option.setAttribute('value',skill);
        skillsSelector.appendChild(option);
    })
})()
skillsSelector.addEventListener('change',(event) => {
    const skill = event.target.value;
    if(! studentSkills.includes(skill)) {
        studentSkills.push(event.target.value);
        createSkillButton(studentSkills);
    }
})
function delectSkill(index) {
    studentSkills.splice(index,1);
    createSkillButton(studentSkills);
}
function createSkillButton(skillList) {
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = ""; 
    skillList.forEach( (skill,index) => {
        const button = document.createElement('button');
        button.setAttribute('class',"btn btn-sm btn-primary px-3 rounded rounded-pill")
        button.setAttribute('type',"button");
        const span = document.createElement('span');
        span.innerText = skill;
        button.appendChild(span);
        const i = document.createElement('i');
        i.setAttribute('class',"fa fa-circle-xmark ms-2");
        i.addEventListener('click',delectSkill.bind(this,index))
        button.appendChild(i);
        skillsContainer.appendChild(button);
    })
}
const FORM = document.getElementById('studentFrom');

FORM.addEventListener('input',(event) => {
    let name = event.target.name;
    if(name === "phone")
        studentData[event.target.name] = Number(event.target.value);
    else {
        studentData[event.target.name] = event.target.value;
    }
})
FORM.addEventListener('submit',(event) => {
    event.preventDefault();
    if((validateName(FORM.firstName) && validateName(FORM.fatherName) && validateEmail(FORM.email) && validatePhoneNumber(FORM.phone))) {
        
    }
    
})
function validatePhoneNumber(tag) {
    const value = tag.value;
    const name = tag.name;
    if(value) {
            if(/^[6-9][0-9]{9}$/.test(value)) {
            displayError(name,"");
            return true;
        } else {
            tag.focus();
            displayError(name,"Please enter valid input");
            return false;
        }
    } else {

        displayError(name,"Field should not be empty");
        tag.focus();
        return false;
    }
}
function validateName(tag) {
    const value = tag.value;
    const name = tag.name;
    if(value) {
        if(/^[A-Z]/.test(value)) {
            if(/[!@#$%^&*()_+|\/.,><:";"''-]/.test(value)) {
                tag.focus();
                displayError(name,"Please Enter Valid name");
                return false;
            }
            else {
                
                displayError(name,"")
                return true;
            }
        } else {
            tag.focus();
            displayError(name,"Field should starts with Upper case")
            return false;
        }
        
    } else {
        tag.focus();
        displayError(name,"Feild should not be empty")
        return false;
    }
}
function validateEmail(tag) {
    const value = tag.value;
    const name = tag.name;
    if(value) {
        if(value.includes('@') && /.com$/.test(value) && (! /[!#$%^&*()_+|\/,><:";"''-]/.test(value))) {
            displayError(name,"");
            return true;
        } else {
            tag.focus();
            displayError(name,"Invalid gmail");
            return false;
        }
    } else {
        tag.focus();
        displayError(name,"Feild should not be empty")
        return false;
    }

}
function displayError(id,msg) {
    document.getElementById(id + "Error").innerHTML = msg ? `<i class="fa-solid fa-triangle-exclamation"></i> ${msg}` : msg;
}
