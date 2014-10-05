function customParsley() {
  $( '#find-food-form' ).parsley( {
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
      },
      cardnumber: function() {
        return {
          validate: function(val) {
            return (val.length  >= 15 && /^[0-9\s]+$/.test(val));
          },
          priority: 2
        };
      },
      cvc: function() {
        return {
          validate: function(val) {
            return (val.length  === 3 && /^[0-9]+$/.test(val));
          },
          priority: 2
        };
      },
      month: function() {
        return {
          validate: function(val) {
            return (val.length  === 2 && /^[0-9]+$/.test(val));
          },
          priority: 2
        };
      },
      year: function() {
        return {
          validate: function(val) {
            return (val.length  === 4 && /^[0-9]+$/.test(val));
          },
          priority: 2
        };
      }
    }
    , messages: {
      state: "Should be a 2-letter state",
      zip: "Should be a 5-number zip",
      cardnumber: "Should be at least 15 digits",
      cvc: "Should be 3 digits",
      month: "Should be 2 digits",
      year: "Should be 4 digits"
    }
  } );
}

function addDelAddrReqs() {
  $('#find-food-form').parsley('addItem', '#del-addr-nick');
  $('#find-food-form').parsley('addItem', '#del-addr');
  $('#find-food-form').parsley('addItem', '#del-city');
  $('#find-food-form').parsley('addItem', '#del-state');
  $('#find-food-form').parsley('addItem', '#del-zip');
  $('#find-food-form').parsley('addItem', '#del-phone');

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
  $('#find-food-form').parsley('removeItem', '#del-addr-nick');
  $('#find-food-form').parsley('removeItem', '#del-addr');
  $('#find-food-form').parsley('removeItem', '#del-city');
  $('#find-food-form').parsley('removeItem', '#del-state');
  $('#find-food-form').parsley('removeItem', '#del-zip');
  $('#find-food-form').parsley('removeItem', '#del-phone');

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
  $('#order-form').parsley('addItem', '#bill-addr-nick');
  $('#order-form').parsley('addItem', '#bill-addr');
  $('#order-form').parsley('addItem', '#bill-city');
  $('#order-form').parsley('addItem', '#bill-state');
  $('#order-form').parsley('addItem', '#bill-zip');
  $('#order-form').parsley('addItem', '#bill-phone');

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
  $('#order-form').parsley('addItem', '#card-nick');
  $('#order-form').parsley('addItem', '#card-name');
  $('#order-form').parsley('addItem', '#card-type');
  $('#order-form').parsley('addItem', '#card-number');
  $('#order-form').parsley('addItem', '#card-cvc');
  $('#order-form').parsley('addItem', '#card-expiry-mo');
  $('#order-form').parsley('addItem', '#card-expiry-yr');

  $('#card-nick').parsley('addConstraint', { 'required': 'true' });
  $('#card-name').parsley('addConstraint', { 'required': 'true' });
  $('#card-type').parsley('addConstraint', { 'required': 'true' });
  $('#card-number').parsley('addConstraint', { 'required': 'true' });
  $('#card-cvc').parsley('addConstraint', { 'required': 'true' });
  $('#card-expiry-mo').parsley('addConstraint', { 'required': 'true' });
  $('#card-expiry-yr').parsley('addConstraint', { 'required': 'true' });

  $('#card-number').parsley('addConstraint', {'cardnumber': ''});
  $('#card-cvc').parsley('addConstraint', {'cvc': ''});
  $('#card-expiry-mo').parsley('addConstraint', {'month': ''});
  $('#card-expiry-yr').parsley('addConstraint', {'year': ''});
}

