function customParsley() {
  $( '#order-form' ).parsley( {
    validators: {
      state: function() {
        return {
          validate: function(val) {
            return (val.length  === 2 && /^[a-zA-Z]+$/.test(val));
          },
          priority: 2
        };
      } ,
      zip: function() {
        return {
          validate: function(val) {
            return (val.length  === 5 && /^[0-9]+$/.test(val));
          },
          priority: 2
        };
      }
    }
    , messages: {
      state: "Should be a 2-letter state",
      zip: "Should be a 5-number zip"
    }
  } );
}

function addDelAddrReqs() {
  $('form').parsley('addItem', '#del-addr-nick');
  $('form').parsley('addItem', '#del-addr');
  $('form').parsley('addItem', '#del-city');
  $('form').parsley('addItem', '#del-state');
  $('form').parsley('addItem', '#del-zip');
  $('form').parsley('addItem', '#del-phone');

  $('#del-addr-nick').parsley('addConstraint', { 'required': 'true' });
  $('#del-addr').parsley('addConstraint', { 'required': 'true' });
  $('#del-city').parsley('addConstraint', { 'required': 'true' });
  $('#del-state').parsley('addConstraint', { 'required': 'true' });
  $('#del-zip').parsley('addConstraint', { 'required': 'true' });
  $('#del-phone').parsley('addConstraint', { 'required': 'true' });

  $('#del-state').parsley('addConstraint', {'state': 'true'});
  $('#del-zip').parsley('addConstraint', {'zip': '5'});
  $('#del-phone').parsley('addConstraint', {'type': 'phone'});
}

function removeDelAddrReqs() {
  console.log('removing');

  $('form').parsley('removeItem', '#del-addr-nick');
  $('form').parsley('removeItem', '#del-addr');
  $('form').parsley('removeItem', '#del-city');
  $('form').parsley('removeItem', '#del-state');
  $('form').parsley('removeItem', '#del-zip');
  $('form').parsley('removeItem', '#del-phone');

  $('#del-addr-nick').parsley('removeConstraint', { 'required': 'true' });
  $('#del-addr').parsley('removeConstraint', { 'required': 'true' });
  $('#del-city').parsley('removeConstraint', { 'required': 'true' });
  $('#del-state').parsley('removeConstraint', { 'required': 'true' });
  $('#del-zip').parsley('removeConstraint', { 'required': 'true' });
  $('#del-phone').parsley('removeConstraint', { 'required': 'true' });

  $('#del-state').parsley('removeConstraint', {'state': 'true'});
  $('#del-zip').parsley('removeConstraint', {'zip': '5'});
  $('#del-phone').parsley('removeConstraint', {'type': 'phone'});
}

function addBillAddrReqs() {
  $('form').parsley('addItem', '#bill-addr-nick');
  $('form').parsley('addItem', '#bill-addr');
  $('form').parsley('addItem', '#bill-city');
  $('form').parsley('addItem', '#bill-state');
  $('form').parsley('addItem', '#bill-zip');
  $('form').parsley('addItem', '#bill-phone');

  $('#bill-addr-nick').parsley('addConstraint', { 'required': 'true' });
  $('#bill-addr').parsley('addConstraint', { 'required': 'true' });
  $('#bill-city').parsley('addConstraint', { 'required': 'true' });
  $('#bill-state').parsley('addConstraint', { 'required': 'true' });
  $('#bill-zip').parsley('addConstraint', { 'required': 'true' });
  $('#bill-phone').parsley('addConstraint', { 'required': 'true' });

  // TODO: change this to parsley
  $('#bill-state').attr('parsley-rangelength','[2,2]')
  $('#bill-zip').attr('parsley-rangelength','[5,5]')
  $('#bill-zip').attr('parsley-type','digits')
  $('#bill-phone').attr('parsley-type','phone')
}

