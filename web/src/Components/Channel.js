import React from 'react';
import { Input } from 'antd';
import { Hd, Tv, Radio, SwapHoriz, VerticalAlignTop } from '@material-ui/icons';
import { StyledChannel } from './styled';

const icons = {
  'sd': <Tv />,
  'hd': <Hd />,
  'radio': <Radio />,
}

const Actions = ({ swap, toTop }) => {
  return (
    <div className='actions'>
      <VerticalAlignTop onClick={toTop} className='action' />
      <SwapHoriz onClick={swap} className='action' />
    </div>
  )
}

const Channel = (onUpdateChannel, onSwap, swap) => ({ displayNumber, name, type, id, baseType }) => {
  const updateChannel = (e) => {
    (+e.target.value !== displayNumber) && onUpdateChannel(+e.target.value, id, baseType)
  }

  const toTop = () => {
    displayNumber !== 1 && onUpdateChannel(1, id, baseType);
  }

  return (
    <StyledChannel key={id + displayNumber} className={swap === id && 'selected'}>
      <div className='channelIcon'>{icons[type]}</div>
      <Actions toTop={toTop} swap={() => onSwap(id)} />
      <span>{name}</span>
      <Input onBlur={updateChannel} style={{ width: 50, textAlign: 'center' }} defaultValue={displayNumber} />
    </StyledChannel>
  )
}

export default Channel;