function removeDelAddrReqs() {
  $('#order-form').parsley('removeItem', '#card-nick');
  $('#order-form').parsley('removeItem', '#card-name');
  $('#order-form').parsley('removeItem', '#card-type');
  $('#order-form').parsley('removeItem', '#card-number');
  $('#order-form').parsley('removeItem', '#card-cvc');
  $('#order-form').parsley('removeItem', '#card-expiry-mo');
  $('#order-form').parsley('removeItem', '#card-expiry-yr');

  $('#card-nick').parsley('removeConstraint', { 'required': 'true' });
  $('#card-name').parsley('removeConstraint', { 'required': 'true' });
  $('#card-type').parsley('removeConstraint', { 'required': 'true' });
  $('#card-number').parsley('removeConstraint', { 'required': 'true' });
  $('#card-cvc').parsley('removeConstraint', { 'required': 'true' });
  $('#card-expiry-mo').parsley('removeConstraint', { 'required': 'true' });
  $('#card-expiry-yr').parsley('removeConstraint', { 'required': 'true' });

  $('#card-number').parsley('removeConstraint', {'cardnumber': ''});
  $('#card-cvc').parsley('removeConstraint', {'cvc': ''});
  $('#card-expiry-mo').parsley('removeConstraint', {'month': ''});
  $('#card-expiry-yr').parsley('removeConstraint', {'year': ''});
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
    if ($('#budget').parsley('validate')) {
      // Budget is also valid, can submit form
      // TODO: make this submit asynchronous
      // $('#find-food-form').submit();
      transition('find', 'choose');
    }
  }
  return true;
}

function transition(prevPrefix, nextPrefix) {
  // Transitions between find and choose, or choose and order
  $('#' + prevPrefix + '-food-prog').removeClass('food-prog-cur');
  $('#' + nextPrefix + '-food-prog').addClass('food-prog-cur');

  $('#' + prevPrefix + '-food-buttons').hide();
  $('#' + nextPrefix + '-food-buttons').fadeIn();
}

function showOrder() {
  // Shows the actual order part of the page after customer has chosen food
  $('#collapseChoose').collapse('hide');
  $('#collapseOrder').collapse('show');
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
}

function addAddr(delivery) {
  var prefix = (delivery) ? 'del-' : 'bill-';
  if (!validateAddrFields(prefix)) {
    // At least one field was not validated
    $('#find-food-form').submit(); // Validates all fields, jumps to 1st error
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

  // Add new address to billing address list
  var billList = document.getElementById('bill-addr-list');
  billList.innerHTML = "<li><a onclick='selectAddr(\"".concat(addrNickname,
    "\", \"", prefix, "\"); return false;'>", addrNickname, "</a>",
    billList.innerHTML);

  removeDelAddrReqs();
  removeDelAddrError();
  return false;
};

function selectAddr(addrNickname, prefix) {
  var label = document.getElementById(prefix + 'addr-selected');
  label.innerHTML = addrNickname;
  return false;
}

function validateCardFields() {
  result = true;
  result = result && $('#card-nick').parsley('validate');
  result = result && $('#card-name').parsley('validate');
  result = result && $('#card-number').parsley('validate');
  result = result && $('#card-cvc').parsley('validate');
  result = result && $('#card-expiry-mo').parsley('validate');
  result = result && $('#card-expiry-yr').parsley('validate');
  result = result && $('#card-type').parsley('validate');
  return result;
}

function addCard() {
  if (!validateCardFields()) {
    // At least one field was not validated
    $('#order-form').submit(); // Validates all fields, jumps to 1st error
    return false;
  }

  // Collapse completed form, uncollapse order button
  $('#collapseCard').collapse('hide');
  $('#collapseOrderButton').collapse('show');

  // Change button to show that the new address is selected
  var cardNickname = document.getElementById('card-nick').value;
  selectCard(cardNickname);

  // Add this card to the card drop downs
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

function checkOrder() {
  // Ensure that a credit card has been chosen before submitting the
  // order form
  // TODO: submit form to server asynchronously
  if ($('#card').text().trim() == 'Credit card') {
    // Button text has not changed, card has not been selected
    $('#add-card-btn').css('display', 'block');
    $('#card-error').fadeIn();
  } else {
    //  Card has been selected
    // TODO: Confirmation
  }
  return true;
}