function addCardReqs() {
  $('form').parsley('addItem', '#card-nick');
  $('form').parsley('addItem', '#card-name');
  $('form').parsley('addItem', '#card-type');
  $('form').parsley('addItem', '#card-number');
  $('form').parsley('addItem', '#card-cvc');
  $('form').parsley('addItem', '#card-expiry-mo');
  $('form').parsley('addItem', '#card-expiry-yr');

  $('#card-nick').parsley('addConstraint', { 'required': 'true' });
  $('#card-name').parsley('addConstraint', { 'required': 'true' });
  $('#card-type').parsley('addConstraint', { 'required': 'true' });
  $('#card-number').parsley('addConstraint', { 'required': 'true' });
  $('#card-cvc').parsley('addConstraint', { 'required': 'true' });
  $('#card-expiry-mo').parsley('addConstraint', { 'required': 'true' });
  $('#card-expiry-yr').parsley('addConstraint', { 'required': 'true' });

  // TODO: change this to parsley
  $('#card-number').attr('parsley-type','digits')
  $('#card-number').attr('parsley-minlength','15')
  $('#card-cvc').attr('parsley-type','digits')
  $('#card-cvc').attr('parsley-rangelength','[3,3]')
  $('#card-expiry-mo').attr('parsley-type','digits')
  $('#card-expiry-mo').attr('parsley-rangelength','[2,2]')
  $('#card-expiry-yr').attr('parsley-type','digits')
  $('#card-expiry-yr').attr('parsley-rangelength','[4,4]')
}

function checkDelAddr() {
  // Ensure that a delivery address has been chosen before submitting the
  // 'Find food' form
  // TODO: submit form to server asynchronously
  if ($('#del-addr-selected').text().trim() == 'Delivery address') {
    // Button text has not changed, del addr has not been selected
    $('#del-addr-btn').css('display', 'block');
    $('#del-addr-error').fadeIn();
    $('#budget').parsley('validate');
  } else {
    // Delivery address has been selected
    // No need to validate budget as parsley does this automatically on submit
    $('#order-form').submit();
  }
  return true;
}

function removeDelAddrError() {
  $('#del-addr-btn').css('display', 'inline-block');
  $('#del-addr-error').fadeOut();
}

function validateAddrFields(prefix) {
  result = true;
  result = result && $('#' + prefix + 'addr-nick').parsley('validate');
  result = result && $('#' + prefix + 'addr').parsley('validate');
  result = result && $('#' + prefix + 'city').parsley('validate');
  result = result && $('#' + prefix + 'state').parsley('validate');
  result = result && $('#' + prefix + 'zip').parsley('validate');
  result = result && $('#' + prefix + 'phone').parsley('validate');
  console.log(result);
  return result;
}

function addAddr(delivery) {
  var prefix = (delivery) ? 'del-' : 'bill-';
  if (!validateAddrFields(prefix)) {
    // At least one field was not validated
    $('#order-form').submit(); // Validates all addr fields, jumps to 1st error
    return false;
  }

  // Collapse completed form, uncollapse budget
  $('#collapse-' + prefix + 'addr').collapse('hide');
  $('#collapseBudget').collapse('show');

  // Change button to show that the new address is selected
  var addrNickname = document.getElementById(prefix + 'addr-nick').value;
  selectAddr(addrNickname, prefix);

  // Add this address to the address drop downs
  if (delivery) {
    var list = document.getElementById('del-addr-list');
    list.innerHTML = "<li><a onclick='selectAddr(\"".concat(addrNickname,
      "\", \"", prefix, "\"); removeDelAddrError(); return false;'>",
      addrNickname, "</a>", list.innerHTML);
  }
//  var billList = document.getElementById('bill-addr-list');
//  billList.innerHTML = "<li><a onclick='selectAddr(\"".concat(addrNickname,
//    "\", \"", prefix, "\"); return false;'>", addrNickname, "</a>",
//    billList.innerHTML);

  removeDelAddrReqs();
  removeDelAddrError();
  return false;
};

function selectAddr(addrNickname, prefix) {
  var label = document.getElementById(prefix + 'addr-selected');
  label.innerHTML = addrNickname;
  return false;
}

function addCard() {
  var cardNickname = document.getElementById('card-nick').value;
  selectCard(cardNickname);

  var list = document.getElementById('card-list');
  list.innerHTML = "<li><a onclick='selectCard(\"".concat(cardNickname,
    "\"); return false;'>", cardNickname, "</a>", list.innerHTML);

  // Collapse completed form
  $('#new-card').attr('href', '#collapseCard');
  $('#new-card').click();

  return false;
};

function selectCard(cardNickname) {
  var button = document.getElementById('card');
  button.innerHTML = cardNickname;
  return false;
}
