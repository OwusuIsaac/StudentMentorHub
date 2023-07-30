let main_container=document.getElementById("main_container");

let min_date="";
document.addEventListener('DOMContentLoaded', function() {
    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
  
    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();
  
    min_date = year + '-' + month + '-' + (day+1);
  });

fetchSeniorsFn();

async function fetchSeniorsFn() {
    try {
        let res = await fetch("http://localhost:3100/seniors", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                authorization: sessionStorage.getItem("connecting_token")
            }
        })
        let fin = await res.json();
        if (res.status == 200) {
            renderSeniorsFn(fin.data);
        } else {
            alert(fin.msg);
            window.location.href = "../html/login.html";
        }
    } catch (error) {
        console.log(error.message);
        alert("Unable to get Senior's");
    }
}


const description_obj = {
    "Science": "Includes Computer Science, Physics, Mathematics, Biology, Chemistry",

    "Engineering": "Includes Civil, Electrical, Mechanical, General",

    "SocialSciences": "Includes Law, Public Policy",

    "ArtsAndHumanities": "Includes Interactive Media, Theatre",

}



function renderSeniorsFn(arr) {

    main_container.innerHTML=null;
    let template_arr=arr.map((el)=>{
        return`        <div class="doctor_box">
        <div class="avatar_div"><img class="avatar" src=${el.gender=="male"?"https://media.istockphoto.com/id/1150502263/vector/student-icon-or-avatar-vector-illustration.jpg?s=612x612&w=0&k=20&c=bADu0CBwP4bDQrgIfRVjZ90RwKzTD5-MYqlFFnLD_c0=":"https://img.freepik.com/premium-vector/portrait-beautiful-student-girl-avatar-social-media-bright-vector-illustration_590570-4.jpg"} alt="senior_avatar"></div>
        <div class="name"><label for="">Name :</label>${el.name}</div>
        <div class="email"><label for="">Email :</label>${el.email}</div>
        <div class="major_divisions"><label for="">Major_Divisions :</label>${el.senior_major_division}</div>
        <div class="description">${description_obj[el.senior_major_division]}</div>
        <div class="name"><label for="">Place :</label>${el.location}</div>
        <form class="meetups_form">
        <input name="date" class="date" type="date" placeholder="Select Date" required min=${min_date}><br>
    <select name="time_slot" class="time_slot" required><br>
        <option value="" selected disabled>Select time slot</option>
        <option value="8:00-8:30">8:00 AM to 8:30 AM</option>
        <option value="8:30-9:00">8:30 AM to 9:00 AM</option>
        <option value="9:00-9:30">9:00 AM to 9:30 AM</option>
        <option value="9:30-10:00">9:30 AM to 10:00 AM</option>
        <option value="10:00-10:30">10:00 AM to 10:30 AM</option>
        <option value="10:30-11:00">10:30 AM to 11:00 AM</option>
        <option value="11:00-11:30">11:00 AM to 11:30 AM</option>
        <option value="11:30-12:00">11:30 AM to 12:00 PM</option>

        <option value="14:00-14:30">2:00 PM to 2:30 PM</option>
        <option value="14:30-15:00">2:30 PM to 3:00 PM</option>
        <option value="15:00-15:30">3:00 PM to 3:30 PM</option>
        <option value="15:30-16:00">3:30 PM to 4:00 PM</option>
        <option value="16:00-16:30">4:00 PM to 4:30 PM</option>
        <option value="16:30-17:00">4:30 PM to 5:00 PM</option>
        <option value="17:00-17:30">5:00 PM to 5:30 PM</option>
        <option value="17:30-16:00">5:30 PM to 6:00 PM</option>
    </select>
    
    <button type="submit" class="btn" data-id=${el._id}>Book MeetUps</button>
    </form>
    </div>`;
    })
    main_container.innerHTML=template_arr.join("");
    const all_forms=document.querySelectorAll(".meetups_form");
    for(let form of all_forms){
        form.addEventListener("submit",(event)=>{
            event.preventDefault();
            const senior_id=event.target.querySelector(".btn").dataset.id;
            const date=event.target.querySelector(".date").value;
            const time_slot = event.target.querySelector(".time_slot").value;
            bookMeetUpsFn({senior_id,date,time_slot});
        })
    }
}


async function bookMeetUpsFn(obj){
    try {
        let res = await fetch("http://localhost:3100/meetups", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                authorization: sessionStorage.getItem("connecting_token")
            },
            body:JSON.stringify(obj)
        })
        let fin = await res.json();
        if (res.status == 202) {
            alert(fin.msg);
            window.location.href="../html/meetups.html";
        } else {
            alert(fin.msg);
        }
    } catch (error) {
        console.log(error.message);
        alert("Unable to get Senior");
    }
}





