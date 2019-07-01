import React, { useState } from 'react';
import api from '../api';
import { Button, Checkbox, Input } from 'antd';
import { HeaderContainer } from './styled';

const Header = ({ activeFilters, setFilters, onAction, hasData, setData }) => {
  const [isLoading, setLoading] = useState(false);

  const onCheck = (filter) => (e) => {
    setFilters({
      ...activeFilters,
      [filter]: e.target.checked,
    })
  }

  const onChange = (e) => {
    setFilters({
      ...activeFilters,
      text: e.target.value,
    })
  }

  const onImport = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if(file) {
      api.importList(file).then(({ data }) => {
        setLoading(false);
        setData(data)
      });
    }
  }

  let actionText = 'Import channel list';
  if (hasData) actionText = 'Export channel list';
  if (isLoading) actionText = 'Processing...';

  return (
    <HeaderContainer>
      <input accept=".TLL" onChange={onImport} id='importFileButton' type="file" style={{ display: 'none' }} />
      <div>
        <Checkbox onChange={onCheck('sd')} checked={activeFilters['sd']}>SD</Checkbox>
        <Checkbox onChange={onCheck('hd')} checked={activeFilters['hd']}>HD</Checkbox>
        <Checkbox onChange={onCheck('radio')} checked={activeFilters['radio']}>Radio</Checkbox>
      </div>
      <Button disabled={isLoading} onClick={onAction} type="primary">{actionText}</Button>
      <Input onChange={onChange} style={{ width: 250 }} placeholder='Name' allowClear />
    </HeaderContainer>
  )
}

export default Header;