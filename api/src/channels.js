const radioBaseNumber = 16384;

const baseTypes = {
  1: 'tv',
  12: 'tv',
  22: 'tv',
  2: 'radio',
  25: 'tv',
}

const types = {
  1: 'sd',
  12: 'sd',
  22: 'sd',
  2: 'radio',
  25: 'hd',
}

const getLGChannel = (map, { serviceType, prNum, minorNum, vchName }) => {
  const baseNumber = (+prNum._text & radioBaseNumber);
  const id = `${vchName._text.replace(/ /g, '')}-${+prNum._text - baseNumber}-${types[serviceType._text]}`;

  map[id] = {
    displayNumber: +prNum._text - baseNumber,
    baseType: baseTypes[serviceType._text],
    type: types[serviceType._text],
    name: vchName._text,
    minorNum: minorNum._text,
  }

  return map;
}

const saveLGChannel = ({sourceData, channels}) => {
  Object.values(channels).forEach(channel => {
    const toUpdate = sourceData['TLLDATA']['CHANNEL']['DTV']['ITEM'].find(item => item.minorNum._text === channel.minorNum);
    if(toUpdate) {
      const newNumber = channel.baseType === 'tv' ? channel.displayNumber : channel.displayNumber + radioBaseNumber;
      toUpdate.prNum._text = `${newNumber}`;
      toUpdate.isUserSelCHNo._text = "1";
    }
  });


  return sourceData;
}

module.exports = {
  getLGChannel,
  saveLGChannel,
}