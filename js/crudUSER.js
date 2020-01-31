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

var tblUsers = document.getElementById('userTable');
var databaseRef = firebase.database().ref('USER/');

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
    cellEdit.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick="onUserEdit(this)"><i class="far fa-edit"></i></button>`;

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
  var uid = document.getElementById("userTable").rows[row.rowIndex].cells.item(0).innerHTML
  var email = document.getElementById("userTable").rows[row.rowIndex].cells.item(1).innerHTML;
  var name = document.getElementById("userTable").rows[row.rowIndex].cells.item(2).innerHTML;
  var branch = document.getElementById("userTable").rows[row.rowIndex].cells.item(3).innerHTML;
  var desg = document.getElementById("userTable").rows[row.rowIndex].cells.item(4).innerHTML;
  var inst = document.getElementById("userTable").rows[row.rowIndex].cells.item(5).innerHTML;
  var total_leave = document.getElementById("userTable").rows[row.rowIndex].cells.item(6).innerHTML;

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
  var uid = document.getElementById("userTable").rows[row.rowIndex].cells.item(0).innerHTML;
  var email = document.getElementById("userTable").rows[row.rowIndex].cells.item(1).innerHTML;

  var r = confirm("Delete user : " + email);
  if (r == true) {
    firebase.database().ref().child('/USER/' + uid).remove();
    reload_page();
  }
}



function save_user() {

  var email = document.getElementById('userEmail').value;
  var pass = document.getElementById('userPass').value;
  var name = document.getElementById('userName').value;
  var branch = document.getElementById('userBranch').value;
  var desg = document.getElementById('userDesignation').value;
  var inst = document.getElementById('userInstitute').value;
  var leave = document.getElementById('userTotalLeave').value;

  var btnValue = document.getElementById("btnAddUser").innerHTML;

  if (btnValue == "Add") {

            var uid = firebase.database().ref().child('USER').push().key;

            firebase.auth().createUserWithEmailAndPassword(email, pass).then(function () {
          
              var data = {
                user_name: email,
                f_name: name,
                branch: branch,
                designation: desg,
                institute: inst,
                total_leave: leave
              }
          
              var updates = {};
              updates['/USER/' + uid] = data;
              firebase.database().ref().update(updates);
          
              alert('User is created successfully!');
              reload_page();
          
          
            }).catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
              }
              else if (errorCode == '"auth/invalid-email"') {
                alert('Enter Valid Email');
              }
              else {
                alert(errorMessage);
              }
            });

  }
  else if (btnValue == "Update") {

    var data = {
      user_name: email,
      f_name: name,
      branch: branch,
      designation: desg,
      institute: inst,
      total_leave: leave
    }

    var updates = {};
    updates['/USER/' + pass] = data;   
    firebase.database().ref().update(updates);

    alert('User is Updated successfully!');
    reload_page();


  }
}


function reload_page() {
  window.location.reload();
}




