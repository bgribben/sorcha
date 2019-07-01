import React, { useState } from 'react';
import api from './api';
import { generateDownload } from './helpers';
import { Channel, Container, Header } from './Components';

const App = () => {
  const [ data, setData ] = useState({});
  const [ swap, setSwap ] = useState();
  const [ activeFilters, setFilters ] = useState({
    sd: true,
    hd: true,
    radio: true,
    text: '',
  });

  const channels = data.channels || [];

  const updateChannel = (newNumber, id, baseType) => {
    channels[id].displayNumber = newNumber;

    const existingChannel = Object.values(channels).find((channel) => {
      return channel.id !== id && channel.baseType === baseType && channel.displayNumber === newNumber;
    })

    if(existingChannel) {
      return updateChannel(existingChannel.displayNumber + 1, existingChannel.id, existingChannel.baseType);
    }
    setData({
      ...data,
      channels: channels
    });
  }

  const swapChannel = (id) => {
    if(swap) {
      const hold = channels[id].displayNumber;
      channels[id].displayNumber = channels[swap].displayNumber;
      channels[swap].displayNumber = hold;
      setData({
        ...data, 
        channels: channels 
      });
      setSwap(null);
    } else {
      setSwap(id);
    }
  }

  const sort = (channels) => {
    return channels.sort((a, b) => {
      if (+a.displayNumber < +b.displayNumber) { return -1; }
      if (+a.displayNumber > +b.displayNumber) { return 1; }
      return 0;
    })
  }

  const filterChannels = (channel, index) => {
    if (activeFilters.text.length) {
      return activeFilters[channel.type] && channel.name.toLowerCase().includes(activeFilters.text.toLowerCase());
    }
    return activeFilters[channel.type];
  }

  const displayChannels = Object.entries(channels).reduce((acc, [key, value]) => {
    value.id = key;
    acc.push(value);
    return acc;
  }, [])

  const hasData = displayChannels.length;

  const onImport = () => {
    document.getElementById('importFileButton').click();
  }

  const onExport = () => {
    api.exportList(data).then(generateDownload);
  }

  const onAction = hasData ? onExport : onImport;

  return (
    <Container>
      <Header hasData={hasData} onAction={onAction} activeFilters={activeFilters} setFilters={setFilters} setData={setData} />
      {sort(displayChannels).filter(filterChannels).map(Channel(updateChannel, swapChannel, swap))}
    </Container>
  );
}

export default App;
