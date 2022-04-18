import styled from 'styled-components';

export const ButtonDel = styled.button`  
  position: relative;
  display: inline-block;
  width: 10em;
  height: 2.5em;
  line-height: 2.5em;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 -1px 1px #777;
  color: #fff;
  outline: none;
  border: 2px solid #F64C2B;
  border-radius: 5px;
  box-shadow: 0 0 0 60px rgba(0,0,0,0) inset, .1em .1em .2em #800;
  background: linear-gradient(#FB9575, #F45A38 48%, #EA1502 52%, #F02F17);
  margin-top: 24px;
&:active {
  top: .1em;
  left: .1em;
  box-shadow: 0 0 0 60px rgba(0,0,0,.05) inset;
}
`
 
