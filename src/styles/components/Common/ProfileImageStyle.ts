import styled from 'styled-components'

export const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border: 0.1px solid #000;
  border-radius: 50%;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;