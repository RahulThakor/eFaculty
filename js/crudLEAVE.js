var config = {
    apiKey: "AIzaSyAufnNx9kEIpTCifn2Y7kNgNnRBNqlXTeE",
    authDomain: "efaculty-7260c.firebaseapp.com",
    databaseURL: "https://efaculty-7260c.firebaseio.com",
    projectId: "efaculty-7260c",
    storageBucket: "efaculty-7260c.appspot.com",
    messagingSenderId: "345663819608",
    appId: "1:345663819608:web:188291c628482c74971f2d"
  };
  firebase.initializeApp(config);
  
  var tblUsers = document.getElementById('leaveTable');
  var databaseRef = firebase.database().ref('LEAVE/');
  
  var authRef = firebase.auth();
  var rowIndex = 1;
  
  databaseRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
  
      var row = tblUsers.insertRow(rowIndex);
      var celluid = row.insertCell(0);
      var cellemail = row.insertCell(1);
      var cellName = row.insertCell(2);
      var cellBranch = row.insertCell(3);
      var cellDesig = row.insertCell(4);
      var cellInst = row.insertCell(5);
      var cellLev = row.insertCell(6);
  
      cellEdit = row.insertCell(7);
      cellEdit.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick="onUserEdit(this)" id="btnEdit"><i class="far fa-edit"></i></button>`;
  
      cellDelete = row.insertCell(8);
      cellDelete.innerHTML = `<button type="button" class="btn btn-danger mb-1" onClick="onUserDelete(this)"><i class="fas fa-trash-alt"></i></button>`;
  
      celluid.appendChild(document.createTextNode(childKey));
  
      cellemail.appendChild(document.createTextNode(childData.user_name));
      cellName.appendChild(document.createTextNode(childData.f_name));
      cellBranch.appendChild(document.createTextNode(childData.branch));
      cellDesig.appendChild(document.createTextNode(childData.designation));
      cellInst.appendChild(document.createTextNode(childData.institute));
      cellLev.appendChild(document.createTextNode(childData.total_leave));
  
      hideFirstColUserTable();
      rowIndex = rowIndex + 1;
    });
  }
  );
  
  
  
  function onUserEdit(td) {
    row = td.parentElement.parentElement;
    var uid = document.getElementById("leaveTable").rows[row.rowIndex].cells.item(0).innerHTML
    var email = document.getElementById("leaveTable").rows[row.rowIndex].cells.item(1).innerHTML;
    var name = document.getElementById("leaveTable").rows[row.rowIndex].cells.item(2).innerHTML;
    var branch = document.getElementById("leaveTable").rows[row.rowIndex].cells.item(3).innerHTML;
    var desg = document.getElementById("leaveTable").rows[row.rowIndex].cells.item(4).innerHTML;
    var inst = document.getElementById("leaveTable").rows[row.rowIndex].cells.item(5).innerHTML;
    var total_leave = document.getElementById("leaveTable").rows[row.rowIndex].cells.item(6).innerHTML;
  
    document.getElementById('userEmail').value = email;
    document.getElementById("userEmail").disabled = true;
  
  
    document.getElementById('userPass').value = uid;
    document.getElementById("userPass").style.display = "none";
    document.getElementById("lbluserPass").style.display = "none";
  
  
    document.getElementById('userName').value = name;
    document.getElementById('userBranch').value = branch;
    document.getElementById('userDesignation').value = desg;
    document.getElementById('userInstitute').value = inst;
    document.getElementById('userTotalLeave').value = total_leave;
  
    document.getElementById("btnAddUser").innerHTML = 'Update';
  
  }
  
  
  
  function onUserDelete(td) {
  
    row = td.parentElement.parentElement;
    var uid = document.getElementById("leaveTable").rows[row.rowIndex].cells.item(0).innerHTML;
    var email = document.getElementById("leaveTable").rows[row.rowIndex].cells.item(1).innerHTML;
  
    var r = confirm("Delete leave : " + email);
    if (r == true) {
      firebase.database().ref().child('/LEAVE/' + uid).remove();
      reload_page();
    }
  }
  function cancle() {
  
    document.getElementById('userEmail').value = "";
    document.getElementById("userEmail").disabled = false;
  
    document.getElementById('userPass').value = "";
    document.getElementById("userPass").style.display = "block";
    document.getElementById("lbluserPass").style.display = "block";
  
    document.getElementById('userName').value = "";
    document.getElementById('userBranch').value = "";
    document.getElementById('userDesignation').value = "FACULTY";
    document.getElementById('userInstitute').value = "";
    document.getElementById('userTotalLeave').value = "";
  
    document.getElementById("btnAddUser").innerHTML = 'Add';
  
  }
  
  
  function save_user() {
  
    var address_leave = document.getElementById('').value;
    var alt_designation = document.getElementById('').value;
    var alt_name = document.getElementById('').value;
    var days = document.getElementById('').value;
    var department = document.getElementById('').value;
    var desig_applicant = document.getElementById('').value;
    var from_date = document.getElementById('').value;
    var hod_status = document.getElementById('').value;
    var institute = document.getElementById('').value;
    var name_applicant = document.getElementById('').value;
    var principal_status = document.getElementById('').value;
    var reason = document.getElementById('').value;
    var to_date = document.getElementById('').value;
    var type_leave = document.getElementById('').value;
    var user_name = document.getElementById('').value;
  
  
   
    
  
      var data = {
        address_leave: 
        alt_designation: 
        alt_name: 
        days: 
        department: 
        desig_applicant: 
        from_date: 
        hod_status: 
        institute: 
        name_applicant: 
        principal_status: 
        reason: 
        to_date: 
        type_leave: 
        user_name: 
      }
  
      var updates = {};
      updates['/LEAVE/' + pass] = data;   
      firebase.database().ref().update(updates);
  
      alert('User is Updated successfully!');
      reload_page();
  
  
 }
  
  
  
  function reload_page() {
    window.location.reload();
  }
  
  function hideFirstColUserTable() {
    var col = "1";
    if (isNaN(col) || col == "") {
        alert("Invalid Column");
        return;
    }
    col = parseInt(col, 10);
    col = col - 1;
    var tbl = document.getElementById("leaveTable");
    if (tbl != null) {
        if (col < 0 || col >= tbl.rows.length - 1) {
            alert("Invalid Column");
            return;
        }
        for (var i = 0; i < tbl.rows.length; i++) {
            for (var j = 0; j < tbl.rows[i].cells.length; j++) {
                tbl.rows[i].cells[j].style.display = "";
                if (j == col)
                    tbl.rows[i].cells[j].style.display = "none";
            }
        }
    }
  }
  
  
  