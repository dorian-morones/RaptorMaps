import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MapModule = styled.div`
  display: block;
`;

export const AlertModule = styled.div`
  display: block;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-left: 10px;
  margin-top: 10px;
`;
