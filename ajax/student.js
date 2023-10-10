let arr

function displayAll() {
    displayClass()
    $.ajax({
        url: "http://localhost:8080/api/students",
        type: "GET",
        success: function (data) {
            arr = data
            let content = `<h2>List Student</h2>`
            content += `<table border="1"><tr>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th colspan="2">Action</th>
                        </tr>`
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].dob}</td>
                        <td>${data[i].address}</td>
                        <td>${data[i].phone}</td>
                        <td>${data[i].email}</td>
                        <td>${data[i].classes.name}</td>
                        <td><button onclick="updateStudent(${data[i].id})">Update</button></td>
                        <td><button onclick="deleteStudent(${data[i].id})">Delete</button></td>
                        </tr>`
            }
            content += `</table>`
            document.getElementById("students").innerHTML = content
        }
    })
}

function deleteStudent(id) {
    if (confirm("Bạn có muốn xóa không")) {
        $.ajax({
            url: `http://localhost:8080/api/students/${id}`,
            type: "DELETE",
            success: function () {
                alert("Xóa thành công!")
                displayAll()
            }
        });
    }
}

function createPage() {
    location.href = "create.html"
}

function back() {
    location.href = "student.html"
}


function search() {
    let search = $("#search").val()
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students/search/" + search,
        success: function (data) {
            let content = `<h2>List Student</h2>`
            content += `<table border="1"><tr>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th colspan="2">Action</th>
                        </tr>`
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].dob}</td>
                        <td>${data[i].address}</td>
                        <td>${data[i].phone}</td>
                        <td>${data[i].email}</td>
                        <td>${data[i].classes.name}</td>
                        <td><button onclick="updateStudent(${data[i].id})">Update</button></td>
                        <td><button onclick="deleteStudent(${data[i].id})">Delete</button></td>
                        </tr>`
            }
            content += `</table>`
            document.getElementById("students").innerHTML = content
        }
    })


    event.preventDefault();

}
    function save() {
        displayClass()
        let newStudent;
        let name = $("#name").val();
        let idC = $("#classes").val();
        let dob = $("#dob").val();
        let address = $("#address").val();
        let phoneNumber = $("#phoneNumber").val();
        let email = $("#email").val();
        let id = +localStorage.getItem("idUpdate");

        if (id !== 0) {
            newStudent = {
                id: id,
                name: name,
                classes: {
                    id: idC
                },
                dob: dob,
                address: address,
                phone: phoneNumber,
                email: email
            }
        } else {
            newStudent = {
                name: name,
                classes: {
                    id: idC
                },
                dob: dob,
                address: address,
                phone: phoneNumber,
                email: email
            }
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newStudent),
            url: "http://localhost:8080/api/students",
            success: function () {
                alert("save success")
                displayAll()
                localStorage.setItem("idUpdate", "0")
            }
        })
        event.preventDefault();
    }

    function displayClass() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/students/classes",
            success: function (data) {
                let content = "";
                for (let i = 0; i < data.length; i++) {
                    content += `<option value = ${data[i].id}>${data[i].name}</option>`;
                }
                document.getElementById("classes").innerHTML = content;
            }
        })

    }


    function updateStudent(id) {
        $.ajax({
            url: `http://localhost:8080/api/students/${id}`,
            type: "GET",
            success: function (data) {
                document.getElementById("name").value = data.name
                document.getElementById("classes").value = data.classes
                document.getElementById("dob").value = data.dob
                document.getElementById("address").value = data.address
                document.getElementById("phoneNumber").value = data.phone
                document.getElementById("email").value = data.email
                localStorage.setItem("idUpdate", data.id)
            }
        })
    }
























