const user_email_phone = document.querySelector(".email");
const user_password = document.querySelector(".pass");
const btn_login = document.querySelector(".btn");
const popup = document.querySelector(".popup-box");
const err = document.querySelector(".main .error");

const eyesShowPass = document.querySelector(".container .fa-eye");
const passwordBox = document.querySelector(".container .password");

if (eyesShowPass) {
   eyesShowPass.addEventListener("click", () => {
      passwordBox.classList.toggle("showPass");

      if (passwordBox.classList.contains("showPass")) {
         user_password.type = "text";
      } else {
         user_password.type = "password";
      }

   })
}


let arrayOf_user;

if (localStorage.getItem("users")) {
   arrayOf_user = JSON.parse(localStorage.getItem("users"));
} else {
   arrayOf_user = [];
}

if (btn_login) {

   let err = document.querySelector(".err");
   btn_login.addEventListener("click", e => {
      e.preventDefault();
      if (user_email_phone.value !== "" && user_password.value !== "") {
         let userLogin = user_email_phone.value.trim();
         let userPassLogin = user_password.value.trim();

         if (arrayOf_user.length === 0) {
            console.log("This email is not Exist please Sign Up ");
         }

         if (arrayOf_user.some(el => el.email === userLogin) === false) {
            err.classList.add("show_Err");
            err.style.color = "red";
            err.innerHTML = "This email is not Exist please Sign Up";
            setTimeout(() => {
               err.classList.remove("show_Err");
            }, 3000)
         }

         arrayOf_user.forEach(user => {
            if (user.email === userLogin && user.password === userPassLogin) {

               err.classList.add("show_Err");
               err.style.color = "var(--button-color)";
               err.innerHTML = "Login Successfully";
               setTimeout(() => {
                  err.classList.remove("show_Err");
               }, 2000)
               setTimeout(() => {
                  window.location.reload();
               }, 3500)

            }
            if (user.email === userLogin && user.password !== userPassLogin) {
               err.classList.add("show_Err");
               err.style.color = "red";
               err.innerHTML = "Your Password is not correct";
            }
         })
      }
   })
}




const form_sign = document.querySelector("form");
const First_name = document.querySelector(".full-name .first");
const Last_name = document.querySelector(".full-name .last");
const email_signup = document.querySelector("form .mail-phone");
const pass_signup = document.querySelector("form .pas-sword");
const day_birthday = document.querySelectorAll(" .birthday select")[0];
const month_birthday = document.querySelectorAll(" .birthday select")[1];
const year_birthday = document.querySelectorAll(" .birthday select")[2];
const gender_female = document.querySelectorAll("form .gender input")[0];
const gender_male = document.querySelectorAll("form .gender input")[1];
const btn_signup = document.querySelector("form .signBtn");


let months = ["January", "February", "March", "April", "May", "June", "July",
   "August", "September", "October", "November", "December"];


if (day_birthday) {
   for (let i = 1; i <= 31; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.innerHTML = i;
      day_birthday.appendChild(option);
      option.selected = 2
   }
}


if (month_birthday) {
   for (let i = 0; i < 12; i++) {
      let option = document.createElement("option");
      option.value = months[i];
      option.innerHTML = months[i];
      month_birthday.appendChild(option);
      option.selected = 1
   }
}



if (year_birthday) {
   for (let i = 1960; i < 2024; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.innerHTML = i;
      option.selected = 10
      year_birthday.appendChild(option);
   }
}






let isExist;

const create_user = () => {

   let userObj = {
      fullName: `${First_name.value} ${Last_name.value}`.trim(),
      email: email_signup.value.trim(),
      password: pass_signup.value.trim(),
      birthday: `${day_birthday.value} / ${month_birthday.value} / ${year_birthday.value}`,
      gender: gender_male.checked ? "male" : "female"
   }

   checkUserisExist(userObj);

   if (isExist === false) {
      err.classList.add("showErr");
      setTimeout(() => {
         window.location.reload();
      }, 3000)

   } else {

      popup.classList.add("show");

      arrayOf_user.push(userObj);

      localStorage.setItem("users", JSON.stringify(arrayOf_user));

      setTimeout(() => {
         window.location.href = "/home/index.html"
      }, 2000)


   }



}

const checkUserisExist = (userObj) => {
   arrayOf_user.forEach(user => {
      if (user.email === userObj.email) {
         isExist = false;
      }
   })
}



if (btn_signup) {
   btn_signup.addEventListener("click", (e) => {
      e.preventDefault();

      if (
         First_name.value !== "" &&
         Last_name.value !== "" &&
         email_signup.value !== "" &&
         pass_signup.value !== ""
      ) {
         create_user();
      }
   })
}


const forgetPassBtn = document.querySelector(".btns span");
const input_searsh = document.querySelector(".searching");
const notfoundEmail = document.querySelector(".notfound");
const main_Forget = document.querySelector(".main-forget");
const main_Question = document.querySelector(".question");
const box_changePass = document.querySelector(".chnagePass");
let errmssg = document.querySelector(".errbirth");
let user;
const changePass = () => {

   if (arrayOf_user.some(user => user.email === input_searsh.value) === true) {

      user = arrayOf_user.filter(user => user.email === input_searsh.value)[0];

      main_Forget.style.cssText = "max-height: 0;overflow: hidden;visibility: hidden;margin:0;";
      main_Question.style.cssText = "max-height: 500px;visibility: visible;margin:auto;";

      let day_select = document.querySelectorAll(".question select")[0];
      let month_select = document.querySelectorAll(".question select")[1];
      let year_select = document.querySelectorAll(".question select")[2];
      let btn_continue = document.querySelector(".question .continue");


      btn_continue.addEventListener("click", () => {
         let birthday = `${day_select.value} / ${month_select.value} / ${year_select.value}`
         if (birthday === user.birthday) {
            box_changePass.style.cssText = "display:flex";
            main_Forget.style.cssText = "display:none";
            main_Question.style.cssText = "display:none";
         } else {
            errmssg.classList.add("showbirthMssg");
            setTimeout(() => {
               errmssg.classList.remove("showbirthMssg");
            }, 2000);
         }
      })

   } else {
      notfoundEmail.classList.add("showMssg");
      setTimeout(() => {
         notfoundEmail.classList.remove("showMssg");
      }, 3000);
   }
}

if (forgetPassBtn) {
   forgetPassBtn.addEventListener("click", () => {
      if (input_searsh && input_searsh.value !== "") {
         changePass();
      }
   })

}



let pass1 = document.querySelectorAll(".chnagePass input")[0];
let pass2 = document.querySelectorAll(".chnagePass input")[1];
let btn_change = document.querySelector(".chnagePass .change");
let errmssgchange = document.querySelector(".chnagePass .errbirth");

const changePassFromdatabase = () => {
   user.password = pass2.value.trim();

   localStorage.clear();
   localStorage.setItem("users", JSON.stringify(arrayOf_user));

}

if (btn_change) {
   btn_change.addEventListener("click", () => {

      if (pass1.value === pass2.value) {

         changePassFromdatabase();

         errmssgchange.classList.add("showbirthMssg");
         errmssgchange.innerHTML = "The password is changed";
         errmssgchange.style.cssText = "color:var(--button-color)";

         setTimeout(() => {
            window.location.href = "/home/index.html";
         }, 2000)
      } else {
         errmssgchange.classList.add("showbirthMssg");
         errmssgchange.innerHTML = "The password does not match";
         setTimeout(() => {
            errmssgchange.classList.remove("showbirthMssg");
         }, 2000);
      }
   })

}

