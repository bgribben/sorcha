import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid rgba(0,0,0,0.1);
  z-index: 2;
`

export const StyledChannel = styled.div`
  background: rgb(0,0,0,0.05);
  padding: 15px;
  margin: 5px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 62px;
  position: relative;

  &&.selected {
    border: 1px solid #1890ff;
    border-style: dashed;
    padding: 14px;
    .actions {
      left: 14px;
    }
  }

  .actions {
    opacity: 0;
    position: absolute;
    height: 100%;
    left: 15px;
    pointer-events: none;
    display: flex;
    align-items: center;
    background: linear-gradient(to right, rgba(242,242,242,1) 75%,rgba(242,242,242,0) 100%); 
    padding-right: 15px;
    transition: opacity 0.2s linear;
  }

  .action {
    transition: all 0.1s linear;
    :hover {
      color: #1890ff;
    }
  }

  .channelIcon {
    display: flex;
    align-items: center;
  }

  :hover {
    .actions {
      opacity: 1;
      cursor: pointer;
      pointer-events: all;
    }

    .channelIcon {
      opacity: 0;
    }
  }
`;

export const Container = styled.div`
  text-align: center;
  margin-top: 80px;
`;