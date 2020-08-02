
const calculateShare = (total_cost, convinience_charge, stubble) => {
  gross_cost = total_cost - convinience_charge;
  total_stubble = stubble.reduce((accum, farmer) => {
    return accum + farmer.weight
  }, 0)
  final_share = {}
  stubble.forEach(farmer => {
    final_share[farmer.number] = Math.floor((farmer.weight / total_stubble) * (gross_cost));
  });
  return final_share
}

const sendSms = () => {
  console.log("send sms to everyone")
}

module.exports = calculateShare,sendSms,get_weight