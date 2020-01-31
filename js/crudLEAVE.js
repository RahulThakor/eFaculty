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
  
  var tblLeave = document.getElementById('leaveTable');
  var databaseRef = firebase.database().ref('LEAVE/');
  
  var rowIndex = 1;
  
  databaseRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
  
      var row = tblLeave.insertRow(rowIndex);
      var celluid = row.insertCell(0);

      var cell_user_name = row.insertCell(1);
      var cell_name_applicant = row.insertCell(2);
      var cell_type_leave = row.insertCell(3);
      var cell_address_leave = row.insertCell(4);
      var cell_department = row.insertCell(5);
      var cell_desig_applicant = row.insertCell(6);
      var cell_institute = row.insertCell(7);
      var cell_from_date = row.insertCell(8);
      var cell_to_date = row.insertCell(9);
      var cell_days = row.insertCell(10);
      var cell_alt_name = row.insertCell(11);
      var cell_alt_designation = row.insertCell(12);
      var cell_hod_status = row.insertCell(13);
      var cell_principal_status = row.insertCell(14);
      var cell_reason = row.insertCell(15);
    
    
      cellDelete = row.insertCell(16);
      cellDelete.innerHTML = `<button type="button" class="btn btn-danger mb-1" onClick="onUserDelete(this)"><i class="fas fa-trash-alt"></i></button>`;
  
        celluid.appendChild(document.createTextNode(childKey));
  
        cell_user_name.appendChild(document.createTextNode(childData.user_name));
        cell_name_applicant.appendChild(document.createTextNode(childData.name_applicant));
        cell_type_leave.appendChild(document.createTextNode(childData.type_leave));
        cell_address_leave.appendChild(document.createTextNode(childData.address_leave));
        cell_department.appendChild(document.createTextNode(childData.department));
        cell_desig_applicant.appendChild(document.createTextNode(childData.desig_applicant));
        cell_institute.appendChild(document.createTextNode(childData.institute));
        cell_from_date.appendChild(document.createTextNode(childData.from_date));
        cell_to_date.appendChild(document.createTextNode(childData.to_date));
        cell_days.appendChild(document.createTextNode(childData.days));
        cell_alt_name.appendChild(document.createTextNode(childData.alt_name));
        cell_alt_designation.appendChild(document.createTextNode(childData.alt_designation));
        cell_hod_status.appendChild(document.createTextNode(childData.hod_status));
        cell_principal_status.appendChild(document.createTextNode(childData.principal_status));
        cell_reason.appendChild(document.createTextNode(childData.reason));
  
      hideFirstColUserTable();
      rowIndex = rowIndex + 1;
    });
  }
  );
  

  
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
  
  
  