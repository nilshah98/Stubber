const calculateShare = (total_cost, convinience_charge, stubble) => {
  gross_cost = total_cost - convinience_charge;
  total_stubble = stubble.reduce((accum, farmer) => {
    return accum + parseInt(farmer.weight);
  }, 0);
  final_share = {};
  stubble.forEach((farmer) => {
    final_share[farmer.number] = Math.floor(
      (farmer.weight / total_stubble) * gross_cost
    );
  });
  return final_share;
};

module.exports = { calculateShare };
