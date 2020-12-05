import styled from 'styled-components';

export const MapContainer = styled.div.attrs(() => ({
  className: 'MapContainer',
}))`
  width: "100vw";
  height: "calc(100vh - 80px)";
  position: "absolute";
`;