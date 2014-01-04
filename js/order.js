function addDelAddrReqs() {
    document.getElementById('del-addr-nick').required = true;
    document.getElementById('del-addr').required = true;
    document.getElementById('del-city').required = true;
    document.getElementById('del-state').required = true;
    document.getElementById('del-zip').required = true;
    document.getElementById('del-phone').required = true;
    $('#del-state').attr('parsley-rangelength','[2,2]')
    $('#del-zip').attr('parsley-rangelength','[5,5]')
    $('#del-zip').attr('parsley-type','digits')
    $('#del-phone').attr('parsley-type','phone')
}

function addBillAddrReqs() {
    document.getElementById('bill-addr-nick').required = true;
    document.getElementById('bill-addr').required = true;
    document.getElementById('bill-city').required = true;
    document.getElementById('bill-state').required = true;
    document.getElementById('bill-zip').required = true;
    document.getElementById('bill-phone').required = true;
    $('#bill-state').attr('parsley-rangelength','[2,2]')
    $('#bill-zip').attr('parsley-rangelength','[5,5]')
    $('#bill-zip').attr('parsley-type','digits')
    $('#bill-phone').attr('parsley-type','phone')
}

function addCardReqs() {
    document.getElementById('card-nick').required = true;
    document.getElementById('card-name').required = true;
    document.getElementById('card-type').required = true;
    document.getElementById('card-number').required = true;
    document.getElementById('card-cvc').required = true;
    document.getElementById('card-expiry-mo').required = true;
    document.getElementById('card-expiry-yr').required = true;
    $('#card-number').attr('parsley-type','digits')
    $('#card-number').attr('parsley-minlength','15')
    $('#card-cvc').attr('parsley-type','digits')
    $('#card-cvc').attr('parsley-rangelength','[3,3]')
    $('#card-expiry-mo').attr('parsley-type','digits')
    $('#card-expiry-mo').attr('parsley-rangelength','[2,2]')
    $('#card-expiry-yr').attr('parsley-type','digits')
    $('#card-expiry-yr').attr('parsley-rangelength','[4,4]')
}

function addAddr(delivery) {
  if (delivery) {
    var addrNickname = document.getElementById('del-addr-nick').value;
  } else {
    var addrNickname = document.getElementById('bill-addr-nick').value;
  }
  selectAddr(addrNickname, delivery);

  if (delivery) {
    var list = document.getElementById('del-addr-list');
    list.innerHTML = "<li><a onclick='selectAddr(\"".concat(addrNickname,
      "\", true); return false;'>", addrNickname, "</a>", list.innerHTML);
  }

  var billList = document.getElementById('bill-addr-list');
  billList.innerHTML = "<li><a onclick='selectAddr(\"".concat(addrNickname,
    "\", false); return false;'>", addrNickname, "</a>", billList.innerHTML);

  return false;
};

function selectAddr(addrNickname, delivery) {
  if (delivery) {
    var button = document.getElementById('del-addr');
  } else {
    var button = document.getElementById('bill-addr');
  }
  button.innerHTML = addrNickname;
  return false;
}

function addCard() {
  var cardNickname = document.getElementById('card-nick').value;
  selectCard(cardNickname);

  var list = document.getElementById('card-list');
  list.innerHTML = "<li><a onclick='selectCard(\"".concat(cardNickname,
    "\"); return false;'>", cardNickname, "</a>", list.innerHTML);
  return false;
};

function selectCard(cardNickname) {
  var button = document.getElementById('card');
  button.innerHTML = cardNickname;
  return false;
}
