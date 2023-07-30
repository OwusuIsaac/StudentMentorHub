const meetups_header = document.getElementById("meetups_header");
const main_container = document.getElementById("main_container");

getMeetUpsFn();


let userRole="";
async function getMeetUpsFn() {
    try {
        let res = await fetch("http://localhost:3100/meetups", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                authorization: sessionStorage.getItem("connecting_token")
            }
        })
        let fin = await res.json();
        if (res.status == 200) {
            userRole=fin.userRole;
            renderMeetUpsFn(fin.data, fin.userRole);
        } else {
            alert(fin.msg);
            window.location.href = "../html/login.html";
        }
    } catch (error) {
        console.log(error.message);
        alert("Unable to get MeetUps");
    }
}


function renderMeetUpsFn(arr, role) {
    meetups_header.innerText = null;
    meetups_header.innerText = `Hello ${role}, Here's your meetups`;
    main_container.innerHTML = null;
    let template_arr = arr.map((el) => {
        return `<div class="meetups_box">
        <div class="senior_name"><label for="">Senior Name :</label>${el.senior_id.name}</div>
        <div class="major_division"><label for="">Major_division :</label>${el.doctor_id.senior_major_division}</div>
        <div class="senior_email"><label for="">Senior Email :</label>${el.senior_id.email}</div>
        <div class="freshman_name"><label for="">Freshman Name :</label>${el.freshman_id.name}</div>
        <div class="date"><label for="">Date :</label>${el.date}</div>
        <div class="time_slot"><label for="">Time Slot :</label>${el.time_slot}</div>
        <div class="freshman_email"><label for="">Freshman Email :</label>${el.freshman_id.email}</div>
        <div class="btns_div">
            <button type="click" class="video_btn" data-id=${el._id}>Video Consultation</button>
            <button type="click" class="delete_btn" data-id=${el._id}>Cancel Meetups</button>
        </div>
    </div>`;
    })
    main_container.innerHTML = template_arr.join("");

    const all_delete_btns = document.querySelectorAll(".delete_btn");
    for (let delete_btn of all_delete_btns) {
        delete_btn.addEventListener("click", (event) => {
            event.preventDefault();
            const delete_id = event.target.dataset.id;
            deleteMeetUpsFn(delete_id);
        })
    }


    const all_video_btns = document.querySelectorAll(".video_btn");
    for (let video_btn of all_video_btns) {
        video_btn.addEventListener("click", (event) => {
            event.preventDefault();
            const meetupsId = event.target.dataset.id;
            initiateVideoConsultationFn(meetupsId);
        })
    }


}


async function deletMeetUpsFn(delete_id) {
    try {
        let res = await fetch(`http://localhost:3100/meetups/${delete_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                authorization: sessionStorage.getItem("connecting_token")
            }
        })
        let fin = await res.json();
        if (res.status == 200) {
            alert(fin.msg);
            window.location.href = "../html/meetups.html";
        } else {
            alert(fin.msg);
        }
    } catch (error) {
        console.log(error.message);
        alert("Unable to delete the MeetUps");
    }
}





async function initiateVideoConsultationFn(meetupsId) {
    try {
        // let res = await fetch(`http://localhost:3100/${meetupsId}`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "Application/json",
        //         authorization: sessionStorage.getItem("connecting_token"),
        //     }
        // });
        let str=`http://localhost:3100/${meetupsId}`;
        window.open(str, "_blank");
    } catch (error) {
        console.log(error.message);
        alert("Unable to initiate video consultations");
    }
}



